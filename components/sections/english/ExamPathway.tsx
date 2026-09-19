import { Info } from "lucide-react";
import { useLocale } from "next-intl";
import { englishCopy, examPath } from "@/data/english";
import { pick } from "@/lib/utils";

/**
 * TODO: confirm which exams — shown only as a POSSIBLE pathway, clearly labelled "to be confirmed".
 * Dashed line = not decided yet.
 */
export function ExamPathway() {
  const locale = useLocale();
  const c = englishCopy.exams;
  return (
    <section aria-labelledby="en-exams" className="py-20 lg:py-28">
      <div className="container-x">
        <div className="frame px-6 py-10 sm:px-10 sm:py-14 lg:px-14 lg:py-16">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
            <div>
              <p className="text-ink-2 inline-flex min-h-9 items-center gap-2 text-sm font-medium">
                <Info className="text-accent-ink size-4" strokeWidth={1.8} aria-hidden="true" />
                {pick(c.badge, locale)}
              </p>
              <h2 id="en-exams" className="text-display-m text-ink mt-5">
                {pick(c.title, locale)}
              </h2>
            </div>
            <p className="text-ink-2 max-w-[52ch] lg:pt-14">{pick(c.lead, locale)}</p>
          </div>

          <ol className="relative mt-14 grid grid-cols-1 gap-8 md:grid-cols-4 md:gap-6">
            {/* dashed path (vertical on phones, horizontal from md) */}
            <span
              aria-hidden="true"
              className="border-ring absolute top-2 bottom-2 left-[11px] border-l border-dashed md:top-[11px] md:right-3 md:bottom-auto md:left-3 md:border-t md:border-l-0"
            />
            {examPath.map((e, i) => (
              <li key={e.id} className="relative grid grid-cols-[24px_1fr] gap-4 md:block">
                <span
                  aria-hidden="true"
                  className="border-ink/25 bg-paper relative mt-1 flex size-6 items-center justify-center rounded-full border md:mt-0 dark:border-white/30"
                >
                  {i === examPath.length - 1 && <span className="bg-amber size-2 rounded-full" />}
                </span>
                <div className="md:mt-6">
                  <p className="text-ink text-[clamp(2.25rem,1.8rem+1.6vw,3.25rem)] leading-none font-light tracking-[-0.04em]">
                    {e.level}
                  </p>
                  <p className="text-ink mt-3 font-medium" lang="en">
                    {e.name}
                  </p>
                  <p className="text-ink-3 mt-0.5 text-sm">{pick(e.when, locale)}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
