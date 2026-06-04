# Relatório final — Mineração de Argumentação em Community Notes BR

**Disciplina:** Processamento de Linguagem Natural — UFSCar, 2026/1
**Docente:** Profa. Dra. Helena Caseli
**Grupo:** Álvaro Barros de Carvalho; Davi Machado da Rocha

## Resumo

As *Community Notes* do X são textos curtos de checagem colaborativa, escritos por usuários e atrelados a uma publicação. O sistema da plataforma decide se uma nota é *útil* e merece aparecer, mas não diz nada sobre *como* ela argumenta. É essa lacuna que investigamos. Tomamos a estrutura interna da nota como objeto e tratamos a tarefa como *Mineração de Argumentação* (AM) em português brasileiro: localizar e classificar, no texto, os trechos que fazem uma *alegação* (CLAIM), apresentam uma *evidência* (EVIDENCIA), citam uma *fonte* (FONTE) ou *modulam* o que se afirma (QUALIFICADOR).

Comparamos duas estratégias de extração. A primeira, E1, é simbólica: combina regras léxico-sintáticas com a análise do spaCy. A segunda, E2, usa o modelo de linguagem `qwen3.6-max-preview`. Sobre um corpus de 1 901 notas e 689 tweets, medimos uma contra a outra em três cortes, e ambas contra um *gold* humano de 60 notas.

O resultado é assimétrico. O modelo de linguagem se aproxima da anotação humana justamente onde a regra falha — na delimitação exata do trecho e nos papéis que dependem pouco de palavras-gatilho. A regra, por sua vez, se sai bem onde o trabalho é barato e literal: na cobertura de FONTE. Por baixo das métricas há ainda um achado estrutural: o *tipo* da entidade mencionada antecipa o papel que ela cumpre no argumento. Uma URL costuma ser fonte; um ator político, alegação.

## 1. Introdução

### 1.1 Contexto e recorte conceitual

O *Community Notes* funciona como uma checagem distribuída: qualquer usuário pode escrever uma nota que contextualiza, qualifica ou refuta uma publicação, e um grupo de avaliadores decide se ela será exibida. No nosso corpus, o estado mais comum de uma nota não é "útil" nem "não útil": é *precisa de mais avaliações* (NMR), que responde por quase quatro em cada cinco notas. Ou seja, na maior parte do tempo o sistema não decide — ele adia a decisão. Esse dado é importante porque desloca a pergunta do trabalho. Não queremos saber se a nota está certa, e sim descrever do que ela é feita.

Vale também nomear o objeto com precisão. "Checagem de fatos" é um rótulo cômodo, mas impreciso: o que a nota faz é verificar a *verossimilhança de um enunciado*, e verossimilhança não é verdade. A nota não prova nada; ela argumenta — alega, apresenta evidência, cita uma fonte, faz ressalvas. Tomar essa estrutura como objeto de PLN pressupõe que há regularidade ali, e que essa regularidade pode ser anotada, extraída e medida. Não julgamos o mérito factual ou político das alegações; ficamos no plano estrutural. É uma decisão de escopo, e ela deixa de fora, de propósito, duas coisas: a relação entre os componentes (qual evidência sustenta qual alegação) e a veracidade em si.

### 1.2 Do Seminário 1 a este relatório

No Seminário 1, apresentamos a proposta no essencial: a tarefa de AM sobre as notas em português, o corpus de origem e as duas estratégias de extração — a simbólica (E1) e a do modelo de linguagem (E2), ambas já previstas desde o início. Esse núcleo se manteve. O que mudou foi o caminho, em quatro pontos.

O primeiro é metodológico e responde a recomendações da disciplina: normalizamos a anotação para o formato *BIO*, em nível de *token*, e acrescentamos uma avaliação semiautomática (seqeval) ao lado da comparação com o humano. O segundo é de proveniência, e talvez o mais importante: passamos a *guardar* no dataset a anotação linguística — POS e dependências — que o notebook anterior calculava e descartava. Preservá-la (no campo `sintaxe_json`) custou pouco e rendeu muito, porque é dela que vivem as análises posteriores. O terceiro são essas próprias análises — a assinatura léxica por Dunning, a lente que cruza tipo de entidade e papel, a agência sintática —, que não estavam na proposta inicial. O quarto é o explorador interativo que as materializa, também novo em relação à apresentação.

O *gold*, por fim, continua provisório: foi anotado por uma única pessoa, e tratamos isso como um limite declarado, não como um detalhe.

### 1.3 Tarefa, perguntas e objetivo

A tarefa que escolhemos é a segmentação e tipagem de *spans* argumentativos no texto da nota, nos quatro rótulos do esquema. O objetivo é duplo: comparar E1 e E2 entre si e contra a referência humana, e caracterizar o que distingue uma extração simbólica de uma neural neste gênero de texto. Quatro perguntas guiam a análise:

1. Em que medida E1 e E2 concordam na identificação dos *spans*?
2. Qual das duas se aproxima mais da anotação humana, no recorte de 60 notas?
3. Que tipos argumentativos a regra captura melhor, e quais o modelo de linguagem?
4. O tipo da entidade mencionada ajuda a prever o papel argumentativo que ela ocupa?

## 2. Fundamentação e trabalhos relacionados

A Mineração de Argumentação identifica componentes argumentativos e suas relações em um texto (Lawrence e Reed, 2020; Stab e Gurevych, 2017; Eger et al., 2017). Adotamos a formulação *baseada em spans* — segmentos contíguos rotulados por tipo —, com conversão posterior para *rotulagem sequencial BIO* (`B-TIPO`, `I-TIPO`, `O`), o formato usual para avaliar em nível de *token* e para treinar modelos de sequência (Lafferty et al., 2001).

