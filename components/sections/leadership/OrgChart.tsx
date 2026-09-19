import { director, deputies } from "@/data/staff";
import { departments, leadershipCopy as c } from "@/data/leadership";
import { pick } from "@/lib/utils";
import { StaffPortrait } from "./StaffPortrait";

/**
 * Org chart as one semantic nested list — no boxes: nodes are small rings on hairline connectors.
 * Desktop: director on top, SVG connectors, five columns. Mobile: a vertical tree with a spine on the left.
 */
export function OrgChart({ locale }: { locale: string }) {
  const n = deputies.length;
  const centres = deputies.map((_, i) => ((i + 0.5) / n) * 100);
  const directorName = pick(director.name, locale);
  return (
    <section aria-labelledby="org-title" className="pb-28 lg:pb-40">
      <div className="container-x">
        <div className="border-line grid gap-5 border-t pt-14 lg:grid-cols-12 lg:gap-16 lg:pt-20">
          <h2 id="org-title" className="text-display-m lg:col-span-5">
            {pick(c.chartTitle, locale)}
          </h2>
          <p className="text-ink-2 max-w-[52ch] lg:col-span-6 lg:col-start-7 lg:pt-2">{pick(c.chartIntro, locale)}</p>
        </div>

        <div className="mt-14 lg:mt-20">
          <ul aria-label={pick(c.chartTitle, locale)}>
            <li>
              {/* Director node */}
              <div className="flex w-fit items-center gap-4 lg:mx-auto lg:flex-col lg:gap-3 lg:text-center">
                <span aria-hidden="true">
                  <StaffPortrait
                    slot={director.photo}
                    name={directorName}
                    accent="var(--primary-ink)"
                    sizes="80px"
                    className="w-14 [--mono:1rem] lg:w-20 lg:[--mono:1.35rem]"
                  />
                </span>
                <div>
                  <p className="text-ink text-lg leading-tight font-semibold tracking-[-0.02em]">
                    {pick(director.area, locale)}
                  </p>
                  <p className="text-ink-2 text-[15px]">{directorName}</p>
                </div>
              </div>

              {/* Desktop connectors (percent-based, so they follow the equal columns at any width) */}
              <svg
                viewBox="0 0 100 56"
                preserveAspectRatio="none"
                className="mt-5 hidden h-14 w-full lg:block"
                aria-hidden="true"
              >
                <path
                  d={`M 50 0 V 28 M ${centres[0]} 28 H ${centres[n - 1]} ${centres.map((x) => `M ${x} 28 V 56`).join(" ")}`}
                  fill="none"
                  stroke="var(--ring)"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>

              <ul
                className="ml-7 pt-8 lg:ml-0 lg:grid lg:pt-0"
                style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}
              >
                {deputies.map((d, i) => (
                  <li
                    key={d.id}
                    className="relative pb-10 pl-9 last:pb-0 lg:px-3 lg:pt-8 lg:pb-0 lg:text-center xl:px-5"
                  >
                    {/* mobile spine: full height except for the last child, which stops at its node */}
                    <span
                      className={`bg-ring absolute -top-8 left-0 w-px lg:hidden ${i === n - 1 ? "h-[2.9rem]" : "bottom-0"}`}
                      aria-hidden="true"
                    />
                    {/* node on the connector */}
                    <span
                      className="bg-paper absolute top-[0.5rem] left-0 size-3 -translate-x-1/2 rounded-full border-2 lg:top-0 lg:left-1/2 lg:-translate-y-1/2"
                      style={{ borderColor: d.accent }}
                      aria-hidden="true"
                    />
                    <p className="text-ink text-[16px] leading-snug font-semibold tracking-[-0.02em]">
                      {pick(d.area, locale)}
                    </p>
                    <p className="text-ink-2 mt-1 text-[14px]">{pick(d.name, locale)}</p>
                    <ul className="lg:border-line mt-4 space-y-2 lg:mt-5 lg:border-t lg:pt-5">
                      {pick(departments[d.id] ?? { uz: [], en: [], ru: [] }, locale).map((u) => (
                        <li key={u} className="text-ink-3 text-[14px] leading-snug">
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
