"use client";

import styles from "./Navbar.module.css";

/**
 * Theme toggle. The current theme lives on <html data-theme> (set before paint
 * by an inline script in the root layout); the icon is purely CSS-driven off
 * that attribute, so there is no flash and no React state to hydrate.
 */
export default function ThemeToggle({ label = "Toggle theme" }) {
  const toggle = () => {
    const cur = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
    const next = cur === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("resume-theme", next);
    } catch {
      /* localStorage may be unavailable */
    }
  };

  return (
    <button className={styles.themeToggle} onClick={toggle} aria-label={label}>
      <span className={styles.sun}>☀</span>
      <span className={styles.moon}>☾</span>
    </button>
  );
}
