from __future__ import annotations

from datetime import datetime, timezone
from typing import Any, Literal

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import PlainTextResponse
from pydantic import BaseModel, Field

from converter import CONVERTER_VERSION, convert_notes


class ConvertRequest(BaseModel):
    notes: list[dict[str, Any]] = Field(default_factory=list)
    tokenizer: Literal["spacy_pt", "regex_v1"] = "spacy_pt"
    include_offsets: bool = True
    filename: str | None = None
    source: dict[str, Any] = Field(default_factory=dict)


app = FastAPI(
    title="PLN BIO Converter",
    version=CONVERTER_VERSION,
    description="Deterministic span-offset to BIO conversion for CN-BR annotations.",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)


@app.get("/")
def root() -> dict[str, Any]:
    return {
        "name": "PLN BIO Converter",
        "version": CONVERTER_VERSION,
        "endpoints": ["/health", "/convert", "/convert/download"],
    }


@app.get("/health")
def health() -> dict[str, Any]:
    return {
        "ok": True,
        "version": CONVERTER_VERSION,
        "time": datetime.now(timezone.utc).isoformat(),
    }


@app.post("/convert")
def convert(request: ConvertRequest) -> dict[str, Any]:
    if not request.notes:
        raise HTTPException(status_code=400, detail="Request must include at least one note.")

    result = convert_notes(
        request.notes,
        tokenizer=request.tokenizer,
        include_offsets=request.include_offsets,
    )
    result["filename"] = request.filename or "anotacao_bio.conll"
    result["source"] = request.source
    return result


@app.post("/convert/download", response_class=PlainTextResponse)
def convert_download(request: ConvertRequest) -> PlainTextResponse:
    result = convert(request)
    if not result["ok"]:
        raise HTTPException(status_code=422, detail={"errors": result["errors"], "warnings": result["warnings"]})
    filename = result["filename"]
    return PlainTextResponse(
        result["content"],
        media_type="text/plain; charset=utf-8",
        headers={"Content-Disposition": f'attachment; filename="{filename}"'},
    )
