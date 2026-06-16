// Shared bilingual (ZH/EN) toggle + small helpers for the resume site directions.
// Default language: Chinese. Preference persisted in localStorage.
(function () {
  var KEY = "resume-lang";
  function getLang() {
    try {
      return localStorage.getItem(KEY) || "zh";
    } catch (e) {
      return "zh";
    }
  }
  function setLang(lang) {
    try {
      localStorage.setItem(KEY, lang);
    } catch (e) {}
  }
  function apply(lang) {
    document.documentElement.setAttribute("lang", lang === "zh" ? "zh-CN" : "en");
    document.documentElement.setAttribute("data-lang", lang);
    var nodes = document.querySelectorAll("[data-en]");
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      var val = lang === "zh" ? el.getAttribute("data-zh") : el.getAttribute("data-en");
      if (val !== null) el.textContent = val;
    }
    // update toggle button labels (show the language you'd switch TO)
    var toggles = document.querySelectorAll("[data-lang-toggle]");
    for (var j = 0; j < toggles.length; j++) {
      toggles[j].setAttribute("data-current", lang);
    }
  }
  window.ResumeI18N = {
    init: function () {
      apply(getLang());
      var toggles = document.querySelectorAll("[data-lang-toggle]");
      for (var k = 0; k < toggles.length; k++) {
        toggles[k].addEventListener("click", function () {
          var next = getLang() === "zh" ? "en" : "zh";
          setLang(next);
          apply(next);
        });
      }
    },
    get: getLang,
    set: function (l) {
      setLang(l);
      apply(l);
    },
  };
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", window.ResumeI18N.init);
  } else {
    window.ResumeI18N.init();
  }
})();
