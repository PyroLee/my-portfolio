"use client";

import { useState, useEffect } from "react";

/**
 * Detects if the viewport is at or below the given breakpoint.
 * Uses a safe default that avoids hydration mismatch.
 */
export function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= breakpoint);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);

  return isMobile;
}
