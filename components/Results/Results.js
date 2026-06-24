"use client";

import { useTilt } from "@/hooks/useTilt";
import Compare from "../Compare/Compare";
import styles from "./Results.module.css";

function ResultCase({ item, shared }) {
  const tiltRef = useTilt({ max: 4 });

  return (
    <div className={styles.case} data-reveal>
      <div className={styles.compareWrap} ref={tiltRef} style={{ maxWidth: item.maxWidth }}>
        <Compare
          aspect={item.aspect}
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
      </div>
      <div className={styles.cap}>
        <div className={styles.capTop}>
          <div className={styles.capTitle}>{item.title}</div>
          <span className={styles.capTag}>{item.tag}</span>
        </div>
        <p className={styles.capDesc}>{item.desc}</p>
        {item.tags && (
          <div className={styles.tags}>
            {item.tags.map((t, i) => (
              <span key={i} className={styles.tagPill}>{t}</span>
            ))}
          </div>
        )}
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
      <div className={styles.cases}>
        {items.map((item, i) => (
          <ResultCase key={i} item={item} shared={shared} />
        ))}
      </div>
    </section>
  );
}
