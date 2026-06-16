"use client";

import { useMagnetic } from "@/hooks/useMagnetic";
import styles from "./Skills.module.css";

function Chip({ label }) {
  const ref = useMagnetic();
  return (
    <span className={styles.chip} ref={ref}>
      {label}
    </span>
  );
}

export default function Skills({ dict = {} }) {
  const chips = dict.chips || [];

  return (
    <section className="sec" id="skills">
      <div className="secHead" data-reveal>
        <span className="secNum">{dict.n}</span>
        <h2>{dict.title}</h2>
        <span className="secAside">{dict.aside}</span>
      </div>
      <div className={styles.chips} data-reveal>
        {chips.map((c, i) => (
          <Chip key={i} label={c} />
        ))}
      </div>
    </section>
  );
}
