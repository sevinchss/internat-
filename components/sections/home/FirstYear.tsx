"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { useLocale } from "next-intl";
import { firstYear, labels } from "@/data/home";
import { pick } from "@/lib/utils";
import { SectionLabel } from "./SectionLabel";

const COLORS = ["var(--navy)", "var(--amber)", "var(--green)", "var(--red)"];
const N = firstYear.steps.length;
type Step = (typeof firstYear.steps)[number];

/** A step's marker on the line: hairline ring, filled with its colour once the progress line reaches it. */
function Dot({ i, progress }: { i: number; progress: MotionValue<number> }) {
  const at = (i / (N - 1)) * 0.92;
  const scale = useTransform(progress, [Math.max(0, at - 0.04), at + 0.02], [0, 1]);
  return (
    <span aria-hidden="true" className="absolute left-0 top-0 grid size-[15px] -translate-y-1/2 place-items-center rounded-full border border-ink/30 bg-paper">
      <motion.span className="block size-[7px] rounded-full" style={{ background: COLORS[i], scale }} />
    </span>
  );
}

function StepBody({ s, i, locale }: { s: Step; i: number; locale: string }) {
  return (
    <>
      <p className="flex items-baseline gap-3 text-sm text-ink-3">
        <span className="font-medium text-ink tabular-nums">0{i + 1}</span>
        <span>{pick(s.kicker, locale)}</span>
      </p>
      <p className="mt-4 text-[clamp(2.4rem,1.3rem+3.8vw,5.5rem)] font-light leading-[0.98] tracking-[-0.045em] text-ink">{pick(s.big, locale)}</p>
      <p className="mt-6 max-w-[36ch] text-ink-2">{pick(s.text, locale)}</p>
    </>
  );
}

/** The real first-year sequence. Desktop: vertical scroll drives a horizontal track. Mobile / reduced motion: a vertical timeline. */
export function FirstYear() {
  const locale = useLocale();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  const x = useTransform(smooth, [0, 1], ["0%", "-47%"]);
  const line = useTransform(smooth, [0, 1], [0.02, 1]);
  const counter = useTransform(smooth, (v) => `0${Math.min(N, Math.floor(v * N * 0.999) + 1)}`);

  const heading = (
    <>
      <SectionLabel n="02">{pick(labels.firstYear, locale)}</SectionLabel>
      <h2 id="first-year-title" className="mt-6 text-display-l text-ink">
        {pick(firstYear.title, locale)}
      </h2>
    </>
  );

  return (
    <section aria-labelledby="first-year-title">
      {/* Mobile + reduced motion: vertical timeline */}
      <div className={reduce ? "container-x py-24" : "container-x py-24 lg:hidden"}>
        {heading}
        <ol className="relative mt-14 grid gap-14 border-l border-line pl-8 sm:pl-10 lg:grid-cols-2 lg:gap-x-16">
          {firstYear.steps.map((s, i) => (
            <li key={i} className="relative">
              <span aria-hidden="true" className="absolute -left-8 top-2.5 grid size-[15px] -translate-x-1/2 place-items-center rounded-full border border-ink/30 bg-paper sm:-left-10">
                <span className="block size-[7px] rounded-full" style={{ background: COLORS[i] }} />
              </span>
              <StepBody s={s} i={i} locale={locale} />
            </li>
          ))}
        </ol>
      </div>

      {/* Desktop scroll-driven horizontal track */}
      {!reduce && (
        <div ref={ref} className="relative hidden h-[300vh] lg:block">
          <div className="sticky top-0 flex h-[100dvh] flex-col justify-center overflow-hidden">
            <div className="container-x flex items-end justify-between gap-10">
              <div>{heading}</div>
              <p aria-hidden="true" className="pb-2 text-lg font-light tabular-nums text-ink-3">
                <motion.span className="text-ink">{counter}</motion.span> / 0{N}
              </p>
            </div>
            <div className="relative mt-20">
              <div className="container-x">
                <div className="relative h-px w-full bg-line">
                  <motion.div className="absolute inset-y-0 left-0 w-full origin-left bg-ink" style={{ scaleX: line }} />
                </div>
              </div>
              <motion.ol
                style={{ x, paddingLeft: "max(40px, calc((100vw - 1360px) / 2 + 40px))" }}
                className="-mt-px grid w-[190vw] grid-cols-4 gap-20 pr-10"
              >
                {firstYear.steps.map((s, i) => (
                  <li key={i} className="relative pt-12">
                    <Dot i={i} progress={smooth} />
                    <StepBody s={s} i={i} locale={locale} />
                  </li>
                ))}
              </motion.ol>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
