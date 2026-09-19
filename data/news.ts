// News items — ALL are placeholders written from the school's public facts. // TODO: replace with real data
// Facts used (real): 1–15 June 2026 online applications via ariza.piima.uz and my.gov.uz, 22,315 applications,
// one-stage entrance exam organised with Cambridge Assessment (Maths 16 + 24 = 40, English Reading + Grammar = 40),
// grades 5–7, more than 260 students from September 2026, STEM + English + Chinese + national identity.
// Everything else (dates of events, names, activities, quotes) is invented placeholder copy.
import { images, type ImageSlot } from "@/lib/images";
import type { L10n } from "@/lib/utils";

export type NewsCategory = "events" | "admission" | "academics" | "culture";

export type NewsBlock =
  | { type: "p" | "h2" | "quote"; text: string }
  | { type: "list"; items: string[] };

export type NewsItem = {
  slug: string;
  /** ISO date, e.g. "2026-09-02" */
  date: string;
  category: NewsCategory;
  image: ImageSlot;
  gallery?: ImageSlot[];
  readingMinutes: number;
  featured?: boolean;
  title: L10n;
  excerpt: L10n;
  body: L10n<NewsBlock[]>;
};

export const newsCategories: Record<NewsCategory, L10n> = {
  events: { uz: "Tadbirlar", en: "Events", ru: "События" },
  admission: { uz: "Qabul", en: "Admissions", ru: "Приём" },
  academics: { uz: "Oʻquv jarayoni", en: "Academics", ru: "Учёба" },
  culture: { uz: "Madaniyat", en: "Culture", ru: "Культура" },
};

