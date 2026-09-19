"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { useLocale } from "next-intl";
import { RING_END, RING_SEGMENTS, RING_START } from "@/components/brand/Ring";
import { useLenis } from "@/components/layout/SmoothScroll";
import { goals, missionCopy as c, type Goal } from "@/data/mission";
import { arcPath, cn, pick } from "@/lib/utils";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Six goals ↔ six ring segments.
 * lg+ with motion: a tall scroll container with a sticky stage; scroll progress picks the active goal.
 * Mobile / reduced motion: a plain stacked list, each goal with its own small arc.
 */
export function Goals() {
  const locale = useLocale();
  const reduce = useReducedMotion();
  return (
    <section aria-labelledby="goals-title">
      <div className="container-x pt-8 lg:pt-12">
        <div className="grid gap-6 lg:grid-cols-12">
          <h2 id="goals-title" className="text-display-l lg:col-span-5">
            {pick(c.goalsTitle, locale)}
          </h2>
          <p className="max-w-[52ch] text-body-l text-ink-2 lg:col-span-6 lg:col-start-7 lg:pt-3">{pick(c.goalsIntro, locale)}</p>
        </div>
      </div>
      {reduce ? (
        <GoalsStacked locale={locale} />
      ) : (
        <>
          <div className="hidden lg:block">
            <GoalsPinned locale={locale} />
          </div>
          <div className="lg:hidden">
            <GoalsStacked locale={locale} />
          </div>
        </>
      )}
    </section>
  );
}

/* ───────────── Pinned (desktop) ───────────── */

