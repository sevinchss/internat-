"use client";

import { useSyncExternalStore } from "react";

// A tiny shared clock: ticks every 15s (the countdown shows minutes, so this is plenty and cheap).
const TICK = 15_000;
function subscribe(cb: () => void) {
  const id = setInterval(cb, TICK);
  return () => clearInterval(id);
}
const getSnapshot = () => Math.floor(Date.now() / TICK) * TICK;
const getServerSnapshot = () => null;

export function useNow() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/** Live days / hours / minutes until `target`. Renders dashes on the server, real numbers after hydration. */
export function Countdown({
  target,
  title,
  openText,
  units,
}: {
  target: string;
  title: string;
  openText: string;
  units: { days: string; hours: string; minutes: string };
}) {
  const now = useNow();
  const diff = now === null ? null : new Date(target).getTime() - now;

  if (diff !== null && diff <= 0) {
    return <p className="font-display text-display-s text-ink">{openText}</p>;
  }

  const parts =
    diff === null
      ? null
      : {
          days: Math.floor(diff / 86_400_000),
          hours: Math.floor((diff % 86_400_000) / 3_600_000),
          minutes: Math.floor((diff % 3_600_000) / 60_000),
        };
  const cells: { key: keyof typeof units; value: string }[] = (["days", "hours", "minutes"] as const).map((k) => ({
    key: k,
    value: parts ? String(parts[k]).padStart(k === "days" ? 1 : 2, "0") : "–",
  }));

  return (
    <div>
      <p className="text-[15px] font-semibold text-ink-2">{title}</p>
      <p className="sr-only" aria-live="off">
        {parts ? `${parts.days} ${units.days}, ${parts.hours} ${units.hours}, ${parts.minutes} ${units.minutes}` : ""}
      </p>
      <dl aria-hidden="true" className="mt-4 grid grid-cols-3 divide-x divide-line rounded-[20px] border border-line bg-surface">
        {cells.map((c) => (
          <div key={c.key} className="flex flex-col-reverse items-center px-2 py-4">
            <dt className="mt-1 text-sm text-ink-3">{units[c.key]}</dt>
            <dd className="font-display text-display-m tabular-nums text-ink">{c.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
