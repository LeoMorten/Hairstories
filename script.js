/* =============================================
   HAIR STORIES – script.js
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* -----------------------------------------------
     1. NAV: Hintergrund bei Scroll
  ----------------------------------------------- */
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('is-scrolled', window.scrollY > 40);
  }, { passive: true });


  /* -----------------------------------------------
     2. HAMBURGER → Fullscreen Overlay
  ----------------------------------------------- */
  const navToggle  = document.getElementById('navToggle');
  const navOverlay = document.getElementById('navOverlay');

  navToggle.addEventListener('click', () => {
    const isOpen = navOverlay.classList.toggle('is-open');
    navToggle.classList.toggle('is-active', isOpen);
    navToggle.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Overlay-Links schließen das Menü und scrollen
  navOverlay.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      navOverlay.classList.remove('is-open');
      navToggle.classList.remove('is-active');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      if (target) setTimeout(() => target.scrollIntoView({ behavior: 'smooth' }), 150);
    });
  });


  /* -----------------------------------------------
     3. NAV ACTIVE STATE
  ----------------------------------------------- */
  const sections     = document.querySelectorAll('section[id]');
  const navLinkItems = document.querySelectorAll('.nav__links a[href^="#"]');

  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinkItems.forEach(link => {
          link.classList.toggle(
            'is-active',
            link.getAttribute('href') === `#${entry.target.id}`
          );
        });
      }
    });
  }, { rootMargin: '-30% 0px -60% 0px' });

  sections.forEach(s => sectionObserver.observe(s));


  /* -----------------------------------------------
     4. REVEAL ON SCROLL
  ----------------------------------------------- */
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        en.target.classList.add('visible');
        revealObs.unobserve(en.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));


  /* -----------------------------------------------
     5. AGB ACCORDION
  ----------------------------------------------- */
  const agbItems = document.querySelectorAll('.agb__item');

  agbItems.forEach(item => {
    const toggle = item.querySelector('.agb__toggle');

    toggle.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');

      agbItems.forEach(other => {
        other.classList.remove('is-open');
        other.querySelector('.agb__toggle').setAttribute('aria-expanded', 'false');
      });

      item.classList.toggle('is-open', !isOpen);
      toggle.setAttribute('aria-expanded', !isOpen);
    });
  });

});
