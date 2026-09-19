// Content for /maktab-hayoti/yotoqxona (boarding house).
// Everything except the section structure is a realistic placeholder.
// TODO: replace with real data (rooms, routine, menu, staff numbers, FAQ answers)
import type { L10n } from "@/lib/utils";
import { images, type ImageSlot } from "@/lib/images";

export const dormCopy = {
  hero: {
    title: {
      uz: "Maktabdagi uyingiz",
      en: "A home at school",
      ru: "Дом при школе",
    } satisfies L10n,
    lead: {
      uz: "Oʻquvchilar hafta davomida maktab hududidagi yotoqxonada yashaydi. Tinch xonalar, aniq kun tartibi va har doim yonida boʻlgan kattalar — oʻqishga ham, dam olishga ham joy bor.",
      en: "Students live in the boarding house on campus during the week. Quiet rooms, a clear daily rhythm and adults who are always close by leave room for both study and rest.",
      ru: "В течение недели ученики живут в общежитии на территории школы. Тихие комнаты, понятный распорядок и взрослые, которые всегда рядом, — есть время и на учёбу, и на отдых.",
    } satisfies L10n,
    // TODO: replace with real data
    facts: [
      { value: "4", label: { uz: "oʻquvchi bir xonada", en: "students per room", ru: "ученика в комнате" } },
      {
        value: "24/7",
        label: { uz: "tarbiyachilar navbatchiligi", en: "tutors on duty", ru: "дежурство воспитателей" },
      },
      { value: "5", label: { uz: "mahal ovqatlanish", en: "meals a day", ru: "приёмов пищи в день" } },
    ] satisfies { value: string; label: L10n }[],
    lampCaption: {
      uz: "Kechki mustaqil tayyorgarlik",
      en: "Evening self-study",
      ru: "Вечерняя самоподготовка",
    } satisfies L10n,
  },

  tour: {
    title: { uz: "Xonani koʻrib chiqing", en: "Take a look around a room", ru: "Загляните в комнату" } satisfies L10n,
    lead: {
      uz: "Nuqtalarni bosing — har bir buyum nima uchun kerakligini bilib olasiz.",
      en: "Tap the markers to see what each part of the room is for.",
      ru: "Нажмите на точки, чтобы узнать, для чего каждая часть комнаты.",
    } satisfies L10n,
    listLabel: { uz: "Xonadagi jihozlar", en: "What is in the room", ru: "Что есть в комнате" } satisfies L10n,
    close: { uz: "Yopish", en: "Close", ru: "Закрыть" } satisfies L10n,
    note: {
      uz: "Suratdagi xona namunaviy. Xonalar 4 kishilik, qizlar va oʻgʻil bolalar alohida qavatlarda yashaydi.",
      en: "The room in the photo is an example. Rooms are for four; girls and boys live on separate floors.",
      ru: "Комната на фото — пример. Комнаты на четверых; девочки и мальчики живут на разных этажах.",
    } satisfies L10n, // TODO: replace with real data
  },

  routine: {
    title: { uz: "Kun tartibi", en: "The daily routine", ru: "Распорядок дня" } satisfies L10n,
    lead: {
      uz: "Oʻqish kunining odatiy tartibi. Dam olish kunlari uygʻonish kechroq, darslar oʻrnida sayohat va toʻgaraklar.",
      en: "A typical school day. At weekends wake-up is later and lessons give way to trips and clubs.",
      ru: "Обычный учебный день. В выходные подъём позже, а вместо уроков — поездки и кружки.",
    } satisfies L10n,
    note: {
      uz: "Vaqtlar taxminiy, oʻquv yili boshida tasdiqlanadi.",
      en: "Times are indicative and are confirmed at the start of the school year.",
      ru: "Время ориентировочное и уточняется в начале учебного года.",
    } satisfies L10n,
  },

  care: {
    title: { uz: "Gʻamxoʻrlik va xavfsizlik", en: "Care and safety", ru: "Забота и безопасность" } satisfies L10n,
    lead: {
      uz: "Ota-onalar uchun eng muhim savol — bola yolgʻiz qolmaydimi? Javob: yoʻq.",
      en: "The question parents ask first: will my child ever be on their own? No.",
      ru: "Первый вопрос родителей: останется ли ребёнок без присмотра? Нет.",
    } satisfies L10n,
  },

  canteen: {
    title: { uz: "Oshxona", en: "The canteen", ru: "Столовая" } satisfies L10n,
    lead: {
      uz: "Kuniga besh mahal issiq va muvozanatli ovqat. Menyu shifokor-dietolog bilan kelishiladi, milliy taomlar har hafta boʻladi.",
      en: "Five balanced meals a day. The menu is agreed with a dietitian, and Uzbek dishes are on it every week.",
      ru: "Пять сбалансированных приёмов пищи в день. Меню согласовано с диетологом, национальные блюда — каждую неделю.",
    } satisfies L10n,
    tabsLabel: { uz: "Hafta kunlari", en: "Days of the week", ru: "Дни недели" } satisfies L10n,
    note: {
      uz: "Namuna menyu. Allergiya yoki maxsus parhez boʻlsa, tibbiyot xonasiga oldindan xabar bering.",
      en: "Sample menu. Please tell the medical room in advance about allergies or special diets.",
      ru: "Примерное меню. Об аллергиях и особой диете заранее сообщите в медкабинет.",
    } satisfies L10n,
  },

  leisure: {
    title: { uz: "Dam olish kunlari", en: "Weekends and free time", ru: "Выходные и свободное время" } satisfies L10n,
    lead: {
      uz: "Shanba va yakshanba — sport, sahna, shaxmat, kitob va shahar boʻylab sayohatlar uchun.",
      en: "Saturdays and Sundays are for sport, the stage, chess, books and trips around the city.",
      ru: "Суббота и воскресенье — для спорта, сцены, шахмат, книг и поездок по городу.",
    } satisfies L10n,
  },

  faq: {
    title: { uz: "Ota-onalar savollari", en: "Questions from parents", ru: "Вопросы родителей" } satisfies L10n,
    lead: {
      uz: "Javob topilmasa, qoʻngʻiroq qiling — tarbiya boʻlimi yordam beradi.",
      en: "If your question is not here, call us and the boarding team will help.",
      ru: "Если ответа нет, позвоните — служба воспитания поможет.",
    } satisfies L10n,
    callLabel: { uz: "Qoʻngʻiroq qilish", en: "Call", ru: "Позвонить" } satisfies L10n,
  },
};

