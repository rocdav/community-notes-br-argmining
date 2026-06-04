/* modal.js — modal "nota completa" e painel recolhível de raciocínio do E2. */

/* carrega marked.js sob demanda (só quando o raciocínio é aberto); resolve
 * mesmo offline para que o restante do app continue funcionando. */
function loadMarked(){
  return new Promise(res => {
    if(window.marked) return res();
    const s = document.createElement("script");
    s.src = "https://cdn.jsdelivr.net/npm/marked@12/marked.min.js";
    s.onload = () => res(); s.onerror = () => res();
    document.head.appendChild(s);
  });
}

function toggleReason(md){
  const b = $("#rbody"), btn = $("#rbtn"); if(!b || !btn) return;
  if(b.hasAttribute("hidden")){
    b.removeAttribute("hidden"); btn.setAttribute("aria-expanded", "true");
    btn.querySelector(".caret").textContent = "▾"; btn.querySelector(".label").textContent = "Esconder raciocínio do E2 (PT)";
    const t = $("#rmd");
    if(t && !t.dataset.loaded){
      t.textContent = "carregando…";
      loadMarked().then(() => {
        try { marked.use({ gfm: true, breaks: true }); t.innerHTML = marked.parse(md); }
        catch(e) { t.textContent = md; }
        t.dataset.loaded = "1";
      });
    }
  } else {
    b.setAttribute("hidden", ""); btn.setAttribute("aria-expanded", "false");
    btn.querySelector(".caret").textContent = "▸"; btn.querySelector(".label").textContent = "Ver raciocínio do E2 (PT)";
  }
}

function openNote(nid){
  // store do Navegador (NOTAS: {t,e2}) ou o legado DATA.notes_full ({text,E2})
  let text, spans, extra = "";
  const nn = (typeof NOTAS !== 'undefined') ? NOTAS[nid] : null;
  if(nn){
    text = nn.t; spans = (nn.e2 || []).map(a => ({ s: a[0], e: a[1], t: a[2] }));
    extra = (nn.c ? '<span class="badge">consenso: ' + esc(nn.c) + '</span>' : '') + (nn.m ? ' <span class="badge">' + esc(nn.m) + '</span>' : '');
  } else {
    const nf = DATA.notes_full && DATA.notes_full[nid]; if(!nf) return;
    text = nf.text; spans = nf.E2 || [];
  }
  const body = (spans && spans.length) ? renderSpans(text, spans) : esc(text);
  $("#modal-body").innerHTML = '<button class="x" onclick="closeModal()" aria-label="fechar">✕</button>'
    + '<h3>Nota completa</h3><p class="small muted" style="margin:.1rem 0 .7rem">noteId ' + esc(nid) + ' · spans do E2 destacados</p>'
    + (extra ? '<div class="meta-row" style="margin:0 0 .6rem">' + extra + '</div>' : '')
    + '<div class="nota-text">' + body + '</div>' + legend();
  $("#modal").removeAttribute("hidden");
}

function closeModal(){ const m = $("#modal"); if(m) m.setAttribute("hidden", ""); }

Object.assign(window.App, { loadMarked, toggleReason, openNote, closeModal });
