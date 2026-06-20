// ── Navbar scroll ──
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.style.background = window.scrollY > 60
    ? 'rgba(10,10,10,0.97)' : 'rgba(10,10,10,0.88)';
});

// ── Active nav link ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('#nav .nav-link');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 100) current = s.id; });
  navLinks.forEach(l => {
    l.classList.remove('active');
    if (l.getAttribute('href') === '#' + current) l.classList.add('active');
  });
});

// ── Photo modal (bilingual captions) ──
document.querySelectorAll('.m-item').forEach(item => {
  item.addEventListener('click', () => {
    const lang = document.documentElement.getAttribute('lang') || 'es';
    const cap = lang === 'en'
      ? (item.getAttribute('data-cap-en') || item.getAttribute('data-cap-es'))
      : item.getAttribute('data-cap-es');
    document.getElementById('modalImg').src = item.getAttribute('data-img');
    document.getElementById('modalCap').textContent = cap || '';
    new bootstrap.Modal(document.getElementById('photoModal')).show();
  });
});

// ── GLOBAL bilingual toggle (ES / EN) ──
function setLang(lang) {
  document.documentElement.setAttribute('lang', lang);
  document.querySelectorAll('[data-es]').forEach(el => {
    // Skip elements that contain nested [data-es] children — only translate leaf nodes
    if (el.querySelector('[data-es]')) return;
    const text = lang === 'en' ? el.getAttribute('data-en') : el.getAttribute('data-es');
    if (text !== null) el.textContent = text;
  });
  const btnEs = document.getElementById('gBtnEs');
  const btnEn = document.getElementById('gBtnEn');
  if (btnEs && btnEn) {
    btnEs.classList.toggle('active', lang === 'es');
    btnEn.classList.toggle('active', lang === 'en');
  }
  localStorage.setItem('bt-lang', lang);
}

// Restore saved language preference on load
document.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('bt-lang');
  if (saved === 'en') setLang('en');
});

// ── Fade-up on scroll ──
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
