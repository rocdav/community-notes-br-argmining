# -*- coding: utf-8 -*-
"""_build_conjunto.py — lê o dataset do experimento (1901 notas) e escreve
data_conjunto.js (const CONJUNTO = {...}) com AGREGADOS pré-computados para a
página inicial "Conjunto". Não embute as linhas; só os números das visões.

Uso:  python _build_conjunto.py [caminho_do_csv]
Padrão do CSV: ../dataset_anotado_final_com_bio.csv
"""
import sys, os, re, json, collections
import pandas as pd

CSV = sys.argv[1] if len(sys.argv) > 1 else os.path.join("..", "data", "dataset_anotado_final_com_bio.csv")
OUT = "data_conjunto.js"
TIPOS = ["CLAIM", "EVIDENCIA", "FONTE", "QUALIFICADOR"]
RX_TIPO = re.compile(r"'type':\s*'([A-Z]+)'")   # spans vêm como repr (sem vírgulas); regex é robusto
RX_LV = re.compile(r"'(\w+)':\s*(\d+)")          # e2_align_levels é dict-repr


def span_types(v):
    return RX_TIPO.findall(v) if isinstance(v, str) else []


def histogram(values, edges):
    """conta valores em faixas [edges[i], edges[i+1]); última faixa é inclusiva.
    Devolve {labels, counts} pronto para barras."""
    n = len(edges) - 1
    counts = [0] * n
    for v in values:
        if v is None:
            continue
        if v < edges[0]:
            counts[0] += 1
            continue
        for i in range(n):
            if v < edges[i + 1] or i == n - 1:
                counts[i] += 1
                break
    g = lambda x: ("%g" % x).replace(".", ",")
    labels = [g(edges[i]) + "–" + g(edges[i + 1]) for i in range(n)]
    return {"labels": labels, "counts": [int(c) for c in counts]}


