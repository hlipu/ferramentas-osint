// Pivotagem v2. Edite com cuidado.
// tools: "ID do catálogo" | {id, aplicacao?, opsec?, alerta?} | {nome,url,aplicacao,externo:true}
// regra.tags: mostra também outras ferramentas do catálogo com TODAS essas tags.
// module.icone: emoji do diagrama do topo (livre para trocar).
registerPivot({
  "id": "financeiro",
  "categoria": "financeiro",
  "tipo": "alvo",
  "icone": "💰",
  "titulo": "Investigação Financeira & Patrimonial (FININT)",
  "subtitulo": "// Roteiro metodológico para o rastreamento de criptoativos, decodificação de meios de pagamento, auditoria de dívidas e financiamento político.",
  "imagem": "../img/trilha-financeiro.jpg",
  "modulos": [
    {
      "num": "01",
      "nome": "Rastreamento Blockchain & Criptoativos",
      "icone": "💎",
      "opsec": {
        "nivel": "passivo",
        "nota": "🟢 PASSIVO"
      },
      "vetor": "Endereço de Carteira / Hash de Transação ➔ Saldo / Fluxo de Fundos (Inputs/Outputs) / Outras Carteiras Atreladas / Corretoras de Destino (Exchanges)",
      "objetivo": "Rastrear o fluxo financeiro (\"Follow the Money\") de ativos virtuais descentralizados. O foco é mapear transferências ilícitas (como pagamentos de Sextortion ou Ransomware), observar técnicas de ofuscação (Mixers) e identificar o momento em que os recursos tocam o mundo real por meio de corretoras (Exchanges) para uma possível quebra de sigilo.",
      "camadas": [
        {
          "id": "financeiro-01-c1",
          "titulo": "Análise Primária de Blockchain (Exploradores de Blocos)",
          "conceito": "Acesso ao livro-razão público e descentralizado (Blockchain) para auditar os registros matemáticos de transações, que exibem as carteiras de origem (Inputs), as carteiras de destino (Outputs) e os endereços de troco (Change Addresses).",
          "comoFunciona": "A plataforma interroga diretamente os nós da rede para exibir o histórico imutável gravado nos blocos, estruturando saldos e fluxos em uma interface legível.",
          "utilidadeOsint": "Permite visualizar em tempo real os saldos das contas e desatar nós transacionais. Apesar das carteiras serem pseudônimas, a análise do fluxo contínuo de envio evidencia a rota do dinheiro até sua conversão em moeda fiduciária.",
          "tools": [
            {
              "id": "Blockchain.com Explorer",
              "aplicacao": "✅ Testada em 12/11: saldo, transações e rótulos."
            }
          ]
        },
        {
          "id": "financeiro-01-c2",
          "titulo": "Inteligência e Repositórios de Ativos Virtuais",
          "conceito": "Uso de diretórios táticos que catalogam exploradores e relatórios (Reportes) para otimizar a escolha da ferramenta de acordo com a rede blockchain sob investigação.",
          "comoFunciona": "Portais de referência centralizam a curadoria de dezenas de exploradores focados em ativos virtuais, orientando o investigador sobre qual ferramenta possui melhor suporte analítico para a moeda específica.",
          "utilidadeOsint": "Impede a dispersão técnica do analista em investigações financeiras de cibercrimes (FININT/CYBINT). A ferramenta ajuda a identificar os exploradores que entregam as melhores capacidades (como suporte a APIs ou gráficos de vínculos) e consolida inteligência focada em carteiras maliciosas.",
          "tools": [
            {
              "id": "BlockSherlock",
              "aplicacao": "⚠️ Testada em 12/11: área restrita a unidades de investigação."
            }
          ]
        },
        {
          "id": "financeiro-01-c3",
          "titulo": "Identificação e Inteligência de Ameaças em Web3",
          "conceito": "Busca de vínculos diretos entre carteiras de criptoativos e identidades do mundo real (Web2) ou registros de atividades fraudulentas e extorsões.",
          "comoFunciona": "A partir de um hash de carteira, o analista consulta indexadores de fraudes, ecossistemas de mensageria descentralizada e domínios Web3 para revelar nomes, e-mails ou usernames atrelados ao ativo financeiro.",
          "utilidadeOsint": "Fundamental para realizar a ponte de atribuição técnica (pivoting). Permite verificar se a carteira já foi reportada publicamente em esquemas criminosos ou localizar a identidade do operador rastreando os metadados cadastrados em contratos inteligentes.",
          "tools": [
            {
              "id": "ScamSearch.io",
              "aplicacao": "O analista insere o endereço da carteira de criptoativos do alvo para verificar se aquele identificador específico já foi utilizado em campanhas de phishing, golpes financeiros ou ataques de extorsão/ransomware reportados globalmente, facilitando a atribuição de autoria."
            },
            {
              "id": "Unstoppable Domains",
              "aplicacao": "Vetor crucial de pivoting tático. Ao analisar um domínio descentralizado associado a uma página de phishing ou perfil sob investigação, o analista consegue extrair passivamente os endereços exatos de carteiras vinculadas a ele, além de possíveis links para redes sociais e e-mails inseridos voluntariamente nos metadados do contrato inteligente."
            },
            {
              "id": "Fragment",
              "aplicacao": "Funciona como uma ponte de atribuição entre o ecossistema de redes sociais e o ambiente Web3. A ferramenta permite mapear e vincular um username público ou um número anônimo (+888) do Telegram diretamente a um endereço de carteira de criptoativos (TON Wallet), viabilizando o rastreamento financeiro de operadores anônimos."
            }
          ],
          "regra": {
            "tags": [
              "alvo/financeiro-crypto"
            ],
            "auto": true
          }
        }
      ]
    },
    {
      "num": "02",
      "nome": "Decodificação de Meios de Pagamento (PIX)",
      "icone": "💠",
      "opsec": {
        "nivel": "passivo",
        "nota": "🟢 PASSIVO"
      },
      "vetor": "QR Code (Imagem) / Código Copia e Cola ➔ Identificador do Recebedor (Chave Pix) / Nome do Beneficiário / Cidade e Banco",
      "objetivo": "Desofuscar a infraestrutura de pagamentos utilizada por golpistas em campanhas de Phishing, falsas vendas ou extorsão. O intuito é extrair dados reais de beneficiários ou laranjas sem realizar transferências de teste no aplicativo do banco.",
      "camadas": [
        {
          "id": "financeiro-02-c1",
          "titulo": "Extração Passiva de Códigos Bidimensionais (QR Code)",
          "conceito": "Leitura e decodificação estática do payload embutido em arquivos de imagem (QR Codes) associados a fraudes e cobranças, isolando o texto bruto ou a URL antes de qualquer interação.",
          "comoFunciona": "A plataforma processa os pixels da imagem fornecida pelo analista (como um print de uma falsa venda) e extrai a string textual decodificada (Pix Copia e Cola) sem conectar-se ao destinatário.",
          "utilidadeOsint": "Permite isolar a string bruta do pagamento sem a necessidade de escanear o código com a câmera do dispositivo móvel pessoal do investigador, impedindo execuções acidentais de links maliciosos ou a exposição de dados do analista.",
          "tools": [
            {
              "id": "ZXing Decoder Online",
              "aplicacao": "✅ Testada em 12/11: decodifica o QR; depois PIX QRCode Tool."
            }
          ]
        },
        {
          "id": "financeiro-02-c2",
          "titulo": "Parsing de Estrutura BR Code (EMV Co)",
          "conceito": "O ecossistema Pix é regido por uma padronização de blocos de texto (BR Code). Ferramentas de decodificação dissecam a linha digitável, isolando matrizes específicas de dados (como as sub-tags sob o ID 26) que contêm as informações vitais da conta mercante.",
          "comoFunciona": "O utilitário processa a linha 'Pix Copia e Cola', destrincha as tags do padrão EMV e converte o bloco de texto ofuscado em um formato estruturado legível.",
          "utilidadeOsint": "Extrai imediatamente a chave Pix, o nome do recebedor (Razão Social ou Nome Físico) e a cidade bancária. Se a chave for 'Aleatória' (EVP), o sistema extrai o seu ID único (UUID), essencial para alimentar futuros pedidos judiciais de quebra de sigilo. Tudo é feito localmente, o que não dispara notificações para a conta do criminoso (garantia de OPSEC).",
          "tools": [
            {
              "id": "PIX QRCode Tool",
              "aplicacao": "Realiza o parsing de códigos baseados no padrão BR Code, isolando e exibindo de forma legível o nome do recebedor, a cidade da conta bancária, o valor estipulado e a chave Pix cadastrada. O uso deste utilitário confere uma OPSEC passiva excelente para o investigador, uma vez que a leitura estática das tags EMV garante que nenhuma transação real seja simulada ou agendada no aplicativo do banco do analista."
            }
          ],
          "regra": {
            "tags": [
              "alvo/pessoa-identidade",
              "alvo/usuario-email",
              "alvo/telefone",
              "alvo/empresa",
              "func/forense-local"
            ],
            "auto": true
          }
        }
      ]
    },
    {
      "num": "03",
      "nome": "Relacionamentos Bancários & Saldos",
      "icone": "🏦",
      "opsec": {
        "nivel": "ativo",
        "nota": "🟢 PASSIVO / 🔴 ATIVO RESTRITO"
      },
      "vetor": "CPF / CNPJ ➔ Instituições Financeiras de Relacionamento / Saldos Esquecidos / Histórico de Crédito",
      "objetivo": "Localizar o capital institucionalizado de um alvo. Auxilia na identificação de contas ocultas que não são movimentadas corriqueiramente e prepara o terreno para as ordens oficiais de quebra de sigilo bancário.",
      "camadas": [
        {
          "id": "financeiro-03-c1",
          "titulo": "Triagem de Ativos Inativos e Contas",
          "conceito": "Uso do barramento de cidadania financeira do Estado para interrogar se um documento possui fundos residuais em bancos ou consórcios.",
          "comoFunciona": "A plataforma interroga de forma passiva as bases do Banco Central para verificar a existência de valores consolidados atrelados ao documento civil ou corporativo.",
          "utilidadeOsint": "Retorna uma resposta binária instantânea ('Possui' ou 'Não Possui'). Ao confirmar que há dinheiro esquecido, o investigador obtém a prova passiva incontestável de que o alvo (empresa de fachada ou pessoa física) possui laços formais com o sistema financeiro nacional.",
          "tools": [
            {
              "id": "Sistema de Valores a Receber - SVR (Banco Central do Brasil)",
              "aplicacao": "Permite, utilizando apenas CPF/CNPJ e data de nascimento/abertura, validar passivamente a existência de recursos parados sob a titularidade do alvo. A consulta pública inicial exibe apenas uma resposta binária informando se o CPF ou CNPJ pesquisado possui ou não valores a receber, servindo como um excelente indicador indireto de contas ativas ou históricas que podem não ter sido mapeadas na triagem inicial."
            }
          ]
        },
        {
          "id": "financeiro-03-c2",
          "titulo": "Inteligência Financeira Estruturada (Relacionamentos)",
          "conceito": "Acesso aos dossiês completos unificados pelo Bacen (Cadastro de Clientes do Sistema Financeiro Nacional – CCS e SCR).",
          "comoFunciona": "O sistema consolida dados enviados por todas as instituições financeiras do país, gerando extratos unificados sobre o relacionamento bancário do indivíduo ou empresa.",
          "utilidadeOsint": "Embora o acesso profundo exija login do titular (Gov.br) ou mandado judicial de quebra de sigilo, a base é a espinha dorsal de relatórios de FININT para elencar onde (quais bancos) estão registradas contas correntes, chaves Pix, dívidas em aberto e faturas de cartão de crédito de um suspeito.",
          "tools": [
            {
              "id": "Registrato (Banco Central do Brasil)",
              "aplicacao": "Atua como o painel central que documenta todo o engajamento econômico, empréstimos e financiamentos atrelados a qualquer pessoa jurídica ou civil no Brasil. Os relatórios gerados (como o CCS e o SCR) são comumente encontrados anexados a processos judiciais de quebra de sigilo bancário, tornando-se artefatos essenciais para análise forense local por parte do investigador quando o acesso legal é concedido aos autos."
            }
          ]
        },
        {
          "id": "financeiro-03-c3",
          "titulo": "Bureaus de Crédito e Restrições Financeiras",
          "conceito": "Consulta em sistemas unificados de proteção de crédito e distribuidores de informações comerciais para auditar o histórico de crédito mencionado no vetor de pivotagem.",
          "comoFunciona": "O analista interroga bureaus comerciais que agregam dados de inadimplência, protestos, score de crédito e localização cadastral para fechar o cerco sobre a saúde financeira do alvo.",
          "utilidadeOsint": "Complementa a análise de relacionamento bancário do Banco Central, revelando não apenas onde o alvo tem conta, mas como ele se comporta perante o mercado privado (inadimplência, calotes e restrições judiciais ativas).",
          "tools": [
            {
              "id": "CCFácil",
              "aplicacao": "Permite auditar a capacidade financeira e o histórico de crédito do alvo (vetor de pivotagem), fornecendo dados sobre registros de inadimplência, dívidas vencidas e pontuação de score de forma estruturada. A ferramenta é altamente eficaz para ajudar a traçar fluxos de ocultação patrimonial ou insolvência forjada."
            }
          ]
        }
      ]
    },
    {
      "num": "04",
      "nome": "Transações Notariais & Atos Jurídicos",
      "icone": "📝",
      "opsec": {
        "nivel": "ativo",
        "nota": "🟡 ATIVO INDIRETO / 🔴 PASSIVO COM TRILHA"
      },
      "vetor": "CPF / CNPJ ➔ Transferências de Patrimônio / Testamentárias / Procuradores Laranjas",
      "objetivo": "Rastrear alienações de bens antes que sejam publicizadas em matrículas imobiliárias, e descobrir a identidade de indivíduos ocultos que detêm procurações e plenos poderes para operar contas bancárias ou empresas em nome do alvo.",
      "camadas": [
        {
          "id": "financeiro-04-c1",
          "titulo": "Centralização de Serviços e Escrituras",
          "conceito": "Acesso ao indexador digital do Colégio Notarial que unifica os atos lavrados em todos os cartórios de notas do país (como a CESDI e a CEP).",
          "comoFunciona": "O sistema centraliza e indexa os dados de atos notariais lavrados em todos os cartórios de notas do território nacional, exigindo identificação do investigador para o acesso ao banco de dados.",
          "utilidadeOsint": "Evidencia táticas avançadas de blindagem patrimonial, como simulações de separação e divórcio, negócios de promessa de compra e venda engavetados e mapeamento da rede de testamentos, essencial para investigações de fraude contra credores.",
          "tools": [
            {
              "id": "CENSEC (Central Notarial de Serviços Eletrônicos Compartilhados)",
              "aplicacao": "⚠️ Testada em 12/11: exige certificado digital ou cadastro."
            }
          ]
        },
        {
          "id": "financeiro-04-c2",
          "titulo": "Registros Imobiliários e Pesquisa de Bens",
          "conceito": "Consulta centralizada a centrais de registro de imóveis para localizar propriedades averbadas e comarcas competentes.",
          "comoFunciona": "Plataformas que unificam o acesso digital aos Cartórios de Registro de Imóveis, permitindo solicitar certidões e pesquisar a existência de bens a partir de um identificador civil ou de coordenadas geográficas.",
          "utilidadeOsint": "Complementa a busca notarial verificando se a escritura pública previamente identificada já foi averbada na matrícula do imóvel. Permite rastrear transações de compra e venda consolidadas e identificar gravames judiciais sobre o patrimônio.",
          "tools": [
            {
              "id": "Registradores - ONR (Operador Nacional do Registro Eletrônico de Imóveis)",
              "aplicacao": "A partir de um CPF ou CNPJ na funcionalidade de 'Pesquisa de Bens', o analista pode mapear propriedades imobiliárias registradas em nome do alvo, identificar transações de compra e venda na matrícula e rastrear garantias reais ou gravames (como penhoras judiciais), sendo crítico para a localização de ativos imobiliários."
            },
            {
              "id": "Mapa do Registro de Imóveis do Brasil",
              "aplicacao": "Atua como um elo entre o espaço físico e o registro legal. A partir de coordenadas geográficas, endereços ou delimitações visuais no mapa, o analista consegue identificar com precisão técnica qual circunscrição imobiliária (cartório específico) é competente por aquela coordenada, facilitando a requisição posterior de matrículas."
            }
          ],
          "regra": {
            "tags": [
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
          "id": "financeiro-04-c3",
          "titulo": "Publicidade de Atos Civis e Protestos Notariais",
          "conceito": "Pesquisa em centrais de registro civil e cartórios de protesto para identificar alterações no estado civil e certificar a inadimplência formal.",
          "comoFunciona": "Os sistemas indexam de forma pública os editais de casamentos (proclamas) e consolidam títulos protestados, permitindo buscas em âmbito nacional ou estadual a partir dos dados de qualificação do alvo.",
          "utilidadeOsint": "Auxilia na descoberta de cônjuges (que frequentemente atuam como laranjas familiares no recebimento de bens transferidos) e revela o estado de insolvência ou dívidas ativas formalizadas em cartório contra o investigado.",
          "tools": [
            {
              "id": "Consulta de Protesto - CENPROT-SP",
              "aplicacao": "⚠️ Testada em 12/11: antirrobô bloqueia automação; usar navegador comum."
            },
            {
              "id": "Portal e-Proclamas",
              "aplicacao": "Ideal para a fase de estruturação e triangulação de vínculos familiares, ajudando a confirmar o estado civil iminente ou consolidado, identificar nomes de cônjuges, testemunhas, e revelar sobrenomes de casados ou potenciais endereços de residência associados aos nubentes informados nos editais cartorários."
            },
            {
              "id": "Central Nacional de Serviços Compartilhados dos Protestos (Pesquisa Protesto)",
              "aplicacao": "Atua como uma ferramenta fundamental para analisar o histórico de inadimplência e a saúde financeira de indivíduos e organizações. A busca indicativa inicial retorna de forma gratuita a existência de protestos em âmbito nacional e o cartório de origem, fornecendo indicativos imediatos de insolvência."
            }
          ],
          "regra": {
            "tags": [
              "alvo/pessoa-identidade",
              "fonte/registros-publicos-gov",
              "func/busca-identificacao"
            ],
            "auto": true
          }
        }
      ]
    },
    {
      "num": "05",
      "nome": "Dívidas, Protestos & Execuções Fiscais",
      "icone": "📉",
      "opsec": {
        "nivel": "passivo",
        "nota": "🟢 PASSIVO"
      },
      "vetor": "CPF / CNPJ ➔ Títulos em Cartório / Dívida Ativa da União / Processos Trabalhistas",
      "objetivo": "Fazer um Due Diligence e Background Check de passivos do alvo, avaliando seu score, idoneidade corporativa, grau de insolvência real ou o uso de empresas para acumular calotes milionários de má-fé.",
      "camadas": [
        {
          "id": "financeiro-05-c1",
          "titulo": "Mapeamento de Protestos e Títulos Notariais",
          "conceito": "Varredura nas centrais compartilhadas de tabelionatos de protesto para reportar pendências financeiras registradas contra o CPF ou CNPJ.",
          "comoFunciona": "A plataforma realiza uma consulta unificada em cartórios de protestos para checar a regularidade financeira e títulos pendentes em âmbito nacional e estadual.",
          "utilidadeOsint": "Sinalizador tático rápido: uma empresa atolada em protestos em dezenas de cartórios demonstra risco contumaz de mercado ou a iminência de um fechamento fraudulento.",
          "tools": [
            {
              "id": "Consulta de Protesto - CENPROT-SP",
              "aplicacao": "⚠️ Testada em 12/11: antirrobô bloqueia automação; usar navegador comum."
            },
            {
              "id": "Central Nacional de Serviços Compartilhados dos Protestos (Pesquisa Protesto)",
              "aplicacao": "Atua como uma ferramenta fundamental para analisar o histórico de inadimplência e a saúde financeira de indivíduos e organizações. A busca indicativa inicial retorna de forma gratuita a existência de protestos em âmbito nacional e o cartório de origem, fornecendo indicativos imediatos de insolvência."
            }
          ],
          "regra": {
            "tags": [
              "alvo/pessoa-identidade",
              "alvo/empresa",
              "fonte/registros-publicos-gov",
              "func/busca-identificacao"
            ],
            "auto": true
          }
        },
        {
          "id": "financeiro-05-c2",
          "titulo": "Execuções e Regularidade Governamental",
          "conceito": "Sistemas que consolidam os processos de cobrança onde o próprio Estado figura como cobrador do investigado (Dívidas Fiscais, Multas e FGTS).",
          "comoFunciona": "O investigador realiza consultas e extrações em portais de devedores da União para identificar a existência e o montante de tributos sonegados ou não pagos.",
          "utilidadeOsint": "Uma certidão positiva (ou negada) denuncia passivos estruturais gigantescos contra a União, servindo como forte indício ou prova material em crimes de sonegação, fraude fiscal e lavagem de dinheiro.",
          "tools": [
            {
              "id": "REGULARIZE (Procuradoria-Geral da Fazenda Nacional - PGFN)",
              "aplicacao": "A identificação de inscrições em dívida ativa permite rastrear o histórico de inadimplência fiscal com o Estado, mensurar o passivo financeiro acumulado por empresas ou indivíduos e identificar processos de execução fiscal em andamento."
            },
            {
              "id": "Consultas de Certidão PGFN/RFB (Pessoa Física)",
              "aplicacao": "A emissão bem-sucedida ou a rejeição da certidão serve como um indicativo técnico de alta confiabilidade sobre a existência de execuções fiscais, insolvência e litígios financeiros volumosos contra o Estado."
            },
            {
              "id": "Dados Abertos da Dívida Ativa da União (PGFN)",
              "aplicacao": "Permite ao analista de inteligência baixar massivamente as planilhas de devedores para identificar passivos financeiros maciços de forma passiva, rastrear situações de insolvência ou fraude fiscal, e cruzar os dados extraídos localmente com outras bases societárias no computador da investigação."
            }
          ],
          "regra": {
            "tags": [
              "alvo/pessoa-identidade",
              "fonte/registros-publicos-gov"
            ],
            "auto": true
          },
          "excluir": [
            "Certidão de Feitos Trabalhistas (TRT-3)"
          ]
        },
        {
          "id": "financeiro-05-c3",
          "titulo": "Passivos Trabalhistas e Certidões do Judiciário",
          "conceito": "Verificação de litígios, processos e execuções na Justiça do Trabalho vinculados ao CPF ou CNPJ do investigado.",
          "comoFunciona": "A plataforma interroga os bancos nacionais e regionais de devedores trabalhistas para atestar a existência de sentenças condenatórias não pagas ou acordos judiciais descumpridos.",
          "utilidadeOsint": "Identifica de imediato se o alvo corporativo negligencia deveres fundamentais de mercado (indicativo primário de quebra fraudulenta) ou evidencia que um indivíduo acumula dívidas trabalhistas graves passíveis de execução forçada.",
          "tools": [
            {
              "id": "Certidão de Débitos Trabalhistas (TST - CNDT)",
              "aplicacao": "A constatação de uma certidão positiva ou a inserção do alvo no BNDT funciona como um indicador técnico de alta fidelidade sobre a existência de passivos jurídicos sufocantes, insolvência iminente e tentativas latentes de ocultação ou dilapidação de patrimônio para evasão de obrigações legais."
            }
          ],
          "regra": {
            "tags": [
              "alvo/pessoa-identidade",
              "alvo/empresa",
              "fonte/registros-publicos-gov",
              "func/validacao-status"
            ],
            "auto": true
          },
          "excluir": [
            "Certidão de Feitos Trabalhistas (TRT-3)"
          ]
        }
      ]
    },
    {
      "num": "06",
      "nome": "Financiamento Político & Dados Abertos",
      "icone": "🗳️",
      "opsec": {
        "nivel": "passivo",
        "nota": "🟢 PASSIVO"
      },
      "vetor": "CNPJ / CPF ➔ Doações Eleitorais / Repasses Governamentais / Candidatos Favorecidos",
      "objetivo": "Rastrear a conexão entre o capital privado (do alvo investigado) e a administração pública (Pessoas Politicamente Expostas - PEPs). Útil para mapear pagamentos por \"favores\", corrupção sistêmica e identificar quem se beneficiou de fraudes licitatórias.",
      "camadas": [
        {
          "id": "financeiro-06-c1",
          "titulo": "Transparência e Empenhos Governamentais",
          "conceito": "Agregadores orçamentários da Controladoria-Geral da União e tribunais de contas que disponibilizam, no detalhe, cada nota emitida pelo governo pagando por serviços.",
          "comoFunciona": "O investigador realiza consultas diretas em portais de transparência ativos informando o CPF ou CNPJ do alvo para levantar histórico de contratos, salários ou auxílios recebidos do erário.",
          "utilidadeOsint": "Permite ver o fluxo real do dinheiro saindo dos cofres públicos para a empresa (Pessoa Jurídica) ou os vínculos de benefícios e remuneração de um indivíduo (Pessoa Física), validando a dependência do alvo perante o erário.",
          "tools": [
            {
              "id": "Portal da Transparência (Pessoa Física)",
              "aplicacao": "✅ Testada em 12/11: vínculos com o Governo Federal por nome, CPF ou NIS."
            },
            {
              "id": "Portal da Transparência (Pessoa Jurídica)",
              "aplicacao": "Consolida em um único perfil o recebimento de recursos federais, contratos ativos ou encerrados firmados com ministérios e autarquias, além de registros de penalidades vigentes (como impedimentos de licitar ou declarações de inidoneidade)."
            }
          ],
          "regra": {
            "tags": [
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
          "id": "financeiro-06-c2",
          "titulo": "Raspagem Massiva e Dados Abertos (Big Data OSINT)",
          "conceito": "Extração massiva e download de bases de dados abertas governamentais para cruzamentos locais e mineração offline.",
          "comoFunciona": "Em vez de realizar consultas individuais em interfaces web, o analista faz o download de arquivos consolidados (CSV, JSON, XML) contendo tabelas massivas de orçamento público, saúde e transportes.",
          "utilidadeOsint": "Viabiliza a criação de ecossistemas locais de investigação. A base tratada no computador do investigador permite a auditoria passiva em milhões de linhas simultaneamente, expondo consórcios recorrentes, dependências econômicas e redes de fraudes sem gerar logs nos servidores do Estado.",
          "tools": [
            {
              "id": "Conjunto de Dados Abertos (TCE-SP)",
              "aplicacao": "✅ Testada em 12/11: bases em lote dos municípios paulistas."
            },
            {
              "id": "Portal de Dados Abertos do Governo Digital (Gov.br)",
              "aplicacao": "⚠️ Testada em 12/11: índice; dados em dados.gov.br."
            },
            {
              "id": "Portal da Transparência (Download de Dados)",
              "aplicacao": "Permite baixar bases completas de empresas sancionadas (CEIS/CNEP), rastrear de forma massiva quais CPFs ou CNPJs receberam recursos federais e identificar as empresas contratadas por órgãos públicos e seus respectivos fluxos orçamentários."
            }
          ],
          "regra": {
            "tags": [
              "alvo/empresa",
              "fonte/registros-publicos-gov"
            ],
            "auto": true
          },
          "excluir": [
            "Certidão de Feitos Trabalhistas (TRT-3)",
            "Consulta de Frota Geral - ANTAQ",
            "Consulta de Embarcações - ANTAQ"
          ]
        },
        {
          "id": "financeiro-06-c3",
          "titulo": "Inteligência Eleitoral e Caixa de Campanha",
          "conceito": "Plataformas da Justiça Eleitoral que tornam obrigatória e transparente a prestação de contas de todos que pleiteiam cargos no Estado.",
          "comoFunciona": "Os portais processam dados inseridos por comitês de campanha e partidos, exibindo aos cidadãos as receitas, despesas, listagens de fornecedores de materiais gráficos, doadores físicos e declarações de bens.",
          "utilidadeOsint": "Viabiliza a criação de séries históricas de evolução patrimonial declarada por candidatos, o mapeamento de Pessoas Politicamente Expostas (PEPs) e a visualização da \"teia\" financeira e partidária que sinaliza esquemas ou empresas fantasmas no pleito.",
          "tools": [
            {
              "id": "DivulgaCandContas",
              "aplicacao": "Visualização individual para investigar os bens de candidatos. Permite identificar vínculos familiares, evolução patrimonial histórica e redes de influência por meio do cruzamento de doadores e fornecedores de campanha de forma retroativa."
            },
            {
              "id": "Portal de Dados Abertos do TSE",
              "aplicacao": "Extração dos datasets totais para construir cruzamentos e grafos relacionais (em SQL/Python) offline. Ajuda a expor possíveis esquemas de lavagem de dinheiro ao correlacionar empresas prestadoras de serviços (CNPJs) com repasses de campanha."
            },
            {
              "id": "Certidão de Filiação Partidária - TSE (Filia Consulta)",
              "aplicacao": "Permite mapear o posicionamento ideológico formal de um alvo e descobrir seu envolvimento com partidos políticos. Vital no levantamento de Pessoas Politicamente Expostas (PEPs) para identificar possíveis conflitos de interesse em licitações e contratações públicas."
            }
          ],
          "regra": {
            "tags": [
              "alvo/pessoa-identidade",
              "fonte/registros-publicos-gov"
            ],
            "auto": true
          },
          "excluir": [
            "Certidão de Feitos Trabalhistas (TRT-3)"
          ]
        }
      ]
    }
  ]
});
