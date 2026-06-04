/* ==========================================================================
   ANOTAÇÃO ARGUMENTATION MINING — APP
   ========================================================================== */

/* Fechamento de modais via event delegation no document — instalado ANTES
   de qualquer outra coisa, para que o × funcione mesmo se bootstrap() falhar
   e independente de quando o modal foi aberto (identificação OU dentro do app). */
document.addEventListener('click', (e) => {
  const closer = e.target.closest('[data-close]');
  if (closer) {
    const tgt = document.getElementById(closer.dataset.close);
    if (tgt) tgt.setAttribute('hidden', '');
    return;
  }
  // Clique no fundo escuro do overlay (guia ou exemplos) também fecha
  if (e.target.id === 'modal-guia' || e.target.id === 'modal-exemplos') {
    e.target.setAttribute('hidden', '');
  }
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    for (const id of ['modal-guia', 'modal-exemplos']) {
      const m = document.getElementById(id);
      if (m && !m.hasAttribute('hidden')) m.setAttribute('hidden', '');
    }
  }
});

/* NOTAS_DATA vem de data.js (window.NOTAS_DATA). */
const NOTAS_DATA = window.NOTAS_DATA || [];
const DATASET_VERSION = "v1.0";
const GUIA_VERSION    = "1.0";
const SCHEMA_VERSION  = "1.0";
const DEFAULT_PAPEL   = "manual";

const TIPOS = ['CLAIM', 'EVIDENCIA', 'FONTE', 'QUALIFICADOR'];
const ATALHO_TIPO = {'1':'CLAIM','2':'EVIDENCIA','3':'FONTE','4':'QUALIFICADOR'};
const AUTO_EXPORT_EVERY = 5;
const DEBOUNCE_SAVE_MS = 800;
const BIO_CONVERTER_URL = 'https://histlearn-pln-bio-converter.hf.space';
const BIO_TOKENIZER = 'spacy_pt';

/* ---------- estado global ---------- */
const state = {
  perfil: null,                // {nome, papel, id}
  notaIdx: 0,
  anotacoes: {},               // noteId -> {status, spans, obs, started_at, completed_at}
  sugestoesAtivas: false,
  undoStack: [],
  saveTimer: null,
  lastAutoExportAt: 0,
};

/* ---------- utilitários ---------- */
function slugify(s) {
  return (s || '').normalize('NFD').replace(/[̀-ͯ]/g, '')
    .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-+|-+$)/g, '');
}
function perfilId(nome, papel) { return `${slugify(nome)}__${papel}`; }
function nowISO() { return new Date().toISOString(); }
function toast(msg, kind) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.className = 'toast show' + (kind ? ' ' + kind : '');
  clearTimeout(toast._t);
  toast._t = setTimeout(() => { el.className = 'toast'; }, 2400);
}
function escapeHTML(s) {
  return (s || '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

/* ==========================================================================
   IndexedDB layer
   ========================================================================== */
const DB_NAME = 'pln_anotacao';
const DB_VERSION = 1;

function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains('perfis')) {
        db.createObjectStore('perfis', { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains('anotacoes')) {
        db.createObjectStore('anotacoes', { keyPath: 'perfilId' });
      }
    };
    req.onerror = () => reject(req.error);
    req.onsuccess = () => resolve(req.result);
  });
}
async function savePerfil(perfil) {
  const db = await openDB();
  return new Promise((res, rej) => {
    const tx = db.transaction('perfis', 'readwrite');
    tx.objectStore('perfis').put({ ...perfil, last_seen_at: nowISO() });
    tx.oncomplete = res; tx.onerror = () => rej(tx.error);
  });
}
async function listPerfis() {
  const db = await openDB();
  return new Promise((res, rej) => {
    const tx = db.transaction('perfis', 'readonly');
    const req = tx.objectStore('perfis').getAll();
    req.onsuccess = () => res(req.result);
    req.onerror = () => rej(req.error);
  });
}
async function loadAnotacoes(perfilId) {
  const db = await openDB();
  return new Promise((res, rej) => {
    const tx = db.transaction('anotacoes', 'readonly');
    const req = tx.objectStore('anotacoes').get(perfilId);
    req.onsuccess = () => res(req.result ? req.result.anotacoes : {});
    req.onerror = () => rej(req.error);
  });
}
async function saveAnotacoes(perfilId, anotacoes) {
  const db = await openDB();
  return new Promise((res, rej) => {
    const tx = db.transaction('anotacoes', 'readwrite');
    tx.objectStore('anotacoes').put({ perfilId, anotacoes, saved_at: nowISO() });
    tx.oncomplete = res; tx.onerror = () => rej(tx.error);
  });
}

/* ==========================================================================
   Identificação inicial
   ========================================================================== */
