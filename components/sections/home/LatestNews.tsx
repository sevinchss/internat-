import { getLocale, getTranslations } from "next-intl/server";
import { news, newsCategories } from "@/data/news";
import { newsBlock } from "@/data/home";
import { formatDate, pick } from "@/lib/utils";
import { Link } from "@/i18n/navigation";
import { Photo } from "@/components/ui/Photo";
import { ButtonLink } from "@/components/ui/Button";

const base = "/biz-haqimizda/yangiliklar";

/** 1 large + 3 compact from data/news. */
export async function LatestNews() {
  const locale = await getLocale();
  const t = await getTranslations("common");
  const [lead, ...rest] = [...news].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 4);
  if (!lead) return null;

  return (
    <section aria-labelledby="news-title" className="container-x py-24 lg:py-32">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <h2 id="news-title" className="text-display-l text-ink">
          {pick(newsBlock.title, locale)}
        </h2>
        <ButtonLink href={base} variant="outline">
          {t("allNews")}
        </ButtonLink>
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-12">
        <article className="group relative lg:col-span-7">
          <Photo slot={lead.image} sizes="(min-width: 1024px) 56vw, 100vw" className="aspect-[4/3] rounded-[24px] lg:aspect-[16/11]" imgClassName="transition-transform duration-700 group-hover:scale-[1.03]" />
          <div className="mt-6 flex items-center gap-3 text-sm text-ink-3">
            <time dateTime={lead.date}>{formatDate(lead.date, locale)}</time>
            <span aria-hidden="true" className="size-1 rounded-full bg-ring" />
            <span className="font-semibold text-ink-2">{pick(newsCategories[lead.category], locale)}</span>
          </div>
          <h3 className="mt-3 text-display-m text-ink">
            <Link href={`${base}/${lead.slug}`} className="after:absolute after:inset-0 after:content-[''] group-hover:text-primary-ink">
              {pick(lead.title, locale)}
            </Link>
          </h3>
          <p className="mt-3 max-w-[60ch] text-ink-2">{pick(lead.excerpt, locale)}</p>
        </article>

        <ul className="divide-y divide-line border-t border-line lg:col-span-5 lg:border-t-0">
          {rest.map((n) => (
            <li key={n.slug} className="first:pt-0">
              <article className="group relative grid grid-cols-[1fr_112px] gap-5 py-6 sm:grid-cols-[1fr_148px]">
                <div>
                  <div className="flex items-center gap-3 text-[13px] text-ink-3">
                    <time dateTime={n.date}>{formatDate(n.date, locale)}</time>
                    <span aria-hidden="true" className="size-1 rounded-full bg-ring" />
                    <span className="font-semibold text-ink-2">{pick(newsCategories[n.category], locale)}</span>
                  </div>
                  <h3 className="mt-2 font-sans text-lg font-semibold leading-snug tracking-normal text-ink">
                    <Link href={`${base}/${n.slug}`} className="after:absolute after:inset-0 after:content-[''] group-hover:text-primary-ink">
                      {pick(n.title, locale)}
                    </Link>
                  </h3>
                </div>
                <Photo slot={n.image} sizes="160px" className="aspect-square rounded-full" imgClassName="transition-transform duration-500 group-hover:scale-110" />
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
