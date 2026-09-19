"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useLocale } from "next-intl";
import { RingArc } from "@/components/brand/Ring";
import { missionCopy as c } from "@/data/mission";
import { pick } from "@/lib/utils";

/**
 * Full-width typographic hero. The mission statement rises into place word by word, once —
 * the page's single orchestrated motion moment. Static under reduced motion.
 */
export function MissionHero() {
  const locale = useLocale();
  const reduce = useReducedMotion();
  const lines = pick(c.mission, locale);
  const full = lines.join(" ");
  // words with a running index for the stagger
  const rows = lines.map((line, li) => {
    const before = lines.slice(0, li).reduce((n, l) => n + l.split(" ").length, 0);
    return line.split(" ").map((word, wi) => ({ word, i: before + wi }));
  });

  return (
    <section aria-labelledby="mission-title" className="relative isolate overflow-hidden pb-24 pt-32 sm:pt-36 lg:pb-36 lg:pt-48">
      <RingArc className="absolute -right-[38%] top-16 -z-10 w-[110vw] max-w-[1100px] text-ring opacity-70 sm:-right-[22%] sm:w-[80vw]" strokeWidth={1} segmented={false} />
      <div className="container-x">
        <h1 id="mission-title" className="flex items-center gap-3 text-[15px] text-ink-2" style={{ fontWeight: 500, letterSpacing: 0 }}>
          <span className="h-px w-10 bg-purple" aria-hidden="true" />
          {pick(c.title, locale)}
        </h1>

        <p className="mt-8 max-w-[24ch] font-display text-display-l font-medium text-ink sm:mt-10 xl:max-w-none xl:text-[clamp(3rem,1.2rem+2.6vw,4.4rem)] xl:leading-[1.06]">
          <span className="sr-only">{full}</span>
          <span aria-hidden="true">
            {rows.map((row, li) => (
              <span key={li} className={li === 0 ? "block text-ink-2" : "xl:block"} style={li === 0 ? { fontWeight: 300 } : undefined}>
                {row.map(({ word, i }) => (
                  <span key={i}>
                    <span className="inline-block overflow-hidden pb-[0.1em] align-top">
                      <motion.span
                        className="inline-block"
                        initial={reduce ? false : { y: "110%" }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.12 + li * 0.12 + i * 0.02 }}
                      >
                        {word}
                      </motion.span>
                    </span>{" "}
                  </span>
                ))}
              </span>
            ))}
          </span>
        </p>

        <div className="mt-12 grid lg:mt-16 lg:grid-cols-12">
          <p className="max-w-[46ch] border-t border-line pt-6 text-ink-2 lg:col-span-4 lg:col-start-9">{pick(c.missionNote, locale)}</p>
        </div>
      </div>
    </section>
  );
}