O gênero impõe condições próprias. A nota é curta, presa a um tweet, e cumpre função de checagem ou contextualização — é discurso de usuário, com a informalidade e o ruído que isso traz (Habernal e Gurevych, 2017). Por isso mantivemos a análise no plano estrutural-argumentativo, sem deslizar para a avaliação do conteúdo.

Duas famílias de método podem dar conta da tarefa. De um lado, regras léxico-sintáticas apoiadas em análise morfossintática — o spaCy e o quadro de *Universal Dependencies* (Honnibal e Montani, 2017): transparentes e baratas, mas limitadas ao padrão que se escreveu. De outro, modelos de linguagem operando por um protocolo de *snippet*-para-*offset*, na linha do que se propôs para NER via LLM (Wang et al., 2023): flexíveis diante da paráfrase, ao custo de latência e de um alinhamento que pode falhar. Três recursos complementam a leitura — não como métrica de desempenho, mas como instrumento de interpretação: o *log-likelihood* de Dunning (1993) para a assinatura léxica de cada papel; o GLiNER para a extração de entidades; e a análise por dependências para a agência sintática.

## 3. Dados e medidas de avaliação

### 3.1 Corpus

| Medida | Valor |
|---|---:|
| Notas no corpus do experimento | 1 901 |
| Tweets únicos | 689 |
| Notas por tweet (média; máx.) | 2,8; 19 |
| Modelo de linguagem avaliado | `qwen3.6-max-preview` |
| Notas no recorte com *gold* humano | 60 |

O corpus deriva do conjunto publicado `histlearn/notas-comunidade-ptbr`. O campo `summary` é o texto que anotamos; o tweet associado entra como *contexto* — útil sobretudo para ancorar a CLAIM, que muitas vezes não está na nota, mas naquilo que a nota contesta.

### 3.2 Esquema de rótulos

Quatro tipos organizam a anotação. As definições abaixo seguem o `guia_anotacao.md`; no guia, o rótulo aparece como EVIDÊNCIA, mas a forma técnica usada nos artefatos é `EVIDENCIA`.

**CLAIM — a alegação refutada.** É o trecho da nota que expressa a afirmação que o tweet fazia e que a nota agora corrige ou qualifica. Pode aparecer como negação direta, paráfrase ou citação. Pistas léxicas frequentes em PT-BR: "não é verdade que X"; "é falso que X"; "a foto/imagem/vídeo não mostra X"; "não há evidência de que X"; "X não aconteceu"; "X é antiga/de 2013". Exemplo positivo:

```text
NOTA: "A foto não mostra um protesto em Brasília em 2024."
                          [CLAIM]
```

Exemplo negativo:

```text
NOTA: "Segundo a AFP, a imagem é de 2013."
       [FONTE]        [EVIDENCIA]
```

Nesse caso não há CLAIM no texto: a alegação está implícita no tweet, e a nota apresenta só a refutação.

**EVIDENCIA — o fato que sustenta a checagem.** É o conteúdo factual, descritivo ou numérico que a nota oferece como base para contrariar ou qualificar o tweet. Costuma seguir a estrutura "X não é Y, é Z". Pistas léxicas: verbos factivos como *mostra*, *indica*, *comprova*, *confirma*, *revela*, *evidencia*; valores numéricos, datas e percentuais; contraexemplos como "na verdade" e "ao contrário". Exemplo positivo:

```text
NOTA: "O reajuste foi de 4,9%, e não 500% como afirma o tweet."
       [EVIDENCIA]                          [CLAIM]
```

Exemplo negativo:

```text
NOTA: "Estudos mostram que a vacina é segura."
       [FONTE — não é EVIDENCIA]
```

"Estudos", aqui, é uma atribuição genérica; o conteúdo da evidência ("a vacina é segura") não tem suporte concreto na nota.

**FONTE — atribuição.** É quem ou o que a nota cita como autoridade ou base da informação. Pode ser veículo de mídia, especialista, órgão público, documento ou URL. Pistas léxicas: "segundo X", "de acordo com X", "conforme X"; estruturas como "X afirma", "X informa", "X publicou" ou "X apurou"; URLs completas; nomes de veículos, órgãos e instituições, como G1, Folha, Lupa, AFP, Reuters, STF, TSE, Anvisa e Ministério da Saúde. Exemplos:

```text
"Segundo a Agência Lupa,..."     -> [FONTE: "Segundo a Agência Lupa"]
"Fonte: https://lupa.uol.com.br" -> [FONTE: "https://lupa.uol.com.br"]
"...conforme análise do G1."     -> [FONTE: "conforme análise do G1"]
"...divulgou o Ministério..."    -> [FONTE: "o Ministério"]
```

Uma observação do guia: as URLs são pré-marcadas como FONTE pelo pipeline; se aparecem destacadas na tela do anotador, isso está correto e integra a anotação.

**QUALIFICADOR — modulação ou ressalva.** São advérbios, locuções e expressões que modulam o grau de certeza ou o escopo de uma alegação. Lista frequente: *aparentemente*, *provavelmente*, *possivelmente*, *supostamente*, *alegadamente*, *talvez*; *parcialmente*, *parcialmente verdadeiro*, *fora de contexto*; *ao que tudo indica*, *sem evidência clara*, *não há prova de*. Exemplos:

```text
"Aparentemente, o vídeo é falso."
 [QUALIFICADOR]

"A informação está parcialmente correta."
                    [QUALIFICADOR]
```

Não marcamos como QUALIFICADOR: adjetivos descritivos sem função modal, como "rapidamente" e "claramente" — este último só vira QUALIFICADOR em casos como "claramente uma sátira"; e conectivos como "porém" e "entretanto", que são discursivos, não epistêmicos.

