# Relatório final — Mineração de Argumentação em Community Notes BR

**Disciplina:** Processamento de Linguagem Natural — UFSCar, 2026/1
**Docente:** Profa. Dra. Helena Caseli
**Grupo:** Álvaro Barros de Carvalho; Davi Machado da Rocha

## Resumo

As notas da comunidade — *Community Notes*, no X — são textos curtos de checagem colaborativa
atrelados a uma publicação. O sistema decide se uma nota é *útil* e merece ser exibida; não diz
nada sobre como ela argumenta. É esse silêncio que o trabalho ocupa. Tomou-se a estrutura interna
da nota como objeto e formulou-se a tarefa como *Mineração de Argumentação* (AM) em português
brasileiro: localizar e tipar, no texto, os segmentos que enunciam uma *alegação* (CLAIM), trazem
*evidência* (EVIDENCIA), citam uma *fonte* (FONTE) ou *modulam* o que se afirma (QUALIFICADOR).
Compararam-se duas estratégias de extração — E1, simbólica, montada sobre regras léxico-sintáticas
e a análise do spaCy; e E2, baseada no modelo de linguagem `qwen3.6-max-preview`. Sobre um corpus
de 1 901 notas e 689 tweets, as duas foram medidas uma contra a outra, em três cortes, e contra um
*gold* humano de 60 notas. O resultado é assimétrico, e por isso interessante: o modelo de
linguagem aproxima-se do humano onde a regra fracassa — a fronteira do *span*, o papel pouco
lexical —, enquanto a regra retribui onde é barata e literal, a cobertura de FONTE. E há um achado
estrutural por baixo das métricas: o *tipo* da entidade mencionada antecipa o papel que ela
desempenha. URL é fonte. Ator político é alegação.

## 1. Introdução

### 1.1 Contexto e recorte conceitual

O *Community Notes* funciona como uma checagem distribuída: qualquer usuário pode escrever uma
nota que contextualiza, qualifica ou refuta uma publicação, e um conjunto de avaliadores decide se
ela aparece. O estado mais comum de uma nota, no corpus, não é "útil" nem "não útil" — é *precisa
de mais avaliações* (NMR), que responde por quase quatro em cada cinco notas. O sistema, na maior
parte do tempo, não decide: suspende o juízo. Esse dado modal organiza o que se segue, porque
desloca a pergunta. Não se trata de saber se a nota está certa, mas de descrever do que ela é
feita.

Convém, aliás, nomear o objeto com precisão. "Checagem de fatos" é um rótulo cômodo e impreciso;
mais justo seria dizer que se verifica a *verossimilhança de um enunciado*. Verossimilhança não é
verdade. A nota não prova; ela argumenta — alega, evidencia, cita, ressalva. Tomar a estrutura
desse argumento como objeto de PLN é assumir que há regularidade ali, e que essa regularidade pode
ser anotada, extraída e medida. O trabalho não julga o mérito factual ou político das alegações;
fica no plano estrutural. É uma escolha de escopo, e ela exclui de propósito a relação entre os
componentes (qual evidência sustenta qual alegação) e a veracidade em si.

### 1.2 Do Seminário 1 a este relatório

No Seminário 1, apresentou-se a proposta no essencial: a tarefa de AM sobre as notas em português, o
corpus de origem e as *duas* estratégias de extração — a simbólica (E1) e a do modelo de linguagem
(E2), ambas já no plano desde o início. Esse núcleo se manteve. O que mudou foi a rota, em quatro
pontos.

O primeiro é metodológico e responde a recomendações da disciplina: normalizou-se a anotação para o
formato *BIO*, em nível de *token*, e acrescentou-se uma avaliação semiautomática (seqeval) ao lado da
comparação com o humano. O segundo é de proveniência, e talvez o mais consequente: passou-se a
*persistir*, no dataset, a anotação linguística — POS e dependências — que o notebook anterior
calculava e descartava. Guardá-la (campo `sintaxe_json`) custou pouco e rendeu muito, porque é dela
que vivem as análises que vieram depois. O terceiro são essas análises — assinatura léxica por
Dunning, a lente que cruza tipo de entidade e papel, a agência sintática —, ausentes da proposta
inicial. E o quarto é o próprio explorador interativo que as materializa, também novidade em relação
à apresentação.

O *gold*, por fim, permanece provisório: anotado por uma única pessoa, é tratado como limite
declarado, não como detalhe.

### 1.3 Tarefa, perguntas e objetivo

A tarefa escolhida é a segmentação e tipagem de *spans* argumentativos no texto da nota, nos quatro
rótulos do esquema. O objetivo é comparar E1 e E2 entre si e contra a referência humana, e
caracterizar o que distingue uma extração simbólica de uma neural neste gênero. Quatro perguntas
guiam a análise:

