import styles from "./Experience.module.css";

export default function Experience({ dict = {} }) {
  const rows = dict.rows || [];

  return (
    <section className="sec" id="experience">
      <div className="secHead" data-reveal>
        <span className="secNum">{dict.n}</span>
        <h2>{dict.title}</h2>
        <span className="secAside">{dict.aside}</span>
      </div>
      <div data-reveal>
        {rows.map((row, i) => (
          <div className={styles.orbitRow} key={i}>
            <span className={styles.sat} />
            <div>
              <div className={styles.role}>{row.role}</div>
              <div className={styles.org}>{row.org}</div>
            </div>
            <span className={styles.year}>{row.year}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
