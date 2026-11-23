// Pivotagem v2. Edite com cuidado.
// tools: "ID do catálogo" | {id, aplicacao?, opsec?, alerta?} | {nome,url,aplicacao,externo:true}
// regra.tags: mostra também outras ferramentas do catálogo com TODAS essas tags.
// module.icone: emoji do diagrama do topo (livre para trocar).
registerPivot({
  "id": "redes-sociais",
  "categoria": "sociais",
  "tipo": "alvo",
  "icone": "📱",
  "titulo": "Inteligência em Redes Sociais (SOCMINT)",
  "subtitulo": "// Roteiro metodológico para mapeamento de perfis, análise de grafos (SNA), forense de mídias sociais e operação segura de personas.",
  "modulos": [
    {
      "num": "01",
      "nome": "Identificação de Perfis & Metadados",
      "icone": "🆔",
      "opsec": {
        "nivel": "passivo",
        "nota": "🟢 PASSIVO"
      },
      "vetor": "Perfil / Username ➔ Identificadores Únicos (UIDs) / Contas Vinculadas / Identidade Civil / Propriedade Corporativa",
      "objetivo": "Localizar a presença online do alvo, mapear perfis escondidos e extrair IDs numéricos imutáveis que garantem o rastreio mesmo que o alvo altere o seu nome de usuário (handle).",
      "camadas": [
        {
          "id": "redes-sociais-01-c1",
          "titulo": "Enumeração e Expansão de Usernames",
          "conceito": "Indivíduos frequentemente reutilizam o mesmo nome de usuário (ou pequenas variações lógicas) em múltiplas plataformas. As ferramentas automatizam a verificação desse handle contra centenas de serviços.",
          "comoFunciona": "As plataformas realizam requisições assíncronas baseadas em dicionários e assinaturas predefinidas para validar em quais serviços de internet, fóruns e redes sociais um determinado apelido possui uma conta ativa.",
          "utilidadeOsint": "Acelera exponencialmente a descoberta de contas de um mesmo alvo, ramificando a investigação para fóruns obscuros ou redes de nicho e consolidando a pegada digital do investigado de forma abrangente.",
          "tools": [
            {
              "id": "Comment Picker - Find Instagram Username by User ID",
              "aplicacao": "✅ Testada em 12/11: ID numérico do Instagram → username atual."
            },
            {
              "id": "WhatsMyName",
              "aplicacao": "A partir de um único nome de usuário conhecido, realiza uma varredura em massa automatizada para revelar a pegada digital do investigado em centenas de outros serviços, auxiliando na correlação de dados e na construção do perfil comportamental."
            },
            {
              "id": "InstantUsername",
              "aplicacao": "Opera enviando requisições imediatas e assíncronas para verificar a existência de perfis públicos correspondentes ao termo digitado. Acelera de forma visual a descoberta de novas contas e ramificações da presença online do investigado em serviços periféricos."
            },
            {
              "id": "Who Posted What?",
              "aplicacao": "Essencial para investigações na rede Meta (Facebook). Contorna as restrições da pesquisa nativa e conta com um extrator integrado de IDs numéricos de perfis (UID). O UID fornece a base imutável do perfil que permite rastrear o alvo mesmo que ele altere a URL ou o nome da conta futuramente."
            },
            {
              "id": "Miniwebtool - Pesquisa de ID de Usuário do Instagram"
            }
          ],
          "regra": {
            "tags": [
              "fonte/redes-sociais",
              "func/busca-identificacao"
            ],
            "auto": true
          }
        },
        {
          "id": "redes-sociais-01-c2",
          "titulo": "Rastreio Corporativo e Patrocínios",
          "conceito": "Identificação de infraestrutura de anúncios e páginas institucionais associadas ao perfil/página do alvo.",
          "comoFunciona": "A plataforma indexa e permite a busca de peças publicitárias e históricos de financiamento vinculados a páginas corporativas, de figuras públicas ou políticas nas redes sociais.",
          "utilidadeOsint": "Audita campanhas de desinformação, rastreia ligações financeiras, e expõe sites de phishing, golpes impulsionados nas redes ou a real infraestrutura de domínios patrocinados pela entidade investigada.",
          "tools": [
            {
              "id": "Biblioteca de Anúncios do Facebook (Meta Ad Library)",
              "aplicacao": "✅ Testada em 12/11: URL com país e termo (ads/library/?country=BR&q={termo}&search_type=keyword_unordered): petrobras → cerca de 23.000 anúncios, cada um com identificação, datas de veiculação e página anunciante."
            }
          ]
        },
        {
          "id": "redes-sociais-01-c3",
          "titulo": "Monitoramento Global e Agregação de Menções",
          "conceito": "Rastreamento passivo de termos, hashtags e nomes de usuário em múltiplas redes sociais e páginas públicas da web de forma simultânea.",
          "comoFunciona": "Motores de busca especializados rastreiam menções públicas na internet superficial, consolidando resultados dispersos, gerando índices de visibilidade e correlacionando contas associadas ao nome de usuário.",
          "utilidadeOsint": "Facilita o cruzamento de pegadas digitais, identificando comentários periféricos, fóruns públicos e o sentimento associado ao username investigado, sem que o analista precise interagir diretamente com as plataformas de origem.",
          "tools": [
            {
              "id": "X Pro (antigo TweetDeck)",
              "aplicacao": "⚠️ Testada em 12/11: pro.x.com redireciona para o login do X; o X Pro exige assinatura Premium."
            },
            {
              "id": "Social Searcher",
              "aplicacao": "Permite ao analista mapear passivamente a repercussão e a presença digital de um username na web aberta. Consolida resultados do X/Twitter, YouTube, Reddit e blogs, expondo postagens isoladas e fóruns públicos que poderiam passar despercebidos na investigação."
            },
            {
              "id": "Webmii",
              "aplicacao": "Excelente para o pivoting inicial. Ao buscar o nome ou o username do alvo, gera um índice de visibilidade pública e correlaciona links, imagens e possíveis perfis associados em uma única interface, acelerando o mapeamento da identidade digital."
            },
            {
              "id": "Social Searcher - Google Social Search"
            },
            {
              "id": "Hootsuite"
            }
          ]
        }
      ]
    },
    {
      "num": "02",
      "nome": "Mapeamento de Redes & Grafos (SNA)",
      "icone": "🕸️",
      "opsec": {
        "nivel": "cautela",
        "nota": "🟢 PASSIVO / 🟡 ATIVO INDIRETO"
      },
      "vetor": "Lista de Amigos/Seguidores ➔ Comunidades Frequentes / Vínculos de Confiança / Hierarquias Ocultas",
      "objetivo": "Realizar a Análise de Redes Sociais (Social Network Analysis - SNA). O foco é entender o ecossistema do alvo mapeando conexões recorrentes, grupos criminosos (como canais de pirataria) e identificando as arestas de relacionamento entre os indivíduos.",
      "camadas": [
        {
          "id": "redes-sociais-02-c1",
          "titulo": "Localização de Comunidades e Mensageria",
          "conceito": "Uso de indexadores que realizam a raspagem de links de convite públicos espalhados na internet.",
          "comoFunciona": "Motores de busca especializados e diretórios centralizados varrem repositórios abertos e metadados de chats para catalogar comunidades ativas em plataformas de mensagens.",
          "utilidadeOsint": "Permite encontrar o ponto de encontro de grupos investigados no Telegram ou WhatsApp, viabilizando, com base legal, o acompanhamento para coleta de inteligência e mapeamento de comunidades.",
          "tools": [
            {
              "id": "TLG.pm Search",
              "aplicacao": "✅ Testada em 12/11: tlg.pm/search/?q={termo}: canais e grupos do Telegram (petrobras → vários canais com página própria em tlg.pm/channels/{id}), reCAPTCHA."
            },
            {
              "id": "GruposWhats.app",
              "aplicacao": "Diretório centralizado que organiza e categoriza as comunidades por tópicos, permitindo a descoberta e o acesso a salas de conversa ativas no WhatsApp de forma direta para posterior coleta de dados cadastrais dos membros."
            }
          ]
        },
        {
          "id": "redes-sociais-02-c2",
          "titulo": "Visualização de Vínculos e Estatística de Rede (Link Analysis)",
          "conceito": "Ingestão de planilhas de seguidores e interações para a renderização gráfica de nós e arestas.",
          "comoFunciona": "As plataformas processam grandes volumes de dados tabulares estruturados em vértices (nós) e arestas (conexões), aplicando algoritmos matemáticos e de layout em tempo real.",
          "utilidadeOsint": "Identifica os associados mais próximos do alvo e testa a força desses vínculos a partir do número de interações recorrentes, permitindo medir métricas de centralidade, modularidade, densidade e localizar intermediários de conexão (bridges).",
          "tools": [
            {
              "id": "Gephi",
              "aplicacao": "Software de código aberto que viabiliza a Análise de Redes Sociais (SNA) para mapear interações e comunidades. Processa grandes volumes de dados tabulares, permitindo ao analista calcular estatísticas exatas de centralidade e densidade de forma totalmente offline e segura."
            }
          ],
          "excluir": [
            "Onodo"
          ]
        },
        {
          "id": "redes-sociais-02-c3",
          "titulo": "Inteligência de Vínculos e Grafos Avançados",
          "conceito": "Correlação de entidades e modelagem complexa de dados estruturados e não estruturados por meio de grafos interativos de investigação.",
          "comoFunciona": "Aplicações avançadas consolidam dados brutos (como históricos de chamadas e transações) ou executam scripts automatizados contra APIs para mapear relacionamentos.",
          "utilidadeOsint": "Essencial para conectar de forma encadeada infraestruturas de rede, identidades digitais, pegadas na internet e estruturas corporativas em um único mapa mental técnico, revelando fluxos operacionais e redes criminosas complexas.",
          "tools": [
            {
              "id": "Arrows.app",
              "aplicacao": "✅ Testada em 12/11: Editor de grafos no navegador (Neo4j), salva localmente (#/local/id=...)."
            },
            {
              "id": "Maltego",
              "aplicacao": "Funciona como o núcleo de centralização de dados. O software permite ao analista realizar o processo de pivoting (avançar na investigação a partir de um dado conhecido) de forma visual e encadeada, transformando pedaços isolados de informação em nós gráficos interconectados em tempo real."
            },
            {
              "id": "i2 Analyst's Notebook",
              "aplicacao": "Aplicação desktop avançada de inteligência visual. Através de uma abordagem baseada em entidades, vínculos e propriedades (ELP), transforma registros complexos (como transações bancárias e logs) em redes relacionais interativas para expor fluxos operacionais e hierarquias."
            }
          ]
        }
      ]
    },
    {
      "num": "03",
      "nome": "Forense de Mídia & Análise de Mídia",
      "icone": "🖼️",
      "opsec": {
        "nivel": "passivo",
        "nota": "🟢 PASSIVO"
      },
      "vetor": "Foto ou Vídeo Publicado ➔ Rosto Identificado / Metadados Originais / Histórico Biométrico",
      "objetivo": "Auditar tudo o que o alvo publica, realizando inteligência de imagens (IMINT) para identificar rostos, extrair dados ocultos dos arquivos ou atestar a manipulação por inteligência artificial.",
      "camadas": [
        {
          "id": "redes-sociais-03-c1",
          "titulo": "Biometria Facial e Busca Reversa",
          "conceito": "Mapeamento de vetores faciais ou de características de imagem aplicados contra bilhões de fotos publicadas publicamente.",
          "comoFunciona": "Os motores de busca extraem assinaturas visuais e geométricas da face do alvo e varrem indexadores globais na internet de superfície e em redes sociais para localizar a mesma pessoa em outros contextos.",
          "utilidadeOsint": "Quebra o pseudonimato de uma conta, ligando uma 'selfie' anônima ao nome real da pessoa que apareceu em uma notícia ou banco de dados público, mapeando sua presença online.",
          "tools": [
            {
              "id": "PimEyes",
              "aplicacao": "Motor robusto baseado em IA focado em desmascarar contas falsas e rastrear o histórico do indivíduo. Foca unicamente na estrutura biométrica do rosto, sendo capaz de encontrar o mesmo indivíduo em fotos com planos de fundo e idades completamente distintos."
            },
            {
              "id": "FaceCheck.id",
              "aplicacao": "Motor focado em localizar correspondências visuais em redes sociais, fóruns e registros criminais. Ideal para expor golpistas em redes sociais (catfishing) e desmascarar contas falsas (sock puppets), gerando um 'score' de confiança para o rosto submetido."
            },
            {
              "id": "Yandex Images",
              "aplicacao": "Excepcional no reconhecimento e isolamento de características faciais, além de ser altamente preciso na identificação visual global de objetos e paisagens urbanas para GEOINT complementar."
            }
          ]
        },
        {
          "id": "redes-sociais-03-c2",
          "titulo": "Extração de Metadados e Forense Visual",
          "conceito": "Inspeção da estrutura digital de arquivos postados na rede para identificação de assinaturas de hardware, geolocalização e edições de matriz de pixels.",
          "comoFunciona": "As plataformas lêem as tags ocultas (EXIF/XMP) gravadas pelo dispositivo captor no momento da foto e aplicam algoritmos de compressão diferencial (ELA) para detectar manipulações.",
          "utilidadeOsint": "Permite verificar passivamente se há tags residuais de geolocalização e de modelo de smartphone nas mídias obtidas, além de evidenciar forensicamente se um documento ou objeto foi inserido na foto posteriormente.",
          "tools": [
            {
              "id": "ExifTool",
              "aplicacao": "A ferramenta forense definitiva para extração de metadados em terminais. Permite verificar passivamente carimbos de data/hora e coordenadas embutidas, operando localmente e garantindo 100% de OPSEC ao processar os arquivos do alvo."
            },
            {
              "id": "VerExif",
              "aplicacao": "Plataforma rápida para visualizar metadados ocultos de uma fotografia e constatar o modelo do dispositivo utilizado, oferecendo também funções defensivas de limpeza antes de interações com o alvo."
            },
            {
              "id": "Jimpl",
              "aplicacao": "Inspeciona parâmetros técnicos de captura, como a data e configurações de lente, extraindo informações técnicas residuais de imagens suspeitas de forma simplificada no navegador."
            },
            {
              "id": "FotoForensics (fotoforensics.com)",
              "aplicacao": "Aplica a técnica de Error Level Analysis (ELA) para identificar a taxa de compressão diferencial em componentes da imagem, revelando clonagem de pixels, edições dissimuladas ou inserções no plano da fotografia sem depender exclusivamente de dados EXIF."
            }
          ]
        },
        {
          "id": "redes-sociais-03-c3",
          "titulo": "Autenticidade e Detecção de Mídia Sintética (IA)",
          "conceito": "Análise de anomalias estruturais de renderização ou identificação de assinaturas digitais (Marcas d'água) injetadas no arquivo sintético.",
          "comoFunciona": "Os sistemas validam o conteúdo visual e sonoro contra modelos adversariais para determinar se o artefato foi criado por algoritmos generativos e redes neurais (GANs).",
          "utilidadeOsint": "Atesta a manipulação por inteligência artificial, identificando se os avatares (sock puppets) do alvo são fabricados ou se áudios/imagens foram gerados para campanhas de desinformação (deepfakes).",
          "tools": [
            {
              "id": "AmIReal",
              "aplicacao": "Guia analítico focado na identificação técnica de avatares sintéticos. Orienta a inspeção de imperfeições clássicas de renderização sintética (dentes desalinhados, assimetrias visuais e pupilas) para validar a credibilidade de um perfil na rede."
            },
            {
              "id": "SynthID",
              "aplicacao": "Ferramenta da Google DeepMind que atua na estrutura interna dos arquivos. Identifica marcas d'água de IA invisíveis embutidas diretamente na distribuição de pixels da imagem ou em espectrogramas de áudio, resistindo a compressões e cortes."
            },
            {
              "id": "AI or Not",
              "aplicacao": "Audita se a imagem, o arquivo de áudio ou vídeo (clones de voz) é de autoria humana ou se foi forjado por modelos difusos de IA, mapeando anomalias estruturais em renderizações avançadas."
            }
          ]
        },
        {
          "id": "redes-sociais-03-c4",
          "titulo": "Fonética Forense e Análise de Áudio",
          "conceito": "Engenharia reversa, análise espectral e processamento estático de sinais acústicos e vozes em arquivos multimídia.",
          "comoFunciona": "Softwares instaláveis processam frequências sonoras gerando visualizações gráficas de ondas e espectrogramas de alta precisão.",
          "utilidadeOsint": "Essenciais para a fonética forense de áudios e vídeos interceptados. Permite realizar perfilamento de locutores, identificar micro-edições de ruído de fundo e purificar gravações, operando localmente e de forma segura no dispositivo do investigador.",
          "tools": [
            {
              "id": "Praat",
              "aplicacao": "Software científico que viabiliza o perfilamento linguístico e a comparação de locutores. Extrai características como o pitch e formantes, auxiliando na identificação de traços biográficos de um indivíduo e autenticidade da voz operando localmente no dispositivo."
            },
            {
              "id": "Audacity",
              "aplicacao": "Permite purificar gravações de voz, isolar frequências de ruídos ambientais ou auditar o espectrograma para verificar quebras abruptas de ruído de fundo que denunciam edições ou montagens na gravação."
            },
            {
              "id": "Sonic Visualiser",
              "aplicacao": "Padrão ouro em exames acústicos visuais. Permite ao investigador inspecionar passivamente o espectrograma de áudios e vídeos interceptados em altíssima resolução para evidenciar assinaturas de compressão sintética ou cortes maliciosos na prova digital."
            }
          ],
          "regra": {
            "tags": [
              "func/forense-local",
              "func/analise-midia-integridade"
            ],
            "auto": true
          }
        }
      ]
    },
    {
      "num": "04",
      "nome": "Geolocalização & Cronolocalização",
      "icone": "📍",
      "opsec": {
        "nivel": "passivo",
        "nota": "🟢 PASSIVO"
      },
      "vetor": "Publicação ➔ Coordenadas / Check-ins / Clima da Foto / Posição Solar",
      "objetivo": "Determinar a posição física do alvo e validar se os eventos relatados na rede social (álibis) coincidem temporalmente com a realidade ambiental, extraindo inteligência geográfica (GEOINT) da mídia.",
      "camadas": [
        {
          "id": "redes-sociais-04-c1",
          "titulo": "Mapeamento em Redes Sociais e Sensores",
          "conceito": "Utilização do sinal de GPS declarado na postagem ou de varredura por geofencing na infraestrutura pública da plataforma.",
          "comoFunciona": "Ferramentas interrogam as APIs das redes sociais buscando por coordenadas de latitude/longitude embutidas em metadados de publicações ou IDs de localização (Location IDs) associados a postagens.",
          "utilidadeOsint": "Confirma geograficamente os locais frequentados (check-ins) pelo alvo, documenta a presença do indivíduo em coordenadas específicas e permite o rastreio de eventos em tempo real a partir de uma zona física delimitada no mapa.",
          "tools": [
            {
              "id": "Flickr Map",
              "aplicacao": "✅ Testada em 12/11: Mapa de fotos geolocalizadas do Flickr com busca por lugar."
            },
            {
              "id": "Who Posted What?",
              "aplicacao": "Permite usar os Location IDs geográficos do Facebook para filtrar publicações feitas estritamente a partir de um bairro, evento ou coordenada específica. Supera os filtros opacos da rede social, rastreando testemunhas oculares de um incidente em uma localidade exata."
            }
          ],
          "excluir": [
            "One Million Tweet Map"
          ]
        },
        {
          "id": "redes-sociais-04-c2",
          "titulo": "Triangulação de Sinais e Infraestrutura Wi-Fi",
          "conceito": "Pivotagem baseada na infraestrutura técnica e eletromagnética visível nas evidências (SSID/BSSID), cruzada com bancos de dados globais de roteadores.",
          "comoFunciona": "A plataforma cruza nomes de redes (SSID) ou endereços MAC de hardware (BSSID) capturados em prints, vídeos ou logs de conexão contra bilhões de observações colaborativas, convertendo o sinal em um ponto georreferenciado.",
          "utilidadeOsint": "Tem alto poder de identificação de pessoas, o que exige cuidado redobrado. Caso um print ou vídeo na rede social mostre as redes Wi-Fi locais, essas ferramentas rastreiam e informam a coordenada geográfica exata do estabelecimento, residência ou escritório frequentado pelo alvo sem depender de dados de GPS.",
          "tools": [
            {
              "id": "WiGLE",
              "aplicacao": "⚠️ Testada em 12/11: Mapa colaborativo de redes Wi-Fi (SSID, BSSID, localização)."
            },
            {
              "id": "WiFi Map",
              "aplicacao": "Correlaciona a geolocalização física de hotéis e espaços públicos com os metadados técnicos das suas redes sem fios. Permite ao analista auditar a infraestrutura de comunicações no perímetro de um alvo e estimar o nível de segurança digital do local mapeando credenciais de rede expostas."
            }
          ],
          "regra": {
            "tags": [
              "alvo/ip",
              "fonte/geoespacial",
              "func/busca-identificacao"
            ],
            "auto": true
          }
        },
        {
          "id": "redes-sociais-04-c3",
          "titulo": "Inteligência Cartográfica e Observação da Terra",
          "conceito": "Exploração topográfica, análise retroativa de imagens de satélite e modelagem visual de vínculos espaciais de um alvo ao longo do tempo.",
          "comoFunciona": "Softwares de mapeamento vetorial e imagens orbitais fornecem representações detalhadas do terreno, permitindo a inserção e gestão de marcadores personalizados por parte do investigador.",
          "utilidadeOsint": "Viabiliza a criação de mapas customizados da investigação, o cálculo de linhas de visão para refutar testemunhos, e a checagem do histórico de imagens de satélite para documentar a presença de ativos em dadas coordenadas de forma retroativa.",
          "tools": [
            {
              "id": "OpenStreetMap (OSM)",
              "aplicacao": "✅ Testada em 12/11: /search?query={lugar}: Cristo Redentor → resultado Nominatim com endereço e CEP."
            },
            {
              "id": "Google Earth",
              "aplicacao": "✅ Testada em 12/11: earth.google.com/web carrega com camadas, Detect Change e Versions (imagens históricas)."
            },
            {
              "id": "World Imagery Wayback (Esri Living Atlas)",
              "aplicacao": "✅ Testada em 12/11: Lista as versões de imagem de satélite da Esri (a mais recente 2026-10-29) com opção de mostrar só versões com mudança local."
            },
            {
              "id": "Google My Maps",
              "aplicacao": "✅ Testada em 12/11: /maps/d/: cria mapas próprios (marcadores, camadas) com conta Google."
            },
            {
              "id": "Mapillary",
              "aplicacao": "✅ Testada em 12/11: /app/?lat=..&lng=..&z=.. abre o mapa de imagens de rua colaborativas (alternativa ao Street View, com fotos mais recentes em alguns lugares)."
            },
            {
              "id": "360Cities",
              "aplicacao": "✅ Testada em 12/11: Busca de panoramas 360°: rio de janeiro → mais de 10.000 panoramas."
            },
            {
              "id": "Google Maps (Street View)",
              "aplicacao": "⚠️ Testada em 12/11: URL com coordenadas e parâmetros de Street View carregou o mapa, mas o teste não leu a imagem (redirecionou para visão 0z)."
            }
          ],
          "excluir": [
            "Gosur - Mapa de Satélite"
          ]
        }
      ]
    },
    {
      "num": "05",
      "nome": "Arquivamento & Preservação Digital",
      "icone": "🗄️",
      "opsec": {
        "nivel": "cautela",
        "nota": "🟢 PASSIVO / 🟡 ATIVO INTERMEDIADO"
      },
      "vetor": "Evidência Digital (Post/Stories) ➔ Congelamento com Validade Jurídica / Recuperação Histórica",
      "objetivo": "Garantir a imutabilidade e a validade da prova. Evitar a quebra da cadeia de custódia frente ao alvo deletar publicações comprometedoras e resgatar perfis que já não estão mais ativos.",
      "camadas": [
        {
          "id": "redes-sociais-05-c1",
          "titulo": "Resgate Histórico e Espelhamento Forense",
          "conceito": "Uso de repositórios globais e formatos forenses encapsulados para recuperar perfis desativados e capturar a estrutura interativa das páginas.",
          "comoFunciona": "A plataforma captura, armazena e disponibiliza réplicas históricas da internet, ou grava o tráfego de rede localmente para encapsular scripts e interações em pacotes estáticos com alta fidelidade (WARC/WACZ).",
          "utilidadeOsint": "Essencial para recuperar publicações que o criminoso excluiu, rastrear a evolução narrativa de um perfil ao longo do tempo e reproduzir a página idêntica à do momento da coleta de forma totalmente offline.",
          "tools": [
            {
              "id": "Wayback Machine (Internet Archive)",
              "aplicacao": "Repositório público definitivo. Captura, armazena e disponibiliza réplicas históricas (snapshots) de bilhões de páginas. Permite buscar versões passadas e posts de perfis antes de o criminoso excluí-los, ou restaurar páginas inteiras cujos domínios foram desativados."
            },
            {
              "id": "Webrecorder",
              "aplicacao": "Em vez de salvar apenas uma captura de tela estática, grava todo o tráfego de rede gerado no navegador enquanto a página do alvo é carregada e manipulada. Ele gera os pacotes padronizados (WARC/WACZ) fundamentais para a preservação forense e reprodução offline da página e suas mídias originais."
            },
            {
              "id": "ReplayWeb.page",
              "aplicacao": "Um visualizador forense que lê os arquivos gerados pelo Webrecorder (WARC/WACZ). Permite carregar o pacote estático offline e reconstruir passivamente o comportamento interativo original da página capturada (como feeds e scripts), provando como ela aparecia no exato momento da coleta."
            }
          ]
        },
        {
          "id": "redes-sociais-05-c2",
          "titulo": "Validação Jurídica e Fixação de Provas",
          "conceito": "Plataformas de certificação técnica e captura pericial de telas para conformidade em litígios processuais e penais.",
          "comoFunciona": "Sistemas auditáveis isolam o ambiente de captura do usuário, gravam metadados, tráfego de rede e geram carimbos de tempo e hashes criptográficos que atestam que a evidência não foi adulterada.",
          "utilidadeOsint": "Congelar materialmente e garantir a aceitação de provas extraídas da internet (como posts difamatórios ou comunicações de fraude) frente aos tribunais e cortes brasileiras.",
          "tools": [
            {
              "id": "GoFullPage - Full Page Screen Capture",
              "aplicacao": "✅ Testada em 12/11: Extensão do Chrome com 11 milhões de usuários."
            },
            {
              "id": "Verifact",
              "aplicacao": "Plataforma projetada para atestar as evidências extraídas da tela com fé pública. Gera um relatório técnico auditável com metadados e chaves criptográficas (hashes) que comprovam que a publicação comprometedora é real e esteve online antes da sua deleção pelo investigado."
            }
          ]
        },
        {
          "id": "redes-sociais-05-c3",
          "titulo": "Intervenção Direta (Law Enforcement)",
          "conceito": "Procedimentos institucionais direcionados a órgãos judiciais e forças da lei para o congelamento e travamento de registros físicos no servidor das empresas de tecnologia.",
          "comoFunciona": "Investigadores utilizam vias e portais institucionais dedicados para submeter protocolos formais de preservação, obrigando a plataforma a manter os pacotes de dados intactos temporariamente.",
          "utilidadeOsint": "Congelar os IPs de acesso, DMs e interações antes do envio formal da ordem de quebra de sigilo por um juiz, garantindo que a base de dados não seja expurgada mesmo que o usuário apague sua própria conta no aplicativo.",
          "tools": [
            {
              "nome": "Portais LERS (Law Enforcement Response Systems)",
              "url": "N/A",
              "aplicacao": "Endereços institucionais das redes (como o Meta LERS para Facebook, Instagram, WhatsApp) projetados para que investigadores e autoridades solicitem a preservação imediata dos dados de uma conta suspeita, assegurando a guarda das provas diretamente nas nuvens corporativas do provedor.",
              "externo": true
            }
          ]
        }
      ]
    },
    {
      "num": "06",
      "nome": "OPSEC & Operação de Personas",
      "icone": "🛡️",
      "opsec": {
        "nivel": "preparacao",
        "nota": "🛡️ PREPARAÇÃO DEFENSIVA"
      },
      "vetor": "Analista ➔ Perfil Fictício (Sock Puppet) ➔ Rede Isolada e Criptografada",
      "objetivo": "Como as redes modernas aplicam algoritmos rígidos, é mandatório construir a blindagem técnica da infraestrutura do investigador e maturar identidades falsas, conhecidas como AVIs (Assistentes Virtuais de Investigação) ou Sock Puppets, evitando o rastreio, banimentos e riscos institucionais.",
      "camadas": [
        {
          "id": "redes-sociais-06-c1",
          "titulo": "Isolamento de Rede e Emulação Mobile",
          "conceito": "Túneis de tráfego de rede, mascaramento de endereço IP e emuladores móveis em sistemas desktop.",
          "comoFunciona": "Softwares de rede cifram todo o tráfego da máquina do investigador e o roteiam através de servidores externos, enquanto emuladores simulam a arquitetura e os identificadores de um smartphone dentro do computador.",
          "utilidadeOsint": "Garante que o endereço IP real e o provedor do investigador não contaminem os logs do alvo. A virtualização Android (emuladores) permite acessar plataformas que só funcionam plenamente no celular, separando totalmente o hardware do agente da rede investigada.",
          "tools": [
            {
              "id": "Mullvad VPN",
              "aplicacao": "✅ Testada em 12/11: VPN paga com conta por número (sem e-mail)."
            },
            {
              "id": "1.1.1.1 (Cloudflare WARP)",
              "aplicacao": "Túnel de rede criptografado construído sobre o protocolo WireGuard que protege o tráfego da máquina do analista para evitar ataques de interceptação local e vazamentos de DNS (DNS leaks) na coleta."
            },
            {
              "id": "ExpressVPN",
              "aplicacao": "Rede Virtual Privada comercial que estabelece um túnel criptografado, útil para ocultar a infraestrutura institucional do investigador frente a logs de acesso das redes sociais e contornar bloqueios geográficos."
            },
            {
              "id": "BlueStacks",
              "aplicacao": "Cria um ambiente virtualizado que simula um smartphone, essencial para acessar e monitorar de forma persistente aplicativos como Instagram, TikTok e WhatsApp sem expor o hardware físico real do investigador."
            },
            {
              "id": "NoxPlayer (BigNox)",
              "aplicacao": "Permite a criação de múltiplas instâncias simultâneas de dispositivos móveis no computador, simulando diferentes coordenadas de GPS e versões de Android para o gerenciamento independente de várias contas de cobertura."
            },
            {
              "id": "Genymotion",
              "aplicacao": "Emulador focado em desempenho e controle estrito. Ideal quando o analista precisa interceptar e auditar o tráfego gerado por um aplicativo móvel suspeito sem contaminar seu próprio smartphone."
            }
          ]
        },
        {
          "id": "redes-sociais-06-c2",
          "titulo": "Geração Sintética de Identidades (Biografias e Faces)",
          "conceito": "Forjamento algorítmico e visual do indivíduo (lenda biográfica) com base em parâmetros demográficos coerentes e redes gerativas adversariais (GANs).",
          "comoFunciona": "Sistemas randomizam dados estruturados para compor um perfil completo (nomes, datas, endereços simulados) e utilizam inteligência artificial para renderizar fotografias hiper-realistas de rostos inéditos.",
          "utilidadeOsint": "Assegura que os Avatares (Sock Puppets) possuam uma história de cobertura (lenda) lógica sem recorrer ao roubo de identidade real. As fotos sintéticas blindam o perfil contra buscas reversas (como PimEyes ou Google Images) executadas pela contra-inteligência do alvo.",
          "tools": [
            {
              "id": "Fake Name Generator",
              "aplicacao": "✅ Testada em 12/11: Gera identidades fictícias (nome, endereço, telefone, nascimento) por idioma e país, sem conta."
            },
            {
              "id": "Artbreeder",
              "aplicacao": "Diferente de geradores de face com clique único, permite usar seletores dinâmicos (sliders) para ajustar finamente idade, etnia, emoção ou ângulo do rosto do avatar gerado, construindo uma identidade crível ao longo do tempo."
            },
            {
              "id": "FaceMorph.me",
              "aplicacao": "Permite criar variações exclusivas navegando por um espaço latente de características faciais. Excelente para criar múltiplas imagens do mesmo avatar em diferentes situações ou idades para compor o histórico falso do perfil."
            },
            {
              "id": "BoredHumans",
              "aplicacao": "Agrega recursos para gerar faces inexistentes e utilizar IA para automatizar ou resumir trechos textuais, ajudando o analista a simular diálogos e publicações comportamentais compatíveis com a lenda do Sock Puppet."
            }
          ],
          "excluir": [
            "FauxID"
          ]
        },
        {
          "id": "redes-sociais-06-c3",
          "titulo": "Telefonia Descartável e Gestão de Contas",
          "conceito": "Utilização de números de celular virtuais (VoIP) e gerenciadores locais criptografados para superar autenticações mandatórias (2FA) e isolar contas investigativas.",
          "comoFunciona": "Serviços em nuvem ativam números de telefonia global para receber SMS em tempo real, enquanto cofres de senha locais blindam os credenciais dos avatares criados contra quebras ou espionagem.",
          "utilidadeOsint": "Atende à verificação por telefone exigida hoje por quase todas as redes sociais (Telegram, X, Instagram) e para a segurança e persistência em longo prazo das lendas criadas.",
          "tools": [
            {
              "id": "SMS24.me",
              "aplicacao": "✅ Testada em 12/11: Números temporários grátis e PÚBLICOS para receber SMS (redireciona para /pt)."
            },
            {
              "id": "Zadarma",
              "aplicacao": "⚠️ Testada em 12/11: Telefonia virtual (números em 110 países)."
            },
            {
              "id": "Hushed",
              "aplicacao": "Viabiliza a criação de contas de mensageiros ou redes com forte dependência de número sem usar linhas rastreáveis ao investigador, suportando áreas dos Estados Unidos e Europa."
            },
            {
              "id": "OnlineSIM",
              "aplicacao": "Solução prática de locação de linhas para ativação imediata de cadastros em fóruns investigados, plataformas web e redes anônimas."
            },
            {
              "id": "Bitwarden",
              "aplicacao": "Repositório centralizado vital para OPSEC. Guarda organizadamente as senhas complexas, e-mails descartáveis e backups de recuperação de múltiplos Sock Puppets (evitando o reuso de credenciais entre contas da mesma operação)."
            }
          ]
        },
        {
          "id": "redes-sociais-06-c4",
          "titulo": "Auditoria de Pegada Digital e OPSEC",
          "conceito": "Teste rigoroso de integridade, vazamento de DNS e singularidade das características de rede e software (Browser Fingerprinting) da máquina do analista.",
          "comoFunciona": "Plataformas avaliam como as bibliotecas, plugins, fontes, canvas e cabeçalhos do navegador do investigador aparecem para os sites alvo, mapeando o grau de singularidade técnica antes da infiltração.",
          "utilidadeOsint": "Funciona como um checklist de checagem pré-voo. Garante que os túneis de rede estejam funcionais (sem vazar o IP real) e que as configurações da persona não destoem do tráfego de usuários comuns, preservando a segurança do analista.",
          "tools": [
            {
              "id": "BrowserLeaks",
              "aplicacao": "✅ Testada em 12/11: Bateria de testes de vazamento (IP, JavaScript, WebRTC, canvas, fontes…)."
            },
            {
              "id": "AmIUnique",
              "aplicacao": "⚠️ Testada em 12/11: Página de teste de fingerprint (Are you unique?) no ar."
            },
            {
              "id": "Cover Your Tracks - EFF",
              "aplicacao": "⚠️ Testada em 12/11: Teste da EFF de proteção contra rastreamento e fingerprint (TEST YOUR BROWSER)."
            }
          ]
        }
      ]
    }
  ]
});
