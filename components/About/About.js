"use client";

import { useScrollProgress } from "@/hooks/useScrollProgress";
import { AboutIllustration } from "@/components/Illustrations/Illustrations";
import styles from "./About.module.css";

export default function About() {
  const [containerRef, progress] = useScrollProgress("about");

  const phase1 = Math.min(progress / 0.3, 1);
  const phase2 = Math.min(Math.max((progress - 0.3) / 0.3, 0), 1);
  const phase3 = Math.min(Math.max((progress - 0.6) / 0.3, 0), 1);

  const stats = [
    { number: 3, suffix: "+", label: "年项目经验", fill: phase3 },
    { number: 10, suffix: "+", label: "成功交付项目", fill: Math.min(Math.max((progress - 0.65) / 0.25, 0), 1) },
    { number: 100, suffix: "%", label: "客户好评率", fill: Math.min(Math.max((progress - 0.7) / 0.25, 0), 1) },
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
            <span className={styles.label}>关于我</span>
            <h2 className={styles.title}>用技术，连接业务与效率</h2>
          </div>
          <div className={styles.bio} style={{ opacity: phase2, transform: `translateY(${(1 - phase2) * 30}px)` }}>
            <p>我是一名专注于智慧仓储与供应链数字化的系统实施工程师。拥有丰富的 WMS/WES 系统规划、调研、实施与交付经验，擅长将复杂的仓储业务流程抽象为高效的系统解决方案。</p>
            <p>我相信优秀的系统实施不仅仅是技术部署，更是对业务场景的深度理解与价值重塑。每一次交付，都是一次效率的跃迁。</p>
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
