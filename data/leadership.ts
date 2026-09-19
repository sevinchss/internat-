import type { L10n } from "@/lib/utils";

/** Page copy for /biz-haqimizda/rahbariyat */
export const leadershipCopy = {
  title: { uz: "Rahbariyat", en: "Leadership", ru: "Руководство" } satisfies L10n,
  welcomeLabel: { uz: "Direktorning soʻzi", en: "A word from the Head", ru: "Слово директора" } satisfies L10n,
  reception: { uz: "Qabul kunlari", en: "Office hours", ru: "Дни приёма" } satisfies L10n,
  deputiesTitle: { uz: "Direktor oʻrinbosarlari", en: "Deputy heads", ru: "Заместители директора" } satisfies L10n,
  deputiesIntro: {
    uz: "Har bir yoʻnalishning oʻz masʼuli bor. Savolingiz qaysi sohaga tegishli boʻlsa, toʻgʻridan-toʻgʻri oʻsha rahbarga murojaat qiling.",
    en: "Each area has one person in charge. Whatever your question is about, you can go straight to the right person.",
    ru: "У каждого направления есть свой ответственный. С любым вопросом можно обратиться напрямую к нужному руководителю.",
  } satisfies L10n,
  more: { uz: "Batafsil", en: "Details", ru: "Подробнее" } satisfies L10n,
  bio: { uz: "Qisqacha", en: "About", ru: "О себе" } satisfies L10n,
  duties: { uz: "Vazifalari", en: "Responsibilities", ru: "Обязанности" } satisfies L10n,
  contacts: { uz: "Aloqa", en: "Contact", ru: "Контакты" } satisfies L10n,
  chartTitle: { uz: "Boshqaruv tuzilmasi", en: "How the school is organised", ru: "Структура управления" } satisfies L10n,
  chartIntro: {
    uz: "Direktor, beshta yoʻnalish boʻyicha oʻrinbosarlar va ularga qarashli boʻlim hamda xizmatlar.",
    en: "The Head, five deputy heads and the departments and services each of them oversees.",
    ru: "Директор, пять заместителей по направлениям и подчинённые им отделы и службы.",
  } satisfies L10n,
  placeholderNote: {
    uz: "Ism-shariflar va aloqa maʼlumotlari vaqtincha — tez orada yangilanadi.",
    en: "Names and contact details are temporary and will be updated soon.",
    ru: "Имена и контакты временные — скоро будут обновлены.",
  } satisfies L10n,
};

/**
 * Departments under each deputy (keys = StaffMember.id in data/staff.ts).
 * TODO: replace with real data — the real org structure.
 */
export const departments: Record<string, L10n<string[]>> = {
  academic: {
    uz: ["Aniq fanlar kafedrasi", "Tabiiy fanlar kafedrasi", "Ijtimoiy-gumanitar fanlar kafedrasi", "Metodik kengash"],
    en: ["Mathematics & IT department", "Science department", "Humanities department", "Methodology council"],
    ru: ["Кафедра точных наук", "Кафедра естественных наук", "Социально-гуманитарная кафедра", "Методический совет"],
  },
  languages: {
    uz: ["Ingliz tili kafedrasi", "Xitoy tili kafedrasi", "Xalqaro aloqalar"],
    en: ["English department", "Chinese department", "International office"],
    ru: ["Кафедра английского языка", "Кафедра китайского языка", "Международный отдел"],
  },
  spiritual: {
    uz: ["Tadbirlar va toʻgaraklar", "Psixologik xizmat", "Oʻquvchilar kengashi"],
    en: ["Events and clubs", "Psychology service", "Student council"],
    ru: ["Мероприятия и кружки", "Психологическая служба", "Ученический совет"],
  },
  boarding: {
    uz: ["Tarbiyachilar", "Tibbiy xizmat", "Oshxona"],
    en: ["House staff", "Medical centre", "Canteen"],
    ru: ["Воспитатели", "Медпункт", "Столовая"],
  },
  operations: {
    uz: ["Xoʻjalik xizmati", "Xavfsizlik", "IT xizmati"],
    en: ["Facilities", "Security", "IT services"],
    ru: ["Хозяйственная служба", "Безопасность", "ИТ-служба"],
  },
};
