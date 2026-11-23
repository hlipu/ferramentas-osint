// Pivotagem v2. Edite com cuidado.
// tools: "ID do catálogo" | {id, aplicacao?, opsec?, alerta?} | {nome,url,aplicacao,externo:true}
// regra.tags: mostra também outras ferramentas do catálogo com TODAS essas tags.
// module.icone: emoji do diagrama do topo (livre para trocar).
registerPivot({
  "id": "imagem",
  "categoria": "midia",
  "tipo": "alvo",
  "icone": "📷",
  "titulo": "Imagens & Mídias Visuais (IMINT / Forense Visual)",
  "subtitulo": "// Roteiro metodológico para extração de metadados, biometria facial, cronolocalização, visão computacional e preservação de evidências visuais.",
  "modulos": [
    {
      "num": "01",
      "nome": "Extração de Metadados & EXIF",
      "icone": "🧭",
      "opsec": {
        "nivel": "passivo",
        "nota": "🟢 PASSIVO"
      },
      "vetor": "Arquivo de Imagem ➔ Coordenadas GPS / Data e Hora Originais / Marca e Modelo do Dispositivo / Número de Série",
      "objetivo": "Extrair as informações técnicas (EXIF, IPTC, XMP) gravadas pelo hardware no momento do clique. Esse bloco de dados permite geolocalizar o momento exato em que a fotografia foi tirada e identificar o dispositivo utilizado antes de realizar análises visuais mais profundas.",
      "camadas": [
        {
          "id": "imagem-01-c1",
          "titulo": "Visualização Rápida e Higienização (OPSEC)",
          "conceito": "Leitura dos blocos de metadados diretamente na web ou por meio de extensões de navegador para validar parâmetros técnicos de captura.",
          "comoFunciona": "Plataformas e extensões inspecionam os parâmetros técnicos ocultos da mídia diretamente da página web ou de arquivos locais submetidos, revelando e permitindo o expurgo de dados como coordenadas e datas.",
          "utilidadeOsint": "Serve tanto para a coleta rápida de evidências quanto para a proteção do investigador, permitindo a limpeza (expurgo) dos metadados de fotos geradas pela própria equipe de investigação antes de publicá-las em contas de cobertura (sock puppets).",
          "tools": [
            {
              "id": "VerExif",
              "aplicacao": "✅ Testada em 08/11: GPS e câmera corretos; também remove EXIF."
            },
            {
              "id": "Jimpl",
              "aplicacao": "✅ Testada em 12/11: confirma GPS; a imagem fica 24 h no servidor."
            },
            {
              "id": "Pic2Map",
              "aplicacao": "✅ Testada em 08/11: GPS + endereço reverso, mas publica a foto em URL própria: apagar depois."
            },
            {
              "id": "ExifData.com",
              "aplicacao": "✅ Testada em 12/11: coordenadas corretas com mapa; operar à mão."
            },
            {
              "id": "Exif Viewer",
              "aplicacao": "✅ Testada em 14/11: Extensão do Firefox (13 mil usuários) que mostra EXIF e IPTC de JPEG local ou remoto."
            }
          ]
        },
        {
          "id": "imagem-01-c2",
          "titulo": "Extração Forense Local e Processamento em Lote",
          "conceito": "Leitura e decodificação offline das tags de fabricantes de hardware usando ferramentas de linha de comando.",
          "comoFunciona": "Utilitários multiplataforma processam arquivos localmente em terminais para extrair, editar e escrever blocos de informações gravados em imagens e vídeos.",
          "utilidadeOsint": "Garante 100% de segurança operacional (OPSEC) ao processar os dados localmente de forma offline, preservando que a análise não gere tráfego de rede. É ideal para automatizar a extração de metadados em lote de centenas de imagens simultaneamente.",
          "tools": [
            {
              "id": "ExifTool",
              "aplicacao": "A ferramenta forense definitiva baseada em linha de comando. Capaz de decodificar tags complexas e processar de forma passiva arquivos obtidos durante a investigação para extrair carimbos de data/hora. Permite também remover metadados de arquivos gerados pelo analista antes do compartilhamento."
            }
          ]
        },
        {
          "id": "imagem-01-c3",
          "titulo": "Rastreio por Assinatura de Hardware",
          "conceito": "Pivotagem baseada no número de série único do sensor da câmera gravado no arquivo EXIF.",
          "comoFunciona": "A plataforma isola o serial de hardware do sensor na foto fornecida e varre o banco de dados indexado da internet para localizar outras imagens capturadas por esse exato equipamento.",
          "utilidadeOsint": "Permite descobrir se o mesmo equipamento fotográfico foi utilizado para publicar imagens em outras contas ou plataformas, quebrando pseudônimos para vincular perfis anônimos ao mesmo alvo de interesse ou rastrear ativos furtados.",
          "tools": [
            {
              "id": "Stolen Camera Finder",
              "aplicacao": "Raspa e indexa imagens públicas com base no número de série interno da câmera. Auxilia a conectar contas aparentemente anônimas ao mesmo indivíduo identificando se aquele mesmo equipamento publicou fotos no Flickr ou em outros repositórios."
            }
          ]
        }
      ]
    },
    {
      "num": "02",
      "nome": "Pesquisa Reversa & Biometria Facial",
      "icone": "🔍",
      "opsec": {
        "nivel": "passivo",
        "nota": "🟢 PASSIVO"
      },
      "vetor": "Rosto / Ponto de Referência (Landmark) ➔ Perfis em Redes Sociais / Nomes / Locais",
      "objetivo": "Descobrir onde uma imagem específica (ou o rosto nela contido) foi publicada na internet, desmascarando contas falsas, encontrando o verdadeiro nome de um suspeito ou localizando a origem primária de uma fotografia.",
      "camadas": [
        {
          "id": "imagem-02-c1",
          "titulo": "Reconhecimento Facial Massivo (Web)",
          "conceito": "Mapeamento de vetores biométricos do rosto e busca em bilhões de imagens indexadas (fóruns, notícias, sites governamentais).",
          "comoFunciona": "A plataforma extrai a geometria facial da foto fornecida e varre o ciberespaço em busca de correspondências estruturais idênticas em indexadores públicos.",
          "utilidadeOsint": "Transforma uma imagem solta no verdadeiro nome do alvo, localizando redes sociais ocultas e reportagens passadas associadas àquela face, independentemente da idade ou do cenário da foto.",
          "tools": [
            {
              "id": "FaceCheck.id",
              "aplicacao": "✅ Testada em 12/11: mais completo de graça: notas e domínios visíveis; cuidado com sósias."
            },
            {
              "id": "PimEyes",
              "aplicacao": "⚠️ Testada em 12/11: grátis mostra só o domínio; fontes pagas."
            },
            {
              "id": "Lenso.ai",
              "aplicacao": "⚠️ Testada em 12/11: busca facial e de duplicatas; fontes exigem login."
            }
          ],
          "regra": {
            "tags": [
              "alvo/pessoa-identidade",
              "func/busca-identificacao"
            ],
            "auto": true
          }
        },
        {
          "id": "imagem-02-c2",
          "titulo": "Comparação Biométrica 1:1 e Extração de Atributos",
          "conceito": "Cálculo geométrico da similaridade entre dois arquivos distintos para validar identidades e extração de metadados fisionômicos.",
          "comoFunciona": "Ferramentas recebem duas ou mais fotografias e comparam matematicamente os pontos nodais da face, emitindo laudos percentuais de correspondência.",
          "utilidadeOsint": "Permite ao investigador testar matematicamente se a foto de um perfil suspeito pertence à mesma pessoa de um documento oficial (CNH/RG) ou identificar microexpressões e dados demográficos do suspeito.",
          "tools": [
            {
              "id": "MxFace - Face Comparing",
              "aplicacao": "✅ Testada em 12/11: comparação 1:1 correta nos dois sentidos; captcha."
            },
            {
              "id": "Amazon Rekognition",
              "aplicacao": "⚠️ Testada em 12/11: exige conta AWS."
            },
            {
              "id": "OpenFace",
              "aplicacao": "Essencial para casos que demandam sigilo total (OPSEC). Por rodar 100% offline, permite ao analista extrair atributos biométricos e auditar falhas estruturais em vídeos suspeitos de deepfakes sem vazar os arquivos para a nuvem."
            },
            {
              "id": "FaceReader (Noldus)"
            }
          ],
          "excluir": [
            "Betaface (Old Demo)"
          ]
        },
        {
          "id": "imagem-02-c3",
          "titulo": "Busca Ampla, Reconhecimento de Objetos e Cenários (Landmarks)",
          "conceito": "Identificação de similaridades geométricas de objetos, monumentos, logotipos e cenários gerais em imagens de fontes abertas.",
          "comoFunciona": "Mecanismos de busca visuais indexam a imagem e encontram a sua origem original na rede ou elementos com características arquitetônicas/naturais visualmente equivalentes.",
          "utilidadeOsint": "Viabiliza o rastreamento da origem cronológica da foto para identificar manipulações de contexto e descobrir coordenadas geográficas exatas através do reconhecimento automatizado de pontos de interesse.",
          "tools": [
            {
              "id": "Google Lens",
              "aplicacao": "✅ Testada em 12/11: por URL; correspondências exatas e visuais."
            },
            {
              "id": "Google Images",
              "aplicacao": "✅ Testada em 12/11: é o Google Lens."
            },
            {
              "id": "Yandex Images",
              "aplicacao": "✅ Testada em 12/11: por URL; identifica o conteúdo e lista outros tamanhos e sites."
            },
            {
              "id": "TinEye Reverse Image Search",
              "aplicacao": "✅ Testada em 12/11: cópias da imagem; ordenar pela mais antiga para achar a origem."
            },
            {
              "id": "Picarta.ai",
              "aplicacao": "✅ Testada em 12/11: palpite de local sem EXIF; decimais finais pagos."
            },
            {
              "id": "Sogou Pic (Sogou Images)",
              "aplicacao": "⚠️ Testada em 12/11: cobre a internet chinesa; sem resultado para foto ocidental."
            },
            {
              "id": "NumLookup Reverse Image Search",
              "aplicacao": "⚠️ Testada em 12/11: busca não concluída no teste."
            },
            {
              "id": "Pixsy Monitor",
              "aplicacao": "⚠️ Testada em 12/11: exige cadastro; foco em direito autoral."
            }
          ]
        }
      ]
    },
    {
      "num": "03",
      "nome": "Análise de Integridade & Deteção de IA",
      "icone": "🛡️",
      "opsec": {
        "nivel": "passivo",
        "nota": "🟢 PASSIVO"
      },
      "vetor": "Imagem Suspeita ➔ Assinaturas de Renderização / Nível de Erro / Provas de Manipulação",
      "objetivo": "Auditar se a mídia visual é autêntica, se foi alterada em softwares de edição ou se trata-se de um conteúdo totalmente fabricado por Inteligência Artificial ou Deepfakes.",
      "camadas": [
        {
          "id": "imagem-03-c1",
          "titulo": "Forense Visual e Manipulação de Pixels",
          "conceito": "Identificação de divergências nas taxas de compressão (ELA) ou clonagem de pixels dentro de um arquivo.",
          "comoFunciona": "A plataforma atua como um laboratório de análise estática, aplicando múltiplos algoritmos matemáticos na matriz de pixels da imagem para destacar inserções, exclusões e assimetrias que não são visíveis a olho nu.",
          "utilidadeOsint": "Demonstra digitalmente se um documento, placa de carro ou objeto foi inserido posteriormente na cena, garantindo que fotografias ou capturas de tela coletadas não tenham sofrido manipulações deliberadas para forjar provas.",
          "tools": [
            {
              "id": "FotoForensics (fotoforensics.com)",
              "aplicacao": "✅ Testada em 12/11: ELA e metadados em URL própria; interpretação exige treino."
            },
            {
              "id": "Photopea",
              "aplicacao": "Editor de gráficos avançado baseado em web. Permite ao analista separar camadas de arquivos de design para identificar modificações manuais, inspecionar propriedades visuais para triagem e aumentar o contraste de documentos digitalizados para expor adulterações estruturais."
            },
            {
              "id": "Mobilefish Steganography"
            }
          ],
          "excluir": [
            "img-encode"
          ]
        },
        {
          "id": "imagem-03-c2",
          "titulo": "Detecção e Proteção contra Mídia Sintética",
          "conceito": "Análise de anomalias estruturais de renderização ou identificação de assinaturas digitais (Marcas d'água) injetadas no arquivo.",
          "comoFunciona": "Sistemas validam o conteúdo visual contra modelos adversariais para determinar se a imagem foi criada por algoritmos generativos de difusão (GANs), identificando ruídos estatísticos e imperfeições clássicas de IA.",
          "utilidadeOsint": "Valida se a foto de perfil de um possível Sock Puppet (conta falsa) ou o áudio de um alvo foi gerado por IA (ex: Midjourney, Stable Diffusion ou clones de voz), confirmando a existência de campanhas de desinformação.",
          "tools": [
            {
              "id": "AI or Not",
              "aplicacao": "⚠️ Testada em 12/11: exige cadastro para ver o resultado."
            },
            {
              "id": "SynthID",
              "aplicacao": "⚠️ Testada em 12/11: só detecta marca d’água do Google; ausência não prova nada."
            },
            {
              "id": "AmIReal",
              "aplicacao": "⚠️ Testada em 12/11: só para rosto gerado por StyleGAN (olhos sempre no mesmo lugar)."
            },
            {
              "id": "Undetectable AI",
              "aplicacao": "⚠️ Testada em 12/11: falso positivo em foto real: só indício, nunca prova."
            }
          ]
        },
        {
          "id": "imagem-03-c3",
          "titulo": "Forense Audiovisual e Estrutural",
          "conceito": "Análise estática e dinâmica focada em validar a autenticidade de arquivos de áudio (clones de voz) e vídeos (deepfakes) através de espectrografia e mapeamento biométrico.",
          "comoFunciona": "As ferramentas extraem frequências de som para formar espectrogramas analíticos ou rastreiam os marcos faciais quadro a quadro em vídeos para detectar anomalias biológicas em seres humanos.",
          "utilidadeOsint": "Essencial para auditar mídias complexas em que a IA foi usada para mimetizar um alvo, detectando microexpressões sintéticas em vídeos adulterados ou quebras abruptas de ruído de fundo que denunciam edições em gravações de voz.",
          "tools": [
            {
              "id": "Sonic Visualiser",
              "aplicacao": "Permite ao analista inspecionar passivamente o espectrograma de uma gravação de voz suspeita para detectar cortes abruptos, edições ocultas ou assinaturas de compressão sintética (típicas de clones de voz), auxiliando na atribuição e validação de autenticidade da mídia coletada."
            },
            {
              "id": "OpenFace",
              "aplicacao": "Foca na microestrutura do movimento facial, permitindo extrair atributos biométricos locais e auditar falhas em vídeos suspeitos de deepfakes. A ferramenta identifica se uma expressão facial ou um padrão de piscada em um vídeo manipulado apresenta anomalias matemáticas em relação ao comportamento humano natural."
            },
            {
              "id": "FFmpeg"
            },
            {
              "id": "VideoLAN (VLC Media Player)"
            }
          ]
        }
      ]
    },
    {
      "num": "04",
      "nome": "Cronolocalização & Azimute Solar",
      "icone": "☀️",
      "opsec": {
        "nivel": "passivo",
        "nota": "🟢 PASSIVO"
      },
      "vetor": "Iluminação / Sombras / Clima ➔ Data / Horário Aproximado / Estação do Ano",
      "objetivo": "Determinar quando uma foto ou vídeo foi gravado. Através do estudo das sombras, comprimento da luz solar e dados ambientais, o investigador destrói falsas narrativas e comprova a cronologia física da mídia.",
      "camadas": [
        {
          "id": "imagem-04-c1",
          "titulo": "Simulação 3D, Sombras e Cálculo Solar",
          "conceito": "Reprodução do ângulo da luz solar sobre a topografia do planeta em datas e horas específicas e cálculo matemático da projeção de sombras.",
          "comoFunciona": "Ferramentas interativas e matemáticas utilizam equações astronômicas e dados cartográficos para simular o comportamento da luz solar, calculando e projetando o tamanho de sombras exatas em objetos fixos e relevos.",
          "utilidadeOsint": "Permite que o analista altere o controle de tempo (horas e estações do ano) para verificar em qual momento do dia a projeção da luz na imagem corresponderia à realidade, refutando álibis e confirmando a hora exata da captura de forma incontestável.",
          "tools": [
            {
              "id": "SunCalc",
              "aplicacao": "✅ Testada em 12/11: sombra, azimute e altura do sol por URL."
            },
            {
              "id": "Shadowmap",
              "aplicacao": "Permite que o analista altere o controle de tempo (horas e estações do ano) para verificar em qual momento do dia a projeção da luz nos prédios da imagem corresponderia à realidade, utilizando modelos 3D arquitetônicos altamente fiéis a metrópoles para reduzir a taxa de erro geográfico."
            },
            {
              "id": "SunEarthTools",
              "aplicacao": "Atua como um complemento robusto ao SunCalc. Gera tabelas de dados brutos exportáveis com valores de azimute e zênite minuto a minuto, conferindo maior precisão matemática e rigor pericial para investigações que exigem relatórios formais sobre os ângulos de incidência da luz."
            }
          ]
        },
        {
          "id": "imagem-04-c2",
          "titulo": "Validação Climática, Ambiental e Orbital",
          "conceito": "Cruzamento das condições visuais (nuvens, chuva, etc.) e astronômicas de uma evidência com os registros históricos meteorológicos e posições de satélites daquele momento.",
          "comoFunciona": "Os sistemas indexam telemetria orbital, dados de estações meteorológicas e registros atmosféricos retroativos para reconstruir as condições ambientais passadas de qualquer local do mundo.",
          "utilidadeOsint": "Fornece o histórico exato de uma região, permitindo cruzar o clima ou o posicionamento de astros vistos na foto com a data alegada, além de validar se determinado objeto capturado no céu poderia tratar-se da passagem de um satélite conhecido.",
          "tools": [
            {
              "id": "INMET Satélite",
              "aplicacao": "✅ Testada em 12/11: clima na data alegada."
            },
            {
              "id": "In-The-Sky.org (Live Satellite World Map)",
              "aplicacao": "✅ Testada em 12/11: satélites visíveis; detecta a cidade de quem acessa."
            },
            {
              "id": "WolframAlpha",
              "aplicacao": "⚠️ Testada em 12/11: informe o fuso: usa o do navegador."
            }
          ]
        }
      ]
    },
    {
      "num": "05",
      "nome": "Tratamento, Visão Computacional & OCR",
      "icone": "🔠",
      "opsec": {
        "nivel": "passivo",
        "nota": "🟢 PASSIVO"
      },
      "vetor": "Imagem Ilegível / Complexa ➔ Textos Transcritos / Identificação de Rótulos / Resolução Aprimorada",
      "objetivo": "Lidar com mídias degradadas e extrair dados operacionais automatizados. Utiliza-se IA para aumentar a nitidez de placas de veículos e logotipos, remover obstáculos visuais ou classificar em massa elementos visíveis (OCR).",
      "camadas": [
        {
          "id": "imagem-05-c1",
          "titulo": "Limpeza, Recorte e Upscaling",
          "conceito": "Aumento de resolução (Upscaling) sem distorção, eliminação de artefatos de compressão e isolamento do elemento principal da imagem.",
          "comoFunciona": "Modelos de inteligência artificial analisam a matriz de pixels degradados e reconstroem a mídia baseando-se em aprendizado profundo, ajustando nitidez e removendo fundos indesejados automaticamente.",
          "utilidadeOsint": "Melhora capturas de tela antigas, embaçadas ou severamente pixeladas, facilitando a identificação forense de logotipos, placas e textos ocultos. Permite também recortar alvos específicos em multidões e remover fundos poluídos para pesquisas de rosto ou confecção de personas.",
          "tools": [
            {
              "id": "Palette (OSINT Industries)",
              "aplicacao": "⚠️ Testada em 12/11: exige conta."
            },
            {
              "id": "PicWish",
              "aplicacao": "Usa IA para remover fundos indesejados e desborrar fotos. Permite que o analista limpe ruídos visuais ao redor de um alvo e amplie capturas de tela desfocadas ou de baixa resolução obtidas em redes sociais para facilitar a leitura de caracteres ocultos."
            },
            {
              "id": "Plataforma Let's Enhance",
              "aplicacao": "Especializada em aumentar a resolução de arquivos visuais em até 16 vezes sem perda de definição e remover artefatos de compressão JPEG. Auxilia o investigador a tornar legíveis elementos contextuais incompreensíveis, como placas de sinalização e textos em segundo plano."
            },
            {
              "id": "Plataforma Krea.ai",
              "aplicacao": "Seu motor de upscaling atua na redução de ruídos e na melhoria de resolução de mídias degradadas, facilitando a identificação forense de elementos visuais menores na cena."
            },
            {
              "id": "Remove.bg",
              "aplicacao": "Utilizado de forma tática para isolar o rosto ou corpo de um perfil sintético e recortar alvos específicos, auxiliando na limpeza visual de mídias e facilitando pesquisas biométricas limpas."
            }
          ]
        },
        {
          "id": "imagem-05-c2",
          "titulo": "OCR Visual e Extração Massiva por IA",
          "conceito": "Motores de detecção e classificação (Auto-tagging) que leem textos complexos na imagem ou categorizam itens e cenas.",
          "comoFunciona": "Algoritmos avançados de visão computacional varrem a fotografia identificando padrões estruturais para atribuir rótulos (tags) automáticos ou transcrever trechos de caracteres gráficos em texto editável (OCR).",
          "utilidadeOsint": "Permite classificar em massa milhares de mídias, auditar a presença de logotipos, veículos ou armas, e extrair passivamente strings textuais com altíssima precisão a partir de pichações, cartazes ou letreiros no fundo de fotografias.",
          "tools": [
            {
              "id": "NewOCR",
              "aplicacao": "✅ Testada em 12/11: OCR exato no teste; operar à mão."
            },
            {
              "id": "Amazon Rekognition",
              "aplicacao": "⚠️ Testada em 12/11: exige conta AWS."
            },
            {
              "id": "Imagga",
              "aplicacao": "Ferramenta que recebe fotos e gera rótulos automáticos (ex: 'Logística', 'Prédio'). Viabiliza categorizar automaticamente milhares de imagens coletadas durante uma operação, filtrando rapidamente a presença de marcas corporativas ou modelos de veículos."
            },
            {
              "id": "ImageIdentify",
              "aplicacao": "Auxilia o analista a extrair pistas contextuais de fotografias sem metadados, identificando de forma automatizada modelos de veículos, arquiteturas específicas ou acidentes geográficos baseados em sua árvore de conhecimento nativa."
            }
          ]
        },
        {
          "id": "imagem-05-c3",
          "titulo": "OCR Forense em Acervos Documentais",
          "conceito": "Extração automatizada de entidades, OCR avançado e transcrição de textos analíticos dentro de grandes volumes de documentos estáticos não estruturados.",
          "comoFunciona": "A plataforma processa repósitorios massivos contendo milhares de imagens digitalizadas e PDFs e converte o texto incrustado nas páginas gráficas em cadeias de texto indexadas e pesquisáveis.",
          "utilidadeOsint": "Fundamental para lidar com mídias e documentos degradados de vazamentos (leaks) e processos judiciais escaneados onde a informação de interesse (como nomes ou empresas) se encontra bloqueada no formato de imagem.",
          "tools": [
            {
              "id": "Google Pinpoint",
              "aplicacao": "⚠️ Testada em 12/11: exige conta aprovada."
            }
          ]
        }
      ]
    },
    {
      "num": "06",
      "nome": "Preservação Digital & Cadeia de Custódia",
      "icone": "🔒",
      "opsec": {
        "nivel": "ativo",
        "nota": "🔴 ATIVO / 🟡 PASSIVO CONTROLADO"
      },
      "vetor": "Evidência Digital Volátil ➔ Material Juridicamente Válido / Relatórios Auditáveis",
      "objetivo": "Congelar a evidência para que ela possua valor jurídico. Evitar a quebra da cadeia de custódia caso o criminoso apague a fotografia, o post na rede social ou altere o conteúdo original.",
      "camadas": [
        {
          "id": "imagem-06-c1",
          "titulo": "Validação Jurídica e Fixação de Hashes",
          "conceito": "Geração de identificadores criptográficos matemáticos únicos (MD5, SHA-256) que atestam que aquele arquivo nunca foi alterado desde a coleta, e materialização visual primária.",
          "comoFunciona": "O analista utiliza plataformas certificadas e extensões isoladas para congelar o estado atual da página, capturar a evidência estática e aplicar selos criptográficos antes que qualquer conteúdo seja removido pelo alvo.",
          "utilidadeOsint": "Essencial para formalizar materialmente a prova digital, garantindo sua aceitação em juízo e prevenindo contestações técnicas de manipulação ou adulteração por parte da defesa do alvo.",
          "tools": [
            {
              "id": "GoFullPage - Full Page Screen Capture",
              "aplicacao": "✅ Testada em 12/11: Extensão do Chrome com 11 milhões de usuários."
            },
            {
              "id": "Verifact",
              "aplicacao": "⚠️ Testada em 12/11: pago; registro com validade jurídica."
            }
          ]
        },
        {
          "id": "imagem-06-c2",
          "titulo": "Espelhamento Web e Arquivamento Forense",
          "conceito": "Fazer o snapshot ou baixar a estrutura técnica do site onde a mídia estava hospedada, em formatos forenses (como o formato WARC) e resgatar armazenamentos legados.",
          "comoFunciona": "Ferramentas gravam o tráfego de rede interativo enquanto a página carrega, clonam a estrutura completa do site para o disco rígido ou acessam índices globais para recuperar versões removidas.",
          "utilidadeOsint": "Resgata conteúdos passados ocultados pelo investigado, além de permitir o espelhamento interativo e offline de páginas complexas para auditorias periciais sem gerar tráfego constante ao servidor alvo.",
          "tools": [
            {
              "id": "Wayback Machine (Internet Archive)",
              "aplicacao": "⚠️ Testada em 12/11: instável; a API wayback/available ajuda a achar a captura."
            },
            {
              "id": "Webrecorder",
              "aplicacao": "Grava todo o tráfego de rede gerado no navegador enquanto a página é carregada e manipulada (execução de scripts, mídias). Permite criar um espelho interativo do site do alvo que preserva o comportamento original e os cabeçalhos HTTP, gerando pacotes de arquivo padronizados para a preservação forense."
            },
            {
              "id": "ReplayWeb.page",
              "aplicacao": "Um visualizador offline e serverless que permite carregar ficheiros brutos gerados pelo Webrecorder (WARC/WACZ). Permite auditar minuciosamente o conteúdo histórico de um site clonado de forma estática, provando como a página e as mídias apareciam no momento exato da coleta sem interagir com a internet viva."
            },
            {
              "id": "Cyotek WebCopy",
              "aplicacao": "Funciona como um rastreador da web (crawler) que clona a estrutura completa de um portal de interesse para o disco rígido do investigador. Permite mapear dependências e inspecionar códigos de forma offline, mitigando riscos de contramedidas e reduzindo a pegada técnica."
            }
          ]
        }
      ]
    }
  ]
});