Os *spans* são marcados apenas no texto da nota; o tweet permanece como contexto, fora do alvo de anotação.

### 3.3 Recorte com gold e meta-notas

O *gold* foi construído sobre 60 notas estratificadas pelo status do Community Notes — 20 NMR, 20 CRH e 20 CRNH —, de propósito sem meta-notas. A estratificação tem uma razão: a distribuição real é desbalanceada (NMR 78,9 %, CRNH 12,5 %, CRH 7,0 %, Outro 1,6 %), e uma amostra proporcional seria, na prática, uma amostra só de NMR.

Nem toda nota argumenta. Há comentários sobre o próprio sistema, piadas, opiniões e notas curtas demais para ter estrutura. São 404 (21,3 %) dessas *meta-notas* no corpus, com motivos predominantes de prefixo *NNN*, "muito curta" e "não necessita nota". Distingui-las foi importante em dois momentos: na seleção do recorte humano, que as exclui, e na avaliação, em que um corte específico (B) as remove para isolar o material que de fato argumenta.

### 3.4 Normalização BIO

As estratégias e o anotador humano produzem *spans*: intervalos contínuos no texto, definidos por início, fim e tipo. Já a avaliação por seqeval espera outra forma de dado: uma sequência de rótulos, um para cada *token*. A normalização BIO é a ponte entre essas duas representações. Ela não muda a anotação; apenas projeta a mesma marcação, feita originalmente em caracteres, para a grade dos *tokens*.

Para que a comparação fosse justa, projetamos as três fontes — E1, E2 e humano — sobre a mesma tokenização (`spacy_pt_blank_v1`). Esse ponto é central: se cada fonte fosse tokenizada de um jeito, as sequências BIO poderiam ter tamanhos ou fronteiras diferentes, e a comparação *token* a *token* deixaria de fazer sentido. Por isso tokenizamos cada nota uma única vez; para cada *token*, registramos o texto e seus *offsets* de caractere (`bio_offsets_json`); só então comparamos os *spans* de cada fonte a esses intervalos.

A regra básica é simples. Se um *token* não toca nenhum *span*, recebe `O`. Se toca um *span* do tipo `TIPO`, passa a pertencer a ele: o primeiro *token* coberto recebe `B-TIPO`, e os seguintes recebem `I-TIPO`. Assim, um trecho marcado como EVIDENCIA em caracteres vira uma sequência `B-EVIDENCIA`, `I-EVIDENCIA`, `I-EVIDENCIA` até o fim.

O único ponto delicado é a fronteira. Um *token* pode atravessar a borda de um *span* ou, em tese, ser compatível com mais de um. Resolvemos esses casos com uma política fixa e versionada (`token_max_overlap_then_longest_then_type_priority`, projeção 2.0.0): primeiro vence o *span* que mais se sobrepõe ao *token* em número de caracteres; havendo empate, vence o mais longo; se ainda persistir, aplica-se uma prioridade de tipo. A decisão não depende, portanto, da ordem em que os *spans* aparecem no arquivo.

Na prática, os *spans* de uma mesma fonte quase nunca competem entre si — no E2, não houve nenhuma sobreposição interna —, de modo que a política age principalmente nos *tokens* de borda. Como preservamos os *offsets* originais, a leitura por *span* e a leitura BIO descrevem o mesmo objeto em duas resoluções: uma contínua, por caracteres; outra discreta, por *tokens*. Foi essa projeção que viabilizou a avaliação por seqeval e atendeu à recomendação de representar a tarefa em BIO.

### 3.5 Medidas de avaliação

O que cada estratégia entrega é uma lista de *spans* tipados. Cada item traz três informações — onde o trecho começa, onde termina e de que tipo é —, gravadas como posições de caractere no texto da nota: `[120, 158) / EVIDENCIA` quer dizer "do caractere 120 ao 157, uma evidência". Avaliar o sistema é, no fundo, conferir se esses itens batem com os de outra lista. No recorte com *gold*, a outra lista é a anotação humana; na comparação E1×E2, é a saída da estratégia rival — e aí o número mede acordo, não "acerto". Nenhuma medida sozinha conta a história inteira, então usamos quatro, cada uma respondendo a uma pergunta distinta.

A mais óbvia é de correspondência item a item: dos *spans* que o sistema marcou, quantos têm par na referência? E dos *spans* da referência, quantos ele recuperou? É o que precisão, revocação e F1 resumem. Numa nota, um verdadeiro positivo ($TP$) é um *span* do sistema que encontra par; um falso positivo ($FP$) é um *span* que o sistema marcou sem que houvesse par; um falso negativo ($FN$) é um *span* da referência que ele deixou passar. As fórmulas apenas organizam essa contagem:

$$
P = \frac{TP}{TP + FP}, \qquad R = \frac{TP}{TP + FN}, \qquad F_1 = \frac{2PR}{P+R}.
$$

Tudo depende, então, de uma decisão: o que conta como "ter par"? Adotamos duas leituras. Na F1 estrita, só há par quando tipo, início e fim coincidem exatamente — `[120, 158) / EVIDENCIA` casa com `[120, 158) / EVIDENCIA`, mas não com `[118, 158) / EVIDENCIA`, que começa duas posições antes. Na F1 relaxada, o tipo ainda precisa bater, mas basta que os trechos se sobreponham: `[118, 158)` e `[120, 158)` passam a contar como o mesmo trecho. Formalmente, para um *span* de referência $r=[i_r, j_r)$ e um do sistema $s=[i_s, j_s)$, ambos de tipo $t$:

$$
\text{estrito:}\quad i_r = i_s \,\wedge\, j_r = j_s
\qquad\qquad
\text{relaxado:}\quad [i_r, j_r) \cap [i_s, j_s) \neq \varnothing.
$$

