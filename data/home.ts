import type { L10n } from "@/lib/utils";

// Home page copy. Facts here come from the official brief; anything else is marked TODO.

export const hero = {
  title: {
    uz: "Ilm, tillar va oʻzlik — bir halqada",
    en: "Science, languages and roots — one circle",
    ru: "Наука, языки и корни — в одном круге",
  } satisfies L10n,
  lead: {
    uz: "Ixtisoslashtirilgan taʼlim muassasalari agentligi tizimidagi yangi maktab-internat. Bu yerda iqtidorli bolalar aniq fanlarni chuqur oʻrganadi, ingliz va xitoy tillarida erkin fikrlaydi va oʻz tarixi, adabiyoti, madaniyatini yaxshi biladi.",
    en: "A new boarding school within Uzbekistan's Agency of Specialized Educational Institutions. Gifted children study the sciences in depth, learn to think freely in English and Chinese, and know their own history, literature and culture well.",
    ru: "Новая школа-интернат в системе Агентства специализированных образовательных учреждений. Одарённые дети углублённо изучают точные науки, свободно думают на английском и китайском и хорошо знают свою историю, литературу и культуру.",
  } satisfies L10n,
  facts: [
    { value: "2026/2027", label: { uz: "birinchi oʻquv yili", en: "our first school year", ru: "первый учебный год" } },
    { value: "260+", label: { uz: "oʻquvchi sentabrdan tahsil olmoqda", en: "students since September", ru: "учеников с сентября" } },
    { value: "22 315", label: { uz: "ariza birinchi qabulga", en: "applications to the first intake", ru: "заявлений на первый набор" } },
  ],
};

export const about = {
  title: {
    uz: "Uch yoʻnalish kesishgan joyda maktab boshlanadi",
    en: "The school begins where three paths meet",
    ru: "Школа начинается там, где пересекаются три пути",
  } satisfies L10n,
  text: {
    uz: "Darajasi Prezident maktablari bilan tenglashtirilgan maktab-internatda kun davomida uch narsa bir-birini toʻldiradi: STEM fanlaridagi chuqur bilim, ikki xorijiy til va milliy oʻzlik. Bittasi boshqasining oʻrnini bosmaydi — ular birgalikda kuchli.",
    en: "Our level is set to match the Presidential Schools. Through every school day three things reinforce each other: deep knowledge in STEM, two foreign languages, and a strong sense of national identity. None replaces the others — together they are stronger.",
    ru: "Уровень школы-интерната сопоставим с Президентскими школами. Каждый день здесь три вещи дополняют друг друга: глубокие знания в STEM, два иностранных языка и национальная идентичность. Ничто не заменяет другое — вместе они сильнее.",
  } satisfies L10n,
  hint: { uz: "Doiraga bosing yoki ustiga olib boring", en: "Tap or hover a circle", ru: "Нажмите или наведите на круг" } satisfies L10n,
  centre: { uz: "Bizning oʻquvchi", en: "Our student", ru: "Наш ученик" } satisfies L10n,
  pillars: [
    {
      id: "stem",
      color: "var(--green)",
      title: { uz: "STEM", en: "STEM", ru: "STEM" },
      short: { uz: "Matematika, fizika, kimyo, biologiya, IT", en: "Maths, physics, chemistry, biology, IT", ru: "Математика, физика, химия, биология, ИТ" },
      text: {
        uz: "Kuchli matematik tayyorgarlik va tabiiy fanlar. Loyiha ishlari va mustaqil tadqiqotlar orqali oʻquvchi savol berishni, tajriba qilishni va natijani himoya qilishni oʻrganadi.",
        en: "Strong mathematics and natural sciences. Through project work and independent research, students learn to ask questions, run experiments and defend their results.",
        ru: "Сильная математика и естественные науки. Через проекты и самостоятельные исследования ученики учатся задавать вопросы, ставить опыты и защищать результат.",
      },
    },
    {
      id: "languages",
      color: "var(--navy)",
      title: { uz: "Xorijiy tillar", en: "Foreign languages", ru: "Иностранные языки" },
      short: { uz: "Ingliz va xitoy tillari — intensiv", en: "English and Chinese — intensive", ru: "Английский и китайский — интенсивно" },
      text: {
        uz: "Ingliz va xitoy tillari intensiv oʻqitiladi: til dars uchun emas, fikrlash, oʻqish va muloqot uchun vosita boʻladi.",
        en: "English and Chinese are taught intensively, so a language becomes a tool for thinking, reading and talking — not just a subject.",
        ru: "Английский и китайский преподаются интенсивно: язык становится инструментом мышления, чтения и общения, а не просто предметом.",
      },
    },
    {
      id: "identity",
      color: "var(--orange)",
      title: { uz: "Milliy oʻzlik", en: "National identity", ru: "Национальная идентичность" },
      short: { uz: "Ona tili, tarix, adabiyot, madaniyat", en: "Native language, history, literature, culture", ru: "Родной язык, история, литература, культура" },
      text: {
        uz: "Dasturning katta va muhim qismi ona tili, Oʻzbekiston tarixi, adabiyot va madaniyatga bagʻishlangan. Zamonaviy taʼlim oʻz ildizlarini bilgan inson qoʻlida kuchli boʻladi.",
        en: "A large and important part of the programme is given to the native language, the history of Uzbekistan, literature and culture. Modern education is strongest in the hands of someone who knows their roots.",
        ru: "Большая и важная часть программы отведена родному языку, истории Узбекистана, литературе и культуре. Современное образование сильнее всего у того, кто знает свои корни.",
      },
    },
  ],
};

