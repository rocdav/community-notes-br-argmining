# Arquitetura técnica

Documentação do *pipeline*, dos artefatos e das decisões técnicas do projeto. Para o panorama
e os resultados, ver o [`README.md`](../README.md) na raiz e os notebooks em
[`notebooks/`](../notebooks/).

## Visão geral do pipeline

```
                 histlearn/notas-comunidade-ptbr (corpus público)
                                   │
                                   ▼
   ┌──────────────────────  notebook_preparacao_v2.ipynb  ──────────────────────┐
   │ limpeza · seleção das 60 · E1 (regras, v2.1) · E2 (LLM via API) ·           │
   │ alinhamento de spans · §19: rederivação do E1 preservando o E2              │
   └───────────────────────────────────┬─────────────────────────────────────────┘
                                        │  dataset com E1/E2  (+ E2b de apps/anotador-llm)
                                        ▼
   ┌──────────────────────  notebook_conclusao.ipynb  ──────────────────────────┐
   │ κ inter-anotador (2 leituras) · gold adjudicado (apps/adjudicador) ·        │
   │ normalização BIO (E1/E2/E2b/humano) · avaliação multi-gold em 2 leituras ·  │
   │ análises complementares (Dunning, entidades, agência) · gráficos            │
   └───────────────────────────────────┬─────────────────────────────────────────┘
                                        │
              ┌─────────────────────────┼─────────────────────────┐
              ▼                         ▼                         ▼
  dataset_anotado_final_com_bio.csv   figuras (matplotlib)     explorador/ (5 visões)
   (1901 × 36: spans E1/E2/E2b,                                  via _build_*.py e
    gold, métricas, BIO, sintaxe UD)                             _refresh_data.py
                                        │
                                        ▼
   ┌──────────────────────  notebook_destilacao.ipynb (E3)  ────────────────────┐
   │ alunos NB/HMM/logística/CRF/BERTimbau treinados no silver do E2 (e E2b),    │
   │ testados no gold adjudicado                                                 │
   └──────────────────────────────────────────────────────────────────────────────┘
```

## Estágios

### 1. Corpus e preparação (`notebook_preparacao_v2.ipynb`)

- Fonte: dataset público `histlearn/notas-comunidade-ptbr`. O campo **`summary`** é o texto
  anotável da nota; o tweet associado entra como **contexto** (em especial para ancorar a CLAIM).
- **Seleção do recorte de avaliação:** 60 notas estratificadas pelo *status* do Community Notes
  (20 NMR, 20 CRH, 20 CRNH), **excluindo meta-notas** (`is_meta`). A seleção é reprodutível
  (semente fixa) e validada por *assert* no notebook.
- **Esquema de rótulos:** CLAIM, EVIDENCIA, FONTE, QUALIFICADOR — definições em
  [`guia_anotacao.md`](guia_anotacao.md).
- **Extrações automáticas:** o mesmo notebook executa E1 e E2, deixando os *spans* automáticos
  prontos para a etapa de conclusão.

### 2. Estratégia E1 — regras léxico-sintáticas

- Base **spaCy `pt_core_news_md`**: tokenização, lematização, POS e *dependency parsing*.
- Heurísticas por tipo + **regex de URL** + entidades pré-extraídas do dataset público
  **re-localizadas pela superfície** (v2.1: os offsets `inicio/fim` da tabela upstream são
  automáticos e ~91 % exigiam re-localização; a correção elevou a F1 estrita E1×E2 de 0,307
  para 0,372 com a relaxada estável).
- Saída: lista de *spans* `{start, end, type}` por nota. **Determinística** e transparente;
  custo fim-a-fim mediano ≈ 10 ms/nota (1,9 ms de regras + 8 ms de parse; `e1_ms`,
  `e1_parse_ms`, `e1_total_ms`).
- Executada em `notebook_preparacao_v2.ipynb` (a §19 rederiva só o E1 preservando o E2).
- Limitação estrutural: depende de padrões sentenciais → **fronteiras frágeis** para
  CLAIM/EVIDÊNCIA (16 % dos spans têm fronteira sub-token, medida no round-trip BIO).

### 3. Estratégia E2 — LLM

- Modelo **`qwen3.6-max-preview`** via API compatível com OpenAI; *prompt* solicita os *spans*
  tipados e um **raciocínio** (traduzido para PT nas 60, em `qualitative_60_reasoning.jsonl`).
