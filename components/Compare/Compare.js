"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReduced } from "@/hooks/reducedMotion";
import styles from "./Compare.module.css";

/**
 * Before/After comparison slider. Pointer drag + keyboard + Before/After
 * buttons, one-time nudge on first view. Ported from the prototype's
 * compare.js. Pass `beforeImg` / `afterImg` to swap the placeholder stripes
 * for real screenshots — everything else stays the same.
 */
export default function Compare({ beforeImg, afterImg, start = 50, aspect, labels = {} }) {
  const elRef = useRef(null);
  const timerRef = useRef(null);
  const draggingRef = useRef(false);
  const posRef = useRef(start);
  const [pos, setPos] = useState(start);
  const [anim, setAnim] = useState(false);

  const apply = (p) => {
    const v = Math.max(0, Math.min(100, p));
    posRef.current = v;
    setPos(v);
  };

  const fromClientX = (clientX) => {
    const r = elRef.current.getBoundingClientRect();
    apply(((clientX - r.left) / r.width) * 100);
  };

  const animate = () => {
    setAnim(true);
    window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => setAnim(false), 650);
  };

  const onPointerDown = (e) => {
    if (e.target.closest("[data-ctrl]")) return; // let the buttons handle it
    e.preventDefault();
    draggingRef.current = true;
    setAnim(false);
    elRef.current.setPointerCapture?.(e.pointerId);
    fromClientX(e.clientX);
  };
  const onPointerMove = (e) => {
    if (draggingRef.current) {
      e.preventDefault();
      fromClientX(e.clientX);
    }
  };
  const endDrag = () => { draggingRef.current = false; };

  const goTo = (e, val) => {
    e.stopPropagation();
    animate();
    apply(val);
  };

  const onKeyDown = (e) => {
    const step = e.shiftKey ? 10 : 4;
    if (e.key === "ArrowLeft") { animate(); apply(posRef.current - step); e.preventDefault(); }
    else if (e.key === "ArrowRight") { animate(); apply(posRef.current + step); e.preventDefault(); }
    else if (e.key === "Home") { animate(); apply(0); e.preventDefault(); }
    else if (e.key === "End") { animate(); apply(100); e.preventDefault(); }
  };

  // Gentle one-time nudge when scrolled into view (hints interactivity).
  useEffect(() => {
    if (prefersReduced()) return;
    const el = elRef.current;
    if (!el) return;
    let seen = false;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !seen) {
            seen = true;
            animate();
            apply(posRef.current + 16);
            window.setTimeout(() => { animate(); apply(posRef.current - 16); }, 520);
            io.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={elRef}
      className={`${styles.compare} ${anim ? styles.anim : ""}`}
      style={{ "--p": `${pos}%`, ...(aspect ? { "--aspect": aspect } : {}) }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
    >
      <div className={`${styles.pane} ${styles.after}`}>
        {afterImg ? (
          <img src={afterImg} alt={labels.afterLabel || "after"} className={styles.img} />
        ) : (
          <div className={`${styles.ph} ${styles.phAfter}`}>
            <span>{labels.afterLabel}</span>
          </div>
        )}
      </div>
      <div className={`${styles.pane} ${styles.before}`}>
        {beforeImg ? (
          <img src={beforeImg} alt={labels.beforeLabel || "before"} className={styles.img} />
        ) : (
          <div className={`${styles.ph} ${styles.phBefore}`}>
            <span>{labels.beforeLabel}</span>
          </div>
        )}
      </div>
      <div className={styles.line} />
      <button
        className={styles.handle}
        aria-label={labels.handleAria || "drag to compare"}
        role="slider"
        tabIndex={0}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos)}
        onKeyDown={onKeyDown}
      >
        <span className={`${styles.chev} ${styles.chevL}`} />
        <span className={`${styles.chev} ${styles.chevR}`} />
      </button>
      <span className={`${styles.tag} ${styles.tagBefore}`}>{labels.tagBefore}</span>
      <span className={`${styles.tag} ${styles.tagAfter}`}>{labels.tagAfter}</span>
      <div className={styles.ctrl} data-ctrl>
        <button onClick={(e) => goTo(e, 100)}>{labels.ctrlBefore}</button>
        <button onClick={(e) => goTo(e, 0)}>{labels.ctrlAfter}</button>
      </div>
    </div>
  );
}
