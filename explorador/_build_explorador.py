# -*- coding: utf-8 -*-
"""Gera o explorador estatico (LICA-style) a partir dos dados do projeto.
Ferramenta de bancada; o entregavel e' explorador-argumentos/index.html (auto-contido)."""
import duckdb, json, math, re, os
from collections import Counter, defaultdict
from huggingface_hub import hf_hub_download
from _explorador_template import HTML_HEAD, HTML_BODY

CORR = "dataset_para_gdrive/dataset_anotado_final.parquet"
DAVI = "anotacao_manual_davi-machado-da-rocha_2026-05-20.json"
LABELS = ["CLAIM", "EVIDENCIA", "FONTE", "QUALIFICADOR"]
con = duckdb.connect()

# ---------- carrega notas (subset com gold) ----------
df = con.execute(f"SELECT noteId, consenso, is_meta, macrotheme_label, text, tweet_text, e1_spans, e2_spans FROM read_parquet('{CORR}')").fetchdf()
text_by_id = dict(zip(df["noteId"].astype(str), df["text"]))
davi = json.load(open(DAVI, encoding="utf-8"))
human = {str(k): [{"start": int(s["start"]), "end": int(s["end"]), "type": s["type"]} for s in v.get("spans", [])]
         for k, v in davi["anotacoes"].items()}
sel60 = set(human.keys())

def sp(arr):
    return [] if arr is None else [{"s": int(x["start"]), "e": int(x["end"]), "t": str(x["type"])} for x in arr]

# reasoning traduzido (E2) das 60 qualitativas
reasoning = {}
try:
    for line in open("qualitative_60_reasoning.jsonl", encoding="utf-8"):
        r = json.loads(line)
        if r.get("reasoning_pt"):
            reasoning[str(r["noteId"])] = r["reasoning_pt"]
    print("reasoning_pt:", len(reasoning))
except FileNotFoundError:
    print("jsonl de reasoning ausente")

notas = []
for _, r in df.iterrows():
    nid = str(r["noteId"])
    if nid not in sel60:
        continue
    notas.append({
        "id": nid, "consenso": r["consenso"], "is_meta": bool(r["is_meta"]),
        "macro": r["macrotheme_label"], "tweet": r["tweet_text"] or "", "text": r["text"] or "",
        "E2": sp(r["e2_spans"]), "E1": sp(r["e1_spans"]),
        "HUMANO": [{"s": s["start"], "e": s["end"], "t": s["type"]} for s in human.get(nid, [])],
        "reason": reasoning.get(nid, ""),
    })
notas.sort(key=lambda n: (n["consenso"], n["id"]))
print("notas:", len(notas))

# ---------- metricas ----------
def _ov(a, b): return max(0, min(a[1], b[1]) - max(a[0], b[0]))
def to_set(spans): return {(s["s"], s["e"], s["t"]) for s in spans}
def f1_strict(g, p):
    G = to_set(g); P = to_set(p); tp = len(G & P)
    if not tp: return 0.0 if (G or P) else 1.0
    return 2 * (tp/len(P)) * (tp/len(G)) / ((tp/len(P)) + (tp/len(G)))
def f1_relaxed(g, p, mr=0.5):
    mg, mp = set(), set()
    for i, a in enumerate(g):
        for j, b in enumerate(p):
            if a["t"] != b["t"] or j in mp: continue
            if _ov((a["s"],a["e"]),(b["s"],b["e"]))/max(a["e"]-a["s"], b["e"]-b["s"], 1) >= mr:
                mg.add(i); mp.add(j); break
    tp = len(mg)
    if not tp: return 0.0 if (g or p) else 1.0
    P = tp/len(p) if p else 0; R = tp/len(g) if g else 0
    return 2*P*R/(P+R) if P+R else 0.0

vs_gold = []
for src in ["E1", "E2"]:
    fs = [f1_strict(n["HUMANO"], n[src]) for n in notas]
    fr = [f1_relaxed(n["HUMANO"], n[src]) for n in notas]
    vs_gold.append({"estrategia": src, "F1_estrita": round(sum(fs)/len(fs), 3), "F1_relaxada": round(sum(fr)/len(fr), 3)})
print("vs_gold:", vs_gold)

