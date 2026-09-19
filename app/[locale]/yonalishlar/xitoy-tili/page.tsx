import { Noto_Serif_SC } from "next/font/google";
import { setRequestLocale } from "next-intl/server";
import { pageMetadata } from "@/lib/seo";
import { ChineseHero } from "@/components/sections/chinese/ChineseHero";
import { WhyChinese } from "@/components/sections/chinese/WhyChinese";
import { ChineseCurriculum } from "@/components/sections/chinese/ChineseCurriculum";
import { CharacterOfDay } from "@/components/sections/chinese/CharacterOfDay";
import { CultureClubs } from "@/components/sections/chinese/CultureClubs";
import { ChineseTeachers } from "@/components/sections/chinese/ChineseTeachers";

// Loaded only on this page: CJK font, split by unicode-range on Google's side, so no preload.
const notoSerifSC = Noto_Serif_SC({
  weight: ["400"], // one weight: every CJK weight adds ~200 KB of glyph slices + ~30 KB of @font-face CSS
  preload: false,
  display: "swap",
  variable: "--font-noto-serif-sc",
});

export async function generateMetadata({ params }: PageProps<"/[locale]/yonalishlar/xitoy-tili">) {
  const { locale } = await params;
  return pageMetadata(locale, "chinese", "/yonalishlar/xitoy-tili");
}

export default async function ChinesePage({ params }: PageProps<"/[locale]/yonalishlar/xitoy-tili">) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div className={`accent-red ${notoSerifSC.variable}`}>
      <ChineseHero />
      <WhyChinese />
      <ChineseCurriculum />
      <CharacterOfDay />
      <CultureClubs />
      <ChineseTeachers />
    </div>
  );
}
