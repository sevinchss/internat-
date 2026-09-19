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
    <section aria-labelledby="zh-teachers" className="container-x pt-8 pb-20 lg:pb-32">
      <div className="border-line grid grid-cols-1 gap-12 border-t pt-16 lg:grid-cols-12 lg:gap-10 lg:pt-24">
        <div className="lg:col-span-3">
          <h2 id="zh-teachers" className="text-display-m text-ink">
            {pick(c.title, locale)}
          </h2>
          <p className="text-ink-3 mt-4 max-w-[30ch] text-sm">{pick(c.lead, locale)}</p>
        </div>
        <ul className="grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-6 lg:col-span-9">
          {chineseTeachers.map((t, i) => (
            <li key={t.name} className={cn(offsets[i])}>
              <Portrait
                name={t.name}
                sizes="(min-width: 1024px) 300px, (min-width: 640px) 33vw, 90vw"
                accent="var(--red)"
                className="border-line bg-ink/[0.025] aspect-[4/5] rounded-[6px] border dark:bg-white/[0.035]"
              />
              <h3 className="text-ink mt-5 font-sans text-lg font-semibold tracking-normal">{t.name}</h3>
              <p className="text-ink-2">{pick(t.role, locale)}</p>
              <p className="text-ink-3 mt-1 text-sm">{pick(t.note, locale)}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
