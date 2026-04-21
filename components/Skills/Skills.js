"use client";

import { useScrollProgress } from "@/hooks/useScrollProgress";
import { SkillsIllustration } from "@/components/Illustrations/Illustrations";
import styles from "./Skills.module.css";

export default function Skills({ dict = {} }) {
  const [containerRef, progress] = useScrollProgress("skills");

  const skillGroups = dict.skillGroups || [];
  const titleProgress = Math.min(progress / 0.2, 1);
  const cardPhases = skillGroups.map((_, idx) => {
    const start = 0.2 + idx * 0.25;
    return Math.min(Math.max((progress - start) / 0.25, 0), 1);
  });

  return (
    <section className={styles.runway} ref={containerRef} id="skills">
      <div className={styles.sticky}>
        <div className={styles.illustrationFloat} style={{ opacity: titleProgress * 0.6 }}>
          <SkillsIllustration visible={titleProgress > 0.3} />
        </div>
        <div className={`${styles.content} container`}>
          <div className={styles.header} style={{ opacity: titleProgress, transform: `translateY(${(1 - titleProgress) * 30}px)` }}>
            <span className={styles.label}>{dict.label || "核心能力"}</span>
            <h2 className={styles.title}>{dict.title || "我能做什么"}</h2>
          </div>
          <div className={styles.groups}>
            {skillGroups.map((group, idx) => (
              <div key={group.category} className={styles.group} style={{ opacity: cardPhases[idx], transform: `translateY(${(1 - cardPhases[idx]) * 50}px) scale(${0.95 + cardPhases[idx] * 0.05})` }}>
                <h3 className={styles.groupTitle}>{group.category}</h3>
                <div className={styles.tags}>
                  {group.items.map((item, tagIdx) => (
                    <span key={item} className={styles.tag} style={{ opacity: Math.min(Math.max((cardPhases[idx] - tagIdx * 0.1) / 0.5, 0), 1) }}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
