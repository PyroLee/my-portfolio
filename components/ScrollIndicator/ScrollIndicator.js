"use client";

import { useState, useEffect } from "react";
import styles from "./ScrollIndicator.module.css";

const SECTIONS = [
  { id: "hero", label: "首页" },
  { id: "about", label: "关于" },
  { id: "skills", label: "技能" },
  { id: "experience", label: "经历" },
];

export default function ScrollIndicator() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollPercent(docHeight > 0 ? scrollY / docHeight : 0);

      // Determine active section
      let current = 0;
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i].id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.4) {
            current = i;
            break;
          }
        }
      }
      setActiveIndex(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Desktop: left-side dot indicator */}
      <div className={styles.container}>
        {/* Vertical track */}
        <div className={styles.track}>
          <div
            className={styles.fill}
            style={{ height: `${scrollPercent * 100}%` }}
          />
        </div>

        {/* Section dots */}
        <div className={styles.dots}>
          {SECTIONS.map((section, i) => (
            <div
              key={section.id}
              className={`${styles.dot} ${i === activeIndex ? styles.active : ""} ${i <= activeIndex ? styles.passed : ""}`}
            >
              <div className={styles.dotCircle} />
              <span className={styles.label}>{section.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile: top linear progress bar */}
      <div className={styles.mobileBar}>
        <div
          className={styles.mobileBarFill}
          style={{ width: `${scrollPercent * 100}%` }}
        />
      </div>
    </>
  );
}
