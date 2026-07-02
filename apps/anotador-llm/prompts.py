"""Prompt e few-shot da Estrategia 2 (LLM como extrator de spans).

Conteudo identico ao usado no sweep original com qwen3.6-max-preview via
DashScope (notebooks/notebook_preparacao_v2.ipynb) -- so o backend de
inferencia muda (Ollama local em vez de API remota).
"""

import json

VALID_TYPES = {"CLAIM", "EVIDENCIA", "FONTE", "QUALIFICADOR"}

PROMPT_SYSTEM = """Você é um anotador de mineração de argumentos em notas de contexto brasileiras.
Extraia spans argumentativos copiando trechos LITERALMENTE do texto original.
NUNCA invente texto, NUNCA parafraseie, NUNCA devolva offsets.
Responda apenas JSON válido no formato {"spans": [{"type": "CLAIM|EVIDENCIA|FONTE|QUALIFICADOR", "text": "trecho exato"}]}.
Tipos:
- CLAIM: alegacao que a nota corrige, nega, relativiza ou contradiz. Em notas de checagem, frequentemente aparece depois de "não é verdade que", "é falso que", "não há evidência de que", "imagem não mostra".
- EVIDENCIA: dado, verificacao ou justificativa usada para sustentar a correcao.
- FONTE: fonte citada, veiculo, orgao, URL, documento ou base consultada.
- QUALIFICADOR: marcador de incerteza, ressalva, escopo ou modalidade.
Regras criticas de copia:
- O campo text deve ser uma substring literal do texto original.
- Preserve acentos, aspas curvas, travessoes, hifens e capitalizacao exatamente como aparecem.
- Se o texto tem quebras de linha (\n) dentro de um trecho, NAO inclua as quebras no snippet: copie apenas o conteudo de uma frase continua.
- Se uma URL aparece no texto, ela sera extraida automaticamente como FONTE pelo pipeline; ainda assim, marque outras fontes textuais relevantes.
- Se nao houver span argumentativo claro, retorne {"spans": []}.
"""

FEW_SHOT = [
    {"role": "user", "content": "TEXTO: Segundo a Agência Lupa, é falso que vacinas alterem o DNA. Estudos clínicos mostram que elas não entram no núcleo das células. Fonte: https://lupa.uol.com.br/"},
    {"role": "assistant", "content": json.dumps({"spans": [
        {"type": "FONTE", "text": "Segundo a Agência Lupa"},
        {"type": "CLAIM", "text": "vacinas alterem o DNA"},
        {"type": "EVIDENCIA", "text": "Estudos clínicos mostram que elas não entram no núcleo das células"},
        {"type": "FONTE", "text": "https://lupa.uol.com.br/"},
    ]}, ensure_ascii=False)},
    {"role": "user", "content": "TEXTO: O vídeo provavelmente foi gravado em 2019. De acordo com a Reuters, as imagens são de uma manifestação no Chile, não de um ato recente no Brasil."},
    {"role": "assistant", "content": json.dumps({"spans": [
        {"type": "QUALIFICADOR", "text": "provavelmente"},
        {"type": "FONTE", "text": "De acordo com a Reuters"},
        {"type": "EVIDENCIA", "text": "as imagens são de uma manifestação no Chile"},
        {"type": "CLAIM", "text": "um ato recente no Brasil"},
    ]}, ensure_ascii=False)},
    {"role": "user", "content": "TEXTO: Obrigado pela sugestão. A comunidade deve manter o debate respeitoso."},
    {"role": "assistant", "content": json.dumps({"spans": []}, ensure_ascii=False)},
    {"role": "user", "content": "TEXTO: 1: O vídeo não mostra fraude em urnas no Brasil.\n\n2: A gravação foi publicada em 2018 e mostra uma simulação escolar, segundo o TSE."},
    {"role": "assistant", "content": json.dumps({"spans": [
        {"type": "CLAIM", "text": "fraude em urnas no Brasil"},
        {"type": "EVIDENCIA", "text": "A gravação foi publicada em 2018 e mostra uma simulação escolar"},
        {"type": "FONTE", "text": "segundo o TSE"},
    ]}, ensure_ascii=False)},
    {"role": "user", "content": "TEXTO: O post atribui a fala “vamos fechar o Congresso” ao ministro. Segundo o STF, a citação é falsa."},
    {"role": "assistant", "content": json.dumps({"spans": [
        {"type": "CLAIM", "text": "“vamos fechar o Congresso”"},
        {"type": "FONTE", "text": "Segundo o STF"},
        {"type": "EVIDENCIA", "text": "a citação é falsa"},
    ]}, ensure_ascii=False)},
    {"role": "user", "content": "TEXTO: A imagem não mostra enchente no RS em 2024. Ela é de 2011, no Japão, conforme checagem da AFP."},
    {"role": "assistant", "content": json.dumps({"spans": [
        {"type": "CLAIM", "text": "enchente no RS em 2024"},
        {"type": "EVIDENCIA", "text": "Ela é de 2011, no Japão"},
        {"type": "FONTE", "text": "conforme checagem da AFP"},
    ]}, ensure_ascii=False)},
]
