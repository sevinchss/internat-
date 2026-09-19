import { useLocale } from "next-intl";
import { chineseCopy, cultureCards } from "@/data/chinese";
import { cn, pick } from "@/lib/utils";
import { Photo } from "@/components/ui/Photo";

type Card = (typeof cultureCards)[number];

function CultureCard({ card, locale, large }: { card: Card; locale: string; large?: boolean }) {
  return (
    <article
      className={cn(
        "group grid grid-cols-1 gap-5",
        large ? "" : "sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] sm:items-end lg:grid-cols-1",
      )}
    >
      <div className="relative">
        <Photo
          slot={card.photo}
          sizes={
            large ? "(min-width: 1024px) 700px, 100vw" : "(min-width: 1024px) 460px, (min-width: 640px) 50vw, 100vw"
          }
          className={cn("rounded-[6px]", large ? "aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5]" : "aspect-[16/10]")}
          imgClassName="transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04] motion-reduce:transition-none"
        />
        <span
          lang="zh-CN"
          aria-hidden="true"
          className="font-hanzi absolute top-4 right-4 rounded-[3px] bg-[var(--red)] px-1.5 py-2 text-base leading-tight text-white [writing-mode:vertical-rl]"
        >
          {card.hanzi}
        </span>
      </div>
      <div>
        <h3 className={cn("text-ink", large ? "text-display-s font-semibold" : "font-sans text-xl font-semibold tracking-normal")}>
          {pick(card.title, locale)}
        </h3>
        <p className="text-ink-2 mt-2 max-w-[48ch]">{pick(card.text, locale)}</p>
        <p className="text-ink-3 mt-4 flex items-center gap-2 text-sm font-medium">
          <span aria-hidden="true" className="bg-accent h-px w-5 transition-[width] duration-500 group-hover:w-10" />
          {pick(card.when, locale)}
        </p>
      </div>
    </article>
  );
}

/** Asymmetric: one tall card (calligraphy) + two stacked, each with its Chinese name as a vertical seal. */
export function CultureClubs() {
  const locale = useLocale();
  const c = chineseCopy.culture;
  const [first, ...rest] = cultureCards;
  return (
    <section aria-labelledby="zh-culture" className="py-20 lg:py-32">
      <div className="container-x">
        <div aria-hidden="true" className="bg-line mb-16 h-px lg:mb-24" />
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <h2 id="zh-culture" className="text-display-l text-ink max-w-[14ch]">
            {pick(c.title, locale)}
          </h2>
          <p className="text-ink-2 max-w-[44ch]">{pick(c.lead, locale)}</p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <CultureCard card={first} locale={locale} large />
          </div>
          <div className="grid grid-cols-1 content-start gap-12 lg:col-span-5 lg:pt-24">
            {rest.map((card) => (
              <CultureCard key={card.id} card={card} locale={locale} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
