import { CircleDashed, Info } from "lucide-react";

/** Placeholder checklist — clearly labelled as "to be confirmed" until the official regulation is published. */
export function DocumentsList({ title, badge, items }: { title: string; badge: string; items: string[] }) {
  return (
    <section aria-labelledby="docs-title" className="border-t border-line bg-surface-2/60 py-20 lg:py-28 dark:bg-surface/40">
      <div className="container-x grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <h2 id="docs-title" className="text-display-m">
            {title}
          </h2>
          <p className="mt-6 inline-flex items-start gap-2.5 rounded-2xl border border-amber/60 bg-surface px-4 py-3 text-[15px] font-semibold text-ink">
            <Info className="mt-0.5 size-[18px] shrink-0 text-[#8a5a00] dark:text-amber" strokeWidth={1.8} aria-hidden="true" />
            {badge}
          </p>
        </div>
        <ol className="lg:col-span-7">
          {items.map((it, i) => (
            <li key={it} className="flex items-start gap-4 border-b border-line py-5 first:border-t">
              <CircleDashed className="mt-0.5 size-6 shrink-0 text-ink-3" strokeWidth={1.6} aria-hidden="true" />
              <span className="flex-1 text-lg text-ink">{it}</span>
              <span aria-hidden="true" className="font-display text-sm tabular-nums text-ink-3">
                {String(i + 1).padStart(2, "0")}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
