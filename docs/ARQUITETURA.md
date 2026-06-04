# Arquitetura técnica

Documentação do *pipeline*, dos artefatos e das decisões técnicas do projeto. Para o panorama
e os resultados, ver o [`README.md`](../README.md) na raiz e o
[`docs/RELATORIO_FINAL.md`](RELATORIO_FINAL.md).

## Visão geral do pipeline

```
                 histlearn/notas-comunidade-ptbr (corpus público)
                                   │
                                   ▼
   ┌──────────────────────  notebook_preparacao_v2.ipynb  ──────────────────────┐
   │ limpeza · seleção das 60 · E1 (regras) · E2 (LLM) · alinhamento de spans    │
   └───────────────────────────────────┬─────────────────────────────────────────┘
                                        │  dataset com E1/E2
                                        ▼
   ┌──────────────────────  notebook_conclusao.ipynb  ──────────────────────────┐
   │ gold humano (JSON) · normalização BIO · avaliação (E1×E2 e vs gold) ·       │
   │ análises complementares (Dunning, entidades, agência) · gráficos            │
   └───────────────────────────────────┬─────────────────────────────────────────┘
                                        │
              ┌─────────────────────────┼─────────────────────────┐
              ▼                         ▼                         ▼
  dataset_anotado_final_com_bio.csv   figuras (matplotlib)     explorador/ (5 visões)
   (1901 × 30: spans, métricas,                                  via _build_*.py
    BIO, sintaxe UD)
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
- Heurísticas por tipo + **regex de URL** (que garante a captura de FONTE em links).
- Saída: lista de *spans* `{start, end, type}` por nota. **Determinística**, transparente e de
  custo desprezível (mediana ≈ 2 ms/nota).
- Executada em `notebook_preparacao_v2.ipynb`.
- Limitação estrutural: depende de padrões sentenciais → **fronteiras frágeis** para
  CLAIM/EVIDÊNCIA.

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

### 4. Gold humano

- 60 notas anotadas segundo o `guia_anotacao.md`; entrada em `data/gold/` (JSON do anotador).
- **Provisório:** um único anotador nesta versão. O notebook está preparado para 2+ anotadores —
  com dois JSONs, calcula **κ inter-anotador** e **consenso** (interseção) automaticamente.

### 5. Normalização BIO

- Os *spans* de E1, E2 e humano são projetados de forma **determinística** para rótulos
  *token-level* `B-TIPO` / `I-TIPO` / `O`, preservando *offsets* de caractere e a tokenização da
  árvore de dependências (`sintaxe_json`).
- Permite avaliação **por sequência (seqeval)** e atende à recomendação metodológica da disciplina.
- Colunas resultantes no CSV: `e1_span_bio_json`, `e2_span_bio_json`, `humano_span_bio_json`,
  `bio_tokens_json`, `bio_offsets_json`. Exportação em CoNLL em `data/gold/*.conll`.

### 6. Avaliação

- **Por span:** F1 **estrita** (offset e tipo exatos) e **relaxada** (sobreposição + tipo).
- **Por caractere:** **κ** corrigido pelo acaso.
- **Por token/BIO:** **seqeval** (precisão/revocação/F1).
- **Três cortes** para o acordo E1×E2: **A** completo (n=1901), **B** sem meta (n=1497),
  **C** ambas produziram spans (n=1331).

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
  - `_build_explorador.py` + `_explorador_template.py` (legado): geram o `index.html`/`data.js`.
- Detalhes e ordem de carregamento em `explorador/README.md`.

## Notas de reprodutibilidade

- **Parquet:** as colunas de *span* são `LIST<STRUCT{start,end,type}>`. Leia com
  **`engine="fastparquet"`** ou **DuckDB**. Evite *round-trip* por leitores que não suportam
  *struct* aninhado (podem devolver `None` silenciosamente nessas colunas).
- **No CSV**, essas mesmas colunas (`e1_spans`, `e2_spans`) vêm como **repr de array NumPy**
  (sem vírgulas entre os dicts): parseie por regex `'type': 'X'` / `'start': N, 'end': N`, **não**
  por `json.loads`. Já `sintaxe_json`, `*_span_bio_json` e `e2_align_levels` são JSON/dict normais.
- **Entidades GLiNER:** `hf_hub_download(repo_id="histlearn/notas-comunidade-ptbr",
  repo_type="dataset", revision="refs/convert/parquet", filename="entities/train/0000.parquet")`
  (~42 MB, cacheado). Filtre por `noteId` para o nosso recorte.
- **Credenciais:** o E2 requer a chave do provedor do LLM (variável de ambiente), configurada no
  `notebook_preparacao_v2.ipynb`; o *gold* requer o caminho do JSON do anotador, configurável no
  `notebook_conclusao.ipynb`.

## Mapa de artefatos

| Artefato | Papel |
|---|---|
| `notebooks/notebook_preparacao_v2.ipynb` | preparação + E1 + E2 |
| `notebooks/notebook_conclusao.ipynb` | **BIO + avaliação + resultados (canônico)** |
| `data/dataset_anotado_final_com_bio.csv` | dataset completo (spans, métricas, BIO, sintaxe) |
| `data/dataset_anotado_final.parquet` | input canônico (E1/E2/métricas; gold a entrar pelo JSON) |
| `data/gold/*.json` · `*.conll` | anotação humana (spans e BIO/CoNLL) |
| `data/qualitative_60_reasoning.jsonl` | raciocínio do E2 nas 60 |
| `explorador/` | visualização interativa (figuras e inspeção) |
| `apps/anotador/` | interface de anotação |
| `apps/bio-converter/` | conversão spans → BIO/CoNLL |
