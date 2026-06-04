---
title: PLN BIO Converter
sdk: docker
app_port: 7860
license: mit
---

# PLN BIO Converter

Deterministic converter from human span annotations with character offsets to BIO.

Primary endpoint:

```http
POST /convert
```

Payload shape:

```json
{
  "tokenizer": "spacy_pt",
  "include_offsets": true,
  "notes": [
    {
      "noteId": "123",
      "tweetId": "456",
      "text": "Texto da nota",
      "status": "completed",
      "spans": [
        {"type": "CLAIM", "text": "Texto", "start": 0, "end": 5}
      ]
    }
  ]
}
```

Output uses one note block per item. With `include_offsets=true`, rows are:

```text
token    start    end    BIO
```

The converter validates offsets, label types, exact span text recovery, and span overlap before writing BIO.