function setupModalIdentificacao() {
  const form = document.getElementById('form-identificacao');
  const nome = document.getElementById('input-nome');
  const btn = document.getElementById('btn-comecar');
  const btnGuia = document.getElementById('btn-abrir-guia-inicial');
  const btnExemplos = document.getElementById('btn-scroll-exemplos');

  function validar() {
    btn.disabled = nome.value.trim().length < 3;
  }
  nome.addEventListener('input', validar);

  btnGuia.addEventListener('click', abrirGuia);
  btnExemplos.addEventListener('click', () => {
    document.getElementById('exemplos-iniciais')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const papel = DEFAULT_PAPEL;
    const nomeLimpo = nome.value.trim();
    const perfil = {
      nome: nomeLimpo,
      papel,
      id: perfilId(nomeLimpo, papel),
      identified_at: nowISO(),
      guide_acknowledged: true,
      guide_version: GUIA_VERSION,
    };
    await savePerfil(perfil);
    state.perfil = perfil;
    localStorage.setItem('pln_anotador', JSON.stringify(perfil));
    await iniciarApp();
  });

  document.getElementById('btn-import-inicial').addEventListener('click', () => {
    document.getElementById('file-import').click();
  });

  validar();
  nome.focus();
}

/* ==========================================================================
   Inicializar app principal
   ========================================================================== */
async function iniciarApp() {
  document.getElementById('modal-identificacao').setAttribute('hidden', '');
  document.getElementById('app').removeAttribute('hidden');

  document.getElementById('header-nome').textContent = state.perfil.nome;
  document.getElementById('header-papel').textContent = state.perfil.papel;

  // Carrega anotações existentes para este perfil
  state.anotacoes = await loadAnotacoes(state.perfil.id) || {};
  // Garante entrada para cada nota
  NOTAS_DATA.forEach(n => {
    if (!state.anotacoes[n.noteId]) {
      state.anotacoes[n.noteId] = { status: 'pending', spans: [], obs: '' };
    }
    state.anotacoes[n.noteId] = normalizarAnotacaoPersistida(n.noteId, state.anotacoes[n.noteId]);
  });
  await saveAnotacoes(state.perfil.id, state.anotacoes);

  renderLista();
  irPara(0);
  setupListeners();
  setupKeyboard();
  setupDragDrop();
  updateAutoSave('saved', 'Pronto');
}

/* ==========================================================================
   Render: header progresso + lista lateral + nota central
   ========================================================================== */
function contarPorStratum() {
  const cont = { CRH: {t:0,c:0}, CRNH: {t:0,c:0}, NMR: {t:0,c:0}, Outro: {t:0,c:0} };
  NOTAS_DATA.forEach(n => {
    const k = cont[n.consenso] ? n.consenso : 'Outro';
    cont[k].t++;
    if (state.anotacoes[n.noteId].status === 'completed') cont[k].c++;
  });
  return cont;
}
function renderProgresso() {
  const cont = contarPorStratum();
  const el = document.getElementById('progresso-strip');
  el.innerHTML = '';
  ['CRH','CRNH','NMR','Outro'].forEach(k => {
    if (cont[k].t === 0) return;
    const pct = (cont[k].c / cont[k].t) * 100;
    const div = document.createElement('div');
    div.className = 'stratum';
    div.innerHTML = `<span><strong>${k}</strong> ${cont[k].c}/${cont[k].t}</span>
      <div class="barra"><div class="barra-fill" style="width:${pct}%"></div></div>`;
    el.appendChild(div);
  });
}
function renderLista() {
  const el = document.getElementById('lista-notas');
  el.innerHTML = '';
  NOTAS_DATA.forEach((n, i) => {
    const a = state.anotacoes[n.noteId];
    const icon = a.status === 'completed' ? '✓' : (a.status === 'in_progress' ? '◐' : '○');
    const div = document.createElement('div');
    div.className = `nota-item ${a.status}${i === state.notaIdx ? ' atual' : ''}`;
    div.innerHTML = `
      <span class="status-icon">${icon}</span>
      <span>Nota ${i + 1}</span>
      <span class="consenso-pill ${n.consenso}">${n.consenso}</span>
    `;
    div.addEventListener('click', () => irPara(i));
    el.appendChild(div);
  });
  renderProgresso();
}

