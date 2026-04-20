"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Custom hook that uses Intersection Observer to detect
 * when an element scrolls into the viewport.
 *
 * @param {Object} options
 * @param {number} options.threshold - Visibility ratio to trigger (0-1)
 * @param {string} options.rootMargin - Margin around the root
 * @param {boolean} options.once - If true, only triggers once
 * @returns {[React.RefObject, boolean]} - [ref to attach, isVisible]
 */
export function useScrollReveal({
  threshold = 0.15,
  rootMargin = "0px 0px -60px 0px",
  once = true,
} = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.unobserve(element);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, once]);

  return [ref, isVisible];
}
