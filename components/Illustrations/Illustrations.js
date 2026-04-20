"use client";

import styles from "./Illustrations.module.css";

/**
 * Hand-drawn style SVG illustrations for each section.
 * Uses CSS stroke-dasharray animation for a "drawing on" effect.
 * Inspired by Claude's minimalist line art aesthetic.
 */

// ── About Section: Person + Gear + Document ──
export function AboutIllustration({ visible = false }) {
  return (
    <svg
      className={`${styles.illustration} ${visible ? styles.visible : ""}`}
      viewBox="0 0 320 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Person silhouette */}
      <circle cx="160" cy="70" r="28" className={styles.line} strokeWidth="1.5" />
      <path d="M120 140 Q120 110 140 100 L160 98 L180 100 Q200 110 200 140 L200 160 L120 160 Z" className={styles.line} strokeWidth="1.5" />
      
      {/* Floating document */}
      <rect x="50" y="60" width="40" height="52" rx="4" className={styles.lineDelay1} strokeWidth="1.2" />
      <line x1="58" y1="75" x2="82" y2="75" className={styles.lineDelay1} strokeWidth="1" />
      <line x1="58" y1="83" x2="78" y2="83" className={styles.lineDelay1} strokeWidth="1" />
      <line x1="58" y1="91" x2="82" y2="91" className={styles.lineDelay1} strokeWidth="1" />
      <line x1="58" y1="99" x2="74" y2="99" className={styles.lineDelay1} strokeWidth="1" />

      {/* Gear */}
      <circle cx="258" cy="80" r="18" className={styles.lineDelay2} strokeWidth="1.2" />
      <circle cx="258" cy="80" r="8" className={styles.lineDelay2} strokeWidth="1.2" />
      <line x1="258" y1="58" x2="258" y2="65" className={styles.lineDelay2} strokeWidth="1.2" />
      <line x1="258" y1="95" x2="258" y2="102" className={styles.lineDelay2} strokeWidth="1.2" />
      <line x1="236" y1="80" x2="243" y2="80" className={styles.lineDelay2} strokeWidth="1.2" />
      <line x1="273" y1="80" x2="280" y2="80" className={styles.lineDelay2} strokeWidth="1.2" />

      {/* Connection arrows */}
      <path d="M90 86 Q110 86 118 94" className={styles.lineDelay3} strokeWidth="1" strokeDasharray="4 3" />
      <path d="M230 86 Q215 86 202 94" className={styles.lineDelay3} strokeWidth="1" strokeDasharray="4 3" />

      {/* Stats bars at bottom */}
      <rect x="95" y="190" width="130" height="8" rx="4" className={styles.lineDelay2} strokeWidth="1" />
      <rect x="95" y="190" width="85" height="8" rx="4" className={styles.fillBar} strokeWidth="0" />
      <rect x="95" y="210" width="130" height="8" rx="4" className={styles.lineDelay2} strokeWidth="1" />
      <rect x="95" y="210" width="110" height="8" rx="4" className={styles.fillBar2} strokeWidth="0" />
      <rect x="95" y="230" width="130" height="8" rx="4" className={styles.lineDelay2} strokeWidth="1" />
      <rect x="95" y="230" width="65" height="8" rx="4" className={styles.fillBar3} strokeWidth="0" />
    </svg>
  );
}

