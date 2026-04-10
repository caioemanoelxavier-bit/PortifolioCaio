/* Configuração do Typewriter */
const words = [
  "Especialista em SQL por Harvard.",
  "Modelando dados para o futuro.",
  "Desenvolvedor de Software.",
  "De ADM a Engenheiro de Dados.",
];

let wi = 0, ci = 0, del = false;
const twEl = document.getElementById('typewriter');

function type() {
  const w = words[wi];
  twEl.textContent = del ? w.slice(0, --ci) : w.slice(0, ++ci);
  
  if (!del && ci === w.length) {
    setTimeout(() => del = true, 2000);
  } else if (del && ci === 0) {
    del = false;
    wi = (wi + 1) % words.length;
  }
  setTimeout(type, del ? 50 : 100);
}

document.addEventListener('DOMContentLoaded', type);

/* Scroll Reveal */
const revObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      // Ativa barras de skill se for a seção de skills
      const bars = e.target.querySelectorAll('.skill-fill');
      bars.forEach(b => b.style.width = b.dataset.w + '%');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revObs.observe(el));

/* Menu Mobile */
function toggleMenu() {
  document.getElementById('ham').classList.toggle('open');
  document.getElementById('nav-mobile').classList.toggle('open');
}

function closeMenu() {
  document.getElementById('ham').classList.remove('open');
  document.getElementById('nav-mobile').classList.remove('open');
}