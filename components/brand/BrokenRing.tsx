"use client";

import { motion, useReducedMotion } from "framer-motion";
import { arcPath } from "@/lib/utils";
import { RING_SEGMENTS } from "./Ring";

/** 404: the logo ring drawn in fine lines, with one segment missing — a dashed ghost marks where it belongs while it drifts away. */
export function BrokenRing() {
  const reduce = useReducedMotion();
  const lost = 2; // the amber segment
  const seg = RING_SEGMENTS[lost];
  return (
    <svg viewBox="0 0 240 240" className="w-full overflow-visible" aria-hidden="true">
      <circle cx="120" cy="120" r="116" fill="none" stroke="var(--line)" strokeWidth="0.6" />
      <path
        d={arcPath(120, 120, 108, 40, 320)}
        fill="none"
        stroke="var(--ring)"
        strokeWidth="0.6"
        strokeDasharray="1 5"
      />
      {RING_SEGMENTS.map((s, i) =>
        i === lost ? null : (
          <path
            key={i}
            d={arcPath(120, 120, 96, s.from, s.to)}
            fill="none"
            stroke={s.color}
            strokeWidth="5"
            strokeLinecap="round"
          />
        ),
      )}
      {/* where the missing piece belongs */}
      <path
        d={arcPath(120, 120, 96, seg.from, seg.to)}
        fill="none"
        stroke="var(--ink-3)"
        strokeWidth="0.8"
        strokeDasharray="3 4"
      />
      <motion.path
        d={arcPath(120, 120, 96, seg.from, seg.to)}
        fill="none"
        stroke={seg.color}
        strokeWidth="5"
        strokeLinecap="round"
        initial={false}
        animate={
          reduce ? { x: -30, y: 38, rotate: -16 } : { x: [-22, -34, -22], y: [30, 44, 30], rotate: [-12, -20, -12] }
        }
        transition={reduce ? undefined : { duration: 7, repeat: Infinity, ease: "easeInOut" }}
        style={{ originX: "60px", originY: "180px" }}
      />
      <circle cx="120" cy="120" r="2.5" fill="var(--ink)" />
    </svg>
  );
}
