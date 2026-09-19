"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, Headphones, Mic, PencilLine, type LucideIcon } from "lucide-react";
import { useLocale } from "next-intl";
import { englishCopy, skills, type Skill } from "@/data/english";
import { arcPath, cn, pick, polar, ringSegment } from "@/lib/utils";
import { RING_END, RING_START } from "@/components/brand/Ring";

const icons: Record<Skill["id"], LucideIcon> = { reading: BookOpen, writing: PencilLine, listening: Headphones, speaking: Mic };

const C = 220;
const R_OUT = 200;
const R_IN = 128;
const GAP = 4;
const SPAN = (RING_END - RING_START - GAP * (skills.length - 1)) / skills.length;
const segs = skills.map((s, i) => {
  const from = RING_START + i * (SPAN + GAP);
  return { skill: s, from, to: from + SPAN, mid: from + SPAN / 2 };
});

/** Four skills as four segments of the open ring — a keyboard-accessible radio group. */
export function SkillsWheel() {
  const locale = useLocale();
  const c = englishCopy.skills;
  const [value, setValue] = useState<Skill["id"]>("speaking");
  const [focused, setFocused] = useState<Skill["id"] | null>(null);
  const refs = useRef<(SVGGElement | null)[]>([]);
  const current = skills.find((s) => s.id === value) ?? skills[0];
  const Icon = icons[current.id];

  const move = (i: number) => {
    const n = (i + skills.length) % skills.length;
    setValue(skills[n].id);
    refs.current[n]?.focus();
  };

  return (
    <section aria-labelledby="en-skills" className="bg-surface py-20 lg:py-28">
      <div className="container-x">
        <div className="max-w-2xl">
          <h2 id="en-skills" className="text-display-m text-ink">
            {pick(c.title, locale)}
          </h2>
          <p className="mt-4 text-ink-2">{pick(c.lead, locale)}</p>
        </div>

        <div className="mt-12 grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="mx-auto w-full max-w-[460px] lg:col-span-6 lg:mx-0">
            <svg viewBox="0 0 440 440" className="block h-auto w-full touch-manipulation select-none">
              <g role="radiogroup" aria-label={pick(c.groupLabel, locale)}>
                {segs.map(({ skill, from, to, mid }, i) => {
                  const on = skill.id === value;
                  const lp = polar(C, C, (R_OUT + R_IN) / 2, mid);
                  return (
                    <g
                      key={skill.id}
                      ref={(el) => {
                        refs.current[i] = el;
                      }}
                      role="radio"
                      aria-checked={on}
                      aria-label={pick(skill.label, locale)}
                      tabIndex={on ? 0 : -1}
                      onClick={() => setValue(skill.id)}
                      onFocus={(e) => setFocused(e.currentTarget.matches(":focus-visible") ? skill.id : null)}
                      onBlur={() => setFocused(null)}
                      onKeyDown={(e) => {
                        if (e.key === "ArrowRight" || e.key === "ArrowDown") move(i + 1);
                        else if (e.key === "ArrowLeft" || e.key === "ArrowUp") move(i - 1);
                        else if (e.key === "Home") move(0);
                        else if (e.key === "End") move(skills.length - 1);
                        else if (e.key === " " || e.key === "Enter") setValue(skill.id);
                        else return;
                        e.preventDefault();
                      }}
                      className="group cursor-pointer outline-none"
                    >
                      <path
                        d={ringSegment(C, C, R_OUT, R_IN, from, to)}
                        className={cn(
                          "transition-[fill] duration-300",
                          on ? "fill-navy" : "fill-paper stroke-line group-hover:fill-surface-2",
                        )}
                        strokeWidth={on ? 0 : 1.5}
                      />
                      {focused === skill.id && (
                        <path d={ringSegment(C, C, R_OUT + 5, R_IN - 5, from - 1.2, to + 1.2)} fill="none" stroke="var(--primary-ink)" strokeWidth="2.5" />
                      )}
                      <text
                        x={lp.x}
                        y={lp.y}
                        textAnchor="middle"
                        dominantBaseline="central"
                        className="pointer-events-none font-sans"
                        style={{ fontSize: 17, fontWeight: 700, fill: on ? "#ffffff" : "var(--ink)" }}
                      >
                        {pick(skill.label, locale)}
                      </text>
                    </g>
                  );
                })}
              </g>
              {/* amber marker on the outer edge of the chosen segment */}
              {segs.map(({ skill, from, to }) =>
                skill.id === value ? (
                  <motion.path
                    key={skill.id}
                    d={arcPath(C, C, R_OUT + 12, from, to)}
                    fill="none"
                    stroke="var(--amber)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    aria-hidden="true"
                  />
                ) : null,
              )}
              <foreignObject x={C - 70} y={C - 70} width="140" height="140" aria-hidden="true">
                <div className="flex h-full w-full flex-col items-center justify-center text-center">
                  <Icon className="size-8 text-ink" strokeWidth={1.6} />
                  <span className="mt-2 font-display text-[15px] text-ink" lang="en">
                    {current.name}
                  </span>
                </div>
              </foreignObject>
            </svg>
          </div>

          <div className="lg:col-span-5 lg:col-start-8" aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={current.id}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              >
                <h3 className="text-display-s text-ink">{pick(current.label, locale)}</h3>
                <p className="mt-4 text-body-l text-ink-2">{pick(current.summary, locale)}</p>
                <p className="mt-8 text-sm font-semibold text-ink-3">{pick(c.howLabel, locale)}</p>
                <ul className="mt-3 divide-y divide-line border-y border-line">
                  {pick(current.methods, locale).map((m) => (
                    <li key={m} className="flex items-center gap-3 py-3 text-ink">
                      <span aria-hidden="true" className="size-2 rounded-full bg-amber" />
                      {m}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