function renderNota() {
  const n = NOTAS_DATA[state.notaIdx];
  if (!n) {
    document.getElementById('painel-central').innerHTML = '<div class="placeholder-warning">Sem dados de notas carregados.<br>Rode <code>python _build_anotacao.py</code> para popular as 60.</div>';
    return;
  }
  const a = state.anotacoes[n.noteId];

  const tweetMeta = `${n.tweet_author_id ? '@' + n.tweet_author_id : ''}${n.tweet_created_at ? ' · ' + (n.tweet_created_at || '').slice(0,10) : ''}`;
  const el = document.getElementById('painel-central');
  el.innerHTML = `
    <div class="nota-meta">
      <span class="pill">Nota ${state.notaIdx + 1} de ${NOTAS_DATA.length}</span>
      <span class="pill consenso-pill ${n.consenso}">${n.consenso}</span>
      ${n.macrotheme_label ? `<span class="pill">${escapeHTML(n.macrotheme_label)}</span>` : ''}
      <span class="pill" style="color:var(--c-muted);">noteId: ${n.noteId}</span>
    </div>

    <div class="tweet-box">
      <div class="tweet-meta">TWEET ORIGINAL ${tweetMeta ? '— ' + escapeHTML(tweetMeta) : ''}</div>
      <div class="tweet-text">${escapeHTML(n.tweet_text || '(tweet ausente)')}</div>
    </div>

    <div class="nota-label">
      <span>NOTA (selecione para anotar)</span>
      <span style="color:var(--c-muted);">${a.spans.length} span(s) marcado(s)</span>
    </div>
    <div class="nota-text" id="nota-text"></div>

    ${n.reasoning_pt ? `
    <div class="reasoning-block" data-noteid="${n.noteId}">
      <button type="button" class="reasoning-toggle" id="btn-reasoning-toggle" aria-expanded="false">
        <span class="caret">▸</span>
        <span class="label">Ver raciocínio do E2 (PT)</span>
        <span class="hint">só revele se travar — pode enviesar sua anotação</span>
      </button>
      <div class="reasoning-body" id="reasoning-body" hidden data-loaded="0">
        <div class="reasoning-banner">⚠ Este é o raciocínio do LLM (E2). Lê pra desencravar dúvidas — não como gabarito.</div>
        <div class="reasoning-text reasoning-md"></div>
      </div>
    </div>` : ''}

    <div class="spans-listados">
      <h4>Spans desta nota</h4>
      <div id="spans-list">${a.spans.length === 0 ? '<div style="color:var(--c-muted);font-size:13px;font-style:italic;">Nenhum span ainda.</div>' : ''}</div>
    </div>

    <div class="obs-box">
      <label for="obs-textarea">Observações (opcional)</label>
      <textarea id="obs-textarea" placeholder="Casos ambíguos, decisões difíceis...">${escapeHTML(a.obs || '')}</textarea>
    </div>

    <div class="nav-buttons">
      <button id="btn-anterior" ${state.notaIdx === 0 ? 'disabled' : ''}>← Anterior</button>
      <button id="btn-completar" class="primary ${a.status === 'completed' ? 'completed' : ''}">${a.status === 'completed' ? '✓ Completa' : 'Marcar como completa'}</button>
      <button id="btn-proxima" ${state.notaIdx === NOTAS_DATA.length - 1 ? 'disabled' : ''}>Próxima →</button>
    </div>
  `;

  renderNotaTexto();
  renderSpanList();

  document.getElementById('btn-anterior').addEventListener('click', () => irPara(state.notaIdx - 1));
  document.getElementById('btn-proxima').addEventListener('click', () => irPara(state.notaIdx + 1));
  document.getElementById('btn-completar').addEventListener('click', toggleCompleta);
  document.getElementById('obs-textarea').addEventListener('input', (e) => {
    a.obs = e.target.value;
    markInProgress();
    scheduleSave();
  });
  const btnReasoning = document.getElementById('btn-reasoning-toggle');
  if (btnReasoning) btnReasoning.addEventListener('click', toggleReasoning);
}

function toggleReasoning() {
  const btn = document.getElementById('btn-reasoning-toggle');
  const body = document.getElementById('reasoning-body');
  if (!btn || !body) return;
  const open = body.hasAttribute('hidden');
  if (open) {
    body.removeAttribute('hidden');
    btn.setAttribute('aria-expanded', 'true');
    btn.querySelector('.caret').textContent = '▾';
    btn.querySelector('.label').textContent = 'Esconder raciocínio do E2 (PT)';
    if (body.dataset.loaded !== '1') {
      renderReasoningMarkdown(body);
      body.dataset.loaded = '1';
    }
  } else {
    body.setAttribute('hidden', '');
    btn.setAttribute('aria-expanded', 'false');
    btn.querySelector('.caret').textContent = '▸';
    btn.querySelector('.label').textContent = 'Ver raciocínio do E2 (PT)';
  }
}

async function renderReasoningMarkdown(body) {
  const n = NOTAS_DATA[state.notaIdx];
  const target = body.querySelector('.reasoning-text');
  const md = n.reasoning_pt || '';
  if (!window.marked) {
    target.textContent = 'Carregando renderizador…';
    try {
      await new Promise((resolve, reject) => {
        const s = document.createElement('script');
        s.src = 'https://cdn.jsdelivr.net/npm/marked@12/marked.min.js';
        s.onload = resolve; s.onerror = reject;
        document.head.appendChild(s);
      });
    } catch {
      target.textContent = md;  // offline → texto plano com quebras
      return;
    }
  }
  marked.use({ gfm: true, breaks: true });
  target.innerHTML = marked.parse(md);
}

