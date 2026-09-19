"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocale } from "next-intl";
import { about } from "@/data/home";
import { cn, pick } from "@/lib/utils";

// Circle centres (percent of the square stage) — a classic 3-set Venn.
const POS = [
  { x: 36, y: 38 },
  { x: 64, y: 38 },
  { x: 50, y: 62 },
];

/** "About in one screen": statement + the three real pillars as an interactive Venn diagram. */
export function Pillars() {
  const locale = useLocale();
  const [active, setActive] = useState<number | null>(null);
  const shown = active ?? 0;

  return (
    <section aria-labelledby="pillars-title" className="container-x py-24 lg:py-36">
      <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <h2 id="pillars-title" className="text-display-l text-ink">
            {pick(about.title, locale)}
          </h2>
          <p className="mt-6 max-w-[58ch] text-body-l text-ink-2">{pick(about.text, locale)}</p>

          <div className="mt-10 min-h-[190px] border-l-2 pl-6 transition-colors" style={{ borderColor: about.pillars[shown].color }} aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={shown} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 8 }} transition={{ duration: 0.25 }}>
                <h3 className="text-display-s text-ink">{pick(about.pillars[shown].title, locale)}</h3>
                <p className="mt-1 text-sm font-semibold text-ink-3">{pick(about.pillars[shown].short, locale)}</p>
                <p className="mt-3 max-w-[54ch] text-ink-2">{pick(about.pillars[shown].text, locale)}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="relative mx-auto aspect-square w-full max-w-[600px]" onPointerLeave={(e) => e.pointerType === "mouse" && setActive(null)}>
            {about.pillars.map((p, i) => {
              const on = active === i;
              const dim = active !== null && !on;
              return (
                <button
                  key={p.id}
                  type="button"
                  aria-pressed={active === i}
                  onClick={() => setActive(on ? null : i)}
                  onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}
                  onFocus={() => setActive(i)}
                  className="group absolute size-[56%] -translate-x-1/2 -translate-y-1/2 rounded-full focus-visible:outline-offset-4"
                  style={{ left: `${POS[i].x}%`, top: `${POS[i].y}%` }}
                >
                  <span
                    aria-hidden="true"
                    className={cn("absolute inset-0 rounded-full border-[1.5px] transition-[background-color,opacity,transform] duration-500", dim && "opacity-35")}
                    style={{
                      borderColor: p.color,
                      background: on ? `color-mix(in oklab, ${p.color} 16%, transparent)` : `color-mix(in oklab, ${p.color} 5%, transparent)`,
                      transform: on ? "scale(1.03)" : "scale(1)",
                    }}
                  />
                  <span
                    className={cn(
                      "absolute font-display text-[clamp(0.95rem,0.8rem+0.8vw,1.35rem)] font-medium text-ink transition-opacity",
                      i === 0 && "left-[14%] top-[30%] text-left",
                      i === 1 && "right-[14%] top-[30%] text-right",
                      i === 2 && "bottom-[16%] left-1/2 -translate-x-1/2 text-center",
                      dim && "opacity-40",
                    )}
                  >
                    {pick(p.title, locale)}
                  </span>
                </button>
              );
            })}
            {/* centre intersection */}
            <span aria-hidden="true" className="pointer-events-none absolute left-1/2 top-[47%] grid -translate-x-1/2 -translate-y-1/2 place-items-center text-center">
              <span className="block size-2.5 rounded-full bg-ink" />
              <span className="mt-2 block max-w-[8rem] text-xs font-bold leading-tight text-ink">{pick(about.centre, locale)}</span>
            </span>
          </div>
          <p className="mt-4 text-center text-sm text-ink-3">{pick(about.hint, locale)}</p>
        </div>
      </div>
    </section>
  );
}
