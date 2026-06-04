/* charts.js — gráficos desenhados à mão (SVG/CSS), sem biblioteca, no estilo
 * folhetim. Usados pela visão "Conjunto". Depende de esc() de core.js. */

/* donut: segs = [{label, value, color}]; opts.center = {top, bot} */
function donut(segs, opts){
  opts = opts || {};
  const total = segs.reduce((s, x) => s + x.value, 0) || 1;
  const C = 100;            // circunferência (raio 15.9155 ⇒ 2πr ≈ 100)
  let off = 25;             // começa às 12h
  let arcs = '';
  for(const s of segs){
    const len = C * s.value / total;
    arcs += '<circle class="don-seg" r="15.9155" cx="21" cy="21" fill="transparent" stroke="' + s.color
      + '" stroke-width="6" stroke-dasharray="' + len.toFixed(2) + ' ' + (C - len).toFixed(2)
      + '" stroke-dashoffset="' + off.toFixed(2) + '"><title>' + esc(s.label) + ': ' + s.value + '</title></circle>';
    off -= len;             // próximo segmento começa onde este terminou (sentido horário)
  }
  const c = opts.center || {};
  const center = (c.top || c.bot)
    ? '<text x="21" y="20" class="don-c1">' + esc(c.top || '') + '</text>'
      + '<text x="21" y="26" class="don-c2">' + esc(c.bot || '') + '</text>' : '';
  const svg = '<svg viewBox="0 0 42 42" class="donut" role="img" aria-label="' + esc(opts.aria || 'distribuição') + '">'
    + '<circle r="15.9155" cx="21" cy="21" fill="transparent" stroke="#0000000f" stroke-width="6"></circle>'
    + arcs + center + '</svg>';
  const legend = '<ul class="don-legend">' + segs.map(s =>
      '<li><span class="sw" style="background:' + s.color + '"></span>'
      + '<b>' + esc(s.label) + '</b> <span class="muted">' + s.value + ' · '
      + (100 * s.value / total).toFixed(1).replace('.', ',') + '%</span>'
      + (s.hint ? '<span class="don-hint">' + esc(s.hint) + '</span>' : '') + '</li>').join('') + '</ul>';
  return '<div class="donut-wrap">' + svg + legend + '</div>';
}

/* hbars: items = [{label, value, color?, sub?}]; barra horizontal proporcional */
function hbars(items, opts){
  opts = opts || {};
  const max = opts.max || Math.max(1, ...items.map(i => i.value));
  const fmt = opts.fmt || (v => v);
  return '<div class="hbars">' + items.map(i => {
    const w = Math.max(1.5, 100 * i.value / max);
    return '<div class="hbar-row"><span class="hbar-lbl" title="' + esc(i.label) + '">' + esc(i.label) + '</span>'
      + '<span class="hbar-track"><span class="hbar-fill" style="width:' + w.toFixed(1) + '%;background:'
      + (i.color || 'var(--rule-strong)') + '"></span></span>'
      + '<span class="hbar-val">' + fmt(i.value) + (i.sub ? ' <span class="muted">' + esc(i.sub) + '</span>' : '') + '</span></div>';
  }).join('') + '</div>';
}

Object.assign(window.App, { donut, hbars });
