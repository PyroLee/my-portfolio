import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import styles from "./Navbar.module.css";

export default function Navbar({ dict = {}, lang = "zh" }) {
  const otherLang = lang === "zh" ? "en" : "zh";

  return (
    <header className={styles.navbar}>
      <a className={styles.logo} href="#top">
        <span className={styles.magnet}>◉</span>KENDRICK&nbsp;LI
      </a>
      <nav className={styles.right}>
        <a className={styles.navLink} href="#work">{dict.results || "成果"}</a>
        <a className={styles.navLink} href="#skills">{dict.skills || "能力"}</a>
        <a className={styles.navLink} href="#contact">{dict.contact || "联系"}</a>
        <ThemeToggle label={dict.themeLabel} />
        <Link
          className={styles.langToggle}
          href={`/${otherLang}`}
          data-current={lang}
          aria-label={dict.langLabel || "Switch language"}
        >
          <span className={styles.zh}>中</span>/<span className={styles.en}>EN</span>
        </Link>
      </nav>
    </header>
  );
}
