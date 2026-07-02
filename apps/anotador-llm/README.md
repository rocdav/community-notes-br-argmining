# anotador-llm

Reimplementação da **Estratégia 2** (LLM como extrator de spans, §3.2 da
proposta) usando um modelo servido **localmente pelo Ollama** em vez da API
remota (qwen3.6-max-preview via DashScope). Mantém o mesmo prompt few-shot,
o mesmo protocolo *snippet → offset* em 4 níveis e a mesma regra de FONTE
garantida via URL — só troca o backend de inferência.

## Pré-requisitos

1. Ollama rodando localmente (`ollama serve`, ou como serviço).
2. O modelo baixado, ex.:
   ```
   ollama pull qwen3.6:35b
   ```
3. Dependências Python:
   ```
   pip install -r requirements.txt
   ```

## Uso

```bash
# smoke test com 10 notas
python anotador_llm.py --limit 10

# sweep completo (resumível — reexecutar continua de onde parou)
python anotador_llm.py

# apontando para outro host/modelo Ollama
python anotador_llm.py --host http://localhost:11434 --model qwen3.6:35b
```

Por padrão:
- **Entrada**: `../../data/dataset_anotado_final.parquet` (dataset filtrado e
  canônico do projeto, 1.901 notas — ver `data/README.md`).
- **Saída**: `output/e2_ollama_sweep.jsonl`, um registro por nota, no mesmo
  formato do sweep original (`noteId`, `e2_spans`, `e2_ms`, `e2_err`,
  `e2_align_levels`, `model`). A saída é incremental e resumível: notas já
  processadas com sucesso são puladas em reexecuções.

Principais flags (`--help` para a lista completa):

| Flag | Default | Descrição |
|---|---|---|
| `--input` | `data/dataset_anotado_final.parquet` | dataset filtrado de entrada |
| `--output` | `output/e2_ollama_sweep.jsonl` | JSONL resumível de saída |
| `--host` | `http://localhost:11434` (ou env `OLLAMA_HOST`) | endpoint do Ollama |
| `--model` | `qwen3.6:35b` (ou env `OLLAMA_MODEL`) | modelo a usar |
| `--think` | desligado | habilita o *thinking* do modelo (no experimento original, `enable_thinking=True` triplicava a latência sem ganho mensurável) |
| `--skip-meta` | desligado | pula notas com `is_meta=True` (comentários sobre o sistema, sem pretensão argumentativa — ver §4.4 da proposta) |
| `--limit N` | nenhum | processa só as N primeiras notas pendentes (smoke test) |
| `--no-resume` | desligado | ignora a saída existente e recomeça do zero |

## O que o script faz por nota

1. Monta o prompt (`prompts.py`): system prompt + 6 exemplos few-shot + o
   texto da nota.
2. Chama o Ollama com `temperature=0`, `seed=42`, `format="json"` (saída
   JSON forçada) e `think=False` por padrão.
3. Alinha cada `{"type", "text"}` devolvido ao offset real no texto via
   `alignment.py`, tentando em ordem: exato → normalizado por espaços →
   normalizado por unicode (aspas curvas, travessões, NBSP, NFKC) → regex
   relaxado por tokens. Snippets que não alinham em nenhum nível viram
   `align_level="failed"` e são descartados do resultado final.
3. Mescla URLs do texto (via regex) como `FONTE` garantida, evitando overlap
   com spans já alinhados — o prompt já instrui o modelo a não tentar
   marcá-las.
4. Grava o registro da nota e imprime, ao final, a distribuição de níveis de
   alinhamento e a checagem do critério interno do projeto (`failed < 3%`,
   §4.3 da proposta).

## Arquivos

- `anotador_llm.py` — CLI e loop de sweep (resumível, com barra de progresso).
- `prompts.py` — prompt system + few-shot (4 rótulos: CLAIM, EVIDÊNCIA, FONTE, QUALIFICADOR).
- `alignment.py` — protocolo de alinhamento snippet → offset em 4 níveis.
- `output/` — saída local (ignorada no git).
