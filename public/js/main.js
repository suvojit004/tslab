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
const partnerToggle = document.querySelector('[data-partner-toggle]');
const partnerCards = [...document.querySelectorAll('[data-category]')];
let partnersExpanded = false;
let partnerCategory = 'All partners';
function renderPartners() {
  let count = 0;
  partnerCards.forEach((card, index) => {
    card.hidden = (partnerCategory !== 'All partners' && card.dataset.category !== partnerCategory)
      || (partnerToggle && partnerCategory === 'All partners' && !partnersExpanded && index >= 6);
    if (!card.hidden) count++;
  });
  document.querySelectorAll('[data-filter]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === partnerCategory)));
  const status = document.querySelector('#result-count');
  if (status) status.textContent = partnerCategory === 'All partners' ? `Showing ${count} of ${partnerCards.length} partners` : `Showing ${count} partners`;
  if (partnerToggle) {
    partnerToggle.hidden = partnerCategory !== 'All partners' || partnerCards.length <= 6;
    partnerToggle.setAttribute('aria-expanded', String(partnersExpanded));
    partnerToggle.textContent = partnersExpanded ? 'Show fewer partners ↑' : `Show all ${partnerCards.length} partners ↓`;
  }
}
function filterPartners(category) {
  partnerCategory = category;
  partnersExpanded = false;
  renderPartners();
}
if (partnerToggle) {
  partnerToggle.addEventListener('click', () => {
    partnersExpanded = !partnersExpanded;
    renderPartners();
  });
  renderPartners();
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
