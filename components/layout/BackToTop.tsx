"use client";

import { ArrowUp } from "lucide-react";
import { useLenis } from "./SmoothScroll";

export function BackToTop({ label }: { label: string }) {
  const lenis = useLenis();
  return (
    <button
      type="button"
      onClick={() => {
        if (lenis) lenis.scrollTo(0, { duration: 1.4 });
        else window.scrollTo({ top: 0, behavior: "smooth" });
        document.getElementById("main")?.focus({ preventScroll: true });
      }}
      className="group inline-flex min-h-11 items-center gap-2 self-start rounded-full border border-line px-4 font-semibold text-ink transition-colors hover:border-primary-ink hover:text-primary-ink"
    >
      <ArrowUp className="size-4 transition-transform group-hover:-translate-y-0.5" aria-hidden="true" />
      {label}
    </button>
  );
}
