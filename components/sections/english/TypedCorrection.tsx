"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import { corrections, finalSentence, type Correction } from "@/data/english";
import { cn, pick } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/components/ui/usePrefersReducedMotion";

/**
 * The hero's one moment: a sentence is typed, the mistake is marked, struck through and corrected;
 * two examples play ONCE, then the final sentence is typed and stays. Screen readers only get the final
 * sentence (the animated copy is aria-hidden). Reduced motion: the final sentence, static.
 */
type Frame =
  | { k: "type"; s: number; n: number }
  | { k: "mark"; s: number }
  | { k: "strike"; s: number }
  | { k: "fix"; s: number; n: number }
  | { k: "clean"; s: number }
  | { k: "erase"; s: number; n: number }
  | { k: "final"; n: number };

type Step = { f: Frame; ms: number };

const typeDelay = (ch: string) => (ch === " " ? 70 : /[.,’]/.test(ch) ? 160 : 52);

function buildTimeline(): Step[] {
  const steps: Step[] = [{ f: { k: "type", s: 0, n: 0 }, ms: 700 }];
  corrections.forEach((c, s) => {
    const full = c.before + c.wrong + c.after;
    if (s > 0) steps.push({ f: { k: "type", s, n: 0 }, ms: 350 });
    for (let n = 1; n <= full.length; n++) steps.push({ f: { k: "type", s, n }, ms: typeDelay(full[n - 1]) });
    steps[steps.length - 1].ms = 700;
    steps.push({ f: { k: "mark", s }, ms: 750 });
    steps.push({ f: { k: "strike", s }, ms: 450 });
    for (let n = 1; n <= c.right.length; n++) steps.push({ f: { k: "fix", s, n }, ms: 70 });
    steps[steps.length - 1].ms = 1000;
    steps.push({ f: { k: "clean", s }, ms: 1100 });
    const fixed = c.before + c.right + c.after;
    for (let n = fixed.length - 2; n >= 0; n -= 2) steps.push({ f: { k: "erase", s, n: Math.max(0, n) }, ms: 16 });
  });
  steps.push({ f: { k: "final", n: 0 }, ms: 400 });
  for (let n = 1; n <= finalSentence.length; n++)
    steps.push({ f: { k: "final", n }, ms: typeDelay(finalSentence[n - 1]) });
  return steps;
}

const timeline = buildTimeline();
const LAST = timeline.length - 1;

const caretClass =
  "ml-[0.04em] inline-block h-[0.95em] w-[3px] translate-y-[0.12em] rounded-full bg-amber align-baseline";

/** While typing: solid caret. At rest: blinks a few times, then fades away (no endless loop). */
function Caret({ rest }: { rest?: boolean }) {
  if (!rest) return <span aria-hidden="true" className={caretClass} />;
  return (
    <motion.span
      aria-hidden="true"
      className={caretClass}
      initial={{ opacity: 1 }}
      animate={{ opacity: [1, 0, 1, 0, 1, 0, 1, 0] }}
      transition={{ duration: 4.2, ease: "linear", times: [0, 0.12, 0.25, 0.37, 0.5, 0.62, 0.75, 1] }}
    />
  );
}

/** Slice a sentence across its three parts, keeping the "wrong" part in its own span. */
function Typed({ c, n, caret }: { c: Correction; n: number; caret: boolean }) {
  const a = c.before.slice(0, n);
  const b = c.wrong.slice(0, Math.max(0, n - c.before.length));
  const d = c.after.slice(0, Math.max(0, n - c.before.length - c.wrong.length));
  return (
    <>
      {a}
      {b}
      {d}
      {caret && <Caret />}
    </>
  );
}

function Wrong({ children, struck }: { children: React.ReactNode; struck?: boolean }) {
  return (
    <span className="relative inline-block">
      <span className={cn("transition-colors duration-300", struck ? "text-ink-3" : "text-ink")}>{children}</span>
      {/* wavy "check this" underline, then a strike line drawn across */}
      <span
        className={cn(
          "absolute inset-x-0 -bottom-[0.08em] h-[0.12em] transition-opacity duration-300",
          struck ? "opacity-0" : "opacity-100",
        )}
      >
        <svg viewBox="0 0 40 6" preserveAspectRatio="none" className="h-full w-full">
          <path
            d="M0 3 Q2.5 0 5 3 T10 3 T15 3 T20 3 T25 3 T30 3 T35 3 T40 3"
            fill="none"
            stroke="var(--amber)"
            strokeWidth="1.6"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </span>
      <span
        className="bg-accent-ink absolute top-[55%] right-[-0.04em] left-[-0.04em] h-[0.08em] origin-left rounded-full transition-transform duration-[450ms] ease-out"
        style={{ transform: `scaleX(${struck ? 1 : 0})` }}
      />
    </span>
  );
}

export function TypedCorrection({ exampleLabel }: { exampleLabel: string }) {
  const locale = useLocale();
  const reduce = usePrefersReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (reduce || i >= LAST) return;
    const id = window.setTimeout(() => setI((x) => x + 1), timeline[i].ms);
    return () => window.clearTimeout(id);
  }, [i, reduce]);

  const f: Frame = reduce ? { k: "final", n: finalSentence.length } : timeline[i].f;
  const c = f.k !== "final" ? corrections[f.s] : null;
  const showRule = f.k === "mark" || f.k === "strike" || f.k === "fix" || f.k === "clean";

  let line: React.ReactNode;
  if (f.k === "final") {
    line = (
      <>
        {finalSentence.slice(0, f.n)}
        {!reduce && <Caret rest={f.n === finalSentence.length} />}
      </>
    );
  } else if (c && f.k === "type") {
    line = <Typed c={c} n={f.n} caret />;
  } else if (c && (f.k === "mark" || f.k === "strike")) {
    line = (
      <>
        {c.before}
        <Wrong struck={f.k === "strike"}>{c.wrong}</Wrong>
        {c.after}
      </>
    );
  } else if (c && f.k === "fix") {
    line = (
      <>
        {c.before}
        <Wrong struck>{c.wrong}</Wrong> <span className="text-accent-ink">{c.right.slice(0, f.n)}</span>
        <Caret />
        {c.after}
      </>
    );
  } else if (c && f.k === "clean") {
    line = (
      <>
        {c.before}
        <span className="decoration-amber underline decoration-[0.07em] underline-offset-[0.14em]">{c.right}</span>
        {c.after}
      </>
    );
  } else if (c && f.k === "erase") {
    line = (
      <>
        {(c.before + c.right + c.after).slice(0, f.n)}
        <Caret />
      </>
    );
  }

  return (
    <div className="relative">
      <p className="sr-only">{finalSentence}</p>
      <div aria-hidden="true" lang="en">
        <p className="text-ink-3 flex items-center gap-3 text-sm font-medium">
          <span className="bg-amber h-px w-8" />
          {exampleLabel}
        </p>
        <p className="font-display text-display-l text-ink mt-5 min-h-[3.25em] [text-wrap:pretty] md:min-h-[2.2em]">
          {line}
        </p>
        <p
          className={cn(
            "text-ink-2 mt-4 inline-flex min-h-9 items-center gap-2.5 text-sm font-medium transition-opacity duration-300",
            showRule && c ? "opacity-100" : "opacity-0",
          )}
        >
          <span className="bg-amber h-px w-5" />
          {c ? pick(c.rule, locale) : " "}
        </p>
      </div>
    </div>
  );
}
