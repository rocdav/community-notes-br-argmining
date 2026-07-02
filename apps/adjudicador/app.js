const DATA = window.ADJUDICACAO_DATA;
const NOTES = DATA.notes || [];
const TYPES = ["CLAIM", "EVIDENCIA", "FONTE", "QUALIFICADOR"];
const STORAGE_KEY = "pln_adjudicacao_consenso_v1";
const SCHEMA_VERSION = "1.0";

const state = {
  noteIdx: 0,
  filter: "all",
  layers: { davi: true, alvaro: true, e1: false, e2: false },
  notes: {},
};

function nowISO() { return new Date().toISOString(); }
function byId(id) { return document.getElementById(id); }
function escapeHTML(s) {
  return String(s || "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
function slugify(s) {
  return String(s || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-+|-+$)/g, "");
}
function toast(msg) {
  const el = byId("toast");
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(toast._t);
  toast._t = setTimeout(() => el.classList.remove("show"), 2600);
}
function spanSig(s) { return `${s.start}:${s.end}:${s.type}`; }
function overlaps(a, b) { return Math.max(a.start, b.start) < Math.min(a.end, b.end); }
function cleanSpan(span, note) {
  const start = Math.max(0, Math.min(note.note_text.length, Number(span.start)));
  const end = Math.max(start, Math.min(note.note_text.length, Number(span.end)));
  return {
    type: TYPES.includes(span.type) ? span.type : "EVIDENCIA",
    start,
    end,
    text: note.note_text.slice(start, end),
    adjudicated_at: span.adjudicated_at || nowISO(),
    decision_source: span.decision_source || span.source_label || span.source_key || "manual",
  };
}
function sortSpans(spans) {
  return [...spans].sort((a, b) => a.start - b.start || a.end - b.end || a.type.localeCompare(b.type));
}

function defaultNoteState(note) {
  return {
    status: "pending",
    spans: sortSpans((note.exact_agreement || []).map(s => cleanSpan({ ...s, decision_source: "acordo_exato" }, note))),
    obs: "",
    decisions: [],
    updated_at: nowISO(),
    reviewed_at: null,
  };
}

function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (parsed && parsed.notes) {
        NOTES.forEach(note => {
          const savedNote = parsed.notes[note.noteId];
          state.notes[note.noteId] = savedNote
            ? {
                status: savedNote.status || "pending",
                spans: sortSpans((savedNote.spans || []).map(s => cleanSpan(s, note))),
                obs: savedNote.obs || "",
                decisions: savedNote.decisions || [],
                updated_at: savedNote.updated_at || nowISO(),
                reviewed_at: savedNote.reviewed_at || null,
              }
            : defaultNoteState(note);
        });
        state.noteIdx = Math.min(parsed.noteIdx || 0, NOTES.length - 1);
        return;
      }
    } catch (err) {
      console.warn(err);
    }
  }
  NOTES.forEach(note => state.notes[note.noteId] = defaultNoteState(note));
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    saved_at: nowISO(),
    noteIdx: state.noteIdx,
    notes: state.notes,
  }));
}

function currentNote() { return NOTES[state.noteIdx]; }
function currentGold() { return state.notes[currentNote().noteId]; }

function validationFor(note, gold) {
  const warnings = [];
  const spans = gold.spans || [];
  spans.forEach((span, idx) => {
    if (!TYPES.includes(span.type)) warnings.push(`Span ${idx + 1}: tipo inválido.`);
    if (span.start >= span.end) warnings.push(`Span ${idx + 1}: intervalo vazio.`);
    if (note.note_text.slice(span.start, span.end) !== span.text) warnings.push(`Span ${idx + 1}: texto não bate com offsets.`);
  });
  for (let i = 0; i < spans.length; i += 1) {
    for (let j = i + 1; j < spans.length; j += 1) {
      if (overlaps(spans[i], spans[j])) warnings.push(`Sobreposição entre spans ${i + 1} e ${j + 1}.`);
    }
  }
  return warnings;
}

