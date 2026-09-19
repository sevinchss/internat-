import { setRequestLocale } from "next-intl/server";
import { pageMetadata } from "@/lib/seo";
import { GalleryHero } from "@/components/sections/gallery/GalleryHero";
import { Gallery } from "@/components/sections/gallery/Gallery";

export async function generateMetadata({ params }: PageProps<"/[locale]/biz-haqimizda/fotogalereya">) {
  const { locale } = await params;
  return pageMetadata(locale, "gallery", "/biz-haqimizda/fotogalereya");
}

export default async function GalleryPage({ params }: PageProps<"/[locale]/biz-haqimizda/fotogalereya">) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <GalleryHero locale={locale} />
      <Gallery />
    </>
  );
}
