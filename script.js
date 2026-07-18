// TravelVista USA — shared interactivity
document.addEventListener('DOMContentLoaded', () => {

  // ---- Mobile menu ----
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileClose = document.querySelector('.mobile-nav-close');
  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', () => mobileNav.classList.add('open'));
    mobileClose?.addEventListener('click', () => mobileNav.classList.remove('open'));
    mobileNav.addEventListener('click', (e) => { if (e.target === mobileNav) mobileNav.classList.remove('open'); });
  }

  // ---- Dark mode toggle ----
  const darkToggle = document.querySelector('.dark-toggle');
  const applyDarkPref = () => {
    const saved = window.__tv_dark;
    if (saved) document.body.classList.add('dark');
  };
  applyDarkPref();
  darkToggle?.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    window.__tv_dark = document.body.classList.contains('dark');
  });

  // ---- Newsletter form (footer/sidebar) ----
  document.querySelectorAll('.newsletter-form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      const btn = form.querySelector('button');
      if (!input.value || !input.checkValidity()) { input.focus(); return; }
      const original = btn.innerHTML;
      btn.innerHTML = 'Subscribed ✓';
      input.value = '';
      setTimeout(() => { btn.innerHTML = original; }, 2400);
    });
  });

  // ---- Hero search (cosmetic — prevents page reload) ----
  const heroSearchForm = document.querySelector('.hero-search');
  heroSearchForm?.querySelector('.btn')?.addEventListener('click', (e) => {
    e.preventDefault();
    const dest = document.getElementById('search-destination')?.value || 'anywhere';
    alert(`Searching destinations for: ${dest || 'anywhere'}`);
  });

  // ---- Write For Us submission form ----
  const submitForm = document.getElementById('guest-post-form');
  if (submitForm) {
    submitForm.addEventListener('submit', (e) => {
      e.preventDefault();
      document.getElementById('form-success').classList.add('show');
      submitForm.reset();
      document.getElementById('form-success').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }

  // ---- Filter chips (destinations / categories / blog) ----
  document.querySelectorAll('.filter-bar').forEach(bar => {
    bar.addEventListener('click', (e) => {
      const chip = e.target.closest('.filter-chip');
      if (!chip) return;
      bar.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
    });
  });

  // ---- FAQ accordion ----
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const wasOpen = item.classList.contains('open');
      item.parentElement.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });

  // ---- Contact form ----
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      document.getElementById('contact-success').classList.add('show');
      contactForm.reset();
      document.getElementById('contact-success').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }

  // ---- Blog search (cosmetic) ----
  const blogSearchForm = document.getElementById('blog-search-form');
  blogSearchForm?.addEventListener('submit', (e) => e.preventDefault());

  // ---- Bookmark toggle ----
  document.querySelectorAll('.bookmark-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('saved');
      btn.style.background = btn.classList.contains('saved') ? 'var(--red-600)' : '';
      btn.style.color = btn.classList.contains('saved') ? '#fff' : '';
    });
  });
});
