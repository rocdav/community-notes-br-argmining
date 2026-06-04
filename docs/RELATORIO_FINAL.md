# Relatório final — Mineração de Argumentação em Community Notes BR

**Disciplina:** Processamento de Linguagem Natural — UFSCar, 2026/1  
**Docente:** Profa. Dra. Helena Caseli  
**Grupo:** Álvaro Barros de Carvalho; Davi Machado da Rocha  
**Versão:** rascunho polido (1ª revisão)  

## Controle de validação

Este relatório é preenchido a partir das fontes primárias do projeto. Nesta versão, os
resultados quantitativos foram reconciliados a partir das células determinísticas de
`notebook_conclusao.ipynb`, reproduzidas sobre `dataset_anotado_final_com_bio.csv` pelo script
`_reconciliar_relatorio.py`. Os CSVs auxiliares foram gravados em `outputs/`, e as figuras
estáticas em `figuras_relatorio/`.

| Item | Fonte primária | Status |
|---|---|---|
| Objetivo, escopo, hipóteses e referências | `Proposta PLN.docx` | incorporar redação final |
| Definição dos rótulos e regras de anotação | `guia_anotacao.md` | usar na seção Dados |
| Preparação do corpus e E1 | `notebook_preparacao_v2.ipynb` | validar detalhes metodológicos |
| Resultados, BIO e avaliação | `notebook_conclusao.ipynb`; `outputs/` | reconciliado |
| Síntese visual e figuras | `explorador-argumentos/README.md`; `figuras_relatorio/` | figuras exportadas |
| Gold humano provisório | `anotacao_manual_davi-machado-da-rocha_2026-05-20.json` | limitação de 1 anotador |

## Resumo

Notas da comunidade (*Community Notes*) são textos curtos de checagem colaborativa associados
a publicações no X (Twitter). Enquanto o sistema avalia a *utilidade* de uma nota, pouco se
diz sobre sua **estrutura argumentativa interna**. Este trabalho formula essa estrutura como uma
tarefa de **Mineração de Argumentação (AM)** em português brasileiro — identificar e tipar *spans*
de **alegação (CLAIM)**, **evidência (EVIDENCIA)**, **fonte (FONTE)** e **qualificador
(QUALIFICADOR)** — e compara duas estratégias automáticas: **E1**, baseada em regras
léxico-sintáticas (spaCy), e **E2**, baseada em um modelo de linguagem de grande porte
(`qwen3.6-max-preview`). Sobre um corpus de **1 901 notas / 689 tweets**, as estratégias são
comparadas entre si (em três cortes) e, num recorte de **60 notas com anotação humana de
referência**, contra o *gold*. O principal achado é que **o LLM se aproxima mais do humano**,
enquanto **as regras compensam onde são fortes e baratas** — alta cobertura de FONTE e custo
ordens de grandeza menor —, e que **o tipo da entidade mencionada prevê o papel argumentativo**.

## 1. Introdução

### 1.1 Contexto

O *Community Notes* é um mecanismo de checagem comunitária em escala: usuários redigem notas que
contextualizam, qualificam ou refutam publicações potencialmente enganosas, e outras pessoas as
avaliam, determinando se a nota é exibida ao público. Boa parte das notas, contudo, **nunca chega
a ser exibida**, e a avaliação de *utilidade* — embora central ao sistema — não descreve **como** a
nota argumenta: quais trechos enunciam a alegação contestada, quais trazem evidência, quais citam
fontes e quais modulam o que é afirmado. Este trabalho parte da motivação registrada na
`Proposta PLN.docx`: tornar visível essa estrutura argumentativa no caso brasileiro, em português.

### 1.2 Problema de pesquisa

Formulamos a tarefa como **Mineração de Argumentação aplicada a notas de checagem em PT-BR**: dada
uma nota, segmentar e rotular seus *spans* argumentativos nos quatro tipos do esquema (CLAIM,
EVIDENCIA, FONTE, QUALIFICADOR). Não se avalia o mérito factual ou político das alegações; o objeto
é a **estrutura argumentativa**, não a veracidade.

### 1.3 Objetivo

