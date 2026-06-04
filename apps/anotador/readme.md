# Anotador CN-BR — deploy

Arquivos estáticos prontos para qualquer hospedagem (Netlify, Vercel, GitHub Pages).

## Estrutura
- `index.html` — markup limpo
- `styles.css` — todo o CSS
- `data.js` — `window.NOTAS_DATA` com as 60 notas (~75 KB)
- `app.js` — lógica do anotador

## Como subir no Netlify
1. Arraste a pasta `deploy/` inteira pro Netlify Drop (https://app.netlify.com/drop), OU
2. `netlify deploy --dir=deploy --prod` se já tem CLI configurado.

## Como testar localmente
Por causa de CORS em `file://`, sirva via servidor simples:
```
cd deploy
python -m http.server 8000
```
Depois abra http://localhost:8000.

Abrir `index.html` direto no browser (file://) também funciona — `data.js`/`app.js` são scripts, não fetch.

## Como regerar `data.js` com notas atualizadas
Edite o array no `_build_anotacao.py` do projeto e regere o monolítico, ou troque
direto o array em `data.js` (mesmo formato: lista de objetos com noteId, tweet_text,
note_text, e1_spans, e2_spans, consenso, macrotheme_label).

## Exportar BIO
O botao "Exportar BIO" chama o Space publico:
`https://histlearn-pln-bio-converter.hf.space/convert`.

A fonte primaria continua sendo o JSON com spans e offsets. O BIO e gerado como
artefato derivado pelo conversor Python, com tokenizador `spacy_pt`.
