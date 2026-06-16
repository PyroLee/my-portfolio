"use client";

import { useEffect, useRef } from "react";
import { prefersReduced } from "./reducedMotion";

/**
 * 3D tilt toward the cursor. Skips while a pointer button is held so it does
 * not fight the before/after compare slider being dragged inside the card.
 */
export function useTilt({ max = 5 } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    if (prefersReduced()) return;
    const card = ref.current;
    if (!card) return;

    const move = (e) => {
      if (e.buttons) return; // don't tilt while dragging the compare handle
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `rotateY(${(px * max).toFixed(2)}deg) rotateX(${(-py * max).toFixed(2)}deg)`;
    };
    const leave = () => {
      card.style.transform = "rotateY(0) rotateX(0)";
    };

    card.addEventListener("mousemove", move);
    card.addEventListener("mouseleave", leave);
    return () => {
      card.removeEventListener("mousemove", move);
      card.removeEventListener("mouseleave", leave);
    };
  }, [max]);

  return ref;
}