# cortes A/B/C sobre o corpus inteiro (recarrega e1/e2 do corpus)
allrows = con.execute(f"SELECT text, is_meta, e1_spans, e2_spans FROM read_parquet('{CORR}')").fetchdf()
def char_kappa(text, A, B):
    if not text: return 0.0
    la = ["O"]*len(text); lb = ["O"]*len(text)
    for s in A:
        for i in range(s["s"], min(s["e"], len(text))): la[i] = s["t"]
    for s in B:
        for i in range(s["s"], min(s["e"], len(text))): lb[i] = s["t"]
    n = len(text); po = sum(1 for x,y in zip(la,lb) if x==y)/n
    cats = set(la)|set(lb); pe = sum((la.count(c)/n)*(lb.count(c)/n) for c in cats)
    return (po-pe)/(1-pe) if pe < 1 else 1.0
rows_corpus = []
for _, r in allrows.iterrows():
    rows_corpus.append({"text": r["text"] or "", "is_meta": bool(r["is_meta"]),
                        "E1": sp(r["e1_spans"]), "E2": sp(r["e2_spans"])})
def corte_stats(rows):
    fs = [f1_strict(x["E1"], x["E2"]) for x in rows]
    fr = [f1_relaxed(x["E1"], x["E2"]) for x in rows]
    kp = [char_kappa(x["text"], x["E1"], x["E2"]) for x in rows]
    n = len(rows)
    return {"n": n, "F1_estrita": round(sum(fs)/n, 3), "F1_relaxada": round(sum(fr)/n, 3), "kappa_char": round(sum(kp)/n, 3)}
cortes = [
    {"corte": "A — completo", **corte_stats(rows_corpus)},
    {"corte": "B — sem meta", **corte_stats([x for x in rows_corpus if not x["is_meta"]])},
    {"corte": "C — ambas produziram", **corte_stats([x for x in rows_corpus if x["E1"] and x["E2"]])},
]
print("cortes ok")

# cobertura + kappa presenca por tipo
def pres(spans, t): return any(s["t"] == t for s in spans)
cobertura = []
for t in LABELS:
    e1 = sum(1 for x in rows_corpus if pres(x["E1"], t))/len(rows_corpus)
    e2 = sum(1 for x in rows_corpus if pres(x["E2"], t))/len(rows_corpus)
    cobertura.append({"tipo": t, "E1": round(100*e1, 1), "E2": round(100*e2, 1)})

# A assinatura lexica por tipo (dunning_sig) e' computada com LEMAS reais na secao de POS (abaixo).

# ---------- Lente entidade x papel ----------
ent_path = hf_hub_download(repo_id="histlearn/notas-comunidade-ptbr", repo_type="dataset",
                           revision="refs/convert/parquet", filename="entities/train/0000.parquet")
TIPOS = ["URL_DOMINIO","ATOR_POLITICO","VEICULO_MIDIA","ORGANIZACAO","ORGAO_PUBLICO",
         "PARTIDO","PROGRAMA_PUBLICO","ORGAO_JUDICIARIO","ORGAO_SEGURANCA","PESSOA_PUBLICA"]
tipos_sql = ",".join(f"'{t}'" for t in TIPOS)
ent = con.execute(f"""
WITH sub AS (SELECT DISTINCT noteId FROM read_parquet('{CORR}'))
SELECT e.noteId, e.texto_entidade, e.tipo_entidade
FROM read_parquet('{ent_path}') e JOIN sub ON e.noteId=sub.noteId
WHERE e.tipo_entidade IN ({tipos_sql})""").fetchall()
e2_by_id = {n["id"]: None for n in notas}  # so do subset com gold tem notas[]; precisamos de todos
e2_all = dict(zip(con.execute(f"SELECT noteId FROM read_parquet('{CORR}')").fetchdf()["noteId"].astype(str),
                  [sp(a) for a in con.execute(f"SELECT e2_spans FROM read_parquet('{CORR}')").fetchdf()["e2_spans"]]))
