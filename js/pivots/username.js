// Pivotagem v2. Edite com cuidado.
// tools: "ID do catálogo" | {id, aplicacao?, opsec?, alerta?} | {nome,url,aplicacao,externo:true}
// regra.tags: mostra também outras ferramentas do catálogo com TODAS essas tags.
// module.icone: emoji do diagrama do topo (livre para trocar).
registerPivot({
  "id": "username",
  "categoria": "identificadores",
  "tipo": "alvo",
  "icone": "🆔",
  "titulo": "Investigação de Nomes de Usuário (Username / Handle)",
  "subtitulo": "// Roteiro metodológico para enumeração em massa, rastreamento social, dorking, análise em vazamentos e identificação em Web3.",
  "modulos": [
    {
      "num": "01",
      "nome": "Enumeração & Presença em Plataformas",
      "icone": "🔎",
      "opsec": {
        "nivel": "passivo",
        "nota": "🟢 PASSIVO"
      },
      "vetor": "Username ➔ Confirmação de Existência / URLs de Perfis / Fóruns de Nicho",
      "objetivo": "Realizar a varredura em larga escala na web para atestar em quais plataformas (das mais famosas às mais obscuras) aquele exato username já foi registrado.",
      "camadas": [
        {
          "id": "username-01-c1",
          "titulo": "Validação de Existência em Larga Escala",
          "conceito": "Utilização de métodos automatizados de requisições web baseadas em dicionários para interrogar os códigos de resposta HTTP (endpoints) de centenas de sites, confirmando se a página de perfil (site.com/user/nome) existe.",
          "comoFunciona": "As plataformas realizam varreduras assíncronas enviando o handle para as URLs de centenas de plataformas conhecidas, avaliando o código de retorno do servidor para atestar a existência da conta.",
          "utilidadeOsint": "Acelera exponencialmente a fase de expansão. A partir de um único handle (ex: do Instagram ou Twitter), o analista descobre fóruns de tecnologia, portfólios, sites de relacionamento ou repositórios obscuros onde o alvo também atua.",
          "tools": [
            {
              "id": "InstantUsername",
              "aplicacao": "✅ Testada em 26/10: melhor cobertura das grandes redes — achou GitHub, Twitch, ArtStation, X e Instagram (com nome e seguidores). Detecta automação: digitar à mão. ArtStation dá falso positivo."
            },
            {
              "id": "Social Analyzer",
              "aplicacao": "✅ Testada em 14/11: Ferramenta de linha de comando/web local (repositório qeeqbox ativo, atualizado em 2026-11-08, 24 mil estrelas) que procura um username em mais de 1.000 sites."
            },
            {
              "id": "WhatsMyName",
              "aplicacao": "⚠️ Testada em 26/10: cauda longa (653 sites), mas ~38% falham no proxy do próprio serviço e perdeu Instagram/ArtStation. Ignorar \"Internet Archive\" e os \"Potential False Positive\"."
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
          "id": "username-01-c2",
          "titulo": "Monitoramento Global e Agregação de Menções",
          "conceito": "Rastreamento passivo de menções, hashtags e o uso do próprio username em redes sociais abertas e agregadores globais.",
          "comoFunciona": "Motores de busca agregam fluxos de dados públicos em tempo real e em índices históricos para localizar onde o username foi citado, gerando estatísticas e cruzamento de links associados à identidade.",
          "utilidadeOsint": "Facilita o mapeamento da repercussão do indivíduo e acelera a descoberta da pegada digital do alvo, identificando potenciais homônimos, postagens e interações em fóruns públicos que poderiam passar despercebidas.",
          "tools": [
            {
              "id": "Social Searcher",
              "aplicacao": "⚠️ Testada em 26/10: nada indexado para o username de teste (nem o perfil Twitch confirmado). Serve mais para palavra-chave/marca."
            },
            {
              "id": "Webmii",
              "aplicacao": "⚠️ Testada em 26/10: devolve ruído por aproximação (nick parecido com produto) — nada sobre o alvo. Baixa precisão para username."
            }
          ],
          "regra": {
            "tags": [
              "alvo/pessoa-identidade",
              "alvo/usuario-email",
              "fonte/redes-sociais",
              "func/busca-identificacao"
            ],
            "auto": true
          }
        },
        {
          "id": "username-01-c3",
          "titulo": "Inteligência Integrada e Pivoting Avançado",
          "conceito": "Plataformas multifuncionais que automatizam fluxos de investigação cruzando identificadores iniciais (usernames) com centenas de fontes de terceiros.",
          "comoFunciona": "O analista insere o nome de usuário como ponto de entrada em um hub de agregação, que dispara requisições para mapear conexões, extrair relatórios e descobrir ramificações ocultas da identidade.",
          "utilidadeOsint": "Reduz drasticamente o tempo de coleta manual e enriquece a árvore de conexões do alvo, permitindo avançar mais rápido na identificação de perfis com nomes falsos ou ocultos.",
          "tools": [
            {
              "id": "Sherlockeye",
              "aplicacao": "⚠️ Testada em 28/10: triagem — achou só o GitHub (não viu X/Instagram/Twitch) e o detalhe custa crédito; conta grátis ≈ 3 relatórios."
            }
          ]
        }
      ]
    },
    {
      "num": "02",
      "nome": "Mapeamento de Redes Sociais (SOCMINT)",
      "icone": "🕸️",
      "opsec": {
        "nivel": "cautela",
        "nota": "🟢 PASSIVO / 🟡 ATIVO INDIRETO"
      },
      "vetor": "Username Localizado ➔ Bio / Histórico de Atividade / Redes de Conexões / Identidade Civil",
      "objetivo": "Extrair a inteligência humana por trás do perfil (SOCMINT). O foco é analisar quem o alvo segue, com quem interage e o que ele publica, estruturando o ecossistema de relacionamentos do investigado.",
      "camadas": [
        {
          "id": "username-02-c1",
          "titulo": "Identificação e Extração de Metadados",
          "conceito": "Raspagem de dados abertos do perfil, como biografias, fotografias e a correlação do username com outras plataformas para desmascarar a identidade real.",
          "comoFunciona": "Plataformas automatizadas realizam buscas em tempo real em centenas de serviços da web para extrair identificadores exclusivos, fotos e nomes reais associados à conta investigada.",
          "utilidadeOsint": "Acelera a identificação do titular. Permite pivotar rapidamente a partir de um username para dezenas de plataformas digitais, revelando a extensão real da presença online do investigado e extraindo metadados estruturados das contas localizadas.",
          "tools": [
            {
              "id": "Sherlockeye",
              "aplicacao": "⚠️ Testada em 28/10: diz QUE há achado e onde, mas o conteúdo vem censurado sem crédito."
            },
            {
              "id": "OSINT Industries",
              "aplicacao": "⚠️ Testada em 26/10: na prática é pago — com 0 créditos a busca nem é enviada."
            }
          ],
          "regra": {
            "tags": [
              "alvo/usuario-email",
              "alvo/telefone"
            ],
            "auto": true
          }
        },
        {
          "id": "username-02-c2",
          "titulo": "Análise Massiva de Interações e Vínculos (Link Analysis)",
          "conceito": "Ingestão e raspagem da malha de conexões do perfil (amigos, curtidas, seguidores e grupos) para estruturação de grafos interativos.",
          "comoFunciona": "Softwares de inteligência centralizam os dados extraídos das redes e os transformam em diagramas de vínculos (nós e arestas), correlacionando as interações de forma automatizada.",
          "utilidadeOsint": "A rede de conexões define o ecossistema do alvo. Permite mapear cúmplices, associados-chave e hierarquias de organizações através de interações contínuas em redes como Twitter ou Instagram.",
          "tools": [
            {
              "id": "Plataforma Lampyre",
              "aplicacao": "Software de análise massiva e inteligência cibernética. Uma vez identificado o handle do alvo, o Lampyre raspa e plota a rede inteira (seguidores, postagens e interações) em diagramas visuais, facilitando a montagem rápida de árvores de relacionamentos."
            },
            {
              "id": "Maltego",
              "aplicacao": "Atua como núcleo analítico visual para mapeamento de redes sociais. Permite a execução de scripts automatizados (transforms) para puxar conexões sociais e estruturar visualmente o ecossistema humano e de infraestrutura do investigado."
            }
          ],
          "regra": {
            "tags": [
              "alvo/usuario-email",
              "alvo/ip",
              "func/agregador",
              "func/analise-visualizacao"
            ],
            "auto": true
          }
        },
        {
          "id": "username-02-c3",
          "titulo": "Rastreamento de Atividades e Menções",
          "conceito": "Monitoramento e análise da atividade pública do username, rastreamento de postagens históricas e mapeamento do engajamento de terceiros com o perfil do alvo.",
          "comoFunciona": "Mecanismos de busca especializados varrem as plataformas sociais superando as restrições algorítmicas nativas, consolidando publicações, menções, hashtags e interações associadas ao alvo.",
          "utilidadeOsint": "Viabiliza a descoberta de narrativas ou crimes através da análise do que o alvo publica e onde ele é citado. Auxilia na estruturação de linhas do tempo e na identificação de perfis periféricos que engajam constantemente com o investigado.",
          "tools": [
            {
              "id": "Insta Stories Viewer",
              "aplicacao": "✅ Testada em 28/10: insta-stories-viewer.com/{username}/ — vê stories/publicações de perfil público sem deixar rastro; de perfil privado ainda mostra contadores e bio."
            },
            {
              "id": "Miniwebtool - Pesquisa de ID de Usuário do Instagram",
              "aplicacao": "⚠️ Testada em 28/10: ID numérico permanente do Instagram (sobrevive à troca de @) e o inverso ID → @. Só perfil público; privado e inexistente dão o mesmo erro. 3/dia, Turnstile."
            },
            {
              "id": "Who Posted What?",
              "aplicacao": "⚠️ Testada em 26/10: a busca por palavra-chave + data no Facebook funciona; o Get ID está quebrado. O pivô real é termo+data, não username."
            },
            {
              "id": "Social Searcher",
              "aplicacao": "Consolida em um único painel os resultados de publicações oriundas de diversas redes (como X/Twitter, Reddit e blogs). Permite monitorar passivamente o que o alvo está publicando e descobrir menções ao username do investigado feitas por associados."
            }
          ],
          "regra": {
            "tags": [
              "alvo/usuario-email",
              "fonte/redes-sociais",
              "func/busca-identificacao"
            ],
            "auto": true
          }
        }
      ]
    },
    {
      "num": "03",
      "nome": "Análise de Padrões & Dorking",
      "icone": "🔠",
      "opsec": {
        "nivel": "passivo",
        "nota": "🟢 PASSIVO"
      },
      "vetor": "Username ➔ Variações Alfanuméricas / Chaves de API Vazadas / Menções em Textos e Blogs",
      "objetivo": "Localizar o alvo em locais que scanners automáticos não encontram. Indivíduos adicionam números ou caracteres a seus nomes quando a plataforma já tem aquele handle em uso. Esta fase prevê essas variações e busca o pseudônimo 'solto' no corpo de textos.",
      "camadas": [
        {
          "id": "username-03-c1",
          "titulo": "Expansão Lexical e Variações por LLM",
          "conceito": "Identificação de variações previsíveis do username principal (adição de números, caracteres especiais, anos de nascimento) que possam ter sido adotadas pelo alvo.",
          "comoFunciona": "O analista instrui modelos de linguagem de grande porte (LLMs) a processar o username conhecido e gerar matrizes combinatórias e dicionários de permutações lógicas para futuras buscas.",
          "utilidadeOsint": "Supera a limitação de buscas exatas. Permite antecipar como o alvo se registraria em plataformas onde o seu pseudônimo principal já estava ocupado, criando uma lista de alvos textuais para varreduras manuais e automatizadas.",
          "tools": [
            {
              "id": "ChatGPT (OpenAI)",
              "aplicacao": "⚠️ Testada em 14/11: Abre na tela de entrada. Usado na trilha para gerar variações de nick."
            },
            {
              "id": "Gemini",
              "aplicacao": "Funciona como alternativa de alto desempenho no processamento de linguagem natural, permitindo estruturar padrões de nomes de usuário e sugerir variações linguísticas do pseudônimo focadas no idioma materno do investigado."
            }
          ]
        },
        {
          "id": "username-03-c2",
          "titulo": "Dorking Avançado e Reconhecimento Passivo",
          "conceito": "Estruturação e automação de operadores lógicos de busca (Google Dorks) para varrer a internet superficial atrás de menções textuais isoladas do username.",
          "comoFunciona": "Plataformas web centralizam e automatizam a construção de sintaxes complexas (como intext:, filetype:, site:), convertendo os parâmetros do alvo em links diretos de pesquisa.",
          "utilidadeOsint": "Localiza registros em diretórios abertos, documentos em PDF vazados ou fóruns corporativos que mencionam o pseudônimo do alvo, indo muito além das URLs de perfil padrão.",
          "tools": [
            {
              "id": "Google Advanced Search",
              "aplicacao": "✅ Testada em 28/10: a busca mais reveladora do lote. Usar google.com/search?q=\"{username}\"&nfpr=1 — sem nfpr=1 o Google troca o nick por palavra parecida mesmo entre aspas. Achou perfil social + documento público, e a Visão Geral por IA ligou o nick a nome completo e e-mail institucional."
            },
            {
              "id": "Deep Dork Web",
              "aplicacao": "⚠️ Testada em 28/10: gerador local; para username só servem as categorias Cloud Storage/Code Sharing (Drive, Docs, Pastebin, CodePen, buckets) — o resto é site:{dominio}."
            }
          ],
          "excluir": [
            "GoogleDorks (s1rn3tz)"
          ]
        },
        {
          "id": "username-03-c3",
          "titulo": "Inteligência de Código e Repositórios",
          "conceito": "Pesquisa do username e suas variações dentro de plataformas de versionamento e fóruns de desenvolvimento de software.",
          "comoFunciona": "Mecanismos de busca e coleções de dorks especializadas vasculham commits, wikis e linhas de código hospedados no GitHub, GitLab e plataformas similares.",
          "utilidadeOsint": "Caso o username pertença a um desenvolvedor ou técnico, viabiliza a descoberta de chaves privadas de criptografia ou senhas que o alvo deixou vazar acidentalmente no código-fonte, além de identificar e-mails institucionais escondidos nos logs de commit.",
          "tools": [
            {
              "id": "Deep Dork Web",
              "aplicacao": "⚠️ Testada em 28/10: as categorias Code Sharing Platforms e Cloud Storage geram dorks para Pastebin, CodePen, JSFiddle e buckets com o nick. Para código no GitHub, usar a busca nativa (github.com/search?type=code&q=\"{username}\")."
            }
          ],
          "excluir": [
            "GitDorks"
          ]
        }
      ]
    },
    {
      "num": "04",
      "nome": "Vazamentos & Credenciais (Breach Intel)",
      "icone": "🔓",
      "opsec": {
        "nivel": "passivo",
        "nota": "🟢 PASSIVO"
      },
      "vetor": "Username ➔ Senhas em Texto Claro (Plain text) / E-mails Ocultos Associados / Endereços de IP",
      "objetivo": "Cruzar o pseudônimo com o submundo digital. Se o alvo utilizou esse username em fóruns ou serviços que foram invadidos, os dados de cadastro da época revelarão e-mails privados e senhas.",
      "camadas": [
        {
          "id": "username-04-c1",
          "titulo": "Bancos de Vazamentos e Credenciais em Texto Claro (Breach Intel)",
          "conceito": "Indexadores massivos de dumps (descargas) de banco de dados extraídos de violações de segurança e exposições ao longo de anos.",
          "comoFunciona": "As plataformas indexam bilhões de registros extraídos de vazamentos de dados, permitindo buscas reversas para confirmar o comprometimento de dados atrelados a um username ou e-mail.",
          "utilidadeOsint": "Transforma um simples nome de tela em dados vitais. Ao achar o username num vazamento, o investigador frequentemente descobre o e-mail real usado na criação da conta, endereços IPs de registro e a senha de preferência do indivíduo (que indica datas, times de futebol ou nomes de parentes).",
          "tools": [
            {
              "id": "SynScan Breaches (Verified Search)",
              "aplicacao": "✅ Testada em 28/10: sem login, user:{username} + Enter diz QUAL vazamento contém o nick (achou um que a busca pelo e-mail não trouxe)."
            },
            {
              "id": "OSINTLeak",
              "aplicacao": "✅ Testada em 28/10: prévia sem login + registro com conta Free (achou base twitter-2.1b com nome, nick e data de criação da conta — diferente do vazamento achado pelo e-mail). Buscar nick E e-mail."
            },
            {
              "id": "DeHashed",
              "aplicacao": "⚠️ Testada em 28/10: sem login só dá a contagem de incidentes, sem dizer quais. Distingue o negativo."
            }
          ],
          "regra": {
            "tags": [
              "alvo/usuario-email",
              "fonte/vazamentos-darkweb",
              "func/busca-identificacao"
            ],
            "auto": true
          }
        },
        {
          "id": "username-04-c2",
          "titulo": "Inteligência na Dark Web e Redes Anônimas",
          "conceito": "Interrogação de diretórios e bases de dados clandestinas hospedadas em redes de roteamento cebola (Tor).",
          "comoFunciona": "O investigador acessa endereços ocultos (.onion) que funcionam como indexadores massivos de megavazamentos históricos não disponíveis livremente na internet de superfície.",
          "utilidadeOsint": "Ideal para cruzar o nome de usuário com stealer logs (logs de computadores infectados) que circulam em canais do Telegram e na rede Tor, identificando padrões de criação de senhas e contas correlacionadas.",
          "tools": [],
          "excluir": [
            "PwnDB"
          ]
        },
        {
          "id": "username-04-c3",
          "titulo": "Inteligência de Reputação e Histórico de Fraudes",
          "conceito": "Avaliação do envolvimento do username em atividades ilícitas e golpes reportados pela comunidade cibernética.",
          "comoFunciona": "O mecanismo rastreia e centraliza informações coletadas de centenas de bancos de dados públicos, listas de denúncias e fóruns de segurança.",
          "utilidadeOsint": "Evidencia imediatamente se o pseudônimo investigado é conhecido por atuar em fraudes ou golpes financeiros, facilitando a atribuição e o mapeamento de riscos criminais associados ao alvo.",
          "tools": [
            {
              "id": "ScamSearch.io",
              "aplicacao": "✅ Testada em 28/10: /search_report?searchoption=user&search={username} — diz se o nick foi denunciado como golpista (Report Count)."
            }
          ]
        }
      ]
    },
    {
      "num": "05",
      "nome": "Análise Visual & Avatares (IMINT)",
      "icone": "🖼️",
      "opsec": {
        "nivel": "passivo",
        "nota": "🟢 PASSIVO"
      },
      "vetor": "Foto de Perfil (Avatar) ➔ Redes Sociais Alternativas / Nomes Reais / Biometria Oculta",
      "objetivo": "Os alvos que usam múltiplos usernames diferentes costumam cometer o erro de reutilizar a mesma fotografia (avatar) em diversas plataformas. A inteligência visual correlaciona essas contas fisicamente.",
      "camadas": [
        {
          "id": "username-05-c1",
          "titulo": "Reconhecimento Facial Massivo e Busca Reversa",
          "conceito": "Mapeamento de vetores biométricos faciais e comparação geométrica contra bilhões de imagens indexadas globalmente na web.",
          "comoFunciona": "Os motores de busca extraem assinaturas visuais e geométricas da face do alvo em uma foto e varrem indexadores globais em redes sociais, fóruns e portais de notícias para localizar correspondências do mesmo indivíduo.",
          "utilidadeOsint": "Se a busca textual pelo username falhar ou atingir um beco sem saída, o investigador baixa a foto do perfil e faz a busca reversa. Isso quebra o pseudonimato, associando a 'selfie' anônima a um perfil profissional legítimo (ex: LinkedIn) do alvo que usa o nome real.",
          "tools": [
            {
              "id": "PimEyes",
              "aplicacao": "Motor robusto baseado em IA que foca unicamente na estrutura biométrica do rosto. É capaz de encontrar o mesmo indivíduo em fotos com planos de fundo, iluminações, cortes de cabelo e idades completamente distintos, desmascarando a identidade por trás do avatar."
            },
            {
              "id": "FaceCheck.id",
              "aplicacao": "Motor de busca facial focado em localizar correspondências visuais ativas em redes sociais, fóruns e registros públicos. Essencial para rastrear perfis de catfishing ou expor a real identidade de sock puppets baseando-se no avatar."
            }
          ],
          "regra": {
            "tags": [
              "alvo/pessoa-identidade",
              "fonte/redes-sociais",
              "func/busca-identificacao"
            ],
            "auto": true
          }
        },
        {
          "id": "username-05-c2",
          "titulo": "Busca Reversa Ampla e Mídias Abstratas",
          "conceito": "Identificação de origens de arquivos e localização de mídias que não contêm rostos humanos através da correspondência de pixels e contexto visual.",
          "comoFunciona": "Os algoritmos de indexação analisam padrões de cores, texturas, cenários e objetos na imagem submetida para buscar réplicas exatas ou variações daquela foto em bilhões de páginas hospedadas na web de superfície.",
          "utilidadeOsint": "Ferramentas essenciais para busca reversa de imagens que não contêm rostos (como logotipos, ilustrações, fotos de carros ou avatares abstratos). Permite rastrear a origem cronológica do arquivo e identificar se a foto de perfil foi furtada de bancos de imagens públicos para compor um perfil falso.",
          "tools": [
            {
              "id": "ascii2d",
              "aplicacao": "⚠️ Testada em 14/11: Buscador reverso japonês especializado em ilustração/anime (色合/特徴検索) por URL ou upload."
            },
            {
              "id": "Yandex Images",
              "aplicacao": "Possui algoritmos de visão computacional de alta precisão que frequentemente superam indexadores ocidentais. Excepcional para isolar características, identificar logotipos abstratos usados em avatares e rastrear mídias publicadas em fóruns asiáticos ou do leste europeu."
            },
            {
              "id": "Google Images",
              "aplicacao": "Viabiliza o rastreio da origem da imagem de perfil para identificar manipulações de contexto (como avatares clonados de terceiros) e promove o reconhecimento automatizado de marcas e objetos visíveis na foto de capa ou no perfil do alvo."
            },
            {
              "id": "Google Lens",
              "aplicacao": "Permite que o analista isole pequenos elementos de um avatar complexo utilizando a caixa de seleção dinâmica (bounding box). Útil para traduzir textos sobrepostos em fotos de perfil, identificar o modelo de roupas usadas pelo alvo ou reconhecer locais ao fundo da imagem."
            },
            {
              "id": "Depositphotos Search by Image"
            },
            {
              "id": "Everypixel"
            },
            {
              "id": "Same Energy"
            }
          ],
          "regra": {
            "tags": [
              "func/analise-midia-integridade",
              "func/busca-identificacao"
            ],
            "auto": true
          }
        },
        {
          "id": "username-05-c3",
          "titulo": "Comparação Biométrica Forense",
          "conceito": "Extração de características fisionômicas e cálculo de similaridade biométrica matemática entre duas imagens distintas de rostos (Verificação 1:1).",
          "comoFunciona": "Plataformas de inteligência artificial mapeiam a geometria facial detalhada (distância entre os olhos, boca e nariz) e calculam a probabilidade técnica de as duas mídias submetidas pertencerem ao mesmo indivíduo biológico.",
          "utilidadeOsint": "Garante segurança técnica à investigação. Caso o analista encontre um novo perfil suspeito, ele pode comparar cientificamente o avatar recém-descoberto com as fotos já confirmadas do alvo, recebendo um laudo técnico de similaridade para atestar se as contas são controladas pela mesma pessoa.",
          "tools": [
            {
              "id": "MxFace - Face Comparing",
              "aplicacao": "Permite automatizar a verificação 1:1. O analista envia o avatar investigado e a foto de referência do alvo; o sistema analisa a geometria facial via Deep Learning e entrega um 'confidence score', confirmando se a foto pertence ao mesmo investigado, mitigando disfarces como barbas ou óculos."
            }
          ],
          "regra": {
            "tags": [
              "alvo/pessoa-identidade",
              "func/analise-midia-integridade"
            ],
            "auto": true
          },
          "excluir": [
            "Betaface (Old Demo)"
          ]
        }
      ]
    },
    {
      "num": "06",
      "nome": "Identificadores Web3 & Blockchain",
      "icone": "💠",
      "opsec": {
        "nivel": "passivo",
        "nota": "🟢 PASSIVO"
      },
      "vetor": "Username ➔ Carteiras de Criptomoedas (Crypto Wallets) / Canais no Telegram / NFT Domains",
      "objetivo": "Rastrear a evolução moderna dos cibercriminosos, que hoje monetizam suas identidades digitais vinculando usernames de aplicativos de comunicação a carteiras descentralizadas para ocultar fluxos de capital.",
      "camadas": [
        {
          "id": "username-06-c1",
          "titulo": "Identificação Financeira Descentralizada",
          "conceito": "Varredura em plataformas de identidade Web3 (Smart Contracts) que conectam strings de nomes a hashes (endereços) de criptoativos.",
          "comoFunciona": "A plataforma interroga os contratos inteligentes de blockchains específicas para revelar qual endereço público de carteira digital detém a custódia e o controle de um determinado nome de usuário ou domínio descentralizado.",
          "utilidadeOsint": "A ponte definitiva entre o perfil comportamental e o fluxo de caixa (FININT). Permite saber qual carteira de criptomoedas recebe pagamentos ou administra a atividade financeira daquele pseudônimo de forma incontestável.",
          "tools": [
            {
              "id": "Fragment",
              "aplicacao": "⚠️ Testada em 28/10: só usernames COLECIONÁVEIS do Telegram (fragment.com/username/{nome} → preço, data e carteira TON do dono). Para nick comum a resposta é igual à de um inexistente."
            }
          ],
          "regra": {
            "tags": [
              "alvo/financeiro-crypto"
            ],
            "auto": true
          },
          "excluir": [
            "Unstoppable Domains"
          ]
        },
        {
          "id": "username-06-c2",
          "titulo": "Exploração e Resolução de Domínios Web3",
          "conceito": "Mapeamento e investigação de páginas ativas e ramificações de sites hospedados em ecossistemas de domínios descentralizados (Handshake e TLDs alternativos).",
          "comoFunciona": "Motores de busca especializados e gateways de rede resolvem endereços de blockchain (que não respondem aos servidores convencionais da ICANN) para que possam ser visualizados e auditados em navegadores da internet de superfície.",
          "utilidadeOsint": "Permite varrer e localizar a presença de alvos e infraestruturas clandestinas que foram espelhadas para domínios de nível superior alternativos baseados em blockchain, contornando as restrições e censuras do WHOIS tradicional.",
          "tools": [
            {
              "id": "Unstoppable Domains",
              "aplicacao": "✅ Testada em 28/10: testar o nick como domínio Web3 em ud.me/{username}.crypto (ou .x, .nft, .wallet) ou na API pública api.unstoppabledomains.com/profile/public/{dominio}: devolve carteira dona, endereços cripto, outros domínios e NFTs. A busca do site em si virou loja de domínios .com."
            }
          ],
          "regra": {
            "tags": [
              "alvo/dominio"
            ],
            "auto": true
          },
          "excluir": [
            "HNSSearch",
            "hns.to",
            "HDNS (Handshake DNS)",
            "TorWhois",
            "FaviHash"
          ]
        },
        {
          "id": "username-06-c3",
          "titulo": "Inteligência Financeira e Rastreamento Cripto (FININT)",
          "conceito": "Mapeamento do fluxo de capital descentralizado a partir do endereço criptográfico (Wallet) descoberto na fase de identificação do username.",
          "comoFunciona": "Exploradores de blocos processam os livros-razão públicos (ledgers) das blockchains para auditar o histórico de transações, saldos e conexões transacionais vinculados ao endereço investigado.",
          "utilidadeOsint": "Após quebrar o vínculo do username para a carteira, esta fase mapeia a movimentação de fundos de origem ilícita e identifica as corretoras (exchanges) ou carteiras de destino que interagem com o alvo, viabilizando o 'Follow the Money'.",
          "tools": [
            {
              "id": "Blockchain.com Explorer",
              "aplicacao": "O livro-razão público indispensável. O analista insere o endereço da carteira criptográfica revelada no Fragment ou Unstoppable Domains para rastrear todas as movimentações financeiras recebidas e enviadas pelo pseudônimo."
            },
            {
              "id": "BlockSherlock",
              "aplicacao": "Diretório tático que guia o analista. Fornece recursos analíticos adicionais focados em heurística e agrupamento de entidades de blockchain para desvendar estruturas complexas de lavagem de capital ligadas ao alvo."
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
    }
  ]
});
