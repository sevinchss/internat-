import { setRequestLocale } from "next-intl/server";
import { pageMetadata } from "@/lib/seo";
import { DirectorHero } from "@/components/sections/leadership/DirectorHero";
import { Deputies } from "@/components/sections/leadership/Deputies";
import { OrgChart } from "@/components/sections/leadership/OrgChart";

export async function generateMetadata({ params }: PageProps<"/[locale]/biz-haqimizda/rahbariyat">) {
  const { locale } = await params;
  return pageMetadata(locale, "leadership", "/biz-haqimizda/rahbariyat");
}

export default async function LeadershipPage({ params }: PageProps<"/[locale]/biz-haqimizda/rahbariyat">) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <DirectorHero locale={locale} />
      <Deputies />
      <OrgChart locale={locale} />
    </>
  );
}
