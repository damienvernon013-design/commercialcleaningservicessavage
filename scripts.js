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

  captureUtmParams();
})();
