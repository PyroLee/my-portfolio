"use client";

import { useEffect, useState } from "react";
import styles from "./Hero.module.css";

export default function Hero({ dict = {} }) {
  const [loaded, setLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // As user scrolls down, hero content fades out and shrinks
  const fadeProgress = Math.min(scrollY / (typeof window !== 'undefined' ? window.innerHeight * 0.6 : 600), 1);
  const opacity = 1 - fadeProgress;
  const scale = 1 - fadeProgress * 0.08;
  const translateY = fadeProgress * -30;

  return (
    <section className={styles.hero} id="hero">
      {/* Decorative gradient orb */}
      <div className={styles.orbWrapper}>
        <div className={styles.orb} />
      </div>

      <div
        className={`${styles.content} container`}
        style={{
          opacity,
          transform: `translateY(${translateY}px) scale(${scale})`,
        }}
      >
        <p className={`${styles.greeting} ${loaded ? styles.visible : ""}`}>
          {dict.greeting || "你好，我是"}
        </p>
        <h1 className={`${styles.name} ${loaded ? styles.visible : ""}`}>
          {dict.name || "Your Name"}
        </h1>
        <p className={`${styles.tagline} ${loaded ? styles.visible : ""}`}>
          {dict.tagline || "-"}
        </p>
        <p className={`${styles.description} ${loaded ? styles.visible : ""}`}>
          {dict.description.split('\n').map((line, i) => (
            <span key={i}>
              {line}
              <br />
            </span>
          ))}
        </p>

        <div className={`${styles.actions} ${loaded ? styles.visible : ""}`}>
          <a
            href="/resume.pdf"
            download="Resume.pdf"
            className={styles.downloadBtn}
          >
            {dict.downloadResume}
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={`${styles.scrollHint} ${loaded ? styles.showHint : ""}`}
        style={{ opacity: Math.max(1 - scrollY / 200, 0) }}
      >
        <div className={styles.scrollLine} />
        <span>{dict.scrollDown}</span>
      </div>
    </section>
  );
}