O objetivo deste trabalho é comparar duas estratégias automáticas de extração e tipagem de *spans*
argumentativos em notas da comunidade em português brasileiro: **E1**, baseada em regras
léxico-sintáticas e spaCy; e **E2**, baseada em LLM. A comparação é feita entre as estratégias e,
no recorte anotado, contra uma anotação humana de referência.

### 1.4 Perguntas de pesquisa

1. Em que medida E1 e E2 **concordam** na identificação de *spans* argumentativos?
2. Qual estratégia se **aproxima mais da anotação humana** no recorte de 60 notas?
3. Quais tipos argumentativos são mais bem capturados por **regras** e quais pelo **LLM**?
4. O **tipo de entidade** mencionada no texto ajuda a prever o **papel argumentativo** desempenhado?

### 1.5 Contribuições

Este trabalho oferece: (i) um **pipeline reprodutível** de AM para notas de comunidade em PT-BR;
(ii) um **dataset anotado** automaticamente por E1 e E2 sobre 1 901 notas, com métricas por nota;
(iii) um **recorte de 60 notas com *gold* humano** (provisório, um anotador) e a respectiva
**normalização BIO** em nível de *token*; (iv) **análises interpretativas complementares** —
assinatura léxica por Dunning, lente de entidade × papel (GLiNER) e agência sintática; e (v) um
**explorador interativo** que materializa essas visões e serve de instrumento de inspeção.

## 2. Fundamentação e trabalhos relacionados

### 2.1 Mineração de Argumentação

A Mineração de Argumentação identifica componentes argumentativos e suas relações em texto
(Lawrence e Reed, 2020; Stab e Gurevych, 2017; Eger et al., 2017). Adotamos a formulação
**baseada em *spans*** (segmentos contíguos rotulados por tipo), com posterior conversão para
**rotulagem sequencial BIO** (`B-TIPO`, `I-TIPO`, `O`), formato usual para treino e avaliação
*token-level* e compatível com modelos de sequência (Lafferty et al., 2001).

### 2.2 Community Notes e checagem comunitária

As notas constituem um gênero textual próprio: curtas, ancoradas a um tweet, com função de
checagem, contextualização ou refutação (Habernal e Gurevych, 2017, para discurso de usuário).
A relevância social do caso brasileiro motiva o recorte em PT-BR; a análise mantém-se no plano
**estrutural-argumentativo**, sem julgar o conteúdo das alegações.

### 2.3 Abordagens simbólicas e neurais

Contrastamos duas famílias de método para extração estruturada: **regras léxico-sintáticas** sobre
análise morfossintática (spaCy / Universal Dependencies; Honnibal e Montani, 2017) e **LLMs** com
protocolo *snippet-para-offset* (na linha de Wang et al., 2023, para NER via LLM). As regras são
transparentes e baratas; o LLM é mais flexível a paráfrases, ao custo de latência e de alinhamento
do texto retornado.

### 2.4 Recursos complementares

Empregamos três camadas interpretativas: **Dunning Log-Likelihood** (Dunning, 1993) para assinatura
léxica por tipo; **GLiNER** para extração de entidades, cruzada com os papéis argumentativos; e
**análise por dependências** para distinguir a *agência* sintática das entidades.

## 3. Dados

### 3.1 Corpus

| Medida | Valor | Fonte |
|---|---:|---|
| Notas no corpus completo do experimento | 1 901 | `outputs/resumo_reconciliado.json` |
| Tweets únicos | 689 | `outputs/resumo_reconciliado.json` |
| Notas por tweet (média; máx.) | 2,8; 19 | `outputs/resumo_reconciliado.json` |
| Modelo LLM avaliado | `qwen3.6-max-preview` | `outputs/resumo_reconciliado.json` |
| Notas no recorte com *gold* humano | 60 | `outputs/resumo_reconciliado.json` |

O corpus deriva do conjunto publicado `histlearn/notas-comunidade-ptbr`; o campo `summary` é o
**texto anotável** da nota, e o tweet associado é usado como **contexto** (em especial para
ancorar a CLAIM contestada).

### 3.2 Recorte de avaliação humana

