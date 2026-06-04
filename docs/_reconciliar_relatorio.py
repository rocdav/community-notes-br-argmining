from __future__ import annotations

import ast
import json
import math
import re
from collections import Counter
from dataclasses import dataclass
from pathlib import Path
from typing import Any

import matplotlib

matplotlib.use("Agg")

import matplotlib.pyplot as plt
import numpy as np
import pandas as pd


ROOT = Path(__file__).resolve().parent
CSV_PATH = ROOT / "dataset_anotado_final_com_bio.csv"
OUT_DIR = ROOT / "outputs"
FIG_DIR = ROOT / "figuras_relatorio"
OUT_DIR.mkdir(exist_ok=True)
FIG_DIR.mkdir(exist_ok=True)

LABELS = ["CLAIM", "EVIDENCIA", "FONTE", "QUALIFICADOR"]
COLORS = {
    "CLAIM": "#c43b4d",
    "EVIDENCIA": "#2f8f5b",
    "FONTE": "#2f6fb3",
    "QUALIFICADOR": "#b18a19",
    "E1": "#4d6f91",
    "E2": "#c46a3b",
}
LABEL_ALIASES = {
    "EVIDÊNCIA": "EVIDENCIA",
    "EVIDENCIA": "EVIDENCIA",
    "EVIDENCE": "EVIDENCIA",
    "SOURCE": "FONTE",
    "QUALIFIER": "QUALIFICADOR",
}


@dataclass(frozen=True)
class S:
    start: int
    end: int
    type: str


def is_missing(v: Any) -> bool:
    if v is None or v is pd.NA:
        return True
    if isinstance(v, float) and math.isnan(v):
        return True
    return False


def parse_literal(v: Any) -> Any:
    if is_missing(v):
        return None
    if not isinstance(v, str):
        return v
    s = v.strip()
    if not s or s.lower() in {"nan", "none", "null"}:
        return None
    try:
        return json.loads(s)
    except Exception:
        try:
            return ast.literal_eval(s)
        except SyntaxError:
            repaired = re.sub(r"}\s+{", "}, {", s)
            return ast.literal_eval(repaired)


def spans_from_cell(v: Any) -> list[S]:
    raw = parse_literal(v)
    if raw is None:
        return []
    if isinstance(raw, dict) and "spans" in raw:
        raw = raw["spans"]
    out: list[S] = []
    for item in raw:
        typ = str(item["type"]).strip().upper()
        typ = LABEL_ALIASES.get(typ, typ)
        if typ not in LABELS:
            continue
        out.append(S(int(item["start"]), int(item["end"]), typ))
    return out


def _ov(a: S, b: S) -> int:
    return max(0, min(a.end, b.end) - max(a.start, b.start))


def f1_strict(gold: list[S], pred: list[S]) -> float:
    g = {(s.start, s.end, s.type) for s in gold}
    p = {(s.start, s.end, s.type) for s in pred}
    tp = len(g & p)
    if not tp:
        return 0.0 if (g or p) else 1.0
    precision = tp / len(p)
    recall = tp / len(g)
    return 2 * precision * recall / (precision + recall)


def f1_relaxed(gold: list[S], pred: list[S], mr: float = 0.5) -> float:
    matched_gold, matched_pred = set(), set()
    for i, a in enumerate(gold):
        for j, b in enumerate(pred):
            if a.type != b.type or j in matched_pred:
                continue
            if _ov(a, b) / max(a.end - a.start, b.end - b.start, 1) >= mr:
                matched_gold.add(i)
                matched_pred.add(j)
                break
    tp = len(matched_gold)
    if not tp:
        return 0.0 if (gold or pred) else 1.0
    precision = tp / len(pred) if pred else 0.0
    recall = tp / len(gold) if gold else 0.0
    return 2 * precision * recall / (precision + recall) if precision + recall else 0.0


def _char_labels(text: str, spans: list[S]) -> list[str]:
    labels = ["O"] * len(text)
    for span in spans:
        for i in range(max(0, span.start), min(span.end, len(text))):
            labels[i] = span.type
    return labels


