"use client";

import { motion, useReducedMotion } from "framer-motion";
import { arcPath, polar } from "@/lib/utils";
import { RING_END, RING_START } from "@/components/brand/Ring";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * The page's one motion moment: the open ring draws itself once around the director's circular portrait,
 * then the navy landmark segment and its end point settle in. Static under reduced motion.
 */
export function PortraitRing({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const end = polar(100, 100, 97, RING_END);
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      {/* faint outer echo */}
      <motion.circle
        cx="100"
        cy="100"
        r="99.5"
        fill="none"
        stroke="var(--line)"
        strokeWidth={1}
        vectorEffect="non-scaling-stroke"
        initial={reduce ? false : { opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{ transformOrigin: "100px 100px" }}
        transition={{ duration: 1.4, ease, delay: 0.1 }}
      />
      <motion.path
        d={arcPath(100, 100, 97, RING_START, RING_END)}
        fill="none"
        stroke="var(--ring)"
        strokeWidth={1.2}
        vectorEffect="non-scaling-stroke"
        initial={reduce ? false : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.6, ease, delay: 0.15 }}
      />
      <motion.path
        d={arcPath(100, 100, 97, 280, RING_END)}
        fill="none"
        stroke="var(--primary-ink)"
        strokeWidth={2.5}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        initial={reduce ? false : { pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.7, ease, delay: 1.1 }}
      />
      <motion.circle
        cx={end.x}
        cy={end.y}
        r="2.2"
        fill="var(--primary-ink)"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 1.7 }}
      />
    </svg>
  );
}
