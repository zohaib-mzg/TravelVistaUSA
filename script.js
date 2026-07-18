// TravelVista USA — shared interactivity
document.addEventListener('DOMContentLoaded', () => {

  // ---- Navbar search (icon button in header) ----
  (() => {
    const searchBtn = document.querySelector('.header-actions .icon-btn[aria-label="Search"]');
    if (!searchBtn) return;

    let overlay = document.getElementById('site-search-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'site-search-overlay';
      overlay.className = 'site-search-overlay';
      overlay.innerHTML = `
        <div class="site-search-panel">
          <button type="button" class="site-search-close" aria-label="Close search">&times;</button>
          <form id="site-search-form">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.3-4.3"/></svg>
            <input type="text" id="site-search-input" placeholder="Search articles, destinations, guides…" autocomplete="off">
            <button type="submit" class="btn btn-primary btn-sm">Search</button>
          </form>
          <p class="site-search-hint">Press <kbd>Esc</kbd> to close</p>
        </div>`;
      document.body.appendChild(overlay);
    }

    const panel = overlay.querySelector('.site-search-panel');
    const input = overlay.querySelector('#site-search-input');
    const form = overlay.querySelector('#site-search-form');
    const closeBtn = overlay.querySelector('.site-search-close');

    const openSearch = () => {
      overlay.classList.add('open');
      setTimeout(() => input.focus(), 30);
    };
    const closeSearch = () => overlay.classList.remove('open');

    searchBtn.addEventListener('click', openSearch);
    closeBtn.addEventListener('click', closeSearch);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) closeSearch(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && overlay.classList.contains('open')) closeSearch(); });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const q = input.value.trim();
      if (!q) { input.focus(); return; }
      const onBlogPage = document.getElementById('blog-filter-bar');
      if (onBlogPage) {
        closeSearch();
        const sidebarInput = document.querySelector('#blog-search-form input[type="text"]');
        if (sidebarInput) sidebarInput.value = q;
        filterBlogCards(q);
      } else {
        window.location.href = `blog.html?q=${encodeURIComponent(q)}`;
      }
    });
  })();

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

  // ---- Hero search (index.html — redirects to blog with filters) ----
  const heroSearchForm = document.querySelector('.hero-search');
  heroSearchForm?.querySelector('.btn')?.addEventListener('click', (e) => {
    e.preventDefault();
    const dest = document.getElementById('search-destination')?.value.trim() || '';
    const selects = heroSearchForm.querySelectorAll('select');
    const category = selects[0] && selects[0].value !== 'All Categories' ? selects[0].value : '';
    const params = new URLSearchParams();
    if (dest) params.set('q', dest);
    if (category) params.set('category', category);
    const qs = params.toString();
    window.location.href = `blog.html${qs ? '?' + qs : ''}`;
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

  // ---- Blog: filtering + search (real implementation) ----
  function filterBlogCards(query, category) {
    const cards = document.querySelectorAll('[data-blog-card]');
    if (!cards.length) return;
    const cat = category || document.querySelector('#blog-filter-bar .filter-chip.active')?.dataset.filter || 'all';
    const q = (query || '').toLowerCase().trim();
    let visible = 0;
    cards.forEach(card => {
      const matchesCategory = cat === 'all' || card.dataset.category === cat;
      const matchesQuery = !q || (card.dataset.search || '').toLowerCase().includes(q);
      const show = matchesCategory && matchesQuery;
      card.style.display = show ? '' : 'none';
      if (show) visible++;
    });
    const emptyState = document.getElementById('blog-empty-state');
    if (emptyState) emptyState.style.display = visible === 0 ? '' : 'none';
  }

  // ---- Destinations: filtering (real implementation) ----
  function filterDestCards(category) {
    const cards = document.querySelectorAll('[data-dest-card]');
    if (!cards.length) return;
    let visible = 0;
    cards.forEach(card => {
      const show = category === 'all' || card.dataset.category === category;
      card.style.display = show ? '' : 'none';
      if (show) visible++;
    });
    const emptyState = document.getElementById('dest-empty-state');
    if (emptyState) emptyState.style.display = visible === 0 ? '' : 'none';
  }

  // ---- Filter chips (destinations / blog) ----
  document.querySelectorAll('.filter-bar').forEach(bar => {
    bar.addEventListener('click', (e) => {
      const chip = e.target.closest('.filter-chip');
      if (!chip) return;
      bar.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const filterValue = chip.dataset.filter || 'all';
      if (bar.id === 'blog-filter-bar') {
        const sidebarInput = document.querySelector('#blog-search-form input[type="text"]');
        filterBlogCards(sidebarInput ? sidebarInput.value : '', filterValue);
      } else if (document.querySelector('[data-dest-card]')) {
        filterDestCards(filterValue);
      }
    });
  });

  // ---- Apply ?q= and ?category= from the URL on page load (blog.html) ----
  if (document.getElementById('blog-filter-bar')) {
    const params = new URLSearchParams(window.location.search);
    const q = params.get('q') || '';
    const category = params.get('category') || 'all';
    if (category !== 'all') {
      const chip = document.querySelector(`#blog-filter-bar .filter-chip[data-filter="${CSS.escape(category)}"]`);
      if (chip) {
        document.querySelectorAll('#blog-filter-bar .filter-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
      }
    }
    const sidebarInput = document.querySelector('#blog-search-form input[type="text"]');
    if (sidebarInput && q) sidebarInput.value = q;
    if (q || category !== 'all') filterBlogCards(q, category);
  }

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

  // ---- Blog sidebar search (filters in place, no reload) ----
  const blogSearchForm = document.getElementById('blog-search-form');
  if (blogSearchForm) {
    blogSearchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = blogSearchForm.querySelector('input[type="text"]');
      filterBlogCards(input?.value || '');
    });
  }

  // ---- Bookmark toggle ----
  document.querySelectorAll('.bookmark-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('saved');
      btn.style.background = btn.classList.contains('saved') ? 'var(--red-600)' : '';
      btn.style.color = btn.classList.contains('saved') ? '#fff' : '';
    });
  });
});
