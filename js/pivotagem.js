// js/pivotagem.js — página da Pivotagem (pages/pivotagem.html)
// Escolhe o TIPO de identificador (ou cola um valor) ➔ objetivos ➔ passos ➔ ferramentas.
// Usa o mesmo motor (TrilhaEngine) e os mesmos dados do Motor de Trilhas.

(() => {
  const { erros } = TrilhaEngine.init({ entidades: ENTIDADES, trilhas: TRILHAS, pivots: PIVOTS, tools: TOOLS, dominiosEmail: DOMINIOS_EMAIL });
  if (erros.length) console.warn('[pivotagem] inconsistências em data-trilhas.js:', erros);

  // ── Preferências (por navegador). O valor colado e o progresso NUNCA são salvos:
  //    ficam só em memória, porque podem ser dados de terceiros.
  const CHAVE = 'osint-pivotagem-v1';
  const estado = { soPassivo: false, ocultarPagas: false };
  try {
    const salvo = JSON.parse(localStorage.getItem(CHAVE) || '{}');
    Object.assign(estado, { soPassivo: !!salvo.soPassivo, ocultarPagas: !!salvo.ocultarPagas });
  } catch (_) {}
  const salvar = () => { try { localStorage.setItem(CHAVE, JSON.stringify(estado)); } catch (_) {} };

  const $ = s => document.querySelector(s);
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const cor = e => GRUPOS_ENTIDADE[ENTIDADES[e].grupo].cor;
  const rotulo = e => `${ENTIDADES[e].icone} ${ENTIDADES[e].nome}`;
  const opts = () => ({ soPassivo: estado.soPassivo });
  const badgeOpsec = p => `<span class="opsec-badge ${p.opsecNivel ? 'semi-ativo' : 'passivo'}">${p.opsecTexto}</span>`;

  // fonte = índice do dado selecionado no diagrama (0 = alvo; 1+ = derivados); passo = camada aberta no painel.
  const VAZIO = () => ({ entrada: '', erro: '', candidatos: [], alvo: null, fonte: 0, ativo: null, passo: null, feito: {} });
  const g = { ...VAZIO(), maisTipos: false };
  const ehPaga = f => !!(f.tool && (f.tool.tags || []).includes('acesso/pago'));
  const visiveis = lista => estado.ocultarPagas ? lista.filter(f => !ehPaga(f)) : lista;
  const chaveFeito = (o, p) => `${o.id}::${p.id}`;
  const iconeOpsec = o => (o.opsecTexto || '').split(' ')[0] || '🟢';

  // Tipos oferecidos na tela inicial: só os que têm objetivo próprio; os mais comuns primeiro.
  const PRINCIPAIS = ['email', 'cpf', 'telefone', 'cnpj', 'username', 'dominio', 'perfil_social', 'ip', 'url', 'imagem', 'veiculo', 'carteira_crypto'];
  const TIPOS = Object.keys(ENTIDADES).filter(e => TrilhaEngine.objetivos(TrilhaEngine.alvo(e)).some(o => o.fonte && o.fonte.principal));
  const tiposPrincipais = PRINCIPAIS.filter(e => TIPOS.includes(e));
  const tiposOutros = TIPOS.filter(e => !PRINCIPAIS.includes(e));

  function iniciar(valor, tipo) {
    const v = (valor || '').trim();
    Object.assign(g, { entrada: v, erro: '', candidatos: [] });
    if (!v && !tipo) { g.erro = 'Cole um valor ou escolha o tipo de identificador acima.'; return; }
    const tipos = tipo ? [tipo] : TrilhaEngine.detectar(v);
    if (!tipos.length) { g.erro = 'Formato não reconhecido. Escolha o tipo de identificador acima.'; return; }
    if (tipos.length > 1) { g.candidatos = tipos; return; }
    g.alvo = TrilhaEngine.alvo(tipos[0], v);
    Object.assign(g, { fonte: 0, ativo: null, passo: null, feito: {} });
    // Só o TIPO vai para a URL (permite voltar/compartilhar o link); o valor nunca.
    history.replaceState(null, '', '#' + tipos[0]);
  }

  function limpar() {
    Object.assign(g, VAZIO());
    history.replaceState(null, '', location.pathname);
  }

  // Geometria do diagrama (px). Os nós têm altura fixa: as conexões são calculadas sem medir o DOM.
  const D = {
    pad: 24, r: 8,
    // Rótulos quebram em até 2 linhas (line-clamp no CSS): as alturas já comportam isso.
    xAlvo: 24, wAlvo: 220, hAlvo: 112, hPrep: 36, hDer: 58,
    xObj: 290, wObj: 250, hObj: 50, gObj: 10,
    xPasso: 588, wPasso: 290, hPasso: 50, gPasso: 22,
    xSai: 924, wSai: 200, hSai: 40, gSai: 8
  };
  // Rótulo curto para caber na caixa (o nome completo fica no title e no painel).
  const curto = s => String(s || '').replace(/\s*\([^)]*\)/g, '').replace(/^Subfase \d+:\s*/i, '').trim();
  const rotSaida = e => ENTIDADES[e].nome.split(/ \/ | \(/)[0].toLowerCase();

  // Linha com cotovelo arredondado de (x1,y1) até (x2,y2), dobrando em mx.
  function cotovelo(x1, y1, x2, y2, mx) {
    if (Math.abs(y2 - y1) < 1) return `M${x1},${y1} H${x2}`;
    const s = y2 > y1 ? 1 : -1, r = Math.min(D.r, Math.abs(y2 - y1) / 2);
    return `M${x1},${y1} H${mx - r} Q${mx},${y1} ${mx},${y1 + s * r} V${y2 - s * r} Q${mx},${y2} ${mx + r},${y2} H${x2}`;
  }
  const linha = (d, cls = '') => `<path d="${d}" class="tg-linha ${cls}" marker-end="url(#tg-seta${cls.includes('tg-linha--on') ? '-on' : ''})"/>`;
  const no = (tag, cls, x, y, w, h, attrs, inner) =>
    `<${tag} ${tag === 'button' ? 'type="button"' : ''} class="tg-no ${cls}" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px" ${attrs}>${inner}</${tag}>`;

  function htmlFerrGuiada(f) {
    const t = f.tool;
    const acesso = t ? ((t.tags || []).find(x => x.startsWith('acesso/')) || '').replace('acesso/', '') : '';
    const nome = f.url && f.url !== '#' ? `<a href="${esc(f.url)}" target="_blank" rel="noopener">${esc(f.nome)} ↗</a>` : `<span>${esc(f.nome)}</span>`;
    return `<li>
      <div class="tg-tool-nome">${nome}${acesso ? `<span class="pv-tag ${acesso === 'pago' ? 'pv-tag--warn' : ''}">${acesso}</span>` : ''}</div>
      ${(() => {
        // Descrição geral do catálogo (data.js); a nota de uso do pivô só para item externo, fora do catálogo.
        const txt = String((t && t.descricao) || f.aplicacao || '').replace(/\*/g, '').trim();
        return txt ? `<p title="${esc(txt)}">${esc(txt)}</p>` : '';
      })()}
    </li>`;
  }

  // Painel abaixo do diagrama: resumo do objetivo ou ferramentas do passo clicado.
  function htmlPainel(o) {
    if (!o) return '';
    const passo = o.passos.find(p => p.id === g.passo);
    const ehPrep = o.tipo === 'preparacao';
    if (!passo) {
      return `<section class="tg-painel">
        <div class="tg-painel-head"><div><div class="tg-painel-sup">${ehPrep ? '🛡️ antes de começar a investigação' : o.pivotTitulo}</div>
          <h3>${esc(o.nome)}</h3></div>${badgeOpsec(o)}</div>
        ${ehPrep ? '<p class="tg-painel-txt">Prepare o seu ambiente antes de consultar qualquer dado do alvo: rede isolada, identidades de investigação (sock puppets) e revisão da sua própria pegada digital. Assim as consultas não expõem você nem alertam o alvo.</p>' : ''}
        ${o.objetivo ? `<p class="tg-painel-txt">${o.objetivo}</p>` : ''}
        ${o.nota ? `<p class="pv-nota">💡 ${o.nota}</p>` : ''}
        <div class="tg-painel-pe"><span class="pv-muted">clique num passo para ver as ferramentas</span></div>
      </section>`;
    }
    const i = o.passos.indexOf(passo), k = chaveFeito(o, passo), feito = !!g.feito[k];
    const lista = visiveis(passo.ferramentas);
    const curadas = lista.filter(f => f.origem === 'curada'), outras = lista.filter(f => f.origem !== 'curada');
    const ocultas = passo.ferramentas.length - lista.length;
    return `<section class="tg-painel" id="tg-painel">
      <div class="tg-painel-head">
        <div><div class="tg-painel-sup">${esc(curto(o.nome))} · passo ${i + 1} de ${o.passos.length}</div><h3>${esc(passo.titulo)}</h3></div>
        <label class="tg-feito ${feito ? 'on' : ''}"><input type="checkbox" data-g-feito="${esc(k)}" ${feito ? 'checked' : ''}> ${feito ? 'concluído' : 'marcar como concluído'}</label>
      </div>
      ${passo.conceito ? `<p class="tg-painel-txt">${esc(passo.conceito)}</p>` : ''}
      ${curadas.length ? `<ul class="tg-tools">${curadas.map(htmlFerrGuiada).join('')}</ul>` : ''}
      ${outras.length ? `<details class="pv-ferr"><summary>// + ${outras.length} outras do catálogo</summary><ul class="tg-tools tg-tools--outras">${outras.map(htmlFerrGuiada).join('')}</ul></details>` : ''}
      ${!lista.length ? '<p class="pv-muted">Todas as ferramentas deste passo são pagas.</p>' : ''}
      ${ocultas ? `<p class="pv-muted">${ocultas} paga${ocultas > 1 ? 's' : ''} oculta${ocultas > 1 ? 's' : ''}.</p>` : ''}
    </section>`;
  }

  function renderFluxo(a) {
    const todos = TrilhaEngine.objetivos(a, opts());
    const fontes = [{ tipo: a.tipo, valor: a.valor, principal: true }, ...a.derivados];
    if (g.fonte >= fontes.length) g.fonte = 0;
    const prep = todos.find(o => !o.fonte) || null;
    const objs = todos.filter(o => o.fonte && o.ordemFonte === g.fonte);
    const ativo = (prep && g.ativo === prep.id) ? prep : (objs.find(o => o.id === g.ativo) || objs[0] || null);
    g.ativo = ativo ? ativo.id : null;
    const passos = ativo ? ativo.passos : [];
    if (!passos.some(p => p.id === g.passo)) g.passo = null;

    // ── Posições
    const pitchObj = D.hObj + D.gObj, pitchPasso = D.hPasso + D.gPasso, pitchSai = D.hSai + D.gSai;
    const yObj = i => D.pad + i * pitchObj;
    const yPasso = j => D.pad + j * pitchPasso;
    const ySai = k => D.pad + k * pitchSai;
    const centroObjs = D.pad + (Math.min(objs.length || 1, 4) * pitchObj - D.gObj) / 2;
    const yAlvo = Math.max(D.pad + (prep ? D.hPrep + 18 : 0), centroObjs - D.hAlvo / 2);
    const yDerRot = yAlvo + D.hAlvo + 22;
    const yDer = i => yDerRot + 14 + i * (D.hDer + 10);
    const fonteY = i => i === 0 ? yAlvo + D.hAlvo / 2 : yDer(i - 1) + D.hDer / 2;
    const saidas = ativo ? ativo.para : [];
    const altura = Math.max(
      fontes.length > 1 ? yDer(fontes.length - 2) + D.hDer : yAlvo + D.hAlvo,
      objs.length ? yObj(objs.length - 1) + D.hObj : 0,
      passos.length ? yPasso(passos.length - 1) + D.hPasso : 0,
      saidas.length ? ySai(saidas.length - 1) + D.hSai : 0
    ) + D.pad;

    // ── Conexões
    const linhas = [];
    const xFonte = D.xAlvo + D.wAlvo;
    const prepAtivo = !!prep && ativo === prep;
    objs.forEach((o, i) => linhas.push(linha(cotovelo(xFonte, fonteY(g.fonte), D.xObj - 5, yObj(i) + D.hObj / 2, xFonte + 26),
      o === ativo ? 'tg-linha--on' : '')));
    if (prepAtivo && passos.length) {
      // OPSEC ➔ passos: contorna por cima da coluna de objetivos.
      const y1 = D.pad + D.hPrep / 2, yTopo = 10, y2 = yPasso(0) + D.hPasso / 2;
      linhas.push(linha(`M${xFonte},${y1} H${xFonte + 18} V${yTopo} H${D.xPasso - 22} V${y2} H${D.xPasso - 5}`, 'tg-linha--on'));
    }
    if (ativo && !prepAtivo && passos.length) {
      const xo = D.xObj + D.wObj, i = objs.indexOf(ativo);
      linhas.push(linha(cotovelo(xo, yObj(i) + D.hObj / 2, D.xPasso - 5, yPasso(0) + D.hPasso / 2, xo + 28), 'tg-linha--on'));
    }
    passos.slice(1).forEach((_, j) => {
      const x = D.xPasso + D.wPasso / 2;
      linhas.push(linha(`M${x},${yPasso(j) + D.hPasso} V${yPasso(j + 1) - 4}`));
    });
    if (passos.length) {
      const xp = D.xPasso + D.wPasso, yp = yPasso(passos.length - 1) + D.hPasso / 2;
      saidas.forEach((_, k) => linhas.push(linha(cotovelo(xp, yp, D.xSai - 5, ySai(k) + D.hSai / 2, xp + 24), 'tg-linha--tracejada')));
    }

    // ── Nós
    const E = ENTIDADES[a.tipo];
    const ehEmail = a.tipo === 'email' && a.valor.includes('@');
    const [linha1, linha2] = ehEmail ? [a.valor.split('@')[0], '@' + a.valor.split('@')[1]]
      : a.valor ? [a.valor, E.nome] : [E.nome, E.exemplo ? `ex.: ${E.exemplo}` : ''];
    const linha3 = a.valor ? [a.perfil?.rotulo, ehEmail ? E.nome : ''].filter(Boolean).join(' · ') : GRUPOS_ENTIDADE[E.grupo].nome;
    const progresso = o => { const ks = o.passos.map(p => chaveFeito(o, p)); return [ks.filter(k => g.feito[k]).length, ks.length]; };

    const colFontes = [
      prep ? no('button', `tg-prep ${prepAtivo ? 'on' : ''}`, D.xAlvo, D.pad, D.wAlvo, D.hPrep,
        `data-g-obj="${prep.id}" title="Antes de começar: prepare o seu ambiente (${esc(prep.nome)})"`,
        `<span class="tg-rot">🛡️ preparar ambiente</span><span class="tg-cont">${progresso(prep).join('/')}</span>`) : '',
      no('button', `tg-alvo ${g.fonte === 0 && !prepAtivo ? 'on' : ''}`, D.xAlvo, yAlvo, D.wAlvo, D.hAlvo, `data-g-fonte="0" title="${esc(a.valor || E.nome)}"`,
        `<span class="tg-ico">${E.icone}</span><span class="tg-alvo-txt"><b>${esc(linha1)}</b><small>${esc(linha2)}</small>${linha3 ? `<i>${esc(linha3)}</i>` : ''}</span>`),
      fontes.length > 1 ? `<div class="tg-rotulo-col" style="left:${D.xAlvo}px;top:${yDerRot}px">derivados</div>` : '',
      ...fontes.slice(1).map((f, i) => no('button', `tg-der ${g.fonte === i + 1 && !prepAtivo ? 'on' : ''}`, D.xAlvo, yDer(i), D.wAlvo, D.hDer,
        `data-g-fonte="${i + 1}" title="${esc(f.motivo || '')}"`,
        `<span class="tg-ico">${ENTIDADES[f.tipo].icone}</span><span class="tg-alvo-txt"><b>${esc(f.valor || ENTIDADES[f.tipo].nome)}</b><i>${esc(f.valor ? ENTIDADES[f.tipo].nome : f.motivo || '')}</i></span>`))
    ].join('');

    const colObjs = objs.map((o, i) => {
      const [f, n] = progresso(o);
      const alerta = o.opsecNivel ? `<span class="tg-opsec" title="${esc(o.opsecTexto)}">${iconeOpsec(o)}</span>` : '';
      return no('button', `${o === ativo ? 'on' : ''} ${f === n ? 'ok' : ''}`, D.xObj, yObj(i), D.wObj, D.hObj, `data-g-obj="${esc(o.id)}" title="${esc(o.nome)}"`,
        `<span class="tg-rot">${esc(curto(o.nome))}</span><span class="tg-cont">${alerta}${f}/${n}</span>`);
    }).join('') || `<div class="tg-rotulo-col" style="left:${D.xObj}px;top:${D.pad + 12}px">nenhum objetivo a partir deste dado</div>`;

    const colPassos = passos.map((p, j) => {
      const feito = !!g.feito[chaveFeito(ativo, p)];
      return no('button', `tg-passo ${p.id === g.passo ? 'on' : ''} ${feito ? 'ok' : ''}`, D.xPasso, yPasso(j), D.wPasso, D.hPasso,
        `data-g-passo="${esc(p.id)}" title="${esc(p.titulo)}"`,
        `<span class="tg-num">${feito ? '✓' : j + 1}</span><span class="tg-rot">${esc(curto(p.titulo))}</span>`);
    }).join('');

    const colSaidas = saidas.map((e, k) => no('div', 'tg-saida', D.xSai, ySai(k), D.wSai, D.hSai, `title="${esc(ENTIDADES[e].nome)}"`,
      `<span class="tg-rot">→ ${esc(rotSaida(e))}</span>`)).join('');

    const largura = D.xSai + D.wSai + D.pad;
    return `
      <div class="tg-barra">
        <span class="pv-muted">clique num passo para ver as ferramentas</span>
        <div class="tg-chaves">
          <label class="tg-chave"><span>esconder pagas</span><input type="checkbox" id="pv-g-pagas" ${estado.ocultarPagas ? 'checked' : ''}><i></i></label>
          <label class="tg-chave"><span>só passivo</span><input type="checkbox" id="pv-g-passivo" ${estado.soPassivo ? 'checked' : ''}><i></i></label>
          ${Object.values(g.feito).some(Boolean) ? '<button type="button" class="pv-link-btn" data-g-zerar>zerar progresso</button>' : ''}
        </div>
      </div>
      <div class="tg-diagrama-wrap">
        <div class="tg-diagrama" style="width:${largura}px;height:${altura}px">
          <svg class="tg-svg" width="${largura}" height="${altura}" aria-hidden="true">
            <defs>
              <marker id="tg-seta" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L8,4 L0,8 z" class="tg-seta"/></marker>
              <marker id="tg-seta-on" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L8,4 L0,8 z" class="tg-seta tg-seta--on"/></marker>
            </defs>
            ${linhas.join('')}
          </svg>
          <div class="tg-col" data-rot="alvo">${colFontes}</div>
          <div class="tg-col ${prepAtivo ? 'tg-esmaecido' : ''}" data-rot="objetivos">${colObjs}</div>
          ${passos.length ? `<div class="tg-col" data-rot="passos">${colPassos}</div>` : ''}
          ${saidas.length ? `<div class="tg-col" data-rot="pode render">${colSaidas}</div>` : ''}
        </div>
      </div>
      ${htmlPainel(ativo)}`;
  }

  // Contadores do cabeçalho: objetivos/passos/ferramentas do dado selecionado.
  function contadores(a) {
    const objs = TrilhaEngine.objetivos(a, opts()).filter(o => o.fonte && o.ordemFonte === g.fonte);
    const nPassos = objs.reduce((n, o) => n + o.passos.length, 0);
    const nFerr = new Set(objs.flatMap(o => o.passos.flatMap(p => visiveis(p.ferramentas).map(f => f.id || f.nome)))).size;
    return `<b>${objs.length}</b> objetivos · <b>${nPassos}</b> passos · <b>${nFerr}</b> ferramentas`;
  }

  const botaoTipo = e => `
    <button type="button" class="tg-tipo" style="--c:${cor(e)}" data-g-escolher="${e}">
      <span class="tg-tipo-ico">${ENTIDADES[e].icone}</span>
      <span class="tg-tipo-txt"><b>${esc(ENTIDADES[e].nome)}</b>${ENTIDADES[e].exemplo ? `<small>${esc(ENTIDADES[e].exemplo)}</small>` : ''}</span>
    </button>`;

  function renderInicio() {
    return `
      <section class="pv-g-alvo pv-g-alvo--inicio">
        <p class="pv-g-prompt"><span>$</span> pivotagem --alvo identificador</p>
        <h1 class="pv-g-titulo">Comece pelo <span>identificador</span></h1>
        <p class="pv-g-intro">Escolha o tipo de dado que você tem em mãos. A pivotagem mostra o que dá para descobrir a partir dele, passo a passo, com as ferramentas de cada etapa.</p>
        <div class="tg-tipos">${tiposPrincipais.map(botaoTipo).join('')}</div>
        ${tiposOutros.length ? `
          <button type="button" class="pv-link-btn tg-mais" data-g-mais aria-expanded="${g.maisTipos}">${g.maisTipos ? '− menos tipos' : `+ outros tipos (${tiposOutros.length})`}</button>
          ${g.maisTipos ? `<div class="tg-tipos tg-tipos--outros">${tiposOutros.map(botaoTipo).join('')}</div>` : ''}` : ''}

        <form id="pv-g-form" class="pv-g-form tg-form-opcional" autocomplete="off">
          <label class="pv-g-campo"><span>&gt;</span>
            <input id="pv-g-input" type="text" spellcheck="false" aria-label="Valor do identificador (opcional)" placeholder="Ex.: e-mail, CPF, telefone…" value="${esc(g.entrada)}"></label>
          <button type="submit" class="pv-g-btn">iniciar pivotagem ↵</button>
        </form>
        <p class="tg-dica">Opcional: cole um valor para o tipo ser detectado. Nada do que você digitar é salvo.</p>
        ${g.erro ? `<p class="pv-g-erro" role="alert">${esc(g.erro)}</p>` : ''}
        ${g.candidatos.length ? `<div class="pv-g-exemplos">Pode ser mais de um tipo. Interpretar como:
          ${g.candidatos.map(e => `<button type="button" class="pv-chip pv-chip--acao" style="--c:${cor(e)}" data-g-tipo="${e}">${rotulo(e)}</button>`).join('')}</div>` : ''}
      </section>`;
  }

  function render() {
    const a = g.alvo;
    const tipoTopo = a ? ENTIDADES[(g.fonte === 0 ? a : a.derivados[g.fonte - 1] || a).tipo].nome.toLowerCase() : 'identificador';
    $('#tg-conteudo').innerHTML = `
      <div class="tg-topo"><span><b>osint</b> // pivotagem:<em>${esc(tipoTopo)}</em></span>${a ? `<span>${contadores(a)}</span>` : ''}</div>
      ${a ? `
        <section class="tg-ativo">
          <p class="pv-g-prompt"><span>$</span> pivotagem --alvo ${esc(a.tipo)}${a.valor ? ` <code>${esc(a.valor)}</code>` : ''}</p>
          <button type="button" class="tg-limpar" data-g-limpar>✕ limpar e voltar ao início</button>
        </section>
        ${a.perfil && a.perfil.aviso ? `<div class="pv-g-aviso" role="note">⚠️ ${esc(a.perfil.aviso)}</div>` : ''}
        ${renderFluxo(a)}` : renderInicio()}`;
    salvar();
  }

  // ── Eventos
  document.addEventListener('submit', ev => {
    if (ev.target.id !== 'pv-g-form') return;
    ev.preventDefault();
    iniciar($('#pv-g-input').value);
    render();
    if (!g.alvo) $('#pv-g-input')?.focus();
  });

  document.addEventListener('click', ev => {
    const t = ev.target.closest('[data-g-escolher],[data-g-tipo],[data-g-mais],[data-g-limpar],[data-g-fonte],[data-g-obj],[data-g-passo],[data-g-zerar]');
    if (!t) return;
    if (t.dataset.gEscolher) iniciar('', t.dataset.gEscolher);
    else if (t.dataset.gTipo) iniciar(g.entrada, t.dataset.gTipo);
    else if (t.hasAttribute('data-g-mais')) g.maisTipos = !g.maisTipos;
    else if (t.hasAttribute('data-g-limpar')) limpar();
    else if (t.dataset.gFonte) Object.assign(g, { fonte: +t.dataset.gFonte, ativo: null, passo: null });
    else if (t.dataset.gObj) Object.assign(g, { ativo: t.dataset.gObj, passo: null });
    else if (t.dataset.gPasso) g.passo = g.passo === t.dataset.gPasso ? null : t.dataset.gPasso;
    else if (t.hasAttribute('data-g-zerar')) g.feito = {};
    render();
    if (t.hasAttribute('data-g-limpar') || t.dataset.gEscolher) window.scrollTo({ top: 0 });
    // Painel de ferramentas fora da tela? Rola até ele.
    const painel = t.dataset.gPasso && $('#tg-painel');
    if (painel && painel.getBoundingClientRect().top > innerHeight - 120) painel.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  document.addEventListener('input', ev => {
    if (ev.target.id !== 'pv-g-input') return;
    g.entrada = ev.target.value;
    if (g.erro) { g.erro = ''; $('.pv-g-erro')?.remove(); }
  });

  document.addEventListener('change', ev => {
    if (ev.target.id === 'pv-g-pagas') estado.ocultarPagas = ev.target.checked;
    else if (ev.target.id === 'pv-g-passivo') estado.soPassivo = ev.target.checked;
    else if (ev.target.dataset.gFeito) g.feito[ev.target.dataset.gFeito] = ev.target.checked;
    else return;
    render();
  });

  // Link direto: pivotagem.html#email inicia pelo tipo (ao abrir ou ao trocar o hash).
  function abrirDoLink() {
    const tipo = decodeURIComponent(location.hash.slice(1));
    if (TIPOS.includes(tipo)) { if (!g.alvo || g.alvo.tipo !== tipo || g.alvo.valor) iniciar('', tipo); }
    else if (!tipo) limpar();
    render();
  }
  window.addEventListener('hashchange', abrirDoLink);
  abrirDoLink();
})();
