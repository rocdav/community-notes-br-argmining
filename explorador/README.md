# Explorador — Argumentação em Community Notes BR

Visualização estática e auto-contida dos resultados do experimento (E1 regras × E2 LLM ×
gold humano), no espírito do portal LICA (`pipeline_escalavel/portal_lica`): estética de
folhetim, sidebar + visões, sem framework.

## Como abrir
Dê **duplo-clique em `index.html`** (não precisa de servidor). O snapshot dos dados e os
módulos da aplicação são carregados como arquivos locais via `file://` — funciona offline,
mas **mantenha a pasta inteira junta** (`index.html`, `styles.css`, `data.js`, `data_conjunto.js`,
`data_entidades.js`, `data_notas.js`, `data_bio.js`, `js/`).
Para servir via HTTP local, se preferir: `python -m http.server` na pasta.

Funciona bem em **celular**: em telas estreitas a barra lateral vira um menu (☰) recolhível,
os controles ficam com alvos de toque maiores e as tabelas largas rolam dentro do cartão.

## Estrutura do projeto
Antes era um único `index.html` monolítico (~768 KB). Agora está modularizado, mantendo o
"abre com duplo-clique, sem servidor" (scripts clássicos, sem bundler):

```
index.html            # só a estrutura + as tags de <link>/<script>
styles.css            # toda a estética folhetim + a camada responsiva (mobile)
data.js               # const DATA = {…}      snapshot do slice de avaliação (60 gold + reasoning)
data_conjunto.js      # const CONJUNTO = {…}  agregados do corpus inteiro (1901 notas)
data_entidades.js     # const ENT = {…}       navegador de entidades (lente por tipo + 231 perfis)
data_notas.js         # const NOTAS = {…}     texto + spans E2 das notas referenciadas (drill-down)
data_bio.js           # const BIO = {…}       rotulagem BIO (token-level) das 60 com gold
js/core.js            # estado, helpers de DOM/format, renderização de spans, legenda, barras
js/charts.js          # gráficos à mão (donut SVG, barras horizontais) — sem biblioteca
js/modal.js           # modal "nota completa" + raciocínio recolhível (marked.js sob demanda)
js/app.js             # roteamento entre visões, boot e o drawer de navegação no mobile
js/views/conjunto.js  # ┐
js/views/notas.js     # │
js/views/bio.js       # │ uma visão por arquivo; cada uma se registra em VIEWS
js/views/entidades.js # │
js/views/painel.js    # ┘
```

A ordem de carregamento das tags `<script>` no `index.html` importa: `data.js` →
`data_conjunto.js` → `data_entidades.js` → `data_notas.js` → `data_bio.js` → `core.js` →
`charts.js` → `modal.js` → `js/views/*` → `app.js` (que chama `boot()`).

## Cinco visões
- **Conjunto** *(página inicial)* — visão geral (dashboard) do **corpus inteiro do experimento
  (1901 notas / 689 tweets)**, no espírito do dashboard do Community Notes BR, mas adaptada ao
  nosso recorte: KPIs (notas, tweets, gold, **custo E1 ~3 ms vs E2 ~5,2 s**, acordo F1/κ, % meta),
  **donut do resultado das notas** (NMR/CRNH/CRH/Outro), **anatomia argumentativa E1 × E2**
  (regras enxergam FONTE; LLM equilibra CLAIM/EVIDÊNCIA), **macrotemas**, **heatmap tema × resultado**,
  **histogramas por nota** (F1, κ, latência do E2, comprimento), **assinatura léxica do corpus**
  (POS + nuvem de lemas por classe, da árvore UD em `sintaxe_json`) e **qualidade de alinhamento do E2**.
  As demais visões aprofundam recortes (gold humano, entidades) — daí o *chip de escopo* no título de cada uma.
- **Explorador de notas** — as 60 notas com gold humano; tweet em contexto + texto da nota
  com spans coloridos (🔴 CLAIM 🟢 EVIDÊNCIA 🔵 FONTE 🟡 QUALIFICADOR), alternando E1 / E2 /
  Humano; filtro por consenso; e o **raciocínio traduzido do E2 (PT)** num painel recolhível
  (mesmo layout do app de anotação).
