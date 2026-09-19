import type { L10n } from "@/lib/utils";

/**
 * Page copy for /biz-haqimizda/maqsad-va-vazifalar.
 * Goals follow the curriculum facts from the client brief (STEM + research, English & Chinese,
 * national identity, boarding life, gifted students, international-level study) and are phrased as goals, not results.
 */
export const missionCopy = {
  title: { uz: "Maqsad va vazifalar", en: "Mission and goals", ru: "Миссия и задачи" } satisfies L10n,
  /** Mission statement, pre-broken into display lines (each line reveals once) */
  mission: {
    uz: ["Iqtidorli bolalarga", "dunyo bilan uning tilida", "gaplasha oladigan, ammo", "ildizini unutmaydigan inson", "boʻlib ulgʻayishga koʻmaklashish."],
    en: ["To help gifted children", "grow into people who can", "speak with the world", "in its own languages", "and never lose their roots."],
    ru: ["Помогать одарённым детям", "вырасти людьми, которые", "говорят с миром на его", "языках и никогда", "не забывают своих корней."],
  } satisfies L10n<string[]>,
  missionNote: {
    uz: "Ixtisoslashtirilgan taʼlim muassasalari agentligi tizimidagi maktab-internat sifatida biz 2026/2027 oʻquv yilidan boshlab shu maqsad sari ishlaymiz.",
    en: "As a boarding school within the Agency of Specialized Educational Institutions, this is what we have been working towards since the 2026/2027 academic year.",
    ru: "Как школа-интернат в системе Агентства специализированных образовательных учреждений, мы работаем ради этой цели с 2026/2027 учебного года.",
  } satisfies L10n,
  goalsTitle: { uz: "Vazifalarimiz", en: "Our goals", ru: "Наши задачи" } satisfies L10n,
  goalsIntro: {
    uz: "Olti vazifa — logotipimizdagi halqaning olti rangli boʻlagi kabi. Har biri alohida, lekin birgalikda bir butunni tashkil etadi.",
    en: "Six goals, like the six coloured segments of the ring in our logo. Each stands on its own; together they make one whole.",
    ru: "Шесть задач — как шесть цветных сегментов кольца в нашем логотипе. Каждая самостоятельна, а вместе они составляют одно целое.",
  } satisfies L10n,
  goalOf: { uz: "Vazifa", en: "Goal", ru: "Задача" } satisfies L10n,
  jumpTo: { uz: "Vazifaga oʻtish", en: "Go to goal", ru: "Перейти к задаче" } satisfies L10n,
  valuesTitle: { uz: "Qadriyatlarimiz", en: "What we value", ru: "Наши ценности" } satisfies L10n,
  valuesIntro: {
    uz: "Dars jadvalida yozilmaydigan, lekin har kuni his qilinadigan narsalar.",
    en: "Things that never appear on the timetable, yet shape every day.",
    ru: "То, чего нет в расписании, но что чувствуется каждый день.",
  } satisfies L10n,
  statementTitle: { uz: "Zamonaviy taʼlim va milliy oʻzlik", en: "Modern education and national identity", ru: "Современное образование и национальная идентичность" } satisfies L10n,
  statement: {
    uz: "Bizningcha, zamonaviy taʼlim va milliy oʻzlik bir-biriga zid emas. Laboratoriyada tajriba oʻtkazayotgan, ingliz va xitoy tillarida bahslasha oladigan bola Navoiyni ham oʻqiydi, oʻz yurtining tarixini ham biladi. Chet tilni puxta bilish oʻz tilingni unutish degani emas — aksincha, oʻzligini biladigan odam dunyoga ishonch bilan chiqadi.",
    en: "We don't see modern education and national identity as a trade-off. A child who runs experiments in the lab and can argue a point in English or Chinese also reads Navoi and knows the history of their own country. Mastering another language does not mean losing your own — people who know who they are step into the wider world with more confidence, not less.",
    ru: "Мы не считаем, что современное образование и национальная идентичность противоречат друг другу. Ребёнок, который ставит опыты в лаборатории и может вести спор на английском и китайском, читает и Навои, и знает историю своей страны. Владеть чужим языком не значит забыть свой: человек, который знает, кто он, выходит в большой мир увереннее.",
  } satisfies L10n,
};

export type Goal = { title: L10n; text: L10n; points: L10n<string[]> };

