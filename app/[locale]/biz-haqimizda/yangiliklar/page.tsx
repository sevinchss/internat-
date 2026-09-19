import { getTranslations, setRequestLocale } from "next-intl/server";
import { pageMetadata } from "@/lib/seo";
import { pick } from "@/lib/utils";
import { news, newsCategories, type NewsCategory } from "@/data/news";
import { newsPage } from "@/data/news-page";
import { NewsHero } from "@/components/sections/news/NewsHero";
import { NewsBrowser } from "@/components/sections/news/NewsBrowser";
import { categoryColor, toCard } from "@/components/sections/news/news-utils";

export async function generateMetadata({ params }: PageProps<"/[locale]/biz-haqimizda/yangiliklar">) {
  const { locale } = await params;
  return pageMetadata(locale, "news", "/biz-haqimizda/yangiliklar");
}

export default async function NewsPage({ params }: PageProps<"/[locale]/biz-haqimizda/yangiliklar">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("common");

  const cards = news.map((n) => toCard(n, locale));
  const featured = toCard(news.find((n) => n.featured) ?? news[0], locale);
  const categories = (Object.keys(newsCategories) as NewsCategory[]).map((id) => ({
    id,
    label: pick(newsCategories[id], locale),
    color: categoryColor[id],
  }));

  return (
    <>
      <NewsHero
        title={pick(newsPage.title, locale)}
        lead={pick(newsPage.lead, locale)}
        featuredLabel={pick(newsPage.featured, locale)}
        readMore={t("readMore")}
        minutesLabel={t("minutes")}
        item={featured}
      />
      <NewsBrowser
        items={cards}
        featuredSlug={featured.slug}
        categories={categories}
        labels={{
          heading: pick(newsPage.listHeading, locale),
          filter: pick(newsPage.filterLabel, locale),
          search: pick(newsPage.searchLabel, locale),
          searchPlaceholder: pick(newsPage.searchPlaceholder, locale),
          clear: pick(newsPage.clearSearch, locale),
          reset: pick(newsPage.resetFilters, locale),
          count: pick(newsPage.count, locale),
        }}
      />
    </>
  );
}