// Newest first. TODO: replace with real data (every item below is a placeholder)
export const news: NewsItem[] = [
  // TODO: replace with real data
  {
    slug: "yotoqxonada-ilk-ikki-hafta",
    date: "2026-09-18",
    category: "events",
    image: images.dorm.hero,
    gallery: [images.dorm.bright, images.dorm.studyHall, images.dorm.canteen, images.dorm.lamp],
    readingMinutes: 4,
    title: {
      uz: "Yotoqxonadagi ilk ikki hafta: yangi uy, yangi tartib",
      en: "Two weeks in the boarding house: a new home and a new rhythm",
      ru: "Две недели в интернате: новый дом и новый ритм",
    },
    excerpt: {
      uz: "Oʻquvchilar kun tartibiga koʻnikmoqda, tarbiyachilar esa har bir xonaga alohida eʼtibor qaratmoqda.",
      en: "Students are settling into the daily routine, and the house staff are getting to know every room.",
      ru: "Ученики привыкают к распорядку дня, а воспитатели знакомятся с каждой комнатой.",
    },
    body: {
      uz: [
        { type: "p", text: "Maktab-internatda oʻqish — bu faqat darslar emas. Sentabr boshida yotoqxonaga joylashgan oʻquvchilar uchun birinchi ikki hafta yangi uyga koʻnikish davri boʻldi: xonadoshlar bilan tanishish, kun tartibini oʻzlashtirish va uydan uzoqda oʻzini erkin his qilish." },
        { type: "h2", text: "Kun tartibi" },
        { type: "p", text: "Har bir kun ertalabki badantarbiya bilan boshlanadi, kechqurun esa tarbiyachilar nazoratida mustaqil tayyorgarlik soati oʻtkaziladi. Dam olish kunlari sport, toʻgaraklar va sayrlar uchun vaqt ajratilgan." },
        { type: "list", items: ["Ertalabki badantarbiya va nonushta", "Darslar va tushlik", "Toʻgaraklar va sport mashgʻulotlari", "Kechki mustaqil tayyorgarlik", "Ota-onalar bilan qoʻngʻiroq vaqti"] },
        { type: "quote", text: "Birinchi kunlari uyni sogʻindim, lekin endi xonadoshlarim bilan kechki tayyorgarlikni kutib turamiz. — 6-sinf oʻquvchisi" },
        { type: "p", text: "Tarbiyachilar har hafta ota-onalarga farzandlarining ahvoli haqida qisqa maʼlumot yuboradi. Yotoqxona hayoti haqidagi batafsil maʼlumot tegishli sahifada joylashtiriladi." },
      ],
      en: [
        { type: "p", text: "Boarding school is more than lessons. For the students who moved into the residence at the start of September, the first two weeks were about making a new home: meeting roommates, learning the routine and feeling at ease away from family." },
        { type: "h2", text: "A day in the house" },
        { type: "p", text: "Each day starts with morning exercise and ends with a supervised study hour in the evening. Weekends leave room for sport, clubs and outings." },
        { type: "list", items: ["Morning exercise and breakfast", "Lessons and lunch", "Clubs and sport", "Evening study hour", "Time to call home"] },
        { type: "quote", text: "I missed home for the first few days, but now my roommates and I look forward to evening study. — a Grade 6 student" },
        { type: "p", text: "House staff send parents a short update every week. More about boarding life will be published on the dedicated page." },
      ],
      ru: [
        { type: "p", text: "Интернат — это не только уроки. Для учеников, заселившихся в начале сентября, первые две недели ушли на то, чтобы обжиться: познакомиться с соседями, привыкнуть к распорядку и почувствовать себя спокойно вдали от семьи." },
        { type: "h2", text: "Распорядок дня" },
        { type: "p", text: "День начинается с зарядки, а заканчивается самоподготовкой под присмотром воспитателей. Выходные отведены для спорта, кружков и прогулок." },
        { type: "list", items: ["Зарядка и завтрак", "Уроки и обед", "Кружки и спорт", "Вечерняя самоподготовка", "Время позвонить домой"] },
        { type: "quote", text: "Первые дни я скучал по дому, а теперь мы с соседями ждём вечерней самоподготовки. — ученик 6 класса" },
        { type: "p", text: "Каждую неделю воспитатели отправляют родителям короткую сводку. Подробнее о жизни в интернате — на отдельной странице." },
      ],
    },
  },
  // TODO: replace with real data
  {
    slug: "xitoy-madaniyati-kuni",
    date: "2026-09-17",
    category: "culture",
    image: images.chinese.lanterns,
    gallery: [images.chinese.calligraphy, images.chinese.teaPour, images.chinese.brush, images.chinese.lanternsNight],
    readingMinutes: 3,
    title: {
      uz: "Birinchi Xitoy madaniyati kuni: xattotlik, choy va fonuslar",
      en: "Our first Chinese Culture Day: calligraphy, tea and lanterns",
      ru: "Первый день китайской культуры: каллиграфия, чай и фонари",
    },
    excerpt: {
      uz: "Oʻquvchilar moʻyqalam bilan ilk ieroglifini yozdi va choy marosimi bilan tanishdi.",
      en: "Students wrote their first character with a brush and took part in a tea ceremony.",
      ru: "Ученики написали кистью свой первый иероглиф и познакомились с чайной церемонией.",
    },
    body: {
      uz: [
        { type: "p", text: "Xitoy tili maktab dasturining asosiy yoʻnalishlaridan biri. Tilni oʻrganish esa uning madaniyatini tushunishdan boshlanadi — shu maqsadda maktabda birinchi Xitoy madaniyati kuni oʻtkazildi." },
        { type: "h2", text: "Uch mashgʻulot" },
        { type: "list", items: ["Xattotlik: moʻyqalam bilan 人 (inson) va 学 (oʻrganmoq) ierogliflarini yozish", "Choy madaniyati: choy damlash va mehmon kutish odobi", "Qogʻoz fonuslar yasash va zalni bezash"] },
        { type: "quote", text: "Ieroglif — bu rasm emas, har bir chiziqning oʻz tartibi bor. Bugun bolalar buni oʻz qoʻli bilan his qildi. — xitoy tili oʻqituvchisi" },
        { type: "p", text: "Madaniyat kunlari oʻquv yili davomida muntazam oʻtkaziladi. Xitoy tili yoʻnalishi haqida batafsil maʼlumot tegishli sahifada." },
      ],
      en: [
        { type: "p", text: "Chinese is one of the core strands of the curriculum, and learning a language starts with understanding its culture. That is why the school held its first Chinese Culture Day." },
        { type: "h2", text: "Three workshops" },
        { type: "list", items: ["Calligraphy: writing 人 (person) and 学 (to learn) with a brush", "Tea culture: brewing tea and the etiquette of receiving guests", "Making paper lanterns to decorate the hall"] },
        { type: "quote", text: "A character is not a drawing: every stroke has its order. Today the children felt that with their own hands. — Chinese teacher" },
        { type: "p", text: "Culture days will take place regularly throughout the year. More about the Chinese programme on its own page." },
      ],
      ru: [
        { type: "p", text: "Китайский язык — одно из основных направлений программы, а язык начинается с понимания культуры. Поэтому в школе прошёл первый день китайской культуры." },
        { type: "h2", text: "Три мастерские" },
        { type: "list", items: ["Каллиграфия: иероглифы 人 (человек) и 学 (учиться) кистью", "Чайная культура: заваривание чая и этикет приёма гостей", "Бумажные фонари для украшения зала"] },
        { type: "quote", text: "Иероглиф — не рисунок: у каждой черты свой порядок. Сегодня дети почувствовали это своими руками. — учитель китайского языка" },
        { type: "p", text: "Дни культуры будут проходить регулярно в течение года. Подробнее о китайском направлении — на его странице." },
      ],
    },
  },
  // TODO: replace with real data
  {
    slug: "ingliz-tili-munozara-klubi",
    date: "2026-09-15",
    category: "academics",
    image: images.events.debate,
    gallery: [images.events.panel, images.events.mic, images.english.writing],
    readingMinutes: 3,
    title: {
      uz: "Ingliz tilidagi munozara klubi ish boshladi",
      en: "The English Debate Club holds its first session",
      ru: "Открылся дебатный клуб на английском языке",
    },
    excerpt: {
      uz: "Birinchi mavzu: «Maktab formasi majburiy boʻlishi kerakmi?» Ikki jamoa, uch daqiqalik nutqlar va qatʼiy vaqt nazorati.",
      en: "First motion: “This house would make school uniforms compulsory.” Two teams, three-minute speeches, strict timing.",
      ru: "Первая тема: «Должна ли школьная форма быть обязательной?» Две команды, трёхминутные речи и строгий регламент.",
    },
    body: {
      uz: [
        { type: "p", text: "Ingliz tili maktabda intensiv oʻqitiladi, lekin til faqat darsda emas, balki erkin muloqotda mustahkamlanadi. Shu sababli 6–7-sinf oʻquvchilari uchun munozara klubi tashkil etildi." },
        { type: "h2", text: "Qanday ishlaydi" },
        { type: "list", items: ["Haftada bir marta, darsdan keyin", "Har safar yangi mavzu va ikki jamoa", "Nutq, savol-javob va yakuniy xulosa", "Oʻqituvchi va hakamlar tomonidan fikr-mulohaza"] },
        { type: "p", text: "Munozara oʻquvchilarga dalil keltirish, raqibni diqqat bilan tinglash va fikrni qisqa, aniq ifodalashni oʻrgatadi. Bu koʻnikmalar tanqidiy fikrlash bilan bevosita bogʻliq." },
        { type: "quote", text: "Eng qiyini — raqibning gapini boʻlmaslik. Eng qiziqi — uning dalilini oʻz foydangga aylantirish. — 7-sinf oʻquvchisi" },
      ],
      en: [
        { type: "p", text: "English is taught intensively at the school, but a language settles in through real conversation, not just lessons. So we started a debate club for Grades 6 and 7." },
        { type: "h2", text: "How it works" },
        { type: "list", items: ["Once a week, after lessons", "A new motion and two teams every time", "Speeches, points of information and a closing summary", "Feedback from the teacher and judges"] },
        { type: "p", text: "Debating teaches students to build an argument, listen closely to the other side and say what they mean briefly and clearly — skills that go hand in hand with critical thinking." },
        { type: "quote", text: "The hardest part is not interrupting. The best part is turning their argument into yours. — a Grade 7 student" },
      ],
      ru: [
        { type: "p", text: "Английский в школе изучают интенсивно, но язык закрепляется в живом общении, а не только на уроках. Поэтому для 6–7 классов открылся дебатный клуб." },
        { type: "h2", text: "Как это устроено" },
        { type: "list", items: ["Раз в неделю, после уроков", "Каждый раз новая тема и две команды", "Речи, вопросы и заключительное слово", "Разбор от учителя и судей"] },
        { type: "p", text: "Дебаты учат строить аргумент, внимательно слушать оппонента и говорить коротко и по делу. Эти навыки напрямую связаны с критическим мышлением." },
        { type: "quote", text: "Самое трудное — не перебивать. Самое интересное — развернуть довод соперника в свою пользу. — ученица 7 класса" },
      ],
    },
  },
  // TODO: replace with real data
  {
    slug: "milliy-adabiyot-kechasi",
    date: "2026-09-13",
    category: "culture",
    image: images.events.theatre,
    gallery: [images.events.culture, images.events.choir, images.heritage.ceiling],
    readingMinutes: 3,
    title: {
      uz: "Milliy adabiyot kechasi: Navoiydan bugungi sheʼriyatgacha",
      en: "An evening of Uzbek literature: from Navoi to today",
      ru: "Вечер узбекской литературы: от Навои до наших дней",
    },
    excerpt: {
      uz: "Oʻquvchilar mumtoz gʻazallar va zamonaviy sheʼrlarni oʻqidi, 7-sinflar esa kichik sahna koʻrinishini taqdim etdi.",
      en: "Students recited classical ghazals and modern poems, and Grade 7 staged a short scene.",
      ru: "Ученики читали классические газели и современные стихи, а седьмые классы показали небольшую постановку.",
    },
    body: {
      uz: [
        { type: "p", text: "Maktab dasturining katta qismi ona tili, Oʻzbekiston tarixi, adabiyot va madaniyatga bagʻishlangan. Xorijiy tillarni chuqur oʻrganish milliy oʻzlikni anglash bilan birga borishi kerak — adabiyot kechasi shu gʻoyaga bagʻishlandi." },
        { type: "h2", text: "Dastur" },
        { type: "list", items: ["Alisher Navoiy gʻazallaridan parchalar", "XX asr oʻzbek sheʼriyati", "Oʻquvchilarning oʻz sheʼrlari", "7-sinflarning sahna koʻrinishi"] },
        { type: "p", text: "Kecha oxirida oʻquvchilar bir nechta sheʼrni ingliz va xitoy tillariga oʻgirishga urinib koʻrdi. Tarjima qanchalik qiyin ekanini his qilish — asl matnni yanada qadrlashga yordam beradi." },
        { type: "quote", text: "Sheʼrni boshqa tilga oʻgirganda, oʻz tilimizning qanchalik boy ekanini tushundim. — 7-sinf oʻquvchisi" },
      ],
      en: [
        { type: "p", text: "A large part of the curriculum is devoted to the native language, the history of Uzbekistan, literature and culture. Learning foreign languages in depth should go together with a strong sense of who you are — and that was the idea behind the literature evening." },
        { type: "h2", text: "The programme" },
        { type: "list", items: ["Ghazals by Alisher Navoi", "Uzbek poetry of the twentieth century", "Poems written by the students themselves", "A short scene staged by Grade 7"] },
        { type: "p", text: "To close the evening, students tried translating a few poems into English and Chinese. Feeling how hard translation is makes you value the original even more." },
        { type: "quote", text: "When I translated a poem, I realised how rich our own language is. — a Grade 7 student" },
      ],
      ru: [
        { type: "p", text: "Значительная часть программы посвящена родному языку, истории Узбекистана, литературе и культуре. Глубокое изучение иностранных языков должно идти рука об руку с пониманием собственных корней — этому и был посвящён литературный вечер." },
        { type: "h2", text: "Программа" },
        { type: "list", items: ["Газели Алишера Навои", "Узбекская поэзия XX века", "Стихи самих учеников", "Небольшая постановка седьмых классов"] },
        { type: "p", text: "В конце вечера ученики попробовали перевести несколько стихотворений на английский и китайский. Почувствовать, как непрост перевод, — значит ещё больше ценить оригинал." },
        { type: "quote", text: "Когда я переводила стихотворение, я поняла, насколько богат наш язык. — ученица 7 класса" },
      ],
    },
  },
  // TODO: replace with real data
  {
    slug: "ota-onalar-bilan-birinchi-uchrashuv",
    date: "2026-09-12",
    category: "events",
    image: images.events.speech,
    readingMinutes: 3,
    title: {
      uz: "Ota-onalar bilan birinchi uchrashuv",
      en: "Our first meeting with parents",
      ru: "Первая встреча с родителями",
    },
    excerpt: {
      uz: "Maktab rahbariyati oʻquv dasturi, yotoqxona tartibi va aloqa kanallari haqida soʻzlab berdi.",
      en: "The leadership team talked parents through the curriculum, boarding rules and how to stay in touch.",
      ru: "Руководство школы рассказало о программе, правилах интерната и о том, как держать связь.",
    },
    body: {
      uz: [
        { type: "p", text: "Oʻquv yilining ikkinchi haftasida maktab ota-onalarni birinchi umumiy uchrashuvga taklif qildi. Uchrashuvda oʻquv dasturi, yotoqxona qoidalari va maktab bilan aloqa tartibi muhokama qilindi." },
        { type: "h2", text: "Asosiy mavzular" },
        { type: "list", items: ["Oʻquv dasturi: STEM fanlari, ingliz va xitoy tillari, ona tili va tarix", "Loyiha ishlari va mustaqil tadqiqotlar", "Yotoqxona kun tartibi va tashrif kunlari", "Farzandning oʻzlashtirishi haqida maʼlumot olish"] },
        { type: "p", text: "Ota-onalar oʻz savollarini yozma ravishda ham qoldirishdi. Eng koʻp beriladigan savollarga javoblar saytda eʼlon qilinadi." },
        { type: "quote", text: "Biz uchun eng muhimi — maktab bilan ochiq muloqot. Bugun bunga ishonch hosil qildik. — ota-onalardan biri" },
      ],
      en: [
        { type: "p", text: "In the second week of term the school invited parents to its first general meeting. The agenda covered the curriculum, boarding rules and how families can reach the school." },
        { type: "h2", text: "What we covered" },
        { type: "list", items: ["The curriculum: STEM subjects, English and Chinese, native language and history", "Project work and independent research", "The boarding routine and visiting days", "How parents will hear about their child’s progress"] },
        { type: "p", text: "Parents also left questions in writing. Answers to the most common ones will be published on the website." },
        { type: "quote", text: "What matters most to us is an open conversation with the school. Today we saw that it is possible. — a parent" },
      ],
      ru: [
        { type: "p", text: "На второй неделе учёбы школа пригласила родителей на первое общее собрание. Обсудили учебную программу, правила интерната и то, как связаться со школой." },
        { type: "h2", text: "О чём говорили" },
        { type: "list", items: ["Программа: STEM-предметы, английский и китайский, родной язык и история", "Проектная работа и самостоятельные исследования", "Распорядок интерната и дни посещений", "Как родители будут узнавать об успехах ребёнка"] },
        { type: "p", text: "Родители оставили и письменные вопросы. Ответы на самые частые из них опубликуем на сайте." },
        { type: "quote", text: "Для нас главное — открытый диалог со школой. Сегодня мы убедились, что он есть. — одна из родительниц" },
      ],
    },
  },
  // TODO: replace with real data
  {
    slug: "tabiiy-fanlar-laboratoriyasi-ochildi",
    date: "2026-09-10",
    category: "academics",
    image: images.classes.labKids,
    gallery: [images.classes.labPair, images.classes.microscope, images.classes.physics, images.classes.robot],
    readingMinutes: 4,
    title: {
      uz: "Tabiiy fanlar laboratoriyasida birinchi tajribalar",
      en: "First experiments in the science lab",
      ru: "Первые опыты в лаборатории естественных наук",
    },
    excerpt: {
      uz: "Fizika, kimyo va biologiya darslari endi nazariya bilan cheklanmaydi: oʻquvchilar mikroskop va oʻlchov asboblari bilan ishlamoqda.",
      en: "Physics, chemistry and biology are no longer just theory: students are working with microscopes and measuring kits.",
      ru: "Физика, химия и биология — больше не только теория: ученики работают с микроскопами и измерительными приборами.",
    },
    body: {
      uz: [
        { type: "p", text: "Maktab dasturining tayanchi — kuchli STEM: matematika, fizika, kimyo, biologiya va informatika. Bu fanlarni tushunishning eng yaxshi yoʻli — oʻz qoʻling bilan sinab koʻrish. Sentabrda tabiiy fanlar laboratoriyasida birinchi amaliy mashgʻulotlar boshlandi." },
        { type: "h2", text: "Birinchi tajribalar" },
        { type: "list", items: ["Biologiya: piyoz poʻsti hujayralarini mikroskopda kuzatish", "Fizika: mayatnik tebranish davrini oʻlchash", "Kimyo: xavfsizlik qoidalari va oddiy indikatorlar bilan ishlash"] },
        { type: "p", text: "Har bir tajriba laboratoriya daftarida qayd etiladi: gipoteza, jarayon, natija va xulosa. Shu tariqa oʻquvchilar kichik yoshdanoq ilmiy tadqiqot tartibiga oʻrganadi." },
        { type: "h2", text: "Loyiha ishlari" },
        { type: "p", text: "Oʻquv yili davomida har bir sinf kichik tadqiqot loyihasini tayyorlaydi. Eng yaxshi ishlar bahorda maktab ilmiy anjumanida taqdim etiladi." },
      ],
      en: [
        { type: "p", text: "The backbone of the curriculum is strong STEM: maths, physics, chemistry, biology and IT. The best way to understand these subjects is to try things with your own hands, and in September the first practical sessions began in the science lab." },
        { type: "h2", text: "First experiments" },
        { type: "list", items: ["Biology: looking at onion skin cells under a microscope", "Physics: measuring the period of a pendulum", "Chemistry: lab safety and working with simple indicators"] },
        { type: "p", text: "Every experiment goes into a lab notebook: hypothesis, method, result and conclusion. That way students learn the habits of real research from an early age." },
        { type: "h2", text: "Project work" },
        { type: "p", text: "Over the year every class prepares a small research project. The best will be presented at the school science conference in the spring." },
      ],
      ru: [
        { type: "p", text: "Основа программы — сильный STEM: математика, физика, химия, биология и информатика. Лучший способ понять эти предметы — попробовать своими руками, и в сентябре в лаборатории начались первые практические занятия." },
        { type: "h2", text: "Первые опыты" },
        { type: "list", items: ["Биология: клетки кожицы лука под микроскопом", "Физика: измерение периода колебаний маятника", "Химия: техника безопасности и простые индикаторы"] },
        { type: "p", text: "Каждый опыт записывается в лабораторный журнал: гипотеза, ход работы, результат и вывод. Так ученики с ранних лет привыкают к порядку настоящего исследования." },
        { type: "h2", text: "Проектная работа" },
        { type: "p", text: "В течение года каждый класс готовит небольшой исследовательский проект. Лучшие работы представят весной на школьной научной конференции." },
      ],
    },
  },
  // TODO: replace with real data
  {
    slug: "birinchi-sport-kuni",
    date: "2026-09-06",
    category: "events",
    image: images.sport.football,
    gallery: [images.sport.footballDuel, images.sport.court, images.sport.team, images.sport.chessBoy],
    readingMinutes: 2,
    title: {
      uz: "Birinchi sport kuni: futbol, basketbol va shaxmat",
      en: "Our first sports day: football, basketball and chess",
      ru: "Первый день спорта: футбол, баскетбол и шахматы",
    },
    excerpt: {
      uz: "Sinflar aralash jamoalarga boʻlinib bellashdi — maqsad gʻalaba emas, yangi doʻstlar orttirish edi.",
      en: "Classes were mixed into new teams — the point was making friends, not just winning.",
      ru: "Классы смешали в новые команды — цель была не только победить, но и подружиться.",
    },
    body: {
      uz: [
        { type: "p", text: "Oʻquv yilining birinchi shanbasida maktab stadioni va sport zalida sport kuni oʻtkazildi. Oʻquvchilar ataylab turli sinflardan tuzilgan aralash jamoalarga boʻlindi." },
        { type: "list", items: ["Mini-futbol turniri", "Basketbol: uchga-uch", "Shaxmat boʻyicha tezkor turnir", "Estafeta"] },
        { type: "p", text: "Kun yakunida gʻoliblar emas, eng yaxshi jamoaviy ruhni koʻrsatgan jamoalar taqdirlandi. Sport toʻgaraklariga yozilish sentabr oxirigacha davom etadi." },
      ],
      en: [
        { type: "p", text: "On the first Saturday of term the school held a sports day on the pitch and in the sports hall. Students were deliberately split into mixed teams from different classes." },
        { type: "list", items: ["Five-a-side football tournament", "Three-on-three basketball", "Rapid chess tournament", "Relay race"] },
        { type: "p", text: "At the end of the day the awards went not to the winners but to the teams with the best team spirit. Sign-ups for sports clubs continue until the end of September." },
      ],
      ru: [
        { type: "p", text: "В первую субботу учебного года на стадионе и в спортзале прошёл день спорта. Учеников специально распределили по смешанным командам из разных классов." },
        { type: "list", items: ["Турнир по мини-футболу", "Баскетбол три на три", "Турнир по быстрым шахматам", "Эстафета"] },
        { type: "p", text: "В конце дня наградили не победителей, а команды с лучшим командным духом. Запись в спортивные секции продолжается до конца сентября." },
      ],
    },
  },
  // TODO: replace with real data (the date of 2 September and the quote are placeholders; "more than 260 students" is a fact)
  {
    slug: "yangi-oquv-yili-boshlandi",
    date: "2026-09-02",
    category: "events",
    image: images.classes.highFive,
    gallery: [images.campus.hero, images.events.ceremony, images.classes.lesson, images.campus.entrance],
    readingMinutes: 4,
    featured: true,
    title: {
      uz: "Birinchi oʻquv yili boshlandi: 260 dan ortiq oʻquvchi sinflarda",
      en: "Our first school year has begun: over 260 students in class",
      ru: "Начался первый учебный год: более 260 учеников за партами",
    },
    excerpt: {
      uz: "2-sentabr kuni maktab-internat ilk bor oʻz eshiklarini ochdi. Tanlovdan oʻtgan 5, 6 va 7-sinf oʻquvchilari birinchi darsga keldi.",
      en: "On 2 September the school opened its doors for the first time, welcoming the Grade 5, 6 and 7 students who came through the selection.",
      ru: "2 сентября школа-интернат впервые открыла свои двери для учеников 5, 6 и 7 классов, прошедших отбор.",
    },
    body: {
      uz: [
        { type: "p", text: "Ixtisoslashtirilgan taʼlim muassasalari agentligi tizimidagi yangi maktab-internat 2026/2027 oʻquv yilidan faoliyat boshladi. Sentabrda 260 dan ortiq iqtidorli oʻquvchi birinchi darsga keldi." },
        { type: "p", text: "Ularning har biri iyun oyida onlayn ariza topshirgan va Cambridge Assessment bilan hamkorlikda tashkil etilgan kirish imtihonidan muvaffaqiyatli oʻtgan." },
        { type: "h2", text: "Maktab nimani taklif qiladi" },
        { type: "list", items: ["Kuchli STEM: matematika, fizika, kimyo, biologiya va informatika", "Loyiha ishlari va mustaqil tadqiqotlar", "Ingliz va xitoy tillarini intensiv oʻrganish", "Ona tili, Oʻzbekiston tarixi, adabiyot va madaniyat"] },
        { type: "quote", text: "Bugun maktabning birinchi sahifasi yozildi. Keyingi sahifalarni oʻquvchilarimiz bilan birga yozamiz. — maktab rahbariyati" },
        { type: "p", text: "Birinchi dars kunidan keyin oʻquvchilar yotoqxonaga joylashdi va yangi kun tartibi bilan tanishdi. Maktab hayotidagi voqealar haqida shu sahifada muntazam xabar beramiz." },
      ],
      en: [
        { type: "p", text: "The new boarding school in the system of the Agency of Specialized Educational Institutions opened with the 2026/2027 academic year. In September more than 260 gifted students came to their first lesson." },
        { type: "p", text: "Each of them applied online in June and passed the entrance exam organised together with Cambridge Assessment." },
        { type: "h2", text: "What the school offers" },
        { type: "list", items: ["Strong STEM: maths, physics, chemistry, biology and IT", "Project work and independent research", "Intensive English and Chinese", "Native language, history of Uzbekistan, literature and culture"] },
        { type: "quote", text: "Today the first page of the school’s story was written. We will write the next ones together with our students. — the school leadership" },
        { type: "p", text: "After the first day of lessons the students moved into the boarding house and learned their new routine. We will keep posting school news on this page." },
      ],
      ru: [
        { type: "p", text: "Новая школа-интернат в системе Агентства специализированных образовательных учреждений начала работу с 2026/2027 учебного года. В сентябре на первый урок пришли более 260 одарённых учеников." },
        { type: "p", text: "Каждый из них подал заявку онлайн в июне и успешно сдал вступительный экзамен, организованный совместно с Cambridge Assessment." },
        { type: "h2", text: "Что предлагает школа" },
        { type: "list", items: ["Сильный STEM: математика, физика, химия, биология и информатика", "Проектная работа и самостоятельные исследования", "Интенсивный английский и китайский", "Родной язык, история Узбекистана, литература и культура"] },
        { type: "quote", text: "Сегодня написана первая страница истории школы. Следующие мы напишем вместе с нашими учениками. — руководство школы" },
        { type: "p", text: "После первого учебного дня ученики заселились в интернат и познакомились с новым распорядком. Новости школы мы будем регулярно публиковать на этой странице." },
      ],
    },
  },
  // TODO: replace with real data (publication date is a placeholder; exam format and 22,315 are facts; no scores are published here on purpose)
  {
    slug: "kirish-imtihoni-natijalari",
    date: "2026-07-20",
    category: "admission",
    image: images.classes.focus,
    readingMinutes: 4,
    title: {
      uz: "Kirish imtihoni natijalari eʼlon qilindi",
      en: "Entrance exam results have been announced",
      ru: "Объявлены результаты вступительного экзамена",
    },
    excerpt: {
      uz: "Imtihon Cambridge Assessment bilan hamkorlikda, Prezident maktablari modeli asosida bir bosqichda oʻtkazildi.",
      en: "The exam was held in one stage together with Cambridge Assessment, following the Presidential Schools’ model.",
      ru: "Экзамен прошёл в один этап совместно с Cambridge Assessment по модели Президентских школ.",
    },
    body: {
      uz: [
        { type: "p", text: "1–15 iyun kunlari ariza.piima.uz va my.gov.uz portallari orqali 5, 6 va 7-sinflarga 22 315 ta ariza qabul qilingan edi. Arizachilar uchun kirish imtihoni Cambridge Assessment bilan hamkorlikda, Prezident maktablari modeli asosida tashkil etildi." },
        { type: "h2", text: "Imtihon tuzilmasi" },
        { type: "list", items: ["Bir bosqich", "Matematika: 16 ta tanqidiy fikrlash (Critical Thinking) va 24 ta masala yechish (Problem Solving) — jami 40 ta savol", "Ingliz tili: oʻqib tushunish (Reading) va grammatika (Grammar) — jami 40 ta savol"] },
        { type: "p", text: "Bunday tuzilma yod olingan bilimni emas, balki fikrlash qobiliyatini, notanish masalaga yondashuvni va tilni amalda qoʻllashni tekshiradi." },
        { type: "h2", text: "Natijalar qayerda" },
        { type: "p", text: "Natijalar rasmiy portallar — ariza.piima.uz va my.gov.uz orqali eʼlon qilindi. Bu yerda alohida ishtirokchilarning ballari keltirilmaydi." },
        { type: "quote", text: "Tanlov qattiq boʻldi, lekin adolatli: hamma bir xil savollar va bir xil shartlarda imtihon topshirdi. — qabul komissiyasi" },
      ],
      en: [
        { type: "p", text: "Between 1 and 15 June, 22,315 applications for Grades 5, 6 and 7 were submitted through ariza.piima.uz and my.gov.uz. The entrance exam was organised with Cambridge Assessment, following the Presidential Schools’ model." },
        { type: "h2", text: "How the exam was built" },
        { type: "list", items: ["One stage", "Mathematics: 16 Critical Thinking and 24 Problem Solving questions — 40 in total", "English: Reading and Grammar — 40 questions in total"] },
        { type: "p", text: "This format checks how children think rather than what they have memorised: how they approach an unfamiliar problem and how they use the language in practice." },
        { type: "h2", text: "Where to find results" },
        { type: "p", text: "Results were announced on the official portals, ariza.piima.uz and my.gov.uz. Individual scores are not listed here." },
        { type: "quote", text: "The selection was tough but fair: everyone sat the same questions under the same conditions. — the admissions committee" },
      ],
      ru: [
        { type: "p", text: "С 1 по 15 июня через порталы ariza.piima.uz и my.gov.uz в 5, 6 и 7 классы было подано 22 315 заявок. Вступительный экзамен организовали совместно с Cambridge Assessment по модели Президентских школ." },
        { type: "h2", text: "Как устроен экзамен" },
        { type: "list", items: ["Один этап", "Математика: 16 заданий на критическое мышление (Critical Thinking) и 24 на решение задач (Problem Solving) — всего 40", "Английский язык: чтение (Reading) и грамматика (Grammar) — всего 40 заданий"] },
        { type: "p", text: "Такой формат проверяет не заученное, а умение думать: как ребёнок подходит к незнакомой задаче и как применяет язык на практике." },
        { type: "h2", text: "Где узнать результат" },
        { type: "p", text: "Результаты объявлены на официальных порталах — ariza.piima.uz и my.gov.uz. Индивидуальные баллы здесь не приводятся." },
        { type: "quote", text: "Отбор был строгим, но честным: у всех одинаковые задания и одинаковые условия. — приёмная комиссия" },
      ],
    },
  },
  // TODO: replace with real data (publication date is a placeholder; 1–15 June and 22,315 are facts)
  {
    slug: "qabul-yakunlandi-22315-ariza",
    date: "2026-06-16",
    category: "admission",
    image: images.campus.main,
    readingMinutes: 2,
    title: {
      uz: "Arizalar qabuli yakunlandi: 22 315 ta ariza",
      en: "Applications have closed: 22,315 received",
      ru: "Приём заявок завершён: 22 315 заявок",
    },
    excerpt: {
      uz: "1–15 iyun kunlari 5, 6 va 7-sinflarga ariza.piima.uz va my.gov.uz orqali onlayn arizalar qabul qilindi.",
      en: "From 1 to 15 June, online applications for Grades 5, 6 and 7 were accepted via ariza.piima.uz and my.gov.uz.",
      ru: "С 1 по 15 июня онлайн-заявки в 5, 6 и 7 классы принимались через ariza.piima.uz и my.gov.uz.",
    },
    body: {
      uz: [
        { type: "p", text: "Yangi maktab-internatga birinchi qabul yakunlandi. 1–15 iyun kunlari ariza.piima.uz va my.gov.uz portallari orqali jami 22 315 ta ariza kelib tushdi." },
        { type: "p", text: "Arizalar 5, 6 va 7-sinflarga qabul qilindi. Keyingi bosqich — Cambridge Assessment bilan hamkorlikda tashkil etiladigan kirish imtihoni. Imtihon sanasi va joyi haqidagi maʼlumot arizachilarga portallar orqali yetkaziladi." },
        { type: "quote", text: "Bunday qiziqish bizga katta masʼuliyat yuklaydi. Har bir bola bir xil, shaffof sharoitda sinovdan oʻtadi. — qabul komissiyasi" },
      ],
      en: [
        { type: "p", text: "The first admission round for the new boarding school has closed. From 1 to 15 June a total of 22,315 applications came in through ariza.piima.uz and my.gov.uz." },
        { type: "p", text: "Applications were accepted for Grades 5, 6 and 7. The next step is the entrance exam, organised together with Cambridge Assessment. Applicants will be told the date and venue through the portals." },
        { type: "quote", text: "This level of interest is a big responsibility. Every child will be tested under the same, transparent conditions. — the admissions committee" },
      ],
      ru: [
        { type: "p", text: "Первый приём в новую школу-интернат завершён. С 1 по 15 июня через порталы ariza.piima.uz и my.gov.uz поступило 22 315 заявок." },
        { type: "p", text: "Заявки принимались в 5, 6 и 7 классы. Следующий этап — вступительный экзамен, который проводится совместно с Cambridge Assessment. О дате и месте экзамена заявителям сообщат через порталы." },
        { type: "quote", text: "Такой интерес — большая ответственность. Каждый ребёнок будет проходить испытание в одинаковых, прозрачных условиях. — приёмная комиссия" },
      ],
    },
  },
];

export const getNewsBySlug = (slug: string) => news.find((n) => n.slug === slug);
