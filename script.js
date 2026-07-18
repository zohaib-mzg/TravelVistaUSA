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

  // ---- Write For Us submission form (submits to Formspree) ----
  const submitForm = document.getElementById('guest-post-form');
  if (submitForm) {
    submitForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = submitForm.querySelector('button[type="submit"]');
      const originalBtnHTML = btn.innerHTML;
      btn.disabled = true;
      btn.innerHTML = 'Sending…';
      try {
        const res = await fetch(submitForm.action, {
          method: 'POST',
          body: new FormData(submitForm),
          headers: { 'Accept': 'application/json' }
        });
        if (res.ok) {
          document.getElementById('form-success').classList.add('show');
          submitForm.reset();
          document.getElementById('form-success').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
          alert('Sorry, something went wrong sending your pitch. Please try again or email guestposts@travelvistausa.com directly.');
        }
      } catch (err) {
        alert('Sorry, something went wrong sending your pitch. Please try again or email guestposts@travelvistausa.com directly.');
      } finally {
        btn.disabled = false;
        btn.innerHTML = originalBtnHTML;
      }
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

  // ---- Contact form (submits to Formspree) ----
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      const originalBtnHTML = btn.innerHTML;
      btn.disabled = true;
      btn.innerHTML = 'Sending…';
      try {
        const res = await fetch(contactForm.action, {
          method: 'POST',
          body: new FormData(contactForm),
          headers: { 'Accept': 'application/json' }
        });
        if (res.ok) {
          document.getElementById('contact-success').classList.add('show');
          contactForm.reset();
          document.getElementById('contact-success').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
          alert('Sorry, something went wrong sending your message. Please try again or email hello@travelvistausa.com directly.');
        }
      } catch (err) {
        alert('Sorry, something went wrong sending your message. Please try again or email hello@travelvistausa.com directly.');
      } finally {
        btn.disabled = false;
        btn.innerHTML = originalBtnHTML;
      }
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