def cohen_kappa_chars(text: str, a: list[S], b: list[S]) -> float:
    if not text:
        return 0.0
    la = _char_labels(text, a)
    lb = _char_labels(text, b)
    n = len(text)
    po = sum(1 for x, y in zip(la, lb) if x == y) / n
    cats = set(la) | set(lb)
    pe = sum((la.count(c) / n) * (lb.count(c) / n) for c in cats)
    return (po - pe) / (1 - pe) if pe < 1 else 1.0


def has_type(spans: list[S], typ: str) -> bool:
    return any(s.type == typ for s in spans)


def kappa_presence(a: np.ndarray, b: np.ndarray) -> float:
    n = len(a)
    if n == 0:
        return float("nan")
    po = (a == b).mean()
    pa, pb = a.sum() / n, b.sum() / n
    pe = pa * pb + (1 - pa) * (1 - pb)
    return (po - pe) / (1 - pe) if pe < 1 else 0.0


def bio_entities(labels: list[str]) -> set[tuple[int, int, str]]:
    ents = set()
    i = 0
    while i < len(labels):
        if labels[i].startswith("B-"):
            typ = labels[i][2:]
            j = i + 1
            while j < len(labels) and labels[j] == f"I-{typ}":
                j += 1
            ents.add((i, j, typ))
            i = j
        else:
            i += 1
    return ents


def entity_prf(gold_lists: list[list[str]], pred_lists: list[list[str]]) -> pd.DataFrame:
    tp = fp = fn = 0
    per = {t: [0, 0, 0] for t in LABELS}
    for gold, pred in zip(gold_lists, pred_lists):
        gold_ent, pred_ent = bio_entities(gold), bio_entities(pred)
        tp += len(gold_ent & pred_ent)
        fp += len(pred_ent - gold_ent)
        fn += len(gold_ent - pred_ent)
        for typ in LABELS:
            gt = {e for e in gold_ent if e[2] == typ}
            pt = {e for e in pred_ent if e[2] == typ}
            per[typ][0] += len(gt & pt)
            per[typ][1] += len(pt - gt)
            per[typ][2] += len(gt - pt)

    def prf(_tp: int, _fp: int, _fn: int) -> tuple[float, float, float]:
        precision = _tp / (_tp + _fp) if _tp + _fp else 0.0
        recall = _tp / (_tp + _fn) if _tp + _fn else 0.0
        f1 = 2 * precision * recall / (precision + recall) if precision + recall else 0.0
        return precision, recall, f1

    rows = []
    precision, recall, f1 = prf(tp, fp, fn)
    rows.append({"escopo": "micro", "P": round(precision, 3), "R": round(recall, 3), "F1": round(f1, 3)})
    for typ in LABELS:
        precision, recall, f1 = prf(*per[typ])
        rows.append({"escopo": typ, "P": round(precision, 3), "R": round(recall, 3), "F1": round(f1, 3)})
    return pd.DataFrame(rows)


def load_json_list(v: Any) -> list[str] | None:
    if not isinstance(v, str) or not v.strip():
        return None
    return json.loads(v)


def save_bar_labels(ax, fmt="{:.3f}", dy=3):
    for patch in ax.patches:
        h = patch.get_height()
        if h <= 0:
            continue
        ax.annotate(
            fmt.format(h),
            (patch.get_x() + patch.get_width() / 2, h),
            ha="center",
            va="bottom",
            xytext=(0, dy),
            textcoords="offset points",
            fontsize=8,
        )


