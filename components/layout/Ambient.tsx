"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { arcPath } from "@/lib/utils";
import { RING_SEGMENTS } from "@/components/brand/Ring";

// Letters from the school's languages: Uzbek, English, Russian, Chinese.
const GLYPHS = [
  { c: "Oʻ", x: 8, y: 18, s: 7, d: 38 },
  { c: "学", x: 86, y: 12, s: 9, d: 46, zh: true },
  { c: "Ж", x: 72, y: 58, s: 6, d: 42 },
  { c: "A", x: 14, y: 72, s: 10, d: 50 },
  { c: "好", x: 44, y: 88, s: 6, d: 36, zh: true },
  { c: "Я", x: 93, y: 84, s: 7, d: 44 },
  { c: "gʻ", x: 55, y: 30, s: 5, d: 40 },
  { c: "文", x: 30, y: 44, s: 5, d: 48, zh: true },
];

/** Segmented ring built from the logo's six colours, drawn as thin arcs. */
function BrandRing({ r = 96, width = 1.4 }: { r?: number; width?: number }) {
  return (
    <svg viewBox="0 0 200 200" className="size-full overflow-visible">
      <circle
        cx="100"
        cy="100"
        r={r + 7}
        fill="none"
        stroke="var(--ring)"
        strokeWidth="0.4"
        strokeDasharray="0.6 3.4"
      />
      {RING_SEGMENTS.map((s) => (
        <path
          key={s.from}
          d={arcPath(100, 100, r, s.from, s.to)}
          fill="none"
          stroke={s.color}
          strokeWidth={width}
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}

/**
 * Site-wide ambient background (fixed, behind all content, pointer-events: none):
 * a static dot grid, two oversized logo rings that rotate very slowly
 * and drift with scroll, and faint letters from the school's four languages floating in depth.
 */
export function Ambient() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const p = useSpring(scrollYProgress, { stiffness: 60, damping: 20, mass: 0.6 });
  const yA = useTransform(p, [0, 1], reduce ? ["0vh", "0vh"] : ["0vh", "-40vh"]);
  const yB = useTransform(p, [0, 1], reduce ? ["0vh", "0vh"] : ["0vh", "30vh"]);
  const yG = useTransform(p, [0, 1], reduce ? ["0vh", "0vh"] : ["0vh", "-18vh"]);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* dot grid, fading toward the edges */}
      <div className="ambient-dots absolute inset-0" />

      {/* two oversized logo rings */}
      <motion.div
        style={{ y: yA }}
        className="absolute -top-[22vmax] -right-[26vmax] size-[78vmax] opacity-[0.16] dark:opacity-[0.22]"
      >
        <div className={reduce ? "size-full" : "ambient-spin size-full"}>
          <BrandRing width={0.9} />
        </div>
      </motion.div>
      <motion.div
        style={{ y: yB }}
        className="absolute -bottom-[34vmax] -left-[30vmax] size-[70vmax] opacity-[0.1] dark:opacity-[0.16]"
      >
        <div className={reduce ? "size-full" : "ambient-spin-rev size-full"}>
          <BrandRing width={0.7} />
        </div>
      </motion.div>

      {/* floating letters from the school's languages */}
      <motion.div style={{ y: yG }} className="absolute inset-0">
        {GLYPHS.map((g) => (
          <span
            key={g.c}
            lang={g.zh ? "zh" : undefined}
            className="ambient-glyph text-ink absolute leading-none font-semibold select-none"
            style={{
              left: `${g.x}%`,
              top: `${g.y}%`,
              fontSize: `${g.s}vmax`,
              animationDuration: reduce ? "0s" : `${g.d}s`,
              animationDelay: `-${g.d / 3}s`,
            }}
          >
            {g.c}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
