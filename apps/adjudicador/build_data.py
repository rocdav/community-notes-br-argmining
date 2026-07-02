"""Build static data for the adjudication interface.

The app stays fully static, but this script keeps its data reproducible from
the original annotation app export and the two independent human annotations.
"""

from __future__ import annotations

import json
import re
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
APP_DIR = Path(__file__).resolve().parent

NOTAS_JS = ROOT / "apps" / "anotador" / "data.js"
DAVI_JSON = ROOT / "data" / "gold" / "anotacao_manual_davi-machado-da-rocha_2026-05-20.json"
ALVARO_JSON = ROOT / "data" / "gold" / "anotacao_manual_alvaro-barros_2026-07-02.json"
OUT_JS = APP_DIR / "data.js"


def load_notas() -> list[dict]:
    raw = NOTAS_JS.read_text(encoding="utf-8")
    match = re.search(r"window\.NOTAS_DATA\s*=\s*(.*);\s*$", raw, re.S)
    if not match:
        raise ValueError(f"Could not find window.NOTAS_DATA in {NOTAS_JS}")
    return json.loads(match.group(1))


def load_annotation(path: Path) -> dict:
    payload = json.loads(path.read_text(encoding="utf-8"))
    return payload


def span_text(note_text: str, span: dict) -> str:
    return note_text[int(span["start"]) : int(span["end"])]


def normalize_spans(spans: list[dict], note_text: str, source_key: str, source_label: str) -> list[dict]:
    normalized = []
    for idx, span in enumerate(spans or []):
        start = int(span["start"])
        end = int(span["end"])
        text = span_text(note_text, span)
        expected = span.get("text")
        if expected is not None and expected != text:
            raise ValueError(
                f"Offset mismatch for {source_key} span {idx}: "
                f"{start}:{end} expected={expected!r} got={text!r}"
            )
        normalized.append(
            {
                "id": f"{source_key}-{start}-{end}-{span['type']}-{idx}",
                "source_key": source_key,
                "source_label": source_label,
                "type": span["type"],
                "start": start,
                "end": end,
                "text": text,
            }
        )
    return sorted(normalized, key=lambda s: (s["start"], s["end"], s["type"], s["source_key"]))


def signature(span: dict) -> tuple[int, int, str]:
    return int(span["start"]), int(span["end"]), span["type"]


def overlaps(a: dict, b: dict) -> bool:
    return max(int(a["start"]), int(b["start"])) < min(int(a["end"]), int(b["end"]))


def build_clusters(davi_spans: list[dict], alvaro_spans: list[dict]) -> list[dict]:
    spans = davi_spans + alvaro_spans
    parent = list(range(len(spans)))

    def find(i: int) -> int:
        while parent[i] != i:
            parent[i] = parent[parent[i]]
            i = parent[i]
        return i

    def union(i: int, j: int) -> None:
        ri, rj = find(i), find(j)
        if ri != rj:
            parent[rj] = ri

    for i, left in enumerate(spans):
        for j in range(i + 1, len(spans)):
            right = spans[j]
            if overlaps(left, right) or signature(left) == signature(right):
                union(i, j)

    grouped: dict[int, list[dict]] = {}
    for i, span in enumerate(spans):
        grouped.setdefault(find(i), []).append(span)

    clusters = []
    for idx, group in enumerate(grouped.values()):
        group = sorted(group, key=lambda s: (s["start"], s["end"], s["type"], s["source_key"]))
        sources = sorted({s["source_key"] for s in group})
        types = sorted({s["type"] for s in group})
        exact_pairs = []
        by_sig: dict[tuple[int, int, str], list[str]] = {}
        for span in group:
            by_sig.setdefault(signature(span), []).append(span["source_key"])
        for sig, source_keys in by_sig.items():
            if len(set(source_keys)) > 1:
                exact_pairs.append({"start": sig[0], "end": sig[1], "type": sig[2]})
        clusters.append(
            {
                "id": f"c{idx + 1}",
                "start": min(s["start"] for s in group),
                "end": max(s["end"] for s in group),
                "sources": sources,
                "types": types,
                "exact_agreements": exact_pairs,
                "span_ids": [s["id"] for s in group],
            }
        )
    return sorted(clusters, key=lambda c: (c["start"], c["end"], c["id"]))


