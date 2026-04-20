"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Tracks scroll progress through a sticky scroll-runway section.
 * Pure scroll-driven mode with LERP smoothing.
 * 
 * @param {string} sectionId - The HTML id of the section (e.g. "about")
 */
export function useScrollProgress(sectionId) {
  const ref = useRef(null);
  const [displayProgress, setDisplayProgress] = useState(0);

  const currentRef = useRef(0);
  const rafRef = useRef(null);

  const LERP = 0.06;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    currentRef.current = 0;

    const getScrollProgress = () => {
      const rect = el.getBoundingClientRect();
      const runway = el.offsetHeight - window.innerHeight;
      if (runway <= 0) return 0;
      return Math.min(Math.max(-rect.top / runway, 0), 1);
    };

    const loop = () => {
      const target = getScrollProgress();
      const diff = target - currentRef.current;
      currentRef.current += diff * LERP;
      if (Math.abs(diff) < 0.0005) currentRef.current = target;

      setDisplayProgress(currentRef.current);
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [sectionId]);

  return [ref, displayProgress];
}
