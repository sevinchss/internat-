import { setRequestLocale } from "next-intl/server";
import { pageMetadata } from "@/lib/seo";
import { DormHero } from "@/components/sections/dorm/DormHero";
import { RoomTour } from "@/components/sections/dorm/RoomTour";
import { Routine } from "@/components/sections/dorm/Routine";
import { Care } from "@/components/sections/dorm/Care";
import { Canteen } from "@/components/sections/dorm/Canteen";
import { Leisure } from "@/components/sections/dorm/Leisure";
import { ParentsFaq } from "@/components/sections/dorm/ParentsFaq";

export async function generateMetadata({ params }: PageProps<"/[locale]/maktab-hayoti/yotoqxona">) {
  const { locale } = await params;
  return pageMetadata(locale, "dorm", "/maktab-hayoti/yotoqxona");
}

export default async function DormPage({ params }: PageProps<"/[locale]/maktab-hayoti/yotoqxona">) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <DormHero />
      <RoomTour />
      <Routine />
      <Care />
      <Canteen />
      <Leisure />
      <ParentsFaq />
    </>
  );
}
