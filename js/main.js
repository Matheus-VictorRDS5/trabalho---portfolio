(() => {
const $ = s => document.querySelector(s), pad = n => String(n).padStart(2, '0'), T0 = Date.now();

/* ---------- Relógio: tempo no site + hora local ---------- */
function tick() {
  const s = Math.floor((Date.now() - T0) / 1e3);
  $('#uptime').textContent = `${pad(s / 3600 | 0)}:${pad(s / 60 % 60 | 0)}:${pad(s % 60)}`;
  $('#clock').textContent = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}
tick(); setInterval(tick, 1000);

/* ---------- Scroll horizontal (roda do mouse, setas, toque) ---------- */
document.querySelectorAll('.scroller').forEach(el => el.addEventListener('wheel', e => {
  if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) { e.preventDefault(); el.scrollLeft += e.deltaY; }
}, { passive: false }));
addEventListener('keydown', e => {
  if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
  if (!$('#shelf').hidden) { step(e.key === 'ArrowRight' ? 1 : -1); return; }
  const v = document.querySelector('.view:not([hidden]) .scroller');
  if (v) v.scrollBy({ left: (e.key === 'ArrowRight' ? 1 : -1) * innerWidth * .5, behavior: 'smooth' });
});
const show = id => {
  document.querySelectorAll('.view').forEach(v => v.hidden = ('#' + v.id) !== id);
  if (id === '#shelf') { sync(); render(); }
};

/* ---------- Seleção de fitas: carrossel 3D em arco ---------- */
const stage = $('#tapes'), selName = $('#selname'), N = FITAS.length;
const NO_MOTION = matchMedia('(prefers-reduced-motion: reduce)');
const GLOBE = '<svg viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="17"/><ellipse cx="20" cy="20" rx="7" ry="17"/><path d="M3 20h34M6 11h28M6 29h28"/></svg>';
let pos = 0, tgt = 0, raf = 0, idle = 0, dragged = false, drag = null, shown = -1;
const wrap = v => ((v + N / 2) % N + N) % N - N / 2;   // distância circular: de -N/2 a N/2
const off = i => wrap(i - pos);
const els = FITAS.map((f, i) => {
  const b = document.createElement('button');
  b.className = 'tape'; b.style.setProperty('--c', f.cor || '#dddddd'); b.setAttribute('aria-label', f.etiqueta);
  const art = f.imagem
    ? `<span class="art"><img src="${f.imagem}" alt="" draggable="false"></span>`
    : `<span class="art gen"><span class="gt">${f.etiqueta}</span></span>`;
  b.innerHTML = `<span class="sleeve"><span class="hv">Home Video</span>${art}<span class="ft"><b class="vhs">VHS</b><i class="yr">${f.ano || ''}</i>${GLOBE}</span></span>`;
  b.onclick = () => { if (dragged) return; if (Math.abs(off(i)) < .5) openTape(f); else go(i); };
  stage.append(b); return b;
});
function render() {
  const W = els[0].offsetWidth, H = els[0].offsetHeight;
  if (!W) return;                                    // vista escondida
  els.forEach((el, i) => {
    const o = off(i), a = Math.abs(o);
    const x = o * 1.36 * W, y = H * .06 * Math.pow(a, 1.5), z = -a * .3 * W;
    const ry = Math.max(-48, Math.min(48, -o * 26)), rz = o * 6;
    el.style.transform = `translate3d(${x}px,${y}px,${z}px) rotateZ(${rz}deg) rotateY(${ry}deg)`;
    el.style.opacity = Math.max(0, Math.min(1, (2.5 - a) * 2));
    el.style.filter = `brightness(${Math.max(.18, 1 - .34 * a)}) saturate(${Math.max(.45, 1 - .4 * Math.min(a, 1.5))})`;
    el.style.zIndex = 100 - Math.round(a * 10);
    el.style.pointerEvents = a > 2.2 ? 'none' : '';
    el.classList.toggle('on', a < .5);
  });
}
function sync() {                                     // nome embaixo + foco na fita central
  const cur = ((Math.round(tgt) % N) + N) % N;
  if (cur === shown) return; shown = cur;
  selName.textContent = FITAS[cur].etiqueta;
  els.forEach((el, i) => el.tabIndex = i === cur ? 0 : -1);
}
function loop() {
  const d = tgt - pos;
  if (Math.abs(d) < .001) { pos = tgt; render(); raf = 0; return; }
  pos += NO_MOTION.matches ? d : d * .14; render(); raf = requestAnimationFrame(loop);
}
const kick = () => { if (!raf) raf = requestAnimationFrame(loop); };
const step = d => { tgt = Math.round(tgt) + d; sync(); kick(); };
const go = i => { tgt += wrap(i - tgt); sync(); kick(); };
$('.prev').onclick = () => step(-1); $('.next').onclick = () => step(1);
$('#shelf').addEventListener('wheel', e => {          // roda do mouse / trackpad
  e.preventDefault();
  let d = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
  if (e.deltaMode === 1) d *= 40;                    // Firefox pode mandar em linhas
  tgt += Math.max(-1, Math.min(1, d / 140)); sync(); kick();
  clearTimeout(idle); idle = setTimeout(() => { tgt = Math.round(tgt); sync(); kick(); }, 140);
}, { passive: false });
stage.addEventListener('pointerdown', e => { if (e.target.closest('.nav')) return; drag = { x: e.clientX, t: tgt }; dragged = false; });
addEventListener('pointermove', e => {                // arrastar
  if (!drag) return;
  const dx = e.clientX - drag.x;
  if (Math.abs(dx) > 6) { dragged = true; stage.classList.add('drag'); }
  if (dragged) { tgt = drag.t - dx / (els[0].offsetWidth * 1.1); sync(); kick(); }
});
addEventListener('pointerup', () => {
  if (!drag) return;
  const was = dragged; drag = null; stage.classList.remove('drag');
  if (was) { tgt = Math.round(tgt); sync(); kick(); setTimeout(() => dragged = false, 60); }
});
addEventListener('resize', render);

/* ---------- Dentro da fita ---------- */
const END_SVG = `<svg viewBox="0 0 400 250" aria-hidden="true"><rect class="tr" pathLength="1" x="10" y="10" width="380" height="230" rx="10"/><rect class="tr" pathLength="1" x="40" y="30" width="320" height="70"/><rect class="tr" pathLength="1" x="60" y="120" width="280" height="90" rx="45"/><circle class="tr" pathLength="1" cx="130" cy="165" r="26"/><circle class="tr" pathLength="1" cx="270" cy="165" r="26"/><path class="tr" pathLength="1" d="M130 191 L270 191 M100 240 L120 215 M300 240 L280 215"/></svg>`;
const add = (html, cls = '', anim = '') => {
  const e = document.createElement('section'); e.className = 'scene ' + cls; e.innerHTML = html;
  if (anim) { e.dataset.anim = anim; e.querySelectorAll('h2,p').forEach(n => n.dataset.t = n.textContent); }
  $('#scenes').append(e); return e;
};

/* ---------- Textos animados: digitação + efeito de VHS ---------- */
const ESTILOS = ['combinado', 'vhs', 'combinado', 'digitacao'];   // usado quando a cena não define "animacao"
function typeInto(el, ms, done) {
  const txt = el.dataset.t;
  if (NO_MOTION.matches) { el.textContent = txt; done(); return; }
  el.innerHTML = '<span class="on"></span><span class="off"></span>';
  const on = el.firstChild, rest = el.lastChild; rest.textContent = txt; let i = 0;
  const id = setInterval(() => {
    i++; on.textContent = txt.slice(0, i); rest.textContent = txt.slice(i);
    if (i >= txt.length) { clearInterval(id); el.textContent = txt; done(); }
  }, ms);
}
function animate(sc) {
  if (!sc.dataset.anim || sc.dataset.d) return; sc.dataset.d = 1;
  const style = sc.dataset.anim, parts = [...sc.querySelectorAll('[data-t]')];
  const typed = style !== 'vhs', glitch = style !== 'digitacao' && !NO_MOTION.matches;
  (function run(i) {
    if (i >= parts.length) return;
    const el = parts[i], next = () => setTimeout(() => run(i + 1), 150);
    const end = () => { if (glitch) { el.classList.remove('glitch'); el.classList.add('settle'); } next(); };
    el.classList.add('seen'); if (glitch) el.classList.add('glitch');
    if (typed) typeInto(el, el.tagName === 'H2' ? 45 : 16, end);
    else setTimeout(end, 650);
  })(0);
}
function count(b) {
  if (b.dataset.d) return; b.dataset.d = 1;
  const v = +b.dataset.v, t0 = performance.now();
  (function f(t) { const p = Math.min((t - t0) / 1500, 1); b.textContent = Math.round(v * p); if (p < 1) requestAnimationFrame(f); })(t0);
}
function type(p) {
  if (p.dataset.d) return; p.dataset.d = 1;
  const t = p.dataset.t; let i = 0;
  setTimeout(() => { const id = setInterval(() => { p.textContent = t.slice(0, ++i); if (i >= t.length) clearInterval(id); }, 35); }, 1500);
}
const io = new IntersectionObserver(es => es.forEach(e => {
  const el = e.target;
  if (el.classList.contains('end')) {
    document.body.classList.toggle('paper', e.isIntersecting);
    if (e.isIntersecting) type(el.querySelector('.res'));
  } else if (e.isIntersecting) { animate(el); el.querySelectorAll('[data-v]').forEach(count); }
}), { threshold: .6 });

function openTape(f) {
  io.disconnect(); $('#scenes').innerHTML = '';
  add(`<h2>${f.etiqueta}</h2><p>role para o lado &rarr;</p>`, '', 'combinado');
  f.cenas.forEach((c, n) => c.tipo === 'contador'
    ? add(`<div class="counters">${c.itens.map(i => `<div><b data-v="${i.valor}">0</b>${i.rotulo}</div>`).join('')}</div>`)
    : add(`<h2>${c.titulo}</h2><p>${c.texto}</p>`, '', c.animacao || ESTILOS[(n + 1) % ESTILOS.length]));
  const end = add(`${END_SVG}<h2>FIM DA FITA</h2><p class="res"></p><button>${f.botao_final || 'VOLTAR ÀS FITAS'}</button>`, 'end');
  end.querySelector('.res').dataset.t = f.resumo_final;
  end.querySelector('button').onclick = () => { document.body.classList.remove('paper'); show('#shelf'); };
  show('#tape'); $('#scenes').scrollLeft = 0;
  document.querySelectorAll('#scenes .scene').forEach(e => io.observe(e));
}

/* ---------- Loading 3D ---------- */
const pctEl = $('#pct'), gl = $('#gl');
let pct = 0, zoom = false, renderer, scene, cam, pc, screen, ctx, tex;
const target = window.THREE ? new THREE.Vector3() : null;

function drawScreen() {
  ctx.fillStyle = '#050805'; ctx.fillRect(0, 0, 256, 256);
  ctx.fillStyle = '#fff'; ctx.textAlign = 'center'; ctx.font = '56px monospace';
  ctx.fillText(pct >= 100 ? 'OK' : pct + '%', 128, 140); tex.needsUpdate = true;
}
function resize() {
  renderer.setSize(innerWidth, innerHeight, false);
  cam.aspect = innerWidth / innerHeight; cam.position.z = cam.aspect < 1 ? 10 : 6.5; cam.lookAt(0, 0, 0); cam.updateProjectionMatrix();
}
function initGL() {
  if (!window.THREE) return false;
  try { renderer = new THREE.WebGLRenderer({ canvas: gl, antialias: true }); } catch (e) { return false; }
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  scene = new THREE.Scene(); cam = new THREE.PerspectiveCamera(40, 1, .1, 50); cam.position.set(0, .9, 6.5);
  scene.add(new THREE.AmbientLight(0xffffff, .75));
  const l = new THREE.DirectionalLight(0xffffff, .8); l.position.set(3, 4, 5); scene.add(l);
  const cv = document.createElement('canvas'); cv.width = cv.height = 256; ctx = cv.getContext('2d'); tex = new THREE.CanvasTexture(cv);
  pc = new THREE.Group(); scene.add(pc);
  // PC dos anos 90 construído em código
  const body = new THREE.Group(); body.position.set(0, -1.15, -.45); pc.add(body);
  const M = (c, r = .85) => new THREE.MeshStandardMaterial({ color: c, roughness: r });
  const beige = M(0xd2cab4), dark = M(0x23231f, .6), led = new THREE.MeshBasicMaterial({ color: 0x39ff6a });
  const box = (w, h, d, x, y, z, m = beige, rx = 0) => { const o = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m); o.position.set(x, y, z); o.rotation.x = rx; body.add(o); return o; };
  box(2.6, .5, 1.9, 0, .25, 0);                                        // gabinete
  box(.8, .06, .02, -.7, .32, .96, dark); box(.8, .06, .02, -.7, .16, .96, dark); // baias de disquete
  box(.14, .08, .03, .8, .2, .96, dark); box(.06, .06, .03, 1.05, .2, .96, led);  // botão + LED
  box(2.2, 1.8, .5, 0, 1.4, .2);                                       // moldura do monitor
  box(1.5, 1.2, .9, 0, 1.4, -.5);                                      // fundo do tubo CRT
  box(1.85, 1.45, .01, 0, 1.4, .452, dark);                            // vão escuro da tela
  screen = new THREE.Mesh(new THREE.PlaneGeometry(1.7, 1.3), new THREE.MeshBasicMaterial({ map: tex }));
  screen.position.set(0, 1.4, .46); body.add(screen);                  // tela (recebe a porcentagem)
  const kb = box(2.2, .1, .7, 0, .06, 1.5, beige, -.08);               // teclado
  for (let i = 0; i < 4; i++) { const r = new THREE.Mesh(new THREE.BoxGeometry(1.95, .02, .09), dark); r.position.set(0, .055, -.24 + i * .14); kb.add(r); }
  box(.2, .07, .32, 1.5, .04, 1.5);                                    // mouse
  resize(); addEventListener('resize', resize); return true;
}
function frame() {
  if (!renderer) return;
  drawScreen();
  if (!zoom) pc.rotation.y += .008;
  else { pc.rotation.y *= .92; cam.position.lerp(target, .04); cam.lookAt(0, .25, 0); }
  renderer.render(scene, cam); requestAnimationFrame(frame);
}
function startZoom() {
  const r = pc.rotation.y % (Math.PI * 2); pc.rotation.y = r > Math.PI ? r - Math.PI * 2 : r;
  target.set(0, .25, 1.9);
  zoom = true;
}
function leave() {
  show('#shelf'); $('#loader').style.opacity = 0;
  setTimeout(() => $('#loader').remove(), 1000);
}
function finish() {
  if (renderer) { startZoom(); setTimeout(leave, 1800); } else leave();
}
const hasGL = initGL(); if (hasGL) frame();
const D = 4000, t0 = performance.now();
(function load(t) {
  pct = Math.min(Math.round((t - t0) / D * 100), 100);
  pctEl.textContent = pct + '%';
  if (pct < 100) requestAnimationFrame(load); else setTimeout(finish, 600);
})(t0);
})();
