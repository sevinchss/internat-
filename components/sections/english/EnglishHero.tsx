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

        {/* an exercise-book page: frosted sheet, faint ruling, one amber margin line */}
        <div className="glass relative mt-14 overflow-hidden rounded-[20px] lg:mt-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(to_bottom,transparent_0,transparent_55px,var(--line)_55px,var(--line)_56px)] opacity-70"
          />
          <span aria-hidden="true" className="bg-amber absolute inset-y-0 left-6 w-px sm:left-12 lg:left-20" />
          <div className="relative py-8 pr-6 pl-11 sm:py-10 sm:pr-10 sm:pl-20 lg:py-12 lg:pl-32">
            <TypedCorrection exampleLabel={pick(c.exampleLabel, locale)} />
          </div>
        </div>
      </div>
    </section>
  );
}
