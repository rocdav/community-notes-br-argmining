# Dados — dicionário

## `dataset_anotado_final_com_bio.csv`

**1901 linhas (notas) × 30 colunas.** Cada linha é uma nota da comunidade com os *spans* das
duas estratégias, métricas de acordo, projeção BIO e análise sintática. Codificação **UTF-8**.

> ⚠️ As colunas `e1_spans`, `e2_spans` e `anotacao_humana_spans` vêm como **repr de array
> NumPy / lista Python** (aspas simples, podem não ter vírgula entre os dicts). **Não** use
> `json.loads`; parseie por regex (`'start': N, 'end': N, 'type': 'X'`) ou `ast.literal_eval`.
> As colunas `*_json` (sintaxe, BIO, offsets) e `e2_align_levels` são JSON/dict normais.

| Coluna | Tipo | Descrição |
|---|---|---|
| `noteId` | int | Identificador da nota. |
| `tweetId` | int | Identificador do tweet associado (689 únicos). |
| `consenso` | str | Status no Community Notes: `CRH` (útil), `CRNH` (não útil), `NMR` (precisa avaliações), `Outro`. |
| `macrotheme_label` | str | Macrotema (30 valores; nulo quando não atribuído). |
| `text` | str | **Texto da nota** (`summary`) — alvo da anotação. |
| `tweet_text` | str | Texto do tweet — usado como **contexto**. |
| `is_meta` | bool | Nota sem pretensão argumentativa (comentário do sistema, humor, muito curta…). |
| `meta_reason` | str | Motivo da meta-nota (`prefixo_NNN`, `muito_curta`, …; nulo se não-meta). |
| `e1_spans` | str(repr) | *Spans* da E1: lista de `{start, end, type}`. |
| `e2_spans` | str(repr) | *Spans* da E2 (LLM). |
| `e2_align_levels` | dict-repr | Contagem de como os *snippets* do E2 alinharam (`exact/normalized/regex/unicode_normalized/failed`). |
| `e2_err` | str | Mensagem de erro/recusa do provedor do LLM (nulo na maioria). |
| `f1_strict` | float | F1 **estrita** E1×E2 da nota (offset + tipo exatos). |
| `f1_relaxed` | float | F1 **relaxada** E1×E2 (sobreposição + tipo). |
| `kappa` | float | **κ** em nível de caractere, E1×E2, da nota. |
| `e1_ms` | float | Latência da E1 na nota (ms). |
| `e2_ms` | float | Latência da E2 na nota (ms). |
| `model` | str | Modelo LLM da E2 (`qwen3.6-max-preview`). |
| `anotacao_humana_anotador` | str | Identificador do anotador (preenchido só nas 60 do *gold*). |
| `anotacao_humana_status` | str | `selecionada_para_anotacao` (as 60) ou `nao_anotada`. |
| `anotacao_humana_spans` | str(repr) | *Spans* do *gold* humano (nulo fora das 60). |
| `bio_tokens_json` | json | Tokens da nota (inclui tokens de espaço). |
| `bio_offsets_json` | json | `[start, end]` de cada token, alinhado aos tokens. |
| `e1_span_bio_json` | json | Rótulos BIO da E1 por token (`B-TIPO`/`I-TIPO`/`O`). |
| `e2_span_bio_json` | json | Rótulos BIO da E2 por token. |
| `humano_span_bio_json` | json | Rótulos BIO do *gold* por token (nulo fora das 60). |
| `bio_tokenizer` | str | Tokenizador usado na projeção BIO. |
| `bio_projection_version` | str | Versão do procedimento de projeção span→BIO. |
| `bio_conflict_policy` | str | Política de resolução de sobreposição na projeção. |
| `sintaxe_json` | json | Árvore de dependências (UD): por token `{i, form, lemma, upos, deprel, head, start, end}`. `head` é o índice 0-based (`i`) da cabeça; ROOT aponta para si. |

## `dataset_anotado_final.parquet`

Input **canônico** do experimento (gerado com DuckDB, preserva `LIST<STRUCT>`): `e1_spans`,
`e2_spans`, métricas, `e2_align_levels` e o *flag* das 60 corretas; `anotacao_humana_spans` entra
vazio (o *gold* é mesclado a partir do JSON do anotador no notebook). Leia com
`engine="fastparquet"` ou DuckDB.

## `gold/`

- `anotacao_manual_davi-machado-da-rocha_2026-05-20.json` — anotação humana (1 anotador) das 60
  notas: *spans* `{start, end, type}` por nota. **Gold provisório.**
- `anotacao_manual_davi_2026-06-03_bio.conll` — a mesma anotação exportada em **CoNLL/BIO**
  (token + rótulo), exemplo do formato de sequência.

## `qualitative_60_reasoning.jsonl`

Uma linha JSON por nota das 60: o **raciocínio** do E2 (traduzido para PT) e campos de apoio
(ex.: `spans_recall`). Uso **qualitativo** — não é gabarito.

## Origem

Corpus derivado de [`histlearn/notas-comunidade-ptbr`](https://huggingface.co/datasets/histlearn/notas-comunidade-ptbr)
(config `notes` para o texto; config `entities` para a lente de entidades GLiNER). As entidades
**não** estão versionadas aqui — são baixadas sob demanda pelo `explorador/_build_entidades.py`.
