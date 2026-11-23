// Pivotagem v2. Edite com cuidado.
// tools: "ID do catálogo" | {id, aplicacao?, opsec?, alerta?} | {nome,url,aplicacao,externo:true}
// regra.tags: mostra também outras ferramentas do catálogo com TODAS essas tags.
// module.icone: emoji do diagrama do topo (livre para trocar).
registerPivot({
  "id": "cnpj",
  "categoria": "empresas",
  "tipo": "alvo",
  "icone": "🏢",
  "titulo": "Investigação Corporativa (CNPJ)",
  "subtitulo": "// Roteiro metodológico para validação, mapeamento de contratos, compliance, infraestrutura e rastreio patrimonial.",
  "modulos": [
    {
      "num": "01",
      "nome": "Dados Cadastrais & QSA",
      "icone": "📋",
      "opsec": {
        "nivel": "passivo",
        "nota": "🟢 PASSIVO"
      },
      "vetor": "CNPJ ➔ Razão Social / Endereço / CNAE / Quadro de Sócios (QSA) / Capital Social",
      "objetivo": "Confirmar a existência legal e o status operacional da empresa, mapeando o controle societário para descobrir vínculos iniciais com pessoas físicas ou outras entidades e revelar o seu endereço físico e escopo legal de atuação.",
      "camadas": [
        {
          "id": "cnpj-01-c1",
          "titulo": "Consulta Governamental e Bases Oficiais",
          "conceito": "Busca direta nos bancos de dados oficiais do Estado para atestar a regularidade e extrair os dados constitutivos originais da empresa.",
          "comoFunciona": "O investigador insere o CNPJ nos portais governamentais para emitir o comprovante de situação cadastral e visualizar o QSA, validando o endereço e o ramo de atuação declarado.",
          "utilidadeOsint": "Serve como a validação inicial de toda a investigação corporativa ( _Due Diligence_ ). Permite confirmar endereços registrados para _footprinting_ físico e revelar quem são os verdadeiros donos por trás da entidade.",
          "tools": [
            {
              "id": "Consulta de CNPJ - Secretaria da Receita Federal do Brasil",
              "aplicacao": "✅ Testada em 03/11: fonte primária, com captcha a cada consulta e sem QSA. Para volume, usar ReceitaWS ou Minha Receita."
            },
            {
              "id": "e-Simples Auditoria - Consulta CNPJ",
              "aplicacao": "✅ Testada em 03/11: cartão CNPJ + QSA com data de entrada dos sócios, sem captcha visível."
            },
            {
              "id": "Consulta de CCMEI - Receita Federal",
              "aplicacao": "⚠️ Testada em 03/11: agora exige login gov.br; para saber se é MEI, usar o campo simei da ReceitaWS."
            },
            {
              "id": "REDESIM (Rede Nacional para a Simplificação do Registro e da Legalização de Empresas e Negócios)",
              "aplicacao": "⚠️ Testada em 03/11: índice de serviços; útil para checar a autenticidade de um comprovante."
            },
            {
              "id": "Dados Abertos da Receita Federal do Brasil",
              "aplicacao": "⚠️ Testada em 03/11: base mensal de cerca de 5,6 GB, para cruzamento em lote; os arquivos mudaram de endereço (ver notas da ferramenta)."
            },
            {
              "id": "JUCESP - Busca Avançada",
              "aplicacao": "⚠️ Testada em 03/11: só SP: busca simples e ficha resumida gratuitas; ficha completa exige gov.br."
            },
            {
              "id": "Portal da Nota Fiscal Eletrônica (Consulta NF-e)",
              "aplicacao": "⚠️ Testada em 03/11: exige a chave de 44 dígitos de uma nota; não testada."
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
          "id": "cnpj-01-c2",
          "titulo": "Agregação e Mapeamento de Vínculos",
          "conceito": "Uso de APIs e plataformas que espelham dados públicos, estruturando-os graficamente (Grafos) ou em linguagem programática (JSON).",
          "comoFunciona": "Em vez de resolver CAPTCHAs a cada busca, essas plataformas varrem suas próprias bases de dados pré-compiladas do governo para fornecer respostas estruturadas ou desenhar a teia societária.",
          "utilidadeOsint": "Essencial para acelerar a análise de redes ( _Link Analysis_ ). Permite descobrir instantaneamente se o sócio 'A' do 'CNPJ 1' também possui participações ocultas no 'CNPJ 2' e 'CNPJ 3', caracterizando um grupo econômico.",
          "tools": [
            {
              "id": "ReceitaWS",
              "aplicacao": "✅ Testada em 03/11: API sem captcha, com QSA e capital social (3 consultas por minuto)."
            },
            {
              "id": "ICIJ Offshore Leaks Database",
              "aplicacao": "✅ Testada em 03/11: buscar pela razão social e pelos sócios do QSA; número de CNPJ não retorna."
            },
            {
              "id": "Rede CNPJ",
              "aplicacao": "⚠️ Testada em 03/11: online paga; a demo gratuita (redecnpj.com.br/demo/) ainda desenha o grafo de empresas ligadas, sem nome completo de sócio."
            },
            {
              "id": "Brasil.io",
              "aplicacao": "⚠️ Testada em 03/11: exige conta e token de API; não testado logado."
            },
            {
              "id": "CCFácil",
              "aplicacao": "⚠️ Testada em 03/11: paga (Serasa); não testada."
            },
            {
              "id": "OpenCorporates",
              "aplicacao": "⚠️ Testada em 03/11: útil para filiais em outros países; diretores só com login."
            },
            {
              "id": "Crunchbase",
              "aplicacao": "⚠️ Testada em 03/11: por nome; acrescenta pouco além de executivos em empresa tradicional."
            },
            {
              "id": "Minha Receita",
              "aplicacao": "Solução web e API de código aberto (_open-source_) que consome, trata e indexa dados brutos disponibilizados pela Receita Federal, permitindo buscas rápidas de CNPJs e QSA sem a necessidade de preenchimento de captchas."
            }
          ],
          "regra": {
            "tags": [
              "alvo/empresa"
            ],
            "auto": true
          },
          "excluir": [
            "Certidão de Feitos Trabalhistas (TRT-3)",
            "Consulta de Frota Geral - ANTAQ",
            "Consulta de Embarcações - ANTAQ"
          ]
        }
      ]
    },
    {
      "num": "02",
      "nome": "Contratos Públicos & Licitações",
      "icone": "🏛️",
      "opsec": {
        "nivel": "passivo",
        "nota": "🟢 PASSIVO"
      },
      "vetor": "CNPJ ➔ Repasses / Contratos Governamentais / Empenhos / Diários Oficiais",
      "objetivo": "Rastrear o fluxo financeiro ('_Follow the money_') entre o ente privado e a administração pública, identificando dependência econômica do erário, superfaturamentos ou fraudes licitatórias.",
      "camadas": [
        {
          "id": "cnpj-02-c1",
          "titulo": "Rastreio de Fluxos Financeiros (Erário)",
          "conceito": "Auditoria de portais de dados abertos que consolidam despesas, empenhos e ordens de pagamento governamentais vinculadas a fornecedores.",
          "comoFunciona": "A partir do CNPJ, o sistema consolida o histórico de todas as licitações vencidas, convênios celebrados e quantias efetivamente transferidas pelas esferas do governo para as contas da pessoa jurídica.",
          "utilidadeOsint": "Indispensável para auditar o fluxo financeiro público direcionado a empresas, identificar consórcios recorrentes e analisar esquemas de corrupção ou favorecimento ilícito.",
          "tools": [
            {
              "id": "Portal da Transparência (Pessoa Jurídica)",
              "aplicacao": "✅ Testada em 03/11: /pessoa-juridica/{cnpj}: contratos, licitações, convênios e recursos federais, sem chave de API."
            },
            {
              "id": "Portal da Transparência (Download de Dados)",
              "aplicacao": "✅ Testada em 03/11: bases em lote (CEIS/CNEP, contratos); usar a data listada na página."
            },
            {
              "id": "Portal da Transparência do TCE-SP",
              "aplicacao": "✅ Testada em 03/11: empenhos em municípios paulistas; aceita CPF parcial."
            },
            {
              "id": "Despesas por Fornecedor (TCE-SP)",
              "aplicacao": "✅ Testada em 03/11: empenhos por município, órgão e mês, com valor."
            },
            {
              "nome": "Portais Transparências Municipais e Estaduais",
              "url": "#",
              "aplicacao": "É o canal oficial de busca unificada voltado ao levantamento de dados econômicos, contratuais e correcionais de empresas que interagem com a Administração Pública. ",
              "externo": true
            }
          ],
          "regra": {
            "tags": [
              "alvo/empresa",
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
          "id": "cnpj-02-c2",
          "titulo": "Inteligência em Diários Oficiais e Política",
          "conceito": "Uso de raspagem automatizada ( Scraping ) e indexação por Inteligência Artificial em publicações de diários oficiais e do sistema eleitoral.",
          "comoFunciona": "Plataformas transformam PDFs governamentais não estruturados em texto pesquisável ou disponibilizam declarações de campanha associando empresas aos seus favorecidos.",
          "utilidadeOsint": "Rastreia a evolução temporal de um contrato, aditivos e descobre doações a Campanhas Eleitorais (Políticos/PEPs).",
          "tools": [
            {
              "id": "DivulgaCandContas",
              "aplicacao": "✅ Testada em 03/11: Doadores e Fornecedores: CPF/CNPJ → ligação com campanhas. Escolher a eleição certa."
            },
            {
              "id": "Portal de Dados Abertos do TSE",
              "aplicacao": "✅ Testada em 03/11: cruzamento em lote; para consulta pontual, DivulgaCandContas."
            },
            {
              "id": "Escavador",
              "aplicacao": "⚠️ Testada em 03/11: muito lento; buscar por nome, atento às variações de grafia."
            },
            {
              "id": "Aleph (OCCRP)",
              "aplicacao": "⚠️ Testada em 03/11: exige conta; não testado logado."
            },
            {
              "id": "Querido Diário",
              "aplicacao": "Projeto que utiliza inteligência artificial e raspagem para centralizar e indexar os Diários Oficiais dos municípios brasileiros. Permite buscas textuais por CNPJs para rastrear contratos públicos e licitações diretamente nas publicações oficiais, superando a barreira histórica da fragmentação dos portais de prefeituras locais."
            }
          ]
        }
      ]
    },
    {
      "num": "03",
      "nome": "Compliance, Sanções & Passivos",
      "icone": "⚖️",
      "opsec": {
        "nivel": "passivo",
        "nota": "🟢 PASSIVO"
      },
      "vetor": "CNPJ ➔ Dívida Ativa / Inidoneidade / Litígios Trabalhistas / Protestos",
      "objetivo": "Avaliar a idoneidade corporativa, rastrear a insolvência e mapear litígios, dívidas ou sanções ativas que representem riscos institucionais.",
      "camadas": [
        {
          "id": "cnpj-03-c1",
          "titulo": "Dívida Ativa e Regularidade Jurídica",
          "conceito": "Consulta de irregularidades perante as secretarias de fazenda e registro de impedimentos para licitar com a administração pública.",
          "comoFunciona": "Sistemas governamentais buscam inscrições do CNPJ em dívida ativa e no banco de punições por improbidade ou infrações em processos licitatórios.",
          "utilidadeOsint": "Permite constatar de forma célere se a organização possui má conduta administrativa grave, insolvência fiscal ou impedimentos legais vigentes.",
          "tools": [
            {
              "id": "REGULARIZE (Procuradoria-Geral da Fazenda Nacional - PGFN)",
              "aplicacao": "✅ Testada em 03/11: usar a Dívida Aberta (dividaaberta.pgfn.gov.br): dívida ativa por CPF/CNPJ ou nome. Não prova que o CNPJ existe."
            },
            {
              "id": "Cadastro Nacional de Condenações Cíveis por Ato de Improbidade Administrativa e Inelegibilidade (CNCIAI) - CNJ",
              "aplicacao": "✅ Testada em 03/11: sem captcha; por nome, confirmar homônimo pelo número do processo."
            },
            {
              "id": "Dados Abertos da Dívida Ativa da União (PGFN)",
              "aplicacao": "✅ Testada em 03/11: base trimestral para cruzamento em lote."
            },
            {
              "id": "SICAFI - Módulo Externo (IBAMA)",
              "aplicacao": "✅ Testada em 03/11: a certidão revela em quais UFs há débito ambiental."
            }
          ],
          "regra": {
            "tags": [
              "alvo/empresa",
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
          "id": "cnpj-03-c2",
          "titulo": "Inadimplência Notarial, Litígios e Reputação de Consumo",
          "conceito": "Pesquisas em centrais notariais (cartórios de protesto), processos judiciais e agregadores de comportamento de consumo para auditar a reputação comercial e passivos ocultos.",
          "comoFunciona": "A busca consolidada levanta títulos protestados nacionalmente, agrega reclamações não resolvidas, litígios cíveis/trabalhistas e métricas de insatisfação abertas na web.",
          "utilidadeOsint": "Mapeia gargalos da operação real, identifica se a empresa acumula dívidas mercantis de curto prazo, confirma nomes fantasia ou diretores listados em respostas a clientes e expõe redes focadas em golpes de varejo.",
          "tools": [
            {
              "id": "Reclame Aqui",
              "aplicacao": "✅ Testada em 03/11: por nome: reputação e padrão de reclamações; CNPJ não retorna."
            },
            {
              "id": "Getúlio AI",
              "aplicacao": "✅ Testada em 03/11: botão Histórico da Empresa dá o total de processos trabalhistas."
            },
            {
              "id": "Central Nacional de Serviços Compartilhados dos Protestos (Pesquisa Protesto)",
              "aplicacao": "⚠️ Testada em 03/11: exige login, que vincula a consulta ao investigador; bloqueia IP estrangeiro."
            },
            {
              "id": "Escavador",
              "aplicacao": "⚠️ Testada em 03/11: muito lento; buscar por nome, atento às variações de grafia."
            },
            {
              "id": "CCFácil",
              "aplicacao": "⚠️ Testada em 03/11: paga (Serasa); não testada."
            }
          ],
          "regra": {
            "tags": [
              "alvo/empresa",
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
      "num": "04",
      "nome": "Infraestrutura Digital & Web",
      "icone": "🌐",
      "opsec": {
        "nivel": "passivo",
        "nota": "🟢 PASSIVO"
      },
      "vetor": "CNPJ / Razão Social ➔ Domínios Registrados / ASN / E-mails Institucionais / Pilha Tecnológica",
      "objetivo": "Desvendar a presença tecnológica e propriedades web da empresa, além de rastrear infraestruturas ocultas mantidas pelo grupo corporativo na internet.",
      "camadas": [
        {
          "id": "cnpj-04-c1",
          "titulo": "Resolução de Domínios e Propriedade de TI",
          "conceito": "Consulta ao registro raiz de um domínio e análise de históricos de hospedagem, provedores de internet (ISP) e registros de titularidade reversos.",
          "comoFunciona": "Extrai o responsável legal pelo domínio web corporativo, o servidor apontado e o histórico de alterações em Nameservers e IPs, provendo a arquitetura física da presença da marca na web e revelando propriedades ocultadas.",
          "utilidadeOsint": "Permite correlacionar múltiplos sites a uma única holding, evidenciar a criação de domínios caça-cliques (Typosquatting) vinculados ao CNPJ do fraudador e rastrear a evolução da infraestrutura web ao longo do tempo.",
          "tools": [
            {
              "id": "Registro.br - Ferramenta WHOIS",
              "aplicacao": "✅ Testada em 03/11: domínio .br → CNPJ/CPF do titular; a busca inversa não retorna."
            },
            {
              "id": "DomainTools WHOIS",
              "aplicacao": "✅ Testada em 03/11: co-hospedagem e resumo de histórico; reCAPTCHA."
            },
            {
              "id": "Netcraft Site Report",
              "aplicacao": "✅ Testada em 03/11: certificado com SANs revela domínios irmãos."
            },
            {
              "id": "WhoisFreaks Reverse WHOIS Search",
              "aplicacao": "Ferramenta especializada que inverte a lógica de busca. Em vez de pesquisar um domínio, permite inserir o nome de uma empresa ou e-mail corporativo para descobrir todos os nomes de domínio atualmente ou anteriormente vinculados àquele identificador nos registros WHOIS, contornando mecanismos básicos de privacidade."
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
          "id": "cnpj-04-c2",
          "titulo": "Arquitetura, Certificados e Canais de Comunicação",
          "conceito": "Enumeração dos e-mails oficiais de colaboradores, identificação de servidores, pilhas tecnológicas (stacks) e subdomínios expostos.",
          "comoFunciona": "Scanners de internet agregam os registros corporativos que estão publicamente expostos em indexadores ou rastreadores.",
          "utilidadeOsint": "Fornece insumos humanos e tecnológicos para a engenharia social reversa e mapeamento do perímetro digital e comunicações adotadas pela organização.",
          "tools": [
            {
              "id": "Censys Search",
              "aplicacao": "✅ Testada em 03/11: superfície de infraestrutura pelo domínio; limite diário sem conta."
            },
            {
              "id": "Hunter.io",
              "aplicacao": "Plataforma web projetada para localizar, extrair e verificar endereços de correio eletrônico corporativos vinculados a domínios de organizações. Identifica os padrões de nomenclatura adotados pela empresa (ex: nome.sobrenome@empresa.com.br) e lista profissionais e diretores vinculados, validando a existência das caixas postais sem disparar alertas de leitura."
            },
            {
              "id": "Skymem",
              "aplicacao": "Motor de busca focado na extração e localização de e-mails em fontes abertas. Varre a internet e conteúdos digitais públicos para ajudar a estruturar o banco de dados de contatos de uma organização, identificando padrões de nomenclatura institucionais e revelando novos leads humanos associados a um domínio web."
            },
            {
              "id": "RocketReach",
              "aplicacao": "Plataforma de inteligência de contatos comerciais B2B que indexa milhões de perfis profissionais. É uma adição ideal para correlacionar domínios corporativos a perfis no LinkedIn, mapeando diretamente a estrutura de tomadores de decisão da companhia e levantando números de telefone e e-mails corporativos de nível executivo."
            }
          ]
        }
      ]
    },
    {
      "num": "05",
      "nome": "Regulamentação, Patentes & Setores Específicos",
      "icone": "📜",
      "opsec": {
        "nivel": "passivo",
        "nota": "🟢 PASSIVO"
      },
      "vetor": "CNPJ ➔ Patentes / Autorizações (ANVISA/ANP/ANEEL) / Frotas de Veículos / Aeronaves",
      "objetivo": "Levantar a capacidade intelectual (Patentes), concessões estatais, licenças de operação e ativos logísticos e de transporte associados à pessoa jurídica nos setores regulados.",
      "camadas": [
        {
          "id": "cnpj-05-c1",
          "titulo": "Propriedade Intelectual e Patentes",
          "conceito": "Busca em acervos e diretórios globais ou governamentais por patentes e registros de marcas para avaliar o portfólio tecnológico da empresa.",
          "comoFunciona": "Através do nome da empresa ou de seus inventores associados, os sistemas rastreiam tecnologias patenteadas ou em processo de registro, documentando os escopos técnicos.",
          "utilidadeOsint": "Revela o foco tecnológico, inovações e eventuais subsidiárias por trás da propriedade de ativos intangíveis, além de mapear especialistas e engenheiros da corporação.",
          "tools": [
            {
              "id": "Google Patents",
              "aplicacao": "✅ Testada em 03/11: por nome do titular: patentes, inventores e parceiros."
            },
            {
              "id": "INPI - Busca Avançada de Patentes",
              "aplicacao": "⚠️ Testada em 03/11: estava em manutenção de madrugada; alternativa: Google Patents."
            },
            {
              "id": "INPI - Pesquisa de Marcas por Titular",
              "aplicacao": "⚠️ Testada em 03/11: estava em manutenção de madrugada; retestar."
            }
          ],
          "regra": {
            "tags": [
              "alvo/empresa",
              "alvo/pessoa-identidade",
              "fonte/registros-publicos-gov",
              "func/busca-identificacao"
            ],
            "auto": true
          }
        },
        {
          "id": "cnpj-05-c2",
          "titulo": "Saúde, Energia e Operações Sensíveis",
          "conceito": "Inspeção nos portais das agências de regulação para monitorar Licenças de Operação e Autos de Interdição do CNPJ.",
          "comoFunciona": "O analista consulta a base da agência com a numeração fiscal para auditar se o agente comercial possui a estrutura validada pelo Estado e permissão para extrair recursos ou fornecer bens críticos.",
          "utilidadeOsint": "Identifica empresas de fachada tentando firmar contratos na área de saúde ou energia sem Autorização de Funcionamento válida. É o filtro vital de idoneidade setorial.",
          "tools": [
            {
              "id": "Sistema de Consultas - ANVISA",
              "aplicacao": "✅ Testada em 03/11: CNPJ → autorizações sanitárias; sem resultado, volta muda ao formulário."
            },
            {
              "id": "Sistema de Consulta de Dados Públicos (CDP) - ANP",
              "aplicacao": "✅ Testada em 03/11: postos, distribuidoras e produtores; captcha por busca."
            },
            {
              "id": "Portal de Dados Abertos da ANEEL",
              "aplicacao": "⚠️ Testada em 03/11: dados em lote."
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
          "id": "cnpj-05-c3",
          "titulo": "Fiscalização Ambiental e Recursos Hídricos",
          "conceito": "Cruzamento do CNPJ com as bases de dados de autarquias ambientais para mapear concessões de extração, passivos ecológicos e embargos físicos de áreas de operação.",
          "comoFunciona": "O analista insere os identificadores da empresa nas bases de fiscalização federal para listar multas vigentes, certidões negativas de débito ambiental e a geolocalização de outorgas concedidas.",
          "utilidadeOsint": "Revela plantas físicas e propriedades rurais vinculadas ao grupo econômico. O histórico de infrações atua como forte indicador em auditorias de compliance corporativo e na identificação de infraestruturas operando clandestinamente.",
          "tools": [
            {
              "id": "Painel de Consultas Públicas - IBAMA",
              "aplicacao": "⚠️ Testada em 03/11: índice; a consulta de autos não foi exercitada."
            },
            {
              "id": "ANA (Agência Nacional de Águas e Saneamento Básico)",
              "aplicacao": "⚠️ Testada em 03/11: página institucional, sem consulta por CNPJ."
            },
            {
              "id": "Seção de Acesso à Informação - ICMBio",
              "aplicacao": "⚠️ Testada em 03/11: página institucional, sem consulta por CNPJ."
            }
          ],
          "regra": {
            "tags": [
              "alvo/empresa",
              "alvo/pessoa-identidade",
              "fonte/registros-publicos-gov",
              "func/busca-identificacao"
            ],
            "auto": true
          }
        },
        {
          "id": "cnpj-05-c4",
          "titulo": "Logística, Transportes e Frotas",
          "conceito": "Levantamento das frotas ativas (terrestres e aquaviárias) e controle sobre malhas logísticas essenciais pertencentes ao alvo corporativo.",
          "comoFunciona": "Os portais das agências de transporte (ANTT, ANTAQ, ANAC) são consultados para reverter o CNPJ de uma companhia, extraindo o inventário de veículos, aeronaves e embarcações autorizadas pelo governo federal.",
          "utilidadeOsint": "Desnuda a capacidade logística real de grupos econômicos, viabilizando a identificação de frotas atreladas ao grupo e descobrindo ativos subdeclarados que compõem o patrimônio real.",
          "tools": [
            {
              "id": "Consulta Pública RNTRC - ANTT",
              "aplicacao": "✅ Testada em 03/11: transportador por CPF/CNPJ ou placa; reCAPTCHA."
            },
            {
              "id": "Pesquisa CNPA - ANAC",
              "aplicacao": "✅ Testada em 03/11: CPF/CNPJ → aeronaves, com proprietário e operador."
            },
            {
              "id": "Concessões Ferroviárias - ANTT",
              "aplicacao": "⚠️ Testada em 03/11: informativa; não consulta CNPJ."
            }
          ],
          "regra": {
            "tags": [
              "alvo/empresa",
              "alvo/veiculo",
              "fonte/registros-publicos-gov"
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
      "num": "06",
      "nome": "Patrimônio, Imóveis & Ambiental",
      "icone": "🏞️",
      "opsec": {
        "nivel": "passivo",
        "nota": "🟢 PASSIVO"
      },
      "vetor": "CNPJ ➔ Matrículas de Imóveis / Propriedades Rurais (INCRA) / Embargos e Multas Ambientais (IBAMA)",
      "objetivo": "Correlacionar propriedades físicas imobiliárias e geográficas ao CNPJ, além de identificar passivos ambientais atrelados a esses polígonos territoriais.",
      "camadas": [
        {
          "id": "cnpj-06-c1",
          "titulo": "Auditoria Imobiliária e Gestão Fundiária",
          "conceito": "Mapeamento centralizado de propriedades urbanas e rurais certificadas e vinculadas à pessoa jurídica em sistemas federais e de cartórios.",
          "comoFunciona": "Os portais processam o CNPJ para buscar registros eletrônicos de matrículas de imóveis ou mapas poligonais georreferenciados cadastrados em autarquias como o INCRA.",
          "utilidadeOsint": "Fornece subsídios cartográficos e judiciais que apontam a dimensão das propriedades imobiliárias do alvo e a eventual sobreposição em áreas ilegais (GEOINT).",
          "tools": [
            {
              "id": "Mapa do Registro de Imóveis do Brasil",
              "aplicacao": "✅ Testada em 03/11: endereço → cartório competente; abre na localização do navegador."
            },
            {
              "id": "Registradores - ONR (Operador Nacional do Registro Eletrônico de Imóveis)",
              "aplicacao": "⚠️ Testada em 03/11: exige login; matrícula e certidão são pagas."
            },
            {
              "id": "SIGEF - Consulta de Parcelas (INCRA)",
              "aplicacao": "⚠️ Testada em 03/11: consulta não exposta sem login; usar a camada do Mapa ONR."
            },
            {
              "id": "SNCR - Sistema Nacional de Cadastro Rural (Consulta Pública)",
              "aplicacao": "⚠️ Testada em 03/11: lista imóveis do município com titular mascarado; não busca por documento."
            },
            {
              "id": "IAGRO - Consulta de Ficha Sanitária Animal",
              "aplicacao": "⚠️ Testada em 03/11: só MS; sem controle positivo confirmado."
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
          "id": "cnpj-06-c2",
          "titulo": "Conformidade e Fiscalização Ambiental",
          "conceito": "Investigação da governança e sustentabilidade (ESG) do alvo, visando multas, proibições de atuação e embargos territoriais promovidos por órgãos ambientais.",
          "comoFunciona": "Consultas públicas contra os registros dos institutos de proteção emitem certidões de irregularidades e mapeiam sanções sobre as infraestruturas geridas pela empresa.",
          "utilidadeOsint": "Revela severas restrições comerciais ou áreas do alvo proibidas de uso agropecuário devido a crimes de desmatamento.",
          "tools": [
            {
              "id": "SICAFI - Módulo Externo (IBAMA)",
              "aplicacao": "✅ Testada em 03/11: a certidão revela em quais UFs há débito ambiental."
            },
            {
              "id": "Painel de Consultas Públicas - IBAMA",
              "aplicacao": "⚠️ Testada em 03/11: índice; a consulta de autos não foi exercitada."
            },
            {
              "id": "Seção de Acesso à Informação - ICMBio",
              "aplicacao": "⚠️ Testada em 03/11: página institucional, sem consulta por CNPJ."
            }
          ],
          "regra": {
            "tags": [
              "alvo/empresa",
              "alvo/pessoa-identidade",
              "fonte/registros-publicos-gov",
              "func/busca-identificacao"
            ],
            "auto": true
          }
        }
      ]
    }
  ]
});
