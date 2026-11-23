// Pivotagem v2. Edite com cuidado.
// tools: "ID do catálogo" | {id, aplicacao?, opsec?, alerta?} | {nome,url,aplicacao,externo:true}
// regra.tags: mostra também outras ferramentas do catálogo com TODAS essas tags.
// module.icone: emoji do diagrama do topo (livre para trocar).
registerPivot({
  "id": "email",
  "categoria": "pessoas",
  "tipo": "alvo",
  "icone": "✉️",
  "titulo": "Investigação por E-mail",
  "subtitulo": "// Roteiro metodológico para validação, enumeração, pivoting e identificação do titular de endereços eletrônicos.",
  "modulos": [
    {
      "num": "01",
      "nome": "Validação & Status Técnico",
      "icone": "✅",
      "opsec": {
        "nivel": "passivo",
        "nota": "🟢 PASSIVO"
      },
      "vetor": "E-mail ➔ Sintaxe / Registros MX / Existência da Caixa Postal",
      "objetivo": "Confirmar se o endereço de e-mail é sintaticamente correto, se o domínio possui infraestrutura para receber mensagens e se a caixa de entrada realmente existe e está ativa, preservando a OPSEC da investigação.",
      "camadas": [
        {
          "id": "email-01-c1",
          "titulo": "Validação de Sintaxe (Syntax Check) e Processamento Local",
          "conceito": "Verificação estática que checa se a string obedece às normas internacionais de estruturação (RFC 5322), como a formatação usuario@dominio.tld.",
          "comoFunciona": "Ferramentas de análise processam os dados de forma estática e estritamente local no navegador (client-side), limpando e estruturando os registros sem transmitir informações sensíveis para servidores remotos.",
          "utilidadeOsint": "Atua na fase de higienização de dados, filtrando falsos positivos de listas massivas antes de submetê-las a varreduras de rede e decodificando e-mails ofuscados em vazamentos.",
          "tools": [
            {
              "id": "CyberChef",
              "aplicacao": "✅ Testada em 26/10: a receita \"Extract email addresses\" extrai e-mails de texto misto e descarta os inválidos, tudo no navegador (nada vai para servidor)."
            },
            {
              "id": "Regex101",
              "aplicacao": "Fundamental para a fase de triagem. Permite ao analista criar padrões precisos para extrair massivamente e-mails estruturados de arquivos locais, códigos-fonte ou dumps de dados. O painel explicativo e a função Code Generator facilitam a automação em scripts de raspagem local, mitigando erros e falsos positivos."
            },
            {
              "nome": "Planilhas (Excel / Google Sheets)",
              "url": "#",
              "aplicacao": "Ótima para quando a extração de OSINT resulta em listas pequenas e o analista precisa higienizar e organizar os dados visualmente antes de importar para o Maltego ou Lampyre.",
              "externo": true
            }
          ]
        },
        {
          "id": "email-01-c2",
          "titulo": "Consulta de Registros MX e Verificação SMTP",
          "conceito": "Consulta aos servidores DNS para encontrar os apontamentos MX (Mail Exchange) do domínio e posterior envio de comandos SMTP simulados para checar a resposta da caixa postal.",
          "comoFunciona": "A ferramenta interroga os servidores de nomes para mapear a infraestrutura de correio eletrônico e executa testes sequenciais de conexão com o servidor de destino, abortando a comunicação imediatamente antes da entrega real da mensagem.",
          "utilidadeOsint": "Revela se a empresa utiliza provedores em nuvem (como Google Workspace ou Microsoft 365) e confirma em tempo real se a conta está apta a receber mensagens, sem gerar alertas de leitura ou notificar o alvo do teste.",
          "tools": [
            {
              "id": "Hunter.io",
              "aplicacao": "✅ Testada em 26/10: o Email Verifier (hunter.io/verify/{email}, 5/dia sem login) diz se a CAIXA existe e recebe — distinguiu corretamente o e-mail real do inexistente. Primeira checagem de existência."
            },
            {
              "id": "MXToolbox SuperTool",
              "aplicacao": "✅ Testada em 26/10: valida o DOMÍNIO do e-mail (MX, DMARC, blacklist): SuperTool.aspx?action=mx%3a{dominio}. Não diz nada sobre a caixa."
            },
            {
              "id": "nslookup.io",
              "aplicacao": "✅ Testada em 26/10: alternativa limpa ao MXToolbox para o MX do domínio: /domains/{dominio}/dns-records/mx/."
            },
            {
              "id": "OSINT.SH",
              "aplicacao": "Suíte digital que centraliza a checagem de registros de e-mail (MX/SPF). Como as requisições são processadas a partir da nuvem da própria plataforma, ela atua como um proxy protetor, ocultando o IP do investigador durante a triagem da infraestrutura de correio eletrônico do alvo."
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
            "Dominico",
            "HEDnsExtractor",
            "FaviHash"
          ]
        }
      ]
    },
    {
      "num": "02",
      "nome": "Mapeamento de Contas (SOCMINT)",
      "icone": "📲",
      "opsec": {
        "nivel": "passivo",
        "nota": "🟢 PASSIVO"
      },
      "vetor": "E-mail / Username / Telefone ➔ Redes Sociais / Plataformas / Serviços (SaaS)",
      "objetivo": "Descobrir a pegada digital (digital footprint) do alvo, mapeando em quais sites, aplicativos, redes sociais e serviços de terceiros o e-mail ou username investigado foi utilizado para registrar uma conta, por consultas passivas.",
      "camadas": [
        {
          "id": "email-02-c1",
          "titulo": "Redes Sociais e Plataformas Globais (Varreduras Automatizadas)",
          "conceito": "Busca automatizada em larga escala para mapear a presença digital do alvo em centenas de sites e serviços online simultaneamente.",
          "comoFunciona": "A ferramenta interage com os fluxos de login, registro ou recuperação de senha das plataformas para confirmar a existência da conta associada àquele endereço.",
          "utilidadeOsint": "Essencial para o pivoting de identidade (SOCMINT), permitindo expandir a investigação revelando novos usernames, fotos de perfil e nomes reais por consultas passivas.",
          "tools": [
            {
              "id": "Epieos",
              "aplicacao": "✅ Testada em 26/10: melhor resultado para mapear contas a partir do e-mail: confirma conta Google (ID Gaia, foto) e lista serviços em que o e-mail está cadastrado (ex.: Adobe, Spotify). Conta gratuita = 1 crédito por busca."
            },
            {
              "id": "InstantUsername",
              "aplicacao": "✅ Testada em 26/10: a partir do username derivado do e-mail, achou os perfis reais (GitHub, Twitch, X, Instagram com nome e seguidores). Detecta automação: digitar à mão. ArtStation dá falso positivo."
            },
            {
              "id": "WhatsMyName",
              "aplicacao": "⚠️ Testada em 26/10: complemento ao InstantUsername (653 sites), mas ~38% falham no proxy do próprio serviço e perdeu o Instagram. Ignorar \"Internet Archive\" e os \"Potential False Positive\"."
            },
            {
              "id": "OSINT Industries",
              "aplicacao": "⚠️ Testada em 26/10: na prática é pago: com 0 créditos a busca nem é enviada."
            },
            {
              "id": "Identificator.space",
              "aplicacao": "⚠️ Testada em 26/10: bloqueado pela Cloudflare a partir do Brasil; testar com VPN de outro país."
            },
            {
              "id": "Holehe",
              "aplicacao": "Automatiza requisições para os endpoints de login e recuperação de conta de mais de 120 serviços da web, analisando os códigos de resposta sem enviar notificações de alerta para o alvo sob investigação."
            }
          ],
          "regra": {
            "tags": [
              "alvo/usuario-email",
              "fonte/redes-sociais"
            ],
            "auto": true
          },
          "excluir": [
            "Stolen Camera Finder"
          ]
        }
      ]
    },
    {
      "num": "03",
      "nome": "Vazamentos & Credenciais (Breach Intel)",
      "icone": "🔓",
      "opsec": {
        "nivel": "passivo",
        "nota": "🟢 PASSIVO / 🟡 CAUTELA (Dark Web)"
      },
      "vetor": "Identificador (E-mail/Telefone/Username) ➔ Senhas / Megavazamentos / Fóruns Clandestinos",
      "objetivo": "Identificar se as credenciais, dados pessoais ou ativos corporativos do alvo foram expostos em violações de segurança e utilizar senhas vazadas para realizar pivoting de identidade.",
      "camadas": [
        {
          "id": "email-03-c1",
          "titulo": "Senhas e Usernames em Plain Text",
          "conceito": "Busca direta em repositórios massivos e fóruns clandestinos que fornecem as senhas vazadas em texto claro (plain text) associadas ao e-mail ou nome de usuário do investigado.",
          "comoFunciona": "Os indexadores compilam dumps e bases de dados clandestinas, permitindo buscas reversas pela senha ou pelo e-mail exposto.",
          "utilidadeOsint": "Permite mapear os padrões de criação de credenciais do alvo e executar pivoting tático. Se o investigado utiliza uma mesma senha em várias plataformas, o analista pode encontrar e-mails ocultos que também foram expostos.",
          "tools": [
            {
              "id": "OSINTLeak",
              "aplicacao": "✅ Testada em 26/10: melhor cobertura de bases BRASILEIRAS: com conta Free mostrou o registro completo de um vazamento nacional que HIBP, SynScan, DeHashed e BreachBase não tinham."
            },
            {
              "id": "DeHashed",
              "aplicacao": "✅ Testada em 26/10: sem login informa se há registros para o e-mail; ver os dados exige plano."
            },
            {
              "id": "BreachBase",
              "aplicacao": "⚠️ Testada em 26/10: 25 buscas grátis com cadastro; senhas/hashes vêm parcialmente censurados. Sem resultado a tela fica muda. Vende senhas vazadas: cadastrar com senha exclusiva."
            }
          ],
          "regra": {
            "tags": [
              "alvo/usuario-email",
              "fonte/vazamentos-darkweb",
              "func/busca-identificacao"
            ],
            "auto": true
          },
          "excluir": [
            "PwnDB"
          ]
        },
        {
          "id": "email-03-c2",
          "titulo": "Megavazamentos e Dumps (Motores Indexadores)",
          "conceito": "Verificação de comprometimento em incidentes massivos de segurança ou motores de busca voltados para rastrear dados hospedados de forma descentralizada e obscura.",
          "comoFunciona": "O sistema compara o identificador digital do alvo com bases indexadas de violações globais ou rastreia a Surface/Dark Web catalogando vazamentos.",
          "utilidadeOsint": "Revela plataformas nas quais a identidade possuiu cadastro, provendo leads por consulta passiva e mapeando a pegada digital exposta na Dark Web.",
          "tools": [
            {
              "id": "Have I Been Pwned (HIBP)",
              "aplicacao": "✅ Testada em 26/10: sempre a primeira consulta: grátis, sem login, lista as bases em que o e-mail aparece."
            },
            {
              "id": "SynScan Breaches (Verified Search)",
              "aplicacao": "✅ Testada em 26/10: segundo parecer gratuito e sem login; resultado coerente com o HIBP."
            },
            {
              "id": "OnionLand Search Engine",
              "aplicacao": "✅ Testada em 26/10: busca o e-mail EXATO na dark web se estiver entre aspas (/search?q=%22{email}%22). Ignorar os anúncios de mercados ilícitos; abrir .onion só no Tor Browser."
            },
            {
              "id": "Ahmia",
              "aplicacao": "⚠️ Testada em 26/10: para e-mail só traz ruído (casa \"gmail\"/\"com\"; aspas não funcionam). Usar apenas para termos distintivos, como nick ou alias."
            }
          ]
        },
        {
          "id": "email-03-c3",
          "titulo": "Plataformas DRP/CTI (Inteligência de Ameaças)",
          "conceito": "Monitoramento corporativo focado na proteção contra riscos digitais e exposição em ecossistemas de cibercrime e grupos maliciosos.",
          "comoFunciona": "Essas ferramentas monitoram continuamente canais do Telegram, shame sites de ransomware e fóruns de cibercrime para indexar a exposição de dados institucionais.",
          "utilidadeOsint": "Fundamental para diligências e CTI. Auxilia a visualizar rapidamente se a marca, os domínios corporativos ou a infraestrutura do alvo sofreram violações recentes ou extorsões.",
          "tools": [
            {
              "id": "ImmuniWeb Dark Web & Threat Exposure Test",
              "aplicacao": "✅ Testada em 26/10: para EMPRESA (entrada é domínio): contagem de incidentes na dark web, logins expostos e URLs de phishing."
            },
            {
              "id": "ScamSearch.io",
              "aplicacao": "✅ Testada em 26/10: checa se o e-mail (ou username/telefone) já foi denunciado em golpes; grátis, sem login."
            },
            {
              "id": "DarkWebInformer",
              "aplicacao": "⚠️ Testada em 26/10: não consulta e-mail: é portal de notícias de vazamentos e extorsões de organizações."
            }
          ],
          "regra": {
            "tags": [
              "fonte/vazamentos-darkweb",
              "func/busca-identificacao"
            ],
            "auto": true
          },
          "excluir": [
            "Axur Watchdog",
            "PwnDB",
            "TorWhois"
          ]
        }
      ]
    },
    {
      "num": "04",
      "nome": "Identificação & Perfil",
      "icone": "🧩",
      "opsec": {
        "nivel": "passivo",
        "nota": "🟢 PASSIVO / 🟡 CAUTELA (em ferramentas de IA e biometria comercial)"
      },
      "vetor": "Identificador (E-mail / Telefone / Username / Foto) ➔ Identidade Real / Pegada Digital / Redes de Relacionamento",
      "objetivo": "Identificar o responsável por perfis anônimos e reunir o nome real, a foto e a presença digital associados ao e-mail, utilizando agregação de dados, buscas reversas e inteligência artificial.",
      "camadas": [
        {
          "id": "email-04-c1",
          "titulo": "Nome Real, Foto e GAIA ID",
          "conceito": "Processo de extração de dados biográficos primários a partir de identificadores básicos de contato (e-mail ou telefone) consultando diretórios e APIs globais.",
          "comoFunciona": "A ferramenta interage passivamente com APIs de ecossistemas globais (como Google e Skype) ou bancos de dados colaborativos de chamadas para resolver o dado investigado e extrair metadados associados, como nomes reais, fotos de perfil ou históricos de localização.",
          "utilidadeOsint": "Permite realizar a quebra inicial do anonimato, transformando um e-mail ou número de telefone desconhecido em um rosto e um nome real, gerando identificadores exclusivos para aprofundar a investigação.",
          "tools": [
            {
              "id": "Epieos",
              "aplicacao": "Consulta de forma passiva diversas APIs de plataformas globais para extrair identificadores exclusivos (como o GAIA ID), nomes reais, fotos de perfil e avaliações no Google Maps vinculadas ao e-mail."
            },
            {
              "id": "Truecaller",
              "aplicacao": "A partir de um número de telefone suspeito, o analista pode descobrir o nome ou apelido associado ao proprietário da linha, a operadora e a localização cadastral, ajudando a identificar o titular do contato."
            }
          ],
          "regra": {
            "tags": [
              "alvo/telefone",
              "func/busca-identificacao"
            ],
            "auto": true
          },
          "excluir": [
            "Nuwber"
          ]
        },
        {
          "id": "email-04-c2",
          "titulo": "Busca por IA e Agregadores",
          "conceito": "Automação da coleta e cruzamento massivo de pegadas digitais utilizando inteligência artificial e motores de busca simultâneos.",
          "comoFunciona": "Plataformas agregadoras recebem um dado inicial (username, e-mail, etc.) e disparam varreduras simultâneas em centenas de sites, fóruns e registros públicos, compilando as aparições do alvo em um relatório ou grafo unificado.",
          "utilidadeOsint": "Agiliza drasticamente o processo de reconhecimento, revelando a real extensão da presença online do investigado, descobrindo novos *aliases* (pseudônimos) e correlacionando contas isoladas.",
          "tools": [
            {
              "id": "Sherlockeye",
              "aplicacao": "⚠️ Testada em 26/10: relatório gratuito parcial (2 achados em 103 fontes); conferir cada achado em outra fonte antes de usar."
            },
            {
              "id": "Webmii",
              "aplicacao": "⚠️ Testada em 26/10: baixa precisão: devolve ruído por aproximação do termo. Não usar como prova."
            },
            {
              "id": "WhatsMyName",
              "aplicacao": "A partir de um único nome de usuário conhecido, realiza uma varredura em massa para validar em quais serviços o apelido possui uma conta ativa, permitindo descobrir portfólios, fóruns e sites de nicho utilizados pelo alvo."
            }
          ],
          "regra": {
            "tags": [
              "alvo/usuario-email"
            ],
            "auto": true
          },
          "excluir": [
            "ThatsThem",
            "Nuwber",
            "PwnDB",
            "Stolen Camera Finder"
          ]
        },
        {
          "id": "email-04-c3",
          "titulo": "Reconhecimento Facial e Busca Visual",
          "conceito": "Busca reversa focada em biometria facial para localizar imagens do alvo espalhadas pela internet, independentemente do nome ou contexto em que foram publicadas.",
          "comoFunciona": "O analista envia uma fotografia de rosto do alvo para a plataforma, que utiliza redes neurais para mapear as características faciais e compará-las com bilhões de imagens indexadas na internet pública.",
          "utilidadeOsint": "Fundamental para desmascarar contas de fachada (Sock Puppets), localizar reportagens, identificar o alvo em eventos ou empresas terceiras e descobrir seu nome real caso a foto inicial seja anônima.",
          "tools": [
            {
              "id": "FaceCheck.id",
              "aplicacao": "Localiza correspondências visuais em redes sociais, fóruns e registros públicos (como cadastros criminais ou de notícias), permitindo mapear apelidos e desmascarar campanhas baseadas em roubo de identidade digital (catfishing)."
            },
            {
              "id": "PimEyes",
              "aplicacao": "Foca unicamente na estrutura biométrica do rosto, encontrando o mesmo indivíduo em fotos com planos de fundo, idades e iluminações distintas, viabilizando conexões com empresas e perfis periféricos de altíssimo valor investigativo."
            }
          ],
          "regra": {
            "tags": [
              "alvo/pessoa-identidade",
              "fonte/redes-sociais",
              "func/busca-identificacao"
            ],
            "auto": true
          },
          "excluir": [
            "Stolen Camera Finder"
          ]
        },
        {
          "id": "email-04-c4",
          "titulo": "Monitoramento Web e Social",
          "conceito": "Acompanhamento ativo e histórico das menções, interações e sentimentos gerados pelo alvo ou sobre ele em toda a internet de superfície.",
          "comoFunciona": "Motores de busca sociais e rastreadores web filtram palavras-chave, usernames ou hashtags para indexar e monitorar conversas e publicações em tempo real.",
          "utilidadeOsint": "Permite realizar a escuta social passiva, avaliar danos à reputação, identificar redes de influência e acompanhar o surgimento de novas informações do alvo na internet sem a necessidade de intervenção diária manual.",
          "tools": [
            {
              "id": "Google Alerts",
              "aplicacao": "✅ Testada em 26/10: monitoramento daqui em diante (não busca o passado): criar alerta com o e-mail ou nick ENTRE ASPAS. Exige conta Google."
            },
            {
              "id": "Social Searcher",
              "aplicacao": "⚠️ Testada em 26/10: só acha menções públicas recentes; não encontrou perfis que existiam."
            }
          ]
        }
      ]
    },
    {
      "num": "05",
      "nome": "Análise de Cabeçalhos (Forense)",
      "icone": "📨",
      "opsec": {
        "nivel": "passivo",
        "nota": "🟢 PASSIVO"
      },
      "vetor": "E-mail Recebido ➔ IP de Origem / Servidores de Trânsito / Assinaturas Criptográficas (SPF/DKIM)",
      "objetivo": "Aplicar engenharia reversa sobre comunicações eletrônicas recebidas. O foco é atestar a autenticidade do emissor, combater falsidade ideológica (Spoofing) e mapear geograficamente o endereço de IP real de onde partiu o disparo.",
      "camadas": [
        {
          "id": "email-05-c1",
          "titulo": "Dissecação do SMTP e Auditoria de Cabeçalhos",
          "conceito": "Processo de inspecionar as informações estruturais ocultas no cabeçalho (Header) da mensagem, desmembrando as linhas 'Received' e auditando as validações do remetente.",
          "comoFunciona": "As plataformas processam o código-fonte bruto do e-mail de forma estática, decodificando e organizando os metadados técnicos de roteamento em linhas cronológicas para atestar a validade dos registros de segurança sem disparar alertas.",
          "utilidadeOsint": "Revela o IP originário da máquina do remetente e expõe falhas nas chaves de segurança (SPF/DKIM/DMARC), sendo essencial para detectar técnicas de falsificação (email spoofing) em investigações de phishing, ameaças ou fraudes corporativas.",
          "tools": [
            {
              "id": "E-mail Header Analyzer (Gaijin.at)",
              "aplicacao": "✅ Testada em 26/10: mais completo: índice de confiança, erros e avisos; apontou corretamente uma cadeia de Received forjada. Envia o cabeçalho ao servidor."
            },
            {
              "id": "Google Admin Toolbox - Messageheader",
              "aplicacao": "✅ Testada em 26/10: leitura rápida de SPF/DKIM/DMARC e dos atrasos entre saltos. Envia o cabeçalho ao servidor do Google."
            }
          ],
          "regra": {
            "tags": [
              "alvo/usuario-email",
              "alvo/ip",
              "func/forense-local"
            ],
            "auto": true
          }
        },
        {
          "id": "email-05-c2",
          "titulo": "Inteligência de IP e Reputação de Ameaças",
          "conceito": "Avaliação técnica, geográfica e comportamental do endereço IP de origem isolado no cabeçalho do e-mail recebido.",
          "comoFunciona": "Plataformas de inteligência de rede cruzam o IP extraído com bases de dados de geolocalização e registros colaborativos de atividades maliciosas para fornecer a origem cadastral e o score de ameaça da infraestrutura.",
          "utilidadeOsint": "Permite mapear geograficamente o endereço real de onde partiu o disparo do e-mail. Atesta se o IP pertence a provedores de anonimização (VPN/Tor) ou se está listado em campanhas de cibercrime ativas, viabilizando o perfilamento do adversário e a atribuição de autoria.",
          "tools": [
            {
              "id": "FindIP (api.findip.net)",
              "aplicacao": "Após extrair o IP no cabeçalho, o analista utiliza o FindIP para obter dados de geolocalização cadastral estruturada (país, cidade, coordenadas aproximadas). O seu módulo avançado atua para detectar e identificar se o remetente tentou mascarar a sua conexão utilizando Proxies, VPNs ou nós de saída da rede Tor."
            },
            {
              "id": "AbuseIPDB",
              "aplicacao": "Banco de dados colaborativo focado na detecção de atividades maliciosas na internet. Permite que o analista verifique de forma ágil se o IP extraído do e-mail suspeito possui um longo histórico reportado de disseminação de spam, tentativas de invasão ou envolvimento em campanhas de fraude."
            },
            {
              "id": "Grabify",
              "opsec": "ativo",
              "alerta": "Exige que o alvo abra um link — interação direta, pode revelar a investigação."
            }
          ],
          "regra": {
            "tags": [
              "alvo/ip",
              "func/infraestrutura-cybint"
            ],
            "auto": true
          },
          "excluir": [
            "Dominico",
            "HEDnsExtractor",
            "Proxy List (jetkai)",
            "FaviHash"
          ]
        }
      ]
    },
    {
      "num": "06",
      "nome": "Mapeamento Corporativo",
      "icone": "🏢",
      "opsec": {
        "nivel": "passivo",
        "nota": "🟢 PASSIVO"
      },
      "vetor": "Domínio / Empresa ➔ E-mails Corporativos / Organogramas / Infraestrutura",
      "objetivo": "Descobrir a estrutura de profissionais de uma empresa, identificar e-mails institucionais, mapear padrões de nomenclatura corporativa e rastrear domínios associados a uma mesma organização.",
      "camadas": [
        {
          "id": "email-06-c1",
          "titulo": "Padrão de Nomenclatura e Colegas",
          "conceito": "Identificação de contatos profissionais e da hierarquia de colaboradores vinculados a um domínio institucional específico.",
          "comoFunciona": "A ferramenta varre bancos de dados públicos e redes sociais profissionais para indexar indivíduos associados à empresa investigada, deduzindo a fórmula matemática de criação de e-mails (ex: nome.sobrenome@empresa.com) adotada pela organização.",
          "utilidadeOsint": "Serve como um recurso estratégico para correlacionar domínios a indivíduos, descobrir canais de comunicação direta de tomadores de decisão e auxiliar na montagem de organogramas empresariais durante a fase de reconhecimento.",
          "tools": [
            {
              "id": "Sr. Watson",
              "aplicacao": "✅ Testada em 26/10: com o CNPJ (grátis) traz a ficha da Receita com o e-mail cadastrado, telefones e grafo de sócios. Busca por e-mail, CPF ou telefone só no plano PRO."
            },
            {
              "id": "RocketReach",
              "aplicacao": "⚠️ Testada em 26/10: conta grátis: buscar é livre (/person?contact_info={email ou domínio}), revelar contato gasta crédito (5). Só acha quem tem perfil profissional."
            },
            {
              "id": "Hunter.io",
              "aplicacao": "Realiza varreduras em páginas públicas da internet para indexar e mapear a estrutura de e-mails de organizações, identificando os padrões de nomenclatura adotados por pessoas jurídicas e listando a hierarquia técnica vinculada ao domínio."
            }
          ],
          "regra": {
            "tags": [
              "alvo/usuario-email",
              "func/busca-identificacao"
            ],
            "auto": true
          },
          "excluir": [
            "Nuwber",
            "PwnDB",
            "Stolen Camera Finder"
          ]
        },
        {
          "id": "email-06-c2",
          "titulo": "Subfase 2: Extração de E-mails por Domínio e Pivoting de Infraestrutura",
          "conceito": "Busca massiva e engenharia reversa focada na coleta de seletores de identidade (e-mails, subdomínios) e ativos digitais correlacionados à marca ou domínio principal do alvo.",
          "comoFunciona": "Motores de busca consultam bilhões de registros indexados para recuperar dados associados a um domínio de entrada, ou utilizam e-mails corporativos conhecidos para buscar reversamente quais outras propriedades web foram registradas por essa identidade.",
          "utilidadeOsint": "Permite o mapeamento de superfícies de ataque, a descoberta de leads humanos ocultos e a identificação de portfólios inteiros de propriedades digitais fraudulentas ou subsidiárias controladas pela mesma entidade organizacional.",
          "tools": [
            {
              "id": "Whoxy",
              "aplicacao": "✅ Testada em 26/10: melhor reverse WHOIS gratuito: ~100 domínios por e-mail sem conta (search.php?email={email}). Instável (erro 522): repetir após ~20 s."
            },
            {
              "id": "Skymem",
              "aplicacao": "⚠️ Testada em 26/10: domínio → e-mails corporativos, mas só 2 visíveis sem pagar e captcha a cada busca."
            },
            {
              "id": "WhoisFreaks Reverse WHOIS Search",
              "aplicacao": "⚠️ Testada em 26/10: sem conta mostra só 2 domínios e PUBLICA as buscas numa lista de consultas recentes — não usar com e-mail de alvo real sem conta."
            },
            {
              "id": "Phonebook.cz",
              "aplicacao": "⚠️ Testada em 26/10: exige licença paga do Intelligence X."
            }
          ],
          "regra": {
            "tags": [
              "alvo/dominio"
            ],
            "auto": true
          },
          "excluir": [
            "Dominico",
            "HEDnsExtractor",
            "HNSSearch",
            "Shodan Dorks - s1rn3tz",
            "TorWhois",
            "FaviHash"
          ]
        }
      ]
    }
  ]
});
