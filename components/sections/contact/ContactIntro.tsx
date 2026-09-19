"use client";

import { motion, useReducedMotion } from "framer-motion";
import { RING_END, RING_START } from "@/components/brand/Ring";
import { arcPath } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as const;

/** Page title — the one motion moment: text settles while a large open ring draws itself behind, "open" towards the form. */
export function ContactIntro({ title, lead }: { title: string; lead: string }) {
  const reduce = useReducedMotion();
  const rise = (delay: number) =>
    reduce
      ? {}
      : { initial: { opacity: 0, y: 22 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, ease, delay } };
  return (
    <div className="relative isolate">
      <svg
        viewBox="0 0 200 200"
        aria-hidden="true"
        className="text-ring pointer-events-none absolute -top-24 -left-28 -z-10 size-[420px] opacity-70 sm:size-[520px]"
      >
        <motion.path
          d={arcPath(100, 100, 96, RING_START, RING_END)}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          vectorEffect="non-scaling-stroke"
          initial={reduce ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.6, ease, delay: 0.1 }}
        />
      </svg>
      <motion.h1 {...rise(0)} className="text-display-xl">
        {title}
      </motion.h1>
      <motion.p {...rise(0.1)} className="text-body-l text-ink-2 mt-6 max-w-[48ch]">
        {lead}
      </motion.p>
    </div>
  );
}
