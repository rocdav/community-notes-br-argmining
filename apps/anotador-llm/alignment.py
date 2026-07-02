"""Protocolo snippet -> offset em 4 niveis (identico ao sweep original, §3.2 da proposta).

O LLM devolve {"type": ..., "text": "substring exata"}, nunca offsets. Este
modulo re-localiza cada snippet no texto original, tentando em ordem: match
exato, normalizado por whitespace, normalizado por unicode (aspas curly,
travessoes, NBSP, NFKC) e por fim um regex relaxado token a token.
"""

from __future__ import annotations

import re
import unicodedata

UNICODE_TRANSLATION = str.maketrans({
    "“": '"', "”": '"', "„": '"', "«": '"', "»": '"',
    "‘": "'", "’": "'", "‚": "'",
    "–": "-", "—": "-", "−": "-",
    " ": " ",
})


def _normalize_spaces(s: str) -> str:
    return re.sub(r"\s+", " ", s).strip()


def _overlaps_used(start: int, end: int, used: list[tuple[int, int]]) -> bool:
    return any(not (end <= a or start >= b) for a, b in used)


def _find_literal(text: str, snippet: str, used: list[tuple[int, int]]):
    if not snippet:
        return None
    pos = text.find(snippet)
    while pos >= 0:
        end = pos + len(snippet)
        if not _overlaps_used(pos, end, used):
            return pos, end
        pos = text.find(snippet, pos + 1)
    return None


def _find_space_normalized(text: str, snippet: str, used: list[tuple[int, int]]):
    norm_snippet = _normalize_spaces(snippet)
    if not norm_snippet:
        return None
    chunks, mapping, in_space = [], [], False
    for i, ch in enumerate(text):
        if ch.isspace():
            if not in_space:
                chunks.append(" ")
                mapping.append(i)
                in_space = True
        else:
            chunks.append(ch)
            mapping.append(i)
            in_space = False
    full_norm = "".join(chunks)
    left_trim = len(full_norm) - len(full_norm.lstrip())
    norm_text = full_norm.strip()
    if left_trim:
        mapping = mapping[left_trim:]
    pos = norm_text.find(norm_snippet)
    while pos >= 0:
        start = mapping[pos]
        end = mapping[pos + len(norm_snippet) - 1] + 1
        if not _overlaps_used(start, end, used):
            return start, end
        pos = norm_text.find(norm_snippet, pos + 1)
    return None


def _normalize_unicode_with_map(s: str):
    out, mapping = [], []
    for i, ch in enumerate(s):
        translated = ch.translate(UNICODE_TRANSLATION)
        normalized = unicodedata.normalize("NFKC", translated)
        for out_ch in normalized:
            out.append(out_ch)
            mapping.append(i)
    return "".join(out), mapping


def _find_unicode_normalized(text: str, snippet: str, used: list[tuple[int, int]]):
    norm_text, mapping = _normalize_unicode_with_map(text)
    norm_snippet, _ = _normalize_unicode_with_map(snippet)
    norm_snippet_spaces = _normalize_spaces(norm_snippet)

    for needle in [norm_snippet, norm_snippet_spaces]:
        if not needle:
            continue
        pos = norm_text.find(needle)
        while pos >= 0:
            start = mapping[pos]
            end = mapping[pos + len(needle) - 1] + 1
            if not _overlaps_used(start, end, used):
                return start, end
            pos = norm_text.find(needle, pos + 1)

    compact, compact_map, in_space = [], [], False
    for j, ch in enumerate(norm_text):
        if ch.isspace():
            if not in_space:
                compact.append(" ")
                compact_map.append(mapping[j])
                in_space = True
        else:
            compact.append(ch)
            compact_map.append(mapping[j])
            in_space = False
    full_compact = "".join(compact)
    left_trim = len(full_compact) - len(full_compact.lstrip())
    compact_text = full_compact.strip()
    if left_trim:
        compact_map = compact_map[left_trim:]
    pos = compact_text.find(norm_snippet_spaces)
    while pos >= 0:
        start = compact_map[pos]
        end = compact_map[pos + len(norm_snippet_spaces) - 1] + 1
        if not _overlaps_used(start, end, used):
            return start, end
        pos = compact_text.find(norm_snippet_spaces, pos + 1)
    return None


def _find_regex_relaxed(text: str, snippet: str, used: list[tuple[int, int]]):
    words = re.findall(r"\w+", snippet, flags=re.UNICODE)
    if len(words) < 3:
        return None
    pattern = r"\W+".join(re.escape(w) for w in words[:12])
    try:
        regex = re.compile(pattern, re.I | re.S)
    except re.error:
        return None
    for m in regex.finditer(text):
        if not _overlaps_used(m.start(), m.end(), used):
            return m.start(), m.end()
    return None


def align_span_text(text: str, snippet: str, used: list[tuple[int, int]] | None = None) -> dict:
    used = used or []
    for level, finder in [
        ("exact", _find_literal),
        ("normalized", _find_space_normalized),
        ("unicode_normalized", _find_unicode_normalized),
        ("regex", _find_regex_relaxed),
    ]:
        found = finder(text, snippet, used)
        if found:
            return {"start": found[0], "end": found[1], "level": level}
    return {"start": None, "end": None, "level": "failed"}