def main():
    df = pd.read_csv(CSV)
    n = len(df)
    nonmeta = df[~df["is_meta"]]

    # --- consenso (resultado/helpfulness) ---
    cc = df["consenso"].value_counts()
    consenso = [{"label": k, "n": int(v), "pct": round(100 * v / n, 1)} for k, v in cc.items()]

    # --- macrotemas ---
    tc = df["macrotheme_label"].value_counts(dropna=True)
    temas = [{"tema": str(k), "n": int(v)} for k, v in tc.items()]
    sem_tema = int(df["macrotheme_label"].isna().sum())

    # --- anatomia argumentativa (totais de span no corpus) ---
    def tally(col):
        c = collections.Counter()
        notas = 0
        for v in df[col]:
            ts = span_types(v)
            if ts:
                notas += 1
            c.update(ts)
        return {t: int(c.get(t, 0)) for t in TIPOS}, notas
    def anat(col):
        tipos, notas = tally(col)
        return {"tipos": tipos, "notas_com": notas,
                "por_nota": round(sum(len(span_types(v)) for v in nonmeta[col]) / len(nonmeta), 2)}
    anatomia = {"E1": anat("e1_spans"), "E2": anat("e2_spans")}
    if "e2b_spans" in df.columns and df["e2b_spans"].notna().any():
        anatomia["E2b"] = anat("e2b_spans")

    # --- meta-notas ---
    mr = df[df["is_meta"]]["meta_reason"].value_counts(dropna=True)
    meta = {
        "n": int(df["is_meta"].sum()),
        "pct": round(100 * df["is_meta"].sum() / n, 1),
        "motivos": [{"motivo": str(k), "n": int(v)} for k, v in mr.items()],
    }

    # --- custo / latência ---
    # custo E1: fim-a-fim (parse+regras) quando a coluna existe (v2.1); senao so regras
    e1_col = "e1_total_ms" if "e1_total_ms" in df.columns and df["e1_total_ms"].notna().any() else "e1_ms"
    custo = {
        "e1_ms_media": round(float(df[e1_col].mean()), 1),
        "e1_medida": "fim-a-fim (parse+regras)" if e1_col == "e1_total_ms" else "so regras",
        "e2_ms_media": round(float(df["e2_ms"].mean()), 0),
        "e2_ms_mediana": round(float(df["e2_ms"].median()), 0),
        "e2_ms_max": round(float(df["e2_ms"].max()), 0),
        "razao": round(float(df["e2_ms"].mean() / df[e1_col].mean()), 0),
    }
    # E2b: LLM de pesos abertos rodando localmente (latência não comparável à do remoto — depende do hardware)
    if "e2b_ms" in df.columns and df["e2b_ms"].notna().any():
        custo["e2b_ms_media"] = round(float(df["e2b_ms"].mean()), 0)
        custo["e2b_ms_mediana"] = round(float(df["e2b_ms"].median()), 0)
        custo["e2b_modelo"] = "Qwen3.6-35B-A3B (local)"

    # --- acordo E1×E2 (médias por nota) ---
    acordo = {
        "f1_strict": round(float(df["f1_strict"].mean()), 3),
        "f1_relaxed": round(float(df["f1_relaxed"].mean()), 3),
        "kappa": round(float(df["kappa"].mean()), 3),
    }

    # --- assinatura léxica/sintática do corpus (de sintaxe_json: árvore UD) ---
    upos = collections.Counter()
    lemas = {"VERB": collections.Counter(), "NOUN": collections.Counter(), "ADJ": collections.Counter()}
    toklen = []
    for v in df["sintaxe_json"]:
        try:
            arr = json.loads(v)
        except Exception:
            continue
        toklen.append(len(arr))
        for t in arr:
            p = t.get("upos")
            upos[p] += 1
            if p in lemas:
                lem = (t.get("lemma") or "").lower().strip()
                if len(lem) >= 3 and lem.isalpha():
                    lemas[p][lem] += 1
    lexico = {
        "upos": [{"pos": k, "n": int(n)} for k, n in upos.most_common() if k],
        "lemas": {k: [[w, int(n)] for w, n in c.most_common(20)] for k, c in lemas.items()},
        "tokens_media": round(sum(toklen) / max(1, len(toklen)), 1),
    }

    # --- distribuições (histogramas) ---
    hist = {
        "f1_relaxed": histogram(df["f1_relaxed"].tolist(), [i / 10 for i in range(11)]),
        "kappa": histogram(df["kappa"].tolist(), [-0.6, -0.4, -0.2, 0, 0.2, 0.4, 0.6, 0.8, 1.0]),
        "latencia_s": histogram((df["e2_ms"] / 1000).tolist(), [0, 2, 4, 6, 8, 10, 12, 14, 28]),
        "tokens": histogram(toklen, [0, 10, 20, 30, 40, 50, 60, 75]),
    }

    # --- tema × resultado (consenso), top temas, contagens por consenso ---
    cols_cons = ["CRH", "CRNH", "NMR", "Outro"]
    ct = pd.crosstab(df["macrotheme_label"], df["consenso"])
    top_t = df["macrotheme_label"].value_counts(dropna=True).head(10).index.tolist()
    tc_rows = []
    for t in top_t:
        r = {"tema": str(t)}
        tot = 0
        for c in cols_cons:
            val = int(ct.loc[t, c]) if (t in ct.index and c in ct.columns) else 0
            r[c] = val
            tot += val
        r["total"] = tot
        tc_rows.append(r)
    tema_consenso = {"cols": cols_cons, "rows": tc_rows}

    # --- qualidade de alinhamento dos spans do E2 ---
    lv = collections.Counter()
    notas_zero = 0
    for v in df["e2_align_levels"]:
        if not isinstance(v, str):
            continue
        d = {k: int(x) for k, x in RX_LV.findall(v)}
        if sum(d.values()) == 0:
            notas_zero += 1
        lv.update(d)
    ordem_lv = ["exact", "normalized", "unicode_normalized", "regex", "failed"]
    alinhamento = {
        "niveis": [{"nivel": k, "n": int(lv[k])} for k in ordem_lv if k in lv],
        "notas_zero": int(notas_zero),
        "err": int(df["e2_err"].notna().sum()),
    }

    meta_geral = {
        "n_notas": int(n),
        "n_tweets": int(df["tweetId"].nunique()),
        "notas_por_tweet_media": round(float(df.groupby("tweetId").size().mean()), 1),
        "notas_por_tweet_max": int(df.groupby("tweetId").size().max()),
        "n_gold": int(df["anotacao_humana_status"].eq("selecionada_para_anotacao").sum()),
        "modelo": str(df["model"].iloc[0]),
    }

    CONJUNTO = {
        "geral": meta_geral,
        "consenso": consenso,
        "temas": temas,
        "sem_tema": sem_tema,
        "anatomia": anatomia,
        "meta": meta,
        "custo": custo,
        "acordo": acordo,
        "lexico": lexico,
        "hist": hist,
        "tema_consenso": tema_consenso,
        "alinhamento": alinhamento,
    }

    payload = json.dumps(CONJUNTO, ensure_ascii=False)
    with open(OUT, "w", encoding="utf-8") as f:
        f.write("// agregados pré-computados do corpus do experimento (1901 notas).\n")
        f.write("// Gerado por _build_conjunto.py a partir de dataset_anotado_final_com_bio.csv — não editar à mão.\n")
        f.write("const CONJUNTO = " + payload + ";\n")
    print("escrito", OUT, "(", len(payload), "bytes de JSON )")
    print(json.dumps(CONJUNTO, ensure_ascii=False, indent=1)[:1500])


if __name__ == "__main__":
    main()