function renderNotaTexto() {
  const n = NOTAS_DATA[state.notaIdx];
  const a = state.anotacoes[n.noteId];
  const text = n.note_text;
  const el = document.getElementById('nota-text');

  // Constrói segmentação por offsets. Humanos vencem sugestões em sobreposição.
  const events = [];
  a.spans.forEach((s, i) => events.push({pos: s.start, kind: 'h_start', type: s.type, idx: i, end: s.end}));
  a.spans.forEach((s, i) => events.push({pos: s.end,   kind: 'h_end',   type: s.type, idx: i}));
  if (state.sugestoesAtivas) {
    (n.e1_spans || []).forEach((s, i) => events.push({pos: s.start, kind: 's_start', type: s.type, source: 'E1', idx: i, end: s.end}));
    (n.e1_spans || []).forEach((s, i) => events.push({pos: s.end,   kind: 's_end',   type: s.type, source: 'E1', idx: i}));
    (n.e2_spans || []).forEach((s, i) => events.push({pos: s.start, kind: 's_start', type: s.type, source: 'E2', idx: i, end: s.end}));
    (n.e2_spans || []).forEach((s, i) => events.push({pos: s.end,   kind: 's_end',   type: s.type, source: 'E2', idx: i}));
  }

  // Renderiza por escaneamento posicional simples — gera pedaços com classes acumuladas
  const breaks = new Set([0, text.length]);
  events.forEach(e => breaks.add(e.pos));
  const positions = [...breaks].sort((a, b) => a - b);

  let html = '';
  for (let i = 0; i < positions.length - 1; i++) {
    const start = positions[i], end = positions[i + 1];
    const chunk = text.slice(start, end);
    const human = a.spans.find(s => start >= s.start && end <= s.end);
    const sugs = [];
    if (state.sugestoesAtivas) {
      (n.e1_spans || []).forEach(s => { if (start >= s.start && end <= s.end) sugs.push({type: s.type, source: 'E1'}); });
      (n.e2_spans || []).forEach(s => { if (start >= s.start && end <= s.end) sugs.push({type: s.type, source: 'E2'}); });
    }
    let wrapped = escapeHTML(chunk);
    if (human) {
      wrapped = `<span class="humano ${human.type}" data-span-idx="${a.spans.indexOf(human)}" data-offset-start="${human.start}">${wrapped}</span>`;
    } else if (sugs.length > 0) {
      const tip = sugs.map(s => `${s.source}:${s.type}`).join(', ');
      wrapped = `<span class="sugestao ${sugs[0].type}" title="${tip}">${wrapped}</span>`;
    }
    html += wrapped;
  }
  el.innerHTML = html;

  // Listener: mouseup → popup pra criar span
  el.addEventListener('mouseup', (e) => {
    // Se clicou em um span humano existente, mostra menu de remoção/troca
    const targetSpan = e.target.closest('.humano');
    if (targetSpan) {
      const idx = parseInt(targetSpan.dataset.spanIdx);
      // Adiado: o menu deve nascer DEPOIS do evento 'click', senão o
      // listener global de click (fecharPopup) o destrói no mesmo instante.
      setTimeout(() => mostrarMenuSpanExistente(targetSpan, idx), 1);
      return;
    }
    setTimeout(checarSelecao, 1);  // delay pra getSelection
  });
}

function renderSpanList() {
  const n = NOTAS_DATA[state.notaIdx];
  const a = state.anotacoes[n.noteId];
  const el = document.getElementById('spans-list');
  if (!el) return;
  if (a.spans.length === 0) {
    el.innerHTML = '<div style="color:var(--c-muted);font-size:13px;font-style:italic;">Nenhum span ainda.</div>';
    return;
  }
  el.innerHTML = a.spans.map((s, i) => `
    <div class="span-card">
      <span class="span-type-chip ${s.type}">${s.type === 'EVIDENCIA' ? 'EVID' : s.type === 'QUALIFICADOR' ? 'QUAL' : s.type}</span>
      <span class="span-text-snippet">${escapeHTML(s.text)}</span>
      <button class="remover-span" data-idx="${i}" title="Remover">×</button>
    </div>
  `).join('');
  el.querySelectorAll('.remover-span').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = parseInt(e.target.dataset.idx);
      removerSpan(idx);
    });
  });
}

/* ==========================================================================
   Seleção e criação de span
   ========================================================================== */
let popupAberto = null;

function checarSelecao() {
  const sel = window.getSelection();
  if (!sel || sel.toString().trim() === '') { fecharPopup(); return; }
  const range = sel.getRangeAt(0);
  const notaEl = document.getElementById('nota-text');
  if (!notaEl.contains(range.commonAncestorContainer)) { fecharPopup(); return; }
  // Computa offsets relativos ao texto cru
  const offsets = computarOffsets(range);
  if (!offsets) { fecharPopup(); return; }
  mostrarPopupCriacao(range, offsets);
}

function computarOffsets(range) {
  const notaEl = document.getElementById('nota-text');
  const n = NOTAS_DATA[state.notaIdx];
  const fullText = n.note_text;

  // Estratégia: pega o texto da seleção e busca no texto cru.
  const selText = range.toString();
  if (!selText) return null;
  // Encontra a posição mais próxima do que o usuário marcou (usando texto antes do range)
  const before = rangeTextoAntes(range, notaEl);
  const idx = fullText.indexOf(selText, Math.max(0, before.length - 20));
  if (idx === -1) return null;
  return { start: idx, end: idx + selText.length, text: selText };
}

function rangeTextoAntes(range, notaEl) {
  // Cria um range que vai do começo do nota-text até o início do range atual
  const r = document.createRange();
  r.selectNodeContents(notaEl);
  r.setEnd(range.startContainer, range.startOffset);
  return r.toString();
}

function mostrarPopupCriacao(range, offsets) {
  fecharPopup();
  const rect = range.getBoundingClientRect();
  const pop = document.createElement('div');
  pop.className = 'span-popup';
  pop.style.left = rect.left + 'px';
  pop.style.top = (rect.bottom + window.scrollY + 4) + 'px';
  pop.innerHTML = TIPOS.map((t, i) => `
    <button class="${t}" data-tipo="${t}">${t === 'EVIDENCIA' ? 'EVID' : t === 'QUALIFICADOR' ? 'QUAL' : t}<span class="atalho">${i+1}</span></button>
  `).join('');
  document.body.appendChild(pop);
  pop.querySelectorAll('button').forEach(b => {
    b.addEventListener('mousedown', (e) => {
      e.preventDefault();
      criarSpan(b.dataset.tipo, offsets);
    });
  });
  popupAberto = pop;
  popupAberto._offsets = offsets;
}
function fecharPopup() {
  if (popupAberto) { popupAberto.remove(); popupAberto = null; }
}
document.addEventListener('click', (e) => {
  if (popupAberto && !popupAberto.contains(e.target)) fecharPopup();
});