export const firstYear = {
  title: { uz: "Birinchi yil — qadamma-qadam", en: "Our first year, step by step", ru: "Первый год — шаг за шагом" } satisfies L10n,
  steps: [
    {
      kicker: { uz: "1–15 iyun 2026", en: "1–15 June 2026", ru: "1–15 июня 2026" },
      big: { uz: "Ariza", en: "Applications", ru: "Заявления" },
      text: {
        uz: "5, 6 va 7-sinflarga arizalar ariza.piima.uz va my.gov.uz orqali onlayn qabul qilindi.",
        en: "Applications for grades 5, 6 and 7 were accepted online through ariza.piima.uz and my.gov.uz.",
        ru: "Заявления в 5, 6 и 7 классы принимались онлайн через ariza.piima.uz и my.gov.uz.",
      },
    },
    {
      kicker: { uz: "Qabul yakunida", en: "When applications closed", ru: "По итогам приёма" },
      big: { uz: "22 315", en: "22,315", ru: "22 315" },
      text: {
        uz: "ta ariza kelib tushdi — yangi maktabga boʻlgan ishonchning birinchi belgisi.",
        en: "applications arrived — the first sign of trust in a brand-new school.",
        ru: "заявлений поступило — первый знак доверия новой школе.",
      },
    },
    {
      kicker: { uz: "Kirish imtihoni", en: "Entrance exam", ru: "Вступительный экзамен" },
      big: { uz: "Cambridge Assessment", en: "Cambridge Assessment", ru: "Cambridge Assessment" },
      text: {
        uz: "Prezident maktablari modeli asosida bir bosqichda: matematika (16 Critical Thinking + 24 Problem Solving) va ingliz tili (Reading + Grammar) — har biri 40 ta savol.",
        en: "One stage, on the Presidential Schools' model: Mathematics (16 Critical Thinking + 24 Problem Solving) and English (Reading + Grammar) — 40 questions each.",
        ru: "Один этап по модели Президентских школ: математика (16 Critical Thinking + 24 Problem Solving) и английский (Reading + Grammar) — по 40 вопросов.",
      },
    },
    {
      kicker: { uz: "Sentabr 2026", en: "September 2026", ru: "Сентябрь 2026" },
      big: { uz: "260+", en: "260+", ru: "260+" },
      text: {
        uz: "iqtidorli oʻquvchi maktab-internatda tahsilni boshladi.",
        en: "gifted students began their studies at the school.",
        ru: "одарённых учеников начали учёбу в школе-интернате.",
      },
    },
  ],
};

