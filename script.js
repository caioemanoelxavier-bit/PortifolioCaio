/* ⚙️ Edite as frases do typewriter aqui */
const words = [
  "Transformando processos em código.",
  "Dev Full-Stack em construção.",
  "ADM + Tecnologia = Soluções reais.",
  "UNICID · ADS 2027.",
];

let wi = 0, ci = 0, del = false;
const twEl = document.getElementById('typewriter');

function type() {
  const w = words[wi];
  twEl.textContent = del ? w.slice(0, --ci) : w.slice(0, ++ci);
  if (!del && ci === w.length) {
    setTimeout(() => del = true, 1800);
  } else if (del && ci === 0) {
    del = false;
    wi = (wi + 1) % words.length;
  }
  setTimeout(type, del ? 45 : 90);
}

type();

/* Menu hamburguer */
function toggleMenu() {
  document.getElementById('ham').classList.toggle('open');
  document.getElementById('nav-mobile').classList.toggle('open');
}

function closeMenu() {
  document.getElementById('ham').classList.remove('open');
  document.getElementById('nav-mobile').classList.remove('open');
}

/* Scroll reveal */
const revObs = new IntersectionObserver(entries =>
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); }),
  { threshold: 0.08 }
);
document.querySelectorAll('.reveal').forEach(el => revObs.observe(el));

/* Skill bars */
const pbObs = new IntersectionObserver(entries =>
  entries.forEach(e => { if (e.isIntersecting) e.target.style.width = e.target.dataset.w + '%'; }),
  { threshold: 0.4 }
);
document.querySelectorAll('.skill-fill').forEach(el => pbObs.observe(el));

/* Scroll: botão voltar ao topo + nav highlight */
window.addEventListener('scroll', () => {
  document.getElementById('back-top').classList.toggle('show', scrollY > 400);
  document.getElementById('nav').style.background =
    scrollY > 10 ? 'rgba(8,12,16,0.95)' : 'rgba(8,12,16,0.8)';

  let cur = '';
  document.querySelectorAll('[id]').forEach(s => {
    if (scrollY >= s.offsetTop - 80) cur = s.id;
  });
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + cur ? 'var(--neon)' : '';
  });
});

/* Formulário de contato — Formspree */
async function handleSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const status = document.getElementById('form-status');
  const btn = form.querySelector('.form-submit');

  btn.textContent = 'Enviando...';
  btn.disabled = true;

  try {
    const res = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    });
    if (res.ok) {
      status.textContent = '✓ Mensagem enviada! Te respondo em breve.';
      status.style.color = 'var(--neon2)';
      form.reset();
    } else {
      throw new Error();
    }
  } catch {
    status.textContent = '✗ Erro ao enviar. Tente pelo WhatsApp.';
    status.style.color = '#f87171';
  }

  btn.textContent = 'Enviar mensagem';
  btn.disabled = false;
}
