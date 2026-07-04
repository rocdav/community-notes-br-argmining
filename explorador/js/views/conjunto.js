/* views/conjunto.js — página inicial "Conjunto": visão geral (dashboard) sobre
 * o corpus inteiro do experimento (1901 notas), a partir de data_conjunto.js. */

const _br = n => Number(n).toLocaleString('pt-BR');
const _f2 = x => Number(x).toFixed(2).replace('.', ',');
const _f1 = x => Number(x).toFixed(1).replace('.', ',');

function _kpi(v, k, s){
  return '<div class="kpi"><div class="kpi-v">' + v + '</div><div class="kpi-k">' + esc(k) + '</div>'
    + (s ? '<div class="kpi-s">' + esc(s) + '</div>' : '') + '</div>';
}
function _anatBar(name, val, max, color){
  const w = Math.max(1.5, 100 * val / max);
  return '<div class="anat-b"><span class="anat-b-n">' + name + '</span>'
    + '<span class="anat-b-track"><span class="anat-b-fill" style="width:' + w.toFixed(1) + '%;background:' + color + '"></span></span>'
    + '<span class="anat-b-v">' + _br(val) + '</span></div>';
}
function _histBlock(title, hh, color){
  const items = hh.labels.map((l, i) => ({ label: l, value: hh.counts[i], color: color }));
  return '<div class="dist"><h4>' + title + '</h4>' + hbars(items, { fmt: _br }) + '</div>';
}