function statusFor(note) {
  const gold = state.notes[note.noteId];
  const warnings = validationFor(note, gold);
  if (gold.status === "reviewed" && warnings.length === 0) return "reviewed";
  if ((note.counts.human_union - note.counts.exact_agreement) > 0) return "divergent";
  return "pending";
}

function renderSummary() {
  const reviewed = NOTES.filter(n => statusFor(n) === "reviewed").length;
  const divergent = NOTES.filter(n => (n.counts.human_union - n.counts.exact_agreement) > 0).length;
  const goldSpans = NOTES.reduce((acc, n) => acc + (state.notes[n.noteId]?.spans.length || 0), 0);
  byId("dataset-meta").textContent = `${DATA.stats.notes} notas; Davi ${DATA.stats.davi_spans} spans; Álvaro ${DATA.stats.alvaro_spans} spans; acordo exato ${DATA.stats.exact_agreement_spans}`;
  byId("summary-strip").innerHTML = [
    ["Revisadas", `${reviewed}/${NOTES.length}`],
    ["Divergentes", divergent],
    ["Gold spans", goldSpans],
    ["União humana", DATA.stats.human_union_spans],
  ].map(([label, value]) => `<div class="metric"><strong>${value}</strong><span>${label}</span></div>`).join("");
}

function filteredNotes() {
  return NOTES.filter(note => {
    if (state.filter === "pending") return statusFor(note) !== "reviewed";
    if (state.filter === "divergent") return (note.counts.human_union - note.counts.exact_agreement) > 0;
    return true;
  });
}

function renderNoteList() {
  const list = byId("note-list");
  list.innerHTML = filteredNotes().map(note => {
    const idx = NOTES.indexOf(note);
    const st = statusFor(note);
    const goldCount = state.notes[note.noteId]?.spans.length || 0;
    const delta = note.counts.human_union - note.counts.exact_agreement;
    return `
      <button class="note-item ${idx === state.noteIdx ? "active" : ""} ${st}" data-idx="${idx}">
        <span><strong>${note.order}</strong><br><span class="small">${note.consenso || "Outro"}</span></span>
        <span>
          <strong>${note.noteId}</strong><br>
          <span class="small">${goldCount} gold · ${delta} diverg.</span>
        </span>
        <span class="flag">${st === "reviewed" ? "OK" : "ABERTO"}</span>
      </button>`;
  }).join("");
}

function spanLayersFor(note) {
  const layers = [];
  const gold = state.notes[note.noteId];
  (gold.spans || []).forEach(s => layers.push({ ...s, layer: "gold", label: `Gold ${s.type}` }));
  if (state.layers.davi) note.human.davi.spans.forEach(s => layers.push({ ...s, layer: "davi", label: `Davi ${s.type}` }));
  if (state.layers.alvaro) note.human.alvaro.spans.forEach(s => layers.push({ ...s, layer: "alvaro", label: `Álvaro ${s.type}` }));
  if (state.layers.e1) note.automatic.e1.forEach(s => layers.push({ ...s, layer: "e1", label: `E1 ${s.type}` }));
  if (state.layers.e2) note.automatic.e2.forEach(s => layers.push({ ...s, layer: "e2", label: `E2 ${s.type}` }));
  return layers;
}

function renderHighlightedText(note) {
  const text = note.note_text;
  const layers = spanLayersFor(note).filter(s => s.start < s.end);
  const points = new Set([0, text.length]);
  layers.forEach(s => { points.add(s.start); points.add(s.end); });
  const sorted = [...points].sort((a, b) => a - b);
  const html = [];
  for (let i = 0; i < sorted.length - 1; i += 1) {
    const start = sorted[i], end = sorted[i + 1];
    if (start === end) continue;
    const active = layers.filter(s => start >= s.start && end <= s.end);
    const classes = ["seg"];
    const titles = [];
    const gold = active.find(s => s.layer === "gold");
    if (gold) classes.push(`gold-${gold.type}`);
    ["davi", "alvaro", "e1", "e2"].forEach(layer => {
      if (active.some(s => s.layer === layer)) classes.push(`mark-${layer}`);
    });
    active.forEach(s => titles.push(s.label));
    html.push(`<span class="${classes.join(" ")}" data-start="${start}" data-end="${end}" title="${escapeHTML(titles.join(" | "))}">${escapeHTML(text.slice(start, end))}</span>`);
  }
  byId("note-text").innerHTML = html.join("");
}

