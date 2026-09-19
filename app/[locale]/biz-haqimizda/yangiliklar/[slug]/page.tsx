import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getNewsBySlug, news, newsCategories } from "@/data/news";
import { newsPage } from "@/data/news-page";
import { localizedUrl, pageMetadata } from "@/lib/seo";
import { SITE_URL, school } from "@/lib/site";
import { formatDate, pick } from "@/lib/utils";
import { JsonLd } from "@/components/seo/JsonLd";
import { ArticleHero } from "@/components/sections/article/ArticleHero";
import { ArticleBody } from "@/components/sections/article/ArticleBody";
import { ArticleGallery } from "@/components/sections/article/ArticleGallery";
import { ReadingProgress } from "@/components/sections/article/ReadingProgress";
import { ShareBar } from "@/components/sections/article/ShareBar";
import { RelatedNews } from "@/components/sections/article/RelatedNews";
import { categoryColor, newsHref, toCard } from "@/components/sections/news/news-utils";

// Only known slugs exist (data/news.ts) — anything else is a real 404, not a streamed fallback.
export const dynamicParams = false;

export function generateStaticParams() {
  return news.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/biz-haqimizda/yangiliklar/[slug]">) {
  const { locale, slug } = await params;
  const item = getNewsBySlug(slug);
  if (!item) return pageMetadata(locale, "news", "/biz-haqimizda/yangiliklar");
  return pageMetadata(locale, "news", newsHref(slug), {
    title: pick(item.title, locale),
    description: pick(item.excerpt, locale),
    image: item.image.src,
  });
}

export default async function ArticlePage({ params }: PageProps<"/[locale]/biz-haqimizda/yangiliklar/[slug]">) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const item = getNewsBySlug(slug);
  if (!item) notFound();
  const t = await getTranslations("common");

  const title = pick(item.title, locale);
  const url = localizedUrl(locale, newsHref(slug));
  const minutesLabel = `${item.readingMinutes} ${t("minutes")}`;

  const others = news.filter((n) => n.slug !== slug);
  const related = [
    ...others.filter((n) => n.category === item.category),
    ...others.filter((n) => n.category !== item.category),
  ]
    .slice(0, 3)
    .map((n) => toCard(n, locale));

  const shareLabels = {
    telegram: pick(newsPage.shareTelegram, locale),
    facebook: pick(newsPage.shareFacebook, locale),
  };

  return (
    <>
      <ArticleHero
        backLabel={pick(newsPage.back, locale)}
        categoryLabel={pick(newsCategories[item.category], locale)}
        color={categoryColor[item.category]}
        date={item.date}
        dateLabel={formatDate(item.date, locale)}
        minutesLabel={minutesLabel}
        title={title}
        excerpt={pick(item.excerpt, locale)}
        image={item.image}
      />

      <ReadingProgress className="container-x grid gap-10 pt-12 pb-20 lg:grid-cols-12 lg:pt-20 lg:pb-28">
        <aside className="hidden lg:col-span-3 lg:block">
          <div className="sticky top-28 space-y-8">
            <dl className="space-y-4 text-[15px]">
              <div>
                <dt className="text-ink-3 text-sm font-semibold">{pick(newsPage.published, locale)}</dt>
                <dd className="text-ink mt-1">
                  <time dateTime={item.date}>{formatDate(item.date, locale)}</time>
                </dd>
              </div>
              <div>
                <dt className="text-ink-3 text-sm font-semibold">{pick(newsPage.category, locale)}</dt>
                <dd className="text-ink mt-1">{pick(newsCategories[item.category], locale)}</dd>
              </div>
            </dl>
            <ShareBar url={url} title={title} labels={shareLabels} vertical />
          </div>
        </aside>

        <article className="min-w-0 lg:col-span-8 lg:col-start-5">
          <ArticleBody
            blocks={pick(item.body, locale)}
            insert={
              item.gallery?.length ? (
                <ArticleGallery
                  slots={item.gallery}
                  heading={pick(newsPage.gallery, locale)}
                  openLabel={pick(newsPage.openPhoto, locale)}
                />
              ) : null
            }
          />
          <ShareBar
            url={url}
            title={title}
            labels={shareLabels}
            className="border-line mt-14 border-t pt-8 lg:hidden"
          />
        </article>
      </ReadingProgress>

      <RelatedNews items={related} heading={t("related")} allLabel={t("allNews")} minutesLabel={t("minutes")} />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "NewsArticle",
          headline: title,
          description: pick(item.excerpt, locale),
          image: [item.image.src.startsWith("http") ? item.image.src : `${SITE_URL}${item.image.src}`],
          datePublished: `${item.date}T09:00:00+05:00`,
          dateModified: `${item.date}T09:00:00+05:00`,
          inLanguage: locale,
          articleSection: pick(newsCategories[item.category], locale),
          mainEntityOfPage: { "@type": "WebPage", "@id": url },
          url,
          author: { "@type": "Organization", name: pick(school.name, locale), url: `${SITE_URL}/${locale}` },
          publisher: {
            "@type": "Organization",
            "@id": `${SITE_URL}/#school`,
            name: pick(school.name, locale),
            logo: { "@type": "ImageObject", url: `${SITE_URL}/brand/logo-full.png` },
          },
        }}
      />
    </>
  );
}
