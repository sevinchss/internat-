"use client";

import { motion } from "framer-motion";
import type { ImageSlot } from "@/lib/images";
import { Photo } from "@/components/ui/Photo";

const poses = [
  { rotate: -9, x: "-30%", y: 14 },
  { rotate: 7, x: "30%", y: 22 },
  { rotate: -1, x: "0%", y: 0 },
];

/** The page's one motion moment: three prints fan out from a single stack, once. (MotionConfig skips it for reduced motion.) */
export function HeroFan({ slots }: { slots: ImageSlot[] }) {
  return (
    <div className="relative mx-auto aspect-[10/9] w-full max-w-[460px]" aria-hidden="true">
      {slots.map((slot, i) => (
        <motion.div
          key={slot.src}
          className="absolute inset-x-[18%] top-[6%] aspect-[4/5] rounded-[18px] border-[6px] border-surface bg-surface shadow-[0_24px_50px_-28px_rgb(var(--shadow)/0.55)]"
          initial={{ rotate: 0, x: "0%", y: 0 }}
          animate={poses[i]}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.2 + i * 0.08 }}
          style={{ zIndex: i }}
        >
          <Photo slot={slot} sizes="260px" decorative className="size-full rounded-[12px]" priority={i === 2} />
        </motion.div>
      ))}
    </div>
  );
}
