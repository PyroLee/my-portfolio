"use client";

/**
 * Lightweight smooth scroll provider.
 * Uses native CSS scroll-behavior: smooth instead of Lenis.
 * This avoids all Lenis-related scroll hijacking issues while
 * still providing smooth scrolling across all browsers.
 */
export default function SmoothScroll({ children }) {
  return children;
}
