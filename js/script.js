(function () {
  'use strict';

  var nav = document.querySelector('.nav');
  var toggle = document.querySelector('.nav-toggle');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', !expanded);
      nav.classList.toggle('open', !expanded);
      document.body.style.overflow = expanded ? '' : 'hidden';
    });

    // Close menu when clicking a nav link (anchor)
    nav.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function () {
        toggle.setAttribute('aria-expanded', 'false');
        nav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // Optional: highlight current section in header (simple version)
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.nav-list a[href^="#"]');

  function onScroll() {
    var scrollY = window.scrollY || window.pageYOffset;
    sections.forEach(function (section) {
      var top = section.offsetTop - 100;
      var height = section.offsetHeight;
      var id = section.getAttribute('id');
      if (id && scrollY >= top && scrollY < top + height) {
        navLinks.forEach(function (a) {
          if (a.getAttribute('href') === '#' + id) {
            a.setAttribute('aria-current', 'page');
          } else {
            a.removeAttribute('aria-current');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
