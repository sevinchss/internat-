import { useLocale } from "next-intl";
import { dormCopy, leisure } from "@/data/dorm";
import { cn, pick } from "@/lib/utils";
import { Photo } from "@/components/ui/Photo";

// Bento spans for the six tiles (md+). On phones: two columns, first and last tiles full width.
const spans = [
  "col-span-2 md:col-span-2 md:row-span-2",
  "col-span-1",
  "col-span-1",
  "col-span-1 md:col-span-2",
  "col-span-1 md:col-span-2",
  "col-span-2 md:col-span-2",
];

/** Weekends: a photo mosaic with captions on a soft bottom scrim; photos ease in on hover. */
export function Leisure() {
  const locale = useLocale();
  const c = dormCopy.leisure;
  return (
    <section aria-labelledby="dorm-leisure" className="py-20 lg:py-32">
      <div className="container-x">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-10">
          <h2 id="dorm-leisure" className="text-display-l text-ink lg:col-span-7">
            {pick(c.title, locale)}
          </h2>
          <p className="text-ink-2 max-w-[46ch] lg:col-span-4 lg:col-start-9 lg:self-end">{pick(c.lead, locale)}</p>
        </div>

        <ul className="mt-12 grid auto-rows-[180px] grid-cols-2 gap-2 sm:auto-rows-[220px] sm:gap-3 md:grid-cols-4 lg:mt-16 lg:auto-rows-[250px]">
          {leisure.map((item, i) => (
            <li key={item.id} className={cn("group relative overflow-hidden rounded-[6px]", spans[i])}>
              <Photo
                slot={item.photo}
                sizes={i === 0 ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 50vw"}
                className="h-full w-full"
                imgClassName="transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04] motion-reduce:transition-none"
              />
              <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
              <p className="absolute right-3 bottom-3 left-3 leading-tight text-white [text-shadow:0_1px_8px_rgb(0_0_0/0.45)] sm:right-4 sm:bottom-4 sm:left-4">
                <span className="block text-[14px] font-semibold sm:text-[15px]">{pick(item.title, locale)}</span>
                <span className="block text-[12px] text-white/85 sm:text-[13px]">{pick(item.when, locale)}</span>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
