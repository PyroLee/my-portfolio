"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
      <div className={`${styles.inner} container`}>
        <Link href="/" className={styles.logo}>Portfolio</Link>
        <ul className={styles.links}>
          <li><Link href="/">主页</Link></li>
          <li><Link href="/contact" className={styles.contactBtn}>联系我</Link></li>
        </ul>
      </div>
    </nav>
  );
}
