"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocale } from "next-intl";
import { day, labels } from "@/data/home";
import { cn, pick, polar, ringSegment } from "@/lib/utils";
import { SectionLabel } from "./SectionLabel";

const C = 200; // centre
const R_OUT = 176;
const R_IN = 156;
const R_HUB = R_IN - 26; // inner hairline circle the hand's dot runs along
const toDeg = (h: number) => (h / 24) * 360 - 90; // 00:00 at 12 o'clock
const fmt = (h: number) => {
  const hh = Math.floor(h % 24);
  const mm = Math.round((h % 1) * 60);
  return `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
};

/** A 24-hour dial (the ring motif as a clock). Hover, tap, or arrow keys to explore the day; a hand points at the slot. */
export function DayDial() {
  const locale = useLocale();
  const [sel, setSel] = useState(2); // "Lessons"
  const refs = useRef<(SVGGElement | null)[]>([]);
  const slot = day.slots[sel];
  const handDeg = ((slot.from + slot.to) / 2 / 24) * 360;

  const move = (d: number) => {
    const n = (sel + d + day.slots.length) % day.slots.length;
    setSel(n);
    refs.current[n]?.focus();
  };

  return (
    <section aria-labelledby="day-title" className="relative overflow-x-clip py-28 lg:py-40">
      <div className="container-x grid items-center gap-16 lg:grid-cols-12">
        <div className="lg:order-2 lg:col-span-5 lg:col-start-8">
          <SectionLabel n="04">{pick(labels.day, locale)}</SectionLabel>
          <h2 id="day-title" className="text-display-l text-ink mt-6">
            {pick(day.title, locale)}
          </h2>
          <p className="text-body-l text-ink-2 mt-6 max-w-[48ch]">{pick(day.lead, locale)}</p>

          <ol className="mt-10">
            {day.slots.map((s, i) => (
              <li key={i}>
                <button
                  type="button"
                  onClick={() => setSel(i)}
                  onPointerEnter={(e) => e.pointerType === "mouse" && setSel(i)}
                  aria-pressed={sel === i}
                  className={cn(
                    "border-line relative flex min-h-11 w-full items-center gap-4 border-b py-2 text-left transition-colors",
                    sel === i ? "text-ink" : "text-ink-2 hover:text-ink",
                  )}
                >
                  <span aria-hidden="true" className="text-ink-3 w-[6.5rem] shrink-0 text-[13px] tabular-nums">
                    {fmt(s.from)}–{fmt(s.to)}
                  </span>
                  <span
                    className={cn(
                      "text-[15px] transition-transform duration-300",
                      sel === i && "translate-x-1 font-medium",
                    )}
                  >
                    <span className="sr-only">
                      {fmt(s.from)}–{fmt(s.to)}{" "}
                    </span>
                    {pick(s.title, locale)}
                  </span>
                  <span
                    aria-hidden="true"
                    className={cn("ml-auto h-px shrink-0 transition-[width] duration-500", sel === i ? "w-10" : "w-0")}
                    style={{ background: s.color }}
                  />
                </button>
              </li>
            ))}
          </ol>
          <p className="text-ink-3 mt-4 text-sm">{pick(day.note, locale)}</p>
        </div>

        <div className="lg:order-1 lg:col-span-7">
          <div className="relative mx-auto aspect-square w-[calc(100%-56px)] max-w-[540px]">
            <svg
              viewBox="0 0 400 400"
              className="size-full overflow-visible"
              role="group"
              aria-label={pick(day.title, locale)}
            >
              {/* quarter-hour ticks, hour ticks longer */}
              {Array.from({ length: 96 }, (_, q) => {
                const h = q / 4;
                const major = q % 4 === 0;
                const a = polar(C, C, R_OUT + 8, toDeg(h));
                const b = polar(C, C, R_OUT + (q % 24 === 0 ? 20 : major ? 14 : 11), toDeg(h));
                return (
                  <line
                    key={q}
                    x1={a.x}
                    y1={a.y}
                    x2={b.x}
                    y2={b.y}
                    stroke={major ? "var(--ink-3)" : "var(--ring)"}
                    strokeWidth={major ? 0.9 : 0.6}
                  />
                );
              })}
              {[0, 6, 12, 18].map((h) => {
                const p = polar(C, C, R_OUT + 34, toDeg(h));
                return (
                  <text
                    key={h}
                    x={p.x}
                    y={p.y}
                    textAnchor="middle"
                    dominantBaseline="central"
                    className="fill-ink-3 text-[11px]"
                  >
                    {String(h).padStart(2, "0")}
                  </text>
                );
              })}
              <circle cx={C} cy={C} r={R_HUB} fill="none" stroke="var(--line)" strokeWidth="1" />
              {day.slots.map((s, i) => {
                const on = sel === i;
                const gap = 0.7;
                return (
                  <g
                    key={i}
                    ref={(el) => {
                      refs.current[i] = el;
                    }}
                    role="button"
                    tabIndex={on ? 0 : -1}
                    aria-pressed={on}
                    aria-label={`${fmt(s.from)}–${fmt(s.to)} ${pick(s.title, locale)}`}
                    onClick={() => setSel(i)}
                    onPointerEnter={(e) => e.pointerType === "mouse" && setSel(i)}
                    onKeyDown={(e) => {
                      if (e.key === "ArrowRight" || e.key === "ArrowDown") move(1);
                      else if (e.key === "ArrowLeft" || e.key === "ArrowUp") move(-1);
                      else return;
                      e.preventDefault();
                    }}
                    className="cursor-pointer outline-none [&:focus-visible>path]:stroke-[var(--primary-ink)] [&:focus-visible>path]:stroke-2"
                  >
                    <motion.path
                      d={ringSegment(C, C, R_OUT, R_IN, toDeg(s.from) + gap, toDeg(s.to) - gap)}
                      fill={s.color}
                      initial={false}
                      animate={{ opacity: on ? 1 : 0.2 }}
                      transition={{ duration: 0.35 }}
                    />
                  </g>
                );
              })}
            </svg>

            {/* the hand: turns to the middle of the selected slot */}
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              initial={false}
              animate={{ rotate: handDeg }}
              transition={{ type: "spring", stiffness: 70, damping: 18 }}
            >
              <span
                className="bg-ink/60 absolute left-1/2 w-px -translate-x-1/2"
                style={{ top: `${((C - R_IN + 3) / 400) * 100}%`, height: `${((R_IN - 3 - R_HUB) / 400) * 100}%` }}
              />
              <span
                className="bg-ink ring-paper absolute left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full ring-4"
                style={{ top: `${((C - R_HUB) / 400) * 100}%` }}
              />
            </motion.div>

            {/* centre readout */}
            <div
              className="pointer-events-none absolute inset-[27%] grid place-items-center text-center"
              aria-live="polite"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={sel}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                >
                  <p className="text-ink text-[clamp(1.25rem,0.9rem+1.5vw,2rem)] leading-none font-light tracking-[-0.04em] tabular-nums">
                    {fmt(slot.from)}
                    <span className="text-ink-3">–{fmt(slot.to)}</span>
                  </p>
                  <p className="text-ink mt-3 text-[15px] leading-tight font-semibold sm:text-lg">
                    {pick(slot.title, locale)}
                  </p>
                  <p className="text-ink-2 mx-auto mt-2 hidden max-w-[24ch] text-sm leading-snug sm:block">
                    {pick(slot.text, locale)}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