function criarSpan(tipo, offsets) {
  const n = NOTAS_DATA[state.notaIdx];
  const a = state.anotacoes[n.noteId];
  const clean = normalizarOffsetsSelecionados(offsets, n.note_text);
  if (!clean) { fecharPopup(); return; }
  const sp = {
    type: tipo,
    text: clean.text,
    start: clean.start,
    end: clean.end,
    created_at: nowISO(),
  };
  a.spans.push(sp);
  pushUndo({ tipo: 'create', noteId: n.noteId, idx: a.spans.length - 1 });
  markInProgress();
  fecharPopup();
  window.getSelection().removeAllRanges();
  renderNotaTexto();
  renderSpanList();
  renderLista();
  scheduleSave();
  toast(`+ ${tipo}`, 'success');
}

function normalizarOffsetsSelecionados(offsets, fullText) {
  let start = offsets.start;
  let end = offsets.end;
  while (start < end && /\s/u.test(fullText[start])) start += 1;
  while (end > start && /\s/u.test(fullText[end - 1])) end -= 1;
  if (start >= end) return null;
  return {
    start,
    end,
    text: fullText.slice(start, end),
  };
}

function normalizarSpanPersistido(span, fullText) {
  if (!span || span.start == null || span.end == null) return span;
  const start = Number(span.start);
  const end = Number(span.end);
  if (!Number.isFinite(start) || !Number.isFinite(end)) return span;
  const clean = normalizarOffsetsSelecionados({ start, end }, fullText);
  if (!clean) return span;
  return {
    ...span,
    start: clean.start,
    end: clean.end,
    text: clean.text,
  };
}

function normalizarAnotacaoPersistida(noteId, ann) {
  if (!ann || !Array.isArray(ann.spans)) return ann;
  const nota = NOTAS_DATA.find(n => n.noteId === noteId);
  if (!nota) return ann;
  return {
    ...ann,
    spans: ann.spans.map(span => normalizarSpanPersistido(span, nota.note_text)),
  };
}

function removerSpan(idx) {
  const n = NOTAS_DATA[state.notaIdx];
  const a = state.anotacoes[n.noteId];
  const removed = a.spans.splice(idx, 1)[0];
  pushUndo({ tipo: 'remove', noteId: n.noteId, span: removed, idx });
  markInProgress();
  renderNotaTexto();
  renderSpanList();
  renderLista();
  scheduleSave();
  toast(`− ${removed.type}`);
}

function mostrarMenuSpanExistente(targetEl, idx) {
  fecharPopup();
  const rect = targetEl.getBoundingClientRect();
  const n = NOTAS_DATA[state.notaIdx];
  const a = state.anotacoes[n.noteId];
  const span = a.spans[idx];
  const pop = document.createElement('div');
  pop.className = 'span-popup';
  pop.style.left = rect.left + 'px';
  pop.style.top = (rect.bottom + window.scrollY + 4) + 'px';
  const outros = TIPOS.filter(t => t !== span.type);
  pop.innerHTML = `<button class="remover">× remover</button>` +
    outros.map(t => `<button class="${t}" data-tipo="${t}">→ ${t === 'EVIDENCIA' ? 'EVID' : t === 'QUALIFICADOR' ? 'QUAL' : t}</button>`).join('');
  document.body.appendChild(pop);
  pop.querySelector('.remover').addEventListener('mousedown', (e) => {
    e.preventDefault();
    fecharPopup();
    removerSpan(idx);
  });
  pop.querySelectorAll('[data-tipo]').forEach(b => {
    b.addEventListener('mousedown', (e) => {
      e.preventDefault();
      span.type = b.dataset.tipo;
      markInProgress();
      fecharPopup();
      renderNotaTexto();
      renderSpanList();
      scheduleSave();
      toast(`→ ${span.type}`);
    });
  });
  popupAberto = pop;
}

/* ==========================================================================
   Undo
   ========================================================================== */
function pushUndo(action) {
  state.undoStack.push(action);
  if (state.undoStack.length > 50) state.undoStack.shift();
}
function undo() {
  const act = state.undoStack.pop();
  if (!act) { toast('Nada para desfazer'); return; }
  const a = state.anotacoes[act.noteId];
  if (act.tipo === 'create') {
    a.spans.splice(act.idx, 1);
  } else if (act.tipo === 'remove') {
    a.spans.splice(act.idx, 0, act.span);
  }
  // Se a nota corrente não é a do undo, navega até ela
  const idxNota = NOTAS_DATA.findIndex(n => n.noteId === act.noteId);
  if (idxNota !== state.notaIdx) {
    irPara(idxNota);
  } else {
    renderNotaTexto();
    renderSpanList();
    renderLista();
  }
  scheduleSave();
  toast('Desfeito');
}

/* ==========================================================================
   Status / navegação / save
   ========================================================================== */
