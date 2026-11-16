const menu = document.querySelector('.menu');
const nav = document.querySelector('nav');
menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  nav.classList.toggle('open', open);
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  menu.setAttribute('aria-expanded', 'false'); nav.classList.remove('open');
}));
function filterPartners(category) {
  let count = 0;
  document.querySelectorAll('[data-category]').forEach(card => {
    card.hidden = category !== 'All partners' && card.dataset.category !== category;
    if (!card.hidden) count++;
  });
  document.querySelectorAll('[data-filter]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === category)));
  document.querySelector('#result-count').textContent = `Showing ${count} partners`;
}
document.querySelectorAll('[data-filter]').forEach(b => b.addEventListener('click', () => filterPartners(b.dataset.filter)));
document.querySelectorAll('[data-filter-link]').forEach(a => a.addEventListener('click', () => filterPartners(a.dataset.filterLink)));

// Content stays visible when JavaScript or intersection observers are unavailable.
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
if (!motionPreference.matches && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.section-head, .solution, .partner, .service-row, .about, .contact').forEach(element => {
    // Avoid hiding anything already visible on the initial screen.
    if (element.getBoundingClientRect().top >= window.innerHeight) {
      element.classList.add('reveal');
      observer.observe(element);
    }
  });
  motionPreference.addEventListener('change', event => {
    if (event.matches) {
      observer.disconnect();
      document.querySelectorAll('.reveal').forEach(element => element.classList.add('revealed'));
    }
  });
}
