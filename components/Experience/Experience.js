"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ExperienceIllustration } from "@/components/Illustrations/Illustrations";
import styles from "./Experience.module.css";

const experiences = [
  {
    period: "2024 — 至今",
    title: "WES 系统实施工程师",
    company: "某智能物流科技公司",
    description:
      "负责多个大型仓储自动化项目的 WES 系统调研、方案设计与落地交付。深度参与业务流程梳理、系统功能规划、设备对接与用户培训。",
    highlights: ["苏州汇川新能源仓储项目", "杭州奔笙自动化产线项目"],
  },
  {
    period: "2022 — 2024",
    title: "WMS 项目实施顾问",
    company: "某供应链管理公司",
    description:
      "主导 WMS 系统的需求调研与实施部署，成功交付多个制造业仓储数字化转型项目，有效提升客户仓储运营效率。",
    highlights: ["库存准确率提升至 99.5%", "拣选效率提升 40%"],
  },
  {
    period: "2018 — 2022",
    title: "本科 · 英语专业",
    company: "某高校",
    description:
      "英语专业八级（TEM-8），培养了出色的跨文化沟通能力和文档撰写能力，为后续的技术沟通与国际化项目奠定了坚实基础。",
    highlights: ["TEM-8 证书", "中共党员"],
  },
];

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

export default function Experience() {
  const [sectionRef, sectionVisible] = useScrollReveal({ threshold: 0.05 });

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
          <span className={styles.label}>职业历程</span>
          <h2 className={styles.sectionTitle}>一路走来</h2>
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
