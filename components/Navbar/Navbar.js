"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import styles from "./Navbar.module.css";

import { usePathname } from "next/navigation";

/* ── Inline SVG: Stylised wolf head silhouette ── */
function WolfIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Left ear */}
      <path d="M6 2L10 12L4 10Z" />
      {/* Right ear */}
      <path d="M26 2L22 12L28 10Z" />
      {/* Head shape */}
      <path d="M10 12C10 12 8 16 8 19C8 22 10 25 13 27L16 30L19 27C22 25 24 22 24 19C24 16 22 12 22 12L16 9L10 12Z" />
      {/* Left eye */}
      <circle cx="12.5" cy="17" r="1.2" fill="var(--color-bg, #fff)" />
      {/* Right eye */}
      <circle cx="19.5" cy="17" r="1.2" fill="var(--color-bg, #fff)" />
      {/* Nose */}
      <path d="M14.5 22L16 24L17.5 22L16 21Z" fill="var(--color-bg, #fff)" />
    </svg>
  );
}

export default function Navbar({ dict = {}, lang = "zh" }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

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

  const switchLangHref = () => {
    if (!pathname) return '/';
    const targetLang = lang === 'zh' ? 'en' : 'zh';
    const newPath = pathname.replace(`/${lang}`, `/${targetLang}`);
    return newPath.startsWith('/') ? newPath : `/${newPath}`;
  };

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
      <div className={`${styles.inner} container`}>
        {/* ── Logo with collapse animation ── */}
        <Link href={`/${lang}`} className={styles.logoWrapper}>
          {/* Full brand name — visible when at top */}
          <span className={`${styles.logoText} ${scrolled ? styles.logoTextHidden : ""}`}>
            ilovelappland
          </span>
          {/* Wolf icon — visible when scrolled */}
          <WolfIcon className={`${styles.logoIcon} ${scrolled ? styles.logoIconVisible : ""}`} />
        </Link>

        {/* Hamburger button — mobile only */}
        <button
          className={`${styles.hamburger} ${menuOpen ? styles.open : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>

        {/* Nav links */}
        <div className={`${styles.linksWrapper} ${menuOpen ? styles.mobileOpen : ""}`}>
          <ul className={styles.links}>
            <li><Link href={`/${lang}`} onClick={closeMenu}>{dict.home || "主页"}</Link></li>
            <li><Link href={`/${lang}/contact`} className={styles.contactBtn} onClick={closeMenu}>{dict.contact || "联系我"}</Link></li>
          </ul>
          <div className={styles.toggles}>
            <Link href={switchLangHref()} className={styles.langToggle}>
              {lang === 'zh' ? 'EN' : '中'}
            </Link>
            <ThemeToggle />
          </div>
        </div>

        {/* Overlay backdrop — mobile only */}
        {menuOpen && (
          <div className={styles.overlay} onClick={closeMenu} />
        )}
      </div>
    </nav>
  );
}