- **BIO (tokens)** — a mesma anotação como **rotulagem de sequência**: cada token recebe
  B- (início de span), I- (continuação) ou O (fora), com a barra à esquerda marcando o B-.
  Alterna E1 / E2 / Humano nas 60 com gold — o formato recomendado para treino/avaliação
  token-level, complementar à visão de spans por caractere.
- **Navegador de entidades** — unifica a antiga *lente* e o antigo *perfil*, em escala de corpus
  (**231 entidades, 14 tipos**, extração GLiNER do dataset `histlearn/notas-comunidade-ptbr`).
  Navega pelo **grão**: *tipo* (heatmap tipo × papel — o tipo prevê o papel: URL/mídia → FONTE,
  ator/partido → CLAIM/EVIDÊNCIA) → *entidade* (Lula, Globo, STF…). Cada entidade traz papel
  argumentativo (E2), **agência** (com que frequência *age* como sujeito vs *sofre* como
  objeto/oblíquo, pela árvore de dependências — ex.: Lula sujeito 45 / objeto 17; STF o inverso),
  **nuvem de lemas distintivos** por classe (Dunning LL) e ocorrências reais com contexto —
  **clique para abrir a nota completa** (drill-down sobre as notas do corpus, não só as 60).
- **Painel de achados** — E2/E1 vs gold, acordo nos 3 cortes, cobertura por tipo e assinatura
  léxica (Dunning) por tipo.

## Como regenerar
Os dados são um snapshot. Para atualizar (ex.: após o 2º anotador / consenso):

```bash
pip install duckdb huggingface_hub spacy
python -m spacy download pt_core_news_sm      # POS/lema para o Perfil de entidade
python _build_explorador.py   # lê o parquet + JSON do anotador + tabela entities; reescreve data.js
```

Com a modularização, o snapshot vive isolado em **`data.js`** (`const DATA = {…}`), então
regenerar passa a reescrever apenas esse arquivo — `index.html`, `styles.css` e `js/` não
mudam. (`_build_explorador.py` + `_explorador_template.py` ficam na pasta do projeto, no mesmo
espírito de `tools/build_site.py` do LICA. O entregável do curso continua sendo só os notebooks.)

Os agregados da página **Conjunto** vivem em **`data_conjunto.js`** (`const CONJUNTO = {…}`),
gerados do dataset do experimento por um script próprio (só pandas, sem rede):

```bash
python _build_conjunto.py    # lê dataset_anotado_final_com_bio.csv; reescreve data_conjunto.js
```

Ele pré-computa apenas os números das visões (KPIs, distribuições, anatomia de spans, temas,
heatmap tema × consenso, histogramas, POS/lemas da árvore UD em `sintaxe_json`, alinhamento) —
não embute as 1901 linhas (`data_conjunto.js` fica em ~8 KB). A projeção BIO do CSV segue
disponível para futuras visões em nível de token/sequência.

O **Navegador de entidades** vive em **`data_entidades.js`** (`const ENT`) + **`data_notas.js`**
(`const NOTAS`, texto/spans p/ drill-down), gerados por `_build_entidades.py`:

```bash
python _build_entidades.py   # baixa 1× a tabela de entidades do HF (cache local) e cruza com o CSV
```

Ele junta a tabela GLiNER do dataset publicado (config `entities`, baixada via `hf_hub_download`
e cacheada — **a localização das entidades usa o `noteId`**, não os offsets, que estão
desalinhados) com as nossas notas: por entidade, cruza a posição com os spans do E2 (papel),
lê o `deprel` da cabeça sintática (agência) e calcula Dunning por classe (nuvens). A extração
GLiNER **não** é re-rodada — é só agregação em CPU. As nuvens de classes de palavras
(verbos/substantivos/adjetivos) saem para **todas** as 231 entidades: Dunning LL onde há
sinal distintivo, com fallback para os lemas mais frequentes nas entidades pequenas.

A visão **BIO** vive em **`data_bio.js`** (`const BIO`), gerada por `_build_bio.py` (só pandas):

```bash
python _build_bio.py    # lê as colunas *_span_bio_json do CSV (60 com gold); reescreve data_bio.js
```