/* ───────────── Room tour hotspots ─────────────
   x / y are percentages on images.dorm.bright (portrait photo, rendered at its own aspect ratio).
   TODO: replace with real data — re-position the markers (and add desk / wardrobe) when the real room photo is added. */
export type Hotspot = { id: string; x: number; y: number; title: L10n; text: L10n };

export const roomPhoto: ImageSlot = images.dorm.bright;

export const hotspots: Hotspot[] = [
  {
    id: "window",
    x: 10,
    y: 36,
    title: { uz: "Deraza", en: "Window", ru: "Окно" },
    text: {
      uz: "Kunduzgi yorugʻlik va toza havo. Xonalar har kuni ertalab shamollatiladi, qalin pardalar esa kechasi tinch uxlashga yordam beradi.",
      en: "Daylight and fresh air. Rooms are aired every morning; heavy curtains help everyone sleep at night.",
      ru: "Дневной свет и свежий воздух. Комнаты проветривают каждое утро, а плотные шторы помогают спокойно спать.",
    },
  },
  {
    id: "mirror",
    x: 68,
    y: 40,
    title: { uz: "Devor va bezak", en: "Your own wall", ru: "Своя стена" },
    text: {
      uz: "Oʻquvchilar oʻz burchagini oilaviy suratlar va sevimli narsalar bilan bezashi mumkin — xona uyga oʻxshashi kerak.",
      en: "Students can make their corner their own with family photos and favourite things — a room should feel like home.",
      ru: "Свой угол можно украсить семейными фото и любимыми вещами — комната должна быть похожа на дом.",
    },
  },
  {
    id: "lamp",
    x: 79,
    y: 56,
    title: { uz: "Stol chirogʻi", en: "Study lamp", ru: "Настольная лампа" },
    text: {
      uz: "Koʻzni charchatmaydigan iliq yorugʻlik — kechki kitob uchun. Chiroqlar 22:00 da oʻchadi.",
      en: "Warm light that is easy on the eyes, for reading in the evening. Lights go out at 22:00.",
      ru: "Тёплый свет, который не утомляет глаза, — для вечернего чтения. Отбой в 22:00.",
    },
  },
  {
    id: "table",
    x: 81,
    y: 71,
    title: { uz: "Tumbochka", en: "Bedside table", ru: "Прикроватная тумба" },
    text: {
      uz: "Kitob, soat va suv uchun shaxsiy joy. Kiyim va forma uchun har bir oʻquvchida alohida qulflanadigan shkaf boʻlimi bor.",
      en: "A personal spot for a book, a watch and water. Each student also has a lockable wardrobe section for clothes and uniform.",
      ru: "Личное место для книги, часов и воды. Для одежды и формы у каждого есть запирающаяся секция шкафа.",
    },
  },
  {
    id: "books",
    x: 31,
    y: 68,
    title: { uz: "Kitoblar", en: "Books", ru: "Книги" },
    text: {
      uz: "Darsliklar va kutubxona kitoblari uchun javon. Uy vazifasi esa ish stolida yoki mustaqil tayyorgarlik zalida bajariladi.",
      en: "A shelf for textbooks and library books. Homework is done at the desk or in the study hall.",
      ru: "Полка для учебников и библиотечных книг. Домашние задания — за письменным столом или в зале самоподготовки.",
    },
  },
  {
    id: "bed",
    x: 40,
    y: 84,
    title: { uz: "Karavot", en: "Bed", ru: "Кровать" },
    text: {
      uz: "Har bir oʻquvchining oʻz karavoti va ortopedik matrasi. Choyshablar haftada bir marta almashtiriladi.",
      en: "Every student has their own bed with an orthopaedic mattress. Bedding is changed once a week.",
      ru: "У каждого своя кровать с ортопедическим матрасом. Постельное бельё меняют раз в неделю.",
    },
  },
];

