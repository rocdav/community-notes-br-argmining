/* views/painel.js — Painel de achados: E2/E1 vs gold, acordo nos 3 cortes,
 * cobertura por tipo e assinatura léxica (Dunning) por tipo. */

function viewPainel(){
  const g = Object.fromEntries(DATA.vs_gold.map(r => [r.estrategia, r]));
  let h = '<h2 class="view-title">Painel de achados <span class="scope">E1 × E2 × gold</span></h2>';
  h += '<p class="lede">Síntese do experimento: o LLM aproxima-se do humano, as regras compensam em cobertura de FONTE e custo, e cada tipo tem assinatura léxica própria.</p>';
  h += '<div class="headline">';
  h += '<div class="stat"><div class="k">E2 (LLM) vs gold humano</div><div class="v">F1 ' + g.E2.F1_relaxada + '</div><div class="s">estrita ' + g.E2.F1_estrita + ' — alinha-se ao humano</div></div>';
  h += '<div class="stat"><div class="k">E1 (regras) vs gold humano</div><div class="v">F1 ' + g.E1.F1_relaxada + '</div><div class="s">estrita ' + g.E1.F1_estrita + ' — fronteiras fracas</div></div>';
  h += '</div>';
  // cortes
  h += '<div class="card"><h3 style="margin:.1rem 0 .4rem">Acordo E1×E2 nos 3 cortes</h3><div class="table-scroll"><table class="simple"><thead><tr><th>corte</th><th>n</th><th>F1 estrita</th><th>F1 relaxada</th><th>κ char</th></tr></thead><tbody>';
  for(const c of DATA.cortes) h += '<tr><td>' + c.corte + '</td><td>' + c.n + '</td><td>' + c.F1_estrita + '</td><td>' + c.F1_relaxada + '</td><td>' + c.kappa_char + '</td></tr>';
  h += '</tbody></table></div><p class="small muted" style="margin:.5rem 0 0">O acordo cai de A para C: divergem mais onde há material argumentativo real.</p></div>';
  // cobertura
  h += '<div class="card"><h3 style="margin:.1rem 0 .4rem">Cobertura por tipo</h3><div class="bars">';
  for(const c of DATA.cobertura){
    h += '<div class="bar-row"><span class="nm">' + c.tipo + '</span>' + bar(c.E1, 100, "#b94f42") + '<span class="small muted">E1 ' + c.E1 + '%</span></div>';
    h += '<div class="bar-row"><span class="nm"></span>' + bar(c.E2, 100, COR[c.tipo]) + '<span class="small muted">E2 ' + c.E2 + '%</span></div>';
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
}

VIEWS.painel = viewPainel;
