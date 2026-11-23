// Pivotagem v2. Edite com cuidado.
// tools: "ID do catálogo" | {id, aplicacao?, opsec?, alerta?} | {nome,url,aplicacao,externo:true}
// regra.tags: mostra também outras ferramentas do catálogo com TODAS essas tags.
// module.icone: emoji do diagrama do topo (livre para trocar).
registerPivot({
  "id": "cpf",
  "categoria": "pessoas",
  "tipo": "alvo",
  "icone": "👤",
  "titulo": "Investigação de Pessoas Físicas (CPF)",
  "subtitulo": "// Roteiro metodológico para qualificação civil, levantamento patrimonial, histórico judicial e pegada digital.",
  "modulos": [
    {
      "num": "01",
      "nome": "Validação Cadastral & Status Civil",
      "icone": "🪪",
      "opsec": {
        "nivel": "passivo",
        "nota": "🟢 PASSIVO"
      },
      "vetor": "CPF ➔ Nome Completo / Data de Nascimento / Filiação / Situação Fiscal / Óbito",
      "objetivo": "Confirmar a existência e a regularidade civil do indivíduo perante o Estado, validando dados biográficos primários e identificando indícios de óbito ou fraude de identidade.",
      "camadas": [
        {
          "id": "cpf-01-c1",
          "titulo": "Certificação Oficial de Identidade",
          "conceito": "Cruzamento direto nas bases primárias do Estado para extrair dados biográficos absolutos.",
          "comoFunciona": "Injeta-se o CPF nos sistemas de validação. Caso a data de nascimento ou nome da mãe informados sejam incorretos, o sistema recusa a emissão de certidões, o que funciona indiretamente como um validador 'Verdadeiro/Falso' para os dados que o investigador tem em mãos.",
          "utilidadeOsint": "Mitiga riscos de homonímia e falsidade ideológica, confirmando que os dados investigados correspondem legalmente ao alvo.",
          "tools": [
            {
              "id": "Consulta de CPF - Secretaria da Receita Federal do Brasil",
              "aplicacao": "✅ Testada em 08/11: confirma situação e nome, mas exige a data de nascimento correta."
            },
            {
              "id": "Certidão de Quitação Eleitoral (TSE)",
              "aplicacao": "✅ Testada em 08/11: dentro do Autoatendimento Eleitoral; pede dados que só o titular costuma ter."
            },
            {
              "id": "Consulta de Restituição IRPF - Receita Federal",
              "aplicacao": "✅ Testada em 08/11: exige CPF e data de nascimento corretos."
            },
            {
              "id": "Situação Cadastral",
              "aplicacao": "⚠️ Testada em 08/11: não oficial e põe o documento na URL; evitar em alvo real."
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
          "id": "cpf-01-c2",
          "titulo": "Rastreio de Óbitos e Identidades \"Fantasmas\"",
          "conceito": "Busca em sistemas funerários, cartórios e bases da fazenda para desmascarar perfis falsos construídos com CPFs de pessoas já falecidas (fraude de 'laranjas mortos').",
          "comoFunciona": "Busca em sistemas funerários, cartórios e bases da fazenda para identificar perfis falsos baseados em documentos de cidadãos falecidos.",
          "utilidadeOsint": "Fundamental para validar o encerramento do ciclo vital de um alvo ou evidenciar problemas que sugiram ocultação de bens, insolvência ou esquemas de laranjas.",
          "tools": [
            {
              "id": "Falecidos no Brasil",
              "aplicacao": "⚠️ Testada em 08/11: só nome e data, com risco de homônimo; confirmar em cartório."
            },
            {
              "id": "Cadastro da Nota Fiscal Paulista (Consulta/Solicitação CPF)",
              "aplicacao": "⚠️ Testada em 08/11: agora exige gov.br prata ou ouro."
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
          "id": "cpf-01-c3",
          "titulo": "Evolução do Estado Civil e Vínculos Oficiais",
          "conceito": "Busca de atos de natureza civil e política para qualificar o estado civil histórico do alvo, mudanças de sobrenomes e vínculos formais com agremiações.",
          "comoFunciona": "O analista consulta repositórios notariais e da Justiça Eleitoral para identificar intenções de casamento, cônjuges e filiações ativas no histórico do investigado.",
          "utilidadeOsint": "Permite revelar sobrenomes de casados ou solteiros, potenciais endereços de residência e identificar vínculos políticos ou ideológicos.",
          "tools": [
            {
              "id": "Portal e-Proclamas",
              "aplicacao": "⚠️ Testada em 08/11: busca por cônjuge não confirmada no teste; retestar à mão."
            },
            {
              "id": "Certidão de Filiação Partidária - TSE (Filia Consulta)",
              "aplicacao": "⚠️ Testada em 08/11: estava fora do ar (503) no teste."
            },
            {
              "id": "MyHeritage",
              "aplicacao": "⚠️ Testada em 08/11: exige cadastro com dados familiares; não testada."
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
        },
        {
          "id": "cpf-01-n1",
          "titulo": "Conselhos Profissionais e Vínculos Acadêmicos",
          "tools": [
            {
              "id": "Busca Médicos - CFM",
              "aplicacao": "✅ Testada em 08/11: por nome e UF: registro profissional do médico."
            },
            {
              "id": "Consulta de Médicos (RMS) - Programa Mais Médicos",
              "aplicacao": "✅ Testada em 08/11: só médicos do programa."
            },
            {
              "id": "Cadastro Nacional dos Advogados (CNA) - OAB",
              "aplicacao": "✅ Testada em 08/11: por nome e seccional; no máximo 10 resultados."
            },
            {
              "id": "Consulta de Profissionais - CONFEA",
              "aplicacao": "✅ Testada em 08/11: aceita CPF como filtro; reCAPTCHA."
            },
            {
              "id": "Busca Textual CNPq (Plataforma Lattes)",
              "aplicacao": "✅ Testada em 08/11: marcar \"Demais pesquisadores\", senão só aparecem doutores."
            },
            {
              "id": "Consulta de Profissionais - CNES/DATASUS",
              "aplicacao": "⚠️ Testada em 08/11: resultado não confirmado no teste; retestar à mão."
            },
            {
              "id": "Consulta de Inscritos - CFO (Conselho Federal de Odontologia)",
              "aplicacao": "⚠️ Testada em 08/11: endereço novo; resultado não confirmado no teste."
            }
          ],
          "conceito": "Cadastros públicos de conselhos de classe e plataformas acadêmicas.",
          "comoFunciona": "Pesquisa do nome ou registro profissional nos portais dos conselhos e no Lattes.",
          "utilidadeOsint": "Confirma profissão e local de atuação declarados e expõe registros irregulares.",
          "regra": {
            "tags": [
              "fonte/registros-publicos-gov",
              "func/busca-identificacao"
            ]
          },
          "excluir": [
            "Consulta de Frota Geral - ANTAQ",
            "Consulta de Embarcações - ANTAQ"
          ]
        }
      ]
    },
    {
      "num": "02",
      "nome": "Mapeamento Societário & Empresas",
      "icone": "🏢",
      "opsec": {
        "nivel": "passivo",
        "nota": "🟢 PASSIVO"
      },
      "vetor": "CPF ➔ CNPJs (Empresas em Nome) / Quadro de Sócios (QSA) / Endereços Residenciais Ocultos",
      "objetivo": "Descobrir os vínculos comerciais do indivíduo. É a etapa principal para encontrar empresas de fachada, grupos econômicos sob o comando do alvo e puxar o fio para possíveis cúmplices (outros sócios).",
      "camadas": [
        {
          "id": "cpf-02-c1",
          "titulo": "O Fator \"Microempreendedor Individual (MEI)\"",
          "conceito": "Aproveitamento da regra jurídica brasileira que obriga a composição da Razão Social do MEI com o nome civil e CPF do indivíduo.",
          "comoFunciona": "Os sistemas emitem o certificado da condição de microempreendedor do alvo, consolidando em um único relatório dados do negócio e do seu titular único.",
          "utilidadeOsint": "O MEI atua como a ponte perfeita. Muitos alvos utilizam o próprio endereço residencial e o número de celular pessoal ao abrir o CNPJ, dados que não constam numa simples busca de CPF. A consulta permite descobrir de forma inequívoca o CNPJ vinculado a um alvo, ou extrair os dados civis e de localização de um indivíduo a partir do CNPJ da empresa.",
          "tools": [
            {
              "id": "Consulta de CCMEI - Receita Federal",
              "aplicacao": "⚠️ Testada em 03/11: agora exige login gov.br; para saber se é MEI, usar o campo simei da ReceitaWS."
            }
          ]
        },
        {
          "id": "cpf-02-c2",
          "titulo": "Grafos, Teias de Participação e Buscas Avançadas",
          "conceito": "Uso de APIs e plataformas de inteligência corporativa para processar conexões entre o CPF do alvo e milhares de empresas ativas ou baixadas, estruturando a pesquisa de vínculos.",
          "comoFunciona": "A partir de uma entrada simples (como nome empresarial, CPF ou número de CNPJ), as plataformas exibem estruturas corporativas, histórico de QSA e ramificações societárias.",
          "utilidadeOsint": "Essencial para acelerar a análise de redes de vínculos (*Link Analysis*) e o *pivoting*. Permite rastrear o Quadro de Sócios e Administradores (QSA), identificar empresas coligadas por meio de sócios comuns, desvelar empresas de fachada e mapear conglomerados econômicos.",
          "tools": [
            {
              "id": "ReceitaWS",
              "aplicacao": "✅ Testada em 03/11: API sem captcha, com QSA e capital social (3 consultas por minuto)."
            },
            {
              "id": "Rede CNPJ",
              "aplicacao": "⚠️ Testada em 03/11: online paga; a demo gratuita (redecnpj.com.br/demo/) ainda desenha o grafo de empresas ligadas, sem nome completo de sócio."
            },
            {
              "id": "CCFácil",
              "aplicacao": "⚠️ Testada em 03/11: paga (Serasa); não testada."
            },
            {
              "id": "Credilink",
              "aplicacao": "⚠️ Testada em 08/11: paga; não testada."
            },
            {
              "id": "Minha Receita",
              "aplicacao": "Consome, trata e indexa de forma eficiente os dados brutos disponibilizados periodicamente pela Receita Federal do Brasil. Permite identificar a cadeia de comando de uma organização e rastrear múltiplos CNPJs associados a um mesmo grupo econômico através do QSA."
            },
            {
              "id": "Sr. Watson"
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
          "id": "cpf-02-c3",
          "titulo": "Repositórios Massivos e Diários Oficiais",
          "conceito": "Indexação e extração massiva de dados abertos para o cruzamento de informações governamentais, registros corporativos históricos e processos judiciais.",
          "comoFunciona": "Essas plataformas capturam gigabytes de dados públicos fragmentados, incluindo o cadastro completo da Receita Federal e diários oficiais, e os convertem em bases de dados limpas, padronizadas e pesquisáveis.",
          "utilidadeOsint": "Viabiliza a auditoria massiva para inteligência societária. Permite rastrear litígios em andamento ou históricos em diários oficiais que liguem o indivíduo a pessoas jurídicas de forma passiva, além da importação de bases estruturadas de CNPJs para cruzamento local.",
          "tools": [
            {
              "id": "Brasil.io",
              "aplicacao": "⚠️ Testada em 03/11: exige conta e token de API; não testado logado."
            },
            {
              "id": "Querido Diário",
              "aplicacao": "Utiliza inteligência artificial e raspagem de dados para transformar arquivos PDF fechados e imagens escaneadas em texto estruturado e pesquisável. É excelente para localizar o nome completo ou CPF oculto do alvo, rastreando nomeações, contratos e sanções administrativas."
            }
          ],
          "regra": {
            "tags": [
              "alvo/empresa",
              "alvo/pessoa-identidade",
              "fonte/registros-publicos-gov",
              "func/busca-ampla"
            ],
            "auto": true
          }
        }
      ]
    },
    {
      "num": "03",
      "nome": "Registo Judicial, Criminal & Sanções",
      "icone": "⚖️",
      "opsec": {
        "nivel": "passivo",
        "nota": "🟢 PASSIVO"
      },
      "vetor": "CPF/Nome ➔ Processos (Cíveis/Criminais/Trabalhistas) / Mandados de Prisão / Partes Envolvidas",
      "objetivo": "Fazer o \"Background Check\" completo do investigado. Mapear litígios, antecedentes criminais, condenações de improbidade ou se o mesmo figura como procurado da justiça.",
      "camadas": [
        {
          "id": "cpf-03-c1",
          "titulo": "Agregadores de Diários e Litígios",
          "conceito": "Raspagem massiva (scraping) e indexação via Inteligência Artificial de intimações, diários da justiça e andamentos processuais de todo o país.",
          "comoFunciona": "Plataformas capturam gigabytes de dados públicos fragmentados em diários oficiais e bases de tribunais, consolidando-os em dossiês pesquisáveis pelo nome ou CPF do alvo.",
          "utilidadeOsint": "Viabiliza o mapeamento passivo e imediato do histórico de processos judiciais associados ao alvo (cíveis e criminais), além de identificar nomeações, exonerações ou citações em editais.",
          "tools": [
            {
              "id": "Escavador",
              "aplicacao": "⚠️ Testada em 03/11: muito lento; buscar por nome, atento às variações de grafia."
            }
          ]
        },
        {
          "id": "cpf-03-c2",
          "titulo": "Mandados e Restrições Penais/Cíveis",
          "conceito": "Acesso a bancos estatais do Conselho Nacional de Justiça (CNJ).",
          "comoFunciona": "Os portais processam o nome ou CPF do indivíduo nas bases centrais do judiciário para retornar registros de sanções ativas e impedimentos de direitos.",
          "utilidadeOsint": "Fundamental para constatar de forma imediata o status legal do alvo, verificando se ele é foragido da justiça ou se possui condenações que impeçam operações comerciais e políticas.",
          "tools": [
            {
              "id": "Cadastro Nacional de Condenações Cíveis por Ato de Improbidade Administrativa e Inelegibilidade (CNCIAI) - CNJ",
              "aplicacao": "✅ Testada em 03/11: sem captcha; por nome, confirmar homônimo pelo número do processo."
            },
            {
              "id": "Portal BNMP (Banco Nacional de Monitoramento de Prisões)",
              "aplicacao": "⚠️ Testada em 08/11: a validação inicial exigiu celular; não exercitada."
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
        },
        {
          "id": "cpf-03-c3",
          "titulo": "Emissão de Certidões e Regularidade Institucional",
          "conceito": "Consulta em sistemas regionais e de tribunais superiores para a verificação direta de regularidade judicial, trabalhista e eleitoral.",
          "comoFunciona": "Emissão de certidões eletrônicas ('Nada Consta') e verificação de vínculos partidários oficiais junto ao Tribunal Superior Eleitoral e instâncias da Justiça.",
          "utilidadeOsint": "A emissão de certidões atua como um validador de alta confiabilidade para o analista, confirmando a existência de passivos ocultos, execuções ativas ou indicando o alinhamento ideológico/político de agentes e empresários.",
          "tools": [
            {
              "id": "Certidão de Débitos Trabalhistas (TST - CNDT)",
              "aplicacao": "✅ Testada em 08/11: CPF/CNPJ → PDF com os processos trabalhistas com débito; alcance nacional."
            },
            {
              "id": "Central de Certidões Nada Consta (CNC) - TJDFT",
              "aplicacao": "✅ Testada em 08/11: só DF; baixa certidão já emitida, sem captcha."
            },
            {
              "id": "Certidão de Filiação Partidária - TSE (Filia Consulta)",
              "aplicacao": "⚠️ Testada em 08/11: estava fora do ar (503) no teste."
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
    },
    {
      "num": "04",
      "nome": "Inteligência Patrimonial & Bens",
      "icone": "💰",
      "opsec": {
        "nivel": "passivo",
        "nota": "🟢 PASSIVO"
      },
      "vetor": "CPF ➔ Matrículas Rurais e Urbanas / Frota de Veículos / Aviões / Iates / Áreas Desmatadas",
      "objetivo": "Rastrear a evolução patrimonial e identificar a ocultação de riquezas e lavagem de dinheiro, focando em ativos móveis de luxo e registros fundiários.",
      "camadas": [
        {
          "id": "cpf-04-c1",
          "titulo": "Ativos Logísticos e de Alto Valor (VATINT)",
          "conceito": "Acesso a agências reguladoras (ANAC, ANTAQ, DETRANs) para identificar a propriedade de veículos terrestres, aquaviários e aeroespaciais.",
          "comoFunciona": "Consultas em bases estatais ou integradores privados usando identificadores civis (CPF) para retornar matrículas de aviões, embarcações ou registros veiculares.",
          "utilidadeOsint": "Fundamental para auditar o perfil financeiro do alvo, identificar laranjas e comprovar a ocultação de ativos móveis de alto poder aquisitivo não declarados.",
          "tools": [
            {
              "id": "Pesquisa CNPA - ANAC",
              "aplicacao": "✅ Testada em 03/11: CPF/CNPJ → aeronaves, com proprietário e operador."
            },
            {
              "id": "Portal KePlaca",
              "aplicacao": "⚠️ Testada em 08/11: exige a placa; sem controle positivo."
            },
            {
              "id": "Lupa Veicular",
              "aplicacao": "⚠️ Testada em 08/11: segue para pagamento; nenhum dado gratuito visto."
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
            "Consulta de Embarcações - ANTAQ",
            "Consulta de Frota Geral - ANTAQ"
          ]
        },
        {
          "id": "cpf-04-c2",
          "titulo": "Rastreamento e Telemetria de Ativos",
          "conceito": "Uso de plataformas de Inteligência Geoespacial (GEOINT) focadas no monitoramento global em tempo real e histórico de embarcações e aeronaves.",
          "comoFunciona": "A partir das matrículas (prefixos de aeronaves ou números IMO de navios) obtidas na subfase de registro, o investigador rastreia rotas de transporte via sinais AIS e ADS-B.",
          "utilidadeOsint": "Permite documentar deslocamentos de luxo, estabelecer linhas do tempo geográficas precisas e validar álibis, cruzando a propriedade do ativo com as viagens reais do investigado.",
          "tools": [
            {
              "id": "Flightradar24 (flightradar24.com)",
              "aplicacao": "✅ Testada em 08/11: matrícula obtida no CNPA → modelo, operador e voos."
            },
            {
              "id": "MarineTraffic",
              "aplicacao": "✅ Testada em 08/11: exige IMO ou nome do navio; proprietário é pago."
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
          "id": "cpf-04-c3",
          "titulo": "Cartografia e Matrículas de Imóveis",
          "conceito": "Busca consolidada em centrais notariais e repositórios federais para propriedades rurais e urbanas.",
          "comoFunciona": "Os portais processam o CPF para buscar registros eletrônicos de matrículas de imóveis ou mapas poligonais georreferenciados cadastrados em autarquias governamentais.",
          "utilidadeOsint": "Fornece subsídios cartográficos e judiciais que apontam a exata dimensão das propriedades imobiliárias do alvo e eventuais restrições sobre a terra (GEOINT).",
          "tools": [
            {
              "id": "Mapa do Registro de Imóveis do Brasil",
              "aplicacao": "✅ Testada em 03/11: endereço → cartório competente; abre na localização do navegador."
            },
            {
              "id": "Miami-Dade County Property Appraiser - Property Search",
              "aplicacao": "✅ Testada em 08/11: por proprietário: imóveis em Miami-Dade; busca aproximada."
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
        }
      ]
    },
    {
      "num": "05",
      "nome": "Histórico Financeiro, Dívidas & Fiscal",
      "icone": "📉",
      "opsec": {
        "nivel": "passivo",
        "nota": "🟢 PASSIVO"
      },
      "vetor": "CPF ➔ Títulos Protestados / Dívida Ativa / Relacionamentos Bancários / Ações Trabalhistas",
      "objetivo": "Auditar a saúde financeira (Score), passivos sufocantes, calotes generalizados no mercado e descobrir se o indivíduo oculta contas bancárias de difícil rastreio.",
      "camadas": [
        {
          "id": "cpf-05-c1",
          "titulo": "Inadimplência Notarial e Trabalhista",
          "conceito": "Sistemas unificados de proteção de crédito e devedores estatais para levantar litígios financeiros e trabalhistas.",
          "comoFunciona": "O analista interroga as centrais de cartórios e tribunais trabalhistas para listar títulos protestados e sentenças condenatórias não pagas.",
          "utilidadeOsint": "Revela dívidas julgadas e não pagas a ex-funcionários e credores, atuando como um alerta de insolvência severo.",
          "tools": [
            {
              "id": "Certidão de Débitos Trabalhistas (TST - CNDT)",
              "aplicacao": "✅ Testada em 08/11: CPF/CNPJ → PDF com os processos trabalhistas com débito; alcance nacional."
            },
            {
              "id": "Central Nacional de Serviços Compartilhados dos Protestos (Pesquisa Protesto)",
              "aplicacao": "⚠️ Testada em 03/11: exige login, que vincula a consulta ao investigador; bloqueia IP estrangeiro."
            }
          ],
          "regra": {
            "tags": [
              "alvo/pessoa-identidade",
              "alvo/empresa",
              "fonte/registros-publicos-gov"
            ],
            "auto": true
          },
          "excluir": [
            "Certidão de Feitos Trabalhistas (TRT-3)"
          ]
        },
        {
          "id": "cpf-05-c2",
          "titulo": "Conformidade Fiscal e Dívida Ativa",
          "conceito": "Auditoria de regularidade perante a Receita Federal e a Procuradoria-Geral da Fazenda Nacional para mapear o passivo fiscal e calotes estatais.",
          "comoFunciona": "Consulta aos portais de regularização e repositórios de dados abertos do governo para emitir certidões de débitos e identificar inscrições em Dívida Ativa da União.",
          "utilidadeOsint": "Revela grandes calotes de impostos, execuções fiscais em andamento e permite inferir a saúde financeira e a regularidade do alvo perante o Estado.",
          "tools": [
            {
              "id": "REGULARIZE (Procuradoria-Geral da Fazenda Nacional - PGFN)",
              "aplicacao": "✅ Testada em 03/11: usar a Dívida Aberta (dividaaberta.pgfn.gov.br): dívida ativa por CPF/CNPJ ou nome. Não prova que o CNPJ existe."
            },
            {
              "id": "Dados Abertos da Dívida Ativa da União (PGFN)",
              "aplicacao": "✅ Testada em 03/11: base trimestral para cruzamento em lote."
            },
            {
              "id": "Consulta de Restituição IRPF - Receita Federal",
              "aplicacao": "✅ Testada em 08/11: exige CPF e data de nascimento corretos."
            },
            {
              "id": "Consultas de Certidão PGFN/RFB (Pessoa Física)",
              "aplicacao": "⚠️ Testada em 08/11: emissão não confirmada no teste."
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
          "id": "cpf-05-c3",
          "titulo": "Inteligência Financeira Direta (FININT)",
          "conceito": "Verificação em sistemas centrais do Banco Central do Brasil e bureaus de crédito para deduzir relações econômicas abertas.",
          "comoFunciona": "Cruza o CPF em interfaces de análise de crédito e portais do BACEN para identificar contas bancárias, chaves de transferência, fundos esquecidos e score mercantil.",
          "utilidadeOsint": "Excepcional para descobrir relacionamentos bancários inativos ou não declarados, rastrear a origem/destino de fundos e avaliar o risco financeiro imediato do alvo.",
          "tools": [
            {
              "id": "Sistema de Valores a Receber - SVR (Banco Central do Brasil)",
              "aplicacao": "✅ Testada em 08/11: exige data de nascimento correta; confirma dado do próprio titular."
            },
            {
              "id": "Registrato (Banco Central do Brasil)",
              "aplicacao": "⚠️ Testada em 08/11: só do próprio titular, com gov.br prata ou ouro."
            },
            {
              "id": "CCFácil",
              "aplicacao": "⚠️ Testada em 03/11: paga (Serasa); não testada."
            }
          ],
          "regra": {
            "tags": [
              "alvo/pessoa-identidade",
              "alvo/empresa",
              "fonte/registros-publicos-gov"
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
      "nome": "Validação Passiva em Serviços & Telecom",
      "icone": "📱",
      "opsec": {
        "nivel": "cautela",
        "nota": "🟡 ATIVO INDIRETO / 🟢 PASSIVO"
      },
      "vetor": "CPF ➔ Linhas Telefônicas / Operadoras Associadas / Logins em Plataformas de Consumo",
      "objetivo": "Mapear, por fontes passivas, o consumo e as linhas móveis do indivíduo. Prioriza consultas passivas, sem contato direto com a pessoa investigada (OPSEC).",
      "camadas": [
        {
          "id": "cpf-06-c1",
          "titulo": "Mapeamento de Infraestrutura de Telecomunicações",
          "conceito": "Uso de serviços unificados de agências reguladoras e de administradoras de portabilidade para localizar chips e contratos em nome do CPF.",
          "comoFunciona": "O analista pesquisa a base nacional de operadoras para descobrir as empresas prestadoras de serviço atreladas ao documento civil, validando a titularidade e a portabilidade das linhas móveis.",
          "utilidadeOsint": "Identifica o espectro de atuação do alvo no mercado de telecomunicações, expondo possíveis telefones 'frios' (pré-pagos) e preparando o terreno técnico e jurídico para futuras requisições de quebra de sigilo telemático.",
          "tools": [
            {
              "id": "CadastroPré",
              "aplicacao": "Permite pesquisar em quais operadoras (Tim, Claro, Vivo, Algar, etc.) o CPF investigado possui linhas telefônicas pré-pagas ativas, descobrindo contas ocultas sob a titularidade do alvo."
            },
            {
              "id": "Consulta Número - ABR Telecom",
              "aplicacao": "Identifica com precisão a qual operadora de telecomunicações o terminal pertence no momento da consulta, informando se o número passou por portabilidade recente, essencial para o direcionamento de ofícios judiciais."
            },
            {
              "id": "Qual Operadora",
              "aplicacao": "Confirma a qual empresa pertence o número telefônico localizado e identifica o estado (UF) e a região geográfica associada ao código de área (DDD)."
            },
            {
              "id": "ConsultaOperadora.com.br",
              "aplicacao": "Recurso de triagem rápida com menos barreiras de segurança visual (CAPTCHAs complexos) que os portais institucionais, mapeando a infraestrutura primária de telecomunicações associada ao investigado."
            }
          ],
          "regra": {
            "tags": [
              "alvo/telefone"
            ],
            "auto": true
          }
        }
      ]
    }
  ]
});
