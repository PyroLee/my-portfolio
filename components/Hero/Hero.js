"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { prefersReduced } from "@/hooks/reducedMotion";
import styles from "./Hero.module.css";

/**
 * Builds the headline as lines → words → chars so each character can be a
 * physics-driven <span>. CJK name + latin name on line 1, accent role on line 2.
 */
function buildHeadline(dict) {
  const line1 = [];
  line1.push([...(dict.nameCjk || "")].map((ch) => ({ ch, latin: false, accent: false })));
  (dict.nameLatin || "")
    .split(/\s+/)
    .filter(Boolean)
    .forEach((w) => line1.push([...w].map((ch) => ({ ch, latin: true, accent: false }))));

  const line2 = [];
  (dict.role || "")
    .split(/\s+/)
    .filter(Boolean)
    .forEach((w) => line2.push([...w].map((ch) => ({ ch, latin: /[A-Za-z]/.test(ch), accent: true }))));

  return [line1, line2];
}

export default function Hero({ dict = {} }) {
  const heroRef = useRef(null);
  const fieldRef = useRef(null);
  const gravityRef = useRef(false);
  const physicsRef = useRef(null);
  const [gravOn, setGravOn] = useState(false);

  const lines = useMemo(() => buildHeadline(dict), [dict]);

  // Char physics: repel from cursor + spring home; gravity easter egg.
  useEffect(() => {
    if (prefersReduced()) return;
    const hero = heroRef.current;
    const field = fieldRef.current;
    if (!hero || !field) return;

    const chars = Array.from(field.querySelectorAll("[data-ch]"));
    const state = chars.map(() => ({ x: 0, y: 0, vx: 0, vy: 0, r: 0, vr: 0 }));
    physicsRef.current = { chars, state };

    const mouse = { x: -9999, y: -9999 };
    const onMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999; };
    hero.addEventListener("mousemove", onMove);
    hero.addEventListener("mouseleave", onLeave);

    let raf;
    const tick = () => {
      const heroRect = hero.getBoundingClientRect();
      for (let i = 0; i < chars.length; i++) {
        const el = chars[i];
        const s = state[i];
        if (gravityRef.current) {
          const rect = el.getBoundingClientRect();
          const floor = heroRect.bottom - 30;
          s.vy += 0.9;
          s.x += s.vx; s.y += s.vy; s.r += s.vr;
          if (rect.bottom + s.vy > floor && s.vy > 0) {
            s.vy *= -0.42; s.vx *= 0.92; s.vr *= 0.8;
            if (Math.abs(s.vy) < 1.2) s.vy = 0;
          }
        } else {
          const rect = el.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          const dx = cx - mouse.x;
          const dy = cy - mouse.y;
          const d2 = dx * dx + dy * dy;
          const rad = 170;
          if (d2 < rad * rad && d2 > 0.01) {
            const d = Math.sqrt(d2);
            const f = (1 - d / rad) * 4.2;
            s.vx += (dx / d) * f; s.vy += (dy / d) * f;
          }
          s.vx += -s.x * 0.055; s.vy += -s.y * 0.055; s.vr += -s.r * 0.06;
          s.vx *= 0.86; s.vy *= 0.86; s.vr *= 0.85;
          s.x += s.vx; s.y += s.vy; s.r += s.vr;
          if (Math.abs(s.x) < 0.05 && Math.abs(s.vx) < 0.05) s.x = 0;
        }
        el.style.transform = `translate(${s.x.toFixed(2)}px,${s.y.toFixed(2)}px) rotate(${s.r.toFixed(2)}deg)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      hero.removeEventListener("mousemove", onMove);
      hero.removeEventListener("mouseleave", onLeave);
    };
  }, [lines]);

  const toggleGravity = () => {
    const next = !gravityRef.current;
    gravityRef.current = next;
    setGravOn(next);
    if (next && physicsRef.current) {
      physicsRef.current.state.forEach((s) => {
        s.vy += Math.random() * -2;
        s.vr = (Math.random() - 0.5) * 8;
      });
    }
  };

  let charIndex = 0;

  return (
    <section className={styles.hero} id="hero" ref={heroRef}>
      <div className={styles.kicker}>
        <span><span className={styles.hl}>●</span> {dict.kickerActive}</span>
        <span>{dict.kickerHint}</span>
      </div>

      <h1 className={styles.field} ref={fieldRef} aria-label={dict.aria}>
        {lines.map((line, li) => (
          <span key={li}>
            {line.map((word, wi) => (
              <span className={styles.word} key={wi} aria-hidden="true">
                {word.map((c) => (
                  <span
                    key={charIndex++}
                    data-ch
                    className={`${styles.ch} ${c.latin ? styles.latin : ""} ${c.accent ? styles.accent : ""}`}
                  >
                    {c.ch}
                  </span>
                ))}
              </span>
            ))}
            {li === 0 && <br />}
          </span>
        ))}
      </h1>

      <p className={styles.sub}>{dict.sub}</p>

      <div className={styles.actions}>
        <a
          className={styles.resumeBtn}
          href={dict.resumeHref}
          download={dict.resumeFile}
        >
          {dict.resumeLabel}
        </a>
        <button className={styles.gravityBtn} onClick={toggleGravity}>
          {gravOn ? dict.gravityOff : dict.gravityOn}
        </button>
      </div>
    </section>
  );
}
