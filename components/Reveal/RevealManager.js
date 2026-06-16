"use client";

import { useEffect } from "react";

/**
 * Observes every [data-reveal] element and adds `.in` when it scrolls into
 * view (one-shot). Mirrors the prototype's page-level IntersectionObserver.
 * Renders nothing.
 */
export default function RevealManager() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
