// Page copy for /biz-haqimizda/yangiliklar and its articles. Shared words (search, all, loadMore, share…) live in messages → "common".
import type { L10n } from "@/lib/utils";

export const newsPage = {
  title: { uz: "Yangiliklar", en: "News", ru: "Новости" } satisfies L10n,
  lead: {
    uz: "Maktab-internat hayotidagi voqealar, qabul boʻyicha eʼlonlar va oʻquvchilarimizning kundalik kashfiyotlari.",
    en: "Events from school life, admissions announcements and the everyday discoveries of our students.",
    ru: "События школьной жизни, объявления о приёме и ежедневные открытия наших учеников.",
  } satisfies L10n,
  featured: { uz: "Asosiy xabar", en: "Top story", ru: "Главное" } satisfies L10n,
  filterLabel: { uz: "Rukn boʻyicha saralash", en: "Filter by category", ru: "Фильтр по рубрике" } satisfies L10n,
  searchLabel: { uz: "Yangiliklardan qidirish", en: "Search the news", ru: "Поиск по новостям" } satisfies L10n,
  searchPlaceholder: { uz: "Masalan: laboratoriya", en: "For example: lab", ru: "Например: лаборатория" } satisfies L10n,
  clearSearch: { uz: "Qidiruvni tozalash", en: "Clear search", ru: "Очистить поиск" } satisfies L10n,
  resetFilters: { uz: "Barcha yangiliklarni koʻrsatish", en: "Show all news", ru: "Показать все новости" } satisfies L10n,
  /** {shown} / {total} are replaced in the component */
  count: {
    uz: "{total} ta yangilikdan {shown} tasi koʻrsatilmoqda",
    en: "Showing {shown} of {total}",
    ru: "Показано {shown} из {total}",
  } satisfies L10n,
  listHeading: { uz: "Barcha xabarlar", en: "All stories", ru: "Все материалы" } satisfies L10n,

  // article
  back: { uz: "Yangiliklarga qaytish", en: "Back to news", ru: "Ко всем новостям" } satisfies L10n,
  gallery: { uz: "Suratlar", en: "Photos", ru: "Фотографии" } satisfies L10n,
  openPhoto: { uz: "Suratni kattalashtirib ochish", en: "Open photo", ru: "Открыть фото" } satisfies L10n,
  shareTelegram: { uz: "Telegramda ulashish", en: "Share on Telegram", ru: "Поделиться в Telegram" } satisfies L10n,
  shareFacebook: { uz: "Facebookda ulashish", en: "Share on Facebook", ru: "Поделиться в Facebook" } satisfies L10n,
  published: { uz: "Eʼlon qilingan sana", en: "Published", ru: "Опубликовано" } satisfies L10n,
  category: { uz: "Rukn", en: "Category", ru: "Рубрика" } satisfies L10n,
};
