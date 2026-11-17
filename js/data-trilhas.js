// js/data-trilhas.js
// ═══════════════════════════════════════════════════════════════════════
// MOTOR DE TRILHAS — grafo de tipos de dado
//
// ENTIDADES  = nós do grafo (tipos de dado que você pode ter em mãos).
// TRILHAS    = arestas: "a partir de [de], consigo chegar em [para]".
//
// Cada salto aponta para um módulo de PIVOTS (pivot + modulo). Objetivo,
// OPSEC e ferramentas NÃO são repetidos aqui: a página os lê de
// js/pivots/*.js e cruza com o catálogo (data.js) em tempo real.
//
// tipo:
//   'pivot'      → gera novas entidades (aresta normal do grafo)
//   'analise'    → valida/enriquece a entidade, sem gerar outra
//   'preservacao'→ transforma em evidência (fim de linha)
//   'preparacao' → OPSEC do analista; não depende de entidade
//   'conversao'  → passo trivial sem ferramenta (ex.: URL ➔ domínio)
// ═══════════════════════════════════════════════════════════════════════

const GRUPOS_ENTIDADE = {
  pessoa:          { nome: 'Pessoa',            cor: '#00ff88' },
  identificador:   { nome: 'Identificadores',   cor: '#4db8ff' },
  empresa:         { nome: 'Empresa',           cor: '#ffb800' },
  infraestrutura:  { nome: 'Infraestrutura',    cor: '#b48cff' },
  midia:           { nome: 'Mídia & Geo',       cor: '#ff7ab6' },
  financeiro:      { nome: 'Financeiro',        cor: '#ffd36b' },
  bens:            { nome: 'Bens & Ativos',     cor: '#5ee0d6' },
  registro:        { nome: 'Registros & Passivos', cor: '#ff6b6b' },
  resultado:       { nome: 'Resultados',        cor: '#a9b1c0' }
};