def main() -> None:
    df = pd.read_csv(CSV_PATH, dtype={"noteId": str, "tweetId": str}, low_memory=False)
    text_col = "text"
    df["_e1"] = df["e1_spans"].apply(spans_from_cell)
    df["_e2"] = df["e2_spans"].apply(spans_from_cell)
    df["_hum"] = df["anotacao_humana_spans"].apply(spans_from_cell)
    df["_n1"] = df["_e1"].apply(len)
    df["_n2"] = df["_e2"].apply(len)
    df["_fs"] = [f1_strict(a, b) for a, b in zip(df["_e1"], df["_e2"])]
    df["_fr"] = [f1_relaxed(a, b) for a, b in zip(df["_e1"], df["_e2"])]
    df["_kp"] = [
        cohen_kappa_chars("" if is_missing(t) else str(t), a, b)
        for t, a, b in zip(df[text_col], df["_e1"], df["_e2"])
    ]

    cortes = {
        "A_completo": df,
        "B_sem_meta": df[~df["is_meta"].astype(bool)],
        "C_ambos_marcaram": df[(df["_n1"] > 0) & (df["_n2"] > 0)],
    }
    resumo = pd.DataFrame(
        [
            {
                "corte": name,
                "n": len(data),
                "F1_estrita": round(data["_fs"].mean(), 3),
                "F1_relaxada": round(data["_fr"].mean(), 3),
                "kappa_char": round(data["_kp"].mean(), 3),
            }
            for name, data in cortes.items()
        ]
    )

    pres_rows = []
    for name, data in cortes.items():
        for typ in LABELS:
            a = data["_e1"].apply(lambda spans: has_type(spans, typ)).values.astype(int)
            b = data["_e2"].apply(lambda spans: has_type(spans, typ)).values.astype(int)
            pres_rows.append(
                {
                    "corte": name,
                    "tipo": typ,
                    "cob_E1_%": round(100 * a.mean(), 1),
                    "cob_E2_%": round(100 * b.mean(), 1),
                    "kappa_presenca": round(kappa_presence(a, b), 3),
                }
            )
    pres_df = pd.DataFrame(pres_rows)

    cobertura_df = pd.DataFrame(
        [
            {
                "tipo": typ,
                "cob_E1_%": round(100 * df["_e1"].apply(lambda spans: has_type(spans, typ)).mean(), 1),
                "cob_E2_%": round(100 * df["_e2"].apply(lambda spans: has_type(spans, typ)).mean(), 1),
            }
            for typ in LABELS
        ]
    )

    anatomy_rows = []
    for col, name in [("_e1", "E1"), ("_e2", "E2")]:
        counts = Counter(span.type for spans in df[col] for span in spans)
        notes_with = int(df[col].apply(bool).sum())
        total = sum(counts.values())
        row = {
            "estrategia": name,
            **{typ: int(counts[typ]) for typ in LABELS},
            "notas_com_spans": notes_with,
            "spans_por_nota_com_span": round(total / notes_with, 2) if notes_with else 0.0,
            "spans_por_nota_total": round(total / len(df), 2),
        }
        anatomy_rows.append(row)
    anatomy_df = pd.DataFrame(anatomy_rows)

    gold_df = df[df["humano_span_bio_json"].notna()].copy()
    vsgold_rows = []
    for col, name in [("_e1", "E1"), ("_e2", "E2")]:
        fs, fr, ks = [], [], []
        for _, row in gold_df.iterrows():
            text = "" if is_missing(row[text_col]) else str(row[text_col])
            gold = row["_hum"]
            pred = row[col]
            fs.append(f1_strict(gold, pred))
            fr.append(f1_relaxed(gold, pred))
            ks.append(cohen_kappa_chars(text, gold, pred))
        vsgold_rows.append(
            {
                "estrategia": name,
                "n_notas": len(gold_df),
                "F1_estrita": round(float(np.mean(fs)), 3),
                "F1_relaxada": round(float(np.mean(fr)), 3),
                "kappa_vs_gold": round(float(np.mean(ks)), 3),
            }
        )
    vsgold_df = pd.DataFrame(vsgold_rows)

    pairs = [
        (load_json_list(a), load_json_list(b))
        for a, b in zip(df["e1_span_bio_json"], df["e2_span_bio_json"])
        if isinstance(a, str) and isinstance(b, str)
    ]
    pairs = [(a, b) for a, b in pairs if a is not None and b is not None]
    seq_e1e2 = entity_prf([p[0] for p in pairs], [p[1] for p in pairs])

    h = [load_json_list(v) for v in gold_df["humano_span_bio_json"]]
    e1 = [load_json_list(v) for v in gold_df["e1_span_bio_json"]]
    e2 = [load_json_list(v) for v in gold_df["e2_span_bio_json"]]
    seq_e1_h = entity_prf(h, e1)
    seq_e2_h = entity_prf(h, e2)

    cats = ["O"] + LABELS
    conf = pd.DataFrame(0, index=cats, columns=cats)
    for human_labels, e2_labels in zip(h, e2):
        for a, b in zip(human_labels, e2_labels):
            conf.loc[a.split("-")[-1], b.split("-")[-1]] += 1

    lat_rows = []
    for col, name in [("e1_ms", "E1"), ("e2_ms", "E2")]:
        s = pd.to_numeric(df[col], errors="coerce").dropna()
        lat_rows.append(
            {
                "estrategia": name,
                "mediana_ms": round(float(s.median()), 1),
                "media_ms": round(float(s.mean()), 1),
                "p95_ms": round(float(s.quantile(0.95)), 1),
                "p99_ms": round(float(s.quantile(0.99)), 1),
                "max_ms": round(float(s.max()), 1),
                "total_s": round(float(s.sum() / 1000), 1),
            }
        )
    latency_df = pd.DataFrame(lat_rows)

    align_counter = Counter()
    for value in df["e2_align_levels"].dropna():
        levels = parse_literal(value)
        if isinstance(levels, dict):
            align_counter.update({k: int(v) for k, v in levels.items()})
    align_df = pd.DataFrame(
        [
            {"nivel": k, "n": int(v), "pct": round(100 * v / sum(align_counter.values()), 2)}
            for k, v in align_counter.items()
        ]
    ).sort_values("nivel")

    err_count = int(df["e2_err"].notna().sum())
    status_df = (
        df["consenso"]
        .value_counts()
        .rename_axis("consenso")
        .reset_index(name="n")
        .assign(pct=lambda d: (100 * d["n"] / len(df)).round(1))
    )
    corpus_summary = {
        "n_notas": int(len(df)),
        "n_tweets": int(df["tweetId"].nunique()),
        "notas_por_tweet_media": round(float(len(df) / df["tweetId"].nunique()), 1),
        "notas_por_tweet_max": int(df.groupby("tweetId").size().max()),
        "n_gold": int(len(gold_df)),
        "n_meta": int(df["is_meta"].astype(bool).sum()),
        "pct_meta": round(float(100 * df["is_meta"].astype(bool).mean()), 1),
        "e2_err": err_count,
        "model": str(df["model"].dropna().mode().iloc[0]),
    }

    resumo.to_csv(OUT_DIR / "metricas_4_1_cortes.csv", index=False)
    pres_df.to_csv(OUT_DIR / "metricas_4_1_presenca.csv", index=False)
    cobertura_df.to_csv(OUT_DIR / "metricas_cobertura_tipo.csv", index=False)
    anatomy_df.to_csv(OUT_DIR / "metricas_anatomia_spans.csv", index=False)
    vsgold_df.to_csv(OUT_DIR / "metricas_4_5_vs_gold_com_kappa.csv", index=False)
    seq_e1e2.to_csv(OUT_DIR / "seqeval_e1_e2_corpus.csv", index=False)
    seq_e1_h.to_csv(OUT_DIR / "seqeval_e1_vs_humano.csv", index=False)
    seq_e2_h.to_csv(OUT_DIR / "seqeval_e2_vs_humano.csv", index=False)
    conf.to_csv(OUT_DIR / "matriz_confusao_token_humano_e2.csv")
    latency_df.to_csv(OUT_DIR / "metricas_latencia.csv", index=False)
    align_df.to_csv(OUT_DIR / "metricas_alinhamento_e2.csv", index=False)
    status_df.to_csv(OUT_DIR / "distribuicao_consenso.csv", index=False)
    (OUT_DIR / "resumo_reconciliado.json").write_text(
        json.dumps(corpus_summary, ensure_ascii=False, indent=2), encoding="utf-8"
    )

    plt.rcParams.update({"font.size": 10, "axes.spines.top": False, "axes.spines.right": False})

    fig, ax = plt.subplots(figsize=(7.2, 4.2))
    x = np.arange(len(resumo))
    width = 0.25
    for offset, col, color in [
        (-width, "F1_estrita", "#8c4f7a"),
        (0, "F1_relaxada", "#3b7f72"),
        (width, "kappa_char", "#b77b2f"),
    ]:
        ax.bar(x + offset, resumo[col], width, label=col.replace("_", " "), color=color)
    ax.set_xticks(x)
    ax.set_xticklabels(["A completo", "B sem meta", "C ambos"], rotation=0)
    ax.set_ylim(0, max(resumo[["F1_estrita", "F1_relaxada", "kappa_char"]].max()) + 0.12)
    ax.set_ylabel("média por nota")
    ax.set_title("Acordo E1 x E2 nos três cortes")
    ax.legend(frameon=False)
    save_bar_labels(ax)
    fig.tight_layout()
    fig.savefig(FIG_DIR / "fig_03_acordo_cortes.png", dpi=180)
    plt.close(fig)

    fig, ax = plt.subplots(figsize=(6.8, 4.2))
    x = np.arange(len(vsgold_df))
    width = 0.28
    ax.bar(x - width / 2, vsgold_df["F1_estrita"], width, label="F1 estrita", color="#8c4f7a")
    ax.bar(x + width / 2, vsgold_df["F1_relaxada"], width, label="F1 relaxada", color="#3b7f72")
    ax.scatter(x, vsgold_df["kappa_vs_gold"], s=80, color="#222222", label="kappa vs gold", zorder=3)
    ax.set_xticks(x)
    ax.set_xticklabels(vsgold_df["estrategia"])
    ax.set_ylim(0, max(vsgold_df[["F1_estrita", "F1_relaxada", "kappa_vs_gold"]].max()) + 0.12)
    ax.set_ylabel("média nas 60 notas")
    ax.set_title("Desempenho contra gold humano")
    ax.legend(frameon=False)
    save_bar_labels(ax)
    fig.tight_layout()
    fig.savefig(FIG_DIR / "fig_04_desempenho_gold.png", dpi=180)
    plt.close(fig)

    fig, ax = plt.subplots(figsize=(7.2, 4.2))
    x = np.arange(len(LABELS))
    width = 0.35
    ax.bar(x - width / 2, cobertura_df["cob_E1_%"], width, label="E1", color=COLORS["E1"])
    ax.bar(x + width / 2, cobertura_df["cob_E2_%"], width, label="E2", color=COLORS["E2"])
    ax.set_xticks(x)
    ax.set_xticklabels(LABELS, rotation=15)
    ax.set_ylabel("% de notas")
    ax.set_title("Cobertura por tipo argumentativo")
    ax.legend(frameon=False)
    save_bar_labels(ax, fmt="{:.1f}")
    fig.tight_layout()
    fig.savefig(FIG_DIR / "fig_05_cobertura_tipo.png", dpi=180)
    plt.close(fig)

    fig, ax = plt.subplots(figsize=(7.2, 4.2))
    x = np.arange(len(LABELS))
    width = 0.35
    ax.bar(x - width / 2, anatomy_df.loc[anatomy_df["estrategia"] == "E1", LABELS].iloc[0], width, label="E1", color=COLORS["E1"])
    ax.bar(x + width / 2, anatomy_df.loc[anatomy_df["estrategia"] == "E2", LABELS].iloc[0], width, label="E2", color=COLORS["E2"])
    ax.set_xticks(x)
    ax.set_xticklabels(LABELS, rotation=15)
    ax.set_ylabel("número de spans")
    ax.set_title("Anatomia argumentativa no corpus")
    ax.legend(frameon=False)
    save_bar_labels(ax, fmt="{:.0f}")
    fig.tight_layout()
    fig.savefig(FIG_DIR / "fig_02_anatomia_spans.png", dpi=180)
    plt.close(fig)

    seq_micro = pd.DataFrame(
        [
            {"comparacao": "E1 x E2", **seq_e1e2.loc[seq_e1e2["escopo"] == "micro"].iloc[0].to_dict()},
            {"comparacao": "E1 vs humano", **seq_e1_h.loc[seq_e1_h["escopo"] == "micro"].iloc[0].to_dict()},
            {"comparacao": "E2 vs humano", **seq_e2_h.loc[seq_e2_h["escopo"] == "micro"].iloc[0].to_dict()},
        ]
    )
    fig, ax = plt.subplots(figsize=(7.2, 4.2))
    x = np.arange(len(seq_micro))
    width = 0.25
    for offset, col, color in [(-width, "P", "#5f6f93"), (0, "R", "#3b7f72"), (width, "F1", "#c46a3b")]:
        ax.bar(x + offset, seq_micro[col], width, label=col, color=color)
    ax.set_xticks(x)
    ax.set_xticklabels(seq_micro["comparacao"])
    ax.set_ylim(0, max(seq_micro[["P", "R", "F1"]].max()) + 0.12)
    ax.set_ylabel("micro")
    ax.set_title("Avaliação token-level BIO")
    ax.legend(frameon=False)
    save_bar_labels(ax)
    fig.tight_layout()
    fig.savefig(FIG_DIR / "fig_06_seqeval_bio.png", dpi=180)
    plt.close(fig)

    fig, ax = plt.subplots(figsize=(6.8, 4.2))
    lat_plot = latency_df.copy()
    lat_plot["mediana_s"] = lat_plot["mediana_ms"] / 1000
    ax.bar(lat_plot["estrategia"], lat_plot["mediana_s"], color=[COLORS["E1"], COLORS["E2"]])
    ax.set_yscale("log")
    ax.set_ylabel("segundos por nota (escala log)")
    ax.set_title("Latência mediana por estratégia")
    for idx, value in enumerate(lat_plot["mediana_s"]):
        ax.annotate(f"{value:.4g}s", (idx, value), ha="center", va="bottom", xytext=(0, 4), textcoords="offset points")
    fig.tight_layout()
    fig.savefig(FIG_DIR / "fig_operacional_latencia.png", dpi=180)
    plt.close(fig)

    ent_path = ROOT / "explorador-argumentos" / "data_entidades.js"
    if ent_path.exists():
        raw = ent_path.read_text(encoding="utf-8")
        payload = raw.split("const ENT =", 1)[1].strip().rstrip(";")
        ent = json.loads(payload)
        lente = pd.DataFrame(ent["lente"]).head(12)
        mat = lente.set_index("tipo")[LABELS]
        mat_pct = mat.div(mat.sum(axis=1), axis=0).fillna(0) * 100
        fig, ax = plt.subplots(figsize=(8.4, 5.4))
        im = ax.imshow(mat_pct.values, aspect="auto", cmap="YlGnBu", vmin=0, vmax=100)
        ax.set_xticks(np.arange(len(LABELS)))
        ax.set_xticklabels(LABELS, rotation=20)
        ax.set_yticks(np.arange(len(mat_pct.index)))
        ax.set_yticklabels(mat_pct.index)
        ax.set_title("Tipo de entidade x papel argumentativo (E2)")
        for i in range(mat_pct.shape[0]):
            for j in range(mat_pct.shape[1]):
                val = mat_pct.iloc[i, j]
                ax.text(j, i, f"{val:.0f}", ha="center", va="center", color="black" if val < 55 else "white", fontsize=8)
        cbar = fig.colorbar(im, ax=ax)
        cbar.set_label("% dentro do tipo de entidade")
        fig.tight_layout()
        fig.savefig(FIG_DIR / "fig_07_entidade_papel.png", dpi=180)
        plt.close(fig)

    print("CORPUS", json.dumps(corpus_summary, ensure_ascii=False))
    print("CORTES")
    print(resumo.to_string(index=False))
    print("VS_GOLD")
    print(vsgold_df.to_string(index=False))
    print("COBERTURA")
    print(cobertura_df.to_string(index=False))
    print("ANATOMIA")
    print(anatomy_df.to_string(index=False))
    print("SEQ_E1E2")
    print(seq_e1e2.to_string(index=False))
    print("SEQ_E1_H")
    print(seq_e1_h.to_string(index=False))
    print("SEQ_E2_H")
    print(seq_e2_h.to_string(index=False))
    print("LATENCIA")
    print(latency_df.to_string(index=False))
    print("ALINHAMENTO")
    print(align_df.to_string(index=False))
    print("FIG_DIR", FIG_DIR)


if __name__ == "__main__":
    main()
