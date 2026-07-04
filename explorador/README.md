# Explorador — Argumentação em Community Notes BR

Visualização estática e auto-contida dos resultados do experimento — três estratégias de
extração (**E1** regras × **E2** LLM remoto × **E2b** LLM aberto local) contra um **gold
humano adjudicado**, em **duas leituras** (completa × sem FONTE-URL). Estética de folhetim,
sidebar + visões, sem framework.

## Como abrir
Dê **duplo-clique em `index.html`** (não precisa de servidor). O snapshot dos dados e os
módulos da aplicação são carregados como arquivos locais via `file://` — funciona offline,
mas **mantenha a pasta inteira junta** (`index.html`, `styles.css`, `data.js`, `data_conjunto.js`,
`data_entidades.js`, `data_notas.js`, `data_bio.js`, `js/`).
Para servir via HTTP local, se preferir: `python -m http.server` na pasta.

Funciona bem em **celular**: em telas estreitas a barra lateral vira um menu (☰) recolhível,
os controles ficam com alvos de toque maiores e as tabelas largas rolam dentro do cartão.

## Estrutura do projeto
Antes era um único `index.html` monolítico. Agora está modularizado, mantendo o "abre com
duplo-clique, sem servidor" (scripts clássicos, sem bundler):

```
index.html            # só a estrutura + as tags de <link>/<script>
styles.css            # toda a estética folhetim + a camada responsiva (mobile)
data.js               # const DATA = {…}      slice de avaliação (60 gold adjudicado): spans E1/E2/E2b/Humano,
                      #                        vs_gold nas DUAS leituras, sensibilidade à régua, Dunning, reasoning
data_conjunto.js      # const CONJUNTO = {…}  agregados do corpus inteiro (1901 notas), com E1 × E2 × E2b
data_entidades.js     # const ENT = {…}       navegador de entidades (lente por tipo + perfis GLiNER filtrados)
data_notas.js         # const NOTAS = {…}     texto + spans E2 das notas referenciadas (drill-down)
data_bio.js           # const BIO = {…}       rotulagem BIO (token-level) das 60 com gold
js/core.js            # estado, helpers de DOM/format, renderização de spans (marca FONTE-URL como infra), legenda
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
  (1901 notas / 689 tweets)**: KPIs (notas, tweets, gold adjudicado, **custo E1 fim-a-fim ~10 ms ·
  E2 remoto ~4,6 s · E2b local ~9,4 s**, acordo E1×E2, % meta), **donut do resultado das notas**
  (NMR/CRNH/CRH/Outro), **anatomia argumentativa E1 × E2 × E2b** (regras enxergam FONTE; os LLMs
  distribuem CLAIM/EVIDÊNCIA; o local combina a distribuição do remoto com apetite por FONTE),
  **macrotemas**, **heatmap tema × resultado**, **histogramas por nota**, **assinatura léxica do
  corpus** (POS + nuvem de lemas da árvore UD) e **qualidade de alinhamento do E2**.
- **Explorador de notas** — as 60 notas com gold humano adjudicado; tweet em contexto + texto da
  nota com spans coloridos (🔴 CLAIM 🟢 EVIDÊNCIA 🔵 FONTE 🟡 QUALIFICADOR), alternando **E1 / E2 /
  E2b / Humano**; filtro por consenso; o **raciocínio traduzido do E2 (PT)** num painel recolhível.
  As FONTE ancoradas em URL aparecem **hachuradas**: são infraestrutura (injetada por regex nos três
  sistemas e pré-marcada no gold), a camada que a leitura *sem FONTE-URL* remove.
- **BIO (tokens)** — a mesma anotação como **rotulagem de sequência**: cada token recebe
  B-/I-/O. Alterna E1 / E2 / Humano nas 60 com gold — o formato recomendado para treino/avaliação
  token-level, complementar à visão de spans por caractere.
- **Navegador de entidades** — em escala de corpus (**~203 entidades nomeadas navegáveis**),
  extração **GLiNER filtrada pelos próprios sinais do dataset** `histlearn/notas-comunidade-ptbr`
  (confiança `score` e `fonte_extracao`); a **lente por tipo** inclui também as camadas formais por
  regex (URLs, datas, valores). Navega pelo **grão**: *tipo* (heatmap tipo × papel) → *entidade*
  (Lula, Globo, STF…). Cada entidade traz papel argumentativo (E2), a **classificação nativa do
  dataset** (`papel_no_texto`: fonte/evidência × menção — veículos dão fonte, atores dão menção),
  **agência** (sujeito × objeto, pela árvore de dependências), **confiança GLiNER média**, **nuvem de
  lemas distintivos** (Dunning LL) e ocorrências reais com contexto — **clique para abrir a nota completa**.
- **Painel de achados** — E1/E2/E2b vs gold adjudicado nas **duas leituras** (toggle
  *completa* ⇄ *sem FONTE-URL* — alternar chega a **inverter o ranking**: E2b lidera na completa,
  E2 assume no conteúdo decidido), **sensibilidade à régua** (anotador 1 × anotador 2 × consenso),
  acordo E1×E2 nos 3 cortes, cobertura por tipo e assinatura léxica (Dunning) por tipo.

## Snapshot público
Este diretório versiona o explorador já renderizado: HTML, CSS, JS e `data*.js`. Os scripts de
manutenção usados para reconstruir esses snapshots ficam fora do repositório público para manter
o pacote enxuto.

Todas as métricas contra o gold usam o **gold adjudicado** (duas anotações independentes +
adjudicação com trilha auditável). Para recomputar o experimento, use os notebooks da raiz do
repositório; para navegar pelos resultados, basta abrir este snapshot estático.