/* ───────────── Daily routine ───────────── TODO: replace with real data */
export type RoutineItem = {
  time: string;
  end?: string;
  title: L10n;
  text?: L10n;
  part: "morning" | "day" | "evening" | "night";
};

export const routineParts: Record<RoutineItem["part"], L10n> = {
  morning: { uz: "Ertalab", en: "Morning", ru: "Утро" },
  day: { uz: "Kunduzi", en: "Day", ru: "День" },
  evening: { uz: "Kechqurun", en: "Evening", ru: "Вечер" },
  night: { uz: "Tun", en: "Night", ru: "Ночь" },
};

export const routine: RoutineItem[] = [
  {
    time: "07:00",
    part: "morning",
    title: { uz: "Uygʻonish", en: "Wake-up", ru: "Подъём" },
    text: {
      uz: "Tarbiyachi har bir xonaga kiradi.",
      en: "A tutor looks in on every room.",
      ru: "Воспитатель заходит в каждую комнату.",
    },
  },
  { time: "07:15", part: "morning", title: { uz: "Badantarbiya", en: "Morning exercise", ru: "Зарядка" } },
  { time: "07:45", part: "morning", title: { uz: "Nonushta", en: "Breakfast", ru: "Завтрак" } },
  {
    time: "08:30",
    end: "13:20",
    part: "day",
    title: { uz: "Darslar", en: "Lessons", ru: "Уроки" },
    text: {
      uz: "10:15 da tushdan oldingi yengil tamaddi.",
      en: "A mid-morning snack at 10:15.",
      ru: "Второй завтрак в 10:15.",
    },
  },
  { time: "13:30", part: "day", title: { uz: "Tushlik", en: "Lunch", ru: "Обед" } },
  { time: "14:15", part: "day", title: { uz: "Dam olish", en: "Rest", ru: "Отдых" } },
  {
    time: "15:00",
    end: "16:30",
    part: "day",
    title: { uz: "Toʻgaraklar", en: "Clubs", ru: "Кружки" },
    text: {
      uz: "Robototexnika, debat, xattotlik, shaxmat va boshqalar.",
      en: "Robotics, debate, calligraphy, chess and more.",
      ru: "Робототехника, дебаты, каллиграфия, шахматы и другое.",
    },
  },
  { time: "16:45", end: "18:00", part: "evening", title: { uz: "Sport", en: "Sport", ru: "Спорт" } },
  { time: "18:30", part: "evening", title: { uz: "Kechki ovqat", en: "Dinner", ru: "Ужин" } },
  {
    time: "19:15",
    end: "21:00",
    part: "evening",
    title: { uz: "Mustaqil tayyorgarlik", en: "Self-study", ru: "Самоподготовка" },
    text: {
      uz: "Oʻqituvchi va tarbiyachi yordamida uy vazifalari.",
      en: "Homework with a teacher and a tutor on hand.",
      ru: "Домашние задания с учителем и воспитателем.",
    },
  },
  {
    time: "21:00",
    part: "evening",
    title: { uz: "Erkin vaqt, uyga qoʻngʻiroq", en: "Free time, calls home", ru: "Свободное время, звонок домой" },
  },
  { time: "22:00", part: "night", title: { uz: "Chiroqlar oʻchadi", en: "Lights out", ru: "Отбой" } },
];

