import { useLocale } from "next-intl";
import { dormCopy } from "@/data/dorm";
import { pick } from "@/lib/utils";
import { DormHeroVisual } from "./DormHeroVisual";

export function DormHero() {
  const locale = useLocale();
  const c = dormCopy.hero;
  return (
    <section className="container-x pt-32 pb-20 lg:pt-36 lg:pb-28">
      <div className="grid grid-cols-1 items-end gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6 lg:pb-10">
          <h1 className="text-display-xl text-ink">{pick(c.title, locale)}</h1>
          <p className="text-body-l text-ink-2 mt-6 max-w-[52ch]">{pick(c.lead, locale)}</p>
          {/* TODO: replace with real data (facts) */}
          <dl className="border-line mt-10 grid max-w-xl grid-cols-3 border-t">
            {c.facts.map((f, i) => (
              <div key={i} className={i > 0 ? "border-line border-l pt-5 pl-4 sm:pl-6" : "pt-5 pr-4"}>
                <dt className="sr-only">{pick(f.label, locale)}</dt>
                <dd className="text-ink text-[clamp(1.9rem,1.4rem+1.6vw,2.75rem)] leading-none font-light tracking-[-0.04em] tabular-nums">{f.value}</dd>
                <dd aria-hidden="true" className="text-ink-2 mt-2 text-sm leading-snug">
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
