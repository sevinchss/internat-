"use client";

import { useId, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/** Accessible tablist (roving tabindex, arrow keys, Home/End). Controlled. */
export function TabList({
  tabs,
  value,
  onChange,
  label,
  className,
  pillClassName = "bg-ink text-paper",
  idBase,
}: {
  tabs: { id: string; label: React.ReactNode }[];
  value: string;
  onChange: (id: string) => void;
  label: string;
  className?: string;
  pillClassName?: string;
  idBase: string;
}) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const layoutId = useId();
  const move = (i: number) => {
    const n = (i + tabs.length) % tabs.length;
    onChange(tabs[n].id);
    refs.current[n]?.focus();
  };
  return (
    <div role="tablist" aria-label={label} className={cn("no-scrollbar flex gap-1 overflow-x-auto", className)}>
      {tabs.map((t, i) => {
        const selected = t.id === value;
        return (
          <button
            key={t.id}
            ref={(el) => {
              refs.current[i] = el;
            }}
            role="tab"
            id={`${idBase}-tab-${t.id}`}
            aria-selected={selected}
            aria-controls={`${idBase}-panel-${t.id}`}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(t.id)}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight") move(i + 1);
              else if (e.key === "ArrowLeft") move(i - 1);
              else if (e.key === "Home") move(0);
              else if (e.key === "End") move(tabs.length - 1);
              else return;
              e.preventDefault();
            }}
            className={cn(
              "relative isolate min-h-11 shrink-0 rounded-full px-4 text-[15px] font-semibold transition-colors",
              selected ? "" : "text-ink-2 hover:text-ink",
            )}
          >
            {selected && (
              <motion.span
                layoutId={layoutId}
                className={cn("absolute inset-0 -z-10 rounded-full", pillClassName)}
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
            <span
              className={cn(
                selected &&
                  pillClassName
                    .split(" ")
                    .filter((c) => c.startsWith("text-"))
                    .join(" "),
              )}
            >
              {t.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export function TabPanel({
  idBase,
  id,
  children,
  className,
}: {
  idBase: string;
  id: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      role="tabpanel"
      id={`${idBase}-panel-${id}`}
      aria-labelledby={`${idBase}-tab-${id}`}
      tabIndex={0}
      className={className}
    >
      {children}
    </div>
  );
}
