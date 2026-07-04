/* core.js — estado compartilhado e utilidades de baixo nível.
 * Carregado como script clássico (sem ES modules) para funcionar via file://.
 * Expõe T, COR, st, $, esc, renderSpans, legend, bar no escopo global e,
 * de forma organizada, sob o namespace `App`. */
const T = ["CLAIM", "EVIDENCIA", "FONTE", "QUALIFICADOR"];
const COR = { CLAIM: "#c0392b", EVIDENCIA: "#2f6b45", FONTE: "#1f5d75", QUALIFICADOR: "#8a6105" };

/* estado da aplicação (view ativa, índice da nota, fonte de spans, filtros) */
const st = { view: "conjunto", idx: 0, noteId: "", src: "E2", filtro: "", ent: "", entTipo: "", bidx: 0, bsrc: "E2", bfiltro: "", leitura: "completa" };

/* uma FONTE cujo texto é um endereço eletrônico é "infraestrutura": os três sistemas a
 * injetam por regex e a régua humana a pré-marcava. É a camada que a leitura sem FONTE-URL
 * remove (relatório §3.6). Detectada no cliente para marcar/decompor sem dado extra. */
const URL_RX = /^(?:https?:\/\/|www\.)\S+$|^[\w.-]+\.(?:com|br|org|net|gov|io|co|info|xyz|me|tv|us|uk|edu)(?:\.[a-z]{2})?(?:\/\S*)?$/i;
function isUrlFonte(text, sp){ return sp.t === "FONTE" && URL_RX.test(text.slice(sp.s, sp.e).trim()); }

/* registro de views preenchido pelos módulos js/views/*.js */
const VIEWS = {};

const $ = s => document.querySelector(s);
const esc = s => (s || "").replace(/[&<>]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));

/* converte (texto, spans) em HTML com os trechos argumentativos marcados.
 * Em sobreposição, vence o span que começa antes / é mais longo.
 * opts.markUrlFonte: destaca FONTE-URL como infraestrutura (classe sp-url).
 * opts.dropUrlFonte: omite a marcação de FONTE-URL (simula a leitura sem FONTE-URL). */
function renderSpans(text, spans, opts){
  opts = opts || {};
  const lab = new Array(text.length).fill(null);
  const url = new Array(text.length).fill(false);
  const sorted = spans.slice().sort((a, b) => a.s - b.s || (b.e - b.s) - (a.e - a.s));
  for(const sp of sorted){
    const isu = (opts.markUrlFonte || opts.dropUrlFonte) && isUrlFonte(text, sp);
    if(isu && opts.dropUrlFonte) continue;                 // leitura sem FONTE-URL: nem marca
    for(let i = sp.s; i < Math.min(sp.e, text.length); i++) if(lab[i] === null){ lab[i] = sp.t; url[i] = isu; }
  }
  let h = "", i = 0;
  while(i < text.length){
    const t = lab[i], u = url[i]; let j = i + 1; while(j < text.length && lab[j] === t && url[j] === u) j++;
    const seg = esc(text.slice(i, j));
    if(t){
      const cls = "sp sp-" + t + (u ? " sp-url" : "");
      h += '<mark class="' + cls + '" title="' + t + (u ? " · URL (infraestrutura)" : "") + '">' + seg + '</mark>';
    } else h += seg;
    i = j;
  }
  return h;
}

function legend(){
  return '<div class="legend">' + T.map(t => '<b><span class="dot d-' + t + '"></span>' + t + '</b>').join('') + '</div>';
}

function bar(v, max, cor){
  return '<div class="bar" style="width:' + Math.max(2, Math.round(160 * v / max)) + 'px;background:' + cor + '"></div>';
}

window.App = { T, COR, st, VIEWS, $, esc, renderSpans, legend, bar };
