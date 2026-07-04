/* views/entidades.js — Navegador de entidades (unifica lente + perfil).
 * Grão grosso: tipo de entidade (heatmap tipo × papel); grão fino: entidade
 * individual (papel argumentativo, agência sintática, nuvens léxicas, ocorrências).
 * Dados: data_entidades.js (const ENT) + data_notas.js (const NOTAS, drill-down). */

function _tipoLabel(t){ return t.charAt(0) + t.slice(1).toLowerCase().replace(/_/g, ' '); }

function _agencyBar(ag){
  const tot = ag.sujeito + ag.objeto + ag.outro || 1;
  const seg = (v, c, lbl) => v ? '<span class="ag-seg" style="width:' + (100 * v / tot).toFixed(1) + '%;background:' + c + '" title="' + lbl + ': ' + v + '"></span>' : '';
  return '<div class="ag-bar">' + seg(ag.sujeito, COR.EVIDENCIA, 'sujeito') + seg(ag.objeto, COR.CLAIM, 'objeto') + seg(ag.outro, '#c2b59a', 'menção') + '</div>'
    + '<div class="ag-leg"><span><i style="background:' + COR.EVIDENCIA + '"></i>sujeito (age) ' + ag.sujeito + '</span>'
    + '<span><i style="background:' + COR.CLAIM + '"></i>objeto/oblíquo (sofre) ' + ag.objeto + '</span>'
    + '<span><i style="background:#c2b59a"></i>menção ' + ag.outro + '</span></div>';
}

function _ctxSnippet(nid, surf){
  const nf = (typeof NOTAS !== 'undefined') ? NOTAS[nid] : null;
  if(!nf) return esc(surf);
  const txt = nf.t, i = txt.toLowerCase().indexOf((surf || '').toLowerCase());
  if(i < 0) return '…' + esc(txt.slice(0, 120)) + '…';
  const a = Math.max(0, i - 55), b = Math.min(txt.length, i + surf.length + 55);
  return (a > 0 ? '…' : '') + esc(txt.slice(a, i)) + '<b>' + esc(txt.slice(i, i + surf.length)) + '</b>' + esc(txt.slice(i + surf.length, b)) + (b < txt.length ? '…' : '');
}

function _lenteTable(){
  const rows = ENT.lente;
  const maxv = Math.max(...rows.flatMap(r => T.map(t => r[t])));
  let h = '<div class="card"><p class="small muted" style="margin:.1rem 0 .6rem">Comece pelo <b>tipo</b> de entidade: cada tipo cai num papel argumentativo do E2 (célula mais escura = mais frequente). Clique num tipo navegável para ver suas entidades.</p>'
    + '<div class="table-scroll"><table class="heat"><thead><tr><th class="lbl">tipo de entidade</th>'
    + T.map(t => '<th style="color:' + COR[t] + '">' + t + '</th>').join('') + '<th>fora</th><th>nº ent</th><th>total</th><th class="lbl">dominante</th></tr></thead><tbody>';
  for(const r of rows){
    const nav = ENT.tipos_perfil.includes(r.tipo);
    const dom = T.reduce((x, y) => r[y] > r[x] ? y : x, "CLAIM");
    h += '<tr' + (nav ? ' class="heat-nav" data-tipo="' + r.tipo + '"' : '') + '><td class="lbl">' + _tipoLabel(r.tipo) + (nav ? ' ›' : '') + '</td>';
    for(const t of T){
      const a = maxv ? r[t] / maxv : 0;
      const wt = (r[t] === r[dom] && r[t] > 0) ? 'font-weight:700;' : '';
      h += '<td class="hcell" style="background:' + COR[t] + (Math.round(20 + a * 210)).toString(16).padStart(2, '0') + ';' + wt + '">' + r[t] + '</td>';
    }
    h += '<td class="muted">' + r.O + '</td><td class="muted">' + r.n_ent + '</td><td>' + r.total + '</td><td class="dom" style="color:' + COR[dom] + '">' + dom + '</td></tr>';
  }
  h += '</tbody></table></div></div>' + legend();
  return h;
}

