import { Link } from "@/i18n/navigation";
import { Photo } from "@/components/ui/Photo";
import type { NewsCardData } from "@/components/sections/news/news-utils";

/** Related stories: one lead story with a photo, the rest as compact stacked rows. */
export function RelatedNews({ items, heading, allLabel, minutesLabel }: { items: NewsCardData[]; heading: string; allLabel: string; minutesLabel: string }) {
  if (!items.length) return null;
  const [lead, ...rest] = items;
  return (
    <section aria-labelledby="related-heading" className="border-t border-line bg-surface-2/60 py-20 lg:py-28 dark:bg-surface/40">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 id="related-heading" className="text-display-m">
            {heading}
          </h2>
          <Link href="/biz-haqimizda/yangiliklar" className="min-h-11 content-center font-semibold text-primary-ink underline decoration-line decoration-2 underline-offset-[6px] hover:decoration-primary-ink">
            {allLabel}
          </Link>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-12">
          <article className="group relative lg:col-span-7">
            <Photo
              slot={lead.image}
              sizes="(min-width: 1024px) 720px, 100vw"
              className="aspect-[16/10] rounded-[24px]"
              imgClassName="transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              decorative
            />
            <Meta item={lead} minutesLabel={minutesLabel} className="mt-6" />
            <h3 className="mt-3 text-display-s">
              <Link href={lead.href} className="decoration-2 underline-offset-[6px] after:absolute after:inset-0 after:content-[''] group-hover:underline">
                {lead.title}
              </Link>
            </h3>
            <p className="mt-3 max-w-[60ch] text-ink-2">{lead.excerpt}</p>
          </article>

          {rest.length > 0 && (
            <ul className="divide-y divide-line border-y border-line lg:col-span-5 lg:self-start">
              {rest.map((n) => (
                <li key={n.slug} className="group relative grid grid-cols-[1fr_88px] gap-5 py-6 sm:grid-cols-[1fr_120px]">
                  <div>
                    <Meta item={n} minutesLabel={minutesLabel} />
                    <h3 className="mt-2 font-sans text-lg font-semibold leading-snug tracking-normal">
                      <Link href={n.href} className="decoration-2 underline-offset-4 after:absolute after:inset-0 after:content-[''] group-hover:underline">
                        {n.title}
                      </Link>
                    </h3>
                  </div>
                  <Photo slot={n.image} sizes="120px" className="aspect-square rounded-2xl" decorative />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}

function Meta({ item, minutesLabel, className }: { item: NewsCardData; minutesLabel: string; className?: string }) {
  return (
    <p className={`flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ink-3 ${className ?? ""}`}>
      <span className="inline-flex items-center gap-2 font-semibold text-ink-2">
        <span aria-hidden="true" className="size-2 rounded-full" style={{ background: item.color }} />
        {item.categoryLabel}
      </span>
      <time dateTime={item.date}>{item.dateLabel}</time>
      <span>
        {item.minutes} {minutesLabel}
      </span>
    </p>
  );
}
