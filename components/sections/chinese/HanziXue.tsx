"use client";

import { useId, useState } from "react";
import { motion } from "framer-motion";
import { RotateCcw } from "lucide-react";
import { xue } from "@/data/hanzi-xue";
import { usePrefersReducedMotion } from "@/components/ui/usePrefersReducedMotion";

type Pt = readonly [number, number];

const medianPath = (pts: readonly Pt[]) => pts.map(([x, y], i) => `${i ? "L" : "M"} ${x} ${y}`).join(" ");
const medianLength = (pts: readonly Pt[]) =>
  pts.reduce((sum, [x, y], i) => (i ? sum + Math.hypot(x - pts[i - 1][0], y - pts[i - 1][1]) : 0), 0);

// Stroke timing: duration proportional to stroke length, short pause between strokes.
const START = 0.5;
const PAUSE = 0.12;
const timeline = (() => {
  let t = START;
  return xue.medians.map((m) => {
    const duration = Math.max(0.28, medianLength(m as readonly Pt[]) / 1150);
    const item = { delay: t, duration };
    t += duration + PAUSE;
    return item;
  });
})();

/**
 * 学 drawn stroke by stroke (Make Me a Hanzi data): each stroke is clipped to its outline and revealed by
 * a thick path along its median. Under reduced motion the finished character is shown immediately.
 */
export function HanziXue({ label, replayLabel }: { label: string; replayLabel: string }) {
  const reduce = usePrefersReducedMotion();
  const [run, setRun] = useState(0);
  const uid = "x" + useId().replace(/[^a-zA-Z0-9_-]/g, "");

  return (
    <div className="relative">
      <svg viewBox="0 0 1024 1024" role="img" aria-label={label} className="block h-auto w-full">
        {/* 米字格 practice grid */}
        <g fill="none" stroke="var(--accent)" vectorEffect="non-scaling-stroke">
          <rect x="6" y="6" width="1012" height="1012" rx="18" strokeWidth="1.6" vectorEffect="non-scaling-stroke" />
          <g strokeOpacity="0.45" strokeDasharray="10 12" strokeWidth="1" vectorEffect="non-scaling-stroke">
            <path d="M512 6 V1018 M6 512 H1018" vectorEffect="non-scaling-stroke" />
            <path d="M6 6 L1018 1018 M1018 6 L6 1018" strokeOpacity="0.6" vectorEffect="non-scaling-stroke" />
          </g>
        </g>

        <g transform="scale(1,-1) translate(0,-900)">
          <defs>
            {xue.strokes.map((d, i) => (
              <clipPath key={i} id={`${uid}-c${i}`}>
                <path d={d} />
              </clipPath>
            ))}
          </defs>
          {/* ghost of the finished character */}
          {xue.strokes.map((d, i) => (
            <path key={i} d={d} fill="var(--line)" />
          ))}
          <g key={`${run}-${reduce}`}>
            {xue.medians.map((m, i) => (
              <g key={i} clipPath={`url(#${uid}-c${i})`}>
                <motion.path
                  d={medianPath(m as readonly Pt[])}
                  fill="none"
                  stroke="var(--ink)"
                  strokeWidth={200}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={reduce ? false : { pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={
                    reduce
                      ? { duration: 0 }
                      : {
                          pathLength: {
                            delay: timeline[i].delay,
                            duration: timeline[i].duration,
                            ease: [0.45, 0, 0.3, 1],
                          },
                          opacity: { delay: timeline[i].delay, duration: 0.01 },
                        }
                  }
                />
              </g>
            ))}
          </g>
        </g>
      </svg>
      {!reduce && (
        <button
          type="button"
          onClick={() => setRun((r) => r + 1)}
          className="bg-paper/90 text-ink-2 hover:text-accent-ink absolute right-3 bottom-3 inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-sm font-semibold backdrop-blur transition-colors"
        >
          <RotateCcw className="size-4" strokeWidth={1.8} aria-hidden="true" />
          {replayLabel}
        </button>
      )}
    </div>
  );
}
