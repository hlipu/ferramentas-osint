const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const errors = [];
const prefixes = new Set(['alvo', 'fonte', 'func', 'plataforma', 'acesso', 'opsec']);
const context = vm.createContext({
  window: { PIVOTS: [] },
  registerPivot(pivot) {
    context.window.PIVOTS.push(pivot);
  }
});

function fail(location, message) {
  errors.push(`${location}: ${message}`);
}

function readScript(filePath) {
  return fs.readFileSync(filePath, 'utf8');
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
  vm.runInContext(readScript(path.join(root, 'js', 'data.js')), context, { filename: 'js/data.js' });
  const tools = vm.runInContext('TOOLS', context);
  if (!Array.isArray(tools)) throw new Error('TOOLS deve ser um array');

  const toolIds = new Set();
  tools.forEach((tool, index) => validateTool(tool, index, toolIds));

  const pivotDirectory = path.join(root, 'js', 'pivots');
  const pivotFiles = fs.readdirSync(pivotDirectory)
    .filter(file => file.endsWith('.js'))
    .sort();
  for (const file of pivotFiles) {
    const filePath = path.join(pivotDirectory, file);
    vm.runInContext(readScript(filePath), context, { filename: path.relative(root, filePath) });
  }

  const pivots = context.window.PIVOTS;
  const pivotIds = new Set();
  const modules = new Map();
  for (const pivot of pivots) {
    if (!pivot.id || pivotIds.has(pivot.id)) fail('PIVOTS', `ID ausente ou duplicado "${pivot.id || ''}"`);
    pivotIds.add(pivot.id);
    const moduleIds = new Set();
    for (const module of pivot.modulos || []) {
      if (!module.num || moduleIds.has(module.num)) {
        fail(`pivot "${pivot.id}"`, `número de módulo ausente ou duplicado "${module.num || ''}"`);
      }
      moduleIds.add(module.num);
      modules.set(`${pivot.id}:${module.num}`, module);

      for (const [layerIndex, layer] of (module.camadas || []).entries()) {
        const location = `${pivot.id}/${module.num}/camadas[${layerIndex}]`;
        for (const ref of layer.tools || []) {
          if (typeof ref === 'string') {
            if (!toolIds.has(ref)) fail(location, `ferramenta inexistente "${ref}"`);
          } else if (ref && ref.id && !toolIds.has(ref.id)) {
            fail(location, `ferramenta inexistente "${ref.id}"`);
          } else if (ref && ref.externo && (!ref.nome || typeof ref.url !== 'string' || !ref.url.trim())) {
            fail(location, 'ferramenta externa precisa de nome e campo "url" não vazio');
          } else if (ref && !ref.id && !ref.externo) {
            fail(location, 'referência precisa de ID de catálogo ou ser marcada como externa');
          }
        }
        for (const excludedId of layer.excluir || []) {
          if (!toolIds.has(excludedId)) fail(location, `ID excluído inexistente "${excludedId}"`);
        }
        for (const tag of layer.regra?.tags || []) {
          const prefix = typeof tag === 'string' ? tag.split('/')[0] : '';
          if (typeof tag !== 'string' || !tag.includes('/') || !prefixes.has(prefix)) {
            fail(location, `tag de regra inválida "${tag}"`);
          }
        }
      }
    }
    // Versão pública: as imagens das pivotagens (pivot.imagem) não são publicadas nem usadas
    // pela página Pivotagem, então não são verificadas aqui.
  }

  vm.runInContext(readScript(path.join(root, 'js', 'data-trilhas.js')), context, {
    filename: 'js/data-trilhas.js'
  });
  const { ENTIDADES, TRILHAS } = vm.runInContext('({ ENTIDADES, TRILHAS })', context);
  const trilhaIds = new Set();
  for (const [index, trilha] of TRILHAS.entries()) {
    const location = `TRILHAS[${index}]`;
    const id = trilha.id || `${trilha.pivot}-${trilha.modulo}`;
    if (trilhaIds.has(id)) fail(location, `ID duplicado "${id}"`);
    trilhaIds.add(id);

    for (const entity of [...(trilha.de || []), ...(trilha.para || [])]) {
      if (!ENTIDADES[entity]) fail(location, `entidade inexistente "${entity}"`);
    }
    if (trilha.pivot && !modules.has(`${trilha.pivot}:${trilha.modulo}`)) {
      fail(location, `módulo inexistente "${trilha.pivot}/${trilha.modulo}"`);
    }
  }

  if (errors.length) {
    console.error(`Validação encontrou ${errors.length} problema(s):`);
    errors.forEach(error => console.error(`- ${error}`));
    process.exitCode = 1;
  } else {
    console.log(`Dados válidos: ${tools.length} ferramentas, ${pivots.length} pivotagens e ${TRILHAS.length} trilhas.`);
  }
} catch (error) {
  console.error(`Falha ao carregar os dados do catálogo: ${error.message}`);
  process.exitCode = 1;
}
