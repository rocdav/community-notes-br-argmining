/* views/bio.js — visão BIO (rotulagem de sequência, nível de token).
 * Mostra cada token rotulado B-/I-/O por estratégia (E1/E2/Humano) nas 60 notas
 * com gold. Complementa o Explorador de notas (que mostra spans em nível de caractere).
 * Dados: data_bio.js (const BIO). */

function _bioList(){
  return BIO.ordem.filter(id => !st.bfiltro || BIO.byId[id].c === st.bfiltro);
}

/* reconstrói o texto colorindo cada token pelo seu rótulo; barra à esquerda = B- (início) */
function renderBio(text, off, tags){
  let h = "", pos = 0;
  for(let i = 0; i < off.length; i++){
    const s = off[i][0], e = off[i][1], tag = tags[i] || "O";
    if(s > pos) h += esc(text.slice(pos, s));        // lacuna não tokenizada
    const seg = esc(text.slice(s, e));
    if(tag === "O"){ h += seg; }
    else{
      const t = tag.slice(2), b = tag[0] === "B";
      h += '<span class="btok bio-' + t + (b ? ' bio-b' : '') + '" title="' + tag + '">' + seg + '</span>';
    }
    pos = e;
  }
  if(pos < text.length) h += esc(text.slice(pos));
  return h;
}

/* cartão "Destilação (E3)": a escada de alunos (crf_e3_ladder.json), CRF em destaque */
function _e3Card(){
  const L = BIO.ladder || [];
  if(!L.length) return '';
  const f = x => (x == null ? '—' : Number(x).toFixed(3).replace('.', ','));
  const ms = x => (x == null ? '—' : Number(x).toFixed(2).replace('.', ',') + ' ms');
  let h = '<div class="card"><h3 style="margin:.1rem 0 .4rem">Destilação (E3) — a escada de alunos</h3>'
    + '<p class="small muted">rotuladores treinados no <i>silver</i> do E2 (supervisão fraca) e avaliados no gold, F1 estrita por entidade. O <b>CRF clássico</b> alcança o nível do melhor professor (E2b) gastando frações de milissegundo por nota.</p>'
    + '<div class="table-scroll"><table class="simple"><thead><tr><th>modelo</th><th>F1 estrita</th><th>F1 relaxada</th><th>ms/nota</th></tr></thead><tbody>';
  for(const r of L){
    const nome = r.modelo || r.nome || '';
    const best = /^CRF$/i.test(nome);
    h += '<tr' + (best ? ' style="font-weight:700;color:var(--brand)"' : '') + '><td>' + esc(nome) + (best ? ' ★' : '') + '</td>'
      + '<td>' + f(r.f1_estrita) + '</td><td>' + f(r.f1_relaxada) + '</td><td>' + ms(r.ms_por_nota) + '</td></tr>';
  }
  h += '</tbody></table></div><p class="small muted" style="margin:.5rem 0 0">O aluno campeão é o <b>CRF</b> (★): treinado no silver do E2, supera o próprio professor e iguala o E2b a ~0,3 ms/nota. Alterne para <b>CRF</b> acima para ver suas fronteiras token a token.</p></div>';
  return h;
}

function viewBio(){
  const ns = _bioList();
  if(st.bidx >= ns.length) st.bidx = 0;
  const id = ns[st.bidx] || BIO.ordem[0];
  const nf = BIO.byId[id];
  const cons = [...new Set(BIO.ordem.map(x => BIO.byId[x].c))].sort();
  let h = '<h2 class="view-title">BIO (tokens) <span class="scope">gold adjudicado · 60 notas</span></h2>';
  h += '<p class="lede">A mesma anotação vista como <b>rotulagem de sequência</b>: cada token recebe '
     + 'um rótulo <b>B-</b> (início de span), <b>I-</b> (continuação) ou <b>O</b> (fora) — o formato '
     + 'recomendado para treino/avaliação token-level. Alterne as estratégias — inclusive o rotulador '
     + '<b>CRF</b> destilado (E3), o melhor aluno — para comparar as fronteiras.</p>';
  h += '<div class="card">';
  h += '<div class="controls">';
  h += '<div class="seg" id="seg-bsrc">' + ["E2", "E2b", "E1", "CRF", "HUMANO"].map(s => '<button data-s="' + s + '" class="' + (st.bsrc === s ? 'on' : '') + '">' + (s === "HUMANO" ? "Humano" : s) + '</button>').join('') + '</div>';
  h += '<div class="pager"><span class="small muted">nota ' + (st.bidx + 1) + '/' + ns.length + '</span>'
     + '<button id="bprev">‹</button><button id="bnext">›</button></div></div>';
  const tags = nf[st.bsrc] || [];
  const nB = tags.filter(t => t[0] === "B").length;
  h += '<div class="bio-stream">' + renderBio(nf.text, nf.off, tags) + '</div>';
  h += '<div class="meta-row"><span class="badge">consenso: ' + esc(nf.c) + '</span>'
     + '<span class="badge">' + nf.off.length + ' tokens</span>'
     + '<span class="badge">' + nB + ' spans (' + st.bsrc + ')</span>'
     + (st.bsrc === "CRF" ? '<span class="badge">E3 · destilado (silver E2)</span>' : '')
     + (nf.m ? '<span class="badge">' + esc(nf.m) + '</span>' : '') + '</div>';
  h += legend();
  h += '<p class="small muted" style="margin:.5rem 0 0">A barra à esquerda marca o <b>B-</b> (início do span); os tokens seguintes da mesma cor são <b>I-</b> (continuação).</p>';
  h += '</div>';
  h += _e3Card();
  $("#view").innerHTML = h;
  $("#seg-bsrc").querySelectorAll("button").forEach(b => b.onclick = () => { st.bsrc = b.dataset.s; viewBio(); });
  $("#bprev").onclick = () => { st.bidx = (st.bidx - 1 + ns.length) % ns.length; viewBio(); };
  $("#bnext").onclick = () => { st.bidx = (st.bidx + 1) % ns.length; viewBio(); };
  $("#side-extra").innerHTML = '<h2>Filtrar</h2><select id="bf-cons"><option value="">todos os consensos</option>'
    + cons.map(c => '<option ' + (st.bfiltro === c ? 'selected' : '') + '>' + c + '</option>').join('') + '</select>';
  $("#bf-cons").onchange = e => { st.bfiltro = e.target.value; st.bidx = 0; viewBio(); };
}

VIEWS.bio = viewBio;
