import { useLocale } from "next-intl";
import { englishCopy, englishTeachers } from "@/data/english";
import { pick } from "@/lib/utils";
import { Portrait } from "@/components/ui/Portrait";

// TODO: replace with real data — placeholder teachers (see data/english.ts)
/** Teachers as a two-column directory: small portrait + text rows (unlike the Chinese page's staircase). */
export function EnglishTeachers() {
  const locale = useLocale();
  const c = englishCopy.teachers;
  return (
    <section aria-labelledby="en-teachers" className="pt-8 pb-20 lg:pb-32">
      <div className="container-x">
        <div aria-hidden="true" className="bg-line mb-16 h-px lg:mb-24" />
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <h2 id="en-teachers" className="text-display-m text-ink">
            {pick(c.title, locale)}
          </h2>
          <p className="text-ink-3 max-w-[40ch] text-sm">{pick(c.lead, locale)}</p>
        </div>
        <ul className="border-line mt-12 grid grid-cols-1 border-t md:grid-cols-2 md:gap-x-12">
          {englishTeachers.map((t) => (
            <li key={t.name} className="border-line flex items-center gap-5 border-b py-5 sm:gap-7">
              <Portrait
                name={t.name}
                sizes="160px"
                accent="var(--amber)"
                className="border-line aspect-[4/5] w-32 shrink-0 rounded-[6px] border bg-ink/[0.025] sm:w-36 dark:bg-white/[0.035]"
              />
              <div className="min-w-0">
                <h3 className="text-ink font-sans text-lg font-semibold tracking-normal">{t.name}</h3>
                <p className="text-ink-2">{pick(t.role, locale)}</p>
                <p className="text-ink-3 mt-2 flex items-center gap-2 text-sm">
                  <span aria-hidden="true" className="bg-amber h-px w-4" />
                  {pick(t.note, locale)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