/** Six goals — index i lights RING_SEGMENTS[i] (red, green, amber, orange, purple, navy). */
export const goals: Goal[] = [
  {
    title: { uz: "Ikki xorijiy tilni puxta egallash", en: "Real command of two foreign languages", ru: "Свободное владение двумя иностранными языками" },
    text: {
      uz: "Ingliz va xitoy tillarini jadal oʻqitish orqali oʻquvchilar ikkala tilda erkin oʻqish, yozish va fikrini himoya qilishga oʻrganishini maqsad qilamiz.",
      en: "Through intensive English and Chinese, we aim for students to read, write and defend their ideas freely in both languages.",
      ru: "Интенсивно обучая английскому и китайскому, мы стремимся к тому, чтобы ученики свободно читали, писали и отстаивали свою точку зрения на обоих языках.",
    },
    points: {
      uz: ["Har kuni ikki til bilan ishlash", "Til — fan oʻrganish vositasi ham"],
      en: ["Both languages every day", "Language as a tool for learning other subjects"],
      ru: ["Оба языка — каждый день", "Язык как инструмент изучения других предметов"],
    },
  },
  {
    title: { uz: "Aniq fanlarni chuqur oʻrganish va tadqiqot", en: "Depth in science and a habit of research", ru: "Глубокие знания в точных науках и навык исследования" },
    text: {
      uz: "Matematika, fizika, kimyo, biologiya va informatikani chuqur oʻqitish, loyiha ishi va mustaqil tadqiqot orqali savol qoʻyish va unga javob izlash koʻnikmasini shakllantirish.",
      en: "Teaching mathematics, physics, chemistry, biology and computer science in depth, and building — through project work and independent research — the habit of asking questions and finding answers.",
      ru: "Глубоко преподавать математику, физику, химию, биологию и информатику и через проектную работу и самостоятельные исследования учить ставить вопросы и искать ответы.",
    },
    points: {
      uz: ["Loyiha ishi har bir fanda", "Mustaqil tadqiqot tajribasi"],
      en: ["Project work in every science", "First-hand experience of independent research"],
      ru: ["Проектная работа по каждому предмету", "Опыт самостоятельного исследования"],
    },
  },
  {
    title: { uz: "Xalqaro darajada oʻqishga tayyorlash", en: "Readiness for study at international level", ru: "Подготовка к учёбе международного уровня" },
    text: {
      uz: "Bitiruvchilarimiz dunyoning yetakchi universitetlarida oʻqishni davom ettirishga bilim, til va mustaqil ishlash koʻnikmasi jihatidan tayyor boʻlishini maqsad qilamiz.",
      en: "We want our graduates to be ready — in knowledge, language and independent study skills — to continue their education at leading universities anywhere in the world.",
      ru: "Мы хотим, чтобы выпускники были готовы — по знаниям, языку и навыкам самостоятельной работы — продолжить учёбу в ведущих университетах мира.",
    },
    points: {
      uz: ["Akademik yozuv va taqdimot", "Xalqaro standartlarga mos baholash"],
      en: ["Academic writing and presenting", "Assessment in line with international standards"],
      ru: ["Академическое письмо и презентации", "Оценивание по международным стандартам"],
    },
  },
  {
    title: { uz: "Milliy oʻzlikni mustahkamlash", en: "A strong sense of national identity", ru: "Укрепление национальной идентичности" },
    text: {
      uz: "Ona tili, Oʻzbekiston tarixi, adabiyot va madaniyatga oʻquv rejasining katta qismini ajratib, oʻz ildizlarini biladigan va qadrlaydigan yoshlarni tarbiyalash.",
      en: "Giving a large part of the curriculum to the native language, the history of Uzbekistan, literature and culture, so that students know and value their roots.",
      ru: "Отводить значительную часть учебного плана родному языку, истории Узбекистана, литературе и культуре, чтобы ученики знали и ценили свои корни.",
    },
    points: {
      uz: ["Ona tili va adabiyot", "Tarix va madaniy meros"],
      en: ["Native language and literature", "History and cultural heritage"],
      ru: ["Родной язык и литература", "История и культурное наследие"],
    },
  },
  {
    title: { uz: "Mustaqillik va xarakterni tarbiyalash", en: "Character and independence", ru: "Характер и самостоятельность" },
    text: {
      uz: "Internat hayoti orqali oʻz vaqtini boshqarish, masʼuliyat, jamoada yashash va bir-biriga gʻamxoʻrlik qilish koʻnikmalarini shakllantirish.",
      en: "Using boarding life to build time management, responsibility, living well with others and looking out for one another.",
      ru: "Через жизнь в интернате развивать умение распоряжаться своим временем, ответственность, умение жить в коллективе и заботиться друг о друге.",
    },
    points: {
      uz: ["Kun tartibi va shaxsiy masʼuliyat", "Tarbiyachilar va psixolog koʻmagi"],
      en: ["A daily routine and personal responsibility", "Support from house staff and a psychologist"],
      ru: ["Распорядок дня и личная ответственность", "Поддержка воспитателей и психолога"],
    },
  },
  {
    title: { uz: "Iqtidorni aniqlash va qoʻllab-quvvatlash", en: "Finding and supporting talent", ru: "Выявление и поддержка одарённости" },
    text: {
      uz: "Har bir oʻquvchining kuchli tomonini erta koʻrish va unga mos yoʻl — chuqurlashtirilgan mashgʻulotlar, olimpiadaga tayyorgarlik, ustoz bilan individual ish — taklif qilish.",
      en: "Noticing each student's strengths early and offering a path that fits — advanced sessions, olympiad preparation, one-to-one work with a mentor.",
      ru: "Вовремя замечать сильные стороны каждого ученика и предлагать подходящий путь — углублённые занятия, подготовку к олимпиадам, индивидуальную работу с наставником.",
    },
    points: {
      uz: ["Individual rivojlanish rejasi", "Olimpiada va tanlovlarga tayyorlov"],
      en: ["An individual development plan", "Preparation for olympiads and competitions"],
      ru: ["Индивидуальный план развития", "Подготовка к олимпиадам и конкурсам"],
    },
  },
];

