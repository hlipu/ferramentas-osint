// Pivotagem v2. Edite com cuidado.
// tools: "ID do catálogo" | {id, aplicacao?, opsec?, alerta?} | {nome,url,aplicacao,externo:true}
// regra.tags: mostra também outras ferramentas do catálogo com TODAS essas tags.
// module.icone: emoji do diagrama do topo (livre para trocar).
registerPivot({
  "id": "veiculos",
  "categoria": "logistica",
  "tipo": "alvo",
  "icone": "🚗",
  "titulo": "Investigação de Veículos e Logística (VATINT)",
  "subtitulo": "// Roteiro metodológico para rastreamento de veículos terrestres, telemetria aérea, frotas marítimas e infraestrutura de transportes.",
  "imagem": "../img/trilha-veiculos.jpg",
  "modulos": [
    {
      "num": "01",
      "nome": "Veículos Terrestres & Frotas Rodoviárias",
      "icone": "🚗",
      "opsec": {
        "nivel": "passivo",
        "nota": "🟢 PASSIVO"
      },
      "vetor": "Placa / Chassi / CNPJ ➔ Dados Cadastrais / Histórico de Sinistros / Restrições / Frota Comercial",
      "objetivo": "Realizar o levantamento patrimonial de ativos terrestres, identificando a procedência, o tipo de propriedade e o histórico de um veículo para detectar fraudes, clonagens ou o uso de transportadoras de fachada.",
      "camadas": [
        {
          "id": "veiculos-01-c1",
          "titulo": "Identificação Básica e Segurança Pública",
          "conceito": "Decodificação primária dos dados de fábrica e cruzamento com bases de segurança pública.",
          "comoFunciona": "Aplicativos e portais web interrogam bases de dados de trânsito em tempo real a partir da placa inserida, retornando a ficha técnica do veículo e processando simultaneamente o status criminal daquele ativo.",
          "utilidadeOsint": "Essencial para confirmar inconsistências físicas em campo. Permite detectar indícios de clonagem de veículos ao cruzar o modelo e cor observados com o registro oficial, além de checar pendências de roubo/furto de forma imediata.",
          "tools": [
            {
              "id": "Busca Placas",
              "aplicacao": "⚠️ Testada em 14/11: Campo de placa; com placa fictícia a página não mostrou dado, só o fluxo comercial (conta grátis, paga-se por consulta: chassi, Renavam etc.)."
            },
            {
              "id": "SINESP Cidadão (App Store)",
              "aplicacao": "Aplicativo oficial governamental. A partir da placa, informa a marca/modelo e verifica imediatamente se há registro ativo de roubo ou furto para o veículo nas bases nacionais, servindo como consulta primária e ágil em diligências de campo."
            },
            {
              "id": "Portal KePlaca",
              "aplicacao": "Atua como indexador rápido para identificação e validação de ativos móveis. Permite correlacionar de forma ágil uma placa avistada à sua real especificação de fábrica, auxiliando no levantamento da base geográfica original do veículo investigado."
            },
            {
              "id": "Plate Recognizer"
            }
          ],
          "regra": {
            "tags": [
              "alvo/veiculo"
            ],
            "auto": true
          },
          "excluir": [
            "Consulta de Frota Geral - ANTAQ",
            "Consulta de Embarcações - ANTAQ"
          ]
        },
        {
          "id": "veiculos-01-c2",
          "titulo": "Histórico Profundo e Passivos (VATINT/FININT)",
          "conceito": "Acesso a agregadores que consolidam dados de Detrans, leilões e restrições financeiras (gravames).",
          "comoFunciona": "Bureaus de informação privada consolidam dados massivos provenientes de leiloeiros, seguradoras, cartórios e sistemas judiciais para montar uma linha do tempo integral sobre a propriedade do ativo.",
          "utilidadeOsint": "Diferencia a posse técnica da propriedade jurídica, sendo vital para mapear se os bens estão bloqueados (alienação fiduciária), se transitaram por leilões ou se acumulam sinistros, desvelando o verdadeiro passivo atrelado à frota.",
          "tools": [
            {
              "id": "Carfacts",
              "aplicacao": "⚠️ Testada em 14/11: Oferece \"consulta grátis\" com marca, modelo e ano e venda de relatório completo."
            },
            {
              "id": "Lupa Veicular",
              "aplicacao": "Fornece o histórico veicular e diferencia o tipo de propriedade (ex: pessoa física, pessoa jurídica ou alienação fiduciária). Identificar que o proprietário se enquadra como banco é essencial para mapear bens atrelados a financiamentos."
            },
            {
              "id": "Carpivara",
              "aplicacao": "Plataforma de background check veicular que serve para auditar a situação legal de ativos rodoviários, complementando investigações de ocultação de patrimônio e verificando se os automóveis do alvo possuem impedimentos judiciais."
            }
          ],
          "regra": {
            "tags": [
              "alvo/veiculo",
              "fonte/registros-publicos-gov",
              "func/busca-identificacao"
            ],
            "auto": true
          },
          "excluir": [
            "Consulta de Frota Geral - ANTAQ",
            "Consulta de Embarcações - ANTAQ"
          ]
        },
        {
          "id": "veiculos-01-c3",
          "titulo": "Frotas e Transporte de Carga",
          "conceito": "Mapeamento regulatório de transportadoras e motoristas autônomos por meio de bases governamentais cruzadas.",
          "comoFunciona": "A plataforma interroga as bases da agência reguladora de transportes para consolidar todos os ativos logísticos atrelados e legalmente associados à razão social ou CPF do transportador.",
          "utilidadeOsint": "Viabiliza o mapeamento reverso de frota. Fornece uma listagem completa das placas atreladas a uma empresa, cujas placas constituem excelentes entradas para inserção em câmeras OCR ou sistemas de pedágio em rodovias.",
          "tools": [
            {
              "id": "Consulta Pública RNTRC - ANTT",
              "aplicacao": "O analista insere o CNPJ de uma transportadora (ou CPF de um autônomo) e a ferramenta revela todas as placas de cavalos mecânicos e reboques registrados pela entidade. Permite auditar a real capacidade logística do alvo e constatar incompatibilidades entre as frotas declaradas e o patrimônio ostentado."
            }
          ]
        }
      ]
    },
    {
      "num": "02",
      "nome": "Aviação Civil & Propriedade (ANAC/FAB)",
      "icone": "✈️",
      "opsec": {
        "nivel": "passivo",
        "nota": "🟢 PASSIVO"
      },
      "vetor": "Prefixo / CPF / CNPJ ➔ Proprietário Real / Operador / Situação de Voo / Deslocamentos de Autoridades",
      "objetivo": "Localizar ativos aéreos de alto valor, quebrando a blindagem patrimonial de indivíduos de alta renda (HNWIs) e corporações, e rastrear o uso institucional de aeronaves governamentais.",
      "camadas": [
        {
          "id": "veiculos-02-c1",
          "titulo": "Propriedade e Registro Civil",
          "conceito": "Consulta direta à 'certidão de nascimento' e registro de posse da aeronave na agência reguladora oficial.",
          "comoFunciona": "A plataforma interroga as bases oficiais de aviação civil para revelar se uma pessoa física ou jurídica possui aeronaves registradas no país, ou utiliza o prefixo para atestar as condições do certificado de voo.",
          "utilidadeOsint": "Permite realizar o mapeamento passivo de ativos de alto valor financeiro atrelados a indivíduos sob suspeita ou empresas de fachada, revelando a identidade de proprietários e a situação regular do bem móvel.",
          "tools": [
            {
              "id": "Consulta ao Registro Aeronáutico Brasileiro (RAB) - ANAC",
              "aplicacao": "✅ Testada em 14/11: A URL redireciona para aeronaves.anac.gov.br/aeronaves/cons_rab.asp (novo formulário)."
            },
            {
              "id": "Registro Aeronáutico Brasileiro (RAB) - Dados Abertos ANAC",
              "aplicacao": "✅ Testada em 14/11: Página gov.br do conjunto RAB com metadados e arquivos para download (todas as aeronaves, proprietários e operadores)."
            },
            {
              "id": "FAA Aircraft Registry - Name Inquiry",
              "aplicacao": "✅ Testada em 14/11: Busca por nome do registrante no registro dos EUA: DELTA AIR LINES INC → lista de aeronaves (51 linhas na página) com N-Number e série."
            },
            {
              "id": "Pesquisa Pública de Processos SEI - ANAC",
              "aplicacao": "⚠️ Testada em 14/11: Formulário público de pesquisa de processos e documentos do SEI da ANAC (protocolo, interessado, período)."
            },
            {
              "id": "Pesquisa CNPA - ANAC",
              "aplicacao": "O analista insere o CPF ou CNPJ do alvo; caso não haja bens, é gerada a certidão negativa, mas caso existam, o sistema lista as marcas e matrículas das aeronaves, atuando como um indexador reverso de infraestrutura de alta relevância."
            }
          ],
          "regra": {
            "tags": [
              "alvo/veiculo",
              "fonte/registros-publicos-gov"
            ],
            "auto": true
          },
          "excluir": [
            "Consulta de Frota Geral - ANTAQ",
            "Consulta de Embarcações - ANTAQ"
          ]
        },
        {
          "id": "veiculos-02-c2",
          "titulo": "Transparência e Voos Oficiais",
          "conceito": "Rastreamento institucional do uso de aeronaves governamentais para prestação de contas e cruzamento de agendas públicas.",
          "comoFunciona": "Plataformas de transparência ativa disponibilizam relatórios de missões de transporte, detalhando autoridades requisitantes, número de passageiros e trajetos executados.",
          "utilidadeOsint": "Permite cruzar agendas oficiais de Pessoas Politicamente Expostas (PEP) com deslocamentos reais executados em aeronaves militares, ajudando a identificar padrões de viagem e comitivas de caronas institucionais.",
          "tools": [
            {
              "id": "Registro de Voos - Força Aérea Brasileira (FAB)",
              "aplicacao": "Disponibiliza os registros detalhados das viagens institucionais. Os prefixos identificados nestes relatórios servem como insumo para rastrear o histórico técnico de voos em plataformas abertas de telemetria ADSB."
            }
          ]
        },
        {
          "id": "veiculos-02-c3",
          "titulo": "Telemetria, Rastreamento e Histórico Aeronáutico",
          "conceito": "Rastreamento global em tempo real de voos (telemetria ADS-B), busca de mídias fotográficas históricas e verificação de sinistros aéreos.",
          "comoFunciona": "Sistemas agregam dados de receptores terrestres e de satélites do sistema ADS-B, registros globais de acidentes e redes colaborativas de imagens aeronáuticas para compilar a rotina operacional das frotas.",
          "utilidadeOsint": "Expande o levantamento estático para a vigilância de mobilidade. Viabiliza rastrear trajetos de jatos privados e voos comerciais do alvo, confirmar evidências visuais de presença em aeroportos e mapear o histórico de posse via acidentes registrados.",
          "tools": [
            {
              "id": "FlightStats (flightstats.com)",
              "aplicacao": "✅ Testada em 14/11: /v2/flight-tracker/{cia}/{número}: LH 400 → Frankfurt–Nova York, Scheduled/On time."
            },
            {
              "id": "Aviation Safety Network (ASN)",
              "aplicacao": "✅ Testada em 14/11: Redireciona para aviation-safety.net: ocorrências recentes (última de 08/11/2026) e base wiki de acidentes e incidentes."
            },
            {
              "id": "FlightAware Photos (pt.flightaware.com/photos/)",
              "aplicacao": "⚠️ Testada em 14/11: A página /photos/aircraft/{matrícula} carrega, mas mostrou principalmente a navegação geral de fotos por tipo de aeronave (Embraer 175 etc.)."
            },
            {
              "id": "Flightradar24 (flightradar24.com)",
              "aplicacao": "Permite monitorar as rotas, velocidades e altitudes de jatos executivos associados ao alvo. O analista pode rastrear conexões corporativas analisando a presença simultânea de aeronaves investigadas em determinados aeroportos."
            }
          ],
          "regra": {
            "tags": [
              "alvo/veiculo",
              "func/busca-identificacao"
            ],
            "auto": true
          },
          "excluir": [
            "Consulta de Frota Geral - ANTAQ",
            "Consulta de Embarcações - ANTAQ"
          ]
        }
      ]
    },
    {
      "num": "03",
      "nome": "Telemetria Aérea & Rastreamento de Voos",
      "icone": "📡",
      "opsec": {
        "nivel": "passivo",
        "nota": "🟢 PASSIVO"
      },
      "vetor": "Prefixo (Matrícula) ➔ Rotas Históricas / Posição em Tempo Real / Registro Fotográfico",
      "objetivo": "Monitorar ativamente os deslocamentos e as rotas logísticas aéreas do investigado para estabelecer cronogramas (linhas do tempo) e correlacionar viagens a reuniões de negócios, evasão ou movimentação de ativos.",
      "camadas": [
        {
          "id": "veiculos-03-c1",
          "titulo": "Telemetria e Tráfego em Tempo Real",
          "conceito": "Captura e renderização de sinais de rádio ADS-B emitidos por transponders de aeronaves para receptores globais.",
          "comoFunciona": "Plataformas agregam sinais de telemetria emitidos por transponders de aeronaves (ADS-B) e dados de controle de tráfego aéreo, processando altitude, velocidade e coordenadas em mapas interativos de forma contínua.",
          "utilidadeOsint": "Viabiliza o rastreamento ininterrupto de jatos executivos e voos comerciais do alvo. Permite validar álibis temporais e identificar conexões geográficas e corporativas a partir da presença simultânea de aeronaves em aeródromos específicos.",
          "tools": [
            {
              "id": "FlightStats (flightstats.com)",
              "aplicacao": "✅ Testada em 14/11: /v2/flight-tracker/{cia}/{número}: LH 400 → Frankfurt–Nova York, Scheduled/On time."
            },
            {
              "id": "Flightradar24 (flightradar24.com)",
              "aplicacao": "Exibe em tempo real o posicionamento, histórico de rotas, velocidade e altitude de voos comerciais e jatos executivos. O analista pode monitorar padrões de viagem, rastrear frotas corporativas e programar alertas para movimentos táticos logísticos do investigado."
            }
          ],
          "regra": {
            "tags": [
              "alvo/veiculo",
              "fonte/geoespacial",
              "func/busca-identificacao"
            ],
            "auto": true
          }
        },
        {
          "id": "veiculos-03-c2",
          "titulo": "Evidências Visuais e Reconhecimento Fotográfico (Spotting)",
          "conceito": "Busca em repositórios colaborativos por evidências fotográficas que atestem o aspecto físico e o paradeiro histórico do ativo aéreo.",
          "comoFunciona": "A plataforma agrega milhões de fotografias submetidas por entusiastas da aviação (spotters) de todo o mundo, indexando-as estritamente pela marca de matrícula (prefixo) da aeronave investigada.",
          "utilidadeOsint": "Permite que o investigador verifique a aparência física do avião (mudanças de pintura/logotipo) para documentar a tentativa de ocultação visual ou confirme fotograficamente sua presença física em um aeroporto numa data específica, estabelecendo álibis visuais inegáveis.",
          "tools": [
            {
              "id": "FlightAware Photos (pt.flightaware.com/photos/)",
              "aplicacao": "⚠️ Testada em 14/11: A página /photos/aircraft/{matrícula} carrega, mas mostrou principalmente a navegação geral de fotos por tipo de aeronave (Embraer 175 etc.)."
            }
          ]
        },
        {
          "id": "veiculos-03-c3",
          "titulo": "Histórico de Ocorrências e Inteligência de Acidentes",
          "conceito": "Monitoramento global de relatórios técnicos, incidentes de segurança, anomalias operacionais e acidentes atrelados a aeronaves ou frotas comerciais e executivas.",
          "comoFunciona": "Bancos de dados consolidam registros oficiais de órgãos reguladores de aviação civil, dados de telemetria e transcrições de relatórios de voo para documentar sinistros e o ciclo de vida das aeronaves.",
          "utilidadeOsint": "Vital para mapear o histórico de posse através de sinistros antigos. Auxilia ativamente a rastrear aeronaves que mudaram de dono ou de prefixo repetidas vezes, expondo fraudes e vinculando veículos de alto valor a corporações sancionadas ou investigadas.",
          "tools": [
            {
              "id": "The Aviation Herald (AvHerald)",
              "aplicacao": "✅ Testada em 14/11: Incidentes e notícias de aviação comercial, atualizado."
            },
            {
              "id": "Aviation Safety Network (ASN)",
              "aplicacao": "✅ Testada em 14/11: Redireciona para aviation-safety.net: ocorrências recentes (última de 08/11/2026) e base wiki de acidentes e incidentes."
            }
          ],
          "regra": {
            "tags": [
              "alvo/veiculo",
              "fonte/arquivos-noticias",
              "func/busca-identificacao"
            ],
            "auto": true
          }
        }
      ]
    },
    {
      "num": "04",
      "nome": "Embarcações & Inteligência Marítima",
      "icone": "🚢",
      "opsec": {
        "nivel": "passivo",
        "nota": "🟢 PASSIVO"
      },
      "vetor": "Nome da Embarcação / IMO / CNPJ ➔ Armador / Bandeira / Frotas de Navegação / Sinal AIS",
      "objetivo": "Levantar o inventário naval e auditar o movimento de embarcações de carga, cabotagem ou iates de luxo vinculados a grupos econômicos ou alvos sob investigação de lavagem de dinheiro/ocultação.",
      "camadas": [
        {
          "id": "veiculos-04-c2",
          "titulo": "Rastreamento Global por AIS e Telemetria Marítima",
          "conceito": "Uso de telemetria do Sistema de Identificação Automática (AIS) para localizar a coordenada náutica exata, histórico de portos e comportamento de um navio no mapa mundi.",
          "comoFunciona": "Plataformas agregam a coleta massiva de dados provenientes de redes de receptores terrestres e de satélites do sistema AIS, convertendo os sinais de rádio em dados de posicionamento, velocidade, rotas e destinos em interfaces cartográficas.",
          "utilidadeOsint": "Permite rastrear o deslocamento e a movimentação de mercadorias, auditar o tráfego portuário e estabelecer linhas do tempo geográficas a partir do histórico de ancoragem de embarcações de interesse, validando rotas logísticas e conexões de alvos de colarinho branco.",
          "tools": [
            {
              "id": "VesselFinder",
              "aplicacao": "✅ Testada em 14/11: /vessels/details/{IMO}: 9178276 → MYD HANGZHOU, porta-contêineres, com posição."
            },
            {
              "id": "MarineTraffic",
              "aplicacao": "Permite o rastreamento histórico e em tempo real de posições, rotas marítimas, destinos declarados e auditoria de tráfego portuário. É essencial para verificar anomalias e tentativas de evasão, como quando embarcações desligam seus sinais em rotas suspeitas (dark vessels)."
            }
          ]
        }
      ]
    },
    {
      "num": "05",
      "nome": "Histórico de Sinistros & Incidentes",
      "icone": "⚠️",
      "opsec": {
        "nivel": "passivo",
        "nota": "🟢 PASSIVO"
      },
      "vetor": "Aeronave / Operador / Data ➔ Laudos Técnicos / Cronologia de Quedas e Incidentes",
      "objetivo": "Pesquisar o histórico pregressos de acidentes, manutenções mal-sucedidas ou problemas operacionais de uma frota aérea para atestar negligência, confirmar interrupções de rota ou investigar a baixa de ativos.",
      "camadas": [
        {
          "id": "veiculos-05-c1",
          "titulo": "Bancos de Segurança e Inteligência de Acidentes",
          "conceito": "Consulta a bases de dados dedicadas à catalogação detalhada de acidentes, incidentes e anomalias operacionais na aviação civil, comercial e militar.",
          "comoFunciona": "Plataformas consolidam dados técnicos provenientes de relatórios oficiais de órgãos reguladores de aviação civil, registros de telemetria, relatórios de tripulação e notas da imprensa para construir a cronologia de sinistros de aeronaves específicas.",
          "utilidadeOsint": "Permite rastrear o ciclo de vida operacional de uma frota, auditar sinistros para investigar interrupções de rota (confirmando se ocorreram por falhas técnicas ou desvios intencionais) e desmascarar a real cadeia de custódia de aeronaves que utilizam a troca de prefixos para ocultar atividades.",
          "tools": [
            {
              "id": "Aviation Safety Network (ASN)",
              "aplicacao": "✅ Testada em 14/11: Redireciona para aviation-safety.net: ocorrências recentes (última de 08/11/2026) e base wiki de acidentes e incidentes."
            },
            {
              "id": "The Aviation Herald (AvHerald)",
              "aplicacao": "✅ Testada em 14/11: Incidentes e notícias de aviação comercial, atualizado."
            }
          ],
          "regra": {
            "tags": [
              "alvo/veiculo",
              "fonte/arquivos-noticias",
              "func/busca-identificacao"
            ],
            "auto": true
          }
        }
      ]
    },
    {
      "num": "06",
      "nome": "Reconhecimento de Vias & Ferrovias (GEOINT)",
      "icone": "🛰️",
      "opsec": {
        "nivel": "passivo",
        "nota": "🟢 PASSIVO"
      },
      "vetor": "Município / Empresa / Malha Viária ➔ Condições Geográficas / Infraestrutura Crítica Atribuída",
      "objetivo": "Realizar o reconhecimento virtual do terreno e mapear quem controla as artérias logísticas de transporte pesado, além de observar ativamente rotas de fuga ou de trânsito em grandes capitais.",
      "camadas": [
        {
          "id": "veiculos-06-c1",
          "titulo": "Videomonitoramento Urbano e Consciência Situacional",
          "conceito": "Estabelecimento de consciência situacional instantânea e reconhecimento remoto de infraestruturas físicas através do acesso a câmeras de segurança e tráfego.",
          "comoFunciona": "Plataformas públicas e diretórios globais indexam e disponibilizam transmissões de vídeo em tempo real (streams) provenientes de câmeras de monitoramento viário e de CFTVs desprotegidos em áreas urbanas.",
          "utilidadeOsint": "Permite a verificação passiva de condições de tráfego, análise de rotas de fuga, validação de dados meteorológicos locais em datas específicas e o monitoramento indireto de infraestruturas físicas sem a necessidade de deslocamento a campo da equipe de investigação.",
          "tools": [
            {
              "id": "Insecam",
              "aplicacao": "⚠️ Testada em 14/11: http://www.insecam.org/ foi bloqueado pelo próprio Chrome no teste (ERR_BLOCKED_BY_CLIENT)."
            },
            {
              "id": "Câmeras CET-SP",
              "aplicacao": "Plataforma governamental que fornece acesso a dezenas de imagens capturadas por câmeras de monitoramento viário distribuídas ao longo das principais avenidas e rodovias urbanas da capital paulista. Ideal para o estabelecimento de consciência situacional em diligências físicas locais ou linhas do tempo investigativas."
            }
          ]
        },
        {
          "id": "veiculos-06-c2",
          "titulo": "Inteligência Logística de Ferrovias e Concessões",
          "conceito": "Mapeamento regulatório e análise de contratos governamentais para identificar os operadores e controladores de infraestruturas logísticas críticas.",
          "comoFunciona": "Portais oficiais de agências reguladoras disponibilizam bases de dados abertas contendo termos aditivos, outorgas, obrigações contratuais e a delimitação geográfica das malhas sob controle privado.",
          "utilidadeOsint": "Utilizado em Supply Chain Intelligence para rastrear e auditar quem domina o escoamento de commodities em regiões-chave. Permite ligar CNPJs de concessionárias a obrigações públicas e levantar dados de ativos operacionais vinculados a essas empresas logísticas.",
          "tools": [
            {
              "id": "Concessões Ferroviárias - ANTT",
              "aplicacao": "Portal oficial que disponibiliza os contratos de concessão vigentes e a delimitação geográfica das malhas ferroviárias federais outorgadas à iniciativa privada. O analista identifica as rotas de escoamento e mapeia o controle operacional exercido por gigantes do setor logístico, extraindo até mesmo assinaturas e nomes de representantes corporativos envolvidos nos aditivos."
            }
          ]
        }
      ]
    }
  ]
});