export const directions = {
  title: { uz: "Ikki til — ikki dunyo", en: "Two languages, two worlds", ru: "Два языка — два мира" } satisfies L10n,
  items: [
    {
      id: "english",
      href: "/yonalishlar/ingliz-tili",
      glyph: "Aa",
      accent: "var(--amber)",
      title: { uz: "Ingliz tili", en: "English", ru: "Английский язык" },
      lead: {
        uz: "Oʻqish, yozish, tinglash va gapirish — toʻrt koʻnikma bir xil kuch bilan.",
        en: "Reading, writing, listening and speaking — all four skills with equal weight.",
        ru: "Чтение, письмо, аудирование и говорение — все четыре навыка на равных.",
      },
      points: {
        uz: ["Intensiv dastur 5-sinfdan", "Munozara klubi va Model UN", "Xalqaro imtihonlarga yoʻl"],
        en: ["Intensive programme from grade 5", "Debate club and Model UN", "A path to international exams"],
        ru: ["Интенсивная программа с 5 класса", "Дебатный клуб и Model UN", "Путь к международным экзаменам"],
      },
    },
    {
      id: "chinese",
      href: "/yonalishlar/xitoy-tili",
      glyph: "中",
      accent: "var(--red)",
      title: { uz: "Xitoy tili", en: "Chinese", ru: "Китайский язык" },
      lead: {
        uz: "Birinchi ieroglifdan erkin muloqotgacha — til va madaniyat birga.",
        en: "From the first character to confident conversation — language and culture together.",
        ru: "От первого иероглифа до свободного общения — язык и культура вместе.",
      },
      points: {
        uz: ["Intensiv dastur 5-sinfdan", "HSK darajalari boʻyicha yoʻl", "Xattotlik va choy madaniyati"],
        en: ["Intensive programme from grade 5", "A path through HSK levels", "Calligraphy and tea culture"],
        ru: ["Интенсивная программа с 5 класса", "Путь по уровням HSK", "Каллиграфия и чайная культура"],
      },
    },
  ],
  more: { uz: "Yoʻnalish haqida", en: "About the programme", ru: "О направлении" } satisfies L10n,
};

