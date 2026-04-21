"use client";

import { useScrollProgress } from "@/hooks/useScrollProgress";
import { AboutIllustration } from "@/components/Illustrations/Illustrations";
import styles from "./About.module.css";

export default function About({ dict = {} }) {
  const [containerRef, progress] = useScrollProgress("about");

  const phase1 = Math.min(progress / 0.3, 1);
  const phase2 = Math.min(Math.max((progress - 0.3) / 0.3, 0), 1);
  const phase3 = Math.min(Math.max((progress - 0.6) / 0.3, 0), 1);

  const stats = [
    { number: 3, suffix: "+", label: dict.yearsExperience || "年项目经验", fill: phase3 },
    { number: 10, suffix: "+", label: dict.projectsDelivered || "成功交付项目", fill: Math.min(Math.max((progress - 0.65) / 0.25, 0), 1) },
    { number: 100, suffix: "%", label: dict.customerSatisfaction || "客户好评率", fill: Math.min(Math.max((progress - 0.7) / 0.25, 0), 1) },
  ];

  return (
    <section className={styles.runway} ref={containerRef} id="about">
      <div className={styles.sticky}>
        {/* Illustration floats absolutely — no space taken */}
        <div className={styles.illustrationFloat} style={{ opacity: phase1 * 0.6 }}>
          <AboutIllustration visible={phase1 > 0.3} />
        </div>
        <div className={`${styles.content} container`}>
          <div className={styles.header} style={{ opacity: phase1, transform: `translateY(${(1 - phase1) * 40}px)` }}>
            <span className={styles.label}>{dict.label || "INTRODUCTION"}</span>
            <h2 className={styles.title}>{dict.title || "关于我"}</h2>
          </div>
          <div className={styles.bio} style={{ opacity: phase2, transform: `translateY(${(1 - phase2) * 30}px)` }}>
            <p>{dict.p1}</p>
            <p>{dict.p2}</p>
          </div>
          <div className={styles.stats} style={{ opacity: phase3, transform: `translateY(${(1 - phase3) * 30}px)` }}>
            {stats.map((stat) => (
              <div className={styles.statCard} key={stat.label}>
                <div className={styles.fillBar} style={{ transform: `scaleX(${stat.fill})` }} />
                <div className={styles.statContent}>
                  <span className={styles.statNumber}>{Math.round(stat.number * stat.fill)}{stat.suffix}</span>
                  <span className={styles.statLabel}>{stat.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
