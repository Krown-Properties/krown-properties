// ═══════════════════════════════════════════════════════
//  Krown Properties — Enquiry Form
//  Submits directly to Supabase (no backend dependency)
// ═══════════════════════════════════════════════════════

(function () {
  'use strict';

  // ── Validation helpers ──────────────────────────────

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function isValidPhone(phone) {
    // Strip spaces, dashes, parens, plus — must leave 7–15 digits
    const digits = phone.replace(/[\s\-().+]/g, '');
    return /^\d{7,15}$/.test(digits);
  }

  // ── UI helpers ──────────────────────────────────────

  function showMessage(type, text) {
    const existing = document.querySelector('.form-message');
    if (existing) existing.remove();

    const el = document.createElement('div');
    el.className  = 'form-message form-message-' + type;
    el.textContent = text;

    const form = document.querySelector('.pd-form form');
    if (!form) return;

    form.parentNode.insertBefore(el, form.nextSibling);
    el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    setTimeout(() => el.remove(), 6000);
  }

  function setSubmitting(btn, isSubmitting) {
    btn.disabled    = isSubmitting;
    btn.textContent = isSubmitting ? 'Submitting…' : 'Submit Enquiry';
  }

  // ── Form handler ────────────────────────────────────

  function initEnquiryForm() {
    const form = document.querySelector('.pd-form form');
    if (!form) return;

    form.addEventListener('submit', async function (e) {
      e.preventDefault();

      // Collect values
      const firstName   = document.getElementById('pd-fname').value.trim();
      const lastName    = document.getElementById('pd-lname').value.trim();
      const email       = document.getElementById('pd-email').value.trim();
      const phone       = document.getElementById('pd-phone').value.trim();
      const enquiryType = document.getElementById('pd-type').value;
      const message     = document.getElementById('pd-message').value.trim();

      // Validate
      if (!firstName || !lastName) {
        showMessage('error', 'Please enter your first and last name.');
        return;
      }

      if (!email) {
        showMessage('error', 'Please enter your email address.');
        return;
      }

      if (!isValidEmail(email)) {
        showMessage('error', 'Please enter a valid email address.');
        return;
      }

      if (!phone) {
        showMessage('error', 'Please enter your phone number.');
        return;
      }

      if (!isValidPhone(phone)) {
        showMessage('error', 'Please enter a valid phone number (at least 7 digits).');
        return;
      }

      const submitBtn = form.querySelector('button[type="submit"]');
      setSubmitting(submitBtn, true);

      try {
        // Initialise Supabase client (uses globals defined in HTML)
        const client = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

        const { error } = await client.from('enquiries').insert([{
          first_name:   firstName,
          last_name:    lastName,
          email:        email,
          phone:        phone,
          enquiry_type: enquiryType || null,
          message:      message     || null
        }]);

        if (error) {
          console.error('[Enquiry] Supabase insert failed');
          console.error('[Enquiry] Code:   ', error.code);
          console.error('[Enquiry] Message:', error.message);
          console.error('[Enquiry] Details:', error.details);
          showMessage('error', 'Something went wrong. Please try again or call us directly.');
          return;
        }

        console.log('[Enquiry] Submitted successfully');
        showMessage('success', 'Thank you for your enquiry! We will be in touch soon.');
        form.reset();

      } catch (err) {
        console.error('[Enquiry] Unexpected error:', err);
        showMessage('error', 'Unable to submit. Please try again or contact us directly.');
      } finally {
        setSubmitting(submitBtn, false);
      }
    });
  }

  // ── Init ─────────────────────────────────────────────

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initEnquiryForm);
  } else {
    initEnquiryForm();
  }

})();