O *gold* foi construído sobre **60 notas estratificadas pelo status do Community Notes**:
**20 NMR**, **20 CRH** e **20 CRNH**, sem meta-notas.
A distribuição de status no corpus completo é fortemente assimétrica — NMR 78,9 %, CRNH 12,5 %,
CRH 7,0 % e Outro 1,6 % —, o que justifica a amostragem balanceada por status no recorte.

### 3.3 Esquema de anotação

| Rótulo | Definição operacional | Fonte |
|---|---|---|
| CLAIM | A alegação que a nota refuta, qualifica ou contextualiza. | `guia_anotacao.md` |
| EVIDENCIA | Fato, dado, contraexemplo ou justificativa que sustenta a checagem. | `guia_anotacao.md` |
| FONTE | Atribuição, veículo, órgão, especialista, documento ou URL citado como respaldo. | `guia_anotacao.md` |
| QUALIFICADOR | Marcador de modulação, ressalva, incerteza ou escopo. | `guia_anotacao.md` |

Os *spans* são marcados **apenas no texto da nota**; o tweet entra como contexto, não como alvo de
anotação. As definições operacionais devem ser transcritas integralmente do `guia_anotacao.md`.

### 3.4 Meta-notas

Parte das notas **não tem pretensão argumentativa** — comentários sobre o próprio sistema, humor,
opinião ou notas muito curtas. No corpus, **404 notas (21,3 %)** são meta (motivos predominantes:
prefixo *NNN*, "muito curta", "não necessita nota"). O **corte B** remove esse material para isolar
o desempenho sobre notas efetivamente argumentativas.

### 3.5 Normalização BIO

Os *spans* de E1, E2 e humano foram projetados de forma **determinística** para rótulos *token-level*
`B-TIPO`, `I-TIPO` e `O`, viabilizando avaliação por sequência (seqeval) e atendendo à recomendação
metodológica da disciplina. A projeção preserva os *offsets* de caractere e a tokenização da árvore
de dependências (campo `sintaxe_json`).

## 4. Metodologia

### 4.1 Visão geral do pipeline

[**Figura 1** — arquitetura do pipeline.] O fluxo é: corpus → preparação → extração por **E1**
(regras) → extração por **E2** (LLM) → seleção das 60 → anotação humana → normalização BIO →
avaliação (E1×E2 e vs *gold*) → análises complementares (Dunning, entidades, agência).

### 4.2 Estratégia 1: regras léxico-sintáticas

E1 usa **spaCy (`pt_core_news_md`)** — tokenização, lematização, POS e *dependency parsing* — mais
heurísticas por tipo e **regex de URL**. É **determinística, transparente e de custo baixíssimo**.
Por construção, alcança bem fontes explícitas (URLs, veículos), mas depende de padrões sentenciais
para CLAIM/EVIDÊNCIA, o que torna suas **fronteiras** mais frágeis.

### 4.3 Estratégia 2: LLM

E2 usa **`qwen3.6-max-preview`** com *prompt* que solicita os *spans* tipados; o modelo retorna
*snippets*, alinhados ao texto por um protocolo **snippet-para-offset**. URLs são garantidas por
regex e mescladas ao resultado, conforme o notebook. O modelo também produz um **raciocínio**
(traduzido para PT nas 60 notas), usado apenas como apoio qualitativo — não como gabarito.

### 4.4 Gold humano

As 60 notas foram anotadas segundo o `guia_anotacao.md`. **Nesta versão, o *gold* é provisório por
conter um único anotador**; o **κ inter-anotador** e o **consenso** (§4.5 da proposta) dependem da
**segunda anotação independente**, já prevista pelo grupo.

### 4.5 Métricas

| Métrica | Unidade | Interpretação | Fonte |
|---|---|---|---|
| F1 estrita | span | *Match* exato de *offset* e tipo. | `notebook_conclusao.ipynb` |
| F1 relaxada | span | Sobreposição mínima e tipo correto. | `notebook_conclusao.ipynb` |
| κ char-level | caractere | Concordância corrigida pelo acaso. | `notebook_conclusao.ipynb` |
| κ por presença | nota/tipo | Concordância sobre presença de cada tipo. | `notebook_conclusao.ipynb` |
| seqeval | token/BIO | Precisão, revocação e F1 por entidade BIO. | `notebook_conclusao.ipynb` |

