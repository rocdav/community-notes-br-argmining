# -*- coding: utf-8 -*-
"""_build_bio.py — visão BIO (rotulagem de sequência) nível de token.

Para as 60 notas com gold humano (que têm E1, E2 e Humano), extrai do CSV a
tokenização BIO já pronta (offsets + tags B-/I-/O das três estratégias) e escreve
data_bio.js (const BIO). Só pandas, sem rede.

Uso:  python _build_bio.py
"""
import os, json
import pandas as pd

CSV = os.path.join("..", "dataset_anotado_final_com_bio.csv")
OUT = "data_bio.js"


def main():
    df = pd.read_csv(CSV, usecols=["noteId", "text", "anotacao_humana_status", "consenso",
                                   "macrotheme_label", "bio_offsets_json",
                                   "e1_span_bio_json", "e2_span_bio_json", "humano_span_bio_json"])
    gold = df[df["anotacao_humana_status"] == "selecionada_para_anotacao"].copy()
    byId, ordem, desalinhados = {}, [], 0
    for _, r in gold.sort_values(["consenso", "noteId"]).iterrows():
        nid = str(r["noteId"])
        try:
            off = json.loads(r["bio_offsets_json"])
            E1 = json.loads(r["e1_span_bio_json"]); E2 = json.loads(r["e2_span_bio_json"])
            HU = json.loads(r["humano_span_bio_json"])
        except Exception:
            continue
        n = len(off)
        if not (len(E1) == len(E2) == len(HU) == n):
            desalinhados += 1
            continue
        byId[nid] = {
            "text": r["text"], "off": off, "E1": E1, "E2": E2, "HUMANO": HU,
            "c": r["consenso"], "m": None if pd.isna(r["macrotheme_label"]) else str(r["macrotheme_label"]),
        }
        ordem.append(nid)

    BIO = {"ordem": ordem, "byId": byId}
    with open(OUT, "w", encoding="utf-8") as f:
        f.write("// rotulagem BIO (nível de token) das 60 notas com gold — E1/E2/Humano. Gerado por _build_bio.py.\n")
        f.write("const BIO = " + json.dumps(BIO, ensure_ascii=False) + ";\n")
    print("notas BIO:", len(ordem), "| desalinhadas (puladas):", desalinhados,
          "| arquivo:", os.path.getsize(OUT) // 1024, "KB")
    if ordem:
        ex = byId[ordem[0]]
        print("amostra", ordem[0], "tokens:", len(ex["off"]),
              "| E2 tags exemplo:", ex["E2"][:8])


if __name__ == "__main__":
    main()
