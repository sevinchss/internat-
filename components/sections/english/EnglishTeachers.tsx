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
    <section aria-labelledby="en-teachers" className="border-t border-line bg-surface py-20 lg:py-28">
      <div className="container-x">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <h2 id="en-teachers" className="text-display-m text-ink">
            {pick(c.title, locale)}
          </h2>
          <p className="max-w-[40ch] text-sm text-ink-3">{pick(c.lead, locale)}</p>
        </div>
        <ul className="mt-12 grid grid-cols-1 border-t border-line md:grid-cols-2 md:gap-x-12">
          {englishTeachers.map((t) => (
            <li key={t.name} className="flex items-center gap-5 border-b border-line py-5 sm:gap-7">
              <Portrait name={t.name} sizes="160px" accent="var(--amber)" className="aspect-[4/5] w-32 shrink-0 rounded-[16px] sm:w-40" />
              <div className="min-w-0">
                <h3 className="font-sans text-lg font-bold tracking-normal text-ink">{t.name}</h3>
                <p className="text-ink-2">{pick(t.role, locale)}</p>
                <p className="mt-2 flex items-center gap-2 text-sm text-ink-3">
                  <span aria-hidden="true" className="h-px w-4 bg-amber" />
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
