"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import styles from "./Navbar.module.css";

export default function ThemeToggle({ label = "Toggle theme" }) {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Before mount we don't know the resolved theme — render the light-mode icon
  // (matches defaultTheme="light") to avoid a hydration mismatch.
  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      className={styles.themeToggle}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={label}
      suppressHydrationWarning
    >
      {isDark ? "☾" : "☀"}
    </button>
  );
}
