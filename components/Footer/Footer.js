import styles from "./Footer.module.css";

export default function Footer({ dict = {} }) {
  return (
    <footer className={styles.footer}>
      <span>{dict.copy}</span>
      <span>
        ↑ <a href="#top">{dict.top}</a>
      </span>
    </footer>
  );
}
