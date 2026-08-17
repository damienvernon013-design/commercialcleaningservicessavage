(function () {
  'use strict';

  var UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
  var STORAGE_KEY = 'qm_utm_params';

  function captureUtmParams() {
    var params = new URLSearchParams(window.location.search);
    var hasUtm = UTM_KEYS.some(function (key) { return params.has(key); });

    if (hasUtm) {
      var captured = {};
      UTM_KEYS.forEach(function (key) {
        if (params.has(key)) captured[key] = params.get(key);
      });
      try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(captured));
      } catch (e) { /* storage unavailable */ }
      return captured;
    }

    try {
      var stored = sessionStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch (e) {
      return {};
    }
  }

  function initQuoteForm() {
    var form = document.getElementById('quote-form');
    if (!form) return;

    var utm = captureUtmParams();
    var statusEl = form.querySelector('.form-status');
    var submitBtn = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', function (event) {
      event.preventDefault();

      if (statusEl) {
        statusEl.textContent = '';
        statusEl.className = 'form-status';
      }
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting...';
      }

      var data = {
        name: form.name.value,
        company: form.company.value,
        phone: form.phone.value,
        email: form.email.value,
        city: form.city.value,
        sqft: form.sqft.value,
        service: form.service.value,
        notes: form.notes.value,
        website: form.website ? form.website.value : '',
        utm_source: utm.utm_source || ''
      };

      fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
        .then(function (res) { return res.json().then(function (json) { return { ok: res.ok, json: json }; }); })
        .then(function (result) {
          if (result.ok && result.json.success) {
            form.reset();
            if (statusEl) {
              statusEl.textContent = 'Thanks — your request was submitted. We will contact you by the next business day.';
              statusEl.className = 'form-status form-status-success';
            }
          } else {
            throw new Error(result.json && result.json.error ? result.json.error : 'Submission failed');
          }
        })
        .catch(function () {
          if (statusEl) {
            statusEl.textContent = 'Something went wrong submitting the form. Please call (866) 958-8773 instead.';
            statusEl.className = 'form-status form-status-error';
          }
        })
        .finally(function () {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Submit Quote Request';
          }
        });
    });
  }

  document.addEventListener('DOMContentLoaded', initQuoteForm);
})();