function markInProgress() {
  const n = NOTAS_DATA[state.notaIdx];
  const a = state.anotacoes[n.noteId];
  if (a.status === 'pending') {
    a.status = 'in_progress';
    a.started_at = nowISO();
  } else if (a.status === 'completed') {
    a.status = 'in_progress';
    delete a.completed_at;
  }
  renderLista();
}
function toggleCompleta() {
  const n = NOTAS_DATA[state.notaIdx];
  const a = state.anotacoes[n.noteId];
  if (a.status === 'completed') {
    a.status = 'in_progress';
    delete a.completed_at;
  } else {
    a.status = 'completed';
    a.completed_at = nowISO();
  }
  renderLista();
  renderNota();
  scheduleSave();
  // auto-export trigger
  const totalCompleted = Object.values(state.anotacoes).filter(x => x.status === 'completed').length;
  if (a.status === 'completed' && totalCompleted > 0 && totalCompleted % AUTO_EXPORT_EVERY === 0) {
    autoExportar(totalCompleted);
  }
}
function irPara(i) {
  if (i < 0 || i >= NOTAS_DATA.length) return;
  state.notaIdx = i;
  renderNota();
  renderLista();
  fecharPopup();
}

function scheduleSave() {
  clearTimeout(state.saveTimer);
  updateAutoSave('saving', 'Salvando…');
  state.saveTimer = setTimeout(async () => {
    await saveAnotacoes(state.perfil.id, state.anotacoes);
    updateAutoSave('saved', `Salvo ${new Date().toLocaleTimeString('pt-BR').slice(0,5)}`);
  }, DEBOUNCE_SAVE_MS);
}
function updateAutoSave(kind, msg) {
  const el = document.getElementById('auto-save');
  el.className = 'auto-save ' + kind;
  document.getElementById('auto-save-text').textContent = msg;
}

/* ==========================================================================
   Export / Import
   ========================================================================== */
function montarPayload() {
  const completas = Object.values(state.anotacoes).filter(x => x.status === 'completed').length;
  const inProgress = Object.values(state.anotacoes).filter(x => x.status === 'in_progress').length;
  return {
    schema_version: SCHEMA_VERSION,
    dataset_version: DATASET_VERSION,
    guia_versao: GUIA_VERSION,
    anotador: { nome: state.perfil.nome, papel: state.perfil.papel },
    started_at: state.perfil.identified_at,
    last_saved_at: nowISO(),
    total_notas: NOTAS_DATA.length,
    completas,
    em_progresso: inProgress,
    pendentes: NOTAS_DATA.length - completas - inProgress,
    anotacoes: Object.fromEntries(
      NOTAS_DATA.map(n => [n.noteId, { noteId: n.noteId, ...state.anotacoes[n.noteId] }])
    ),
  };
}

function exportarJSON(silent) {
  const payload = montarPayload();
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const data = new Date().toISOString().slice(0, 10);
  const slug = slugify(state.perfil.nome);
  const a = document.createElement('a');
  a.href = url;
  a.download = `anotacao_${state.perfil.papel}_${slug}_${data}.json`;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => { document.body.removeChild(a); URL.revokeObjectURL(url); }, 100);
  if (!silent) toast('JSON exportado', 'success');
}

function autoExportar(n) {
  state.lastAutoExportAt = Date.now();
  exportarJSON(true);
  toast(`Auto-export: ${n} completas`, 'success');
}

async function exportarExcel() {
  // Carrega SheetJS sob demanda
  if (!window.XLSX) {
    toast('Carregando biblioteca Excel…');
    await new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = 'https://cdn.sheetjs.com/xlsx-0.20.2/package/dist/xlsx.full.min.js';
      s.onload = resolve;
      s.onerror = reject;
      document.head.appendChild(s);
    }).catch(() => { toast('Falha ao carregar XLSX (offline?)', 'error'); return; });
  }
  if (!window.XLSX) return;

  const rows = [];
  NOTAS_DATA.forEach((n, i) => {
    const a = state.anotacoes[n.noteId];
    if (a.spans.length === 0) {
      rows.push({
        ordem: i + 1, noteId: n.noteId, tweetId: n.tweetId || '', consenso: n.consenso,
        macrotema: n.macrotheme_label || '', status: a.status,
        tweet_text: n.tweet_text, nota: n.note_text,
        tipo: '', span_text: '', start: '', end: '', obs: a.obs || '',
      });
    } else {
      a.spans.forEach(s => {
        rows.push({
          ordem: i + 1, noteId: n.noteId, tweetId: n.tweetId || '', consenso: n.consenso,
          macrotema: n.macrotheme_label || '', status: a.status,
          tweet_text: n.tweet_text, nota: n.note_text,
          tipo: s.type, span_text: s.text, start: s.start, end: s.end, obs: a.obs || '',
        });
      });
    }
  });
  const ws = XLSX.utils.json_to_sheet(rows);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'anotacao');
  const data = new Date().toISOString().slice(0, 10);
  const slug = slugify(state.perfil.nome);
  XLSX.writeFile(wb, `anotacao_${state.perfil.papel}_${slug}_${data}.xlsx`);
  toast('Excel exportado', 'success');
}

