#!/usr/bin/env python3
"""Anotador LLM (Estrategia 2) rodando contra uma instancia Ollama local.

Reimplementa o extrator LLM descrito na §3.2 da proposta -- prompt few-shot,
protocolo snippet -> offset em 4 niveis e FONTE garantida via URL -- trocando
o backend remoto (qwen3.6-max-preview via DashScope) por um modelo local
servido pelo Ollama (ex.: qwen3.6:35b).

Uso tipico:
    ollama serve                       # em outro terminal
    ollama pull qwen3.6:35b
    python anotador_llm.py --limit 10  # smoke test
    python anotador_llm.py             # sweep completo, resumivel
"""

from __future__ import annotations

import argparse
import json
import os
import re
import time
from collections import Counter
from pathlib import Path

from tqdm import tqdm

from alignment import align_span_text
from prompts import FEW_SHOT, PROMPT_SYSTEM, VALID_TYPES

APP_DIR = Path(__file__).resolve().parent
DATA_DIR = APP_DIR.parent.parent / "data"

DEFAULT_INPUT = DATA_DIR / "dataset_anotado_final.parquet"
DEFAULT_OUTPUT = APP_DIR / "output" / "e2_ollama_sweep.jsonl"

RE_FONTE_URL = re.compile(r"https?://\S+")


def _safe_json_loads(content: str):
    try:
        return json.loads(content)
    except json.JSONDecodeError:
        m = re.search(r"\{.*\}", content, re.S)
        if not m:
            raise
        return json.loads(m.group(0))


def merge_url_sources(text: str, spans: list[dict]) -> list[dict]:
    """FONTE garantida: URLs sao extraidas por regex e mescladas ao resultado
    do LLM antes da deduplicacao por overlap (§3.2)."""
    used = [(s["start"], s["end"]) for s in spans if s.get("start") is not None]
    merged = list(spans)
    for m in RE_FONTE_URL.finditer(text):
        start, end = m.start(), m.end()
        while end > start and text[end - 1] in ".,;:)]}":
            end -= 1
        if end <= start:
            continue
        if any(not (end <= a or start >= b) for a, b in used):
            continue
        merged.append({
            "start": start, "end": end, "type": "FONTE",
            "text": text[start:end], "align_level": "url_regex",
        })
        used.append((start, end))
    return merged


class OllamaExtractor:
    def __init__(self, host: str, model: str, seed: int = 42,
                 temperature: float = 0.0, think: bool = False, timeout: int = 120):
        import ollama  # import tardio: so falha se o usuario nao instalou o pacote

        self.client = ollama.Client(host=host, timeout=timeout)
        self.model = model
        self.seed = seed
        self.temperature = temperature
        self.think = think

    def _call(self, text: str):
        messages = [{"role": "system", "content": PROMPT_SYSTEM}] + FEW_SHOT + [
            {"role": "user", "content": f"TEXTO: {text}"}
        ]
        kwargs = dict(
            model=self.model,
            messages=messages,
            format="json",
            options={"temperature": self.temperature, "seed": self.seed},
        )
        try:
            # `think` so existe em clientes ollama recentes (modelos hibridos
            # tipo qwen3/qwen3.6); cai pro modo sem o parametro se nao suportado.
            return self.client.chat(think=self.think, **kwargs)
        except TypeError:
            return self.client.chat(**kwargs)

    def extract(self, text: str) -> dict:
        started = time.perf_counter()
        result = {
            "spans": [],
            "error": None,
            "latency_s": None,
            "raw": None,
            "align_level_counts": {
                "exact": 0, "normalized": 0, "unicode_normalized": 0,
                "regex": 0, "url_regex": 0, "failed": 0,
            },
        }
        try:
            response = self._call(text)
            raw = response["message"]["content"] or "{}"
            result["raw"] = raw
            payload = _safe_json_loads(raw)
            spans = payload.get("spans", []) if isinstance(payload, dict) else []

            used: list[tuple[int, int]] = []
            aligned: list[dict] = []
            for item in spans:
                typ = str(item.get("type", "")).upper().strip()
                snippet = str(item.get("text", ""))
                if typ not in VALID_TYPES or not snippet:
                    continue
                match = align_span_text(text, snippet, used=used)
                level = match["level"]
                result["align_level_counts"][level] = result["align_level_counts"].get(level, 0) + 1
                if level == "failed":
                    aligned.append({
                        "start": None, "end": None, "type": typ,
                        "text": snippet, "align_level": level,
                    })
                    continue
                used.append((match["start"], match["end"]))
                aligned.append({
                    "start": match["start"], "end": match["end"], "type": typ,
                    "text": text[match["start"]:match["end"]],
                    "snippet_requested": snippet, "align_level": level,
                })

            aligned = merge_url_sources(text, aligned)
            result["spans"] = aligned
        except Exception as exc:  # noqa: BLE001 -- erro de rede/modelo vira e2_err na saida
            result["error"] = f"{type(exc).__name__}: {exc}"
        finally:
            result["latency_s"] = time.perf_counter() - started
        return result


def _load_dataset(path: Path):
    import pandas as pd

    # pyarrow primeiro: fastparquet falha neste arquivo (LIST<STRUCT> + NAType
    # anuláveis do DuckDB) com TypeError em vez de erro de import/parsing.
    last_exc = None
    for engine in ("pyarrow", "fastparquet"):
        try:
            return pd.read_parquet(path, engine=engine)
        except Exception as exc:  # noqa: BLE001 -- so decide o fallback
            last_exc = exc
            continue
    raise last_exc


