import { director, deputies } from "@/data/staff";
import { departments, leadershipCopy as c } from "@/data/leadership";
import { arcPath, pick } from "@/lib/utils";

/**
 * Org chart as one semantic nested list.
 * Desktop: director on top, SVG connectors, five columns. Mobile: a vertical tree with a spine on the left.
 */
export function OrgChart({ locale }: { locale: string }) {
  const n = deputies.length;
  const centres = deputies.map((_, i) => ((i + 0.5) / n) * 100);
  return (
    <section aria-labelledby="org-title" className="border-t border-line bg-surface py-20 lg:py-28">
      <div className="container-x">
        <div className="max-w-2xl">
          <h2 id="org-title" className="text-display-m">
            {pick(c.chartTitle, locale)}
          </h2>
          <p className="mt-4 text-body-l text-ink-2">{pick(c.chartIntro, locale)}</p>
        </div>

        <div className="mt-12 lg:mt-16">
          <ul aria-label={pick(c.chartTitle, locale)}>
            <li>
              {/* Director node */}
              <div className="relative flex w-fit items-center gap-4 rounded-[20px] border border-line bg-paper py-4 pl-4 pr-6 lg:mx-auto">
                <svg viewBox="0 0 40 40" className="size-11 shrink-0" aria-hidden="true">
                  <path d={arcPath(20, 20, 17, 40, 320)} fill="none" stroke="var(--ring)" strokeWidth="1.5" />
                  <path d={arcPath(20, 20, 17, 276, 320)} fill="none" stroke="var(--primary-ink)" strokeWidth="3" />
                </svg>
                <div>
                  <p className="font-display text-lg leading-tight text-ink">{pick(director.area, locale)}</p>
                  <p className="text-[15px] text-ink-2">{pick(director.name, locale)}</p>
                </div>
              </div>

              {/* Desktop connectors (percent-based, so they follow the 5 equal columns at any width) */}
              <svg viewBox="0 0 100 48" preserveAspectRatio="none" className="hidden h-12 w-full lg:block" aria-hidden="true">
                <path
                  d={`M 50 0 V 24 M ${centres[0]} 24 H ${centres[n - 1]} ${centres.map((x) => `M ${x} 24 V 48`).join(" ")}`}
                  fill="none"
                  stroke="var(--ring)"
                  strokeWidth="1.5"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>

              <ul className="ml-[38px] pt-6 lg:ml-0 lg:grid lg:pt-0" style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}>
                {deputies.map((d, i) => (
                  <li
                    key={d.id}
                    className="relative pb-8 pl-8 last:pb-0 before:absolute before:left-0 before:top-7 before:h-px before:w-6 before:bg-ring lg:px-2.5 lg:pb-0 lg:before:hidden xl:px-3.5"
                  >
                    {/* spine segment: full height except for the last child, which stops at its tick */}
                    <span
                      className={`absolute -top-6 left-0 w-px bg-ring lg:hidden ${i === n - 1 ? "h-[3.25rem]" : "bottom-0"}`}
                      aria-hidden="true"
                    />
                    <div className="rounded-[18px] border border-line bg-paper p-4 lg:min-h-[7.75rem]">
                      <span className="block h-0.5 w-7" style={{ backgroundColor: d.accent }} aria-hidden="true" />
                      <p className="mt-3 font-display text-[15px] font-medium leading-snug text-ink">{pick(d.area, locale)}</p>
                      <p className="mt-1 text-[14px] text-ink-2">{pick(d.name, locale)}</p>
                    </div>
                    <ul className="mt-3 space-y-2 border-l border-line pl-4 lg:ml-4">
                      {pick(departments[d.id] ?? { uz: [], en: [], ru: [] }, locale).map((u) => (
                        <li key={u} className="text-[14px] leading-snug text-ink-2">
                          {u}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