function montarPayloadBIO() {
  const data = new Date().toISOString().slice(0, 10);
  const slug = slugify(state.perfil.nome);
  return {
    tokenizer: BIO_TOKENIZER,
    include_offsets: true,
    filename: `anotacao_${state.perfil.papel}_${slug}_${data}_bio.conll`,
    source: {
      schema_version: SCHEMA_VERSION,
      dataset_version: DATASET_VERSION,
      guia_versao: GUIA_VERSION,
      exported_at: nowISO(),
      anotador: { nome: state.perfil.nome, papel: state.perfil.papel },
      total_notas: NOTAS_DATA.length,
    },
    notes: NOTAS_DATA.map((n, i) => {
      const a = state.anotacoes[n.noteId] || { status: 'pending', spans: [], obs: '' };
      return {
        ordem: i + 1,
        noteId: n.noteId,
        tweetId: n.tweetId || '',
        text: n.note_text,
        status: a.status || 'pending',
        spans: a.spans || [],
        obs: a.obs || '',
        consenso: n.consenso || '',
        macrotheme_label: n.macrotheme_label || '',
      };
    }),
  };
}

async function exportarBIO() {
  const btn = document.getElementById('btn-export-bio');
  const originalText = btn.textContent;
  btn.disabled = true;
  btn.textContent = 'Gerando BIO...';
  toast('Gerando BIO...');

  try {
    const resp = await fetch(`${BIO_CONVERTER_URL.replace(/\/$/, '')}/convert`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(montarPayloadBIO()),
    });

    const raw = await resp.text();
    let result;
    try {
      result = JSON.parse(raw);
    } catch (err) {
      throw new Error(raw.slice(0, 240) || 'Resposta invalida do conversor BIO.');
    }

    if (!resp.ok) {
      const detail = result.detail ? JSON.stringify(result.detail) : `HTTP ${resp.status}`;
      throw new Error(detail);
    }
    if (!result.ok) {
      throw new Error((result.errors || []).join(' | ') || 'Conversao BIO falhou.');
    }

    const blob = new Blob([result.content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = result.filename || 'anotacao_bio.conll';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => { document.body.removeChild(a); URL.revokeObjectURL(url); }, 100);

    const warnings = (result.warnings || []).length;
    toast(warnings ? `BIO exportado (${warnings} avisos)` : 'BIO exportado', 'success');
  } catch (err) {
    console.error(err);
    toast(`Falha ao exportar BIO: ${err.message}`, 'error');
  } finally {
    btn.disabled = false;
    btn.textContent = originalText;
  }
}

async function importarJSON(file) {
  try {
    const text = await file.text();
    const payload = JSON.parse(text);
    if (!payload.anotacoes) throw new Error('Schema inválido — sem campo "anotacoes".');
    if (!payload.anotador) throw new Error('Schema inválido — sem campo "anotador".');

    const conflito = state.perfil && (
      payload.anotador.nome !== state.perfil.nome ||
      payload.anotador.papel !== state.perfil.papel
    );
    if (conflito) {
      const escolha = prompt(
        `Este JSON foi gerado por ${payload.anotador.nome} (papel ${payload.anotador.papel}).\n` +
        `Você é ${state.perfil.nome} (papel ${state.perfil.papel}).\n\n` +
        `Digite uma opção:\n` +
        `1 — Importar como meu (sobrescreve nome no payload)\n` +
        `2 — Trocar para o anotador do JSON\n` +
        `3 — Cancelar`
      );
      if (escolha === '2') {
        const novo = {
          nome: payload.anotador.nome,
          papel: payload.anotador.papel,
          id: perfilId(payload.anotador.nome, payload.anotador.papel),
          identified_at: payload.started_at || nowISO(),
          guide_acknowledged: true,
          guide_version: GUIA_VERSION,
        };
        await savePerfil(novo);
        state.perfil = novo;
        localStorage.setItem('pln_anotador', JSON.stringify(novo));
        document.getElementById('header-nome').textContent = novo.nome;
        document.getElementById('header-papel').textContent = novo.papel;
      } else if (escolha !== '1') {
        return;
      }
    }

    // Se ainda não iniciou o app (importação na tela inicial)
    if (!state.perfil) {
      const novo = {
        nome: payload.anotador.nome,
        papel: payload.anotador.papel,
        id: perfilId(payload.anotador.nome, payload.anotador.papel),
        identified_at: payload.started_at || nowISO(),
        guide_acknowledged: true,
        guide_version: GUIA_VERSION,
      };
      await savePerfil(novo);
      state.perfil = novo;
      localStorage.setItem('pln_anotador', JSON.stringify(novo));
      await iniciarApp();
    }

    // Importa anotações: valida noteIds, conta válidos e inválidos
    let validos = 0, ignorados = 0;
    const validIds = new Set(NOTAS_DATA.map(n => n.noteId));
    Object.entries(payload.anotacoes).forEach(([noteId, ann]) => {
      if (validIds.has(noteId)) {
        state.anotacoes[noteId] = normalizarAnotacaoPersistida(noteId, ann);
        validos++;
      } else {
        ignorados++;
      }
    });
    renderLista();
    renderNota();
    await saveAnotacoes(state.perfil.id, state.anotacoes);
    toast(`Importado: ${validos} válidos${ignorados > 0 ? `, ${ignorados} ignorados` : ''}`, 'success');
  } catch (e) {
    console.error(e);
    toast('Erro ao importar: ' + e.message, 'error');
  }
}

/* ==========================================================================
   Listeners globais
   ========================================================================== */
