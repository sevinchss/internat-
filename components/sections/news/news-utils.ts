import type { ImageSlot } from "@/lib/images";
import { newsCategories, type NewsCategory, type NewsItem } from "@/data/news";
import { formatDate, pick } from "@/lib/utils";

/** One small accent per category — used as a dot, never as a fill. */
export const categoryColor: Record<NewsCategory, string> = {
  events: "var(--orange)",
  admission: "var(--navy)",
  academics: "var(--green)",
  culture: "var(--purple)",
};

const intl: Record<string, string> = { en: "en-GB", ru: "ru-RU" };

/** Day number + month name in the grammatical form used after a day ("сентября", "sentabr"). Server-side only. */
export function dayMonth(iso: string, locale: string) {
  const day = String(Number(iso.slice(8, 10)));
  if (locale === "uz") {
    const s = formatDate(iso, "uz", { withYear: false });
    return { day, month: s.slice(s.indexOf("-") + 1), year: iso.slice(0, 4) };
  }
  const parts = new Intl.DateTimeFormat(intl[locale] ?? "en-GB", { day: "numeric", month: "long", timeZone: "Asia/Tashkent" }).formatToParts(
    new Date(iso + "T12:00:00+05:00"),
  );
  return { day, month: parts.find((p) => p.type === "month")?.value ?? "", year: iso.slice(0, 4) };
}

/** Serializable, locale-resolved shape passed to client components (dates formatted on the server to avoid TZ mismatches). */
export type NewsCardData = {
  slug: string;
  href: string;
  date: string;
  dateLabel: string;
  day: string;
  month: string;
  year: string;
  category: NewsCategory;
  categoryLabel: string;
  color: string;
  minutes: number;
  title: string;
  excerpt: string;
  image: ImageSlot;
};

export const newsHref = (slug: string) => `/biz-haqimizda/yangiliklar/${slug}`;

export function toCard(n: NewsItem, locale: string): NewsCardData {
  const dm = dayMonth(n.date, locale);
  return {
    slug: n.slug,
    href: newsHref(n.slug),
    date: n.date,
    dateLabel: formatDate(n.date, locale),
    ...dm,
    category: n.category,
    categoryLabel: pick(newsCategories[n.category], locale),
    color: categoryColor[n.category],
    minutes: n.readingMinutes,
    title: pick(n.title, locale),
    excerpt: pick(n.excerpt, locale),
    image: n.image,
  };
}
