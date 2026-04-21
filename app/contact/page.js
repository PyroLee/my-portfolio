"use client";

import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import styles from "./page.module.css";

const contacts = [
  {
    icon: "✉️",
    label: "邮箱",
    value: "a1263394777@gmail.com",
    action: "copy",
  },
  {
    icon: "📱",
    label: "电话",
    value: "15161696538",
    action: "copy",
  },
  {
    icon: "💬",
    label: "微信",
    value: "KaguraHikari",
    action: "copy",
  },
  {
    icon: "🔗",
    label: "LinkedIn",
    value: "查看我的 LinkedIn",
    action: "link",
    href: "https://www.linkedin.com/in/%E4%BB%95%E6%9D%B0-%E6%9D%8E-b1917a199/",
  },
];

function ContactCard({ contact, delay }) {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.2 });
  const [copied, setCopied] = useState(false);

  const handleClick = async () => {
    if (contact.action === "link") {
      window.open(contact.href, "_blank", "noopener,noreferrer");
      return;
    }
    try {
      await navigator.clipboard.writeText(contact.value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard API may fail in non-secure contexts */
    }
  };

  const hintText = () => {
    if (contact.action === "link") return "点击跳转 ↗";
    return copied ? "已复制 ✓" : "点击复制";
  };

  return (
    <div
      ref={ref}
      className={`${styles.card} ${isVisible ? styles.cardVisible : ""}`}
      style={{ transitionDelay: `${delay}ms` }}
      onClick={handleClick}
    >
      <span className={styles.icon}>{contact.icon}</span>
      <span className={styles.cardLabel}>{contact.label}</span>
      <span className={styles.cardValue}>{contact.value}</span>
      <span className={`${styles.copyHint} ${copied ? styles.copied : ""}`}>
        {hintText()}
      </span>
    </div>
  );
}

export default function ContactPage() {
  const [headerRef, headerVisible] = useScrollReveal({ threshold: 0.1 });

  return (
    <>
      <Navbar />
      <main className={styles.page}>
        <div className="container">
          <div
            ref={headerRef}
            className={`${styles.header} ${headerVisible ? styles.headerVisible : ""}`}
          >
            <span className={styles.label}>联系方式</span>
            <h1 className={styles.title}>让我们开始对话吧</h1>
            <p className={styles.subtitle}>点击任意卡片即可复制到剪贴板</p>
          </div>
          <div className={styles.cards}>
            {contacts.map((c, i) => (
              <ContactCard key={c.label} contact={c} delay={i * 120} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