1. Em que medida E1 e E2 concordam na identificação dos *spans*?
2. Qual das duas se aproxima mais da anotação humana, no recorte de 60 notas?
3. Que tipos argumentativos a regra captura melhor, e quais o modelo de linguagem?
4. O tipo da entidade mencionada ajuda a prever o papel argumentativo que ela ocupa?

## 2. Fundamentação e trabalhos relacionados

A Mineração de Argumentação identifica componentes argumentativos e suas relações em texto
(Lawrence e Reed, 2020; Stab e Gurevych, 2017; Eger et al., 2017). Adotou-se aqui a formulação
*baseada em spans* — segmentos contíguos rotulados por tipo —, com conversão posterior para
*rotulagem sequencial BIO* (`B-TIPO`, `I-TIPO`, `O`), o formato usual para avaliação em nível de
*token* e para o treino de modelos de sequência (Lafferty et al., 2001).

O gênero impõe suas condições. A nota é curta, ancorada a um tweet, e cumpre função de checagem ou
contextualização — discurso de usuário, com a informalidade e o ruído que isso acarreta (Habernal e
Gurevych, 2017). Daí a opção por manter a análise no plano estrutural-argumentativo, sem deslizar
para a avaliação do conteúdo.

Duas famílias de método disputam a tarefa. De um lado, regras léxico-sintáticas sobre análise
morfossintática — o spaCy e o quadro de *Universal Dependencies* (Honnibal e Montani, 2017);
transparentes, baratas, mas presas ao padrão que se escreveu. De outro, modelos de linguagem
operando por um protocolo de *snippet*-para-*offset*, na linha do que se propôs para NER via LLM
(Wang et al., 2023); flexíveis à paráfrase, ao custo de latência e de um alinhamento que pode
falhar. Três recursos complementam a leitura, não como métrica de desempenho, mas como instrumento
interpretativo: o *log-likelihood* de Dunning (1993) para a assinatura léxica de cada papel; o
GLiNER para a extração de entidades; e a análise por dependências para a agência sintática.

## 3. Dados e medidas de avaliação

### 3.1 Corpus

| Medida | Valor |
|---|---:|
| Notas no corpus do experimento | 1 901 |
| Tweets únicos | 689 |
| Notas por tweet (média; máx.) | 2,8; 19 |
| Modelo de linguagem avaliado | `qwen3.6-max-preview` |
| Notas no recorte com *gold* humano | 60 |

O corpus deriva do conjunto publicado `histlearn/notas-comunidade-ptbr`. O campo `summary` é o
texto anotável; o tweet associado entra como *contexto* — útil, sobretudo, para ancorar a CLAIM, que
muitas vezes não está na nota, mas naquilo que a nota contesta.

### 3.2 Esquema de rótulos

Quatro tipos organizam a anotação, definidos no `guia_anotacao.md` e resumidos abaixo. A alegação é
aquilo que a nota refuta, qualifica ou contextualiza; a evidência, o que a sustenta; a fonte, a
atribuição que lhe dá respaldo; o qualificador, a marca de modulação ou ressalva.

| Rótulo | Definição operacional |
|---|---|
| CLAIM | A alegação que a nota refuta, qualifica ou contextualiza. |
| EVIDENCIA | Fato, dado, contraexemplo ou justificativa que sustenta a checagem. |
| FONTE | Atribuição: veículo, órgão, especialista, documento ou URL citado como respaldo. |
| QUALIFICADOR | Marcador de modulação, ressalva, incerteza ou escopo. |

Os *spans* são marcados apenas no texto da nota; o tweet permanece como contexto, fora do alvo de
anotação.

### 3.3 Recorte com gold e meta-notas

O *gold* foi construído sobre 60 notas estratificadas pelo status do Community Notes — 20 NMR, 20
CRH e 20 CRNH —, deliberadamente sem meta-notas. A estratificação tem motivo: a distribuição real é
desbalanceada (NMR 78,9 %, CRNH 12,5 %, CRH 7,0 %, Outro 1,6 %), e uma amostra proporcional seria,
na prática, uma amostra de NMR.

Nem toda nota argumenta. Há comentários sobre o próprio sistema, piadas, opiniões e notas curtas
demais para conter estrutura. São 404 (21,3 %) dessas *meta-notas* no corpus, com motivos
predominantes de prefixo *NNN*, "muito curta" e "não necessita nota". Distingui-las importou em dois
momentos: na seleção do recorte humano, que as exclui, e na avaliação, em que um corte específico
(B) as remove para isolar o material efetivamente argumentativo.

### 3.4 Normalização BIO

As estratégias e o anotador humano produzem *spans*: intervalos contínuos no texto, definidos por
posição inicial, posição final e tipo. Já a avaliação por seqeval espera outra forma de dado: uma
sequência de rótulos, um para cada *token*. A normalização BIO é a passagem entre essas duas
representações. Ela não muda a anotação; apenas projeta a mesma marcação, originalmente feita em
caracteres, para a grade dos *tokens*.

