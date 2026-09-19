"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { RING_END, RING_START } from "@/components/brand/Ring";
import { arcPath } from "@/lib/utils";

/**
 * Wraps the article body and shows a small open ring in the bottom-left corner that fills as you read.
 * Decorative (aria-hidden): the header already exposes page scroll progress.
 */
export function ReadingProgress({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.6", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 160, damping: 30, restDelta: 0.001 });
  const progress = reduce ? scrollYProgress : smooth;
  const opacity = useTransform(scrollYProgress, [0, 0.02, 0.995, 1], [0, 1, 1, 0.75]);
  const percent = useTransform(progress, (v) => `${Math.round(Math.min(1, Math.max(0, v)) * 100)}`);
  const d = arcPath(32, 32, 26, RING_START, RING_END);

  return (
    <div ref={ref} className={className}>
      {children}
      <motion.div
        aria-hidden="true"
        style={{ opacity }}
        className="border-line bg-surface pointer-events-none fixed bottom-4 left-4 z-40 grid size-14 place-items-center rounded-full border shadow-[0_10px_30px_-12px_rgb(var(--shadow)/0.35)] sm:bottom-6 sm:left-6 sm:size-16"
      >
        <svg viewBox="0 0 64 64" className="absolute inset-0 size-full">
          <path d={d} fill="none" stroke="var(--line)" strokeWidth="3" strokeLinecap="round" />
          <motion.path
            d={d}
            fill="none"
            stroke="var(--primary-ink)"
            strokeWidth="3"
            strokeLinecap="round"
            style={{ pathLength: progress }}
          />
        </svg>
        <motion.span className="font-display text-ink-2 relative text-[11px] tabular-nums">{percent}</motion.span>
      </motion.div>
    </div>
  );
}
