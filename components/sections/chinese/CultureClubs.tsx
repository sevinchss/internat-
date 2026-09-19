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
          className={cn("rounded-[22px]", large ? "aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5]" : "aspect-[16/10]")}
          imgClassName="transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
        <span
          lang="zh-CN"
          aria-hidden="true"
          className="bg-paper/92 font-hanzi text-ink absolute top-3 right-3 rounded-[10px] px-2.5 py-1 text-lg backdrop-blur-sm [writing-mode:vertical-rl]"
        >
          {card.hanzi}
        </span>
      </div>
      <div>
        <h3 className={cn("text-ink", large ? "text-display-s" : "font-sans text-xl font-bold tracking-normal")}>
          {pick(card.title, locale)}
        </h3>
        <p className="text-ink-2 mt-2 max-w-[48ch]">{pick(card.text, locale)}</p>
        <p className="text-ink-3 mt-4 flex items-center gap-2 text-sm font-semibold">
          <span aria-hidden="true" className="bg-accent h-px w-5" />
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
    <section aria-labelledby="zh-culture" className="border-line border-t py-20 lg:py-28">
      <div className="container-x">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <h2 id="zh-culture" className="text-display-m text-ink">
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
