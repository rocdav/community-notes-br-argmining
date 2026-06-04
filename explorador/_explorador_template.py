# -*- coding: utf-8 -*-
"""Template HTML/CSS/JS do explorador (LICA-style). Importado por _build_explorador.py."""

HTML_HEAD = r"""<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Explorador — Argumentação em Community Notes BR</title>
<style>
:root{
  --paper:#f7f0e2; --card:#fff8eb; --side:#ebe0bc; --ink:#211a15; --ink-soft:#48372c;
  --muted:#716454; --rule:#b8a98a; --rule-strong:#8f7a5b; --brand:#8f3027; --brand-dark:#641f1a;
  --shell:#211a15; --shell-fg:#f7f0e2;
  --t-CLAIM:#c0392b; --t-EVIDENCIA:#2f6b45; --t-FONTE:#1f5d75; --t-QUALIFICADOR:#8a6105;
  --serif:"Iowan Old Style","Palatino Linotype",Palatino,Georgia,serif;
  --sans:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif;
  --mono:"SF Mono",Menlo,Consolas,monospace;
}
*{box-sizing:border-box}
html,body{margin:0;height:100%}
body{display:flex;background:var(--paper);color:var(--ink);font-family:var(--serif);
  font-size:17px;line-height:1.55;-webkit-font-smoothing:antialiased}
a{color:var(--brand);text-decoration:none} a:hover{text-decoration:underline}
.muted{color:var(--muted)} .small{font-size:.82rem}
mark{background:none;color:inherit}

/* sidebar */
#sidebar{width:264px;flex:0 0 264px;background:var(--side);border-right:1px solid var(--rule);
  height:100vh;overflow:auto;padding:18px 16px;font-family:var(--sans)}
#sidebar header h1{font-family:var(--serif);font-size:1.18rem;margin:.1rem 0 .1rem;color:var(--brand-dark);line-height:1.2}
#sidebar h2{font-size:.72rem;text-transform:uppercase;letter-spacing:.08em;color:var(--muted);
  margin:1.4rem 0 .5rem;border-bottom:1px solid var(--rule);padding-bottom:.3rem}
.nav-list{list-style:none;padding:0;margin:0}
.nav-list li{margin:.15rem 0}
.nav-list a{display:block;padding:.42rem .6rem;border-radius:4px;color:var(--ink-soft);font-size:.95rem}
.nav-list a:hover{background:#fff8eb88;text-decoration:none}
.nav-list a.active{background:var(--brand);color:#fff;box-shadow:0 1px 2px rgba(0,0,0,.18)}
.tag{display:inline-block;background:#fff8eb;border:1px solid var(--rule);border-radius:99px;
  padding:.05rem .5rem;font-size:.7rem;color:var(--muted)}
select,input[type=search]{width:100%;font-family:var(--sans);font-size:.9rem;padding:.4rem .5rem;
  border:1px solid var(--rule-strong);border-radius:4px;background:#fff8eb;color:var(--ink);margin-top:.2rem}

/* main */
#content{flex:1;height:100vh;overflow:auto;padding:34px 40px 80px}
#view{max-width:820px;margin:0 auto}
h2.view-title{font-size:1.7rem;color:var(--brand-dark);margin:.2rem 0 .2rem;font-weight:600}
.lede{color:var(--ink-soft);margin:.2rem 0 1.4rem;font-size:1.02rem}
.card{background:var(--card);border:1px solid var(--rule);border-radius:8px;
  box-shadow:0 1px 2px rgba(0,0,0,.06),0 6px 18px rgba(0,0,0,.07);padding:20px 22px;margin:16px 0}

/* legend / type chips */
.legend{display:flex;gap:14px;flex-wrap:wrap;font-family:var(--sans);font-size:.8rem;margin:.4rem 0 0}
.legend b{display:inline-flex;align-items:center;gap:6px;font-weight:600}
.dot{width:11px;height:11px;border-radius:3px;display:inline-block}
.d-CLAIM{background:var(--t-CLAIM)} .d-EVIDENCIA{background:var(--t-EVIDENCIA)}
.d-FONTE{background:var(--t-FONTE)} .d-QUALIFICADOR{background:var(--t-QUALIFICADOR)}

/* note explorer */
.controls{display:flex;gap:8px;align-items:center;flex-wrap:wrap;font-family:var(--sans);margin-bottom:12px}
.seg{display:inline-flex;border:1px solid var(--rule-strong);border-radius:6px;overflow:hidden}
.seg button{font-family:var(--sans);border:0;background:#fff8eb;padding:.4rem .8rem;cursor:pointer;
  font-size:.85rem;color:var(--ink-soft);border-right:1px solid var(--rule)}
.seg button:last-child{border-right:0}
.seg button.on{background:var(--brand);color:#fff}
.pager{margin-left:auto;display:flex;gap:6px;align-items:center}
.pager button{font-family:var(--sans);border:1px solid var(--rule-strong);background:#fff8eb;border-radius:6px;
  width:32px;height:32px;cursor:pointer;font-size:1rem;color:var(--ink-soft)}
.tweet{font-family:var(--sans);font-size:.9rem;color:var(--ink-soft);background:#efe6cf;
  border-left:3px solid var(--rule-strong);border-radius:0 6px 6px 0;padding:10px 14px;margin-bottom:14px}
.tweet .lbl{font-size:.68rem;text-transform:uppercase;letter-spacing:.08em;color:var(--muted);display:block;margin-bottom:.2rem}
.nota-text{white-space:pre-wrap;word-break:break-word;font-size:1.05rem;line-height:1.7}
.sp{border-radius:3px;padding:.02em .12em;border-bottom:2px solid}
.sp-CLAIM{background:#c0392b1f;border-color:var(--t-CLAIM)}
.sp-EVIDENCIA{background:#2f6b451f;border-color:var(--t-EVIDENCIA)}
.sp-FONTE{background:#1f5d751f;border-color:var(--t-FONTE)}
.sp-QUALIFICADOR{background:#8a61051f;border-color:var(--t-QUALIFICADOR)}
.meta-row{font-family:var(--sans);font-size:.78rem;color:var(--muted);margin-top:14px;display:flex;gap:14px;flex-wrap:wrap}
.badge{background:#efe6cf;border:1px solid var(--rule);border-radius:99px;padding:.08rem .55rem}

/* heatmap */
table.heat{border-collapse:collapse;width:100%;font-family:var(--sans);font-size:.86rem}
table.heat th,table.heat td{padding:.5rem .6rem;text-align:center;border:1px solid #00000010}
table.heat th{font-size:.72rem;text-transform:uppercase;letter-spacing:.05em;color:var(--muted);font-weight:600}
table.heat td.lbl{text-align:left;font-weight:600;color:var(--ink-soft);white-space:nowrap}
table.heat td.dom{font-size:.74rem;color:var(--muted);text-align:left}
.hcell{position:relative;color:var(--ink)}

/* painel */
.headline{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.stat{background:var(--card);border:1px solid var(--rule);border-radius:8px;padding:14px 16px}
.stat .k{font-family:var(--sans);font-size:.72rem;text-transform:uppercase;letter-spacing:.06em;color:var(--muted)}
.stat .v{font-size:1.5rem;color:var(--brand-dark);font-weight:600}
.stat .s{font-family:var(--sans);font-size:.8rem;color:var(--ink-soft)}
.bars{font-family:var(--sans);font-size:.82rem}
.bar-row{display:flex;align-items:center;gap:10px;margin:.3rem 0}
.bar-row .nm{width:120px;color:var(--ink-soft)}
.bar{height:14px;border-radius:3px}
.dchips{display:flex;flex-wrap:wrap;gap:6px;margin-top:.4rem}
.dchip{font-family:var(--sans);font-size:.8rem;border-radius:99px;padding:.12rem .6rem;border:1px solid}
table.simple{border-collapse:collapse;width:100%;font-family:var(--sans);font-size:.86rem;margin-top:.4rem}
table.simple th,table.simple td{padding:.45rem .6rem;border-bottom:1px solid var(--rule);text-align:right}
table.simple th:first-child,table.simple td:first-child{text-align:left}
.perfil-cols{display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px}
.pcol h4{margin:.1rem 0 .35rem;font-family:var(--sans);font-size:.72rem;text-transform:uppercase;letter-spacing:.05em;color:var(--muted)}
.dchip.pos-VERB{border-color:#8f302755;color:#8f3027} .dchip.pos-NOUN{border-color:#1f5d7555;color:#1f5d75} .dchip.pos-ADJ{border-color:#8a610555;color:#8a6105}
.ex{font-family:var(--sans);font-size:.86rem;color:var(--ink-soft);border-left:3px solid var(--rule);padding:.25rem .7rem;margin:.45rem 0;line-height:1.5}
.ex b{color:var(--brand-dark)}
.occ-click{cursor:pointer;border-radius:0 5px 5px 0} .occ-click:hover{background:#efe6cf;border-left-color:var(--brand)}
.cloud{display:flex;flex-wrap:wrap;gap:5px 11px;align-items:baseline}
.cloud span{line-height:1.15;font-weight:600}
.cloud .pos-VERB{color:#8f3027} .cloud .pos-NOUN{color:#1f5d75} .cloud .pos-ADJ{color:#8a6105}
.reasoning-block{margin:16px 0 0}
.reasoning-toggle{font-family:var(--sans);display:flex;align-items:center;gap:8px;width:100%;cursor:pointer;background:#efe6cf;border:1px solid var(--rule-strong);border-radius:6px;padding:.5rem .7rem;color:var(--ink-soft);font-size:.88rem}
.reasoning-toggle:hover{border-color:var(--t-FONTE)} .reasoning-toggle .hint{margin-left:auto;font-style:italic;color:var(--muted);font-size:.74rem}
.reasoning-body{border:1px solid var(--rule);border-top:0;border-radius:0 0 6px 6px;padding:12px 14px;background:var(--card)}
.reasoning-banner{font-family:var(--sans);font-size:.78rem;color:#8a3b16;background:#f3e2c8;border:1px solid #d8b98e;border-radius:5px;padding:.4rem .6rem;margin-bottom:.6rem}
.reasoning-md{font-family:var(--sans);font-size:.9rem;line-height:1.55;color:var(--ink-soft)}
.reasoning-md p{margin:0 0 .5rem} .reasoning-md ul,.reasoning-md ol{margin:.2rem 0 .6rem;padding-left:20px} .reasoning-md li{margin:.1rem 0}
.reasoning-md strong{color:var(--ink);font-weight:600} .reasoning-md h1,.reasoning-md h2,.reasoning-md h3,.reasoning-md h4{font-size:1rem;color:var(--brand-dark);margin:.6rem 0 .3rem}
.modal-bg{position:fixed;inset:0;background:rgba(33,26,21,.55);display:flex;align-items:center;justify-content:center;z-index:1000;padding:24px}
.modal-bg[hidden]{display:none}
.modal{background:var(--paper);border:1px solid var(--rule-strong);border-radius:10px;max-width:760px;width:100%;max-height:84vh;overflow:auto;box-shadow:0 14px 38px rgba(0,0,0,.3);padding:22px 26px}
.modal .x{float:right;border:0;background:none;font-size:1.4rem;cursor:pointer;color:var(--muted);line-height:1}
.modal h3{color:var(--brand-dark);margin:.1rem 0 .5rem}
@media(max-width:760px){ body{flex-direction:column} #sidebar{width:100%;height:auto;flex:none} #content{height:auto;padding:22px} .perfil-cols{grid-template-columns:1fr} .headline{grid-template-columns:1fr}}
</style>
</head>
<body>
"""

