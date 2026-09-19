import type { L10n } from "./utils";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ils.piima.uz"; // TODO: replace with real domain

export const school = {
  name: {
    uz: "Xorijiy tillarga ixtisoslashtirilgan maktab-internati",
    en: "International Language School",
    ru: "Специализированная школа-интернат иностранных языков",
  } satisfies L10n,
  shortName: { uz: "Xorijiy tillar maktabi", en: "Language School", ru: "Школа языков" } satisfies L10n,
  brandName: "International Language School",
  foundedYear: 2026,

  // TODO: replace with real data
  address: {
    uz: "Toshkent shahri, Mirzo Ulugʻbek tumani, Universitet koʻchasi, 7-uy",
    en: "7 Universitet Street, Mirzo Ulugʻbek district, Tashkent",
    ru: "г. Ташкент, Мирзо-Улугбекский район, ул. Университетская, 7",
  } satisfies L10n,
  // TODO: replace with real data
  phones: [
    { label: { uz: "Qabul boʻlimi", en: "Admissions office", ru: "Приёмная комиссия" }, value: "+998 71 203 47 18" },
    { label: { uz: "Devonxona", en: "Front office", ru: "Канцелярия" }, value: "+998 71 203 47 26" },
  ],
  email: "info@ils.piima.uz", // TODO: replace with real data
  // TODO: replace with real data
  hours: {
    uz: "Dushanba – Juma, 09:00 – 18:00",
    en: "Monday – Friday, 09:00 – 18:00",
    ru: "Понедельник – пятница, 09:00 – 18:00",
  } satisfies L10n,
  // TODO: replace with real coordinates of the campus
  geo: { lat: 41.3385, lng: 69.2862 },
  // Real accounts, as linked from the school's official Telegram channel
  socials: [
    { id: "telegram", label: "Telegram", href: "https://t.me/piima_xorijiy_tillar" },
    { id: "instagram", label: "Instagram", href: "https://instagram.com/piima_xorijiy_tillar" },
    { id: "facebook", label: "Facebook", href: "https://www.facebook.com/profile.php?id=61593484417178" },
    {
      id: "linkedin",
      label: "LinkedIn",
      href: "https://www.linkedin.com/company/xorijiy-tillarga-ixtisoslashtirilgan-maktab/",
    },
  ] as const,
  links: {
    piima: "https://piima.uz",
    ariza: "https://ariza.piima.uz",
    mygov: "https://my.gov.uz",
  },
};

export const mapEmbedSrc = `https://www.google.com/maps?q=${school.geo.lat},${school.geo.lng}&z=15&output=embed`;
