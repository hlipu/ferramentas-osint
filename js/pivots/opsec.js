// Pivotagem v2. Edite com cuidado.
// tools: "ID do catálogo" | {id, aplicacao?, opsec?, alerta?} | {nome,url,aplicacao,externo:true}
// regra.tags: mostra também outras ferramentas do catálogo com TODAS essas tags.
// module.icone: emoji do diagrama do topo (livre para trocar).
registerPivot({
  "id": "opsec",
  "categoria": "apoio",
  "tipo": "apoio",
  "icone": "🛡️",
  "titulo": "OPSEC & Ambiente",
  "subtitulo": "// Preparação do analista antes da pivotagem por alvo: rede, navegador, sistema isolado, personas e proteção dos dados.",
  "modulos": [
    {
      "num": "01",
      "nome": "Rede & Navegação Privativa",
      "icone": "🛡️",
      "opsec": {
        "nivel": "preparacao"
      },
      "vetor": "Analista ➔ IP mascarado / Buscas sem rastreamento",
      "objetivo": "Reduzir a exposição do IP, da localização e do histórico de buscas do analista.",
      "camadas": [
        {
          "id": "opsec-01-c1",
          "titulo": "Rede, VPN e Proxies",
          "tools": [
            {
              "id": "WhatsMyUA",
              "aplicacao": "✅ Testada em 12/11: Mostra o user agent que os sites recebem e como uma biblioteca de detecção o interpreta."
            },
            {
              "id": "TorMap",
              "aplicacao": "Mapa dos relés Tor, útil para entender a rede e reconhecer IPs de saída Tor nos registros do próprio caso."
            }
          ],
          "nota": "Mascaramento de IP e tráfego cifrado.",
          "filtro": [
            "ambiente-seguro"
          ],
          "excluir": [
            "Proxy List (jetkai)"
          ]
        },
        {
          "id": "opsec-01-c2",
          "titulo": "Redes Anônimas",
          "tools": [
            {
              "id": "I2P Search",
              "aplicacao": "✅ Testada em 12/11: Busca em eepsites da rede I2P (e dark web via OnionLand): o termo forum dá cerca de 48 resultados."
            }
          ],
          "nota": "Acesso a redes de sobreposição.",
          "filtro": [
            "ambiente-seguro"
          ]
        },
        {
          "id": "opsec-01-c3",
          "titulo": "Buscadores Privativos",
          "tools": [
            {
              "id": "Disconnect Search",
              "aplicacao": "✅ Testada em 12/11: search.disconnect.me/searchTerms/search?query={termo}: resultados normais (site oficial 16 vezes)."
            },
            {
              "id": "DuckDuckGo",
              "aplicacao": "✅ Testada em 12/11: Busca direta duckduckgo.com/?q={termo}: resultados normais (o site oficial apareceu 14 vezes nos links)."
            },
            {
              "id": "Gibiru",
              "aplicacao": "✅ Testada em 12/11: gibiru.com/results.html?q={termo}: resultados normais (site oficial 18 vezes)."
            },
            {
              "id": "eTools.ch",
              "aplicacao": "⚠️ Testada em 12/11: Metabusca bloqueada por captcha (Sorry for the CAPTCHA) com navegador automatizado."
            },
            {
              "id": "I Search From",
              "aplicacao": "⚠️ Testada em 12/11: Simula busca do Google de outro país, idioma e dispositivo."
            },
            {
              "id": "MetaGer",
              "aplicacao": "⚠️ Testada em 12/11: A busca agora exige uma chave com saldo (sem conta nem e-mail, mas paga)."
            },
            {
              "id": "Mojeek",
              "aplicacao": "⚠️ Testada em 12/11: Índice próprio, mas pediu I am not a robot com navegador automatizado."
            },
            {
              "id": "Startpage",
              "aplicacao": "⚠️ Testada em 12/11: Ficou na prova de trabalho Verificando sua solicitação/Calculando por mais de 15 s e não liberou a busca para o navegador automatizado."
            },
            {
              "id": "Swisscows",
              "aplicacao": "⚠️ Testada em 12/11: swisscows.com/pt/web?query={termo}: página carregou sem resultados para o termo de teste (só anúncio e menu)."
            }
          ],
          "nota": "Consultas sem perfil de usuário.",
          "filtro": [
            "ambiente-seguro"
          ]
        },
        {
          "id": "opsec-01-c4",
          "titulo": "Ambiente e Proteção da Estação",
          "tools": [
            {
              "id": "DeviceInfo.me",
              "aplicacao": "✅ Testada em 12/11: Lista o que o navegador expõe: fingerprint de canvas e áudio, WebRTC e IP local, fuso, idiomas, Do Not Track, bloqueador de anúncios, proxy e Tor."
            },
            {
              "id": "Fingerprint Demo (fingerprint.com/demo)",
              "aplicacao": "✅ Testada em 12/11: Gera um Visitor ID que persiste mesmo em aba anônima ou VPN (o próprio site desafia a tentar) e mostra navegador, SO e IP."
            },
            {
              "id": "Pipl Personal Information Removal Request",
              "aplicacao": "✅ Testada em 12/11: Formulário de pedido de remoção dos próprios dados da base Pipl (reCAPTCHA)."
            },
            {
              "id": "VPN Gate",
              "aplicacao": "✅ Testada em 12/11: Lista pública de servidores VPN voluntários da Universidade de Tsukuba (redireciona para /en/)."
            },
            {
              "id": "GeoNode",
              "aplicacao": "⚠️ Testada em 12/11: Venda de proxies residenciais e de datacenter (redireciona para /pt)."
            },
            {
              "id": "NCSC - Operations Security (OPSEC)",
              "aplicacao": "⚠️ Testada em 12/11: A página foi movida para archive.dni.gov (site ARQUIVADO do DNI dos EUA): conteúdo de referência sobre OPSEC, sem atualização."
            },
            {
              "id": "Android Studio",
              "aplicacao": "Emula um celular Android isolado para usar aplicativos do alvo ou da investigação sem instalá-los no aparelho pessoal."
            },
            {
              "id": "Avast Secure Browser",
              "aplicacao": "Navegador com bloqueio de rastreadores e proteção contra fingerprinting, útil como navegador dedicado à investigação."
            },
            {
              "id": "AxCrypt",
              "aplicacao": "Criptografa arquivos individuais de evidências e relatórios, protegendo o material do caso em caso de perda ou acesso indevido."
            },
            {
              "id": "BitLocker Drive Encryption",
              "aplicacao": "Criptografa o disco inteiro da estação de trabalho no Windows, protegendo todo o material da investigação em repouso."
            },
            {
              "id": "Bitmask",
              "aplicacao": "Cliente de VPN de provedores comunitários, opção adicional para separar o tráfego da investigação da conexão pessoal."
            },
            {
              "id": "Brave Browser",
              "aplicacao": "Bloqueia rastreadores por padrão e oferece janela privada com Tor, separando a navegação do caso da navegação pessoal."
            },
            {
              "id": "Canarytokens",
              "aplicacao": "Permite plantar arquivos-alarme no próprio material do caso: se alguém abrir um relatório ou pasta vazada, você é avisado."
            },
            {
              "id": "CCleaner",
              "aplicacao": "Limpa cookies, cache e histórico entre sessões, reduzindo rastros que poderiam ligar a investigação ao analista."
            },
            {
              "id": "Comodo Dragon / IceDragon",
              "aplicacao": "Navegador alternativo com DNS seguro, útil para manter um navegador separado por persona ou por caso."
            },
            {
              "id": "Google Colaboratory (Colab)",
              "aplicacao": "Executa scripts de coleta e processamento na nuvem, evitando instalar ferramentas e expor o IP da estação pessoal."
            },
            {
              "id": "IntelTechniques",
              "aplicacao": "Referência de Michael Bazzell sobre OPSEC e privacidade do investigador, com guias para montar o ambiente de trabalho."
            },
            {
              "id": "Iridium Browser",
              "aplicacao": "Chromium sem telemetria para o Google, opção de navegador dedicado à investigação."
            },
            {
              "id": "Kali Linux",
              "aplicacao": "Distribuição pronta com ferramentas de reconhecimento e forense, para rodar em máquina virtual isolada."
            },
            {
              "id": "KeePassXC",
              "aplicacao": "Guarda senhas, chaves de API e dados das personas offline e criptografados, evitando reutilizar credenciais entre identidades."
            },
            {
              "id": "Mailbox.org",
              "aplicacao": "E-mail pago e focado em privacidade, adequado para contas de trabalho separadas da identidade pessoal."
            },
            {
              "id": "Malwarebytes",
              "aplicacao": "Verifica a estação após abrir arquivos e links suspeitos coletados na investigação."
            },
            {
              "id": "NordVPN",
              "aplicacao": "VPN comercial para ocultar o IP real da estação e escolher o país de saída compatível com a persona."
            },
            {
              "id": "Posteo",
              "aplicacao": "E-mail com cadastro sem dados pessoais e pagamento anônimo, adequado para contas de trabalho separadas."
            },
            {
              "id": "PrivateMail",
              "aplicacao": "E-mail e armazenamento criptografados para trocar material sensível do caso com segurança."
            },
            {
              "id": "Proton Mail",
              "aplicacao": "E-mail criptografado e gratuito, muito usado para criar as contas de e-mail das personas de investigação."
            },
            {
              "id": "ProtonVPN",
              "aplicacao": "VPN com plano gratuito e política de não registro, para separar o tráfego da investigação da conexão pessoal."
            },
            {
              "id": "Qubes OS",
              "aplicacao": "Isola cada atividade em uma máquina virtual própria (uma por persona ou por caso), contendo danos se algo for comprometido."
            },
            {
              "id": "SUPERAntiSpyware",
              "aplicacao": "Segunda verificação contra spyware na estação de trabalho, complementar ao antivírus principal."
            },
            {
              "id": "Tails (The Amnesic Incognito Live System)",
              "aplicacao": "Sistema que roda de um pendrive, navega só pelo Tor e não deixa rastros no computador, ideal para consultas de alto risco."
            },
            {
              "id": "The Grugq - OPSEC Blog",
              "aplicacao": "Artigos sobre OPSEC e contrainteligência que ajudam a entender como investigadores são descobertos e como evitar isso."
            },
            {
              "id": "VeraCrypt",
              "aplicacao": "Cria volumes criptografados para guardar evidências e dados das personas, inclusive em pendrives."
            },
            {
              "id": "VirtualBox",
              "aplicacao": "Máquinas virtuais gratuitas para separar o ambiente de investigação do sistema pessoal, com snapshots para voltar a um estado limpo."
            },
            {
              "id": "VMware Workstation Player",
              "aplicacao": "Alternativa ao VirtualBox para rodar a máquina virtual de investigação com bom desempenho e snapshots."
            },
            {
              "id": "Whonix",
              "aplicacao": "Força todo o tráfego da máquina virtual pelo Tor, impedindo que um erro de configuração vaze o IP real."
            }
          ],
          "nota": "Navegadores, sistemas isolados, cifragem e auditoria de pegada.",
          "filtro": [
            "ambiente-seguro"
          ]
        }
      ]
    },
    {
      "num": "02",
      "nome": "Personas (Sock Puppets)",
      "icone": "🎭",
      "opsec": {
        "nivel": "preparacao"
      },
      "vetor": "Analista ➔ Identidade de cobertura / E-mail e telefone descartáveis",
      "objetivo": "Criar identidades de cobertura sem ligá-las aos dados reais do analista.",
      "camadas": [
        {
          "id": "opsec-02-c1",
          "titulo": "Identidades, Rostos e Contas de Cobertura",
          "tools": [
            {
              "id": "Random Name Generator",
              "aplicacao": "✅ Testada em 12/11: Gerador de nomes aleatórios por país e gênero (reCAPTCHA)."
            },
            {
              "id": "Tempail",
              "aplicacao": "✅ Testada em 12/11: Gera na hora uma caixa de e-mail temporária pública e mostra a caixa de entrada (aguardando e-mails), com cópia, QR e exclusão."
            },
            {
              "id": "4Devs",
              "aplicacao": "⚠️ Testada em 12/11: Ferramentas brasileiras para desenvolvedores (geradores de CPF, CNPJ, pessoa, cartão."
            },
            {
              "id": "5Sim",
              "aplicacao": "⚠️ Testada em 12/11: Venda de números virtuais para receber SMS de verificação (por país e serviço)."
            },
            {
              "id": "Data Fake Generator",
              "aplicacao": "⚠️ Testada em 12/11: Identity Generator: nomes, endereços, telefones e e-mails falsos."
            },
            {
              "id": "Fake Person Generator",
              "aplicacao": "⚠️ Testada em 12/11: Gerador de identidade falsa (nome, endereço, telefone, documento conforme país), com reCAPTCHA."
            },
            {
              "id": "SMSPVA",
              "aplicacao": "⚠️ Testada em 12/11: Números virtuais para receber SMS de verificação (pago, reCAPTCHA)."
            },
            {
              "id": "Craiyon",
              "aplicacao": "Gera imagens genéricas (paisagens, objetos, avatares ilustrados) para compor o perfil da persona sem usar fotos reais."
            },
            {
              "id": "Emkei.cz",
              "aplicacao": "Demonstra como remetentes de e-mail podem ser falsificados, servindo para conscientização e para analisar cabeçalhos de mensagens suspeitas recebidas."
            },
            {
              "id": "FaceSwapper.ai",
              "aplicacao": "Mostra como rostos podem ser trocados em fotos e vídeos, ajudando o analista a reconhecer montagens; nunca use o rosto de pessoas reais em personas."
            },
            {
              "id": "Generated Photos",
              "aplicacao": "Rostos sintéticos gerados por IA para avatar da persona, evitando usar fotos de pessoas reais."
            },
            {
              "id": "Genso AI",
              "aplicacao": "Gera variações consistentes de imagens para manter a mesma aparência da persona em diferentes publicações."
            },
            {
              "id": "Gensou AI",
              "aplicacao": "Gera imagens e vídeos com o mesmo personagem, útil para manter a persona visualmente consistente ao longo do tempo."
            },
            {
              "id": "Gerador de CPF Válido (geradortxt)",
              "aplicacao": "Gera CPFs fictícios para testar sistemas e formulários; usá-los em cadastros reais é ilegal."
            },
            {
              "id": "Magnific Icons",
              "aplicacao": "Ícones e elementos visuais para relatórios, grafos e para compor perfis de persona sem usar imagens de terceiros."
            },
            {
              "id": "Marketing Tool - Face Generator",
              "aplicacao": "Gera rostos fictícios configuráveis (idade, gênero) para o avatar da persona."
            },
            {
              "id": "MyHeritage Deep Nostalgia",
              "aplicacao": "Mostra como fotos estáticas podem ser animadas por IA, alertando que vídeos curtos de rostos não comprovam que a pessoa existe."
            },
            {
              "id": "PortraitAI",
              "aplicacao": "Estiliza o avatar da persona como ilustração, reduzindo a chance de a foto ser reconhecida como gerada por IA."
            },
            {
              "id": "Remaker AI",
              "aplicacao": "Gera variações do rosto sintético da persona (ângulos, expressões) para manter várias fotos coerentes; não use rostos de pessoas reais."
            },
            {
              "id": "This Person Does Not Exist",
              "aplicacao": "Gera um rosto sintético a cada acesso, para avatar de persona sem usar a foto de alguém real."
            },
            {
              "id": "Tuta (anteriormente Tutanota)",
              "aplicacao": "E-mail criptografado e gratuito, alternativa ao Proton Mail para as contas das personas."
            },
            {
              "id": "UK-OSINT - Creating Fake IDs & Personas",
              "aplicacao": "Guia de boas práticas para criar e manter personas de pesquisa de forma consistente e segura."
            },
            {
              "id": "Zoho",
              "aplicacao": "Suíte com e-mail em domínio próprio, útil para personas que precisam de um e-mail com aparência profissional."
            }
          ],
          "nota": "Dados sintéticos, rostos de IA, e-mail e SMS descartáveis.",
          "filtro": [
            "personas"
          ],
          "excluir": [
            "OpenAI Labs (DALL-E)",
            "Randus"
          ]
        }
      ]
    }
  ]
});
