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
   não sobrescreve o gold local.
4. A revisão final deve usar `Rodada = revisao_cruzada` ou `fechamento`.

O export final registra `adjudicacao.importacao_assincrona` e preserva
`adjudicacao.decisoes_por_nota`, incluindo substituições, mudanças de tipo,
uso de fontes e toggles de camada. Assim é possível distinguir consenso conjunto,
parecer individual e fechamento assíncrono.

## Independência em relação a E1/E2

As camadas E1/E2 ficam bloqueadas até a nota ser marcada como revisada. Se forem
consultadas depois disso, o evento entra na trilha de decisões como
`toggle_layer`. A recomendação é adjudicar olhando apenas Davi/Álvaro/parecer
humano; E1/E2 servem só para inspeção pós-decisão.

## Regenerar dados

Quando os JSONs humanos forem atualizados:

```bash
python apps/adjudicador/build_data.py
```

O script lê:

- `apps/anotador/data.js`;
- `data/gold/anotacao_manual_davi-machado-da-rocha_2026-05-20.json`;
- `data/gold/anotacao_manual_alvaro-barros_2026-07-02.json`.

Ele valida os offsets antes de escrever `apps/adjudicador/data.js`.