- O modelo retorna **snippets**; um alinhamento **snippet→offset** os reposiciona no texto. A
  qualidade desse alinhamento é registrada (`e2_align_levels`: *exact/normalized/regex/failed*).
- URLs são garantidas por regex e **mescladas** ao resultado do LLM.
- Custo: mediana ≈ 4,6 s/nota (p95 ≈ 10,8 s); algumas notas são **recusadas** pelo filtro de
  conteúdo do provedor (`e2_err`).
- Executada em `notebook_preparacao_v2.ipynb`; `notebook_conclusao.ipynb` consome esses *spans*
  para BIO e avaliação.

### 3b. Estratégia E2b — o mesmo protocolo com LLM aberto local

- Reimplementação fiel da E2 em `apps/anotador-llm/` (mesmo *prompt*, mesmo alinhamento em 4
  níveis, mesma regra de URL), servida por **`Qwen3.6-35B-A3B`** (Apache 2.0) via **Ollama**.
- Saída completa versionada em `apps/anotador-llm/output/e2_ollama_sweep.jsonl` (1901 notas,
  zero recusas, 96,9 % de alinhamento exato); o `notebook_conclusao.ipynb` a carrega como
  coluna `e2b_spans`.

### 4. Gold humano

- 60 notas anotadas **de forma independente por dois anotadores** (`data/gold/*.json`),
  seguidas de **adjudicação** em `apps/adjudicador/` (trilha de decisões por span, rodadas
  nomeadas, camadas E1/E2 bloqueadas até a revisão da nota).
- Gold final: `data/gold/anotacao_consenso_adjudicado_2026-07-02.json` (224 spans; rodada de
  parecer individual — revisão cruzada prevista). O `notebook_conclusao.ipynb` calcula o
  **κ inter-anotador sempre** (leituras *completa* e *sem FONTE-URL*), independentemente do
  gold usado.

### 5. Normalização BIO

- Os *spans* de E1, E2, E2b e humano são projetados de forma **determinística** para rótulos
  *token-level* `B-TIPO` / `I-TIPO` / `O`, sobre a mesma tokenização fixa e versionada.
- **Round-trip medido** (span → BIO → span): perda de 0,89 % (humano), 1,3–1,4 % (LLMs) e
  16,05 % (E1, fronteiras sub-token das regex) — valida a camada BIO como representação de
  avaliação.
- Permite avaliação **por sequência** (implementação própria com *cross-check* idêntico à
  biblioteca `seqeval`, modo estrito/IOB2) e atende à recomendação metodológica da disciplina.
- Colunas no CSV: `e1/e2/e2b/humano_span_bio_json`, `bio_tokens_json`, `bio_offsets_json`.
  Exportação em CoNLL em `data/gold/*.conll`.

### 6. Avaliação

- **Por span:** F1 **estrita** (offset e tipo exatos) e **relaxada** (sobreposição + tipo).
- **Por caractere:** **κ** corrigido pelo acaso, em duas agregações (média por nota e *pooled*).
- **Por token/BIO:** estilo seqeval, com *cross-check* da biblioteca.
- **Duas leituras** em toda avaliação contra gold: *completa* (sistemas) e *sem FONTE-URL*
  (conteúdo decidido) — a camada de URLs é injetada por regex nas estratégias **e** era
  pré-marcada no app de anotação (infraestrutura compartilhada).
- **Multi-gold:** além do consenso, cada anotador isolado serve de régua na análise de
  sensibilidade da §4.5 do notebook.
- **Três cortes** para o acordo E1×E2: **A** completo (n=1901), **B** sem meta (n=1497),
  **C** ambas produziram spans (n=1329).

### 7. Análises complementares

- **Dunning Log-Likelihood (G²):** assinatura léxica (lemas distintivos) por tipo de *span*.
- **Lente entidade × papel:** entidades **GLiNER** (config `entities` do dataset público)
  cruzadas com o papel do E2. **Junção por `noteId`**; a posição da entidade é re-localizada pela
  superfície no nosso texto (os *offsets* da tabela do HF estão em texto com normalização de
  espaços diferente). Resultado: o **tipo da entidade prevê o papel**.
