# -*- coding: utf-8 -*-
"""_build_entidades.py — Navegador de entidades em escala de corpus.

Junta a tabela de entidades GLiNER do dataset publicado histlearn/notas-comunidade-ptbr
(config `entities`, baixada 1× do HF e cacheada localmente) com as nossas 1901 notas,
por `noteId`. Para cada entidade calcula, no nosso recorte:
  - tipo (GLiNER) e nº de notas / ocorrências;
  - papel argumentativo: cruzando a posição da entidade com os spans do E2 (nosso dado);
  - agência: papel sintático (deprel da cabeça da entidade) em sujeito × objeto × outro;
  - nuvem léxica distintiva por classe (Dunning LL) das notas onde aparece.
Escreve:
  - data_entidades.js  (const ENT = {...})   — lente por tipo + perfis de entidade
  - data_notas.js       (const NOTAS = {...})  — texto + spans E2 do corpus p/ drill-down

Uso:  python _build_entidades.py
"""
import os, re, json, math, collections
import pandas as pd
from huggingface_hub import hf_hub_download

CSV = os.path.join("..", "dataset_anotado_final_com_bio.csv")
OUT_ENT = "data_entidades.js"
OUT_NOTAS = "data_notas.js"
TIPOS = ["CLAIM", "EVIDENCIA", "FONTE", "QUALIFICADOR"]
RX_SPAN = re.compile(r"'start':\s*(\d+),\s*'end':\s*(\d+),\s*'type':\s*'([A-Z]+)'")

# tipos que NÃO viram perfil navegável (URLs e regex de data/valor/lei) — seguem na lente
SEM_PERFIL = {"URL_DOMINIO", "DATA", "ESTATISTICA", "VALOR_MONETARIO", "LEI_NORMA"}
# canônicos genéricos/ruído a descartar dos perfis
RUIDO = {"nnn", "bbb", "nn", "autor", "autora", "pessoa", "pessoas", "jornalista", "usuário", "usuario",
         "user", "conta", "perfil", "gente", "ninguém", "ninguem", "alguém", "alguem", "fulano", "midia", "mídia"}
AGENTE = {"nsubj", "nsubj:outer", "csubj"}
OBJETO = {"obj", "iobj", "obl", "obl:arg", "obl:agent", "nsubj:pass"}


def parse_e2(v):
    return [(int(s), int(e), t) for s, e, t in RX_SPAN.findall(v)] if isinstance(v, str) else []


def dunning(a, b, c, d):
    """log-likelihood G² (1 g.l.) para a (lema na entidade) vs b (no resto)."""
    if a <= 0 or c <= 0 or d <= 0:
        return 0.0
    N = c + d
    e1 = c * (a + b) / N
    e2 = d * (a + b) / N
    ll = 0.0
    if a > 0 and e1 > 0:
        ll += a * math.log(a / e1)
    if b > 0 and e2 > 0:
        ll += b * math.log(b / e2)
    ll *= 2
    return ll if (a / c) > ((a + b) / N) else 0.0   # só sobre-representação


def display_name(canon):
    c = canon.strip()
    if c.islower():
        return " ".join(w.capitalize() for w in c.split())
    return c


