/**
 * School leadership. Reusable by other pages (contacts, news bylines, …).
 *
 * TODO: replace with real data — every name, bio, phone, email and reception time below is a placeholder.
 * Photos: add real portraits to lib/images.ts (images.staff) and set `photo` here; until then Portrait shows initials.
 */
import type { ImageSlot } from "@/lib/images";
import type { L10n } from "@/lib/utils";

export type StaffMember = {
  id: string;
  name: L10n;
  /** full position title */
  role: L10n;
  /** short area of responsibility (org chart, compact rows) */
  area: L10n;
  bio: L10n;
  responsibilities: L10n<string[]>;
  reception: L10n;
  phone: string;
  email: string;
  /** one ring colour used as this person's small accent */
  accent: string;
  photo?: ImageSlot;
};

export type Director = StaffMember & {
  welcome: {
    /** big-type opening line */
    lead: L10n;
    body: L10n<string[]>;
  };
  receptionPlace: L10n;
};

// TODO: replace with real data
export const director: Director = {
  id: "director",
  name: { uz: "Bahodir Qosimov", en: "Bahodir Kasimov", ru: "Баходир Касымов" },
  role: { uz: "Maktab-internat direktori", en: "Head of School", ru: "Директор школы-интерната" },
  area: { uz: "Direktor", en: "Head of School", ru: "Директор" },
  bio: {
    uz: "Taʼlim sohasida koʻp yillik tajribaga ega boshqaruvchi. Maktabning strategiyasi, oʻquv dasturi sifati va xalqaro hamkorlik uchun javobgar.",
    en: "An education leader with many years in schools. Responsible for the school's strategy, the quality of its curriculum and its international partnerships.",
    ru: "Руководитель с многолетним опытом в образовании. Отвечает за стратегию школы, качество учебной программы и международное сотрудничество.",
  },
  responsibilities: {
    uz: ["Maktab faoliyatiga umumiy rahbarlik", "Oʻquv dasturi va taʼlim sifati", "Agentlik va hamkorlar bilan aloqalar", "Pedagogik kengash ishini yuritish"],
    en: ["Overall leadership of the school", "Curriculum and teaching quality", "Relations with the Agency and partners", "Chairing the teachers' council"],
    ru: ["Общее руководство школой", "Учебная программа и качество обучения", "Связи с Агентством и партнёрами", "Руководство педагогическим советом"],
  },
  reception: {
    uz: "Seshanba va payshanba, 14:00 – 17:00",
    en: "Tuesday and Thursday, 14:00 – 17:00",
    ru: "Вторник и четверг, 14:00 – 17:00",
  },
  receptionPlace: {
    uz: "Maʼmuriy bino, 2-qavat. Oldindan devonxona orqali yoziling.",
    en: "Administration building, 2nd floor. Please book through the front office.",
    ru: "Административный корпус, 2-й этаж. Запись через канцелярию.",
  },
  phone: "+998 71 203 47 10",
  email: "director@ils.piima.uz",
  accent: "var(--navy)",
  welcome: {
    lead: {
      uz: "Bu yerda bola savol berishdan qoʻrqmaydi — chunki har bir savol yangi bilimga ochilgan eshik.",
      en: "Here a child is never afraid to ask — because every question is a door to something new.",
      ru: "Здесь ребёнок не боится спрашивать — ведь каждый вопрос открывает дверь к новому знанию.",
    },
    body: {
      uz: [
        "2026/2027 oʻquv yilida maktabimiz ilk bor eshiklarini ochdi. Sentabr oyida 260 dan ortiq iqtidorli oʻquvchi birinchi darsiga keldi — ular 22 315 ta ariza orasidan Cambridge Assessment bilan hamkorlikda oʻtkazilgan imtihon orqali saralandi.",
        "Biz aniq fanlarni chuqur oʻqitamiz, ingliz va xitoy tillarini jadal oʻrgatamiz va shu bilan birga ona tili, tarix va adabiyotga katta eʼtibor beramiz. Maqsadimiz — dunyoga ochiq, lekin oʻz ildizlarini yaxshi biladigan yoshlarni tarbiyalash.",
        "Internat hayoti — bu mustaqillik maktabi ham. Ustozlar, tarbiyachilar va psixologlar har bir bolaning yonida boʻladi. Ota-onalar bilan ochiq muloqotni qadrlaymiz: savol va takliflaringizni har doim kutamiz.",
      ],
      en: [
        "Our school opened its doors for the first time in the 2026/2027 academic year. In September more than 260 gifted students came to their first lesson, selected from 22,315 applications through an exam run with Cambridge Assessment.",
        "We teach the sciences in depth, English and Chinese intensively, and we give real weight to the native language, history and literature. We want our students to be open to the world and sure of their own roots.",
        "Boarding life is also a school of independence. Teachers, house staff and psychologists are close to every child. We value open conversation with parents — your questions and ideas are always welcome.",
      ],
      ru: [
        "В 2026/2027 учебном году наша школа впервые открыла двери. В сентябре на первый урок пришли более 260 одарённых учеников — их отобрали из 22 315 заявлений по итогам экзамена, проведённого совместно с Cambridge Assessment.",
        "Мы глубоко преподаём точные и естественные науки, интенсивно — английский и китайский, и уделяем большое внимание родному языку, истории и литературе. Мы хотим, чтобы наши ученики были открыты миру и хорошо знали свои корни.",
        "Жизнь в интернате — это ещё и школа самостоятельности. Учителя, воспитатели и психологи рядом с каждым ребёнком. Мы ценим открытый диалог с родителями и всегда ждём ваших вопросов и предложений.",
      ],
    },
  },
};

