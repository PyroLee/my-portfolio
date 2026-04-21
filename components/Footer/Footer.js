import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.inner} container`}>
        <p className={styles.copy}>
          © {new Date().getFullYear()} Your Name. Crafted with care.
        </p>
        <div className={styles.links}>
          <Link href="/contact">联系我</Link>
        </div>
      </div>
    </footer>
  );
}
