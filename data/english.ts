// Content for /yonalishlar/ingliz-tili (English programme).
// Intensive English is a real part of the curriculum; hours, CEFR targets, exams, clubs and teachers are placeholders.
import type { L10n } from "@/lib/utils";
import { images, type ImageSlot } from "@/lib/images";

export const englishCopy = {
  hero: {
    title: { uz: "Ingliz tili", en: "English", ru: "Английский язык" } satisfies L10n,
    lead: {
      uz: "Kuchaytirilgan ingliz tili: toʻrtta koʻnikma, jonli muloqot va xatolardan qoʻrqmaslik. Xato — oʻrganishning bir qismi, uni tuzatish esa eng yaxshi dars.",
      en: "Intensive English built on four skills, real conversation and not being afraid of mistakes. A mistake is part of learning, and fixing it is the best lesson.",
      ru: "Углублённый английский: четыре навыка, живое общение и никакого страха ошибок. Ошибка — часть учёбы, а её исправление — лучший урок.",
    } satisfies L10n,
    exampleLabel: { uz: "Misol", en: "Example", ru: "Пример" } satisfies L10n,
  },
  skills: {
    title: { uz: "Toʻrt koʻnikma", en: "Four skills", ru: "Четыре навыка" } satisfies L10n,
    lead: {
      uz: "Halqadagi boʻlakni tanlang — u qanday oʻrgatilishini koʻrasiz.",
      en: "Choose a segment of the ring to see how it is taught.",
      ru: "Выберите сегмент кольца, чтобы узнать, как его преподают.",
    } satisfies L10n,
    groupLabel: { uz: "Til koʻnikmalari", en: "Language skills", ru: "Языковые навыки" } satisfies L10n,
    howLabel: { uz: "Qanday oʻrganamiz", en: "How we teach it", ru: "Как мы учим" } satisfies L10n,
  },
  curriculum: {
    title: { uz: "Sinflar boʻyicha dastur", en: "Programme by grade", ru: "Программа по классам" } satisfies L10n,
    lead: {
      uz: "Har yil — CEFR shkalasida bir qadam. Maqsad: 11-sinfda C1 darajasi.",
      en: "Each year is a step up the CEFR scale. The goal: C1 by grade 11.",
      ru: "Каждый год — шаг по шкале CEFR. Цель — уровень C1 к 11 классу.",
    } satisfies L10n,
    tabsLabel: { uz: "Sinflar", en: "Grades", ru: "Классы" } satisfies L10n,
    grade: { uz: "sinf", en: "Grade", ru: "класс" } satisfies L10n,
    hours: { uz: "haftasiga soat", en: "hours a week", ru: "часов в неделю" } satisfies L10n,
    target: { uz: "CEFR boʻyicha maqsad", en: "CEFR target", ru: "Цель по CEFR" } satisfies L10n,
    reading: { uz: "Yil kitoblari", en: "Books of the year", ru: "Книги года" } satisfies L10n,
    note: {
      uz: "Dastur taxminiy, oʻquv rejasi tasdiqlangach yangilanadi.",
      en: "Indicative programme; it will be updated once the curriculum is approved.",
      ru: "Программа ориентировочная и будет уточнена после утверждения учебного плана.",
    } satisfies L10n,
  },
  exams: {
    title: { uz: "Xalqaro imtihonlar yoʻli", en: "International exam pathway", ru: "Путь к международным экзаменам" } satisfies L10n,
    badge: { uz: "Tasdiqlanishi kutilmoqda", en: "To be confirmed", ru: "Требует подтверждения" } satisfies L10n,
    lead: {
      uz: "Kirish imtihonlari Cambridge Assessment bilan hamkorlikda tashkil etildi. Keyingi bosqichlar uchun quyidagi yoʻl koʻrib chiqilmoqda — qaysi imtihonlar topshirilishi hali tasdiqlanmagan.",
      en: "The entrance exams were run together with Cambridge Assessment. The route below is one possible pathway for later years — which exams students will sit has not been confirmed yet.",
      ru: "Вступительные экзамены проводились совместно с Cambridge Assessment. Ниже — возможный путь на следующие годы; какие экзамены будут сдавать ученики, пока не утверждено.",
    } satisfies L10n,
  },
  clubs: {
    title: { uz: "Toʻgaraklar", en: "Clubs", ru: "Кружки" } satisfies L10n,
    lead: {
      uz: "Ingliz tilida gapirish, bahslashish va sahnaga chiqish.",
      en: "Speaking, arguing and going on stage — in English.",
      ru: "Говорить, спорить и выходить на сцену — по-английски.",
    } satisfies L10n,
    regionLabel: { uz: "Toʻgaraklar roʻyxati, gorizontal aylantiriladi", en: "Clubs, scrolls horizontally", ru: "Список кружков, прокручивается горизонтально" } satisfies L10n,
    prev: { uz: "Oldingi", en: "Previous", ru: "Назад" } satisfies L10n,
    next: { uz: "Keyingi", en: "Next", ru: "Вперёд" } satisfies L10n,
  },
  teachers: {
    title: { uz: "Oʻqituvchilar", en: "Teachers", ru: "Преподаватели" } satisfies L10n,
    lead: {
      uz: "Kafedra tarkibi shakllantirilmoqda. Maʼlumotlar tez orada yangilanadi.",
      en: "The department is being formed; details will be added soon.",
      ru: "Кафедра формируется, информация скоро появится.",
    } satisfies L10n,
  },
};

