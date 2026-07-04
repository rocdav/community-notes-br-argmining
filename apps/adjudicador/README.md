# Adjudicador CN-BR

Interface estática para transformar as duas anotações humanas independentes em
um JSON de consenso, compatível com o contrato já consumido pelo
`notebook_conclusao.ipynb`.

## Uso

Abra `index.html` no navegador. A interface salva o progresso no `localStorage`
e exporta:

- `anotacao_consenso_adjudicado_YYYY-MM-DD.json`: gold final ou rascunho;
- `auditoria_adjudicacao_YYYY-MM-DD.csv`: resumo por nota para registro.

O JSON exportado mantém a estrutura do app de anotação:

```json
{
  "schema_version": "1.0",
  "anotador": {"nome": "Consenso Davi Machado da Rocha + Alvaro Barros", "papel": "consenso_adjudicado"},
  "adjudicacao": {
    "sessao": {
      "modo": "conjunta",
      "adjudicadores": ["Davi Machado da Rocha", "Alvaro Barros"],
      "rodada": "consenso"
    },
    "decisoes_por_nota": {}
  },
  "anotacoes": {
    "noteId": {"status": "completed", "spans": [{"type": "...", "start": 0, "end": 10}]}
  }
}
```

No notebook, aponte `CONSENSUS_JSON_PATH` para esse arquivo. Quando ele está
definido, o consenso adjudicado substitui automaticamente o gold de anotador
único.

## Protocolo recomendado

### Sessão conjunta

É o caminho metodologicamente mais forte. Usem chamada/tela compartilhada,
preencham `Modo = conjunta`, os dois nomes em `Adjudicadores`, e exportem ao fim.
O bloco `adjudicacao.sessao` registra modo, nomes e rodada.

### Adjudicação assíncrona

Quando não houver agenda conjunta:

1. Um adjudicador trabalha em `Modo = assincrona`, `Rodada = parecer individual`
   e exporta o JSON.
2. O outro abre sua sessão, clica em `Carregar parecer` e importa esse JSON.
3. O parecer importado aparece como camada separada e como fonte `Parecer`; ele
   não sobrescreve o gold local. O filtro **≠ Parecer** lista apenas as notas em
   que o parecer difere do gold local — é o roteiro da revisão cruzada.
4. A revisão final deve usar `Rodada = revisao_cruzada` ou `fechamento`. Notas
   que continuarem divergentes após a revisão cruzada devem ser resolvidas em
   conversa direta (chamada curta) e fechadas com os dois nomes em
   `Adjudicadores` e `Rodada = fechamento`.

O export final registra `adjudicacao.importacao_assincrona` e preserva
`adjudicacao.decisoes_por_nota`, incluindo substituições, mudanças de tipo,
uso de fontes e toggles de camada. Assim é possível distinguir consenso conjunto,
parecer individual e fechamento assíncrono.

### Atalhos de resolução

Em clusters com **um span de cada anotador, mesmo tipo e sem acordo exato**
(divergência pura de fronteira), a interface oferece **Usar interseção** e
**Usar união**. A decisão fica registrada como `intersecao_davi_alvaro` /
`uniao_davi_alvaro` no `decision_source` do span.

### Importação segura

`Carregar rascunho` **substitui** o gold local pelas notas presentes no arquivo
e por isso pede confirmação exibindo nome, papel e contagens do arquivo — com
aviso destacado se o JSON não for um export do adjudicador
(`papel != consenso_adjudicado`). As trilhas de decisão local e importada são
**concatenadas** (cada decisão carrega timestamp, ator e rodada próprios), nunca
descartadas. `Carregar parecer` nunca altera o gold.

## Independência em relação a E1/E2

As camadas E1/E2 ficam bloqueadas até a nota ser marcada como revisada. Se forem
consultadas depois disso, o evento entra na trilha de decisões como
`toggle_layer`. A recomendação é adjudicar olhando apenas Davi/Álvaro/parecer
humano; E1/E2 servem só para inspeção pós-decisão. **Edições feitas depois de
uma consulta a E1/E2 ficam visíveis na trilha (toggle seguido de edição) e são
examinadas na auditoria** — a nota volta ao estado pendente e precisa ser
revisada de novo.

## Propriedades do gold adjudicado

- **Não-sobreposto por construção**: adicionar um span ao gold remove
  automaticamente os que colidem com ele (a substituição é contada na trilha).
  Essa restrição é coerente com a projeção BIO usada na avaliação.
- Todo span carrega `decision_source` (`davi`, `alvaro`, `acordo_exato`,
  `manual`, `intersecao_davi_alvaro`, `uniao_davi_alvaro`, `peer`, sufixo
  `+tipo_editado`) e `adjudicated_at`.

## Dados do snapshot

O arquivo `data.js` versionado contém o recorte usado na adjudicação pública. Os JSONs humanos e o
consenso final permanecem em `data/gold/`, que é a fonte de dados preservada no repositório.
