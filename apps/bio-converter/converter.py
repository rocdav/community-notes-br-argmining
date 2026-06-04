from __future__ import annotations

import re
from dataclasses import dataclass
from typing import Any


ALLOWED_TYPES = {"CLAIM", "EVIDENCIA", "FONTE", "QUALIFICADOR"}
CONVERTER_VERSION = "1.0.1"
REGEX_TOKENIZER_VERSION = "regex_v1"
SPACY_TOKENIZER_VERSION = "spacy_pt_blank_v1"


@dataclass(frozen=True)
class Token:
    text: str
    start: int
    end: int


@dataclass(frozen=True)
class NormalizedSpan:
    type: str
    text: str
    start: int
    end: int


HTML_ENTITY_ARTIFACT = re.compile(r"&(?:quot|amp|lt|gt|apos);?|(?:quot|amp|lt|gt|apos);")


def split_html_entity_artifacts(token: Token) -> list[Token]:
    """Keep encoded quote fragments from being glued to neighboring words."""
    pieces: list[Token] = []
    cursor = 0
    for match in HTML_ENTITY_ARTIFACT.finditer(token.text):
        if match.start() > cursor:
            pieces.append(
                Token(
                    token.text[cursor:match.start()],
                    token.start + cursor,
                    token.start + match.start(),
                )
            )
        pieces.append(
            Token(
                match.group(0),
                token.start + match.start(),
                token.start + match.end(),
            )
        )
        cursor = match.end()
    if cursor < len(token.text):
        pieces.append(Token(token.text[cursor:], token.start + cursor, token.end))
    return pieces or [token]


def tokenize_regex(text: str) -> list[Token]:
    pattern = re.compile(r"https?://\S+|www\.\S+|\w+(?:[-']\w+)*|[^\w\s]", re.UNICODE)
    return [Token(m.group(0), m.start(), m.end()) for m in pattern.finditer(text)]


def tokenize_spacy_pt(text: str) -> list[Token]:
    try:
        from spacy.lang.pt import Portuguese
    except Exception as exc:  # pragma: no cover - exercised in deployments without spaCy
        raise RuntimeError("Tokenizer spacy_pt requires spaCy installed.") from exc

    if not hasattr(tokenize_spacy_pt, "_nlp"):
        tokenize_spacy_pt._nlp = Portuguese()  # type: ignore[attr-defined]
    doc = tokenize_spacy_pt._nlp(text)  # type: ignore[attr-defined]
    tokens: list[Token] = []
    for tok in doc:
        tokens.extend(split_html_entity_artifacts(Token(tok.text, tok.idx, tok.idx + len(tok.text))))
    return tokens


def tokenize(text: str, tokenizer: str) -> tuple[list[Token], str]:
    if tokenizer == "spacy_pt":
        return tokenize_spacy_pt(text), SPACY_TOKENIZER_VERSION
    if tokenizer == "regex_v1":
        return tokenize_regex(text), REGEX_TOKENIZER_VERSION
    raise ValueError(f"Unsupported tokenizer: {tokenizer}")


def normalize_span(raw: dict[str, Any], text: str, note_id: str, span_idx: int) -> NormalizedSpan:
    span_type = raw.get("type")
    if span_type not in ALLOWED_TYPES:
        raise ValueError(f"{note_id}: span {span_idx} has invalid type {span_type!r}.")

    try:
        start = int(raw.get("start"))
        end = int(raw.get("end"))
    except Exception as exc:
        raise ValueError(f"{note_id}: span {span_idx} has non-integer offsets.") from exc

    if start < 0 or end <= start or end > len(text):
        raise ValueError(
            f"{note_id}: span {span_idx} offsets out of bounds "
            f"({start}, {end}) for text length {len(text)}."
        )

    span_text = raw.get("text")
    observed = text[start:end]
    if span_text is None:
        span_text = observed
    if observed != span_text:
        raise ValueError(
            f"{note_id}: span {span_idx} text mismatch at offsets "
            f"({start}, {end}). Expected {span_text!r}, observed {observed!r}."
        )

    return NormalizedSpan(type=span_type, text=span_text, start=start, end=end)