Para que a comparação fosse justa, as três fontes — E1, E2 e humano — foram projetadas sobre a
mesma tokenização (`spacy_pt_blank_v1`). Isso é central: se cada fonte fosse tokenizada de um jeito,
as sequências BIO poderiam ter tamanhos ou fronteiras diferentes, e a comparação *token* a *token*
deixaria de ser bem definida. Por isso, cada nota foi tokenizada uma vez; para cada *token*,
registraram-se o texto e seus *offsets* de caractere (`bio_offsets_json`); em seguida, os *spans* de
cada fonte foram comparados a esses intervalos.

A regra básica é simples. Se um *token* não toca nenhum *span*, recebe `O`. Se toca um *span* de tipo
`TIPO`, passa a pertencer a ele: o primeiro *token* coberto recebe `B-TIPO`, e os seguintes recebem
`I-TIPO`. Assim, um trecho marcado como EVIDENCIA em caracteres vira uma sequência como
`B-EVIDENCIA`, `I-EVIDENCIA`, `I-EVIDENCIA` até o fim do trecho.

O único ponto delicado é a fronteira. Um *token* pode atravessar a borda de um *span* ou, em tese,
ficar compatível com mais de um *span*. Esses casos foram resolvidos por uma política fixa e
versionada (`token_max_overlap_then_longest_then_type_priority`, projeção 2.0.0): primeiro vence o
*span* que mais se sobrepõe ao *token* em número de caracteres; se houver empate, vence o *span*
mais longo; se o empate persistir, aplica-se uma prioridade de tipo. A decisão, portanto, não
depende da ordem em que os *spans* aparecem no arquivo.

Na prática, os *spans* de uma mesma fonte quase nunca competem entre si — no E2, não houve
sobreposição interna —, de modo que a política atua principalmente nos *tokens* de borda. Como os
*offsets* originais são preservados, a leitura por *span* e a leitura BIO descrevem o mesmo objeto em
duas resoluções: uma contínua, por caracteres; outra discreta, por *tokens*. Essa projeção viabilizou
a avaliação por seqeval e atendeu à recomendação de representar a tarefa em BIO.

### 3.5 Medidas de avaliação

As métricas foram escolhidas para responder a perguntas diferentes sobre a mesma saída: listas de
*spans* tipados. Cada item da lista tem três informações — início, fim e tipo —, por exemplo
`[120, 158) / EVIDENCIA`. Avaliar o sistema é verificar se esses itens coincidem com outra lista. No
recorte com *gold*, a outra lista é a anotação humana; na comparação E1×E2, ela é a saída da outra
estratégia, e por isso o resultado deve ser lido como acordo, não como "acerto" absoluto.

A primeira pergunta é direta: dos *spans* que o sistema marcou, quantos correspondem a um *span* da
referência? E dos *spans* da referência, quantos ele recuperou? Para isso usamos precisão,
revocação e F1. Em uma nota, um verdadeiro positivo ($TP$) é um *span* do sistema que encontra par na
referência; um falso positivo ($FP$) é um *span* marcado pelo sistema sem par; e um falso negativo
($FN$) é um *span* da referência que o sistema deixou de marcar. As fórmulas só resumem essa contagem:

$$
P = \frac{TP}{TP + FP}, \qquad R = \frac{TP}{TP + FN}, \qquad F_1 = \frac{2PR}{P+R}.
$$

O ponto sensível é definir o que conta como "encontrar par". Neste experimento usamos duas leituras.
Na F1 estrita, o par só existe quando tipo, início e fim são idênticos. Se o humano marcou
`[120, 158) / EVIDENCIA` e o sistema marcou `[120, 158) / EVIDENCIA`, é acerto; se marcou
`[118, 158) / EVIDENCIA`, já não é. Na F1 relaxada, o tipo ainda precisa coincidir, mas aceitamos
sobreposição de fronteira: `[118, 158) / EVIDENCIA` e `[120, 158) / EVIDENCIA` contam como o mesmo
trecho argumentativo em granularidade mais tolerante.

Formalmente, para um *span* de referência $r=[i_r, j_r)$ e um *span* do sistema $s=[i_s, j_s)$, ambos
de tipo $t$, as duas leituras são:

$$
\text{estrito:}\quad i_r = i_s \,\wedge\, j_r = j_s
\qquad\qquad
\text{relaxado:}\quad [i_r, j_r) \cap [i_s, j_s) \neq \varnothing.
$$

A diferença entre F1 estrita e relaxada é uma medida do erro de fronteira. Quando a relaxada sobe e
a estrita fica baixa, o sistema provavelmente localizou a região argumentativa correta, mas cortou
palavras a mais ou a menos. Esse foi um ponto central do experimento: E1 muitas vezes encontra o
sinal lexical — sobretudo em FONTE —, mas erra o limite fino do *span*.

