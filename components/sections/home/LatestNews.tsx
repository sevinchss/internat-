import { getLocale, getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { news, newsCategories } from "@/data/news";
import { labels, newsBlock } from "@/data/home";
import { formatDate, pick } from "@/lib/utils";
import { Link } from "@/i18n/navigation";
import { Photo } from "@/components/ui/Photo";
import { SectionLabel } from "./SectionLabel";

const base = "/biz-haqimizda/yangiliklar";

/** Lead story in an arch crop (a nod to the heritage portal) + three numbered stories on hairlines. */
export async function LatestNews() {
  const locale = await getLocale();
  const t = await getTranslations("common");
  const [lead, ...rest] = [...news].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 4);
  if (!lead) return null;

  return (
    <section aria-labelledby="news-title" className="container-x py-28 lg:py-40">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <SectionLabel n="05">{pick(labels.news, locale)}</SectionLabel>
          <h2 id="news-title" className="text-display-l text-ink mt-6">
            {pick(newsBlock.title, locale)}
          </h2>
        </div>
        <Link href={base} className="group text-ink inline-flex min-h-11 items-center gap-3 text-[15px] font-medium">
          <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-500 group-hover:bg-[length:100%_1px]">
            {t("allNews")}
          </span>
          <span
            aria-hidden="true"
            className="border-ink/15 group-hover:border-ink group-hover:bg-ink group-hover:text-paper grid size-10 place-items-center rounded-full border transition-[transform,background-color,color,border-color] duration-500 group-hover:translate-x-1"
          >
            <ArrowRight className="size-4" strokeWidth={1.7} />
          </span>
        </Link>
      </div>

      <div className="mt-14 grid gap-14 lg:mt-20 lg:grid-cols-12 lg:gap-12">
        <article className="group relative lg:col-span-5">
          <Photo
            slot={lead.image}
            sizes="(min-width: 1024px) 38vw, 100vw"
            className="aspect-[4/5] rounded-t-full rounded-b-[6px] sm:aspect-[5/5] lg:aspect-[4/5]"
            imgClassName="transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
          />
          <div className="text-ink-3 mt-7 flex items-center gap-3 text-sm">
            <time dateTime={lead.date}>{formatDate(lead.date, locale)}</time>
            <span aria-hidden="true" className="bg-ink-3/40 h-px w-5" />
            <span className="text-ink-2">{pick(newsCategories[lead.category], locale)}</span>
          </div>
          <h3 className="text-display-s text-ink mt-3">
            <Link
              href={`${base}/${lead.slug}`}
              className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 group-hover:bg-[length:100%_1px] after:absolute after:inset-0 after:content-['']"
            >
              {pick(lead.title, locale)}
            </Link>
          </h3>
          <p className="text-ink-2 mt-3 max-w-[56ch]">{pick(lead.excerpt, locale)}</p>
        </article>

        <ol className="border-line self-start border-t lg:col-span-6 lg:col-start-7 lg:mt-24">
          {rest.map((n, i) => (
            <li key={n.slug}>
              <article className="group border-line relative grid grid-cols-[1fr_auto] items-center gap-5 border-b py-7 sm:grid-cols-[auto_1fr_auto] sm:gap-8">
                <span
                  aria-hidden="true"
                  className="text-ink-3 hidden w-14 self-start text-[1.75rem] leading-none font-light tracking-[-0.04em] tabular-nums sm:block sm:w-14 sm:text-[2.25rem]"
                >
                  0{i + 2}
                </span>
                <div>
                  <div className="text-ink-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px]">
                    <time dateTime={n.date}>{formatDate(n.date, locale)}</time>
                    <span aria-hidden="true" className="bg-ink-3/40 h-px w-4" />
                    <span className="text-ink-2">{pick(newsCategories[n.category], locale)}</span>
                  </div>
                  <h3 className="text-ink mt-2 text-lg leading-snug">
                    <Link
                      href={`${base}/${n.slug}`}
                      className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 group-hover:bg-[length:100%_1px] after:absolute after:inset-0 after:content-['']"
                    >
                      {pick(n.title, locale)}
                    </Link>
                  </h3>
                </div>
                <Photo
                  slot={n.image}
                  sizes="112px"
                  quality={60}
                  className="size-16 rounded-full sm:size-24"
                  imgClassName="transition-transform duration-700 group-hover:scale-110"
                />
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
