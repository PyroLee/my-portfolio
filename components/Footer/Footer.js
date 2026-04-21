import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer({ dict = {}, lang = "zh" }) {
  const currentYear = new Date().getFullYear();
  const footerText = dict.text ? dict.text.replace("{year}", currentYear) : `© ${currentYear} Your Name. Crafted with care.`;

  return (
    <footer className={styles.footer}>
      <div className={`${styles.inner} container`}>
        <p className={styles.copy}>
          {footerText}
        </p>
        <div className={styles.links}>
          <Link href={`/${lang}/contact`}>{dict.contact || "联系我"}</Link>
        </div>
      </div>
    </footer>
  );
}
