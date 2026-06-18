# Mineração de Argumentação em Community Notes BR

Comparação de duas estratégias automáticas de **extração de estrutura argumentativa** em notas
da comunidade (*Community Notes*) do X (Twitter) em **português brasileiro** — uma baseada em
**regras léxico-sintáticas** (spaCy) e outra baseada em **LLM** (`qwen3.6-max-preview`) —
avaliadas entre si e contra **anotação humana**.

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

Duas estratégias produzem esses *spans*:

- **E1 (regras)** — spaCy `pt_core_news_md` (POS, lema, dependências) + heurísticas + regex de URL. Determinística e baratíssima.
- **E2 (LLM)** — `qwen3.6-max-preview` com *prompt* para *spans* tipados e alinhamento *snippet*→*offset*.

São comparadas (i) **entre si** sobre o corpus inteiro, em três cortes, e (ii) contra um
**gold humano** num recorte de 60 notas.

## Principais achados

> Valores da execução atual do experimento; a consolidação final é feita em
> [`notebooks/notebook_conclusao.ipynb`](notebooks/notebook_conclusao.ipynb).

- **O LLM se aproxima do humano; as regras, não.** E2 vs *gold*: F1 relaxada ≈ 0,47 / estrita ≈ 0,34; E1: ≈ 0,14 / ≈ 0,02 — as regras erram sobretudo as **fronteiras** dos *spans*.
- **As regras compensam onde são fortes e baratas:** cobertura de **FONTE** de 72 % (vs 56,5 % do LLM) e custo **~10³× menor** (≈ 1,9 ms vs ≈ 4,6 s por nota).
- **Divisão de trabalho por tipo:** E1 enxerga sobretudo FONTE (URLs/veículos); E2 distribui entre CLAIM/EVIDÊNCIA/FONTE, mais próximo do humano.
- **O tipo da entidade prevê o papel argumentativo** (lente GLiNER): URL/mídia → FONTE; ator político/partido → CLAIM/EVIDÊNCIA.
- O acordo E1×E2 **cai** quando o corte se concentra em notas argumentativas reais — a divergência é sobre **delimitação**, não ruído.

## Estrutura do repositório

```
.
├── notebooks/                 # pipeline reprodutível (Colab/Jupyter)
│   ├── notebook_preparacao_v2.ipynb   # coleta, preparação, E1 (regras) e E2 (LLM)
│   └── notebook_conclusao.ipynb       # BIO, avaliação e resultados (fonte canônica)
├── data/                      # dataset, gold e dicionário de dados (ver data/README.md)
│   ├── dataset_anotado_final_com_bio.csv   # 1901 notas × 30 colunas (spans, métricas, BIO, sintaxe)
│   ├── dataset_anotado_final.parquet       # input canônico (E1/E2/métricas, gold vazio)
│   ├── qualitative_60_reasoning.jsonl      # raciocínio do E2 (PT) nas 60 notas
│   └── gold/                                # anotação humana (JSON + BIO/CoNLL)
├── docs/
│   ├── RELATORIO_FINAL.md     # relatório do trabalho
│   ├── ARQUITETURA.md         # documentação técnica do pipeline e dos artefatos
│   ├── guia_anotacao.md       # guia de anotação (definição dos rótulos)
│   └── Proposta_PLN.docx      # proposta original
├── explorador/                # visualização estática interativa (5 visões)
│   ├── index.html             # entrada local/offline do explorador
│   ├── data*.js               # dados embutidos das visões
│   ├── js/                    # lógica das visões
│   └── README.md              # regeneração dos dados do explorador
└── apps/
    ├── anotador/              # ambiente estático de anotação argumentativa
    │   ├── index.html         # entrada local/offline do anotador
    │   ├── data.js            # recorte de 60 notas para anotação
    │   ├── app.js             # lógica de marcação/exportação
    │   └── readme.md          # instruções de deploy e uso
    └── bio-converter/         # conversão de spans → BIO/CoNLL
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
   gera os gráficos. É a **fonte canônica dos números** do relatório; para o *gold*, aponte o(s)
   JSON(s) de anotador. Detalhes em
   [`docs/ARQUITETURA.md`](docs/ARQUITETURA.md).

> No ambiente local, leia Parquet com **`engine="fastparquet"`** ou DuckDB (as colunas de
> *span* são `LIST<STRUCT>` aninhadas). Ver notas em `docs/ARQUITETURA.md`.

### Explorador (visualização)

Abra **`explorador/index.html`** com duplo-clique — é estático e funciona offline (sem
servidor). Cinco visões: *Conjunto* (panorama do corpus), *Explorador de notas*, *BIO
(tokens)*, *Navegador de entidades* e *Painel de achados*. As visões também estão disponíveis em
[`explorador-argumentos.netlify.app`](https://explorador-argumentos.netlify.app/). Para regenerar
os dados embutidos, veja `explorador/README.md`.

### Anotador (ambiente de anotação)

O ambiente de anotação humana também é estático. Ele pode ser aberto localmente em
**`apps/anotador/index.html`** e está publicado em
[`anotador-argumentos.netlify.app`](https://anotador-argumentos.netlify.app/). A interface usa o
recorte de 60 notas em `apps/anotador/data.js` e exporta as marcações para posterior conversão em
BIO/CoNLL.

## Dados

O dataset principal é [`data/dataset_anotado_final_com_bio.csv`](data/dataset_anotado_final_com_bio.csv)
(1901 notas / 689 tweets), com *spans* de E1/E2, métricas por nota, projeção **BIO** e árvore de
dependências (`sintaxe_json`). O **dicionário de colunas** está em
[`data/README.md`](data/README.md). O corpus deriva do conjunto público
[`histlearn/notas-comunidade-ptbr`](https://huggingface.co/datasets/histlearn/notas-comunidade-ptbr).

## Limitações

- **Gold provisório (1 anotador).** O κ inter-anotador e o consenso dependem de uma segunda
  anotação independente, prevista.
- **Fronteiras de *span*** são o ponto fraco (penalizam a F1 estrita, sobretudo do E1).
- Escopo: **um** LLM, **um** idioma (PT-BR), corpus de um período.

## Licença e uso

Trabalho acadêmico desenvolvido para a disciplina de Processamento de Linguagem Natural
(UFSCar, 2026/1). O código e a documentação produzidos pelos autores estão disponíveis sob a
licença MIT; veja [`LICENSE`](LICENSE).

Os textos das notas derivam do Community Notes / X e do conjunto público
[`histlearn/notas-comunidade-ptbr`](https://huggingface.co/datasets/histlearn/notas-comunidade-ptbr);
o uso deve respeitar os termos e licenças dessas fontes. Materiais, modelos, bibliotecas e dados
de terceiros mantêm suas próprias licenças e são citados nos arquivos correspondentes.
