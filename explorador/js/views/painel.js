/* views/painel.js — Painel de achados: E1/E2/E2b vs gold adjudicado em DUAS LEITURAS
 * (completa × sem FONTE-URL), sensibilidade à régua, acordo nos 3 cortes, cobertura
 * por tipo e assinatura léxica (Dunning) por tipo. */

function viewPainel(){
  const NOMES = { E1: 'E1 (regras)', E2: 'E2 (LLM API)', E2b: 'E2b (LLM aberto local)' };
  const fp = x => (x == null ? '—' : Number(x).toFixed(3).replace('.', ','));
  const LE = DATA.vs_gold_leituras || null;
  const leituras = LE ? Object.keys(LE) : [];
  if(LE && !LE[st.leitura]) st.leitura = leituras[0];
  const vs = LE ? LE[st.leitura] : DATA.vs_gold;
  const rotLeitura = l => (l === 'completa' ? 'Leitura completa' : 'Sem FONTE-URL');

  let h = '<h2 class="view-title">Painel de achados <span class="scope">E1 × E2 × E2b × gold adjudicado</span></h2>';
  h += '<p class="lede">Síntese do experimento contra o gold adjudicado, em <b>duas leituras</b>: a <b>completa</b> '
     + '(com a infraestrutura de FONTE-URL) e a leitura <b>sem FONTE-URL</b> (só o conteúdo decidido). '
     + 'Alternar entre elas chega a <b>inverter o ranking</b> — é o eixo metodológico do relatório (§3.6, §5.3).</p>';

  // toggle de leitura
  if(LE){
    h += '<div class="controls"><div class="seg" id="seg-leitura">'
       + leituras.map(l => '<button data-l="' + l + '" class="' + (st.leitura === l ? 'on' : '') + '">' + rotLeitura(l) + '</button>').join('')
       + '</div></div>';
  }

  // headline vs gold (na leitura ativa)
  h += '<div class="headline">';
  for(const r of vs){
    h += '<div class="stat"><div class="k">' + (NOMES[r.estrategia] || r.estrategia) + ' vs gold</div>'
       + '<div class="v">F1 ' + fp(r.F1_relaxada) + '</div>'
       + '<div class="s">estrita ' + fp(r.F1_estrita) + (r.kappa != null ? ' · κ ' + fp(r.kappa) : '') + '</div></div>';
  }
  h += '</div>';

  if(LE){
    const best = vs.slice().sort((a, b) => b.F1_estrita - a.F1_estrita)[0];
    h += '<p class="small muted" style="margin:-.2rem 0 .9rem">Nesta leitura, <b>' + (NOMES[best.estrategia] || best.estrategia)
       + '</b> lidera na F1 estrita (' + fp(best.F1_estrita) + '). '
       + (st.leitura === 'completa'
          ? 'A leitura completa premia quem reproduz bem a camada de URLs — o LLM local e as regras.'
          : 'Removida a infraestrutura de URLs, o modelo remoto assume a frente no conteúdo decidido.') + '</p>';
  }

  // sensibilidade à régua humana (na leitura ativa)
  const SB = DATA.sensibilidade;
  if(SB && SB[st.leitura]){
    h += '<div class="card"><h3 style="margin:.1rem 0 .4rem">Sensibilidade à régua humana</h3>'
       + '<p class="small muted">F1 estrita (' + rotLeitura(st.leitura).toLowerCase() + ') contra cada régua: os dois anotadores '
       + 'isolados e o consenso adjudicado. O ranking muda com a régua — não há gabarito único (§5.4).</p>'
       + '<div class="table-scroll"><table class="simple"><thead><tr><th>estratégia</th>'
       + SB.golds.map(g => '<th>' + g[1] + '</th>').join('') + '</tr></thead><tbody>';
    for(const e of ['E1', 'E2', 'E2b']){
      const row = SB[st.leitura][e];
      if(!row) continue;
      const vals = SB.golds.map(g => row[g[0]]).filter(v => v != null);
      const mx = vals.length ? Math.max(...vals) : null;
      h += '<tr><td>' + (NOMES[e] || e) + '</td>'
         + SB.golds.map(g => { const v = row[g[0]]; return '<td' + (v === mx ? ' style="font-weight:700;color:var(--brand)"' : '') + '>' + fp(v) + '</td>'; }).join('')
         + '</tr>';
    }
    h += '</tbody></table></div></div>';
  }

  // cortes (acordo E1×E2 no corpus — independe da leitura)
  h += '<div class="card"><h3 style="margin:.1rem 0 .4rem">Acordo E1×E2 nos 3 cortes</h3><div class="table-scroll"><table class="simple"><thead><tr><th>corte</th><th>n</th><th>F1 estrita</th><th>F1 relaxada</th><th>κ char</th></tr></thead><tbody>';
  for(const c of DATA.cortes) h += '<tr><td>' + c.corte + '</td><td>' + c.n + '</td><td>' + c.F1_estrita + '</td><td>' + c.F1_relaxada + '</td><td>' + c.kappa_char + '</td></tr>';
  h += '</tbody></table></div><p class="small muted" style="margin:.5rem 0 0">Acordo entre as duas estratégias no corpus inteiro (não contra o gold); cai de A para C: divergem mais onde há material argumentativo real.</p></div>';

  // cobertura
  h += '<div class="card"><h3 style="margin:.1rem 0 .4rem">Cobertura por tipo</h3><div class="bars">';
  for(const c of DATA.cobertura){
    h += '<div class="bar-row"><span class="nm">' + c.tipo + '</span>' + bar(c.E1, 100, "#8f7a5b") + '<span class="small muted">E1 ' + c.E1 + '%</span></div>';
    h += '<div class="bar-row"><span class="nm"></span>' + bar(c.E2, 100, COR[c.tipo]) + '<span class="small muted">E2 ' + c.E2 + '%</span></div>';
    if(c.E2b !== undefined) h += '<div class="bar-row"><span class="nm"></span>' + bar(c.E2b, 100, "#7a6a8a") + '<span class="small muted">E2b ' + c.E2b + '%</span></div>';
  }
  h += '</div></div>';

  // dunning
  h += '<div class="card"><h3 style="margin:.1rem 0 .6rem">Assinatura léxica por tipo (Dunning G²)</h3>';
  for(const t of T){
    h += '<div style="margin:.5rem 0"><b style="color:' + COR[t] + '">' + t + '</b><div class="dchips">'
      + (DATA.dunning[t] || []).map(w => '<span class="dchip" style="border-color:' + COR[t] + '55;color:' + COR[t] + '">' + esc(w) + '</span>').join('') + '</div></div>';
  }
  h += '</div>';

  $("#view").innerHTML = h; $("#side-extra").innerHTML = "";
  const sl = $("#seg-leitura");
  if(sl) sl.querySelectorAll("button").forEach(b => b.onclick = () => { st.leitura = b.dataset.l; viewPainel(); });
}

VIEWS.painel = viewPainel;
