// ═══════════════════════════════════════════════════════
//  Krown Properties — Shared Site Script
// ═══════════════════════════════════════════════════════

(function () {
  'use strict';

  // ──── HEADER: scroll-hide / shrink ────
  const hdr = document.getElementById('header');
  let lastY = 0;
  if (hdr) {
    window.addEventListener('scroll', function () {
      const y = window.scrollY;
      hdr.classList.toggle('scrolled', y > 60);
      if (y > 120) {
        hdr.classList.toggle('header-hidden', y > lastY);
      }
      lastY = y;
    }, { passive: true });
  }

  // ──── NAV OVERLAY TOGGLE ────
  const menuBtn    = document.getElementById('menuBtn');
  const navOverlay = document.getElementById('navOverlay');
  const navClose   = document.getElementById('navClose');

  function openNav() {
    if (!navOverlay) return;
    menuBtn && menuBtn.classList.add('open');
    navOverlay.classList.add('open');
    navOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeNav() {
    if (!navOverlay) return;
    menuBtn && menuBtn.classList.remove('open');
    navOverlay.classList.remove('open');
    navOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (menuBtn)  menuBtn.addEventListener('click', openNav);
  if (navClose) navClose.addEventListener('click', closeNav);
  // Nav links close the menu when clicked (they navigate via href)
  if (navOverlay) {
    navOverlay.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeNav);
    });
  }

  // ──── UNIFIED SCROLL REVEAL ────
  // Handles: .reveal, .reveal-left, .au-reveal, .pm-reveal, .cp-reveal, .pd-reveal
  const revealSelectors = '.reveal, .reveal-left, .au-reveal, .pm-reveal, .cp-reveal, .pd-reveal';
  const revealEls = document.querySelectorAll(revealSelectors);

  if (revealEls.length) {
    const revealIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          revealIO.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { revealIO.observe(el); });
  }

  // ──── COUNTER ANIMATION ────
  function animateCounter(el) {
    const target   = +el.dataset.target;
    const prefix   = el.dataset.prefix || '';
    const suffix   = el.dataset.suffix || '';
    const duration = 2000;
    const step     = target / (duration / 16);
    let current    = 0;
    const timer = setInterval(function () {
      current = Math.min(current + step, target);
      el.textContent = prefix + Math.floor(current) + suffix;
      if (current >= target) clearInterval(timer);
    }, 16);
  }

  const counterEls = document.querySelectorAll('.stat-number[data-target]');
  if (counterEls.length) {
    const counterIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          animateCounter(e.target);
          counterIO.unobserve(e.target);
        }
      });
    }, { threshold: 0.4 });
    counterEls.forEach(function (el) { counterIO.observe(el); });
  }

  // ──── TEAM CARD STAGGERED REVEAL ────
  const teamCards = document.querySelectorAll('.au-team-card, .pm-team-card');
  if (teamCards.length) {
    const cardArr = Array.from(teamCards);
    const tcIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          const idx = cardArr.indexOf(e.target);
          setTimeout(function () { e.target.classList.add('visible'); }, 60 * (idx % 5));
          tcIO.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    teamCards.forEach(function (c) { tcIO.observe(c); });
  }

})();
