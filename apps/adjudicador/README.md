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
  "anotador": {"nome": "Consenso Davi + Alvaro", "papel": "consenso_adjudicado"},
  "anotacoes": {
    "noteId": {"status": "completed", "spans": [{"type": "...", "start": 0, "end": 10}]}
  }
}
```

No notebook, aponte `CONSENSUS_JSON_PATH` para esse arquivo. Quando ele está
definido, o consenso adjudicado substitui automaticamente o gold de anotador
único.

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