// detectar: regex usada para reconhecer automaticamente um valor colado.
const ENTIDADES = {
  // ── Pessoa
  cpf:            { nome: 'CPF',                    grupo: 'pessoa',        icone: '📄', exemplo: '123.456.789-09', detectar: /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/ },
  nome_pessoa:    { nome: 'Nome / Identidade civil', grupo: 'pessoa',       icone: '🧑', exemplo: 'Fulano de Tal' },
  endereco:       { nome: 'Endereço físico',        grupo: 'pessoa',        icone: '🏠', exemplo: 'Rua X, 100 - Cuiabá/MT' },
  rosto:          { nome: 'Rosto / Biometria',      grupo: 'pessoa',        icone: '🙂', exemplo: 'Foto do rosto do alvo' },
  rede_relacionamento: { nome: 'Rede de relacionamentos', grupo: 'pessoa',  icone: '🕸️', exemplo: 'Amigos, seguidores, sócios' },

  // ── Identificadores digitais
  email:          { nome: 'E-mail',                 grupo: 'identificador', icone: '✉️', exemplo: 'alvo@dominio.com', detectar: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
  telefone:       { nome: 'Telefone',               grupo: 'identificador', icone: '📱', exemplo: '+55 65 99999-9999', detectar: /^\+?[\d\s().-]{10,18}$/ },
  username:       { nome: 'Username / Handle',      grupo: 'identificador', icone: '👤', exemplo: '@alvo_123', detectar: /^@[\w.]{2,30}$/ },
  perfil_social:  { nome: 'Perfil em rede social',  grupo: 'identificador', icone: '📲', exemplo: 'instagram.com/alvo' },
  credencial:     { nome: 'Credencial vazada',      grupo: 'identificador', icone: '🔑', exemplo: 'Senha / hash em vazamento' },
  cabecalho_email:{ nome: 'Cabeçalho de e-mail',    grupo: 'identificador', icone: '📨', exemplo: 'Headers de um e-mail recebido' },

  // ── Empresa
  cnpj:           { nome: 'CNPJ',                   grupo: 'empresa',       icone: '🏢', exemplo: '12.345.678/0001-90', detectar: /^\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2}$/ },
  razao_social:   { nome: 'Razão social / Empresa', grupo: 'empresa',       icone: '🏷️', exemplo: 'Empresa X LTDA' },

  // ── Infraestrutura
  dominio:        { nome: 'Domínio',                grupo: 'infraestrutura', icone: '🌐', exemplo: 'exemplo.com.br', detectar: /^(?!https?:)([a-z0-9-]+\.)+[a-z]{2,}$/i },
  subdominio:     { nome: 'Subdomínio',             grupo: 'infraestrutura', icone: '🔀', exemplo: 'dev.exemplo.com.br' },
  url:            { nome: 'URL',                    grupo: 'infraestrutura', icone: '🔗', exemplo: 'https://exemplo.com/pagina', detectar: /^https?:\/\/\S+$/i },
  ip:             { nome: 'Endereço IP',            grupo: 'infraestrutura', icone: '🖧', exemplo: '200.100.50.25', detectar: /^(\d{1,3}\.){3}\d{1,3}$|^(?=.*:.*:)[0-9a-f:]{6,}$/i },
  asn:            { nome: 'ASN / Hospedagem',       grupo: 'infraestrutura', icone: '🛰️', exemplo: 'AS28573', detectar: /^AS\d{1,10}$/i },
  tracker_id:     { nome: 'ID de rastreador',       grupo: 'infraestrutura', icone: '🧬', exemplo: 'UA-12345-1 / ca-pub-… / hash de favicon', detectar: /^(UA-\d+-\d+|G-[A-Z0-9]{6,}|GTM-[A-Z0-9]+|ca-pub-\d+|pub-\d{10,})$/ },
  ioc:            { nome: 'IoC / Reputação',        grupo: 'infraestrutura', icone: '☣️', exemplo: 'Hash de malware, blacklist' },
  historico_web:  { nome: 'Histórico web',          grupo: 'infraestrutura', icone: '🕰️', exemplo: 'Versões antigas do site' },

  // ── Mídia & Geo
  imagem:         { nome: 'Imagem / Vídeo',         grupo: 'midia',         icone: '🖼️', exemplo: 'Arquivo de foto ou vídeo' },
  publicacao:     { nome: 'Publicação (post/story)', grupo: 'midia',        icone: '📝', exemplo: 'Post, story, comentário' },
  coordenadas:    { nome: 'Localização / Coordenadas', grupo: 'midia',      icone: '📍', exemplo: '-15.601, -56.097', detectar: /^-?\d{1,2}\.\d+,\s*-?\d{1,3}\.\d+$/ },
  data_hora:      { nome: 'Data / Horário',         grupo: 'midia',         icone: '⏱️', exemplo: 'Quando a foto foi tirada' },

  // ── Financeiro
  carteira_crypto:{ nome: 'Carteira cripto',        grupo: 'financeiro',    icone: '💎', exemplo: 'bc1q… / 0x…', detectar: /^(bc1[a-z0-9]{20,}|[13][a-km-zA-HJ-NP-Z1-9]{25,34}|0x[a-fA-F0-9]{40}|T[A-Za-z1-9]{33})$/ },
  hash_transacao: { nome: 'Hash de transação',      grupo: 'financeiro',    icone: '🧾', exemplo: '0x… / txid', detectar: /^(0x)?[a-fA-F0-9]{64}$/ },
  chave_pix:      { nome: 'PIX (QR / copia e cola)', grupo: 'financeiro',   icone: '💠', exemplo: '00020126…', detectar: /^000201\d{2}/ },
  conta_bancaria: { nome: 'Relacionamento bancário', grupo: 'financeiro',   icone: '🏦', exemplo: 'Banco / agência / instituição' },

  // ── Bens & Ativos
  veiculo:        { nome: 'Veículo (placa/chassi)', grupo: 'bens',          icone: '🚗', exemplo: 'ABC1D23', detectar: /^[A-Z]{3}-?\d[A-Z0-9]\d{2}$/i },
  aeronave:       { nome: 'Aeronave (prefixo)',     grupo: 'bens',          icone: '✈️', exemplo: 'PR-ABC', detectar: /^P[PRSTU]-?[A-Z]{3}$/i },
  embarcacao:     { nome: 'Embarcação (IMO/nome)',  grupo: 'bens',          icone: '🚢', exemplo: 'IMO 9074729', detectar: /^IMO\s?\d{7}$/i },
  imovel:         { nome: 'Imóvel / Propriedade rural', grupo: 'bens',      icone: '🏞️', exemplo: 'Matrícula, CAR, INCRA' },
  dispositivo:    { nome: 'Dispositivo (IMEI/modelo)', grupo: 'bens',       icone: '📟', exemplo: 'IMEI, nº de série, modelo' },

  // ── Registros & Passivos
  processo:       { nome: 'Processo judicial',      grupo: 'registro',      icone: '⚖️', exemplo: '0001234-56.2024.8.11.0041', detectar: /^\d{7}-?\d{2}\.?\d{4}\.?\d\.?\d{2}\.?\d{4}$/ },
  passivo_financeiro: { nome: 'Dívidas & Protestos', grupo: 'registro',     icone: '📉', exemplo: 'Dívida ativa, protesto, restrição' },
  sancao:         { nome: 'Sanções & Embargos',     grupo: 'registro',      icone: '⛔', exemplo: 'CEIS, inidoneidade, embargo IBAMA' },
  contrato_publico: { nome: 'Contratos & Repasses públicos', grupo: 'registro', icone: '🏛️', exemplo: 'Licitação, empenho, doação eleitoral' },
  licenca:        { nome: 'Licenças & Patentes',    grupo: 'registro',      icone: '📜', exemplo: 'INPI, ANVISA, ANP, ANEEL' },

  // ── Resultados (fim de linha)
  evidencia:      { nome: 'Evidência preservada',   grupo: 'resultado',     icone: '🔒', exemplo: 'Captura com hash / WARC / ata' }
};

