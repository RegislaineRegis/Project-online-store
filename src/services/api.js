// Feito em pair programming: Débora Serra, Regislaine Regis e Victor Reksidler

export async function getCategories() {
  const ENDPOINT_CATEGORIES = 'https://api.mercadolibre.com/sites/MLB/categories';
  const response = await fetch(ENDPOINT_CATEGORIES);
  const data = await response.json();

  /* data retorna uma array no formato:
  [
    {
      "id": "MLB5672",
      "name": "Acessórios para Veículos"
    },
  ]
  */
 return data;
}

export async function getProductsFromCategoryAndQuery(categoryId = '', query = '') {
  const queryCategory = categoryId ? `category=${categoryId}` : '';
  const queryInput = query ? `q=${query}` : '';
  const ENDPOINT_SEARCH = `https://api.mercadolibre.com/sites/MLB/search?${queryCategory}${queryCategory && queryInput ? '&' : ''}${queryInput}`;
  const response = await fetch(ENDPOINT_SEARCH);
  const data = await response.json();
  /*
  data retorna no formato:
  {
    "site_id": "MLB",
    "country_default_time_zone": "GMT-03:00",
    "query": "Acessórios para Veículos",
    "paging": {
      "total": 40933,
      "primary_results": 1000,
      "offset": 0,
      "limit": 50
    },
    "results": [
      {
        "id": "MLB1985412718",
        "site_id": "MLB",
        "title": "Acessório Carro Apoio Braço Encosto Descanso Porta Objetos",
        "seller": {
          "id": 567635787,
          "permalink": "http://perfil.mercadolivre.com.br/MULTIPLAPART",
          "registration_date": "2020-10-16T12:14:27.000-04:00",
          "car_dealer": false,
          "real_estate_agency": false,
          "tags": [
            "normal",
            "credits_profile",
            "messages_as_seller"
          ],
          "seller_reputation": {
            "power_seller_status": "platinum",
            "level_id": "5_green",
            "metrics": {
              "cancellations": {
                "period": "60 days",
                "rate": 0.0021,
                "value": 8
              },
              "claims": {
                "period": "60 days",
                "rate": 0.0084,
                "value": 32
              },
              "delayed_handling_time": {
                "period": "60 days",
                "rate": 0.0077,
                "value": 28
              },
              "sales": {
                "period": "60 days",
                "completed": 3518
              }
            },
            "transactions": {
              "canceled": 804,
              "period": "historic",
              "total": 11000,
              "ratings": {
                "negative": 0.02,
                "neutral": 0.01,
                "positive": 0.97
              },
              "completed": 10196
            }
          }
        },
        "price": 144.9,
        "sort": {
    "id": "relevance",
    "name": "More relevant"
  },
  "available_sorts": [
    {
      "id": "price_asc",
      "name": "Lower price"
    },
    {
      "id": "price_desc",
      "name": "Higher price"
    }
  ],
  "filters": [
    {
      "id": "category",
      "name": "Categories",
      "type": "text",
      "values": [
        {
          "id": "MLB5672",
          "name": "Acessórios para Veículos",
          "path_from_root": [
            {
              "id": "MLB5672",
              "name": "Acessórios para Veículos"
            }
          ]
        }
      ]
    }
  ],
  "available_filters": [
    {
      "id": "category",
      "name": "Categories",
      "type": "text",
      "values": [
        {
          "id": "MLB22693",
          "name": "Peças de Carros e Caminhonetes",
          "results": 6887
        },
        {
          "id": "MLB1747",
          "name": "Aces. de Carros e Caminhonetes",
          "results": 25386
        },
        {
          "id": "MLB1776",
          "name": "Tuning",
          "results": 6524
        },
        {
          "id": "MLB3381",
          "name": "Som Automotivo",
          "results": 711
        },
        {
          "id": "MLB188063",
          "name": "Limpeza Automotiva",
          "results": 603
        },
        {
          "id": "MLB2239",
          "name": "Segurança Veicular",
          "results": 486
        },
        {
          "id": "MLB2227",
          "name": "Ferramentas",
          "results": 383
        },
        {
          "id": "MLB1771",
          "name": "Aces. de Motos e Quadriciclos",
          "results": 127
        },
        {
          "id": "MLB243551",
          "name": "Peças de Motos e Quadriciclos",
          "results": 122
        },
        {
          "id": "MLB8531",
          "name": "Navegadores GPS",
          "results": 112
        },
        {
          "id": "MLB2238",
          "name": "Pneus",
          "results": 40
        },
        {
          "id": "MLB456046",
          "name": "Peças Náuticas",
          "results": 30
        },
        {
          "id": "MLB260634",
          "name": "Performance",
          "results": 25
        },
        {
          "id": "MLB255788",
          "name": "Rodas",
          "results": 25
        },
        {
          "id": "MLB6005",
          "name": "Acessórios Náuticos",
          "results": 20
        },
        {
          "id": "MLB438364",
          "name": "Acessórios para Caminhões",
          "results": 15
        },
        {
          "id": "MLB419936",
          "name": "Peças de Linha Pesada",
          "results": 10
        },
        {
          "id": "MLB5802",
          "name": "Outros",
          "results": 30
        }
      ]
    },
    {
      "id": "official_store",
      "name": "Tiendas oficiales",
      "type": "text",
      "values": [
        {
          "id": "all",
          "name": "Todas las tiendas oficiales",
          "results": 2159
        },
        {
          "id": "998",
          "name": "AZ Acessorios",
          "results": 542
        },
        {
          "id": "3126",
          "name": "Nissan Pecas Acessorios",
          "results": 511
        },
        {
          "id": "1441",
          "name": "Auto Equip",
          "results": 5
        }
      ]
    },
    {
      "id": "discount",
      "name": "Descuentos",
      "type": "number",
      "values": [
        {
          "id": "5-100",
          "name": "Desde 5% OFF",
          "results": 2553
        },
        {
          "id": "10-100",
          "name": "Desde 10% OFF",
          "results": 941
        },
        {
          "id": "15-100",
          "name": "Desde 15% OFF",
          "results": 378
        },
        {
          "id": "20-100",
          "name": "Desde 20% OFF",
          "results": 148
        },
        {
          "id": "25-100",
          "name": "Desde 25% OFF",
          "results": 92
        },
        {
          "id": "30-100",
          "name": "Desde 30% OFF",
          "results": 56
        }
      ]
    },
    {
      "id": "state",
      "name": "Location",
      "type": "text",
      "values": [
        {
          "id": "TUxCUFNBT085N2E4",
          "name": "São Paulo",
          "results": 19281
        },
        {
          "id": "TUxCUE1JTlMxNTAyZA",
          "name": "Minas Gerais",
          "results": 17485
        },
        {
          "id": "TUxCUFBBUkExODBlZA",
          "name": "Paraná",
          "results": 869
        },
        {
          "id": "TUxCUFJJT08xODM5Zg",
          "name": "Rio de Janeiro",
          "results": 317
        },
        {
          "id": "TUxCUEJBSEFlYmEx",
          "name": "Bahia",
          "results": 307
        },
        {
          "id": "TUxCUFJJT0xkYzM0",
          "name": "Rio Grande do Sul",
          "results": 194
        },
        {
          "id": "TUxCUFNBTkE5Nzc4",
          "name": "Santa Catarina",
          "results": 163
        },
        {
          "id": "TUxCUEVTUE8xN2Y3NA",
          "name": "Espírito Santo",
          "results": 122
        },
        {
          "id": "TUxCUERJU0wxMWJhYg",
          "name": "Distrito Federal",
          "results": 51
        },
        {
          "id": "TUxCUEdPSVMxNzVmMw",
          "name": "Goiás",
          "results": 20
        },
        {
          "id": "TUxCUE1BUk81MWVi",
          "name": "Maranhão",
          "results": 5
        },
        {
          "id": "TUxCUE1BVE9jZDY0",
          "name": "Mato Grosso",
          "results": 5
        },
        {
          "id": "TUxCUEFNQVMxNzgwYQ",
          "name": "Amazonas",
          "results": 5
        },
        {
          "id": "TUxCUFBBUkE0M2I4",
          "name": "Paraíba",
          "results": 5
        }
      ]
    },
    {
      "id": "price",
      "name": "Precio",
      "type": "range",
      "values": [
        {
          "id": "*-75.0",
          "name": "Up to R$75",
          "results": 12798
        },
        {
          "id": "75.0-100.0",
          "name": "R$75 to R$100",
          "results": 4191
        },
        {
          "id": "100.0-*",
          "name": "More than R$100",
          "results": 23943
        }
      ]
    },
    {
      "id": "accepts_mercadopago",
      "name": "MercadoPago filter",
      "type": "boolean",
      "values": [
        {
          "id": "yes",
          "name": "With MercadoPago",
          "results": 40933
        }
      ]
    },
    {
      "id": "installments",
      "name": "Pago",
      "type": "text",
      "values": [
        {
          "id": "no_interest",
          "name": "Sin interés",
          "results": 34183
        }
      ]
    },
    {
      "id": "shipping",
      "name": "Envío",
      "type": "text",
      "values": [
        {
          "id": "mercadoenvios",
          "name": "Mercado Envíos",
          "results": 38901
        },
        {
          "id": "fulfillment",
          "name": "Full",
          "results": 322
        }
      ]
    },
    {
      "id": "power_seller",
      "name": "Seller quality filter",
      "type": "boolean",
      "values": [
        {
          "id": "yes",
          "name": "Best sellers",
          "results": 27894
        }
      ]
    },
    {
      "id": "since",
      "name": "Auction start date filter",
      "type": "text",
      "values": [
        {
          "id": "today",
          "name": "Publicados hoy",
          "results": 5
        }
      ]
    },
    {
      "id": "has_video",
      "name": "Video publications filter",
      "type": "boolean",
      "values": [
        {
          "id": "yes",
          "name": "Publications with video",
          "results": 8320
        }
      ]
    },
    {
      "id": "has_pictures",
      "name": "Items with images filter",
      "type": "boolean",
      "values": [
        {
          "id": "yes",
          "name": "With pictures",
          "results": 40933
        }
      ]
    },
    {
      "id": "all_payment_methods_discount",
      "name": "Descuentos para todos los medios de pago",
      "type": "number",
      "values": [
        {
          "id": "5-100",
          "name": "Desde 5% OFF",
          "results": 194
        },
        {
          "id": "10-100",
          "name": "Desde 10% OFF",
          "results": 148
        },
        {
          "id": "15-100",
          "name": "Desde 15% OFF",
          "results": 56
        },
        {
          "id": "20-100",
          "name": "Desde 20% OFF",
          "results": 5
        }
      ]
    },
    {
      "id": "price_campaign_id",
      "name": "Campaña",
      "type": "number",
      "values": [
        {
          "id": "MLB7752",
          "name": "MLB7752",
          "results": 20
        },
        {
          "id": "MLB7565",
          "name": "MLB7565",
          "results": 10
        },
        {
          "id": "P-MLB4436001",
          "name": "P-MLB4436001",
          "results": 5
        }
      ]
    },
    {
      "id": "shipping_cost",
      "name": "Costo de envío",
      "type": "text",
      "values": [
        {
          "id": "free",
          "name": "Gratis",
          "results": 26502
        }
      ]
    },
    {
      "id": "ITEM_CONDITION",
      "name": "Condição",
      "type": "STRING",
      "values": [
        {
          "id": "2230284",
          "name": "Novo",
          "results": 40651
        },
        {
          "id": "2230581",
          "name": "Usado",
          "results": 266
        }
      ]
    },
    {
      "id": "SHIPPING_ORIGIN",
      "name": "Tipo de compra",
      "type": "STRING",
      "values": [
        {
          "id": "10215068",
          "name": "Local",
          "results": 38845
        },
        {
          "id": "10215069",
          "name": "Internacional",
          "results": 2087
        }
      ]
    }
  ]
}
  */
 return data;
}

