"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";
import { mapEmbedSrc } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Click-to-load Google Map.
 * The embed pulls ~1 MB of scripts and >1 s of main-thread work, so until the visitor asks for it
 * we render a light, on-brand placeholder (street grid + pin + the ring motif) instead of the iframe.
 */
export function MapPreview({ title, loadLabel, className }: { title: string; loadLabel: string; className?: string }) {
  const [live, setLive] = useState(false);

  if (live) {
    return (
      <iframe
        src={mapEmbedSrc}
        title={title}
        referrerPolicy="no-referrer-when-downgrade"
        className={cn(
          "absolute inset-0 h-full w-full grayscale-[0.6] dark:opacity-80 dark:hue-rotate-180 dark:invert-[0.9]",
          className,
        )}
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setLive(true)}
      className={cn(
        "group bg-surface-2 text-ink absolute inset-0 flex h-full w-full items-center justify-center overflow-hidden",
        className,
      )}
    >
      {/* abstract street grid */}
      <svg
        aria-hidden="true"
        className="text-line absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 400 225"
      >
        <g stroke="currentColor" strokeWidth="6" fill="none" strokeLinecap="round">
          <path d="M-10 70 C 90 60, 180 95, 410 60" />
          <path d="M-10 170 C 120 150, 260 190, 410 150" />
          <path d="M120 -10 C 110 80, 150 150, 130 240" />
          <path d="M290 -10 C 300 90, 260 160, 280 240" />
        </g>
        <g stroke="currentColor" strokeWidth="2" fill="none" opacity="0.8">
          <path d="M-10 120 L 410 110" />
          <path d="M60 -10 L 70 240" />
          <path d="M210 -10 L 200 240" />
          <path d="M350 -10 L 340 240" />
        </g>
      </svg>
      {/* pin inside the ring motif */}
      <span
        aria-hidden="true"
        className="border-primary-ink/30 bg-surface/80 relative grid size-20 place-items-center rounded-full border transition-transform duration-500 group-hover:scale-110"
      >
        <span className="border-primary-ink/25 absolute inset-[-10px] rounded-full border border-dashed" />
        <MapPin className="text-primary-ink size-7" strokeWidth={1.6} />
      </span>
      <span className="bg-surface text-ink group-hover:bg-primary group-hover:text-on-primary absolute bottom-3 left-3 rounded-full px-3.5 py-2 text-xs font-semibold shadow-sm transition-colors">
        {loadLabel}
      </span>
      <span className="sr-only">{title}</span>
    </button>
  );
}