// TODO: replace with real data — placeholder daily schedule
export const day = {
  title: { uz: "Internatda bir kun", en: "A day at the boarding school", ru: "Один день в интернате" } satisfies L10n,
  lead: {
    uz: "Aniq kun tartibi — erkin fikrlashga joy qoldiradi. Soat miliga bosing.",
    en: "A clear routine leaves room for free thinking. Pick a part of the dial.",
    ru: "Чёткий распорядок оставляет место для свободной мысли. Выберите часть циферблата.",
  } satisfies L10n,
  note: { uz: "Kun tartibi taxminiy va oʻzgarishi mumkin.", en: "Schedule is indicative and may change.", ru: "Распорядок ориентировочный и может меняться." } satisfies L10n,
  slots: [
    { from: 7, to: 7.5, color: "var(--amber)", title: { uz: "Uygʻonish va badantarbiya", en: "Wake-up and exercise", ru: "Подъём и зарядка" }, text: { uz: "Yengil mashqlar va kunga tayyorgarlik.", en: "Light exercise and getting ready for the day.", ru: "Лёгкая зарядка и сборы." } },
    { from: 7.5, to: 8, color: "var(--orange)", title: { uz: "Nonushta", en: "Breakfast", ru: "Завтрак" }, text: { uz: "Toʻyimli nonushta oshxonada.", en: "A proper breakfast in the canteen.", ru: "Сытный завтрак в столовой." } },
    { from: 8, to: 13, color: "var(--navy)", title: { uz: "Darslar", en: "Lessons", ru: "Уроки" }, text: { uz: "STEM fanlari, ingliz va xitoy tillari, ona tili, tarix va adabiyot.", en: "STEM subjects, English and Chinese, native language, history and literature.", ru: "Предметы STEM, английский и китайский, родной язык, история и литература." } },
    { from: 13, to: 14, color: "var(--orange)", title: { uz: "Tushlik va dam", en: "Lunch and rest", ru: "Обед и отдых" }, text: { uz: "Issiq tushlik va qisqa tanaffus.", en: "Hot lunch and a short break.", ru: "Горячий обед и короткий перерыв." } },
    { from: 14, to: 16, color: "var(--purple)", title: { uz: "Toʻgaraklar va loyihalar", en: "Clubs and projects", ru: "Кружки и проекты" }, text: { uz: "Tadqiqot loyihalari, munozara, xattotlik, robototexnika.", en: "Research projects, debate, calligraphy, robotics.", ru: "Исследовательские проекты, дебаты, каллиграфия, робототехника." } },
    { from: 16, to: 17, color: "var(--green)", title: { uz: "Sport", en: "Sport", ru: "Спорт" }, text: { uz: "Futbol, basketbol, shaxmat va boshqalar.", en: "Football, basketball, chess and more.", ru: "Футбол, баскетбол, шахматы и не только." } },
    { from: 17, to: 19, color: "var(--navy)", title: { uz: "Mustaqil tayyorgarlik", en: "Self-study", ru: "Самоподготовка" }, text: { uz: "Tarbiyachi nazoratida uy vazifalari va takrorlash.", en: "Homework and revision with a tutor nearby.", ru: "Домашние задания и повторение под присмотром воспитателя." } },
    { from: 19, to: 20, color: "var(--orange)", title: { uz: "Kechki ovqat", en: "Dinner", ru: "Ужин" }, text: { uz: "Kechki ovqat va suhbat.", en: "Dinner and conversation.", ru: "Ужин и общение." } },
    { from: 20, to: 21.5, color: "var(--red)", title: { uz: "Boʻsh vaqt va oila bilan aloqa", en: "Free time and calling home", ru: "Свободное время и связь с семьёй" }, text: { uz: "Kitob, oʻyinlar, ota-onaga qoʻngʻiroq.", en: "Books, games, a call to parents.", ru: "Книги, игры, звонок родителям." } },
    { from: 21.5, to: 22, color: "var(--amber)", title: { uz: "Kun yakuni", en: "Winding down", ru: "Завершение дня" }, text: { uz: "Ertangi kunga tayyorgarlik.", en: "Getting ready for tomorrow.", ru: "Подготовка к завтрашнему дню." } },
    { from: 22, to: 31, color: "var(--ring)", title: { uz: "Uyqu", en: "Lights out", ru: "Отбой" }, text: { uz: "Toʻliq dam — 9 soatlik uyqu.", en: "Proper rest — nine hours of sleep.", ru: "Полноценный отдых — девять часов сна." } },
  ],
};

export const newsBlock = {
  title: { uz: "Soʻnggi yangiliklar", en: "Latest news", ru: "Последние новости" } satisfies L10n,
};

export const strip = {
  title: { uz: "Kun suratlarda", en: "Days in pictures", ru: "Дни в фотографиях" } satisfies L10n,
  hint: { uz: "Suring yoki aylantiring", en: "Drag or scroll", ru: "Потяните или прокрутите" } satisfies L10n,
};

export const cta = {
  title: {
    uz: "Keyingi qabul haqida birinchilardan boʻlib biling",
    en: "Be among the first to hear about the next intake",
    ru: "Узнайте о следующем наборе одними из первых",
  } satisfies L10n,
  text: {
    uz: "2026/2027 oʻquv yili uchun qabul yakunlandi. Yangi qabul eʼlonlari rasmiy portallarda va bizning saytda eʼlon qilinadi.",
    en: "Admission for 2026/2027 is closed. The next intake will be announced on the official portals and on this site.",
    ru: "Приём на 2026/2027 учебный год завершён. О новом наборе объявят на официальных порталах и на нашем сайте.",
  } satisfies L10n,
};
