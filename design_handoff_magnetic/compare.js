// Reusable before/after comparison slider.
// Supports multiple instances per page, pointer (mouse+touch), keyboard, and Before/After buttons.
// Markup:
// <div class="compare" data-start="50">
//   <div class="cmp-pane cmp-after"> ...after content (img or placeholder)... </div>
//   <div class="cmp-pane cmp-before"> ...before content... </div>
//   <div class="cmp-line"></div>
//   <button class="cmp-handle" aria-label="拖动对比 / drag to compare"></button>
//   <span class="cmp-tag cmp-tag-before">BEFORE</span>
//   <span class="cmp-tag cmp-tag-after">AFTER</span>
//   <div class="cmp-ctrl"><button data-go="100">…</button><button data-go="0">…</button></div>
// </div>
(function () {
  function initOne(el) {
    var handle = el.querySelector(".cmp-handle");
    var pos = parseFloat(el.getAttribute("data-start") || "50");
    var dragging = false;

    function set(p) {
      pos = Math.max(0, Math.min(100, p));
      el.style.setProperty("--p", pos + "%");
      if (handle) handle.setAttribute("aria-valuenow", Math.round(pos));
    }
    function fromClientX(clientX) {
      var rect = el.getBoundingClientRect();
      set(((clientX - rect.left) / rect.width) * 100);
    }
    function animate() {
      el.classList.add("cmp-anim");
      window.clearTimeout(el._t);
      el._t = window.setTimeout(function () { el.classList.remove("cmp-anim"); }, 650);
    }

    // pointer drag
    el.addEventListener("pointerdown", function (e) {
      if (e.target.closest(".cmp-ctrl")) return; // let buttons handle themselves
      e.preventDefault();
      dragging = true;
      el.classList.remove("cmp-anim");
      el.setPointerCapture && el.setPointerCapture(e.pointerId);
      fromClientX(e.clientX);
    });
    el.addEventListener("pointermove", function (e) {
      if (dragging) { e.preventDefault(); fromClientX(e.clientX); }
    });
    function end() { dragging = false; }
    el.addEventListener("pointerup", end);
    el.addEventListener("pointercancel", end);
    el.addEventListener("pointerleave", function () { /* keep position; stop only on up */ });

    // Before/After buttons
    el.querySelectorAll(".cmp-ctrl [data-go]").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        animate();
        set(parseFloat(btn.getAttribute("data-go")));
      });
    });

    // keyboard
    if (handle) {
      handle.setAttribute("role", "slider");
      handle.setAttribute("tabindex", "0");
      handle.setAttribute("aria-valuemin", "0");
      handle.setAttribute("aria-valuemax", "100");
      handle.addEventListener("keydown", function (e) {
        var step = e.shiftKey ? 10 : 4;
        if (e.key === "ArrowLeft") { animate(); set(pos - step); e.preventDefault(); }
        else if (e.key === "ArrowRight") { animate(); set(pos + step); e.preventDefault(); }
        else if (e.key === "Home") { animate(); set(0); e.preventDefault(); }
        else if (e.key === "End") { animate(); set(100); e.preventDefault(); }
      });
      handle.addEventListener("pointerdown", function (e) { e.stopPropagation(); dragging = true; el.classList.remove("cmp-anim"); });
    }

    set(pos);

    // gentle one-time nudge when scrolled into view (hints interactivity)
    if (!el.hasAttribute("data-no-nudge") && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      var seen = false;
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting && !seen) {
            seen = true;
            animate();
            set(pos + 16);
            window.setTimeout(function () { animate(); set(pos - 16); }, 520);
            io.disconnect();
          }
        });
      }, { threshold: 0.4 });
      io.observe(el);
    }
  }

  function initAll() {
    document.querySelectorAll(".compare").forEach(initOne);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initAll);
  else initAll();
})();