def main() -> None:
    notas = load_notas()
    davi_payload = load_annotation(DAVI_JSON)
    alvaro_payload = load_annotation(ALVARO_JSON)
    davi = davi_payload["anotacoes"]
    alvaro = alvaro_payload["anotacoes"]

    out_notes = []
    total_davi = total_alvaro = total_exact = total_union = 0
    notes_without_divergence = 0

    for order, note in enumerate(notas, start=1):
        note_id = str(note["noteId"])
        note_text = note["note_text"]
        davi_spans = normalize_spans(davi[note_id]["spans"], note_text, "davi", "Davi")
        alvaro_spans = normalize_spans(alvaro[note_id]["spans"], note_text, "alvaro", "Alvaro")
        e1_spans = normalize_spans(note.get("e1_spans", []), note_text, "e1", "E1")
        e2_spans = normalize_spans(note.get("e2_spans", []), note_text, "e2", "E2")

        davi_set = {signature(s) for s in davi_spans}
        alvaro_set = {signature(s) for s in alvaro_spans}
        exact = sorted(davi_set & alvaro_set)
        union = sorted(davi_set | alvaro_set)
        if len(exact) == len(union):
            notes_without_divergence += 1

        total_davi += len(davi_spans)
        total_alvaro += len(alvaro_spans)
        total_exact += len(exact)
        total_union += len(union)

        out_notes.append(
            {
                "order": order,
                "noteId": note_id,
                "tweetId": str(note.get("tweetId", "")),
                "consenso": note.get("consenso") or "",
                "macrotheme_label": note.get("macrotheme_label") or "",
                "tweet_text": note.get("tweet_text") or "",
                "note_text": note_text,
                "is_meta": bool(note.get("is_meta")),
                "meta_reason": note.get("meta_reason") or "",
                "human": {
                    "davi": {
                        "label": "Davi",
                        "status": davi[note_id].get("status", ""),
                        "obs": davi[note_id].get("obs", ""),
                        "spans": davi_spans,
                    },
                    "alvaro": {
                        "label": "Alvaro",
                        "status": alvaro[note_id].get("status", ""),
                        "obs": alvaro[note_id].get("obs", ""),
                        "spans": alvaro_spans,
                    },
                },
                "automatic": {"e1": e1_spans, "e2": e2_spans},
                "clusters": build_clusters(davi_spans, alvaro_spans),
                "exact_agreement": [
                    {"start": start, "end": end, "type": typ, "text": note_text[start:end]}
                    for start, end, typ in exact
                ],
                "counts": {
                    "davi": len(davi_spans),
                    "alvaro": len(alvaro_spans),
                    "exact_agreement": len(exact),
                    "human_union": len(union),
                },
            }
        )

    payload = {
        "schema_version": "1.0",
        "dataset_version": davi_payload.get("dataset_version", "v1.0"),
        "guide_version": davi_payload.get("guia_versao", "1.0"),
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "source_files": {
            "notes": str(NOTAS_JS.relative_to(ROOT)).replace("\\", "/"),
            "davi": str(DAVI_JSON.relative_to(ROOT)).replace("\\", "/"),
            "alvaro": str(ALVARO_JSON.relative_to(ROOT)).replace("\\", "/"),
        },
        "annotators": {
            "davi": davi_payload.get("anotador", {"nome": "Davi", "papel": "manual"}),
            "alvaro": alvaro_payload.get("anotador", {"nome": "Alvaro", "papel": "manual"}),
        },
        "stats": {
            "notes": len(out_notes),
            "davi_spans": total_davi,
            "alvaro_spans": total_alvaro,
            "exact_agreement_spans": total_exact,
            "human_union_spans": total_union,
            "notes_without_divergence": notes_without_divergence,
            "notes_with_divergence": len(out_notes) - notes_without_divergence,
        },
        "notes": out_notes,
    }

    OUT_JS.write_text(
        "window.ADJUDICACAO_DATA = "
        + json.dumps(payload, ensure_ascii=False, indent=2)
        + ";\n",
        encoding="utf-8",
    )
    print(f"Wrote {OUT_JS.relative_to(ROOT)}")
    print(json.dumps(payload["stats"], ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
