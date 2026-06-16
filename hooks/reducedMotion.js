/** True when the user has requested reduced motion. Safe during SSR. */
export function prefersReduced() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}
