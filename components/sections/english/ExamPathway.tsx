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
    <section aria-labelledby="en-exams" className="border-y border-line bg-surface-2/60 py-20 lg:py-24">
      <div className="container-x">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
          <div>
            <p className="inline-flex min-h-9 items-center gap-2 rounded-full border border-dashed border-ink/30 px-3.5 text-sm font-semibold text-ink-2 dark:border-white/30">
              <Info className="size-4" strokeWidth={1.8} aria-hidden="true" />
              {pick(c.badge, locale)}
            </p>
            <h2 id="en-exams" className="mt-5 text-display-m text-ink">
              {pick(c.title, locale)}
            </h2>
          </div>
          <p className="max-w-[52ch] text-ink-2 lg:pt-14">{pick(c.lead, locale)}</p>
        </div>

        <ol className="relative mt-14 grid grid-cols-1 gap-8 md:grid-cols-4 md:gap-6">
          {/* dashed path (vertical on phones, horizontal from md) */}
          <span aria-hidden="true" className="absolute bottom-2 left-[11px] top-2 border-l-2 border-dashed border-ring md:bottom-auto md:left-3 md:right-3 md:top-[11px] md:border-l-0 md:border-t-2" />
          {examPath.map((e, i) => (
            <li key={e.id} className="relative grid grid-cols-[24px_1fr] gap-4 md:block">
              <span aria-hidden="true" className="relative mt-1 flex size-6 items-center justify-center rounded-full border-2 border-ink/25 bg-paper md:mt-0 dark:border-white/30">
                {i === examPath.length - 1 && <span className="size-2 rounded-full bg-amber" />}
              </span>
              <div className="md:mt-6">
                <p className="font-display text-display-s text-ink">{e.level}</p>
                <p className="mt-1 font-semibold text-ink" lang="en">
                  {e.name}
                </p>
                <p className="mt-0.5 text-sm text-ink-3">{pick(e.when, locale)}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