export const values: { title: L10n; text: L10n }[] = [
  {
    title: { uz: "Qiziquvchanlik", en: "Curiosity", ru: "Любознательность" },
    text: {
      uz: "Savol berish — kuchsizlik emas. Biz “bilmayman” deyishdan qoʻrqmaydigan va javobni oʻzi izlab topadigan oʻquvchilarni qadrlaymiz.",
      en: "Asking is not a weakness. We value students who aren't afraid to say “I don't know yet” and then go and find out.",
      ru: "Спрашивать — не слабость. Мы ценим учеников, которые не боятся сказать «пока не знаю» и сами ищут ответ.",
    },
  },
  {
    title: { uz: "Halollik", en: "Honesty", ru: "Честность" },
    text: {
      uz: "Oʻz ishing, oʻz fikring va oʻz xatoing. Akademik halollik va bir-biriga toʻgʻrisini aytish — ishonchning asosi.",
      en: "Your own work, your own thinking, your own mistakes. Academic honesty and telling each other the truth are what trust is built on.",
      ru: "Своя работа, свои мысли, свои ошибки. Академическая честность и правда друг другу — основа доверия.",
    },
  },
  {
    title: { uz: "Masʼuliyat", en: "Responsibility", ru: "Ответственность" },
    text: {
      uz: "Internatda har kim oʻz vaqti, oʻz xonasi va oʻz vaʼdasi uchun javob beradi. Kichik masʼuliyatdan kattasi oʻsib chiqadi.",
      en: "In a boarding school everyone answers for their own time, their own room and their own word. Bigger responsibility grows out of small ones.",
      ru: "В интернате каждый отвечает за своё время, свою комнату и своё слово. Из маленькой ответственности вырастает большая.",
    },
  },
  {
    title: { uz: "Hurmat va gʻamxoʻrlik", en: "Respect and care", ru: "Уважение и забота" },
    text: {
      uz: "Internatda bir oila boʻlib yashaymiz. Kattalar kichiklarga yordam beradi, har kimning ovozi eshitiladi.",
      en: "Boarding means living as one household. Older students help younger ones, and everyone gets heard.",
      ru: "В интернате мы живём как одна семья. Старшие помогают младшим, и каждого слышат.",
    },
  },
  {
    title: { uz: "Dunyoga ochiqlik", en: "Openness to the world", ru: "Открытость миру" },
    text: {
      uz: "Boshqa tillar, madaniyatlar va fikrlarga qiziqish bilan qaraymiz — oʻz madaniyatimizni ham shu qiziqish bilan oʻrganamiz.",
      en: "We approach other languages, cultures and ideas with interest — and study our own culture with the same interest.",
      ru: "Мы с интересом относимся к другим языкам, культурам и взглядам — и с тем же интересом изучаем свою культуру.",
    },
  },
];