def normalize_spans(raw_spans: list[dict[str, Any]], text: str, note_id: str) -> list[NormalizedSpan]:
    spans = [normalize_span(raw, text, note_id, idx) for idx, raw in enumerate(raw_spans)]
    spans.sort(key=lambda s: (s.start, s.end, s.type))
    for prev, cur in zip(spans, spans[1:]):
        if prev.end > cur.start:
            raise ValueError(
                f"{note_id}: overlapping spans are not representable in simple BIO "
                f"({prev.start}, {prev.end}) and ({cur.start}, {cur.end})."
            )
    return spans


def project_bio(tokens: list[Token], spans: list[NormalizedSpan], note_id: str) -> tuple[list[str], list[str]]:
    labels = ["O"] * len(tokens)
    warnings: list[str] = []

    for span in spans:
        covered = [
            idx
            for idx, token in enumerate(tokens)
            if token.start < span.end and token.end > span.start
        ]
        if not covered:
            warnings.append(f"{note_id}: span ({span.start}, {span.end}) covers no token.")
            continue

        first = True
        for idx in covered:
            token = tokens[idx]
            if token.start < span.start or token.end > span.end:
                warnings.append(
                    f"{note_id}: token {token.text!r} ({token.start}, {token.end}) "
                    f"crosses span boundary ({span.start}, {span.end})."
                )
            if labels[idx] != "O":
                raise ValueError(
                    f"{note_id}: token {token.text!r} receives multiple labels "
                    f"({labels[idx]} and {span.type})."
                )
            prefix = "B" if first else "I"
            labels[idx] = f"{prefix}-{span.type}"
            first = False

    return labels, warnings


def convert_notes(
    notes: list[dict[str, Any]],
    *,
    tokenizer: str = "spacy_pt",
    include_offsets: bool = True,
) -> dict[str, Any]:
    all_blocks: list[str] = []
    errors: list[str] = []
    warnings: list[str] = []
    manifest = {
        "converter_version": CONVERTER_VERSION,
        "tokenizer": tokenizer,
        "tokenizer_version": None,
        "format": "BIO",
        "include_offsets": include_offsets,
        "notes_total": len(notes),
        "notes_converted": 0,
        "spans_total": 0,
        "tokens_total": 0,
        "labels": sorted(ALLOWED_TYPES),
    }

    for idx, note in enumerate(notes):
        note_id = str(note.get("noteId") or note.get("note_id") or idx + 1)
        text = note.get("text") if note.get("text") is not None else note.get("note_text")
        if not isinstance(text, str):
            errors.append(f"{note_id}: missing text/note_text.")
            continue

        raw_spans = note.get("spans") or []
        if not isinstance(raw_spans, list):
            errors.append(f"{note_id}: spans must be a list.")
            continue

        try:
            tokens, tokenizer_version = tokenize(text, tokenizer)
            manifest["tokenizer_version"] = tokenizer_version
            spans = normalize_spans(raw_spans, text, note_id)
            labels, note_warnings = project_bio(tokens, spans, note_id)
        except Exception as exc:
            errors.append(str(exc))
            continue

        warnings.extend(note_warnings)
        manifest["notes_converted"] += 1
        manifest["spans_total"] += len(spans)
        manifest["tokens_total"] += len(tokens)

        block = [
            f"# noteId = {note_id}",
            f"# status = {note.get('status', '')}",
            f"# spans = {len(spans)}",
        ]
        if note.get("tweetId") or note.get("tweet_id"):
            block.append(f"# tweetId = {note.get('tweetId') or note.get('tweet_id')}")

        for token, label in zip(tokens, labels):
            if include_offsets:
                block.append(f"{token.text}\t{token.start}\t{token.end}\t{label}")
            else:
                block.append(f"{token.text}\t{label}")
        all_blocks.append("\n".join(block))

    return {
        "ok": len(errors) == 0,
        "content": "\n\n".join(all_blocks) + ("\n" if all_blocks else ""),
        "manifest": manifest,
        "errors": errors,
        "warnings": warnings,
    }
