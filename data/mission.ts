import type { L10n } from "@/lib/utils";

/**
 * Page copy for /biz-haqimizda/maqsad-va-vazifalar.
 * Goals follow the curriculum facts from the client brief (STEM + research, English & Chinese,
 * national identity, boarding life, gifted students, international-level study) and are phrased as goals, not results.
 * STEM-in-English, soft skills, Reggio principles, native-language respect, learning outdoors and
 * Eco-Schools Uzbekistan come from the school's official Telegram channel (posts of 2–18 Sep 2026).
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
    uz: "Toshkentdagi, Ixtisoslashtirilgan taʼlim muassasalari agentligi tizimidagi maktab-internat sifatida biz 2026/2027 oʻquv yilidan boshlab xorijiy tillarni egallagan, zamonaviy fan va texnologiyalar bilan ishlay oladigan va mustaqil fikrlaydigan yoshlar uchun mustahkam oʻquv muhitini yaratmoqdamiz.",
    en: "As a boarding school in Tashkent within the Agency of Specialized Educational Institutions, since the 2026/2027 academic year we have been building a strong place to learn for young people who master foreign languages, can work with modern science and technology, and think for themselves.",
    ru: "Как школа-интернат в Ташкенте в системе Агентства специализированных образовательных учреждений, с 2026/2027 учебного года мы создаём сильную среду обучения для молодых людей, которые владеют иностранными языками, умеют работать с современной наукой и технологиями и мыслят самостоятельно.",
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
      uz: "STEM fanlari ingliz tilida oʻqitiladi, xitoy tili esa chuqurlashtirilgan dastur asosida oʻrganiladi. Maqsad — oʻquvchilar ikkala tilda erkin oʻqish, yozish va fikrini himoya qilishni oʻrganishi.",
      en: "STEM subjects are taught in English, and Chinese is studied in depth. The aim is for students to read, write and defend their ideas freely in both languages.",
      ru: "Предметы STEM преподаются на английском, а китайский изучается углублённо. Наша цель — чтобы ученики свободно читали, писали и отстаивали свою точку зрения на обоих языках.",
    },
    points: {
      uz: ["STEM fanlari ingliz tilida", "HSK xalqaro imtihonlariga tayyorgarlik"],
      en: ["STEM subjects taught in English", "Preparation for the international HSK exams"],
      ru: ["Предметы STEM на английском", "Подготовка к международным экзаменам HSK"],
    },
  },
  {
    title: { uz: "Aniq fanlarni chuqur oʻrganish va tadqiqot", en: "Depth in science and a habit of research", ru: "Глубокие знания в точных науках и навык исследования" },
    text: {
      uz: "Matematika, fizika, kimyo, biologiya va informatikani chuqur oʻqitish, tajriba va mustaqil tadqiqot orqali savol qoʻyish va unga javob izlash koʻnikmasini shakllantirish. Fan faqat sinfda oʻrganilmaydi: tabiat ham sinfxona, bilim real sharoitda kuzatiladi va sinab koʻriladi.",
      en: "Teaching mathematics, physics, chemistry, biology and computer science in depth, and building — through experiments and independent research — the habit of asking questions and finding answers. Science doesn't stop at the classroom door: nature is a classroom too, where knowledge is observed and tested in real settings.",
      ru: "Глубоко преподавать математику, физику, химию, биологию и информатику и через опыты и самостоятельные исследования учить ставить вопросы и искать ответы. Наука не заканчивается в классе: природа тоже класс, где знания наблюдают и проверяют в реальных условиях.",
    },
    points: {
      uz: ["Tajriba orqali oʻrganish", "«Eco-Schools Uzbekistan» loyihasiga qoʻshilish kutilmoqda"],
      en: ["Learning through experiment", "Expected to join the Eco-Schools Uzbekistan project"],
      ru: ["Обучение через эксперимент", "Ожидается вступление в проект Eco-Schools Uzbekistan"],
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
      uz: "Ona tili, Oʻzbekiston tarixi, adabiyot va madaniyatga oʻquv rejasining katta qismini ajratib, oʻz ildizlarini biladigan va qadrlaydigan yoshlarni tarbiyalash. Xorijiy tillarga qiziqish ona tiliga hurmat bilan birga boʻlishi kerak.",
      en: "Giving a large part of the curriculum to the native language, the history of Uzbekistan, literature and culture, so that students know and value their roots. Interest in foreign languages should go together with respect for the mother tongue.",
      ru: "Отводить значительную часть учебного плана родному языку, истории Узбекистана, литературе и культуре, чтобы ученики знали и ценили свои корни. Интерес к иностранным языкам должен сочетаться с уважением к родному языку.",
    },
    points: {
      uz: ["Ona tili va adabiyot", "Tarix va madaniy meros"],
      en: ["Native language and literature", "History and cultural heritage"],
      ru: ["Родной язык и литература", "История и культурное наследие"],
    },
  },
  {
    title: { uz: "Mustaqil fikrlash va yetakchilik", en: "Independent thinking and leadership", ru: "Самостоятельное мышление и лидерство" },
    text: {
      uz: "Darslar va internat hayoti orqali mustaqil fikrlash, oʻz vaqtini boshqarish, jamoada ishlash va yetakchilik koʻnikmalarini, shuningdek masʼuliyat va bir-biriga gʻamxoʻrlik qilishni shakllantirish.",
      en: "Using lessons and boarding life to build independent thinking, time management, teamwork and leadership, along with responsibility and looking out for one another.",
      ru: "Через уроки и жизнь в интернате развивать самостоятельное мышление, умение распоряжаться временем, работать в команде и быть лидером, а также ответственность и заботу друг о друге.",
    },
    points: {
      uz: ["Mustaqil fikrlash va vaqtni boshqarish", "Jamoada ishlash va yetakchilik"],
      en: ["Independent thinking and time management", "Teamwork and leadership"],
      ru: ["Самостоятельное мышление и тайм-менеджмент", "Работа в команде и лидерство"],
    },
  },
  {
    title: { uz: "Har bir bolaning qiziqishini qoʻllab-quvvatlash", en: "Supporting each child's interests", ru: "Поддержка интересов каждого ребёнка" },
    text: {
      uz: "Reggio pedagogikasi («bolalarning yuz tili») tamoyillariga tayanib, mustaqillik, ijodiy fikrlash va oʻziga ishonchni rivojlantirish. Bola gʻoyasini rasm, musiqa, harakat, loy va konstruksiyalar orqali ifodalaydi, tadqiqot mavzusini oʻzi tanlaydi. Oʻqituvchi — nazoratchi emas, qiziqishini qoʻllab-quvvatlaydigan hamroh.",
      en: "Drawing on the principles of Reggio pedagogy (“the hundred languages of children”) to develop independence, creative thinking and self-confidence. Children express ideas through drawing, music, movement, clay and construction, and choose their own research topics. The teacher is not a controller but a companion who supports their interests.",
      ru: "Опираясь на принципы педагогики Реджио («сто языков ребёнка»), развивать самостоятельность, творческое мышление и уверенность в себе. Дети выражают идеи через рисунок, музыку, движение, глину и конструкции и сами выбирают темы исследований. Учитель — не контролёр, а спутник, который поддерживает интересы ребёнка.",
    },
    points: {
      uz: ["Tadqiqot mavzusini oʻquvchi tanlaydi", "Oʻqituvchi — hamroh"],
      en: ["Students choose their research topics", "The teacher as a companion"],
      ru: ["Темы исследований выбирают ученики", "Учитель — спутник"],
    },
  },
];

export const values: { title: L10n; text: L10n }[] = [
  {
    title: { uz: "Qiziquvchanlik", en: "Curiosity", ru: "Любознательность" },
    text: {
      uz: "Savol berish — kuchsizlik emas. Biz “bilmayman” deyishdan qoʻrqmaydigan va javobni tajriba orqali oʻzi izlab topadigan oʻquvchilarni qadrlaymiz.",
      en: "Asking is not a weakness. We value students who aren't afraid to say “I don't know yet” and then find out for themselves by experimenting.",
      ru: "Спрашивать — не слабость. Мы ценим учеников, которые не боятся сказать «пока не знаю» и сами ищут ответ через эксперимент.",
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
      uz: "Boshqa tillar, madaniyatlar va fikrlarga qiziqish bilan qaraymiz — ona tilimiz va oʻz madaniyatimizni ham shu qiziqish va hurmat bilan oʻrganamiz.",
      en: "We approach other languages, cultures and ideas with interest — and treat our mother tongue and our own culture with the same interest and respect.",
      ru: "Мы с интересом относимся к другим языкам, культурам и взглядам — и с тем же интересом и уважением относимся к родному языку и своей культуре.",
    },
  },
];
