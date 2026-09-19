import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { staticRoutes } from "@/lib/nav";
import { localizedUrl } from "@/lib/seo";
import { news } from "@/data/news";

export default function sitemap(): MetadataRoute.Sitemap {
  const entry = (path: string, lastModified?: string, priority = 0.7): MetadataRoute.Sitemap[number] => ({
    url: localizedUrl(routing.defaultLocale, path),
    lastModified: lastModified ? new Date(lastModified) : new Date(),
    priority,
    alternates: { languages: Object.fromEntries(routing.locales.map((l) => [l, localizedUrl(l, path)])) },
  });
  return [
    ...staticRoutes.map((p) => entry(p, undefined, p === "/" ? 1 : 0.8)),
    ...news.map((n) => entry(`/biz-haqimizda/yangiliklar/${n.slug}`, n.date, 0.6)),
  ];
}
