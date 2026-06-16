"use client";

import { useTilt } from "@/hooks/useTilt";
import Compare from "../Compare/Compare";
import styles from "./Results.module.css";

function ResultCard({ item, shared }) {
  const tiltRef = useTilt({ max: 5 });

  return (
    <div className={styles.card} data-reveal ref={tiltRef}>
      <Compare
        start={item.start ?? 50}
        beforeImg={item.beforeImg}
        afterImg={item.afterImg}
        labels={{
          tagBefore: shared.tagBefore,
          tagAfter: shared.tagAfter,
          ctrlBefore: shared.ctrlBefore,
          ctrlAfter: shared.ctrlAfter,
          beforeLabel: item.beforeLabel,
          afterLabel: item.afterLabel,
          handleAria: `${shared.tagBefore} / ${shared.tagAfter}`,
        }}
      />
      <div className={styles.cap}>
        <div>
          <div className={styles.capTitle}>{item.title}</div>
          <div className={styles.capDesc}>{item.desc}</div>
        </div>
        <span className={styles.capYear}>{item.year}</span>
      </div>
    </div>
  );
}

export default function Results({ dict = {} }) {
  const items = dict.items || [];
  const shared = {
    tagBefore: dict.tagBefore,
    tagAfter: dict.tagAfter,
    ctrlBefore: dict.ctrlBefore,
    ctrlAfter: dict.ctrlAfter,
  };

  return (
    <section className="sec" id="work">
      <div className="secHead" data-reveal>
        <span className="secNum">{dict.n}</span>
        <h2>{dict.title}</h2>
        <span className="secAside">{dict.aside}</span>
      </div>
      <div className={styles.hgrid}>
        {items.map((item, i) => (
          <ResultCard key={i} item={item} shared={shared} />
        ))}
      </div>
    </section>
  );
}
