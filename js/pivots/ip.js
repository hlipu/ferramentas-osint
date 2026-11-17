// Pivotagem v2 — escrita à mão. Edite com cuidado.
// tools: "ID do catálogo" | {id, aplicacao?, opsec?, alerta?} | {nome,url,aplicacao,externo:true}
// regra.tags: mostra também outras ferramentas do catálogo com TODAS essas tags.
// module.icone: emoji do diagrama do topo (livre para trocar).
registerPivot({
  "id": "ip",
  "categoria": "infraestrutura",
  "tipo": "alvo",
  "icone": "🖧",
  "titulo": "Investigação de Endereços IP & Redes (IP/ASN)",
  "subtitulo": "// Roteiro metodológico para atribuição, exposição de serviços, co-hospedagem, reputação e vínculo de endereços IP com pessoas e organizações.",
  "modulos": [
    {
      "num": "01",
      "nome": "Atribuição & Geolocalização Cadastral",
      "icone": "🧭",
      "opsec": {
        "nivel": "passivo",
        "nota": "🟢 PASSIVO"
      },
      "vetor": "IP ➔ ASN / Provedor (ISP) / Organização titular / Cidade aproximada / Proxy-VPN-Tor",
      "objetivo": "Descobrir quem é o titular do bloco de endereços, qual provedor o opera e se o IP é residencial, corporativo, de datacenter ou de anonimização, antes de qualquer conclusão sobre o alvo.",
      "camadas": [
        {
          "id": "ip-01-c1",
          "titulo": "Geolocalização e Provedor",
          "conceito": "Bases comerciais que associam faixas de IP a provedores, organizações e regiões geográficas aproximadas.",
          "comoFunciona": "Consulta-se o IP em mais de uma base e compara-se o resultado: provedor, ASN, cidade e tipo de conexão (residencial, móvel, hosting). Divergências entre bases são comuns e indicam baixa confiança.",
          "utilidadeOsint": "Define o rumo da investigação: IP residencial aponta para um assinante (requisição judicial ao provedor); IP de datacenter aponta para um servidor (pivotagem técnica).",
          "tools": [
            {
              "id": "IP2Location",
              "aplicacao": "✅ Testada em 12/11: demo grátis com tipo de uso e proxy."
            },
            {
              "id": "ip-api",
              "aplicacao": "✅ Testada em 12/11: JSON grátis só por HTTP; usar por script."
            },
            {
              "id": "KeyCDN IP Location Finder",
              "aplicacao": "✅ Testada em 12/11: aceita IP ou domínio."
            },
            {
              "id": "IP Location Finder",
              "aplicacao": "✅ Testada em 12/11: compara várias bases e mostra a divergência."
            },
            {
              "id": "FindIP (api.findip.net)",
              "aplicacao": "⚠️ Testada em 12/11: exige token."
            }
          ]
        },
        {
          "id": "ip-01-c2",
          "titulo": "Titularidade do Bloco e Sistema Autônomo",
          "conceito": "Registros regionais (RIRs) e o NIC.br mantêm quem recebeu cada bloco de IPs e cada número de Sistema Autônomo (ASN).",
          "comoFunciona": "A partir do IP, identifica-se o prefixo anunciado, o ASN responsável e a organização titular, com contatos técnicos e de abuso.",
          "utilidadeOsint": "Revela a empresa por trás do bloco (às vezes o próprio alvo, quando ele tem ASN próprio) e o canal formal para requisições e notificações.",
          "tools": [
            {
              "id": "Hurricane Electric BGP Toolkit",
              "aplicacao": "✅ Testada em 12/11: ASN, prefixo e rDNS."
            },
            {
              "id": "Registro.br - Ferramenta WHOIS",
              "aplicacao": "Para blocos brasileiros, a consulta WHOIS do NIC.br informa o titular do bloco ou do ASN (com CNPJ), ligando o IP a uma pessoa jurídica identificável."
            },
            {
              "id": "DomainTools WHOIS",
              "aplicacao": "Consulta WHOIS de IPs e ASNs com dados do RIR, útil para blocos estrangeiros e para cruzar com o histórico de domínios hospedados."
            }
          ]
        },
        {
          "id": "ip-01-c3",
          "titulo": "Detecção de Anonimizadores",
          "conceito": "Verificação se o IP pertence a infraestrutura de anonimização: nó de saída Tor ou proxy público aberto.",
          "comoFunciona": "Compara-se o IP com mapas de relés Tor e listas públicas de proxies atualizadas.",
          "utilidadeOsint": "Evita atribuir ao alvo um IP que, na verdade, é compartilhado por milhares de usuários anônimos.",
          "tools": [
            {
              "id": "TorMap",
              "aplicacao": "✅ Testada em 12/11: visual; para checar IP use a lista oficial de saídas."
            }
          ],
          "excluir": [
            "Proxy List (jetkai)"
          ]
        }
      ]
    },
    {
      "num": "02",
      "nome": "Serviços Expostos & Fingerprint",
      "icone": "📡",
      "opsec": {
        "nivel": "passivo",
        "nota": "🟢 PASSIVO — consulta bases já indexadas, sem tocar o servidor"
      },
      "vetor": "IP ➔ Portas / Banners / Certificados TLS / Hash de favicon ➔ Domínios e servidores irmãos",
      "objetivo": "Levantar o que o IP expõe à internet (serviços, painéis, certificados) a partir de motores que já varreram a rede, e usar essas impressões digitais para achar outros servidores do mesmo operador.",
      "camadas": [
        {
          "id": "ip-02-c1",
          "titulo": "Motores de Varredura Indexada",
          "conceito": "Serviços que varrem continuamente a internet e indexam portas abertas, banners de serviço e certificados.",
          "comoFunciona": "Pesquisa-se o IP para ver os serviços e certificados observados; depois, busca-se por características únicas (nome no certificado, título da página, banner) para encontrar hosts semelhantes.",
          "utilidadeOsint": "Descobre domínios no certificado TLS, painéis administrativos e softwares usados, sem enviar nenhum pacote ao alvo.",
          "tools": [
            {
              "id": "Shodan",
              "aplicacao": "✅ Testada em 12/11: /host/{ip} aberto sem conta."
            },
            {
              "id": "FOFA (fofa.info)",
              "aplicacao": "✅ Testada em 12/11: consulta em base64 na URL."
            },
            {
              "id": "Netlas.io",
              "aplicacao": "✅ Testada em 12/11: host com limite anônimo."
            },
            {
              "id": "Criminal IP",
              "aplicacao": "✅ Testada em 12/11: pontuação de risco; donos podem ocultar IPs."
            },
            {
              "id": "Censys Search",
              "aplicacao": "Forte em certificados TLS: os nomes (CN/SAN) presentes no certificado do IP revelam domínios hospedados e permitem achar hosts com a mesma chave."
            }
          ]
        },
        {
          "id": "ip-02-c2",
          "titulo": "Pivô por Favicon e Dorks",
          "conceito": "O hash do favicon e consultas prontas (dorks) funcionam como impressões digitais reutilizadas pelo mesmo operador.",
          "comoFunciona": "Calcula-se o hash MurmurHash do favicon do serviço no IP e pesquisa-se esse hash nos motores de varredura; dorks curadas localizam painéis e dispositivos do mesmo tipo.",
          "utilidadeOsint": "Encontra servidores irmãos (espelhos, backups, painéis de phishing replicados) mesmo quando estão em provedores e países diferentes.",
          "tools": [
            {
              "id": "FaviHunter",
              "aplicacao": "Calcula vários formatos de hash do favicon e já monta os links de busca para Shodan, Censys, FOFA e outros motores."
            }
          ],
          "excluir": [
            "Shodan Dorks - s1rn3tz",
            "FaviHash"
          ]
        }
      ]
    },
    {
      "num": "03",
      "nome": "DNS Reverso & Co-hospedagem",
      "icone": "🔀",
      "opsec": {
        "nivel": "passivo",
        "nota": "🟢 PASSIVO"
      },
      "vetor": "IP / ASN ➔ PTR / Domínios hospedados no mesmo servidor / Faixas vizinhas do ASN",
      "objetivo": "Descobrir quais domínios apontam ou já apontaram para o IP e quais outros sites dividem o mesmo servidor, transformando um endereço numérico em nomes investigáveis.",
      "camadas": [
        {
          "id": "ip-03-c1",
          "titulo": "Resolução Reversa e Vizinhos de Servidor",
          "conceito": "O registro PTR e as bases de DNS passivo associam um IP aos nomes que resolveram para ele.",
          "comoFunciona": "Consulta-se o PTR do IP e as bases de reverse IP para listar domínios hospedados no mesmo endereço ou na mesma faixa do ASN.",
          "utilidadeOsint": "Em hospedagem dedicada, os domínios vizinhos costumam pertencer ao mesmo dono; em hospedagem compartilhada, a lista ajuda a descartar coincidências.",
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
              "aplicacao": "Consulta rápida de registros DNS de vários tipos para validar os domínios encontrados nas bases de reverse IP."
            }
          ],
          "excluir": [
            "HEDnsExtractor"
          ]
        },
        {
          "id": "ip-03-c2",
          "titulo": "Histórico de Hospedagem",
          "conceito": "Registros históricos de qual servidor e qual provedor hospedaram cada site ao longo do tempo.",
          "comoFunciona": "Para os domínios encontrados, consulta-se o histórico de hospedagem para ver por quais IPs e provedores eles passaram.",
          "utilidadeOsint": "Revela migrações de infraestrutura e o IP de origem de sites hoje protegidos por CDN.",
          "tools": [
            {
              "id": "WhoIsHostingThis?",
              "aplicacao": "⚠️ Testada em 12/11: provedor veio em branco no teste."
            },
            {
              "id": "Netcraft Site Report",
              "aplicacao": "Histórico de hospedagem com IPs, provedores e sistemas operacionais ao longo dos anos, útil para achar o IP real anterior à adoção de uma CDN."
            },
            {
              "id": "OSINT.SH",
              "aplicacao": "Reúne várias consultas de infraestrutura (reverse IP, DNS, subdomínios) num só lugar para validar rapidamente os achados das outras fontes."
            }
          ]
        }
      ]
    },
    {
      "num": "04",
      "nome": "Reputação & Inteligência de Ameaças",
      "icone": "☣️",
      "opsec": {
        "nivel": "passivo",
        "nota": "🟢 PASSIVO"
      },
      "vetor": "IP ➔ Denúncias de abuso / Listas de bloqueio / Servidores C2 / Malware / Phishing",
      "objetivo": "Verificar se o IP já foi denunciado ou associado a ataques, malware, botnets ou phishing, e correlacionar esses indicadores com outras investigações.",
      "camadas": [
        {
          "id": "ip-04-c1",
          "titulo": "Reputação e Abuso",
          "conceito": "Bases colaborativas e comerciais que registram denúncias e comportamento malicioso de IPs.",
          "comoFunciona": "Consulta-se o IP para ver denúncias, categorias de abuso, datas e se ele é apenas um scanner de fundo da internet.",
          "utilidadeOsint": "Contextualiza o IP: um histórico longo de abuso indica infraestrutura criminosa reutilizada, e não um usuário comum.",
          "tools": [
            {
              "id": "AbuseIPDB",
              "aplicacao": "✅ Testada em 12/11: denúncias e confiança de abuso."
            },
            {
              "id": "GreyNoise Visualizer",
              "aplicacao": "✅ Testada em 12/11: separa scanner de fundo; ausência não é limpeza."
            },
            {
              "id": "VirusTotal",
              "aplicacao": "✅ Testada em 12/11: ver também Relations e Community."
            },
            {
              "id": "AlienVault OTX (Open Threat Exchange)",
              "aplicacao": "✅ Testada em 12/11: pulses relacionados."
            }
          ]
        },
        {
          "id": "ip-04-c2",
          "titulo": "Feeds de Malware, C2 e Phishing",
          "conceito": "Listas especializadas e atualizadas de servidores de comando e controle, URLs de malware e páginas de phishing.",
          "comoFunciona": "Pesquisa-se o IP (e as URLs hospedadas nele) em cada feed para confirmar o papel do servidor numa campanha.",
          "utilidadeOsint": "Confirma se o IP é infraestrutura de botnet, distribuição de malware ou golpe, e traz famílias de malware e datas de atividade.",
          "tools": [
            {
              "id": "Feodo Tracker",
              "aplicacao": "✅ Testada em 12/11: C2 de botnets; lista JSON pública."
            },
            {
              "id": "ThreatFox",
              "aplicacao": "✅ Testada em 12/11: consultar junto com Feodo: não se espelham."
            },
            {
              "id": "URLScan.io",
              "aplicacao": "✅ Testada em 12/11: varreduras já feitas; nova varredura é pública por padrão."
            },
            {
              "id": "URLhaus",
              "aplicacao": "⚠️ Testada em 12/11: só distribuição de malware; ler o resultado com cuidado."
            },
            {
              "id": "PhishTank",
              "aplicacao": "⚠️ Testada em 12/11: não exercitada no teste."
            }
          ]
        },
        {
          "id": "ip-04-c3",
          "titulo": "Correlação e Grafo de Indicadores",
          "conceito": "Ferramentas que consultam várias fontes de uma vez e organizam os indicadores em grafos.",
          "comoFunciona": "Os achados (IP, domínios, hashes, ASN) são inseridos numa plataforma de correlação, que expande e conecta as entidades automaticamente.",
          "utilidadeOsint": "Acelera a triagem e evidencia ligações entre infraestruturas que, isoladas, pareceriam independentes.",
          "tools": [
            {
              "id": "Sputnik",
              "aplicacao": "✅ Testada em 14/11: Extensão do Chrome (10 mil usuários) que envia um IP, domínio, hash ou URL selecionado para várias fontes de reputação (VirusTotal, AbuseIPDB, Shodan…)."
            },
            {
              "id": "MISP (Open Source Threat Intelligence Platform)",
              "aplicacao": "Correlaciona o IP com eventos e indicadores já registrados pela equipe ou por comunidades de compartilhamento."
            },
            {
              "id": "Maltego",
              "aplicacao": "Transforms expandem o IP em domínios, ASN, certificados e localizações num grafo, documentando visualmente a infraestrutura."
            },
            {
              "id": "Plataforma Lampyre",
              "aplicacao": "Executa consultas em lote sobre IPs e organiza os resultados em grafo e tabela para análise de vínculos."
            }
          ]
        }
      ]
    },
    {
      "num": "05",
      "nome": "Vínculo do IP com Pessoas",
      "icone": "👤",
      "opsec": {
        "nivel": "passivo",
        "nota": "🟢 PASSIVO — atenção à janela de tempo (IP dinâmico/CGNAT)"
      },
      "vetor": "IP ➔ Downloads P2P / Registros em vazamentos / Cadastros com IP ➔ Pessoa / E-mail / Username",
      "objetivo": "Procurar rastros de uso do IP por pessoas: downloads em redes P2P, registros de cadastro e vazamentos que guardaram o IP de acesso, sempre considerando que IPs residenciais mudam de dono com o tempo.",
      "camadas": [
        {
          "id": "ip-05-c1",
          "titulo": "Pegada em Redes P2P",
          "conceito": "Monitores de redes BitTorrent registram quais IPs participaram do compartilhamento de cada arquivo.",
          "comoFunciona": "Consulta-se o IP e obtém-se a lista de arquivos baixados ou compartilhados, com datas.",
          "utilidadeOsint": "Revela interesses, idioma e horários de uso associados ao IP, e pode confirmar que dois IPs são o mesmo usuário pelo padrão de downloads.",
          "tools": [
            {
              "id": "IKnowWhatYouDownload",
              "aplicacao": "⚠️ Testada em 12/11: sem controle positivo; cuidado com IP dinâmico."
            }
          ]
        },
        {
          "id": "ip-05-c2",
          "titulo": "IP em Vazamentos e Bases de Pessoas",
          "conceito": "Muitos bancos de dados vazados e bases de marketing guardam o IP usado no cadastro ou no último acesso.",
          "comoFunciona": "Pesquisa-se o IP como termo de busca para encontrar registros (e-mail, nome, username) que o contenham.",
          "utilidadeOsint": "É um dos poucos caminhos abertos do IP para uma identidade; confirme sempre a data do registro antes de atribuir.",
          "tools": [
            {
              "id": "DeHashed",
              "aplicacao": "Permite buscar pelo campo ip_address em vazamentos indexados, retornando e-mails, usernames e nomes de contas cadastradas a partir daquele IP."
            },
            {
              "id": "ThatsThem",
              "aplicacao": "Busca reversa por IP em bases de dados de consumidores (principalmente EUA), podendo retornar nome, endereço e e-mail associados."
            }
          ]
        }
      ]
    },
    {
      "num": "06",
      "nome": "Captura Ativa de IP",
      "icone": "🎣",
      "opsec": {
        "nivel": "ativo",
        "nota": "🔴 ATIVO — exige interação do alvo; avalie a base legal antes de usar"
      },
      "vetor": "E-mail / Telefone / Perfil ➔ Link ou arquivo rastreável ➔ IP real / Dispositivo / Horário de acesso",
      "objetivo": "Obter o IP real do alvo quando nenhuma fonte passiva o revela, enviando um link ou documento que registra quem o abre. Só é recomendado com respaldo legal e plano de OPSEC, pois pode expor a investigação.",
      "camadas": [
        {
          "id": "ip-06-c1",
          "titulo": "Links e Arquivos de Rastreamento",
          "conceito": "Links encurtados e tokens que registram IP, user-agent e horário de quem os acessa.",
          "comoFunciona": "Gera-se um link ou arquivo rastreável, entrega-se ao alvo por um canal plausível e coleta-se o registro do acesso.",
          "utilidadeOsint": "Fornece IP, sistema operacional, navegador e horário do alvo, que alimentam os módulos 01 a 05 desta pivotagem.",
          "tools": [
            {
              "id": "Grabify",
              "aplicacao": "Cria um link encurtado que registra IP, geolocalização aproximada, user-agent e horário de cada clique.",
              "opsec": "ativo",
              "alerta": "O alvo precisa clicar no link; domínios de rastreamento conhecidos podem ser reconhecidos e revelar a investigação."
            },
            {
              "id": "Canarytokens",
              "aplicacao": "Gera documentos, links e outros tokens que disparam alerta com o IP de quem os abre, úteis para rastrear vazamento de material.",
              "opsec": "ativo",
              "alerta": "Exige que o alvo abra o arquivo ou link — interação direta, pode revelar a investigação."
            }
          ]
        }
      ]
    }
  ]
});
