"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type AccordionItem = { q: string; a: string };

/** FAQ accordion — buttons with aria-expanded / region, one open at a time. */
export function Accordion({ items, className, accent = "var(--primary-ink)" }: { items: AccordionItem[]; className?: string; accent?: string }) {
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();
  return (
    <ul className={cn("divide-y divide-line border-y border-line", className)}>
      {items.map((it, i) => {
        const isOpen = open === i;
        const id = `${base}-${i}`;
        return (
          <li key={i}>
            <h3 className="font-sans text-base font-semibold tracking-normal sm:text-lg">
              <button
                type="button"
                id={`${id}-btn`}
                aria-expanded={isOpen}
                aria-controls={`${id}-panel`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex w-full items-start gap-5 py-5 text-left"
              >
                <span className="font-display text-sm tabular-nums text-ink-3 sm:pt-0.5">{String(i + 1).padStart(2, "0")}</span>
                <span className="flex-1 text-ink transition-colors group-hover:text-primary-ink">{it.q}</span>
                <span aria-hidden="true" className="relative mt-1 size-5 shrink-0">
                  <span className="absolute left-0 top-1/2 h-[1.5px] w-5 -translate-y-1/2 rounded bg-current" />
                  <motion.span
                    className="absolute left-0 top-1/2 h-[1.5px] w-5 -translate-y-1/2 rounded"
                    style={{ background: accent }}
                    initial={false}
                    animate={{ rotate: isOpen ? 0 : 90 }}
                    transition={{ type: "spring", stiffness: 300, damping: 24 }}
                  />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`${id}-panel`}
                  role="region"
                  aria-labelledby={`${id}-btn`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-[68ch] pb-6 pl-10 text-ink-2">{it.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
