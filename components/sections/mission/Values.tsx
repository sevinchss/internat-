import { missionCopy as c, values } from "@/data/mission";
import { pick } from "@/lib/utils";

/** Two-column editorial list: number + title on the left, prose on the right. No cards. */
export function Values({ locale }: { locale: string }) {
  return (
    <section aria-labelledby="values-title" className="border-t border-line py-20 lg:py-28">
      <div className="container-x">
        <div className="grid gap-4 lg:grid-cols-12 lg:gap-10">
          <h2 id="values-title" className="text-display-l lg:col-span-5">
            {pick(c.valuesTitle, locale)}
          </h2>
          <p className="max-w-[44ch] text-body-l text-ink-2 lg:col-span-5 lg:col-start-8 lg:pt-3">{pick(c.valuesIntro, locale)}</p>
        </div>

        <dl className="mt-14 lg:mt-20">
          {values.map((v, i) => (
            <div key={i} className="grid gap-3 border-t border-line py-8 last:border-b sm:py-10 lg:grid-cols-12 lg:gap-10">
              <dt className="flex items-baseline gap-5 lg:col-span-5">
                <span className="w-8 shrink-0 font-display text-[15px] tabular-nums text-ink-3">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-display text-display-s font-medium text-ink">{pick(v.title, locale)}</span>
              </dt>
              <dd className="pl-[52px] text-body-l text-ink-2 lg:col-span-6 lg:col-start-7 lg:pl-0">{pick(v.text, locale)}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