// Classificação de e-mail na TRILHA GUIADA. Domínio fora das duas listas = "corporativo"
// (domínio próprio), e aí o domínio vira um dado a investigar. Subdomínios casam com o pai.
const DOMINIOS_EMAIL = {
  pessoais: [
    'gmail.com', 'googlemail.com', 'hotmail.com', 'hotmail.com.br', 'outlook.com', 'outlook.com.br',
    'live.com', 'msn.com', 'yahoo.com', 'yahoo.com.br', 'ymail.com', 'icloud.com', 'me.com', 'mac.com',
    'proton.me', 'protonmail.com', 'pm.me', 'tutanota.com', 'tuta.io', 'gmx.com', 'gmx.net', 'aol.com',
    'yandex.com', 'yandex.ru', 'mail.ru', 'zoho.com', 'bol.com.br', 'uol.com.br', 'terra.com.br',
    'ig.com.br', 'globo.com', 'globomail.com', 'r7.com', 'zipmail.com.br', 'oi.com.br'
  ],
  descartaveis: [
    'mailinator.com', 'yopmail.com', 'guerrillamail.com', 'sharklasers.com', 'grr.la', '10minutemail.com',
    'temp-mail.org', 'tempmail.com', 'tempmail.plus', 'mail.tm', 'maildrop.cc', 'getnada.com',
    'dispostable.com', 'trashmail.com', 'throwawaymail.com', 'emailondeck.com', 'mohmal.com',
    'fakeinbox.com', 'mintemail.com', 'moakt.com', 'spamgourmet.com', 'mailnesia.com', 'tempail.com'
  ]
};

