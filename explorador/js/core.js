/* core.js — estado compartilhado e utilidades de baixo nível.
 * Carregado como script clássico (sem ES modules) para funcionar via file://.
 * Expõe T, COR, st, $, esc, renderSpans, legend, bar no escopo global e,
 * de forma organizada, sob o namespace `App`. */
const T = ["CLAIM", "EVIDENCIA", "FONTE", "QUALIFICADOR"];
const COR = { CLAIM: "#c0392b", EVIDENCIA: "#2f6b45", FONTE: "#1f5d75", QUALIFICADOR: "#8a6105" };

/* estado da aplicação (view ativa, índice da nota, fonte de spans, filtros) */
const st = { view: "conjunto", idx: 0, src: "E2", filtro: "", ent: "", entTipo: "", bidx: 0, bsrc: "E2", bfiltro: "" };

/* registro de views preenchido pelos módulos js/views/*.js */
const VIEWS = {};

const $ = s => document.querySelector(s);
const esc = s => (s || "").replace(/[&<>]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));

/* converte (texto, spans) em HTML com os trechos argumentativos marcados.
 * Em sobreposição, vence o span que começa antes / é mais longo. */
function renderSpans(text, spans){
  const lab = new Array(text.length).fill(null);
  const sorted = spans.slice().sort((a, b) => a.s - b.s || (b.e - b.s) - (a.e - a.s));
  for(const sp of sorted) for(let i = sp.s; i < Math.min(sp.e, text.length); i++) if(lab[i] === null) lab[i] = sp.t;
  let h = "", i = 0;
  while(i < text.length){
    const t = lab[i]; let j = i + 1; while(j < text.length && lab[j] === t) j++;
    const seg = esc(text.slice(i, j));
    h += t ? '<mark class="sp sp-' + t + '" title="' + t + '">' + seg + '</mark>' : seg;
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
