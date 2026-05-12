/* =============================================
   HAIR STORIES – script.js
   Nav, Hamburger, Accordion
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* -----------------------------------------------
     1. NAV: Hintergrund bei Scroll einblenden
  ----------------------------------------------- */
  const nav = document.getElementById('nav');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('is-scrolled', window.scrollY > 40);
  }, { passive: true });


  /* -----------------------------------------------
     2. HAMBURGER MENU
  ----------------------------------------------- */
  const navToggle = document.getElementById('navToggle');
  const navLinks  = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');
    navToggle.classList.toggle('is-active', isOpen);
    navToggle.setAttribute('aria-expanded', isOpen);
    navToggle.setAttribute('aria-label', isOpen ? 'Menü schließen' : 'Menü öffnen');
  });

  // Menü schließen wenn ein Link geklickt wird
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
      navToggle.classList.remove('is-active');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-label', 'Menü öffnen');
    });
  });


  /* -----------------------------------------------
     3. NAV ACTIVE STATE via IntersectionObserver
  ----------------------------------------------- */
  const sections     = document.querySelectorAll('section[id]');
  const navLinkItems = document.querySelectorAll('.nav__links a[href^="#"]');

  const observer = new IntersectionObserver(entries => {
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
  }, {
    rootMargin: '-30% 0px -60% 0px'
  });

  sections.forEach(section => observer.observe(section));


  /* -----------------------------------------------
     4. AGB ACCORDION
  ----------------------------------------------- */
  const agbItems = document.querySelectorAll('.agb__item');

  agbItems.forEach(item => {
    const toggle  = item.querySelector('.agb__toggle');
    const content = item.querySelector('.agb__content');

    toggle.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');

      // Alle anderen schließen
      agbItems.forEach(other => {
        if (other !== item) {
          other.classList.remove('is-open');
          other.querySelector('.agb__toggle').setAttribute('aria-expanded', 'false');
        }
      });

      // Dieses öffnen oder schließen
      item.classList.toggle('is-open', !isOpen);
      toggle.setAttribute('aria-expanded', !isOpen);
    });
  });

});