/* ───────────── Hero: typed & corrected sentences (English on every locale) ─────────────
   Each sentence: before + wrong + after is typed, then `wrong` is struck through and `right` is typed in. */
export type Correction = { before: string; wrong: string; right: string; after: string; rule: L10n };

export const corrections: Correction[] = [
  {
    before: "She ",
    wrong: "don’t",
    right: "doesn’t",
    after: " like reading.",
    rule: { uz: "he / she / it + does", en: "he / she / it + does", ru: "he / she / it + does" },
  },
  {
    before: "I ",
    wrong: "have visited",
    right: "visited",
    after: " London last year.",
    rule: { uz: "aniq vaqt → Past Simple", en: "a finished time → past simple", ru: "точное время → Past Simple" },
  },
];

export const finalSentence = "Every mistake is a step forward.";

/* ───────────── Skills wheel ───────────── TODO: replace with real data (methods / hours) */
export type Skill = { id: "reading" | "writing" | "listening" | "speaking"; name: string; label: L10n; summary: L10n; methods: L10n<string[]> };

export const skills: Skill[] = [
  {
    id: "reading",
    name: "Reading",
    label: { uz: "Oʻqish", en: "Reading", ru: "Чтение" },
    summary: {
      uz: "Har chorakda bitta toʻliq kitob va har hafta qisqa matnlar: badiiy, ilmiy-ommabop, yangiliklar.",
      en: "One whole book each term plus short texts every week: fiction, popular science and news.",
      ru: "Одна целая книга за четверть и короткие тексты каждую неделю: художественные, научно-популярные, новости.",
    },
    methods: {
      uz: ["Sinfdagi kutubxona va oʻqish kundaligi", "Matn boʻyicha savollar va muhokama", "Soʻz boyligi uchun kartochkalar"],
      en: ["A class library and reading log", "Questions and discussion on each text", "Vocabulary cards"],
      ru: ["Классная библиотека и дневник чтения", "Вопросы и обсуждение каждого текста", "Карточки для словаря"],
    },
  },
  {
    id: "writing",
    name: "Writing",
    label: { uz: "Yozish", en: "Writing", ru: "Письмо" },
    summary: {
      uz: "Qoralama → fikr-mulohaza → qayta yozish. Oʻqituvchi xatoni koʻrsatadi, tuzatishni oʻquvchi oʻzi topadi.",
      en: "Draft → feedback → rewrite. The teacher points to the mistake; the student finds the fix.",
      ru: "Черновик → отзыв → переписывание. Учитель указывает на ошибку, исправление ученик находит сам.",
    },
    methods: {
      uz: ["Esse, xat, hisobot", "Juftlikda bir-birini tekshirish", "Yozma portfolio"],
      en: ["Essays, letters, reports", "Peer review in pairs", "A writing portfolio"],
      ru: ["Эссе, письма, отчёты", "Взаимопроверка в парах", "Портфолио письменных работ"],
    },
  },
  {
    id: "listening",
    name: "Listening",
    label: { uz: "Tinglash", en: "Listening", ru: "Аудирование" },
    summary: {
      uz: "Turli aksentlar: podkastlar, maʼruzalar, intervyular. Avval umumiy maʼno, keyin tafsilotlar.",
      en: "Many accents: podcasts, talks, interviews. First the gist, then the detail.",
      ru: "Разные акценты: подкасты, лекции, интервью. Сначала общий смысл, потом детали.",
    },
    methods: {
      uz: ["Haftalik podkast", "Diktant va eslatmalar olish", "Filmlar klubi"],
      en: ["A weekly podcast", "Dictation and note-taking", "Film club"],
      ru: ["Еженедельный подкаст", "Диктант и конспектирование", "Киноклуб"],
    },
  },
  {
    id: "speaking",
    name: "Speaking",
    label: { uz: "Gapirish", en: "Speaking", ru: "Говорение" },
    summary: {
      uz: "Darsda ingliz tili — asosiy til. Juftlik va guruhdagi ish, taqdimotlar va bahslar.",
      en: "English is the working language of the lesson: pair and group work, presentations and debates.",
      ru: "На уроке английский — рабочий язык: работа в парах и группах, презентации и дебаты.",
    },
    methods: {
      uz: ["Har darsda juftlikdagi suhbat", "Oyiga bir taqdimot", "Debat va Model UN"],
      en: ["Pair talk in every lesson", "A presentation each month", "Debate and Model UN"],
      ru: ["Диалог в парах на каждом уроке", "Презентация раз в месяц", "Дебаты и Model UN"],
    },
  },
];