/* ───────────── Care & safety ───────────── TODO: replace with real data */
export type CareItem = { id: string; icon: "tutors" | "clock" | "medical" | "security"; title: L10n; text: L10n };

export const care: CareItem[] = [
  {
    id: "tutors",
    icon: "tutors",
    title: { uz: "Tarbiyachilar", en: "Tutors", ru: "Воспитатели" },
    text: {
      uz: "Har bir qavatda biriktirilgan tarbiyachi: kun tartibi, uy vazifasi va kayfiyat — hammasi uning nazoratida.",
      en: "Every floor has its own tutor who keeps an eye on routine, homework and how each child is feeling.",
      ru: "На каждом этаже свой воспитатель: распорядок, домашние задания и самочувствие — под его вниманием.",
    },
  },
  {
    id: "clock",
    icon: "clock",
    title: { uz: "Kechayu kunduz nazorat", en: "24/7 supervision", ru: "Присмотр 24/7" },
    text: {
      uz: "Tunda ham navbatchi tarbiyachi va maʼmuriyat vakili binoda boʻladi.",
      en: "A tutor and a member of the administration are on duty in the building through the night.",
      ru: "Ночью в корпусе дежурят воспитатель и представитель администрации.",
    },
  },
  {
    id: "medical",
    icon: "medical",
    title: { uz: "Tibbiyot xonasi", en: "Medical room", ru: "Медкабинет" },
    text: {
      uz: "Hamshira doimiy ishlaydi, shifokor har kuni koʻrik oʻtkazadi. Kasallik haqida ota-onaga darhol xabar beriladi.",
      en: "A nurse is always on site and a doctor holds daily hours. Parents are told straight away if a child is unwell.",
      ru: "Медсестра на месте постоянно, врач принимает ежедневно. О болезни родителям сообщают сразу.",
    },
  },
  {
    id: "security",
    icon: "security",
    title: { uz: "Xavfsizlik", en: "Security", ru: "Безопасность" },
    text: {
      uz: "Hudud qoʻriqlanadi, kirish faqat ruxsatnoma bilan, umumiy joylarda videokuzatuv.",
      en: "The campus is guarded, entry is by pass only and shared areas have CCTV.",
      ru: "Территория охраняется, вход по пропускам, в общих зонах — видеонаблюдение.",
    },
  },
];

/* ───────────── Canteen weekly menu ───────────── TODO: replace with real data */
export type Meal = "breakfast" | "lunch" | "snack" | "dinner";
export const mealLabels: Record<Meal, L10n & { time: string }> = {
  breakfast: { uz: "Nonushta", en: "Breakfast", ru: "Завтрак", time: "07:45" },
  lunch: { uz: "Tushlik", en: "Lunch", ru: "Обед", time: "13:30" },
  snack: { uz: "Tamaddi", en: "Afternoon snack", ru: "Полдник", time: "16:30" },
  dinner: { uz: "Kechki ovqat", en: "Dinner", ru: "Ужин", time: "18:30" },
};

type Dish = L10n;
const d = (uz: string, en: string, ru: string): Dish => ({ uz, en, ru });

export type MenuDay = { id: string; short: L10n; long: L10n; meals: Record<Meal, Dish[]> };

