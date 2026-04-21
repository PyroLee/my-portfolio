"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route navigation
  const closeMenu = () => setMenuOpen(false);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
      <div className={`${styles.inner} container`}>
        <Link href="/" className={styles.logo}>Portfolio</Link>

        {/* Hamburger button — mobile only */}
        <button
          className={`${styles.hamburger} ${menuOpen ? styles.open : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "关闭菜单" : "打开菜单"}
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>

        {/* Nav links */}
        <ul className={`${styles.links} ${menuOpen ? styles.mobileOpen : ""}`}>
          <li><Link href="/" onClick={closeMenu}>主页</Link></li>
          <li><Link href="/contact" className={styles.contactBtn} onClick={closeMenu}>联系我</Link></li>
        </ul>

        {/* Overlay backdrop — mobile only */}
        {menuOpen && (
          <div className={styles.overlay} onClick={closeMenu} />
        )}
      </div>
    </nav>
  );
}
