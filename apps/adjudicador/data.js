window.ADJUDICACAO_DATA = {
  "schema_version": "1.0",
  "dataset_version": "v1.0",
  "guide_version": "1.0",
  "generated_at": "2026-07-02T21:59:47.302508+00:00",
  "source_files": {
    "notes": "apps/anotador/data.js",
    "davi": "data/gold/anotacao_manual_davi-machado-da-rocha_2026-05-20.json",
    "alvaro": "data/gold/anotacao_manual_alvaro-barros_2026-07-02.json"
  },
  "annotators": {
    "davi": {
      "nome": "Davi Machado da Rocha",
      "papel": "manual"
    },
    "alvaro": {
      "nome": "Alvaro Barros",
      "papel": "manual"
    }
  },
  "stats": {
    "notes": 60,
    "davi_spans": 101,
    "alvaro_spans": 217,
    "exact_agreement_spans": 31,
    "human_union_spans": 287,
    "notes_without_divergence": 11,
    "notes_with_divergence": 49
  },
  "notes": [
    {
      "order": 1,
      "noteId": "1761891434389475646",
      "tweetId": "1761802572082426158",
      "consenso": "NMR",
      "macrotheme_label": "",
      "tweet_text": "Aí a gente chama esses porras de fascistas e eles ficam putos, pq será né. https://t.co/qAKDMVsMCq",
      "note_text": "A bandeira conhecida como Gadsden não é um símbolo fascista, a alegação do autor da postagem parece sugerir que o evento no qual a bandeira está inserida é de cunho fascista. Algumas fontes tratam o movimento bolsonarista dessa forma.    https://noticias.uol.com.br/eleicoes/2022/08/29/deus-patria-familia-lema-de-bolsonaro-tem-origem-fascista-entenda.htm    https://www.ifch.unicamp.br/criticamarxista/arquivos_biblioteca/dossie2020_05_26_14_12_19.pdf    https://pt.wikipedia.org/wiki/Bandeira_de_Gadsden",
      "is_meta": false,
      "meta_reason": "",
      "human": {
        "davi": {
          "label": "Davi",
          "status": "completed",
          "obs": "",
          "spans": [
            {
              "id": "davi-0-59-CLAIM-0",
              "source_key": "davi",
              "source_label": "Davi",
              "type": "CLAIM",
              "start": 0,
              "end": 59,
              "text": "A bandeira conhecida como Gadsden não é um símbolo fascista"
            },
            {
              "id": "davi-61-173-EVIDENCIA-1",
              "source_key": "davi",
              "source_label": "Davi",
              "type": "EVIDENCIA",
              "start": 61,
              "end": 173,
              "text": "a alegação do autor da postagem parece sugerir que o evento no qual a bandeira está inserida é de cunho fascista"
            },
            {
              "id": "davi-175-233-FONTE-2",
              "source_key": "davi",
              "source_label": "Davi",
              "type": "FONTE",
              "start": 175,
              "end": 233,
              "text": "Algumas fontes tratam o movimento bolsonarista dessa forma"
            }
          ]
        },
        "alvaro": {
          "label": "Alvaro",
          "status": "completed",
          "obs": "",
          "spans": [
            {
              "id": "alvaro-0-59-EVIDENCIA-1",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "EVIDENCIA",
              "start": 0,
              "end": 59,
              "text": "A bandeira conhecida como Gadsden não é um símbolo fascista"
            },
            {
              "id": "alvaro-61-173-CLAIM-2",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "CLAIM",
              "start": 61,
              "end": 173,
              "text": "a alegação do autor da postagem parece sugerir que o evento no qual a bandeira está inserida é de cunho fascista"
            },
            {
              "id": "alvaro-238-355-FONTE-3",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 238,
              "end": 355,
              "text": "https://noticias.uol.com.br/eleicoes/2022/08/29/deus-patria-familia-lema-de-bolsonaro-tem-origem-fascista-entenda.htm"
            },
            {
              "id": "alvaro-359-505-FONTE-0",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 359,
              "end": 505,
              "text": "https://www.ifch.unicamp.br/criticamarxista/arquivos_biblioteca/dossie2020_05_26_14_12_19.pdf    https://pt.wikipedia.org/wiki/Bandeira_de_Gadsden"
            }
          ]
        }
      },
      "automatic": {
        "e1": [
          {
            "id": "e1-238-355-FONTE-0",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 238,
            "end": 355,
            "text": "https://noticias.uol.com.br/eleicoes/2022/08/29/deus-patria-familia-lema-de-bolsonaro-tem-origem-fascista-entenda.htm"
          },
          {
            "id": "e1-353-446-FONTE-1",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 353,
            "end": 446,
            "text": "tm    https://www.ifch.unicamp.br/criticamarxista/arquivos_biblioteca/dossie2020_05_26_14_12_"
          },
          {
            "id": "e1-447-496-FONTE-2",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 447,
            "end": 496,
            "text": "9.pdf    https://pt.wikipedia.org/wiki/Bandeira_d"
          }
        ],
        "e2": [
          {
            "id": "e2-0-59-CLAIM-0",
            "source_key": "e2",
            "source_label": "E2",
            "type": "CLAIM",
            "start": 0,
            "end": 59,
            "text": "A bandeira conhecida como Gadsden não é um símbolo fascista"
          },
          {
            "id": "e2-61-173-EVIDENCIA-1",
            "source_key": "e2",
            "source_label": "E2",
            "type": "EVIDENCIA",
            "start": 61,
            "end": 173,
            "text": "a alegação do autor da postagem parece sugerir que o evento no qual a bandeira está inserida é de cunho fascista"
          },
          {
            "id": "e2-175-233-FONTE-2",
            "source_key": "e2",
            "source_label": "E2",
            "type": "FONTE",
            "start": 175,
            "end": 233,
            "text": "Algumas fontes tratam o movimento bolsonarista dessa forma"
          }
        ]
      },
      "clusters": [
        {
          "id": "c1",
          "start": 0,
          "end": 59,
          "sources": [
            "alvaro",
            "davi"
          ],
          "types": [
            "CLAIM",
            "EVIDENCIA"
          ],
          "exact_agreements": [],
          "span_ids": [
            "davi-0-59-CLAIM-0",
            "alvaro-0-59-EVIDENCIA-1"
          ]
        },
        {
          "id": "c2",
          "start": 61,
          "end": 173,
          "sources": [
            "alvaro",
            "davi"
          ],
          "types": [
            "CLAIM",
            "EVIDENCIA"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-61-173-CLAIM-2",
            "davi-61-173-EVIDENCIA-1"
          ]
        },
        {
          "id": "c3",
          "start": 175,
          "end": 233,
          "sources": [
            "davi"
          ],
          "types": [
            "FONTE"
          ],
          "exact_agreements": [],
          "span_ids": [
            "davi-175-233-FONTE-2"
          ]
        },
        {
          "id": "c4",
          "start": 238,
          "end": 355,
          "sources": [
            "alvaro"
          ],
          "types": [
            "FONTE"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-238-355-FONTE-3"
          ]
        },
        {
          "id": "c5",
          "start": 359,
          "end": 505,
          "sources": [
            "alvaro"
          ],
          "types": [
            "FONTE"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-359-505-FONTE-0"
          ]
        }
      ],
      "exact_agreement": [],
      "counts": {
        "davi": 3,
        "alvaro": 4,
        "exact_agreement": 0,
        "human_union": 7
      }
    },
    {
      "order": 2,
      "noteId": "2007791917765943580",
      "tweetId": "2007455761329271133",
      "consenso": "NMR",
      "macrotheme_label": "",
      "tweet_text": "Ô Deus 🙏🏻 https://t.co/bltJ5RIIIt",
      "note_text": "É só zuera política da melhor qualidade, humor negro venezuelano-brasileiro.  É claramente satírico ou de brincadeira. (e das boas! 😂🇻🇪🇧🇷)  Quem achar que é real precisa urgente de mais contexto... ou de um café forte.",
      "is_meta": false,
      "meta_reason": "",
      "human": {
        "davi": {
          "label": "Davi",
          "status": "completed",
          "obs": "a nota não faz nenhuma argumentação, apenas explica que é sátira",
          "spans": []
        },
        "alvaro": {
          "label": "Alvaro",
          "status": "completed",
          "obs": "",
          "spans": []
        }
      },
      "automatic": {
        "e1": [
          {
            "id": "e1-133-218-EVIDENCIA-0",
            "source_key": "e1",
            "source_label": "E1",
            "type": "EVIDENCIA",
            "start": 133,
            "end": 218,
            "text": "🇻🇪🇧🇷)  Quem achar que é real precisa urgente de mais contexto... ou de um café forte."
          }
        ],
        "e2": [
          {
            "id": "e2-0-75-CLAIM-0",
            "source_key": "e2",
            "source_label": "E2",
            "type": "CLAIM",
            "start": 0,
            "end": 75,
            "text": "É só zuera política da melhor qualidade, humor negro venezuelano-brasileiro"
          },
          {
            "id": "e2-78-117-EVIDENCIA-1",
            "source_key": "e2",
            "source_label": "E2",
            "type": "EVIDENCIA",
            "start": 78,
            "end": 117,
            "text": "É claramente satírico ou de brincadeira"
          }
        ]
      },
      "clusters": [],
      "exact_agreement": [],
      "counts": {
        "davi": 0,
        "alvaro": 0,
        "exact_agreement": 0,
        "human_union": 0
      }
    },
    {
      "order": 3,
      "noteId": "2031096564928708748",
      "tweetId": "2031025999853359250",
      "consenso": "NMR",
      "macrotheme_label": "Crise Política",
      "tweet_text": "Quem insiste em cobrar “explicações” de Alexandre de Moraes sobre contratos profissionais do escritório de sua esposa com o Banco Master não está, na verdade, preocupado com transparência ou com o interesse público. \n\nO que se vê é uma tentativa clara de criar ruído político e https://t.co/Q0XYELPuXF",
      "note_text": "Há menos de 2 meses a jornalista afirmava que o contrato não existia, e desde as confirmações públicas está mudando a narrativa.     Contexto importante pois o banco envolvido está sob investigação de pagamento para influenciadores criticarem a operação em andamento.    https://x.com/i/status/2005466195328377102    https://share.google/vWYxFHxNqduk6unJV",
      "is_meta": false,
      "meta_reason": "",
      "human": {
        "davi": {
          "label": "Davi",
          "status": "completed",
          "obs": "",
          "spans": [
            {
              "id": "davi-0-68-EVIDENCIA-2",
              "source_key": "davi",
              "source_label": "Davi",
              "type": "EVIDENCIA",
              "start": 0,
              "end": 68,
              "text": "Há menos de 2 meses a jornalista afirmava que o contrato não existia"
            },
            {
              "id": "davi-70-127-EVIDENCIA-0",
              "source_key": "davi",
              "source_label": "Davi",
              "type": "EVIDENCIA",
              "start": 70,
              "end": 127,
              "text": "e desde as confirmações públicas está mudando a narrativa"
            },
            {
              "id": "davi-158-267-EVIDENCIA-1",
              "source_key": "davi",
              "source_label": "Davi",
              "type": "EVIDENCIA",
              "start": 158,
              "end": 267,
              "text": "o banco envolvido está sob investigação de pagamento para influenciadores criticarem a operação em andamento."
            }
          ]
        },
        "alvaro": {
          "label": "Alvaro",
          "status": "completed",
          "obs": "",
          "spans": [
            {
              "id": "alvaro-0-127-EVIDENCIA-0",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "EVIDENCIA",
              "start": 0,
              "end": 127,
              "text": "Há menos de 2 meses a jornalista afirmava que o contrato não existia, e desde as confirmações públicas está mudando a narrativa"
            },
            {
              "id": "alvaro-158-266-EVIDENCIA-2",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "EVIDENCIA",
              "start": 158,
              "end": 266,
              "text": "o banco envolvido está sob investigação de pagamento para influenciadores criticarem a operação em andamento"
            },
            {
              "id": "alvaro-271-355-FONTE-1",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 271,
              "end": 355,
              "text": "https://x.com/i/status/2005466195328377102    https://share.google/vWYxFHxNqduk6unJV"
            }
          ]
        }
      },
      "automatic": {
        "e1": [
          {
            "id": "e1-0-128-EVIDENCIA-0",
            "source_key": "e1",
            "source_label": "E1",
            "type": "EVIDENCIA",
            "start": 0,
            "end": 128,
            "text": "Há menos de 2 meses a jornalista afirmava que o contrato não existia, e desde as confirmações públicas está mudando a narrativa."
          },
          {
            "id": "e1-264-306-FONTE-1",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 264,
            "end": 306,
            "text": "to.    https://x.com/i/status/200546619532"
          },
          {
            "id": "e1-307-345-FONTE-2",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 307,
            "end": 345,
            "text": "377102    https://share.google/vWYxFHx"
          },
          {
            "id": "e1-317-355-FONTE-3",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 317,
            "end": 355,
            "text": "https://share.google/vWYxFHxNqduk6unJV"
          }
        ],
        "e2": [
          {
            "id": "e2-46-68-CLAIM-0",
            "source_key": "e2",
            "source_label": "E2",
            "type": "CLAIM",
            "start": 46,
            "end": 68,
            "text": "o contrato não existia"
          },
          {
            "id": "e2-158-266-EVIDENCIA-1",
            "source_key": "e2",
            "source_label": "E2",
            "type": "EVIDENCIA",
            "start": 158,
            "end": 266,
            "text": "o banco envolvido está sob investigação de pagamento para influenciadores criticarem a operação em andamento"
          }
        ]
      },
      "clusters": [
        {
          "id": "c1",
          "start": 0,
          "end": 127,
          "sources": [
            "alvaro",
            "davi"
          ],
          "types": [
            "EVIDENCIA"
          ],
          "exact_agreements": [],
          "span_ids": [
            "davi-0-68-EVIDENCIA-2",
            "alvaro-0-127-EVIDENCIA-0",
            "davi-70-127-EVIDENCIA-0"
          ]
        },
        {
          "id": "c2",
          "start": 158,
          "end": 267,
          "sources": [
            "alvaro",
            "davi"
          ],
          "types": [
            "EVIDENCIA"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-158-266-EVIDENCIA-2",
            "davi-158-267-EVIDENCIA-1"
          ]
        },
        {
          "id": "c3",
          "start": 271,
          "end": 355,
          "sources": [
            "alvaro"
          ],
          "types": [
            "FONTE"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-271-355-FONTE-1"
          ]
        }
      ],
      "exact_agreement": [],
      "counts": {
        "davi": 3,
        "alvaro": 3,
        "exact_agreement": 0,
        "human_union": 6
      }
    },
    {
      "order": 4,
      "noteId": "2022468950043316327",
      "tweetId": "2022066586673459365",
      "consenso": "NMR",
      "macrotheme_label": "Sátira de humorista",
      "tweet_text": "#mlbtwt #MLBS6Spoilers GENTE E O GLOOB NO INSTA QUE CANONIZOU #MARIGAMI E #LUKADRIAN https://t.co/Zs0EAqd7D0",
      "note_text": "A imagem foi alterada digitalmente.  A foto verdadeira pode ser encontrada no perfil oficial do mundo Gloob no Instagram     https://www.instagram.com/p/DUqX9gkjhWT/?igsh=MTc1aWl2Znk2bDMzeQ==",
      "is_meta": false,
      "meta_reason": "",
      "human": {
        "davi": {
          "label": "Davi",
          "status": "completed",
          "obs": "",
          "spans": [
            {
              "id": "davi-0-34-EVIDENCIA-0",
              "source_key": "davi",
              "source_label": "Davi",
              "type": "EVIDENCIA",
              "start": 0,
              "end": 34,
              "text": "A imagem foi alterada digitalmente"
            },
            {
              "id": "davi-78-120-FONTE-1",
              "source_key": "davi",
              "source_label": "Davi",
              "type": "FONTE",
              "start": 78,
              "end": 120,
              "text": "perfil oficial do mundo Gloob no Instagram"
            }
          ]
        },
        "alvaro": {
          "label": "Alvaro",
          "status": "completed",
          "obs": "",
          "spans": [
            {
              "id": "alvaro-0-34-EVIDENCIA-0",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "EVIDENCIA",
              "start": 0,
              "end": 34,
              "text": "A imagem foi alterada digitalmente"
            },
            {
              "id": "alvaro-37-120-EVIDENCIA-1",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "EVIDENCIA",
              "start": 37,
              "end": 120,
              "text": "A foto verdadeira pode ser encontrada no perfil oficial do mundo Gloob no Instagram"
            },
            {
              "id": "alvaro-125-191-FONTE-2",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 125,
              "end": 191,
              "text": "https://www.instagram.com/p/DUqX9gkjhWT/?igsh=MTc1aWl2Znk2bDMzeQ=="
            }
          ]
        }
      },
      "automatic": {
        "e1": [
          {
            "id": "e1-125-191-FONTE-0",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 125,
            "end": 191,
            "text": "https://www.instagram.com/p/DUqX9gkjhWT/?igsh=MTc1aWl2Znk2bDMzeQ=="
          }
        ],
        "e2": [
          {
            "id": "e2-0-34-EVIDENCIA-0",
            "source_key": "e2",
            "source_label": "E2",
            "type": "EVIDENCIA",
            "start": 0,
            "end": 34,
            "text": "A imagem foi alterada digitalmente"
          },
          {
            "id": "e2-78-120-FONTE-1",
            "source_key": "e2",
            "source_label": "E2",
            "type": "FONTE",
            "start": 78,
            "end": 120,
            "text": "perfil oficial do mundo Gloob no Instagram"
          }
        ]
      },
      "clusters": [
        {
          "id": "c1",
          "start": 0,
          "end": 34,
          "sources": [
            "alvaro",
            "davi"
          ],
          "types": [
            "EVIDENCIA"
          ],
          "exact_agreements": [
            {
              "start": 0,
              "end": 34,
              "type": "EVIDENCIA"
            }
          ],
          "span_ids": [
            "alvaro-0-34-EVIDENCIA-0",
            "davi-0-34-EVIDENCIA-0"
          ]
        },
        {
          "id": "c2",
          "start": 37,
          "end": 120,
          "sources": [
            "alvaro",
            "davi"
          ],
          "types": [
            "EVIDENCIA",
            "FONTE"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-37-120-EVIDENCIA-1",
            "davi-78-120-FONTE-1"
          ]
        },
        {
          "id": "c3",
          "start": 125,
          "end": 191,
          "sources": [
            "alvaro"
          ],
          "types": [
            "FONTE"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-125-191-FONTE-2"
          ]
        }
      ],
      "exact_agreement": [
        {
          "start": 0,
          "end": 34,
          "type": "EVIDENCIA",
          "text": "A imagem foi alterada digitalmente"
        }
      ],
      "counts": {
        "davi": 2,
        "alvaro": 3,
        "exact_agreement": 1,
        "human_union": 4
      }
    },
    {
      "order": 5,
      "noteId": "1787884933765022194",
      "tweetId": "1787865118035808658",
      "consenso": "NMR",
      "macrotheme_label": "Clima e Ambiente",
      "tweet_text": "Olha só gente: tenho diversos relatos de caminhões com doações sendo barrados de passar por questões tributárias, inclusive com autuação dos motoristas, etc.\n\nEstamos em contato com advogados e políticos da região para desembaraçar, mas é de cair o cu da bunda!\n\nDEIXEM AS DOAÇÕES CHEGAREM!!!",
      "note_text": "Informação FALSA.    A Sefaz-RS, e a Sefaz-SC, em nota publicada, afirmaram que veículos com doações para os atingidos pelas enchentes não estão sendo parados nas estradas e que suspendeu a fiscalização para facilitar a chegada de ajuda.    https://www.instagram.com/reel/C6lwPldOZz5/?utm_source=ig_embed&amp;ig_rid=dd2482f7-9d01-4784-85a1-6936980d0fce&amp;ig_mid=F6986190-5E84-47BE-B913-E35BBE8185DE    https://www.aosfatos.org/noticias/falso-doacoes-vitimas-enchente-barradas/    https://www.sef.sc.gov.br/noticias/nota-de-esclarecimento-transporte-de-doacoes-para-o-rs",
      "is_meta": false,
      "meta_reason": "",
      "human": {
        "davi": {
          "label": "Davi",
          "status": "completed",
          "obs": "",
          "spans": [
            {
              "id": "davi-21-64-FONTE-0",
              "source_key": "davi",
              "source_label": "Davi",
              "type": "FONTE",
              "start": 21,
              "end": 64,
              "text": "A Sefaz-RS, e a Sefaz-SC, em nota publicada"
            },
            {
              "id": "davi-66-236-EVIDENCIA-1",
              "source_key": "davi",
              "source_label": "Davi",
              "type": "EVIDENCIA",
              "start": 66,
              "end": 236,
              "text": "afirmaram que veículos com doações para os atingidos pelas enchentes não estão sendo parados nas estradas e que suspendeu a fiscalização para facilitar a chegada de ajuda"
            }
          ]
        },
        "alvaro": {
          "label": "Alvaro",
          "status": "completed",
          "obs": "",
          "spans": [
            {
              "id": "alvaro-0-16-EVIDENCIA-0",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "EVIDENCIA",
              "start": 0,
              "end": 16,
              "text": "Informação FALSA"
            },
            {
              "id": "alvaro-21-31-FONTE-1",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 21,
              "end": 31,
              "text": "A Sefaz-RS"
            },
            {
              "id": "alvaro-35-45-FONTE-2",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 35,
              "end": 45,
              "text": "a Sefaz-SC"
            },
            {
              "id": "alvaro-50-64-FONTE-3",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 50,
              "end": 64,
              "text": "nota publicada"
            },
            {
              "id": "alvaro-66-236-EVIDENCIA-4",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "EVIDENCIA",
              "start": 66,
              "end": 236,
              "text": "afirmaram que veículos com doações para os atingidos pelas enchentes não estão sendo parados nas estradas e que suspendeu a fiscalização para facilitar a chegada de ajuda"
            },
            {
              "id": "alvaro-241-400-FONTE-5",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 241,
              "end": 400,
              "text": "https://www.instagram.com/reel/C6lwPldOZz5/?utm_source=ig_embed&amp;ig_rid=dd2482f7-9d01-4784-85a1-6936980d0fce&amp;ig_mid=F6986190-5E84-47BE-B913-E35BBE8185DE"
            },
            {
              "id": "alvaro-404-478-FONTE-6",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 404,
              "end": 478,
              "text": "https://www.aosfatos.org/noticias/falso-doacoes-vitimas-enchente-barradas/"
            },
            {
              "id": "alvaro-482-571-FONTE-7",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 482,
              "end": 571,
              "text": "https://www.sef.sc.gov.br/noticias/nota-de-esclarecimento-transporte-de-doacoes-para-o-rs"
            }
          ]
        }
      },
      "automatic": {
        "e1": [
          {
            "id": "e1-235-394-FONTE-0",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 235,
            "end": 394,
            "text": "a.    https://www.instagram.com/reel/C6lwPldOZz5/?utm_source=ig_embed&amp;ig_rid=dd2482f7-9d01-4784-85a1-6936980d0fce&amp;ig_mid=F6986190-5E84-47BE-B913-E35BBE"
          },
          {
            "id": "e1-395-469-FONTE-1",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 395,
            "end": 469,
            "text": "185DE    https://www.aosfatos.org/noticias/falso-doacoes-vitimas-enchente-"
          },
          {
            "id": "e1-470-559-FONTE-2",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 470,
            "end": 559,
            "text": "arradas/    https://www.sef.sc.gov.br/noticias/nota-de-esclarecimento-transporte-de-doaco"
          }
        ],
        "e2": [
          {
            "id": "e2-21-64-FONTE-0",
            "source_key": "e2",
            "source_label": "E2",
            "type": "FONTE",
            "start": 21,
            "end": 64,
            "text": "A Sefaz-RS, e a Sefaz-SC, em nota publicada"
          },
          {
            "id": "e2-66-236-EVIDENCIA-1",
            "source_key": "e2",
            "source_label": "E2",
            "type": "EVIDENCIA",
            "start": 66,
            "end": 236,
            "text": "afirmaram que veículos com doações para os atingidos pelas enchentes não estão sendo parados nas estradas e que suspendeu a fiscalização para facilitar a chegada de ajuda"
          }
        ]
      },
      "clusters": [
        {
          "id": "c3",
          "start": 0,
          "end": 16,
          "sources": [
            "alvaro"
          ],
          "types": [
            "EVIDENCIA"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-0-16-EVIDENCIA-0"
          ]
        },
        {
          "id": "c1",
          "start": 21,
          "end": 64,
          "sources": [
            "alvaro",
            "davi"
          ],
          "types": [
            "FONTE"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-21-31-FONTE-1",
            "davi-21-64-FONTE-0",
            "alvaro-35-45-FONTE-2",
            "alvaro-50-64-FONTE-3"
          ]
        },
        {
          "id": "c2",
          "start": 66,
          "end": 236,
          "sources": [
            "alvaro",
            "davi"
          ],
          "types": [
            "EVIDENCIA"
          ],
          "exact_agreements": [
            {
              "start": 66,
              "end": 236,
              "type": "EVIDENCIA"
            }
          ],
          "span_ids": [
            "alvaro-66-236-EVIDENCIA-4",
            "davi-66-236-EVIDENCIA-1"
          ]
        },
        {
          "id": "c4",
          "start": 241,
          "end": 400,
          "sources": [
            "alvaro"
          ],
          "types": [
            "FONTE"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-241-400-FONTE-5"
          ]
        },
        {
          "id": "c5",
          "start": 404,
          "end": 478,
          "sources": [
            "alvaro"
          ],
          "types": [
            "FONTE"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-404-478-FONTE-6"
          ]
        },
        {
          "id": "c6",
          "start": 482,
          "end": 571,
          "sources": [
            "alvaro"
          ],
          "types": [
            "FONTE"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-482-571-FONTE-7"
          ]
        }
      ],
      "exact_agreement": [
        {
          "start": 66,
          "end": 236,
          "type": "EVIDENCIA",
          "text": "afirmaram que veículos com doações para os atingidos pelas enchentes não estão sendo parados nas estradas e que suspendeu a fiscalização para facilitar a chegada de ajuda"
        }
      ],
      "counts": {
        "davi": 2,
        "alvaro": 8,
        "exact_agreement": 1,
        "human_union": 9
      }
    },
    {
      "order": 6,
      "noteId": "1655712700171689984",
      "tweetId": "1655634632547659776",
      "consenso": "NMR",
      "macrotheme_label": "Cotas e Cortes no Ensino Superior",
      "tweet_text": "Na manhã desta Terça-Feira as 09:05 foi confirmado pela Globo News que o apresentador, empresário e filantropo; Silvio Santos teria falecido após sofrer um infarto em um dos banheiros de sua Mansão em Orlando. Silvio foi um apresentador e grande empresário.\n\nDescanse em paz! #rip https://t.co/dZaOOwaoGB",
      "note_text": "A assessoria de imprensa do SBT voltou a negar rumores de que o apresentador e empresário Silvio Santos teria falecido. &quot;Silvio Santos está bem graças a Deus, curtindo os netos, filhas, genros e esposa. Fake news é crime, pessoal&quot;, informou a nota. https://contigo.uol.com.br/noticias/famosos/sbt-se-pronuncia-sobre-possivel-morte-de-silvio-santos-em-comunicado-e-crime.phtml?utm_source=site&amp;utm_medium=txt&amp;utm_campaign=copypaste",
      "is_meta": false,
      "meta_reason": "",
      "human": {
        "davi": {
          "label": "Davi",
          "status": "completed",
          "obs": "",
          "spans": [
            {
              "id": "davi-0-31-FONTE-0",
              "source_key": "davi",
              "source_label": "Davi",
              "type": "FONTE",
              "start": 0,
              "end": 31,
              "text": "A assessoria de imprensa do SBT"
            },
            {
              "id": "davi-62-118-CLAIM-1",
              "source_key": "davi",
              "source_label": "Davi",
              "type": "CLAIM",
              "start": 62,
              "end": 118,
              "text": "o apresentador e empresário Silvio Santos teria falecido"
            },
            {
              "id": "davi-126-234-EVIDENCIA-2",
              "source_key": "davi",
              "source_label": "Davi",
              "type": "EVIDENCIA",
              "start": 126,
              "end": 234,
              "text": "Silvio Santos está bem graças a Deus, curtindo os netos, filhas, genros e esposa. Fake news é crime, pessoal"
            }
          ]
        },
        "alvaro": {
          "label": "Alvaro",
          "status": "completed",
          "obs": "",
          "spans": [
            {
              "id": "alvaro-0-31-FONTE-0",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 0,
              "end": 31,
              "text": "A assessoria de imprensa do SBT"
            },
            {
              "id": "alvaro-32-54-EVIDENCIA-1",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "EVIDENCIA",
              "start": 32,
              "end": 54,
              "text": "voltou a negar rumores"
            },
            {
              "id": "alvaro-62-118-CLAIM-2",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "CLAIM",
              "start": 62,
              "end": 118,
              "text": "o apresentador e empresário Silvio Santos teria falecido"
            },
            {
              "id": "alvaro-126-206-EVIDENCIA-3",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "EVIDENCIA",
              "start": 126,
              "end": 206,
              "text": "Silvio Santos está bem graças a Deus, curtindo os netos, filhas, genros e esposa"
            },
            {
              "id": "alvaro-259-447-FONTE-4",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 259,
              "end": 447,
              "text": "https://contigo.uol.com.br/noticias/famosos/sbt-se-pronuncia-sobre-possivel-morte-de-silvio-santos-em-comunicado-e-crime.phtml?utm_source=site&amp;utm_medium=txt&amp;utm_campaign=copypaste"
            }
          ]
        }
      },
      "automatic": {
        "e1": [
          {
            "id": "e1-28-31-FONTE-0",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 28,
            "end": 31,
            "text": "SBT"
          },
          {
            "id": "e1-259-447-FONTE-1",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 259,
            "end": 447,
            "text": "https://contigo.uol.com.br/noticias/famosos/sbt-se-pronuncia-sobre-possivel-morte-de-silvio-santos-em-comunicado-e-crime.phtml?utm_source=site&amp;utm_medium=txt&amp;utm_campaign=copypaste"
          }
        ],
        "e2": [
          {
            "id": "e2-0-31-FONTE-2",
            "source_key": "e2",
            "source_label": "E2",
            "type": "FONTE",
            "start": 0,
            "end": 31,
            "text": "A assessoria de imprensa do SBT"
          },
          {
            "id": "e2-47-118-CLAIM-0",
            "source_key": "e2",
            "source_label": "E2",
            "type": "CLAIM",
            "start": 47,
            "end": 118,
            "text": "rumores de que o apresentador e empresário Silvio Santos teria falecido"
          },
          {
            "id": "e2-120-240-EVIDENCIA-1",
            "source_key": "e2",
            "source_label": "E2",
            "type": "EVIDENCIA",
            "start": 120,
            "end": 240,
            "text": "&quot;Silvio Santos está bem graças a Deus, curtindo os netos, filhas, genros e esposa. Fake news é crime, pessoal&quot;"
          }
        ]
      },
      "clusters": [
        {
          "id": "c1",
          "start": 0,
          "end": 31,
          "sources": [
            "alvaro",
            "davi"
          ],
          "types": [
            "FONTE"
          ],
          "exact_agreements": [
            {
              "start": 0,
              "end": 31,
              "type": "FONTE"
            }
          ],
          "span_ids": [
            "alvaro-0-31-FONTE-0",
            "davi-0-31-FONTE-0"
          ]
        },
        {
          "id": "c4",
          "start": 32,
          "end": 54,
          "sources": [
            "alvaro"
          ],
          "types": [
            "EVIDENCIA"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-32-54-EVIDENCIA-1"
          ]
        },
        {
          "id": "c2",
          "start": 62,
          "end": 118,
          "sources": [
            "alvaro",
            "davi"
          ],
          "types": [
            "CLAIM"
          ],
          "exact_agreements": [
            {
              "start": 62,
              "end": 118,
              "type": "CLAIM"
            }
          ],
          "span_ids": [
            "alvaro-62-118-CLAIM-2",
            "davi-62-118-CLAIM-1"
          ]
        },
        {
          "id": "c3",
          "start": 126,
          "end": 234,
          "sources": [
            "alvaro",
            "davi"
          ],
          "types": [
            "EVIDENCIA"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-126-206-EVIDENCIA-3",
            "davi-126-234-EVIDENCIA-2"
          ]
        },
        {
          "id": "c5",
          "start": 259,
          "end": 447,
          "sources": [
            "alvaro"
          ],
          "types": [
            "FONTE"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-259-447-FONTE-4"
          ]
        }
      ],
      "exact_agreement": [
        {
          "start": 0,
          "end": 31,
          "type": "FONTE",
          "text": "A assessoria de imprensa do SBT"
        },
        {
          "start": 62,
          "end": 118,
          "type": "CLAIM",
          "text": "o apresentador e empresário Silvio Santos teria falecido"
        }
      ],
      "counts": {
        "davi": 3,
        "alvaro": 5,
        "exact_agreement": 2,
        "human_union": 6
      }
    },
    {
      "order": 7,
      "noteId": "2035165855806259553",
      "tweetId": "2034720077527097467",
      "consenso": "NMR",
      "macrotheme_label": "",
      "tweet_text": "sobre a lei eca digital https://t.co/lJ5Qfaxb80",
      "note_text": "As threads, artigos e posts abaixo REFUTAM o que foi dito no vídeo, QUESTIONAM A IDONEIDADE e PROBIDADE do Felca e mostram as CONTRADIÇÕES entre seus atos e palavras e a realidade:    https://x.com/ayubio/status/2032892759946965027  https://x.com/ayubio/status/2033897573526696016    https://x.com/LEME12/status/2019072905435341087  https://x.com/LEME12/status/2034734512530153886    https://x.com/FSU_BR/status/2033540902287728718    https://x.com/FelipeTadewald/status/2033915000700461569    https://x.com/pierre_160754/status/2034282855208010147    https://x.com/5elemento/status/2026442347253256693    https://x.com/PatriaVisao/status/2034751268359405896  https://x.com/PatriaVisao/status/2034751562426233195  https://x.com/PatriaVisao/status/2034752389278757275    https://x.com/PatriaVisao/status/2034752839344591067  https://x.com/PatriaVisao/status/1957445752923234659    https://x.com/PatriaVisao/status/2034753172820963797  https://x.com/PatriaVisao/status/1957448472799400205    https://x.com/PatriaVisao/status/2034611981399810124    https://x.com/thairizard/status/2034747811112059204    https://x.com/Rafuxvideos/status/2034724408217030798    https://x.com/schmittpaula/status/2034193028693307891    https://x.com/Byanu/status/2034633934454333589    https://x.com/david_agape_/status/1957929503419969948  https://www.ainvestigacao.com/p/adultizacao-judiario-e-governo-lula    https://x.com/giuargolo/status/2035062898502893738    https://x.com/pingandosangue/status/2034749129021145558",
      "is_meta": false,
      "meta_reason": "",
      "human": {
        "davi": {
          "label": "Davi",
          "status": "completed",
          "obs": "estruturas não argumentativas ou somente informativas/meta",
          "spans": []
        },
        "alvaro": {
          "label": "Alvaro",
          "status": "completed",
          "obs": "",
          "spans": [
            {
              "id": "alvaro-0-10-FONTE-0",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 0,
              "end": 10,
              "text": "As threads"
            },
            {
              "id": "alvaro-12-19-FONTE-1",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 12,
              "end": 19,
              "text": "artigos"
            },
            {
              "id": "alvaro-22-34-FONTE-2",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 22,
              "end": 34,
              "text": "posts abaixo"
            },
            {
              "id": "alvaro-35-179-EVIDENCIA-3",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "EVIDENCIA",
              "start": 35,
              "end": 179,
              "text": "REFUTAM o que foi dito no vídeo, QUESTIONAM A IDONEIDADE e PROBIDADE do Felca e mostram as CONTRADIÇÕES entre seus atos e palavras e a realidade"
            },
            {
              "id": "alvaro-184-231-FONTE-4",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 184,
              "end": 231,
              "text": "https://x.com/ayubio/status/2032892759946965027"
            },
            {
              "id": "alvaro-233-280-FONTE-5",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 233,
              "end": 280,
              "text": "https://x.com/ayubio/status/2033897573526696016"
            },
            {
              "id": "alvaro-284-331-FONTE-6",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 284,
              "end": 331,
              "text": "https://x.com/LEME12/status/2019072905435341087"
            },
            {
              "id": "alvaro-333-380-FONTE-7",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 333,
              "end": 380,
              "text": "https://x.com/LEME12/status/2034734512530153886"
            },
            {
              "id": "alvaro-384-431-FONTE-8",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 384,
              "end": 431,
              "text": "https://x.com/FSU_BR/status/2033540902287728718"
            },
            {
              "id": "alvaro-435-490-FONTE-9",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 435,
              "end": 490,
              "text": "https://x.com/FelipeTadewald/status/2033915000700461569"
            },
            {
              "id": "alvaro-494-548-FONTE-10",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 494,
              "end": 548,
              "text": "https://x.com/pierre_160754/status/2034282855208010147"
            },
            {
              "id": "alvaro-552-602-FONTE-11",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 552,
              "end": 602,
              "text": "https://x.com/5elemento/status/2026442347253256693"
            },
            {
              "id": "alvaro-606-658-FONTE-12",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 606,
              "end": 658,
              "text": "https://x.com/PatriaVisao/status/2034751268359405896"
            },
            {
              "id": "alvaro-660-712-FONTE-13",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 660,
              "end": 712,
              "text": "https://x.com/PatriaVisao/status/2034751562426233195"
            },
            {
              "id": "alvaro-714-766-FONTE-14",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 714,
              "end": 766,
              "text": "https://x.com/PatriaVisao/status/2034752389278757275"
            },
            {
              "id": "alvaro-770-822-FONTE-15",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 770,
              "end": 822,
              "text": "https://x.com/PatriaVisao/status/2034752839344591067"
            },
            {
              "id": "alvaro-824-876-FONTE-16",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 824,
              "end": 876,
              "text": "https://x.com/PatriaVisao/status/1957445752923234659"
            },
            {
              "id": "alvaro-880-932-FONTE-17",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 880,
              "end": 932,
              "text": "https://x.com/PatriaVisao/status/2034753172820963797"
            },
            {
              "id": "alvaro-934-986-FONTE-18",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 934,
              "end": 986,
              "text": "https://x.com/PatriaVisao/status/1957448472799400205"
            },
            {
              "id": "alvaro-990-1042-FONTE-19",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 990,
              "end": 1042,
              "text": "https://x.com/PatriaVisao/status/2034611981399810124"
            },
            {
              "id": "alvaro-1046-1097-FONTE-20",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 1046,
              "end": 1097,
              "text": "https://x.com/thairizard/status/2034747811112059204"
            },
            {
              "id": "alvaro-1101-1153-FONTE-21",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 1101,
              "end": 1153,
              "text": "https://x.com/Rafuxvideos/status/2034724408217030798"
            },
            {
              "id": "alvaro-1157-1210-FONTE-22",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 1157,
              "end": 1210,
              "text": "https://x.com/schmittpaula/status/2034193028693307891"
            },
            {
              "id": "alvaro-1214-1260-FONTE-23",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 1214,
              "end": 1260,
              "text": "https://x.com/Byanu/status/2034633934454333589"
            },
            {
              "id": "alvaro-1264-1317-FONTE-24",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 1264,
              "end": 1317,
              "text": "https://x.com/david_agape_/status/1957929503419969948"
            },
            {
              "id": "alvaro-1319-1386-FONTE-25",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 1319,
              "end": 1386,
              "text": "https://www.ainvestigacao.com/p/adultizacao-judiario-e-governo-lula"
            },
            {
              "id": "alvaro-1390-1440-FONTE-26",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 1390,
              "end": 1440,
              "text": "https://x.com/giuargolo/status/2035062898502893738"
            },
            {
              "id": "alvaro-1444-1499-FONTE-27",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 1444,
              "end": 1499,
              "text": "https://x.com/pingandosangue/status/2034749129021145558"
            }
          ]
        }
      },
      "automatic": {
        "e1": [
          {
            "id": "e1-45-66-EVIDENCIA-0",
            "source_key": "e1",
            "source_label": "E1",
            "type": "EVIDENCIA",
            "start": 45,
            "end": 66,
            "text": "que foi dito no vídeo"
          },
          {
            "id": "e1-79-1097-EVIDENCIA-1",
            "source_key": "e1",
            "source_label": "E1",
            "type": "EVIDENCIA",
            "start": 79,
            "end": 1097,
            "text": "A IDONEIDADE e PROBIDADE do Felca e mostram as CONTRADIÇÕES entre seus atos e palavras e a realidade:    https://x.com/ayubio/status/2032892759946965027  https://x.com/ayubio/status/2033897573526696016    https://x.com/LEME12/status/2019072905435341087  https://x.com/LEME12/status/2034734512530153886    https://x.com/FSU_BR/status/2033540902287728718    https://x.com/FelipeTadewald/status/2033915000700461569    https://x.com/pierre_160754/status/2034282855208010147    https://x.com/5elemento/status/2026442347253256693    https://x.com/PatriaVisao/status/2034751268359405896  https://x.com/PatriaVisao/status/2034751562426233195  https://x.com/PatriaVisao/status/2034752389278757275    https://x.com/PatriaVisao/status/2034752839344591067  https://x.com/PatriaVisao/status/1957445752923234659    https://x.com/PatriaVisao/status/2034753172820963797  https://x.com/PatriaVisao/status/1957448472799400205    https://x.com/PatriaVisao/status/2034611981399810124    https://x.com/thairizard/status/2034747811112059204"
          },
          {
            "id": "e1-184-231-FONTE-2",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 184,
            "end": 231,
            "text": "https://x.com/ayubio/status/2032892759946965027"
          },
          {
            "id": "e1-229-276-FONTE-3",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 229,
            "end": 276,
            "text": "27  https://x.com/ayubio/status/203389757352669"
          },
          {
            "id": "e1-277-324-FONTE-4",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 277,
            "end": 324,
            "text": "016    https://x.com/LEME12/status/201907290543"
          },
          {
            "id": "e1-325-372-FONTE-5",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 325,
            "end": 372,
            "text": "341087  https://x.com/LEME12/status/20347345125"
          },
          {
            "id": "e1-373-420-FONTE-6",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 373,
            "end": 420,
            "text": "0153886    https://x.com/FSU_BR/status/20335409"
          },
          {
            "id": "e1-384-431-FONTE-7",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 384,
            "end": 431,
            "text": "https://x.com/FSU_BR/status/2033540902287728718"
          },
          {
            "id": "e1-421-476-FONTE-8",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 421,
            "end": 476,
            "text": "2287728718    https://x.com/FelipeTadewald/status/20339"
          },
          {
            "id": "e1-435-490-FONTE-9",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 435,
            "end": 490,
            "text": "https://x.com/FelipeTadewald/status/2033915000700461569"
          },
          {
            "id": "e1-477-531-FONTE-10",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 477,
            "end": 531,
            "text": "5000700461569    https://x.com/pierre_160754/status/20"
          },
          {
            "id": "e1-494-548-FONTE-11",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 494,
            "end": 548,
            "text": "https://x.com/pierre_160754/status/2034282855208010147"
          },
          {
            "id": "e1-532-582-FONTE-12",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 532,
            "end": 582,
            "text": "4282855208010147    https://x.com/5elemento/status"
          },
          {
            "id": "e1-552-602-FONTE-13",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 552,
            "end": 602,
            "text": "https://x.com/5elemento/status/2026442347253256693"
          },
          {
            "id": "e1-583-635-FONTE-14",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 583,
            "end": 635,
            "text": "2026442347253256693    https://x.com/PatriaVisao/sta"
          },
          {
            "id": "e1-606-658-FONTE-15",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 606,
            "end": 658,
            "text": "https://x.com/PatriaVisao/status/2034751268359405896"
          },
          {
            "id": "e1-636-688-FONTE-16",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 636,
            "end": 688,
            "text": "us/2034751268359405896  https://x.com/PatriaVisao/st"
          },
          {
            "id": "e1-660-712-FONTE-17",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 660,
            "end": 712,
            "text": "https://x.com/PatriaVisao/status/2034751562426233195"
          },
          {
            "id": "e1-689-741-FONTE-18",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 689,
            "end": 741,
            "text": "tus/2034751562426233195  https://x.com/PatriaVisao/s"
          },
          {
            "id": "e1-714-766-FONTE-19",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 714,
            "end": 766,
            "text": "https://x.com/PatriaVisao/status/2034752389278757275"
          },
          {
            "id": "e1-742-794-FONTE-20",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 742,
            "end": 794,
            "text": "atus/2034752389278757275    https://x.com/PatriaVisa"
          },
          {
            "id": "e1-770-822-FONTE-21",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 770,
            "end": 822,
            "text": "https://x.com/PatriaVisao/status/2034752839344591067"
          },
          {
            "id": "e1-795-847-FONTE-22",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 795,
            "end": 847,
            "text": "/status/2034752839344591067  https://x.com/PatriaVis"
          },
          {
            "id": "e1-824-876-FONTE-23",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 824,
            "end": 876,
            "text": "https://x.com/PatriaVisao/status/1957445752923234659"
          },
          {
            "id": "e1-848-900-FONTE-24",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 848,
            "end": 900,
            "text": "o/status/1957445752923234659    https://x.com/Patria"
          },
          {
            "id": "e1-880-932-FONTE-25",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 880,
            "end": 932,
            "text": "https://x.com/PatriaVisao/status/2034753172820963797"
          },
          {
            "id": "e1-901-953-FONTE-26",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 901,
            "end": 953,
            "text": "isao/status/2034753172820963797  https://x.com/Patri"
          },
          {
            "id": "e1-934-986-FONTE-27",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 934,
            "end": 986,
            "text": "https://x.com/PatriaVisao/status/1957448472799400205"
          },
          {
            "id": "e1-954-1006-FONTE-28",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 954,
            "end": 1006,
            "text": "Visao/status/1957448472799400205    https://x.com/Pa"
          },
          {
            "id": "e1-990-1042-FONTE-29",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 990,
            "end": 1042,
            "text": "https://x.com/PatriaVisao/status/2034611981399810124"
          },
          {
            "id": "e1-1007-1058-FONTE-30",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 1007,
            "end": 1058,
            "text": "riaVisao/status/2034611981399810124    https://x.co"
          },
          {
            "id": "e1-1046-1097-FONTE-31",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 1046,
            "end": 1097,
            "text": "https://x.com/thairizard/status/2034747811112059204"
          },
          {
            "id": "e1-1059-1110-FONTE-32",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 1059,
            "end": 1110,
            "text": "/thairizard/status/2034747811112059204    https://x"
          },
          {
            "id": "e1-1101-1153-FONTE-33",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 1101,
            "end": 1153,
            "text": "https://x.com/Rafuxvideos/status/2034724408217030798"
          },
          {
            "id": "e1-1112-1165-FONTE-34",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 1112,
            "end": 1165,
            "text": "om/Rafuxvideos/status/2034724408217030798    https://"
          },
          {
            "id": "e1-1157-1210-FONTE-35",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 1157,
            "end": 1210,
            "text": "https://x.com/schmittpaula/status/2034193028693307891"
          },
          {
            "id": "e1-1214-1260-FONTE-36",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 1214,
            "end": 1260,
            "text": "https://x.com/Byanu/status/2034633934454333589"
          },
          {
            "id": "e1-1264-1317-FONTE-37",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 1264,
            "end": 1317,
            "text": "https://x.com/david_agape_/status/1957929503419969948"
          },
          {
            "id": "e1-1267-1334-FONTE-38",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 1267,
            "end": 1334,
            "text": "ps://x.com/david_agape_/status/1957929503419969948  https://www.ain"
          },
          {
            "id": "e1-1319-1386-FONTE-39",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 1319,
            "end": 1386,
            "text": "https://www.ainvestigacao.com/p/adultizacao-judiario-e-governo-lula"
          },
          {
            "id": "e1-1335-1385-FONTE-40",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 1335,
            "end": 1385,
            "text": "estigacao.com/p/adultizacao-judiario-e-governo-lul"
          },
          {
            "id": "e1-1390-1440-FONTE-41",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 1390,
            "end": 1440,
            "text": "https://x.com/giuargolo/status/2035062898502893738"
          },
          {
            "id": "e1-1444-1499-FONTE-42",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 1444,
            "end": 1499,
            "text": "https://x.com/pingandosangue/status/2034749129021145558"
          }
        ],
        "e2": [
          {
            "id": "e2-43-66-CLAIM-0",
            "source_key": "e2",
            "source_label": "E2",
            "type": "CLAIM",
            "start": 43,
            "end": 66,
            "text": "o que foi dito no vídeo"
          }
        ]
      },
      "clusters": [
        {
          "id": "c1",
          "start": 0,
          "end": 10,
          "sources": [
            "alvaro"
          ],
          "types": [
            "FONTE"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-0-10-FONTE-0"
          ]
        },
        {
          "id": "c2",
          "start": 12,
          "end": 19,
          "sources": [
            "alvaro"
          ],
          "types": [
            "FONTE"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-12-19-FONTE-1"
          ]
        },
        {
          "id": "c3",
          "start": 22,
          "end": 34,
          "sources": [
            "alvaro"
          ],
          "types": [
            "FONTE"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-22-34-FONTE-2"
          ]
        },
        {
          "id": "c4",
          "start": 35,
          "end": 179,
          "sources": [
            "alvaro"
          ],
          "types": [
            "EVIDENCIA"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-35-179-EVIDENCIA-3"
          ]
        },
        {
          "id": "c5",
          "start": 184,
          "end": 231,
          "sources": [
            "alvaro"
          ],
          "types": [
            "FONTE"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-184-231-FONTE-4"
          ]
        },
        {
          "id": "c6",
          "start": 233,
          "end": 280,
          "sources": [
            "alvaro"
          ],
          "types": [
            "FONTE"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-233-280-FONTE-5"
          ]
        },
        {
          "id": "c7",
          "start": 284,
          "end": 331,
          "sources": [
            "alvaro"
          ],
          "types": [
            "FONTE"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-284-331-FONTE-6"
          ]
        },
        {
          "id": "c8",
          "start": 333,
          "end": 380,
          "sources": [
            "alvaro"
          ],
          "types": [
            "FONTE"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-333-380-FONTE-7"
          ]
        },
        {
          "id": "c9",
          "start": 384,
          "end": 431,
          "sources": [
            "alvaro"
          ],
          "types": [
            "FONTE"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-384-431-FONTE-8"
          ]
        },
        {
          "id": "c10",
          "start": 435,
          "end": 490,
          "sources": [
            "alvaro"
          ],
          "types": [
            "FONTE"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-435-490-FONTE-9"
          ]
        },
        {
          "id": "c11",
          "start": 494,
          "end": 548,
          "sources": [
            "alvaro"
          ],
          "types": [
            "FONTE"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-494-548-FONTE-10"
          ]
        },
        {
          "id": "c12",
          "start": 552,
          "end": 602,
          "sources": [
            "alvaro"
          ],
          "types": [
            "FONTE"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-552-602-FONTE-11"
          ]
        },
        {
          "id": "c13",
          "start": 606,
          "end": 658,
          "sources": [
            "alvaro"
          ],
          "types": [
            "FONTE"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-606-658-FONTE-12"
          ]
        },
        {
          "id": "c14",
          "start": 660,
          "end": 712,
          "sources": [
            "alvaro"
          ],
          "types": [
            "FONTE"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-660-712-FONTE-13"
          ]
        },
        {
          "id": "c15",
          "start": 714,
          "end": 766,
          "sources": [
            "alvaro"
          ],
          "types": [
            "FONTE"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-714-766-FONTE-14"
          ]
        },
        {
          "id": "c16",
          "start": 770,
          "end": 822,
          "sources": [
            "alvaro"
          ],
          "types": [
            "FONTE"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-770-822-FONTE-15"
          ]
        },
        {
          "id": "c17",
          "start": 824,
          "end": 876,
          "sources": [
            "alvaro"
          ],
          "types": [
            "FONTE"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-824-876-FONTE-16"
          ]
        },
        {
          "id": "c18",
          "start": 880,
          "end": 932,
          "sources": [
            "alvaro"
          ],
          "types": [
            "FONTE"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-880-932-FONTE-17"
          ]
        },
        {
          "id": "c19",
          "start": 934,
          "end": 986,
          "sources": [
            "alvaro"
          ],
          "types": [
            "FONTE"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-934-986-FONTE-18"
          ]
        },
        {
          "id": "c20",
          "start": 990,
          "end": 1042,
          "sources": [
            "alvaro"
          ],
          "types": [
            "FONTE"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-990-1042-FONTE-19"
          ]
        },
        {
          "id": "c21",
          "start": 1046,
          "end": 1097,
          "sources": [
            "alvaro"
          ],
          "types": [
            "FONTE"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-1046-1097-FONTE-20"
          ]
        },
        {
          "id": "c22",
          "start": 1101,
          "end": 1153,
          "sources": [
            "alvaro"
          ],
          "types": [
            "FONTE"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-1101-1153-FONTE-21"
          ]
        },
        {
          "id": "c23",
          "start": 1157,
          "end": 1210,
          "sources": [
            "alvaro"
          ],
          "types": [
            "FONTE"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-1157-1210-FONTE-22"
          ]
        },
        {
          "id": "c24",
          "start": 1214,
          "end": 1260,
          "sources": [
            "alvaro"
          ],
          "types": [
            "FONTE"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-1214-1260-FONTE-23"
          ]
        },
        {
          "id": "c25",
          "start": 1264,
          "end": 1317,
          "sources": [
            "alvaro"
          ],
          "types": [
            "FONTE"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-1264-1317-FONTE-24"
          ]
        },
        {
          "id": "c26",
          "start": 1319,
          "end": 1386,
          "sources": [
            "alvaro"
          ],
          "types": [
            "FONTE"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-1319-1386-FONTE-25"
          ]
        },
        {
          "id": "c27",
          "start": 1390,
          "end": 1440,
          "sources": [
            "alvaro"
          ],
          "types": [
            "FONTE"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-1390-1440-FONTE-26"
          ]
        },
        {
          "id": "c28",
          "start": 1444,
          "end": 1499,
          "sources": [
            "alvaro"
          ],
          "types": [
            "FONTE"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-1444-1499-FONTE-27"
          ]
        }
      ],
      "exact_agreement": [],
      "counts": {
        "davi": 0,
        "alvaro": 28,
        "exact_agreement": 0,
        "human_union": 28
      }
    },
    {
      "order": 8,
      "noteId": "1815075511498092968",
      "tweetId": "1814799015957164386",
      "consenso": "NMR",
      "macrotheme_label": "Ataques e Conflitos",
      "tweet_text": "Eu quero que meus eleitores saibam que o @GuilhermeBoulos é meu candidato em São Paulo. Quero que os adversários saibam que ele é meu candidato. Com Boulos eleito, vamos poder dizer que nunca mais os fascistas vão governar essa cidade e esse país.",
      "note_text": "Lula acusa adversários de fascismo, mas ignora o contexto de ter um longo histórico de boas relações com ditadores, autocratas e extremistas, além de confessar admiração por Hitler e Komeini. Apenas se aproximando de democracias de seu espectro político    https://www1.folha.uol.com.br/fsp/1994/4/21/brasil/10.html  https://noticias.r7.com/internacional/grupo-terrorista-palestino-hamas-parabeniza-lula-por-vitoria-nas-eleicoes-01112022  https://www.metropoles.com/mundo/hamas-agradece-lula-por-comparacao  https://apnews.com/article/business-middle-east-israel-foreign-aid-gaza-strip-611b2b90c3a211f21185d59f4fae6a90  https://www.msn.com/en-ph/news/world/brazil-view-on-immunity-for-heads-of-state-could-favor-putin-at-g20-summit/ar-BB1kXCbF  https://oglobo.globo.com/mundo/em-ramallah-lula-diz-que-aceita-conversar-com-hamas-sugere-que-crise-entre-eua-israel-3038189  https://veja.abril.com.br/coluna/reinaldo/as-farc-saudam-a-eleicao-de-lula-e-dizem-ter-apoio-do-governo-do-brasil/  https://www.terra.com.br/noticias/mundo/oriente-medio/lula-sanciona-ajuda-de-r-25-milhoes-para-a-faixa-de-gaza,4eab78c65940b310VgnCLD200000bbcceb0aRCRD.html  https://www.theguardian.com/world/2023/sep/11/lula-putin-g20-brazil-arrest  https://www.diplomaticourier.com/posts/lulas-dance-with-dictators  https://www.aljazeera.com/news/2023/5/29/venezuelas-maduro-meets-lula-in-brazil-as-relations-improve  https://www1.folha.uol.com.br/internacional/en/world/2023/05/lula-praises-meeting-with-dictator-nicolas-maduro.shtml  https://www.aljazeera.com/news/2024/2/17/which-countries-are-still-funding-unrwa",
      "is_meta": false,
      "meta_reason": "",
      "human": {
        "davi": {
          "label": "Davi",
          "status": "completed",
          "obs": "",
          "spans": [
            {
              "id": "davi-0-34-CLAIM-0",
              "source_key": "davi",
              "source_label": "Davi",
              "type": "CLAIM",
              "start": 0,
              "end": 34,
              "text": "Lula acusa adversários de fascismo"
            },
            {
              "id": "davi-40-140-EVIDENCIA-1",
              "source_key": "davi",
              "source_label": "Davi",
              "type": "EVIDENCIA",
              "start": 40,
              "end": 140,
              "text": "ignora o contexto de ter um longo histórico de boas relações com ditadores, autocratas e extremistas"
            },
            {
              "id": "davi-150-190-EVIDENCIA-2",
              "source_key": "davi",
              "source_label": "Davi",
              "type": "EVIDENCIA",
              "start": 150,
              "end": 190,
              "text": "confessar admiração por Hitler e Komeini"
            },
            {
              "id": "davi-192-216-QUALIFICADOR-3",
              "source_key": "davi",
              "source_label": "Davi",
              "type": "QUALIFICADOR",
              "start": 192,
              "end": 216,
              "text": "Apenas se aproximando de"
            },
            {
              "id": "davi-217-253-EVIDENCIA-4",
              "source_key": "davi",
              "source_label": "Davi",
              "type": "EVIDENCIA",
              "start": 217,
              "end": 253,
              "text": "democracias de seu espectro político"
            }
          ]
        },
        "alvaro": {
          "label": "Alvaro",
          "status": "completed",
          "obs": "",
          "spans": [
            {
              "id": "alvaro-0-34-CLAIM-0",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "CLAIM",
              "start": 0,
              "end": 34,
              "text": "Lula acusa adversários de fascismo"
            },
            {
              "id": "alvaro-36-190-EVIDENCIA-1",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "EVIDENCIA",
              "start": 36,
              "end": 190,
              "text": "mas ignora o contexto de ter um longo histórico de boas relações com ditadores, autocratas e extremistas, além de confessar admiração por Hitler e Komeini"
            },
            {
              "id": "alvaro-192-216-QUALIFICADOR-2",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "QUALIFICADOR",
              "start": 192,
              "end": 216,
              "text": "Apenas se aproximando de"
            },
            {
              "id": "alvaro-217-253-EVIDENCIA-3",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "EVIDENCIA",
              "start": 217,
              "end": 253,
              "text": "democracias de seu espectro político"
            },
            {
              "id": "alvaro-257-315-FONTE-4",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 257,
              "end": 315,
              "text": "https://www1.folha.uol.com.br/fsp/1994/4/21/brasil/10.html"
            },
            {
              "id": "alvaro-317-437-FONTE-5",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 317,
              "end": 437,
              "text": "https://noticias.r7.com/internacional/grupo-terrorista-palestino-hamas-parabeniza-lula-por-vitoria-nas-eleicoes-01112022"
            },
            {
              "id": "alvaro-439-506-FONTE-6",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 439,
              "end": 506,
              "text": "https://www.metropoles.com/mundo/hamas-agradece-lula-por-comparacao"
            },
            {
              "id": "alvaro-508-618-FONTE-7",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 508,
              "end": 618,
              "text": "https://apnews.com/article/business-middle-east-israel-foreign-aid-gaza-strip-611b2b90c3a211f21185d59f4fae6a90"
            },
            {
              "id": "alvaro-620-743-FONTE-8",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 620,
              "end": 743,
              "text": "https://www.msn.com/en-ph/news/world/brazil-view-on-immunity-for-heads-of-state-could-favor-putin-at-g20-summit/ar-BB1kXCbF"
            },
            {
              "id": "alvaro-745-869-FONTE-9",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 745,
              "end": 869,
              "text": "https://oglobo.globo.com/mundo/em-ramallah-lula-diz-que-aceita-conversar-com-hamas-sugere-que-crise-entre-eua-israel-3038189"
            },
            {
              "id": "alvaro-871-985-FONTE-10",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 871,
              "end": 985,
              "text": "https://veja.abril.com.br/coluna/reinaldo/as-farc-saudam-a-eleicao-de-lula-e-dizem-ter-apoio-do-governo-do-brasil/"
            },
            {
              "id": "alvaro-987-1143-FONTE-11",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 987,
              "end": 1143,
              "text": "https://www.terra.com.br/noticias/mundo/oriente-medio/lula-sanciona-ajuda-de-r-25-milhoes-para-a-faixa-de-gaza,4eab78c65940b310VgnCLD200000bbcceb0aRCRD.html"
            },
            {
              "id": "alvaro-1145-1219-FONTE-12",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 1145,
              "end": 1219,
              "text": "https://www.theguardian.com/world/2023/sep/11/lula-putin-g20-brazil-arrest"
            },
            {
              "id": "alvaro-1221-1286-FONTE-13",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 1221,
              "end": 1286,
              "text": "https://www.diplomaticourier.com/posts/lulas-dance-with-dictators"
            },
            {
              "id": "alvaro-1288-1388-FONTE-14",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 1288,
              "end": 1388,
              "text": "https://www.aljazeera.com/news/2023/5/29/venezuelas-maduro-meets-lula-in-brazil-as-relations-improve"
            },
            {
              "id": "alvaro-1390-1506-FONTE-15",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 1390,
              "end": 1506,
              "text": "https://www1.folha.uol.com.br/internacional/en/world/2023/05/lula-praises-meeting-with-dictator-nicolas-maduro.shtml"
            },
            {
              "id": "alvaro-1508-1588-FONTE-16",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 1508,
              "end": 1588,
              "text": "https://www.aljazeera.com/news/2024/2/17/which-countries-are-still-funding-unrwa"
            }
          ]
        }
      },
      "automatic": {
        "e1": [
          {
            "id": "e1-257-315-FONTE-0",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 257,
            "end": 315,
            "text": "https://www1.folha.uol.com.br/fsp/1994/4/21/brasil/10.html"
          },
          {
            "id": "e1-313-433-FONTE-1",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 313,
            "end": 433,
            "text": "ml  https://noticias.r7.com/internacional/grupo-terrorista-palestino-hamas-parabeniza-lula-por-vitoria-nas-eleicoes-0111"
          },
          {
            "id": "e1-434-501-FONTE-2",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 434,
            "end": 501,
            "text": "022  https://www.metropoles.com/mundo/hamas-agradece-lula-por-compa"
          },
          {
            "id": "e1-502-612-FONTE-3",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 502,
            "end": 612,
            "text": "acao  https://apnews.com/article/business-middle-east-israel-foreign-aid-gaza-strip-611b2b90c3a211f21185d59f4f"
          },
          {
            "id": "e1-613-736-FONTE-4",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 613,
            "end": 736,
            "text": "e6a90  https://www.msn.com/en-ph/news/world/brazil-view-on-immunity-for-heads-of-state-could-favor-putin-at-g20-summit/ar-B"
          },
          {
            "id": "e1-737-861-FONTE-5",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 737,
            "end": 861,
            "text": "1kXCbF  https://oglobo.globo.com/mundo/em-ramallah-lula-diz-que-aceita-conversar-com-hamas-sugere-que-crise-entre-eua-israel"
          },
          {
            "id": "e1-862-976-FONTE-6",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 862,
            "end": 976,
            "text": "3038189  https://veja.abril.com.br/coluna/reinaldo/as-farc-saudam-a-eleicao-de-lula-e-dizem-ter-apoio-do-governo-d"
          },
          {
            "id": "e1-977-1133-FONTE-7",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 977,
            "end": 1133,
            "text": "-brasil/  https://www.terra.com.br/noticias/mundo/oriente-medio/lula-sanciona-ajuda-de-r-25-milhoes-para-a-faixa-de-gaza,4eab78c65940b310VgnCLD200000bbcceb0"
          },
          {
            "id": "e1-1134-1208-FONTE-8",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 1134,
            "end": 1208,
            "text": "RCRD.html  https://www.theguardian.com/world/2023/sep/11/lula-putin-g20-br"
          },
          {
            "id": "e1-1209-1274-FONTE-9",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 1209,
            "end": 1274,
            "text": "zil-arrest  https://www.diplomaticourier.com/posts/lulas-dance-wi"
          },
          {
            "id": "e1-1275-1375-FONTE-10",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 1275,
            "end": 1375,
            "text": "h-dictators  https://www.aljazeera.com/news/2023/5/29/venezuelas-maduro-meets-lula-in-brazil-as-rela"
          },
          {
            "id": "e1-1376-1492-FONTE-11",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 1376,
            "end": 1492,
            "text": "ions-improve  https://www1.folha.uol.com.br/internacional/en/world/2023/05/lula-praises-meeting-with-dictator-nicola"
          },
          {
            "id": "e1-1493-1573-FONTE-12",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 1493,
            "end": 1573,
            "text": "-maduro.shtml  https://www.aljazeera.com/news/2024/2/17/which-countries-are-stil"
          }
        ],
        "e2": [
          {
            "id": "e2-0-34-CLAIM-0",
            "source_key": "e2",
            "source_label": "E2",
            "type": "CLAIM",
            "start": 0,
            "end": 34,
            "text": "Lula acusa adversários de fascismo"
          },
          {
            "id": "e2-40-140-EVIDENCIA-1",
            "source_key": "e2",
            "source_label": "E2",
            "type": "EVIDENCIA",
            "start": 40,
            "end": 140,
            "text": "ignora o contexto de ter um longo histórico de boas relações com ditadores, autocratas e extremistas"
          },
          {
            "id": "e2-150-190-EVIDENCIA-2",
            "source_key": "e2",
            "source_label": "E2",
            "type": "EVIDENCIA",
            "start": 150,
            "end": 190,
            "text": "confessar admiração por Hitler e Komeini"
          }
        ]
      },
      "clusters": [
        {
          "id": "c1",
          "start": 0,
          "end": 34,
          "sources": [
            "alvaro",
            "davi"
          ],
          "types": [
            "CLAIM"
          ],
          "exact_agreements": [
            {
              "start": 0,
              "end": 34,
              "type": "CLAIM"
            }
          ],
          "span_ids": [
            "alvaro-0-34-CLAIM-0",
            "davi-0-34-CLAIM-0"
          ]
        },
        {
          "id": "c2",
          "start": 36,
          "end": 190,
          "sources": [
            "alvaro",
            "davi"
          ],
          "types": [
            "EVIDENCIA"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-36-190-EVIDENCIA-1",
            "davi-40-140-EVIDENCIA-1",
            "davi-150-190-EVIDENCIA-2"
          ]
        },
        {
          "id": "c3",
          "start": 192,
          "end": 216,
          "sources": [
            "alvaro",
            "davi"
          ],
          "types": [
            "QUALIFICADOR"
          ],
          "exact_agreements": [
            {
              "start": 192,
              "end": 216,
              "type": "QUALIFICADOR"
            }
          ],
          "span_ids": [
            "alvaro-192-216-QUALIFICADOR-2",
            "davi-192-216-QUALIFICADOR-3"
          ]
        },
        {
          "id": "c4",
          "start": 217,
          "end": 253,
          "sources": [
            "alvaro",
            "davi"
          ],
          "types": [
            "EVIDENCIA"
          ],
          "exact_agreements": [
            {
              "start": 217,
              "end": 253,
              "type": "EVIDENCIA"
            }
          ],
          "span_ids": [
            "alvaro-217-253-EVIDENCIA-3",
            "davi-217-253-EVIDENCIA-4"
          ]
        },
        {
          "id": "c5",
          "start": 257,
          "end": 315,
          "sources": [
            "alvaro"
          ],
          "types": [
            "FONTE"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-257-315-FONTE-4"
          ]
        },
        {
          "id": "c6",
          "start": 317,
          "end": 437,
          "sources": [
            "alvaro"
          ],
          "types": [
            "FONTE"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-317-437-FONTE-5"
          ]
        },
        {
          "id": "c7",
          "start": 439,
          "end": 506,
          "sources": [
            "alvaro"
          ],
          "types": [
            "FONTE"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-439-506-FONTE-6"
          ]
        },
        {
          "id": "c8",
          "start": 508,
          "end": 618,
          "sources": [
            "alvaro"
          ],
          "types": [
            "FONTE"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-508-618-FONTE-7"
          ]
        },
        {
          "id": "c9",
          "start": 620,
          "end": 743,
          "sources": [
            "alvaro"
          ],
          "types": [
            "FONTE"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-620-743-FONTE-8"
          ]
        },
        {
          "id": "c10",
          "start": 745,
          "end": 869,
          "sources": [
            "alvaro"
          ],
          "types": [
            "FONTE"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-745-869-FONTE-9"
          ]
        },
        {
          "id": "c11",
          "start": 871,
          "end": 985,
          "sources": [
            "alvaro"
          ],
          "types": [
            "FONTE"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-871-985-FONTE-10"
          ]
        },
        {
          "id": "c12",
          "start": 987,
          "end": 1143,
          "sources": [
            "alvaro"
          ],
          "types": [
            "FONTE"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-987-1143-FONTE-11"
          ]
        },
        {
          "id": "c13",
          "start": 1145,
          "end": 1219,
          "sources": [
            "alvaro"
          ],
          "types": [
            "FONTE"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-1145-1219-FONTE-12"
          ]
        },
        {
          "id": "c14",
          "start": 1221,
          "end": 1286,
          "sources": [
            "alvaro"
          ],
          "types": [
            "FONTE"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-1221-1286-FONTE-13"
          ]
        },
        {
          "id": "c15",
          "start": 1288,
          "end": 1388,
          "sources": [
            "alvaro"
          ],
          "types": [
            "FONTE"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-1288-1388-FONTE-14"
          ]
        },
        {
          "id": "c16",
          "start": 1390,
          "end": 1506,
          "sources": [
            "alvaro"
          ],
          "types": [
            "FONTE"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-1390-1506-FONTE-15"
          ]
        },
        {
          "id": "c17",
          "start": 1508,
          "end": 1588,
          "sources": [
            "alvaro"
          ],
          "types": [
            "FONTE"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-1508-1588-FONTE-16"
          ]
        }
      ],
      "exact_agreement": [
        {
          "start": 0,
          "end": 34,
          "type": "CLAIM",
          "text": "Lula acusa adversários de fascismo"
        },
        {
          "start": 192,
          "end": 216,
          "type": "QUALIFICADOR",
          "text": "Apenas se aproximando de"
        },
        {
          "start": 217,
          "end": 253,
          "type": "EVIDENCIA",
          "text": "democracias de seu espectro político"
        }
      ],
      "counts": {
        "davi": 5,
        "alvaro": 17,
        "exact_agreement": 3,
        "human_union": 19
      }
    },
    {
      "order": 9,
      "noteId": "1999916358998360139",
      "tweetId": "1999577272647340393",
      "consenso": "NMR",
      "macrotheme_label": "Taylor Swift e Política",
      "tweet_text": "e até hoje nem uma palavra sobre a Ana Benevides...nunca mais olhei pra Taylor da mesma forma https://t.co/PFNRbocwrf https://t.co/rWMEWJ24fk",
      "note_text": "É falsa a afirmação que Taylor Swift nunca tenha falado sobre Ana Benevides.    No exato momento que foi confirmada a morte, Taylor se pronunciou. A família de Benevides confirmou contato e o e-mail, além de ter encontrado Swift pessoalmente no show.    https://g1.globo.com/sp/sao-paulo/noticia/2023/11/26/parentes-de-ana-benevides-fa-que-morreu-em-show-de-taylor-swif-no-rj-vao-a-ultima-apresentacao-em-sp.ghtml    https://veja.abril.com.br/coluna/o-som-e-a-furia/os-bastidores-do-encontro-de-taylor-com-a-familia-de-fa-morta-no-show/    https://www.latimes.com/entertainment-arts/story/2023-11-28/taylor-swift-meets-family-of-deceased-fan-ahead-of-final-brazil-show    https://www.washingtonpost.com/entertainment/2023/11/25/taylor-swift-brazil-eras-tour-death-investigation/    https://g1.globo.com/ms/mato-grosso-do-sul/noticia/2023/11/27/taylor-swift-encontra-familiares-de-fa-que-morreu-em-show-ela-    https://www.google.com/amp/s/g1.globo.com/google/amp/sp/sao-paulo/noticia/2023/11/26/parentes-de-ana-benevides-fa-que-morreu-em-show-de-taylor-swif-no-rj-vao-a-ultima-apresentacao-em-sp.ghtml    https://www.google.com/amp/s/hugogloss.uol.com.br/famosos/familia-de-ana-clara-benevides-fala-pela-1a-vez-apos-encontro-com-taylor-swift-sinalizou-intencao-de-ajudar/amp/    https://www.cnnbrasil.com.br/entretenimento/taylor-swift-encontra-familia-de-ana-benevides-fa-que-morreu-em-show/",
      "is_meta": false,
      "meta_reason": "",
      "human": {
        "davi": {
          "label": "Davi",
          "status": "completed",
          "obs": "",
          "spans": [
            {
              "id": "davi-24-75-CLAIM-0",
              "source_key": "davi",
              "source_label": "Davi",
              "type": "CLAIM",
              "start": 24,
              "end": 75,
              "text": "Taylor Swift nunca tenha falado sobre Ana Benevides"
            },
            {
              "id": "davi-80-145-EVIDENCIA-1",
              "source_key": "davi",
              "source_label": "Davi",
              "type": "EVIDENCIA",
              "start": 80,
              "end": 145,
              "text": "No exato momento que foi confirmada a morte, Taylor se pronunciou"
            },
            {
              "id": "davi-147-249-EVIDENCIA-2",
              "source_key": "davi",
              "source_label": "Davi",
              "type": "EVIDENCIA",
              "start": 147,
              "end": 249,
              "text": "A família de Benevides confirmou contato e o e-mail, além de ter encontrado Swift pessoalmente no show"
            }
          ]
        },
        "alvaro": {
          "label": "Alvaro",
          "status": "completed",
          "obs": "",
          "spans": [
            {
              "id": "alvaro-0-19-EVIDENCIA-0",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "EVIDENCIA",
              "start": 0,
              "end": 19,
              "text": "É falsa a afirmação"
            },
            {
              "id": "alvaro-24-75-CLAIM-1",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "CLAIM",
              "start": 24,
              "end": 75,
              "text": "Taylor Swift nunca tenha falado sobre Ana Benevides"
            },
            {
              "id": "alvaro-80-145-EVIDENCIA-2",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "EVIDENCIA",
              "start": 80,
              "end": 145,
              "text": "No exato momento que foi confirmada a morte, Taylor se pronunciou"
            },
            {
              "id": "alvaro-147-249-EVIDENCIA-3",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "EVIDENCIA",
              "start": 147,
              "end": 249,
              "text": "A família de Benevides confirmou contato e o e-mail, além de ter encontrado Swift pessoalmente no show"
            },
            {
              "id": "alvaro-254-413-FONTE-4",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 254,
              "end": 413,
              "text": "https://g1.globo.com/sp/sao-paulo/noticia/2023/11/26/parentes-de-ana-benevides-fa-que-morreu-em-show-de-taylor-swif-no-rj-vao-a-ultima-apresentacao-em-sp.ghtml"
            },
            {
              "id": "alvaro-417-536-FONTE-5",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 417,
              "end": 536,
              "text": "https://veja.abril.com.br/coluna/o-som-e-a-furia/os-bastidores-do-encontro-de-taylor-com-a-familia-de-fa-morta-no-show/"
            },
            {
              "id": "alvaro-540-668-FONTE-6",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 540,
              "end": 668,
              "text": "https://www.latimes.com/entertainment-arts/story/2023-11-28/taylor-swift-meets-family-of-deceased-fan-ahead-of-final-brazil-show"
            },
            {
              "id": "alvaro-672-778-FONTE-7",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 672,
              "end": 778,
              "text": "https://www.washingtonpost.com/entertainment/2023/11/25/taylor-swift-brazil-eras-tour-death-investigation/"
            },
            {
              "id": "alvaro-782-906-FONTE-8",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 782,
              "end": 906,
              "text": "https://g1.globo.com/ms/mato-grosso-do-sul/noticia/2023/11/27/taylor-swift-encontra-familiares-de-fa-que-morreu-em-show-ela-"
            },
            {
              "id": "alvaro-910-1101-FONTE-9",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 910,
              "end": 1101,
              "text": "https://www.google.com/amp/s/g1.globo.com/google/amp/sp/sao-paulo/noticia/2023/11/26/parentes-de-ana-benevides-fa-que-morreu-em-show-de-taylor-swif-no-rj-vao-a-ultima-apresentacao-em-sp.ghtml"
            },
            {
              "id": "alvaro-1105-1275-FONTE-10",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 1105,
              "end": 1275,
              "text": "https://www.google.com/amp/s/hugogloss.uol.com.br/famosos/familia-de-ana-clara-benevides-fala-pela-1a-vez-apos-encontro-com-taylor-swift-sinalizou-intencao-de-ajudar/amp/"
            },
            {
              "id": "alvaro-1279-1392-FONTE-11",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 1279,
              "end": 1392,
              "text": "https://www.cnnbrasil.com.br/entretenimento/taylor-swift-encontra-familia-de-ana-benevides-fa-que-morreu-em-show/"
            }
          ]
        }
      },
      "automatic": {
        "e1": [
          {
            "id": "e1-97-124-EVIDENCIA-0",
            "source_key": "e1",
            "source_label": "E1",
            "type": "EVIDENCIA",
            "start": 97,
            "end": 124,
            "text": "que foi confirmada a morte,"
          },
          {
            "id": "e1-147-250-EVIDENCIA-1",
            "source_key": "e1",
            "source_label": "E1",
            "type": "EVIDENCIA",
            "start": 147,
            "end": 250,
            "text": "A família de Benevides confirmou contato e o e-mail, além de ter encontrado Swift pessoalmente no show."
          },
          {
            "id": "e1-248-407-FONTE-2",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 248,
            "end": 407,
            "text": "w.    https://g1.globo.com/sp/sao-paulo/noticia/2023/11/26/parentes-de-ana-benevides-fa-que-morreu-em-show-de-taylor-swif-no-rj-vao-a-ultima-apresentacao-em-sp"
          },
          {
            "id": "e1-254-1101-EVIDENCIA-3",
            "source_key": "e1",
            "source_label": "E1",
            "type": "EVIDENCIA",
            "start": 254,
            "end": 1101,
            "text": "https://g1.globo.com/sp/sao-paulo/noticia/2023/11/26/parentes-de-ana-benevides-fa-que-morreu-em-show-de-taylor-swif-no-rj-vao-a-ultima-apresentacao-em-sp.ghtml    https://veja.abril.com.br/coluna/o-som-e-a-furia/os-bastidores-do-encontro-de-taylor-com-a-familia-de-fa-morta-no-show/    https://www.latimes.com/entertainment-arts/story/2023-11-28/taylor-swift-meets-family-of-deceased-fan-ahead-of-final-brazil-show    https://www.washingtonpost.com/entertainment/2023/11/25/taylor-swift-brazil-eras-tour-death-investigation/    https://g1.globo.com/ms/mato-grosso-do-sul/noticia/2023/11/27/taylor-swift-encontra-familiares-de-fa-que-morreu-em-show-ela-    https://www.google.com/amp/s/g1.globo.com/google/amp/sp/sao-paulo/noticia/2023/11/26/parentes-de-ana-benevides-fa-que-morreu-em-show-de-taylor-swif-no-rj-vao-a-ultima-apresentacao-em-sp.ghtml"
          },
          {
            "id": "e1-408-527-FONTE-4",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 408,
            "end": 527,
            "text": "ghtml    https://veja.abril.com.br/coluna/o-som-e-a-furia/os-bastidores-do-encontro-de-taylor-com-a-familia-de-fa-morta"
          },
          {
            "id": "e1-528-656-FONTE-5",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 528,
            "end": 656,
            "text": "no-show/    https://www.latimes.com/entertainment-arts/story/2023-11-28/taylor-swift-meets-family-of-deceased-fan-ahead-of-final"
          },
          {
            "id": "e1-657-763-FONTE-6",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 657,
            "end": 763,
            "text": "brazil-show    https://www.washingtonpost.com/entertainment/2023/11/25/taylor-swift-brazil-eras-tour-death"
          },
          {
            "id": "e1-764-888-FONTE-7",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 764,
            "end": 888,
            "text": "investigation/    https://g1.globo.com/ms/mato-grosso-do-sul/noticia/2023/11/27/taylor-swift-encontra-familiares-de-fa-que-m"
          },
          {
            "id": "e1-889-1080-FONTE-8",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 889,
            "end": 1080,
            "text": "rreu-em-show-ela-    https://www.google.com/amp/s/g1.globo.com/google/amp/sp/sao-paulo/noticia/2023/11/26/parentes-de-ana-benevides-fa-que-morreu-em-show-de-taylor-swif-no-rj-vao-a-ultima-apr"
          },
          {
            "id": "e1-1081-1251-FONTE-9",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 1081,
            "end": 1251,
            "text": "sentacao-em-sp.ghtml    https://www.google.com/amp/s/hugogloss.uol.com.br/famosos/familia-de-ana-clara-benevides-fala-pela-1a-vez-apos-encontro-com-taylor-swift-sinalizou"
          },
          {
            "id": "e1-1252-1365-FONTE-10",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 1252,
            "end": 1365,
            "text": "intencao-de-ajudar/amp/    https://www.cnnbrasil.com.br/entretenimento/taylor-swift-encontra-familia-de-ana-benev"
          },
          {
            "id": "e1-1279-1392-FONTE-11",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 1279,
            "end": 1392,
            "text": "https://www.cnnbrasil.com.br/entretenimento/taylor-swift-encontra-familia-de-ana-benevides-fa-que-morreu-em-show/"
          }
        ],
        "e2": [
          {
            "id": "e2-24-75-CLAIM-0",
            "source_key": "e2",
            "source_label": "E2",
            "type": "CLAIM",
            "start": 24,
            "end": 75,
            "text": "Taylor Swift nunca tenha falado sobre Ana Benevides"
          },
          {
            "id": "e2-80-145-EVIDENCIA-1",
            "source_key": "e2",
            "source_label": "E2",
            "type": "EVIDENCIA",
            "start": 80,
            "end": 145,
            "text": "No exato momento que foi confirmada a morte, Taylor se pronunciou"
          },
          {
            "id": "e2-147-249-EVIDENCIA-2",
            "source_key": "e2",
            "source_label": "E2",
            "type": "EVIDENCIA",
            "start": 147,
            "end": 249,
            "text": "A família de Benevides confirmou contato e o e-mail, além de ter encontrado Swift pessoalmente no show"
          }
        ]
      },
      "clusters": [
        {
          "id": "c4",
          "start": 0,
          "end": 19,
          "sources": [
            "alvaro"
          ],
          "types": [
            "EVIDENCIA"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-0-19-EVIDENCIA-0"
          ]
        },
        {
          "id": "c1",
          "start": 24,
          "end": 75,
          "sources": [
            "alvaro",
            "davi"
          ],
          "types": [
            "CLAIM"
          ],
          "exact_agreements": [
            {
              "start": 24,
              "end": 75,
              "type": "CLAIM"
            }
          ],
          "span_ids": [
            "alvaro-24-75-CLAIM-1",
            "davi-24-75-CLAIM-0"
          ]
        },
        {
          "id": "c2",
          "start": 80,
          "end": 145,
          "sources": [
            "alvaro",
            "davi"
          ],
          "types": [
            "EVIDENCIA"
          ],
          "exact_agreements": [
            {
              "start": 80,
              "end": 145,
              "type": "EVIDENCIA"
            }
          ],
          "span_ids": [
            "alvaro-80-145-EVIDENCIA-2",
            "davi-80-145-EVIDENCIA-1"
          ]
        },
        {
          "id": "c3",
          "start": 147,
          "end": 249,
          "sources": [
            "alvaro",
            "davi"
          ],
          "types": [
            "EVIDENCIA"
          ],
          "exact_agreements": [
            {
              "start": 147,
              "end": 249,
              "type": "EVIDENCIA"
            }
          ],
          "span_ids": [
            "alvaro-147-249-EVIDENCIA-3",
            "davi-147-249-EVIDENCIA-2"
          ]
        },
        {
          "id": "c5",
          "start": 254,
          "end": 413,
          "sources": [
            "alvaro"
          ],
          "types": [
            "FONTE"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-254-413-FONTE-4"
          ]
        },
        {
          "id": "c6",
          "start": 417,
          "end": 536,
          "sources": [
            "alvaro"
          ],
          "types": [
            "FONTE"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-417-536-FONTE-5"
          ]
        },
        {
          "id": "c7",
          "start": 540,
          "end": 668,
          "sources": [
            "alvaro"
          ],
          "types": [
            "FONTE"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-540-668-FONTE-6"
          ]
        },
        {
          "id": "c8",
          "start": 672,
          "end": 778,
          "sources": [
            "alvaro"
          ],
          "types": [
            "FONTE"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-672-778-FONTE-7"
          ]
        },
        {
          "id": "c9",
          "start": 782,
          "end": 906,
          "sources": [
            "alvaro"
          ],
          "types": [
            "FONTE"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-782-906-FONTE-8"
          ]
        },
        {
          "id": "c10",
          "start": 910,
          "end": 1101,
          "sources": [
            "alvaro"
          ],
          "types": [
            "FONTE"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-910-1101-FONTE-9"
          ]
        },
        {
          "id": "c11",
          "start": 1105,
          "end": 1275,
          "sources": [
            "alvaro"
          ],
          "types": [
            "FONTE"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-1105-1275-FONTE-10"
          ]
        },
        {
          "id": "c12",
          "start": 1279,
          "end": 1392,
          "sources": [
            "alvaro"
          ],
          "types": [
            "FONTE"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-1279-1392-FONTE-11"
          ]
        }
      ],
      "exact_agreement": [
        {
          "start": 24,
          "end": 75,
          "type": "CLAIM",
          "text": "Taylor Swift nunca tenha falado sobre Ana Benevides"
        },
        {
          "start": 80,
          "end": 145,
          "type": "EVIDENCIA",
          "text": "No exato momento que foi confirmada a morte, Taylor se pronunciou"
        },
        {
          "start": 147,
          "end": 249,
          "type": "EVIDENCIA",
          "text": "A família de Benevides confirmou contato e o e-mail, além de ter encontrado Swift pessoalmente no show"
        }
      ],
      "counts": {
        "davi": 3,
        "alvaro": 12,
        "exact_agreement": 3,
        "human_union": 12
      }
    },
    {
      "order": 10,
      "noteId": "1919473187269878071",
      "tweetId": "1919383902608646476",
      "consenso": "NMR",
      "macrotheme_label": "Taylor Swift e Política",
      "tweet_text": "2,5 milhões de público e nenhum fã morto\nO murro na abatedora swift não acaba https://t.co/ULa9fvl83R",
      "note_text": "O autor da postagem faz uma sátira dando a entender que Taylor teve culpa na morte de Ana Benevides.    A empresa Times For Fun foi a única responsável e indicada após o laudo. Em novembro de 2023, mais de 151 idosos morreram por conta do calor extremo no Rio.    https://exame.com/esg/rio-40-graus-onda-de-calor-aumenta-em-50-risco-de-morte-de-idosos-com-doencas-cronicas/    https://agenciabrasil.ebc.com.br/radioagencia-nacional/meio-ambiente/audio/2025-02/pesquisa-mostra-como-calor-extremo-aumenta-mortalidade#:~:text=Em%2018%20de%20novembro%20de,a%20mortalidade%2C%20segundo%20a%20pesquisa.    https://pt.m.wikipedia.org/wiki/Onda_de_calor_no_Brasil_em_2023    https://portal.inmet.gov.br/noticias/ano-de-2023-é-o-mais-quente-da-história-do-brasil    https://pt.m.wikipedia.org/wiki/Morte_de_Ana_Clara_Benevides    https://www.cnnbrasil.com.br/entretenimento/taylor-swift-encontra-familia-de-ana-benevides-fa-que-morreu-em-show/#:~:text=Taylor%20Swift%20encontra%20família%20de%20Ana%20Benevides%2C%20fã%20que%20morreu%20em%20show,-Familiares%20foram%20vistos&amp;text=A%20família%20de%20Ana%20Clara,clube%20",
      "is_meta": false,
      "meta_reason": "",
      "human": {
        "davi": {
          "label": "Davi",
          "status": "completed",
          "obs": "",
          "spans": [
            {
              "id": "davi-56-99-CLAIM-0",
              "source_key": "davi",
              "source_label": "Davi",
              "type": "CLAIM",
              "start": 56,
              "end": 99,
              "text": "Taylor teve culpa na morte de Ana Benevides"
            },
            {
              "id": "davi-104-175-EVIDENCIA-1",
              "source_key": "davi",
              "source_label": "Davi",
              "type": "EVIDENCIA",
              "start": 104,
              "end": 175,
              "text": "A empresa Times For Fun foi a única responsável e indicada após o laudo"
            },
            {
              "id": "davi-177-259-EVIDENCIA-2",
              "source_key": "davi",
              "source_label": "Davi",
              "type": "EVIDENCIA",
              "start": 177,
              "end": 259,
              "text": "Em novembro de 2023, mais de 151 idosos morreram por conta do calor extremo no Rio"
            }
          ]
        },
        "alvaro": {
          "label": "Alvaro",
          "status": "completed",
          "obs": "",
          "spans": [
            {
              "id": "alvaro-56-99-CLAIM-0",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "CLAIM",
              "start": 56,
              "end": 99,
              "text": "Taylor teve culpa na morte de Ana Benevides"
            },
            {
              "id": "alvaro-104-175-EVIDENCIA-1",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "EVIDENCIA",
              "start": 104,
              "end": 175,
              "text": "A empresa Times For Fun foi a única responsável e indicada após o laudo"
            },
            {
              "id": "alvaro-177-259-EVIDENCIA-2",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "EVIDENCIA",
              "start": 177,
              "end": 259,
              "text": "Em novembro de 2023, mais de 151 idosos morreram por conta do calor extremo no Rio"
            },
            {
              "id": "alvaro-264-373-FONTE-3",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 264,
              "end": 373,
              "text": "https://exame.com/esg/rio-40-graus-onda-de-calor-aumenta-em-50-risco-de-morte-de-idosos-com-doencas-cronicas/"
            },
            {
              "id": "alvaro-377-595-FONTE-4",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 377,
              "end": 595,
              "text": "https://agenciabrasil.ebc.com.br/radioagencia-nacional/meio-ambiente/audio/2025-02/pesquisa-mostra-como-calor-extremo-aumenta-mortalidade#:~:text=Em%2018%20de%20novembro%20de,a%20mortalidade%2C%20segundo%20a%20pesquisa"
            },
            {
              "id": "alvaro-600-663-FONTE-5",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 600,
              "end": 663,
              "text": "https://pt.m.wikipedia.org/wiki/Onda_de_calor_no_Brasil_em_2023"
            },
            {
              "id": "alvaro-667-753-FONTE-6",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 667,
              "end": 753,
              "text": "https://portal.inmet.gov.br/noticias/ano-de-2023-é-o-mais-quente-da-história-do-brasil"
            },
            {
              "id": "alvaro-757-817-FONTE-7",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 757,
              "end": 817,
              "text": "https://pt.m.wikipedia.org/wiki/Morte_de_Ana_Clara_Benevides"
            },
            {
              "id": "alvaro-821-1114-FONTE-8",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 821,
              "end": 1114,
              "text": "https://www.cnnbrasil.com.br/entretenimento/taylor-swift-encontra-familia-de-ana-benevides-fa-que-morreu-em-show/#:~:text=Taylor%20Swift%20encontra%20família%20de%20Ana%20Benevides%2C%20fã%20que%20morreu%20em%20show,-Familiares%20foram%20vistos&amp;text=A%20família%20de%20Ana%20Clara,clube%20"
            }
          ]
        }
      },
      "automatic": {
        "e1": [
          {
            "id": "e1-152-175-EVIDENCIA-0",
            "source_key": "e1",
            "source_label": "E1",
            "type": "EVIDENCIA",
            "start": 152,
            "end": 175,
            "text": "e indicada após o laudo"
          },
          {
            "id": "e1-177-260-EVIDENCIA-1",
            "source_key": "e1",
            "source_label": "E1",
            "type": "EVIDENCIA",
            "start": 177,
            "end": 260,
            "text": "Em novembro de 2023, mais de 151 idosos morreram por conta do calor extremo no Rio."
          },
          {
            "id": "e1-258-367-FONTE-2",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 258,
            "end": 367,
            "text": "o.    https://exame.com/esg/rio-40-graus-onda-de-calor-aumenta-em-50-risco-de-morte-de-idosos-com-doencas-cro"
          },
          {
            "id": "e1-368-586-FONTE-3",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 368,
            "end": 586,
            "text": "icas/    https://agenciabrasil.ebc.com.br/radioagencia-nacional/meio-ambiente/audio/2025-02/pesquisa-mostra-como-calor-extremo-aumenta-mortalidade#:~:text=Em%2018%20de%20novembro%20de,a%20mortalidade%2C%20segundo%20a%2"
          },
          {
            "id": "e1-588-651-FONTE-4",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 588,
            "end": 651,
            "text": "esquisa.    https://pt.m.wikipedia.org/wiki/Onda_de_calor_no_Br"
          },
          {
            "id": "e1-652-738-FONTE-5",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 652,
            "end": 738,
            "text": "sil_em_2023    https://portal.inmet.gov.br/noticias/ano-de-2023-é-o-mais-quente-da-his"
          },
          {
            "id": "e1-739-799-FONTE-6",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 739,
            "end": 799,
            "text": "ória-do-brasil    https://pt.m.wikipedia.org/wiki/Morte_de_A"
          },
          {
            "id": "e1-757-817-FONTE-7",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 757,
            "end": 817,
            "text": "https://pt.m.wikipedia.org/wiki/Morte_de_Ana_Clara_Benevides"
          },
          {
            "id": "e1-800-1093-FONTE-8",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 800,
            "end": 1093,
            "text": "a_Clara_Benevides    https://www.cnnbrasil.com.br/entretenimento/taylor-swift-encontra-familia-de-ana-benevides-fa-que-morreu-em-show/#:~:text=Taylor%20Swift%20encontra%20família%20de%20Ana%20Benevides%2C%20fã%20que%20morreu%20em%20show,-Familiares%20foram%20vistos&amp;text=A%20família%20de%2"
          }
        ],
        "e2": [
          {
            "id": "e2-56-99-CLAIM-0",
            "source_key": "e2",
            "source_label": "E2",
            "type": "CLAIM",
            "start": 56,
            "end": 99,
            "text": "Taylor teve culpa na morte de Ana Benevides"
          },
          {
            "id": "e2-104-175-EVIDENCIA-1",
            "source_key": "e2",
            "source_label": "E2",
            "type": "EVIDENCIA",
            "start": 104,
            "end": 175,
            "text": "A empresa Times For Fun foi a única responsável e indicada após o laudo"
          }
        ]
      },
      "clusters": [
        {
          "id": "c1",
          "start": 56,
          "end": 99,
          "sources": [
            "alvaro",
            "davi"
          ],
          "types": [
            "CLAIM"
          ],
          "exact_agreements": [
            {
              "start": 56,
              "end": 99,
              "type": "CLAIM"
            }
          ],
          "span_ids": [
            "alvaro-56-99-CLAIM-0",
            "davi-56-99-CLAIM-0"
          ]
        },
        {
          "id": "c2",
          "start": 104,
          "end": 175,
          "sources": [
            "alvaro",
            "davi"
          ],
          "types": [
            "EVIDENCIA"
          ],
          "exact_agreements": [
            {
              "start": 104,
              "end": 175,
              "type": "EVIDENCIA"
            }
          ],
          "span_ids": [
            "alvaro-104-175-EVIDENCIA-1",
            "davi-104-175-EVIDENCIA-1"
          ]
        },
        {
          "id": "c3",
          "start": 177,
          "end": 259,
          "sources": [
            "alvaro",
            "davi"
          ],
          "types": [
            "EVIDENCIA"
          ],
          "exact_agreements": [
            {
              "start": 177,
              "end": 259,
              "type": "EVIDENCIA"
            }
          ],
          "span_ids": [
            "alvaro-177-259-EVIDENCIA-2",
            "davi-177-259-EVIDENCIA-2"
          ]
        },
        {
          "id": "c4",
          "start": 264,
          "end": 373,
          "sources": [
            "alvaro"
          ],
          "types": [
            "FONTE"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-264-373-FONTE-3"
          ]
        },
        {
          "id": "c5",
          "start": 377,
          "end": 595,
          "sources": [
            "alvaro"
          ],
          "types": [
            "FONTE"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-377-595-FONTE-4"
          ]
        },
        {
          "id": "c6",
          "start": 600,
          "end": 663,
          "sources": [
            "alvaro"
          ],
          "types": [
            "FONTE"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-600-663-FONTE-5"
          ]
        },
        {
          "id": "c7",
          "start": 667,
          "end": 753,
          "sources": [
            "alvaro"
          ],
          "types": [
            "FONTE"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-667-753-FONTE-6"
          ]
        },
        {
          "id": "c8",
          "start": 757,
          "end": 817,
          "sources": [
            "alvaro"
          ],
          "types": [
            "FONTE"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-757-817-FONTE-7"
          ]
        },
        {
          "id": "c9",
          "start": 821,
          "end": 1114,
          "sources": [
            "alvaro"
          ],
          "types": [
            "FONTE"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-821-1114-FONTE-8"
          ]
        }
      ],
      "exact_agreement": [
        {
          "start": 56,
          "end": 99,
          "type": "CLAIM",
          "text": "Taylor teve culpa na morte de Ana Benevides"
        },
        {
          "start": 104,
          "end": 175,
          "type": "EVIDENCIA",
          "text": "A empresa Times For Fun foi a única responsável e indicada após o laudo"
        },
        {
          "start": 177,
          "end": 259,
          "type": "EVIDENCIA",
          "text": "Em novembro de 2023, mais de 151 idosos morreram por conta do calor extremo no Rio"
        }
      ],
      "counts": {
        "davi": 3,
        "alvaro": 9,
        "exact_agreement": 3,
        "human_union": 9
      }
    },
    {
      "order": 11,
      "noteId": "2023491294153052667",
      "tweetId": "2023407065159573541",
      "consenso": "NMR",
      "macrotheme_label": "Taylor Swift e Política",
      "tweet_text": "Deixe eu ver se eu entendi, ela ficou calada até hoje, não fala nada sobre pauta nenhuma, foi acusada de ganhar milhões pra apoiar publicamente a Kamala e depois nunca mais falou nada sobre, ofendeu indígenas e mexicanos e DO NADA começa uma limpeza de imagem usando latinos hmmm https://t.co/yCHu6RCcnn",
      "note_text": "Beyoncé tem histórico público de ser uma das artistas que mais fala sobre causas (ex. racismo).   A acusação de que foi paga para apoiar Kamala foi criada por Donald Trump e foi desmentida por factos.   É mentira que Beyoncé glorificou o genocídio dos indígenas e mexicanos.   https://x.com/BEYHIVEDOJ/status/1937133446347817077?s=20  https://www.unicef.org/armenia/en/press-releases/beyonc%C3%A9-partners-unicef-bring-safe-water-children-remote-areas-burundi  https://cnnportugal.iol.pt/kamala-harris/estados-unidos/trump-quer-beyonce-em-tribunal-por-algo-que-nao-aconteceu/20250728/688724a1d34ef72ee448c963",
      "is_meta": false,
      "meta_reason": "",
      "human": {
        "davi": {
          "label": "Davi",
          "status": "completed",
          "obs": "",
          "spans": [
            {
              "id": "davi-0-94-EVIDENCIA-0",
              "source_key": "davi",
              "source_label": "Davi",
              "type": "EVIDENCIA",
              "start": 0,
              "end": 94,
              "text": "Beyoncé tem histórico público de ser uma das artistas que mais fala sobre causas (ex. racismo)"
            },
            {
              "id": "davi-98-143-CLAIM-1",
              "source_key": "davi",
              "source_label": "Davi",
              "type": "CLAIM",
              "start": 98,
              "end": 143,
              "text": "A acusação de que foi paga para apoiar Kamala"
            },
            {
              "id": "davi-144-199-EVIDENCIA-2",
              "source_key": "davi",
              "source_label": "Davi",
              "type": "EVIDENCIA",
              "start": 144,
              "end": 199,
              "text": "foi criada por Donald Trump e foi desmentida por factos"
            },
            {
              "id": "davi-203-247-EVIDENCIA-4",
              "source_key": "davi",
              "source_label": "Davi",
              "type": "EVIDENCIA",
              "start": 203,
              "end": 247,
              "text": "É mentira que Beyoncé glorificou o genocídio"
            },
            {
              "id": "davi-252-273-CLAIM-3",
              "source_key": "davi",
              "source_label": "Davi",
              "type": "CLAIM",
              "start": 252,
              "end": 273,
              "text": "indígenas e mexicanos"
            }
          ]
        },
        "alvaro": {
          "label": "Alvaro",
          "status": "completed",
          "obs": "",
          "spans": [
            {
              "id": "alvaro-0-95-EVIDENCIA-0",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "EVIDENCIA",
              "start": 0,
              "end": 95,
              "text": "Beyoncé tem histórico público de ser uma das artistas que mais fala sobre causas (ex. racismo)."
            },
            {
              "id": "alvaro-98-143-CLAIM-3",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "CLAIM",
              "start": 98,
              "end": 143,
              "text": "A acusação de que foi paga para apoiar Kamala"
            },
            {
              "id": "alvaro-144-199-EVIDENCIA-1",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "EVIDENCIA",
              "start": 144,
              "end": 199,
              "text": "foi criada por Donald Trump e foi desmentida por factos"
            },
            {
              "id": "alvaro-203-273-EVIDENCIA-2",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "EVIDENCIA",
              "start": 203,
              "end": 273,
              "text": "É mentira que Beyoncé glorificou o genocídio dos indígenas e mexicanos"
            },
            {
              "id": "alvaro-277-333-FONTE-4",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 277,
              "end": 333,
              "text": "https://x.com/BEYHIVEDOJ/status/1937133446347817077?s=20"
            },
            {
              "id": "alvaro-335-459-FONTE-5",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 335,
              "end": 459,
              "text": "https://www.unicef.org/armenia/en/press-releases/beyonc%C3%A9-partners-unicef-bring-safe-water-children-remote-areas-burundi"
            },
            {
              "id": "alvaro-461-608-FONTE-6",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 461,
              "end": 608,
              "text": "https://cnnportugal.iol.pt/kamala-harris/estados-unidos/trump-quer-beyonce-em-tribunal-por-algo-que-nao-aconteceu/20250728/688724a1d34ef72ee448c963"
            }
          ]
        }
      },
      "automatic": {
        "e1": [
          {
            "id": "e1-0-85-EVIDENCIA-0",
            "source_key": "e1",
            "source_label": "E1",
            "type": "EVIDENCIA",
            "start": 0,
            "end": 85,
            "text": "Beyoncé tem histórico público de ser uma das artistas que mais fala sobre causas (ex."
          },
          {
            "id": "e1-271-327-FONTE-1",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 271,
            "end": 327,
            "text": "os.   https://x.com/BEYHIVEDOJ/status/193713344634781707"
          },
          {
            "id": "e1-277-608-EVIDENCIA-2",
            "source_key": "e1",
            "source_label": "E1",
            "type": "EVIDENCIA",
            "start": 277,
            "end": 608,
            "text": "https://x.com/BEYHIVEDOJ/status/1937133446347817077?s=20  https://www.unicef.org/armenia/en/press-releases/beyonc%C3%A9-partners-unicef-bring-safe-water-children-remote-areas-burundi  https://cnnportugal.iol.pt/kamala-harris/estados-unidos/trump-quer-beyonce-em-tribunal-por-algo-que-nao-aconteceu/20250728/688724a1d34ef72ee448c963"
          },
          {
            "id": "e1-328-452-FONTE-3",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 328,
            "end": 452,
            "text": "?s=20  https://www.unicef.org/armenia/en/press-releases/beyonc%C3%A9-partners-unicef-bring-safe-water-children-remote-areas-"
          },
          {
            "id": "e1-453-600-FONTE-4",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 453,
            "end": 600,
            "text": "urundi  https://cnnportugal.iol.pt/kamala-harris/estados-unidos/trump-quer-beyonce-em-tribunal-por-algo-que-nao-aconteceu/20250728/688724a1d34ef72e"
          }
        ],
        "e2": [
          {
            "id": "e2-0-94-EVIDENCIA-0",
            "source_key": "e2",
            "source_label": "E2",
            "type": "EVIDENCIA",
            "start": 0,
            "end": 94,
            "text": "Beyoncé tem histórico público de ser uma das artistas que mais fala sobre causas (ex. racismo)"
          },
          {
            "id": "e2-98-143-CLAIM-1",
            "source_key": "e2",
            "source_label": "E2",
            "type": "CLAIM",
            "start": 98,
            "end": 143,
            "text": "A acusação de que foi paga para apoiar Kamala"
          },
          {
            "id": "e2-148-171-FONTE-2",
            "source_key": "e2",
            "source_label": "E2",
            "type": "FONTE",
            "start": 148,
            "end": 171,
            "text": "criada por Donald Trump"
          },
          {
            "id": "e2-174-199-EVIDENCIA-3",
            "source_key": "e2",
            "source_label": "E2",
            "type": "EVIDENCIA",
            "start": 174,
            "end": 199,
            "text": "foi desmentida por factos"
          },
          {
            "id": "e2-203-273-CLAIM-4",
            "source_key": "e2",
            "source_label": "E2",
            "type": "CLAIM",
            "start": 203,
            "end": 273,
            "text": "É mentira que Beyoncé glorificou o genocídio dos indígenas e mexicanos"
          }
        ]
      },
      "clusters": [
        {
          "id": "c1",
          "start": 0,
          "end": 95,
          "sources": [
            "alvaro",
            "davi"
          ],
          "types": [
            "EVIDENCIA"
          ],
          "exact_agreements": [],
          "span_ids": [
            "davi-0-94-EVIDENCIA-0",
            "alvaro-0-95-EVIDENCIA-0"
          ]
        },
        {
          "id": "c2",
          "start": 98,
          "end": 143,
          "sources": [
            "alvaro",
            "davi"
          ],
          "types": [
            "CLAIM"
          ],
          "exact_agreements": [
            {
              "start": 98,
              "end": 143,
              "type": "CLAIM"
            }
          ],
          "span_ids": [
            "alvaro-98-143-CLAIM-3",
            "davi-98-143-CLAIM-1"
          ]
        },
        {
          "id": "c3",
          "start": 144,
          "end": 199,
          "sources": [
            "alvaro",
            "davi"
          ],
          "types": [
            "EVIDENCIA"
          ],
          "exact_agreements": [
            {
              "start": 144,
              "end": 199,
              "type": "EVIDENCIA"
            }
          ],
          "span_ids": [
            "alvaro-144-199-EVIDENCIA-1",
            "davi-144-199-EVIDENCIA-2"
          ]
        },
        {
          "id": "c4",
          "start": 203,
          "end": 273,
          "sources": [
            "alvaro",
            "davi"
          ],
          "types": [
            "CLAIM",
            "EVIDENCIA"
          ],
          "exact_agreements": [],
          "span_ids": [
            "davi-203-247-EVIDENCIA-4",
            "alvaro-203-273-EVIDENCIA-2",
            "davi-252-273-CLAIM-3"
          ]
        },
        {
          "id": "c5",
          "start": 277,
          "end": 333,
          "sources": [
            "alvaro"
          ],
          "types": [
            "FONTE"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-277-333-FONTE-4"
          ]
        },
        {
          "id": "c6",
          "start": 335,
          "end": 459,
          "sources": [
            "alvaro"
          ],
          "types": [
            "FONTE"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-335-459-FONTE-5"
          ]
        },
        {
          "id": "c7",
          "start": 461,
          "end": 608,
          "sources": [
            "alvaro"
          ],
          "types": [
            "FONTE"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-461-608-FONTE-6"
          ]
        }
      ],
      "exact_agreement": [
        {
          "start": 98,
          "end": 143,
          "type": "CLAIM",
          "text": "A acusação de que foi paga para apoiar Kamala"
        },
        {
          "start": 144,
          "end": 199,
          "type": "EVIDENCIA",
          "text": "foi criada por Donald Trump e foi desmentida por factos"
        }
      ],
      "counts": {
        "davi": 5,
        "alvaro": 7,
        "exact_agreement": 2,
        "human_union": 10
      }
    },
    {
      "order": 12,
      "noteId": "2027161946576011568",
      "tweetId": "2027038473350529192",
      "consenso": "NMR",
      "macrotheme_label": "Religião e Símbolos",
      "tweet_text": "Curiosidade bíblica ✨\n\nDeus NUNCA disse a Eva que ela não poderia comer a maçã, o único que recebeu essa palavra diretamente de Deus foi o Adão.\n\nPor essa razão, Paulo, disse que o pecado do mundo veio a partir do Homem ≠ Humanidade. https://t.co/8Sei5VkAza",
      "note_text": "✅ N.N.N. As Sagradas Escrituras de fato não narram Eva recebendo a ordem diretamente de Deus, até porque ela não havia sido criada quando Deus deu a ordem, mas isso não significa que ela não tinha conhecimento do mandamento através de Adão e isso não foi negado na postagem.    https://www.vatican.va/archive/bible/nova_vulgata/documents/nova-vulgata_vt_genesis_lt.html",
      "is_meta": false,
      "meta_reason": "",
      "human": {
        "davi": {
          "label": "Davi",
          "status": "completed",
          "obs": "",
          "spans": [
            {
              "id": "davi-9-31-FONTE-0",
              "source_key": "davi",
              "source_label": "Davi",
              "type": "FONTE",
              "start": 9,
              "end": 31,
              "text": "As Sagradas Escrituras"
            },
            {
              "id": "davi-51-92-CLAIM-1",
              "source_key": "davi",
              "source_label": "Davi",
              "type": "CLAIM",
              "start": 51,
              "end": 92,
              "text": "Eva recebendo a ordem diretamente de Deus"
            },
            {
              "id": "davi-94-154-EVIDENCIA-2",
              "source_key": "davi",
              "source_label": "Davi",
              "type": "EVIDENCIA",
              "start": 94,
              "end": 154,
              "text": "até porque ela não havia sido criada quando Deus deu a ordem"
            },
            {
              "id": "davi-191-239-CLAIM-4",
              "source_key": "davi",
              "source_label": "Davi",
              "type": "CLAIM",
              "start": 191,
              "end": 239,
              "text": "tinha conhecimento do mandamento através de Adão"
            },
            {
              "id": "davi-242-273-EVIDENCIA-3",
              "source_key": "davi",
              "source_label": "Davi",
              "type": "EVIDENCIA",
              "start": 242,
              "end": 273,
              "text": "isso não foi negado na postagem"
            }
          ]
        },
        "alvaro": {
          "label": "Alvaro",
          "status": "completed",
          "obs": "",
          "spans": [
            {
              "id": "alvaro-9-31-FONTE-0",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 9,
              "end": 31,
              "text": "As Sagradas Escrituras"
            },
            {
              "id": "alvaro-32-92-EVIDENCIA-1",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "EVIDENCIA",
              "start": 32,
              "end": 92,
              "text": "de fato não narram Eva recebendo a ordem diretamente de Deus"
            },
            {
              "id": "alvaro-105-154-EVIDENCIA-3",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "EVIDENCIA",
              "start": 105,
              "end": 154,
              "text": "ela não havia sido criada quando Deus deu a ordem"
            },
            {
              "id": "alvaro-183-239-CLAIM-2",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "CLAIM",
              "start": 183,
              "end": 239,
              "text": "ela não tinha conhecimento do mandamento através de Adão"
            },
            {
              "id": "alvaro-278-369-FONTE-4",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 278,
              "end": 369,
              "text": "https://www.vatican.va/archive/bible/nova_vulgata/documents/nova-vulgata_vt_genesis_lt.html"
            }
          ]
        }
      },
      "automatic": {
        "e1": [
          {
            "id": "e1-0-1-EVIDENCIA-0",
            "source_key": "e1",
            "source_label": "E1",
            "type": "EVIDENCIA",
            "start": 0,
            "end": 1,
            "text": "✅"
          },
          {
            "id": "e1-51-273-CLAIM-1",
            "source_key": "e1",
            "source_label": "E1",
            "type": "CLAIM",
            "start": 51,
            "end": 273,
            "text": "Eva recebendo a ordem diretamente de Deus, até porque ela não havia sido criada quando Deus deu a ordem, mas isso não significa que ela não tinha conhecimento do mandamento através de Adão e isso não foi negado na postagem"
          },
          {
            "id": "e1-131-154-CLAIM-2",
            "source_key": "e1",
            "source_label": "E1",
            "type": "CLAIM",
            "start": 131,
            "end": 154,
            "text": "quando Deus deu a ordem"
          },
          {
            "id": "e1-183-273-CLAIM-3",
            "source_key": "e1",
            "source_label": "E1",
            "type": "CLAIM",
            "start": 183,
            "end": 273,
            "text": "ela não tinha conhecimento do mandamento através de Adão e isso não foi negado na postagem"
          },
          {
            "id": "e1-197-223-CLAIM-4",
            "source_key": "e1",
            "source_label": "E1",
            "type": "CLAIM",
            "start": 197,
            "end": 223,
            "text": "conhecimento do mandamento"
          },
          {
            "id": "e1-278-369-FONTE-5",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 278,
            "end": 369,
            "text": "https://www.vatican.va/archive/bible/nova_vulgata/documents/nova-vulgata_vt_genesis_lt.html"
          }
        ],
        "e2": [
          {
            "id": "e2-51-92-CLAIM-0",
            "source_key": "e2",
            "source_label": "E2",
            "type": "CLAIM",
            "start": 51,
            "end": 92,
            "text": "Eva recebendo a ordem diretamente de Deus"
          },
          {
            "id": "e2-105-154-EVIDENCIA-1",
            "source_key": "e2",
            "source_label": "E2",
            "type": "EVIDENCIA",
            "start": 105,
            "end": 154,
            "text": "ela não havia sido criada quando Deus deu a ordem"
          },
          {
            "id": "e2-278-369-FONTE-2",
            "source_key": "e2",
            "source_label": "E2",
            "type": "FONTE",
            "start": 278,
            "end": 369,
            "text": "https://www.vatican.va/archive/bible/nova_vulgata/documents/nova-vulgata_vt_genesis_lt.html"
          }
        ]
      },
      "clusters": [
        {
          "id": "c1",
          "start": 9,
          "end": 31,
          "sources": [
            "alvaro",
            "davi"
          ],
          "types": [
            "FONTE"
          ],
          "exact_agreements": [
            {
              "start": 9,
              "end": 31,
              "type": "FONTE"
            }
          ],
          "span_ids": [
            "alvaro-9-31-FONTE-0",
            "davi-9-31-FONTE-0"
          ]
        },
        {
          "id": "c2",
          "start": 32,
          "end": 92,
          "sources": [
            "alvaro",
            "davi"
          ],
          "types": [
            "CLAIM",
            "EVIDENCIA"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-32-92-EVIDENCIA-1",
            "davi-51-92-CLAIM-1"
          ]
        },
        {
          "id": "c3",
          "start": 94,
          "end": 154,
          "sources": [
            "alvaro",
            "davi"
          ],
          "types": [
            "EVIDENCIA"
          ],
          "exact_agreements": [],
          "span_ids": [
            "davi-94-154-EVIDENCIA-2",
            "alvaro-105-154-EVIDENCIA-3"
          ]
        },
        {
          "id": "c4",
          "start": 183,
          "end": 239,
          "sources": [
            "alvaro",
            "davi"
          ],
          "types": [
            "CLAIM"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-183-239-CLAIM-2",
            "davi-191-239-CLAIM-4"
          ]
        },
        {
          "id": "c5",
          "start": 242,
          "end": 273,
          "sources": [
            "davi"
          ],
          "types": [
            "EVIDENCIA"
          ],
          "exact_agreements": [],
          "span_ids": [
            "davi-242-273-EVIDENCIA-3"
          ]
        },
        {
          "id": "c6",
          "start": 278,
          "end": 369,
          "sources": [
            "alvaro"
          ],
          "types": [
            "FONTE"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-278-369-FONTE-4"
          ]
        }
      ],
      "exact_agreement": [
        {
          "start": 9,
          "end": 31,
          "type": "FONTE",
          "text": "As Sagradas Escrituras"
        }
      ],
      "counts": {
        "davi": 5,
        "alvaro": 5,
        "exact_agreement": 1,
        "human_union": 9
      }
    },
    {
      "order": 13,
      "noteId": "1887258714580877671",
      "tweetId": "1887227073514664195",
      "consenso": "NMR",
      "macrotheme_label": "Crise Política",
      "tweet_text": "STF não é um “tribunal ativista”, diz Barroso https://t.co/g1HXP0xyQB",
      "note_text": "  Em matéria publicada no dia 04/02/24, o jornal Estadão apurou que desde 2019 a Corte declarou mais omissões inconstitucionais (78) do que nos 28 anos anteriores (62).    A matéria evidencia com números a disposição da Corte de se envolver em questões políticas.     https://www.estadao.com.br/opiniao/o-ativismo-do-stf-em-numeros/    https://www1.folha.uol.com.br/colunas/lygia-maria/2024/12/stf-faz-ativismo-judicial-contra-liberdade-de-expressao-online.shtml    ",
      "is_meta": false,
      "meta_reason": "",
      "human": {
        "davi": {
          "label": "Davi",
          "status": "completed",
          "obs": "",
          "spans": [
            {
              "id": "davi-2-56-FONTE-0",
              "source_key": "davi",
              "source_label": "Davi",
              "type": "FONTE",
              "start": 2,
              "end": 56,
              "text": "Em matéria publicada no dia 04/02/24, o jornal Estadão"
            },
            {
              "id": "davi-68-167-EVIDENCIA-1",
              "source_key": "davi",
              "source_label": "Davi",
              "type": "EVIDENCIA",
              "start": 68,
              "end": 167,
              "text": "desde 2019 a Corte declarou mais omissões inconstitucionais (78) do que nos 28 anos anteriores (62)"
            },
            {
              "id": "davi-206-262-CLAIM-2",
              "source_key": "davi",
              "source_label": "Davi",
              "type": "CLAIM",
              "start": 206,
              "end": 262,
              "text": "disposição da Corte de se envolver em questões políticas"
            }
          ]
        },
        "alvaro": {
          "label": "Alvaro",
          "status": "completed",
          "obs": "",
          "spans": [
            {
              "id": "alvaro-2-38-FONTE-0",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 2,
              "end": 38,
              "text": "Em matéria publicada no dia 04/02/24"
            },
            {
              "id": "alvaro-40-63-FONTE-1",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 40,
              "end": 63,
              "text": "o jornal Estadão apurou"
            },
            {
              "id": "alvaro-68-168-EVIDENCIA-2",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "EVIDENCIA",
              "start": 68,
              "end": 168,
              "text": "desde 2019 a Corte declarou mais omissões inconstitucionais (78) do que nos 28 anos anteriores (62)."
            },
            {
              "id": "alvaro-172-181-FONTE-3",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 172,
              "end": 181,
              "text": "A matéria"
            },
            {
              "id": "alvaro-182-262-EVIDENCIA-4",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "EVIDENCIA",
              "start": 182,
              "end": 262,
              "text": "evidencia com números a disposição da Corte de se envolver em questões políticas"
            },
            {
              "id": "alvaro-268-331-FONTE-5",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 268,
              "end": 331,
              "text": "https://www.estadao.com.br/opiniao/o-ativismo-do-stf-em-numeros"
            },
            {
              "id": "alvaro-336-462-FONTE-6",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 336,
              "end": 462,
              "text": "https://www1.folha.uol.com.br/colunas/lygia-maria/2024/12/stf-faz-ativismo-judicial-contra-liberdade-de-expressao-online.shtml"
            }
          ]
        }
      },
      "automatic": {
        "e1": [
          {
            "id": "e1-2-168-EVIDENCIA-0",
            "source_key": "e1",
            "source_label": "E1",
            "type": "EVIDENCIA",
            "start": 2,
            "end": 168,
            "text": "Em matéria publicada no dia 04/02/24, o jornal Estadão apurou que desde 2019 a Corte declarou mais omissões inconstitucionais (78) do que nos 28 anos anteriores (62)."
          },
          {
            "id": "e1-40-95-FONTE-1",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 40,
            "end": 95,
            "text": "o jornal Estadão apurou que desde 2019 a Corte declarou"
          },
          {
            "id": "e1-47-54-FONTE-2",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 47,
            "end": 54,
            "text": "l Estad"
          },
          {
            "id": "e1-172-263-EVIDENCIA-3",
            "source_key": "e1",
            "source_label": "E1",
            "type": "EVIDENCIA",
            "start": 172,
            "end": 263,
            "text": "A matéria evidencia com números a disposição da Corte de se envolver em questões políticas."
          },
          {
            "id": "e1-259-323-FONTE-4",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 259,
            "end": 323,
            "text": "cas.     https://www.estadao.com.br/opiniao/o-ativismo-do-stf-em"
          },
          {
            "id": "e1-324-450-FONTE-5",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 324,
            "end": 450,
            "text": "numeros/    https://www1.folha.uol.com.br/colunas/lygia-maria/2024/12/stf-faz-ativismo-judicial-contra-liberdade-de-expressao-"
          }
        ],
        "e2": [
          {
            "id": "e2-2-56-FONTE-0",
            "source_key": "e2",
            "source_label": "E2",
            "type": "FONTE",
            "start": 2,
            "end": 56,
            "text": "Em matéria publicada no dia 04/02/24, o jornal Estadão"
          },
          {
            "id": "e2-68-167-EVIDENCIA-1",
            "source_key": "e2",
            "source_label": "E2",
            "type": "EVIDENCIA",
            "start": 68,
            "end": 167,
            "text": "desde 2019 a Corte declarou mais omissões inconstitucionais (78) do que nos 28 anos anteriores (62)"
          },
          {
            "id": "e2-172-262-CLAIM-2",
            "source_key": "e2",
            "source_label": "E2",
            "type": "CLAIM",
            "start": 172,
            "end": 262,
            "text": "A matéria evidencia com números a disposição da Corte de se envolver em questões políticas"
          }
        ]
      },
      "clusters": [
        {
          "id": "c1",
          "start": 2,
          "end": 63,
          "sources": [
            "alvaro",
            "davi"
          ],
          "types": [
            "FONTE"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-2-38-FONTE-0",
            "davi-2-56-FONTE-0",
            "alvaro-40-63-FONTE-1"
          ]
        },
        {
          "id": "c2",
          "start": 68,
          "end": 168,
          "sources": [
            "alvaro",
            "davi"
          ],
          "types": [
            "EVIDENCIA"
          ],
          "exact_agreements": [],
          "span_ids": [
            "davi-68-167-EVIDENCIA-1",
            "alvaro-68-168-EVIDENCIA-2"
          ]
        },
        {
          "id": "c4",
          "start": 172,
          "end": 181,
          "sources": [
            "alvaro"
          ],
          "types": [
            "FONTE"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-172-181-FONTE-3"
          ]
        },
        {
          "id": "c3",
          "start": 182,
          "end": 262,
          "sources": [
            "alvaro",
            "davi"
          ],
          "types": [
            "CLAIM",
            "EVIDENCIA"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-182-262-EVIDENCIA-4",
            "davi-206-262-CLAIM-2"
          ]
        },
        {
          "id": "c5",
          "start": 268,
          "end": 331,
          "sources": [
            "alvaro"
          ],
          "types": [
            "FONTE"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-268-331-FONTE-5"
          ]
        },
        {
          "id": "c6",
          "start": 336,
          "end": 462,
          "sources": [
            "alvaro"
          ],
          "types": [
            "FONTE"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-336-462-FONTE-6"
          ]
        }
      ],
      "exact_agreement": [],
      "counts": {
        "davi": 3,
        "alvaro": 7,
        "exact_agreement": 0,
        "human_union": 10
      }
    },
    {
      "order": 14,
      "noteId": "2028530269850910822",
      "tweetId": "2028395629790065120",
      "consenso": "NMR",
      "macrotheme_label": "",
      "tweet_text": "🇮🇱🇮🇷 Assim é o impacto de um míssil hipersónico iraniano. Aqui, fulminando o porto de Haifa, em Israel. https://t.co/N22nadScqS",
      "note_text": "O vídeo mostra a explosão no porto de Beirute em 2020, causada por nitrato de amônio, não um míssil iraniano em Haifa. O porto de Haifa permanece operacional e sem danos confirmados.    https://en.wikipedia.org/wiki/2020_Beirut_explosion    https://www.ndtv.com/world-news/adani-group-confirms-israel-based-haifa-port-fully-secure-operational-11155795    https://www.youtube.com/watch?v=LNDhIGR-83w",
      "is_meta": false,
      "meta_reason": "",
      "human": {
        "davi": {
          "label": "Davi",
          "status": "completed",
          "obs": "",
          "spans": [
            {
              "id": "davi-0-84-EVIDENCIA-0",
              "source_key": "davi",
              "source_label": "Davi",
              "type": "EVIDENCIA",
              "start": 0,
              "end": 84,
              "text": "O vídeo mostra a explosão no porto de Beirute em 2020, causada por nitrato de amônio"
            },
            {
              "id": "davi-90-117-CLAIM-1",
              "source_key": "davi",
              "source_label": "Davi",
              "type": "CLAIM",
              "start": 90,
              "end": 117,
              "text": "um míssil iraniano em Haifa"
            },
            {
              "id": "davi-119-181-EVIDENCIA-2",
              "source_key": "davi",
              "source_label": "Davi",
              "type": "EVIDENCIA",
              "start": 119,
              "end": 181,
              "text": "O porto de Haifa permanece operacional e sem danos confirmados"
            }
          ]
        },
        "alvaro": {
          "label": "Alvaro",
          "status": "completed",
          "obs": "",
          "spans": [
            {
              "id": "alvaro-0-84-EVIDENCIA-0",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "EVIDENCIA",
              "start": 0,
              "end": 84,
              "text": "O vídeo mostra a explosão no porto de Beirute em 2020, causada por nitrato de amônio"
            },
            {
              "id": "alvaro-90-117-CLAIM-1",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "CLAIM",
              "start": 90,
              "end": 117,
              "text": "um míssil iraniano em Haifa"
            },
            {
              "id": "alvaro-119-181-EVIDENCIA-2",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "EVIDENCIA",
              "start": 119,
              "end": 181,
              "text": "O porto de Haifa permanece operacional e sem danos confirmados"
            },
            {
              "id": "alvaro-186-237-FONTE-3",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 186,
              "end": 237,
              "text": "https://en.wikipedia.org/wiki/2020_Beirut_explosion"
            },
            {
              "id": "alvaro-241-351-FONTE-4",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 241,
              "end": 351,
              "text": "https://www.ndtv.com/world-news/adani-group-confirms-israel-based-haifa-port-fully-secure-operational-11155795"
            },
            {
              "id": "alvaro-355-398-FONTE-5",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 355,
              "end": 398,
              "text": "https://www.youtube.com/watch?v=LNDhIGR-83w"
            }
          ]
        }
      },
      "automatic": {
        "e1": [
          {
            "id": "e1-0-118-EVIDENCIA-0",
            "source_key": "e1",
            "source_label": "E1",
            "type": "EVIDENCIA",
            "start": 0,
            "end": 118,
            "text": "O vídeo mostra a explosão no porto de Beirute em 2020, causada por nitrato de amônio, não um míssil iraniano em Haifa."
          },
          {
            "id": "e1-170-181-EVIDENCIA-1",
            "source_key": "e1",
            "source_label": "E1",
            "type": "EVIDENCIA",
            "start": 170,
            "end": 181,
            "text": "confirmados"
          },
          {
            "id": "e1-186-237-FONTE-2",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 186,
            "end": 237,
            "text": "https://en.wikipedia.org/wiki/2020_Beirut_explosion"
          },
          {
            "id": "e1-235-345-FONTE-3",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 235,
            "end": 345,
            "text": "on    https://www.ndtv.com/world-news/adani-group-confirms-israel-based-haifa-port-fully-secure-operational-11"
          },
          {
            "id": "e1-346-389-FONTE-4",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 346,
            "end": 389,
            "text": "55795    https://www.youtube.com/watch?v=LN"
          },
          {
            "id": "e1-355-398-FONTE-5",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 355,
            "end": 398,
            "text": "https://www.youtube.com/watch?v=LNDhIGR-83w"
          }
        ],
        "e2": [
          {
            "id": "e2-0-84-EVIDENCIA-0",
            "source_key": "e2",
            "source_label": "E2",
            "type": "EVIDENCIA",
            "start": 0,
            "end": 84,
            "text": "O vídeo mostra a explosão no porto de Beirute em 2020, causada por nitrato de amônio"
          },
          {
            "id": "e2-90-117-CLAIM-1",
            "source_key": "e2",
            "source_label": "E2",
            "type": "CLAIM",
            "start": 90,
            "end": 117,
            "text": "um míssil iraniano em Haifa"
          },
          {
            "id": "e2-119-181-EVIDENCIA-2",
            "source_key": "e2",
            "source_label": "E2",
            "type": "EVIDENCIA",
            "start": 119,
            "end": 181,
            "text": "O porto de Haifa permanece operacional e sem danos confirmados"
          }
        ]
      },
      "clusters": [
        {
          "id": "c1",
          "start": 0,
          "end": 84,
          "sources": [
            "alvaro",
            "davi"
          ],
          "types": [
            "EVIDENCIA"
          ],
          "exact_agreements": [
            {
              "start": 0,
              "end": 84,
              "type": "EVIDENCIA"
            }
          ],
          "span_ids": [
            "alvaro-0-84-EVIDENCIA-0",
            "davi-0-84-EVIDENCIA-0"
          ]
        },
        {
          "id": "c2",
          "start": 90,
          "end": 117,
          "sources": [
            "alvaro",
            "davi"
          ],
          "types": [
            "CLAIM"
          ],
          "exact_agreements": [
            {
              "start": 90,
              "end": 117,
              "type": "CLAIM"
            }
          ],
          "span_ids": [
            "alvaro-90-117-CLAIM-1",
            "davi-90-117-CLAIM-1"
          ]
        },
        {
          "id": "c3",
          "start": 119,
          "end": 181,
          "sources": [
            "alvaro",
            "davi"
          ],
          "types": [
            "EVIDENCIA"
          ],
          "exact_agreements": [
            {
              "start": 119,
              "end": 181,
              "type": "EVIDENCIA"
            }
          ],
          "span_ids": [
            "alvaro-119-181-EVIDENCIA-2",
            "davi-119-181-EVIDENCIA-2"
          ]
        },
        {
          "id": "c4",
          "start": 186,
          "end": 237,
          "sources": [
            "alvaro"
          ],
          "types": [
            "FONTE"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-186-237-FONTE-3"
          ]
        },
        {
          "id": "c5",
          "start": 241,
          "end": 351,
          "sources": [
            "alvaro"
          ],
          "types": [
            "FONTE"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-241-351-FONTE-4"
          ]
        },
        {
          "id": "c6",
          "start": 355,
          "end": 398,
          "sources": [
            "alvaro"
          ],
          "types": [
            "FONTE"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-355-398-FONTE-5"
          ]
        }
      ],
      "exact_agreement": [
        {
          "start": 0,
          "end": 84,
          "type": "EVIDENCIA",
          "text": "O vídeo mostra a explosão no porto de Beirute em 2020, causada por nitrato de amônio"
        },
        {
          "start": 90,
          "end": 117,
          "type": "CLAIM",
          "text": "um míssil iraniano em Haifa"
        },
        {
          "start": 119,
          "end": 181,
          "type": "EVIDENCIA",
          "text": "O porto de Haifa permanece operacional e sem danos confirmados"
        }
      ],
      "counts": {
        "davi": 3,
        "alvaro": 6,
        "exact_agreement": 3,
        "human_union": 6
      }
    },
    {
      "order": 15,
      "noteId": "1889128334228885958",
      "tweetId": "1888958268107522407",
      "consenso": "NMR",
      "macrotheme_label": "",
      "tweet_text": "Plano de Donald Trump e Elon Musk de fechar a Usaid ameaça a mídia independente no mundo\nhttps://t.co/yft0zYpoLd",
      "note_text": "A mídia independente ou os média independentes é/são o tipo de mídia/média que não está/estão sob o controle de grandes grupos de comunicação, e que não está vinculada a compromissos com anunciantes, grupos políticos ou instituições governamentais. Simples assim.    https://pt.m.wikipedia.org/wiki/M%C3%ADdia_independente",
      "is_meta": false,
      "meta_reason": "",
      "human": {
        "davi": {
          "label": "Davi",
          "status": "completed",
          "obs": "Caso de meta nota, sem a estrutura esperada",
          "spans": []
        },
        "alvaro": {
          "label": "Alvaro",
          "status": "completed",
          "obs": "",
          "spans": [
            {
              "id": "alvaro-0-247-EVIDENCIA-0",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "EVIDENCIA",
              "start": 0,
              "end": 247,
              "text": "A mídia independente ou os média independentes é/são o tipo de mídia/média que não está/estão sob o controle de grandes grupos de comunicação, e que não está vinculada a compromissos com anunciantes, grupos políticos ou instituições governamentais"
            },
            {
              "id": "alvaro-267-322-FONTE-1",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 267,
              "end": 322,
              "text": "https://pt.m.wikipedia.org/wiki/M%C3%ADdia_independente"
            }
          ]
        }
      },
      "automatic": {
        "e1": [
          {
            "id": "e1-267-322-FONTE-0",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 267,
            "end": 322,
            "text": "https://pt.m.wikipedia.org/wiki/M%C3%ADdia_independente"
          }
        ],
        "e2": [
          {
            "id": "e2-267-322-FONTE-0",
            "source_key": "e2",
            "source_label": "E2",
            "type": "FONTE",
            "start": 267,
            "end": 322,
            "text": "https://pt.m.wikipedia.org/wiki/M%C3%ADdia_independente"
          }
        ]
      },
      "clusters": [
        {
          "id": "c1",
          "start": 0,
          "end": 247,
          "sources": [
            "alvaro"
          ],
          "types": [
            "EVIDENCIA"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-0-247-EVIDENCIA-0"
          ]
        },
        {
          "id": "c2",
          "start": 267,
          "end": 322,
          "sources": [
            "alvaro"
          ],
          "types": [
            "FONTE"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-267-322-FONTE-1"
          ]
        }
      ],
      "exact_agreement": [],
      "counts": {
        "davi": 0,
        "alvaro": 2,
        "exact_agreement": 0,
        "human_union": 2
      }
    },
    {
      "order": 16,
      "noteId": "1689843429797175692",
      "tweetId": "1689839325913956353",
      "consenso": "NMR",
      "macrotheme_label": "Futebol e Racismo",
      "tweet_text": "Algum tatuador online? Queria saber quanto custa pra tatuar essa imagem aqui https://t.co/Vbx5f7LuFf",
      "note_text": "Não é verdade que Pedro aparece sorrindo  nos acréscimos da derrota do Flamengo contra o Olimpia, pela Libertadores da América. https://ge.globo.com/futebol/times/flamengo/noticia/2023/08/10/checamos-e-falso-que-pedro-sorriu-nos-acrescimos-de-olimpia-x-flamengo.ghtml",
      "is_meta": false,
      "meta_reason": "",
      "human": {
        "davi": {
          "label": "Davi",
          "status": "completed",
          "obs": "",
          "spans": [
            {
              "id": "davi-0-126-CLAIM-0",
              "source_key": "davi",
              "source_label": "Davi",
              "type": "CLAIM",
              "start": 0,
              "end": 126,
              "text": "Não é verdade que Pedro aparece sorrindo  nos acréscimos da derrota do Flamengo contra o Olimpia, pela Libertadores da América"
            }
          ]
        },
        "alvaro": {
          "label": "Alvaro",
          "status": "completed",
          "obs": "",
          "spans": [
            {
              "id": "alvaro-0-13-EVIDENCIA-0",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "EVIDENCIA",
              "start": 0,
              "end": 13,
              "text": "Não é verdade"
            },
            {
              "id": "alvaro-18-126-CLAIM-1",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "CLAIM",
              "start": 18,
              "end": 126,
              "text": "Pedro aparece sorrindo  nos acréscimos da derrota do Flamengo contra o Olimpia, pela Libertadores da América"
            },
            {
              "id": "alvaro-128-267-FONTE-2",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 128,
              "end": 267,
              "text": "https://ge.globo.com/futebol/times/flamengo/noticia/2023/08/10/checamos-e-falso-que-pedro-sorriu-nos-acrescimos-de-olimpia-x-flamengo.ghtml"
            }
          ]
        }
      },
      "automatic": {
        "e1": [
          {
            "id": "e1-18-126-CLAIM-0",
            "source_key": "e1",
            "source_label": "E1",
            "type": "CLAIM",
            "start": 18,
            "end": 126,
            "text": "Pedro aparece sorrindo  nos acréscimos da derrota do Flamengo contra o Olimpia, pela Libertadores da América"
          },
          {
            "id": "e1-128-267-FONTE-1",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 128,
            "end": 267,
            "text": "https://ge.globo.com/futebol/times/flamengo/noticia/2023/08/10/checamos-e-falso-que-pedro-sorriu-nos-acrescimos-de-olimpia-x-flamengo.ghtml"
          }
        ],
        "e2": [
          {
            "id": "e2-18-126-CLAIM-0",
            "source_key": "e2",
            "source_label": "E2",
            "type": "CLAIM",
            "start": 18,
            "end": 126,
            "text": "Pedro aparece sorrindo  nos acréscimos da derrota do Flamengo contra o Olimpia, pela Libertadores da América"
          },
          {
            "id": "e2-128-267-FONTE-1",
            "source_key": "e2",
            "source_label": "E2",
            "type": "FONTE",
            "start": 128,
            "end": 267,
            "text": "https://ge.globo.com/futebol/times/flamengo/noticia/2023/08/10/checamos-e-falso-que-pedro-sorriu-nos-acrescimos-de-olimpia-x-flamengo.ghtml"
          }
        ]
      },
      "clusters": [
        {
          "id": "c1",
          "start": 0,
          "end": 126,
          "sources": [
            "alvaro",
            "davi"
          ],
          "types": [
            "CLAIM",
            "EVIDENCIA"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-0-13-EVIDENCIA-0",
            "davi-0-126-CLAIM-0",
            "alvaro-18-126-CLAIM-1"
          ]
        },
        {
          "id": "c2",
          "start": 128,
          "end": 267,
          "sources": [
            "alvaro"
          ],
          "types": [
            "FONTE"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-128-267-FONTE-2"
          ]
        }
      ],
      "exact_agreement": [],
      "counts": {
        "davi": 1,
        "alvaro": 3,
        "exact_agreement": 0,
        "human_union": 4
      }
    },
    {
      "order": 17,
      "noteId": "1708038777610940549",
      "tweetId": "1707822398576210131",
      "consenso": "NMR",
      "macrotheme_label": "Drogas e Saúde",
      "tweet_text": "A mim não me parece difícil: eu não fumo e por isso não tenho de levar com fumo ( que tem consequências para a minha saúde) e o cheiro horrível em espaços públicos. Ponto final.",
      "note_text": "Este tweet fala sobre uma notícia recente  sobre a Lei do tabaco em Portugal.  https://www.noticiasaominuto.com/pais/2408118/lei-do-tabaco-o-que-muda-onde-sera-proibido-fumar-e-comprar",
      "is_meta": false,
      "meta_reason": "",
      "human": {
        "davi": {
          "label": "Davi",
          "status": "completed",
          "obs": "texta se assemelha a meta nota, sem a estrutura esperada",
          "spans": []
        },
        "alvaro": {
          "label": "Alvaro",
          "status": "completed",
          "obs": "",
          "spans": [
            {
              "id": "alvaro-26-76-EVIDENCIA-1",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "EVIDENCIA",
              "start": 26,
              "end": 76,
              "text": "notícia recente  sobre a Lei do tabaco em Portugal"
            },
            {
              "id": "alvaro-79-184-FONTE-0",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 79,
              "end": 184,
              "text": "https://www.noticiasaominuto.com/pais/2408118/lei-do-tabaco-o-que-muda-onde-sera-proibido-fumar-e-comprar"
            }
          ]
        }
      },
      "automatic": {
        "e1": [
          {
            "id": "e1-79-184-FONTE-0",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 79,
            "end": 184,
            "text": "https://www.noticiasaominuto.com/pais/2408118/lei-do-tabaco-o-que-muda-onde-sera-proibido-fumar-e-comprar"
          }
        ],
        "e2": [
          {
            "id": "e2-79-184-FONTE-0",
            "source_key": "e2",
            "source_label": "E2",
            "type": "FONTE",
            "start": 79,
            "end": 184,
            "text": "https://www.noticiasaominuto.com/pais/2408118/lei-do-tabaco-o-que-muda-onde-sera-proibido-fumar-e-comprar"
          }
        ]
      },
      "clusters": [
        {
          "id": "c1",
          "start": 26,
          "end": 76,
          "sources": [
            "alvaro"
          ],
          "types": [
            "EVIDENCIA"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-26-76-EVIDENCIA-1"
          ]
        },
        {
          "id": "c2",
          "start": 79,
          "end": 184,
          "sources": [
            "alvaro"
          ],
          "types": [
            "FONTE"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-79-184-FONTE-0"
          ]
        }
      ],
      "exact_agreement": [],
      "counts": {
        "davi": 0,
        "alvaro": 2,
        "exact_agreement": 0,
        "human_union": 2
      }
    },
    {
      "order": 18,
      "noteId": "1761231589785194785",
      "tweetId": "1761174646177607773",
      "consenso": "NMR",
      "macrotheme_label": "Ataques e Conflitos",
      "tweet_text": "Da mesma forma que eu disse quando estava preso que eu não aceitaria acordo para sair da cadeia e que eu não trocaria a minha liberdade pela minha dignidade, eu digo: não troco a minha dignidade pela falsidade. Eu sou favorável à criação do Estado Palestino livre e soberano. Que possa esse Estado Palestino viver em harmonia com o Estado de Israel. O que o governo de Estado de Israel está fazendo não é guerra, é genocídio. Crianças e mulheres estão sendo assassinadas. Não tentem interpretar a entrevista que eu dei. Leiam a entrevista e parem de me julgar a partir da fala do primeiro-ministro de Israel.",
      "note_text": "genocídio  1.  extermínio deliberado, parcial ou total, de uma comunidade, grupo étnico, racial ou religioso.  2.  destruição de populações ou povos.    N° de mortos palestinos: 15.000  N° de mortos israelenses: 1.400    somente fatos.  Não use as notas pra opiniões    https://folha.com/6vzn0731  https://www.intercept.com.br/2023/10/13/israel-estes-sao-os-maiores-massacres-contra-a-palestina/",
      "is_meta": false,
      "meta_reason": "",
      "human": {
        "davi": {
          "label": "Davi",
          "status": "completed",
          "obs": "",
          "spans": [
            {
              "id": "davi-153-234-EVIDENCIA-0",
              "source_key": "davi",
              "source_label": "Davi",
              "type": "EVIDENCIA",
              "start": 153,
              "end": 234,
              "text": "N° de mortos palestinos: 15.000  N° de mortos israelenses: 1.400    somente fatos"
            }
          ]
        },
        "alvaro": {
          "label": "Alvaro",
          "status": "completed",
          "obs": "",
          "spans": [
            {
              "id": "alvaro-0-108-EVIDENCIA-0",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "EVIDENCIA",
              "start": 0,
              "end": 108,
              "text": "genocídio  1.  extermínio deliberado, parcial ou total, de uma comunidade, grupo étnico, racial ou religioso"
            },
            {
              "id": "alvaro-111-148-EVIDENCIA-1",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "EVIDENCIA",
              "start": 111,
              "end": 148,
              "text": "2.  destruição de populações ou povos"
            },
            {
              "id": "alvaro-153-217-EVIDENCIA-3",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "EVIDENCIA",
              "start": 153,
              "end": 217,
              "text": "N° de mortos palestinos: 15.000  N° de mortos israelenses: 1.400"
            },
            {
              "id": "alvaro-270-395-FONTE-2",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 270,
              "end": 395,
              "text": "https://folha.com/6vzn0731  https://www.intercept.com.br/2023/10/13/israel-estes-sao-os-maiores-massacres-contra-a-palestina/"
            }
          ]
        }
      },
      "automatic": {
        "e1": [
          {
            "id": "e1-0-109-EVIDENCIA-0",
            "source_key": "e1",
            "source_label": "E1",
            "type": "EVIDENCIA",
            "start": 0,
            "end": 109,
            "text": "genocídio  1.  extermínio deliberado, parcial ou total, de uma comunidade, grupo étnico, racial ou religioso."
          },
          {
            "id": "e1-111-113-EVIDENCIA-1",
            "source_key": "e1",
            "source_label": "E1",
            "type": "EVIDENCIA",
            "start": 111,
            "end": 113,
            "text": "2."
          },
          {
            "id": "e1-153-235-EVIDENCIA-2",
            "source_key": "e1",
            "source_label": "E1",
            "type": "EVIDENCIA",
            "start": 153,
            "end": 235,
            "text": "N° de mortos palestinos: 15.000  N° de mortos israelenses: 1.400    somente fatos."
          },
          {
            "id": "e1-255-281-FONTE-3",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 255,
            "end": 281,
            "text": "ra opiniões    https://fol"
          },
          {
            "id": "e1-270-296-FONTE-4",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 270,
            "end": 296,
            "text": "https://folha.com/6vzn0731"
          },
          {
            "id": "e1-282-379-FONTE-5",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 282,
            "end": 379,
            "text": "a.com/6vzn0731  https://www.intercept.com.br/2023/10/13/israel-estes-sao-os-maiores-massacres-con"
          }
        ],
        "e2": []
      },
      "clusters": [
        {
          "id": "c2",
          "start": 0,
          "end": 108,
          "sources": [
            "alvaro"
          ],
          "types": [
            "EVIDENCIA"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-0-108-EVIDENCIA-0"
          ]
        },
        {
          "id": "c3",
          "start": 111,
          "end": 148,
          "sources": [
            "alvaro"
          ],
          "types": [
            "EVIDENCIA"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-111-148-EVIDENCIA-1"
          ]
        },
        {
          "id": "c1",
          "start": 153,
          "end": 234,
          "sources": [
            "alvaro",
            "davi"
          ],
          "types": [
            "EVIDENCIA"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-153-217-EVIDENCIA-3",
            "davi-153-234-EVIDENCIA-0"
          ]
        },
        {
          "id": "c4",
          "start": 270,
          "end": 395,
          "sources": [
            "alvaro"
          ],
          "types": [
            "FONTE"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-270-395-FONTE-2"
          ]
        }
      ],
      "exact_agreement": [],
      "counts": {
        "davi": 1,
        "alvaro": 4,
        "exact_agreement": 0,
        "human_union": 5
      }
    },
    {
      "order": 19,
      "noteId": "1761863207252029822",
      "tweetId": "1761802572082426158",
      "consenso": "NMR",
      "macrotheme_label": "Herança Simbólica da Monarquia",
      "tweet_text": "Aí a gente chama esses porras de fascistas e eles ficam putos, pq será né. https://t.co/qAKDMVsMCq",
      "note_text": "Quem diz que chamar de fascista é opinião pessoal precisa aprender o significado de opinião pessoal. Parem de usar o &quot;NNN&quot; pra passar pano.    https://studentsforliberty.org/brazil/blog/a-historia-da-bandeira-de-gadsden/  https://mundoeducacao.uol.com.br/historiageral/fascismo.htm",
      "is_meta": false,
      "meta_reason": "",
      "human": {
        "davi": {
          "label": "Davi",
          "status": "completed",
          "obs": "Meta nota, não possui a estrutura argumentativa esperada",
          "spans": []
        },
        "alvaro": {
          "label": "Alvaro",
          "status": "completed",
          "obs": "",
          "spans": [
            {
              "id": "alvaro-153-291-FONTE-0",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 153,
              "end": 291,
              "text": "https://studentsforliberty.org/brazil/blog/a-historia-da-bandeira-de-gadsden/  https://mundoeducacao.uol.com.br/historiageral/fascismo.htm"
            }
          ]
        }
      },
      "automatic": {
        "e1": [
          {
            "id": "e1-0-8-FONTE-0",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 0,
            "end": 8,
            "text": "Quem diz"
          },
          {
            "id": "e1-0-31-EVIDENCIA-1",
            "source_key": "e1",
            "source_label": "E1",
            "type": "EVIDENCIA",
            "start": 0,
            "end": 31,
            "text": "Quem diz que chamar de fascista"
          },
          {
            "id": "e1-153-230-FONTE-2",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 153,
            "end": 230,
            "text": "https://studentsforliberty.org/brazil/blog/a-historia-da-bandeira-de-gadsden/"
          },
          {
            "id": "e1-228-287-FONTE-3",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 228,
            "end": 287,
            "text": "n/  https://mundoeducacao.uol.com.br/historiageral/fascismo"
          }
        ],
        "e2": []
      },
      "clusters": [
        {
          "id": "c1",
          "start": 153,
          "end": 291,
          "sources": [
            "alvaro"
          ],
          "types": [
            "FONTE"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-153-291-FONTE-0"
          ]
        }
      ],
      "exact_agreement": [],
      "counts": {
        "davi": 0,
        "alvaro": 1,
        "exact_agreement": 0,
        "human_union": 1
      }
    },
    {
      "order": 20,
      "noteId": "1882118498148642865",
      "tweetId": "1882059986169200647",
      "consenso": "NMR",
      "macrotheme_label": "Clima e Ambiente",
      "tweet_text": "A área queimada no Brasil cresceu quase 80% em 2024. O bioma mais afetado foi a Amazônia, com mais da metade da área queimada. Os dados são de levantamento do MapBiomas. @JornPriMoraes detalha.\n\n➡ Assista ao #ConexãoGloboNews: https://t.co/bFwcwLpLU9 #GloboNews https://t.co/MdeSvfGtDX",
      "note_text": "Um breve comentário:    1- NNN = Nota não necessária. Não usem a sigla se a nota for necessária no post.    2- Notas da comunidade não servem apenas para posts mentirosos como correção. Também servem para acrescentar contexto útil às notas, como é o caso do post da Globo.    https://communitynotes.x.com/guide/pt/about/introduction",
      "is_meta": false,
      "meta_reason": "",
      "human": {
        "davi": {
          "label": "Davi",
          "status": "completed",
          "obs": "Meta nota, não possui a estrutura esperada",
          "spans": []
        },
        "alvaro": {
          "label": "Alvaro",
          "status": "completed",
          "obs": "",
          "spans": []
        }
      },
      "automatic": {
        "e1": [
          {
            "id": "e1-149-184-CLAIM-0",
            "source_key": "e1",
            "source_label": "E1",
            "type": "CLAIM",
            "start": 149,
            "end": 184,
            "text": "para posts mentirosos como correção"
          },
          {
            "id": "e1-260-265-FONTE-1",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 260,
            "end": 265,
            "text": "st da"
          },
          {
            "id": "e1-267-323-FONTE-2",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 267,
            "end": 323,
            "text": "lobo.    https://communitynotes.x.com/guide/pt/about/int"
          }
        ],
        "e2": []
      },
      "clusters": [],
      "exact_agreement": [],
      "counts": {
        "davi": 0,
        "alvaro": 0,
        "exact_agreement": 0,
        "human_union": 0
      }
    },
    {
      "order": 21,
      "noteId": "1878062635578458242",
      "tweetId": "1877860643430142405",
      "consenso": "CRH",
      "macrotheme_label": "Musk e Censura",
      "tweet_text": "Gente, olha isso parece filme Sci fi tipo uma invasão alienígena, mas é LA em chamas ! https://t.co/bxcmcPGiWf",
      "note_text": "O vídeo é falso, foi gerado por inteligência artificial.  https://x.com/jorge_espinhara/status/1878061893484462087",
      "is_meta": false,
      "meta_reason": "",
      "human": {
        "davi": {
          "label": "Davi",
          "status": "completed",
          "obs": "",
          "spans": [
            {
              "id": "davi-0-15-CLAIM-0",
              "source_key": "davi",
              "source_label": "Davi",
              "type": "CLAIM",
              "start": 0,
              "end": 15,
              "text": "O vídeo é falso"
            },
            {
              "id": "davi-17-55-EVIDENCIA-1",
              "source_key": "davi",
              "source_label": "Davi",
              "type": "EVIDENCIA",
              "start": 17,
              "end": 55,
              "text": "foi gerado por inteligência artificial"
            }
          ]
        },
        "alvaro": {
          "label": "Alvaro",
          "status": "completed",
          "obs": "",
          "spans": [
            {
              "id": "alvaro-0-55-EVIDENCIA-0",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "EVIDENCIA",
              "start": 0,
              "end": 55,
              "text": "O vídeo é falso, foi gerado por inteligência artificial"
            },
            {
              "id": "alvaro-58-114-FONTE-1",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 58,
              "end": 114,
              "text": "https://x.com/jorge_espinhara/status/1878061893484462087"
            }
          ]
        }
      },
      "automatic": {
        "e1": [
          {
            "id": "e1-58-114-FONTE-0",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 58,
            "end": 114,
            "text": "https://x.com/jorge_espinhara/status/1878061893484462087"
          }
        ],
        "e2": [
          {
            "id": "e2-0-15-CLAIM-0",
            "source_key": "e2",
            "source_label": "E2",
            "type": "CLAIM",
            "start": 0,
            "end": 15,
            "text": "O vídeo é falso"
          },
          {
            "id": "e2-17-55-EVIDENCIA-1",
            "source_key": "e2",
            "source_label": "E2",
            "type": "EVIDENCIA",
            "start": 17,
            "end": 55,
            "text": "foi gerado por inteligência artificial"
          }
        ]
      },
      "clusters": [
        {
          "id": "c1",
          "start": 0,
          "end": 55,
          "sources": [
            "alvaro",
            "davi"
          ],
          "types": [
            "CLAIM",
            "EVIDENCIA"
          ],
          "exact_agreements": [],
          "span_ids": [
            "davi-0-15-CLAIM-0",
            "alvaro-0-55-EVIDENCIA-0",
            "davi-17-55-EVIDENCIA-1"
          ]
        },
        {
          "id": "c2",
          "start": 58,
          "end": 114,
          "sources": [
            "alvaro"
          ],
          "types": [
            "FONTE"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-58-114-FONTE-1"
          ]
        }
      ],
      "exact_agreement": [],
      "counts": {
        "davi": 2,
        "alvaro": 2,
        "exact_agreement": 0,
        "human_union": 4
      }
    },
    {
      "order": 22,
      "noteId": "1760000020819103825",
      "tweetId": "1759985214586019894",
      "consenso": "CRH",
      "macrotheme_label": "Racismo e Liberdade",
      "tweet_text": "🚨 #RACISMO Charge publicada no Jornal \"The New York Times\" compara presidente Luiz Inácio Lula da Silva a um chimpanzé. #EquipeJT https://t.co/IJcxAjZ8Jr",
      "note_text": "Diferentemente do que vem sido apontado, a charge não foi publicada no New York Times. Ela é criação do israelense Johnathan Majburd e foi compartilhada em suas redes sociais. A referência ao NYT fica apenas por referência à manchete que ele referência na imagem.  https://www.instagram.com/j.majburd?igsh=eTlxeTlxaGZxeDZi  https://www.nytimes.com/2024/02/18/world/middleeast/brazil-lula-israel-gaza-holocaust.html",
      "is_meta": false,
      "meta_reason": "",
      "human": {
        "davi": {
          "label": "Davi",
          "status": "completed",
          "obs": "",
          "spans": [
            {
              "id": "davi-41-85-CLAIM-0",
              "source_key": "davi",
              "source_label": "Davi",
              "type": "CLAIM",
              "start": 41,
              "end": 85,
              "text": "a charge não foi publicada no New York Times"
            },
            {
              "id": "davi-87-174-EVIDENCIA-1",
              "source_key": "davi",
              "source_label": "Davi",
              "type": "EVIDENCIA",
              "start": 87,
              "end": 174,
              "text": "Ela é criação do israelense Johnathan Majburd e foi compartilhada em suas redes sociais"
            }
          ]
        },
        "alvaro": {
          "label": "Alvaro",
          "status": "completed",
          "obs": "",
          "spans": [
            {
              "id": "alvaro-0-39-QUALIFICADOR-0",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "QUALIFICADOR",
              "start": 0,
              "end": 39,
              "text": "Diferentemente do que vem sido apontado"
            },
            {
              "id": "alvaro-41-85-EVIDENCIA-1",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "EVIDENCIA",
              "start": 41,
              "end": 85,
              "text": "a charge não foi publicada no New York Times"
            },
            {
              "id": "alvaro-87-174-EVIDENCIA-2",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "EVIDENCIA",
              "start": 87,
              "end": 174,
              "text": "Ela é criação do israelense Johnathan Majburd e foi compartilhada em suas redes sociais"
            },
            {
              "id": "alvaro-176-262-EVIDENCIA-3",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "EVIDENCIA",
              "start": 176,
              "end": 262,
              "text": "A referência ao NYT fica apenas por referência à manchete que ele referência na imagem"
            },
            {
              "id": "alvaro-265-322-FONTE-4",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 265,
              "end": 322,
              "text": "https://www.instagram.com/j.majburd?igsh=eTlxeTlxaGZxeDZi"
            },
            {
              "id": "alvaro-324-414-FONTE-5",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 324,
              "end": 414,
              "text": "https://www.nytimes.com/2024/02/18/world/middleeast/brazil-lula-israel-gaza-holocaust.html"
            }
          ]
        }
      },
      "automatic": {
        "e1": [
          {
            "id": "e1-0-39-CLAIM-0",
            "source_key": "e1",
            "source_label": "E1",
            "type": "CLAIM",
            "start": 0,
            "end": 39,
            "text": "Diferentemente do que vem sido apontado"
          },
          {
            "id": "e1-71-85-FONTE-1",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 71,
            "end": 85,
            "text": "New York Times"
          },
          {
            "id": "e1-265-322-FONTE-2",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 265,
            "end": 322,
            "text": "https://www.instagram.com/j.majburd?igsh=eTlxeTlxaGZxeDZi"
          },
          {
            "id": "e1-324-414-FONTE-3",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 324,
            "end": 414,
            "text": "https://www.nytimes.com/2024/02/18/world/middleeast/brazil-lula-israel-gaza-holocaust.html"
          }
        ],
        "e2": [
          {
            "id": "e2-41-85-CLAIM-0",
            "source_key": "e2",
            "source_label": "E2",
            "type": "CLAIM",
            "start": 41,
            "end": 85,
            "text": "a charge não foi publicada no New York Times"
          },
          {
            "id": "e2-87-174-EVIDENCIA-1",
            "source_key": "e2",
            "source_label": "E2",
            "type": "EVIDENCIA",
            "start": 87,
            "end": 174,
            "text": "Ela é criação do israelense Johnathan Majburd e foi compartilhada em suas redes sociais"
          },
          {
            "id": "e2-176-262-EVIDENCIA-2",
            "source_key": "e2",
            "source_label": "E2",
            "type": "EVIDENCIA",
            "start": 176,
            "end": 262,
            "text": "A referência ao NYT fica apenas por referência à manchete que ele referência na imagem"
          }
        ]
      },
      "clusters": [
        {
          "id": "c3",
          "start": 0,
          "end": 39,
          "sources": [
            "alvaro"
          ],
          "types": [
            "QUALIFICADOR"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-0-39-QUALIFICADOR-0"
          ]
        },
        {
          "id": "c1",
          "start": 41,
          "end": 85,
          "sources": [
            "alvaro",
            "davi"
          ],
          "types": [
            "CLAIM",
            "EVIDENCIA"
          ],
          "exact_agreements": [],
          "span_ids": [
            "davi-41-85-CLAIM-0",
            "alvaro-41-85-EVIDENCIA-1"
          ]
        },
        {
          "id": "c2",
          "start": 87,
          "end": 174,
          "sources": [
            "alvaro",
            "davi"
          ],
          "types": [
            "EVIDENCIA"
          ],
          "exact_agreements": [
            {
              "start": 87,
              "end": 174,
              "type": "EVIDENCIA"
            }
          ],
          "span_ids": [
            "alvaro-87-174-EVIDENCIA-2",
            "davi-87-174-EVIDENCIA-1"
          ]
        },
        {
          "id": "c4",
          "start": 176,
          "end": 262,
          "sources": [
            "alvaro"
          ],
          "types": [
            "EVIDENCIA"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-176-262-EVIDENCIA-3"
          ]
        },
        {
          "id": "c5",
          "start": 265,
          "end": 322,
          "sources": [
            "alvaro"
          ],
          "types": [
            "FONTE"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-265-322-FONTE-4"
          ]
        },
        {
          "id": "c6",
          "start": 324,
          "end": 414,
          "sources": [
            "alvaro"
          ],
          "types": [
            "FONTE"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-324-414-FONTE-5"
          ]
        }
      ],
      "exact_agreement": [
        {
          "start": 87,
          "end": 174,
          "type": "EVIDENCIA",
          "text": "Ela é criação do israelense Johnathan Majburd e foi compartilhada em suas redes sociais"
        }
      ],
      "counts": {
        "davi": 2,
        "alvaro": 6,
        "exact_agreement": 1,
        "human_union": 7
      }
    },
    {
      "order": 23,
      "noteId": "2019861320049271125",
      "tweetId": "2019768241061495002",
      "consenso": "CRH",
      "macrotheme_label": "Política de Imigração",
      "tweet_text": "Vladimir Putin chegou ao Brasil.\nE o mundo todo está de olho no seu encontro com o maior estadista do planeta Luís Inácio Lula da Silva.\n\n@LulaOficial é exemplo de Diplomacia Internacional, é recebido com tapete vermelho em todos os países que visita e quando retorna deixa a s https://t.co/G6jrl2WUZS",
      "note_text": "Ao contrário do que diz o post, Vladimir Putin não veio ao Brasil, e sim uma comitiva russa comandada pelo primeiro-ministro Mikhail Mishustin.    https://platobr.com.br/por-que-uma-extensa-comitiva-do-governo-putin-desembarcou-em-brasilia    https://www.cnnbrasil.com.br/politica/em-declaracao-conjunta-brasil-e-russia-afirmam-ter-compromisso-com-a-paz/",
      "is_meta": false,
      "meta_reason": "",
      "human": {
        "davi": {
          "label": "Davi",
          "status": "completed",
          "obs": "",
          "spans": [
            {
              "id": "davi-32-65-CLAIM-0",
              "source_key": "davi",
              "source_label": "Davi",
              "type": "CLAIM",
              "start": 32,
              "end": 65,
              "text": "Vladimir Putin não veio ao Brasil"
            },
            {
              "id": "davi-73-142-EVIDENCIA-1",
              "source_key": "davi",
              "source_label": "Davi",
              "type": "EVIDENCIA",
              "start": 73,
              "end": 142,
              "text": "uma comitiva russa comandada pelo primeiro-ministro Mikhail Mishustin"
            }
          ]
        },
        "alvaro": {
          "label": "Alvaro",
          "status": "completed",
          "obs": "",
          "spans": [
            {
              "id": "alvaro-32-142-EVIDENCIA-0",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "EVIDENCIA",
              "start": 32,
              "end": 142,
              "text": "Vladimir Putin não veio ao Brasil, e sim uma comitiva russa comandada pelo primeiro-ministro Mikhail Mishustin"
            },
            {
              "id": "alvaro-147-239-FONTE-1",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 147,
              "end": 239,
              "text": "https://platobr.com.br/por-que-uma-extensa-comitiva-do-governo-putin-desembarcou-em-brasilia"
            },
            {
              "id": "alvaro-243-353-FONTE-2",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 243,
              "end": 353,
              "text": "https://www.cnnbrasil.com.br/politica/em-declaracao-conjunta-brasil-e-russia-afirmam-ter-compromisso-com-a-paz"
            }
          ]
        }
      },
      "automatic": {
        "e1": [
          {
            "id": "e1-0-23-FONTE-0",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 0,
            "end": 23,
            "text": "Ao contrário do que diz"
          },
          {
            "id": "e1-0-30-CLAIM-1",
            "source_key": "e1",
            "source_label": "E1",
            "type": "CLAIM",
            "start": 0,
            "end": 30,
            "text": "Ao contrário do que diz o post"
          },
          {
            "id": "e1-16-31-EVIDENCIA-2",
            "source_key": "e1",
            "source_label": "E1",
            "type": "EVIDENCIA",
            "start": 16,
            "end": 31,
            "text": "que diz o post,"
          },
          {
            "id": "e1-147-239-FONTE-3",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 147,
            "end": 239,
            "text": "https://platobr.com.br/por-que-uma-extensa-comitiva-do-governo-putin-desembarcou-em-brasilia"
          },
          {
            "id": "e1-237-348-FONTE-4",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 237,
            "end": 348,
            "text": "ia    https://www.cnnbrasil.com.br/politica/em-declaracao-conjunta-brasil-e-russia-afirmam-ter-compromisso-com-"
          }
        ],
        "e2": [
          {
            "id": "e2-32-65-CLAIM-0",
            "source_key": "e2",
            "source_label": "E2",
            "type": "CLAIM",
            "start": 32,
            "end": 65,
            "text": "Vladimir Putin não veio ao Brasil"
          },
          {
            "id": "e2-73-142-EVIDENCIA-1",
            "source_key": "e2",
            "source_label": "E2",
            "type": "EVIDENCIA",
            "start": 73,
            "end": 142,
            "text": "uma comitiva russa comandada pelo primeiro-ministro Mikhail Mishustin"
          }
        ]
      },
      "clusters": [
        {
          "id": "c1",
          "start": 32,
          "end": 142,
          "sources": [
            "alvaro",
            "davi"
          ],
          "types": [
            "CLAIM",
            "EVIDENCIA"
          ],
          "exact_agreements": [],
          "span_ids": [
            "davi-32-65-CLAIM-0",
            "alvaro-32-142-EVIDENCIA-0",
            "davi-73-142-EVIDENCIA-1"
          ]
        },
        {
          "id": "c2",
          "start": 147,
          "end": 239,
          "sources": [
            "alvaro"
          ],
          "types": [
            "FONTE"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-147-239-FONTE-1"
          ]
        },
        {
          "id": "c3",
          "start": 243,
          "end": 353,
          "sources": [
            "alvaro"
          ],
          "types": [
            "FONTE"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-243-353-FONTE-2"
          ]
        }
      ],
      "exact_agreement": [],
      "counts": {
        "davi": 2,
        "alvaro": 3,
        "exact_agreement": 0,
        "human_union": 5
      }
    },
    {
      "order": 24,
      "noteId": "2025149321335673124",
      "tweetId": "2024999461840154822",
      "consenso": "CRH",
      "macrotheme_label": "Sátira de humorista",
      "tweet_text": "🚨 GENTE, EU PRECISO DE CONSELHO🚨\nCasei… e minha sogra me deu esse jogo de pratos. Ela ganhou no casamento dela, guardou com todo carinho por anos e agora me deu. 🥹 Só que eu vou ser bem sincera: eu achei MUITO cafona 😭\nJá comprei o meu jogo lindo, do jeitinho que eu sonhei + https://t.co/1dKiWOynax",
      "note_text": "O post é uma cópia de uma postagem feita no Facebook, contendo até mesmo a foto da postagem original, com o claro intuito de gerar engajamento.    https://x.com/i/status/2025083951623139392",
      "is_meta": false,
      "meta_reason": "",
      "human": {
        "davi": {
          "label": "Davi",
          "status": "completed",
          "obs": "Meta nota, sem a esrtutura esperada",
          "spans": []
        },
        "alvaro": {
          "label": "Alvaro",
          "status": "completed",
          "obs": "",
          "spans": [
            {
              "id": "alvaro-0-143-EVIDENCIA-0",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "EVIDENCIA",
              "start": 0,
              "end": 143,
              "text": "O post é uma cópia de uma postagem feita no Facebook, contendo até mesmo a foto da postagem original, com o claro intuito de gerar engajamento."
            },
            {
              "id": "alvaro-147-189-FONTE-1",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 147,
              "end": 189,
              "text": "https://x.com/i/status/2025083951623139392"
            }
          ]
        }
      },
      "automatic": {
        "e1": [
          {
            "id": "e1-147-189-FONTE-0",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 147,
            "end": 189,
            "text": "https://x.com/i/status/2025083951623139392"
          }
        ],
        "e2": [
          {
            "id": "e2-0-52-EVIDENCIA-0",
            "source_key": "e2",
            "source_label": "E2",
            "type": "EVIDENCIA",
            "start": 0,
            "end": 52,
            "text": "O post é uma cópia de uma postagem feita no Facebook"
          },
          {
            "id": "e2-54-100-EVIDENCIA-1",
            "source_key": "e2",
            "source_label": "E2",
            "type": "EVIDENCIA",
            "start": 54,
            "end": 100,
            "text": "contendo até mesmo a foto da postagem original"
          },
          {
            "id": "e2-102-142-CLAIM-2",
            "source_key": "e2",
            "source_label": "E2",
            "type": "CLAIM",
            "start": 102,
            "end": 142,
            "text": "com o claro intuito de gerar engajamento"
          }
        ]
      },
      "clusters": [
        {
          "id": "c1",
          "start": 0,
          "end": 143,
          "sources": [
            "alvaro"
          ],
          "types": [
            "EVIDENCIA"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-0-143-EVIDENCIA-0"
          ]
        },
        {
          "id": "c2",
          "start": 147,
          "end": 189,
          "sources": [
            "alvaro"
          ],
          "types": [
            "FONTE"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-147-189-FONTE-1"
          ]
        }
      ],
      "exact_agreement": [],
      "counts": {
        "davi": 0,
        "alvaro": 2,
        "exact_agreement": 0,
        "human_union": 2
      }
    },
    {
      "order": 25,
      "noteId": "2023720510257856645",
      "tweetId": "2023697858030178714",
      "consenso": "CRH",
      "macrotheme_label": "",
      "tweet_text": "Flávio Dino pulando carnaval fazendo o “L”. \n\nO nome disso, na legislação vigente, é crime de responsabilidade por atividade político-partidária, o que é vedado aos ministros do STF.\n\nLEI Nº 1.079:\n\nArt. 39. São crimes de responsabilidade dos Ministros do Supremo Tribunal https://t.co/xuCdUPP2bG",
      "note_text": "O vídeo em questão é de 2023 e não de 2026 como alega o advogado. No referido ano Flávio Dino não era ministro do STF e sim ministro da justiça, cargo que não impõe restrição político-partidária.       https://youtu.be/e-TeRqVLbbU?si=aAatt7N7dq5ETb3b",
      "is_meta": false,
      "meta_reason": "",
      "human": {
        "davi": {
          "label": "Davi",
          "status": "completed",
          "obs": "",
          "spans": [
            {
              "id": "davi-0-28-EVIDENCIA-0",
              "source_key": "davi",
              "source_label": "Davi",
              "type": "EVIDENCIA",
              "start": 0,
              "end": 28,
              "text": "O vídeo em questão é de 2023"
            },
            {
              "id": "davi-31-64-CLAIM-1",
              "source_key": "davi",
              "source_label": "Davi",
              "type": "CLAIM",
              "start": 31,
              "end": 64,
              "text": "não de 2026 como alega o advogado"
            },
            {
              "id": "davi-82-194-EVIDENCIA-2",
              "source_key": "davi",
              "source_label": "Davi",
              "type": "EVIDENCIA",
              "start": 82,
              "end": 194,
              "text": "Flávio Dino não era ministro do STF e sim ministro da justiça, cargo que não impõe restrição político-partidária"
            }
          ]
        },
        "alvaro": {
          "label": "Alvaro",
          "status": "completed",
          "obs": "",
          "spans": [
            {
              "id": "alvaro-0-194-EVIDENCIA-0",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "EVIDENCIA",
              "start": 0,
              "end": 194,
              "text": "O vídeo em questão é de 2023 e não de 2026 como alega o advogado. No referido ano Flávio Dino não era ministro do STF e sim ministro da justiça, cargo que não impõe restrição político-partidária"
            },
            {
              "id": "alvaro-202-250-FONTE-1",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 202,
              "end": 250,
              "text": "https://youtu.be/e-TeRqVLbbU?si=aAatt7N7dq5ETb3b"
            }
          ]
        }
      },
      "automatic": {
        "e1": [
          {
            "id": "e1-0-18-CLAIM-0",
            "source_key": "e1",
            "source_label": "E1",
            "type": "CLAIM",
            "start": 0,
            "end": 18,
            "text": "O vídeo em questão"
          },
          {
            "id": "e1-0-65-EVIDENCIA-1",
            "source_key": "e1",
            "source_label": "E1",
            "type": "EVIDENCIA",
            "start": 0,
            "end": 65,
            "text": "O vídeo em questão é de 2023 e não de 2026 como alega o advogado."
          },
          {
            "id": "e1-165-194-CLAIM-2",
            "source_key": "e1",
            "source_label": "E1",
            "type": "CLAIM",
            "start": 165,
            "end": 194,
            "text": "restrição político-partidária"
          },
          {
            "id": "e1-202-250-FONTE-3",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 202,
            "end": 250,
            "text": "https://youtu.be/e-TeRqVLbbU?si=aAatt7N7dq5ETb3b"
          }
        ],
        "e2": [
          {
            "id": "e2-0-28-EVIDENCIA-0",
            "source_key": "e2",
            "source_label": "E2",
            "type": "EVIDENCIA",
            "start": 0,
            "end": 28,
            "text": "O vídeo em questão é de 2023"
          },
          {
            "id": "e2-35-64-CLAIM-1",
            "source_key": "e2",
            "source_label": "E2",
            "type": "CLAIM",
            "start": 35,
            "end": 64,
            "text": "de 2026 como alega o advogado"
          },
          {
            "id": "e2-66-143-EVIDENCIA-2",
            "source_key": "e2",
            "source_label": "E2",
            "type": "EVIDENCIA",
            "start": 66,
            "end": 143,
            "text": "No referido ano Flávio Dino não era ministro do STF e sim ministro da justiça"
          },
          {
            "id": "e2-145-194-EVIDENCIA-3",
            "source_key": "e2",
            "source_label": "E2",
            "type": "EVIDENCIA",
            "start": 145,
            "end": 194,
            "text": "cargo que não impõe restrição político-partidária"
          }
        ]
      },
      "clusters": [
        {
          "id": "c1",
          "start": 0,
          "end": 194,
          "sources": [
            "alvaro",
            "davi"
          ],
          "types": [
            "CLAIM",
            "EVIDENCIA"
          ],
          "exact_agreements": [],
          "span_ids": [
            "davi-0-28-EVIDENCIA-0",
            "alvaro-0-194-EVIDENCIA-0",
            "davi-31-64-CLAIM-1",
            "davi-82-194-EVIDENCIA-2"
          ]
        },
        {
          "id": "c2",
          "start": 202,
          "end": 250,
          "sources": [
            "alvaro"
          ],
          "types": [
            "FONTE"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-202-250-FONTE-1"
          ]
        }
      ],
      "exact_agreement": [],
      "counts": {
        "davi": 3,
        "alvaro": 2,
        "exact_agreement": 0,
        "human_union": 5
      }
    },
    {
      "order": 26,
      "noteId": "1877812049759416365",
      "tweetId": "1877803883990221079",
      "consenso": "CRH",
      "macrotheme_label": "Sátira clara",
      "tweet_text": "“O que é ‘notas da comunidade’? No X, só pode dar nota quem é verificado, e você tem que pagar por isso. Então, não é bem comunidade. É de pagantes, de assinantes. (...) A nota da comunidade não substitui a checagem dos fatos. Ponto. Essa história de ‘notas da comunidade’ é https://t.co/z266CFwOvL",
      "note_text": "Não é necessário ser assinante do X para escrever ou votar em notas da comunidade. Qualquer usuário com conta ativa e que atenda aos critérios básicos de participação pode contribuir com as notas. Essa informação está disponível diretamente nas diretrizes da ferramenta.  https://communitynotes.x.com/guide/pt/contributing/signing-up",
      "is_meta": false,
      "meta_reason": "",
      "human": {
        "davi": {
          "label": "Davi",
          "status": "completed",
          "obs": "",
          "spans": [
            {
              "id": "davi-0-81-CLAIM-0",
              "source_key": "davi",
              "source_label": "Davi",
              "type": "CLAIM",
              "start": 0,
              "end": 81,
              "text": "Não é necessário ser assinante do X para escrever ou votar em notas da comunidade"
            },
            {
              "id": "davi-83-195-EVIDENCIA-1",
              "source_key": "davi",
              "source_label": "Davi",
              "type": "EVIDENCIA",
              "start": 83,
              "end": 195,
              "text": "Qualquer usuário com conta ativa e que atenda aos critérios básicos de participação pode contribuir com as notas"
            }
          ]
        },
        "alvaro": {
          "label": "Alvaro",
          "status": "completed",
          "obs": "",
          "spans": [
            {
              "id": "alvaro-0-81-EVIDENCIA-0",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "EVIDENCIA",
              "start": 0,
              "end": 81,
              "text": "Não é necessário ser assinante do X para escrever ou votar em notas da comunidade"
            },
            {
              "id": "alvaro-83-195-EVIDENCIA-1",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "EVIDENCIA",
              "start": 83,
              "end": 195,
              "text": "Qualquer usuário com conta ativa e que atenda aos critérios básicos de participação pode contribuir com as notas"
            },
            {
              "id": "alvaro-197-269-EVIDENCIA-3",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "EVIDENCIA",
              "start": 197,
              "end": 269,
              "text": "Essa informação está disponível diretamente nas diretrizes da ferramenta"
            },
            {
              "id": "alvaro-272-333-FONTE-2",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 272,
              "end": 333,
              "text": "https://communitynotes.x.com/guide/pt/contributing/signing-up"
            }
          ]
        }
      },
      "automatic": {
        "e1": [
          {
            "id": "e1-272-333-FONTE-0",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 272,
            "end": 333,
            "text": "https://communitynotes.x.com/guide/pt/contributing/signing-up"
          }
        ],
        "e2": [
          {
            "id": "e2-17-81-CLAIM-0",
            "source_key": "e2",
            "source_label": "E2",
            "type": "CLAIM",
            "start": 17,
            "end": 81,
            "text": "ser assinante do X para escrever ou votar em notas da comunidade"
          },
          {
            "id": "e2-83-195-EVIDENCIA-1",
            "source_key": "e2",
            "source_label": "E2",
            "type": "EVIDENCIA",
            "start": 83,
            "end": 195,
            "text": "Qualquer usuário com conta ativa e que atenda aos critérios básicos de participação pode contribuir com as notas"
          },
          {
            "id": "e2-245-269-FONTE-2",
            "source_key": "e2",
            "source_label": "E2",
            "type": "FONTE",
            "start": 245,
            "end": 269,
            "text": "diretrizes da ferramenta"
          }
        ]
      },
      "clusters": [
        {
          "id": "c1",
          "start": 0,
          "end": 81,
          "sources": [
            "alvaro",
            "davi"
          ],
          "types": [
            "CLAIM",
            "EVIDENCIA"
          ],
          "exact_agreements": [],
          "span_ids": [
            "davi-0-81-CLAIM-0",
            "alvaro-0-81-EVIDENCIA-0"
          ]
        },
        {
          "id": "c2",
          "start": 83,
          "end": 195,
          "sources": [
            "alvaro",
            "davi"
          ],
          "types": [
            "EVIDENCIA"
          ],
          "exact_agreements": [
            {
              "start": 83,
              "end": 195,
              "type": "EVIDENCIA"
            }
          ],
          "span_ids": [
            "alvaro-83-195-EVIDENCIA-1",
            "davi-83-195-EVIDENCIA-1"
          ]
        },
        {
          "id": "c3",
          "start": 197,
          "end": 269,
          "sources": [
            "alvaro"
          ],
          "types": [
            "EVIDENCIA"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-197-269-EVIDENCIA-3"
          ]
        },
        {
          "id": "c4",
          "start": 272,
          "end": 333,
          "sources": [
            "alvaro"
          ],
          "types": [
            "FONTE"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-272-333-FONTE-2"
          ]
        }
      ],
      "exact_agreement": [
        {
          "start": 83,
          "end": 195,
          "type": "EVIDENCIA",
          "text": "Qualquer usuário com conta ativa e que atenda aos critérios básicos de participação pode contribuir com as notas"
        }
      ],
      "counts": {
        "davi": 2,
        "alvaro": 4,
        "exact_agreement": 1,
        "human_union": 5
      }
    },
    {
      "order": 27,
      "noteId": "1941004407832752217",
      "tweetId": "1940455875422130639",
      "consenso": "CRH",
      "macrotheme_label": "Pobreza e Trabalho",
      "tweet_text": "❤️‍🩹 BOAS NOTÍCIAS\n\nO Presidente Lula acaba de sancionar mudanças importantes no INSS.\n\nAgora, pessoas aposentadas devido ao Alzheimer, ao Parkinson, à esclerose lateral amórfica e à Aids não farão mais a perícia contínua.\n\nÉ um absurdo obrigar que pessoas com doenças sem cura tenham que provar constantemente ao Estado que estão doentes, e parabenizo o Presidente Lula pela sanção.",
      "note_text": "    Não é verdade que o Presidente Lula SANCIONOU a lei. O presidente VETOU e o veto foi DERRUBADO pelo congresso. Portanto, o Presidente PROMULGOU a lei, dentro do prazo previsto de 48h. Sancionar é o mesmo que concordar. O Presidente VETOU, portanto não concordou.     https://www.cnnbrasil.com.br/politica/lula-veta-dispensa-de-reavaliacao-de-aposentadoria-para-incapacitados-permanentes/    https://oglobo.globo.com/economia/noticia/2025/06/23/inss-proposta-que-derruba-veto-do-governo-e-dispensa-revisao-de-pericia-medica-aguarda-promulgacao.ghtml    https://legis.senado.leg.br/sdleg-getter/documento?dm=9851178&amp;ts=1732798164326&amp;disposition=inline",
      "is_meta": false,
      "meta_reason": "",
      "human": {
        "davi": {
          "label": "Davi",
          "status": "completed",
          "obs": "",
          "spans": [
            {
              "id": "davi-4-55-CLAIM-0",
              "source_key": "davi",
              "source_label": "Davi",
              "type": "CLAIM",
              "start": 4,
              "end": 55,
              "text": "Não é verdade que o Presidente Lula SANCIONOU a lei"
            },
            {
              "id": "davi-57-113-EVIDENCIA-1",
              "source_key": "davi",
              "source_label": "Davi",
              "type": "EVIDENCIA",
              "start": 57,
              "end": 113,
              "text": "O presidente VETOU e o veto foi DERRUBADO pelo congresso"
            }
          ]
        },
        "alvaro": {
          "label": "Alvaro",
          "status": "completed",
          "obs": "",
          "spans": [
            {
              "id": "alvaro-4-55-EVIDENCIA-0",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "EVIDENCIA",
              "start": 4,
              "end": 55,
              "text": "Não é verdade que o Presidente Lula SANCIONOU a lei"
            },
            {
              "id": "alvaro-57-113-EVIDENCIA-1",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "EVIDENCIA",
              "start": 57,
              "end": 113,
              "text": "O presidente VETOU e o veto foi DERRUBADO pelo congresso"
            },
            {
              "id": "alvaro-125-186-EVIDENCIA-2",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "EVIDENCIA",
              "start": 125,
              "end": 186,
              "text": "o Presidente PROMULGOU a lei, dentro do prazo previsto de 48h"
            },
            {
              "id": "alvaro-271-391-FONTE-3",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 271,
              "end": 391,
              "text": "https://www.cnnbrasil.com.br/politica/lula-veta-dispensa-de-reavaliacao-de-aposentadoria-para-incapacitados-permanentes/"
            },
            {
              "id": "alvaro-395-552-FONTE-4",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 395,
              "end": 552,
              "text": "https://oglobo.globo.com/economia/noticia/2025/06/23/inss-proposta-que-derruba-veto-do-governo-e-dispensa-revisao-de-pericia-medica-aguarda-promulgacao.ghtml"
            },
            {
              "id": "alvaro-556-661-FONTE-5",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 556,
              "end": 661,
              "text": "https://legis.senado.leg.br/sdleg-getter/documento?dm=9851178&amp;ts=1732798164326&amp;disposition=inline"
            }
          ]
        }
      },
      "automatic": {
        "e1": [
          {
            "id": "e1-22-55-CLAIM-0",
            "source_key": "e1",
            "source_label": "E1",
            "type": "CLAIM",
            "start": 22,
            "end": 55,
            "text": "o Presidente Lula SANCIONOU a lei"
          },
          {
            "id": "e1-263-383-FONTE-1",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 263,
            "end": 383,
            "text": "ou.     https://www.cnnbrasil.com.br/politica/lula-veta-dispensa-de-reavaliacao-de-aposentadoria-para-incapacitados-perm"
          },
          {
            "id": "e1-384-541-FONTE-2",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 384,
            "end": 541,
            "text": "nentes/    https://oglobo.globo.com/economia/noticia/2025/06/23/inss-proposta-que-derruba-veto-do-governo-e-dispensa-revisao-de-pericia-medica-aguarda-promul"
          },
          {
            "id": "e1-542-647-FONTE-3",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 542,
            "end": 647,
            "text": "acao.ghtml    https://legis.senado.leg.br/sdleg-getter/documento?dm=9851178&amp;ts=1732798164326&amp;disp"
          }
        ],
        "e2": [
          {
            "id": "e2-22-55-CLAIM-0",
            "source_key": "e2",
            "source_label": "E2",
            "type": "CLAIM",
            "start": 22,
            "end": 55,
            "text": "o Presidente Lula SANCIONOU a lei"
          },
          {
            "id": "e2-57-113-EVIDENCIA-1",
            "source_key": "e2",
            "source_label": "E2",
            "type": "EVIDENCIA",
            "start": 57,
            "end": 113,
            "text": "O presidente VETOU e o veto foi DERRUBADO pelo congresso"
          },
          {
            "id": "e2-125-186-EVIDENCIA-2",
            "source_key": "e2",
            "source_label": "E2",
            "type": "EVIDENCIA",
            "start": 125,
            "end": 186,
            "text": "o Presidente PROMULGOU a lei, dentro do prazo previsto de 48h"
          },
          {
            "id": "e2-188-221-EVIDENCIA-3",
            "source_key": "e2",
            "source_label": "E2",
            "type": "EVIDENCIA",
            "start": 188,
            "end": 221,
            "text": "Sancionar é o mesmo que concordar"
          },
          {
            "id": "e2-223-265-EVIDENCIA-4",
            "source_key": "e2",
            "source_label": "E2",
            "type": "EVIDENCIA",
            "start": 223,
            "end": 265,
            "text": "O Presidente VETOU, portanto não concordou"
          },
          {
            "id": "e2-271-391-FONTE-5",
            "source_key": "e2",
            "source_label": "E2",
            "type": "FONTE",
            "start": 271,
            "end": 391,
            "text": "https://www.cnnbrasil.com.br/politica/lula-veta-dispensa-de-reavaliacao-de-aposentadoria-para-incapacitados-permanentes/"
          },
          {
            "id": "e2-395-552-FONTE-6",
            "source_key": "e2",
            "source_label": "E2",
            "type": "FONTE",
            "start": 395,
            "end": 552,
            "text": "https://oglobo.globo.com/economia/noticia/2025/06/23/inss-proposta-que-derruba-veto-do-governo-e-dispensa-revisao-de-pericia-medica-aguarda-promulgacao.ghtml"
          },
          {
            "id": "e2-556-661-FONTE-7",
            "source_key": "e2",
            "source_label": "E2",
            "type": "FONTE",
            "start": 556,
            "end": 661,
            "text": "https://legis.senado.leg.br/sdleg-getter/documento?dm=9851178&amp;ts=1732798164326&amp;disposition=inline"
          }
        ]
      },
      "clusters": [
        {
          "id": "c1",
          "start": 4,
          "end": 55,
          "sources": [
            "alvaro",
            "davi"
          ],
          "types": [
            "CLAIM",
            "EVIDENCIA"
          ],
          "exact_agreements": [],
          "span_ids": [
            "davi-4-55-CLAIM-0",
            "alvaro-4-55-EVIDENCIA-0"
          ]
        },
        {
          "id": "c2",
          "start": 57,
          "end": 113,
          "sources": [
            "alvaro",
            "davi"
          ],
          "types": [
            "EVIDENCIA"
          ],
          "exact_agreements": [
            {
              "start": 57,
              "end": 113,
              "type": "EVIDENCIA"
            }
          ],
          "span_ids": [
            "alvaro-57-113-EVIDENCIA-1",
            "davi-57-113-EVIDENCIA-1"
          ]
        },
        {
          "id": "c3",
          "start": 125,
          "end": 186,
          "sources": [
            "alvaro"
          ],
          "types": [
            "EVIDENCIA"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-125-186-EVIDENCIA-2"
          ]
        },
        {
          "id": "c4",
          "start": 271,
          "end": 391,
          "sources": [
            "alvaro"
          ],
          "types": [
            "FONTE"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-271-391-FONTE-3"
          ]
        },
        {
          "id": "c5",
          "start": 395,
          "end": 552,
          "sources": [
            "alvaro"
          ],
          "types": [
            "FONTE"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-395-552-FONTE-4"
          ]
        },
        {
          "id": "c6",
          "start": 556,
          "end": 661,
          "sources": [
            "alvaro"
          ],
          "types": [
            "FONTE"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-556-661-FONTE-5"
          ]
        }
      ],
      "exact_agreement": [
        {
          "start": 57,
          "end": 113,
          "type": "EVIDENCIA",
          "text": "O presidente VETOU e o veto foi DERRUBADO pelo congresso"
        }
      ],
      "counts": {
        "davi": 2,
        "alvaro": 6,
        "exact_agreement": 1,
        "human_union": 7
      }
    },
    {
      "order": 28,
      "noteId": "1991189878722244743",
      "tweetId": "1991156843507257394",
      "consenso": "CRH",
      "macrotheme_label": "Economia e Política",
      "tweet_text": "🚨FAZ O L! Governo Lula PREPARA o FIM das TAXAS das blusinhas! 🛍️🛒\n\n- Enquanto Jair Bolsonaro TAXAVA tudo, Lula é o presidente DA ISENÇÃO! \n\nFAZ O L! 🇧🇷🦑🌟 https://t.co/f3mLt4Assp",
      "note_text": "O post inverte os fatos: a taxa de 20% sobre importações até US$50 foi criada pelo governo Lula em 2024, via Lei 14.902, acabando com a isenção anterior que vigorava na era Bolsonaro.    https://www12.senado.leg.br/radio/1/noticia/2024/08/14/201ctaxa-das-blusinhas201d-agora-e-lei  https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2024/lei/l14902.htm  https://x.com/JanjaLula/status/1646149996478181376  https://valor.globo.com/politica/noticia/2024/05/29/entenda-o-retorno-da-taxacao-da-shein-acordado-por-lula-e-lira.ghtml  https://x.com/grok/status/1991162909704261714",
      "is_meta": false,
      "meta_reason": "",
      "human": {
        "davi": {
          "label": "Davi",
          "status": "completed",
          "obs": "",
          "spans": [
            {
              "id": "davi-25-119-EVIDENCIA-0",
              "source_key": "davi",
              "source_label": "Davi",
              "type": "EVIDENCIA",
              "start": 25,
              "end": 119,
              "text": "a taxa de 20% sobre importações até US$50 foi criada pelo governo Lula em 2024, via Lei 14.902"
            },
            {
              "id": "davi-134-182-CLAIM-1",
              "source_key": "davi",
              "source_label": "Davi",
              "type": "CLAIM",
              "start": 134,
              "end": 182,
              "text": "a isenção anterior que vigorava na era Bolsonaro"
            }
          ]
        },
        "alvaro": {
          "label": "Alvaro",
          "status": "completed",
          "obs": "",
          "spans": [
            {
              "id": "alvaro-25-182-EVIDENCIA-0",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "EVIDENCIA",
              "start": 25,
              "end": 182,
              "text": "a taxa de 20% sobre importações até US$50 foi criada pelo governo Lula em 2024, via Lei 14.902, acabando com a isenção anterior que vigorava na era Bolsonaro"
            },
            {
              "id": "alvaro-187-280-FONTE-1",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 187,
              "end": 280,
              "text": "https://www12.senado.leg.br/radio/1/noticia/2024/08/14/201ctaxa-das-blusinhas201d-agora-e-lei"
            },
            {
              "id": "alvaro-282-353-FONTE-2",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 282,
              "end": 353,
              "text": "https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2024/lei/l14902.htm"
            },
            {
              "id": "alvaro-355-405-FONTE-3",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 355,
              "end": 405,
              "text": "https://x.com/JanjaLula/status/1646149996478181376"
            },
            {
              "id": "alvaro-407-527-FONTE-4",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 407,
              "end": 527,
              "text": "https://valor.globo.com/politica/noticia/2024/05/29/entenda-o-retorno-da-taxacao-da-shein-acordado-por-lula-e-lira.ghtml"
            },
            {
              "id": "alvaro-529-574-FONTE-5",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 529,
              "end": 574,
              "text": "https://x.com/grok/status/1991162909704261714"
            }
          ]
        }
      },
      "automatic": {
        "e1": [
          {
            "id": "e1-0-183-EVIDENCIA-0",
            "source_key": "e1",
            "source_label": "E1",
            "type": "EVIDENCIA",
            "start": 0,
            "end": 183,
            "text": "O post inverte os fatos: a taxa de 20% sobre importações até US$50 foi criada pelo governo Lula em 2024, via Lei 14.902, acabando com a isenção anterior que vigorava na era Bolsonaro."
          },
          {
            "id": "e1-187-280-FONTE-1",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 187,
            "end": 280,
            "text": "https://www12.senado.leg.br/radio/1/noticia/2024/08/14/201ctaxa-das-blusinhas201d-agora-e-lei"
          },
          {
            "id": "e1-278-349-FONTE-2",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 278,
            "end": 349,
            "text": "ei  https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2024/lei/l14902"
          },
          {
            "id": "e1-350-400-FONTE-3",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 350,
            "end": 400,
            "text": "htm  https://x.com/JanjaLula/status/16461499964781"
          },
          {
            "id": "e1-401-521-FONTE-4",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 401,
            "end": 521,
            "text": "1376  https://valor.globo.com/politica/noticia/2024/05/29/entenda-o-retorno-da-taxacao-da-shein-acordado-por-lula-e-lira"
          },
          {
            "id": "e1-522-567-FONTE-5",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 522,
            "end": 567,
            "text": "ghtml  https://x.com/grok/status/199116290970"
          }
        ],
        "e2": [
          {
            "id": "e2-0-23-CLAIM-0",
            "source_key": "e2",
            "source_label": "E2",
            "type": "CLAIM",
            "start": 0,
            "end": 23,
            "text": "O post inverte os fatos"
          },
          {
            "id": "e2-25-119-EVIDENCIA-1",
            "source_key": "e2",
            "source_label": "E2",
            "type": "EVIDENCIA",
            "start": 25,
            "end": 119,
            "text": "a taxa de 20% sobre importações até US$50 foi criada pelo governo Lula em 2024, via Lei 14.902"
          },
          {
            "id": "e2-121-182-EVIDENCIA-2",
            "source_key": "e2",
            "source_label": "E2",
            "type": "EVIDENCIA",
            "start": 121,
            "end": 182,
            "text": "acabando com a isenção anterior que vigorava na era Bolsonaro"
          }
        ]
      },
      "clusters": [
        {
          "id": "c1",
          "start": 25,
          "end": 182,
          "sources": [
            "alvaro",
            "davi"
          ],
          "types": [
            "CLAIM",
            "EVIDENCIA"
          ],
          "exact_agreements": [],
          "span_ids": [
            "davi-25-119-EVIDENCIA-0",
            "alvaro-25-182-EVIDENCIA-0",
            "davi-134-182-CLAIM-1"
          ]
        },
        {
          "id": "c2",
          "start": 187,
          "end": 280,
          "sources": [
            "alvaro"
          ],
          "types": [
            "FONTE"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-187-280-FONTE-1"
          ]
        },
        {
          "id": "c3",
          "start": 282,
          "end": 353,
          "sources": [
            "alvaro"
          ],
          "types": [
            "FONTE"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-282-353-FONTE-2"
          ]
        },
        {
          "id": "c4",
          "start": 355,
          "end": 405,
          "sources": [
            "alvaro"
          ],
          "types": [
            "FONTE"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-355-405-FONTE-3"
          ]
        },
        {
          "id": "c5",
          "start": 407,
          "end": 527,
          "sources": [
            "alvaro"
          ],
          "types": [
            "FONTE"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-407-527-FONTE-4"
          ]
        },
        {
          "id": "c6",
          "start": 529,
          "end": 574,
          "sources": [
            "alvaro"
          ],
          "types": [
            "FONTE"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-529-574-FONTE-5"
          ]
        }
      ],
      "exact_agreement": [],
      "counts": {
        "davi": 2,
        "alvaro": 6,
        "exact_agreement": 0,
        "human_union": 8
      }
    },
    {
      "order": 29,
      "noteId": "1876223898854797725",
      "tweetId": "1876115343808360556",
      "consenso": "CRH",
      "macrotheme_label": "",
      "tweet_text": "CHUPA, FOLHA DE SÃO PAULO. CHUPA!!!!!!!!\n\nDÁ-LE FERNANDA TORRES!!!!!!!!! #GoldenGlobes https://t.co/vPkjqNhY6L",
      "note_text": "Um contexto importante foi omitido: a Folha não disse que Fernanda Torres não ganharia o Globo de Ouro, apenas reproduziu uma frase dela numa entrevista.    &quot;A chance de alguém falando português levar um prêmio desse tamanho é praticamente nula&quot;, disse a atriz.    https://archive.is/P95i1#selection-3835.1-3835.87  ",
      "is_meta": false,
      "meta_reason": "",
      "human": {
        "davi": {
          "label": "Davi",
          "status": "completed",
          "obs": "",
          "spans": [
            {
              "id": "davi-36-102-CLAIM-0",
              "source_key": "davi",
              "source_label": "Davi",
              "type": "CLAIM",
              "start": 36,
              "end": 102,
              "text": "a Folha não disse que Fernanda Torres não ganharia o Globo de Ouro"
            },
            {
              "id": "davi-111-152-EVIDENCIA-1",
              "source_key": "davi",
              "source_label": "Davi",
              "type": "EVIDENCIA",
              "start": 111,
              "end": 152,
              "text": "reproduziu uma frase dela numa entrevista"
            },
            {
              "id": "davi-163-270-EVIDENCIA-2",
              "source_key": "davi",
              "source_label": "Davi",
              "type": "EVIDENCIA",
              "start": 163,
              "end": 270,
              "text": "A chance de alguém falando português levar um prêmio desse tamanho é praticamente nula&quot;, disse a atriz"
            }
          ]
        },
        "alvaro": {
          "label": "Alvaro",
          "status": "completed",
          "obs": "",
          "spans": [
            {
              "id": "alvaro-36-271-EVIDENCIA-0",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "EVIDENCIA",
              "start": 36,
              "end": 271,
              "text": "a Folha não disse que Fernanda Torres não ganharia o Globo de Ouro, apenas reproduziu uma frase dela numa entrevista.    &quot;A chance de alguém falando português levar um prêmio desse tamanho é praticamente nula&quot;, disse a atriz."
            },
            {
              "id": "alvaro-275-324-FONTE-1",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 275,
              "end": 324,
              "text": "https://archive.is/P95i1#selection-3835.1-3835.87"
            }
          ]
        }
      },
      "automatic": {
        "e1": [
          {
            "id": "e1-36-53-FONTE-0",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 36,
            "end": 53,
            "text": "a Folha não disse"
          },
          {
            "id": "e1-36-152-EVIDENCIA-1",
            "source_key": "e1",
            "source_label": "E1",
            "type": "EVIDENCIA",
            "start": 36,
            "end": 152,
            "text": "a Folha não disse que Fernanda Torres não ganharia o Globo de Ouro, apenas reproduziu uma frase dela numa entrevista"
          },
          {
            "id": "e1-38-43-FONTE-2",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 38,
            "end": 43,
            "text": "Folha"
          },
          {
            "id": "e1-58-102-CLAIM-3",
            "source_key": "e1",
            "source_label": "E1",
            "type": "CLAIM",
            "start": 58,
            "end": 102,
            "text": "Fernanda Torres não ganharia o Globo de Ouro"
          },
          {
            "id": "e1-87-102-CLAIM-4",
            "source_key": "e1",
            "source_label": "E1",
            "type": "CLAIM",
            "start": 87,
            "end": 102,
            "text": "o Globo de Ouro"
          },
          {
            "id": "e1-230-271-EVIDENCIA-5",
            "source_key": "e1",
            "source_label": "E1",
            "type": "EVIDENCIA",
            "start": 230,
            "end": 271,
            "text": "é praticamente nula&quot;, disse a atriz."
          },
          {
            "id": "e1-269-318-FONTE-6",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 269,
            "end": 318,
            "text": "z.    https://archive.is/P95i1#selection-3835.1-3"
          }
        ],
        "e2": [
          {
            "id": "e2-36-102-CLAIM-0",
            "source_key": "e2",
            "source_label": "E2",
            "type": "CLAIM",
            "start": 36,
            "end": 102,
            "text": "a Folha não disse que Fernanda Torres não ganharia o Globo de Ouro"
          },
          {
            "id": "e2-104-152-EVIDENCIA-1",
            "source_key": "e2",
            "source_label": "E2",
            "type": "EVIDENCIA",
            "start": 104,
            "end": 152,
            "text": "apenas reproduziu uma frase dela numa entrevista"
          },
          {
            "id": "e2-157-270-EVIDENCIA-2",
            "source_key": "e2",
            "source_label": "E2",
            "type": "EVIDENCIA",
            "start": 157,
            "end": 270,
            "text": "&quot;A chance de alguém falando português levar um prêmio desse tamanho é praticamente nula&quot;, disse a atriz"
          },
          {
            "id": "e2-275-324-FONTE-3",
            "source_key": "e2",
            "source_label": "E2",
            "type": "FONTE",
            "start": 275,
            "end": 324,
            "text": "https://archive.is/P95i1#selection-3835.1-3835.87"
          }
        ]
      },
      "clusters": [
        {
          "id": "c1",
          "start": 36,
          "end": 271,
          "sources": [
            "alvaro",
            "davi"
          ],
          "types": [
            "CLAIM",
            "EVIDENCIA"
          ],
          "exact_agreements": [],
          "span_ids": [
            "davi-36-102-CLAIM-0",
            "alvaro-36-271-EVIDENCIA-0",
            "davi-111-152-EVIDENCIA-1",
            "davi-163-270-EVIDENCIA-2"
          ]
        },
        {
          "id": "c2",
          "start": 275,
          "end": 324,
          "sources": [
            "alvaro"
          ],
          "types": [
            "FONTE"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-275-324-FONTE-1"
          ]
        }
      ],
      "exact_agreement": [],
      "counts": {
        "davi": 3,
        "alvaro": 2,
        "exact_agreement": 0,
        "human_union": 5
      }
    },
    {
      "order": 30,
      "noteId": "1870680545136439331",
      "tweetId": "1870569064977825902",
      "consenso": "CRH",
      "macrotheme_label": "",
      "tweet_text": "GENTE? Funcionários da Caixa fazem confraternização enquanto clientes aguardam atendimento em fila. https://t.co/T4cystvD2N",
      "note_text": "Nacionalmente, as agências da Caixa Econômica Federal iniciam atendimento às 10h da manhã. Confraternizações internas ocorrem antes desse horário, sem prejuízo ao atendimento. O post e o vídeo induz um escândalo infundado com a prática do H. de Func. regular da Ag. da Caixa.    https://www.caixa.gov.br/atendimento/paginas/encontre-a-caixa.aspx",
      "is_meta": false,
      "meta_reason": "",
      "human": {
        "davi": {
          "label": "Davi",
          "status": "completed",
          "obs": "",
          "spans": [
            {
              "id": "davi-15-89-EVIDENCIA-0",
              "source_key": "davi",
              "source_label": "Davi",
              "type": "EVIDENCIA",
              "start": 15,
              "end": 89,
              "text": "as agências da Caixa Econômica Federal iniciam atendimento às 10h da manhã"
            },
            {
              "id": "davi-176-274-CLAIM-1",
              "source_key": "davi",
              "source_label": "Davi",
              "type": "CLAIM",
              "start": 176,
              "end": 274,
              "text": "O post e o vídeo induz um escândalo infundado com a prática do H. de Func. regular da Ag. da Caixa"
            }
          ]
        },
        "alvaro": {
          "label": "Alvaro",
          "status": "completed",
          "obs": "",
          "spans": [
            {
              "id": "alvaro-0-89-EVIDENCIA-0",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "EVIDENCIA",
              "start": 0,
              "end": 89,
              "text": "Nacionalmente, as agências da Caixa Econômica Federal iniciam atendimento às 10h da manhã"
            },
            {
              "id": "alvaro-91-174-EVIDENCIA-1",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "EVIDENCIA",
              "start": 91,
              "end": 174,
              "text": "Confraternizações internas ocorrem antes desse horário, sem prejuízo ao atendimento"
            },
            {
              "id": "alvaro-176-275-EVIDENCIA-2",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "EVIDENCIA",
              "start": 176,
              "end": 275,
              "text": "O post e o vídeo induz um escândalo infundado com a prática do H. de Func. regular da Ag. da Caixa."
            },
            {
              "id": "alvaro-279-345-FONTE-3",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 279,
              "end": 345,
              "text": "https://www.caixa.gov.br/atendimento/paginas/encontre-a-caixa.aspx"
            }
          ]
        }
      },
      "automatic": {
        "e1": [
          {
            "id": "e1-279-345-FONTE-0",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 279,
            "end": 345,
            "text": "https://www.caixa.gov.br/atendimento/paginas/encontre-a-caixa.aspx"
          }
        ],
        "e2": [
          {
            "id": "e2-15-89-EVIDENCIA-0",
            "source_key": "e2",
            "source_label": "E2",
            "type": "EVIDENCIA",
            "start": 15,
            "end": 89,
            "text": "as agências da Caixa Econômica Federal iniciam atendimento às 10h da manhã"
          },
          {
            "id": "e2-91-174-EVIDENCIA-1",
            "source_key": "e2",
            "source_label": "E2",
            "type": "EVIDENCIA",
            "start": 91,
            "end": 174,
            "text": "Confraternizações internas ocorrem antes desse horário, sem prejuízo ao atendimento"
          },
          {
            "id": "e2-202-274-CLAIM-2",
            "source_key": "e2",
            "source_label": "E2",
            "type": "CLAIM",
            "start": 202,
            "end": 274,
            "text": "escândalo infundado com a prática do H. de Func. regular da Ag. da Caixa"
          },
          {
            "id": "e2-279-345-FONTE-3",
            "source_key": "e2",
            "source_label": "E2",
            "type": "FONTE",
            "start": 279,
            "end": 345,
            "text": "https://www.caixa.gov.br/atendimento/paginas/encontre-a-caixa.aspx"
          }
        ]
      },
      "clusters": [
        {
          "id": "c1",
          "start": 0,
          "end": 89,
          "sources": [
            "alvaro",
            "davi"
          ],
          "types": [
            "EVIDENCIA"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-0-89-EVIDENCIA-0",
            "davi-15-89-EVIDENCIA-0"
          ]
        },
        {
          "id": "c3",
          "start": 91,
          "end": 174,
          "sources": [
            "alvaro"
          ],
          "types": [
            "EVIDENCIA"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-91-174-EVIDENCIA-1"
          ]
        },
        {
          "id": "c2",
          "start": 176,
          "end": 275,
          "sources": [
            "alvaro",
            "davi"
          ],
          "types": [
            "CLAIM",
            "EVIDENCIA"
          ],
          "exact_agreements": [],
          "span_ids": [
            "davi-176-274-CLAIM-1",
            "alvaro-176-275-EVIDENCIA-2"
          ]
        },
        {
          "id": "c4",
          "start": 279,
          "end": 345,
          "sources": [
            "alvaro"
          ],
          "types": [
            "FONTE"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-279-345-FONTE-3"
          ]
        }
      ],
      "exact_agreement": [],
      "counts": {
        "davi": 2,
        "alvaro": 4,
        "exact_agreement": 0,
        "human_union": 6
      }
    },
    {
      "order": 31,
      "noteId": "1842682272262324483",
      "tweetId": "1842365478452224365",
      "consenso": "CRH",
      "macrotheme_label": "",
      "tweet_text": "TÁ AQUI A PROVA SOBRE O BOULES https://t.co/8T1cAtOrhF",
      "note_text": "O laudo é falso e há vários indícios e provas.  Inclusive, a própria família do suposto médico já declarou que ele nunca atuou em SP, nem na clínica   e  que na data do laudo ele já nao trabalhava por saúde. Além da assinatura ser falsa, de acordo com provas da própria família.  https://g1.globo.com/sp/sao-paulo/eleicoes/2024/noticia/2024/10/05/filha-de-medico-diz-que-documento-usado-por-marcal-contra-boulos-e-falso-e-mostra-tatuagem-com-verdadeira-assinatura-do-pai.ghtml",
      "is_meta": false,
      "meta_reason": "",
      "human": {
        "davi": {
          "label": "Davi",
          "status": "completed",
          "obs": "",
          "spans": [
            {
              "id": "davi-0-15-CLAIM-0",
              "source_key": "davi",
              "source_label": "Davi",
              "type": "CLAIM",
              "start": 0,
              "end": 15,
              "text": "O laudo é falso"
            },
            {
              "id": "davi-59-206-EVIDENCIA-1",
              "source_key": "davi",
              "source_label": "Davi",
              "type": "EVIDENCIA",
              "start": 59,
              "end": 206,
              "text": "a própria família do suposto médico já declarou que ele nunca atuou em SP, nem na clínica   e  que na data do laudo ele já nao trabalhava por saúde"
            },
            {
              "id": "davi-216-277-EVIDENCIA-2",
              "source_key": "davi",
              "source_label": "Davi",
              "type": "EVIDENCIA",
              "start": 216,
              "end": 277,
              "text": "assinatura ser falsa, de acordo com provas da própria família"
            }
          ]
        },
        "alvaro": {
          "label": "Alvaro",
          "status": "completed",
          "obs": "",
          "spans": [
            {
              "id": "alvaro-0-45-EVIDENCIA-0",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "EVIDENCIA",
              "start": 0,
              "end": 45,
              "text": "O laudo é falso e há vários indícios e provas"
            },
            {
              "id": "alvaro-59-206-EVIDENCIA-1",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "EVIDENCIA",
              "start": 59,
              "end": 206,
              "text": "a própria família do suposto médico já declarou que ele nunca atuou em SP, nem na clínica   e  que na data do laudo ele já nao trabalhava por saúde"
            },
            {
              "id": "alvaro-208-277-EVIDENCIA-2",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "EVIDENCIA",
              "start": 208,
              "end": 277,
              "text": "Além da assinatura ser falsa, de acordo com provas da própria família"
            },
            {
              "id": "alvaro-280-476-FONTE-3",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 280,
              "end": 476,
              "text": "https://g1.globo.com/sp/sao-paulo/eleicoes/2024/noticia/2024/10/05/filha-de-medico-diz-que-documento-usado-por-marcal-contra-boulos-e-falso-e-mostra-tatuagem-com-verdadeira-assinatura-do-pai.ghtml"
            }
          ]
        }
      },
      "automatic": {
        "e1": [
          {
            "id": "e1-59-106-FONTE-0",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 59,
            "end": 106,
            "text": "a própria família do suposto médico já declarou"
          },
          {
            "id": "e1-158-174-CLAIM-1",
            "source_key": "e1",
            "source_label": "E1",
            "type": "CLAIM",
            "start": 158,
            "end": 174,
            "text": "na data do laudo"
          },
          {
            "id": "e1-238-277-FONTE-2",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 238,
            "end": 277,
            "text": "de acordo com provas da própria família"
          },
          {
            "id": "e1-280-476-FONTE-3",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 280,
            "end": 476,
            "text": "https://g1.globo.com/sp/sao-paulo/eleicoes/2024/noticia/2024/10/05/filha-de-medico-diz-que-documento-usado-por-marcal-contra-boulos-e-falso-e-mostra-tatuagem-com-verdadeira-assinatura-do-pai.ghtml"
          }
        ],
        "e2": [
          {
            "id": "e2-0-15-CLAIM-0",
            "source_key": "e2",
            "source_label": "E2",
            "type": "CLAIM",
            "start": 0,
            "end": 15,
            "text": "O laudo é falso"
          },
          {
            "id": "e2-59-206-EVIDENCIA-1",
            "source_key": "e2",
            "source_label": "E2",
            "type": "EVIDENCIA",
            "start": 59,
            "end": 206,
            "text": "a própria família do suposto médico já declarou que ele nunca atuou em SP, nem na clínica   e  que na data do laudo ele já nao trabalhava por saúde"
          },
          {
            "id": "e2-208-277-EVIDENCIA-2",
            "source_key": "e2",
            "source_label": "E2",
            "type": "EVIDENCIA",
            "start": 208,
            "end": 277,
            "text": "Além da assinatura ser falsa, de acordo com provas da própria família"
          },
          {
            "id": "e2-280-476-FONTE-3",
            "source_key": "e2",
            "source_label": "E2",
            "type": "FONTE",
            "start": 280,
            "end": 476,
            "text": "https://g1.globo.com/sp/sao-paulo/eleicoes/2024/noticia/2024/10/05/filha-de-medico-diz-que-documento-usado-por-marcal-contra-boulos-e-falso-e-mostra-tatuagem-com-verdadeira-assinatura-do-pai.ghtml"
          }
        ]
      },
      "clusters": [
        {
          "id": "c1",
          "start": 0,
          "end": 45,
          "sources": [
            "alvaro",
            "davi"
          ],
          "types": [
            "CLAIM",
            "EVIDENCIA"
          ],
          "exact_agreements": [],
          "span_ids": [
            "davi-0-15-CLAIM-0",
            "alvaro-0-45-EVIDENCIA-0"
          ]
        },
        {
          "id": "c2",
          "start": 59,
          "end": 206,
          "sources": [
            "alvaro",
            "davi"
          ],
          "types": [
            "EVIDENCIA"
          ],
          "exact_agreements": [
            {
              "start": 59,
              "end": 206,
              "type": "EVIDENCIA"
            }
          ],
          "span_ids": [
            "alvaro-59-206-EVIDENCIA-1",
            "davi-59-206-EVIDENCIA-1"
          ]
        },
        {
          "id": "c3",
          "start": 208,
          "end": 277,
          "sources": [
            "alvaro",
            "davi"
          ],
          "types": [
            "EVIDENCIA"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-208-277-EVIDENCIA-2",
            "davi-216-277-EVIDENCIA-2"
          ]
        },
        {
          "id": "c4",
          "start": 280,
          "end": 476,
          "sources": [
            "alvaro"
          ],
          "types": [
            "FONTE"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-280-476-FONTE-3"
          ]
        }
      ],
      "exact_agreement": [
        {
          "start": 59,
          "end": 206,
          "type": "EVIDENCIA",
          "text": "a própria família do suposto médico já declarou que ele nunca atuou em SP, nem na clínica   e  que na data do laudo ele já nao trabalhava por saúde"
        }
      ],
      "counts": {
        "davi": 3,
        "alvaro": 4,
        "exact_agreement": 1,
        "human_union": 6
      }
    },
    {
      "order": 32,
      "noteId": "1889176478891315215",
      "tweetId": "1888958268107522407",
      "consenso": "CRH",
      "macrotheme_label": "",
      "tweet_text": "Plano de Donald Trump e Elon Musk de fechar a Usaid ameaça a mídia independente no mundo\nhttps://t.co/yft0zYpoLd",
      "note_text": "Não faz sentido chamar de &quot;independente&quot; uma mídia financiada pelo governo dos EUA, pois a independência implica autonomia financeira e editorial. O mais correto seria &quot;mídia pública&quot; ou &quot;estatal&quot;, já que há óbvio risco de influência governamental.     https://pt.wikipedia.org/wiki/M%C3%ADdia_independente",
      "is_meta": false,
      "meta_reason": "",
      "human": {
        "davi": {
          "label": "Davi",
          "status": "completed",
          "obs": "",
          "spans": [
            {
              "id": "davi-16-92-CLAIM-1",
              "source_key": "davi",
              "source_label": "Davi",
              "type": "CLAIM",
              "start": 16,
              "end": 92,
              "text": "chamar de &quot;independente&quot; uma mídia financiada pelo governo dos EUA"
            },
            {
              "id": "davi-101-155-EVIDENCIA-0",
              "source_key": "davi",
              "source_label": "Davi",
              "type": "EVIDENCIA",
              "start": 101,
              "end": 155,
              "text": "independência implica autonomia financeira e editorial"
            }
          ]
        },
        "alvaro": {
          "label": "Alvaro",
          "status": "completed",
          "obs": "",
          "spans": [
            {
              "id": "alvaro-0-155-EVIDENCIA-0",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "EVIDENCIA",
              "start": 0,
              "end": 155,
              "text": "Não faz sentido chamar de &quot;independente&quot; uma mídia financiada pelo governo dos EUA, pois a independência implica autonomia financeira e editorial"
            },
            {
              "id": "alvaro-157-277-EVIDENCIA-1",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "EVIDENCIA",
              "start": 157,
              "end": 277,
              "text": "O mais correto seria &quot;mídia pública&quot; ou &quot;estatal&quot;, já que há óbvio risco de influência governamental"
            },
            {
              "id": "alvaro-283-336-FONTE-2",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 283,
              "end": 336,
              "text": "https://pt.wikipedia.org/wiki/M%C3%ADdia_independente"
            }
          ]
        }
      },
      "automatic": {
        "e1": [
          {
            "id": "e1-55-60-FONTE-0",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 55,
            "end": 60,
            "text": "mídia"
          },
          {
            "id": "e1-184-197-FONTE-1",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 184,
            "end": 197,
            "text": "mídia pública"
          },
          {
            "id": "e1-283-336-FONTE-2",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 283,
            "end": 336,
            "text": "https://pt.wikipedia.org/wiki/M%C3%ADdia_independente"
          }
        ],
        "e2": [
          {
            "id": "e2-16-92-CLAIM-0",
            "source_key": "e2",
            "source_label": "E2",
            "type": "CLAIM",
            "start": 16,
            "end": 92,
            "text": "chamar de &quot;independente&quot; uma mídia financiada pelo governo dos EUA"
          },
          {
            "id": "e2-99-155-EVIDENCIA-1",
            "source_key": "e2",
            "source_label": "E2",
            "type": "EVIDENCIA",
            "start": 99,
            "end": 155,
            "text": "a independência implica autonomia financeira e editorial"
          },
          {
            "id": "e2-235-277-EVIDENCIA-2",
            "source_key": "e2",
            "source_label": "E2",
            "type": "EVIDENCIA",
            "start": 235,
            "end": 277,
            "text": "há óbvio risco de influência governamental"
          },
          {
            "id": "e2-283-336-FONTE-3",
            "source_key": "e2",
            "source_label": "E2",
            "type": "FONTE",
            "start": 283,
            "end": 336,
            "text": "https://pt.wikipedia.org/wiki/M%C3%ADdia_independente"
          }
        ]
      },
      "clusters": [
        {
          "id": "c1",
          "start": 0,
          "end": 155,
          "sources": [
            "alvaro",
            "davi"
          ],
          "types": [
            "CLAIM",
            "EVIDENCIA"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-0-155-EVIDENCIA-0",
            "davi-16-92-CLAIM-1",
            "davi-101-155-EVIDENCIA-0"
          ]
        },
        {
          "id": "c2",
          "start": 157,
          "end": 277,
          "sources": [
            "alvaro"
          ],
          "types": [
            "EVIDENCIA"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-157-277-EVIDENCIA-1"
          ]
        },
        {
          "id": "c3",
          "start": 283,
          "end": 336,
          "sources": [
            "alvaro"
          ],
          "types": [
            "FONTE"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-283-336-FONTE-2"
          ]
        }
      ],
      "exact_agreement": [],
      "counts": {
        "davi": 2,
        "alvaro": 3,
        "exact_agreement": 0,
        "human_union": 5
      }
    },
    {
      "order": 33,
      "noteId": "1823435417548374388",
      "tweetId": "1823099357073457355",
      "consenso": "CRH",
      "macrotheme_label": "Futebol e Racismo",
      "tweet_text": "LeBron foi chamado de “n*gga” pelo garoto que tentou tirar uma foto com ele.\n\nAumentando o volume do som você consegue perceber que ele repete isso umas 2 ou 3 vezes.\n\nEsse é um termo racista que os donos de escravos usavam para chamar as pessoas negras.\n\nVia @goat_br / instagram https://t.co/Sry3JSoZse",
      "note_text": "Ao contrário do que diz a postagem, o menino proferiu a seguinte frase “LeBron, could you please take a picture with me?”, o pedido foi prontamente negado pelo jogador da NBA LeBron James, respondendo “Pare. Não faça isso.”    https://www.bnews.com.br/amp/noticias/esporte/olimpiadas-paris-lebron-james-recusa-foto-com-crianca-apos-ouro-olimpico-veja-video.html",
      "is_meta": false,
      "meta_reason": "",
      "human": {
        "davi": {
          "label": "Davi",
          "status": "completed",
          "obs": "",
          "spans": [
            {
              "id": "davi-36-120-CLAIM-0",
              "source_key": "davi",
              "source_label": "Davi",
              "type": "CLAIM",
              "start": 36,
              "end": 120,
              "text": "o menino proferiu a seguinte frase “LeBron, could you please take a picture with me?"
            },
            {
              "id": "davi-123-221-EVIDENCIA-1",
              "source_key": "davi",
              "source_label": "Davi",
              "type": "EVIDENCIA",
              "start": 123,
              "end": 221,
              "text": "o pedido foi prontamente negado pelo jogador da NBA LeBron James, respondendo “Pare. Não faça isso"
            }
          ]
        },
        "alvaro": {
          "label": "Alvaro",
          "status": "completed",
          "obs": "",
          "spans": [
            {
              "id": "alvaro-36-223-EVIDENCIA-0",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "EVIDENCIA",
              "start": 36,
              "end": 223,
              "text": "o menino proferiu a seguinte frase “LeBron, could you please take a picture with me?”, o pedido foi prontamente negado pelo jogador da NBA LeBron James, respondendo “Pare. Não faça isso.”"
            },
            {
              "id": "alvaro-227-361-FONTE-1",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 227,
              "end": 361,
              "text": "https://www.bnews.com.br/amp/noticias/esporte/olimpiadas-paris-lebron-james-recusa-foto-com-crianca-apos-ouro-olimpico-veja-video.html"
            }
          ]
        }
      },
      "automatic": {
        "e1": [
          {
            "id": "e1-0-23-FONTE-0",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 0,
            "end": 23,
            "text": "Ao contrário do que diz"
          },
          {
            "id": "e1-16-35-EVIDENCIA-1",
            "source_key": "e1",
            "source_label": "E1",
            "type": "EVIDENCIA",
            "start": 16,
            "end": 35,
            "text": "que diz a postagem,"
          },
          {
            "id": "e1-227-361-FONTE-2",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 227,
            "end": 361,
            "text": "https://www.bnews.com.br/amp/noticias/esporte/olimpiadas-paris-lebron-james-recusa-foto-com-crianca-apos-ouro-olimpico-veja-video.html"
          }
        ],
        "e2": [
          {
            "id": "e2-0-34-CLAIM-0",
            "source_key": "e2",
            "source_label": "E2",
            "type": "CLAIM",
            "start": 0,
            "end": 34,
            "text": "Ao contrário do que diz a postagem"
          },
          {
            "id": "e2-36-121-EVIDENCIA-1",
            "source_key": "e2",
            "source_label": "E2",
            "type": "EVIDENCIA",
            "start": 36,
            "end": 121,
            "text": "o menino proferiu a seguinte frase “LeBron, could you please take a picture with me?”"
          },
          {
            "id": "e2-123-223-EVIDENCIA-2",
            "source_key": "e2",
            "source_label": "E2",
            "type": "EVIDENCIA",
            "start": 123,
            "end": 223,
            "text": "o pedido foi prontamente negado pelo jogador da NBA LeBron James, respondendo “Pare. Não faça isso.”"
          },
          {
            "id": "e2-227-361-FONTE-3",
            "source_key": "e2",
            "source_label": "E2",
            "type": "FONTE",
            "start": 227,
            "end": 361,
            "text": "https://www.bnews.com.br/amp/noticias/esporte/olimpiadas-paris-lebron-james-recusa-foto-com-crianca-apos-ouro-olimpico-veja-video.html"
          }
        ]
      },
      "clusters": [
        {
          "id": "c1",
          "start": 36,
          "end": 223,
          "sources": [
            "alvaro",
            "davi"
          ],
          "types": [
            "CLAIM",
            "EVIDENCIA"
          ],
          "exact_agreements": [],
          "span_ids": [
            "davi-36-120-CLAIM-0",
            "alvaro-36-223-EVIDENCIA-0",
            "davi-123-221-EVIDENCIA-1"
          ]
        },
        {
          "id": "c2",
          "start": 227,
          "end": 361,
          "sources": [
            "alvaro"
          ],
          "types": [
            "FONTE"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-227-361-FONTE-1"
          ]
        }
      ],
      "exact_agreement": [],
      "counts": {
        "davi": 2,
        "alvaro": 2,
        "exact_agreement": 0,
        "human_union": 4
      }
    },
    {
      "order": 34,
      "noteId": "1885048614927425622",
      "tweetId": "1885036002944720935",
      "consenso": "CRH",
      "macrotheme_label": "Economia e Política",
      "tweet_text": "O sistema de “Notas da Comunidade” no X está sendo utilizado para disputa política. O recurso autoriza que usuários comuns possam inserir e avaliar textos em postagens de terceiros, permitindo a veiculação de desinformação e mensagens enviesadas. Foi o que aconteceu na minha última publicação.\n\nA Ata do Copom dos dias 10 e 11 de dezembro de 2024 deixaram bem claro que ocorrerão “ajustes de mesma magnitude nas próximas duas reuniões”. Ou seja, de 1 ponto percentual em janeiro e 1 ponto percentual em fevereiro.\n\nA suposta “checagem coletiva” simplesmente ignora essa informação (disponível no Parágrafo 26 da ata referente à reunião 267, que pode ser acessada através desse link: https://t.co/FjXDI5uvIM).",
      "note_text": "A ata mencionada pela deputada diz que o Copom ~ANTEVÊ~ um aumento de 1% nas próximas reuniões.    O Copom atual não é legalmente obrigado a seguir essa previsão.     https://www.bcb.gov.br/publicacoes/atascopom",
      "is_meta": false,
      "meta_reason": "",
      "human": {
        "davi": {
          "label": "Davi",
          "status": "completed",
          "obs": "",
          "spans": [
            {
              "id": "davi-41-94-CLAIM-0",
              "source_key": "davi",
              "source_label": "Davi",
              "type": "CLAIM",
              "start": 41,
              "end": 94,
              "text": "Copom ~ANTEVÊ~ um aumento de 1% nas próximas reuniões"
            },
            {
              "id": "davi-99-161-EVIDENCIA-1",
              "source_key": "davi",
              "source_label": "Davi",
              "type": "EVIDENCIA",
              "start": 99,
              "end": 161,
              "text": "O Copom atual não é legalmente obrigado a seguir essa previsão"
            }
          ]
        },
        "alvaro": {
          "label": "Alvaro",
          "status": "completed",
          "obs": "",
          "spans": [
            {
              "id": "alvaro-0-162-EVIDENCIA-0",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "EVIDENCIA",
              "start": 0,
              "end": 162,
              "text": "A ata mencionada pela deputada diz que o Copom ~ANTEVÊ~ um aumento de 1% nas próximas reuniões.    O Copom atual não é legalmente obrigado a seguir essa previsão."
            },
            {
              "id": "alvaro-167-211-FONTE-1",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 167,
              "end": 211,
              "text": "https://www.bcb.gov.br/publicacoes/atascopom"
            }
          ]
        }
      },
      "automatic": {
        "e1": [
          {
            "id": "e1-0-34-FONTE-0",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 0,
            "end": 34,
            "text": "A ata mencionada pela deputada diz"
          },
          {
            "id": "e1-0-95-EVIDENCIA-1",
            "source_key": "e1",
            "source_label": "E1",
            "type": "EVIDENCIA",
            "start": 0,
            "end": 95,
            "text": "A ata mencionada pela deputada diz que o Copom ~ANTEVÊ~ um aumento de 1% nas próximas reuniões."
          },
          {
            "id": "e1-139-161-CLAIM-2",
            "source_key": "e1",
            "source_label": "E1",
            "type": "CLAIM",
            "start": 139,
            "end": 161,
            "text": "a seguir essa previsão"
          },
          {
            "id": "e1-160-204-FONTE-3",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 160,
            "end": 204,
            "text": "o.     https://www.bcb.gov.br/publicacoes/at"
          }
        ],
        "e2": [
          {
            "id": "e2-39-94-CLAIM-0",
            "source_key": "e2",
            "source_label": "E2",
            "type": "CLAIM",
            "start": 39,
            "end": 94,
            "text": "o Copom ~ANTEVÊ~ um aumento de 1% nas próximas reuniões"
          },
          {
            "id": "e2-99-161-EVIDENCIA-1",
            "source_key": "e2",
            "source_label": "E2",
            "type": "EVIDENCIA",
            "start": 99,
            "end": 161,
            "text": "O Copom atual não é legalmente obrigado a seguir essa previsão"
          },
          {
            "id": "e2-167-211-FONTE-2",
            "source_key": "e2",
            "source_label": "E2",
            "type": "FONTE",
            "start": 167,
            "end": 211,
            "text": "https://www.bcb.gov.br/publicacoes/atascopom"
          }
        ]
      },
      "clusters": [
        {
          "id": "c1",
          "start": 0,
          "end": 162,
          "sources": [
            "alvaro",
            "davi"
          ],
          "types": [
            "CLAIM",
            "EVIDENCIA"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-0-162-EVIDENCIA-0",
            "davi-41-94-CLAIM-0",
            "davi-99-161-EVIDENCIA-1"
          ]
        },
        {
          "id": "c2",
          "start": 167,
          "end": 211,
          "sources": [
            "alvaro"
          ],
          "types": [
            "FONTE"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-167-211-FONTE-1"
          ]
        }
      ],
      "exact_agreement": [],
      "counts": {
        "davi": 2,
        "alvaro": 2,
        "exact_agreement": 0,
        "human_union": 4
      }
    },
    {
      "order": 35,
      "noteId": "1993124451064406360",
      "tweetId": "1993099239241470405",
      "consenso": "CRH",
      "macrotheme_label": "Crise Política",
      "tweet_text": "@marinahelenabr Detalhe ele não é magistrado, nem formado em direito ele é kkkk",
      "note_text": "Flávio Dino é bacharel em Direito pela UFMA (1991), mestre pela UFPE (2001) e atuou como juiz federal por 12 anos, além de ser professor de Direito na UFMA desde 1993.    https://www.camara.leg.br/deputados/141436/biografia",
      "is_meta": false,
      "meta_reason": "",
      "human": {
        "davi": {
          "label": "Davi",
          "status": "completed",
          "obs": "",
          "spans": [
            {
              "id": "davi-0-166-EVIDENCIA-0",
              "source_key": "davi",
              "source_label": "Davi",
              "type": "EVIDENCIA",
              "start": 0,
              "end": 166,
              "text": "Flávio Dino é bacharel em Direito pela UFMA (1991), mestre pela UFPE (2001) e atuou como juiz federal por 12 anos, além de ser professor de Direito na UFMA desde 1993"
            }
          ]
        },
        "alvaro": {
          "label": "Alvaro",
          "status": "completed",
          "obs": "",
          "spans": [
            {
              "id": "alvaro-0-166-EVIDENCIA-0",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "EVIDENCIA",
              "start": 0,
              "end": 166,
              "text": "Flávio Dino é bacharel em Direito pela UFMA (1991), mestre pela UFPE (2001) e atuou como juiz federal por 12 anos, além de ser professor de Direito na UFMA desde 1993"
            },
            {
              "id": "alvaro-171-223-FONTE-1",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 171,
              "end": 223,
              "text": "https://www.camara.leg.br/deputados/141436/biografia"
            }
          ]
        }
      },
      "automatic": {
        "e1": [
          {
            "id": "e1-0-167-EVIDENCIA-0",
            "source_key": "e1",
            "source_label": "E1",
            "type": "EVIDENCIA",
            "start": 0,
            "end": 167,
            "text": "Flávio Dino é bacharel em Direito pela UFMA (1991), mestre pela UFPE (2001) e atuou como juiz federal por 12 anos, além de ser professor de Direito na UFMA desde 1993."
          },
          {
            "id": "e1-171-223-FONTE-1",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 171,
            "end": 223,
            "text": "https://www.camara.leg.br/deputados/141436/biografia"
          }
        ],
        "e2": [
          {
            "id": "e2-0-166-EVIDENCIA-0",
            "source_key": "e2",
            "source_label": "E2",
            "type": "EVIDENCIA",
            "start": 0,
            "end": 166,
            "text": "Flávio Dino é bacharel em Direito pela UFMA (1991), mestre pela UFPE (2001) e atuou como juiz federal por 12 anos, além de ser professor de Direito na UFMA desde 1993"
          },
          {
            "id": "e2-171-223-FONTE-1",
            "source_key": "e2",
            "source_label": "E2",
            "type": "FONTE",
            "start": 171,
            "end": 223,
            "text": "https://www.camara.leg.br/deputados/141436/biografia"
          }
        ]
      },
      "clusters": [
        {
          "id": "c1",
          "start": 0,
          "end": 166,
          "sources": [
            "alvaro",
            "davi"
          ],
          "types": [
            "EVIDENCIA"
          ],
          "exact_agreements": [
            {
              "start": 0,
              "end": 166,
              "type": "EVIDENCIA"
            }
          ],
          "span_ids": [
            "alvaro-0-166-EVIDENCIA-0",
            "davi-0-166-EVIDENCIA-0"
          ]
        },
        {
          "id": "c2",
          "start": 171,
          "end": 223,
          "sources": [
            "alvaro"
          ],
          "types": [
            "FONTE"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-171-223-FONTE-1"
          ]
        }
      ],
      "exact_agreement": [
        {
          "start": 0,
          "end": 166,
          "type": "EVIDENCIA",
          "text": "Flávio Dino é bacharel em Direito pela UFMA (1991), mestre pela UFPE (2001) e atuou como juiz federal por 12 anos, além de ser professor de Direito na UFMA desde 1993"
        }
      ],
      "counts": {
        "davi": 1,
        "alvaro": 2,
        "exact_agreement": 1,
        "human_union": 2
      }
    },
    {
      "order": 36,
      "noteId": "1936784166680502540",
      "tweetId": "1936582403062948226",
      "consenso": "CRH",
      "macrotheme_label": "Ataques e Conflitos",
      "tweet_text": "🚨URGENTE: Imprensa iraniana CONFIRMA grande explosão no reator nuclear de Fordow, no Irã. https://t.co/d62W5NdEkB",
      "note_text": "Ebrahim Raisi, o homem que aparece no post, morreu em 19 de maio de 2024.    https://www.band.com.br/noticias/como-fica-o-ira-apos-a-morte-do-presidente-raisi-16691013  https://veja.abril.com.br/mundo/eua-boicotam-homenagem-da-onu-ao-falecido-presidente-do-ira/",
      "is_meta": false,
      "meta_reason": "",
      "human": {
        "davi": {
          "label": "Davi",
          "status": "completed",
          "obs": "",
          "spans": [
            {
              "id": "davi-0-72-EVIDENCIA-0",
              "source_key": "davi",
              "source_label": "Davi",
              "type": "EVIDENCIA",
              "start": 0,
              "end": 72,
              "text": "Ebrahim Raisi, o homem que aparece no post, morreu em 19 de maio de 2024"
            }
          ]
        },
        "alvaro": {
          "label": "Alvaro",
          "status": "completed",
          "obs": "",
          "spans": [
            {
              "id": "alvaro-0-72-EVIDENCIA-0",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "EVIDENCIA",
              "start": 0,
              "end": 72,
              "text": "Ebrahim Raisi, o homem que aparece no post, morreu em 19 de maio de 2024"
            },
            {
              "id": "alvaro-77-167-FONTE-1",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 77,
              "end": 167,
              "text": "https://www.band.com.br/noticias/como-fica-o-ira-apos-a-morte-do-presidente-raisi-16691013"
            },
            {
              "id": "alvaro-169-261-FONTE-2",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 169,
              "end": 261,
              "text": "https://veja.abril.com.br/mundo/eua-boicotam-homenagem-da-onu-ao-falecido-presidente-do-ira/"
            }
          ]
        }
      },
      "automatic": {
        "e1": [
          {
            "id": "e1-0-73-EVIDENCIA-0",
            "source_key": "e1",
            "source_label": "E1",
            "type": "EVIDENCIA",
            "start": 0,
            "end": 73,
            "text": "Ebrahim Raisi, o homem que aparece no post, morreu em 19 de maio de 2024."
          },
          {
            "id": "e1-77-167-FONTE-1",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 77,
            "end": 167,
            "text": "https://www.band.com.br/noticias/como-fica-o-ira-apos-a-morte-do-presidente-raisi-16691013"
          },
          {
            "id": "e1-165-257-FONTE-2",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 165,
            "end": 257,
            "text": "13  https://veja.abril.com.br/mundo/eua-boicotam-homenagem-da-onu-ao-falecido-presidente-do-"
          }
        ],
        "e2": [
          {
            "id": "e2-0-72-EVIDENCIA-0",
            "source_key": "e2",
            "source_label": "E2",
            "type": "EVIDENCIA",
            "start": 0,
            "end": 72,
            "text": "Ebrahim Raisi, o homem que aparece no post, morreu em 19 de maio de 2024"
          },
          {
            "id": "e2-77-167-FONTE-1",
            "source_key": "e2",
            "source_label": "E2",
            "type": "FONTE",
            "start": 77,
            "end": 167,
            "text": "https://www.band.com.br/noticias/como-fica-o-ira-apos-a-morte-do-presidente-raisi-16691013"
          },
          {
            "id": "e2-169-261-FONTE-2",
            "source_key": "e2",
            "source_label": "E2",
            "type": "FONTE",
            "start": 169,
            "end": 261,
            "text": "https://veja.abril.com.br/mundo/eua-boicotam-homenagem-da-onu-ao-falecido-presidente-do-ira/"
          }
        ]
      },
      "clusters": [
        {
          "id": "c1",
          "start": 0,
          "end": 72,
          "sources": [
            "alvaro",
            "davi"
          ],
          "types": [
            "EVIDENCIA"
          ],
          "exact_agreements": [
            {
              "start": 0,
              "end": 72,
              "type": "EVIDENCIA"
            }
          ],
          "span_ids": [
            "alvaro-0-72-EVIDENCIA-0",
            "davi-0-72-EVIDENCIA-0"
          ]
        },
        {
          "id": "c2",
          "start": 77,
          "end": 167,
          "sources": [
            "alvaro"
          ],
          "types": [
            "FONTE"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-77-167-FONTE-1"
          ]
        },
        {
          "id": "c3",
          "start": 169,
          "end": 261,
          "sources": [
            "alvaro"
          ],
          "types": [
            "FONTE"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-169-261-FONTE-2"
          ]
        }
      ],
      "exact_agreement": [
        {
          "start": 0,
          "end": 72,
          "type": "EVIDENCIA",
          "text": "Ebrahim Raisi, o homem que aparece no post, morreu em 19 de maio de 2024"
        }
      ],
      "counts": {
        "davi": 1,
        "alvaro": 3,
        "exact_agreement": 1,
        "human_union": 3
      }
    },
    {
      "order": 37,
      "noteId": "2031092784686387635",
      "tweetId": "2031061452732379329",
      "consenso": "CRH",
      "macrotheme_label": "",
      "tweet_text": "A exposição pública de conversas de cunho estritamente privado, desvinculadas de qualquer ilicitude, constitui uma gravíssima violação ao direito à intimidade e uma demonstração de barbárie institucional que transgride todos os limites impostos pelas leis e pela Constituição. \nNa semana em que se comemora o Dia Internacional da Mulher, parece ainda mais grave a divulgação de tais diálogos, denotando a urgência de refletir sobre como a intimidade feminina é, historicamente, o alvo preferencial de tentativas de desmoralização e controle. \nAo permitir a publicação de diálogos íntimos de um casal, o Estado e seus agentes não apenas falham em seu dever de guarda, mas desrespeitam a legislação, que impõe categoricamente a inutilização de trechos que não interessam à persecução penal. \nEsse cenário evidencia a necessidade inadiável da aprovação da LGPD Penal, garantindo que o tratamento de dados na esfera criminal não seja subvertido em ferramenta de opressão. Ao transformar o que deveria ser uma investigação técnica em um espetáculo e em um verdadeiro ato de linchamento moral, o sistema incorre em nítida afronta à dignidade humana e aos direitos fundamentais.\n\nhttps://t.co/7L86vkhMrv",
      "note_text": "O ministro deveria atentar-se para o artigo 36 inciso III da LC 35/1979 (LOMAN), que proíbe magistrados de manifestarem, por qualquer meio, opinião sobre processos pendentes. Observe a lei para preservar a imparcialidade.    https://www.jusbrasil.com.br/topicos/11305829/artigo-36-lc-n-35-de-14-de-marco-de-1979",
      "is_meta": false,
      "meta_reason": "",
      "human": {
        "davi": {
          "label": "Davi",
          "status": "completed",
          "obs": "",
          "spans": [
            {
              "id": "davi-37-173-EVIDENCIA-0",
              "source_key": "davi",
              "source_label": "Davi",
              "type": "EVIDENCIA",
              "start": 37,
              "end": 173,
              "text": "artigo 36 inciso III da LC 35/1979 (LOMAN), que proíbe magistrados de manifestarem, por qualquer meio, opinião sobre processos pendentes"
            }
          ]
        },
        "alvaro": {
          "label": "Alvaro",
          "status": "completed",
          "obs": "",
          "spans": [
            {
              "id": "alvaro-0-174-EVIDENCIA-0",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "EVIDENCIA",
              "start": 0,
              "end": 174,
              "text": "O ministro deveria atentar-se para o artigo 36 inciso III da LC 35/1979 (LOMAN), que proíbe magistrados de manifestarem, por qualquer meio, opinião sobre processos pendentes."
            },
            {
              "id": "alvaro-225-311-FONTE-1",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 225,
              "end": 311,
              "text": "https://www.jusbrasil.com.br/topicos/11305829/artigo-36-lc-n-35-de-14-de-marco-de-1979"
            }
          ]
        }
      },
      "automatic": {
        "e1": [
          {
            "id": "e1-0-174-EVIDENCIA-0",
            "source_key": "e1",
            "source_label": "E1",
            "type": "EVIDENCIA",
            "start": 0,
            "end": 174,
            "text": "O ministro deveria atentar-se para o artigo 36 inciso III da LC 35/1979 (LOMAN), que proíbe magistrados de manifestarem, por qualquer meio, opinião sobre processos pendentes."
          },
          {
            "id": "e1-225-311-FONTE-1",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 225,
            "end": 311,
            "text": "https://www.jusbrasil.com.br/topicos/11305829/artigo-36-lc-n-35-de-14-de-marco-de-1979"
          }
        ],
        "e2": [
          {
            "id": "e2-37-173-EVIDENCIA-0",
            "source_key": "e2",
            "source_label": "E2",
            "type": "EVIDENCIA",
            "start": 37,
            "end": 173,
            "text": "artigo 36 inciso III da LC 35/1979 (LOMAN), que proíbe magistrados de manifestarem, por qualquer meio, opinião sobre processos pendentes"
          },
          {
            "id": "e2-225-311-FONTE-1",
            "source_key": "e2",
            "source_label": "E2",
            "type": "FONTE",
            "start": 225,
            "end": 311,
            "text": "https://www.jusbrasil.com.br/topicos/11305829/artigo-36-lc-n-35-de-14-de-marco-de-1979"
          }
        ]
      },
      "clusters": [
        {
          "id": "c1",
          "start": 0,
          "end": 174,
          "sources": [
            "alvaro",
            "davi"
          ],
          "types": [
            "EVIDENCIA"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-0-174-EVIDENCIA-0",
            "davi-37-173-EVIDENCIA-0"
          ]
        },
        {
          "id": "c2",
          "start": 225,
          "end": 311,
          "sources": [
            "alvaro"
          ],
          "types": [
            "FONTE"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-225-311-FONTE-1"
          ]
        }
      ],
      "exact_agreement": [],
      "counts": {
        "davi": 1,
        "alvaro": 2,
        "exact_agreement": 0,
        "human_union": 3
      }
    },
    {
      "order": 38,
      "noteId": "1879837365738385874",
      "tweetId": "1879689616694927535",
      "consenso": "CRH",
      "macrotheme_label": "Racismo e Liberdade",
      "tweet_text": "“O governo perde essa guerra para as fake news e tem que recuar. E recuar nunca é bom. (...) Há uma pressão, que é de partidos políticos, mas que encontra eco dentro do governo, para criminalizar essa desqualificação (com desinformação), porque desacreditar e atacar medidas https://t.co/vJKK1bxNkP",
      "note_text": "É falso que desacreditar e atacar medidas públicas seja crime. Enquanto democracia, a liberdade de duvidar e criticar ações do governo sempre foi um dos pilares do país, sendo amparado pelos artigos 5º e 220 da CF/88 e pelo Art. 19 da Declaração Univ. dos Direitos Humanos.     https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm    https://www.gov.br/mdh/pt-br/assuntos/noticias/2018/novembro/artigo-19deg-todo-ser-humano-tem-direito-a-liberdade-de-expressao-e-opiniao-1",
      "is_meta": false,
      "meta_reason": "",
      "human": {
        "davi": {
          "label": "Davi",
          "status": "completed",
          "obs": "",
          "spans": [
            {
              "id": "davi-0-61-CLAIM-0",
              "source_key": "davi",
              "source_label": "Davi",
              "type": "CLAIM",
              "start": 0,
              "end": 61,
              "text": "É falso que desacreditar e atacar medidas públicas seja crime"
            },
            {
              "id": "davi-170-216-EVIDENCIA-1",
              "source_key": "davi",
              "source_label": "Davi",
              "type": "EVIDENCIA",
              "start": 170,
              "end": 216,
              "text": "sendo amparado pelos artigos 5º e 220 da CF/88"
            },
            {
              "id": "davi-219-272-EVIDENCIA-2",
              "source_key": "davi",
              "source_label": "Davi",
              "type": "EVIDENCIA",
              "start": 219,
              "end": 272,
              "text": "pelo Art. 19 da Declaração Univ. dos Direitos Humanos"
            }
          ]
        },
        "alvaro": {
          "label": "Alvaro",
          "status": "completed",
          "obs": "",
          "spans": [
            {
              "id": "alvaro-12-61-CLAIM-0",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "CLAIM",
              "start": 12,
              "end": 61,
              "text": "desacreditar e atacar medidas públicas seja crime"
            },
            {
              "id": "alvaro-63-272-EVIDENCIA-1",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "EVIDENCIA",
              "start": 63,
              "end": 272,
              "text": "Enquanto democracia, a liberdade de duvidar e criticar ações do governo sempre foi um dos pilares do país, sendo amparado pelos artigos 5º e 220 da CF/88 e pelo Art. 19 da Declaração Univ. dos Direitos Humanos"
            },
            {
              "id": "alvaro-278-345-FONTE-2",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 278,
              "end": 345,
              "text": "https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm"
            },
            {
              "id": "alvaro-349-487-FONTE-3",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 349,
              "end": 487,
              "text": "https://www.gov.br/mdh/pt-br/assuntos/noticias/2018/novembro/artigo-19deg-todo-ser-humano-tem-direito-a-liberdade-de-expressao-e-opiniao-1"
            }
          ]
        }
      },
      "automatic": {
        "e1": [
          {
            "id": "e1-12-61-CLAIM-0",
            "source_key": "e1",
            "source_label": "E1",
            "type": "CLAIM",
            "start": 12,
            "end": 61,
            "text": "desacreditar e atacar medidas públicas seja crime"
          },
          {
            "id": "e1-63-251-EVIDENCIA-1",
            "source_key": "e1",
            "source_label": "E1",
            "type": "EVIDENCIA",
            "start": 63,
            "end": 251,
            "text": "Enquanto democracia, a liberdade de duvidar e criticar ações do governo sempre foi um dos pilares do país, sendo amparado pelos artigos 5º e 220 da CF/88 e pelo Art. 19 da Declaração Univ."
          },
          {
            "id": "e1-278-345-FONTE-2",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 278,
            "end": 345,
            "text": "https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm"
          },
          {
            "id": "e1-342-480-FONTE-3",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 342,
            "end": 480,
            "text": "htm    https://www.gov.br/mdh/pt-br/assuntos/noticias/2018/novembro/artigo-19deg-todo-ser-humano-tem-direito-a-liberdade-de-expressao-e-op"
          }
        ],
        "e2": []
      },
      "clusters": [
        {
          "id": "c1",
          "start": 0,
          "end": 61,
          "sources": [
            "alvaro",
            "davi"
          ],
          "types": [
            "CLAIM"
          ],
          "exact_agreements": [],
          "span_ids": [
            "davi-0-61-CLAIM-0",
            "alvaro-12-61-CLAIM-0"
          ]
        },
        {
          "id": "c2",
          "start": 63,
          "end": 272,
          "sources": [
            "alvaro",
            "davi"
          ],
          "types": [
            "EVIDENCIA"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-63-272-EVIDENCIA-1",
            "davi-170-216-EVIDENCIA-1",
            "davi-219-272-EVIDENCIA-2"
          ]
        },
        {
          "id": "c3",
          "start": 278,
          "end": 345,
          "sources": [
            "alvaro"
          ],
          "types": [
            "FONTE"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-278-345-FONTE-2"
          ]
        },
        {
          "id": "c4",
          "start": 349,
          "end": 487,
          "sources": [
            "alvaro"
          ],
          "types": [
            "FONTE"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-349-487-FONTE-3"
          ]
        }
      ],
      "exact_agreement": [],
      "counts": {
        "davi": 3,
        "alvaro": 4,
        "exact_agreement": 0,
        "human_union": 7
      }
    },
    {
      "order": 39,
      "noteId": "1878095415351922716",
      "tweetId": "1877860643430142405",
      "consenso": "CRH",
      "macrotheme_label": "Musk e Censura",
      "tweet_text": "Gente, olha isso parece filme Sci fi tipo uma invasão alienígena, mas é LA em chamas ! https://t.co/bxcmcPGiWf",
      "note_text": "Este vídeo foi criado por inteligência artificial e originalmente publicado no Instagram, no perfil @ai_creatiions.    instagram.com/p/DEoJC4HP6e5/",
      "is_meta": false,
      "meta_reason": "",
      "human": {
        "davi": {
          "label": "Davi",
          "status": "completed",
          "obs": "",
          "spans": [
            {
              "id": "davi-0-49-CLAIM-1",
              "source_key": "davi",
              "source_label": "Davi",
              "type": "CLAIM",
              "start": 0,
              "end": 49,
              "text": "Este vídeo foi criado por inteligência artificial"
            },
            {
              "id": "davi-52-88-EVIDENCIA-2",
              "source_key": "davi",
              "source_label": "Davi",
              "type": "EVIDENCIA",
              "start": 52,
              "end": 88,
              "text": "originalmente publicado no Instagram"
            },
            {
              "id": "davi-93-114-FONTE-0",
              "source_key": "davi",
              "source_label": "Davi",
              "type": "FONTE",
              "start": 93,
              "end": 114,
              "text": "perfil @ai_creatiions"
            }
          ]
        },
        "alvaro": {
          "label": "Alvaro",
          "status": "completed",
          "obs": "",
          "spans": [
            {
              "id": "alvaro-0-49-EVIDENCIA-1",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "EVIDENCIA",
              "start": 0,
              "end": 49,
              "text": "Este vídeo foi criado por inteligência artificial"
            },
            {
              "id": "alvaro-52-114-FONTE-2",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 52,
              "end": 114,
              "text": "originalmente publicado no Instagram, no perfil @ai_creatiions"
            },
            {
              "id": "alvaro-119-147-FONTE-0",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 119,
              "end": 147,
              "text": "instagram.com/p/DEoJC4HP6e5/"
            }
          ]
        }
      },
      "automatic": {
        "e1": [],
        "e2": [
          {
            "id": "e2-0-49-EVIDENCIA-0",
            "source_key": "e2",
            "source_label": "E2",
            "type": "EVIDENCIA",
            "start": 0,
            "end": 49,
            "text": "Este vídeo foi criado por inteligência artificial"
          },
          {
            "id": "e2-52-114-FONTE-1",
            "source_key": "e2",
            "source_label": "E2",
            "type": "FONTE",
            "start": 52,
            "end": 114,
            "text": "originalmente publicado no Instagram, no perfil @ai_creatiions"
          },
          {
            "id": "e2-119-147-FONTE-2",
            "source_key": "e2",
            "source_label": "E2",
            "type": "FONTE",
            "start": 119,
            "end": 147,
            "text": "instagram.com/p/DEoJC4HP6e5/"
          }
        ]
      },
      "clusters": [
        {
          "id": "c1",
          "start": 0,
          "end": 49,
          "sources": [
            "alvaro",
            "davi"
          ],
          "types": [
            "CLAIM",
            "EVIDENCIA"
          ],
          "exact_agreements": [],
          "span_ids": [
            "davi-0-49-CLAIM-1",
            "alvaro-0-49-EVIDENCIA-1"
          ]
        },
        {
          "id": "c2",
          "start": 52,
          "end": 114,
          "sources": [
            "alvaro",
            "davi"
          ],
          "types": [
            "EVIDENCIA",
            "FONTE"
          ],
          "exact_agreements": [],
          "span_ids": [
            "davi-52-88-EVIDENCIA-2",
            "alvaro-52-114-FONTE-2",
            "davi-93-114-FONTE-0"
          ]
        },
        {
          "id": "c3",
          "start": 119,
          "end": 147,
          "sources": [
            "alvaro"
          ],
          "types": [
            "FONTE"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-119-147-FONTE-0"
          ]
        }
      ],
      "exact_agreement": [],
      "counts": {
        "davi": 3,
        "alvaro": 3,
        "exact_agreement": 0,
        "human_union": 6
      }
    },
    {
      "order": 40,
      "noteId": "2014522181053567129",
      "tweetId": "2014461926802104570",
      "consenso": "CRH",
      "macrotheme_label": "",
      "tweet_text": "A decisão da PGR de arquivar o pedido de afastamento do ministro Dias Toffoli evidencia o funcionamento regular das instituições da República. Em um Estado de Direito, a preservação do devido processo legal e a observância das garantias institucionais constituem condições essenciais para a estabilidade democrática e para a confiança da sociedade nas instituições. Decisões fundadas em critérios jurídicos objetivos, afastadas de pressões circunstanciais, fortalecem a segurança jurídica e reafirmam a maturidade institucional do sistema constitucional brasileiro.",
      "note_text": "Art. 145 – Suspeição do juiz  Dispõe quando o juiz é considerado suspeito (...)  - amizade íntima ou inimizade com as partes ou advogados;  - interesse no julgamento da causa;  Art. 146 – Arguição de suspeição (...)  - no prazo de 15 dias, a contar do conhecimento do fato;    https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2015/lei/l13105.htm",
      "is_meta": false,
      "meta_reason": "",
      "human": {
        "davi": {
          "label": "Davi",
          "status": "completed",
          "obs": "",
          "spans": [
            {
              "id": "davi-0-272-EVIDENCIA-0",
              "source_key": "davi",
              "source_label": "Davi",
              "type": "EVIDENCIA",
              "start": 0,
              "end": 272,
              "text": "Art. 145 – Suspeição do juiz  Dispõe quando o juiz é considerado suspeito (...)  - amizade íntima ou inimizade com as partes ou advogados;  - interesse no julgamento da causa;  Art. 146 – Arguição de suspeição (...)  - no prazo de 15 dias, a contar do conhecimento do fato"
            }
          ]
        },
        "alvaro": {
          "label": "Alvaro",
          "status": "completed",
          "obs": "",
          "spans": [
            {
              "id": "alvaro-0-273-EVIDENCIA-0",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "EVIDENCIA",
              "start": 0,
              "end": 273,
              "text": "Art. 145 – Suspeição do juiz  Dispõe quando o juiz é considerado suspeito (...)  - amizade íntima ou inimizade com as partes ou advogados;  - interesse no julgamento da causa;  Art. 146 – Arguição de suspeição (...)  - no prazo de 15 dias, a contar do conhecimento do fato;"
            },
            {
              "id": "alvaro-277-348-FONTE-1",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 277,
              "end": 348,
              "text": "https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2015/lei/l13105.htm"
            }
          ]
        }
      },
      "automatic": {
        "e1": [
          {
            "id": "e1-0-187-EVIDENCIA-0",
            "source_key": "e1",
            "source_label": "E1",
            "type": "EVIDENCIA",
            "start": 0,
            "end": 187,
            "text": "Art. 145 – Suspeição do juiz  Dispõe quando o juiz é considerado suspeito (...)  - amizade íntima ou inimizade com as partes ou advogados;  - interesse no julgamento da causa;  Art. 146 –"
          },
          {
            "id": "e1-188-273-EVIDENCIA-1",
            "source_key": "e1",
            "source_label": "E1",
            "type": "EVIDENCIA",
            "start": 188,
            "end": 273,
            "text": "Arguição de suspeição (...)  - no prazo de 15 dias, a contar do conhecimento do fato;"
          },
          {
            "id": "e1-269-340-FONTE-2",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 269,
            "end": 340,
            "text": "ato;    https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2015/lei/l1"
          }
        ],
        "e2": []
      },
      "clusters": [
        {
          "id": "c1",
          "start": 0,
          "end": 273,
          "sources": [
            "alvaro",
            "davi"
          ],
          "types": [
            "EVIDENCIA"
          ],
          "exact_agreements": [],
          "span_ids": [
            "davi-0-272-EVIDENCIA-0",
            "alvaro-0-273-EVIDENCIA-0"
          ]
        },
        {
          "id": "c2",
          "start": 277,
          "end": 348,
          "sources": [
            "alvaro"
          ],
          "types": [
            "FONTE"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-277-348-FONTE-1"
          ]
        }
      ],
      "exact_agreement": [],
      "counts": {
        "davi": 1,
        "alvaro": 2,
        "exact_agreement": 0,
        "human_union": 3
      }
    },
    {
      "order": 41,
      "noteId": "2035937261900960010",
      "tweetId": "2035917660576251977",
      "consenso": "CRNH",
      "macrotheme_label": "",
      "tweet_text": "O MOMENTO CHEGOU! Depois de faltar aulas e viver de recuperação, chegou a hora da prova final, e, dessa vez, não tem cola nem segunda chance. Foco total e voto sem parar: somos #Fora5ªSérie! 👩🏼‍🏫 https://t.co/BQvrmAAIRn",
      "note_text": "O participante pipoca Pedro Henrique Espíndola era proibido contratualmente de se manifestar em outros paredões.     Porém, não sabemos se essa mesma restrição está presente nos contratos dos veteranos Ana Paula, Jonas e Alberto, que já se posicionaram em paredões alheios. ",
      "is_meta": false,
      "meta_reason": "",
      "human": {
        "davi": {
          "label": "Davi",
          "status": "completed",
          "obs": "",
          "spans": [
            {
              "id": "davi-0-111-EVIDENCIA-0",
              "source_key": "davi",
              "source_label": "Davi",
              "type": "EVIDENCIA",
              "start": 0,
              "end": 111,
              "text": "O participante pipoca Pedro Henrique Espíndola era proibido contratualmente de se manifestar em outros paredões"
            }
          ]
        },
        "alvaro": {
          "label": "Alvaro",
          "status": "completed",
          "obs": "",
          "spans": [
            {
              "id": "alvaro-0-111-EVIDENCIA-0",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "EVIDENCIA",
              "start": 0,
              "end": 111,
              "text": "O participante pipoca Pedro Henrique Espíndola era proibido contratualmente de se manifestar em outros paredões"
            },
            {
              "id": "alvaro-124-272-EVIDENCIA-1",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "EVIDENCIA",
              "start": 124,
              "end": 272,
              "text": "não sabemos se essa mesma restrição está presente nos contratos dos veteranos Ana Paula, Jonas e Alberto, que já se posicionaram em paredões alheios"
            }
          ]
        }
      },
      "automatic": {
        "e1": [
          {
            "id": "e1-136-272-CLAIM-0",
            "source_key": "e1",
            "source_label": "E1",
            "type": "CLAIM",
            "start": 136,
            "end": 272,
            "text": "se essa mesma restrição está presente nos contratos dos veteranos Ana Paula, Jonas e Alberto, que já se posicionaram em paredões alheios"
          }
        ],
        "e2": [
          {
            "id": "e2-0-111-EVIDENCIA-0",
            "source_key": "e2",
            "source_label": "E2",
            "type": "EVIDENCIA",
            "start": 0,
            "end": 111,
            "text": "O participante pipoca Pedro Henrique Espíndola era proibido contratualmente de se manifestar em outros paredões"
          },
          {
            "id": "e2-124-135-QUALIFICADOR-1",
            "source_key": "e2",
            "source_label": "E2",
            "type": "QUALIFICADOR",
            "start": 124,
            "end": 135,
            "text": "não sabemos"
          }
        ]
      },
      "clusters": [
        {
          "id": "c1",
          "start": 0,
          "end": 111,
          "sources": [
            "alvaro",
            "davi"
          ],
          "types": [
            "EVIDENCIA"
          ],
          "exact_agreements": [
            {
              "start": 0,
              "end": 111,
              "type": "EVIDENCIA"
            }
          ],
          "span_ids": [
            "alvaro-0-111-EVIDENCIA-0",
            "davi-0-111-EVIDENCIA-0"
          ]
        },
        {
          "id": "c2",
          "start": 124,
          "end": 272,
          "sources": [
            "alvaro"
          ],
          "types": [
            "EVIDENCIA"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-124-272-EVIDENCIA-1"
          ]
        }
      ],
      "exact_agreement": [
        {
          "start": 0,
          "end": 111,
          "type": "EVIDENCIA",
          "text": "O participante pipoca Pedro Henrique Espíndola era proibido contratualmente de se manifestar em outros paredões"
        }
      ],
      "counts": {
        "davi": 1,
        "alvaro": 2,
        "exact_agreement": 1,
        "human_union": 2
      }
    },
    {
      "order": 42,
      "noteId": "1884778548310823225",
      "tweetId": "1884549384798376261",
      "consenso": "CRNH",
      "macrotheme_label": "Racismo e Liberdade",
      "tweet_text": "Dias atrás, Oruam e o filho do Elias Maluco, gravaram um vídeo incitando vi0lência sexu4l contra a vereadora Amanda Vettorazzo, que protocolou uma lei que proíbe a prefeitura de São Paulo de contratar artistas que fazem apologia ao crime organizado. Confira: https://t.co/HuzxC9nAHj",
      "note_text": "A afirmação de que o artista &quot;incita violência sexual contra a vereadora Amanda&quot; é mentirosa. A expressão &quot;toma jack&quot; refere-se à famosa bebida Jack Daniels, sendo &quot;toma jack&quot; uma gíria oriunda de comunidades do Rio de Janeiro.      Fontes:     https://youtu.be/zA1ZPmEtckU?si=HPZR0GRpzDKlXcA8    https://youtu.be/1aPLX9FofIk?si=6vjLgzm3xGOQz55N    https://www.instagram.com/reel/DFGdo3rRcBI/?igsh=aDMzdTh6ZzE0ZnJv    ",
      "is_meta": false,
      "meta_reason": "",
      "human": {
        "davi": {
          "label": "Davi",
          "status": "completed",
          "obs": "",
          "spans": [
            {
              "id": "davi-0-102-CLAIM-0",
              "source_key": "davi",
              "source_label": "Davi",
              "type": "CLAIM",
              "start": 0,
              "end": 102,
              "text": "A afirmação de que o artista &quot;incita violência sexual contra a vereadora Amanda&quot; é mentirosa"
            },
            {
              "id": "davi-104-256-EVIDENCIA-1",
              "source_key": "davi",
              "source_label": "Davi",
              "type": "EVIDENCIA",
              "start": 104,
              "end": 256,
              "text": "A expressão &quot;toma jack&quot; refere-se à famosa bebida Jack Daniels, sendo &quot;toma jack&quot; uma gíria oriunda de comunidades do Rio de Janeiro"
            }
          ]
        },
        "alvaro": {
          "label": "Alvaro",
          "status": "completed",
          "obs": "",
          "spans": [
            {
              "id": "alvaro-0-103-EVIDENCIA-0",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "EVIDENCIA",
              "start": 0,
              "end": 103,
              "text": "A afirmação de que o artista &quot;incita violência sexual contra a vereadora Amanda&quot; é mentirosa."
            },
            {
              "id": "alvaro-104-256-EVIDENCIA-1",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "EVIDENCIA",
              "start": 104,
              "end": 256,
              "text": "A expressão &quot;toma jack&quot; refere-se à famosa bebida Jack Daniels, sendo &quot;toma jack&quot; uma gíria oriunda de comunidades do Rio de Janeiro"
            },
            {
              "id": "alvaro-275-323-FONTE-2",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 275,
              "end": 323,
              "text": "https://youtu.be/zA1ZPmEtckU?si=HPZR0GRpzDKlXcA8"
            },
            {
              "id": "alvaro-327-375-FONTE-3",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 327,
              "end": 375,
              "text": "https://youtu.be/1aPLX9FofIk?si=6vjLgzm3xGOQz55N"
            },
            {
              "id": "alvaro-379-444-FONTE-4",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 379,
              "end": 444,
              "text": "https://www.instagram.com/reel/DFGdo3rRcBI/?igsh=aDMzdTh6ZzE0ZnJv"
            }
          ]
        }
      },
      "automatic": {
        "e1": [
          {
            "id": "e1-266-314-FONTE-0",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 266,
            "end": 314,
            "text": "tes:     https://youtu.be/zA1ZPmEtckU?si=HPZR0GR"
          },
          {
            "id": "e1-315-363-FONTE-1",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 315,
            "end": 363,
            "text": "zDKlXcA8    https://youtu.be/1aPLX9FofIk?si=6vjL"
          },
          {
            "id": "e1-327-375-FONTE-2",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 327,
            "end": 375,
            "text": "https://youtu.be/1aPLX9FofIk?si=6vjLgzm3xGOQz55N"
          },
          {
            "id": "e1-364-429-FONTE-3",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 364,
            "end": 429,
            "text": "zm3xGOQz55N    https://www.instagram.com/reel/DFGdo3rRcBI/?igsh=a"
          },
          {
            "id": "e1-379-444-FONTE-4",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 379,
            "end": 444,
            "text": "https://www.instagram.com/reel/DFGdo3rRcBI/?igsh=aDMzdTh6ZzE0ZnJv"
          }
        ],
        "e2": [
          {
            "id": "e2-19-90-CLAIM-0",
            "source_key": "e2",
            "source_label": "E2",
            "type": "CLAIM",
            "start": 19,
            "end": 90,
            "text": "o artista &quot;incita violência sexual contra a vereadora Amanda&quot;"
          },
          {
            "id": "e2-104-176-EVIDENCIA-1",
            "source_key": "e2",
            "source_label": "E2",
            "type": "EVIDENCIA",
            "start": 104,
            "end": 176,
            "text": "A expressão &quot;toma jack&quot; refere-se à famosa bebida Jack Daniels"
          },
          {
            "id": "e2-184-256-EVIDENCIA-2",
            "source_key": "e2",
            "source_label": "E2",
            "type": "EVIDENCIA",
            "start": 184,
            "end": 256,
            "text": "&quot;toma jack&quot; uma gíria oriunda de comunidades do Rio de Janeiro"
          }
        ]
      },
      "clusters": [
        {
          "id": "c1",
          "start": 0,
          "end": 103,
          "sources": [
            "alvaro",
            "davi"
          ],
          "types": [
            "CLAIM",
            "EVIDENCIA"
          ],
          "exact_agreements": [],
          "span_ids": [
            "davi-0-102-CLAIM-0",
            "alvaro-0-103-EVIDENCIA-0"
          ]
        },
        {
          "id": "c2",
          "start": 104,
          "end": 256,
          "sources": [
            "alvaro",
            "davi"
          ],
          "types": [
            "EVIDENCIA"
          ],
          "exact_agreements": [
            {
              "start": 104,
              "end": 256,
              "type": "EVIDENCIA"
            }
          ],
          "span_ids": [
            "alvaro-104-256-EVIDENCIA-1",
            "davi-104-256-EVIDENCIA-1"
          ]
        },
        {
          "id": "c3",
          "start": 275,
          "end": 323,
          "sources": [
            "alvaro"
          ],
          "types": [
            "FONTE"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-275-323-FONTE-2"
          ]
        },
        {
          "id": "c4",
          "start": 327,
          "end": 375,
          "sources": [
            "alvaro"
          ],
          "types": [
            "FONTE"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-327-375-FONTE-3"
          ]
        },
        {
          "id": "c5",
          "start": 379,
          "end": 444,
          "sources": [
            "alvaro"
          ],
          "types": [
            "FONTE"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-379-444-FONTE-4"
          ]
        }
      ],
      "exact_agreement": [
        {
          "start": 104,
          "end": 256,
          "type": "EVIDENCIA",
          "text": "A expressão &quot;toma jack&quot; refere-se à famosa bebida Jack Daniels, sendo &quot;toma jack&quot; uma gíria oriunda de comunidades do Rio de Janeiro"
        }
      ],
      "counts": {
        "davi": 2,
        "alvaro": 5,
        "exact_agreement": 1,
        "human_union": 6
      }
    },
    {
      "order": 43,
      "noteId": "1868118294474915987",
      "tweetId": "1868068139680071948",
      "consenso": "CRNH",
      "macrotheme_label": "",
      "tweet_text": "- A prisão do General.\n\n- Há mais de 10 dias o \"Inquérito\" foi concluído pela PF, indiciando 37 pessoas e encaminhado ao MP.\n\n- Como alguém, hoje, pode ser preso por obstruir investigações já concluídas?\n\n- Jair Bolsonaro.",
      "note_text": "Como o ex-presidente faz parte dessa trama golpista, nada mais justo que sair em defesa do seu amigo general. Enfim, o inquérito não foi concluído por que tem novos indícios e novas provas, o que não impede dele ser preso.",
      "is_meta": false,
      "meta_reason": "",
      "human": {
        "davi": {
          "label": "Davi",
          "status": "completed",
          "obs": "",
          "spans": [
            {
              "id": "davi-5-51-CLAIM-0",
              "source_key": "davi",
              "source_label": "Davi",
              "type": "CLAIM",
              "start": 5,
              "end": 51,
              "text": "o ex-presidente faz parte dessa trama golpista"
            },
            {
              "id": "davi-117-221-EVIDENCIA-1",
              "source_key": "davi",
              "source_label": "Davi",
              "type": "EVIDENCIA",
              "start": 117,
              "end": 221,
              "text": "o inquérito não foi concluído por que tem novos indícios e novas provas, o que não impede dele ser preso"
            }
          ]
        },
        "alvaro": {
          "label": "Alvaro",
          "status": "completed",
          "obs": "",
          "spans": [
            {
              "id": "alvaro-117-221-EVIDENCIA-0",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "EVIDENCIA",
              "start": 117,
              "end": 221,
              "text": "o inquérito não foi concluído por que tem novos indícios e novas provas, o que não impede dele ser preso"
            }
          ]
        }
      },
      "automatic": {
        "e1": [
          {
            "id": "e1-147-221-CLAIM-0",
            "source_key": "e1",
            "source_label": "E1",
            "type": "CLAIM",
            "start": 147,
            "end": 221,
            "text": "por que tem novos indícios e novas provas, o que não impede dele ser preso"
          },
          {
            "id": "e1-207-221-CLAIM-1",
            "source_key": "e1",
            "source_label": "E1",
            "type": "CLAIM",
            "start": 207,
            "end": 221,
            "text": "dele ser preso"
          }
        ],
        "e2": [
          {
            "id": "e2-5-51-CLAIM-0",
            "source_key": "e2",
            "source_label": "E2",
            "type": "CLAIM",
            "start": 5,
            "end": 51,
            "text": "o ex-presidente faz parte dessa trama golpista"
          },
          {
            "id": "e2-117-188-EVIDENCIA-1",
            "source_key": "e2",
            "source_label": "E2",
            "type": "EVIDENCIA",
            "start": 117,
            "end": 188,
            "text": "o inquérito não foi concluído por que tem novos indícios e novas provas"
          }
        ]
      },
      "clusters": [
        {
          "id": "c1",
          "start": 5,
          "end": 51,
          "sources": [
            "davi"
          ],
          "types": [
            "CLAIM"
          ],
          "exact_agreements": [],
          "span_ids": [
            "davi-5-51-CLAIM-0"
          ]
        },
        {
          "id": "c2",
          "start": 117,
          "end": 221,
          "sources": [
            "alvaro",
            "davi"
          ],
          "types": [
            "EVIDENCIA"
          ],
          "exact_agreements": [
            {
              "start": 117,
              "end": 221,
              "type": "EVIDENCIA"
            }
          ],
          "span_ids": [
            "alvaro-117-221-EVIDENCIA-0",
            "davi-117-221-EVIDENCIA-1"
          ]
        }
      ],
      "exact_agreement": [
        {
          "start": 117,
          "end": 221,
          "type": "EVIDENCIA",
          "text": "o inquérito não foi concluído por que tem novos indícios e novas provas, o que não impede dele ser preso"
        }
      ],
      "counts": {
        "davi": 2,
        "alvaro": 1,
        "exact_agreement": 1,
        "human_union": 2
      }
    },
    {
      "order": 44,
      "noteId": "1991162547119014319",
      "tweetId": "1990894969343652247",
      "consenso": "CRNH",
      "macrotheme_label": "Cotas e Cortes no Ensino Superior",
      "tweet_text": "O Inep anunciou a antecipação do gabarito e dos cadernos de questões do Enem para amanhã, 19 de novembro, às 10h (horário de Brasília). O Instituto reafirma a isonomia, lisura e validade das provas do Enem 2025. Saiba mais em: https://t.co/u7VMoqUFZo https://t.co/qEyMYpZ90C",
      "note_text": "Não é necessária uma nota, tendo em vista que o que foi cometido pelo estudante de medicina, foi um crime federal e e a PF está investigando. É de conhecimento básico o fato de que operações como essas não são simples.  Além do que, a nota não fala diretamente sobre a publicação ",
      "is_meta": false,
      "meta_reason": "",
      "human": {
        "davi": {
          "label": "Davi",
          "status": "completed",
          "obs": "a nota não fala diretamente sobre a publicação",
          "spans": []
        },
        "alvaro": {
          "label": "Alvaro",
          "status": "completed",
          "obs": "",
          "spans": []
        }
      },
      "automatic": {
        "e1": [
          {
            "id": "e1-261-279-CLAIM-0",
            "source_key": "e1",
            "source_label": "E1",
            "type": "CLAIM",
            "start": 261,
            "end": 279,
            "text": "sobre a publicação"
          }
        ],
        "e2": [
          {
            "id": "e2-46-113-CLAIM-0",
            "source_key": "e2",
            "source_label": "E2",
            "type": "CLAIM",
            "start": 46,
            "end": 113,
            "text": "o que foi cometido pelo estudante de medicina, foi um crime federal"
          },
          {
            "id": "e2-118-140-EVIDENCIA-1",
            "source_key": "e2",
            "source_label": "E2",
            "type": "EVIDENCIA",
            "start": 118,
            "end": 140,
            "text": "a PF está investigando"
          },
          {
            "id": "e2-181-217-EVIDENCIA-2",
            "source_key": "e2",
            "source_label": "E2",
            "type": "EVIDENCIA",
            "start": 181,
            "end": 217,
            "text": "operações como essas não são simples"
          }
        ]
      },
      "clusters": [],
      "exact_agreement": [],
      "counts": {
        "davi": 0,
        "alvaro": 0,
        "exact_agreement": 0,
        "human_union": 0
      }
    },
    {
      "order": 45,
      "noteId": "1762663085980958948",
      "tweetId": "1762646079672103220",
      "consenso": "CRNH",
      "macrotheme_label": "Ataques e Conflitos",
      "tweet_text": "Eu fui o primeiro presidente da República a visitar o Estado de Israel, quando ninguém visitava. Eu fiz muitas reuniões com o povo judeu. Eu visitei kibutzim. Nesta crise eu fiz reuniões com famílias que tiveram familiares sequestrados e falei com líderes de países da região nos esforços de libertação dos reféns. Nunca misturo a atitude de um povo com as ações de um governante. E o que eu quero dizer em alto e bom som: o primeiro-ministro de Israel está praticando um genocídio contra mulheres e crianças. #LulaNaRedeTV",
      "note_text": "Lula se “reuniu” com família de um brasileiro, 2 meses após o sequestro!!!    Lula afirmar que Israel é genocida, é FALSO. Comparar o genocidio de judeus a atual guerra é idiotice.          https://www.google.com/url?q=https://g1.globo.com/google/amp/politica/noticia/2023/10/26/lula-faz-videoconferencia-com-familias-de-refens-e-desaparecidos-no-oriente-medio-diz-planalto.ghtml&amp;sa=U&amp;sqi=2&amp;ved=2ahUKEwj18Lzs-MyEAxX7VTABHX8vDVUQFnoECBQQAQ&amp;usg=AOvVaw3_mGRi0-6QHF12f1MpJk-w",
      "is_meta": false,
      "meta_reason": "",
      "human": {
        "davi": {
          "label": "Davi",
          "status": "completed",
          "obs": "",
          "spans": [
            {
              "id": "davi-0-71-EVIDENCIA-1",
              "source_key": "davi",
              "source_label": "Davi",
              "type": "EVIDENCIA",
              "start": 0,
              "end": 71,
              "text": "Lula se “reuniu” com família de um brasileiro, 2 meses após o sequestro"
            },
            {
              "id": "davi-78-121-CLAIM-0",
              "source_key": "davi",
              "source_label": "Davi",
              "type": "CLAIM",
              "start": 78,
              "end": 121,
              "text": "Lula afirmar que Israel é genocida, é FALSO"
            }
          ]
        },
        "alvaro": {
          "label": "Alvaro",
          "status": "completed",
          "obs": "",
          "spans": [
            {
              "id": "alvaro-0-71-EVIDENCIA-0",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "EVIDENCIA",
              "start": 0,
              "end": 71,
              "text": "Lula se “reuniu” com família de um brasileiro, 2 meses após o sequestro"
            },
            {
              "id": "alvaro-190-487-FONTE-1",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 190,
              "end": 487,
              "text": "https://www.google.com/url?q=https://g1.globo.com/google/amp/politica/noticia/2023/10/26/lula-faz-videoconferencia-com-familias-de-refens-e-desaparecidos-no-oriente-medio-diz-planalto.ghtml&amp;sa=U&amp;sqi=2&amp;ved=2ahUKEwj18Lzs-MyEAxX7VTABHX8vDVUQFnoECBQQAQ&amp;usg=AOvVaw3_mGRi0-6QHF12f1MpJk-w"
            }
          ]
        }
      },
      "automatic": {
        "e1": [
          {
            "id": "e1-0-74-EVIDENCIA-0",
            "source_key": "e1",
            "source_label": "E1",
            "type": "EVIDENCIA",
            "start": 0,
            "end": 74,
            "text": "Lula se “reuniu” com família de um brasileiro, 2 meses após o sequestro!!!"
          },
          {
            "id": "e1-178-475-FONTE-1",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 178,
            "end": 475,
            "text": "e.          https://www.google.com/url?q=https://g1.globo.com/google/amp/politica/noticia/2023/10/26/lula-faz-videoconferencia-com-familias-de-refens-e-desaparecidos-no-oriente-medio-diz-planalto.ghtml&amp;sa=U&amp;sqi=2&amp;ved=2ahUKEwj18Lzs-MyEAxX7VTABHX8vDVUQFnoECBQQAQ&amp;usg=AOvVaw3_mGRi0-6Q"
          }
        ],
        "e2": [
          {
            "id": "e2-78-112-CLAIM-0",
            "source_key": "e2",
            "source_label": "E2",
            "type": "CLAIM",
            "start": 78,
            "end": 112,
            "text": "Lula afirmar que Israel é genocida"
          },
          {
            "id": "e2-114-121-EVIDENCIA-1",
            "source_key": "e2",
            "source_label": "E2",
            "type": "EVIDENCIA",
            "start": 114,
            "end": 121,
            "text": "é FALSO"
          }
        ]
      },
      "clusters": [
        {
          "id": "c1",
          "start": 0,
          "end": 71,
          "sources": [
            "alvaro",
            "davi"
          ],
          "types": [
            "EVIDENCIA"
          ],
          "exact_agreements": [
            {
              "start": 0,
              "end": 71,
              "type": "EVIDENCIA"
            }
          ],
          "span_ids": [
            "alvaro-0-71-EVIDENCIA-0",
            "davi-0-71-EVIDENCIA-1"
          ]
        },
        {
          "id": "c2",
          "start": 78,
          "end": 121,
          "sources": [
            "davi"
          ],
          "types": [
            "CLAIM"
          ],
          "exact_agreements": [],
          "span_ids": [
            "davi-78-121-CLAIM-0"
          ]
        },
        {
          "id": "c3",
          "start": 190,
          "end": 487,
          "sources": [
            "alvaro"
          ],
          "types": [
            "FONTE"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-190-487-FONTE-1"
          ]
        }
      ],
      "exact_agreement": [
        {
          "start": 0,
          "end": 71,
          "type": "EVIDENCIA",
          "text": "Lula se “reuniu” com família de um brasileiro, 2 meses após o sequestro"
        }
      ],
      "counts": {
        "davi": 2,
        "alvaro": 2,
        "exact_agreement": 1,
        "human_union": 3
      }
    },
    {
      "order": 46,
      "noteId": "2036159146039595023",
      "tweetId": "2035830530285953071",
      "consenso": "CRNH",
      "macrotheme_label": "",
      "tweet_text": "Catherine Harding, esposa de Jorginho, se pronuncia sobre polêmica com Chappell Roan:\n\n“Com 100% de certeza o segurança não era do hotel. Ele trabalha com artistas, e estava com ela. Minha filha não fez nada, só olhou pra ela e sorriu. Espero que ela aprenda a não permitir que https://t.co/XRdotCVlDe",
      "note_text": "A partir do minuto 4:36, a atriz afirma que Chappell Roan, como dito pela cantora em pronunciamento, não viu a criança e nem a sua mãe. O vídeo deve ser assistido por inteiro para verdadeira compreensão, pois a legenda do texto deixa lacunas abertas na interpretação do caso.  https://x.com/qgdopop/status/2035830530285953071?s=46",
      "is_meta": false,
      "meta_reason": "",
      "human": {
        "davi": {
          "label": "Davi",
          "status": "completed",
          "obs": "",
          "spans": [
            {
              "id": "davi-0-134-EVIDENCIA-1",
              "source_key": "davi",
              "source_label": "Davi",
              "type": "EVIDENCIA",
              "start": 0,
              "end": 134,
              "text": "A partir do minuto 4:36, a atriz afirma que Chappell Roan, como dito pela cantora em pronunciamento, não viu a criança e nem a sua mãe"
            },
            {
              "id": "davi-209-274-CLAIM-0",
              "source_key": "davi",
              "source_label": "Davi",
              "type": "CLAIM",
              "start": 209,
              "end": 274,
              "text": "a legenda do texto deixa lacunas abertas na interpretação do caso"
            }
          ]
        },
        "alvaro": {
          "label": "Alvaro",
          "status": "completed",
          "obs": "",
          "spans": [
            {
              "id": "alvaro-0-275-EVIDENCIA-0",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "EVIDENCIA",
              "start": 0,
              "end": 275,
              "text": "A partir do minuto 4:36, a atriz afirma que Chappell Roan, como dito pela cantora em pronunciamento, não viu a criança e nem a sua mãe. O vídeo deve ser assistido por inteiro para verdadeira compreensão, pois a legenda do texto deixa lacunas abertas na interpretação do caso."
            },
            {
              "id": "alvaro-277-330-FONTE-1",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 277,
              "end": 330,
              "text": "https://x.com/qgdopop/status/2035830530285953071?s=46"
            }
          ]
        }
      },
      "automatic": {
        "e1": [
          {
            "id": "e1-25-39-FONTE-0",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 25,
            "end": 39,
            "text": "a atriz afirma"
          },
          {
            "id": "e1-57-99-CLAIM-1",
            "source_key": "e1",
            "source_label": "E1",
            "type": "CLAIM",
            "start": 57,
            "end": 99,
            "text": ", como dito pela cantora em pronunciamento"
          },
          {
            "id": "e1-57-100-EVIDENCIA-2",
            "source_key": "e1",
            "source_label": "E1",
            "type": "EVIDENCIA",
            "start": 57,
            "end": 100,
            "text": ", como dito pela cantora em pronunciamento,"
          },
          {
            "id": "e1-277-330-FONTE-3",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 277,
            "end": 330,
            "text": "https://x.com/qgdopop/status/2035830530285953071?s=46"
          }
        ],
        "e2": [
          {
            "id": "e2-25-134-EVIDENCIA-0",
            "source_key": "e2",
            "source_label": "E2",
            "type": "EVIDENCIA",
            "start": 25,
            "end": 134,
            "text": "a atriz afirma que Chappell Roan, como dito pela cantora em pronunciamento, não viu a criança e nem a sua mãe"
          },
          {
            "id": "e2-144-202-QUALIFICADOR-1",
            "source_key": "e2",
            "source_label": "E2",
            "type": "QUALIFICADOR",
            "start": 144,
            "end": 202,
            "text": "deve ser assistido por inteiro para verdadeira compreensão"
          },
          {
            "id": "e2-209-274-EVIDENCIA-2",
            "source_key": "e2",
            "source_label": "E2",
            "type": "EVIDENCIA",
            "start": 209,
            "end": 274,
            "text": "a legenda do texto deixa lacunas abertas na interpretação do caso"
          }
        ]
      },
      "clusters": [
        {
          "id": "c1",
          "start": 0,
          "end": 275,
          "sources": [
            "alvaro",
            "davi"
          ],
          "types": [
            "CLAIM",
            "EVIDENCIA"
          ],
          "exact_agreements": [],
          "span_ids": [
            "davi-0-134-EVIDENCIA-1",
            "alvaro-0-275-EVIDENCIA-0",
            "davi-209-274-CLAIM-0"
          ]
        },
        {
          "id": "c2",
          "start": 277,
          "end": 330,
          "sources": [
            "alvaro"
          ],
          "types": [
            "FONTE"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-277-330-FONTE-1"
          ]
        }
      ],
      "exact_agreement": [],
      "counts": {
        "davi": 2,
        "alvaro": 2,
        "exact_agreement": 0,
        "human_union": 4
      }
    },
    {
      "order": 47,
      "noteId": "2032140619728965702",
      "tweetId": "2032086736788996480",
      "consenso": "CRNH",
      "macrotheme_label": "",
      "tweet_text": "Sim, estou processando o apresentador Ratinho.\n\nSei que, pela audiência irrisória de seu programa, que até onde sei não agrada nem suas chefes no SBT, lhe resta apelar à violência.\n\nPorque o que o apresentador cometeu foi uma violência, um ataque, e não foi só contra mim. https://t.co/F9Suqaf3b8",
      "note_text": "O sujeito que está processando o apresentador Ratinho é um homem vestido de mulher, não é uma mulher e nunca será, esse fato é imutável.    Biologicamente, o homem é homem e a mulher é mulher.    https://www.governing.com/health/a-man-is-a-man-and-a-woman-is-a-woman-its-the-law    Trechos do programa relacionados a situação apresentada:  https://x.com/bralternativo_/status/2031924776793502097  https://x.com/updatecharts/status/2031904507542847818  https://x.com/bralternativo_/status/2031923101445808581  https://x.com/updatecharts/status/2031904507542847818",
      "is_meta": false,
      "meta_reason": "",
      "human": {
        "davi": {
          "label": "Davi",
          "status": "completed",
          "obs": "nota não apresenta estrutura argumentativa",
          "spans": []
        },
        "alvaro": {
          "label": "Alvaro",
          "status": "completed",
          "obs": "",
          "spans": []
        }
      },
      "automatic": {
        "e1": [
          {
            "id": "e1-190-272-FONTE-0",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 190,
            "end": 272,
            "text": "r.    https://www.governing.com/health/a-man-is-a-man-and-a-woman-is-a-woman-its-t"
          },
          {
            "id": "e1-330-385-FONTE-1",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 330,
            "end": 385,
            "text": "sentada:  https://x.com/bralternativo_/status/203192477"
          },
          {
            "id": "e1-386-439-FONTE-2",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 386,
            "end": 439,
            "text": "793502097  https://x.com/updatecharts/status/20319045"
          },
          {
            "id": "e1-397-450-FONTE-3",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 397,
            "end": 450,
            "text": "https://x.com/updatecharts/status/2031904507542847818"
          },
          {
            "id": "e1-440-495-FONTE-4",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 440,
            "end": 495,
            "text": "7542847818  https://x.com/bralternativo_/status/2031923"
          },
          {
            "id": "e1-452-507-FONTE-5",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 452,
            "end": 507,
            "text": "https://x.com/bralternativo_/status/2031923101445808581"
          },
          {
            "id": "e1-496-549-FONTE-6",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 496,
            "end": 549,
            "text": "01445808581  https://x.com/updatecharts/status/203190"
          },
          {
            "id": "e1-509-562-FONTE-7",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 509,
            "end": 562,
            "text": "https://x.com/updatecharts/status/2031904507542847818"
          }
        ],
        "e2": [
          {
            "id": "e2-0-113-CLAIM-0",
            "source_key": "e2",
            "source_label": "E2",
            "type": "CLAIM",
            "start": 0,
            "end": 113,
            "text": "O sujeito que está processando o apresentador Ratinho é um homem vestido de mulher, não é uma mulher e nunca será"
          },
          {
            "id": "e2-140-191-EVIDENCIA-1",
            "source_key": "e2",
            "source_label": "E2",
            "type": "EVIDENCIA",
            "start": 140,
            "end": 191,
            "text": "Biologicamente, o homem é homem e a mulher é mulher"
          },
          {
            "id": "e2-196-278-FONTE-2",
            "source_key": "e2",
            "source_label": "E2",
            "type": "FONTE",
            "start": 196,
            "end": 278,
            "text": "https://www.governing.com/health/a-man-is-a-man-and-a-woman-is-a-woman-its-the-law"
          }
        ]
      },
      "clusters": [],
      "exact_agreement": [],
      "counts": {
        "davi": 0,
        "alvaro": 0,
        "exact_agreement": 0,
        "human_union": 0
      }
    },
    {
      "order": 48,
      "noteId": "1828997016388518228",
      "tweetId": "1828932387117392265",
      "consenso": "CRNH",
      "macrotheme_label": "",
      "tweet_text": "@GlobalAffairs @GlobalAffairs @elonmusk Mandado de intimação https://t.co/gQUwNCy1Cr",
      "note_text": "AM pode fazer o q quer no Brasil e ninguém vai impedi-lo. Ele quer controlar o X. O X ñ tem atividade no solo Brasileiro, mas na Internet. Já que Moraes ñ tem poder sobre a WWW, só lhe resta policiar o X no Br com autoritarismo e bloquear acesso ao X no Br, como fazem na Ch NNN https://www.camara.leg.br/noticias/1052740-JORNALISTAS-ACUSAM-ALEXANDRE-DE-MORAES-DE-CENSURA-AO-EXIGIR-BLOQUEIO-DE-CONTAS-DA-REDE-SOCIAL-X",
      "is_meta": false,
      "meta_reason": "",
      "human": {
        "davi": {
          "label": "Davi",
          "status": "completed",
          "obs": "nota não possui estrutura argumentativa",
          "spans": []
        },
        "alvaro": {
          "label": "Alvaro",
          "status": "completed",
          "obs": "",
          "spans": []
        }
      },
      "automatic": {
        "e1": [
          {
            "id": "e1-279-417-FONTE-0",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 279,
            "end": 417,
            "text": "https://www.camara.leg.br/noticias/1052740-JORNALISTAS-ACUSAM-ALEXANDRE-DE-MORAES-DE-CENSURA-AO-EXIGIR-BLOQUEIO-DE-CONTAS-DA-REDE-SOCIAL-X"
          }
        ],
        "e2": [
          {
            "id": "e2-0-56-CLAIM-0",
            "source_key": "e2",
            "source_label": "E2",
            "type": "CLAIM",
            "start": 0,
            "end": 56,
            "text": "AM pode fazer o q quer no Brasil e ninguém vai impedi-lo"
          },
          {
            "id": "e2-58-80-CLAIM-1",
            "source_key": "e2",
            "source_label": "E2",
            "type": "CLAIM",
            "start": 58,
            "end": 80,
            "text": "Ele quer controlar o X"
          },
          {
            "id": "e2-82-137-EVIDENCIA-2",
            "source_key": "e2",
            "source_label": "E2",
            "type": "EVIDENCIA",
            "start": 82,
            "end": 137,
            "text": "O X ñ tem atividade no solo Brasileiro, mas na Internet"
          },
          {
            "id": "e2-146-176-CLAIM-3",
            "source_key": "e2",
            "source_label": "E2",
            "type": "CLAIM",
            "start": 146,
            "end": 176,
            "text": "Moraes ñ tem poder sobre a WWW"
          },
          {
            "id": "e2-178-256-CLAIM-4",
            "source_key": "e2",
            "source_label": "E2",
            "type": "CLAIM",
            "start": 178,
            "end": 256,
            "text": "só lhe resta policiar o X no Br com autoritarismo e bloquear acesso ao X no Br"
          },
          {
            "id": "e2-279-417-FONTE-5",
            "source_key": "e2",
            "source_label": "E2",
            "type": "FONTE",
            "start": 279,
            "end": 417,
            "text": "https://www.camara.leg.br/noticias/1052740-JORNALISTAS-ACUSAM-ALEXANDRE-DE-MORAES-DE-CENSURA-AO-EXIGIR-BLOQUEIO-DE-CONTAS-DA-REDE-SOCIAL-X"
          }
        ]
      },
      "clusters": [],
      "exact_agreement": [],
      "counts": {
        "davi": 0,
        "alvaro": 0,
        "exact_agreement": 0,
        "human_union": 0
      }
    },
    {
      "order": 49,
      "noteId": "1798350866983891008",
      "tweetId": "1798341801805525364",
      "consenso": "CRNH",
      "macrotheme_label": "",
      "tweet_text": "Não tenho a mínima dúvida que falta aqui um zero. https://t.co/WlFoW8hC4n",
      "note_text": "Colocar suposições como factos, leva a que pessoas menos informadas tomem por verdade mentiras sem fundamento.   Não obstante, a conta Rotten Apple alegou no passado, que irá apagar a conta no dia que levar com uma nota da comunidade. Estamos à espera. A bem da verdade.     https://www.record.pt/futebol/futebol-nacional/liga-betclic/fc-porto/detalhe/sad-do-fc-porto-pode-ter-sido-lesada-em-50-milhoes-de-euros",
      "is_meta": false,
      "meta_reason": "",
      "human": {
        "davi": {
          "label": "Davi",
          "status": "completed",
          "obs": "Meta nota, não possui a estrutura argumetativa esperada",
          "spans": []
        },
        "alvaro": {
          "label": "Alvaro",
          "status": "completed",
          "obs": "",
          "spans": []
        }
      },
      "automatic": {
        "e1": [
          {
            "id": "e1-269-405-FONTE-0",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 269,
            "end": 405,
            "text": ".     https://www.record.pt/futebol/futebol-nacional/liga-betclic/fc-porto/detalhe/sad-do-fc-porto-pode-ter-sido-lesada-em-50-milhoes-de"
          }
        ],
        "e2": [
          {
            "id": "e2-0-30-CLAIM-0",
            "source_key": "e2",
            "source_label": "E2",
            "type": "CLAIM",
            "start": 0,
            "end": 30,
            "text": "Colocar suposições como factos"
          },
          {
            "id": "e2-32-109-EVIDENCIA-1",
            "source_key": "e2",
            "source_label": "E2",
            "type": "EVIDENCIA",
            "start": 32,
            "end": 109,
            "text": "leva a que pessoas menos informadas tomem por verdade mentiras sem fundamento"
          },
          {
            "id": "e2-127-147-FONTE-2",
            "source_key": "e2",
            "source_label": "E2",
            "type": "FONTE",
            "start": 127,
            "end": 147,
            "text": "a conta Rotten Apple"
          },
          {
            "id": "e2-171-233-CLAIM-3",
            "source_key": "e2",
            "source_label": "E2",
            "type": "CLAIM",
            "start": 171,
            "end": 233,
            "text": "irá apagar a conta no dia que levar com uma nota da comunidade"
          },
          {
            "id": "e2-275-411-FONTE-4",
            "source_key": "e2",
            "source_label": "E2",
            "type": "FONTE",
            "start": 275,
            "end": 411,
            "text": "https://www.record.pt/futebol/futebol-nacional/liga-betclic/fc-porto/detalhe/sad-do-fc-porto-pode-ter-sido-lesada-em-50-milhoes-de-euros"
          }
        ]
      },
      "clusters": [],
      "exact_agreement": [],
      "counts": {
        "davi": 0,
        "alvaro": 0,
        "exact_agreement": 0,
        "human_union": 0
      }
    },
    {
      "order": 50,
      "noteId": "2033327040481444237",
      "tweetId": "2033279694091473013",
      "consenso": "CRNH",
      "macrotheme_label": "Cotas e Cortes no Ensino Superior",
      "tweet_text": "Influenciador Ben Mendes, pré-candidato ao governo de MG, se envolve em briga com funcionária de loja; vídeo mostra agressões: https://t.co/GGW05PTgk9 #g1",
      "note_text": "A matéria deixa claro que a gerente agrediu Ben Mendes e o mesmo revidou com um tapa. Houve agressão mútua. Nem Ben Mendes e a mulher estão com razão neste caso. Tentar justificar o tapa como legitima defesa, é, no mínimo, questionável. Não há distorção de informações.    https://www.poder360.com.br/poder-brasil/ben-mendes-e-gerente-de-loja-se-agridem-em-briga-em-mg/",
      "is_meta": false,
      "meta_reason": "",
      "human": {
        "davi": {
          "label": "Davi",
          "status": "completed",
          "obs": "",
          "spans": [
            {
              "id": "davi-86-106-EVIDENCIA-1",
              "source_key": "davi",
              "source_label": "Davi",
              "type": "EVIDENCIA",
              "start": 86,
              "end": 106,
              "text": "Houve agressão mútua"
            },
            {
              "id": "davi-237-268-CLAIM-0",
              "source_key": "davi",
              "source_label": "Davi",
              "type": "CLAIM",
              "start": 237,
              "end": 268,
              "text": "Não há distorção de informações"
            }
          ]
        },
        "alvaro": {
          "label": "Alvaro",
          "status": "completed",
          "obs": "",
          "spans": [
            {
              "id": "alvaro-0-9-FONTE-0",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 0,
              "end": 9,
              "text": "A matéria"
            },
            {
              "id": "alvaro-26-84-EVIDENCIA-4",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "EVIDENCIA",
              "start": 26,
              "end": 84,
              "text": "a gerente agrediu Ben Mendes e o mesmo revidou com um tapa"
            },
            {
              "id": "alvaro-86-106-EVIDENCIA-1",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "EVIDENCIA",
              "start": 86,
              "end": 106,
              "text": "Houve agressão mútua"
            },
            {
              "id": "alvaro-237-268-EVIDENCIA-3",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "EVIDENCIA",
              "start": 237,
              "end": 268,
              "text": "Não há distorção de informações"
            },
            {
              "id": "alvaro-273-369-FONTE-2",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 273,
              "end": 369,
              "text": "https://www.poder360.com.br/poder-brasil/ben-mendes-e-gerente-de-loja-se-agridem-em-briga-em-mg/"
            }
          ]
        }
      },
      "automatic": {
        "e1": [
          {
            "id": "e1-244-268-CLAIM-0",
            "source_key": "e1",
            "source_label": "E1",
            "type": "CLAIM",
            "start": 244,
            "end": 268,
            "text": "distorção de informações"
          },
          {
            "id": "e1-273-369-FONTE-1",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 273,
            "end": 369,
            "text": "https://www.poder360.com.br/poder-brasil/ben-mendes-e-gerente-de-loja-se-agridem-em-briga-em-mg/"
          }
        ],
        "e2": [
          {
            "id": "e2-0-84-EVIDENCIA-0",
            "source_key": "e2",
            "source_label": "E2",
            "type": "EVIDENCIA",
            "start": 0,
            "end": 84,
            "text": "A matéria deixa claro que a gerente agrediu Ben Mendes e o mesmo revidou com um tapa"
          },
          {
            "id": "e2-86-106-CLAIM-1",
            "source_key": "e2",
            "source_label": "E2",
            "type": "CLAIM",
            "start": 86,
            "end": 106,
            "text": "Houve agressão mútua"
          },
          {
            "id": "e2-108-160-CLAIM-2",
            "source_key": "e2",
            "source_label": "E2",
            "type": "CLAIM",
            "start": 108,
            "end": 160,
            "text": "Nem Ben Mendes e a mulher estão com razão neste caso"
          },
          {
            "id": "e2-212-235-QUALIFICADOR-3",
            "source_key": "e2",
            "source_label": "E2",
            "type": "QUALIFICADOR",
            "start": 212,
            "end": 235,
            "text": "no mínimo, questionável"
          },
          {
            "id": "e2-237-268-CLAIM-4",
            "source_key": "e2",
            "source_label": "E2",
            "type": "CLAIM",
            "start": 237,
            "end": 268,
            "text": "Não há distorção de informações"
          },
          {
            "id": "e2-273-369-FONTE-5",
            "source_key": "e2",
            "source_label": "E2",
            "type": "FONTE",
            "start": 273,
            "end": 369,
            "text": "https://www.poder360.com.br/poder-brasil/ben-mendes-e-gerente-de-loja-se-agridem-em-briga-em-mg/"
          }
        ]
      },
      "clusters": [
        {
          "id": "c3",
          "start": 0,
          "end": 9,
          "sources": [
            "alvaro"
          ],
          "types": [
            "FONTE"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-0-9-FONTE-0"
          ]
        },
        {
          "id": "c4",
          "start": 26,
          "end": 84,
          "sources": [
            "alvaro"
          ],
          "types": [
            "EVIDENCIA"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-26-84-EVIDENCIA-4"
          ]
        },
        {
          "id": "c1",
          "start": 86,
          "end": 106,
          "sources": [
            "alvaro",
            "davi"
          ],
          "types": [
            "EVIDENCIA"
          ],
          "exact_agreements": [
            {
              "start": 86,
              "end": 106,
              "type": "EVIDENCIA"
            }
          ],
          "span_ids": [
            "alvaro-86-106-EVIDENCIA-1",
            "davi-86-106-EVIDENCIA-1"
          ]
        },
        {
          "id": "c2",
          "start": 237,
          "end": 268,
          "sources": [
            "alvaro",
            "davi"
          ],
          "types": [
            "CLAIM",
            "EVIDENCIA"
          ],
          "exact_agreements": [],
          "span_ids": [
            "davi-237-268-CLAIM-0",
            "alvaro-237-268-EVIDENCIA-3"
          ]
        },
        {
          "id": "c5",
          "start": 273,
          "end": 369,
          "sources": [
            "alvaro"
          ],
          "types": [
            "FONTE"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-273-369-FONTE-2"
          ]
        }
      ],
      "exact_agreement": [
        {
          "start": 86,
          "end": 106,
          "type": "EVIDENCIA",
          "text": "Houve agressão mútua"
        }
      ],
      "counts": {
        "davi": 2,
        "alvaro": 5,
        "exact_agreement": 1,
        "human_union": 6
      }
    },
    {
      "order": 51,
      "noteId": "2036235208928756034",
      "tweetId": "2036208869958099022",
      "consenso": "CRNH",
      "macrotheme_label": "",
      "tweet_text": "Equipe do BTS e Polícia da Coreia do Sul deram números diferentes para quantidade de pessoas que foram assistir ao retorno do grupo.\n\nEquipe do BTS diz que foram 104 mil pessoas. Polícia diz que eram 42 mil.\n\nhttps://t.co/eNIWk52mW1",
      "note_text": "A informação está incorreta e tendenciosa. Foram usadas metodologias diferentes de contagem.    - Governo de Seul: 40–48 mil (tempo real, só área da praça)  - Ministério do Interior: 62 mil (usuários domésticos)  - HYBE: 104 mil (inclui estrangeiros e pré-pagos)    Link da matéria:     https://n.news.naver.com/article/008/0005334007?sid=105",
      "is_meta": false,
      "meta_reason": "",
      "human": {
        "davi": {
          "label": "Davi",
          "status": "completed",
          "obs": "",
          "spans": [
            {
              "id": "davi-0-41-CLAIM-0",
              "source_key": "davi",
              "source_label": "Davi",
              "type": "CLAIM",
              "start": 0,
              "end": 41,
              "text": "A informação está incorreta e tendenciosa"
            },
            {
              "id": "davi-43-262-EVIDENCIA-1",
              "source_key": "davi",
              "source_label": "Davi",
              "type": "EVIDENCIA",
              "start": 43,
              "end": 262,
              "text": "Foram usadas metodologias diferentes de contagem.    - Governo de Seul: 40–48 mil (tempo real, só área da praça)  - Ministério do Interior: 62 mil (usuários domésticos)  - HYBE: 104 mil (inclui estrangeiros e pré-pagos)"
            }
          ]
        },
        "alvaro": {
          "label": "Alvaro",
          "status": "completed",
          "obs": "",
          "spans": [
            {
              "id": "alvaro-43-262-EVIDENCIA-0",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "EVIDENCIA",
              "start": 43,
              "end": 262,
              "text": "Foram usadas metodologias diferentes de contagem.    - Governo de Seul: 40–48 mil (tempo real, só área da praça)  - Ministério do Interior: 62 mil (usuários domésticos)  - HYBE: 104 mil (inclui estrangeiros e pré-pagos)"
            },
            {
              "id": "alvaro-266-342-FONTE-1",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 266,
              "end": 342,
              "text": "Link da matéria:     https://n.news.naver.com/article/008/0005334007?sid=105"
            }
          ]
        }
      },
      "automatic": {
        "e1": [
          {
            "id": "e1-96-262-EVIDENCIA-0",
            "source_key": "e1",
            "source_label": "E1",
            "type": "EVIDENCIA",
            "start": 96,
            "end": 262,
            "text": "- Governo de Seul: 40–48 mil (tempo real, só área da praça)  - Ministério do Interior: 62 mil (usuários domésticos)  - HYBE: 104 mil (inclui estrangeiros e pré-pagos)"
          },
          {
            "id": "e1-275-330-FONTE-1",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 275,
            "end": 330,
            "text": "atéria:     https://n.news.naver.com/article/008/000533"
          },
          {
            "id": "e1-287-342-FONTE-2",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 287,
            "end": 342,
            "text": "https://n.news.naver.com/article/008/0005334007?sid=105"
          }
        ],
        "e2": [
          {
            "id": "e2-0-41-CLAIM-0",
            "source_key": "e2",
            "source_label": "E2",
            "type": "CLAIM",
            "start": 0,
            "end": 41,
            "text": "A informação está incorreta e tendenciosa"
          },
          {
            "id": "e2-43-91-EVIDENCIA-1",
            "source_key": "e2",
            "source_label": "E2",
            "type": "EVIDENCIA",
            "start": 43,
            "end": 91,
            "text": "Foram usadas metodologias diferentes de contagem"
          },
          {
            "id": "e2-98-155-EVIDENCIA-2",
            "source_key": "e2",
            "source_label": "E2",
            "type": "EVIDENCIA",
            "start": 98,
            "end": 155,
            "text": "Governo de Seul: 40–48 mil (tempo real, só área da praça)"
          },
          {
            "id": "e2-159-211-EVIDENCIA-3",
            "source_key": "e2",
            "source_label": "E2",
            "type": "EVIDENCIA",
            "start": 159,
            "end": 211,
            "text": "Ministério do Interior: 62 mil (usuários domésticos)"
          },
          {
            "id": "e2-215-262-EVIDENCIA-4",
            "source_key": "e2",
            "source_label": "E2",
            "type": "EVIDENCIA",
            "start": 215,
            "end": 262,
            "text": "HYBE: 104 mil (inclui estrangeiros e pré-pagos)"
          },
          {
            "id": "e2-287-342-FONTE-5",
            "source_key": "e2",
            "source_label": "E2",
            "type": "FONTE",
            "start": 287,
            "end": 342,
            "text": "https://n.news.naver.com/article/008/0005334007?sid=105"
          }
        ]
      },
      "clusters": [
        {
          "id": "c1",
          "start": 0,
          "end": 41,
          "sources": [
            "davi"
          ],
          "types": [
            "CLAIM"
          ],
          "exact_agreements": [],
          "span_ids": [
            "davi-0-41-CLAIM-0"
          ]
        },
        {
          "id": "c2",
          "start": 43,
          "end": 262,
          "sources": [
            "alvaro",
            "davi"
          ],
          "types": [
            "EVIDENCIA"
          ],
          "exact_agreements": [
            {
              "start": 43,
              "end": 262,
              "type": "EVIDENCIA"
            }
          ],
          "span_ids": [
            "alvaro-43-262-EVIDENCIA-0",
            "davi-43-262-EVIDENCIA-1"
          ]
        },
        {
          "id": "c3",
          "start": 266,
          "end": 342,
          "sources": [
            "alvaro"
          ],
          "types": [
            "FONTE"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-266-342-FONTE-1"
          ]
        }
      ],
      "exact_agreement": [
        {
          "start": 43,
          "end": 262,
          "type": "EVIDENCIA",
          "text": "Foram usadas metodologias diferentes de contagem.    - Governo de Seul: 40–48 mil (tempo real, só área da praça)  - Ministério do Interior: 62 mil (usuários domésticos)  - HYBE: 104 mil (inclui estrangeiros e pré-pagos)"
        }
      ],
      "counts": {
        "davi": 2,
        "alvaro": 2,
        "exact_agreement": 1,
        "human_union": 3
      }
    },
    {
      "order": 52,
      "noteId": "1884735731991519515",
      "tweetId": "1884706859187110180",
      "consenso": "CRNH",
      "macrotheme_label": "",
      "tweet_text": "AGORA O PAU VAI TORAR! Karla Sofia Gascon (Emilia Pérez) QUEBROU regra do Oscar, ao tentar prejudicar imagem de sua concorrente, Fernanda Torres, em entrevista:\n\n“Nenhuma comunicação pública de alguma pessoa associada diretamente a algum filme elegível que tente passar uma imagem https://t.co/PMsjdioOmK",
      "note_text": "Karla Sofía Gascon é um homem biológico indicado na categoria de Melhor Atriz, além de ocupar um espaço que não lhe pertence, usa seu alcance para atacar suas concorrentes.     A cultura WOKE odeia mulheres.     https://variety.com/2025/awards/news/karla-sofia-gascon-oscars-first-trans-actor-nomination-1236280974/",
      "is_meta": false,
      "meta_reason": "",
      "human": {
        "davi": {
          "label": "Davi",
          "status": "completed",
          "obs": "A nota não possui a estrutura argumentativa modelada nesta atividade",
          "spans": []
        },
        "alvaro": {
          "label": "Alvaro",
          "status": "completed",
          "obs": "",
          "spans": []
        }
      },
      "automatic": {
        "e1": [
          {
            "id": "e1-40-124-EVIDENCIA-0",
            "source_key": "e1",
            "source_label": "E1",
            "type": "EVIDENCIA",
            "start": 40,
            "end": 124,
            "text": "indicado na categoria de Melhor Atriz, além de ocupar um espaço que não lhe pertence"
          },
          {
            "id": "e1-183-186-FONTE-1",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 183,
            "end": 186,
            "text": "ura"
          },
          {
            "id": "e1-204-307-FONTE-2",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 204,
            "end": 307,
            "text": "es.     https://variety.com/2025/awards/news/karla-sofia-gascon-oscars-first-trans-actor-nomination-123"
          }
        ],
        "e2": [
          {
            "id": "e2-0-39-CLAIM-0",
            "source_key": "e2",
            "source_label": "E2",
            "type": "CLAIM",
            "start": 0,
            "end": 39,
            "text": "Karla Sofía Gascon é um homem biológico"
          },
          {
            "id": "e2-40-77-EVIDENCIA-1",
            "source_key": "e2",
            "source_label": "E2",
            "type": "EVIDENCIA",
            "start": 40,
            "end": 77,
            "text": "indicado na categoria de Melhor Atriz"
          },
          {
            "id": "e2-126-171-CLAIM-2",
            "source_key": "e2",
            "source_label": "E2",
            "type": "CLAIM",
            "start": 126,
            "end": 171,
            "text": "usa seu alcance para atacar suas concorrentes"
          },
          {
            "id": "e2-177-206-CLAIM-3",
            "source_key": "e2",
            "source_label": "E2",
            "type": "CLAIM",
            "start": 177,
            "end": 206,
            "text": "A cultura WOKE odeia mulheres"
          },
          {
            "id": "e2-212-315-FONTE-4",
            "source_key": "e2",
            "source_label": "E2",
            "type": "FONTE",
            "start": 212,
            "end": 315,
            "text": "https://variety.com/2025/awards/news/karla-sofia-gascon-oscars-first-trans-actor-nomination-1236280974/"
          }
        ]
      },
      "clusters": [],
      "exact_agreement": [],
      "counts": {
        "davi": 0,
        "alvaro": 0,
        "exact_agreement": 0,
        "human_union": 0
      }
    },
    {
      "order": 53,
      "noteId": "2035774913856840144",
      "tweetId": "2035543510393188554",
      "consenso": "CRNH",
      "macrotheme_label": "",
      "tweet_text": "NORDESTE É SOLUÇÃO! E o que vivi hoje no Rio Grande do Norte reforça ainda mais essa certeza.\n\nSaio daqui hoje com a convicção de que estamos construindo algo muito forte. Foi uma tarde marcante, de recepção calorosa e de muita gente disposta a somar. \n\nObrigado a cada pessoa que https://t.co/9jUmCLGCp8",
      "note_text": "Viés político:    A nota alega que havia slogan anterior, porém tanto o post quanto o vídeo mostram apenas frases isoladas e não slogans. Além do mais, no post consta &quot;Nordeste é a solução&quot;, diferente do alegado vídeo onde diz &quot;A solução é o Nordeste&quot;.     Nenhuma nota é necessária. ",
      "is_meta": false,
      "meta_reason": "",
      "human": {
        "davi": {
          "label": "Davi",
          "status": "completed",
          "obs": "meta nota, não possui a esrtutura argumentativa modelada nesta atividade",
          "spans": []
        },
        "alvaro": {
          "label": "Alvaro",
          "status": "completed",
          "obs": "",
          "spans": []
        }
      },
      "automatic": {
        "e1": [
          {
            "id": "e1-77-136-EVIDENCIA-0",
            "source_key": "e1",
            "source_label": "E1",
            "type": "EVIDENCIA",
            "start": 77,
            "end": 136,
            "text": "quanto o vídeo mostram apenas frases isoladas e não slogans"
          },
          {
            "id": "e1-201-236-FONTE-1",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 201,
            "end": 236,
            "text": "diferente do alegado vídeo onde diz"
          },
          {
            "id": "e1-228-252-EVIDENCIA-2",
            "source_key": "e1",
            "source_label": "E1",
            "type": "EVIDENCIA",
            "start": 228,
            "end": 252,
            "text": "onde diz &quot;A solução"
          }
        ],
        "e2": [
          {
            "id": "e2-35-56-CLAIM-0",
            "source_key": "e2",
            "source_label": "E2",
            "type": "CLAIM",
            "start": 35,
            "end": 56,
            "text": "havia slogan anterior"
          },
          {
            "id": "e2-64-136-EVIDENCIA-1",
            "source_key": "e2",
            "source_label": "E2",
            "type": "EVIDENCIA",
            "start": 64,
            "end": 136,
            "text": "tanto o post quanto o vídeo mostram apenas frases isoladas e não slogans"
          },
          {
            "id": "e2-152-199-EVIDENCIA-2",
            "source_key": "e2",
            "source_label": "E2",
            "type": "EVIDENCIA",
            "start": 152,
            "end": 199,
            "text": "no post consta &quot;Nordeste é a solução&quot;"
          },
          {
            "id": "e2-201-271-EVIDENCIA-3",
            "source_key": "e2",
            "source_label": "E2",
            "type": "EVIDENCIA",
            "start": 201,
            "end": 271,
            "text": "diferente do alegado vídeo onde diz &quot;A solução é o Nordeste&quot;"
          }
        ]
      },
      "clusters": [],
      "exact_agreement": [],
      "counts": {
        "davi": 0,
        "alvaro": 0,
        "exact_agreement": 0,
        "human_union": 0
      }
    },
    {
      "order": 54,
      "noteId": "1828475905272095265",
      "tweetId": "1828461090570690870",
      "consenso": "CRNH",
      "macrotheme_label": "",
      "tweet_text": "⏯️ Hino nacional em ato de Boulos é adaptado para linguagem neutra\n\nEm ato de campanha, Boulos apresentou hino com adaptação e recebeu críticas nas redes sociais\n\nLeia na coluna @PauloCappelli_ : https://t.co/zG5jeYmVVx https://t.co/iWvU3ltZbF",
      "note_text": "https://x.com/vitorarouche/status/1828472732620574944    Hoje a extrema direita acordou espalhando vídeo falso com o hino do Brasil. Aqui o vídeo original. O que esperar dessa gente que vive de fake news?  Ajudem a dar RT nisso aqui pra desmascarar essa notícia falsa de que o hino foi cantado usando “filhes”",
      "is_meta": false,
      "meta_reason": "",
      "human": {
        "davi": {
          "label": "Davi",
          "status": "completed",
          "obs": "",
          "spans": [
            {
              "id": "davi-57-131-CLAIM-0",
              "source_key": "davi",
              "source_label": "Davi",
              "type": "CLAIM",
              "start": 57,
              "end": 131,
              "text": "Hoje a extrema direita acordou espalhando vídeo falso com o hino do Brasil"
            },
            {
              "id": "davi-133-154-EVIDENCIA-1",
              "source_key": "davi",
              "source_label": "Davi",
              "type": "EVIDENCIA",
              "start": 133,
              "end": 154,
              "text": "Aqui o vídeo original"
            },
            {
              "id": "davi-237-309-CLAIM-2",
              "source_key": "davi",
              "source_label": "Davi",
              "type": "CLAIM",
              "start": 237,
              "end": 309,
              "text": "desmascarar essa notícia falsa de que o hino foi cantado usando “filhes”"
            }
          ]
        },
        "alvaro": {
          "label": "Alvaro",
          "status": "completed",
          "obs": "",
          "spans": [
            {
              "id": "alvaro-0-53-FONTE-0",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 0,
              "end": 53,
              "text": "https://x.com/vitorarouche/status/1828472732620574944"
            },
            {
              "id": "alvaro-99-154-EVIDENCIA-2",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "EVIDENCIA",
              "start": 99,
              "end": 154,
              "text": "vídeo falso com o hino do Brasil. Aqui o vídeo original"
            },
            {
              "id": "alvaro-275-309-CLAIM-1",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "CLAIM",
              "start": 275,
              "end": 309,
              "text": "o hino foi cantado usando “filhes”"
            }
          ]
        }
      },
      "automatic": {
        "e1": [
          {
            "id": "e1-0-53-FONTE-0",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 0,
            "end": 53,
            "text": "https://x.com/vitorarouche/status/1828472732620574944"
          },
          {
            "id": "e1-62-76-FONTE-1",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 62,
            "end": 76,
            "text": "a extrema dire"
          },
          {
            "id": "e1-215-217-FONTE-2",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 215,
            "end": 217,
            "text": "da"
          }
        ],
        "e2": [
          {
            "id": "e2-0-53-FONTE-0",
            "source_key": "e2",
            "source_label": "E2",
            "type": "FONTE",
            "start": 0,
            "end": 53,
            "text": "https://x.com/vitorarouche/status/1828472732620574944"
          },
          {
            "id": "e2-99-131-CLAIM-1",
            "source_key": "e2",
            "source_label": "E2",
            "type": "CLAIM",
            "start": 99,
            "end": 131,
            "text": "vídeo falso com o hino do Brasil"
          },
          {
            "id": "e2-133-154-EVIDENCIA-2",
            "source_key": "e2",
            "source_label": "E2",
            "type": "EVIDENCIA",
            "start": 133,
            "end": 154,
            "text": "Aqui o vídeo original"
          },
          {
            "id": "e2-275-309-CLAIM-3",
            "source_key": "e2",
            "source_label": "E2",
            "type": "CLAIM",
            "start": 275,
            "end": 309,
            "text": "o hino foi cantado usando “filhes”"
          }
        ]
      },
      "clusters": [
        {
          "id": "c3",
          "start": 0,
          "end": 53,
          "sources": [
            "alvaro"
          ],
          "types": [
            "FONTE"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-0-53-FONTE-0"
          ]
        },
        {
          "id": "c1",
          "start": 57,
          "end": 154,
          "sources": [
            "alvaro",
            "davi"
          ],
          "types": [
            "CLAIM",
            "EVIDENCIA"
          ],
          "exact_agreements": [],
          "span_ids": [
            "davi-57-131-CLAIM-0",
            "alvaro-99-154-EVIDENCIA-2",
            "davi-133-154-EVIDENCIA-1"
          ]
        },
        {
          "id": "c2",
          "start": 237,
          "end": 309,
          "sources": [
            "alvaro",
            "davi"
          ],
          "types": [
            "CLAIM"
          ],
          "exact_agreements": [],
          "span_ids": [
            "davi-237-309-CLAIM-2",
            "alvaro-275-309-CLAIM-1"
          ]
        }
      ],
      "exact_agreement": [],
      "counts": {
        "davi": 3,
        "alvaro": 3,
        "exact_agreement": 0,
        "human_union": 6
      }
    },
    {
      "order": 55,
      "noteId": "1639935770680078337",
      "tweetId": "1639764353787260936",
      "consenso": "CRNH",
      "macrotheme_label": "Cotas e Cortes no Ensino Superior",
      "tweet_text": "Essas afirmações de ligação do PT com o PCC não passam de canalhice. Não há indício, prova, nada; só canalhice mesmo. \nLembro que não há imunidade parlamentar para proteger canalhice.",
      "note_text": "Após leituras de traço político dissociado de traço social, aqueles priorizam especulações; e estes apontam que os grupos de comunidades mais pobres são sufocados pelas ações políticas do grupo político dominante, com lutas de classes a atuarem pela derrota da corrupção. In: https://conaci.org.br/noticias/transparencia-internacional-divulga-indice-de-percepcao-da-corrupcao-de-2022/",
      "is_meta": false,
      "meta_reason": "",
      "human": {
        "davi": {
          "label": "Davi",
          "status": "completed",
          "obs": "A nota não possui a esrtutura modelada nesta atividade",
          "spans": []
        },
        "alvaro": {
          "label": "Alvaro",
          "status": "completed",
          "obs": "",
          "spans": []
        }
      },
      "automatic": {
        "e1": [
          {
            "id": "e1-276-384-FONTE-0",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 276,
            "end": 384,
            "text": "https://conaci.org.br/noticias/transparencia-internacional-divulga-indice-de-percepcao-da-corrupcao-de-2022/"
          }
        ],
        "e2": [
          {
            "id": "e2-272-384-FONTE-0",
            "source_key": "e2",
            "source_label": "E2",
            "type": "FONTE",
            "start": 272,
            "end": 384,
            "text": "In: https://conaci.org.br/noticias/transparencia-internacional-divulga-indice-de-percepcao-da-corrupcao-de-2022/"
          }
        ]
      },
      "clusters": [],
      "exact_agreement": [],
      "counts": {
        "davi": 0,
        "alvaro": 0,
        "exact_agreement": 0,
        "human_union": 0
      }
    },
    {
      "order": 56,
      "noteId": "1881461849201521031",
      "tweetId": "1881459231016018144",
      "consenso": "CRNH",
      "macrotheme_label": "",
      "tweet_text": "O gesto foi filmado num evento após a tomada de posse de Donald Trump, esta segunda-feira.\n\nLeia mais: https://t.co/tZW650B7ho https://t.co/To7i1bC372",
      "note_text": "Essa é a saudação romana. Jornalistas em geral são esquerdista e não reagem quando ocorre o punho fechado saudação comunista de líderes genocidas. https://context.reverso.net/traducao/italiano-portugues/saluto+romano  e https://pt.wikipedia.org/wiki/Sauda%C3%A7%C3%A3o_romana#:~:text=A%20sauda%C3%A7%C3%A3o%20romana%20%C3%A9%20uma,palma%20da%20m%C3%A3o%20para%20baixo. ",
      "is_meta": false,
      "meta_reason": "",
      "human": {
        "davi": {
          "label": "Davi",
          "status": "completed",
          "obs": "",
          "spans": [
            {
              "id": "davi-0-24-CLAIM-0",
              "source_key": "davi",
              "source_label": "Davi",
              "type": "CLAIM",
              "start": 0,
              "end": 24,
              "text": "Essa é a saudação romana"
            }
          ]
        },
        "alvaro": {
          "label": "Alvaro",
          "status": "completed",
          "obs": "",
          "spans": [
            {
              "id": "alvaro-0-24-EVIDENCIA-0",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "EVIDENCIA",
              "start": 0,
              "end": 24,
              "text": "Essa é a saudação romana"
            },
            {
              "id": "alvaro-147-216-FONTE-1",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 147,
              "end": 216,
              "text": "https://context.reverso.net/traducao/italiano-portugues/saluto+romano"
            },
            {
              "id": "alvaro-220-368-FONTE-2",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 220,
              "end": 368,
              "text": "https://pt.wikipedia.org/wiki/Sauda%C3%A7%C3%A3o_romana#:~:text=A%20sauda%C3%A7%C3%A3o%20romana%20%C3%A9%20uma,palma%20da%20m%C3%A3o%20para%20baixo."
            }
          ]
        }
      },
      "automatic": {
        "e1": [
          {
            "id": "e1-76-145-CLAIM-0",
            "source_key": "e1",
            "source_label": "E1",
            "type": "CLAIM",
            "start": 76,
            "end": 145,
            "text": "quando ocorre o punho fechado saudação comunista de líderes genocidas"
          },
          {
            "id": "e1-147-216-FONTE-1",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 147,
            "end": 216,
            "text": "https://context.reverso.net/traducao/italiano-portugues/saluto+romano"
          },
          {
            "id": "e1-220-367-FONTE-2",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 220,
            "end": 367,
            "text": "https://pt.wikipedia.org/wiki/Sauda%C3%A7%C3%A3o_romana#:~:text=A%20sauda%C3%A7%C3%A3o%20romana%20%C3%A9%20uma,palma%20da%20m%C3%A3o%20para%20baixo"
          }
        ],
        "e2": [
          {
            "id": "e2-26-145-CLAIM-0",
            "source_key": "e2",
            "source_label": "E2",
            "type": "CLAIM",
            "start": 26,
            "end": 145,
            "text": "Jornalistas em geral são esquerdista e não reagem quando ocorre o punho fechado saudação comunista de líderes genocidas"
          },
          {
            "id": "e2-147-216-FONTE-1",
            "source_key": "e2",
            "source_label": "E2",
            "type": "FONTE",
            "start": 147,
            "end": 216,
            "text": "https://context.reverso.net/traducao/italiano-portugues/saluto+romano"
          },
          {
            "id": "e2-220-368-FONTE-2",
            "source_key": "e2",
            "source_label": "E2",
            "type": "FONTE",
            "start": 220,
            "end": 368,
            "text": "https://pt.wikipedia.org/wiki/Sauda%C3%A7%C3%A3o_romana#:~:text=A%20sauda%C3%A7%C3%A3o%20romana%20%C3%A9%20uma,palma%20da%20m%C3%A3o%20para%20baixo."
          }
        ]
      },
      "clusters": [
        {
          "id": "c1",
          "start": 0,
          "end": 24,
          "sources": [
            "alvaro",
            "davi"
          ],
          "types": [
            "CLAIM",
            "EVIDENCIA"
          ],
          "exact_agreements": [],
          "span_ids": [
            "davi-0-24-CLAIM-0",
            "alvaro-0-24-EVIDENCIA-0"
          ]
        },
        {
          "id": "c2",
          "start": 147,
          "end": 216,
          "sources": [
            "alvaro"
          ],
          "types": [
            "FONTE"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-147-216-FONTE-1"
          ]
        },
        {
          "id": "c3",
          "start": 220,
          "end": 368,
          "sources": [
            "alvaro"
          ],
          "types": [
            "FONTE"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-220-368-FONTE-2"
          ]
        }
      ],
      "exact_agreement": [],
      "counts": {
        "davi": 1,
        "alvaro": 3,
        "exact_agreement": 0,
        "human_union": 4
      }
    },
    {
      "order": 57,
      "noteId": "1916124309459808763",
      "tweetId": "1915878000765161627",
      "consenso": "CRNH",
      "macrotheme_label": "",
      "tweet_text": "A Débora acaba de ser condenada a 14 anos de prisão por pichar uma estátua com batom. O Brasil é dominado por canalhas. A solução é esperar um presidente dissolver essa corte política, convocar concurso público e eleger novos ministros. Até lá, não tem o que fazer. As instituições no Brasil estão corrompidas. Não tem como esperar de nenhuma delas a solução. Isso inclui o Congresso - onde trabalho. Enquanto isso, é não desistir. “Quem durar mais, vence”.",
      "note_text": "Ele/ela está indignado(a) com o STF, achando seus julgamentos abusivos e antidemocráticos, e acredita que só um novo governo, com força, pode mudar essa situação.&quot;  fonte :  pessoal  imparcial.",
      "is_meta": false,
      "meta_reason": "",
      "human": {
        "davi": {
          "label": "Davi",
          "status": "completed",
          "obs": "a nota não possui a estrutura argumentativa modelada nesta atividade",
          "spans": []
        },
        "alvaro": {
          "label": "Alvaro",
          "status": "completed",
          "obs": "",
          "spans": []
        }
      },
      "automatic": {
        "e1": [
          {
            "id": "e1-179-194-FONTE-0",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 179,
            "end": 194,
            "text": "pessoal  imparc"
          }
        ],
        "e2": [
          {
            "id": "e2-170-197-FONTE-0",
            "source_key": "e2",
            "source_label": "E2",
            "type": "FONTE",
            "start": 170,
            "end": 197,
            "text": "fonte :  pessoal  imparcial"
          }
        ]
      },
      "clusters": [],
      "exact_agreement": [],
      "counts": {
        "davi": 0,
        "alvaro": 0,
        "exact_agreement": 0,
        "human_union": 0
      }
    },
    {
      "order": 58,
      "noteId": "1856342402283225145",
      "tweetId": "1856128926784831584",
      "consenso": "CRNH",
      "macrotheme_label": "Pobreza e Trabalho",
      "tweet_text": "Escala 6x1 - o que não te contaram. https://t.co/UDv5ikaV8p",
      "note_text": "O fim da jornada 6x1 terá, automaticamente, que ser substituída, caso a PEC passe e, a mais ventilada, inclusive pelos membros do partido do autor da PEC é a 4x3.",
      "is_meta": false,
      "meta_reason": "",
      "human": {
        "davi": {
          "label": "Davi",
          "status": "completed",
          "obs": "meta nota, não possui a estrutura argumentativa modelada nesta atividade",
          "spans": []
        },
        "alvaro": {
          "label": "Alvaro",
          "status": "completed",
          "obs": "",
          "spans": []
        }
      },
      "automatic": {
        "e1": [],
        "e2": [
          {
            "id": "e2-0-63-CLAIM-0",
            "source_key": "e2",
            "source_label": "E2",
            "type": "CLAIM",
            "start": 0,
            "end": 63,
            "text": "O fim da jornada 6x1 terá, automaticamente, que ser substituída"
          },
          {
            "id": "e2-65-81-QUALIFICADOR-1",
            "source_key": "e2",
            "source_label": "E2",
            "type": "QUALIFICADOR",
            "start": 65,
            "end": 81,
            "text": "caso a PEC passe"
          },
          {
            "id": "e2-85-161-EVIDENCIA-2",
            "source_key": "e2",
            "source_label": "E2",
            "type": "EVIDENCIA",
            "start": 85,
            "end": 161,
            "text": "a mais ventilada, inclusive pelos membros do partido do autor da PEC é a 4x3"
          }
        ]
      },
      "clusters": [],
      "exact_agreement": [],
      "counts": {
        "davi": 0,
        "alvaro": 0,
        "exact_agreement": 0,
        "human_union": 0
      }
    },
    {
      "order": 59,
      "noteId": "2034666298249023797",
      "tweetId": "2034439531001229778",
      "consenso": "CRNH",
      "macrotheme_label": "Religião e Símbolos",
      "tweet_text": "Como pode a Igreja ter tanto dinheiro para desmatar uma área verde e construir um megatemplo para um \"frei\", enquanto o padre Júlio Lancellotti passa dia e noite na rua ajudando moradores de rua, se virando para conseguir comida, é ameaçado e difamado e não aparece nem uma fração https://t.co/yzRlezU6jj",
      "note_text": "Nem a postagem nem a reportagem insinuam recebimento de recursos públicos.  &quot;Megatemplo&quot; condiz com as dimensões da obra, que não se reduzem à capela.  Achar melhor que recursos captados por uma religião sejam mais destinados à caridade não constitui intolerância religiosa.",
      "is_meta": false,
      "meta_reason": "",
      "human": {
        "davi": {
          "label": "Davi",
          "status": "completed",
          "obs": "",
          "spans": [
            {
              "id": "davi-0-73-EVIDENCIA-0",
              "source_key": "davi",
              "source_label": "Davi",
              "type": "EVIDENCIA",
              "start": 0,
              "end": 73,
              "text": "Nem a postagem nem a reportagem insinuam recebimento de recursos públicos"
            },
            {
              "id": "davi-162-283-CLAIM-1",
              "source_key": "davi",
              "source_label": "Davi",
              "type": "CLAIM",
              "start": 162,
              "end": 283,
              "text": "Achar melhor que recursos captados por uma religião sejam mais destinados à caridade não constitui intolerância religiosa"
            }
          ]
        },
        "alvaro": {
          "label": "Alvaro",
          "status": "completed",
          "obs": "",
          "spans": []
        }
      },
      "automatic": {
        "e1": [],
        "e2": [
          {
            "id": "e2-41-73-CLAIM-0",
            "source_key": "e2",
            "source_label": "E2",
            "type": "CLAIM",
            "start": 41,
            "end": 73,
            "text": "recebimento de recursos públicos"
          },
          {
            "id": "e2-76-159-EVIDENCIA-1",
            "source_key": "e2",
            "source_label": "E2",
            "type": "EVIDENCIA",
            "start": 76,
            "end": 159,
            "text": "&quot;Megatemplo&quot; condiz com as dimensões da obra, que não se reduzem à capela"
          },
          {
            "id": "e2-162-283-CLAIM-2",
            "source_key": "e2",
            "source_label": "E2",
            "type": "CLAIM",
            "start": 162,
            "end": 283,
            "text": "Achar melhor que recursos captados por uma religião sejam mais destinados à caridade não constitui intolerância religiosa"
          }
        ]
      },
      "clusters": [
        {
          "id": "c1",
          "start": 0,
          "end": 73,
          "sources": [
            "davi"
          ],
          "types": [
            "EVIDENCIA"
          ],
          "exact_agreements": [],
          "span_ids": [
            "davi-0-73-EVIDENCIA-0"
          ]
        },
        {
          "id": "c2",
          "start": 162,
          "end": 283,
          "sources": [
            "davi"
          ],
          "types": [
            "CLAIM"
          ],
          "exact_agreements": [],
          "span_ids": [
            "davi-162-283-CLAIM-1"
          ]
        }
      ],
      "exact_agreement": [],
      "counts": {
        "davi": 2,
        "alvaro": 0,
        "exact_agreement": 0,
        "human_union": 2
      }
    },
    {
      "order": 60,
      "noteId": "2030386711545446739",
      "tweetId": "2030351066315788448",
      "consenso": "CRNH",
      "macrotheme_label": "Ataques e Conflitos",
      "tweet_text": "O Irã está vencendo a guerra! Eles acabaram de divulgar um vídeo da sua força aérea abatendo um caça americano.\n https://t.co/V1DPS65wim",
      "note_text": "Cópia/tradução de post supostamente “cômico” em inglês     https://x.com/taftermath2020/status/2030311809304207379?s=46",
      "is_meta": false,
      "meta_reason": "",
      "human": {
        "davi": {
          "label": "Davi",
          "status": "completed",
          "obs": "",
          "spans": [
            {
              "id": "davi-0-54-CLAIM-0",
              "source_key": "davi",
              "source_label": "Davi",
              "type": "CLAIM",
              "start": 0,
              "end": 54,
              "text": "Cópia/tradução de post supostamente “cômico” em inglês"
            }
          ]
        },
        "alvaro": {
          "label": "Alvaro",
          "status": "completed",
          "obs": "",
          "spans": [
            {
              "id": "alvaro-0-54-EVIDENCIA-0",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "EVIDENCIA",
              "start": 0,
              "end": 54,
              "text": "Cópia/tradução de post supostamente “cômico” em inglês"
            },
            {
              "id": "alvaro-59-119-FONTE-1",
              "source_key": "alvaro",
              "source_label": "Alvaro",
              "type": "FONTE",
              "start": 59,
              "end": 119,
              "text": "https://x.com/taftermath2020/status/2030311809304207379?s=46"
            }
          ]
        }
      },
      "automatic": {
        "e1": [
          {
            "id": "e1-23-35-QUALIFICADOR-0",
            "source_key": "e1",
            "source_label": "E1",
            "type": "QUALIFICADOR",
            "start": 23,
            "end": 35,
            "text": "supostamente"
          },
          {
            "id": "e1-59-119-FONTE-1",
            "source_key": "e1",
            "source_label": "E1",
            "type": "FONTE",
            "start": 59,
            "end": 119,
            "text": "https://x.com/taftermath2020/status/2030311809304207379?s=46"
          }
        ],
        "e2": []
      },
      "clusters": [
        {
          "id": "c1",
          "start": 0,
          "end": 54,
          "sources": [
            "alvaro",
            "davi"
          ],
          "types": [
            "CLAIM",
            "EVIDENCIA"
          ],
          "exact_agreements": [],
          "span_ids": [
            "davi-0-54-CLAIM-0",
            "alvaro-0-54-EVIDENCIA-0"
          ]
        },
        {
          "id": "c2",
          "start": 59,
          "end": 119,
          "sources": [
            "alvaro"
          ],
          "types": [
            "FONTE"
          ],
          "exact_agreements": [],
          "span_ids": [
            "alvaro-59-119-FONTE-1"
          ]
        }
      ],
      "exact_agreement": [],
      "counts": {
        "davi": 1,
        "alvaro": 2,
        "exact_agreement": 0,
        "human_union": 3
      }
    }
  ]
};