// TODO: replace with real data
export const deputies: StaffMember[] = [
  {
    id: "academic",
    name: { uz: "Malika Yoʻldosheva", en: "Malika Yuldosheva", ru: "Малика Юлдошева" },
    role: { uz: "Direktorning oʻquv ishlari boʻyicha oʻrinbosari", en: "Deputy Head, Academic Affairs", ru: "Заместитель директора по учебной работе" },
    area: { uz: "Oʻquv ishlari", en: "Academic affairs", ru: "Учебная работа" },
    bio: {
      uz: "Matematika oʻqituvchisi sifatida ish boshlagan, keyinchalik metodik ishlarga rahbarlik qilgan. Dars jadvali, oʻquv rejalari va baholash tizimi uchun masʼul.",
      en: "Started as a mathematics teacher and later led methodology work. Responsible for the timetable, curriculum plans and assessment.",
      ru: "Начинала как учитель математики, затем руководила методической работой. Отвечает за расписание, учебные планы и систему оценивания.",
    },
    responsibilities: {
      uz: ["Oʻquv rejalari va dars jadvali", "Baholash va monitoring", "Kafedralar faoliyatini muvofiqlashtirish", "Oʻqituvchilar malakasini oshirish"],
      en: ["Curriculum plans and timetable", "Assessment and monitoring", "Coordinating subject departments", "Teacher professional development"],
      ru: ["Учебные планы и расписание", "Оценивание и мониторинг", "Координация кафедр", "Повышение квалификации учителей"],
    },
    reception: { uz: "Dushanba va chorshanba, 15:00 – 17:00", en: "Monday and Wednesday, 15:00 – 17:00", ru: "Понедельник и среда, 15:00 – 17:00" },
    phone: "+998 71 203 47 11",
    email: "academic@ils.piima.uz",
    accent: "var(--green)",
  },
  {
    id: "languages",
    name: { uz: "Shahnoza Ergasheva", en: "Shakhnoza Ergasheva", ru: "Шахноза Эргашева" },
    role: { uz: "Direktorning xorijiy tillar va xalqaro hamkorlik boʻyicha oʻrinbosari", en: "Deputy Head, Languages and International Partnerships", ru: "Заместитель директора по иностранным языкам и международному сотрудничеству" },
    area: { uz: "Xorijiy tillar", en: "Languages", ru: "Иностранные языки" },
    bio: {
      uz: "Ingliz tili oʻqitish metodikasi boʻyicha mutaxassis. Ingliz va xitoy tili dasturlarini, xalqaro hamkorlar bilan aloqalarni yoʻlga qoʻyadi.",
      en: "A specialist in English language teaching. Leads the English and Chinese programmes and the school's work with international partners.",
      ru: "Специалист по методике преподавания английского языка. Ведёт программы английского и китайского языков и работу с международными партнёрами.",
    },
    responsibilities: {
      uz: ["Ingliz va xitoy tili dasturlari", "Til darajasini baholash", "Xalqaro hamkorlik va almashinuv", "Til toʻgaraklari va klublar"],
      en: ["English and Chinese programmes", "Language level assessment", "International partnerships and exchanges", "Language clubs"],
      ru: ["Программы английского и китайского языков", "Оценка языкового уровня", "Международное сотрудничество и обмены", "Языковые клубы"],
    },
    reception: { uz: "Seshanba, 15:00 – 18:00", en: "Tuesday, 15:00 – 18:00", ru: "Вторник, 15:00 – 18:00" },
    phone: "+998 71 203 47 12",
    email: "languages@ils.piima.uz",
    accent: "var(--amber)",
  },
  {
    id: "spiritual",
    name: { uz: "Jasur Toʻxtayev", en: "Jasur Tukhtaev", ru: "Жасур Тухтаев" },
    role: { uz: "Direktorning maʼnaviy-maʼrifiy ishlar boʻyicha oʻrinbosari", en: "Deputy Head, Culture and Student Development", ru: "Заместитель директора по духовно-просветительской работе" },
    area: { uz: "Maʼnaviy-maʼrifiy ishlar", en: "Culture and development", ru: "Духовно-просветительская работа" },
    bio: {
      uz: "Tarix fani oʻqituvchisi. Maktab tadbirlari, toʻgaraklar, oʻquvchilar kengashi va milliy qadriyatlarga oid loyihalarni boshqaradi.",
      en: "A history teacher by training. Runs school events, clubs, the student council and projects on national heritage.",
      ru: "Учитель истории. Руководит школьными мероприятиями, кружками, ученическим советом и проектами о национальном наследии.",
    },
    responsibilities: {
      uz: ["Maktab tadbirlari va bayramlar", "Toʻgaraklar va oʻquvchilar kengashi", "Psixologik xizmat bilan hamkorlik", "Ota-onalar bilan muloqot"],
      en: ["School events and celebrations", "Clubs and the student council", "Working with the psychology service", "Communication with parents"],
      ru: ["Школьные мероприятия и праздники", "Кружки и ученический совет", "Работа с психологической службой", "Взаимодействие с родителями"],
    },
    reception: { uz: "Chorshanba va juma, 14:00 – 16:00", en: "Wednesday and Friday, 14:00 – 16:00", ru: "Среда и пятница, 14:00 – 16:00" },
    phone: "+998 71 203 47 13",
    email: "culture@ils.piima.uz",
    accent: "var(--orange)",
  },
  {
    id: "boarding",
    name: { uz: "Ulugʻbek Nazarov", en: "Ulugbek Nazarov", ru: "Улугбек Назаров" },
    role: { uz: "Direktorning internat ishlari boʻyicha oʻrinbosari", en: "Deputy Head, Boarding", ru: "Заместитель директора по работе интерната" },
    area: { uz: "Internat", en: "Boarding", ru: "Интернат" },
    bio: {
      uz: "Yotoqxona hayoti, kun tartibi, ovqatlanish va tibbiy xizmat uchun javobgar. Tarbiyachilar jamoasiga rahbarlik qiladi.",
      en: "Responsible for boarding life, the daily routine, meals and medical care. Leads the team of house staff.",
      ru: "Отвечает за жизнь в общежитии, распорядок дня, питание и медицинскую помощь. Руководит командой воспитателей.",
    },
    responsibilities: {
      uz: ["Yotoqxona va kun tartibi", "Tarbiyachilar jamoasi", "Ovqatlanish va tibbiy xizmat", "Dam olish kunlari dasturi"],
      en: ["Boarding houses and daily routine", "House staff team", "Meals and medical care", "Weekend programme"],
      ru: ["Общежитие и распорядок дня", "Команда воспитателей", "Питание и медицинская помощь", "Программа выходных дней"],
    },
    reception: { uz: "Dushanba, 16:00 – 18:00; shanba, 10:00 – 12:00", en: "Monday, 16:00 – 18:00; Saturday, 10:00 – 12:00", ru: "Понедельник, 16:00 – 18:00; суббота, 10:00 – 12:00" },
    phone: "+998 71 203 47 14",
    email: "boarding@ils.piima.uz",
    accent: "var(--purple)",
  },
  {
    id: "operations",
    name: { uz: "Rustam Hamidov", en: "Rustam Khamidov", ru: "Рустам Хамидов" },
    role: { uz: "Direktorning xoʻjalik ishlari boʻyicha oʻrinbosari", en: "Deputy Head, Operations", ru: "Заместитель директора по хозяйственной работе" },
    area: { uz: "Xoʻjalik ishlari", en: "Operations", ru: "Хозяйственная работа" },
    bio: {
      uz: "Kampus binolari, xavfsizlik, transport va texnik taʼminot ishlarini boshqaradi.",
      en: "Manages the campus buildings, safety, transport and technical services.",
      ru: "Руководит содержанием зданий кампуса, безопасностью, транспортом и техническим обеспечением.",
    },
    responsibilities: {
      uz: ["Binolar va hudud holati", "Xavfsizlik va qoʻriqlash", "Transport va taʼminot", "IT infratuzilmasi"],
      en: ["Buildings and grounds", "Safety and security", "Transport and supplies", "IT infrastructure"],
      ru: ["Здания и территория", "Безопасность и охрана", "Транспорт и снабжение", "ИТ-инфраструктура"],
    },
    reception: { uz: "Payshanba, 10:00 – 12:00", en: "Thursday, 10:00 – 12:00", ru: "Четверг, 10:00 – 12:00" },
    phone: "+998 71 203 47 15",
    email: "operations@ils.piima.uz",
    accent: "var(--red)",
  },
];

export const leadership = [director, ...deputies];
