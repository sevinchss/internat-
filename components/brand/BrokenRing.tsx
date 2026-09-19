"use client";

import { motion, useReducedMotion } from "framer-motion";
import { arcPath } from "@/lib/utils";
import { RING_SEGMENTS } from "./Ring";

/** 404: the logo ring with one segment missing — it fell out and keeps drifting away. */
export function BrokenRing() {
  const reduce = useReducedMotion();
  const lost = 2; // the amber segment
  return (
    <svg viewBox="0 0 240 240" className="w-full overflow-visible" aria-hidden="true">
      <path d={arcPath(120, 120, 112, 40, 320)} fill="none" stroke="var(--ring)" strokeWidth="1" strokeDasharray="2 6" />
      {RING_SEGMENTS.map((s, i) =>
        i === lost ? null : (
          <path key={i} d={arcPath(120, 120, 96, s.from, s.to)} fill="none" stroke={s.color} strokeWidth="14" />
        ),
      )}
      <motion.path
        d={arcPath(120, 120, 96, RING_SEGMENTS[lost].from, RING_SEGMENTS[lost].to)}
        fill="none"
        stroke={RING_SEGMENTS[lost].color}
        strokeWidth="14"
        initial={false}
        animate={reduce ? { x: -26, y: 34, rotate: -14 } : { x: [-18, -30, -18], y: [26, 40, 26], rotate: [-10, -18, -10] }}
        transition={reduce ? undefined : { duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{ originX: "60px", originY: "180px" }}
      />
    </svg>
  );
}
