// Pivotagem v2. Edite com cuidado.
// tools: "ID do catálogo" | {id, aplicacao?, opsec?, alerta?} | {nome,url,aplicacao,externo:true}
// regra.tags: mostra também outras ferramentas do catálogo com TODAS essas tags.
// module.icone: emoji do diagrama do topo (livre para trocar).
registerPivot({
  "id": "busca",
  "categoria": "apoio",
  "tipo": "apoio",
  "icone": "🔎",
  "titulo": "Busca, Dorks & Repositórios",
  "subtitulo": "// Ponto de partida sem identificador forte: motores de busca, dorking, coleta, acervos e diretórios de ferramentas.",
  "modulos": [
    {
      "num": "01",
      "nome": "Motores de Busca & Dorks",
      "icone": "🔎",
      "opsec": {
        "nivel": "passivo"
      },
      "vetor": "Termo / Nome ➔ Páginas / Documentos / Menções",
      "objetivo": "Varrer a web indexada com motores variados e operadores avançados.",
      "camadas": [
        {
          "id": "busca-01-c1",
          "titulo": "Dorks e Guias de Operadores",
          "tools": [
            {
              "id": "Bing",
              "aplicacao": "✅ Testada em 12/11: bing.com/search?q={termo}: petrobras → cerca de 70.800 resultados com o site oficial no topo (Turnstile invisível)."
            },
            {
              "id": "Google Dorks for Bug Bounty",
              "aplicacao": "✅ Testada em 12/11: Repositório TakSec/google-dorks-bug-bounty (1,9 mil estrelas), último commit em 2025-09-29."
            },
            {
              "id": "Google Hacking Tests (Tutorialspoint)",
              "aplicacao": "✅ Testada em 12/11: Questionário/teste didático sobre operadores do Google."
            }
          ],
          "nota": "Operadores avançados de busca.",
          "filtro": [
            "busca-dorks"
          ],
          "excluir": [
            "Shodan Dorks - s1rn3tz"
          ]
        },
        {
          "id": "busca-01-c2",
          "titulo": "Motores e Metabuscadores",
          "tools": [
            {
              "id": "I2P Hides",
              "aplicacao": "✅ Testada em 12/11: Inproxy e reseed I2P: navegar por sites da rede I2P pela clearnet (Browse the I2P network)."
            },
            {
              "id": "Intelligence X OSINT Tools Portal",
              "aplicacao": "✅ Testada em 12/11: intelx.io/tools?tab=general: coleção de ferramentas (busca de terceiros, IntelX, IA, redes sociais) que montam consultas em outros serviços."
            },
            {
              "id": "World Bank Open Data - Brazil",
              "aplicacao": "✅ Testada em 12/11: Indicadores do Brasil (PIB, população etc.) com download."
            },
            {
              "id": "Baidu",
              "aplicacao": "⚠️ Testada em 12/11: baidu.com/s?wd={termo} redirecionou para captcha de segurança (百度安全验证) com navegador automatizado."
            },
            {
              "id": "Carrot2",
              "aplicacao": "⚠️ Testada em 12/11: Agrupamento de resultados em clusters. A fonte Web depende do eTools e falhou (Search limit exceeded)."
            },
            {
              "id": "Exa (antigo Metaphor)",
              "aplicacao": "Busca semântica por significado, útil para achar páginas sobre um tema ou parecidas com uma URL, mesmo sem as palavras exatas."
            }
          ],
          "nota": "Índices alternativos ao buscador principal.",
          "filtro": [
            "busca-ampla"
          ]
        }
      ]
    },
    {
      "num": "02",
      "nome": "Coleta, Acervos & Diretórios",
      "icone": "🗂️",
      "opsec": {
        "nivel": "passivo"
      },
      "vetor": "Fonte ➔ Dados extraídos / Conteúdo histórico / Ferramentas",
      "objetivo": "Extrair dados de páginas, recuperar conteúdo histórico e localizar novas ferramentas.",
      "camadas": [
        {
          "id": "busca-02-c1",
          "titulo": "Scraping e Extração",
          "tools": [
            {
              "id": "Instant Data Scraper",
              "aplicacao": "✅ Testada em 12/11: Extensão do Chrome (1 milhão de usuários) que extrai tabelas e listas de páginas para CSV/Excel."
            },
            {
              "id": "Export Comments",
              "aplicacao": "Exporta comentários e interações de publicações em planilha, permitindo identificar perfis recorrentes e redes de apoio ao alvo."
            },
            {
              "id": "GNU Wget",
              "aplicacao": "Baixa páginas, arquivos e sites inteiros para análise local e preservação, evitando depender de o conteúdo continuar no ar."
            }
          ],
          "nota": "Coleta automatizada de dados em páginas.",
          "filtro": [
            "scrapers-automacao"
          ]
        },
        {
          "id": "busca-02-c2",
          "titulo": "Acervos e Arquivos",
          "tools": [
            {
              "id": "Flickr The Commons",
              "aplicacao": "✅ Testada em 12/11: Acervo de fotos históricas de instituições, sem restrição de direitos conhecida."
            },
            {
              "id": "Frinkiac",
              "aplicacao": "✅ Testada em 12/11: Busca por fala em cenas dos Simpsons (?q={frase})."
            },
            {
              "id": "GifCities",
              "aplicacao": "✅ Testada em 12/11: Busca de GIFs do arquivo do GeoCities (Internet Archive): construction → 10 páginas de resultados."
            },
            {
              "id": "Morbotron",
              "aplicacao": "✅ Testada em 12/11: Busca por fala em cenas de Futurama (?q={frase})."
            },
            {
              "id": "PlayPhrase.me",
              "aplicacao": "✅ Testada em 12/11: Busca de fala em cenas de filmes e séries com vídeo: good morning → 22.105 frases."
            },
            {
              "id": "Subzin",
              "aplicacao": "✅ Testada em 12/11: Busca por fala em legendas: I will be back → The Terminator (1984) com a cena."
            },
            {
              "id": "Open-i",
              "aplicacao": "⚠️ Testada em 12/11: Busca de imagens biomédicas da NLM/NIH: heart → grade de imagens (poucas carregadas)."
            },
            {
              "id": "Historypin",
              "aplicacao": "Fotos e registros históricos posicionados no mapa, úteis para comparar como um local era em outras épocas."
            }
          ],
          "nota": "Conteúdo histórico e noticioso.",
          "filtro": [
            "arquivos-noticias"
          ]
        },
        {
          "id": "busca-02-c3",
          "titulo": "Repositórios e Agregadores",
          "tools": [
            {
              "id": "Awesome OSINT",
              "aplicacao": "✅ Testada em 12/11: Lista jivoi/awesome-osint no GitHub (31 mil estrelas), atualizada em 2026-11-08."
            },
            {
              "id": "Caipora Pro",
              "aplicacao": "✅ Testada em 12/11: Portal brasileiro de buscadores e ferramentas OSINT."
            },
            {
              "id": "CTI Dashboard (Start.me)",
              "aplicacao": "✅ Testada em 12/11: Página start.me com coleções de links de inteligência de ameaças."
            },
            {
              "id": "deepdarkCTI",
              "aplicacao": "✅ Testada em 12/11: Lista fastfire/deepdarkCTI de fontes de CTI (fóruns, mercados, ransomware, Telegram), atualizada em 2026-11-11."
            },
            {
              "id": "DMI Tool Database",
              "aplicacao": "✅ Testada em 12/11: Arquivo de ferramentas da Digital Methods Initiative (Univ."
            },
            {
              "id": "Intelligence X OSINT Tools Portal",
              "aplicacao": "✅ Testada em 12/11: intelx.io/tools: mesmo portal de ferramentas, por abas (IntelX, IA, redes sociais…)."
            },
            {
              "id": "OffSec Tools - OSINT Tag",
              "aplicacao": "✅ Testada em 12/11: Lista de ferramentas OSINT com tag (reCAPTCHA)."
            },
            {
              "id": "Oh Shint It's A Blog",
              "aplicacao": "✅ Testada em 12/11: Blog de OSINT (GitBook) com guias e métodos."
            },
            {
              "id": "OSINT Dashboard (Start.me)",
              "aplicacao": "✅ Testada em 12/11: Página start.me com links por tema (username, Twitter etc.)."
            },
            {
              "id": "OSINT Dojo Resources",
              "aplicacao": "✅ Testada em 12/11: Recursos de método e ferramentas do OSINT Dojo."
            },
            {
              "id": "OSINT Framework",
              "aplicacao": "✅ Testada em 12/11: Árvore clássica de ferramentas por tipo de dado (e-mail, username…)."
            },
            {
              "id": "OSINT Stuff Tool Collection",
              "aplicacao": "✅ Testada em 12/11: Coleção do Cyber Detective (cipher387), repositório atualizado em 2026-11-11."
            },
            {
              "id": "d4shboard (Start.me)",
              "aplicacao": "⚠️ Testada em 12/11: Página start.me com reCAPTCHA; conteúdo não lido no teste."
            },
            {
              "id": "Hugging Face",
              "aplicacao": "Repositório de modelos de IA prontos (transcrição, tradução, OCR, reconhecimento de objetos) para processar o material coletado."
            }
          ],
          "nota": "Diretórios curados de ferramentas OSINT.",
          "filtro": [
            "repositorio"
          ],
          "excluir": [
            "GoOSINT"
          ]
        },
        {
          "id": "busca-02-c4",
          "titulo": "Agregadores de Consulta",
          "tools": [
            {
              "id": "Google Programmable Search Engine",
              "aplicacao": "✅ Testada em 12/11: Criação de buscador próprio restrito a sites escolhidos (/about/, exige conta Google)."
            }
          ],
          "nota": "Painéis que reúnem vários buscadores.",
          "filtro": [
            "agregador"
          ]
        }
      ]
    }
  ]
});
