"use client";

import { useState } from "react";
import { useMagnetic, useMagneticWindow } from "@/hooks/useMagnetic";
import styles from "./Contact.module.css";

function Social({ item }) {
  const ref = useMagnetic();
  const [copied, setCopied] = useState(false);

  if (item.action === "copy") {
    const onClick = async () => {
      try {
        await navigator.clipboard.writeText(item.value);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2000);
      } catch {
        /* clipboard API may be unavailable in non-secure contexts */
      }
    };
    return (
      <button className={styles.social} ref={ref} onClick={onClick} type="button">
        {copied ? item.copied : item.label}
      </button>
    );
  }

  return (
    <a
      className={styles.social}
      ref={ref}
      href={item.href}
      target={item.href?.startsWith("http") ? "_blank" : undefined}
      rel={item.href?.startsWith("http") ? "noopener noreferrer" : undefined}
    >
      {item.label}
    </a>
  );
}

export default function Contact({ dict = {} }) {
  const mailRef = useMagneticWindow();
  const socials = dict.socials || [];

  return (
    <section className={styles.contact} id="contact">
      <div data-reveal>
        <div className={styles.kicker}>{dict.kicker}</div>
        <a className={styles.mail} ref={mailRef} href={`mailto:${dict.email}`}>
          {dict.mail}
        </a>
        <div className={styles.email}>{dict.email}</div>
        <div className={styles.socials}>
          {socials.map((s, i) => (
            <Social key={i} item={s} />
          ))}
        </div>
      </div>
    </section>
  );
}