export async function getProductsDetails(productId) {
  const ENDPOINT_PRODUCT = `https://api.mercadolibre.com/items/${productId}`;
  const response = await fetch(ENDPOINT_PRODUCT);
  const data = await response.json();
  /**data retorna no formato:
   * quando não encontrado:
   *  {
        "error": "resource not found",
        "message": "Si quieres conocer los recursos de la API que se encuentran disponibles visita el Sitio de Desarrolladores de MercadoLibre (http://developers.mercadolibre.com)"
      }
    quando encontrado:
      {
        "id": "MLB1985412718",
        "site_id": "MLB",
        "title": "Acessório Carro Apoio Braço Encosto Descanso Porta Objetos",
        "subtitle": null,
        "seller_id": 567635787,
        "category_id": "MLB31156",
        "official_store_id": null,
        "price": 144.9,
        "base_price": 144.9,
        "original_price": null,
        "currency_id": "BRL",
        "initial_quantity": 18508,
        "available_quantity": 8850,
        "sold_quantity": 2560,
        "sale_terms": [],
        "buying_mode": "buy_it_now",
        "listing_type_id": "gold_pro",
        "start_time": "2021-08-19T13:50:39.000Z",
        "stop_time": "2041-08-14T04:00:00.000Z",
        "condition": "new",
        "permalink": "https://produto.mercadolivre.com.br/MLB-1985412718-acessorio-carro-apoio-braco-encosto-descanso-porta-objetos-_JM",
        "thumbnail_id": "713380-MLB49213845076_022022",
        "thumbnail": "http://http2.mlstatic.com/D_713380-MLB49213845076_022022-I.jpg",
        "secure_thumbnail": "https://http2.mlstatic.com/D_713380-MLB49213845076_022022-I.jpg",
        "pictures": [],
        "video_id": "k0ZYpsUBCI8",
        "descriptions": [
        ],
        "accepts_mercadopago": true,
        "non_mercado_pago_payment_methods": [
        ],
        "shipping": {},
        "international_delivery_mode": "none",
        "seller_address": {},
        "seller_contact": null,
        "location": {
        },
        "coverage_areas": [
        ],
        "attributes": [],
        "warnings": [
        ],
        "listing_source": "",
        "variations": [],
        "status": "active",
        "sub_status": [
        ],
        "tags": [],
        "warranty": "Garantia do vendedor: 1 anos",
        "catalog_product_id": null,
        "domain_id": "MLB-AUTOMOTIVE_ARMRESTS",
        "parent_item_id": null,
        "differential_pricing": null,
        "deal_ids": [],
        "automatic_relist": false,
        "date_created": "2021-08-19T13:50:40.000Z",
        "last_updated": "2022-03-10T18:30:04.000Z",
        "health": 1,
        "catalog_listing": false,
        "channels": []
      }

   */
  return data;
}
