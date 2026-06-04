# Guia de Anotação — Argumentation Mining em Community Notes BR

**Versão:** 1.0
**Projeto:** PLN UFSCar 2026/1 — comparação E1 (regras) × E2 (LLM)
**Tarefa do anotador:** marcar **spans argumentativos** em 60 notas de fact-checking pareadas com seus tweets originais.

---

## 1. Visão geral

Você vai ler 60 pares **(tweet, nota)** e marcar, **no texto da nota**, os trechos que cumprem um destes quatro papéis argumentativos:

| Cor | Tipo | Função |
|---|---|---|
| 🔴 vermelho | **CLAIM** | a alegação que a nota refuta, qualifica ou contextualiza |
| 🟢 verde | **EVIDÊNCIA** | o fato, dado, contraexemplo ou justificativa que sustenta a checagem |
| 🔵 azul | **FONTE** | quem ou o que a nota cita como respaldo (veículo, especialista, órgão, URL) |
| 🟡 âmbar | **QUALIFICADOR** | marcador de modulação ou ressalva ("parcialmente", "supostamente") |

O tweet é **contexto** — você lê pra entender qual alegação a nota está enfrentando. **Spans são marcados apenas na nota**, nunca no tweet.

A anotação serve como **referência humana** (gold) para comparar com o que duas estratégias automáticas — regras simbólicas (E1) e um LLM (E2) — produziram. Você não está validando o trabalho delas: produz o seu, do zero. O app mostra as sugestões de E1 e E2 como consulta opcional (tecla `Tab`), mas elas **não são pré-marcação**.

---

## 2. Os quatro tipos — definição operacional

### 🔴 CLAIM — a alegação refutada

**O que é:** o trecho da nota que expressa a afirmação que o tweet fazia (e que a nota agora corrige ou qualifica). Pode aparecer como negação direta, paráfrase ou citação.

**Pistas léxicas frequentes em PT-BR:**
- "não é verdade que **X**"
- "é falso que **X**"
- "a foto/imagem/vídeo não mostra **X**"
- "não há evidência de que **X**"
- "**X** não aconteceu"
- "**X** é antiga/de 2013"

**Exemplo positivo:**
```
NOTA: "A foto não mostra um protesto em Brasília em 2024."
                          ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
                          [CLAIM]
```

**Exemplo negativo (NÃO marcar como CLAIM):**
```
NOTA: "Segundo a AFP, a imagem é de 2013."
       ▔▔▔▔▔▔▔▔▔▔▔▔  ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
       [FONTE]       [EVIDÊNCIA]
```
Aqui não há CLAIM no texto — a alegação está implícita no tweet, mas a nota só apresenta a refutação.

---

### 🟢 EVIDÊNCIA — o fato que sustenta a checagem

**O que é:** o conteúdo factual, descritivo ou numérico que a nota oferece como base para contrariar/qualificar o tweet. Frequentemente segue a estrutura "X não é Y, é **Z**".

**Pistas léxicas:**
- verbos factivos: *mostra, indica, comprova, confirma, revela, evidencia*
- valores numéricos, datas, percentuais
- contraexemplos ("na verdade...", "ao contrário...")

**Exemplo positivo:**
```
NOTA: "O reajuste foi de 4,9%, e não 500% como afirma o tweet."
       ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔                ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
       [EVIDÊNCIA]                          [CLAIM]
```

**Exemplo negativo:**
```
NOTA: "Estudos mostram que a vacina é segura."
       ▔▔▔▔▔▔▔
       [FONTE — não é EVIDÊNCIA]
```
"Estudos" aqui é uma atribuição genérica; o conteúdo da evidência ("a vacina é segura") não tem suporte concreto na nota.

---

### 🔵 FONTE — atribuição

**O que é:** quem ou o que a nota cita como autoridade ou base da informação. Pode ser veículo de mídia, especialista, órgão público, documento, ou URL.

**Pistas léxicas:**
- "segundo **X**", "de acordo com **X**", "conforme **X**"
- "**X** {afirma | informa | publicou | apurou}"
- URLs completas (`https://...`)
- nomes de veículos (G1, Folha, Lupa, AFP, Reuters), órgãos (STF, TSE, Anvisa, Ministério da Saúde)

**Exemplos:**
```
"Segundo a Agência Lupa,..."     →  [FONTE: "Segundo a Agência Lupa"]
"Fonte: https://lupa.uol.com.br" →  [FONTE: "https://lupa.uol.com.br"]
"...conforme análise do G1."     →  [FONTE: "conforme análise do G1"]
"...divulgou o Ministério..."     →  [FONTE: "o Ministério"]
```

**Observação importante:** URLs são automaticamente pré-marcadas como FONTE pelo pipeline. Você **não precisa marcá-las** — se aparecerem destacadas na sua tela, está correto, é a pré-marcação automática integrada à sua anotação.

---

### 🟡 QUALIFICADOR — modulação ou ressalva

**O que é:** advérbios, locuções e expressões que modulam o grau de certeza ou o escopo de uma alegação.

