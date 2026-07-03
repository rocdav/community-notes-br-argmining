# -*- coding: utf-8 -*-
"""_refresh_data.py — atualiza in-place as chaves NUMÉRICAS e os spans de data.js
(const DATA) a partir do CSV canônico, sem tocar nas chaves derivadas de
entidades/Dunning (dunning, lente, perfis, labels, notes_full.E2).

Atualiza: notas[*].E1 / notas[*].HUMANO (spans v2.1 + gold vigente),
vs_gold (E1/E2/E2b, leitura completa), cortes (A/B/C) e cobertura (com E2b).

Uso:  python _refresh_data.py [caminho_do_csv]
Padrão: ../data/dataset_anotado_final_com_bio.csv
"""
import json
import os
import re
import sys

import pandas as pd

CSV = sys.argv[1] if len(sys.argv) > 1 else os.path.join("..", "data", "dataset_anotado_final_com_bio.csv")
DATA_JS = "data.js"
TIPOS = ["CLAIM", "EVIDENCIA", "FONTE", "QUALIFICADOR"]

RX_BLOCO = re.compile(r"\{[^{}]*\}")
RX_START = re.compile(r"'start':\s*(\d+)")
RX_END = re.compile(r"'end':\s*(\d+)")
RX_TYPE = re.compile(r"'type':\s*'([A-Z]+)'")


def parse_spans(cell):
    """Parseia colunas de span do CSV (repr de lista/array; ordem de campos livre)."""
    out = []
    if not isinstance(cell, str):
        return out
    for bloco in RX_BLOCO.findall(cell):
        s, e, t = RX_START.search(bloco), RX_END.search(bloco), RX_TYPE.search(bloco)
        if s and e and t and t.group(1) in TIPOS:
            out.append((int(s.group(1)), int(e.group(1)), t.group(1)))
    return out


def f1_strict(g, p):
    gs, ps = set(g), set(p)
    tp = len(gs & ps)
    if not tp:
        return 0.0 if (gs or ps) else 1.0
    P, R = tp / len(ps), tp / len(gs)
    return 2 * P * R / (P + R)


def f1_relaxed(g, p, mr=0.5):
    mg, mp = set(), set()
    for i, a in enumerate(g):
        for j, b in enumerate(p):
            if a[2] != b[2] or j in mp:
                continue
            ov = max(0, min(a[1], b[1]) - max(a[0], b[0]))
            if ov / max(a[1] - a[0], b[1] - b[0], 1) >= mr:
                mg.add(i)
                mp.add(j)
                break
    tp = len(mg)
    if not tp:
        return 0.0 if (g or p) else 1.0
    P = tp / len(p) if p else 0.0
    R = tp / len(g) if g else 0.0
    return 2 * P * R / (P + R) if P + R else 0.0


def compact(spans):
    return [{"s": s, "e": e, "t": t} for s, e, t in sorted(spans)]


df = pd.read_csv(CSV, dtype={"noteId": str, "tweetId": str})
df["_e1"] = df["e1_spans"].map(parse_spans)
df["_e2"] = df["e2_spans"].map(parse_spans)
df["_e2b"] = df["e2b_spans"].map(parse_spans) if "e2b_spans" in df.columns else [[] for _ in range(len(df))]
df["_gold"] = df["anotacao_humana_spans"].map(parse_spans)
anotadas = df[df["anotacao_humana_status"] == "selecionada_para_anotacao"]
gold_por_id = dict(zip(anotadas["noteId"], anotadas["_gold"]))
print(f"CSV: {len(df)} notas | anotadas: {len(anotadas)} | e1_version: {df.get('e1_version', pd.Series(['?'])).iloc[0]}")

src = open(DATA_JS, encoding="utf-8").read()
prefixo = src[: src.index("=") + 1]
data = json.loads(src[src.index("=") + 1 :].rstrip().rstrip(";"))

# --- notas (60): spans E1 (v2.1) e HUMANO (gold vigente) ---
e1_por_id = dict(zip(df["noteId"], df["_e1"]))
trocadas = 0
for nota in data["notas"]:
    nid = str(nota["id"])
    if nid in e1_por_id:
        nota["E1"] = compact(e1_por_id[nid])
    if nid in gold_por_id:
        nota["HUMANO"] = compact(gold_por_id[nid])
        trocadas += 1
print(f"notas atualizadas: {len(data['notas'])} (gold trocado em {trocadas})")

# --- vs_gold (leitura completa; sistemas) ---
estrategias = [("E1", "_e1"), ("E2", "_e2")] + ([("E2b", "_e2b")] if anotadas["_e2b"].map(len).sum() else [])
vs_gold = []
for nome, col in estrategias:
    fs = [f1_strict(g, p) for g, p in zip(anotadas["_gold"], anotadas[col])]
    fr = [f1_relaxed(g, p) for g, p in zip(anotadas["_gold"], anotadas[col])]
    vs_gold.append({"estrategia": nome,
                    "F1_estrita": round(sum(fs) / len(fs), 3),
                    "F1_relaxada": round(sum(fr) / len(fr), 3)})
data["vs_gold"] = vs_gold
print("vs_gold:", vs_gold)

# --- cortes A/B/C (métricas por nota já vêm no CSV: E1×E2) ---
n1 = df["_e1"].map(len)
n2 = df["_e2"].map(len)
cortes_def = [("A — completo", df.index == df.index),
              ("B — sem meta", ~df["is_meta"].astype(bool)),
              ("C — ambas produziram spans", (n1 > 0) & (n2 > 0))]
data["cortes"] = [{"corte": rotulo, "n": int(m.sum()),
                   "F1_estrita": round(float(df.loc[m, "f1_strict"].mean()), 3),
                   "F1_relaxada": round(float(df.loc[m, "f1_relaxed"].mean()), 3),
                   "kappa_char": round(float(df.loc[m, "kappa"].mean()), 3)}
                  for rotulo, m in cortes_def]
print("cortes:", data["cortes"])

# --- cobertura por tipo (presença em % das notas) ---
data["cobertura"] = [dict({"tipo": t,
                           "E1": round(100 * df["_e1"].map(lambda ss: any(x[2] == t for x in ss)).mean(), 1),
                           "E2": round(100 * df["_e2"].map(lambda ss: any(x[2] == t for x in ss)).mean(), 1)},
                          **({"E2b": round(100 * df["_e2b"].map(lambda ss: any(x[2] == t for x in ss)).mean(), 1)}
                             if anotadas["_e2b"].map(len).sum() else {}))
                     for t in TIPOS]
print("cobertura:", data["cobertura"])

with open(DATA_JS, "w", encoding="utf-8", newline="\n") as f:
    f.write(prefixo + " " + json.dumps(data, ensure_ascii=False) + ";\n")
print(f"gravado {DATA_JS} ({os.path.getsize(DATA_JS)//1024} KB)")
