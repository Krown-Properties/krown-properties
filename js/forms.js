// ═══════════════════════════════════════════════════════
//  Krown Properties — Form Handlers
//  Handles enquiry form submissions
// ═══════════════════════════════════════════════════════

(function () {
  'use strict';

  // ──── PROJECT ENQUIRY FORM ────
  // Handles the "Enquire Now" form on project detail pages

  function handleProjectEnquiryForm() {
    var form = document.querySelector('.pd-form form');
    if (!form) return;

    form.addEventListener('submit', async function (e) {
      e.preventDefault();

      // Get form values
      var firstName = document.getElementById('pd-fname').value.trim();
      var lastName = document.getElementById('pd-lname').value.trim();
      var email = document.getElementById('pd-email').value.trim();
      var phone = document.getElementById('pd-phone').value.trim();
      var enquiryType = document.getElementById('pd-type').value;
      var message = document.getElementById('pd-message').value.trim();

      // Validate required fields
      if (!firstName || !lastName || !email) {
        showMessage('error', 'Please fill in all required fields');
        return;
      }

      // Validate email format
      if (!isValidEmail(email)) {
        showMessage('error', 'Please enter a valid email address');
        return;
      }

      // Disable submit button
      var submitBtn = form.querySelector('button[type="submit"]');
      var originalText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Submitting...';

      try {
        // Submit to Netlify Function
        var response = await fetch('/.netlify/functions/submit-enquiry', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone,
            enquiryType: enquiryType,
            message: message
          })
        });

        var result = await response.json();

        if (response.ok && result.success) {
          // Success
          showMessage('success', result.message || 'Thank you for your enquiry! We will be in touch soon.');
          form.reset();
        } else {
          // Error
          showMessage('error', result.error || 'Something went wrong. Please try again.');
        }

      } catch (error) {
        console.error('Form submission error:', error);
        showMessage('error', 'Unable to submit enquiry. Please try again or contact us directly.');
      } finally {
        // Re-enable submit button
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      }
    });
  }

  // ──── HELPER FUNCTIONS ────

  function isValidEmail(email) {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function showMessage(type, message) {
    // Remove any existing messages
    var existingMsg = document.querySelector('.form-message');
    if (existingMsg) existingMsg.remove();

    // Create message element
    var msgEl = document.createElement('div');
    msgEl.className = 'form-message form-message-' + type;
    msgEl.textContent = message;

    // Insert after form
    var form = document.querySelector('.pd-form form');
    if (form) {
      form.parentNode.insertBefore(msgEl, form.nextSibling);

      // Auto-remove after 5 seconds
      setTimeout(function () {
        msgEl.remove();
      }, 5000);

      // Scroll message into view
      msgEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  // ──── INITIALIZE ────

  // Wait for DOM to be fully loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      handleProjectEnquiryForm();
    });
  } else {
    // DOM already loaded
    handleProjectEnquiryForm();
  }

})();