function allCandidateSpans(note) {
  return [
    ...note.human.davi.spans,
    ...note.human.alvaro.spans,
  ];
}

function candidateById(note, id) {
  return allCandidateSpans(note).find(s => s.id === id);
}

function inGold(note, candidate) {
  return state.notes[note.noteId].spans.some(s => spanSig(s) === spanSig(candidate));
}

function renderClusters(note) {
  const clusters = byId("clusters");
  if (!note.clusters.length) {
    clusters.innerHTML = `<div class="empty">Nenhum span humano nesta nota.</div>`;
    return;
  }
  clusters.innerHTML = note.clusters.map(cluster => {
    const rows = cluster.span_ids.map(id => candidateById(note, id)).filter(Boolean).map(span => {
      const added = inGold(note, span);
      return `
        <div class="candidate ${added ? "in-gold" : ""}">
          <span class="source-pill source-${span.source_key}">${span.source_label}</span>
          <span class="type-pill type-${span.type}">${span.type}</span>
          <div>
            <div class="candidate-text">${escapeHTML(span.text)}</div>
            <div class="cluster-range">${span.start}-${span.end}</div>
          </div>
          <button class="btn ${added ? "" : "primary"}" data-add-span="${span.id}">${added ? "No gold" : "Usar"}</button>
        </div>`;
    }).join("");
    const exact = cluster.exact_agreements.length ? `<span class="badge">acordo exato</span>` : "";
    return `
      <section class="cluster">
        <div class="cluster-head">
          <div><strong>${cluster.id}</strong> <span class="cluster-range">${cluster.start}-${cluster.end}</span></div>
          <div class="badges">${exact}<span class="badge">${cluster.sources.join(" + ")}</span></div>
        </div>
        ${rows}
      </section>`;
  }).join("");
}

function renderGold(note) {
  const gold = state.notes[note.noteId];
  const list = byId("gold-list");
  if (!gold.spans.length) {
    list.innerHTML = `<div class="empty">Gold vazio para esta nota.</div>`;
  } else {
    list.innerHTML = gold.spans.map((span, idx) => `
      <div class="gold-row">
        <select data-type-idx="${idx}">
          ${TYPES.map(t => `<option value="${t}" ${t === span.type ? "selected" : ""}>${t}</option>`).join("")}
        </select>
        <div>
          <div class="gold-text">${escapeHTML(span.text)}</div>
          <div class="cluster-range">${span.start}-${span.end} · ${escapeHTML(span.decision_source || "manual")}</div>
        </div>
        <button class="btn danger" data-remove-idx="${idx}">Remover</button>
      </div>`).join("");
  }
  byId("note-obs").value = gold.obs || "";
  const warnings = validationFor(note, gold);
  byId("validation").innerHTML = warnings.length
    ? warnings.map(w => `<div class="warn">${escapeHTML(w)}</div>`).join("")
    : `<div class="ok">Offsets válidos e sem sobreposição.</div>`;
  byId("btn-review").textContent = gold.status === "reviewed" ? "Revisada" : "Marcar revisada";
}

function renderCurrentNote() {
  const note = currentNote();
  const delta = note.counts.human_union - note.counts.exact_agreement;
  byId("note-title").textContent = `Nota ${note.order}`;
  byId("note-badges").innerHTML = [
    `noteId ${note.noteId}`,
    note.consenso || "Outro",
    `${note.counts.davi} Davi`,
    `${note.counts.alvaro} Álvaro`,
    `${delta} divergências`,
  ].map(x => `<span class="badge">${escapeHTML(x)}</span>`).join("");
  byId("tweet-text").textContent = note.tweet_text || "";
  renderHighlightedText(note);
  renderClusters(note);
  renderGold(note);
  renderSummary();
  renderNoteList();
}