A segunda pergunta é sobre concordância global no texto. A F1 só olha para os *spans* marcados; ela
não considera os trechos que ambos deixaram como "fora de span". Para isso usamos o *kappa* de Cohen
em nível de caractere. Cada caractere da nota recebe um rótulo: CLAIM, EVIDENCIA, FONTE,
QUALIFICADOR ou `O`. Em seguida, medimos quanto as duas rotulações concordam, descontando a
concordância que seria esperada apenas pela distribuição dos rótulos:

$$
\kappa = \frac{p_o - p_e}{1 - p_e}.
$$

Aqui, $p_o$ é a concordância observada entre as duas sequências de caracteres, e $p_e$ é a
concordância esperada ao acaso a partir das proporções de cada rótulo. O valor vale 1 no acordo
perfeito, 0 no acordo esperado ao acaso e pode ficar negativo quando a concordância é pior que esse
patamar. Medimos em caractere porque as saídas originais de E1, E2 e humano são intervalos de
caractere; assim, o *kappa* avalia diretamente a mesma unidade em que os *spans* foram produzidos.

A terceira pergunta vem da recomendação de representar a tarefa em BIO: se transformarmos os *spans*
em rótulos por *token*, como ficaria a avaliação de sequência? Para isso usamos seqeval. Depois da
projeção descrita na seção anterior, um acerto exige mesmo tipo e mesmas fronteiras de *token*. Ou
seja: é a leitura estrita, mas aplicada às entidades BIO. Reportamos a média *micro*, que agrega
$TP$, $FP$ e $FN$ de todos os tipos, e também o resultado por tipo, porque o comportamento de CLAIM,
EVIDENCIA e FONTE é muito diferente no corpus.

Essas medidas são complementares. A F1 estrita responde se o sistema acertou exatamente os *spans*;
a F1 relaxada mostra se ele ao menos encontrou a região certa; o *kappa* observa a concordância no
texto inteiro; e o seqeval traduz o mesmo problema para a forma exigida por modelos de sequência.

## 4. Estratégias

### 4.1 Visão geral do pipeline

O fluxo encadeia: corpus → preparação → extração por E1 → extração por E2 → seleção das 60 →
anotação humana → normalização BIO → avaliação (E1×E2 e contra o *gold*) → camadas interpretativas
(Dunning, entidades, agência). A arquitetura completa está na Figura 1.

### 4.2 Estratégia E1 — regras léxico-sintáticas

**Recursos em língua portuguesa.** E1 apoia-se no modelo `pt_core_news_md` do spaCy, treinado para o
português, do qual usa tokenização, lematização, etiquetagem morfossintática (POS) e análise de
dependências.

**Pré-processamento e representação.** Cada nota é tokenizada e analisada sintaticamente; sobre essa
representação aplicam-se heurísticas por tipo — padrões léxico-sintáticos para CLAIM e EVIDENCIA — e
uma *regex* de URL que garante a captura de FONTE. A saída é uma lista de *spans* `{início, fim,
tipo}`, posteriormente projetada para BIO. A estratégia é determinística e transparente: o que ela
acerta, acerta por uma razão escrita; o que erra, erra pela mesma razão.

**O que isso implica.** Uma regra não lê o argumento; lê a marca do argumento. Ela encontra a URL
porque a URL tem forma fixa, e perde a alegação parafraseada porque a paráfrase não tem. Esse viés
não é defeito de implementação — é a natureza do método, e reaparece, adiante, em cada métrica.

### 4.3 Estratégia E2 — modelo de linguagem

**Recursos.** E2 usa o modelo `qwen3.6-max-preview`, multilíngue, acessado por API. O prompt
descreve o esquema de rótulos e pede os *spans* tipados; o modelo devolve, além dos trechos, um
*raciocínio* — uma justificativa em linguagem natural, traduzida para o português nas 60 notas, que
serve à análise qualitativa, jamais como gabarito.

**Pré-processamento e representação.** O modelo retorna *snippets* de texto, não posições. Um
protocolo de *snippet*-para-*offset* os realinha à nota, com vários níveis de tolerância (exato,
normalizado, *regex*); registra-se o nível usado em cada caso. URLs, de novo, são garantidas por
*regex* e mescladas ao resultado, porque um modelo de linguagem é desnecessário — e pouco confiável —
para essa subtarefa puramente formal. A saída segue para a mesma projeção BIO.

**O que isso implica.** O modelo lê o discurso, e não apenas sua superfície lexical. Reconhece a
alegação que não traz palavra-gatilho, a evidência cuja fronteira é semântica e não sintática. Paga
por isso em latência e numa dependência incômoda: o trecho precisa *voltar* ao texto, e nem sempre
volta inteiro.

### 4.4 Anotação humana

As 60 notas foram anotadas segundo o `guia_anotacao.md`. O *gold* é, nesta versão, obra de um único
anotador — e isso tem consequência metodológica direta. Sem um segundo anotador independente, não
há *kappa* inter-anotador nem consenso; o que se chama de "humano", aqui, é uma voz, não um coro. O
relatório assume esse limite e o trata como etapa pendente, não como nota de rodapé.