function _entList(tipo){
  const names = ENT.por_tipo[tipo] || [];
  let h = '<div class="card"><h3>' + _tipoLabel(tipo) + ' <span class="muted small">· ' + names.length + ' entidades</span></h3>'
    + '<p class="small muted">escolha uma entidade para ver papel, agência e assinatura léxica.</p><div class="ent-grid">';
  for(const nm of names){
    const e = ENT.entidades[nm];
    h += '<button class="ent-pick" data-ent="' + esc(nm) + '"><span class="ent-nm">' + esc(nm) + '</span>'
      + '<span class="ent-meta">' + e.n_notas + ' notas</span></button>';
  }
  h += '</div></div>';
  return h;
}

function _entProfile(name){
  const p = ENT.entidades[name];
  const maxp = Math.max(1, ...T.map(t => p.papel[t]));
  const pds = p.papel_ds || { fonte: 0, mencao: 0 }; const pdtot = pds.fonte + pds.mencao;
  const dsRole = !pdtot ? '' : (pds.fonte > pds.mencao
      ? 'o dataset a classifica como <b>fonte/evidência</b> (' + pds.fonte + '/' + pdtot + ')'
      : 'o dataset a trata como <b>menção</b>' + (pds.fonte ? ' (fonte em ' + pds.fonte + '/' + pdtot + ')' : ''));
  let h = '<div class="card"><h3>' + esc(name) + ' <span class="scope">' + _tipoLabel(p.tipo) + '</span></h3>'
    + '<p class="small muted" style="margin:.1rem 0 .6rem">aparece em ' + p.n_notas + ' notas · ' + p.freq + ' ocorrências'
    + (p.score_medio != null ? ' · confiança GLiNER ' + String(p.score_medio).replace('.', ',') : '')
    + (dsRole ? ' · ' + dsRole : '') + '.</p>';
  // papel argumentativo
  h += '<h4 class="eh">Papel argumentativo (E2)</h4><div class="bars">';
  for(const t of T) h += '<div class="bar-row"><span class="nm" style="color:' + COR[t] + '">' + t + '</span>' + bar(p.papel[t], maxp, COR[t]) + '<span class="small muted">' + p.papel[t] + '</span></div>';
  h += '</div><p class="small muted" style="margin:.3rem 0 0">' + p.fora + ' ocorrências fora de qualquer span.</p>';
  // agência
  h += '<h4 class="eh" style="margin-top:1rem">Agência (papel sintático)</h4>'
    + '<p class="small muted" style="margin:.1rem 0 .4rem">com que frequência a entidade <b>age</b> (sujeito) vs <b>sofre a ação</b> (objeto/oblíquo), pela árvore de dependências.</p>'
    + _agencyBar(p.agency);
  h += '</div>';
  // nuvens léxicas — classes de palavras (toda entidade tem)
  if(p.clouds && (p.clouds.VERB || p.clouds.NOUN || p.clouds.ADJ)){
    const freq = p.clouds_kind === "freq";
    const sub = freq ? 'lemas mais frequentes das notas onde aparece, por classe.'
                     : 'lemas distintivos das notas onde aparece (Dunning LL ≥ 3,84), por classe.';
    const tt = freq ? 'frequência ' : 'Dunning LL ';
    h += '<div class="card"><h3>Classes de palavras</h3><p class="small muted" style="margin:.1rem 0 .6rem">' + sub + '</p><div class="perfil-cols">';
    for(const [k, lbl] of [["VERB", "verbos"], ["NOUN", "substantivos"], ["ADJ", "adjetivos"]]){
      const arr = p.clouds[k] || []; const mx = Math.max(1, ...arr.map(x => x[1]));
      h += '<div class="pcol"><h4>' + lbl + '</h4><div class="cloud">'
        + (arr.length ? arr.map(x => '<span class="pos-' + k + '" style="font-size:' + (0.82 + 0.95 * x[1] / mx).toFixed(2) + 'rem" title="' + tt + x[1] + '">' + esc(x[0]) + '</span>').join('') : '<span class="small muted">—</span>')
        + '</div></div>';
    }
    h += '</div></div>';
  }
  // ocorrências
  if(p.ex && p.ex.length){
    h += '<div class="card"><h3>Ocorrências</h3><p class="small muted" style="margin:.1rem 0 .5rem">clique para abrir a nota completa</p>';
    for(const o of p.ex) h += '<p class="ex occ-click" data-nid="' + esc(o.n) + '">' + _ctxSnippet(o.n, o.s) + '</p>';
    h += '</div>';
  }
  return h;
}

