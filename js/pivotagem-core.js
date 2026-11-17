// js/pivotagem-core.js — núcleo compartilhado da pivotagem v2.
// Registra pivots e resolve as ferramentas de cada camada contra o catálogo (TOOLS).

window.PIVOTS = window.PIVOTS || [];
function registerPivot(t) { window.PIVOTS.push(t); }

const PivotagemCore = (() => {
  let byId = new Map();
  function setCatalog(tools) { byId = new Map((tools || []).map(t => [t.id, t])); }

  const OPSEC = {
    passivo:    { classe: 'passivo',    texto: '🟢 PASSIVO',     nivel: 0 },
    cautela:    { classe: 'cautela',    texto: '🟡 CAUTELA',     nivel: 1 },
    ativo:      { classe: 'ativo',      texto: '🔴 ATIVO',       nivel: 2 },
    preparacao: { classe: 'preparacao', texto: '🛡️ PREPARAÇÃO', nivel: 0 }
  };
  const opsec = m => OPSEC[(m.opsec && m.opsec.nivel) || 'passivo'] || OPSEC.passivo;

  // true se a ferramenta tem TODAS as tags da regra
  const casaRegra = (tool, tags) => tags.every(tag => (tool.tags || []).includes(tag));

  /**
   * Resolve as ferramentas de uma camada:
   *  - curadas (por id ou externas), na ordem;
   *  - + "outras do catálogo" que casam com camada.regra (menos as já listadas, as de camada.excluir e as descontinuadas).
   * Retorna { curadas:[...], regra:[...] } com objetos prontos para render.
   */
  function resolveCamada(camada) {
    const seen = new Set(), curadas = [];
    for (const ref of camada.tools || []) {
      if (ref.id) {
        const t = byId.get(ref.id);
        if (!t) continue;
        seen.add(t.id);
        curadas.push({ id: t.id, nome: t.title, url: t.url, tool: t,
          aplicacao: ref.aplicacao || '', opsec: ref.opsec, alerta: ref.alerta, origem: 'curada' });
      } else {
        curadas.push({ nome: ref.nome, url: ref.url, aplicacao: ref.aplicacao || '', externo: true, origem: 'curada' });
      }
    }
    let regra = [];
    if (camada.regra && camada.regra.tags && camada.regra.tags.length) {
      const excluir = new Set(camada.excluir || []);
      for (const t of byId.values()) {
        if (seen.has(t.id) || excluir.has(t.id) || t.status === 'discontinued') continue;
        if (casaRegra(t, camada.regra.tags)) regra.push({ id: t.id, nome: t.title, url: t.url, tool: t, origem: 'regra' });
      }
      regra.sort((a, b) => a.nome.localeCompare(b.nome));
    }
    return { curadas, regra };
  }

  const get = id => window.PIVOTS.find(t => t.id === id);
  const porTipo = tipo => window.PIVOTS.filter(t => t.tipo === tipo);

  return { setCatalog, resolveCamada, opsec, get, porTipo, casaRegra };
})();

if (typeof module !== 'undefined') module.exports = { PivotagemCore, registerPivot };