### 4.5 Dificuldades encontradas

Algumas dificuldades foram de método, outras de engenharia, e vale enumerá-las porque desenham o
contorno do que foi possível.

A primeira é a *fronteira*. Onde começa e onde termina uma evidência é uma decisão fluida, e foi a
maior fonte de desacordo — entre as duas estratégias e contra o humano. A segunda é o *alinhamento*
do E2: nem todo *snippet* devolvido pelo modelo reencontra sua posição exata, e 488 notas não
produziram nenhum *span* alinhável (meta-notas, retornos vazios, recusas). A terceira é
operacional: o provedor do modelo *recusou* 7 notas por filtro de conteúdo — um custo silencioso de
depender de uma API. A quarta foi de representação: as colunas de *span* gravadas como estruturas
aninhadas exigiram leitura com ferramentas que as preservam (DuckDB, `fastparquet`), sob pena de
voltarem vazias. A quinta é o *desbalanceamento*: NMR domina o corpus, e QUALIFICADOR é raro a ponto
de quase desaparecer das métricas — o que limita o que se pode afirmar sobre esse tipo. E a sexta,
já dita, é o *gold* de um anotador só.

## 5. Resultados — avaliação quantitativa

Os números a seguir foram reconciliados de forma reprodutível a partir das células determinísticas
de `notebook_conclusao.ipynb` (script `_reconciliar_relatorio.py`, saídas em `outputs/`).

### 5.1 Acordo E1 × E2 nos três cortes

| Corte | n | F1 estrita | F1 relaxada | κ char-level |
|---|---:|---:|---:|---:|
| A — completo | 1 901 | 0,307 | 0,459 | 0,366 |
| B — sem meta | 1 497 | 0,272 | 0,446 | 0,338 |
| C — ambas marcaram | 1 331 | 0,250 | 0,466 | 0,334 |

O acordo decai de A para C na métrica estrita e no *kappa*. O sentido do movimento importa: quanto
mais o corte se restringe a notas com material argumentativo real, mais as estratégias divergem.
Logo, a discordância não está no ruído — está exatamente onde há argumento para delimitar.

![Acordo E1 × E2 nos três cortes](figuras_relatorio/fig_03_acordo_cortes.png)

### 5.2 Comparação contra o gold humano

| Estratégia | F1 estrita | F1 relaxada | κ vs gold |
|---|---:|---:|---:|
| E1 | 0,017 | 0,136 | −0,003 |
| E2 | 0,340 | 0,466 | 0,428 |

A distância é grande, e diz onde cada uma fracassa. A F1 estrita de E1 é praticamente nula, e o seu
*kappa* contra o humano beira o zero — as regras acertam o miolo, mas erram a borda, e a métrica
estrita não perdoa a borda. A relaxada melhora porque exige apenas sobreposição. O E2, ao contrário,
acompanha o humano tanto na presença quanto na extensão dos *spans*.

![Desempenho contra gold humano](figuras_relatorio/fig_04_desempenho_gold.png)

### 5.3 Cobertura por tipo

| Tipo | Cobertura E1 (%) | Cobertura E2 (%) |
|---|---:|---:|
| CLAIM | 26,0 | 60,2 |
| EVIDENCIA | 37,7 | 60,7 |
| FONTE | 72,0 | 56,5 |
| QUALIFICADOR | 0,6 | 4,1 |

Aqui aparece a divisão de trabalho. A regra cobre 72 % das FONTEs — território de URL e veículo,
onde a forma denuncia o papel — e desaba em CLAIM e EVIDENCIA, que dependem de discurso. O modelo é
mais parelho entre os três tipos maiores. QUALIFICADOR é deserto para ambos, e a razão é o corpus:
o tipo é raro demais para sustentar cobertura.

![Cobertura por tipo argumentativo](figuras_relatorio/fig_05_cobertura_tipo.png)

### 5.4 Anatomia argumentativa no corpus

| Estratégia | CLAIM | EVIDENCIA | FONTE | QUALIFICADOR | Spans/nota (com span) |
|---|---:|---:|---:|---:|---:|
| E1 | 563 | 925 | 2 376 | 11 | 2,47 |
| E2 | 1 324 | 1 689 | 1 535 | 78 | 3,27 |

Os volumes confirmam o perfil. O que E1 produz é, antes de tudo, FONTE: 2 376 *spans*, mais do que
todos os seus outros tipos somados. O E2 distribui — evidência, fonte e alegação em proporções
próximas —, e é justamente essa distribuição que o avizinha do humano. A Figura 2 dá a forma do
contraste.

![Anatomia argumentativa no corpus](figuras_relatorio/fig_02_anatomia_spans.png)

### 5.5 Avaliação token-level (BIO/seqeval)

A leitura por *token* repete, com outra lente, o que as métricas por *span* já indicavam, e
acrescenta detalhe por tipo.

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

