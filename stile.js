/* ============================================================
   TYPEWRITER EFFECT
   ⚙️ Edite o array 'words' com os textos que você quer exibir
============================================================ */
const words = [
  "Transformando processos em código.",
  "Dev Full-Stack em construção.",
  "ADM + Tecnologia = Soluções reais.",
  "UNICID · ADS 2027.",
  // ⚙️ Adicione ou remova frases aqui
];

let wi = 0, ci = 0, del = false;
const twEl = document.getElementById('typewriter');

function type() {
  const w = words[wi];
  twEl.textContent = del ? w.slice(0, --ci) : w.slice(0, ++ci);
  if (!del && ci === w.length) { setTimeout(() => del = true, 1800); }
  else if (del && ci === 0)   { del = false; wi = (wi + 1) % words.length; }
  setTimeout(type, del ? 45 : 90);
}
type();

/* ============================================================
   HAMBURGER MENU
============================================================ */
function toggleMenu() {
  document.getElementById('ham').classList.toggle('open');
  document.getElementById('nav-mobile').classList.toggle('open');
}
function closeMenu() {
  document.getElementById('ham').classList.remove('open');
  document.getElementById('nav-mobile').classList.remove('open');
}

/* ============================================================
   SCROLL REVEAL
============================================================ */
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

/* ============================================================
   SKILL PROGRESS BARS — animam quando entram na tela
============================================================ */
const pbObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.style.width = e.target.dataset.w + '%';
  });
}, { threshold: 0.4 });
document.querySelectorAll('.skill-fill').forEach(el => pbObs.observe(el));

/* ============================================================
   BACK TO TOP BUTTON
============================================================ */
window.addEventListener('scroll', () => {
  document.getElementById('back-top').classList.toggle('show', scrollY > 400);
});

/* ============================================================
   ACTIVE NAV LINK — destaca o link da seção visível
============================================================ */
const sections  = document.querySelectorAll('[id]');
const navLinks  = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => { if (scrollY >= s.offsetTop - 80) current = s.id; });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current ? 'var(--neon)' : '';
  });
});

/* ============================================================
   NAV — escurece ao rolar
============================================================ */
window.addEventListener('scroll', () => {
  document.getElementById('nav').style.background =
    scrollY > 10 ? 'rgba(8,12,16,0.95)' : 'rgba(8,12,16,0.8)';
});

/* ============================================================
   FORMSPREE SUBMIT
   ⚙️ Substitua YOUR_FORM_ID pelo seu ID real do Formspree
      Ex: action="https://formspree.io/f/xpzgkrwl"
============================================================ */
async function handleSubmit(e) {
  e.preventDefault();
  const form   = e.target;
  const status = document.getElementById('form-status');
  const btn    = form.querySelector('.form-submit');

  btn.textContent = 'Enviando...';
  btn.disabled    = true;

  try {
    const res = await fetch(form.action, {
      method:  'POST',
      body:    new FormData(form),
      headers: { 'Accept': 'application/json' }
    });
    if (res.ok) {
      status.textContent   = '✓ Mensagem enviada! Te respondo em breve.';
      status.style.color   = 'var(--neon2)';
      form.reset();
    } else {
      throw new Error();
    }
  } catch {
    status.textContent = '✗ Erro ao enviar. Tente pelo WhatsApp.';
    status.style.color = '#f87171';
  }

  btn.textContent = 'Enviar mensagem';
  btn.disabled    = false;
}