const TRILHAS = [
  // ═══ CNPJ
  { pivot: 'cnpj', modulo: '01', tipo: 'pivot', de: ['cnpj'], para: ['razao_social', 'endereco', 'cpf', 'nome_pessoa', 'cnpj', 'email', 'telefone'], nota: 'QSA traz sócios PF (nome/CPF parcial) e PJ (outros CNPJs).' },
  { pivot: 'cnpj', modulo: '02', tipo: 'pivot', de: ['cnpj'], para: ['contrato_publico'] },
  { pivot: 'cnpj', modulo: '03', tipo: 'pivot', de: ['cnpj'], para: ['passivo_financeiro', 'sancao', 'processo'] },
  { pivot: 'cnpj', modulo: '04', tipo: 'pivot', de: ['cnpj', 'razao_social'], para: ['dominio', 'asn', 'email'] },
  { pivot: 'cnpj', modulo: '05', tipo: 'pivot', de: ['cnpj'], para: ['licenca', 'veiculo', 'aeronave'] },
  { pivot: 'cnpj', modulo: '06', tipo: 'pivot', de: ['cnpj'], para: ['imovel', 'sancao'] },

  // ═══ CPF
  { pivot: 'cpf', modulo: '01', tipo: 'pivot', de: ['cpf'], para: ['nome_pessoa'], nota: 'Nome, nascimento, filiação, situação fiscal e óbito.' },
  { pivot: 'cpf', modulo: '02', tipo: 'pivot', de: ['cpf'], para: ['cnpj', 'endereco'] },
  { pivot: 'cpf', modulo: '03', tipo: 'pivot', de: ['cpf', 'nome_pessoa'], para: ['processo', 'nome_pessoa'], nota: 'Partes envolvidas nos processos viram novos nomes.' },
  { pivot: 'cpf', modulo: '04', tipo: 'pivot', de: ['cpf'], para: ['imovel', 'veiculo', 'aeronave', 'embarcacao', 'sancao'] },
  { pivot: 'cpf', modulo: '05', tipo: 'pivot', de: ['cpf'], para: ['passivo_financeiro', 'conta_bancaria', 'processo'] },
  { pivot: 'cpf', modulo: '06', tipo: 'pivot', de: ['cpf'], para: ['telefone', 'perfil_social'] },

  // ═══ DOMÍNIO
  { pivot: 'dominio', modulo: '01', tipo: 'pivot', de: ['dominio'], para: ['nome_pessoa', 'razao_social', 'cpf', 'cnpj', 'email'] },
  { pivot: 'dominio', modulo: '02', tipo: 'pivot', de: ['dominio'], para: ['ip', 'asn'] },
  { pivot: 'dominio', modulo: '03', tipo: 'pivot', de: ['dominio'], para: ['subdominio'] },
  { pivot: 'dominio', modulo: '04', tipo: 'pivot', de: ['dominio', 'url'], para: ['ioc'] },
  { pivot: 'dominio', modulo: '05', tipo: 'pivot', de: ['dominio', 'tracker_id'], para: ['tracker_id', 'dominio'], nota: 'Mesmo ID do Analytics/AdSense ou favicon revela outros sites do mesmo dono.' },
  { pivot: 'dominio', modulo: '06', tipo: 'pivot', de: ['dominio', 'url'], para: ['historico_web'] },

  // ═══ E-MAIL
  { pivot: 'email', modulo: '01', tipo: 'pivot', de: ['email'], para: ['dominio'], nota: 'Valida sintaxe, MX e existência da caixa.' },
  { pivot: 'email', modulo: '02', tipo: 'pivot', de: ['email', 'username', 'telefone'], para: ['perfil_social'] },
  { pivot: 'email', modulo: '03', tipo: 'pivot', de: ['email', 'telefone', 'username'], para: ['credencial'] },
  { pivot: 'email', modulo: '04', tipo: 'pivot', de: ['email', 'telefone', 'username', 'rosto'], para: ['nome_pessoa', 'perfil_social', 'rede_relacionamento'] },
  { pivot: 'email', modulo: '05', tipo: 'pivot', de: ['cabecalho_email'], para: ['ip', 'dominio'] },
  { pivot: 'email', modulo: '06', tipo: 'pivot', de: ['dominio', 'razao_social'], para: ['email', 'nome_pessoa'], nota: 'Padrões de e-mail corporativo e organogramas.' },

  // ═══ FINANCEIRO
  { pivot: 'financeiro', modulo: '01', tipo: 'pivot', de: ['carteira_crypto', 'hash_transacao'], para: ['carteira_crypto', 'hash_transacao'], nota: 'Fluxo de fundos até exchanges (ponto de KYC).' },
  { pivot: 'financeiro', modulo: '02', tipo: 'pivot', de: ['chave_pix'], para: ['nome_pessoa', 'razao_social', 'conta_bancaria', 'cpf', 'email', 'telefone'], nota: 'A própria chave pode ser CPF, e-mail ou telefone.' },
  { pivot: 'financeiro', modulo: '03', tipo: 'pivot', de: ['cpf', 'cnpj'], para: ['conta_bancaria'] },
  { pivot: 'financeiro', modulo: '04', tipo: 'pivot', de: ['cpf', 'cnpj'], para: ['imovel', 'nome_pessoa'], nota: 'Procuradores e herdeiros viram novos nomes.' },
  { pivot: 'financeiro', modulo: '05', tipo: 'pivot', de: ['cpf', 'cnpj'], para: ['passivo_financeiro', 'processo'] },
  { pivot: 'financeiro', modulo: '06', tipo: 'pivot', de: ['cpf', 'cnpj'], para: ['contrato_publico', 'nome_pessoa'] },

  // ═══ IMAGEM
  { pivot: 'imagem', modulo: '01', tipo: 'pivot', de: ['imagem'], para: ['coordenadas', 'data_hora', 'dispositivo'] },
  { pivot: 'imagem', modulo: '02', tipo: 'pivot', de: ['rosto', 'imagem'], para: ['perfil_social', 'nome_pessoa', 'coordenadas'] },
  { pivot: 'imagem', modulo: '03', tipo: 'analise', de: ['imagem'], para: [], nota: 'Verifica manipulação/IA antes de confiar na imagem.' },
  { pivot: 'imagem', modulo: '04', tipo: 'pivot', de: ['imagem'], para: ['data_hora'] },
  { pivot: 'imagem', modulo: '05', tipo: 'pivot', de: ['imagem'], para: ['veiculo', 'endereco'], nota: 'OCR de placas, letreiros e documentos.' },
  { pivot: 'imagem', modulo: '06', tipo: 'preservacao', de: ['imagem', 'url', 'publicacao'], para: ['evidencia'] },

  // ═══ REDES SOCIAIS
  { pivot: 'redes-sociais', modulo: '01', tipo: 'pivot', de: ['perfil_social', 'username'], para: ['perfil_social', 'nome_pessoa', 'razao_social'] },
  { pivot: 'redes-sociais', modulo: '02', tipo: 'pivot', de: ['perfil_social'], para: ['rede_relacionamento', 'perfil_social'] },
  { pivot: 'redes-sociais', modulo: '03', tipo: 'pivot', de: ['publicacao'], para: ['rosto', 'imagem'] },
  { pivot: 'redes-sociais', modulo: '04', tipo: 'pivot', de: ['publicacao'], para: ['coordenadas', 'data_hora'] },
  { pivot: 'redes-sociais', modulo: '05', tipo: 'preservacao', de: ['publicacao', 'perfil_social'], para: ['evidencia', 'publicacao'], nota: 'Também recupera posts apagados.' },
  { pivot: 'redes-sociais', modulo: '06', tipo: 'preparacao', de: [], para: [], nota: 'Sock puppets e ambiente isolado antes de qualquer interação.' },

  // ═══ TELEFONE
  { pivot: 'telefone', modulo: '01', tipo: 'analise', de: ['telefone'], para: [], nota: 'Operadora, portabilidade e tipo de linha.' },
  { pivot: 'telefone', modulo: '02', tipo: 'pivot', de: ['telefone'], para: ['perfil_social', 'imagem'] },
  { pivot: 'telefone', modulo: '03', tipo: 'pivot', de: ['telefone'], para: ['nome_pessoa', 'endereco', 'cpf'] },
  { pivot: 'telefone', modulo: '04', tipo: 'pivot', de: ['telefone'], para: ['perfil_social'] },
  { pivot: 'telefone', modulo: '05', tipo: 'pivot', de: ['telefone'], para: ['credencial'] },
  { pivot: 'telefone', modulo: '06', tipo: 'pivot', de: ['telefone', 'dispositivo'], para: ['carteira_crypto', 'dispositivo'] },

  // ═══ USERNAME
  { pivot: 'username', modulo: '01', tipo: 'pivot', de: ['username'], para: ['perfil_social', 'url'] },
  { pivot: 'username', modulo: '02', tipo: 'pivot', de: ['username', 'perfil_social'], para: ['publicacao', 'rede_relacionamento', 'nome_pessoa'] },
  { pivot: 'username', modulo: '03', tipo: 'pivot', de: ['username'], para: ['username', 'credencial', 'url'] },
  { pivot: 'username', modulo: '04', tipo: 'pivot', de: ['username'], para: ['credencial', 'email', 'ip'] },
  { pivot: 'username', modulo: '05', tipo: 'pivot', de: ['imagem', 'rosto'], para: ['perfil_social', 'nome_pessoa'], nota: 'Avatar reaproveitado em outras plataformas.' },
  { pivot: 'username', modulo: '06', tipo: 'pivot', de: ['username'], para: ['carteira_crypto', 'perfil_social', 'dominio'] },

  // ═══ VEÍCULOS
  { pivot: 'veiculos', modulo: '01', tipo: 'pivot', de: ['veiculo', 'cnpj'], para: ['veiculo', 'passivo_financeiro'] },
  { pivot: 'veiculos', modulo: '02', tipo: 'pivot', de: ['aeronave', 'cpf', 'cnpj'], para: ['aeronave', 'nome_pessoa', 'razao_social'] },
  { pivot: 'veiculos', modulo: '03', tipo: 'pivot', de: ['aeronave'], para: ['coordenadas', 'imagem'] },
  { pivot: 'veiculos', modulo: '04', tipo: 'pivot', de: ['embarcacao', 'cnpj'], para: ['razao_social', 'embarcacao', 'coordenadas'] },
  { pivot: 'veiculos', modulo: '05', tipo: 'analise', de: ['aeronave', 'razao_social'], para: [], nota: 'Laudos e histórico de incidentes.' },
  { pivot: 'veiculos', modulo: '06', tipo: 'pivot', de: ['endereco', 'razao_social'], para: ['coordenadas'] },

  // ═══ IP / ASN
  { pivot: 'ip', modulo: '01', tipo: 'pivot', de: ['ip'], para: ['asn', 'razao_social', 'coordenadas'], nota: 'Geolocalização de IP é aproximada (cidade/provedor), não o endereço do alvo.' },
  { pivot: 'ip', modulo: '02', tipo: 'pivot', de: ['ip'], para: ['dominio', 'subdominio', 'tracker_id', 'ip'], nota: 'Certificados TLS e hash de favicon revelam servidores irmãos.' },
  { pivot: 'ip', modulo: '03', tipo: 'pivot', de: ['ip', 'asn'], para: ['dominio', 'ip', 'historico_web'] },
  { pivot: 'ip', modulo: '04', tipo: 'pivot', de: ['ip'], para: ['ioc', 'dominio', 'url'] },
  { pivot: 'ip', modulo: '05', tipo: 'pivot', de: ['ip'], para: ['email', 'username', 'nome_pessoa', 'endereco'], nota: 'IP dinâmico/CGNAT: confirme a data antes de atribuir a uma pessoa.' },
  { pivot: 'ip', modulo: '06', tipo: 'pivot', de: ['email', 'telefone', 'perfil_social'], para: ['ip', 'dispositivo', 'data_hora'], nota: 'Exige interação do alvo — avalie a base legal.' },

  // ═══ CONVERSÕES (passos triviais, sem ferramenta)
  { id: 'conv-url-dominio',      tipo: 'conversao', de: ['url'],           para: ['dominio'],  nome: 'Extrair domínio da URL' },
  { id: 'conv-sub-dominio',      tipo: 'conversao', de: ['subdominio'],    para: ['dominio'],  nome: 'Subdomínio é um domínio: rodar a pivotagem de domínio' },
  { id: 'conv-email-username',   tipo: 'conversao', de: ['email'],         para: ['username'], nome: 'Parte antes do @ como username' },
  { id: 'conv-email-dominio',    tipo: 'conversao', de: ['email'],         para: ['dominio'],  nome: 'Parte depois do @ (se for domínio próprio)' },
  { id: 'conv-perfil-username',  tipo: 'conversao', de: ['perfil_social'], para: ['username'], nome: 'Handle do perfil como username' },
  { id: 'conv-cred-email',       tipo: 'conversao', de: ['credencial'],    para: ['email', 'username'], nome: 'Vazamentos trazem e-mails e logins associados' },
  { id: 'conv-perfil-pub',       tipo: 'conversao', de: ['perfil_social'], para: ['publicacao', 'imagem'], nome: 'Abrir o perfil: publicações e foto de perfil' },
  { id: 'conv-razao-cnpj',       tipo: 'conversao', de: ['razao_social'],  para: ['cnpj'],     nome: 'Buscar a razão social para obter o CNPJ' }
];