### 4.6 Cortes de avaliação E1 × E2

| Corte | Composição | Pergunta respondida | n |
|---|---|---|---:|
| A — completo | Todas as notas do experimento. | Como as estratégias se comportam no corpus real? | 1 901 |
| B — sem meta-notas | Remove notas sem pretensão argumentativa. | Como performam nas notas argumentativas? | 1 497 |
| C — ambas produziram spans | Remove notas em que E1 ou E2 retornou zero spans. | Como concordam quando ambas extraem material? | 1 331 |

### 4.7 Análises complementares

Além das métricas, reportamos: **cobertura por tipo**, **anatomia dos spans** (volume por tipo),
**custo/latência**, **assinatura léxica por Dunning**, **lente entidade × papel** (GLiNER),
**agência sintática** e a leitura **token-level BIO**.

## 5. Resultados

> Os números desta seção foram reconciliados em `outputs/` por reprodução das células de métricas
> de `notebook_conclusao.ipynb`.

### 5.1 Acordo E1 × E2 nos três cortes

| Corte | n | F1 estrita | F1 relaxada | κ char-level |
|---|---:|---:|---:|---:|
| A — completo | 1 901 | 0,307 | 0,459 | 0,366 |
| B — sem meta | 1 497 | 0,272 | 0,446 | 0,338 |
| C — ambas marcaram | 1 331 | 0,250 | 0,466 | 0,334 |

O acordo **decai de A para C** na métrica estrita e no κ: quanto mais o corte se concentra em notas
com material argumentativo real, **mais as estratégias divergem nas fronteiras** — sinal de que a
discordância não é ruído, mas dissenso sobre a delimitação dos *spans*.

![Acordo E1 × E2 nos três cortes](figuras_relatorio/fig_03_acordo_cortes.png)

### 5.2 Comparação contra o *gold* humano

| Estratégia | F1 estrita | F1 relaxada | κ vs gold |
|---|---:|---:|---:|
| E1 | 0,017 | 0,136 | -0,003 |
| E2 | 0,340 | 0,466 | 0,428 |

**E2 supera amplamente E1** frente ao humano. A F1 **estrita** de E1 é quase nula: as regras erram
sobretudo a **fronteira** dos *spans* (a F1 relaxada, que exige apenas sobreposição, é bem maior).
O LLM, ao contrário, aproxima-se do humano tanto na presença quanto na extensão dos *spans*.

![Desempenho contra gold humano](figuras_relatorio/fig_04_desempenho_gold.png)

### 5.3 Cobertura por tipo

| Tipo | Cobertura E1 (%) | Cobertura E2 (%) |
|---|---:|---:|
| CLAIM | 26,0 | 60,2 |
| EVIDENCIA | 37,7 | 60,7 |
| FONTE | 72,0 | 56,5 |
| QUALIFICADOR | 0,6 | 4,1 |

A leitura confirma a divisão de trabalho: **E1 domina em FONTE** (72 %), onde URLs e veículos são
capturáveis por regra, mas é fraca em CLAIM/EVIDÊNCIA e quase ignora QUALIFICADOR; **E2 é mais
equilibrada** e cobre melhor os tipos discursivos.

![Cobertura por tipo argumentativo](figuras_relatorio/fig_05_cobertura_tipo.png)

### 5.4 Anatomia argumentativa no corpus

| Estratégia | CLAIM | EVIDENCIA | FONTE | QUALIFICADOR | Spans/nota com span |
|---|---:|---:|---:|---:|---:|
| E1 | 563 | 925 | **2 376** | 11 | 2,47 |
| E2 | 1 324 | **1 689** | 1 535 | 78 | 3,27 |

[**Figura 2** — anatomia argumentativa E1 × E2 (explorador, visão *Conjunto*).] As **regras
enxergam sobretudo FONTE**; o **LLM distribui** o esforço entre CLAIM, EVIDÊNCIA e FONTE,
padrão mais próximo do humano.