**Lista frequente:**
- *aparentemente, provavelmente, possivelmente, supostamente, alegadamente, talvez*
- *parcialmente, parcialmente verdadeiro, fora de contexto*
- *ao que tudo indica, sem evidência clara, não há prova de*

**Exemplos:**
```
"Aparentemente, o vídeo é falso."
 ▔▔▔▔▔▔▔▔▔▔▔▔▔
 [QUALIFICADOR]

"A informação está parcialmente correta."
                    ▔▔▔▔▔▔▔▔▔▔▔▔
                    [QUALIFICADOR]
```

**Não marcar como QUALIFICADOR:**
- adjetivos descritivos sem função modal: "rapidamente", "claramente" (este último vira QUALIFICADOR só em casos como "claramente uma sátira");
- conectivos como "porém", "entretanto" — esses são discursivos, não epistêmicos.

---

## 3. Regras de fronteira

Decisões padronizadas para reduzir variação entre anotadores:

| Situação | Regra |
|---|---|
| **Aspas no texto** ("Segundo a 'Folha'") | Inclua as aspas no span, se elas fazem parte da unidade citada. |
| **Pontuação final** ("é falso que vacinas alterem o DNA.") | Exclua o ponto final do span. Inclua vírgulas internas se separarem termos da mesma unidade. |
| **Artigo definido** ("Segundo a Lupa" vs "a Lupa") | Inclua o conector preposicional ("Segundo a Lupa"), pois é parte da estrutura sintática da atribuição. |
| **CLAIM com várias orações coordenadas** ("X não fez Y e não disse Z") | Marque como um único CLAIM se as orações compartilham o mesmo sujeito refutado. |
| **EVIDÊNCIA encadeada com FONTE** ("Segundo a AFP, a imagem é de 2013") | Marque dois spans separados: FONTE = "Segundo a AFP", EVIDÊNCIA = "a imagem é de 2013". |
| **Trecho com função dupla** | Escolha o tipo dominante. Não suportamos multi-label. Use o campo "obs" se quiser registrar a ambiguidade. |
| **Trecho mais curto possível** | Quando em dúvida sobre incluir ou não uma palavra periférica, **prefira o span mais curto** que ainda preserva o sentido. |

---

## 4. A regra do tweet

O tweet aparece acima da nota com fundo cinza claro. Ele **não é alvo de anotação**. Função: você lê o tweet para entender qual alegação a nota está enfrentando. Isso ajuda a marcar o CLAIM com confiança — especialmente em notas que refutam alegações implícitas ("a foto não é de 2024" → você precisa saber que o tweet dizia que era).

**Princípio:** se o trecho na nota é uma paráfrase, citação ou refutação do que está no tweet, é um CLAIM. Se é o argumento de quem escreveu a nota contra o tweet, é EVIDÊNCIA.

---

## 5. Sobre meta-notas

Identificamos no corpus um sub-grupo de notas que **não argumentam** — comentam o sistema de community notes, registram que o tweet é piada/opinião, ou pedem que outros não usem nota para casos triviais (frequentemente com prefixo `NNN`, "não necessita nota"). **Já filtramos essas notas da sua amostra.**

Se mesmo assim aparecer uma meta-nota nas suas 60 (improvável):
1. Marque o status como "completa" sem spans (`spans: []`);
2. Use o campo "obs" para registrar `meta-nota: <razão>`;
3. Avise o grupo para conferirmos o filtro.

---

## 6. Casos difíceis — resolvidos

Estes são reais ou inspirados em notas que vimos durante o desenvolvimento. Use-os como referência quando travar.

### 6.1 CLAIM implícito (sem citação direta)

```
TWEET: "Lula aprovou aumento de 500% no salário dos ministros."
NOTA:  "O reajuste aprovado foi de 4,9%, e não 500% como afirma o tweet."
```

**Anotação:**
- EVIDÊNCIA: "O reajuste aprovado foi de 4,9%"
- CLAIM: "não 500% como afirma o tweet"

**Por quê:** o CLAIM é a alegação refutada (os 500%); a EVIDÊNCIA é o número correto. O conector "e não" pertence ao CLAIM por reformulação.

---

### 6.2 Fontes encadeadas

```
NOTA: "Segundo o portal da Agência Brasil, citado pela Lupa, o número correto é 4,9%."
```

**Anotação:**
- FONTE: "Segundo o portal da Agência Brasil"
- FONTE: "citado pela Lupa"
- EVIDÊNCIA: "o número correto é 4,9%"

**Por quê:** duas atribuições distintas → dois spans FONTE separados. Não uma única FONTE longa.

---

### 6.3 Qualificador embutido em verbo

```
NOTA: "O número parece confundir o salário-base com o teto."
```

**Anotação:**
- QUALIFICADOR: "parece confundir"

**Por quê:** "parece" modula a afirmação. O verbo carrega a função epistêmica; marque o verbo inteiro (ou a locução verbal completa) como QUALIFICADOR.

---

### 6.4 Nota com vários CLAIMs distintos

