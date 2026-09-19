import { setRequestLocale } from "next-intl/server";
import { pageMetadata } from "@/lib/seo";
import { MissionHero } from "@/components/sections/mission/MissionHero";
import { Goals } from "@/components/sections/mission/Goals";
import { Values } from "@/components/sections/mission/Values";
import { IdentityStatement } from "@/components/sections/mission/IdentityStatement";

export async function generateMetadata({ params }: PageProps<"/[locale]/biz-haqimizda/maqsad-va-vazifalar">) {
  const { locale } = await params;
  return pageMetadata(locale, "mission", "/biz-haqimizda/maqsad-va-vazifalar");
}

export default async function MissionPage({ params }: PageProps<"/[locale]/biz-haqimizda/maqsad-va-vazifalar">) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <MissionHero />
      <Goals />
      <Values locale={locale} />
      <IdentityStatement locale={locale} />
    </>
  );
}
