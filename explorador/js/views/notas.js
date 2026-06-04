/* views/notas.js — Explorador de notas: tweet + texto com spans, alternando
 * E1 / E2 / Humano, filtro por consenso e raciocínio recolhível do E2. */

function notesFiltradas(){
  return DATA.notas.filter(n => !st.filtro || n.consenso === st.filtro);
}

function viewNotas(){
  const ns = notesFiltradas();
  if(st.idx >= ns.length) st.idx = 0;
  const n = ns[st.idx] || DATA.notas[0];
  const cons = [...new Set(DATA.notas.map(x => x.consenso))].sort();
  let h = '<h2 class="view-title">Explorador de notas <span class="scope">gold humano · 60 notas</span></h2>';
  h += '<p class="lede">Cada nota com seus spans argumentativos. Alterne entre as estratégias e o gold humano para ver onde concordam e divergem.</p>';
  h += '<div class="card">';
  h += '<div class="controls">';
  h += '<div class="seg" id="seg-src">' + ["E2", "E1", "HUMANO"].map(s => '<button data-s="' + s + '" class="' + (st.src === s ? 'on' : '') + '">' + (s === "HUMANO" ? "Humano" : s) + '</button>').join('') + '</div>';
  h += '<div class="pager"><span class="small muted">nota ' + (st.idx + 1) + '/' + ns.length + '</span>'
     + '<button id="prev">‹</button><button id="next">›</button></div></div>';
  if(n.tweet) h += '<div class="tweet"><span class="lbl">tweet original</span>' + esc(n.tweet) + '</div>';
  const spans = n[st.src] || [];
  h += '<div class="nota-text">' + (spans.length ? renderSpans(n.text, spans) : esc(n.text)) + '</div>';
  h += '<div class="meta-row"><span class="badge">noteId: ' + esc(n.id) + '</span>'
     + '<span class="badge">consenso: ' + esc(n.consenso) + '</span>'
     + '<span class="badge">' + (spans.length) + ' spans (' + st.src + ')</span>'
     + (n.macro ? '<span class="badge">' + esc(n.macro) + '</span>' : '') + '</div>';
  h += legend();
  if(n.reason){
    h += '<div class="reasoning-block"><button type="button" class="reasoning-toggle" id="rbtn" aria-expanded="false">'
       + '<span class="caret">▸</span><span class="label">Ver raciocínio do E2 (PT)</span><span class="hint">não como gabarito</span></button>'
       + '<div class="reasoning-body" id="rbody" hidden><div class="reasoning-banner">⚠ Raciocínio do LLM (E2). Lê para desencravar dúvidas — não como gabarito.</div>'
       + '<div class="reasoning-md" id="rmd"></div></div></div>';
  }
  h += '</div>';
  $("#view").innerHTML = h;
  $("#seg-src").querySelectorAll("button").forEach(b => b.onclick = () => { st.src = b.dataset.s; viewNotas(); });
  const rbtn = $("#rbtn"); if(rbtn) rbtn.onclick = () => toggleReason(n.reason);
  $("#prev").onclick = () => { st.idx = (st.idx - 1 + ns.length) % ns.length; viewNotas(); };
  $("#next").onclick = () => { st.idx = (st.idx + 1) % ns.length; viewNotas(); };
  $("#side-extra").innerHTML = '<h2>Filtrar</h2><select id="f-cons"><option value="">todos os consensos</option>'
    + cons.map(c => '<option ' + (st.filtro === c ? 'selected' : '') + '>' + c + '</option>').join('') + '</select>';
  $("#f-cons").onchange = e => { st.filtro = e.target.value; st.idx = 0; viewNotas(); };
}

VIEWS.notas = viewNotas;