function removeConflictingSpans(note, newSpan) {
  const gold = state.notes[note.noteId];
  const before = gold.spans.length;
  gold.spans = gold.spans.filter(s => !overlaps(s, newSpan));
  return before - gold.spans.length;
}

function addSpanToGold(rawSpan, source) {
  const note = currentNote();
  const gold = state.notes[note.noteId];
  const span = cleanSpan({ ...rawSpan, decision_source: source }, note);
  if (!span.text.trim()) {
    toast("Seleção vazia.");
    return;
  }
  const same = gold.spans.find(s => spanSig(s) === spanSig(span));
  if (same) {
    toast("Esse span já está no gold.");
    return;
  }
  const removed = removeConflictingSpans(note, span);
  gold.spans = sortSpans([...gold.spans, span]);
  gold.status = "pending";
  gold.updated_at = nowISO();
  gold.decisions.push({ at: nowISO(), action: "add_span", source, start: span.start, end: span.end, type: span.type, replaced: removed });
  saveState();
  renderCurrentNote();
  toast(removed ? `Span adicionado; ${removed} conflito(s) substituído(s).` : "Span adicionado.");
}

function useSource(sourceKey) {
  const note = currentNote();
  const gold = state.notes[note.noteId];
  const source = sourceKey === "davi" ? note.human.davi.spans : sourceKey === "alvaro" ? note.human.alvaro.spans : note.exact_agreement;
  gold.spans = sortSpans(source.map(s => cleanSpan({ ...s, decision_source: sourceKey === "exact" ? "acordo_exato" : sourceKey }, note)));
  gold.status = "pending";
  gold.updated_at = nowISO();
  gold.decisions.push({ at: nowISO(), action: "use_source", source: sourceKey, spans: gold.spans.length });
  saveState();
  renderCurrentNote();
  toast(`Gold da nota substituído por ${sourceKey}.`);
}

function getSelectionOffsets() {
  const container = byId("note-text");
  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0 || sel.isCollapsed) return null;
  const range = sel.getRangeAt(0);
  if (!container.contains(range.commonAncestorContainer)) return null;
  const pre = document.createRange();
  pre.selectNodeContents(container);
  pre.setEnd(range.startContainer, range.startOffset);
  let start = pre.toString().length;
  let selected = range.toString();
  let end = start + selected.length;
  while (selected && /^\s/.test(selected)) {
    selected = selected.slice(1);
    start += 1;
  }
  while (selected && /\s$/.test(selected)) {
    selected = selected.slice(0, -1);
    end -= 1;
  }
  if (!selected) return null;
  return { start, end, text: selected };
}

function updateSelectionReadout() {
  const offsets = getSelectionOffsets();
  byId("selection-readout").textContent = offsets
    ? `Seleção ${offsets.start}-${offsets.end}: "${offsets.text.slice(0, 48)}${offsets.text.length > 48 ? "..." : ""}"`
    : "Selecione texto da nota para criar um span.";
}

function setReviewed() {
  const note = currentNote();
  const gold = state.notes[note.noteId];
  const warnings = validationFor(note, gold);
  if (warnings.length) {
    toast("Corrija a validação antes de marcar como revisada.");
    return;
  }
  gold.status = "reviewed";
  gold.reviewed_at = nowISO();
  gold.updated_at = nowISO();
  gold.decisions.push({ at: nowISO(), action: "reviewed", spans: gold.spans.length });
  saveState();
  renderCurrentNote();
  toast("Nota marcada como revisada.");
}

function nextPending() {
  const start = state.noteIdx;
  for (let step = 1; step <= NOTES.length; step += 1) {
    const idx = (start + step) % NOTES.length;
    if (statusFor(NOTES[idx]) !== "reviewed") {
      state.noteIdx = idx;
      saveState();
      renderCurrentNote();
      return;
    }
  }
  toast("Todas as notas estão revisadas.");
}