Três leituras se impõem. No acordo E1×E2, FONTE é o único tipo com F1 expressiva (0,456) — coerente
com seu caráter lexical. Contra o humano, E1 quase não recupera nada em nível de *token* (0,014), e
o E2 chega a 0,366, com força em CLAIM e EVIDENCIA. E há uma assimetria reveladora no FONTE do E2
contra o humano: revocação altíssima (0,714) e precisão baixa (0,132) — o modelo *vê fonte demais*,
marca como respaldo o que o humano não marcaria. O QUALIFICADOR zera; é o limite que o corpus impõe.

![Avaliação token-level BIO](figuras_relatorio/fig_06_seqeval_bio.png)

### 5.6 Custo computacional

| Estratégia | Latência mediana | p95 | Observação |
|---|---:|---:|---|
| E1 | 1,9 ms | 8,9 ms | Regras locais; custo desprezível. |
| E2 | 4,6 s | 10,8 s | API remota; máx. 26,7 s. |

A diferença é de três ordens de grandeza por nota. Não é um detalhe de implementação: define quando
cada estratégia é viável. Processar o corpus inteiro por regra é instantâneo; por modelo de
linguagem, é uma operação que se planeja — e que, em 7 notas, simplesmente não aconteceu, barrada
pelo filtro do provedor.

![Latência mediana por estratégia](figuras_relatorio/fig_operacional_latencia.png)

### 5.7 Assinatura léxica por tipo (Dunning)

Contar palavra crua não serve. As mais frequentes em qualquer *span* seriam as mais frequentes da
língua — artigos, preposições, o ruído de fundo do português. A pergunta certa não é *o que é
frequente*, mas *o que é frequente demais, aqui, para ser acaso*. É o que mede o *log-likelihood* de
Dunning (1993).

Para um lema $w$ e um tipo-alvo — digamos, FONTE —, monta-se uma tabela de contingência: $a$ é a
frequência de $w$ dentro dos *spans* desse tipo, $b$ a frequência de $w$ no restante do corpus, e $c$
e $d$ os totais de lemas de cada lado. Sob a hipótese nula — $w$ é igualmente provável dentro e fora
do tipo —, as contagens esperadas seriam:

$$
E_a = c\,\frac{a+b}{c+d}, \qquad E_b = d\,\frac{a+b}{c+d}.
$$

O quanto o observado se afasta dessa expectativa é o que a estatística capta:

$$
G^2 = 2\left[\, a\,\ln\frac{a}{E_a} + b\,\ln\frac{b}{E_b} \,\right].
$$

$G^2$ segue, aproximadamente, uma $\chi^2$ com um grau de liberdade; retêm-se apenas os lemas com
$G^2 \geq 3{,}84$ — o limiar de significância a $p < 0{,}05$ — e, dentre eles, só os de
*sobre*-representação, isto é, com $a/c > (a+b)/(c+d)$. O que sobra, sobre a base do E2, é o
vocabulário que *distingue* cada papel:

| Tipo | Lemas mais distintivos |
|---|---|
| CLAIM | falso, news, post, fake, choquei, mente, astrazeneca, diploma, bilhões, custar |
| EVIDENCIA | ano, financeiro, confirmar, registro, código, parlamentar, janeiro, fiscalização, idade, controle |
| FONTE | conforme, fonte, artigo, acordo, site, constituição, sbt, canal, imprensa, inep |
| QUALIFICADOR | enganoso, potencialmente, provavelmente, claramente, apesar, acreditar, especulação, caso, importante, verdadeiro |

A assinatura é semanticamente coerente — e a coerência é, ela própria, um resultado. A alegação
concentra os verbos da refutação (*falso, fake, mente*); a fonte, os marcadores de atribuição
(*conforme, fonte, imprensa*); o qualificador, os advérbios da dúvida (*potencialmente, provavelmente,
apesar*). Que o sinal argumentativo se deixe, em parte, capturar por léxico explica por que a regra
não chega a zero: há, em cada papel, palavras que o denunciam.

### 5.8 Lente entidade × papel

Cruzar as entidades extraídas (GLiNER) com o papel atribuído pelo E2 revela o achado mais
estrutural do trabalho: o *tipo* da entidade prevê o papel. Domínios de URL e veículos de mídia
caem, com forte regularidade, em FONTE; atores políticos e partidos, em CLAIM e EVIDENCIA; órgãos
públicos se espalham. A entidade, quando entra na nota, já entra fantasiada de um papel — e o papel
é função do que ela é. A Figura 7 traz o mapa de calor.

![Tipo de entidade × papel argumentativo](figuras_relatorio/fig_07_entidade_papel.png)

### 5.9 Agência sintática

