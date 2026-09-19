"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useLocale } from "next-intl";
import { dormCopy, hotspots, roomPhoto } from "@/data/dorm";
import { cn, pick } from "@/lib/utils";
import { Photo } from "@/components/ui/Photo";

/**
 * Room photo with numbered hotspots. Each hotspot (and each row of the list) is a disclosure button
 * (aria-expanded) controlling one detail card. On md+ the card floats next to the hotspot; on small
 * screens it sits between the photo and the list.
 */
export function RoomTour() {
  const locale = useLocale();
  const c = dormCopy.tour;
  const [active, setActive] = useState<string | null>(null);
  const base = useId();
  const cardId = `${base}-card`;
  const wrapRef = useRef<HTMLDivElement>(null);
  const current = hotspots.find((h) => h.id === active) ?? null;

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        document.getElementById(`${base}-spot-${active}`)?.focus();
        setActive(null);
      }
    };
    const onDown = (e: PointerEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setActive(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [active, base]);

  const toggle = (id: string) => setActive((a) => (a === id ? null : id));
  const close = () => {
    if (active) document.getElementById(`${base}-spot-${active}`)?.focus();
    setActive(null);
  };
  const idx = current ? hotspots.indexOf(current) : -1;

  // Card placement on md+: open away from the nearest edge.
  const cardStyle = current
    ? ({
        "--cx": `${current.x}%`,
        "--cy": `${current.y}%`,
        "--tx": current.x > 50 ? "calc(-100% - 28px)" : "28px",
        "--ty": current.y > 60 ? "calc(-100% + 22px)" : "-22px",
      } as React.CSSProperties)
    : undefined;

  return (
    <section aria-labelledby={`${base}-title`} className="py-20 lg:py-32">
      <div ref={wrapRef} className="container-x grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-10">
        <div className="lg:col-span-5 lg:col-start-8 lg:row-start-1 lg:self-end">
          <h2 id={`${base}-title`} className="text-display-m text-ink">
            {pick(c.title, locale)}
          </h2>
          <p className="text-ink-2 mt-4 max-w-[46ch]">{pick(c.lead, locale)}</p>
        </div>

        <div className="lg:col-span-6 lg:col-start-1 lg:row-span-2 lg:row-start-1">
          <div className="frame mx-auto max-w-[540px] p-2.5 lg:mx-0">
            <div className="relative" style={{ aspectRatio: String(roomPhoto.ratio) }}>
              <Photo slot={roomPhoto} sizes="(min-width: 1024px) 520px, 92vw" className="h-full w-full rounded-[6px]" />

              {hotspots.map((h, i) => {
                const on = active === h.id;
                return (
                  <button
                    key={h.id}
                    id={`${base}-spot-${h.id}`}
                    type="button"
                    aria-expanded={on}
                    aria-controls={`${cardId} ${cardId}-sm`}
                    aria-label={`${i + 1}. ${pick(h.title, locale)}`}
                    onClick={() => toggle(h.id)}
                    className="group absolute flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full"
                    style={{ left: `${h.x}%`, top: `${h.y}%` }}
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        "flex size-8 items-center justify-center rounded-full text-[13px] font-semibold tabular-nums shadow-[0_4px_14px_rgb(0_0_0/0.25)] ring-2 transition-[transform,background-color,color] duration-200 group-hover:scale-110",
                        on ? "bg-ink text-paper ring-orange scale-110" : "bg-white text-[#0b1a33] ring-white/60",
                      )}
                    >
                      {i + 1}
                    </span>
                  </button>
                );
              })}

              {/* md+: floating card */}
              <AnimatePresence>
                {current && (
                  <motion.div
                    key={current.id}
                    id={cardId}
                    role="region"
                    aria-label={pick(current.title, locale)}
                    style={cardStyle}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute top-[var(--cy)] left-[var(--cx)] z-10 hidden w-[272px] md:block"
                  >
                    <div className="glass translate-x-[var(--tx)] translate-y-[var(--ty)] rounded-[16px] p-5 shadow-[0_18px_50px_rgb(var(--shadow)/0.16)]">
                      <CardBody
                        title={pick(current.title, locale)}
                        text={pick(current.text, locale)}
                        n={idx + 1}
                        closeLabel={pick(c.close, locale)}
                        onClose={close}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* small screens: card under the photo */}
          <div aria-live="polite" className="mx-auto max-w-[520px] md:hidden">
            {current && (
              <div id={cardId + "-sm"} className="glass mt-4 rounded-[16px] p-5">
                <CardBody
                  title={pick(current.title, locale)}
                  text={pick(current.text, locale)}
                  n={idx + 1}
                  closeLabel={pick(c.close, locale)}
                  onClose={close}
                />
              </div>
            )}
          </div>
        </div>
        <div className="lg:col-span-5 lg:col-start-8 lg:row-start-2">
          <h3 className="text-ink-3 font-sans text-sm font-semibold tracking-normal">{pick(c.listLabel, locale)}</h3>
          <ol className="divide-line border-line mt-3 divide-y border-y">
            {hotspots.map((h, i) => {
              const on = active === h.id;
              return (
                <li key={h.id}>
                  <button
                    type="button"
                    aria-expanded={on}
                    aria-controls={`${cardId} ${cardId}-sm`}
                    onClick={() => toggle(h.id)}
                    className="group flex min-h-12 w-full items-center gap-4 py-2.5 text-left"
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        "flex size-7 shrink-0 items-center justify-center rounded-full border text-xs font-semibold tabular-nums transition-colors",
                        on ? "border-ink bg-ink text-paper" : "border-line text-ink-2 group-hover:border-ink",
                      )}
                    >
                      {i + 1}
                    </span>
                    <span
                      className={cn(
                        "flex-1 font-medium transition-colors",
                        on ? "text-ink" : "text-ink-2 group-hover:text-ink",
                      )}
                    >
                      {pick(h.title, locale)}
                    </span>
                    <span
                      aria-hidden="true"
                      className={cn(
                        "h-px transition-[width,background-color] duration-300",
                        on ? "bg-orange w-8" : "bg-ink-3 w-0 group-hover:w-4",
                      )}
                    />
                  </button>
                </li>
              );
            })}
          </ol>
          <p className="text-ink-3 mt-6 max-w-[46ch] text-sm">{pick(c.note, locale)}</p>
        </div>
      </div>
    </section>
  );
}

function CardBody({
  title,
  text,
  n,
  closeLabel,
  onClose,
}: {
  title: string;
  text: string;
  n: number;
  closeLabel: string;
  onClose: () => void;
}) {
  return (
    <>
      <div className="flex items-start gap-3">
        <span aria-hidden="true" className="text-ink-3 mt-1 text-sm tabular-nums">
          {String(n).padStart(2, "0")}
        </span>
        <p className="text-ink flex-1 text-lg leading-snug font-semibold">{title}</p>
        <button
          type="button"
          onClick={onClose}
          aria-label={closeLabel}
          className="text-ink-2 hover:bg-surface-2 hover:text-ink -mt-2 -mr-2 flex size-11 shrink-0 items-center justify-center rounded-full"
        >
          <X className="size-4" strokeWidth={1.8} aria-hidden="true" />
        </button>
      </div>
      <p className="text-ink-2 mt-2 text-[15px] leading-relaxed">{text}</p>
    </>
  );
}