![Anatomia argumentativa no corpus](figuras_relatorio/fig_02_anatomia_spans.png)

### 5.5 Avaliação *token-level* BIO

A avaliação por entidade BIO confirma, em nível de *token*, o mesmo contraste observado nas
métricas por *span*: E2 aproxima-se do humano, enquanto E1 quase não recupera entidades BIO
humanas com fronteira e tipo corretos. No acordo E1×E2 do corpus inteiro, FONTE é o único tipo
com F1 expressiva, coerente com o caráter lexical desse papel.

| Comparação | Escopo | P | R | F1 |
|---|---|---:|---:|---:|
| E1 × E2 | micro | 0,181 | 0,253 | 0,211 |
| E1 × E2 | CLAIM | 0,015 | 0,045 | 0,023 |
| E1 × E2 | EVIDENCIA | 0,009 | 0,018 | 0,012 |
| E1 × E2 | FONTE | 0,522 | 0,404 | 0,456 |
| E1 × E2 | QUALIFICADOR | 0,013 | 0,100 | 0,023 |
| E1 vs humano | micro | 0,011 | 0,020 | 0,014 |
| E1 vs humano | CLAIM | 0,000 | 0,000 | 0,000 |
| E1 vs humano | EVIDENCIA | 0,051 | 0,036 | 0,043 |
| E1 vs humano | FONTE | 0,000 | 0,000 | 0,000 |
| E1 vs humano | QUALIFICADOR | 0,000 | 0,000 | 0,000 |
| E2 vs humano | micro | 0,293 | 0,485 | 0,366 |
| E2 vs humano | CLAIM | 0,321 | 0,447 | 0,374 |
| E2 vs humano | EVIDENCIA | 0,375 | 0,491 | 0,425 |
| E2 vs humano | FONTE | 0,132 | 0,714 | 0,222 |
| E2 vs humano | QUALIFICADOR | 0,000 | 0,000 | 0,000 |

![Avaliação token-level BIO](figuras_relatorio/fig_06_seqeval_bio.png)

### 5.6 Custo computacional e operação

| Estratégia | Latência mediana | p95 | Observações |
|---|---:|---:|---|
| E1 | 1,9 ms | 8,9 ms | Regras locais; custo desprezível. |
| E2 | 4,6 s | 10,8 s | API remota; ~10³× mais lenta (máx. 26,7 s). |

E2 é cerca de **três ordens de grandeza** mais lenta que E1 por nota. Registramos ainda **7 notas
recusadas** pelo filtro de conteúdo do provedor do LLM — um custo operacional inerente à
estratégia via API.

![Latência mediana por estratégia](figuras_relatorio/fig_operacional_latencia.png)

### 5.7 Assinatura léxica por tipo (Dunning)

Cada tipo tem vocabulário próprio (Dunning G², base E2):

| Tipo | Lemas mais distintivos |
|---|---|
| CLAIM | falso, news, post, fake, choquei, mente, astrazeneca, diploma, bilhões, custar |
| EVIDENCIA | ano, financeiro, confirmar, registro, código, parlamentar, janeiro, fiscalização, idade, controle |
| FONTE | conforme, fonte, artigo, acordo, site, constituição, sbt, canal, imprensa, inep |
| QUALIFICADOR | enganoso, potencialmente, provavelmente, claramente, apesar, acreditar, especulação, caso, importante, verdadeiro |

[**Figura 8**.] A assinatura é coerente com a semântica de cada papel: CLAIM concentra termos de
refutação (*falso, fake, mente*); FONTE, termos de atribuição/veículo (*conforme, fonte, imprensa*);
QUALIFICADOR, marcadores de modulação (*potencialmente, provavelmente, apesar*).

### 5.8 Lente entidade × papel argumentativo

Cruzando entidades (GLiNER) com o papel do E2, **o tipo da entidade prevê o papel**: entidades de
**URL_DOMINIO** e **VEICULO_MIDIA** caem em **FONTE**; **ATOR_POLITICO** e **PARTIDO** em
**CLAIM/EVIDÊNCIA**; órgãos públicos ficam mais espalhados. [**Figura 7** — heatmap tipo × papel,
explorador, visão *Navegador de entidades*.]

