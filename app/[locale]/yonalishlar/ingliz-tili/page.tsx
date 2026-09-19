import { setRequestLocale } from "next-intl/server";
import { pageMetadata } from "@/lib/seo";
import { EnglishHero } from "@/components/sections/english/EnglishHero";
import { SkillsWheel } from "@/components/sections/english/SkillsWheel";
import { EnglishCurriculum } from "@/components/sections/english/EnglishCurriculum";
import { ExamPathway } from "@/components/sections/english/ExamPathway";
import { ClubsScroller } from "@/components/sections/english/ClubsScroller";
import { EnglishTeachers } from "@/components/sections/english/EnglishTeachers";

export async function generateMetadata({ params }: PageProps<"/[locale]/yonalishlar/ingliz-tili">) {
  const { locale } = await params;
  return pageMetadata(locale, "english", "/yonalishlar/ingliz-tili");
}

export default async function EnglishPage({ params }: PageProps<"/[locale]/yonalishlar/ingliz-tili">) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div className="accent-amber">
      <EnglishHero />
      <SkillsWheel />
      <EnglishCurriculum />
      <ExamPathway />
      <ClubsScroller />
      <EnglishTeachers />
    </div>
  );
}
