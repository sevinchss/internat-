"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Clip-path reveal for key imagery (use sparingly — hero-adjacent or one image per section, not every block).
 * shape "circle" opens from the centre (the ring motif), "wipe" uncovers upward.
 */
export function Reveal({
  children,
  className,
  shape = "wipe",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  shape?: "wipe" | "circle";
  delay?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  const hidden = shape === "circle" ? "circle(0% at 50% 50%)" : "inset(100% 0% 0% 0%)";
  const shown = shape === "circle" ? "circle(75% at 50% 50%)" : "inset(0% 0% 0% 0%)";
  return (
    <motion.div
      className={cn(className)}
      initial={{ clipPath: hidden }}
      whileInView={{ clipPath: shown }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