function setupListeners() {
  document.getElementById('btn-export-json').addEventListener('click', () => exportarJSON());
  document.getElementById('btn-export-bio').addEventListener('click', exportarBIO);
  document.getElementById('btn-export-xlsx').addEventListener('click', exportarExcel);
  document.getElementById('btn-import').addEventListener('click', () => document.getElementById('file-import').click());
  document.getElementById('file-import').addEventListener('change', (e) => {
    if (e.target.files[0]) importarJSON(e.target.files[0]);
    e.target.value = '';
  });
  document.getElementById('btn-guia').addEventListener('click', abrirGuia);
  document.getElementById('btn-exemplos').addEventListener('click', () => {
    document.getElementById('modal-exemplos').removeAttribute('hidden');
  });
  document.getElementById('btn-toggle-sugestoes').addEventListener('click', toggleSugestoes);
  document.getElementById('btn-trocar-anotador').addEventListener('click', trocarAnotador);
  document.getElementById('btn-reset').addEventListener('click', resetTudo);

  // Avisa antes de fechar se há alterações
  window.addEventListener('beforeunload', (e) => {
    const totalEdits = Object.values(state.anotacoes).filter(a => a.status !== 'pending').length;
    if (totalEdits > 0) {
      e.preventDefault();
      e.returnValue = '';
    }
  });
}

function setupKeyboard() {
  document.addEventListener('keydown', (e) => {
    // Não captura atalhos quando digitando em textarea/input
    const tag = (e.target.tagName || '').toLowerCase();
    if (tag === 'textarea' || tag === 'input') return;

    // Atalhos com modificador
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
      e.preventDefault(); exportarJSON(); return;
    }
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
      e.preventDefault(); undo(); return;
    }

    // Atalhos simples
    if (e.key === 'Tab') { e.preventDefault(); toggleSugestoes(); return; }
    if (e.key === '?')   { abrirGuia(); return; }
    if (e.key === 'ArrowLeft')  { irPara(state.notaIdx - 1); return; }
    if (e.key === 'ArrowRight') { irPara(state.notaIdx + 1); return; }

    // Atalhos numéricos (criar span) — só funcionam se há seleção
    if (ATALHO_TIPO[e.key] && popupAberto && popupAberto._offsets) {
      criarSpan(ATALHO_TIPO[e.key], popupAberto._offsets);
    }
  });
}

function setupDragDrop() {
  const overlay = document.getElementById('drop-overlay');
  let depth = 0;
  document.body.addEventListener('dragenter', (e) => { e.preventDefault(); depth++; overlay.classList.add('active'); });
  document.body.addEventListener('dragover',  (e) => { e.preventDefault(); });
  document.body.addEventListener('dragleave', (e) => { depth--; if (depth <= 0) { depth = 0; overlay.classList.remove('active'); } });
  document.body.addEventListener('drop', (e) => {
    e.preventDefault();
    depth = 0;
    overlay.classList.remove('active');
    const file = e.dataTransfer.files[0];
    if (file && file.name.endsWith('.json')) importarJSON(file);
    else toast('Solte um arquivo .json', 'error');
  });
}

function toggleSugestoes() {
  state.sugestoesAtivas = !state.sugestoesAtivas;
  document.getElementById('btn-toggle-sugestoes').textContent = state.sugestoesAtivas ? 'Esconder (Tab)' : 'Ver (Tab)';
  renderNotaTexto();
}

function abrirGuia() {
  document.getElementById('modal-guia').removeAttribute('hidden');
}

async function trocarAnotador() {
  if (!confirm('Sair do anotador atual? Suas anotações ficam salvas neste navegador.')) return;
  state.perfil = null;
  state.anotacoes = {};
  state.undoStack = [];
  document.getElementById('app').setAttribute('hidden','');
  document.getElementById('modal-identificacao').removeAttribute('hidden');
  document.getElementById('input-nome').value = '';
  document.getElementById('btn-comecar').disabled = true;
  document.getElementById('input-nome').focus();
}

async function resetTudo() {
  const palavra = prompt('Isto apaga TODAS as anotações deste anotador.\nDigite RESET para confirmar:');
  if (palavra !== 'RESET') return;
  state.anotacoes = {};
  NOTAS_DATA.forEach(n => state.anotacoes[n.noteId] = { status: 'pending', spans: [], obs: '' });
  await saveAnotacoes(state.perfil.id, state.anotacoes);
  state.undoStack = [];
  renderLista();
  renderNota();
  toast('Reset feito', 'success');
}

/* ==========================================================================
   Bootstrap
   ========================================================================== */
async function bootstrap() {
  setupModalIdentificacao();

  // Listener pra import via file picker (mesmo antes do app iniciar)
  document.getElementById('file-import').addEventListener('change', (e) => {
    if (e.target.files[0]) importarJSON(e.target.files[0]);
    e.target.value = '';
  });

  // Se já há perfil salvo no localStorage, oferece retomar
  const saved = localStorage.getItem('pln_anotador');
  if (saved) {
    try {
      const perfil = JSON.parse(saved);
      if (confirm(`Continuar como ${perfil.nome}?\n\nClique "Cancelar" para começar como outro anotador.`)) {
        state.perfil = perfil;
        await iniciarApp();
      }
    } catch (e) { console.warn(e); }
  }
}
bootstrap();