export const menu: MenuDay[] = [
  {
    id: "mon",
    short: { uz: "Du", en: "Mon", ru: "Пн" },
    long: { uz: "Dushanba", en: "Monday", ru: "Понедельник" },
    meals: {
      breakfast: [
        d("Sutli guruch boʻtqa", "Rice pudding porridge", "Рисовая молочная каша"),
        d("Tuxum, pishloq, non", "Egg, cheese, bread", "Яйцо, сыр, хлеб"),
        d("Koʻk choy", "Green tea", "Зелёный чай"),
      ],
      lunch: [
        d("Mastava", "Mastava rice soup", "Мастава"),
        d("Tovuq kotleti, grechka", "Chicken cutlet with buckwheat", "Куриная котлета с гречкой"),
        d("Achchiq-chuchuk salat", "Tomato and onion salad", "Салат ачичук"),
      ],
      snack: [d("Olma, kefir", "Apple, kefir", "Яблоко, кефир")],
      dinner: [
        d("Dimlama", "Dimlama vegetable stew", "Димлама"),
        d("Qatiq", "Yoghurt", "Катык"),
        d("Kompot", "Fruit compote", "Компот"),
      ],
    },
  },
  {
    id: "tue",
    short: { uz: "Se", en: "Tue", ru: "Вт" },
    long: { uz: "Seshanba", en: "Tuesday", ru: "Вторник" },
    meals: {
      breakfast: [
        d("Suli boʻtqa, yongʻoq", "Oat porridge with walnuts", "Овсяная каша с орехами"),
        d("Qaymoq va non", "Clotted cream and bread", "Каймак и хлеб"),
        d("Qora choy", "Black tea", "Чёрный чай"),
      ],
      lunch: [
        d("Shoʻrva", "Shurva meat soup", "Шурпа"),
        d("Lagʻmon", "Lagman noodles", "Лагман"),
        d("Sabzi salati", "Carrot salad", "Морковный салат"),
      ],
      snack: [d("Somsa (kartoshkali)", "Potato samsa", "Самса с картофелем"), d("Sut", "Milk", "Молоко")],
      dinner: [
        d("Baliq, guruch", "Baked fish with rice", "Запечённая рыба с рисом"),
        d("Bodring-pomidor salati", "Cucumber and tomato salad", "Салат из огурцов и помидоров"),
      ],
    },
  },
  {
    id: "wed",
    short: { uz: "Cho", en: "Wed", ru: "Ср" },
    long: { uz: "Chorshanba", en: "Wednesday", ru: "Среда" },
    meals: {
      breakfast: [
        d("Tvorog, asal", "Cottage cheese with honey", "Творог с мёдом"),
        d("Blinchiklar", "Pancakes", "Блинчики"),
        d("Koʻk choy", "Green tea", "Зелёный чай"),
      ],
      lunch: [
        d("Moshxoʻrda", "Mung bean and rice soup", "Машхурда"),
        d("Qovurma goʻsht, kartoshka pyuresi", "Braised beef with mash", "Тушёная говядина с пюре"),
        d("Vinegret", "Beetroot salad", "Винегрет"),
      ],
      snack: [d("Mavsumiy meva", "Seasonal fruit", "Сезонные фрукты")],
      dinner: [d("Manti", "Manti dumplings", "Манты"), d("Qatiq", "Yoghurt", "Катык")],
    },
  },
  {
    id: "thu",
    short: { uz: "Pa", en: "Thu", ru: "Чт" },
    long: { uz: "Payshanba", en: "Thursday", ru: "Четверг" },
    meals: {
      breakfast: [
        d("Omlet", "Omelette", "Омлет"),
        d("Non, sariyogʻ, murabbo", "Bread, butter, jam", "Хлеб, масло, варенье"),
        d("Qora choy", "Black tea", "Чёрный чай"),
      ],
      lunch: [
        d("Palov", "Plov", "Плов"),
        d("Achchiq-chuchuk", "Tomato and onion salad", "Ачичук"),
        d("Koʻk choy", "Green tea", "Зелёный чай"),
      ],
      snack: [d("Yogurt, pechenye", "Yoghurt and biscuits", "Йогурт, печенье")],
      dinner: [
        d("Tovuq shoʻrva", "Chicken soup", "Куриный суп"),
        d("Makaron, tefteli", "Pasta with meatballs", "Макароны с тефтелями"),
      ],
    },
  },
  {
    id: "fri",
    short: { uz: "Ju", en: "Fri", ru: "Пт" },
    long: { uz: "Juma", en: "Friday", ru: "Пятница" },
    meals: {
      breakfast: [
        d("Mannaya boʻtqa", "Semolina porridge", "Манная каша"),
        d("Pishloq va non", "Cheese and bread", "Сыр и хлеб"),
        d("Kakao", "Cocoa", "Какао"),
      ],
      lunch: [
        d("Chuchvara shoʻrva", "Chuchvara dumpling soup", "Суп с чучварой"),
        d("Tovuq, sabzavot", "Roast chicken with vegetables", "Курица с овощами"),
        d("Karam salati", "Cabbage salad", "Салат из капусты"),
      ],
      snack: [d("Banan, sut", "Banana, milk", "Банан, молоко")],
      dinner: [
        d("Norin", "Norin (noodles with meat)", "Нарын"),
        d("Choy va quruq meva", "Tea and dried fruit", "Чай и сухофрукты"),
      ],
    },
  },
  {
    id: "sat",
    short: { uz: "Sha", en: "Sat", ru: "Сб" },
    long: { uz: "Shanba", en: "Saturday", ru: "Суббота" },
    meals: {
      breakfast: [
        d("Sirniki", "Cottage cheese pancakes", "Сырники"),
        d("Qaymoq, asal", "Clotted cream, honey", "Каймак, мёд"),
        d("Koʻk choy", "Green tea", "Зелёный чай"),
      ],
      lunch: [
        d("Shivit oshi", "Dill noodles with stew", "Шивит оши"),
        d("Sabzavot salati", "Vegetable salad", "Овощной салат"),
      ],
      snack: [d("Mevali salat", "Fruit salad", "Фруктовый салат")],
      dinner: [
        d("Kabob (tovuq), guruch", "Chicken kebab with rice", "Куриный кебаб с рисом"),
        d("Kompot", "Fruit compote", "Компот"),
      ],
    },
  },
  {
    id: "sun",
    short: { uz: "Ya", en: "Sun", ru: "Вс" },
    long: { uz: "Yakshanba", en: "Sunday", ru: "Воскресенье" },
    meals: {
      breakfast: [
        d("Tuxum, pomidor", "Eggs and tomatoes", "Яйца с помидорами"),
        d("Non va murabbo", "Bread and jam", "Хлеб и варенье"),
        d("Sut", "Milk", "Молоко"),
      ],
      lunch: [d("Palov", "Plov", "Плов"), d("Achchiq-chuchuk", "Tomato and onion salad", "Ачичук")],
      snack: [d("Somsa (qovoqli)", "Pumpkin samsa", "Самса с тыквой")],
      dinner: [d("Mastava", "Mastava rice soup", "Мастава"), d("Qatiq, non", "Yoghurt and bread", "Катык, хлеб")],
    },
  },
];