A análise por dependências separa as entidades que *agem* (sujeito) das que *sofrem a ação*
(objeto ou oblíquo). O padrão varia, e o contraste é eloquente: *Lula* aparece mais como sujeito (45
ocorrências) do que como objeto (17); *Brasil*, ao contrário, mais como objeto (56) do que como
sujeito (18). Não é uma métrica de desempenho — é uma leitura. Diz menos sobre o extrator e mais
sobre como as notas mobilizam suas figuras: umas conduzem a ação, outras a recebem.

## 6. Avaliação qualitativa

A avaliação qualitativa foi refeita sobre casos identificáveis das 60 notas anotadas, não sobre
exemplos hipotéticos. O objetivo aqui é escolher notas que expliquem *por que* as métricas assumem a
forma observada: quando E2 ganha de E1, quando o ganho é só de fronteira, quando o erro é de papel
argumentativo e quando a melhor anotação humana é não marcar nada.

O melhor caso positivo é a nota `1761891434389475646`, sobre a bandeira de Gadsden. A anotação
humana separa três peças: CLAIM em "A bandeira conhecida como Gadsden não é um símbolo fascista",
EVIDENCIA no trecho sobre a alegação de "cunho fascista" e FONTE em "Algumas fontes tratam o
movimento bolsonarista dessa forma". O E2 recupera exatamente os mesmos três spans
(`F1_estrita = 1,000`; `F1_relaxada = 1,000`). O E1, por outro lado, marca apenas URLs ou pedaços de
URLs como FONTE (`F1_estrita = 0,000`; `F1_relaxada = 0,000`). Este caso dá materialidade à diferença
principal do experimento: E1 reconhece sobretudo forma superficial; E2 reconhece a função das partes
da nota.

A nota `2007791917765943580` é o caso mais útil para documentar a fronteira contrária: texto
metadiscursivo, sem marcador inicial `NNN`, mas também sem span humano. A nota diz que o post é
"zuera política" e "claramente satírico ou de brincadeira"; a anotação manual ficou vazia porque ali
não há uma estrutura mínima de checagem a decompor em CLAIM, EVIDENCIA ou FONTE. Mesmo assim, E1
marcou um trecho final como EVIDENCIA e E2 marcou "zuera política..." como CLAIM e "satírico ou de
brincadeira" como EVIDENCIA. O erro, portanto, não é falta de capacidade extrativa; é excesso de
vontade de extrair. Esse exemplo justifica tratar os zeros humanos como dado substantivo, e não como
ausência acidental de anotação.

O caso `1887258714580877671`, sobre matéria do Estadão e ativismo do STF, mostra por que a F1
relaxada não substitui a estrita. Humano e E2 concordam nas três funções: FONTE no início da matéria,
EVIDENCIA nos números sobre omissões inconstitucionais e CLAIM na "disposição da Corte de se envolver
em questões políticas". A F1 relaxada de E2 é `1,000`, mas a estrita cai para `0,667` porque o E2
inclui o gatilho retórico "A matéria evidencia com números" dentro do CLAIM, enquanto o humano começa
o span diretamente em "disposição da Corte...". Aqui o erro é de borda, não de interpretação.

Já a nota `2031096564928708748`, sobre uma jornalista que teria afirmado que "o contrato não existia",
é um erro de papel argumentativo. O humano marcou três trechos como EVIDENCIA; o E2 transformou "o
contrato não existia" em CLAIM e só preservou como EVIDENCIA o trecho sobre o banco sob investigação.
Por isso a leitura relaxada melhora pouco (`F1_relaxada = 0,400`) e a estrita zera. A divergência não
vem apenas de alguns caracteres a mais ou a menos: ela vem da pergunta sobre qual trecho é a
alegação contestada e qual trecho funciona como suporte.

Por fim, a nota `2035165855806259553` expõe o modo de falha do E1 em listas longas de links. A
anotação humana ficou vazia; o E2 ainda extraiu um CLAIM mínimo ("o que foi dito no vídeo"); e o E1
gerou 43 spans, quase todos FONTE fragmentada ou pedaços redundantes de URLs. Esse caso explica a
precisão baixa de FONTE e mostra que a heurística de URL não apenas encontra fontes: em textos
densos em links, ela também multiplica falsos positivos.

O raciocínio devolvido pelo E2 entra nessa leitura como apoio interpretativo, não como gabarito. Ele
ajuda a entender por que o modelo tratou um trecho como CLAIM ou EVIDENCIA, mas a decisão final
continua ancorada na comparação entre spans humanos, E1 e E2. A inspeção qualitativa, assim, não
substitui as métricas: ela localiza o tipo de erro que cada métrica resume.

## 7. Discussão

Lendo o conjunto, o quadro se fecha em poucas teses. O modelo de linguagem aproxima-se do humano
porque a tarefa, no fundo, é discursiva, e o discurso é o que ele modela; a regra fica para trás na
fronteira porque a fronteira é semântica, e a regra só vê forma. Mas a regra não é descartável — ela
retribui em FONTE e em custo, e isso desenha um arranjo *complementar* antes que uma disputa: regra
para o que é literal e barato, modelo para o que é discursivo e caro.

