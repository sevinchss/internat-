"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ImageSlot } from "@/lib/images";
import { Photo } from "@/components/ui/Photo";
import { cn } from "@/lib/utils";

/** Contact-sheet frames of different heights, bottom-aligned; one is a circle (the ring motif). */
const frames = [
  { box: "w-[30%] aspect-[3/4] sm:w-[21%]", round: "rounded-[6px]" },
  { box: "w-[26%] aspect-square sm:w-[17%]", round: "rounded-full" },
  { box: "w-[38%] aspect-[4/3] sm:w-[30%]", round: "rounded-[6px]" },
  { box: "hidden sm:block sm:w-[15%] aspect-[4/5]", round: "rounded-[6px]" },
  { box: "hidden sm:block sm:w-[11%] aspect-[3/5]", round: "rounded-[6px]" },
];

/**
 * The page's one motion moment: the frames uncover one after another from the bottom edge, like prints lifted
 * out of a tray. Static under reduced motion.
 */
export function HeroStrip({ slots }: { slots: ImageSlot[] }) {
  const reduce = useReducedMotion();
  return (
    <div className="flex items-end gap-2.5 sm:gap-4" aria-hidden="true">
      {slots.slice(0, frames.length).map((slot, i) => {
        const f = frames[i];
        return (
          <motion.div
            key={slot.src}
            className={cn("relative shrink-0 overflow-hidden", f.box, f.round)}
            initial={reduce ? false : { clipPath: "inset(100% 0% 0% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1], delay: 0.15 + i * 0.09 }}
          >
            <motion.div
              className="size-full"
              initial={reduce ? false : { scale: 1.18 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.15 + i * 0.09 }}
            >
              <Photo slot={slot} sizes="(min-width: 1024px) 420px, 40vw" decorative priority={i < 3} className="size-full" />
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}