A distância entre as duas é, na prática, o tamanho do erro de fronteira. Quando a relaxada sobe e a estrita não acompanha, o sistema achou a região certa, mas cortou palavras a mais ou a menos. Foi um padrão recorrente aqui: E1 encontra o sinal lexical — sobretudo em FONTE — e, mesmo assim, erra o limite fino do *span*.

Essas três medidas têm um ponto cego: enxergam só os *spans* marcados e ignoram todo o texto que ambas as fontes deixaram de fora. Para olhar a nota inteira, usamos o *kappa* de Cohen em nível de caractere. Damos um rótulo a cada caractere — CLAIM, EVIDENCIA, FONTE, QUALIFICADOR ou `O` — e medimos quanto as duas rotulações concordam, descontando a concordância que cairia por acaso, só pela proporção de cada rótulo:

$$
\kappa = \frac{p_o - p_e}{1 - p_e}.
$$

$p_o$ é a concordância de fato observada entre as duas sequências de caracteres; $p_e$, a esperada ao acaso. O *kappa* vale 1 no acordo perfeito, 0 quando o acordo não supera o acaso, e fica negativo quando é pior que isso. Medimos em caractere por um motivo simples: é a unidade em que E1, E2 e humano produzem seus *spans*, de modo que o *kappa* avalia exatamente o que foi anotado, sem intermediário.

Falta a leitura que a disciplina recomendou: e se passarmos os *spans* a rótulos por *token* e tratarmos tudo como rotulagem de sequência? Aí entra o seqeval. Depois da projeção BIO da seção anterior, ele exige, para um acerto, o mesmo tipo e as mesmas fronteiras de *token* — é a leitura estrita de novo, agora sobre entidades BIO. Reportamos a média *micro*, que junta $TP$, $FP$ e $FN$ de todos os tipos num número só, e também o resultado por tipo, porque CLAIM, EVIDENCIA e FONTE se comportam de maneiras bem diferentes no corpus.

As quatro leituras não competem; encaixam-se. A estrita pergunta se o *span* saiu exato; a relaxada, se ao menos caiu na região certa; o *kappa* abre o foco para o texto todo; o seqeval reescreve o problema na forma que um modelo de sequência entenderia.

## 4. Estratégias

### 4.1 Visão geral do pipeline

O fluxo encadeia: corpus → `notebook_preparacao_v2.ipynb` (preparação, seleção das 60 notas e extrações E1/E2) → anotação humana → `notebook_conclusao.ipynb` (normalização BIO e avaliação E1×E2 e contra o *gold*) → camadas interpretativas (Dunning, entidades, agência). A arquitetura completa está na Figura 1.

![Arquitetura do pipeline](figuras_relatorio/fig_01_arquitetura.png)

*Figura 1 — Arquitetura do pipeline experimental: o notebook de preparação produz as extrações E1 e E2; o notebook de conclusão realiza normalização BIO, avaliação, figuras e artefatos finais.*

### 4.2 Estratégia E1 — regras léxico-sintáticas

**Recursos em língua portuguesa.** E1 se apoia no modelo `pt_core_news_md` do spaCy, treinado para o português, do qual usa tokenização, lematização, etiquetagem morfossintática (POS) e análise de dependências.

**Pré-processamento e representação.** Cada nota é tokenizada e analisada sintaticamente. Sobre essa representação aplicamos heurísticas por tipo — padrões léxico-sintáticos para CLAIM e EVIDENCIA — e uma *regex* de URL que garante a captura de FONTE. A saída é uma lista de *spans* `{início, fim, tipo}`, depois projetada para BIO. A estratégia é determinística e transparente: quando acerta, acerta por uma razão que está escrita no código; quando erra, erra pela mesma razão.

**O que isso implica.** Uma regra não lê o argumento; lê a marca do argumento. Ela encontra a URL porque a URL tem forma fixa, e perde a alegação parafraseada porque a paráfrase não tem forma fixa. Esse viés não é defeito de implementação — é a natureza do método, e vai reaparecer em cada métrica adiante.

### 4.3 Estratégia E2 — modelo de linguagem

**Recursos.** E2 usa o modelo `qwen3.6-max-preview`, multilíngue, acessado por API. O prompt descreve o esquema de rótulos e pede os *spans* tipados. Além dos trechos, o modelo devolve um *raciocínio* — uma justificativa em linguagem natural, traduzida para o português nas 60 notas, que usamos na análise qualitativa, nunca como gabarito.

**Pré-processamento e representação.** O modelo retorna *snippets* de texto, não posições. Um protocolo de *snippet*-para-*offset* os realinha à nota, com vários níveis de tolerância (exato, normalizado, *regex*), e registramos qual nível foi usado em cada caso. As URLs, de novo, são garantidas por *regex* e mescladas ao resultado, porque um modelo de linguagem é desnecessário — e pouco confiável — para uma subtarefa puramente formal como essa. A saída segue para a mesma projeção BIO.

**O que isso implica.** O modelo lê o discurso, não apenas sua superfície lexical. Reconhece a alegação que não traz palavra-gatilho e a evidência cuja fronteira é semântica, não sintática. Paga por isso em latência e numa dependência incômoda: o trecho precisa *voltar* ao texto, e nem sempre volta inteiro.

### 4.4 Anotação humana

As 60 notas foram anotadas segundo o `guia_anotacao.md`. Nesta versão, o *gold* é obra de um único anotador — e isso tem uma consequência metodológica direta. Sem um segundo anotador independente, não há *kappa* inter-anotador nem consenso; o que chamamos de "humano", aqui, é uma voz, não um coro. Assumimos esse limite e o tratamos como etapa pendente, não como nota de rodapé.

### 4.5 Dificuldades encontradas

