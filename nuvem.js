/* Nuvem do Pausa: login por e-mail e senha e sincronização com o Supabase.
   Fala direto com a API REST do Supabase, sem biblioteca.
   - Cada alteração marca a chave como "suja"; alguns segundos depois as sujas sobem.
   - O servidor carimba cada chave com a hora dele e devolve tudo; o que for mais novo desce.
   - Depois de aplicar dados que vieram de outro aparelho, a página recarrega quando for seguro. */
(function () {
  // Preencha com os dados do seu projeto (Project URL e a chave publishable/anon).
  // A chave anon/publishable é pública por natureza: a proteção vem do login e do RLS no banco.
  const CFG = window.PAUSA_NUVEM || { url: '', chave: '' };

  const CHAVES = window.PAUSA_CHAVES || [];
  const LS = window.localStorage;
  const K_SESSAO = 'pausa__sessao', K_META = 'pausa__meta', K_SUJO = 'pausa__sujo';
  const configurada = !!(CFG.url && CFG.chave);
  const base = (CFG.url || '').replace(/\/+$/, '');
  const byId = id => document.getElementById(id);

  const ler = (k, d) => { try { const v = LS.getItem(k); return v ? JSON.parse(v) : d } catch (e) { return d } };
  const grava = (k, v) => { try { LS.setItem(k, JSON.stringify(v)) } catch (e) {} };
  const hora = t => new Date(t).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  const aviso = s => { if (window.toast) window.toast(s) };

  let sessao = ler(K_SESSAO, null);   // {email, id, access, refresh, exp, vinculado, ultima}
  let meta = ler(K_META, {});         // chave -> hora do servidor da versão que este aparelho tem
  let sujo = ler(K_SUJO, {});         // chave -> contador de alterações ainda não enviadas
  let modo = 'off', statusTxt = '', remotoPendente = null;
  let tSync = null, sincronizando = false, deNovo = false, recarregar = false;

  /* ---------- marcar alterações (chamado pelo save() do app) ---------- */
  window.nuvemMarcar = k => {
    if (!CHAVES.includes(k)) return;
    sujo[k] = (sujo[k] || 0) + 1; grava(K_SUJO, sujo);
    agendar(2500);
  };
  window.nuvemConectada = () => !!(configurada && sessao && sessao.vinculado);

  /* ---------- comparação que ignora a ordem das chaves (o banco reordena) ---------- */
  function canon(v) {
    if (Array.isArray(v)) return '[' + v.map(canon).join(',') + ']';
    if (v && typeof v === 'object') return '{' + Object.keys(v).sort().map(k => JSON.stringify(k) + ':' + canon(v[k])).join(',') + '}';
    return JSON.stringify(v);
  }
  const lerChave = k => { try { const v = LS.getItem('pausa_' + k); return v == null ? null : JSON.parse(v) } catch (e) { return null } };

  /* ---------- API ---------- */
  function msgErro(j, st) {
    const m = (j && (j.msg || j.error_description || j.message || j.error)) || ('erro ' + st);
    const mapa = [
      [/invalid login credentials/i, 'E-mail ou senha errados.'],
      [/already (been )?registered|already exists/i, 'Esse e-mail já tem conta. Use Entrar.'],
      [/not confirmed/i, 'Confirme o e-mail (olhe a caixa de entrada) e depois toque em Entrar.'],
      [/at least 6|password.*(short|weak)/i, 'A senha precisa ter pelo menos 6 caracteres.'],
      [/signups? not allowed|signup.*disabled/i, 'A criação de contas está desligada no projeto.'],
      [/rate limit|too many/i, 'Muitas tentativas. Espera um pouco.'],
      [/invalid.*email|email.*invalid|unable to validate email/i, 'E-mail inválido.'],
      [/could not find the function|pausa_sync/i, 'O banco ainda não foi preparado. Rode o supabase.sql no projeto.']
    ];
    for (const [re, t] of mapa) if (re.test(m)) return t;
    return m;
  }
  async function api(caminho, { corpo, auth = false, keepalive = false } = {}) {
    const h = { apikey: CFG.chave, 'Content-Type': 'application/json' };
    if (auth) h.Authorization = 'Bearer ' + sessao.access;
    let r;
    try { r = await fetch(base + caminho, { method: 'POST', headers: h, body: JSON.stringify(corpo || {}), keepalive }) }
    catch (e) { const er = new Error('Sem internet ou nuvem fora do ar.'); er.rede = true; throw er }
    const txt = await r.text(); let j = null; try { j = txt ? JSON.parse(txt) : null } catch (e) {}
    if (!r.ok) { const er = new Error(msgErro(j, r.status)); er.status = r.status; throw er }
    return j;
  }
  function guardarSessao(j) {
    sessao = Object.assign(sessao || {}, {
      email: (j.user && j.user.email) || (sessao && sessao.email) || '',
      id: (j.user && j.user.id) || (sessao && sessao.id) || '',
      access: j.access_token, refresh: j.refresh_token,
      exp: Date.now() + ((j.expires_in || 3600) - 60) * 1000
    });
    grava(K_SESSAO, sessao);
  }
  async function renovar() {
    try { guardarSessao(await api('/auth/v1/token?grant_type=refresh_token', { corpo: { refresh_token: sessao.refresh } })) }
    catch (e) {
      if (e.rede) throw e;
      perderSessao('Sua sessão expirou. Entre de novo.');
      const er = new Error('Sessão expirada.'); er.sessao = true; throw er;
    }
  }
  async function rpc(mudancas, keepalive) {
    if (!sessao.exp || sessao.exp < Date.now()) await renovar();
    try { return await api('/rest/v1/rpc/pausa_sync', { corpo: { mudancas }, auth: true, keepalive }) || {} }
    catch (e) {
      if (e.status !== 401) throw e;
      await renovar();
      return await api('/rest/v1/rpc/pausa_sync', { corpo: { mudancas }, auth: true, keepalive }) || {};
    }
  }
  function perderSessao(msg) {
    sessao = null; LS.removeItem(K_SESSAO); LS.removeItem(K_META); meta = {};
    modo = 'login'; render(); if (msg) erro(msg);
  }

  /* ---------- sincronizar ---------- */
  function agendar(ms) { if (!window.nuvemConectada()) return; clearTimeout(tSync); tSync = setTimeout(() => sync(), ms) }
  function aplicar(rem) {
    let mudou = false;
    for (const k of Object.keys(rem || {})) {
      if (!CHAVES.includes(k)) continue;
      const x = rem[k];
      if (!x || typeof x.t !== 'number' || x.t <= (meta[k] || 0)) continue;
      meta[k] = x.t;
      if (k in sujo) continue; // mudou aqui enquanto o pedido ia e voltava: a versão daqui sobe no próximo
      const atual = lerChave(k);
      if (canon(atual) === canon(x.v)) continue;
      if (x.v == null) LS.removeItem('pausa_' + k); else LS.setItem('pausa_' + k, JSON.stringify(x.v));
      mudou = true;
    }
    grava(K_META, meta);
    return mudou;
  }
  async function sync(keepalive) {
    if (!window.nuvemConectada()) return;
    if (sincronizando) { deNovo = true; return }
    if (navigator.onLine === false) { status('Sem internet. Sincroniza quando voltar.'); return }
    sincronizando = true; status('Sincronizando…');
    const env = {}, vers = {};
    for (const k of Object.keys(sujo)) { if (!CHAVES.includes(k)) { delete sujo[k]; continue } env[k] = lerChave(k); vers[k] = sujo[k] }
    try {
      const rem = await rpc(env, keepalive);
      for (const k in vers) if (sujo[k] === vers[k]) delete sujo[k];
      grava(K_SUJO, sujo);
      const mudou = aplicar(rem);
      sessao.ultima = Date.now(); grava(K_SESSAO, sessao);
      status('Sincronizado às ' + hora(sessao.ultima) + '.');
      if (mudou) pedirRecarga();
    } catch (e) {
      if (!e.sessao) status(e.rede ? 'Sem internet. Sincroniza quando voltar.' : 'Não sincronizou: ' + e.message);
    } finally {
      sincronizando = false;
      if (deNovo) { deNovo = false; agendar(500) }
    }
  }

  /* ---------- recarregar com segurança depois de receber dados ---------- */
  function seguro() {
    const ae = document.activeElement;
    if (ae && /^(INPUT|TEXTAREA|SELECT)$/.test(ae.tagName)) return false;
    return !['flow', 'ajuda', 'pausa'].some(id => { const e = byId(id); return e && !e.classList.contains('hide') });
  }
  function pedirRecarga() { recarregar = true; tentarRecarga() }
  function tentarRecarga() {
    if (!recarregar) return;
    if (!seguro()) { setTimeout(tentarRecarga, 2000); return }
    const on = document.querySelector('.nav .on');
    try { sessionStorage.setItem('pausa__aba', on ? on.dataset.s : 'hoje') } catch (e) {}
    location.reload();
  }

  /* ---------- login e vínculo do aparelho ---------- */
  async function entrar(criar) {
    const email = byId('nvEmail').value.trim(), senha = byId('nvSenha').value;
    if (!email || !senha) { erro('Preencha e-mail e senha.'); return }
    ocupado(true); erro('');
    try {
      const j = await api(criar ? '/auth/v1/signup' : '/auth/v1/token?grant_type=password', { corpo: { email, password: senha } });
      if (!j || !j.access_token) { erro('Conta criada. Confirme o e-mail na sua caixa de entrada e depois toque em Entrar.'); return }
      sessao = { email, vinculado: false }; guardarSessao(j);
      byId('nvSenha').value = '';
      await vincular();
    } catch (e) { erro(e.message) }
    finally { ocupado(false) }
  }
  async function vincular() {
    modo = 'conectando'; render();
    try {
      const rem = await rpc({});
      const temNuvem = Object.keys(rem).some(k => CHAVES.includes(k) && rem[k] && rem[k].v != null);
      const temAqui = CHAVES.some(k => LS.getItem('pausa_' + k) != null);
      remotoPendente = rem;
      if (temNuvem && temAqui) { modo = 'escolha'; render(); return }
      await concluir(temNuvem ? 'nuvem' : 'aqui');
    } catch (e) {
      if (e.sessao) return;
      modo = 'login'; render(); erro(e.message);
    }
  }
  async function concluir(lado) {
    const rem = remotoPendente || {};
    meta = {}; sujo = {};
    CHAVES.forEach(k => {
      if (LS.getItem('pausa_' + k) == null) return;
      // "aqui": tudo deste aparelho sobe e ganha. "nuvem": só sobe o que a nuvem não tem.
      if (lado === 'aqui' || !(rem[k] && rem[k].v != null)) sujo[k] = 1;
    });
    grava(K_META, meta); grava(K_SUJO, sujo);
    sessao.vinculado = true; grava(K_SESSAO, sessao);
    remotoPendente = null; modo = 'on'; render();
    await sync();
  }
  async function sair() {
    ocupado(true);
    try { if (sessao && sessao.access) await api('/auth/v1/logout', { auth: true }) } catch (e) {}
    sessao = null; LS.removeItem(K_SESSAO); LS.removeItem(K_META); meta = {};
    ocupado(false); modo = 'login'; render();
    aviso('Você saiu. Os dados continuam neste aparelho.');
  }
  // Chamado pelo "Apagar tudo": apaga na nuvem (e, por consequência, nos outros aparelhos).
  window.nuvemApagar = async () => {
    if (!window.nuvemConectada()) return true;
    const tudo = {}; CHAVES.forEach(k => { tudo[k] = null });
    try { const rem = await rpc(tudo); sujo = {}; grava(K_SUJO, sujo); for (const k of CHAVES) if (rem[k]) meta[k] = rem[k].t; grava(K_META, meta); return true }
    catch (e) { aviso(e.rede ? 'Sem internet: não deu pra apagar na nuvem. Nada foi apagado.' : 'Não deu pra apagar na nuvem: ' + e.message); return false }
  };

  /* ---------- tela ---------- */
  function status(s) { statusTxt = s; const e = byId('nvStatus'); if (e) e.textContent = s }
  function erro(s) { const e = byId('nvErro'); if (!e) return; e.textContent = s || ''; e.classList.toggle('hide', !s) }
  function ocupado(b) { ['nvEntrar', 'nvCriar', 'nvSair', 'nvAgora'].forEach(id => { const e = byId(id); if (e) e.disabled = b }) }
  function render() {
    if (!byId('nvCard')) return;
    const vis = { nvOff: modo === 'off', nvLogin: modo === 'login', nvConectando: modo === 'conectando', nvEscolha: modo === 'escolha', nvOn: modo === 'on' };
    Object.keys(vis).forEach(id => byId(id).classList.toggle('hide', !vis[id]));
    if (modo === 'on') { byId('nvQuem').textContent = sessao.email; byId('nvStatus').textContent = statusTxt || (sessao.ultima ? 'Sincronizado às ' + hora(sessao.ultima) + '.' : '') }
  }
  function ligar() {
    if (!byId('nvCard')) return;
    byId('nvEntrar').onclick = () => entrar(false);
    byId('nvCriar').onclick = () => entrar(true);
    byId('nvSenha').onkeydown = e => { if (e.key === 'Enter') entrar(false) };
    byId('nvFicaNuvem').onclick = () => concluir('nuvem');
    byId('nvFicaAqui').onclick = () => concluir('aqui');
    byId('nvBackup').onclick = () => { const b = byId('exp'); if (b) b.click() };
    byId('nvAgora').onclick = () => sync();
    byId('nvSair').onclick = sair;
  }

  /* ---------- início ---------- */
  ligar();
  try { const ab = sessionStorage.getItem('pausa__aba'); if (ab) { sessionStorage.removeItem('pausa__aba'); if (window.tela) window.tela(ab) } } catch (e) {}
  if (!configurada) { modo = 'off'; render(); return }
  window.addEventListener('online', () => agendar(300));
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') agendar(300);
    else if (window.nuvemConectada() && Object.keys(sujo).length) { clearTimeout(tSync); sync(true) }
  });
  if (!sessao) { modo = 'login'; render(); return }
  if (!sessao.vinculado) { vincular(); return }
  modo = 'on'; render(); sync();
})();
