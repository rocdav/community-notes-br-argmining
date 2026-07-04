# Mineração de Argumentação em Community Notes BR

Comparação de três estratégias automáticas de **extração de estrutura argumentativa** em notas
da comunidade (*Community Notes*) do X (Twitter) em **português brasileiro** — regras
léxico-sintáticas (**E1**), LLM proprietário via API (**E2**, `qwen3.6-max-preview`) e o mesmo
protocolo com um **LLM aberto local** (**E2b**, `Qwen3.6-35B-A3B`) — avaliadas entre si e contra
um **gold humano adjudicado** (duas anotações independentes + consenso), mais um experimento de
**destilação** (**E3**) que treina rotuladores de sequência baratos com a supervisão do LLM.

> Projeto da disciplina **Processamento de Linguagem Natural** (UFSCar, 2026/1) ·
> Profa. Dra. Helena Caseli · Grupo: Álvaro Barros de Carvalho, Davi Machado da Rocha.

## O que é

Cada nota é segmentada em *spans* argumentativos de quatro tipos:

| Tipo | Papel |
|---|---|
| 🔴 **CLAIM** | a alegação que a nota refuta/qualifica/contextualiza |
| 🟢 **EVIDENCIA** | fato, dado ou justificativa que sustenta a checagem |
| 🔵 **FONTE** | atribuição: veículo, órgão, documento ou URL citado como respaldo |
| 🟡 **QUALIFICADOR** | modulação: ressalva, incerteza ou escopo |

Três estratégias produzem esses *spans*:

- **E1 (regras)** — spaCy `pt_core_news_md` (POS, lema, dependências) + heurísticas + regex de URL. Determinística; ~10 ms/nota fim-a-fim.
- **E2 (LLM via API)** — `qwen3.6-max-preview` (proprietário) com *prompt* para *spans* tipados e alinhamento *snippet*→*offset*.
- **E2b (LLM aberto local)** — o mesmo protocolo servido por `Qwen3.6-35B-A3B` (Apache 2.0) via Ollama: zero recusas de provedor e reprodutibilidade plena.

São comparadas (i) **entre si** sobre o corpus inteiro, em três cortes, e (ii) contra um **gold
humano adjudicado** (duas anotações independentes + consenso com trilha de decisões) num recorte
de 60 notas — sempre em **duas leituras**: *completa* (sistemas) e *sem FONTE-URL* (a camada de
URLs é injetada por regex dos dois lados da régua; sem ela mede-se só o conteúdo decidido). A
estratégia **E3** (destilação) treina Naive Bayes → HMM → reg. logística → CRF → BERTimbau com a
supervisão *silver* do LLM.

## Principais achados

> Valores da execução atual do experimento; a consolidação final é feita em
> [`notebooks/notebook_conclusao.ipynb`](notebooks/notebook_conclusao.ipynb).

- **Os humanos concordam mais do que parecia.** O κ inter-anotador sobe de 0,334 para **0,632**
  quando se desconta a camada de FONTE-URL (infraestrutura, não decisão) — separar as duas
  leituras virou o eixo metodológico do trabalho.
- **A régua muda o pódio.** Contra o gold adjudicado, o LLM local lidera na leitura completa
  (F1 estrita 0,501) e o LLM da API lidera no conteúdo decidido (0,399); contra cada anotador
  isolado o ranking muda de novo — por isso reportamos três réguas e duas leituras.
- **Parte do "erro de fronteira" era artefato de dados.** Corrigida a ingestão de entidades
  (90,8 % dos offsets precisavam de re-localização), a F1 estrita do acordo E1×E2 subiu de
  0,307 para 0,372 com a relaxada estável.
- **A destilação funciona com sobra:** um CRF clássico treinado no *silver* do LLM atinge
  F1 estrita de **0,599** por entidade BIO — nível da melhor referência LLM — a 0,32 ms/nota;
  e o professor importa (aluno do E2b: 0,505 vs 0,390 do aluno do E2).
- **O tipo da entidade prevê o papel argumentativo** (lente GLiNER): URL/mídia → FONTE; ator
  político/partido → CLAIM/EVIDÊNCIA. E o acordo E1×E2 **cai** nos cortes mais argumentativos —
  a divergência é sobre **delimitação**, não ruído.

## Estrutura do repositório