/* ───────────── Weekend & leisure ───────────── TODO: replace with real data */
export type Leisure = { id: string; photo: ImageSlot; title: L10n; when: L10n };

export const leisure: Leisure[] = [
  {
    id: "football",
    photo: images.sport.football,
    title: { uz: "Futbol turniri", en: "Football league", ru: "Футбольный турнир" },
    when: { uz: "Shanba, ertalab", en: "Saturday morning", ru: "Суббота, утро" },
  },
  {
    id: "chess",
    photo: images.sport.chessLibrary,
    title: { uz: "Kutubxonada shaxmat", en: "Chess in the library", ru: "Шахматы в библиотеке" },
    when: { uz: "Har kuni kechqurun", en: "Every evening", ru: "Каждый вечер" },
  },
  {
    id: "stage",
    photo: images.events.lawnStage,
    title: { uz: "Ochiq sahna kechalari", en: "Open-air stage nights", ru: "Вечера на открытой сцене" },
    when: { uz: "Oyiga bir marta", en: "Once a month", ru: "Раз в месяц" },
  },
  {
    id: "reading",
    photo: images.campus.readingRoom,
    title: { uz: "Kitobxonlar klubi", en: "Book club", ru: "Книжный клуб" },
    when: { uz: "Yakshanba", en: "Sunday", ru: "Воскресенье" },
  },
  {
    id: "court",
    photo: images.sport.court,
    title: { uz: "Basketbol", en: "Basketball", ru: "Баскетбол" },
    when: { uz: "Shanba, kunduzi", en: "Saturday afternoon", ru: "Суббота, день" },
  },
  {
    id: "trips",
    photo: images.heritage.alley,
    title: { uz: "Muzey va shahar sayohatlari", en: "Museum and city trips", ru: "Музеи и прогулки по городу" },
    when: { uz: "Ikki haftada bir", en: "Every other week", ru: "Раз в две недели" },
  },
];

