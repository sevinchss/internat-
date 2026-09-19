import { useLocale } from "next-intl";
import { dormCopy } from "@/data/dorm";
import { pick } from "@/lib/utils";
import { DormHeroVisual } from "./DormHeroVisual";

export function DormHero() {
  const locale = useLocale();
  const c = dormCopy.hero;
  return (
    <section className="container-x pb-20 pt-32 lg:pb-28 lg:pt-36">
      <div className="grid grid-cols-1 items-end gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6 lg:pb-10">
          <h1 className="text-display-xl text-ink">{pick(c.title, locale)}</h1>
          <p className="mt-6 max-w-[52ch] text-body-l text-ink-2">{pick(c.lead, locale)}</p>
          {/* TODO: replace with real data (facts) */}
          <dl className="mt-10 grid max-w-xl grid-cols-3 border-t border-line">
            {c.facts.map((f, i) => (
              <div key={i} className={i > 0 ? "border-l border-line pl-4 pt-5 sm:pl-6" : "pr-4 pt-5"}>
                <dt className="sr-only">{pick(f.label, locale)}</dt>
                <dd className="font-display text-display-s tabular-nums text-ink">{f.value}</dd>
                <dd aria-hidden="true" className="mt-1 text-sm leading-snug text-ink-2">
                  {pick(f.label, locale)}
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="lg:col-span-6">
          <DormHeroVisual caption={pick(c.lampCaption, locale)} />
        </div>
      </div>
    </section>
  );
}
