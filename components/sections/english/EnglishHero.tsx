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
    <section className="relative overflow-hidden pb-20 pt-32 lg:pb-28 lg:pt-36">
      <RingArc className="absolute -right-[18vw] top-24 hidden w-[46vw] max-w-[720px] text-ring lg:block" opacity={0.7} />
      <div className="container-x relative">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-10">
          <h1 className="text-display-xl text-ink lg:col-span-6">{pick(c.title, locale)}</h1>
          <p className="max-w-[48ch] text-body-l text-ink-2 lg:col-span-5 lg:col-start-8 lg:self-end">{pick(c.lead, locale)}</p>
        </div>

        <div className="mt-16 border-t border-line lg:mt-20">
          <div className="border-l-2 border-amber pl-5 pt-8 sm:ml-10 sm:pl-8 lg:ml-16 lg:pt-10">
            <TypedCorrection exampleLabel={pick(c.exampleLabel, locale)} />
          </div>
        </div>
      </div>
    </section>
  );
}
