// Content for /yonalishlar/xitoy-tili (Chinese programme).
// Intensive Chinese is a real part of the curriculum; hours, HSK targets, clubs and teachers are placeholders.
import type { L10n } from "@/lib/utils";
import { images, type ImageSlot } from "@/lib/images";

export const chineseCopy = {
  hero: {
    title: { uz: "Xitoy tili", en: "Chinese", ru: "Китайский язык" } satisfies L10n,
    lead: {
      uz: "5-sinfdan boshlab chuqurlashtirilgan xitoy tili: ieroglif, talaffuz, nutq va madaniyat. Har bir belgi — bir necha chiziq, har bir chiziq — oʻz tartibida.",
      en: "Intensive Chinese from grade 5: characters, pronunciation, speaking and culture. Every character is a few strokes, and every stroke has its order.",
      ru: "Углублённый китайский с 5 класса: иероглифы, произношение, речь и культура. Каждый знак — несколько черт, и у каждой черты свой порядок.",
    } satisfies L10n,
    meaning: { uz: "oʻrganmoq", en: "to learn", ru: "учиться" } satisfies L10n,
    charLabel: {
      uz: "学 ieroglifi (xué — «oʻrganmoq») chiziqma-chiziq yozilmoqda",
      en: "The character 学 (xué, “to learn”) written stroke by stroke",
      ru: "Иероглиф 学 (xué — «учиться»), написанный черта за чертой",
    } satisfies L10n,
    strokes: { uz: "8 ta chiziq", en: "8 strokes", ru: "8 черт" } satisfies L10n,
    replay: { uz: "Qayta yozish", en: "Write it again", ru: "Написать заново" } satisfies L10n,
  },
  why: {
    title: { uz: "Nega xitoy tili", en: "Why Chinese", ru: "Почему китайский" } satisfies L10n,
  },
  curriculum: {
    title: { uz: "Sinflar boʻyicha dastur", en: "Programme by grade", ru: "Программа по классам" } satisfies L10n,
    lead: {
      uz: "Har bir sinf uchun maqsad — HSK darajasi. Halqa boʻylab yurib, 11-sinfda erkin muloqotga yetamiz.",
      en: "Each grade works towards an HSK level. Step by step around the ring, to confident Chinese by grade 11.",
      ru: "У каждого класса своя цель — уровень HSK. Шаг за шагом по кругу — к уверенному китайскому к 11 классу.",
    } satisfies L10n,
    tabsLabel: { uz: "Sinflar", en: "Grades", ru: "Классы" } satisfies L10n,
    grade: { uz: "sinf", en: "Grade", ru: "класс" } satisfies L10n,
    hours: { uz: "haftasiga soat", en: "hours a week", ru: "часов в неделю" } satisfies L10n,
    target: { uz: "Yil oxiridagi maqsad", en: "Target by the end of the year", ru: "Цель к концу года" } satisfies L10n,
    arcLabel: {
      uz: "HSK darajalari yoʻli: {grade}-sinf uchun maqsad — {level}",
      en: "HSK level path: the target for grade {grade} is {level}",
      ru: "Путь по уровням HSK: цель для {grade} класса — {level}",
    } satisfies L10n,
    note: {
      uz: "Dastur taxminiy, oʻquv rejasi tasdiqlangach yangilanadi.",
      en: "Indicative programme; it will be updated once the curriculum is approved.",
      ru: "Программа ориентировочная и будет уточнена после утверждения учебного плана.",
    } satisfies L10n,
  },
  character: {
    title: { uz: "Kun ieroglifi", en: "Character of the day", ru: "Иероглиф дня" } satisfies L10n,
    lead: {
      uz: "Har kuni bitta yangi belgi. Tinglang, takrorlang, yozib koʻring.",
      en: "One new character every day. Listen, repeat, try writing it.",
      ru: "Каждый день — новый знак. Послушайте, повторите, попробуйте написать.",
    } satisfies L10n,
    listen: { uz: "Tinglash", en: "Listen", ru: "Послушать" } satisfies L10n,
    listenTo: { uz: "Talaffuzini tinglash", en: "Hear it pronounced", ru: "Послушать произношение" } satisfies L10n,
    prev: { uz: "Oldingi belgi", en: "Previous character", ru: "Предыдущий знак" } satisfies L10n,
    next: { uz: "Keyingi belgi", en: "Next character", ru: "Следующий знак" } satisfies L10n,
    example: { uz: "Soʻzda", en: "In a word", ru: "В слове" } satisfies L10n,
    pickLabel: {
      uz: "Boshqa belgini tanlang",
      en: "Pick another character",
      ru: "Выберите другой знак",
    } satisfies L10n,
    noSpeech: {
      uz: "Brauzeringiz nutq sintezini qoʻllab-quvvatlamaydi — pinyin boʻyicha oʻqing.",
      en: "Your browser does not support speech synthesis — read it using the pinyin.",
      ru: "Ваш браузер не поддерживает синтез речи — прочитайте по пиньиню.",
    } satisfies L10n,
    noVoice: {
      uz: "Qurilmangizda xitoycha ovoz topilmadi, talaffuz aniq boʻlmasligi mumkin.",
      en: "No Chinese voice was found on your device, so the pronunciation may be off.",
      ru: "На устройстве не найден китайский голос, произношение может быть неточным.",
    } satisfies L10n,
  },
  culture: {
    title: { uz: "Toʻgaraklar va madaniyat", en: "Clubs and culture", ru: "Кружки и культура" } satisfies L10n,
    lead: {
      uz: "Til darsdan tashqarida ham yashaydi: moʻyqalam, choy va bayram.",
      en: "The language lives outside the classroom too: the brush, tea and festivals.",
      ru: "Язык живёт и вне урока: кисть, чай и праздники.",
    } satisfies L10n,
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

/* ───────────── Why Chinese (3–4 points) ───────────── */
export const whyPoints: { numeral: string; title: L10n; text: L10n }[] = [
  {
    numeral: "一",
    title: { uz: "Qoʻshni va hamkor", en: "A neighbour and a partner", ru: "Сосед и партнёр" },
    text: {
      uz: "Xitoy — Oʻzbekistonning eng yirik hamkorlaridan biri. Tilni bilish taʼlim, fan va ish uchun yangi yoʻllar ochadi.",
      en: "China is one of Uzbekistan’s largest partners. Knowing the language opens doors in study, science and work.",
      ru: "Китай — один из крупнейших партнёров Узбекистана. Знание языка открывает дороги в учёбе, науке и работе.",
    },
  },
  {
    numeral: "二",
    title: { uz: "Boshqacha fikrlash", en: "A different way of thinking", ru: "Другое мышление" },
    text: {
      uz: "Ieroglif — rasm, tovush va maʼnoning birikmasi. Uni oʻrganish xotira va diqqatni mashq qildiradi.",
      en: "A character joins picture, sound and meaning. Learning them trains memory and attention.",
      ru: "Иероглиф объединяет образ, звук и смысл. Их изучение тренирует память и внимание.",
    },
  },
  {
    numeral: "三",
    title: {
      uz: "Erta boshlash — katta ustunlik",
      en: "Starting early pays off",
      ru: "Раннее начало — большое преимущество",
    },
    text: {
      uz: "Ohanglar va talaffuz 11–12 yoshda oson oʻzlashtiriladi. 5-sinfdan boshlagan oʻquvchi 11-sinfda erkin gapiradi.",
      en: "Tones and pronunciation come easily at 11–12. A student who starts in grade 5 can speak freely by grade 11.",
      ru: "Тоны и произношение легко даются в 11–12 лет. Начав в 5 классе, к 11-му ученик говорит свободно.",
    },
  },
  {
    numeral: "四",
    title: { uz: "Ikki tilning kuchi", en: "Two languages, twice the reach", ru: "Сила двух языков" },
    text: {
      uz: "Ingliz va xitoy tili birga — dunyo aholisining katta qismi bilan bir tilda gaplashish imkoniyati.",
      en: "English and Chinese together let you talk with a large part of the world in its own language.",
      ru: "Английский и китайский вместе позволяют говорить с большой частью мира на её языке.",
    },
  },
];

/* ───────────── Curriculum by grade + HSK path ─────────────
   TODO: replace with real data (hours per week, topics and the HSK target for each grade are placeholders) */
export const hskLevels = [1, 2, 3, 4, 5, 6] as const;

export type ChineseGrade = {
  grade: number;
  hsk: (typeof hskLevels)[number];
  hours: number;
  focus: L10n;
  topics: L10n<string[]>;
};

export const chineseGrades: ChineseGrade[] = [
  {
    grade: 5,
    hsk: 1,
    hours: 6,
    focus: {
      uz: "Tovushlar, ohanglar va birinchi 150 ta belgi.",
      en: "Sounds, tones and the first 150 characters.",
      ru: "Звуки, тоны и первые 150 иероглифов.",
    },
    topics: {
      uz: ["Pinyin va toʻrt ohang", "Chiziqlar tartibi", "Salomlashish, oila, sonlar"],
      en: ["Pinyin and the four tones", "Stroke order", "Greetings, family, numbers"],
      ru: ["Пиньинь и четыре тона", "Порядок черт", "Приветствие, семья, числа"],
    },
  },
  {
    grade: 6,
    hsk: 2,
    hours: 6,
    focus: {
      uz: "Kundalik mavzularda qisqa suhbat.",
      en: "Short conversations on everyday topics.",
      ru: "Короткие диалоги на бытовые темы.",
    },
    topics: {
      uz: ["Maktab va kun tartibi", "Xarid va taom", "Oddiy matnlarni oʻqish"],
      en: ["School and routine", "Shopping and food", "Reading simple texts"],
      ru: ["Школа и распорядок", "Покупки и еда", "Чтение простых текстов"],
    },
  },
  {
    grade: 7,
    hsk: 3,
    hours: 5,
    focus: {
      uz: "600 ta soʻz: oʻz fikrini ayta olish.",
      en: "600 words: saying what you think.",
      ru: "600 слов: умение высказать мнение.",
    },
    topics: {
      uz: ["Sayohat va shahar", "Qisqa insho", "Xattotlik asoslari"],
      en: ["Travel and the city", "Short essays", "Calligraphy basics"],
      ru: ["Путешествия и город", "Короткие сочинения", "Основы каллиграфии"],
    },
  },
  {
    grade: 8,
    hsk: 3,
    hours: 5,
    focus: {
      uz: "HSK 3 ni mustahkamlash, taqdimotlar.",
      en: "Consolidating HSK 3, giving presentations.",
      ru: "Закрепление HSK 3, презентации.",
    },
    topics: {
      uz: ["Loyiha: Xitoy shaharlari", "Tinglab tushunish", "Grammatika: 了, 过, 着"],
      en: ["Project: cities of China", "Listening", "Grammar: 了, 过, 着"],
      ru: ["Проект: города Китая", "Аудирование", "Грамматика: 了, 过, 着"],
    },
  },
  {
    grade: 9,
    hsk: 4,
    hours: 5,
    focus: {
      uz: "1200 ta soʻz: erkin muloqot.",
      en: "1,200 words: talking freely.",
      ru: "1200 слов: свободное общение.",
    },
    topics: {
      uz: ["Yangiliklar va maqolalar", "Munozara", "Madaniyat va tarix"],
      en: ["News and articles", "Discussion", "Culture and history"],
      ru: ["Новости и статьи", "Дискуссия", "Культура и история"],
    },
  },
  {
    grade: 10,
    hsk: 4,
    hours: 4,
    focus: {
      uz: "Akademik matnlar va yozma ish.",
      en: "Academic texts and written work.",
      ru: "Академические тексты и письменные работы.",
    },
    topics: {
      uz: ["Ilmiy-ommabop matnlar", "Esse", "Xitoycha taqdimot"],
      en: ["Popular-science texts", "Essays", "Presenting in Chinese"],
      ru: ["Научно-популярные тексты", "Эссе", "Презентация на китайском"],
    },
  },
  {
    grade: 11,
    hsk: 5,
    hours: 4,
    focus: {
      uz: "Universitetga tayyor daraja.",
      en: "A university-ready level.",
      ru: "Уровень, достаточный для университета.",
    },
    topics: {
      uz: ["Adabiyot parchalari", "Tadqiqot loyihasi", "HSK imtihoniga tayyorgarlik"],
      en: ["Literature extracts", "Research project", "HSK exam preparation"],
      ru: ["Отрывки из литературы", "Исследовательский проект", "Подготовка к экзамену HSK"],
    },
  },
];

/* ───────────── Character of the day ───────────── */
export type Hanzi = {
  char: string;
  pinyin: string;
  meaning: L10n;
  word: { hanzi: string; pinyin: string; meaning: L10n };
};

export const characters: Hanzi[] = [
  {
    char: "学",
    pinyin: "xué",
    meaning: { uz: "oʻrganmoq", en: "to learn", ru: "учиться" },
    word: { hanzi: "学生", pinyin: "xuésheng", meaning: { uz: "oʻquvchi", en: "student", ru: "ученик" } },
  },
  {
    char: "你",
    pinyin: "nǐ",
    meaning: { uz: "sen, siz", en: "you", ru: "ты" },
    word: { hanzi: "你好", pinyin: "nǐ hǎo", meaning: { uz: "salom", en: "hello", ru: "здравствуй" } },
  },
  {
    char: "好",
    pinyin: "hǎo",
    meaning: { uz: "yaxshi", en: "good", ru: "хороший" },
    word: {
      hanzi: "好朋友",
      pinyin: "hǎo péngyou",
      meaning: { uz: "yaqin doʻst", en: "good friend", ru: "хороший друг" },
    },
  },
  {
    char: "书",
    pinyin: "shū",
    meaning: { uz: "kitob", en: "book", ru: "книга" },
    word: { hanzi: "书包", pinyin: "shūbāo", meaning: { uz: "maktab sumkasi", en: "school bag", ru: "портфель" } },
  },
  {
    char: "水",
    pinyin: "shuǐ",
    meaning: { uz: "suv", en: "water", ru: "вода" },
    word: { hanzi: "喝水", pinyin: "hē shuǐ", meaning: { uz: "suv ichmoq", en: "to drink water", ru: "пить воду" } },
  },
  {
    char: "山",
    pinyin: "shān",
    meaning: { uz: "togʻ", en: "mountain", ru: "гора" },
    word: {
      hanzi: "爬山",
      pinyin: "pá shān",
      meaning: { uz: "togʻga chiqmoq", en: "to climb a mountain", ru: "подниматься в горы" },
    },
  },
  {
    char: "茶",
    pinyin: "chá",
    meaning: { uz: "choy", en: "tea", ru: "чай" },
    word: { hanzi: "绿茶", pinyin: "lǜchá", meaning: { uz: "koʻk choy", en: "green tea", ru: "зелёный чай" } },
  },
  {
    char: "家",
    pinyin: "jiā",
    meaning: { uz: "uy, oila", en: "home, family", ru: "дом, семья" },
    word: { hanzi: "家人", pinyin: "jiārén", meaning: { uz: "oila aʼzolari", en: "family members", ru: "родные" } },
  },
  {
    char: "月",
    pinyin: "yuè",
    meaning: { uz: "oy", en: "moon, month", ru: "луна, месяц" },
    word: { hanzi: "月饼", pinyin: "yuèbing", meaning: { uz: "oy pishirigʻi", en: "mooncake", ru: "лунный пряник" } },
  },
  {
    char: "心",
    pinyin: "xīn",
    meaning: { uz: "yurak", en: "heart", ru: "сердце" },
    word: { hanzi: "小心", pinyin: "xiǎoxīn", meaning: { uz: "ehtiyot boʻl", en: "be careful", ru: "осторожно" } },
  },
  {
    char: "中",
    pinyin: "zhōng",
    meaning: { uz: "oʻrta", en: "middle", ru: "середина" },
    word: {
      hanzi: "中文",
      pinyin: "zhōngwén",
      meaning: { uz: "xitoy tili", en: "Chinese language", ru: "китайский язык" },
    },
  },
];

/* ───────────── Clubs & culture ───────────── TODO: replace with real data (club schedules) */
export const cultureCards: { id: string; photo: ImageSlot; hanzi: string; title: L10n; text: L10n; when: L10n }[] = [
  {
    id: "calligraphy",
    photo: images.chinese.calligraphy,
    hanzi: "书法",
    title: { uz: "Xattotlik toʻgaragi", en: "Calligraphy club", ru: "Кружок каллиграфии" },
    text: {
      uz: "Moʻyqalam, siyoh va sabr. Chiziqlar tartibini qoʻl bilan his qilish — ieroglifni eslab qolishning eng yaxshi yoʻli.",
      en: "Brush, ink and patience. Feeling the stroke order in your hand is the best way to remember a character.",
      ru: "Кисть, тушь и терпение. Почувствовать порядок черт рукой — лучший способ запомнить иероглиф.",
    },
    when: { uz: "Seshanba, 15:00", en: "Tuesdays, 15:00", ru: "Вторник, 15:00" },
  },
  {
    id: "tea",
    photo: images.chinese.teaPour,
    hanzi: "茶艺",
    title: { uz: "Choy madaniyati", en: "Tea culture", ru: "Чайная культура" },
    text: {
      uz: "Oʻzbek va xitoy choy anʼanalarini solishtiramiz: dasturxon, suhbat va mehmondoʻstlik.",
      en: "Comparing Uzbek and Chinese tea traditions: the table, the conversation and hospitality.",
      ru: "Сравниваем узбекские и китайские чайные традиции: стол, беседа и гостеприимство.",
    },
    when: { uz: "Oyiga ikki marta", en: "Twice a month", ru: "Дважды в месяц" },
  },
  {
    id: "new-year",
    photo: images.chinese.lanternsNight,
    hanzi: "春节",
    title: { uz: "Xitoy Yangi yili", en: "Chinese New Year", ru: "Китайский Новый год" },
    text: {
      uz: "Fonuslar, qogʻoz kesish, bayram taomlari va sahna koʻrinishi — butun maktab uchun kecha.",
      en: "Lanterns, paper-cutting, festive food and a stage show — an evening for the whole school.",
      ru: "Фонари, вырезание из бумаги, праздничные блюда и сценка — вечер для всей школы.",
    },
    when: { uz: "Har yili, yanvar–fevral", en: "Every year, January–February", ru: "Каждый год, январь–февраль" },
  },
];

/* ───────────── Teachers ───────────── TODO: replace with real data (placeholder names, not real people) */
export const chineseTeachers: { name: string; role: L10n; note: L10n }[] = [
  {
    name: "Malika Yoʻldosheva",
    role: { uz: "Kafedra mudiri", en: "Head of department", ru: "Заведующая кафедрой" },
    note: { uz: "HSK 6, xitoy filologiyasi", en: "HSK 6, Chinese philology", ru: "HSK 6, китайская филология" },
  },
  {
    name: "Sardor Nazarov",
    role: { uz: "Xitoy tili oʻqituvchisi", en: "Chinese teacher", ru: "Преподаватель китайского" },
    note: { uz: "5–7-sinflar, talaffuz", en: "Grades 5–7, pronunciation", ru: "5–7 классы, произношение" },
  },
  {
    name: "Nigora Saidova",
    role: { uz: "Xitoy tili oʻqituvchisi", en: "Chinese teacher", ru: "Преподаватель китайского" },
    note: { uz: "Xattotlik toʻgaragi rahbari", en: "Leads the calligraphy club", ru: "Ведёт кружок каллиграфии" },
  },
];