function GoalsPinned({ locale }: { locale: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const lenis = useLenis();
  const [active, setActive] = useState(0);
  const n = goals.length;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const i = Math.min(n - 1, Math.max(0, Math.floor(v * n)));
    setActive((prev) => (prev === i ? prev : i));
  });

  const jump = (i: number) => {
    const el = ref.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const travel = el.offsetHeight - window.innerHeight;
    const y = top + ((i + 0.5) / n) * travel;
    if (lenis) lenis.scrollTo(y, { duration: 1.1 });
    else window.scrollTo({ top: y, behavior: "smooth" });
  };

  const goal = goals[active];
  return (
    <div ref={ref} className="relative" style={{ height: `${n * 75 + 25}vh` }}>
      {/* all goals for assistive tech — the animated stage below is visual only */}
      <ol className="sr-only">
        {goals.map((g, i) => (
          <li key={i}>
            <h3>{pick(g.title, locale)}</h3>
            <p>{pick(g.text, locale)}</p>
            <ul>
              {pick(g.points, locale).map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>

      <div className="sticky top-0 flex h-dvh items-center pt-[var(--header-h)]">
        <div className="container-x grid grid-cols-12 items-center gap-10">
          <div className="col-span-5" aria-hidden="true">
            <GoalRing active={active} onSelect={jump} />
          </div>

          <div className="col-span-6 col-start-7">
            <div className="relative min-h-[380px]" aria-hidden="true">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <GoalBody goal={goal} index={active} locale={locale} size="lg" />
                </motion.div>
              </AnimatePresence>
            </div>

            <nav aria-label={pick(c.goalsTitle, locale)} className="mt-10 flex gap-2">
              {goals.map((g, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => jump(i)}
                  aria-current={i === active ? "step" : undefined}
                  aria-label={`${pick(c.jumpTo, locale)} ${i + 1}: ${pick(g.title, locale)}`}
                  className="group grid size-11 place-items-center rounded-full"
                >
                  <span
                    className={cn("h-1.5 rounded-full transition-all duration-300", i === active ? "w-8" : "w-3 bg-ring group-hover:bg-ink-3")}
                    style={i === active ? { backgroundColor: RING_SEGMENTS[i].color } : undefined}
                  />
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

function GoalRing({ active, onSelect }: { active: number; onSelect: (i: number) => void }) {
  return (
    <svg viewBox="0 0 400 400" className="mx-auto w-full max-w-[520px] overflow-visible">
      <circle cx="200" cy="200" r="140" fill="none" stroke="var(--line)" strokeWidth={1} />
      <path d={arcPath(200, 200, 196, RING_START, RING_END)} fill="none" stroke="var(--line)" strokeWidth={1} />
      <path d={arcPath(200, 200, 176, RING_START, RING_END)} fill="none" stroke="var(--line)" strokeWidth={1.5} />
      {RING_SEGMENTS.map((s, i) => {
        const on = i === active;
        const past = i < active;
        return (
          <path
            key={i}
            d={arcPath(200, 200, 176, s.from, s.to)}
            fill="none"
            stroke={on || past ? s.color : "var(--ring)"}
            strokeWidth={on ? 14 : 5}
            strokeOpacity={on ? 1 : past ? 0.45 : 1}
            onClick={() => onSelect(i)}
            className="cursor-pointer transition-[stroke,stroke-width,stroke-opacity] duration-500 ease-out"
          />
        );
      })}
      <text x="200" y="214" textAnchor="middle" className="fill-ink font-display" style={{ fontSize: 84, fontWeight: 300, letterSpacing: "-0.05em" }}>
        {pad(active + 1)}
      </text>
      <text x="200" y="254" textAnchor="middle" className="fill-ink-3 font-display" style={{ fontSize: 16, fontWeight: 400, letterSpacing: "0.02em" }}>
        / {pad(RING_SEGMENTS.length)}
      </text>
    </svg>
  );
}

function GoalBody({ goal, index, locale, size }: { goal: Goal; index: number; locale: string; size: "lg" | "sm" }) {
  const color = RING_SEGMENTS[index].color;
  const Title = size === "lg" ? "p" : "h3";
  return (
    <>
      <p className="flex items-center gap-3 text-[15px] font-medium tabular-nums text-ink-2">
        <span className="h-px w-10" style={{ backgroundColor: color }} aria-hidden="true" />
        {pick(c.goalOf, locale)} {pad(index + 1)}
      </p>
      <Title className={cn("mt-4 font-display font-medium text-ink", size === "lg" ? "text-display-m" : "text-display-s")}>{pick(goal.title, locale)}</Title>
      <p className={cn("mt-5 text-ink-2", size === "lg" && "text-body-l")}>{pick(goal.text, locale)}</p>
      <ul className="mt-6 space-y-2">
        {pick(goal.points, locale).map((p) => (
          <li key={p} className="flex gap-3 text-ink">
            <span className="mt-[0.55em] size-2 shrink-0 rounded-full border-2" style={{ borderColor: color }} aria-hidden="true" />
            {p}
          </li>
        ))}
      </ul>
    </>
  );
}

/* ───────────── Stacked (mobile / reduced motion) ───────────── */

function GoalsStacked({ locale }: { locale: string }) {
  return (
    <ol className="container-x mt-12 pb-20 lg:mt-16 lg:grid lg:grid-cols-2 lg:gap-x-16 lg:pb-28">
      {goals.map((g, i) => (
        <li key={i} className="grid grid-cols-[64px_1fr] gap-5 border-t border-line py-8 sm:grid-cols-[88px_1fr] sm:gap-8">
          <MiniRing index={i} />
          <div>
            <GoalBody goal={g} index={i} locale={locale} size="sm" />
          </div>
        </li>
      ))}
    </ol>
  );
}

function MiniRing({ index }: { index: number }) {
  const s = RING_SEGMENTS[index];
  return (
    <svg viewBox="0 0 88 88" className="w-full" aria-hidden="true">
      <path d={arcPath(44, 44, 36, RING_START, RING_END)} fill="none" stroke="var(--ring)" strokeWidth={1} />
      <path d={arcPath(44, 44, 36, s.from, s.to)} fill="none" stroke={s.color} strokeWidth={4} strokeLinecap="round" />
      <text x="44" y="51" textAnchor="middle" className="fill-ink font-display" style={{ fontSize: 20, fontWeight: 300 }}>
        {pad(index + 1)}
      </text>
    </svg>
  );
}
