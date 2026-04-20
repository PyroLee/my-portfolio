"use client";

import { useEffect, useState } from "react";
import styles from "./Hero.module.css";

export default function Hero() {
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
          你好，我是
        </p>
        <h1 className={`${styles.name} ${loaded ? styles.visible : ""}`}>
          Your Name
        </h1>
        <p className={`${styles.tagline} ${loaded ? styles.visible : ""}`}>
          数字化转型实践者 · WMS/WES 系统架构
        </p>
        <p className={`${styles.description} ${loaded ? styles.visible : ""}`}>
          致力于用技术赋能智慧仓储与供应链管理，
          <br />
          专注于将复杂的业务流程转化为高效的系统解决方案。
        </p>
      </div>

      {/* Scroll indicator */}
      <div className={`${styles.scrollHint} ${loaded ? styles.visible : ""}`}
        style={{ opacity: Math.max(1 - scrollY / 200, 0) }}
      >
        <div className={styles.scrollLine} />
        <span>向下滚动</span>
      </div>
    </section>
  );
}