Algumas dificuldades foram de método, outras de engenharia. Vale enumerá-las, porque elas desenham o contorno do que foi possível fazer.

A primeira é a *fronteira*. Onde começa e onde termina uma evidência é uma decisão fluida, e foi a maior fonte de desacordo — tanto entre as duas estratégias quanto contra o humano. A segunda é o *alinhamento* do E2: nem todo *snippet* devolvido pelo modelo reencontra sua posição exata, e 488 notas não produziram nenhum *span* alinhável (meta-notas, retornos vazios, recusas). A terceira é operacional: o provedor do modelo *recusou* 7 notas por filtro de conteúdo — um custo silencioso de depender de uma API. A quarta foi de representação: as colunas de *span*, gravadas como estruturas aninhadas, exigiram leitura com ferramentas que as preservam (DuckDB, `fastparquet`), sob pena de voltarem vazias. A quinta é o *desbalanceamento*: NMR domina o corpus, e QUALIFICADOR é tão raro que quase some das métricas — o que limita o que podemos afirmar sobre esse tipo. A sexta, já mencionada, é o *gold* de um anotador só.

## 5. Resultados — avaliação quantitativa

Os números a seguir foram reconciliados de forma reprodutível a partir das células determinísticas de `notebook_conclusao.ipynb`, que consome os *spans* E1/E2 produzidos na preparação e executa a normalização BIO e as medidas de avaliação (script `_reconciliar_relatorio.py`, saídas em `outputs/`).

### 5.1 Acordo E1 × E2 nos três cortes

| Corte | n | F1 estrita | F1 relaxada | κ char-level |
|---|---:|---:|---:|---:|
| A — completo | 1 901 | 0,307 | 0,459 | 0,366 |
| B — sem meta | 1 497 | 0,272 | 0,446 | 0,338 |
| C — ambas marcaram | 1 331 | 0,250 | 0,466 | 0,334 |

O acordo cai de A para C na métrica estrita e no *kappa*. O sentido do movimento importa: quanto mais o corte se restringe a notas com material argumentativo de verdade, mais as duas estratégias divergem. A discordância, portanto, não está no ruído — está exatamente onde há argumento para delimitar.

![Acordo E1 × E2 nos três cortes](figuras_relatorio/fig_03_acordo_cortes.png)

*Figura 2 — Acordo entre E1 e E2 nos cortes A, B e C, medido por F1 estrita, F1 relaxada e κ em nível de caractere.*

### 5.2 Comparação contra o gold humano

| Estratégia | F1 estrita | F1 relaxada | κ vs gold |
|---|---:|---:|---:|
| E1 | 0,017 | 0,136 | −0,003 |
| E2 | 0,340 | 0,466 | 0,428 |

A distância é grande, e mostra onde cada estratégia falha. A F1 estrita de E1 é quase nula, e seu *kappa* contra o humano beira o zero: as regras acertam o miolo do trecho, mas erram a borda, e a métrica estrita não perdoa a borda. A relaxada melhora porque exige apenas sobreposição. O E2, ao contrário, acompanha o humano tanto na presença quanto na extensão dos *spans*.

![Desempenho contra gold humano](figuras_relatorio/fig_04_desempenho_gold.png)

*Figura 3 — Desempenho de E1 e E2 contra o gold humano nas métricas por span e por caractere.*

### 5.3 Cobertura por tipo

| Tipo | Cobertura E1 (%) | Cobertura E2 (%) |
|---|---:|---:|
| CLAIM | 26,0 | 60,2 |
| EVIDENCIA | 37,7 | 60,7 |
| FONTE | 72,0 | 56,5 |
| QUALIFICADOR | 0,6 | 4,1 |

Aqui aparece a divisão de trabalho entre as duas. A regra cobre 72 % das FONTEs — o território da URL e do veículo de imprensa, onde a forma do texto já entrega o papel — e desaba em CLAIM e EVIDENCIA, que dependem de discurso. O modelo é mais equilibrado entre os três tipos maiores. QUALIFICADOR é deserto para os dois, e a razão está no corpus: o tipo é raro demais para sustentar qualquer cobertura.

![Cobertura por tipo argumentativo](figuras_relatorio/fig_05_cobertura_tipo.png)

*Figura 4 — Cobertura de E1 e E2 por tipo argumentativo no corpus completo.*

### 5.4 Anatomia argumentativa no corpus

| Estratégia | CLAIM | EVIDENCIA | FONTE | QUALIFICADOR | Spans/nota (com span) |
|---|---:|---:|---:|---:|---:|
| E1 | 563 | 925 | 2 376 | 11 | 2,47 |
| E2 | 1 324 | 1 689 | 1 535 | 78 | 3,27 |

Os volumes confirmam esse perfil. O que E1 produz é, antes de tudo, FONTE: 2 376 *spans*, mais do que todos os seus outros tipos somados. O E2 distribui melhor — evidência, fonte e alegação em proporções próximas —, e é justamente essa distribuição que o aproxima do humano. A Figura 5 dá a forma do contraste.

![Anatomia argumentativa no corpus](figuras_relatorio/fig_02_anatomia_spans.png)

*Figura 5 — Distribuição dos spans por tipo em E1 e E2, incluindo a média de spans por nota com alguma marcação.*

### 5.5 Avaliação token-level (BIO/seqeval)

A leitura por *token* repete, com outra lente, o que as métricas por *span* já apontavam, e ainda dá detalhe por tipo.

