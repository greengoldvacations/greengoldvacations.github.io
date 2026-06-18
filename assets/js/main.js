/* ── Navigation: scroll + hamburger ─────────────────────── */
(function () {
  const nav  = document.getElementById('mainNav');
  const btn  = document.getElementById('hamburger');
  const menu = document.getElementById('mobileMenu');

  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('nav--scrolled', window.scrollY > 40);
    }, { passive: true });
  }

  if (btn && menu) {
    btn.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      btn.setAttribute('aria-expanded', open);
      menu.setAttribute('aria-hidden', !open);
      // Animate hamburger → X
      btn.querySelectorAll('span').forEach((s, i) => {
        if (open) {
          if (i === 0) s.style.transform = 'translateY(7px) rotate(45deg)';
          if (i === 1) s.style.opacity   = '0';
          if (i === 2) s.style.transform = 'translateY(-7px) rotate(-45deg)';
        } else {
          s.style.transform = '';
          s.style.opacity   = '';
        }
      });
    });

    // Close when a link is clicked
    menu.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => {
        menu.classList.remove('open');
        btn.setAttribute('aria-expanded', false);
        btn.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
      })
    );
  }
})();

/* ── Hero background Ken-Burns effect ───────────────────── */
(function () {
  const bg = document.querySelector('.hero__bg');
  if (bg) {
    window.requestAnimationFrame(() => bg.classList.add('loaded'));
  }
})();

/* ── Intersection Observer: fade-in on scroll ────────────── */
(function () {
  const style = document.createElement('style');
  style.textContent = `
    .reveal { opacity: 0; transform: translateY(28px); transition: opacity .65s ease, transform .65s ease; }
    .reveal.visible { opacity: 1; transform: none; }
    .reveal-delay-1 { transition-delay: .12s; }
    .reveal-delay-2 { transition-delay: .24s; }
    .reveal-delay-3 { transition-delay: .36s; }
  `;
  document.head.appendChild(style);

  const targets = document.querySelectorAll(
    '.feature-card, .pkg-card, .dest-card, .tcard, .dest-full-card, .pkg-full-card, .cinfo-card, .team-card'
  );
  targets.forEach((el, i) => {
    el.classList.add('reveal');
    if (i % 3 === 1) el.classList.add('reveal-delay-1');
    if (i % 3 === 2) el.classList.add('reveal-delay-2');
  });

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    targets.forEach(el => io.observe(el));
  } else {
    targets.forEach(el => el.classList.add('visible'));
  }
})();

/* ── Animated counter (Stats bar) ───────────────────────── */
(function () {
  function animateCount(el, target, suffix) {
    let start = 0;
    const duration = 1800;
    const startTime = performance.now();
    function step(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(ease * target) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  const statEls = document.querySelectorAll('.stats__number[data-count]');
  if (!statEls.length) return;

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const el     = e.target;
          const target = parseInt(el.dataset.count);
          const suffix = el.dataset.suffix || '';
          animateCount(el, target, suffix);
          io.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    statEls.forEach(el => io.observe(el));
  }
})();

/* ── Smooth-scroll for anchor links ──────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 70;
      window.scrollTo({ top: target.getBoundingClientRect().top + scrollY - navH - 16, behavior: 'smooth' });
    }
  });
});
