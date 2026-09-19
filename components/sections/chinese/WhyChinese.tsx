import { useLocale } from "next-intl";
import { chineseCopy, whyPoints } from "@/data/chinese";
import { cn, pick } from "@/lib/utils";

/** Four reasons as a staggered two-column list, each marked with a Chinese numeral (一 二 三 四). */
export function WhyChinese() {
  const locale = useLocale();
  return (
    <section aria-labelledby="zh-why" className="border-t border-line py-20 lg:py-28">
      <div className="container-x grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
        <h2 id="zh-why" className="text-display-m text-ink lg:col-span-3">
          {pick(chineseCopy.why.title, locale)}
        </h2>
        <ol className="grid grid-cols-1 gap-x-12 gap-y-12 sm:grid-cols-2 lg:col-span-9">
          {whyPoints.map((p, i) => (
            <li key={p.numeral} className={cn("grid grid-cols-[3.5rem_1fr] gap-4 sm:gap-5", i % 2 === 1 && "sm:mt-20")}>
              <span aria-hidden="true" className="flex flex-col items-center gap-3 self-start pt-1">
                <span className="font-hanzi text-5xl font-bold leading-none text-ink-2">{p.numeral}</span>
                <span className="size-1.5 rounded-full bg-accent" />
              </span>
              <div>
                <h3 className="font-sans text-xl font-bold tracking-normal text-ink">{pick(p.title, locale)}</h3>
                <p className="mt-2 max-w-[40ch] text-ink-2">{pick(p.text, locale)}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
