import { missionCopy as c, values } from "@/data/mission";
import { pick } from "@/lib/utils";

/**
 * Offset editorial list: the heading stays pinned on the left while the values scroll past on the right,
 * each led by a large light numeral. No cards.
 */
export function Values({ locale }: { locale: string }) {
  return (
    <section aria-labelledby="values-title" className="py-24 lg:py-36">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <h2 id="values-title" className="text-display-l">
              {pick(c.valuesTitle, locale)}
            </h2>
            <p className="mt-5 max-w-[36ch] text-ink-2">{pick(c.valuesIntro, locale)}</p>
          </div>
        </div>

        <dl className="lg:col-span-7 lg:col-start-6">
          {values.map((v, i) => (
            <div key={i} className="grid grid-cols-[3.5rem_1fr] gap-x-5 border-t border-line py-9 last:border-b sm:grid-cols-[5.5rem_1fr] sm:gap-x-8 sm:py-11">
              <span aria-hidden="true" className="row-span-2 text-[clamp(2.2rem,1.6rem+2vw,3.4rem)] font-light leading-none tracking-[-0.05em] text-ink-3 tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <dt className="text-display-s font-semibold tracking-[-0.03em] text-ink">{pick(v.title, locale)}</dt>
              <dd className="mt-3 max-w-[58ch] text-ink-2">{pick(v.text, locale)}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
