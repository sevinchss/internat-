import { Moon } from "lucide-react";
import { useLocale } from "next-intl";
import { dormCopy, routine, routineParts, type RoutineItem } from "@/data/dorm";
import { arcPath, cn, pick } from "@/lib/utils";

const cols = "grid grid-cols-[4.5rem_2rem_1fr] sm:grid-cols-[6.5rem_2.5rem_1fr]";

/** Vertical timeline of a boarding day — deliberately a straight line, unlike the home page's 24h dial. */
export function Routine() {
  const locale = useLocale();
  const c = dormCopy.routine;
  const parts = (Object.keys(routineParts) as RoutineItem["part"][])
    .map((part) => ({ part, items: routine.filter((r) => r.part === part) }))
    .filter((g) => g.items.length > 0);
  const lastTime = routine[routine.length - 1].time;

  return (
    <section aria-labelledby="dorm-routine" className="py-20 lg:py-28">
      <div className="container-x grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <h2 id="dorm-routine" className="text-display-m text-ink">
              {pick(c.title, locale)}
            </h2>
            <p className="mt-4 max-w-[40ch] text-ink-2">{pick(c.lead, locale)}</p>
            <p className="mt-6 max-w-[40ch] border-l-2 border-orange pl-4 text-sm text-ink-3">{pick(c.note, locale)}</p>
          </div>
        </div>

        <div className="lg:col-span-7 lg:col-start-6">
          {parts.map(({ part, items }, gi) => (
            <section key={part} aria-labelledby={`dorm-routine-${part}`}>
              <div className={cols}>
                <span />
                <span className="flex justify-center" aria-hidden="true">
                  <span className={cn("w-px bg-line", gi === 0 && "bg-transparent")} />
                </span>
                <h3 id={`dorm-routine-${part}`} className="pb-3 pt-1 font-sans text-sm font-semibold tracking-normal text-ink-3">
                  {pick(routineParts[part], locale)}
                </h3>
              </div>
              <ol>
                {items.map((item) => {
                  const last = item.time === lastTime;
                  const long = Boolean(item.end);
                  return (
                    <li key={item.time} className={cols}>
                      <span className="pt-0.5 font-display text-[15px] tabular-nums text-ink sm:text-base">
                        <time>{item.time}</time>
                        {item.end && (
                          <span className="block text-ink-3">
                            <span className="sr-only">–</span>
                            <time>{item.end}</time>
                          </span>
                        )}
                      </span>
                      <span className="relative flex justify-center" aria-hidden="true">
                        <span className={cn("absolute top-0 w-px bg-line", last ? "h-3" : "bottom-0")} />
                        {last ? (
                          <span className="relative mt-0.5 flex size-7 items-center justify-center rounded-full bg-navy text-white">
                            <Moon className="size-3.5" strokeWidth={1.8} />
                          </span>
                        ) : (
                          <svg viewBox="0 0 24 24" className="relative mt-1 size-5 rounded-full bg-paper text-ink">
                            <path d={arcPath(12, 12, 8, 40, 320)} fill="none" stroke={long ? "currentColor" : "var(--ring)"} strokeWidth="2" />
                            {long && <circle cx="12" cy="12" r="2.5" fill="var(--orange)" />}
                          </svg>
                        )}
                        {long && <span className="absolute bottom-3 top-9 w-[3px] rounded-full bg-ink/15" />}
                      </span>
                      <div className={long ? "pb-12" : "pb-7"}>
                        <p className={cn("text-ink", long ? "font-display text-display-s" : "font-semibold")}>{pick(item.title, locale)}</p>
                        {item.text && <p className="mt-1 max-w-[48ch] text-[15px] text-ink-2">{pick(item.text, locale)}</p>}
                      </div>
                    </li>
                  );
                })}
              </ol>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
