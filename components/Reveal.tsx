"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * On-scroll reveal. Transform and opacity only, so it never triggers layout.
 * Reduced motion is handled globally by MotionProvider, which drops the
 * movement and keeps only the fade.
 *
 * `as="li"` lets it be the list item itself — wrapping an `<li>` in a `<div>`
 * would be invalid inside `<ol>`/`<ul>` and breaks `:last-child` styling.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li";
}) {
  const Motion = as === "li" ? motion.li : motion.div;

  return (
    <Motion
      className={className}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Motion>
  );
}