```
NOTA: "Não é verdade que houve fraude nas urnas em 2022, nem que o resultado foi alterado."
```

**Anotação:**
- CLAIM: "houve fraude nas urnas em 2022"
- CLAIM: "que o resultado foi alterado"

**Por quê:** dois CLAIMs coordenados, com sujeitos lógicos diferentes. Dois spans separados (não um só).

---

### 6.5 EVIDÊNCIA com URL no meio

```
NOTA: "A imagem é de 2011, no Japão, conforme checagem da AFP em https://factcheck.afp.com/exemplo."
```

**Anotação:**
- EVIDÊNCIA: "A imagem é de 2011, no Japão"
- FONTE: "conforme checagem da AFP"
- FONTE: "https://factcheck.afp.com/exemplo" *(automática pelo pipeline)*

**Por quê:** três spans, um por função. A URL já vem marcada — só confirme se aparecer destacada azul.

---

### 6.6 Refutação parcial com qualificador

```
NOTA: "É parcialmente verdade. A vacina reduz a transmissão, mas não a elimina completamente."
```

**Anotação:**
- QUALIFICADOR: "parcialmente verdade"
- EVIDÊNCIA: "A vacina reduz a transmissão, mas não a elimina completamente"

**Por quê:** "parcialmente verdade" é uma avaliação epistêmica direta sobre o tweet; a frase seguinte sustenta a avaliação.

---

### 6.7 Sátira/humor genuíno

```
TWEET: "Bolsonaro foi para o exílio na Antártida com seu pet Mussolini."
NOTA:  "Postagem de humor, sem pretensão informativa."
```

**Anotação:**
- *(sem spans)*
- Marcar como completa.
- Em "obs": "nota classifica o tweet como humor; sem estrutura argumentativa".

**Por quê:** o conteúdo da nota é uma classificação meta, não uma argumentação contra a alegação. Se aparecer assim, não force.

---

### 6.8 CLAIM e EVIDÊNCIA com o mesmo verbo

```
NOTA: "O vídeo não mostra fraude eleitoral; mostra uma simulação escolar de 2018."
```

**Anotação:**
- CLAIM: "fraude eleitoral"
- EVIDÊNCIA: "uma simulação escolar de 2018"

**Por quê:** "O vídeo não mostra" é o gatilho do CLAIM (substring `fraude eleitoral` é o que se nega). A continuação após o `;` é a evidência alternativa.

---

## 7. Mecânicas do app

| Ação | Como |
|---|---|
| Criar span | selecione o texto com o mouse → clique no chip colorido do tipo (ou pressione `1`/`2`/`3`/`4`) |
| Remover span | clique no span → ícone `×` no chip flutuante |
| Mudar tipo | clique no span → menu mostra os 3 tipos alternativos |
| Navegar notas | `←` / `→` no teclado, ou clique na lista lateral |
| Ver sugestões E1/E2 | `Tab` (toggle global) |
| Marcar nota completa | botão "Marcar como completa" ou `Enter` duplo |
| Desfazer última ação | `Ctrl+Z` (ou `Cmd+Z` no Mac) |
| Salvar / exportar | automático em IndexedDB; export manual em JSON via botão ou `Ctrl+S` |
| Abrir este guia | `?` ou botão `📖 Guia` |

**Auto-export**: a cada 5 notas marcadas como completas, o app baixa silenciosamente um JSON parcial como backup.

---

## 8. O que fazer em dúvida

1. **Releia o tweet.** Em 80 % dos casos difíceis, voltar ao tweet esclarece o que é CLAIM.
2. **Use o "obs"** da nota para registrar a ambiguidade — não precisa resolver tudo sozinho. Casos marcados em obs viram pauta da reunião de consenso.
3. **Em casos verdadeiramente irresolvíveis**, marque a anotação que parece mais defensável e siga em frente. A discussão de consenso entre os dois anotadores resolve os desacordos.
4. **Não tente perfeição.** Sua anotação será comparada à do outro anotador via κ de Cohen; a expectativa de literatura para tarefas similares é κ ≥ 0,60. O desacordo é informativo — não falha.

---

## 9. Procedimento ao final

1. Quando todas as 60 estiverem `completas`, clique em **"Exportar JSON final"**.
2. Envie o arquivo `anotacao_<seu_papel>_<seu-nome>_<data>.json` pelo canal combinado com o grupo.
3. Aguarde a etapa de reunião de consenso, onde os dois anotadores discutem os desacordos identificados por script.
4. Após o consenso, geramos `consenso_humano.json` — esta é a referência absoluta que vai medir a qualidade de E1 e E2.

---

## 10. Versionamento

**Guia v1.0** — gerado em 18/05/2026.

Mudanças neste guia após o início da anotação **invalidam** as anotações já feitas para os casos afetados. Se for necessário, será criada `guia_anotacao_v2.md` e os trechos afetados serão re-anotados. Para evitar isso, durante a primeira semana de anotação, dúvidas que sugiram revisão do guia devem ser discutidas em grupo antes de virarem prática individual.