/* ───────────── Parents' FAQ ───────────── TODO: replace with real data */
export const faq: { q: L10n; a: L10n }[] = [
  {
    q: { uz: "Bola uyga qachon keladi?", en: "When do children go home?", ru: "Когда дети ездят домой?" },
    a: {
      uz: "Oʻquvchilar juma kuni darslardan keyin uyga ketib, yakshanba kechqurun qaytishi mumkin. Qolishni istaganlar uchun dam olish kunlari dasturi bor.",
      en: "Students may go home on Friday after lessons and come back on Sunday evening. Those who stay have a weekend programme.",
      ru: "Ученики могут уезжать домой в пятницу после уроков и возвращаться в воскресенье вечером. Для тех, кто остаётся, есть программа выходных.",
    },
  },
  {
    q: {
      uz: "Farzandim bilan qanday bogʻlanaman?",
      en: "How can I stay in touch with my child?",
      ru: "Как связаться с ребёнком?",
    },
    a: {
      uz: "Kechqurun 21:00 dan keyin telefon orqali gaplashish mumkin. Istalgan vaqtda qavat tarbiyachisiga qoʻngʻiroq qilishingiz mumkin.",
      en: "Children can phone home after 21:00. You can call the floor tutor at any time.",
      ru: "После 21:00 дети могут позвонить домой. Воспитателю этажа можно звонить в любое время.",
    },
  },
  {
    q: {
      uz: "Telefonlardan foydalanish qanday tartibda?",
      en: "What are the rules on phones?",
      ru: "Какие правила насчёт телефонов?",
    },
    a: {
      uz: "Dars va mustaqil tayyorgarlik vaqtida telefonlar tarbiyachida saqlanadi, erkin vaqtda qaytariladi.",
      en: "During lessons and self-study phones are kept by the tutor; they are handed back in free time.",
      ru: "Во время уроков и самоподготовки телефоны хранятся у воспитателя, в свободное время их возвращают.",
    },
  },
  {
    q: {
      uz: "Bola kasal boʻlib qolsa-chi?",
      en: "What happens if my child falls ill?",
      ru: "Что будет, если ребёнок заболеет?",
    },
    a: {
      uz: "Hamshira darhol koʻrikdan oʻtkazadi, kerak boʻlsa shifokor chaqiriladi va ota-onaga shu zahoti xabar beriladi.",
      en: "The nurse sees the child straight away, a doctor is called if needed, and parents are informed at once.",
      ru: "Медсестра сразу осматривает ребёнка, при необходимости вызывают врача, родителям сообщают немедленно.",
    },
  },
  {
    q: { uz: "Nimalarni olib kelish kerak?", en: "What should my child bring?", ru: "Что взять с собой?" },
    a: {
      uz: "Kiyim-kechak, forma, sport kiyimi, gigiyena vositalari. Choyshab va yostiq maktab tomonidan beriladi. Toʻliq roʻyxat qabul paytida beriladi.",
      en: "Clothes, uniform, sportswear and toiletries. Bedding is provided by the school. You will get the full list at enrolment.",
      ru: "Одежду, форму, спортивную форму и средства гигиены. Постельное бельё выдаёт школа. Полный список дают при зачислении.",
    },
  },
  {
    q: {
      uz: "Ota-onalar yotoqxonaga kira oladimi?",
      en: "Can parents visit the boarding house?",
      ru: "Могут ли родители посещать общежитие?",
    },
    a: {
      uz: "Ha, belgilangan kunlarda oldindan kelishilgan holda. Tashrif kunlari oʻquv yili boshida eʼlon qilinadi.",
      en: "Yes, on set visiting days, by arrangement. Visiting days are announced at the start of the school year.",
      ru: "Да, в дни посещений по предварительной договорённости. Дни посещений объявляют в начале учебного года.",
    },
  },
];
