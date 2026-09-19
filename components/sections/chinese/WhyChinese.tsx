import { useLocale } from "next-intl";
import { chineseCopy, whyPoints } from "@/data/chinese";
import { cn, pick } from "@/lib/utils";

/**
 * Four reasons as a staggered two-column list on hairlines. Each is marked by a large, quiet Chinese numeral
 * (一 二 三 四); the only red is the short tick where each hairline starts.
 */
export function WhyChinese() {
  const locale = useLocale();
  return (
    <section aria-labelledby="zh-why" className="container-x py-20 lg:py-32">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
        <h2 id="zh-why" className="text-display-m text-ink lg:col-span-3">
          {pick(chineseCopy.why.title, locale)}
        </h2>
        <ol className="grid grid-cols-1 gap-x-14 gap-y-14 sm:grid-cols-2 lg:col-span-8 lg:col-start-5">
          {whyPoints.map((p, i) => (
            <li key={p.numeral} className={cn("border-line relative border-t pt-7", i % 2 === 1 && "sm:mt-24")}>
              <span aria-hidden="true" className="bg-accent absolute -top-px left-0 h-px w-10" />
              <span
                aria-hidden="true"
                className="font-hanzi text-ink-3 flex h-16 items-center text-6xl leading-none font-normal"
              >
                {p.numeral}
              </span>
              <h3 className="text-ink mt-6 font-sans text-xl font-semibold tracking-normal">{pick(p.title, locale)}</h3>
              <p className="text-ink-2 mt-2 max-w-[40ch]">{pick(p.text, locale)}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