HTML_BODY = r"""
<aside id="sidebar">
  <header>
    <h1>Argumentação em<br>Community Notes BR</h1>
    <p class="muted small">E1 (regras) × E2 (LLM) × humano<br><span class="tag">explorador interativo</span></p>
  </header>
  <h2>Visões</h2>
  <ul class="nav-list" id="nav">
    <li><a href="#notas" data-v="notas">Explorador de notas</a></li>
    <li><a href="#perfil" data-v="perfil">Perfil de entidade</a></li>
    <li><a href="#lente" data-v="lente">Lente entidade × papel</a></li>
    <li><a href="#painel" data-v="painel">Painel de achados</a></li>
  </ul>
  <div id="side-extra"></div>
  <h2>Sobre</h2>
  <p class="muted small">60 notas com gold humano; spans das duas estratégias automáticas.
  Lente de entidade a partir do corpus <code>histlearn/notas-comunidade-ptbr</code>.</p>
</aside>
<main id="content"><article id="view"></article></main>
<div id="modal" class="modal-bg" hidden><div class="modal" id="modal-body"></div></div>
<script>
const T = ["CLAIM","EVIDENCIA","FONTE","QUALIFICADOR"];
const COR = {CLAIM:"#c0392b",EVIDENCIA:"#2f6b45",FONTE:"#1f5d75",QUALIFICADOR:"#8a6105"};
const st = {view:"notas", idx:0, src:"E2", filtro:"", ent:""};
const $ = s => document.querySelector(s);
const esc = s => (s||"").replace(/[&<>]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;"}[c]));

function notesFiltradas(){
  return DATA.notas.filter(n => !st.filtro || n.consenso===st.filtro);
}
function renderSpans(text, spans){
  const lab = new Array(text.length).fill(null);
  const sorted = spans.slice().sort((a,b)=>a.s-b.s || (b.e-b.s)-(a.e-a.s));
  for(const sp of sorted) for(let i=sp.s;i<Math.min(sp.e,text.length);i++) if(lab[i]===null) lab[i]=sp.t;
  let h="", i=0;
  while(i<text.length){
    const t=lab[i]; let j=i+1; while(j<text.length && lab[j]===t) j++;
    const seg=esc(text.slice(i,j));
    h += t ? '<mark class="sp sp-'+t+'" title="'+t+'">'+seg+'</mark>' : seg;
    i=j;
  }
  return h;
}
function legend(){
  return '<div class="legend">'+T.map(t=>'<b><span class="dot d-'+t+'"></span>'+t+'</b>').join('')+'</div>';
}

function viewNotas(){
  const ns = notesFiltradas();
  if(st.idx>=ns.length) st.idx=0;
  const n = ns[st.idx] || DATA.notas[0];
  const cons = [...new Set(DATA.notas.map(x=>x.consenso))].sort();
  let h = '<h2 class="view-title">Explorador de notas</h2>';
  h += '<p class="lede">Cada nota com seus spans argumentativos. Alterne entre as estratégias e o gold humano para ver onde concordam e divergem.</p>';
  h += '<div class="card">';
  h += '<div class="controls">';
  h += '<div class="seg" id="seg-src">'+["E2","E1","HUMANO"].map(s=>'<button data-s="'+s+'" class="'+(st.src===s?'on':'')+'">'+(s==="HUMANO"?"Humano":s)+'</button>').join('')+'</div>';
  h += '<div class="pager"><span class="small muted">nota '+(st.idx+1)+'/'+ns.length+'</span>'
     + '<button id="prev">‹</button><button id="next">›</button></div></div>';
  if(n.tweet) h += '<div class="tweet"><span class="lbl">tweet original</span>'+esc(n.tweet)+'</div>';
  const spans = n[st.src]||[];
  h += '<div class="nota-text">'+ (spans.length? renderSpans(n.text, spans) : esc(n.text)) +'</div>';
  h += '<div class="meta-row"><span class="badge">consenso: '+esc(n.consenso)+'</span>'
     + '<span class="badge">'+(spans.length)+' spans ('+st.src+')</span>'
     + (n.macro? '<span class="badge">'+esc(n.macro)+'</span>':'') + '</div>';
  h += legend();
  if(n.reason){
    h += '<div class="reasoning-block"><button type="button" class="reasoning-toggle" id="rbtn" aria-expanded="false">'
       + '<span class="caret">▸</span><span class="label">Ver raciocínio do E2 (PT)</span><span class="hint">não como gabarito</span></button>'
       + '<div class="reasoning-body" id="rbody" hidden><div class="reasoning-banner">⚠ Raciocínio do LLM (E2). Lê para desencravar dúvidas — não como gabarito.</div>'
       + '<div class="reasoning-md" id="rmd"></div></div></div>';
  }
  h += '</div>';
  $("#view").innerHTML = h;
  $("#seg-src").querySelectorAll("button").forEach(b=>b.onclick=()=>{st.src=b.dataset.s;viewNotas();});
  const rbtn=$("#rbtn"); if(rbtn) rbtn.onclick=()=>toggleReason(n.reason);
  $("#prev").onclick=()=>{st.idx=(st.idx-1+ns.length)%ns.length;viewNotas();};
  $("#next").onclick=()=>{st.idx=(st.idx+1)%ns.length;viewNotas();};
  $("#side-extra").innerHTML = '<h2>Filtrar</h2><select id="f-cons"><option value="">todos os consensos</option>'
    + cons.map(c=>'<option '+(st.filtro===c?'selected':'')+'>'+c+'</option>').join('')+'</select>';
  $("#f-cons").onchange=e=>{st.filtro=e.target.value;st.idx=0;viewNotas();};
}

function viewLente(){
  let h='<h2 class="view-title">Lente entidade × papel</h2>';
  h+='<p class="lede">Para cada tipo de entidade do corpus (extração GLiNER), em que papel argumentativo do E2 ela cai. Célula mais escura = mais frequente. O tipo da entidade prevê o papel.</p>';
  const maxv = Math.max(...DATA.lente.flatMap(r=>T.map(t=>r[t])));
  h+='<div class="card" style="overflow:auto"><table class="heat"><thead><tr><th class="lbl">tipo de entidade</th>'
    + T.map(t=>'<th style="color:'+COR[t]+'">'+t+'</th>').join('')+'<th>fora</th><th>total</th><th class="lbl">dominante</th></tr></thead><tbody>';
  for(const r of DATA.lente){
    h+='<tr><td class="lbl">'+r.tipo+'</td>';
    for(const t of T){
      const a = maxv? r[t]/maxv : 0;
      const dom = T.reduce((x,y)=>r[y]>r[x]?y:x, "CLAIM");
      const wt = (r[t]===r[dom] && r[t]>0)?'font-weight:700;':'';
      h+='<td class="hcell" style="background:'+COR[t]+(Math.round(20+a*210)).toString(16).padStart(2,'0')+';'+wt+'">'+r[t]+'</td>';
    }
    const dom = T.reduce((x,y)=>r[y]>r[x]?y:x, "CLAIM");
    h+='<td class="muted">'+r.O+'</td><td>'+r.total+'</td><td class="dom" style="color:'+COR[dom]+'">'+dom+'</td></tr>';
  }
  h+='</tbody></table></div>'+legend();
  $("#view").innerHTML=h; $("#side-extra").innerHTML="";
}

function bar(v,max,cor){ return '<div class="bar" style="width:'+Math.max(2,Math.round(160*v/max))+'px;background:'+cor+'"></div>'; }

function viewPainel(){
  const g = Object.fromEntries(DATA.vs_gold.map(r=>[r.estrategia,r]));
  let h='<h2 class="view-title">Painel de achados</h2>';
  h+='<p class="lede">Síntese do experimento: o LLM aproxima-se do humano, as regras compensam em cobertura de FONTE e custo, e cada tipo tem assinatura léxica própria.</p>';
  h+='<div class="headline">';
  h+='<div class="stat"><div class="k">E2 (LLM) vs gold humano</div><div class="v">F1 '+g.E2.F1_relaxada+'</div><div class="s">estrita '+g.E2.F1_estrita+' — alinha-se ao humano</div></div>';
  h+='<div class="stat"><div class="k">E1 (regras) vs gold humano</div><div class="v">F1 '+g.E1.F1_relaxada+'</div><div class="s">estrita '+g.E1.F1_estrita+' — fronteiras fracas</div></div>';
  h+='</div>';
  // cortes
  h+='<div class="card"><h3 style="margin:.1rem 0 .4rem">Acordo E1×E2 nos 3 cortes</h3><table class="simple"><thead><tr><th>corte</th><th>n</th><th>F1 estrita</th><th>F1 relaxada</th><th>κ char</th></tr></thead><tbody>';
  for(const c of DATA.cortes) h+='<tr><td>'+c.corte+'</td><td>'+c.n+'</td><td>'+c.F1_estrita+'</td><td>'+c.F1_relaxada+'</td><td>'+c.kappa_char+'</td></tr>';
  h+='</tbody></table><p class="small muted" style="margin:.5rem 0 0">O acordo cai de A para C: divergem mais onde há material argumentativo real.</p></div>';
  // cobertura
  h+='<div class="card"><h3 style="margin:.1rem 0 .4rem">Cobertura por tipo</h3><div class="bars">';
  for(const c of DATA.cobertura){
    h+='<div class="bar-row"><span class="nm">'+c.tipo+'</span>'+bar(c.E1,100,"#b94f42")+'<span class="small muted">E1 '+c.E1+'%</span></div>';
    h+='<div class="bar-row"><span class="nm"></span>'+bar(c.E2,100,COR[c.tipo])+'<span class="small muted">E2 '+c.E2+'%</span></div>';
  }
  h+='</div></div>';
  // dunning
  h+='<div class="card"><h3 style="margin:.1rem 0 .6rem">Assinatura léxica por tipo (Dunning G²)</h3>';
  for(const t of T){
    h+='<div style="margin:.5rem 0"><b style="color:'+COR[t]+'">'+t+'</b><div class="dchips">'
      + (DATA.dunning[t]||[]).map(w=>'<span class="dchip" style="border-color:'+COR[t]+'55;color:'+COR[t]+'">'+esc(w)+'</span>').join('')+'</div></div>';
  }
  h+='</div>';
  $("#view").innerHTML=h; $("#side-extra").innerHTML="";
}

function viewPerfil(){
  const keys = DATA.perfil_ordem||[];
  if(!keys.length){ $("#view").innerHTML='<h2 class="view-title">Perfil de entidade</h2><p class="muted">Sem perfis disponíveis.</p>'; $("#side-extra").innerHTML=""; return; }
  if(!st.ent || !DATA.perfis[st.ent]) st.ent = keys[0];
  const p = DATA.perfis[st.ent];
  let h='<h2 class="view-title">Perfil — '+esc(st.ent)+'</h2>';
  h+='<p class="lede">'+esc(p.tipo)+' · aparece em '+p.n_notas+' notas. O papel argumentativo que o E2 atribui à entidade, e as palavras que distinguem as notas onde ela aparece (Dunning LL ≥ 3,84), por classe gramatical — no espírito do perfil de personagem do LICA.</p>';
  const maxp = Math.max(1, ...T.map(t=>p.papel[t]));
  h+='<div class="card"><h3 style="margin:.1rem 0 .5rem">Papel argumentativo</h3><div class="bars">';
  for(const t of T) h+='<div class="bar-row"><span class="nm" style="color:'+COR[t]+'">'+t+'</span>'+bar(p.papel[t],maxp,COR[t])+'<span class="small muted">'+p.papel[t]+'</span></div>';
  h+='</div><p class="small muted" style="margin:.4rem 0 0">'+p.O+' ocorrências fora de qualquer span argumentativo.</p></div>';
  const cols=[["VERB","verbos"],["NOUN","substantivos"],["ADJ","adjetivos"]];
  h+='<div class="card"><h3 style="margin:.1rem 0 .2rem">Palavras distintivas por classe gramatical</h3>'
    +'<p class="small muted" style="margin:.1rem 0 .7rem">nuvem por classe; tamanho ∝ Dunning LL (sobre-representação)</p><div class="perfil-cols">';
  for(const [k,lbl] of cols){
    const arr=p[k]||[]; const mx=Math.max(1,...arr.map(x=>x[1]));
    h+='<div class="pcol"><h4>'+lbl+'</h4><div class="cloud">'
      + (arr.length? arr.map(x=>'<span class="pos-'+k+'" style="font-size:'+(0.82+0.95*x[1]/mx).toFixed(2)+'rem" title="Dunning LL '+x[1]+'">'+esc(x[0])+'</span>').join('') : '<span class="small muted">—</span>')
      + '</div></div>';
  }
  h+='</div></div>';
  if(p.ex&&p.ex.length){
    h+='<div class="card"><h3 style="margin:.1rem 0 .2rem">Ocorrências</h3><p class="small muted" style="margin:.1rem 0 .5rem">clique para abrir a nota completa</p>';
    for(const e of p.ex){ h+='<p class="ex occ-click" data-nid="'+esc(e.id)+'">…'+esc(e.ctx).replace(esc(e.ent),'<b>'+esc(e.ent)+'</b>')+'…</p>'; }
    h+='</div>';
  }
  $("#view").innerHTML=h;
  $("#view").querySelectorAll(".occ-click").forEach(el=>el.onclick=()=>openNote(el.dataset.nid));
  $("#side-extra").innerHTML='<h2>Entidade</h2><select id="sel-ent">'+keys.map(k=>'<option '+(k===st.ent?'selected':'')+'>'+esc(k)+'</option>').join('')+'</select>'
    +'<p class="muted small" style="margin-top:.4rem">'+keys.length+' entidades mais citadas</p>';
  $("#sel-ent").onchange=e=>{st.ent=e.target.value;viewPerfil();};
}

function loadMarked(){ return new Promise(res=>{ if(window.marked) return res(); const s=document.createElement("script"); s.src="https://cdn.jsdelivr.net/npm/marked@12/marked.min.js"; s.onload=()=>res(); s.onerror=()=>res(); document.head.appendChild(s); }); }
function toggleReason(md){
  const b=$("#rbody"), btn=$("#rbtn"); if(!b||!btn) return;
  if(b.hasAttribute("hidden")){
    b.removeAttribute("hidden"); btn.setAttribute("aria-expanded","true");
    btn.querySelector(".caret").textContent="▾"; btn.querySelector(".label").textContent="Esconder raciocínio do E2 (PT)";
    const t=$("#rmd");
    if(t && !t.dataset.loaded){ t.textContent="carregando…"; loadMarked().then(()=>{ try{ marked.use({gfm:true,breaks:true}); t.innerHTML=marked.parse(md);}catch(e){ t.textContent=md; } t.dataset.loaded="1"; }); }
  } else { b.setAttribute("hidden",""); btn.setAttribute("aria-expanded","false"); btn.querySelector(".caret").textContent="▸"; btn.querySelector(".label").textContent="Ver raciocínio do E2 (PT)"; }
}
function openNote(nid){
  const nf=DATA.notes_full&&DATA.notes_full[nid]; if(!nf) return;
  const body=(nf.E2&&nf.E2.length)? renderSpans(nf.text, nf.E2) : esc(nf.text);
  $("#modal-body").innerHTML='<button class="x" onclick="closeModal()" aria-label="fechar">✕</button>'
    +'<h3>Nota completa</h3><p class="small muted" style="margin:.1rem 0 .7rem">noteId '+esc(nid)+' · spans do E2 destacados</p>'
    +'<div class="nota-text">'+body+'</div>'+legend();
  $("#modal").removeAttribute("hidden");
}
function closeModal(){ const m=$("#modal"); if(m) m.setAttribute("hidden",""); }

const VIEWS={notas:viewNotas, perfil:viewPerfil, lente:viewLente, painel:viewPainel};
function render(){
  document.querySelectorAll("#nav a").forEach(a=>a.classList.toggle("active",a.dataset.v===st.view));
  (VIEWS[st.view]||viewNotas)();
}
document.querySelectorAll("#nav a").forEach(a=>a.onclick=e=>{st.view=a.dataset.v;render();});
window.addEventListener("hashchange",()=>{const v=location.hash.replace("#","");if(VIEWS[v]){st.view=v;render();}});
$("#modal").addEventListener("click",e=>{ if(e.target.id==="modal") closeModal(); });
window.addEventListener("keydown",e=>{ if(e.key==="Escape") closeModal(); });
const init=location.hash.replace("#",""); if(VIEWS[init]) st.view=init;
render();
</script>
</body>
</html>
"""
