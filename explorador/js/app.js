/* app.js — roteamento entre views, boot e o drawer de navegação no mobile.
 * Carregado por último: depende de core.js, modal.js e dos js/views/*.js. */

function render(){
  document.querySelectorAll("#nav a").forEach(a => a.classList.toggle("active", a.dataset.v === st.view));
  (VIEWS[st.view] || VIEWS.notas)();
}

/* ---- drawer (apenas mobile; no desktop o sidebar é fixo) ---- */
const isMobile = () => window.matchMedia("(max-width:760px)").matches;
function openDrawer(){
  document.body.classList.add("drawer-open");
  const b = $("#menu-btn"); if(b) b.setAttribute("aria-expanded", "true");
}
function closeDrawer(){
  document.body.classList.remove("drawer-open");
  const b = $("#menu-btn"); if(b) b.setAttribute("aria-expanded", "false");
}
function toggleDrawer(){ document.body.classList.contains("drawer-open") ? closeDrawer() : openDrawer(); }

function boot(){
  // navegação
  document.querySelectorAll("#nav a").forEach(a => a.onclick = e => {
    st.view = a.dataset.v; render();
    if(isMobile()) closeDrawer();
  });
  window.addEventListener("hashchange", () => {
    const v = location.hash.replace("#", "");
    if(VIEWS[v]){ st.view = v; render(); }
  });

  // modal
  $("#modal").addEventListener("click", e => { if(e.target.id === "modal") closeModal(); });
  window.addEventListener("keydown", e => {
    if(e.key === "Escape"){ closeModal(); if(document.body.classList.contains("drawer-open")) closeDrawer(); }
  });

  // drawer mobile
  const mb = $("#menu-btn"); if(mb) mb.onclick = toggleDrawer;
  const bd = $("#drawer-backdrop"); if(bd) bd.onclick = closeDrawer;
  // ao mexer num filtro do sidebar (consenso, entidade), fecha o drawer p/ ver o resultado
  $("#sidebar").addEventListener("change", e => {
    if(e.target.matches("select") && isMobile()) closeDrawer();
  });
  // sair do breakpoint mobile reseta o estado do drawer
  window.addEventListener("resize", () => { if(!isMobile()) closeDrawer(); });

  // view inicial a partir do hash
  const init = location.hash.replace("#", "");
  if(VIEWS[init]) st.view = init;
  render();
}

Object.assign(window.App, { render, openDrawer, closeDrawer, toggleDrawer });
boot();