| Comparação | Escopo | P | R | F1 |
|---|---|---:|---:|---:|
| E1 × E2 | micro | 0,181 | 0,253 | 0,211 |
| E1 × E2 | FONTE | 0,522 | 0,404 | 0,456 |
| E1 × E2 | CLAIM | 0,015 | 0,045 | 0,023 |
| E1 × E2 | EVIDENCIA | 0,009 | 0,018 | 0,012 |
| E1 vs humano | micro | 0,011 | 0,020 | 0,014 |
| E2 vs humano | micro | 0,293 | 0,485 | 0,366 |
| E2 vs humano | CLAIM | 0,321 | 0,447 | 0,374 |
| E2 vs humano | EVIDENCIA | 0,375 | 0,491 | 0,425 |
| E2 vs humano | FONTE | 0,132 | 0,714 | 0,222 |
| E2 vs humano | QUALIFICADOR | 0,000 | 0,000 | 0,000 |

Três coisas se destacam. No acordo E1×E2, FONTE é o único tipo com F1 expressiva (0,456) — coerente com seu caráter lexical. Contra o humano, E1 quase não recupera nada em nível de *token* (0,014), enquanto o E2 chega a 0,366, com força em CLAIM e EVIDENCIA. E há uma assimetria reveladora no FONTE do E2 contra o humano: revocação altíssima (0,714) e precisão baixa (0,132) — o modelo *vê fonte demais*, marca como respaldo o que o humano não marcaria. O QUALIFICADOR zera; é o limite que o corpus impõe.

![Avaliação token-level BIO](figuras_relatorio/fig_06_seqeval_bio.png)

*Figura 6 — Avaliação token-level BIO por seqeval, com micro-F1 e F1 por tipo nas comparações principais.*

### 5.6 Custo computacional

| Estratégia | Latência mediana | p95 | Observação |
|---|---:|---:|---|
| E1 | 1,9 ms | 8,9 ms | Regras locais; custo desprezível. |
| E2 | 4,6 s | 10,8 s | API remota; máx. 26,7 s. |

A diferença é de três ordens de grandeza por nota, e não é um detalhe de implementação: ela define quando cada estratégia é viável. Processar o corpus inteiro por regra é instantâneo; por modelo de linguagem, é uma operação que se planeja — e que, em 7 notas, simplesmente não aconteceu, barrada pelo filtro do provedor.

![Latência mediana por estratégia](figuras_relatorio/fig_operacional_latencia.png)

*Figura 7 — Latência mediana e p95 das estratégias E1 e E2 por nota processada.*

### 5.7 Assinatura léxica por tipo (Dunning)

Contar palavra crua não ajuda. As mais frequentes dentro de qualquer tipo de *span* seriam, no fim, as mais frequentes do português — artigos, preposições, o ruído de fundo da língua. A pergunta útil não é *o que aparece muito*, e sim *o que aparece muito mais aqui do que se esperaria por acaso*. É isso que o *log-likelihood* de Dunning (1993) mede.

O cálculo parte de quatro contagens, fixados um lema $w$ e um tipo-alvo — digamos, FONTE. Duas dizem respeito ao lema: $a$ é quantas vezes $w$ aparece dentro dos *spans* de FONTE, e $b$, quantas vezes aparece no resto do corpus. As outras duas são os tamanhos de cada lado: $c$, o total de lemas dentro de FONTE, e $d$, o total de lemas fora. Se $w$ se distribuísse de forma neutra — igualmente provável dentro e fora do tipo —, o número de ocorrências esperado de cada lado seria apenas proporcional ao tamanho desse lado:

$$
E_a = c\,\frac{a+b}{c+d}, \qquad E_b = d\,\frac{a+b}{c+d}.
$$

A estatística mede o quanto a contagem real se afasta dessa expectativa:

$$
G^2 = 2\left[\, a\,\ln\frac{a}{E_a} + b\,\ln\frac{b}{E_b} \,\right].
$$

Quanto maior o $G^2$, mais o lema destoa do que a distribuição neutra preveria — para mais ou para menos. Como $G^2$ segue, aproximadamente, uma $\chi^2$ com um grau de liberdade, ficamos só com os lemas de $G^2 \geq 3{,}84$, que é o ponto de corte dessa $\chi^2$ a $p < 0{,}05$. E, entre esses, guardamos apenas os de *sobre*-representação — aqueles em que $a/c > (a+b)/(c+d)$, isto é, em que o lema é proporcionalmente mais comum dentro do tipo do que no corpus inteiro. O que sobra, sobre a base do E2, é o vocabulário que *distingue* cada papel:

| Tipo | Lemas mais distintivos |
|---|---|
| CLAIM | falso, news, post, fake, choquei, mente, astrazeneca, diploma, bilhões, custar |
| EVIDENCIA | ano, financeiro, confirmar, registro, código, parlamentar, janeiro, fiscalização, idade, controle |
| FONTE | conforme, fonte, artigo, acordo, site, constituição, sbt, canal, imprensa, inep |
| QUALIFICADOR | enganoso, potencialmente, provavelmente, claramente, apesar, acreditar, especulação, caso, importante, verdadeiro |

A assinatura é semanticamente coerente — e essa coerência é, por si só, um resultado. A alegação concentra os verbos da refutação (*falso, fake, mente*); a fonte, os marcadores de atribuição (*conforme, fonte, imprensa*); o qualificador, os advérbios da dúvida (*potencialmente, provavelmente, apesar*). Que o sinal argumentativo se deixe capturar, ao menos em parte, pelo léxico é o que explica por que a regra simbólica não chega a zero: em cada papel há palavras que o denunciam.

### 5.8 Lente entidade × papel

Cruzar as entidades extraídas (GLiNER) com o papel atribuído pelo E2 revela o achado mais estrutural do trabalho: o *tipo* da entidade prevê o papel. Domínios de URL e veículos de mídia caem, com forte regularidade, em FONTE; atores políticos e partidos, em CLAIM e EVIDENCIA; órgãos públicos se espalham entre os papéis. Quando uma entidade entra na nota, ela já entra com um papel provável, e esse papel é função do que ela é. A Figura 8 traz o mapa de calor.