function _crumbs(){
  let c = '<nav class="crumbs"><a class="crumb" data-lvl="0">Todos os tipos</a>';
  if(st.entTipo) c += '<span class="sep">›</span><a class="crumb" data-lvl="1">' + _tipoLabel(st.entTipo) + '</a>';
  if(st.ent && st.entTipo) c += '<span class="sep">›</span><span class="crumb cur">' + esc(st.ent) + '</span>';
  return c + '</nav>';
}

function viewEntidades(){
  let h = '<h2 class="view-title">Navegador de entidades <span class="scope">entidades · corpus</span></h2>';
  const hasTipo = st.entTipo && ENT.por_tipo[st.entTipo];
  const hasEnt = st.ent && ENT.entidades[st.ent];
  if(hasEnt && (!st.entTipo || ENT.entidades[st.ent].tipo === st.entTipo)){
    st.entTipo = ENT.entidades[st.ent].tipo;
    h += _crumbs() + _entProfile(st.ent);
  } else if(hasTipo){
    st.ent = '';
    h += _crumbs() + _entList(st.entTipo);
  } else {
    st.entTipo = ''; st.ent = '';
    h += '<p class="lede">' + ENT.n_entidades + ' entidades nomeadas do corpus (extração <b>GLiNER</b>, filtradas pelos sinais do próprio dataset — confiança e tipo de extração), agrupadas por tipo. A <b>lente</b> abaixo inclui também as camadas formais por regex (URLs, datas, valores). O tipo prevê o papel argumentativo; cada entidade traz ainda sua <b>agência</b> (age × sofre) e assinatura léxica.</p>' + _lenteTable();
  }
  $("#view").innerHTML = h;

  // navegação por cliques
  $("#view").querySelectorAll(".heat-nav").forEach(el => el.onclick = () => { st.entTipo = el.dataset.tipo; st.ent = ''; viewEntidades(); });
  $("#view").querySelectorAll(".ent-pick").forEach(el => el.onclick = () => { st.ent = el.dataset.ent; viewEntidades(); });
  $("#view").querySelectorAll(".occ-click").forEach(el => el.onclick = () => openNote(el.dataset.nid));
  $("#view").querySelectorAll(".crumb[data-lvl]").forEach(el => el.onclick = () => {
    const lvl = el.dataset.lvl;
    if(lvl === "0"){ st.entTipo = ''; st.ent = ''; } else if(lvl === "1"){ st.ent = ''; }
    viewEntidades();
  });

  // controles na sidebar (tipo + entidade)
  let se = '<h2>Tipo</h2><select id="sel-tipo"><option value="">todos os tipos</option>'
    + ENT.tipos_perfil.map(t => '<option value="' + t + '"' + (st.entTipo === t ? ' selected' : '') + '>' + _tipoLabel(t) + '</option>').join('') + '</select>';
  if(st.entTipo && ENT.por_tipo[st.entTipo]){
    se += '<h2>Entidade</h2><select id="sel-ent2"><option value="">— escolher —</option>'
      + ENT.por_tipo[st.entTipo].map(nm => '<option' + (st.ent === nm ? ' selected' : '') + '>' + esc(nm) + '</option>').join('') + '</select>';
  }
  $("#side-extra").innerHTML = se;
  $("#sel-tipo").onchange = e => { st.entTipo = e.target.value; st.ent = ''; viewEntidades(); };
  const se2 = $("#sel-ent2"); if(se2) se2.onchange = e => { st.ent = e.target.value; viewEntidades(); };
}

VIEWS.entidades = viewEntidades;