![Tipo de entidade × papel argumentativo](figuras_relatorio/fig_07_entidade_papel.png)

### 5.9 Agência sintática

Usando *dependency parsing*, distinguimos entidades que aparecem como **sujeito (agem)** das que
aparecem como **objeto/oblíquo (sofrem a ação)**. O padrão difere por entidade — por exemplo,
*Lula* ocorre mais como **sujeito** (45 ocorrências) do que como **objeto** (17), enquanto
*Brasil* aparece mais como **objeto** (56) do que como **sujeito** (18) —, sinal complementar à
lente de entidade.

## 6. Discussão

### 6.1 Interpretação central

1. **E2 aproxima-se mais do *gold* humano** do que E1, tanto na presença quanto na extensão.
2. **E1 compensa onde é forte e barata:** alta cobertura de **FONTE** e custo ~10³× menor.
3. As **fronteiras de span** são o principal ponto de dificuldade, sobretudo para E1.
4. O **tipo de entidade** fornece sinal estrutural para o papel argumentativo.
5. A **divergência E1×E2 concentra-se no material argumentativo real** (queda de A→C).

### 6.2 Por que as regras falham na fronteira

CLAIMs parafraseados, evidências com limites semânticos fluidos e fontes encadeadas escapam a
padrões sentenciais fixos. As regras acertam o **núcleo** (especialmente URLs/veículos), mas
estendem ou cortam o *span* de forma rígida, o que penaliza a F1 estrita e o κ.

### 6.3 Por que o LLM se aproxima do humano

O LLM lida melhor com **paráfrase**, **contexto discursivo** e papéis **menos lexicais**,
reconhecendo CLAIM/EVIDÊNCIA que não dependem de palavras-gatilho. O custo é a **latência** e a
necessidade de **alinhar** o texto retornado aos *offsets* da nota.

### 6.4 Valor das análises complementares

Dunning, entidades e agência **não são métricas de desempenho**, mas **lentes interpretativas**:
mostram que o corpus tem assinatura léxica regular por tipo e estrutura previsível entre tipo de
entidade e papel — leitura que uma única métrica de F1 não revelaria.

## 7. Limitações

1. O *gold* humano é **provisório e contém um anotador**; a segunda anotação independente e o
   consenso ficam como etapa pendente.
2. As **fronteiras de span** são difíceis de estabilizar e penalizam fortemente a F1 estrita.
3. O estudo avalia **um único modelo LLM** e **um único idioma**.
4. O corpus pertence a um **gênero e período específicos** do Community Notes.
5. A medida de fidelidade CLAIM–tweet baseada em TF-IDF é **lexical** e não captura paráfrases
   profundas.

## 8. Conclusão e trabalhos futuros

Comparamos duas estratégias de Mineração de Argumentação em notas de comunidade em PT-BR. **E2
(LLM) aproxima-se mais da anotação humana** e cobre melhor os tipos discursivos; **E1 (regras)
não acompanha o humano nas fronteiras**, mas oferece **alta cobertura de FONTE a custo
desprezível** — o que sugere um arranjo **complementar** (regras para fontes/URLs, LLM para o
restante). Respondendo às perguntas: E1 e E2 concordam moderadamente, com acordo que cai onde há
material argumentativo real (P1); E2 aproxima-se mais do humano (P2); regras vencem em FONTE e o
LLM nos demais tipos (P3); e o **tipo de entidade prevê o papel argumentativo** (P4).

Trabalhos futuros:

1. Concluir a **segunda anotação independente** e fechar o **consenso** humano.
2. Recalcular as métricas contra o consenso, incluindo **κ inter-anotador**.
3. Treinar/avaliar **modelos *token-level* em BIO** (ex.: CRF, BERTimbau).
4. Comparar **outros LLMs** e modelos específicos para português.
5. Ampliar a análise **longitudinal e temática** do corpus.

## Referências

[Normalizar em ABNT ou no formato exigido pela disciplina; base inicial na `Proposta PLN.docx`.]

