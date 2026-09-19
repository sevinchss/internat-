"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

declare global {
  interface Window {
    __ilsHydrated?: boolean;
  }
}

/** A thin arc sweeps across the viewport (< 500ms) while the new page settles in. Skipped on first load. */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  // false during SSR + first hydration; true for every client-side navigation afterwards
  const [animateIn] = useState(() => typeof window !== "undefined" && !!window.__ilsHydrated);
  useEffect(() => {
    window.__ilsHydrated = true;
  }, []);

  if (!animateIn || reduce) return <>{children}</>;

  return (
    <>
      <svg className="pointer-events-none fixed inset-0 z-[60] h-dvh w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <motion.path
          d="M -10 108 A 118 118 0 0 1 108 -10"
          fill="none"
          stroke="var(--primary-ink)"
          strokeWidth={2}
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0, pathOffset: 0, opacity: 1 }}
          animate={{ pathLength: [0, 0.55, 0], pathOffset: [0, 0.2, 1], opacity: [1, 1, 0] }}
          transition={{ duration: 0.48, ease: [0.76, 0, 0.24, 1], times: [0, 0.5, 1] }}
        />
      </svg>
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}>
        {children}
      </motion.div>
    </>
  );
}
