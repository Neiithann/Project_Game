// Scroll suave
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    window.scrollTo({
      top: target.offsetTop - 60,
      behavior: 'smooth'
    });
  });
});

// Botão "Explorar"
document.getElementById('exploreBtn').addEventListener('click', () => {
  const historia = document.getElementById('historia');
  window.scrollTo({
    top: historia.offsetTop - 60,
    behavior: 'smooth'
  });
});

// Tabs de catálogo
const tabButtons = document.querySelectorAll('.tab-button');
const tabPanes = document.querySelectorAll('.tab-pane');

tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    tabButtons.forEach(b => b.classList.remove('active'));
    tabPanes.forEach(p => p.classList.remove('active'));
    button.classList.add('active');
    document.getElementById(button.dataset.tab).classList.add('active');
  });
});

// Fade-in ao rolar
const faders = document.querySelectorAll('.fade');
const appearOptions = { threshold: 0.2 };
const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    observer.unobserve(entry.target);
  });
}, appearOptions);
faders.forEach(fader => appearOnScroll.observe(fader));

// Botão "Voltar ao Topo"
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 600) backToTop.style.display = 'block';
  else backToTop.style.display = 'none';
});
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Contagem animada dos números
const counters = document.querySelectorAll('.stat-number');
let started = false;

function startCount() {
  if (started) return;
  if (window.scrollY + window.innerHeight >= document.querySelector('#impacto').offsetTop) {
    counters.forEach(counter => {
      const target = +counter.dataset.target;
      const update = () => {
        const count = +counter.innerText;
        const increment = target / 200;
        if (count < target) {
          counter.innerText = Math.ceil(count + increment);
          requestAnimationFrame(update);
        } else counter.innerText = target;
      };
      update();
    });
    started = true;
  }
}
window.addEventListener('scroll', startCount);
