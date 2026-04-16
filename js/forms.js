// ═══════════════════════════════════════════════════════
//  Krown Properties — Form Handlers
//  Saves enquiry form submissions directly to Supabase
// ═══════════════════════════════════════════════════════

(function () {
  'use strict';

  function handleProjectEnquiryForm() {
    var form = document.querySelector('.pd-form form');
    if (!form) return;

    form.addEventListener('submit', async function (e) {
      e.preventDefault();

      var firstName   = document.getElementById('pd-fname').value.trim();
      var lastName    = document.getElementById('pd-lname').value.trim();
      var email       = document.getElementById('pd-email').value.trim();
      var phone       = document.getElementById('pd-phone').value.trim();
      var enquiryType = document.getElementById('pd-type').value;
      var message     = document.getElementById('pd-message').value.trim();

      if (!firstName || !lastName || !email) {
        showMessage('error', 'Please fill in all required fields.');
        return;
      }

      if (!isValidEmail(email)) {
        showMessage('error', 'Please enter a valid email address.');
        return;
      }

      var submitBtn = form.querySelector('button[type="submit"]');
      var originalText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Submitting...';

      try {
        var client = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

        var result = await client.from('enquiries').insert([{
          first_name:   firstName,
          last_name:    lastName,
          email:        email,
          phone:        phone || null,
          enquiry_type: enquiryType || null,
          message:      message || null
        }]);

        if (result.error) {
          console.error('Supabase error:', result.error);
          showMessage('error', 'Something went wrong. Please try again.');
        } else {
          showMessage('success', 'Thank you for your enquiry! We will be in touch soon.');
          form.reset();
        }

      } catch (err) {
        console.error('Submit error:', err);
        showMessage('error', 'Unable to submit. Please try again or contact us directly.');
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      }
    });
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function showMessage(type, message) {
    var existing = document.querySelector('.form-message');
    if (existing) existing.remove();

    var msgEl = document.createElement('div');
    msgEl.className = 'form-message form-message-' + type;
    msgEl.textContent = message;

    var form = document.querySelector('.pd-form form');
    if (form) {
      form.parentNode.insertBefore(msgEl, form.nextSibling);
      setTimeout(function () { msgEl.remove(); }, 6000);
      msgEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', handleProjectEnquiryForm);
  } else {
    handleProjectEnquiryForm();
  }

})();