def _read_processed_ids(path: Path, retry_errors: set[str] | None = None) -> set[str]:
    if not path.exists():
        return set()
    retry_errors = retry_errors or set()
    latest: dict[str, dict] = {}
    with path.open("r", encoding="utf-8") as f:
        for line in f:
            try:
                rec = json.loads(line)
                latest[str(rec["noteId"])] = rec
            except (json.JSONDecodeError, KeyError):
                continue
    return {nid for nid, rec in latest.items() if rec.get("e2_err") not in retry_errors}


def _spans_to_payload(spans: list[dict]) -> list[dict]:
    out = []
    for s in spans or []:
        if s.get("start") is not None and s.get("end") is not None:
            out.append({"start": int(s["start"]), "end": int(s["end"]), "type": str(s["type"]).upper()})
    return out


def run_sweep(df, extractor: OllamaExtractor, out_path: Path, flush_every: int = 25,
              limit: int | None = None, skip_meta: bool = False, resume: bool = True) -> None:
    out_path.parent.mkdir(parents=True, exist_ok=True)

    if skip_meta and "is_meta" in df.columns:
        df = df[~df["is_meta"].fillna(False)].reset_index(drop=True)

    done = _read_processed_ids(out_path) if resume else set()
    pending = df[~df["noteId"].astype(str).isin(done)].reset_index(drop=True)
    if limit is not None:
        pending = pending.head(limit)

    print(f"ja processadas: {len(done):,} | pendentes: {len(pending):,} | total no df: {len(df):,}")
    if not len(pending):
        return

    align_totals = Counter()
    n_err = 0
    buffer: list[str] = []
    mode = "a" if resume else "w"
    with out_path.open(mode, encoding="utf-8") as f:
        pbar = tqdm(total=len(pending), desc=f"anotador-llm ({extractor.model})")
        try:
            for _, row in pending.iterrows():
                note_id = str(row["noteId"])
                text = row["text"]
                res = extractor.extract(text)
                align_totals.update(res["align_level_counts"])
                if res["error"]:
                    n_err += 1

                rec = {
                    "noteId": note_id,
                    "tweetId": str(row.get("tweetId") or ""),
                    "text": text,
                    "tweet_text": row.get("tweet_text") or "",
                    "consenso": row.get("consenso"),
                    "macrotheme_label": row.get("macrotheme_label"),
                    "is_meta": bool(row.get("is_meta")) if "is_meta" in row else None,
                    "e2_spans": _spans_to_payload(res["spans"]),
                    "e2_ms": round(res["latency_s"] * 1000, 1),
                    "e2_err": res["error"],
                    "e2_align_levels": res["align_level_counts"],
                    "model": f"{extractor.model} (ollama)",
                }
                buffer.append(json.dumps(rec, ensure_ascii=False))
                if len(buffer) >= flush_every:
                    f.write("\n".join(buffer) + "\n")
                    f.flush()
                    buffer.clear()
                pbar.update(1)
        finally:
            if buffer:
                f.write("\n".join(buffer) + "\n")
                f.flush()
            pbar.close()

    total = sum(align_totals.values())
    print(f"\nconcluido: {len(pending):,} notas | erros: {n_err:,}")
    if total:
        detalhe = ", ".join(f"{k}={v} ({v / total:.1%})" for k, v in align_totals.items())
        print(f"alinhamento: {detalhe}")
        failed_pct = align_totals.get("failed", 0) / total
        print(f"criterio interno (failed < 3%): {'OK' if failed_pct < 0.03 else 'FORA DA META'} ({failed_pct:.1%})")


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--input", type=Path, default=DEFAULT_INPUT,
                         help=f"dataset filtrado de entrada (default: {DEFAULT_INPUT})")
    parser.add_argument("--output", type=Path, default=DEFAULT_OUTPUT,
                         help=f"JSONL de saida, resumivel (default: {DEFAULT_OUTPUT})")
    parser.add_argument("--host", default=os.getenv("OLLAMA_HOST", "http://localhost:11434"),
                         help="URL da API Ollama local (env OLLAMA_HOST)")
    parser.add_argument("--model", default=os.getenv("OLLAMA_MODEL", "qwen3.6:35b"),
                         help="modelo servido pelo Ollama (env OLLAMA_MODEL)")
    parser.add_argument("--seed", type=int, default=42)
    parser.add_argument("--temperature", type=float, default=0.0)
    parser.add_argument("--think", action="store_true",
                         help="habilita thinking do modelo (default: desligado, igual ao E2 original)")
    parser.add_argument("--timeout", type=int, default=120)
    parser.add_argument("--flush-every", type=int, default=25)
    parser.add_argument("--limit", type=int, default=None, help="processa so as N primeiras notas pendentes")
    parser.add_argument("--skip-meta", action="store_true", help="pula notas marcadas is_meta=True")
    parser.add_argument("--no-resume", action="store_true", help="ignora saida existente e comeca do zero")
    args = parser.parse_args()

    print(f"lendo dataset: {args.input}")
    df = _load_dataset(args.input)
    if "text" not in df.columns:
        raise SystemExit(f"coluna 'text' nao encontrada em {args.input} (colunas: {list(df.columns)})")

    extractor = OllamaExtractor(
        host=args.host, model=args.model, seed=args.seed,
        temperature=args.temperature, think=args.think, timeout=args.timeout,
    )
    print(f"Ollama: host={args.host} model={args.model} think={args.think}")

    run_sweep(
        df, extractor, args.output,
        flush_every=args.flush_every, limit=args.limit,
        skip_meta=args.skip_meta, resume=not args.no_resume,
    )


if __name__ == "__main__":
    main()
