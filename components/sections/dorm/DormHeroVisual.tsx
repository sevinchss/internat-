"use client";

import { motion, useReducedMotion } from "framer-motion";
import { images } from "@/lib/images";
import { arcPath } from "@/lib/utils";
import { Photo } from "@/components/ui/Photo";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * The page's one orchestrated moment: the arched "window" photo opens from the bottom like a blind,
 * then the evening-lamp circle settles in and a warm arc draws around it.
 */
export function DormHeroVisual({ caption }: { caption: string }) {
  const reduce = useReducedMotion();
  const t = (delay: number, duration: number) => (reduce ? { duration: 0 } : { delay, duration, ease });

  return (
    <div className="relative mx-auto max-w-[620px] pb-16 sm:pb-20 lg:mr-0">
      <motion.div
        className="relative ml-auto w-[88%] overflow-hidden rounded-b-[28px] rounded-t-[999px]"
        initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
        animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
        transition={t(0.15, 1.3)}
      >
        <motion.div initial={{ scale: 1.12 }} animate={{ scale: 1 }} transition={t(0.15, 1.8)}>
          <Photo slot={images.dorm.hero} priority sizes="(min-width: 1024px) 560px, 88vw" className="aspect-[4/5]" />
        </motion.div>
      </motion.div>

      <figure className="absolute bottom-0 left-0 w-[46%] max-w-[270px]">
        <div className="relative">
          <motion.div
            className="overflow-hidden rounded-full border-[6px] border-paper"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={t(1.05, 0.9)}
          >
            <Photo slot={images.dorm.lamp} sizes="(min-width: 1024px) 270px, 46vw" className="aspect-square" />
          </motion.div>
          <svg viewBox="0 0 200 200" aria-hidden="true" className="pointer-events-none absolute -inset-[9%] h-[118%] w-[118%]">
            <motion.path
              d={arcPath(100, 100, 96, 40, 320)}
              fill="none"
              stroke="var(--orange)"
              strokeWidth="1.6"
              vectorEffect="non-scaling-stroke"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={reduce ? { duration: 0 } : { pathLength: { delay: 1.35, duration: 1.4, ease }, opacity: { delay: 1.35, duration: 0.01 } }}
            />
          </svg>
        </div>
        <figcaption className="mt-4 pl-2 text-sm font-medium text-ink-2">{caption}</figcaption>
      </figure>
    </div>
  );
}
