import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { SITE_URL, school } from "./site";

const ogLocale: Record<Locale, string> = { uz: "uz_UZ", en: "en_GB", ru: "ru_RU" };

export function localizedUrl(locale: string, path: string) {
  return `${SITE_URL}/${locale}${path === "/" ? "" : path}`;
}

export function alternates(locale: string, path: string): Metadata["alternates"] {
  const languages: Record<string, string> = {};
  for (const l of routing.locales) languages[l] = localizedUrl(l, path);
  languages["x-default"] = localizedUrl(routing.defaultLocale, path);
  return { canonical: localizedUrl(locale, path), languages };
}

type PageKey =
  | "home" | "leadership" | "mission" | "gallery" | "news" | "admission" | "dorm" | "chinese" | "english" | "contact";

/** Per-page, per-locale metadata with hreflang alternates and Open Graph. */
export async function pageMetadata(
  locale: string,
  key: PageKey,
  path: string,
  override?: { title?: string; description?: string; image?: string },
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "meta" });
  const title = override?.title ?? (key === "home" ? t("defaultTitle") : t(`pages.${key}.title`));
  const description = override?.description ?? t(`pages.${key}.description`);
  const image = override?.image ?? "/brand/og-base.png";
  return {
    title: key === "home" ? { absolute: title } : title,
    description,
    alternates: alternates(locale, path),
    openGraph: {
      type: key === "news" && override ? "article" : "website",
      siteName: t("siteName"),
      title,
      description,
      url: localizedUrl(locale, path),
      locale: ogLocale[locale as Locale],
      images: [{ url: image, width: 1200, height: 630, alt: school.brandName }],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}