/* ───────────── Curriculum by grade ───────────── TODO: replace with real data */
export const cefrLevels = ["A1", "A2", "B1", "B2", "C1", "C2"] as const;
export type Cefr = (typeof cefrLevels)[number];

export type EnglishGrade = { grade: number; cefr: Cefr; plus?: boolean; hours: number; focus: L10n; topics: L10n<string[]>; books: string[] };

export const englishGrades: EnglishGrade[] = [
  {
    grade: 5,
    cefr: "A2",
    hours: 8,
    focus: { uz: "Ishonch bilan gapirish va grammatika asoslari.", en: "Speaking with confidence and solid grammar basics.", ru: "Уверенная речь и основы грамматики." },
    topics: { uz: ["Men va oilam", "Maktab hayoti", "Hikoya yozish"], en: ["Me and my family", "School life", "Writing a story"], ru: ["Я и моя семья", "Школьная жизнь", "Пишем рассказ"] },
    books: ["Charlotte’s Web", "Matilda"],
  },
  {
    grade: 6,
    cefr: "B1",
    hours: 8,
    focus: { uz: "Mustaqil oʻqish va qisqa taqdimotlar.", en: "Independent reading and short presentations.", ru: "Самостоятельное чтение и короткие презентации." },
    topics: { uz: ["Tabiat va ekologiya", "Sayohat", "Xat yozish"], en: ["Nature and the environment", "Travel", "Letter writing"], ru: ["Природа и экология", "Путешествия", "Письма"] },
    books: ["The Secret Garden", "Wonder"],
  },
  {
    grade: 7,
    cefr: "B1",
    plus: true,
    hours: 7,
    focus: { uz: "Fikrni asoslash: argument va misol.", en: "Backing up an opinion with reasons and examples.", ru: "Аргументация: довод и пример." },
    topics: { uz: ["Fan va texnologiya", "Media", "Fikr-mulohaza inshosi"], en: ["Science and technology", "The media", "Opinion essays"], ru: ["Наука и технологии", "СМИ", "Эссе-мнение"] },
    books: ["Holes", "The Hobbit"],
  },
  {
    grade: 8,
    cefr: "B2",
    hours: 6,
    focus: { uz: "Akademik tinglash va eslatma olish.", en: "Academic listening and note-taking.", ru: "Академическое аудирование и конспект." },
    topics: { uz: ["Tarix va madaniyat", "Munozara", "Hisobot yozish"], en: ["History and culture", "Debate", "Report writing"], ru: ["История и культура", "Дебаты", "Отчёты"] },
    books: ["Animal Farm", "A Christmas Carol"],
  },
  {
    grade: 9,
    cefr: "B2",
    plus: true,
    hours: 6,
    focus: { uz: "Murakkab matnlar va ommaviy nutq.", en: "Complex texts and public speaking.", ru: "Сложные тексты и публичные выступления." },
    topics: { uz: ["Global muammolar", "Ilmiy maqola", "Ommaviy nutq"], en: ["Global issues", "Science articles", "Public speaking"], ru: ["Глобальные проблемы", "Научные статьи", "Публичные выступления"] },
    books: ["Of Mice and Men", "Short stories"],
  },
  {
    grade: 10,
    cefr: "C1",
    hours: 5,
    focus: { uz: "Akademik yozuv va tadqiqot.", en: "Academic writing and research.", ru: "Академическое письмо и исследование." },
    topics: { uz: ["Tadqiqot loyihasi", "Adabiyot tahlili", "Bahs"], en: ["Research project", "Literary analysis", "Argument"], ru: ["Исследовательский проект", "Анализ литературы", "Аргументация"] },
    books: ["Lord of the Flies", "To Kill a Mockingbird"],
  },
  {
    grade: 11,
    cefr: "C1",
    plus: true,
    hours: 5,
    focus: { uz: "Universitetga tayyorgarlik va xalqaro imtihon.", en: "University preparation and an international exam.", ru: "Подготовка к университету и международному экзамену." },
    topics: { uz: ["Motivatsion xat", "Imtihon strategiyalari", "Mustaqil tadqiqot"], en: ["Personal statements", "Exam strategies", "Independent research"], ru: ["Мотивационное письмо", "Стратегии экзамена", "Самостоятельное исследование"] },
    books: ["Pride and Prejudice", "Selected essays"],
  },
];