// ── Skills Section: Code + Database + Cloud ──
export function SkillsIllustration({ visible = false }) {
  return (
    <svg
      className={`${styles.illustration} ${visible ? styles.visible : ""}`}
      viewBox="0 0 320 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Terminal / Code window */}
      <rect x="60" y="40" width="200" height="130" rx="8" className={styles.line} strokeWidth="1.5" />
      <line x1="60" y1="62" x2="260" y2="62" className={styles.line} strokeWidth="1" />
      <circle cx="78" cy="51" r="4" className={styles.lineDelay1} strokeWidth="1" />
      <circle cx="92" cy="51" r="4" className={styles.lineDelay1} strokeWidth="1" />
      <circle cx="106" cy="51" r="4" className={styles.lineDelay1} strokeWidth="1" />
      
      {/* Code lines */}
      <text x="75" y="82" className={styles.codeText}>&lt;/&gt;</text>
      <line x1="105" y1="78" x2="175" y2="78" className={styles.lineDelay1} strokeWidth="1.2" />
      <line x1="85" y1="95" x2="165" y2="95" className={styles.lineDelay2} strokeWidth="1" />
      <line x1="85" y1="108" x2="195" y2="108" className={styles.lineDelay2} strokeWidth="1" />
      <line x1="85" y1="121" x2="145" y2="121" className={styles.lineDelay3} strokeWidth="1" />
      <line x1="85" y1="134" x2="180" y2="134" className={styles.lineDelay3} strokeWidth="1" />
      <line x1="85" y1="147" x2="130" y2="147" className={styles.lineDelay3} strokeWidth="1" />

      {/* Database icon (bottom left) */}
      <ellipse cx="100" cy="210" rx="30" ry="10" className={styles.lineDelay2} strokeWidth="1.2" />
      <path d="M70 210 L70 240 Q70 250 100 250 Q130 250 130 240 L130 210" className={styles.lineDelay2} strokeWidth="1.2" />
      <ellipse cx="100" cy="225" rx="30" ry="8" className={styles.lineDelay3} strokeWidth="0.8" />

      {/* Cloud icon (bottom right) */}
      <path d="M200 230 Q190 210 210 208 Q215 195 235 200 Q255 198 255 215 Q265 218 260 230 Z" className={styles.lineDelay2} strokeWidth="1.2" />
      
      {/* Connection line */}
      <path d="M130 230 L200 230" className={styles.lineDelay3} strokeWidth="1" strokeDasharray="4 3" />
    </svg>
  );
}

// ── Experience Section: Timeline + Buildings ──
export function ExperienceIllustration({ visible = false }) {
  return (
    <svg
      className={`${styles.illustration} ${visible ? styles.visible : ""}`}
      viewBox="0 0 320 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Timeline vertical line */}
      <line x1="160" y1="20" x2="160" y2="260" className={styles.line} strokeWidth="1.5" />
      
      {/* Timeline dots */}
      <circle cx="160" cy="50" r="6" className={styles.lineDelay1} strokeWidth="1.5" />
      <circle cx="160" cy="140" r="6" className={styles.lineDelay2} strokeWidth="1.5" />
      <circle cx="160" cy="230" r="6" className={styles.lineDelay3} strokeWidth="1.5" />

      {/* Building 1 (right of top dot) */}
      <rect x="185" y="30" width="50" height="40" rx="3" className={styles.lineDelay1} strokeWidth="1.2" />
      <rect x="192" y="38" width="8" height="8" rx="1" className={styles.lineDelay1} strokeWidth="0.8" />
      <rect x="205" y="38" width="8" height="8" rx="1" className={styles.lineDelay1} strokeWidth="0.8" />
      <rect x="218" y="38" width="8" height="8" rx="1" className={styles.lineDelay1} strokeWidth="0.8" />
      <rect x="192" y="52" width="8" height="8" rx="1" className={styles.lineDelay1} strokeWidth="0.8" />
      <rect x="205" y="52" width="8" height="8" rx="1" className={styles.lineDelay1} strokeWidth="0.8" />

      {/* Warehouse 2 (left of middle dot) */}
      <path d="M85 120 L110 105 L135 120 L135 160 L85 160 Z" className={styles.lineDelay2} strokeWidth="1.2" />
      <rect x="100" y="140" width="20" height="20" rx="2" className={styles.lineDelay2} strokeWidth="0.8" />
      
      {/* Graduation cap (right of bottom dot) */}
      <path d="M185 225 L210 215 L235 225 L210 235 Z" className={styles.lineDelay3} strokeWidth="1.2" />
      <line x1="210" y1="235" x2="210" y2="250" className={styles.lineDelay3} strokeWidth="1.2" />
      <path d="M195 240 Q195 252 210 252 Q225 252 225 240" className={styles.lineDelay3} strokeWidth="1" />

      {/* Connecting horizontal lines */}
      <line x1="166" y1="50" x2="185" y2="50" className={styles.lineDelay1} strokeWidth="1" />
      <line x1="135" y1="140" x2="154" y2="140" className={styles.lineDelay2} strokeWidth="1" />
      <line x1="166" y1="230" x2="185" y2="225" className={styles.lineDelay3} strokeWidth="1" />
    </svg>
  );
}
