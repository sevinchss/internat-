import { useLocale } from "next-intl";
import { englishCopy } from "@/data/english";
import { pick } from "@/lib/utils";
import { RingArc } from "@/components/brand/Ring";
import { TypedCorrection } from "./TypedCorrection";

/** Title + lead on top; below, an exercise-book page with an amber margin where the sentence is typed and corrected. */
export function EnglishHero() {
  const locale = useLocale();
  const c = englishCopy.hero;
  return (
    <section className="relative overflow-hidden pt-32 pb-20 lg:pt-36 lg:pb-28">
      <RingArc
        className="text-ring absolute top-24 -right-[18vw] hidden w-[46vw] max-w-[720px] lg:block"
        opacity={0.7}
      />
      <div className="container-x relative">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-10">
          <h1 className="text-display-xl text-ink lg:col-span-6">{pick(c.title, locale)}</h1>
          <p className="text-body-l text-ink-2 max-w-[48ch] lg:col-span-5 lg:col-start-8 lg:self-end">
            {pick(c.lead, locale)}
          </p>
        </div>

        <div className="border-line mt-16 border-t lg:mt-20">
          <div className="border-amber border-l-2 pt-8 pl-5 sm:ml-10 sm:pl-8 lg:ml-16 lg:pt-10">
            <TypedCorrection exampleLabel={pick(c.exampleLabel, locale)} />
          </div>
        </div>
      </div>
    </section>
  );
}
