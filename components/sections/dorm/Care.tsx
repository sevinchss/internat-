import { Clock3, ShieldCheck, Stethoscope, UsersRound, type LucideIcon } from "lucide-react";
import { useLocale } from "next-intl";
import { care, dormCopy, type CareItem } from "@/data/dorm";
import { pick } from "@/lib/utils";

const icons: Record<CareItem["icon"], LucideIcon> = {
  tutors: UsersRound,
  clock: Clock3,
  medical: Stethoscope,
  security: ShieldCheck,
};

/**
 * Care & safety: the question parents actually ask stands alone on the left as a pull-quote;
 * the four answers sit in a 2×2 hairline grid on the right.
 */
export function Care() {
  const locale = useLocale();
  const c = dormCopy.care;
  return (
    <section aria-labelledby="dorm-care" className="container-x py-20 lg:py-32">
      <div aria-hidden="true" className="mb-16 h-px bg-line lg:mb-24" />
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <h2 id="dorm-care" className="text-display-m text-ink max-w-[14ch]">
            {pick(c.title, locale)}
          </h2>
          <p className="border-orange text-ink mt-8 max-w-[26ch] border-l pl-5 text-xl leading-snug font-light sm:text-2xl">
            {pick(c.lead, locale)}
          </p>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:col-span-7 lg:col-start-6">
          {care.map((item, i) => {
            const Icon = icons[item.icon];
            return (
              <li
                key={item.id}
                className={[
                  "border-line border-t py-8 sm:py-10",
                  i % 2 === 0 ? "sm:pr-8 lg:pr-10" : "sm:border-l sm:pl-8 lg:pl-10",
                  i >= 2 ? "sm:border-b-0" : "",
                ].join(" ")}
              >
                <div className="flex items-center justify-between">
                  <Icon className="text-ink size-6" strokeWidth={1.5} aria-hidden="true" />
                  <span aria-hidden="true" className="text-ink-3 text-sm tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="text-ink mt-6 font-sans text-lg font-semibold tracking-normal">{pick(item.title, locale)}</h3>
                <p className="text-ink-2 mt-2 max-w-[38ch] text-[15px] leading-relaxed">{pick(item.text, locale)}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
