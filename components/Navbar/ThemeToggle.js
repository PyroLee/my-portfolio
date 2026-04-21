"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import styles from "./Navbar.module.css";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <button className={styles.themeToggle} aria-label="Toggle Dark Mode" style={{ opacity: 0 }}>☀️</button>;
  }

  return (
    <button
      className={styles.themeToggle}
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label="Toggle Dark Mode"
    >
      {resolvedTheme === "dark" ? "☀️" : "🌙"}
    </button>
  );
}
