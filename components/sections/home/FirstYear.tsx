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
    <span
      aria-hidden="true"
      className="border-ink/30 bg-paper absolute top-0 left-0 grid size-[15px] -translate-y-1/2 place-items-center rounded-full border"
    >
      <motion.span className="block size-[7px] rounded-full" style={{ background: COLORS[i], scale }} />
    </span>
  );
}

function StepBody({ s, i, locale }: { s: Step; i: number; locale: string }) {
  return (
    <>
      <p className="text-ink-3 flex items-baseline gap-3 text-sm">
        <span className="text-ink font-medium tabular-nums">0{i + 1}</span>
        <span>{pick(s.kicker, locale)}</span>
      </p>
      <p className="text-ink mt-4 text-[clamp(2.4rem,1.3rem+3.8vw,5.5rem)] leading-[0.98] font-light tracking-[-0.045em]">
        {pick(s.big, locale)}
      </p>
      <p className="text-ink-2 mt-6 max-w-[36ch]">{pick(s.text, locale)}</p>
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
      <h2 id="first-year-title" className="text-display-l text-ink mt-6">
        {pick(firstYear.title, locale)}
      </h2>
    </>
  );

  return (
    <section aria-labelledby="first-year-title">
      {/* Mobile + reduced motion: vertical timeline */}
      <div className={reduce ? "container-x py-24" : "container-x py-24 lg:hidden"}>
        {heading}
        <ol className="border-line relative mt-14 grid gap-14 border-l pl-8 sm:pl-10 lg:grid-cols-2 lg:gap-x-16">
          {firstYear.steps.map((s, i) => (
            <li key={i} className="relative">
              <span
                aria-hidden="true"
                className="border-ink/30 bg-paper absolute top-2.5 -left-8 grid size-[15px] -translate-x-1/2 place-items-center rounded-full border sm:-left-10"
              >
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
              <p aria-hidden="true" className="text-ink-3 pb-2 text-lg font-light tabular-nums">
                <motion.span className="text-ink">{counter}</motion.span> / 0{N}
              </p>
            </div>
            <div className="relative mt-20">
              <div className="container-x">
                <div className="bg-line relative h-px w-full">
                  <motion.div
                    className="bg-ink absolute inset-y-0 left-0 w-full origin-left"
                    style={{ scaleX: line }}
                  />
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