Há um sentido que escapa às métricas e convém nomear. Que as regras produzam, sobretudo, FONTE não é
só um fato de cobertura — é um modo de ver. A regra trata a URL como traço *estrutural* da
argumentação, não como acessório; ela enxerga a citação e não a alegação porque a citação tem
endereço. E o achado de que o tipo da entidade antecipa o papel sugere que, neste gênero, o
argumento é em boa medida *posicional*: a peça já chega com sua função, e descrever a estrutura é,
em parte, descrever quem ocupa qual lugar.

Quanto às camadas interpretativas — Dunning, entidades, agência —, elas não competem com a F1. Fazem
outra coisa: mostram que sob o desacordo das métricas há regularidade, e que essa regularidade é
legível. Uma única F1 jamais revelaria que *Brasil* sofre a ação enquanto *Lula* a conduz.

## 8. Limitações

O *gold* tem um anotador, e por isso o que se mede contra o "humano" é uma posição, não um consenso;
o *kappa* inter-anotador segue pendente. A fronteira do *span* é instável e penaliza com dureza a
métrica estrita — o que recomenda interpretar a relaxada e a estrita em conjunto, e não isoladas.
Avaliou-se um único modelo de linguagem, num único idioma, sobre um corpus de gênero e período
específicos; generalizar exige cautela. O QUALIFICADOR é raro a ponto de tornar frágil qualquer
afirmação sobre ele. Nenhuma dessas limitações invalida o quadro; todas circunscrevem o que ele
pode afirmar.

## 9. Considerações finais

### 9.1 Síntese

O trabalho comparou uma extração simbólica e uma neural de estrutura argumentativa em notas de
comunidade em português, e respondeu às quatro perguntas. E1 e E2 concordam de forma apenas
moderada, e o acordo *diminui* onde há mais argumento (P1). O modelo de linguagem aproxima-se mais do
humano, com folga (P2). A regra vence em FONTE, o modelo nos tipos discursivos (P3). E o tipo da
entidade, de fato, prevê o papel argumentativo (P4). O saldo não é a vitória de um paradigma sobre
o outro, mas a divisão de trabalho entre eles — e um corpus que, examinado de perto, argumenta com
regularidade suficiente para ser descrito.

### 9.2 Aprendizados do grupo

Alguns aprendizados ficam, para além do resultado. Aprendeu-se que, neste gênero, a *fronteira* — e
não a presença — é o problema difícil, e que a escolha entre F1 estrita e relaxada já é uma decisão
teórica sobre o que conta como acerto. Aprendeu-se que comparar regra e modelo de linguagem não é
ranquear, mas mapear vieses complementares: cada paradigma falha de um jeito que diz o que ele é.
Aprendeu-se que o caro num *pipeline* com LLM não é só a inferência — é o *alinhamento* do que ele
devolve, e a fragilidade de depender de uma API que pode recusar. Aprendeu-se a tratar a anotação
como infraestrutura: sem BIO e sem *offsets* preservados, não há avaliação por *token*, e sem um
segundo anotador não há consenso a medir. E aprendeu-se, talvez o mais durável, que uma camada
interpretativa barata — entidades, agência, assinatura léxica — às vezes diz mais sobre o corpus do
que um décimo a mais de F1.

### 9.3 Trabalhos futuros

O passo imediato é fechar a segunda anotação independente, calcular o *kappa* inter-anotador e
recompor o *gold* por consenso, recalculando as métricas contra ele. A seguir, treinar e avaliar
modelos de sequência sobre o BIO já disponível (CRF, BERTimbau), que substituiriam a heurística do
E1 por um aprendizado de fronteira. Vale, ainda, comparar outros modelos de linguagem — inclusive os
específicos para o português — e estender a análise às dimensões temática e longitudinal do corpus,
que este recorte apenas tangenciou.

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
| `notebooks/notebook_preparacao_v2.ipynb` | Preparação do corpus e extração E1. |
| `notebooks/notebook_conclusao.ipynb` | Fonte canônica de resultados, BIO e avaliação. |
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
| Figura 2 | Anatomia de *spans* E1 × E2. |
| Figura 3 | Acordo E1 × E2 nos três cortes. |
| Figura 4 | Desempenho contra o *gold* humano. |
| Figura 5 | Cobertura por tipo. |
| Figura 6 | Avaliação BIO *token-level*. |
| Figura 7 | Tipo de entidade × papel argumentativo. |

## Apêndice C — Pendências para a versão de entrega

1. Incorporar a segunda anotação independente e recalcular as métricas contra o consenso.
2. Transcrever as definições integrais dos rótulos do `guia_anotacao.md` (§3.2).
3. Normalizar as referências no padrão exigido e definir o formato final (Markdown, DOCX ou LaTeX).
4. Inserir a Figura 1 (arquitetura) e revisar legendas.