![Tipo de entidade × papel argumentativo](figuras_relatorio/fig_07_entidade_papel.png)

*Figura 8 — Mapa de calor entre tipos de entidade GLiNER e papéis argumentativos atribuídos pelo E2.*

### 5.9 Agência sintática

A análise por dependências separa as entidades que *agem* (sujeito) das que *sofrem a ação* (objeto ou oblíquo). O padrão varia, e o contraste é eloquente: *Lula* aparece mais como sujeito (45 ocorrências) do que como objeto (17); *Brasil*, ao contrário, mais como objeto (56) do que como sujeito (18). Não é uma métrica de desempenho — é uma leitura. Diz menos sobre o extrator e mais sobre como as notas mobilizam suas figuras: umas conduzem a ação, outras a recebem.

## 6. Avaliação qualitativa

Refizemos a avaliação qualitativa sobre casos identificáveis das 60 notas anotadas, e não sobre exemplos hipotéticos. A ideia é escolher notas que expliquem *por que* as métricas assumem a forma que assumem: quando E2 ganha de E1, quando o ganho é só de fronteira, quando o erro é de papel argumentativo e quando a melhor anotação humana é não marcar nada.

O melhor caso positivo é a [nota `1761891434389475646`](https://explorador-argumentos.netlify.app/#notas?noteId=1761891434389475646), sobre a bandeira de Gadsden. A anotação humana separa três peças: CLAIM em "A bandeira conhecida como Gadsden não é um símbolo fascista", EVIDENCIA no trecho sobre a alegação de "cunho fascista" e FONTE em "Algumas fontes tratam o movimento bolsonarista dessa forma". O E2 recupera exatamente os mesmos três spans (`F1_estrita = 1,000`; `F1_relaxada = 1,000`). O E1, por outro lado, marca apenas URLs ou pedaços de URLs como FONTE (`F1_estrita = 0,000`; `F1_relaxada = 0,000`). O caso dá materialidade à diferença principal do experimento: E1 reconhece sobretudo a forma superficial; E2 reconhece a função das partes da nota.

A [nota `2007791917765943580`](https://explorador-argumentos.netlify.app/#notas?noteId=2007791917765943580) é o caso mais útil para documentar a fronteira contrária: texto metadiscursivo, sem marcador inicial `NNN`, mas também sem span humano. A nota diz que o post é "zuera política" e "claramente satírico ou de brincadeira"; a anotação manual ficou vazia porque ali não há uma estrutura mínima de checagem a decompor em CLAIM, EVIDENCIA ou FONTE. Mesmo assim, E1 marcou um trecho final como EVIDENCIA e E2 marcou "zuera política..." como CLAIM e "satírico ou de brincadeira" como EVIDENCIA. O erro, portanto, não é falta de capacidade extrativa; é excesso de vontade de extrair. Esse exemplo justifica tratar os zeros humanos como dado substantivo, e não como ausência acidental de anotação.

O caso da [nota `1887258714580877671`](https://explorador-argumentos.netlify.app/#notas?noteId=1887258714580877671), sobre matéria do Estadão e ativismo do STF, mostra por que a F1 relaxada não substitui a estrita. Humano e E2 concordam nas três funções: FONTE no início da matéria, EVIDENCIA nos números sobre omissões inconstitucionais e CLAIM na "disposição da Corte de se envolver em questões políticas". A F1 relaxada de E2 é `1,000`, mas a estrita cai para `0,667` porque o E2 inclui o gatilho retórico "A matéria evidencia com números" dentro do CLAIM, enquanto o humano começa o span diretamente em "disposição da Corte...". Aqui o erro é de borda, não de interpretação.

Já a [nota `2031096564928708748`](https://explorador-argumentos.netlify.app/#notas?noteId=2031096564928708748), sobre uma jornalista que teria afirmado que "o contrato não existia", é um erro de papel argumentativo. O humano marcou três trechos como EVIDENCIA; o E2 transformou "o contrato não existia" em CLAIM e só preservou como EVIDENCIA o trecho sobre o banco sob investigação. Por isso a leitura relaxada melhora pouco (`F1_relaxada = 0,400`) e a estrita zera. A divergência não vem apenas de alguns caracteres a mais ou a menos: vem da pergunta sobre qual trecho é a alegação contestada e qual funciona como suporte.

Por fim, a [nota `2035165855806259553`](https://explorador-argumentos.netlify.app/#notas?noteId=2035165855806259553) expõe o modo de falha do E1 em listas longas de links. A anotação humana ficou vazia; o E2 ainda extraiu um CLAIM mínimo ("o que foi dito no vídeo"); e o E1 gerou 43 spans, quase todos FONTE fragmentada ou pedaços redundantes de URLs. Esse caso explica a precisão baixa de FONTE e mostra que a heurística de URL não apenas encontra fontes: em textos densos em links, ela também multiplica falsos positivos.

O raciocínio devolvido pelo E2 entra nessa leitura como apoio interpretativo, não como gabarito. Ele ajuda a entender por que o modelo tratou um trecho como CLAIM ou EVIDENCIA, mas a decisão final continua ancorada na comparação entre spans humanos, E1 e E2. A inspeção qualitativa, assim, não substitui as métricas: ela localiza o tipo de erro que cada métrica resume.

## 7. Discussão

Lendo tudo em conjunto, o quadro se fecha em poucas teses. O modelo de linguagem se aproxima do humano porque a tarefa, no fundo, é discursiva — e discurso é o que ele modela. A regra fica para trás na fronteira porque a fronteira é semântica, e a regra só enxerga forma. Mas a regra não é descartável: ela retribui em FONTE e em custo, e isso aponta para um arranjo *complementar*, e não para uma disputa — regra para o que é literal e barato, modelo para o que é discursivo e caro.

Há um sentido que escapa às métricas e vale nomear. Que as regras produzam sobretudo FONTE não é só um fato de cobertura; é também um modo de ver. A regra trata a URL como traço *estrutural* da argumentação, não como acessório, e enxerga a citação em vez da alegação porque a citação tem endereço. E o achado de que o tipo da entidade antecipa o papel sugere que, neste gênero, o argumento é em boa medida *posicional*: a peça chega ao texto já com sua função, e descrever a estrutura é, em parte, descrever quem ocupa qual lugar.

Quanto às camadas interpretativas — Dunning, entidades, agência —, elas não competem com a F1. Fazem outra coisa: mostram que, sob o desacordo das métricas, há regularidade, e que essa regularidade é legível. Uma única F1 jamais revelaria que *Brasil* sofre a ação enquanto *Lula* a conduz.

## 8. Limitações

O *gold* tem um único anotador, então o que medimos contra o "humano" é uma posição, não um consenso; o *kappa* inter-anotador continua pendente. A fronteira do *span* é instável e penaliza com dureza a métrica estrita — o que recomenda ler a estrita e a relaxada juntas, nunca isoladas. Avaliamos um único modelo de linguagem, num único idioma, sobre um corpus de gênero e período específicos: generalizar exige cautela. O QUALIFICADOR é raro a ponto de tornar frágil qualquer afirmação sobre ele. Nenhuma dessas limitações invalida o quadro; todas circunscrevem o que ele pode afirmar.

## 9. Considerações finais

### 9.1 Síntese

Comparamos uma extração simbólica e uma neural da estrutura argumentativa em notas de comunidade em português, e respondemos às quatro perguntas. E1 e E2 concordam apenas de forma moderada, e o acordo *diminui* onde há mais argumento (P1). O modelo de linguagem se aproxima mais do humano, com folga (P2). A regra vence em FONTE; o modelo, nos tipos discursivos (P3). E o tipo da entidade, de fato, prevê o papel argumentativo (P4). O saldo não é a vitória de um paradigma sobre o outro, mas a divisão de trabalho entre eles — e um corpus que, examinado de perto, argumenta com regularidade suficiente para ser descrito.

### 9.2 Aprendizados do grupo

Ficam alguns aprendizados, para além do resultado em si. O primeiro é que, neste gênero, o problema difícil é a *fronteira* — não a presença do *span* —, e que escolher entre F1 estrita e relaxada já é uma decisão teórica sobre o que conta como acerto. Aprendemos também que comparar regra e modelo de linguagem não é ranqueá-los, e sim mapear vieses complementares: cada paradigma falha de um jeito que revela o que ele é. Vimos, na prática, que o caro num *pipeline* com LLM não é só a inferência — é o *alinhamento* do que o modelo devolve, somado à fragilidade de depender de uma API que pode recusar. Outro aprendizado foi tratar a anotação como infraestrutura: sem BIO e sem *offsets* preservados não há avaliação por *token*, e sem um segundo anotador não há consenso a medir. E talvez o mais durável: uma camada interpretativa barata — entidades, agência, assinatura léxica — às vezes diz mais sobre o corpus do que um décimo a mais de F1.

### 9.3 Trabalhos futuros

O passo imediato é fechar a segunda anotação independente, calcular o *kappa* inter-anotador e recompor o *gold* por consenso, recalculando as métricas contra ele. Em seguida, treinar e avaliar modelos de sequência sobre o BIO que já temos disponível (CRF, BERTimbau), que substituiriam a heurística do E1 por um aprendizado de fronteira. Vale ainda comparar outros modelos de linguagem — inclusive os específicos para o português — e estender a análise às dimensões temática e longitudinal do corpus, que este recorte apenas tangenciou.

## Referências

(A normalizar no formato exigido pela disciplina; base inicial na `Proposta PLN.docx`.)

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

## Apêndice A — Artefatos e reprodutibilidade

| Artefato | Uso |
|---|---|
| `notebooks/notebook_preparacao_v2.ipynb` | Preparação do corpus e extrações E1/E2. |
| `notebooks/notebook_conclusao.ipynb` | Normalização BIO, medidas de avaliação e resultados. |
| `_reconciliar_relatorio.py` · `outputs/` | Reprodução determinística das métricas e exportação dos CSVs. |
| `figuras_relatorio/` | Figuras estáticas incorporadas a este relatório. |
| `data/dataset_anotado_final_com_bio.csv` | Dataset completo (spans, métricas, BIO, sintaxe). |
| `data/gold/` | Anotação humana provisória (JSON e CoNLL/BIO). |
| `data/qualitative_60_reasoning.jsonl` | Raciocínio do E2 nas 60 notas. |
| `explorador/` | Visualização interativa (5 visões) para figuras e inspeção qualitativa. |

## Apêndice B — Figuras

| Figura | Conteúdo |
|---|---|
| Figura 1 | Arquitetura do pipeline. |
| Figura 2 | Acordo E1 × E2 nos três cortes. |
| Figura 3 | Desempenho contra o *gold* humano. |
| Figura 4 | Cobertura por tipo. |
| Figura 5 | Anatomia de *spans* E1 × E2. |
| Figura 6 | Avaliação BIO *token-level*. |
| Figura 7 | Latência por estratégia. |
| Figura 8 | Tipo de entidade × papel argumentativo. |

## Apêndice C — Pendências para a versão de entrega

1. Incorporar a segunda anotação independente e recalcular as métricas contra o consenso.
2. Normalizar as referências no padrão exigido e definir o formato final (Markdown, DOCX ou LaTeX).