function montarPayload() {
  const completas = NOTES.filter(n => state.notes[n.noteId].status === "reviewed").length;
  return {
    schema_version: SCHEMA_VERSION,
    dataset_version: DATA.dataset_version,
    guia_versao: DATA.guide_version,
    anotador: { nome: "Consenso Davi + Alvaro", papel: "consenso_adjudicado" },
    adjudicacao: {
      generated_by: "apps/adjudicador",
      exported_at: nowISO(),
      source_files: DATA.source_files,
      annotators: DATA.annotators,
      stats: DATA.stats,
    },
    started_at: null,
    last_saved_at: nowISO(),
    total_notas: NOTES.length,
    completas,
    em_progresso: NOTES.length - completas,
    pendentes: 0,
    anotacoes: Object.fromEntries(NOTES.map(note => {
      const gold = state.notes[note.noteId];
      return [note.noteId, {
        noteId: note.noteId,
        status: gold.status === "reviewed" ? "completed" : "in_progress",
        spans: sortSpans(gold.spans).map(s => ({
          type: s.type,
          text: note.note_text.slice(s.start, s.end),
          start: s.start,
          end: s.end,
          decision_source: s.decision_source || "manual",
          adjudicated_at: s.adjudicated_at || gold.updated_at || nowISO(),
        })),
        obs: gold.obs || "",
        started_at: null,
        completed_at: gold.reviewed_at,
      }];
    })),
  };
}

function downloadText(filename, content, mime) {
  const blob = new Blob([content], { type: mime || "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => { document.body.removeChild(a); URL.revokeObjectURL(url); }, 100);
}

function exportGold() {
  const reviewed = NOTES.filter(n => state.notes[n.noteId].status === "reviewed").length;
  if (reviewed < NOTES.length && !window.confirm(`Há ${NOTES.length - reviewed} nota(s) pendente(s). Exportar rascunho mesmo assim?`)) {
    return;
  }
  const date = new Date().toISOString().slice(0, 10);
  downloadText(`anotacao_consenso_adjudicado_${date}.json`, JSON.stringify(montarPayload(), null, 2), "application/json;charset=utf-8");
  toast("Gold exportado.");
}

function exportAuditCSV() {
  const header = ["ordem", "noteId", "status", "gold_spans", "davi_spans", "alvaro_spans", "exact_agreement", "human_union", "obs"];
  const rows = NOTES.map(note => {
    const gold = state.notes[note.noteId];
    return [
      note.order,
      note.noteId,
      gold.status,
      gold.spans.length,
      note.counts.davi,
      note.counts.alvaro,
      note.counts.exact_agreement,
      note.counts.human_union,
      (gold.obs || "").replace(/\r?\n/g, " "),
    ];
  });
  const csv = [header, ...rows].map(row => row.map(v => `"${String(v).replace(/"/g, '""')}"`).join(",")).join("\n");
  downloadText(`auditoria_adjudicacao_${new Date().toISOString().slice(0, 10)}.csv`, csv, "text/csv;charset=utf-8");
  toast("Auditoria exportada.");
}

function importGold(file) {
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const payload = JSON.parse(reader.result);
      const anns = payload.anotacoes || {};
      NOTES.forEach(note => {
        if (!anns[note.noteId]) return;
        state.notes[note.noteId] = {
          ...state.notes[note.noteId],
          status: anns[note.noteId].status === "completed" ? "reviewed" : "pending",
          spans: sortSpans((anns[note.noteId].spans || []).map(s => cleanSpan(s, note))),
          obs: anns[note.noteId].obs || "",
          updated_at: nowISO(),
          reviewed_at: anns[note.noteId].completed_at || null,
        };
      });
      saveState();
      renderCurrentNote();
      toast("JSON importado.");
    } catch (err) {
      console.error(err);
      toast("Falha ao importar JSON.");
    }
  };
  reader.readAsText(file, "utf-8");
}