def main():
    # ---- nossas notas: texto, spans E2, sintaxe, metadados ----
    df = pd.read_csv(CSV, usecols=["noteId", "text", "e2_spans", "sintaxe_json",
                                   "consenso", "macrotheme_label", "is_meta"])
    TEXT, E2, SX, CONS, MACRO, META = {}, {}, {}, {}, {}, {}
    LEMBAG = {}                       # nid -> {POS: Counter(lema)}
    CORP = {p: collections.Counter() for p in ("VERB", "NOUN", "ADJ")}
    for _, r in df.iterrows():
        nid = str(r["noteId"])
        TEXT[nid] = r["text"] if isinstance(r["text"], str) else ""
        E2[nid] = parse_e2(r["e2_spans"])
        CONS[nid] = r["consenso"]
        MACRO[nid] = None if pd.isna(r["macrotheme_label"]) else str(r["macrotheme_label"])
        META[nid] = bool(r["is_meta"])
        try:
            toks = json.loads(r["sintaxe_json"])
        except Exception:
            toks = []
        SX[nid] = toks
        bag = {p: collections.Counter() for p in ("VERB", "NOUN", "ADJ")}
        for t in toks:
            p = t.get("upos")
            if p in bag:
                lem = (t.get("lemma") or "").lower().strip()
                if len(lem) >= 3 and lem.isalpha():
                    bag[p][lem] += 1
                    CORP[p][lem] += 1
        LEMBAG[nid] = bag
    CORP_TOT = {p: sum(CORP[p].values()) for p in CORP}
    ours = set(TEXT)

    # ---- tabela de entidades do HF, filtrada ao nosso recorte ----
    pq = hf_hub_download(repo_id="histlearn/notas-comunidade-ptbr", repo_type="dataset",
                         revision="refs/convert/parquet", filename="entities/train/0000.parquet")
    ent = pd.read_parquet(pq, engine="fastparquet",
                          columns=["noteId", "texto_entidade", "texto_canonico", "tipo_entidade"])
    ent["noteId"] = ent["noteId"].astype(str)
    sub = ent[ent["noteId"].isin(ours)]

    # ---- agrega por entidade canônica ----
    AG = collections.defaultdict(lambda: {
        "tipo": collections.Counter(), "notes": set(), "freq": 0,
        "papel": collections.Counter(), "agency": collections.Counter(), "ex": []})
    LENTE = collections.defaultdict(lambda: {"papel": collections.Counter(),
                                             "total": 0, "ents": set()})
    toks_by_i = {}
    for _, r in sub.iterrows():
        nid = r["noteId"]
        if nid not in TEXT:
            continue
        surf = str(r["texto_entidade"]); canon = str(r["texto_canonico"]); tipo = str(r["tipo_entidade"])
        rec = AG[canon]
        rec["tipo"][tipo] += 1; rec["notes"].add(nid); rec["freq"] += 1
        L = LENTE[tipo]; L["total"] += 1; L["ents"].add(canon)
        loc = TEXT[nid].lower().find(surf.lower())
        role = "O"
        if loc >= 0:
            a0, a1 = loc, loc + len(surf)
            for s, e, t in E2[nid]:
                if s < a1 and e > a0:
                    role = t; break
            # agência: cabeça sintática da entidade
            toks = SX[nid]
            idxs = [tk["i"] for tk in toks if tk["start"] < a1 and tk["end"] > a0]
            if idxs:
                idxset = set(idxs)
                head = next((tk for tk in toks if tk["i"] in idxset and tk["head"] not in idxset), None)
                if head is None:
                    head = next((tk for tk in toks if tk["i"] == idxs[0]), None)
                if head:
                    dep = head["deprel"]
                    rec["agency"]["sujeito" if dep in AGENTE else "objeto" if dep in OBJETO else "outro"] += 1
            if len(rec["ex"]) < 6:
                rec["ex"].append({"n": nid, "s": surf})
        rec["papel"][role] += 1
        L["papel"][role] += 1

    # ---- monta perfis e lente ----
    entidades = {}
    por_tipo = collections.defaultdict(list)
    refs = set()
    for canon, rec in AG.items():
        tipo = rec["tipo"].most_common(1)[0][0]
        if tipo in SEM_PERFIL or canon.lower() in RUIDO:
            continue
        nnotas = len(rec["notes"])
        if nnotas < 3:
            continue
        name = display_name(canon)
        if name in entidades:                      # colisão de exibição: fica com o de mais notas
            if nnotas <= entidades[name]["n_notas"]:
                continue
        papel = {t: int(rec["papel"][t]) for t in TIPOS}
        # nuvens de classes de palavras p/ TODA entidade (≥3 notas): Dunning onde houver
        # sinal; fallback p/ frequência nas pequenas/genéricas. Escala sem custo extra.
        ent_bag = {p: collections.Counter() for p in ("VERB", "NOUN", "ADJ")}
        for nid in rec["notes"]:
            for p in ent_bag:
                ent_bag[p].update(LEMBAG[nid][p])
        clouds, sig = {}, 0
        for p in ("VERB", "NOUN", "ADJ"):
            tot_e = sum(ent_bag[p].values())
            arr = []
            for lem, a in ent_bag[p].items():
                if a < 2:
                    continue
                ll = dunning(a, CORP[p][lem] - a, tot_e, CORP_TOT[p] - tot_e)
                if ll >= 3.84:
                    arr.append([lem, round(ll, 1)])
            arr.sort(key=lambda x: -x[1])
            clouds[p] = arr[:8]
            sig += len(arr)
        kind = "dunning"
        if sig == 0:                       # nada distintivo: cai p/ mais frequentes
            kind = "freq"
            for p in ("VERB", "NOUN", "ADJ"):
                clouds[p] = [[lem, int(a)] for lem, a in ent_bag[p].most_common() if a >= 2][:8]
        if not any(clouds[p] for p in ("VERB", "NOUN", "ADJ")):
            clouds, kind = {}, None
        ex = rec["ex"][:5]
        for o in ex:
            refs.add(o["n"])
        entidades[name] = {
            "tipo": tipo, "n_notas": nnotas, "freq": int(rec["freq"]),
            "papel": papel, "fora": int(rec["papel"]["O"]),
            "agency": {k: int(rec["agency"][k]) for k in ("sujeito", "objeto", "outro")},
            "clouds": clouds, "clouds_kind": kind, "ex": ex,
        }
        por_tipo[tipo].append(name)

    for t in por_tipo:
        por_tipo[t].sort(key=lambda nm: -entidades[nm]["n_notas"])

    lente = []
    for tipo, L in LENTE.items():
        row = {"tipo": tipo, "total": int(L["total"]), "n_ent": len(L["ents"]),
               "O": int(L["papel"]["O"])}
        for t in TIPOS:
            row[t] = int(L["papel"][t])
        lente.append(row)
    lente.sort(key=lambda r: -r["total"])

    ENT = {
        "lente": lente,
        "tipos_ordem": [r["tipo"] for r in lente],
        "tipos_perfil": [r["tipo"] for r in lente if r["tipo"] not in SEM_PERFIL and por_tipo.get(r["tipo"])],
        "por_tipo": {k: v for k, v in por_tipo.items()},
        "entidades": entidades,
        "n_entidades": len(entidades),
    }

    # ---- store de notas p/ drill-down (só as referenciadas pelas ocorrências) ----
    NOTAS = {}
    for nid in refs:
        NOTAS[nid] = {"t": TEXT[nid], "e2": [[s, e, t] for s, e, t in E2[nid]],
                      "c": CONS[nid], "m": MACRO[nid]}

    with open(OUT_NOTAS, "w", encoding="utf-8") as f:
        f.write("// texto + spans E2 das notas referenciadas pelo Navegador de entidades (drill-down).\n")
        f.write("const NOTAS = " + json.dumps(NOTAS, ensure_ascii=False) + ";\n")
    with open(OUT_ENT, "w", encoding="utf-8") as f:
        f.write("// Navegador de entidades — lente por tipo + perfis. Gerado por _build_entidades.py.\n")
        f.write("const ENT = " + json.dumps(ENT, ensure_ascii=False) + ";\n")

    print("entidades navegáveis:", len(entidades), "| tipos com perfil:", len(ENT["tipos_perfil"]),
          "| notas no store:", len(NOTAS))
    print("data_entidades.js:", os.path.getsize(OUT_ENT) // 1024, "KB | data_notas.js:", os.path.getsize(OUT_NOTAS) // 1024, "KB")
    print("tipos_perfil:", ENT["tipos_perfil"])
    print("amostra:", {k: {"tipo": entidades[k]["tipo"], "n": entidades[k]["n_notas"],
                           "ag": entidades[k]["agency"]} for k in list(entidades)[:6]})


if __name__ == "__main__":
    main()
