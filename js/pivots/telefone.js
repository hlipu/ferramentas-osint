// Pivotagem v2. Edite com cuidado.
// tools: "ID do catálogo" | {id, aplicacao?, opsec?, alerta?} | {nome,url,aplicacao,externo:true}
// regra.tags: mostra também outras ferramentas do catálogo com TODAS essas tags.
// module.icone: emoji do diagrama do topo (livre para trocar).
registerPivot({
  "id": "telefone",
  "categoria": "telecomunicacoes",
  "tipo": "alvo",
  "icone": "📞",
  "titulo": "Investigação Telefônica (TELINT)",
  "subtitulo": "// Roteiro metodológico para validação técnica, engenharia reversa, análise de mensageria e identificação de hardware mobile.",
  "imagem": "../img/trilha-telefone.jpg",
  "modulos": [
    {
      "num": "01",
      "nome": "Validação Técnica & Operadora",
      "icone": "✅",
      "opsec": {
        "nivel": "passivo",
        "nota": "🟢 PASSIVO"
      },
      "vetor": "Número de Telefone ➔ Operadora de Origem / Operadora Atual (Portabilidade) / Tipo de Linha (Fixo/Móvel)",
      "objetivo": "Realizar a triagem inicial para descobrir a qual empresa de telecomunicação o terminal pertence. Isso é crucial para mitigar erros de atribuição, validar o tipo de linha e direcionar futuras ordens judiciais de quebra de sigilo telemático ou interceptação.",
      "camadas": [
        {
          "id": "telefone-01-c1",
          "titulo": "Identificação de Infraestrutura e Portabilidade",
          "conceito": "Acesso ao barramento de administração de portabilidade numérica para atestar o roteamento real e o estado atual do número na rede.",
          "comoFunciona": "Sistemas de telecomunicação consultam bases de dados regulatórias oficiais para mapear o código de área (DDD) e apontar qual a operadora de origem e o destino atual do terminal telefônico.",
          "utilidadeOsint": "Permite mapear de qual DDD o alvo se origina, constatar se ele costuma trocar de operadora com frequência para evasão de rastreio e mitigar erros de atribuição técnica antes do envio de ofícios legais.",
          "tools": [
            {
              "id": "ConsultaOperadora.com.br",
              "aplicacao": "✅ Testada em 26/10: primeira escolha: sem captcha, mostra operadora, tipo de linha e se o número foi PORTADO. Número sem dono → operadora vazia."
            },
            {
              "id": "Consulta Número - ABR Telecom",
              "aplicacao": "✅ Testada em 26/10: fonte oficial da portabilidade. Exige reCAPTCHA e clique humano a cada consulta; número inexistente → \"Não existem dados\"."
            },
            {
              "id": "Cobertura Celular",
              "aplicacao": "✅ Testada em 26/10: entrada é endereço ou coordenada: lista as antenas próximas por operadora (distância, azimute, 2G/3G/4G). Contexto de localização."
            },
            {
              "id": "PhoneInfoga",
              "aplicacao": "✅ Testada em 14/11: Ferramenta de linha de comando para coletar informação sobre número de telefone (repositório ativo, atualizado em 2026-08-25, 18 mil estrelas)."
            },
            {
              "id": "Qual Operadora",
              "aplicacao": "⚠️ Testada em 26/10: acertou a operadora, mas detecta automação (só funciona digitando à mão), corta alguns números e é cheio de anúncios. Preferir o ConsultaOperadora."
            }
          ],
          "regra": {
            "tags": [
              "alvo/telefone"
            ],
            "auto": true
          },
          "excluir": [
            "IDT Express WhatsApp Checker",
            "Nuwber"
          ]
        },
        {
          "id": "telefone-01-c2",
          "titulo": "Engenharia Reversa e Validação em Plataformas Digitais",
          "conceito": "Utilização do número telefônico tecnicamente validado para desanonimizar o alvo através de catálogos colaborativos e APIs de redes sociais.",
          "comoFunciona": "Ferramentas realizam o 'Reverse Phone Lookup' consultando listas de contatos crowdsourced ou submetem o número a endpoints de mensageria para confirmar atividade e extrair dados biográficos.",
          "utilidadeOsint": "Essencial para descobrir o nome civil ou apelido do proprietário da linha, confirmar seu uso em aplicativos como o WhatsApp e expandir o rastreio (pivoting) do alvo para outras redes na internet sem qualquer interação direta com ele.",
          "tools": [
            {
              "id": "Truecaller",
              "aplicacao": "⚠️ Testada em 26/10: com conta gratuita mostra nome atribuído pela base colaborativa, operadora e região. Número malformado é reinterpretado como de outro país e volta com nome de terceiro: conferir país e operadora antes de atribuir."
            },
            {
              "id": "Epieos",
              "aplicacao": "Consulta de forma silenciada dezenas de APIs globais a partir do número de telefone. Auxilia na extração de contas do Skype, metadados de redes sociais e avaliações no Google Maps atreladas estritamente àquela linha específica, ramificando a investigação digital."
            }
          ],
          "regra": {
            "tags": [
              "alvo/telefone"
            ],
            "auto": true
          },
          "excluir": [
            "IDT Express WhatsApp Checker",
            "Nuwber"
          ]
        }
      ]
    },
    {
      "num": "02",
      "nome": "Mapeamento de Mensageria (SOCMINT)",
      "icone": "💬",
      "opsec": {
        "nivel": "passivo",
        "nota": "🟢 PASSIVO"
      },
      "vetor": "Número de Telefone ➔ WhatsApp / Telegram / Foto de Perfil / Status",
      "objetivo": "Confirmar se a linha é utilizada ativamente em plataformas de mensageria (como WhatsApp e Telegram). Isso serve como trampolim para baixar fotos de perfil e recados públicos, vitais para a identificação visual do indivíduo ou de empresas de fachada.",
      "camadas": [
        {
          "id": "telefone-02-c1",
          "titulo": "Validação Silenciosa em Mensageiros (WhatsApp)",
          "conceito": "Envio de requisições web para os endpoints das plataformas de mensagens a fim de checar o status de registro da conta sem adicioná-la a uma agenda telefônica pessoal.",
          "comoFunciona": "As plataformas disparam chamadas de API simulando a tentativa de interação ou verificação de registro para atestar se o número possui uma conta ativa, extraindo metadados de operadora e presença sem que o aplicativo do alvo seja notificado.",
          "utilidadeOsint": "Otimiza o fluxo de investigação validando instantaneamente se o número serve como ponte para capturar imagens e metadados de contas comerciais ou pessoais, garantindo que o investigado não seja alertado da vigilância.",
          "tools": [
            {
              "id": "CheckLeaked WhatsApp",
              "aplicacao": "✅ Testada em 26/10: sem login, o cache já diz se o número tem WhatsApp, se é Business, se tem foto, se está no Telegram e no vazamento do Facebook. Ao vivo exige login Google (20/dia). O cache é PÚBLICO."
            }
          ],
          "regra": {
            "tags": [
              "alvo/telefone",
              "func/validacao-status"
            ],
            "auto": true
          },
          "excluir": [
            "IDT Express WhatsApp Checker"
          ]
        },
        {
          "id": "telefone-02-c2",
          "titulo": "Expansão de Mensageria e Ecossistemas Secundários",
          "conceito": "Cruzamento passivo do número de telefone em plataformas de comunicação paralelas (como Skype e Google) e mapeamento de identificadores criptográficos (Telegram Web3).",
          "comoFunciona": "Sistemas especializados consultam APIs globais de múltiplos serviços e exploradores de blockchain (TON) para descobrir contas atreladas ao número telefônico fornecido.",
          "utilidadeOsint": "Amplia a malha de coleta visual. Permite encontrar fotos de perfil históricas usadas no Skype ou Google (muitas vezes esquecidas pelo alvo) e rastrear a autoria de números anônimos do Telegram utilizados para ocultar a real identidade do criminoso.",
          "tools": [
            {
              "id": "GruposWhats.app",
              "aplicacao": "✅ Testada em 26/10: não consulta número: acha grupos públicos de WhatsApp por tema ou região (/search?q=). Entrar em grupo é ação ativa."
            },
            {
              "id": "Teletudo Busqueitor",
              "aplicacao": "⚠️ Testada em 26/10: diretório menor de grupos de WhatsApp por palavra-chave; não consulta número."
            },
            {
              "id": "Epieos",
              "aplicacao": "Realiza varreduras passivas nas APIs do Google, Skype e redes sociais a partir do número de telefone. Auxilia o analista a descobrir fotos de perfil vinculadas ao Skype do alvo ou contas Google conectadas ao número, fornecendo novos vetores visuais sem interagir diretamente com o alvo."
            },
            {
              "id": "Fragment",
              "aplicacao": "Se o alvo utilizar a tática de ocultação com os números anônimos do Telegram (iniciados em +888), a plataforma permite rastrear o histórico de leilões do número. Viabiliza a engenharia reversa para vincular o número diretamente a um endereço de carteira de criptoativos (TON Wallet) associado ao investigado."
            }
          ],
          "regra": {
            "tags": [
              "alvo/usuario-email",
              "alvo/telefone",
              "func/busca-identificacao"
            ],
            "auto": true
          },
          "excluir": [
            "Nuwber"
          ]
        }
      ]
    },
    {
      "num": "03",
      "nome": "Identificação Civil & Listas Públicas",
      "icone": "🪪",
      "opsec": {
        "nivel": "passivo",
        "nota": "🟢 PASSIVO"
      },
      "vetor": "Número de Telefone ➔ Nome Completo do Titular / Endereço / CPF Associado",
      "objetivo": "Realizar a identificação civil do alvo. Essa etapa busca descobrir o nome real, apelido ou empresa que assina o terminal telefônico, traduzindo um dado técnico em um identificador humano para ações de inteligência ou diligências de campo.",
      "camadas": [
        {
          "id": "telefone-03-c1",
          "titulo": "Engenharia Reversa Telefônica (Crowdsourcing)",
          "conceito": "Uso de bases de dados construídas a partir de listas de contatos sincronizadas e diretórios públicos de assinantes de telefonia.",
          "comoFunciona": "Sistemas indexam listas telefônicas tradicionais ou agregam agendas de contatos colaborativas de milhões de usuários para realizar a busca reversa, associando um número de telefone à identidade de como aquele contato foi salvo.",
          "utilidadeOsint": "É um dos vetores mais ágeis para descobrir como o alvo é chamado por seus próprios contatos, muitas vezes revelando apelidos, ocupações e localizações aproximadas de assinantes fixos.",
          "tools": [
            {
              "id": "Truecaller",
              "aplicacao": "A principal plataforma para Reverse Phone Lookup. Revela a quem o número pertence baseado em milhões de agendas de terceiros. Aviso OPSEC: O analista nunca deve usar sua conta pessoal ou corporativa oficial para realizar o login, devendo usar um perfil de cobertura (Sock Puppet)."
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
            "Teletudo Busqueitor",
            "Whitepages",
            "Nuwber"
          ]
        },
        {
          "id": "telefone-03-c2",
          "titulo": "Inteligência de Vazamentos e Identificação Civil",
          "conceito": "Busca de números de telefone em repositórios históricos de vazamentos de dados para extrair o cadastro civil completo (Breach Intelligence).",
          "comoFunciona": "Plataformas agregam bilhões de registros expostos em violações de segurança corporativa. Ao pesquisar o telefone, o analista recupera a linha original do banco de dados vazado, que frequentemente contém CPF, endereço de entrega e nome completo.",
          "utilidadeOsint": "Permite a transição direta do dado técnico (telefone) para o dado civil estruturado (CPF/RG), fornecendo a base material necessária para a quebra do anonimato do alvo investigado.",
          "tools": [
            {
              "id": "CadastroPré",
              "aplicacao": "✅ Testada em 26/10: com o CPF (só com base legal) mostra em que operadoras e UFs há linha PRÉ-PAGA ativa. Não mostra o número. Exige captcha."
            },
            {
              "id": "OSINTLeak",
              "aplicacao": "Agrega registros de violações e fóruns cibercriminosos. Através da busca reversa por telefone, o analista pode extrair a qualificação civil vazada juntamente com o número de contato de uso do investigado."
            },
            {
              "id": "SynScan Breaches (Verified Search)",
              "aplicacao": "Fornece acesso a dados provenientes de data leaks, permitindo estruturar buscas pelo telefone para localizar informações civis e endereços de correspondência outrora cadastrados pelo alvo em lojas virtuais e serviços da web."
            },
            {
              "id": "DeHashed",
              "aplicacao": "Permite inserir o número de telefone do alvo e varrer bilhões de registros vazados para descobrir o nome real, e-mails associados e eventuais documentos (CPFs) atrelados àquele número em bancos de dados comprometidos."
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
          "id": "telefone-03-c3",
          "titulo": "Mapeamento Avançado de Pegada Digital",
          "conceito": "Identificação de contas digitais, perfis profissionais e registros em redes sociais a partir do número de telefone.",
          "comoFunciona": "Sistemas consultam em tempo real as APIs de diversas redes sociais e serviços web para verificar vínculos telefônicos, extraindo nomes e perfis sem notificar o alvo da pesquisa.",
          "utilidadeOsint": "Revela nomes civis e fotos de perfil adotados pelo alvo em plataformas web e de comércio eletrônico que exigem verificação telefônica (SMS), ajudando a confirmar sua identidade visual de maneira silenciosa.",
          "tools": [
            {
              "id": "OSINT Industries",
              "aplicacao": "Consulta em tempo real centenas de serviços globais para mapear contas registradas com o número de telefone fornecido, extraindo nomes reais, UIDs e fotos de perfil adotadas na internet."
            }
          ]
        }
      ]
    },
    {
      "num": "04",
      "nome": "Presença Digital & Redes Sociais",
      "icone": "📲",
      "opsec": {
        "nivel": "passivo",
        "nota": "🟢 PASSIVO"
      },
      "vetor": "Número de Telefone ➔ Google ID / Contas Vinculadas em Redes Sociais",
      "objetivo": "Desanonimizar o alvo rastreando em quais sites, redes sociais e fóruns da internet aquele número de telefone foi empregado como método de registro ou como chave de recuperação de conta (autenticação).",
      "camadas": [
        {
          "id": "telefone-04-c1",
          "titulo": "Rastreio Passivo Multiplataforma",
          "conceito": "Automação de requisições de recuperação de senha ou sincronização de contatos em APIs abertas para confirmar a existência da conta do alvo.",
          "comoFunciona": "As plataformas enviam requisições de forma automatizada para os endpoints de dezenas de serviços da web, analisando os códigos de resposta dos servidores para confirmar a existência da conta associada ao telefone sem notificar o alvo.",
          "utilidadeOsint": "Transforma um simples número de telefone na 'pegada digital' inteira do indivíduo, expondo conexões no ecossistema Google, Skype, entre dezenas de outros.",
          "tools": [
            {
              "id": "Epieos",
              "aplicacao": "Executa busca reversa do telefone de forma passiva, extraindo identificadores exclusivos (como o GAIA ID do Google), mapeando avaliações em locais físicos (Google Maps), fotos de perfil e calendários vinculados ao dado inicial."
            },
            {
              "id": "OSINT Industries",
              "aplicacao": "Plataforma especializada que automatiza a busca do telefone em centenas de serviços em tempo real, levantando avatares fotográficos, identificadores únicos (UIDs), perfis em mídias sociais e a última atividade sem alertar o titular da conta, otimizando drasticamente o tempo da investigação."
            }
          ],
          "regra": {
            "tags": [
              "alvo/usuario-email",
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
          "id": "telefone-04-c2",
          "titulo": "Validação em Ecossistemas Centrais",
          "conceito": "Utilização direta de páginas de autenticação oficiais para validação ativa e levantamento de metadados expostos pela plataforma.",
          "comoFunciona": "O sistema processa requisições em tempo real na interface pública para verificar a existência de credenciais atreladas ao telefone antes de prosseguir para a etapa de inserção de senha.",
          "utilidadeOsint": "A interface pode expor metadados valiosos em fontes abertas, como o nome real completo configurado na conta, fotos de perfil em alta resolução e confirmação de vínculos com domínios corporativos.",
          "tools": [
            {
              "id": "Google Account Sign-In",
              "aplicacao": "Ao inserir um número de telefone na interface de login ou recuperação de conta do Google, o analista confirma se o identificador possui uma conta ativa. Serve como a etapa manual perfeita para confirmar os dados extraídos pelo Epieos.",
              "opsec": "ativo",
              "alerta": "Tela de recuperação de senha ou de login usada para checar se um e-mail, CPF ou telefone tem conta. Pode notificar o titular, registra o IP de quem consulta e não deve ser automatizada: só manual e com base legal."
            }
          ]
        },
        {
          "id": "telefone-04-c3",
          "titulo": "Inteligência de Reputação e Fraudes",
          "conceito": "Consulta e verificação de reputação para identificar registros de fraudes ou golpes associados a identificadores digitais.",
          "comoFunciona": "O motor de busca rastreia e centraliza informações coletadas de centenas de bancos de dados públicos, listas de denúncias e fóruns de segurança.",
          "utilidadeOsint": "Identifica se a presença online atrelada àquele telefone já foi utilizada em campanhas de phishing, golpes financeiros ou se possui histórico de denúncias ativas pela comunidade de segurança.",
          "tools": [
            {
              "id": "ScamSearch.io",
              "aplicacao": "Funciona como um centralizador de inteligência. Ao inserir o número de telefone do alvo, o investigador rastreia instantaneamente se aquele terminal foi relatado por vítimas em atividades cibercriminosas na internet ou associado a falsos perfis sociais."
            }
          ]
        }
      ]
    },
    {
      "num": "05",
      "nome": "Vazamentos, Golpes & Reputação",
      "icone": "🚩",
      "opsec": {
        "nivel": "passivo",
        "nota": "🟢 PASSIVO"
      },
      "vetor": "Número de Telefone ➔ Denúncias (Spam/Fraude) / Credenciais Vazadas (Breach Intel)",
      "objetivo": "Avaliar se o terminal está sendo operado por cibercriminosos ou se foi alvo de violações. Esse levantamento mapeia a confiabilidade da linha e identifica ocorrências de fraudes denunciadas pela comunidade.",
      "camadas": [
        {
          "id": "telefone-05-c1",
          "titulo": "Agregadores de Fraude e Reputação Digital",
          "conceito": "Cruzamento do telefone com petabytes de logs de ataques e listas negras comunitárias (Blacklists) para identificar atividades maliciosas.",
          "comoFunciona": "Motores de busca rastreiam o telefone em fóruns de segurança e diretórios públicos colaborativos para consolidar o nível de risco e a reputação associada à linha.",
          "utilidadeOsint": "Se o telefone pertencer a um fraudador, ferramentas de reputação denunciam campanhas de phishing ou estelionato atreladas à linha, revelando imediatamente a sua utilização em golpes.",
          "tools": [
            {
              "id": "ScamSearch.io",
              "aplicacao": "Rastreia o telefone em listas de denúncias públicas e bases de cibercrime para identificar se o número foi empregado em golpes ou se possui histórico de denúncias ativas pela comunidade de segurança, facilitando o mapeamento de riscos."
            },
            {
              "id": "Truecaller",
              "aplicacao": "O serviço indica 'scores' e categorias de risco, como 'Spam', que são fornecidos coletivamente por vítimas e usuários do sistema para desmascarar a utilização da linha em fraudes eletrônicas."
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
          "id": "telefone-05-c2",
          "titulo": "Inteligência de Vazamentos e Dumps (Breach Intel)",
          "conceito": "Busca reversa do telefone em arquivos provenientes de grandes vazamentos (Data Breaches) e exposições de fóruns cibercriminosos.",
          "comoFunciona": "As plataformas indexam bilhões de registros extraídos de violações de segurança, permitindo buscas reversas para confirmar o comprometimento de dados atrelados ao terminal.",
          "utilidadeOsint": "Se a linha pertencer a uma vítima (ou for um número antigo), a busca retornará nomes, senhas expostas, e-mails e endereços residenciais ligados a esse terminal em vazamentos do passado, enriquecendo o perfil do alvo.",
          "tools": [
            {
              "id": "Have I Been Pwned (HIBP)",
              "aplicacao": "Indispensável para o mapeamento da pegada digital (digital footprinting). Ao inserir o número de telefone, o analista verifica passivamente em quais plataformas, fóruns ou serviços web aquela identidade possuiu cadastro e teve dados expostos em megavazamentos."
            },
            {
              "id": "OSINTLeak",
              "aplicacao": "O serviço agrega e indexa bilhões de registros oriundos de violações de segurança e stealer logs. É ideal para identificar rapidamente a reutilização de senhas por alvos e extrair a qualificação civil exposta juntamente com o número de contato do investigado."
            },
            {
              "id": "SynScan Breaches (Verified Search)",
              "aplicacao": "Permite estruturar buscas avançadas pelo telefone para localizar endereços e informações civis outrora cadastradas pelo alvo em lojas virtuais e serviços da web, disponibilizando dados em texto claro mediante comprovação de escopo."
            },
            {
              "id": "DeHashed",
              "aplicacao": "Permite a busca do número telefônico dentro de bilhões de registros provenientes de fóruns e servidores vazados da Dark Web, revelando nomes reais, e-mails associados e outras credenciais em texto claro atreladas ao terminal."
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
        }
      ]
    },
    {
      "num": "06",
      "nome": "Hardware & Ativos Cripto (Web3)",
      "icone": "📟",
      "opsec": {
        "nivel": "passivo",
        "nota": "🟢 PASSIVO"
      },
      "vetor": "Número de Telefone / Número Anônimo (+888) / IMEI ➔ Endereço Criptográfico (TON Wallet) / Perfil de Hardware",
      "objetivo": "Identificar as configurações físicas do dispositivo utilizado pelo alvo (telefone celular base) e rastrear as novas metodologias de ocultação do cibercrime, como a compra de telefones virtuais anônimos com pagamentos descentralizados em criptomoedas.",
      "camadas": [
        {
          "id": "telefone-06-c1",
          "titulo": "Desanonimização Web3 e Ativos do Telegram",
          "conceito": "Atualmente, alvos evitam comprar chips de operadoras convencionais e optam pela aquisição de números NFT anônimos do Telegram (+888) ou usernames diretamente pela blockchain.",
          "comoFunciona": "A plataforma consulta os contratos inteligentes da rede blockchain (como a TON) para mapear o histórico de lances e revelar o endereço público da carteira digital que detém a custódia do número.",
          "utilidadeOsint": "Transpõe a barreira da rede social para a inteligência financeira (FININT). Analisando esses números, o investigador quebra a camada de anonimato inicial e liga a identidade do usuário diretamente a uma carteira de criptomoedas, possibilitando seguir o rastro do dinheiro.",
          "tools": [
            {
              "id": "Fragment",
              "aplicacao": "Plataforma oficial de contratos inteligentes no Telegram que opera sobre a blockchain TON. O analista pode pesquisar números virtuais anônimos para visualizar todo o histórico de lances, transferências de custódia e, principalmente, vincular o número anonimizado a uma carteira de criptoativos (TON Wallet) de forma estruturada."
            }
          ]
        },
        {
          "id": "telefone-06-c2",
          "titulo": "Rastreamento de Fluxos Cripto e Inteligência Financeira",
          "conceito": "Mapeamento do fluxo de capital descentralizado a partir do endereço criptográfico (Wallet) descoberto na fase de desanonimização.",
          "comoFunciona": "Exploradores de blocos e ferramentas analíticas processam os livros-razão públicos (ledgers) das blockchains para auditar o histórico de transações, saldos e conexões transacionais do endereço investigado.",
          "utilidadeOsint": "Permite desatar nós transacionais, mapear a movimentação de fundos de origem ilícita e identificar os endereços de destino ou corretoras (exchanges) que interagem com a carteira do alvo, gerando vias para possíveis bloqueios ou quebras de sigilo.",
          "tools": [
            {
              "id": "Blockchain.com Explorer",
              "aplicacao": "Funciona como um motor de busca e livro-razão público. Após identificar a carteira que comprou o ativo virtual no Fragment, o analista utiliza exploradores para rastrear de onde vieram os fundos originais e para onde estão indo, viabilizando o 'Follow the Money'."
            },
            {
              "id": "BlockSherlock",
              "aplicacao": "Diretório e hub tático para inteligência financeira. Lista exploradores focados em análise de heurísticas (como reutilização de endereços e clusters), servindo como guia orientativo para aprofundar o rastreamento técnico nas carteiras descobertas do alvo."
            }
          ],
          "regra": {
            "tags": [
              "alvo/financeiro-crypto"
            ],
            "auto": true
          }
        },
        {
          "id": "telefone-06-c3",
          "titulo": "Inteligência de Equipamento Físico e Triagem de Hardware (IMEI)",
          "conceito": "Uso do International Mobile Equipment Identity (IMEI), caso tenha sido capturado através de engenharia social, metadados de imagens ou logs de provedores.",
          "comoFunciona": "Sistemas decodificam a estrutura numérica do IMEI e extraem especificações baseadas no Type Allocation Code (TAC), cruzando os identificadores simultaneamente com bancos de restrições de operadoras de telefonia.",
          "utilidadeOsint": "Revela exatamente as peças de hardware, marca, modelo, data de lançamento e capacidade do telefone celular real nas mãos do criminoso. Adicionalmente, verifica se o dispositivo está em listas negras (blacklist) por perda ou roubo, apoiando flagrantes em diligências de campo.",
          "tools": [
            {
              "id": "IMEI.info",
              "aplicacao": "✅ Testada em 26/10: com o IMEI (/?imei={IMEI}) identifica marca e modelo e faz checagem básica de blacklist. Anúncios sequestram a aba segundos depois: ler o resultado logo."
            },
            {
              "id": "Prey Project"
            }
          ]
        }
      ]
    }
  ]
});
