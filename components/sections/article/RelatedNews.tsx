import { Link } from "@/i18n/navigation";
import { Photo } from "@/components/ui/Photo";
import type { NewsCardData } from "@/components/sections/news/news-utils";

/** Related stories: one lead story with a photo, the rest as compact stacked rows. */
export function RelatedNews({
  items,
  heading,
  allLabel,
  minutesLabel,
}: {
  items: NewsCardData[];
  heading: string;
  allLabel: string;
  minutesLabel: string;
}) {
  if (!items.length) return null;
  const [lead, ...rest] = items;
  return (
    <section aria-labelledby="related-heading" className="pb-24 lg:pb-36">
      <div className="container-x">
        <div className="border-line flex flex-wrap items-end justify-between gap-4 border-t pt-14 lg:pt-20">
          <h2 id="related-heading" className="text-display-m">
            {heading}
          </h2>
          <Link
            href="/biz-haqimizda/yangiliklar"
            className="text-primary-ink decoration-line hover:decoration-primary-ink min-h-11 content-center font-semibold underline decoration-2 underline-offset-[6px]"
          >
            {allLabel}
          </Link>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-12">
          <article className="group relative lg:col-span-7">
            <Photo
              slot={lead.image}
              sizes="(min-width: 1024px) 720px, 100vw"
              className="aspect-[16/10] rounded-[4px]"
              imgClassName="transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              decorative
            />
            <Meta item={lead} minutesLabel={minutesLabel} className="mt-6" />
            <h3 className="text-display-s mt-3">
              <Link
                href={lead.href}
                className="decoration-2 underline-offset-[6px] group-hover:underline after:absolute after:inset-0 after:content-['']"
              >
                {lead.title}
              </Link>
            </h3>
            <p className="text-ink-2 mt-3 max-w-[60ch]">{lead.excerpt}</p>
          </article>

          {rest.length > 0 && (
            <ul className="divide-line border-line divide-y border-y lg:col-span-5 lg:self-start">
              {rest.map((n) => (
                <li
                  key={n.slug}
                  className="group relative grid grid-cols-[1fr_88px] gap-5 py-6 sm:grid-cols-[1fr_120px]"
                >
                  <div>
                    <Meta item={n} minutesLabel={minutesLabel} />
                    <h3 className="mt-2 font-sans text-lg leading-snug font-semibold tracking-normal">
                      <Link
                        href={n.href}
                        className="decoration-2 underline-offset-4 group-hover:underline after:absolute after:inset-0 after:content-['']"
                      >
                        {n.title}
                      </Link>
                    </h3>
                  </div>
                  <Photo
                    slot={n.image}
                    sizes="120px"
                    className="aspect-square rounded-full"
                    imgClassName="transition-transform duration-500 ease-out group-hover:scale-[1.06]"
                    decorative
                  />
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
    <p className={`text-ink-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm ${className ?? ""}`}>
      <span className="text-ink-2 inline-flex items-center gap-2 font-medium">
        <span aria-hidden="true" className="size-1.5 rounded-full" style={{ background: item.color }} />
        {item.categoryLabel}
      </span>
      <time dateTime={item.date}>{item.dateLabel}</time>
      <span>
        {item.minutes} {minutesLabel}
      </span>
    </p>
  );
}
