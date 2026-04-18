// ═══════════════════════════════════════════════════════
//  Krown Properties — Shared Header & Footer Components
//  Injected into every page on DOMContentLoaded
// ═══════════════════════════════════════════════════════

(function () {
  'use strict';

  // All pages live in the same root directory.
  // Simple relative paths (no prefix) work for both file:// and http://.
  var ROOT = '';

  // ── Mark the active nav link based on current page ──
  function getActivePage() {
    var path = window.location.pathname.split('/').pop() || 'index.html';
    return path;
  }

  function navLink(href, label) {
    var page = href.replace('.html', ''); // Remove .html for clean URLs
    var active = getActivePage() === href ? ' style="color:var(--accent);opacity:1;"' : '';
    return '<li><a href="' + ROOT + page + '"' + active + '>' + label + '</a></li>';
  }

  var HEADER_HTML = '' +
    '<!-- NAV OVERLAY -->' +
    '<nav class="nav-overlay" id="navOverlay" aria-hidden="true">' +
    '  <div class="nav-header">' +
    '    <span class="nav-logo">Krown <span>Properties</span></span>' +
    '    <button class="nav-close" id="navClose" aria-label="Close menu">\u2715</button>' +
    '  </div>' +
    '  <ul class="nav-list">' +
         navLink('index.html',                'Home') +
         navLink('about.html',                'About Us') +
         navLink('currentProjects.html',      'Projects') +
         navLink('homes-for-sale.html',       'Homes for Sale') +
         navLink('completedHomes.html',       'Completed Homes') +
         navLink('property-management.html',  'Property Management') +
         navLink('reliance.html',             'Reliance Projects') +
         navLink('process.html',              'Process') +
    '  </ul>' +
    '</nav>' +
    '<!-- HEADER -->' +
    '<header class="header" id="header">' +
    '  <a href="' + ROOT + '" class="logo-text">Krown <span>Properties</span></a>' +
    '  <button class="hamburger" id="menuBtn" aria-label="Open menu">' +
    '    <span></span><span></span><span></span>' +
    '  </button>' +
    '</header>';

  var FOOTER_HTML = '' +
    '<footer>' +
    '  <div class="footer-inner">' +
    '    <a href="' + ROOT + '" class="footer-logo">Krown <span>Properties</span></a>' +
    '    <div class="footer-contact">' +
    '      <a href="tel:+64276654333">+64 276654333</a>' +
    '      <span class="footer-sep">|</span>' +
    '      <a href="mailto:krownproperties@krown.co.nz">krownproperties@krown.co.nz</a>' +
    '      <span class="footer-sep">|</span>' +
    '      <a href="mailto:relianceprojects@krown.co.nz">relianceprojects@krown.co.nz</a>' +
    '      <span class="footer-sep">|</span>' +
    '      <span>22 Grand Ridge Avenue, Flat Bush Auckland 2019</span>' +
    '    </div>' +
    '    <div class="footer-social">' +
    '      <a href="https://www.instagram.com/krownpropertiesnz?igsh=ZmFqeGkxem9vd2di" class="social-btn" aria-label="Instagram" target="_blank" rel="noopener">' +
    '        <svg viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="rgba(255,255,255,.6)" stroke-width="2"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" fill="rgba(255,255,255,.6)"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="rgba(255,255,255,.6)" stroke-width="2"/></svg>' +
    '      </a>' +
    '      <a href="https://www.linkedin.com/company/krown-properties/" class="social-btn" aria-label="LinkedIn" target="_blank" rel="noopener">' +
    '        <svg viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="rgba(255,255,255,.6)" stroke-width="2"/><circle cx="8" cy="8" r="1.2" fill="rgba(255,255,255,.6)"/><path d="M8 11v6" stroke="rgba(255,255,255,.6)" stroke-width="2" stroke-linecap="round"/><path d="M12 17V12C12 9 18 9 18 12v5" stroke="rgba(255,255,255,.6)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
    '      </a>' +
    '    </div>' +
    '    <p class="footer-bottom">Copyright 2025 &copy; All Rights Reserved Krown Properties</p>' +
    '  </div>' +
    '</footer>';

  // ── Inject components synchronously ──
  // Scripts sit at the bottom of <body>, so both slots are already in the DOM
  // when this script executes. Running synchronously (not in DOMContentLoaded)
  // ensures the header exists before script.js attaches its event listeners.
  var headerSlot = document.getElementById('kp-header');
  if (headerSlot) {
    headerSlot.insertAdjacentHTML('beforebegin', HEADER_HTML);
    headerSlot.parentNode.removeChild(headerSlot);
  }

  var footerSlot = document.getElementById('kp-footer');
  if (footerSlot) {
    footerSlot.insertAdjacentHTML('beforebegin', FOOTER_HTML);
    footerSlot.parentNode.removeChild(footerSlot);
  }

})();
