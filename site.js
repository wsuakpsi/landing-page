// Alpha Kappa Psi landing — load sequence, parallax, nav behaviour.
// External file so the page's CSP can disallow inline scripts.

(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ── Footer year ────────────────────────────────────────────────
  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  // ── The one animation: page load ───────────────────────────────
  // Wait for the display font so the hero doesn't animate in with a
  // fallback face and then swap. Cap the wait so a slow font can't hold
  // the page hostage.
  function markLoaded() { document.body.classList.add('is-loaded'); }
  if (reduceMotion) {
    markLoaded();
  } else {
    var done = false;
    function once() { if (!done) { done = true; requestAnimationFrame(markLoaded); } }
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(once);
    setTimeout(once, 900);
  }

  // ── Nav ────────────────────────────────────────────────────────
  var nav = document.getElementById('nav');
  var toggle = document.getElementById('nav-toggle');
  var menu = document.getElementById('nav-menu');

  function setMenu(open) {
    menu.classList.toggle('open', open);
    nav.classList.toggle('menu-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
  toggle.addEventListener('click', function () { setMenu(!menu.classList.contains('open')); });
  menu.addEventListener('click', function (e) { if (e.target.tagName === 'A') setMenu(false); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menu.classList.contains('open')) setMenu(false);
  });

  function updateNav() { nav.classList.toggle('scrolled', window.scrollY > 16); }
  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  // Active section in the nav.
  var navLinks = Array.prototype.slice.call(menu.querySelectorAll('a[href^="#"]'));
  var sections = navLinks
    .map(function (a) { return document.querySelector(a.getAttribute('href')); })
    .filter(Boolean);
  if ('IntersectionObserver' in window && sections.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var id = '#' + entry.target.id;
          navLinks.forEach(function (a) { a.classList.toggle('active', a.getAttribute('href') === id); });
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    sections.forEach(function (s) { observer.observe(s); });
  }

  // ── Parallax ───────────────────────────────────────────────────
  // [data-parallax] elements shift by (section centre offset × factor).
  // Positive = background feel, negative = foreground feel. Skipped
  // entirely under reduced motion. The hero glyph also has a load
  // animation, so its parallax transform is deferred until that finishes.
  var layers = Array.prototype.slice.call(document.querySelectorAll('[data-parallax]'));
  if (!reduceMotion && layers.length) {
    var items = layers.map(function (el) {
      return {
        el: el,
        factor: parseFloat(el.getAttribute('data-parallax')) || 0,
        section: el.closest('section') || el.parentElement,
        ready: !el.classList.contains('load'),
      };
    });
    items.forEach(function (item) {
      if (item.ready) return;
      item.el.addEventListener('animationend', function () {
        item.el.style.animation = 'none';
        item.el.style.opacity = '1';
        item.ready = true;
        onScroll();
      }, { once: true });
    });

    var ticking = false;
    function update() {
      ticking = false;
      var vh = window.innerHeight;
      items.forEach(function (item) {
        if (!item.ready) return;
        var rect = item.section.getBoundingClientRect();
        if (rect.bottom < -vh || rect.top > vh * 2) return;
        var centre = rect.top + rect.height / 2 - vh / 2;
        item.el.style.transform = 'translate3d(0, ' + (-centre * item.factor).toFixed(1) + 'px, 0)';
      });
    }
    function onScroll() {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();
  }
})();