lente_c = defaultdict(Counter)
for nid, surf, tp in ent:
    nid = str(nid); txt = text_by_id.get(nid)
    if not isinstance(txt, str) or not isinstance(surf, str) or len(surf) < 2: continue
    pos = txt.lower().find(surf.lower())
    if pos < 0: continue
    mid = pos + len(surf)//2; st = "O"
    for s in e2_all.get(nid, []):
        if s["s"] <= mid < s["e"]: st = s["t"]; break
    lente_c[tp][st] += 1
lente = []
for tp in TIPOS:
    c = lente_c.get(tp, Counter()); total = sum(c.values())
    if not total: continue
    lente.append({"tipo": tp, **{L: c.get(L,0) for L in LABELS}, "O": c.get("O",0), "total": total})
lente.sort(key=lambda r: -r["total"])
print("lente ok:", len(lente))

# ---------- POS (spaCy) + perfil por entidade (estilo LICA) ----------
import spacy
nlp = spacy.load("pt_core_news_sm", disable=["parser"])
CONTENT = {"VERB", "NOUN", "ADJ"}
allnotes = con.execute(f"SELECT noteId, text FROM read_parquet('{CORR}')").fetchdf()
note_ids = allnotes["noteId"].astype(str).tolist()
texts = [t if isinstance(t, str) else "" for t in allnotes["text"]]
text_map = dict(zip(note_ids, texts))
note_pos = {}
glob = {p: Counter() for p in CONTENT}
type_lemmas = {t: Counter() for t in LABELS}   # assinatura lexica por tipo de span (LEMAS reais)
for nid, doc in zip(note_ids, nlp.pipe(texts, batch_size=64)):
    d = {p: [] for p in CONTENT}
    e2 = e2_all.get(nid, [])
    for tok in doc:
        lem = tok.lemma_.lower().strip()
        if len(lem) < 3 or not lem.isalpha() or tok.is_stop:
            continue
        if tok.pos_ in CONTENT:
            d[tok.pos_].append(lem); glob[tok.pos_][lem] += 1
        m = tok.idx + len(tok.text) // 2          # tipo de span E2 que contem o token
        for s in e2:
            if s["s"] <= m < s["e"]:
                type_lemmas[s["t"]][lem] += 1; break
    note_pos[nid] = d
print("POS ok")

def dunning_type(t, topn=10, min_freq=4):
    cat = type_lemmas[t]; rest = Counter()
    for o in LABELS:
        if o != t: rest.update(type_lemmas[o])
    N1 = sum(cat.values()) or 1; N2 = sum(rest.values()) or 1
    out = []
    for w in set(cat) | set(rest):
        a = cat.get(w, 0); b = rest.get(w, 0)
        if a + b < min_freq: continue
        e1 = N1*(a+b)/(N1+N2); e2v = N2*(a+b)/(N1+N2)
        g2 = 2*((a*math.log(a/e1) if a else 0) + (b*math.log(b/e2v) if b else 0))
        if a/N1 < b/N2: g2 = -g2
        if g2 > 0: out.append((w, round(g2, 1)))
    out.sort(key=lambda r: -r[1])
    return [w for w, _ in out[:topn]]
dunning_sig = {t: dunning_type(t) for t in LABELS}
print("assinatura lexica (lemas) ok")

def dunning_pos(fg, glob_c, topn=8, min_ll=3.84):
    N1 = sum(fg.values()); Ntot = sum(glob_c.values()); N2 = Ntot - N1
    if N1 == 0 or N2 <= 0: return []
    out = []
    for w, a in fg.items():
        if a < 2: continue
        b = max(0, glob_c.get(w, 0) - a)
        e1 = N1*(a+b)/(N1+N2); e2v = N2*(a+b)/(N1+N2)
        ll = 2*((a*math.log(a/e1) if a else 0) + (b*math.log(b/e2v) if b else 0))
        if a/N1 > (a+b)/(N1+N2) and ll >= min_ll:
            out.append([w, round(ll, 1)])
    out.sort(key=lambda x: -x[1])
    return out[:topn]

def pretty(c):
    return " ".join(w.capitalize() for w in c.split()) if c.islower() else c

