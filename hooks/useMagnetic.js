"use client";

import { useEffect, useRef } from "react";
import { prefersReduced } from "./reducedMotion";

/**
 * Element leans toward the cursor while hovered, springs back on leave.
 * Attach the returned ref to any element (skill chip, social link…).
 */
export function useMagnetic({ strengthX = 0.22, strengthY = 0.3 } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    if (prefersReduced()) return;
    const el = ref.current;
    if (!el) return;

    const move = (e) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      el.style.transform = `translate(${(dx * strengthX).toFixed(1)}px,${(dy * strengthY).toFixed(1)}px)`;
    };
    const leave = () => {
      el.style.transition = "transform .45s cubic-bezier(.16,1,.3,1)";
      el.style.transform = "translate(0,0)";
      window.setTimeout(() => {
        el.style.transition = "";
      }, 460);
    };

    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", leave);
    return () => {
      el.removeEventListener("mousemove", move);
      el.removeEventListener("mouseleave", leave);
    };
  }, [strengthX, strengthY]);

  return ref;
}

/**
 * Strong "pulled across the page" magnetism that tracks the cursor anywhere in
 * the window within a reach radius. Used for the big contact mail button.
 */
export function useMagneticWindow({ zone = 140, strengthX = 0.3, strengthY = 0.34 } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    if (prefersReduced()) return;
    const el = ref.current;
    if (!el) return;

    const move = (e) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const d = Math.sqrt(dx * dx + dy * dy);
      const reach = Math.max(r.width, zone * 2);
      if (d < reach) {
        const pull = 1 - d / reach;
        el.style.transform = `translate(${(dx * pull * strengthX).toFixed(1)}px,${(dy * pull * strengthY).toFixed(1)}px)`;
      } else {
        el.style.transform = "translate(0,0)";
      }
    };

    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [zone, strengthX, strengthY]);

  return ref;
}
