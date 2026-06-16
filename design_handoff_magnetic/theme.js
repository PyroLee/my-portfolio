// Light/Dark theme toggle. Default: light (day). Preference persisted in localStorage.
(function () {
  var KEY = "resume-theme";
  function get() {
    try { return localStorage.getItem(KEY) || "light"; } catch (e) { return "light"; }
  }
  function set(t) { try { localStorage.setItem(KEY, t); } catch (e) {} }
  function apply(t) {
    document.documentElement.setAttribute("data-theme", t);
    var btns = document.querySelectorAll("[data-theme-toggle]");
    for (var i = 0; i < btns.length; i++) btns[i].setAttribute("data-current", t);
  }
  // apply ASAP (a head inline script also does this to avoid flash)
  apply(get());
  function init() {
    apply(get());
    var btns = document.querySelectorAll("[data-theme-toggle]");
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener("click", function () {
        var next = get() === "light" ? "dark" : "light";
        set(next);
        apply(next);
      });
    }
  }
  window.ResumeTheme = { get: get, set: function (t) { set(t); apply(t); } };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
