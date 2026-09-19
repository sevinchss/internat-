import { cn } from "@/lib/utils";

/** "01 ── About the school" — small editorial marker above a home section heading (sentence case, never all-caps). */
export function SectionLabel({ n, children, className, light }: { n: string; children: React.ReactNode; className?: string; light?: boolean }) {
  return (
    <p className={cn("index-label", light && "text-white/70", className)}>
      <span className={cn("tabular-nums", light ? "text-white" : "text-ink")}>{n}</span>
      <span aria-hidden="true" className={cn("h-px w-10", light ? "bg-white/30" : "bg-ink-3/40")} />
      <span>{children}</span>
    </p>
  );
}
