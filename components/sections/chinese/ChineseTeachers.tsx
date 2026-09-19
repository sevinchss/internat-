import { useLocale } from "next-intl";
import { chineseCopy, chineseTeachers } from "@/data/chinese";
import { cn, pick } from "@/lib/utils";
import { Portrait } from "@/components/ui/Portrait";

// TODO: replace with real data — placeholder teachers (see data/chinese.ts)
const offsets = ["", "sm:mt-16", "sm:mt-32"];

/** Teachers as a descending staircase of portraits. */
export function ChineseTeachers() {
  const locale = useLocale();
  const c = chineseCopy.teachers;
  return (
    <section aria-labelledby="zh-teachers" className="bg-surface py-20 lg:py-28">
      <div className="container-x grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-3">
          <h2 id="zh-teachers" className="text-display-m text-ink">
            {pick(c.title, locale)}
          </h2>
          <p className="mt-4 max-w-[30ch] text-sm text-ink-3">{pick(c.lead, locale)}</p>
        </div>
        <ul className="grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-6 lg:col-span-9">
          {chineseTeachers.map((t, i) => (
            <li key={t.name} className={cn(offsets[i])}>
              <Portrait name={t.name} sizes="(min-width: 1024px) 300px, (min-width: 640px) 33vw, 90vw" accent="var(--red)" className="aspect-[4/5] rounded-[22px]" />
              <h3 className="mt-5 font-sans text-lg font-bold tracking-normal text-ink">{t.name}</h3>
              <p className="text-ink-2">{pick(t.role, locale)}</p>
              <p className="mt-1 text-sm text-ink-3">{pick(t.note, locale)}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
