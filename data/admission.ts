// Admission page copy. Facts (real): 1–15 June 2026, ariza.piima.uz / my.gov.uz, 22,315 applications, grades 5–7,
// one-stage exam with Cambridge Assessment (Maths 16 CT + 24 PS = 40; English Reading + Grammar = 40).
// Everything marked TODO is a placeholder.
import type { L10n } from "@/lib/utils";

/**
 * When the next admission round opens (ISO date-time with timezone, e.g. "2027-06-01T00:00:00+05:00").
 * null → the hero shows the "admission closed" status instead of a countdown.
 * TODO: replace with real data once the Agency announces the 2027/2028 round.
 */
export const nextAdmissionOpens: string | null = null;

export const admissionFacts = {
  applications: 22315,
  window: { from: "2026-06-01", to: "2026-06-15" },
  grades: [5, 6, 7],
};

export const admissionPage = {
  title: { uz: "Qabul", en: "Admissions", ru: "Приём" } satisfies L10n,
  status: {
    uz: "2026/2027 oʻquv yili uchun qabul yakunlandi",
    en: "Admissions for 2026/2027 are closed",
    ru: "Приём на 2026/2027 учебный год завершён",
  } satisfies L10n,
  statusNote: {
    uz: "Keyingi qabul haqidagi eʼlonlar shu sahifada va rasmiy portallarda eʼlon qilinadi.",
    en: "News about the next admission round will be posted on this page and on the official portals.",
    ru: "Объявления о следующем приёме появятся на этой странице и на официальных порталах.",
  } satisfies L10n,
  countdownTitle: { uz: "Keyingi qabul boshlanishiga", en: "Next admission round opens in", ru: "До начала следующего приёма" } satisfies L10n,
  countdownOpen: { uz: "Qabul ochiq — ariza topshirishingiz mumkin", en: "Admissions are open — you can apply now", ru: "Приём открыт — можно подавать заявку" } satisfies L10n,
  units: {
    days: { uz: "kun", en: "days", ru: "дн." },
    hours: { uz: "soat", en: "hours", ru: "ч" },
    minutes: { uz: "daqiqa", en: "minutes", ru: "мин" },
  } satisfies Record<string, L10n>,
  lead: {
    uz: "5, 6 va 7-sinflarga qabul onlayn ariza va Cambridge Assessment bilan hamkorlikda tashkil etiladigan bir bosqichli kirish imtihoni orqali amalga oshiriladi.",
    en: "Students join Grades 5, 6 and 7 through an online application and a one-stage entrance exam organised with Cambridge Assessment.",
    ru: "Приём в 5, 6 и 7 классы проходит через онлайн-заявку и одноэтапный вступительный экзамен, который проводится совместно с Cambridge Assessment.",
  } satisfies L10n,
  lastRound: { uz: "Soʻnggi qabul", en: "Last round", ru: "Последний приём" } satisfies L10n,
  lastRoundDates: { uz: "1–15 iyun 2026", en: "1–15 June 2026", ru: "1–15 июня 2026" } satisfies L10n,
  applicationsLabel: { uz: "ta ariza kelib tushdi", en: "applications received", ru: "заявок получено" } satisfies L10n,

  stepsTitle: { uz: "Qabul qanday oʻtadi", en: "How admission works", ru: "Как проходит приём" } satisfies L10n,
  steps: [
    {
      title: { uz: "Ariza topshirish", en: "Apply online", ru: "Подача заявки" },
      text: {
        uz: "Ariza faqat onlayn — ariza.piima.uz yoki my.gov.uz orqali belgilangan muddatda topshiriladi. Soʻnggi qabulda muddat 1–15 iyun edi.",
        en: "Applications are online only, via ariza.piima.uz or my.gov.uz, within the announced window. Last time it was 1–15 June.",
        ru: "Заявка подаётся только онлайн — через ariza.piima.uz или my.gov.uz в объявленные сроки. В прошлый раз это было 1–15 июня.",
      },
    },
    {
      title: { uz: "Kirish imtihoni", en: "Entrance exam", ru: "Вступительный экзамен" },
      text: {
        uz: "Bir bosqichli imtihon Cambridge Assessment bilan hamkorlikda, Prezident maktablari modeli asosida oʻtkaziladi: matematika va ingliz tili.",
        en: "A one-stage exam organised with Cambridge Assessment, following the Presidential Schools’ model: Mathematics and English.",
        ru: "Одноэтапный экзамен совместно с Cambridge Assessment по модели Президентских школ: математика и английский язык.",
      },
    },
    {
      title: { uz: "Natijalar", en: "Results", ru: "Результаты" },
      text: {
        uz: "Natijalar rasmiy portallar orqali eʼlon qilinadi.",
        en: "Results are announced on the official portals.",
        ru: "Результаты объявляются на официальных порталах.",
      },
    },
    {
      title: { uz: "Qabul", en: "Enrolment", ru: "Зачисление" },
      text: {
        uz: "Tanlovdan oʻtgan oʻquvchilar maktabga qabul qilinadi va sentabrdan oʻqishni boshlaydi. 2026-yilda 260 dan ortiq oʻquvchi qabul qilindi.",
        en: "Successful candidates are enrolled and start in September. In 2026 more than 260 students joined the school.",
        ru: "Прошедшие отбор ученики зачисляются в школу и начинают учёбу в сентябре. В 2026 году в школу пришли более 260 учеников.",
      },
    },
  ] satisfies { title: L10n; text: L10n }[],

  examTitle: { uz: "Imtihon tuzilmasi", en: "Exam structure", ru: "Структура экзамена" } satisfies L10n,
  examLead: {
    uz: "Imtihon bir bosqichda oʻtadi. Savollar yod olingan bilimni emas, fikrlash va tilni qoʻllash koʻnikmasini tekshiradi.",
    en: "The exam is one stage. The questions test thinking and the ability to use the language, not memorised facts.",
    ru: "Экзамен проходит в один этап. Задания проверяют умение думать и применять язык, а не заученные факты.",
  } satisfies L10n,
  examCaption: {
    uz: "Kirish imtihoni: fanlar, boʻlimlar va savollar soni",
    en: "Entrance exam: subjects, sections and number of questions",
    ru: "Вступительный экзамен: предметы, разделы и количество заданий",
  } satisfies L10n,
  examCols: {
    subject: { uz: "Fan", en: "Subject", ru: "Предмет" },
    section: { uz: "Boʻlim", en: "Section", ru: "Раздел" },
    questions: { uz: "Savollar", en: "Questions", ru: "Заданий" },
  } satisfies Record<string, L10n>,
  examTotal: { uz: "Jami", en: "Total", ru: "Всего" } satisfies L10n,
  subjects: {
    math: { uz: "Matematika", en: "Mathematics", ru: "Математика" },
    english: { uz: "Ingliz tili", en: "English", ru: "Английский язык" },
  } satisfies Record<string, L10n>,
  sections: {
    critical: { uz: "Tanqidiy fikrlash (Critical Thinking)", en: "Critical Thinking", ru: "Критическое мышление (Critical Thinking)" },
    problem: { uz: "Masala yechish (Problem Solving)", en: "Problem Solving", ru: "Решение задач (Problem Solving)" },
    readingGrammar: { uz: "Oʻqib tushunish va grammatika (Reading + Grammar)", en: "Reading + Grammar", ru: "Чтение и грамматика (Reading + Grammar)" },
  } satisfies Record<string, L10n>,
  examNote: {
    uz: "Ingliz tili boʻlimlari orasidagi savollar taqsimoti rasmiy portallarda eʼlon qilinadi.",
    en: "The split of English questions between Reading and Grammar is announced on the official portals.",
    ru: "Распределение заданий по английскому между чтением и грамматикой объявляется на официальных порталах.",
  } satisfies L10n,

  gradesTitle: { uz: "Qaysi sinflarga qabul qilinadi", en: "Which grades we admit", ru: "В какие классы принимаем" } satisfies L10n,
  gradeWord: { uz: "sinf", en: "Grade", ru: "класс" } satisfies L10n,
  gradesNote: {
    uz: "Qabul 5, 6 va 7-sinflarga eʼlon qilingan. Keyingi yillarda qaysi sinflarga qabul boʻlishi rasmiy eʼlonda koʻrsatiladi.",
    en: "Admission was announced for Grades 5, 6 and 7. Which grades are open in future years will be stated in the official announcement.",
    ru: "Приём был объявлен в 5, 6 и 7 классы. В какие классы будет приём в следующие годы, будет указано в официальном объявлении.",
  } satisfies L10n,

  docsTitle: { uz: "Kerakli hujjatlar", en: "Documents you will need", ru: "Необходимые документы" } satisfies L10n,
  docsBadge: {
    uz: "Rasmiy nizom bilan tasdiqlanishi kerak",
    en: "To be confirmed with the official regulation",
    ru: "Уточняется по официальному положению",
  } satisfies L10n,
  // TODO: replace with real data (confirm the list against the official admission regulation)
  docs: [
    { uz: "Oʻquvchining tugʻilganlik haqidagi guvohnomasi", en: "The student’s birth certificate", ru: "Свидетельство о рождении ученика" },
    { uz: "Ota-ona (qonuniy vakil) pasporti yoki ID-kartasi", en: "Parent’s (legal guardian’s) passport or ID card", ru: "Паспорт или ID-карта родителя (законного представителя)" },
    { uz: "Joriy oʻquv yili uchun maktabdan maʼlumotnoma", en: "A certificate from the current school", ru: "Справка из текущей школы" },
    { uz: "Oʻquvchining 3×4 oʻlchamdagi fotosurati", en: "A 3×4 photo of the student", ru: "Фотография ученика 3×4" },
    { uz: "Tibbiy maʼlumotnoma (qabul qilingandan soʻng)", en: "A medical certificate (after admission)", ru: "Медицинская справка (после зачисления)" },
  ] satisfies L10n[],

  faqTitle: { uz: "Koʻp soʻraladigan savollar", en: "Frequently asked questions", ru: "Частые вопросы" } satisfies L10n,
  faq: [
    {
      q: { uz: "Keyingi qabul qachon boshlanadi?", en: "When does the next admission round open?", ru: "Когда начнётся следующий приём?" },
      a: {
        uz: "Sanalar Ixtisoslashtirilgan taʼlim muassasalari agentligi tomonidan eʼlon qilinadi. Eʼlon chiqishi bilan u shu sahifada va ariza.piima.uz portalida paydo boʻladi.",
        en: "The dates are set by the Agency of Specialized Educational Institutions. As soon as they are announced, they will appear here and on ariza.piima.uz.",
        ru: "Сроки объявляет Агентство специализированных образовательных учреждений. Как только они появятся, мы опубликуем их здесь и на ariza.piima.uz.",
      },
    },
    {
      q: { uz: "Arizani qayerda topshirish mumkin?", en: "Where do I apply?", ru: "Где подать заявку?" },
      a: {
        uz: "Faqat onlayn: ariza.piima.uz yoki my.gov.uz portali orqali. Maktabning oʻzida qogʻoz shaklidagi arizalar qabul qilinmaydi.",
        en: "Online only, through ariza.piima.uz or my.gov.uz. The school does not accept paper applications in person.",
        ru: "Только онлайн — через ariza.piima.uz или my.gov.uz. Бумажные заявки в школе не принимаются.",
      },
    },
    {
      q: { uz: "Qaysi sinflarga qabul qilinadi?", en: "Which grades can apply?", ru: "В какие классы проводится приём?" },
      a: {
        uz: "2026-yilda qabul 5, 6 va 7-sinflarga oʻtkazildi. Keyingi qabulda qaysi sinflar boʻlishi rasmiy eʼlonda koʻrsatiladi.",
        en: "In 2026 the school admitted students to Grades 5, 6 and 7. The grades for the next round will be listed in the official announcement.",
        ru: "В 2026 году приём проходил в 5, 6 и 7 классы. Классы для следующего приёма будут указаны в официальном объявлении.",
      },
    },
    {
      q: { uz: "Imtihon qanday fanlardan iborat?", en: "What does the exam cover?", ru: "Из каких предметов состоит экзамен?" },
      a: {
        uz: "Matematika (16 ta tanqidiy fikrlash va 24 ta masala yechish savoli, jami 40) va ingliz tili (oʻqib tushunish va grammatika, jami 40). Imtihon bir bosqichda oʻtadi.",
        en: "Mathematics (16 Critical Thinking and 24 Problem Solving questions, 40 in total) and English (Reading and Grammar, 40 in total). It is a one-stage exam.",
        ru: "Математика (16 заданий на критическое мышление и 24 на решение задач, всего 40) и английский язык (чтение и грамматика, всего 40). Экзамен проходит в один этап.",
      },
    },
    {
      q: { uz: "Imtihonni kim tashkil qiladi?", en: "Who runs the exam?", ru: "Кто проводит экзамен?" },
      a: {
        uz: "Kirish imtihoni Cambridge Assessment bilan hamkorlikda, Prezident maktablari modeli asosida tashkil etiladi.",
        en: "The entrance exam is organised together with Cambridge Assessment, following the Presidential Schools’ model.",
        ru: "Вступительный экзамен организуется совместно с Cambridge Assessment по модели Президентских школ.",
      },
    },
    {
      q: { uz: "Imtihonga qanday tayyorlanish mumkin?", en: "How can my child prepare?", ru: "Как подготовиться к экзамену?" },
      a: {
        uz: "Rasmiy tayyorgarlik materiallari chiqsa, ular rasmiy portallarda eʼlon qilinadi. Umumiy maslahat — mantiqiy masalalar yechish va ingliz tilida muntazam oʻqish: maktabda STEM fanlari ingliz tilida oʻqitiladi.",
        en: "If official preparation materials are released, they will be published on the official portals. In general, logic problems and regular reading in English help — at the school, STEM subjects are taught in English.",
        ru: "Если выйдут официальные материалы для подготовки, их опубликуют на официальных порталах. В целом помогают логические задачи и регулярное чтение на английском — в школе предметы STEM преподаются на английском языке.",
      },
    },
    {
      q: { uz: "Natijalarni qayerdan bilsa boʻladi?", en: "Where are results published?", ru: "Где узнать результаты?" },
      a: {
        uz: "Natijalar rasmiy portallar — ariza.piima.uz va my.gov.uz orqali eʼlon qilinadi.",
        en: "Results are announced on the official portals, ariza.piima.uz and my.gov.uz.",
        ru: "Результаты объявляются на официальных порталах — ariza.piima.uz и my.gov.uz.",
      },
    },
    {
      q: { uz: "Oʻqish va yotoqxona pullikmi?", en: "Are tuition and boarding paid?", ru: "Обучение и проживание платные?" },
      a: {
        uz: "Moliyaviy shartlar rasmiy qabul nizomida belgilanadi. Aniq maʼlumot keyingi qabul eʼloni bilan birga rasmiy portallarda eʼlon qilinadi.",
        en: "Financial terms are set by the official admission regulation. Exact details will be published on the official portals together with the next announcement.",
        ru: "Финансовые условия определяются официальным положением о приёме. Точная информация будет опубликована на официальных порталах вместе со следующим объявлением.",
      },
    },
    {
      q: { uz: "Oʻquv yili oʻrtasida qabul boʻladimi?", en: "Is there admission during the school year?", ru: "Бывает ли приём в середине учебного года?" },
      a: {
        uz: "Hozircha qabul faqat rasmiy eʼlon qilingan muddatda oʻtkaziladi. Boshqa imkoniyatlar paydo boʻlsa, ular rasmiy portallarda eʼlon qilinadi.",
        en: "At the moment admission only takes place in the officially announced window. Any other options would be announced on the official portals.",
        ru: "Пока приём проводится только в официально объявленные сроки. Если появятся другие возможности, о них сообщат на официальных порталах.",
      },
    },
  ] satisfies { q: L10n; a: L10n }[],

  portalsTitle: { uz: "Rasmiy portallar", en: "Official portals", ru: "Официальные порталы" } satisfies L10n,
  portalsText: {
    uz: "Ariza topshirish, imtihon sanasi va natijalar — faqat shu ikki portal orqali. Boshqa saytlar va kanallarga ishonmang.",
    en: "Applications, exam dates and results go through these two portals only. Don’t rely on other sites or channels.",
    ru: "Подача заявок, даты экзамена и результаты — только через эти два портала. Не доверяйте другим сайтам и каналам.",
  } satisfies L10n,
  portals: [
    {
      href: "https://ariza.piima.uz",
      label: "ariza.piima.uz",
      text: { uz: "Agentlikning ariza portali", en: "The Agency’s application portal", ru: "Портал заявок Агентства" },
    },
    {
      href: "https://my.gov.uz",
      label: "my.gov.uz",
      text: { uz: "Yagona interaktiv davlat xizmatlari portali", en: "The single portal of public services", ru: "Единый портал интерактивных госуслуг" },
    },
  ] satisfies { href: string; label: string; text: L10n }[],
  contactPrompt: { uz: "Savolingiz qoldimi? Bizga yozing", en: "Still have a question? Write to us", ru: "Остались вопросы? Напишите нам" } satisfies L10n,
};
