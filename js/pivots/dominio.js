// Pivotagem v2. Edite com cuidado.
// tools: "ID do catálogo" | {id, aplicacao?, opsec?, alerta?} | {nome,url,aplicacao,externo:true}
// regra.tags: mostra também outras ferramentas do catálogo com TODAS essas tags.
// module.icone: emoji do diagrama do topo (livre para trocar).
registerPivot({
  "id": "dominio",
  "categoria": "infraestrutura",
  "tipo": "alvo",
  "icone": "🌐",
  "titulo": "Investigação de Domínios (CYBINT)",
  "subtitulo": "// Roteiro metodológico para mapeamento de infraestrutura, enumeração, análise de ameaças e preservação de registros web.",
  "imagem": "../img/trilha-dominio.jpg",
  "modulos": [
    {
      "num": "01",
      "nome": "Atribuição & Dados Cadastrais",
      "icone": "🪪",
      "opsec": {
        "nivel": "passivo",
        "nota": "🟢 PASSIVO"
      },
      "vetor": "Domínio ➔ Titular (Proprietário) / CNPJ ou CPF / E-mail de Registro / Histórico de WHOIS",
      "objetivo": "Descobrir quem registrou o domínio, levantar dados de contato oficiais da entidade e revelar o histórico oculto do proprietário antes da aplicação de proteções de privacidade (como a LGPD e GDPR).",
      "camadas": [
        {
          "id": "dominio-01-c1",
          "titulo": "Extração Direta de WHOIS",
          "conceito": "Consulta ao protocolo WHOIS para extrair a 'certidão de nascimento' do domínio, revelando datas de criação, validade, registradores e o contato técnico.",
          "comoFunciona": "A plataforma interroga as bases dos registradores para extrair de forma passiva os metadados de registro e a qualificação do proprietário do ativo digital.",
          "utilidadeOsint": "É o primeiro passo para a atribuição de autoria. Em domínios nacionais, frequentemente expõe o CNPJ ou CPF do titular, permitindo a transição imediata (pivoting) para investigações societárias e patrimoniais.",
          "tools": [
            {
              "id": "Hostinger WHOIS Lookup",
              "aplicacao": "✅ Testada em 12/11: WHOIS completo; para .br, Registro.br traz o CNPJ."
            },
            {
              "id": "Registro.br - Ferramenta WHOIS",
              "aplicacao": "Atua como uma fonte de dados primária e oficial para o território brasileiro. Diferente de registradores internacionais, frequentemente exibe o CNPJ de empresas titulares e o nome completo do contato técnico/administrador, viabilizando o cruzamento direto de dados com a Receita Federal ou Juntas Comerciais."
            },
            {
              "id": "DomainTools WHOIS",
              "aplicacao": "Plataforma avançada que centraliza dados de WHOIS. Ela possibilita desvendar redes de sites falsos, identificar os responsáveis legais por infraestruturas maliciosas ou ligar múltiplos domínios web a uma mesma entidade através do pivoting técnico."
            }
          ],
          "regra": {
            "tags": [
              "alvo/dominio",
              "func/infraestrutura-cybint"
            ],
            "auto": true
          },
          "excluir": [
            "FaviHash"
          ]
        },
        {
          "id": "dominio-01-c2",
          "titulo": "WHOIS Reverso e Histórico",
          "conceito": "Pesquisa invertida. Em vez de perguntar 'De quem é este site?', o analista insere um e-mail, nome de empresa ou proprietário e o sistema lista todos os domínios registrados por aquela entidade globalmente.",
          "comoFunciona": "Buscas em repositórios massivos que armazenam logs antigos de WHOIS e permitem indexação reversa por parâmetros textuais, revelando propriedades conectadas ao critério inserido.",
          "utilidadeOsint": "Viabiliza o mapeamento completo de infraestruturas associadas a um alvo, permitindo descobrir redes de sites de phishing geridas pelo mesmo ator, campanhas de desinformação ou portfólios ocultos de propriedades digitais.",
          "tools": [
            {
              "id": "DotDB",
              "aplicacao": "✅ Testada em 12/11: domínios com a marca em todas as extensões."
            },
            {
              "id": "WhoisFreaks Reverse WHOIS Search",
              "aplicacao": "Permite que o investigador insira um termo conhecido (como o nome de um proprietário, um endereço de e-mail corporativo ou a razão social de uma empresa) para descobrir todos os nomes de domínio atualmente ou anteriormente vinculados àquele identificador."
            },
            {
              "id": "Whoxy",
              "aplicacao": "Fornece um banco de dados robusto de registros internacionais. É extremamente valioso em casos onde o alvo utilizou proteção de privacidade recente no WHOIS, já que o banco de dados histórico do Whoxy pode revelar os dados reais que foram inseridos no momento do primeiro registro do domínio."
            },
            {
              "id": "Reverse WHOIS - WhoisXMLAPI",
              "aplicacao": "Viabiliza a identificação de redes inteiras de sites fraudulentos operados pelo mesmo ator de ameaça, descobre propriedades digitais ocultas de uma empresa alvo ou correlaciona e-mails de contato a domínios registrados globalmente. Suporta modificadores de busca e operadores lógicos (AND, OR, NOT) para refinar os resultados e eliminar falsos positivos."
            },
            {
              "id": "Domain Hunter Gatherer"
            }
          ],
          "regra": {
            "tags": [
              "alvo/dominio"
            ],
            "auto": true
          },
          "excluir": [
            "TorWhois",
            "FaviHash",
            "Dominico"
          ]
        },
        {
          "id": "dominio-01-c3",
          "titulo": "Infraestrutura Oculta e Domínios Onion",
          "conceito": "Pesquisa de histórico e titularidade de propriedades web alocadas fora da superfície da internet, operando em redes descentralizadas.",
          "comoFunciona": "O indexador analisa metadados estruturais, cabeçalhos técnicos e referências históricas de sites da Dark Web para gerar um banco de dados similar ao WHOIS convencional.",
          "utilidadeOsint": "Essencial para contornar a falta de um sistema unificado de registros na Dark Web, permitindo descobrir espelhamentos e conexões entre diferentes domínios anônimos de um mesmo agente.",
          "tools": [
            {
              "id": "OnionLand Search Engine",
              "aplicacao": "✅ Testada em 26/10: busca em sites .onion pela clearnet e respeita frase exata entre aspas. Útil para achar menções a um domínio ou serviço oculto. Abrir os .onion só pelo Tor Browser; ignorar anúncios patrocinados de mercados."
            },
            {
              "id": "Ahmia",
              "aplicacao": "⚠️ Testada em 26/10: índice de .onion pela clearnet, mas tokeniza o termo e devolve muito ruído; buscar termos distintivos (nome do serviço, alias)."
            }
          ],
          "excluir": [
            "TorWhois"
          ]
        }
      ]
    },
    {
      "num": "02",
      "nome": "Mapeamento de Infraestrutura (DNS/IP)",
      "icone": "🗺️",
      "opsec": {
        "nivel": "passivo",
        "nota": "🟢 PASSIVO"
      },
      "vetor": "Domínio ➔ Registros DNS (A, MX, TXT) / Endereço IP / Provedor de Hospedagem / ASN",
      "objetivo": "Desvendar a arquitetura física e lógica que sustenta o site. O intuito é localizar onde os servidores estão hospedados, quais ferramentas corporativas são utilizadas e descobrir outros ativos na mesma sub-rede.",
      "camadas": [
        {
          "id": "dominio-02-c1",
          "titulo": "Dissecação de Registros DNS",
          "conceito": "Consultas aos servidores de DNS para descobrir os apontamentos do domínio. O registro A aponta para o IP, o registro MX aponta para o servidor de e-mail e o registro TXT revela chaves de validação de serviços de terceiros.",
          "comoFunciona": "A plataforma interroga os servidores de nomes (Name Servers) públicos para extrair tabelas de roteamento lógico sem contato direto com a infraestrutura investigada.",
          "utilidadeOsint": "Permite auditar se a empresa usa infraestruturas terceirizadas (como Google Workspace ou Microsoft 365 via MX), descobrir o verdadeiro IP do servidor e identificar chaves ocultas vinculadas ao domínio.",
          "tools": [
            {
              "id": "ViewDNS.info",
              "aplicacao": "✅ Testada em 12/11: reverse IP; útil só em IP dedicado."
            },
            {
              "id": "Google Public DNS",
              "aplicacao": "✅ Testada em 14/11: Testado em 2026-11-12: API dns.google/resolve?name={domínio}&type={MX|A|NS…} respondeu os MX de petrobras.com.br."
            },
            {
              "id": "DNSdumpster",
              "aplicacao": "⚠️ Testada em 12/11: limite de 50 resultados no grátis."
            },
            {
              "id": "nslookup.io",
              "aplicacao": "Realiza a extração de registros (A, MX, TXT) com interface gráfica limpa. Por realizar as requisições a partir de seus próprios servidores na nuvem, o nslookup.io impede que o endereço IP real do analista seja registrado nos logs dos servidores do domínio sob investigação."
            },
            {
              "id": "MXToolbox SuperTool",
              "aplicacao": "Permite mapear a arquitetura de servidores de e-mail de um alvo, identificar prestadores de serviços terceirizados (através de registros SPF/TXT) e auditar o histórico de reputação de IPs sem interagir diretamente com a infraestrutura do investigado."
            }
          ],
          "regra": {
            "tags": [
              "alvo/dominio",
              "alvo/ip",
              "func/infraestrutura-cybint"
            ],
            "auto": true
          },
          "excluir": [
            "FaviHash"
          ]
        },
        {
          "id": "dominio-02-c2",
          "titulo": "Topologia, Hospedagem e BGP",
          "conceito": "Mapeamento de Sistemas Autônomos (ASN), roteamento e histórico de hospedagem (hosting).",
          "comoFunciona": "A partir do IP descoberto na fase DNS, o analista consulta indexadores de rede globais para mapear o ASN e o provedor físico que hospeda os dados.",
          "utilidadeOsint": "Fundamental para enviar ordens judiciais de quebra de sigilo aos provedores corretos, mapear sub-redes inteiras operadas por criminosos e rastrear históricos de migração de servidores.",
          "tools": [
            {
              "id": "Hurricane Electric BGP Toolkit",
              "aplicacao": "✅ Testada em 12/11: ASN, prefixo e rDNS."
            },
            {
              "id": "ip-api",
              "aplicacao": "✅ Testada em 12/11: JSON grátis só por HTTP; usar por script."
            },
            {
              "id": "IP2Location",
              "aplicacao": "✅ Testada em 12/11: demo grátis com tipo de uso e proxy."
            },
            {
              "id": "IP Location Finder",
              "aplicacao": "✅ Testada em 12/11: compara várias bases e mostra a divergência."
            },
            {
              "id": "KeyCDN IP Location Finder",
              "aplicacao": "✅ Testada em 12/11: aceita IP ou domínio."
            },
            {
              "id": "WhoIsHostingThis?",
              "aplicacao": "⚠️ Testada em 12/11: provedor veio em branco no teste."
            },
            {
              "id": "IKnowWhatYouDownload",
              "aplicacao": "⚠️ Testada em 12/11: sem controle positivo; cuidado com IP dinâmico."
            },
            {
              "id": "Netcraft Site Report",
              "aplicacao": "Mapeia o histórico do provedor de hospedagem, revelando quem realmente hospeda a página física e quando o site migrou para serviços de proteção contra DDoS (como a Cloudflare)."
            }
          ],
          "regra": {
            "tags": [
              "alvo/ip"
            ],
            "auto": true
          },
          "excluir": [
            "Proxy List (jetkai)",
            "FaviHash",
            "HEDnsExtractor"
          ]
        },
        {
          "id": "dominio-02-c3",
          "titulo": "Motores de Busca Cibernética e Dispositivos Conectados",
          "conceito": "Mapeamento ativo/passivo da superfície de ataque por meio de indexadores globais de dispositivos conectados à internet.",
          "comoFunciona": "Plataformas varrem o espaço IPv4/IPv6 lendo banners e portas abertas para catalogar dispositivos, servidores e vulnerabilidades publicamente acessíveis.",
          "utilidadeOsint": "Permite encontrar servidores de Comando e Controle (C2), painéis administrativos desprotegidos e propriedades correlatas ao domínio investigado através da impressão digital de certificados ou banners de rede.",
          "tools": [
            {
              "id": "Shodan",
              "aplicacao": "✅ Testada em 12/11: /host/{ip} aberto sem conta."
            },
            {
              "id": "Criminal IP",
              "aplicacao": "✅ Testada em 12/11: pontuação de risco; donos podem ocultar IPs."
            },
            {
              "id": "Censys Search",
              "aplicacao": "Fundamental para a Inteligência de Infraestrutura (CYBINT). Viabiliza a correlação de servidores ocultos através de impressões digitais de certificados SSL compartilhados, burlando proteções de proxy reverso."
            }
          ],
          "regra": {
            "tags": [
              "alvo/ip",
              "alvo/dominio",
              "func/infraestrutura-cybint"
            ],
            "auto": true
          },
          "excluir": [
            "FaviHash"
          ]
        }
      ]
    },
    {
      "num": "03",
      "nome": "Enumeração de Subdomínios & SSL",
      "icone": "🔀",
      "opsec": {
        "nivel": "passivo",
        "nota": "🟢 PASSIVO"
      },
      "vetor": "Domínio ➔ Certificados SSL/TLS / Subdomínios Internos / Servidores de Homologação",
      "objetivo": "Mapear a superfície completa de ataque ou de atuação web da empresa, revelando aplicações corporativas ocultas (ex: intranet.alvo.com) ou painéis de administração não indexados pelo Google.",
      "camadas": [
        {
          "id": "dominio-03-c1",
          "titulo": "Logs de Transparência de Certificados (CT Logs)",
          "conceito": "Sempre que um certificado HTTPS (SSL/TLS) é emitido, ele é publicamente registrado. A varredura desses logs revela os nomes de subdomínios exatos atrelados ao certificado criptográfico principal.",
          "comoFunciona": "O analista interroga bases de CT Logs que arquivam passivamente a emissão de certificados, retornando listas de subdomínios legítimos associados à organização investigada.",
          "utilidadeOsint": "Permite descobrir ambientes de desenvolvimento, servidores de homologação (staging) e painéis administrativos que utilizam criptografia legítima, mas que tentam permanecer ocultos dos motores de busca comuns.",
          "tools": [
            {
              "id": "crt.sh",
              "aplicacao": "✅ Testada em 14/11: Testado em 2026-11-12: %.petrobras.com.br com output=json → 4.101 certificados e 818 nomes distintos (subdomínios)."
            },
            {
              "id": "Censys Search",
              "aplicacao": "Base de inteligência de infraestrutura extremamente poderosa. Viabiliza a correlação de servidores e serviços ocultos pertencentes ao mesmo alvo através de impressões digitais de certificados SSL/TLS criptográficos, mapeando ativamente as portas de serviço atreladas a eles."
            }
          ],
          "regra": {
            "tags": [
              "alvo/dominio",
              "func/infraestrutura-cybint"
            ],
            "auto": true
          },
          "excluir": [
            "FaviHash"
          ]
        },
        {
          "id": "dominio-03-c2",
          "titulo": "Scanners Massivos de Internet e Ativos",
          "conceito": "Motores de busca que varrem o espaço IPv4 e IPv6 global constantemente para indexar tudo que responde na web.",
          "comoFunciona": "Essas plataformas catalogam respostas de banners e resoluções DNS em massa, permitindo ao analista buscar por registros associados ao domínio sem tocar diretamente na infraestrutura viva.",
          "utilidadeOsint": "Fundamental para encontrar servidores mal configurados, painéis de login expostos e subdomínios esquecidos que compõem a superfície digital estendida da empresa.",
          "tools": [
            {
              "id": "Netlas.io",
              "aplicacao": "✅ Testada em 12/11: host com limite anônimo."
            },
            {
              "id": "FOFA (fofa.info)",
              "aplicacao": "✅ Testada em 12/11: consulta em base64 na URL."
            },
            {
              "id": "Grayhat Warfare",
              "aplicacao": "✅ Testada em 12/11: arquivos em buckets abertos; cuidado legal ao abrir."
            },
            {
              "id": "Phonebook.cz",
              "aplicacao": "Motor da Intelligence X que varre bilhões de registros arquivados para retornar e-mails, URLs e subdomínios pertencentes ao domínio-alvo. Excelente para rastrear ramificações legadas que foram indexadas no passado."
            }
          ],
          "regra": {
            "tags": [
              "alvo/dominio"
            ],
            "auto": true
          },
          "excluir": [
            "TorWhois",
            "FaviHash"
          ]
        },
        {
          "id": "dominio-03-c3",
          "titulo": "Extração de Endpoints e URLs Históricas",
          "conceito": "Coleta massiva e automatizada de URLs históricas, links internos e arquivos hospedados sob o domínio principal e seus subdomínios.",
          "comoFunciona": "Ferramentas extraem hiperlinks do código-fonte renderizado ou consultam repositórios de arquivamento web (como Wayback Machine) para listar as rotas de navegação profundas da aplicação.",
          "utilidadeOsint": "Revela caminhos de API, diretórios legados, arquivos confidenciais expostos (como documentos PDF ou chaves) e a arquitetura lógica da aplicação web, complementando o mapeamento gerado pelos subdomínios.",
          "tools": [
            {
              "id": "HackerTarget - Extract Links",
              "aplicacao": "✅ Testada em 12/11: links e subdomínios de uma página; captcha."
            },
            {
              "id": "gau (getallurls)",
              "aplicacao": "Ferramenta de linha de comando (CLI) que realiza consultas em agregadores de dados da internet (Wayback Machine, OTX, URLScan) para descobrir a superfície de exposição digital. Ao usar a flag '--subs', levanta todas as URLs atreladas aos subdomínios do alvo de maneira passiva."
            }
          ],
          "regra": {
            "tags": [
              "alvo/dominio",
              "func/scrapers-automacao"
            ],
            "auto": true
          }
        }
      ]
    },
    {
      "num": "04",
      "nome": "Inteligência de Ameaças & Reputação (CTI)",
      "icone": "☣️",
      "opsec": {
        "nivel": "cautela",
        "nota": "🟢 PASSIVO / 🟡 ATIVO CONTROLADO"
      },
      "vetor": "Domínio / URL ➔ Indicadores de Comprometimento (IoC) / Hashes de Malware / Blacklists",
      "objetivo": "Avaliar se o domínio investigado é legítimo ou se faz parte de uma campanha de fraude, Phishing ou se atua como servidor de Comando e Controle (C2) para a distribuição de Malwares.",
      "camadas": [
        {
          "id": "dominio-04-c1",
          "titulo": "Triagem e Reputação de Segurança",
          "conceito": "Consulta a motores que consolidam relatórios de empresas de antivírus, pesquisadores de segurança e denúncias comunitárias de fraudes.",
          "comoFunciona": "O analista submete o domínio ou URL suspeita a indexadores de segurança e agregadores comunitários que comparam o endereço contra dezenas de listas de bloqueio e bases de inteligência cibernética.",
          "utilidadeOsint": "Permite a identificação imediata se a infraestrutura já foi previamente mapeada como nociva, retornando indicadores técnicos (IoCs) adicionais, como IPs, hashes e famílias de malwares associados.",
          "tools": [
            {
              "id": "VirusTotal",
              "aplicacao": "✅ Testada em 12/11: ver também Relations e Community."
            },
            {
              "id": "Domain Reputation Check - APIVoid",
              "aplicacao": "✅ Testada em 12/11: listas de bloqueio."
            },
            {
              "id": "ThreatFox",
              "aplicacao": "✅ Testada em 12/11: consultar junto com Feodo: não se espelham."
            },
            {
              "id": "AlienVault OTX (Open Threat Exchange)",
              "aplicacao": "✅ Testada em 12/11: pulses relacionados."
            },
            {
              "id": "dnstwist",
              "aplicacao": "✅ Testada em 12/11: domínios-imitação registrados."
            },
            {
              "id": "GreyNoise Visualizer",
              "aplicacao": "✅ Testada em 12/11: separa scanner de fundo; ausência não é limpeza."
            },
            {
              "id": "Feodo Tracker",
              "aplicacao": "✅ Testada em 12/11: C2 de botnets; lista JSON pública."
            },
            {
              "id": "Sputnik",
              "aplicacao": "✅ Testada em 14/11: Extensão do Chrome (10 mil usuários) que envia um IP, domínio, hash ou URL selecionado para várias fontes de reputação (VirusTotal, AbuseIPDB, Shodan…)."
            },
            {
              "id": "PhishTank",
              "aplicacao": "⚠️ Testada em 12/11: não exercitada no teste."
            },
            {
              "id": "URLhaus",
              "aplicacao": "⚠️ Testada em 12/11: só distribuição de malware; ler o resultado com cuidado."
            },
            {
              "id": "ExpandURL"
            }
          ]
        },
        {
          "id": "dominio-04-c2",
          "titulo": "Análise Comportamental Dinâmica (Sandbox)",
          "conceito": "Abertura da URL maliciosa dentro de um ambiente seguro e virtualizado (na nuvem) que simula o navegador de uma vítima para auditar o que o site tenta fazer.",
          "comoFunciona": "A ferramenta acessa o link de destino de forma automatizada e isolada, gerando um relatório completo com capturas de tela, interceptação de tráfego de rede, conexões de terceiros e ações maliciosas disparadas pelo servidor hospedeiro.",
          "utilidadeOsint": "Excepcional para realizar a engenharia reversa de páginas de phishing ou extrair IPs reais de domínios maliciosos sem que a máquina do próprio investigador precise interagir com a ameaça, garantindo isolamento total do ambiente local.",
          "tools": [
            {
              "id": "URLScan.io",
              "aplicacao": "✅ Testada em 12/11: varreduras já feitas; nova varredura é pública por padrão."
            },
            {
              "id": "Hatching Triage",
              "aplicacao": "⚠️ Testada em 12/11: exige conta."
            },
            {
              "id": "ANY.RUN",
              "aplicacao": "⚠️ Testada em 12/11: exige cadastro; análises grátis são públicas."
            }
          ]
        }
      ]
    },
    {
      "num": "05",
      "nome": "Pivoting Técnico por Rastreadores",
      "icone": "🧬",
      "opsec": {
        "nivel": "passivo",
        "nota": "🟢 PASSIVO"
      },
      "vetor": "Domínio ➔ Códigos do AdSense / ID do Google Analytics / Hashes de Favicon",
      "objetivo": "Vincular domínios aparentemente desconectados que pertencem à mesma pessoa ou empresa. Muito útil para descobrir redes de sites falsos de um mesmo fraudador operando em massa.",
      "camadas": [
        {
          "id": "dominio-05-c1",
          "titulo": "Scripts Analíticos e de Monetização",
          "conceito": "Quando um criminoso ou desenvolvedor clona um site dezenas de vezes, ele frequentemente esquece de remover ou reaproveita o mesmo código do Google Analytics (ex: UA-XXXXX) ou a mesma chave de monetização em todos eles.",
          "comoFunciona": "Os sistemas rastreiam o código-fonte da página web em busca de identificadores de terceiros, extraindo as strings numéricas usadas para telemetria ou anúncios para, em seguida, correlacioná-las a outros domínios na internet.",
          "utilidadeOsint": "Permite mapear a pegada digital e a infraestrutura associada de forma inequívoca, revelando propriedades digitais adicionais controladas pelo mesmo ator através da reutilização de IDs únicos.",
          "tools": [
            {
              "id": "BuiltWith",
              "aplicacao": "✅ Testada em 12/11: tecnologias e IDs de rastreamento."
            },
            {
              "id": "URLScan.io",
              "aplicacao": "✅ Testada em 12/11: varreduras já feitas; nova varredura é pública por padrão."
            }
          ],
          "regra": {
            "tags": [
              "alvo/dominio",
              "func/infraestrutura-cybint"
            ],
            "auto": true
          },
          "excluir": [
            "FaviHash"
          ]
        },
        {
          "id": "dominio-05-c2",
          "titulo": "Assinaturas Visuais (Favicon)",
          "conceito": "A extração do Favicon (o ícone que aparece na aba do navegador) para transformá-lo em uma impressão digital criptográfica (hash numérico).",
          "comoFunciona": "A plataforma realiza o download do ícone de um site alvo e calcula automaticamente a sua assinatura matemática, preparando o artefato para buscas em indexadores da internet.",
          "utilidadeOsint": "Ao transformar a identidade visual de um site em um hash, o analista ganha uma assinatura digital exclusiva que não depende de nomes de domínio, permitindo encontrar o mesmo servidor operando em IPs escondidos.",
          "tools": [
            {
              "id": "FaviHunter",
              "aplicacao": "Utilitário de linha de comando (CLI) que extrai a imagem do alvo e automatiza o processo gerando links diretos de busca (strings de clique) para motores como Shodan, FOFA e Censys, otimizando drasticamente o tempo do analista."
            }
          ],
          "regra": {
            "tags": [
              "alvo/dominio",
              "alvo/ip",
              "func/infraestrutura-cybint"
            ],
            "auto": true
          },
          "excluir": [
            "FaviHash"
          ]
        },
        {
          "id": "dominio-05-c3",
          "titulo": "Pivoting em Motores de Busca Cibernética",
          "conceito": "Injeção do hash numérico extraído do favicon em motores de varredura global (CYBINT) para encontrar correspondências de infraestrutura na internet.",
          "comoFunciona": "Com o hash em mãos, o analista utiliza sintaxes de busca especializadas nestes motores para localizar endereços de IP ou outros domínios que estejam renderizando exatamente o mesmo arquivo de imagem.",
          "utilidadeOsint": "Fundamental para localizar painéis administrativos, descobrir servidores clonados, portais de phishing ativos criados por agentes de ameaça ou revelar o IP real de servidores protegidos por proxies reversos como a Cloudflare.",
          "tools": [
            {
              "id": "Shodan",
              "aplicacao": "✅ Testada em 12/11: /host/{ip} aberto sem conta."
            },
            {
              "id": "FOFA (fofa.info)",
              "aplicacao": "✅ Testada em 12/11: consulta em base64 na URL."
            }
          ],
          "regra": {
            "tags": [
              "alvo/ip",
              "alvo/dominio",
              "func/infraestrutura-cybint"
            ],
            "auto": true
          },
          "excluir": [
            "FaviHash"
          ]
        }
      ]
    },
    {
      "num": "06",
      "nome": "Histórico & Preservação Web",
      "icone": "🕰️",
      "opsec": {
        "nivel": "ativo",
        "nota": "🟢 PASSIVO / 🔴 ATIVO"
      },
      "vetor": "Domínio ➔ Versões Antigas do Site / Textos Apagados / Arquivos Forenses (WARC)",
      "objetivo": "Resgatar evidências materiais do passado (textos ou contatos deletados pelo proprietário para encobrir rastros) e congelar o site atual com validade técnica para que a prova não se perca durante litígios.",
      "camadas": [
        {
          "id": "dominio-06-c1",
          "titulo": "Resgate Histórico de Caches",
          "conceito": "Bibliotecas digitais mundiais que varrem e armazenam constantemente 'fotografias' (snapshots) da internet ao longo do tempo.",
          "comoFunciona": "O investigador consulta repositórios massivos de arquivamento web em busca de versões indexadas no passado, recuperando o estado visual e textual da página web antes de ser apagada ou alterada pelo alvo.",
          "utilidadeOsint": "Permite resgatar e investigar versões antigas da página alvo, acessando PDFs apagados, relatórios removidos ou estruturas antigas do site, desfazendo tentativas de ocultação de rastros e conexões.",
          "tools": [
            {
              "id": "Archive.today (archive.ph)",
              "aplicacao": "✅ Testada em 12/11: capturas por domínio; alternativa ao Wayback."
            },
            {
              "id": "Wayback Machine (Internet Archive)",
              "aplicacao": "⚠️ Testada em 12/11: instável; a API wayback/available ajuda a achar a captura."
            }
          ],
          "regra": {
            "tags": [
              "fonte/arquivos-noticias",
              "func/busca-ampla"
            ],
            "auto": true
          }
        },
        {
          "id": "dominio-06-c2",
          "titulo": "Monitoramento Contínuo e Espelhamento",
          "conceito": "Técnicas focadas em rastrear alterações no momento exato em que ocorrem e clonar a estrutura completa do alvo para o disco do investigador.",
          "comoFunciona": "Sistemas automatizados vigiam URLs ativamente em busca de alterações de código/texto, enquanto softwares locais de crawling baixam recursivamente a estrutura de arquivos da página web inteira.",
          "utilidadeOsint": "Garante a detecção imediata de mudanças no alvo e viabiliza a extração de dados e análises estáticas de forma totalmente offline, mitigando os riscos de contramedidas e reduzindo a pegada técnica deixada pelo analista.",
          "tools": [
            {
              "id": "Follow That Page (followthatpage.com)",
              "aplicacao": "Sistema automatizado que monitora a URL informada e envia um alerta ao analista sempre que detectar modificações no código do site. É excelente para detectar imediatamente a alteração de comunicados, remoção de nomes de funcionários ou edições em listas de sócios por parte do alvo."
            },
            {
              "id": "Cyotek WebCopy",
              "aplicacao": "Software utilitário que atua como um rastreador da web (web crawler). Clona e baixa recursivamente a estrutura de links, páginas HTML, imagens e documentos para o disco rígido, remapeando os caminhos para que apontem para os arquivos locais, viabilizando inspeções visuais e textuais profundas fora da internet."
            },
            {
              "id": "Browsertrix Crawler"
            },
            {
              "id": "Heritrix"
            }
          ],
          "regra": {
            "tags": [
              "alvo/dominio",
              "func/scrapers-automacao"
            ],
            "auto": true
          }
        },
        {
          "id": "dominio-06-c3",
          "titulo": "Preservação Forense e Validade Jurídica",
          "conceito": "Documentar materialmente a prova digital congelando o estado atual de uma página web gerando arquivos encapsulados de alta fidelidade técnica com validade forense.",
          "comoFunciona": "Ferramentas avançadas gravam todo o tráfego de rede gerado no navegador enquanto a página é carregada (produzindo arquivos WARC/WACZ) ou utilizam serviços certificados que garantem a imutabilidade da coleta.",
          "utilidadeOsint": "Um padrão ouro para a preservação de dados web. Garante que redes sociais interativas, páginas de phishing dinâmicas ou sites corporativos sejam registrados seguindo padrões forenses rígidos, assegurando a aceitação do material probatório em juízo.",
          "tools": [
            {
              "id": "Verifact",
              "aplicacao": "⚠️ Testada em 12/11: pago; registro com validade jurídica."
            },
            {
              "id": "Webrecorder",
              "aplicacao": "Diferente de capturas estáticas, grava todo o tráfego de rede gerado no navegador enquanto a página é carregada e manipulada (execução de scripts, feeds infinitos). Permite ao investigador criar um espelho interativo que preserva cabeçalhos HTTP e mídias ocultas para auditorias forenses."
            },
            {
              "id": "ReplayWeb.page",
              "aplicacao": "Visualizador forense que opera inteiramente do lado do utilizador. Carrega os arquivos gerados pelo Webrecorder para reconstruir o comportamento interativo original das páginas capturadas, permitindo inspecionar o código-fonte de forma offline e garantindo OPSEC defensiva absoluta."
            }
          ]
        }
      ]
    }
  ]
});
