"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useTranslations } from "next-intl";
import { arcPath } from "@/lib/utils";
import { RING_END, RING_START } from "@/components/brand/Ring";

/** Scroll progress drawn along the logo's open ring. */
export function ScrollArc({ size = 30, className }: { size?: number; className?: string }) {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  const t = useTranslations("header");
  const d = arcPath(20, 20, 16, RING_START, RING_END);

  return (
    <svg
      viewBox="0 0 40 40"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label={t("scrollProgress")}
    >
      <path d={d} fill="none" stroke="var(--line)" strokeWidth="3" />
      <motion.path d={d} fill="none" stroke="var(--primary-ink)" strokeWidth="3" style={{ pathLength: progress }} />
    </svg>
  );
}