- **Agência sintática:** via `deprel` da **cabeça** da entidade (token cujo *head* cai fora do
  *span* da entidade), classifica-se em **sujeito** (`nsubj*`), **objeto/oblíquo**
  (`obj/iobj/obl*/nsubj:pass`) ou **menção**.

## Explorador (`explorador/`)

Visualização **estática, modular e offline** (sem *framework*, sem *bundler*; abre por
duplo-clique via `file://`, usando `<script>`/`<link>` clássicos). Cinco visões: *Conjunto*,
*Explorador de notas*, *BIO (tokens)*, *Navegador de entidades*, *Painel de achados*.

- Dados embutidos em `data*.js` (`const DATA/CONJUNTO/ENT/NOTAS/BIO`), carregados como *scripts*
  globais (não-módulos), pré-computados pelos *builders*:
  - `_build_conjunto.py` → `data_conjunto.js` (agregados do corpus).
  - `_build_entidades.py` → `data_entidades.js` + `data_notas.js` (navegador de entidades;
    **baixa 1× a tabela GLiNER do HF** e cacheia — só agregação em CPU, sem re-rodar GLiNER).
  - `_build_bio.py` → `data_bio.js` (rotulagem BIO das 60).
  - `_refresh_data.py` → atualiza in-place em `data.js` os spans E1/HUMANO das 60 e os painéis
    numéricos (`vs_gold`, `cortes`, `cobertura`) a partir do CSV canônico — é o caminho de
    atualização após qualquer mudança de gold ou de estratégia.
  - `_build_explorador.py` + `_explorador_template.py` (legado): geraram o `index.html`/`data.js`
    originais.
- Detalhes e ordem de carregamento em `explorador/README.md`.

## Notas de reprodutibilidade

- **Parquet:** as colunas de *span* são `LIST<STRUCT{start,end,type}>`. Leia com
  **DuckDB** ou **`engine="pyarrow"`**. Evite o `fastparquet` e qualquer *round-trip* por
  leitores sem suporte a *struct* aninhado: eles devolvem `None` silenciosamente nessas colunas.
- **No CSV**, essas mesmas colunas (`e1_spans`, `e2_spans`) vêm como **repr de array NumPy**
  (sem vírgulas entre os dicts): parseie por regex `'type': 'X'` / `'start': N, 'end': N`, **não**
  por `json.loads`. Já `sintaxe_json`, `*_span_bio_json` e `e2_align_levels` são JSON/dict normais.
- **Entidades GLiNER:** `hf_hub_download(repo_id="histlearn/notas-comunidade-ptbr",
  repo_type="dataset", revision="refs/convert/parquet", filename="entities/train/0000.parquet")`
  (~42 MB, cacheado). Filtre por `noteId` para o nosso recorte.
- **Credenciais:** só o E2 requer chave do provedor (variável de ambiente, no
  `notebook_preparacao_v2.ipynb`). O E2b roda local via Ollama, sem chave. O *gold* e as
  anotações são lidos direto do repositório (`data/gold/`) pelo `notebook_conclusao.ipynb`;
  os notebooks fixam a revisão do dataset upstream nos downloads.

## Mapa de artefatos

| Artefato | Papel |
|---|---|
| `notebooks/notebook_preparacao_v2.ipynb` | preparação + E1 (v2.1) + E2 |
| `notebooks/notebook_conclusao.ipynb` | **gold + BIO + avaliação + resultados (canônico)** |
| `notebooks/notebook_destilacao.ipynb` | destilação (E3): alunos treinados no silver do E2/E2b |
| `apps/anotador-llm/output/e2_ollama_sweep.jsonl` | saída completa da E2b (1901 notas) |
| `data/dataset_anotado_final_com_bio.csv` | dataset completo, 1901 × 36 (spans E1/E2/E2b, gold, BIO, sintaxe) |
| `data/dataset_anotado_final.parquet` | input canônico do notebook 2 (E1 v2.1/E2/métricas) |
| `data/gold/*.json` · `*.conll` | anotações independentes + consenso adjudicado (spans e BIO/CoNLL) |
| `apps/adjudicador/` | interface de adjudicação com trilha de decisões |
| `data/qualitative_60_reasoning.jsonl` | raciocínio do E2 nas 60 |
| `explorador/` | visualização interativa (figuras e inspeção) |
| `apps/anotador/` | interface de anotação |
| `apps/bio-converter/` | conversão spans → BIO/CoNLL |