/* ───────────── Exam pathway ─────────────
   TODO: confirm which exams — this is a possible pathway only, not a decision. */
export const examPath: { id: string; name: string; level: string; when: L10n }[] = [
  { id: "a2-key", name: "A2 Key", level: "A2", when: { uz: "5–6-sinf", en: "Grades 5–6", ru: "5–6 классы" } },
  { id: "b1-preliminary", name: "B1 Preliminary", level: "B1", when: { uz: "7-sinf", en: "Grade 7", ru: "7 класс" } },
  { id: "b2-first", name: "B2 First", level: "B2", when: { uz: "8–9-sinf", en: "Grades 8–9", ru: "8–9 классы" } },
  { id: "c1-advanced", name: "C1 Advanced / IELTS", level: "C1", when: { uz: "10–11-sinf", en: "Grades 10–11", ru: "10–11 классы" } },
];

/* ───────────── Clubs ───────────── TODO: replace with real data (schedules) */
export const englishClubs: { id: string; photo: ImageSlot; name: L10n; text: L10n; when: L10n }[] = [
  {
    id: "debate",
    photo: images.events.debate,
    name: { uz: "Debat klubi", en: "Debate club", ru: "Дебатный клуб" },
    text: {
      uz: "Britaniya parlamenti formatida bahs: dalil, raddiya va vaqt nazorati.",
      en: "British Parliamentary debate: evidence, rebuttal and keeping to time.",
      ru: "Дебаты в британском парламентском формате: доводы, опровержение и регламент.",
    },
    when: { uz: "Dushanba va payshanba", en: "Mondays and Thursdays", ru: "Понедельник и четверг" },
  },
  {
    id: "mun",
    photo: images.events.panel,
    name: { uz: "Model UN", en: "Model UN", ru: "Модель ООН" },
    text: {
      uz: "Oʻquvchilar davlatlar nomidan chiqib, rezolyutsiya loyihalarini muhokama qiladi.",
      en: "Students represent countries and negotiate draft resolutions.",
      ru: "Ученики представляют страны и обсуждают проекты резолюций.",
    },
    when: { uz: "Chorshanba", en: "Wednesdays", ru: "Среда" },
  },
  {
    id: "drama",
    photo: images.events.drama,
    name: { uz: "Teatr studiyasi", en: "Drama studio", ru: "Театральная студия" },
    text: {
      uz: "Ingliz tilidagi spektakllar: matn, talaffuz va sahnada oʻzini erkin tutish.",
      en: "Plays in English: scripts, pronunciation and feeling at home on stage.",
      ru: "Спектакли на английском: текст, произношение и свобода на сцене.",
    },
    when: { uz: "Juma", en: "Fridays", ru: "Пятница" },
  },
  {
    id: "reading",
    photo: images.english.floor,
    name: { uz: "Kitobxonlar klubi", en: "Reading club", ru: "Читательский клуб" },
    text: {
      uz: "Oyiga bitta kitob, choy va qizgʻin muhokama.",
      en: "One book a month, a cup of tea and a lively discussion.",
      ru: "Одна книга в месяц, чай и живое обсуждение.",
    },
    when: { uz: "Shanba", en: "Saturdays", ru: "Суббота" },
  },
  {
    id: "speaking",
    photo: images.events.speech,
    name: { uz: "Notiqlik", en: "Public speaking", ru: "Ораторское мастерство" },
    text: {
      uz: "Qisqa nutqlar: tuzilma, ovoz va auditoriya bilan aloqa.",
      en: "Short talks: structure, voice and connecting with the audience.",
      ru: "Короткие выступления: структура, голос и контакт с залом.",
    },
    when: { uz: "Seshanba", en: "Tuesdays", ru: "Вторник" },
  },
];

