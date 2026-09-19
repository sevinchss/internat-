import { CircleDashed, Info } from "lucide-react";

/** Placeholder checklist — clearly labelled as "to be confirmed" until the official regulation is published. */
export function DocumentsList({ title, badge, items }: { title: string; badge: string; items: string[] }) {
  return (
    <section aria-labelledby="docs-title" className="container-x py-12 lg:py-20">
      <div className="frame grid gap-10 px-6 py-10 sm:px-10 sm:py-14 lg:grid-cols-12 lg:gap-12 lg:px-14 lg:py-16">
        <div className="lg:col-span-5">
          <h2 id="docs-title" className="text-display-m">
            {title}
          </h2>
          <p className="border-amber text-ink mt-6 flex max-w-[36ch] items-start gap-2.5 border-l-2 py-1 pl-4 text-[15px] font-medium">
            <Info
              className="dark:text-amber mt-0.5 size-[18px] shrink-0 text-[#8a5a00]"
              strokeWidth={1.8}
              aria-hidden="true"
            />
            {badge}
          </p>
        </div>
        <ol className="lg:col-span-7">
          {items.map((it, i) => (
            <li key={it} className="border-line flex items-start gap-4 border-b py-5 last:border-b-0 lg:first:pt-0">
              <CircleDashed className="text-ink-3 mt-0.5 size-6 shrink-0" strokeWidth={1.6} aria-hidden="true" />
              <span className="text-ink flex-1 text-lg">{it}</span>
              <span aria-hidden="true" className="text-ink-3 text-sm tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
