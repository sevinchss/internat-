"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useLocale } from "next-intl";
import { englishClubs, englishCopy } from "@/data/english";
import { cn, pick } from "@/lib/utils";
import { Photo } from "@/components/ui/Photo";

/**
 * Horizontal scroll-snap row of large club cards. Works with touch swipe, trackpad, mouse drag,
 * the prev/next buttons, and the keyboard (the row itself is focusable → arrow keys scroll it).
 */
export function ClubsScroller() {
  const locale = useLocale();
  const c = englishCopy.clubs;
  const ref = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; left: number; moved: boolean } | null>(null);
  const [edges, setEdges] = useState({ start: true, end: false });
  const [dragging, setDragging] = useState(false);

  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    setEdges({ start: el.scrollLeft <= 4, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4 });
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [update]);

  const step = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("li");
    const w = card ? card.offsetWidth + 20 : el.clientWidth * 0.8;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * w, behavior: reduce ? "auto" : "smooth" });
  };

  // Mouse drag (touch & pen already scroll natively)
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || e.button !== 0 || !ref.current) return;
    drag.current = { x: e.clientX, left: ref.current.scrollLeft, moved: false };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    const el = ref.current;
    if (!d || !el) return;
    const dx = e.clientX - d.x;
    if (!d.moved && Math.abs(dx) > 5) {
      d.moved = true;
      setDragging(true);
      el.setPointerCapture(e.pointerId);
    }
    if (d.moved) el.scrollLeft = d.left - dx;
  };
  const endDrag = (e: React.PointerEvent) => {
    const d = drag.current;
    drag.current = null;
    if (d?.moved && ref.current?.hasPointerCapture(e.pointerId)) ref.current.releasePointerCapture(e.pointerId);
    setDragging(false);
  };

  const pad = "max(var(--pad), calc((100% - 1360px) / 2 + var(--pad)))";

  return (
    <section aria-labelledby="en-clubs" className="py-20 lg:py-28">
      <div className="container-x flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 id="en-clubs" className="text-display-m text-ink">
            {pick(c.title, locale)}
          </h2>
          <p className="text-ink-2 mt-4 max-w-[44ch]">{pick(c.lead, locale)}</p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => step(-1)}
            disabled={edges.start}
            aria-label={pick(c.prev, locale)}
            aria-controls="en-clubs-row"
            className="border-line text-ink hover:border-ink disabled:hover:border-line flex size-12 items-center justify-center rounded-full border transition-colors disabled:cursor-default disabled:opacity-40"
          >
            <ArrowLeft className="size-5" strokeWidth={1.8} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            disabled={edges.end}
            aria-label={pick(c.next, locale)}
            aria-controls="en-clubs-row"
            className="border-line text-ink hover:border-ink disabled:hover:border-line flex size-12 items-center justify-center rounded-full border transition-colors disabled:cursor-default disabled:opacity-40"
          >
            <ArrowRight className="size-5" strokeWidth={1.8} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div
        id="en-clubs-row"
        ref={ref}
        tabIndex={0}
        role="region"
        aria-label={pick(c.regionLabel, locale)}
        onScroll={update}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        data-lenis-prevent-wheel=""
        className={cn(
          "no-scrollbar mt-12 overflow-x-auto pb-4 [--pad:16px] sm:[--pad:28px] lg:[--pad:40px]",
          dragging ? "cursor-grabbing snap-none select-none" : "cursor-grab snap-x snap-mandatory",
          "focus-visible:outline-offset-[-4px]",
        )}
        style={{ paddingInline: pad, scrollPaddingInline: pad }}
      >
        <ul className="flex w-max gap-5">
          {englishClubs.map((club, i) => (
            <li key={club.id} className="w-[80vw] max-w-[460px] shrink-0 snap-start sm:w-[420px] lg:w-[460px]">
              <article>
                <div className="relative">
                  <Photo
                    slot={club.photo}
                    sizes="(min-width: 640px) 460px, 80vw"
                    className="aspect-[4/5] rounded-[24px] [&_img]:pointer-events-none"
                  />
                  <span
                    aria-hidden="true"
                    className="bg-paper/92 font-display text-ink absolute top-4 left-4 rounded-full px-3 py-1 text-sm tabular-nums backdrop-blur-sm"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="text-display-s text-ink mt-5">{pick(club.name, locale)}</h3>
                <p className="text-ink-2 mt-2 max-w-[40ch]">{pick(club.text, locale)}</p>
                <p className="text-ink-3 mt-3 flex items-center gap-2 text-sm font-semibold">
                  <span aria-hidden="true" className="bg-amber size-1.5 rounded-full" />
                  {pick(club.when, locale)}
                </p>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