```
.
├── README.md
├── LICENSE
├── requirements.txt
├── notebooks/                       # pipeline reprodutível (Colab/Jupyter)
│   ├── notebook_preparacao_v2.ipynb # coleta, preparação, E1 (regras) e E2 (LLM)
│   ├── notebook_conclusao.ipynb     # BIO, avaliação e resultados (fonte canônica)
│   └── notebook_destilacao.ipynb    # E3: destilação em modelos de sequência
├── data/                            # dataset, gold e dicionário de dados
│   ├── README.md                    # dicionário de colunas e notas de uso
│   ├── dataset_anotado_final.parquet
│   ├── dataset_anotado_final_com_bio.csv
│   ├── qualitative_60_reasoning.jsonl
│   └── gold/                        # anotações humanas e consenso adjudicado
│       ├── anotacao_manual_*.json
│       ├── anotacao_manual_*_bio.conll
│       └── anotacao_consenso_adjudicado_2026-07-02.*
├── explorador/                      # visualização estática interativa (5 visões)
│   ├── index.html
│   ├── data*.js                     # dados embutidos das visões
│   ├── js/
│   │   ├── app.js
│   │   ├── core.js
│   │   ├── charts.js
│   │   ├── modal.js
│   │   └── views/                   # conjunto, notas, BIO, entidades e painel
│   ├── styles.css
│   └── README.md
└── apps/
    ├── anotador/                    # interface estática de anotação humana
    │   ├── index.html
    │   ├── data.js
    │   ├── app.js
    │   ├── styles.css
    │   └── readme.md
    ├── adjudicador/                 # consenso humano entre duas anotações independentes
    │   ├── index.html
    │   ├── data.js
    │   ├── app.js
    │   ├── styles.css
    │   └── README.md
    ├── anotador-llm/                # E2b: anotação automática local via Ollama
    │   ├── anotador_llm.py
    │   ├── alignment.py
    │   ├── prompts.py
    │   ├── requirements.txt
    │   ├── output/
    │   │   └── e2_ollama_sweep.jsonl
    │   └── README.md
    └── bio-converter/               # conversão de spans → BIO/CoNLL
        ├── app.py
        ├── converter.py
        ├── Dockerfile
        ├── requirements.txt
        └── README.md
```

## Como reproduzir

### Notebooks (resultado canônico)

```bash
pip install -r requirements.txt
python -m spacy download pt_core_news_md
```

1. `notebooks/notebook_preparacao_v2.ipynb` — prepara o corpus e roda **E1** e **E2**.
   Para o E2, configure a credencial do provedor do LLM.
2. `notebooks/notebook_conclusao.ipynb` — faz a normalização BIO, calcula as medidas de avaliação e
   é a **fonte canônica dos números**; para o *gold*, aponte o(s) JSON(s) de anotador.
3. `notebooks/notebook_destilacao.ipynb` — estratégia **E3**: treina modelos de rotulagem de
   sequência (Naive Bayes → HMM → reg. logística → CRF → BERTimbau) com supervisão *silver* do E2
   e testa no *gold* humano. Requer GPU (Colab).

> Leia o Parquet com **DuckDB** ou **`engine="pyarrow"`** — as colunas de *span* são
> `LIST<STRUCT>` aninhadas, e o `fastparquet` as devolve vazias em silêncio.

### Explorador (visualização)

Abra **`explorador/index.html`** com duplo-clique — é estático e funciona offline (sem
servidor). Cinco visões: *Conjunto* (panorama do corpus), *Explorador de notas*, *BIO
(tokens)*, *Navegador de entidades* e *Painel de achados*. As visões também estão disponíveis em
[`explorador-argumentos.netlify.app`](https://explorador-argumentos.netlify.app/).

### Anotador (ambiente de anotação)

O ambiente de anotação humana também é estático. Ele pode ser aberto localmente em
**`apps/anotador/index.html`** e está publicado em
[`anotador-argumentos.netlify.app`](https://anotador-argumentos.netlify.app/). A interface usa o
recorte de 60 notas em `apps/anotador/data.js` e exporta as marcações para posterior conversão em
BIO/CoNLL.

### Adjudicador (consenso humano)

Quando houver duas anotações independentes, abra **`apps/adjudicador/index.html`** para revisar as
divergências nota a nota. A interface também está publicada em
[`consenso-notas.netlify.app`](https://consenso-notas.netlify.app/). O adjudicador exporta um JSON
no mesmo contrato do anotador, com `papel = consenso_adjudicado`; no `notebook_conclusao.ipynb`,
aponte `CONSENSUS_JSON_PATH` para esse arquivo para usá-lo como gold final.

## Dados

O dataset principal é [`data/dataset_anotado_final_com_bio.csv`](data/dataset_anotado_final_com_bio.csv)
(1901 notas / 689 tweets), com *spans* de E1/E2, métricas por nota, projeção **BIO** e árvore de
dependências (`sintaxe_json`). O **dicionário de colunas** está em
[`data/README.md`](data/README.md). O corpus deriva do conjunto público
[`histlearn/notas-comunidade-ptbr`](https://huggingface.co/datasets/histlearn/notas-comunidade-ptbr).

## Limitações

- **Gold adjudicado em rodada de parecer individual** — a revisão cruzada pelo segundo anotador
  está prevista; quando ocorrer, os artefatos se atualizam pela re-execução dos notebooks e dos
  snapshots locais.
- **Fronteiras de *span*** seguem o ponto difícil — para máquinas e para humanos (κ 0,632 no
  conteúdo decidido, com fronteiras fluidas).
- Escopo: dois LLMs de **uma mesma família**, **um** idioma (PT-BR), corpus de um período;
  modelos neurais da destilação com uma única semente.

## Licença e uso

Trabalho acadêmico desenvolvido para a disciplina de Processamento de Linguagem Natural
(UFSCar, 2026/1). O código e a documentação produzidos pelos autores estão disponíveis sob a
licença MIT; veja [`LICENSE`](LICENSE).

Os textos das notas derivam do Community Notes / X e do conjunto público
[`histlearn/notas-comunidade-ptbr`](https://huggingface.co/datasets/histlearn/notas-comunidade-ptbr);
o uso deve respeitar os termos e licenças dessas fontes. Materiais, modelos, bibliotecas e dados
de terceiros mantêm suas próprias licenças e são citados nos arquivos correspondentes.
