"use client";

import { useScrollProgress } from "@/hooks/useScrollProgress";
import { SkillsIllustration } from "@/components/Illustrations/Illustrations";
import styles from "./Skills.module.css";

const skillGroups = [
  { category: "系统实施", items: ["WMS 系统", "WES 系统", "需求调研", "业务流程设计", "项目交付"] },
  { category: "技术能力", items: ["SQL 数据库", "系统集成", "API 对接", "PLC 通信", "系统测试"] },
  { category: "软技能", items: ["客户沟通", "跨部门协调", "文档编写", "问题分析", "培训指导"] },
];

export default function Skills() {
  const [containerRef, progress] = useScrollProgress("skills");

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
            <span className={styles.label}>核心能力</span>
            <h2 className={styles.title}>我能做什么</h2>
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
