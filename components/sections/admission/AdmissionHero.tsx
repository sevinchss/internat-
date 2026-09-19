"use client";

import { motion, useReducedMotion } from "framer-motion";
import { RING_END, RING_SEGMENTS, RING_START } from "@/components/brand/Ring";
import { arcPath } from "@/lib/utils";
import { Countdown } from "./Countdown";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Hero: title + lead on the left, the status "dial" on the right.
 * Motion moment: the ring draws itself, then its six landmark segments land one by one.
 * If `opensAt` is set (data/admission.ts), a live countdown replaces the status line.
 */
export function AdmissionHero({
  title,
  lead,
  status,
  statusNote,
  year,
  lastRound,
  lastRoundDates,
  portalsLabel,
  opensAt,
  countdown,
}: {
  title: string;
  lead: string;
  status: string;
  statusNote: string;
  year: string;
  lastRound: string;
  lastRoundDates: string;
  portalsLabel: string;
  opensAt: string | null;
  countdown: { title: string; openText: string; units: { days: string; hours: string; minutes: string } };
}) {
  const reduce = useReducedMotion();
  const rise = (delay: number) =>
    reduce
      ? {}
      : { initial: { opacity: 0, y: 22 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, ease, delay } };

  return (
    <section className="container-x pt-32 pb-16 sm:pt-36 lg:pb-24">
      <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-10">
        <div className="lg:col-span-7">
          <motion.h1 {...rise(0)} className="text-display-xl">
            {title}
          </motion.h1>
          <motion.p {...rise(0.1)} className="text-body-l text-ink-2 mt-6 max-w-[52ch]">
            {lead}
          </motion.p>
          <motion.p {...rise(0.18)} className="mt-8">
            <a
              href="#portallar"
              className="text-primary-ink decoration-line hover:decoration-primary-ink inline-flex min-h-11 items-center font-semibold underline decoration-2 underline-offset-[6px]"
            >
              {portalsLabel}
            </a>
          </motion.p>
        </div>

        <div className="lg:col-span-5">
          <div className="relative mx-auto aspect-square w-full max-w-[420px]">
            <svg viewBox="0 0 200 200" aria-hidden="true" className="absolute inset-0 size-full">
              <motion.path
                d={arcPath(100, 100, 92, RING_START, RING_END)}
                fill="none"
                stroke="var(--ring)"
                strokeWidth="1.5"
                initial={reduce ? false : { pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.3, ease }}
              />
              {RING_SEGMENTS.map((s, i) => (
                <motion.path
                  key={s.from}
                  d={arcPath(100, 100, 92, s.from, s.to)}
                  fill="none"
                  stroke={s.color}
                  strokeWidth="4"
                  initial={reduce ? false : { pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.45, ease, delay: 0.9 + i * 0.1 }}
                />
              ))}
            </svg>
            <motion.div
              {...rise(0.4)}
              className="absolute inset-[16%] flex flex-col items-center justify-center text-center"
            >
              {opensAt ? (
                <Countdown
                  target={opensAt}
                  title={countdown.title}
                  openText={countdown.openText}
                  units={countdown.units}
                />
              ) : (
                <>
                  <span className="text-ink text-[clamp(2.25rem,1.5rem+3vw,3.6rem)] leading-none font-light tracking-[-0.045em] tabular-nums">
                    {year}
                  </span>
                  <span className="text-ink-2 mt-4 inline-flex items-center gap-2 text-sm font-medium">
                    <span aria-hidden="true" className="bg-ink-3 h-px w-4" />
                    {lastRound}: {lastRoundDates}
                  </span>
                </>
              )}
            </motion.div>
          </div>
          <motion.div {...rise(0.55)} className="border-primary-ink mx-auto mt-6 max-w-[420px] border-l pl-5">
            {!opensAt && <p className="text-ink text-lg leading-snug font-semibold sm:text-xl">{status}</p>}
            <p className={opensAt ? "text-ink-2" : "text-ink-2 mt-2"}>{statusNote}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