function viewConjunto(){
  const C = CONJUNTO, G = C.geral;
  let h = '<h2 class="view-title">Conjunto <span class="scope">corpus · ' + _br(G.n_notas) + ' notas</span></h2>';
  h += '<p class="lede">Visão geral do corpus do experimento — todas as ' + _br(G.n_notas) + ' notas geradas '
     + 'pelas três estratégias (regras <b>E1</b> × LLM remoto <b>E2</b> × LLM aberto local <b>E2b</b>), das quais '
     + G.n_gold + ' têm gold humano adjudicado para comparação. As demais visões aprofundam recortes '
     + '(gold humano, entidades).</p>';

  // KPIs
  h += '<div class="kpis">';
  h += _kpi(_br(G.n_notas), 'notas analisadas', '1 modelo · ' + esc(G.modelo));
  h += _kpi(_br(G.n_tweets), 'tweets cobertos', _f1(G.notas_por_tweet_media) + ' notas/tweet · até ' + G.notas_por_tweet_max);
  h += _kpi(G.n_gold, 'com gold humano', 'adjudicado (2 anotadores + consenso)');
  const custoSub = 'E1 fim-a-fim ~' + _f1(C.custo.e1_ms_media) + ' ms'
    + (C.custo.e2b_ms_mediana ? ' · E2b local ~' + _f1(C.custo.e2b_ms_mediana / 1000) + ' s' : '')
    + ' · ' + _br(C.custo.razao) + '× (E2÷E1)';
  h += _kpi('~' + _f1(C.custo.e2_ms_mediana / 1000) + ' s', 'por nota no E2 (LLM remoto)', custoSub);
  h += _kpi('F1 ' + _f2(C.acordo.f1_relaxed), 'acordo E1×E2 (relaxada)', 'estrita ' + _f2(C.acordo.f1_strict) + ' · κ ' + _f2(C.acordo.kappa));
  h += _kpi(_f1(C.meta.pct) + '%', 'são meta-notas', C.meta.n + ' de ' + _br(G.n_notas));
  h += '</div>';

  // resultado das notas (consenso) — donut
  const consColor = { CRH: COR.EVIDENCIA, CRNH: COR.CLAIM, NMR: '#8f7a5b', Outro: '#c2b59a' };
  const consHint = { CRH: 'útil', CRNH: 'não útil', NMR: 'precisa de avaliações', Outro: 'outros' };
  const segsC = C.consenso.map(x => ({ label: x.label, value: x.n, color: consColor[x.label] || '#c2b59a', hint: consHint[x.label] || '' }));
  h += '<div class="card"><h3>Resultado das notas</h3>'
     + '<p class="small muted">status de utilidade no Community Notes — <b>CRH</b> útil, <b>CRNH</b> não útil, <b>NMR</b> precisa de mais avaliações.</p>'
     + donut(segsC, { center: { top: _br(G.n_notas), bot: 'notas' }, aria: 'distribuição de consenso' })
     + '</div>';

  // anatomia argumentativa E1 × E2 × E2b
  const _estr = ['E1', 'E2', 'E2b'].filter(k => C.anatomia[k]);
  const _estrCor = { E1: '#8f7a5b', E2b: '#7a6a8a' };   // E2 usa a cor do tipo; E1 marrom, E2b roxo
  const maxA = Math.max(...T.flatMap(t => _estr.map(k => C.anatomia[k].tipos[t])));
  h += '<div class="card"><h3>Anatomia argumentativa — Regras (E1) × LLM remoto (E2) × LLM local (E2b)</h3>'
     + '<p class="small muted">total de trechos marcados por tipo, no corpus inteiro. As <b>regras</b> enxergam sobretudo FONTE (URLs/veículos); os <b>LLMs</b> distribuem entre CLAIM, EVIDÊNCIA e FONTE — o <b>local</b> combina a distribuição do remoto com um apetite por FONTE próximo ao das regras.</p>'
     + '<div class="anat">';
  for(const t of T){
    h += '<div class="anat-row"><span class="anat-lbl" style="color:' + COR[t] + '">' + t + '</span>'
       + '<div class="anat-bars">'
       + _estr.map(k => _anatBar(k, C.anatomia[k].tipos[t], maxA, _estrCor[k] || COR[t])).join('')
       + '</div></div>';
  }
  h += '</div><p class="small muted" style="margin-top:.5rem">Trechos por nota — '
     + _estr.map(k => k + ' ' + _f2(C.anatomia[k].por_nota)).join(' · ') + '.</p></div>';

  // temas do corpus
  const temas = C.temas.slice(0, 14).map(x => ({ label: x.tema, value: x.n, color: 'var(--brand)' }));
  h += '<div class="card"><h3>Temas do corpus</h3>'
     + '<p class="small muted">' + C.temas.length + ' macrotemas; ' + _br(C.sem_tema) + ' notas sem tema atribuído. Os maiores:</p>'
     + hbars(temas, { fmt: _br })
     + '</div>';

  // tema × resultado (heatmap)
  const TC = C.tema_consenso;
  h += '<div class="card"><h3>Tema × resultado</h3>'
     + '<p class="small muted">como cada macrotema se distribui entre os status (intensidade = proporção <i>dentro da linha</i>; NMR domina quase tudo). Top ' + TC.rows.length + ' temas.</p>'
     + '<div class="table-scroll"><table class="heat"><thead><tr><th class="lbl">macrotema</th>'
     + TC.cols.map(c => '<th style="color:' + (consColor[c] || '#8f7a5b') + '">' + c + '</th>').join('')
     + '<th>total</th></tr></thead><tbody>';
  for(const r of TC.rows){
    h += '<tr><td class="lbl">' + esc(r.tema) + '</td>';
    for(const c of TC.cols){
      const share = r.total ? r[c] / r.total : 0;
      const a = Math.round(20 + share * 210).toString(16).padStart(2, '0');
      h += '<td class="hcell" style="background:' + (consColor[c] || '#8f7a5b') + a + '">' + r[c] + '</td>';
    }
    h += '<td class="muted">' + r.total + '</td></tr>';
  }
  h += '</tbody></table></div></div>';

  // distribuições por nota (histogramas)
  h += '<div class="card"><h3>Distribuições por nota</h3>'
     + '<p class="small muted">acordo E1×E2 e perfil operacional, nota a nota.</p><div class="dist-grid">'
     + _histBlock('F1 relaxada', C.hist.f1_relaxed, COR.EVIDENCIA)
     + _histBlock('κ (char)', C.hist.kappa, 'var(--brand)')
     + _histBlock('Latência do E2 (s)', C.hist.latencia_s, COR.FONTE)
     + _histBlock('Comprimento (tokens)', C.hist.tokens, '#8f7a5b')
     + '</div></div>';

  // assinatura léxica do corpus
  const lx = C.lexico;
  h += '<div class="card"><h3>Assinatura léxica do corpus</h3>'
     + '<p class="small muted">classes gramaticais e lemas mais frequentes nas ' + _br(G.n_notas)
     + ' notas (árvore de dependências UD; ~' + _f1(lx.tokens_media) + ' tokens/nota).</p>'
     + hbars(lx.upos.slice(0, 10).map(u => ({ label: u.pos, value: u.n, color: 'var(--rule-strong)' })), { fmt: _br })
     + '<div class="perfil-cols" style="margin-top:.8rem">';
  for(const [k, lbl] of [["VERB", "verbos"], ["NOUN", "substantivos"], ["ADJ", "adjetivos"]]){
    const arr = lx.lemas[k] || []; const mx = Math.max(1, ...arr.map(x => x[1]));
    h += '<div class="pcol"><h4>' + lbl + '</h4><div class="cloud">'
       + arr.map(x => '<span class="pos-' + k + '" style="font-size:' + (0.82 + 0.95 * x[1] / mx).toFixed(2) + 'rem" title="' + x[1] + ' ocorrências">' + esc(x[0]) + '</span>').join('')
       + '</div></div>';
  }
  h += '</div></div>';

  // qualidade de alinhamento do E2
  const al = C.alinhamento;
  h += '<div class="card"><h3>Qualidade de alinhamento (E2)</h3>'
     + '<p class="small muted">como os trechos do LLM foram casados ao texto da nota — quase tudo casa exato. '
     + _br(al.notas_zero) + ' notas não produziram trecho algum (meta, vazias ou recusadas); '
     + al.err + ' foram recusadas pelo filtro de conteúdo do provedor.</p>'
     + hbars(al.niveis.map(x => ({ label: x.nivel, value: x.n, color: x.nivel === 'failed' ? COR.CLAIM : 'var(--rule-strong)' })), { fmt: _br })
     + '</div>';

  $("#view").innerHTML = h;
  $("#side-extra").innerHTML = '';
}

VIEWS.conjunto = viewConjunto;