- Agência Lupa. Só 8% das notas da comunidade feitas em português no X chegam aos usuários. 2023.
- Dunning, T. Accurate methods for the statistics of surprise and coincidence. 1993.
- Eger, S.; Daxenberger, J.; Gurevych, I. Neural end-to-end learning for computational argumentation mining. 2017.
- Habernal, I.; Gurevych, I. Argumentation mining in user-generated web discourse. 2017.
- Honnibal, M.; Montani, I. spaCy 2: Natural language understanding. 2017.
- Lafferty, J.; McCallum, A.; Pereira, F. Conditional random fields. 2001.
- Landis, J. R.; Koch, G. G. The measurement of observer agreement for categorical data. 1977.
- Lawrence, J.; Reed, C. Argument mining: a survey. 2020.
- Núcleo Jornalismo. O que o Twitter sob Musk significa para o Sul Global. 2022.
- Qwen Team. Qwen3.6 technical overview. 2025.
- Rocha, D. M. Community Notes BR: an enriched Portuguese subset of X's crowdsourced fact-checking notes. 2026.
- Schneider, E. T. R. et al. Ferramentas e recursos para o processamento sintático. 2026.
- Souza, F.; Nogueira, R.; Lotufo, R. BERTimbau. 2020.
- Stab, C.; Gurevych, I. Parsing argumentation structures in persuasive essays. 2017.
- Wang, S. et al. GPT-NER: Named entity recognition via large language models. 2023.

## Apêndice A: Artefatos reprodutíveis

| Artefato | Uso no relatório |
|---|---|
| `notebook_preparacao_v2.ipynb` | Preparação do corpus e descrição de E1/E2 inicial. |
| `notebook_conclusao.ipynb` | Fonte canônica de resultados, BIO e avaliação. |
| `_reconciliar_relatorio.py` | Reprodução controlada das células de métricas e exportação de figuras. |
| `outputs/` | CSVs reconciliados: cortes, cobertura, vs gold, seqeval, latência e alinhamento. |
| `figuras_relatorio/` | Figuras estáticas exportadas para incorporação ao relatório. |
| `dataset_anotado_final_com_bio.csv` | Dataset completo com spans, métricas, BIO e sintaxe. |
| `anotacao_manual_davi-machado-da-rocha_2026-05-20.json` | Gold humano provisório. |
| `anotacao_manual_davi_2026-06-03_bio.conll` | Exemplo/exportação BIO do gold. |
| `qualitative_60_reasoning.jsonl` | Raciocínio qualitativo do E2 nas 60 notas. |
| `explorador-argumentos/` | Visualização interativa (5 visões) para figuras e inspeção. |

## Apêndice B: Figuras previstas

| Figura | Conteúdo | Fonte sugerida |
|---|---|---|
| Figura 1 | Arquitetura do pipeline | `Proposta PLN.docx` ou reconstrução |
| Figura 2 | Anatomia de spans E1 × E2 | `figuras_relatorio/fig_02_anatomia_spans.png` |
| Figura 3 | Acordo E1 × E2 nos três cortes | `figuras_relatorio/fig_03_acordo_cortes.png` |
| Figura 4 | Desempenho contra *gold* humano | `figuras_relatorio/fig_04_desempenho_gold.png` |
| Figura 5 | Cobertura por tipo | `figuras_relatorio/fig_05_cobertura_tipo.png` |
| Figura 6 | Avaliação BIO *token-level* | `figuras_relatorio/fig_06_seqeval_bio.png` |
| Figura 7 | Heatmap tipo de entidade × papel | `figuras_relatorio/fig_07_entidade_papel.png` |
| Figura 8 | Assinatura léxica por tipo | `notebook_conclusao.ipynb`; explorador |

## Apêndice C: Pendências para a versão final

1. Decidir o **formato final** exigido pela disciplina: Markdown, DOCX ou LaTeX.
2. Incorporar a **segunda anotação humana** e recalcular contra o consenso, se disponível a tempo.
3. Transcrever as **definições dos rótulos** do `guia_anotacao.md` (§3.3) e fechar as **referências** em ABNT.
4. Fazer uma revisão textual final para remover linguagem de rascunho e padronizar citações.