function setupEvents() {
  byId("note-list").addEventListener("click", e => {
    const item = e.target.closest("[data-idx]");
    if (!item) return;
    state.noteIdx = Number(item.dataset.idx);
    saveState();
    renderCurrentNote();
  });
  document.querySelectorAll(".filter").forEach(btn => btn.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach(x => x.classList.remove("active"));
    btn.classList.add("active");
    state.filter = btn.dataset.filter;
    renderNoteList();
  }));
  document.querySelectorAll("[data-layer]").forEach(input => input.addEventListener("change", () => {
    state.layers[input.dataset.layer] = input.checked;
    renderHighlightedText(currentNote());
  }));
  byId("clusters").addEventListener("click", e => {
    const btn = e.target.closest("[data-add-span]");
    if (!btn) return;
    const span = candidateById(currentNote(), btn.dataset.addSpan);
    if (span) addSpanToGold(span, span.source_key);
  });
  byId("gold-list").addEventListener("click", e => {
    const btn = e.target.closest("[data-remove-idx]");
    if (!btn) return;
    const gold = currentGold();
    const idx = Number(btn.dataset.removeIdx);
    const removed = gold.spans.splice(idx, 1)[0];
    gold.status = "pending";
    gold.updated_at = nowISO();
    gold.decisions.push({ at: nowISO(), action: "remove_span", start: removed.start, end: removed.end, type: removed.type });
    saveState();
    renderCurrentNote();
  });
  byId("gold-list").addEventListener("change", e => {
    const sel = e.target.closest("[data-type-idx]");
    if (!sel) return;
    const idx = Number(sel.dataset.typeIdx);
    const gold = currentGold();
    gold.spans[idx].type = sel.value;
    gold.spans[idx].decision_source = `${gold.spans[idx].decision_source || "manual"}+tipo_editado`;
    gold.status = "pending";
    gold.updated_at = nowISO();
    gold.decisions.push({ at: nowISO(), action: "change_type", idx, type: sel.value });
    saveState();
    renderCurrentNote();
  });
  byId("note-obs").addEventListener("input", e => {
    const gold = currentGold();
    gold.obs = e.target.value;
    gold.updated_at = nowISO();
    saveState();
  });
  byId("note-text").addEventListener("mouseup", updateSelectionReadout);
  byId("note-text").addEventListener("keyup", updateSelectionReadout);
  document.querySelectorAll("[data-type]").forEach(btn => btn.addEventListener("click", () => {
    const offsets = getSelectionOffsets();
    if (!offsets) {
      toast("Selecione um trecho da nota primeiro.");
      return;
    }
    addSpanToGold({ ...offsets, type: btn.dataset.type }, "manual");
    window.getSelection()?.removeAllRanges();
    updateSelectionReadout();
  }));
  byId("btn-use-exact").addEventListener("click", () => useSource("exact"));
  byId("btn-use-davi").addEventListener("click", () => useSource("davi"));
  byId("btn-use-alvaro").addEventListener("click", () => useSource("alvaro"));
  byId("btn-clear-note").addEventListener("click", () => {
    if (!window.confirm("Limpar o gold desta nota?")) return;
    const gold = currentGold();
    gold.spans = [];
    gold.status = "pending";
    gold.updated_at = nowISO();
    gold.decisions.push({ at: nowISO(), action: "clear_note" });
    saveState();
    renderCurrentNote();
  });
  byId("btn-review").addEventListener("click", setReviewed);
  byId("btn-prev").addEventListener("click", () => {
    state.noteIdx = (state.noteIdx + NOTES.length - 1) % NOTES.length;
    saveState();
    renderCurrentNote();
  });
  byId("btn-next").addEventListener("click", () => {
    state.noteIdx = (state.noteIdx + 1) % NOTES.length;
    saveState();
    renderCurrentNote();
  });
  byId("btn-next-open").addEventListener("click", nextPending);
  byId("btn-export").addEventListener("click", exportGold);
  byId("btn-export-audit").addEventListener("click", exportAuditCSV);
  byId("btn-import").addEventListener("click", () => byId("file-import").click());
  byId("file-import").addEventListener("change", e => {
    const file = e.target.files?.[0];
    if (file) importGold(file);
    e.target.value = "";
  });
}

function bootstrap() {
  if (!DATA || !NOTES.length) {
    document.body.innerHTML = "<p>Dados de adjudicação não encontrados.</p>";
    return;
  }
  loadState();
  setupEvents();
  renderCurrentNote();
}

bootstrap();
