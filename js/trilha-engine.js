// js/trilha-engine.js
// Motor de trilhas: funções puras sobre ENTIDADES + TRILHAS + PIVOTS + TOOLS.
// Não toca no DOM — pode ser reaproveitado por um futuro assistente (MCP/LLM).
// Trilha guiada: alvo(tipo, valor) normaliza/classifica o dado e objetivos(alvo)
// devolve objetivos ➔ passos (camadas) ➔ ferramentas para seguir em ordem.

const TrilhaEngine = (() => {
  let E = {}, P = [], DOM_EMAIL = { pessoais: [], descartaveis: [] };

  function init({ entidades, trilhas, pivots = [], tools = [], dominiosEmail = null }) {
    E = entidades;
    if (dominiosEmail) DOM_EMAIL = dominiosEmail;
    PivotagemCore.setCatalog(tools);

    const erros = [];
    P = trilhas.map(p => {
      const id = p.id || `${p.pivot}-${p.modulo}`;
      const pivot = p.pivot ? pivots.find(t => t.id === p.pivot) : null;
      const mod = pivot ? pivot.modulos.find(m => m.num === p.modulo) : null;
      if (p.pivot && !mod) erros.push(`${id}: módulo não encontrado em PIVOTS`);
      [...p.de, ...p.para].forEach(e => { if (!E[e]) erros.push(`${id}: entidade desconhecida "${e}"`); });

      const camadas = (mod?.camadas || []).map((c, i) => {
        const { curadas, regra } = PivotagemCore.resolveCamada(c);
        return { id: c.id || `${id}-c${i + 1}`, titulo: c.titulo, conceito: c.conceito || '', ferramentas: curadas.concat(regra) };
      });
      const op = mod ? PivotagemCore.opsec(mod) : null;

      return {
        ...p,
        id,
        nome: p.nome || mod?.nome || id,
        pivotTitulo: pivot ? `${pivot.icone} ${pivot.titulo}` : 'Conversão',
        objetivo: mod?.objetivo || '',
        vetorTexto: mod?.vetor || '',
        opsecTexto: op ? op.texto : (p.tipo === 'conversao' ? '🟢 TRIVIAL' : ''),
        opsecNivel: (p.tipo === 'conversao' || p.tipo === 'preparacao') ? 0 : (op ? op.nivel : 0),
        camadas,
        totalFerramentas: camadas.reduce((n, c) => n + c.ferramentas.length, 0)
      };
    });
    return { erros, trilhas: P };
  }

  const permitido = (p, opts = {}) => !(opts.soPassivo && p.opsecNivel > 0) && !(opts.semConversao && p.tipo === 'conversao');

  /** Detecta quais tipos de entidade um valor colado pode ser. */
  function detectar(valor) {
    const v = (valor || '').trim();
    if (!v) return [];
    return Object.entries(E).filter(([, e]) => e.detectar && e.detectar.test(v)).map(([id]) => id);
  }

  /** Saltos aplicáveis agora, a partir do que já se tem. */
  function saltos(tenho, opts = {}) {
    const set = new Set(tenho);
    return P.filter(p => p.de.some(e => set.has(e)) && permitido(p, opts))
      .map(p => ({ ...p, entrada: p.de.filter(e => set.has(e)), novos: p.para.filter(e => !set.has(e)) }))
      .sort((a, b) => (b.novos.length - a.novos.length) || (a.opsecNivel - b.opsecNivel));
  }

  /** BFS: até onde dá para chegar e por qual caminho (menor nº de saltos, preferindo passivo). */
  function alcance(tenho, opts = {}) {
    const maxProf = opts.maxProf ?? 6;
    const mapa = new Map(); // entidade -> { prof, via, de }
    let fronteira = [...new Set(tenho)];
    fronteira.forEach(e => mapa.set(e, { prof: 0, via: null, de: null }));
    for (let prof = 1; prof <= maxProf && fronteira.length; prof++) {
      const prox = [];
      const candidatos = P.filter(p => permitido(p, opts)).sort((a, b) => a.opsecNivel - b.opsecNivel || (a.tipo === 'conversao') - (b.tipo === 'conversao'));
      for (const p of candidatos) {
        const origem = p.de.find(e => fronteira.includes(e));
        if (!origem) continue;
        for (const alvo of p.para) {
          if (mapa.has(alvo)) continue;
          mapa.set(alvo, { prof, via: p.id, de: origem });
          prox.push(alvo);
        }
      }
      fronteira = prox;
    }
    return mapa;
  }

  /** Caminho (lista de saltos) do que se tem até a entidade alvo. */
  function caminho(tenho, alvo, opts = {}) {
    const mapa = alcance(tenho, opts);
    if (!mapa.has(alvo)) return null;
    const passos = [];
    let atual = alvo;
    while (mapa.get(atual).via) {
      const n = mapa.get(atual);
      passos.unshift({ de: n.de, para: atual, salto: P.find(p => p.id === n.via) });
      atual = n.de;
    }
    return passos;
  }

  /** Diagnóstico do grafo: becos sem saída e entidades que nunca são produzidas. */
  function lacunas() {
    const usados = new Set(), produzidos = new Set();
    P.filter(p => p.tipo !== 'conversao').forEach(p => { p.de.forEach(e => usados.add(e)); p.para.forEach(e => produzidos.add(e)); });
    const ids = Object.keys(E);
    return {
      semPivotDeEntrada: ids.filter(e => !usados.has(e) && E[e].grupo !== 'resultado'),
      nuncaProduzidas: ids.filter(e => !produzidos.has(e))
    };
  }

  // ═══ TRILHA GUIADA — entra um VALOR concreto, saem objetivos ➔ passos ➔ ferramentas.

  // true se o domínio (ou um domínio-pai dele) está na lista
  const naLista = (dom, lista) => lista.some(d => dom === d || dom.endsWith('.' + d));

  const PERFIS_EMAIL = {
    pessoal:     { rotulo: 'Provedor pessoal', aviso: '' },
    corporativo: { rotulo: 'Domínio próprio', aviso: '' },
    descartavel: { rotulo: 'Descartável', aviso: 'Este é um e-mail temporário. Ele costuma sumir em minutos, então as trilhas devem trazer pouco resultado.' }
  };

  /** E-mail ➔ { valor normalizado, perfil, derivados } (equivale ao parseEmail do modelo). */
  function perfilEmail(bruto) {
    const valor = bruto.trim().replace(/^mailto:/i, '').toLowerCase();
    const [local, dominio] = [valor.slice(0, valor.lastIndexOf('@')), valor.slice(valor.lastIndexOf('@') + 1)];
    const id = naLista(dominio, DOM_EMAIL.descartaveis) ? 'descartavel'
      : naLista(dominio, DOM_EMAIL.pessoais) ? 'pessoal' : 'corporativo';
    const usuario = local.replace(/\+.*$/, ''); // "fulano+loja" ➔ "fulano"
    const derivados = [{ tipo: 'username', valor: usuario, motivo: 'parte antes do @' }];
    // Domínio de provedor (gmail.com…) não diz nada sobre o alvo; domínio próprio sim.
    if (id === 'corporativo') derivados.push({ tipo: 'dominio', valor: dominio, motivo: 'domínio do e-mail' });
    return { valor, perfil: { id, ...PERFIS_EMAIL[id] }, derivados };
  }

  function perfilUrl(bruto) {
    const valor = bruto.trim();
    try {
      const host = new URL(valor).hostname.replace(/^www\./, '');
      return { valor, perfil: null, derivados: [{ tipo: 'dominio', valor: host, motivo: 'domínio da URL' }] };
    } catch (_) { return { valor, perfil: null, derivados: [] }; }
  }

  const PERFILADORES = { email: perfilEmail, url: perfilUrl };

  /**
   * Monta o alvo da trilha guiada a partir de um tipo + valor colado.
   * Sem valor (só o tipo escolhido), os derivados vêm das conversões triviais do grafo.
   */
  function alvo(tipo, bruto = '') {
    if (!E[tipo]) return null;
    if (!String(bruto).trim()) {
      const derivados = [], vistos = new Set([tipo]);
      P.filter(p => p.tipo === 'conversao' && p.de.includes(tipo)).forEach(p => p.para.forEach(e => {
        if (!vistos.has(e)) { vistos.add(e); derivados.push({ tipo: e, valor: '', motivo: p.nome }); }
      }));
      return { tipo, valor: '', perfil: null, derivados };
    }
    const base = (PERFILADORES[tipo] || (v => ({ valor: v.trim(), perfil: null, derivados: [] })))(bruto);
    return { tipo, ...base };
  }

  const ORDEM_TIPO = { preparacao: 0, pivot: 1, analise: 2, preservacao: 3 };

  /**
   * Objetivos da trilha guiada: saltos que partem do alvo e dos seus derivados.
   * Cada objetivo traz `fonte` (de qual valor parte) e `passos` (as camadas com ferramentas).
   * Conversões ficam de fora: já foram aplicadas ao montar os derivados.
   */
  function objetivos(a, opts = {}) {
    if (!a) return [];
    const fontes = [{ tipo: a.tipo, valor: a.valor, principal: true }, ...(a.derivados || [])];
    const vistos = new Set(), lista = [];
    fontes.forEach((f, ordemFonte) => {
      P.filter(p => p.tipo !== 'conversao' && p.tipo !== 'preparacao' && p.de.includes(f.tipo) && permitido(p, opts) && !vistos.has(p.id))
        .sort((x, y) => (ORDEM_TIPO[x.tipo] - ORDEM_TIPO[y.tipo]) || (x.opsecNivel - y.opsecNivel))
        .forEach(p => {
          vistos.add(p.id);
          lista.push({ ...p, fonte: f, ordemFonte, passos: p.camadas.filter(c => c.ferramentas.length) });
        });
    });
    // Preparação do analista vem antes de tudo, se houver objetivo real a seguir.
    if (lista.length && !opts.semPreparacao) {
      P.filter(p => p.tipo === 'preparacao').reverse().forEach(p =>
        lista.unshift({ ...p, fonte: null, ordemFonte: -1, passos: p.camadas.filter(c => c.ferramentas.length) }));
    }
    return lista.filter(o => o.passos.length);
  }

  return { init, detectar, saltos, alcance, caminho, lacunas, alvo, objetivos, get trilhas() { return P; }, get entidades() { return E; } };
})();

if (typeof module !== 'undefined') module.exports = TrilhaEngine;
