"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Reduced motion is honoured here, once, rather than by branching per component.
 *
 * Branching on `useReducedMotion()` renders a different tree on the client than
 * the server produced (the server cannot know the preference), and React keeps
 * the server's inline `opacity: 0` on hydration — so visitors with reduced
 * motion turned on saw blank sections. With `reducedMotion="user"` the markup
 * is identical everywhere and framer-motion simply drops transform and layout
 * animation for those visitors, leaving a plain fade.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
