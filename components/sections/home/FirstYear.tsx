"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useLocale } from "next-intl";
import { firstYear } from "@/data/home";
import { pick } from "@/lib/utils";

const COLORS = ["var(--navy)", "var(--amber)", "var(--green)", "var(--red)"];

/** The real first-year sequence. Desktop: vertical scroll drives a horizontal track. Mobile / reduced motion: a vertical list. */
export function FirstYear() {
  const locale = useLocale();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  const x = useTransform(smooth, [0, 1], ["0%", "-47%"]);
  const line = useTransform(smooth, [0, 1], [0.04, 1]);

  const title = (
    <h2 id="first-year-title" className="text-display-l text-ink">
      {pick(firstYear.title, locale)}
    </h2>
  );

  const card = (s: (typeof firstYear.steps)[number], i: number) => (
    <li key={i} className="relative">
      <span aria-hidden="true" className="absolute -top-[5px] left-0 size-[10px] rounded-full ring-4 ring-paper" style={{ background: COLORS[i] }} />
      <p className="pt-8 text-sm font-semibold text-ink-3">{pick(s.kicker, locale)}</p>
      <p className="mt-3 font-display text-[clamp(2.2rem,1.4rem+3.6vw,5rem)] font-medium leading-[1] tracking-tight text-ink">{pick(s.big, locale)}</p>
      <p className="mt-5 max-w-[34ch] text-ink-2">{pick(s.text, locale)}</p>
    </li>
  );

  return (
    <section aria-labelledby="first-year-title" className="border-y border-line bg-surface">
      {/* Mobile + reduced motion */}
      <div className={reduce ? "container-x py-24" : "container-x py-24 lg:hidden"}>
        {title}
        <ol className="mt-14 grid gap-14 border-t border-line sm:grid-cols-2">{firstYear.steps.map(card)}</ol>
      </div>

      {/* Desktop scroll-driven horizontal track */}
      {!reduce && (
        <div ref={ref} className="relative hidden h-[320vh] lg:block">
          <div className="sticky top-0 flex h-[100dvh] flex-col justify-center overflow-hidden">
            <div className="container-x">{title}</div>
            <div className="relative mt-16">
              <div className="container-x">
                <div className="relative h-px w-full bg-line">
                  <motion.div className="absolute inset-y-0 left-0 w-full origin-left bg-ink" style={{ scaleX: line }} />
                </div>
              </div>
              <motion.ol
                style={{ x, paddingLeft: "max(40px, calc((100vw - 1360px) / 2 + 40px))" }}
                className="-mt-px grid w-[190vw] grid-cols-4 gap-16 pr-10"
              >
                {firstYear.steps.map(card)}
              </motion.ol>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
