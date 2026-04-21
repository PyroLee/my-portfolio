"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ExperienceIllustration } from "@/components/Illustrations/Illustrations";
import styles from "./Experience.module.css";



function ExperienceCard({ exp, direction }) {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.2 });

  return (
    <div
      ref={ref}
      className={`${styles.timelineItem} ${isVisible ? styles.itemVisible : ""}`}
    >
      <div className={styles.card}>
        <div className={styles.layer1}>
          <span className={styles.period}>{exp.period}</span>
          <h3 className={styles.role}>{exp.title}</h3>
          <span className={styles.company}>{exp.company}</span>
        </div>
        <div className={styles.layer2}>
          <p className={styles.desc}>{exp.description}</p>
        </div>
        {exp.highlights && (
          <div className={styles.layer3}>
            {exp.highlights.map((h, i) => (
              <span
                key={h}
                className={styles.highlight}
                style={{ transitionDelay: `${600 + i * 150}ms` }}
              >
                {h}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Experience({ dict = {} }) {
  const [sectionRef, sectionVisible] = useScrollReveal({ threshold: 0.05 });

  const experiences = dict.items || [];

  return (
    <section className={`${styles.experience} section`} id="experience">
      <div className="container" style={{ position: "relative" }}>
        <div className={styles.illustrationFloat}>
          <ExperienceIllustration visible={sectionVisible} />
        </div>
        <div
          ref={sectionRef}
          className={`${styles.header} ${sectionVisible ? styles.headerVisible : ""}`}
        >
          <span className={styles.label}>{dict.label || "职业历程"}</span>
          <h2 className={styles.sectionTitle}>{dict.title || "一路走来"}</h2>
        </div>
        <div className={styles.timeline}>
          {experiences.map((exp, idx) => (
            <ExperienceCard
              key={idx}
              exp={exp}
              direction={idx % 2 === 0 ? "left" : "right"}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
