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

export function Leisure() {
  const locale = useLocale();
  const c = dormCopy.leisure;
  return (
    <section aria-labelledby="dorm-leisure" className="bg-surface-2/60 py-20 lg:py-28">
      <div className="container-x">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-10">
          <h2 id="dorm-leisure" className="text-display-m text-ink lg:col-span-6">
            {pick(c.title, locale)}
          </h2>
          <p className="max-w-[46ch] text-ink-2 lg:col-span-5 lg:col-start-8 lg:self-end">{pick(c.lead, locale)}</p>
        </div>

        <ul className="mt-12 grid auto-rows-[180px] grid-cols-2 gap-3 sm:auto-rows-[220px] sm:gap-4 md:grid-cols-4 lg:auto-rows-[250px]">
          {leisure.map((item, i) => (
            <li key={item.id} className={cn("relative overflow-hidden rounded-[20px]", spans[i])}>
              <Photo slot={item.photo} sizes={i === 0 ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 50vw"} className="h-full w-full" />
              <div className="absolute bottom-2.5 left-2.5 right-2.5 flex sm:bottom-3 sm:left-3 sm:right-auto">
                <p className="rounded-[12px] bg-paper/92 px-3 py-2 leading-tight text-ink backdrop-blur-sm">
                  <span className="block text-[14px] font-semibold sm:text-[15px]">{pick(item.title, locale)}</span>
                  <span className="block text-[12px] text-ink-2 sm:text-[13px]">{pick(item.when, locale)}</span>
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
