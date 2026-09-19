"use client";

import { motion, useReducedMotion } from "framer-motion";
import { arcPath } from "@/lib/utils";
import { RING_END, RING_START } from "@/components/brand/Ring";

/** The page's one motion moment: the open ring draws itself once behind the director's portrait. */
export function PortraitRing({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <motion.path
        d={arcPath(100, 100, 97, RING_START, RING_END)}
        fill="none"
        stroke="var(--ring)"
        strokeWidth={0.7}
        initial={reduce ? false : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
      />
      <motion.path
        d={arcPath(100, 100, 97, 276, RING_END)}
        fill="none"
        stroke="var(--primary-ink)"
        strokeWidth={1.6}
        initial={reduce ? false : { pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 1.1 }}
      />
    </svg>
  );
}
