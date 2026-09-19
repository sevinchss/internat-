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

/** Care & safety: one quiet row of four, separated by hairlines. */
export function Care() {
  const locale = useLocale();
  const c = dormCopy.care;
  return (
    <section aria-labelledby="dorm-care" className="border-y border-line bg-surface py-20 lg:py-24">
      <div className="container-x">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <h2 id="dorm-care" className="max-w-[16ch] text-display-m text-ink">
            {pick(c.title, locale)}
          </h2>
          <p className="max-w-[42ch] text-body-l text-ink-2">{pick(c.lead, locale)}</p>
        </div>

        <ul className="mt-14 grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {care.map((item, i) => {
            const Icon = icons[item.icon];
            return (
              <li
                key={item.id}
                className={[
                  "sm:px-6 lg:px-8",
                  i % 2 === 1 ? "sm:border-l sm:border-line" : "sm:pl-0",
                  i > 0 ? "lg:border-l lg:border-line" : "lg:pl-0",
                  i === 2 ? "lg:pl-8" : "",
                ].join(" ")}
              >
                <span className="flex size-14 items-center justify-center rounded-full border border-line text-ink">
                  <Icon className="size-6" strokeWidth={1.6} aria-hidden="true" />
                </span>
                <h3 className="mt-6 font-sans text-lg font-bold tracking-normal text-ink">{pick(item.title, locale)}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{pick(item.text, locale)}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