/* ───────────── Teachers ───────────── TODO: replace with real data (placeholder names, not real people) */
export const englishTeachers: { name: string; role: L10n; note: L10n }[] = [
  {
    name: "Kamola Ergasheva",
    role: { uz: "Kafedra mudiri", en: "Head of department", ru: "Заведующая кафедрой" },
    note: { uz: "CELTA, 12 yillik tajriba", en: "CELTA, 12 years of teaching", ru: "CELTA, 12 лет преподавания" },
  },
  {
    name: "Jasur Qodirov",
    role: { uz: "Ingliz tili oʻqituvchisi", en: "English teacher", ru: "Преподаватель английского" },
    note: { uz: "Debat klubi murabbiyi", en: "Coaches the debate club", ru: "Тренер дебатного клуба" },
  },
  {
    name: "Shahnoza Umarova",
    role: { uz: "Ingliz tili oʻqituvchisi", en: "English teacher", ru: "Преподаватель английского" },
    note: { uz: "Akademik yozuv, 10–11-sinflar", en: "Academic writing, grades 10–11", ru: "Академическое письмо, 10–11 классы" },
  },
  {
    name: "Bekzod Rashidov",
    role: { uz: "Ingliz tili oʻqituvchisi", en: "English teacher", ru: "Преподаватель английского" },
    note: { uz: "Teatr studiyasi rahbari", en: "Runs the drama studio", ru: "Руководитель театральной студии" },
  },
];
