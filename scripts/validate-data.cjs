const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const errors = [];
const prefixes = new Set(['alvo', 'fonte', 'func', 'plataforma', 'acesso', 'opsec']);
const context = vm.createContext({});

function fail(location, message) {
  errors.push(`${location}: ${message}`);
}

function isHttpUrl(value) {
  try {
    return ['http:', 'https:'].includes(new URL(value).protocol);
  } catch {
    return false;
  }
}

function validateTool(tool, index, ids) {
  const location = `TOOLS[${index}]`;
  if (!tool || typeof tool !== 'object' || Array.isArray(tool)) {
    fail(location, 'deve ser um objeto');
    return;
  }

  for (const field of ['id', 'title', 'url']) {
    if (typeof tool[field] !== 'string' || !tool[field].trim()) {
      fail(location, `"${field}" é obrigatório e deve ser texto não vazio`);
    }
  }
  if (tool.id && ids.has(tool.id)) fail(location, `ID duplicado "${tool.id}"`);
  if (tool.id) ids.add(tool.id);
  if (tool.id && tool.title && tool.id !== tool.title) {
    fail(location, 'o ID deve ser igual ao título, conforme o formato atual do catálogo');
  }
  if (tool.url && !isHttpUrl(tool.url)) fail(location, `URL inválida "${tool.url}"`);
  if (!Array.isArray(tool.tags)) {
    fail(location, '"tags" deve ser uma lista');
  } else {
    for (const tag of tool.tags) {
      const prefix = typeof tag === 'string' ? tag.split('/')[0] : '';
      if (typeof tag !== 'string' || !tag.includes('/') || !prefixes.has(prefix)) {
        fail(location, `tag inválida "${tag}"`);
      }
    }
  }

  if (tool.status && !['active', 'limited', 'discontinued'].includes(tool.status)) {
    fail(location, `"status" deve ser active, limited ou discontinued`);
  }
  if (tool.lastVerified && !/^\d{4}-\d{2}-\d{2}$/.test(tool.lastVerified)) {
    fail(location, '"lastVerified" deve usar o formato YYYY-MM-DD');
  } else if (tool.lastVerified) {
    const date = new Date(`${tool.lastVerified}T00:00:00Z`);
    if (Number.isNaN(date.valueOf()) || date.toISOString().slice(0, 10) !== tool.lastVerified) {
      fail(location, `"lastVerified" não é uma data válida: "${tool.lastVerified}"`);
    }
  }
  if (tool.verificationUrl && !isHttpUrl(tool.verificationUrl)) {
    fail(location, `"verificationUrl" deve ser uma URL HTTP(S)`);
  }
}

try {
  vm.runInContext(fs.readFileSync(path.join(root, 'js', 'data.js'), 'utf8'), context, { filename: 'js/data.js' });
  const tools = vm.runInContext('TOOLS', context);
  if (!Array.isArray(tools)) throw new Error('TOOLS deve ser um array');

  const toolIds = new Set();
  tools.forEach((tool, index) => validateTool(tool, index, toolIds));

  if (errors.length) {
    console.error(`Validação encontrou ${errors.length} problema(s):`);
    errors.forEach(error => console.error(`- ${error}`));
    process.exitCode = 1;
  } else {
    console.log(`Dados válidos: ${tools.length} ferramentas.`);
  }
} catch (error) {
  console.error(`Falha ao carregar os dados do catálogo: ${error.message}`);
  process.exitCode = 1;
}