TIPOS_PERFIL = ["ATOR_POLITICO","ORGAO_PUBLICO","ORGAO_JUDICIARIO","VEICULO_MIDIA","PARTIDO","ORGANIZACAO","PESSOA_PUBLICA"]
cand = con.execute(f"""
WITH sub AS (SELECT DISTINCT noteId FROM read_parquet('{CORR}'))
SELECT texto_canonico, tipo_entidade, count(*) n
FROM read_parquet('{ent_path}') e JOIN sub ON e.noteId=sub.noteId
WHERE tipo_entidade IN ({",".join("'%s'"%t for t in TIPOS_PERFIL)}) AND length(texto_canonico)>=3
GROUP BY 1,2 ORDER BY n DESC LIMIT 140""").fetchall()
# ruido conhecido do NER (prefixo NNN, programas de TV/esporte, papeis genericos)
STOP_ENT = {"nnn","bbb","sbt","espn","bbq","record","santos","palmeiras","flamengo","corinthians",
            "vasco","fluminense","governador","governadora","deputada","deputado","parlamentar",
            "presidente","ministro","ministra","senador","senadora","prefeito","esquerda","direita"}
escolhidos = []; seen_low = []
for cano, tipo, n in cand:
    low = cano.lower().strip()
    if low in STOP_ENT: continue
    if any(low == s or s in low or low in s for s in seen_low): continue
    seen_low.append(low); escolhidos.append((cano, low, tipo, n))
    if len(escolhidos) >= 40: break

perfis = {}
for cano, low, tipo, freq in escolhidos:
    notes_match = [nid for nid in note_ids if low in (text_map.get(nid) or "").lower()]
    if len(notes_match) < 5: continue
    papel = Counter()
    for nid in notes_match:
        txt = (text_map.get(nid) or "").lower(); start = 0
        while True:
            pos = txt.find(low, start)
            if pos < 0: break
            mid = pos + len(low)//2; t = "O"
            for s in e2_all.get(nid, []):
                if s["s"] <= mid < s["e"]: t = s["t"]; break
            papel[t] += 1; start = pos + len(low)
    fg = {p: Counter() for p in CONTENT}
    for nid in notes_match:
        for p in CONTENT:
            fg[p].update(note_pos.get(nid, {}).get(p, []))
    dist = {p: dunning_pos(fg[p], glob[p]) for p in CONTENT}
    ex = []
    for nid in notes_match:
        txt = text_map.get(nid) or ""; pos = txt.lower().find(low)
        if pos < 0: continue
        a = max(0, pos-50); b = min(len(txt), pos+len(low)+70)
        ex.append({"id": nid, "ctx": txt[a:b], "ent": txt[pos:pos+len(low)]})
        if len(ex) >= 3: break
    perfis[pretty(cano)] = {"tipo": tipo, "n_notas": len(notes_match), "freq": freq,
        "papel": {L: papel.get(L, 0) for L in LABELS}, "O": papel.get("O", 0),
        "VERB": dist["VERB"], "NOUN": dist["NOUN"], "ADJ": dist["ADJ"], "ex": ex}
# ordena por presenca ARGUMENTATIVA (ocorrencias dentro de spans), nao por nº de notas
perfil_ordem = sorted(perfis.keys(), key=lambda k: -sum(perfis[k]["papel"].values()))
print("perfis:", len(perfis), "| top:", perfil_ordem[:6])

# notas completas (texto + spans E2) das ocorrencias, para abrir ao clicar no perfil
occ_ids = set()
for pf in perfis.values():
    for e in pf["ex"]:
        occ_ids.add(e["id"])
notes_full = {nid: {"text": text_map.get(nid, ""), "E2": e2_all.get(nid, []),
                    "consenso": None} for nid in occ_ids}
print("notes_full:", len(notes_full))

DATA = {"notas": notas, "vs_gold": vs_gold, "cortes": cortes, "cobertura": cobertura,
        "dunning": dunning_sig, "lente": lente, "labels": LABELS,
        "perfis": perfis, "perfil_ordem": perfil_ordem, "notes_full": notes_full}

os.makedirs("explorador-argumentos", exist_ok=True)
html = HTML_HEAD + "<script>\nconst DATA = " + json.dumps(DATA, ensure_ascii=False) + ";\n</script>\n" + HTML_BODY
open("explorador-argumentos/index.html", "w", encoding="utf-8").write(html)
print("escrito explorador-argumentos/index.html (", round(len(html)/1024,1), "KiB )")
