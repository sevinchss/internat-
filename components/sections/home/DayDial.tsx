"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocale } from "next-intl";
import { day } from "@/data/home";
import { cn, pick, polar, ringSegment } from "@/lib/utils";

const C = 200; // centre
const R_OUT = 184;
const R_IN = 132;
const toDeg = (h: number) => (h / 24) * 360 - 90; // 00:00 at 12 o'clock
const fmt = (h: number) => {
  const hh = Math.floor(h % 24);
  const mm = Math.round((h % 1) * 60);
  return `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
};

/** A 24-hour dial (the ring motif as a clock). Hover, tap, or arrow keys to explore the day. */
export function DayDial() {
  const locale = useLocale();
  const [sel, setSel] = useState(2); // "Lessons"
  const refs = useRef<(SVGGElement | null)[]>([]);
  const slot = day.slots[sel];

  const move = (d: number) => {
    const n = (sel + d + day.slots.length) % day.slots.length;
    setSel(n);
    refs.current[n]?.focus();
  };

  return (
    <section aria-labelledby="day-title" className="relative overflow-hidden border-y border-line bg-surface py-24 lg:py-32">
      <div className="container-x grid items-center gap-14 lg:grid-cols-12">
        <div className="lg:order-2 lg:col-span-5 lg:col-start-8">
          <h2 id="day-title" className="text-display-l text-ink">
            {pick(day.title, locale)}
          </h2>
          <p className="mt-5 max-w-[48ch] text-body-l text-ink-2">{pick(day.lead, locale)}</p>

          <ol className="mt-10 border-t border-line">
            {day.slots.map((s, i) => (
              <li key={i}>
                <button
                  type="button"
                  onClick={() => setSel(i)}
                  onPointerEnter={(e) => e.pointerType === "mouse" && setSel(i)}
                  aria-pressed={sel === i}
                  className={cn("flex w-full items-center gap-4 border-b border-line py-2.5 text-left transition-colors", sel === i ? "text-ink" : "text-ink-2 hover:text-ink")}
                >
                  <span aria-hidden="true" className={cn("size-2 shrink-0 rounded-full transition-transform", sel === i && "scale-150")} style={{ background: s.color }} />
                  <span className="w-28 shrink-0 font-display text-sm tabular-nums">
                    {fmt(s.from)}–{fmt(s.to)}
                  </span>
                  <span className={cn("text-[15px]", sel === i && "font-semibold")}>{pick(s.title, locale)}</span>
                </button>
              </li>
            ))}
          </ol>
          <p className="mt-4 text-sm text-ink-3">{pick(day.note, locale)}</p>
        </div>

        <div className="lg:order-1 lg:col-span-7">
          <div className="relative mx-auto aspect-square w-full max-w-[560px]">
            <svg viewBox="0 0 400 400" className="size-full overflow-visible" role="group" aria-label={pick(day.title, locale)}>
              {/* hour ticks */}
              {Array.from({ length: 24 }, (_, h) => {
                const a = polar(C, C, R_OUT + 10, toDeg(h));
                const b = polar(C, C, R_OUT + (h % 6 === 0 ? 20 : 14), toDeg(h));
                return <line key={h} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="var(--ring)" strokeWidth={h % 6 === 0 ? 1.6 : 1} />;
              })}
              {[0, 6, 12, 18].map((h) => {
                const p = polar(C, C, R_OUT + 34, toDeg(h));
                return (
                  <text key={h} x={p.x} y={p.y} textAnchor="middle" dominantBaseline="central" className="fill-ink-3 font-display text-[11px]">
                    {String(h).padStart(2, "0")}
                  </text>
                );
              })}
              {day.slots.map((s, i) => {
                const on = sel === i;
                const gap = 0.6;
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
                      animate={{ opacity: on ? 1 : 0.28, scale: on ? 1.035 : 1 }}
                      style={{ originX: "200px", originY: "200px" }}
                      transition={{ type: "spring", stiffness: 260, damping: 24 }}
                    />
                  </g>
                );
              })}
            </svg>

            {/* centre readout */}
            <div className="pointer-events-none absolute inset-[26%] grid place-items-center text-center" aria-live="polite">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div key={sel} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
                  <p className="font-display text-[clamp(1.1rem,0.8rem+1.4vw,1.75rem)] tabular-nums text-ink">
                    {fmt(slot.from)}
                    <span className="text-ink-3">–{fmt(slot.to)}</span>
                  </p>
                  <p className="mt-2 text-[15px] font-bold leading-tight text-ink sm:text-lg">{pick(slot.title, locale)}</p>
                  <p className="mx-auto mt-2 max-w-[24ch] text-[13px] leading-snug text-ink-2 sm:text-sm">{pick(slot.text, locale)}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
