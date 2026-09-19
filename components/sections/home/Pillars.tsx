"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocale } from "next-intl";
import { about, labels } from "@/data/home";
import { cn, pick } from "@/lib/utils";
import { SectionLabel } from "./SectionLabel";

// Circle centres (percent of the square stage) — a classic 3-set Venn.
const POS = [
  { x: 36, y: 38 },
  { x: 64, y: 38 },
  { x: 50, y: 62 },
];

/** "About in one screen": statement + the three real pillars as an interactive Venn diagram drawn in hairlines. */
export function Pillars() {
  const locale = useLocale();
  const [active, setActive] = useState<number | null>(null);
  const shown = active ?? 0;
  const p = about.pillars[shown];

  return (
    <section aria-labelledby="pillars-title" className="container-x py-28 lg:py-40">
      <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <SectionLabel n="01">{pick(labels.about, locale)}</SectionLabel>
          <h2 id="pillars-title" className="text-display-l text-ink mt-6">
            {pick(about.title, locale)}
          </h2>
          <p className="text-body-l text-ink-2 mt-7 max-w-[58ch]">{pick(about.text, locale)}</p>

          {/* detail of the selected pillar */}
          <div className="frame mt-12 min-h-[236px] p-6 sm:p-8" aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={shown}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
              >
                <div className="flex items-baseline gap-4">
                  <span
                    aria-hidden="true"
                    className="text-ink-3 text-[2.5rem] leading-none font-light tracking-[-0.04em] tabular-nums"
                  >
                    0{shown + 1}
                  </span>
                  <h3 className="text-display-s text-ink">{pick(p.title, locale)}</h3>
                  <span
                    aria-hidden="true"
                    className="ml-auto size-2 shrink-0 self-center rounded-full"
                    style={{ background: p.color }}
                  />
                </div>
                <p className="text-ink mt-4 text-sm font-medium">{pick(p.short, locale)}</p>
                <p className="text-ink-2 mt-2 max-w-[54ch] text-[15px] leading-relaxed">{pick(p.text, locale)}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div
            className="relative mx-auto aspect-square w-full max-w-[600px]"
            onPointerLeave={(e) => e.pointerType === "mouse" && setActive(null)}
          >
            {/* faint enclosing orbit */}
            <span
              aria-hidden="true"
              className="border-line pointer-events-none absolute inset-[2%] rounded-full border border-dashed"
            />
            {about.pillars.map((pl, i) => {
              const on = active === i;
              const dim = active !== null && !on;
              return (
                <button
                  key={pl.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setActive(on ? null : i)}
                  onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}
                  onFocus={() => setActive(i)}
                  className="group absolute size-[56%] -translate-x-1/2 -translate-y-1/2 rounded-full focus-visible:outline-offset-4"
                  style={{ left: `${POS[i].x}%`, top: `${POS[i].y}%` }}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute inset-0 rounded-full border transition-[background-color,opacity,transform,border-width] duration-500 ease-out",
                      dim && "opacity-30",
                      on && "border-[1.5px]",
                    )}
                    style={{
                      borderColor: pl.color,
                      background: on
                        ? `color-mix(in oklab, ${pl.color} 13%, transparent)`
                        : `color-mix(in oklab, ${pl.color} 3%, transparent)`,
                      transform: on ? "scale(1.04)" : "scale(1)",
                    }}
                  />
                  <span
                    className={cn(
                      "text-ink absolute text-[clamp(0.95rem,0.8rem+0.8vw,1.35rem)] font-medium tracking-[-0.02em] transition-opacity duration-500",
                      i === 0 && "top-[30%] left-[14%] text-left",
                      i === 1 && "top-[30%] right-[14%] text-right",
                      i === 2 && "bottom-[16%] left-1/2 -translate-x-1/2 text-center",
                      dim && "opacity-40",
                    )}
                  >
                    {pick(pl.title, locale)}
                  </span>
                </button>
              );
            })}
            {/* centre intersection */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute top-[47%] left-1/2 grid -translate-x-1/2 -translate-y-1/2 place-items-center text-center"
            >
              <span className="bg-ink relative block size-2.5 rounded-full">
                <span className="border-ink/25 absolute -inset-2 rounded-full border" />
              </span>
              <span className="text-ink mt-3 block max-w-[8rem] text-xs leading-tight font-semibold">
                {pick(about.centre, locale)}
              </span>
            </span>
          </div>
          <p className="text-ink-3 mt-4 text-center text-sm">{pick(about.hint, locale)}</p>
        </div>
      </div>
    </section>
  );
}
