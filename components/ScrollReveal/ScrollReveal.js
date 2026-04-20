"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

/**
 * ScrollReveal — A wrapper component that animates children into view
 * when they scroll into the viewport.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {"up"|"left"|"right"|"scale"} props.direction - Animation direction
 * @param {number} props.delay - Delay index (1-6) for staggered animations
 * @param {string} props.className - Additional CSS classes
 * @param {number} props.threshold - Visibility threshold (0-1)
 * @param {string} props.as - HTML element to render as (default: "div")
 */
export default function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  className = "",
  threshold = 0.15,
  as: Component = "div",
}) {
  const [ref, isVisible] = useScrollReveal({ threshold });

  const directionClass = {
    up: "reveal",
    left: "reveal-left",
    right: "reveal-right",
    scale: "reveal-scale",
  }[direction];

  const delayClass = delay > 0 ? `delay-${delay}` : "";
  const visibleClass = isVisible ? "visible" : "";

  return (
    <Component
      ref={ref}
      className={`${directionClass} ${delayClass} ${visibleClass} ${className}`}
    >
      {children}
    </Component>
  );
}
