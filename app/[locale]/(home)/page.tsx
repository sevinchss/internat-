import { setRequestLocale } from "next-intl/server";
import { pageMetadata } from "@/lib/seo";
import { Hero } from "@/components/sections/home/Hero";
import { Pillars } from "@/components/sections/home/Pillars";
import { FirstYear } from "@/components/sections/home/FirstYear";
import { Directions } from "@/components/sections/home/Directions";
import { DayDial } from "@/components/sections/home/DayDial";
import { LatestNews } from "@/components/sections/home/LatestNews";
import { PhotoStrip } from "@/components/sections/home/PhotoStrip";
import { AdmissionCta } from "@/components/sections/home/AdmissionCta";

export async function generateMetadata({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  return pageMetadata(locale, "home", "/");
}

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <Hero />
      <Pillars />
      <FirstYear />
      <Directions />
      <DayDial />
      <LatestNews />
      <PhotoStrip />
      <AdmissionCta />
    </>
  );
}
