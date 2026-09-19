/**
 * EVERY photo on the site is referenced from this file.
 *
 * Right now the slots point to free-licence Unsplash placeholders (https://unsplash.com/license).
 * To use the school's real photos:
 *   1. put the file in public/images/<group>/..., e.g. public/images/campus/hero.jpg
 *   2. change `src` below to "/images/campus/hero.jpg"
 *   3. run `npm run blur` to refresh blur placeholders + aspect ratios
 * Alt texts are in 3 languages — update them to describe the real photo.
 *
 * TODO: replace with real data (all placeholders)
 */
import type { L10n } from "./utils";
import blur from "./blur-data.json";

export type ImageSlot = {
  src: string;
  alt: L10n;
  /** width / height — filled by `npm run blur`, falls back to 3/2 */
  ratio: number;
  blurDataURL?: string;
};

const u = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=2400&q=80`;

type Meta = Record<string, { b: string; r: number }>;
function slot(src: string, uz: string, en: string, ru: string): ImageSlot {
  const meta = (blur as Meta)[src];
  return { src, alt: { uz, en, ru }, ratio: meta?.r ?? 1.5, blurDataURL: meta?.b };
}
const img = (id: string, uz: string, en: string, ru: string) => slot(u(id), uz, en, ru);

export const images = {
  campus: {
    hero: img("photo-1737825101103-c35677e6bd45", "Kampusdagi forma kiygan oʻquvchilar", "Students in blazers and ties walking across a bright campus", "Ученики в пиджаках и галстуках идут по светлому кампусу"),
    main: img("photo-1721814055224-d7165bf5238b", "Yorugʻ zamonaviy oʻquv binosi", "A bright modern school building", "Светлый современный учебный корпус"),
    lawn: img("photo-1769430886896-dc30842be5a3", "Oʻquv binosi oldidagi keng maysazor", "Wide lawn in front of the teaching block", "Широкая лужайка перед учебным корпусом"),
    entrance: img("photo-1729284440498-19b2295ac7bb", "Maktab zinapoyasida forma kiygan oʻquvchilar", "Students in uniform on the school steps", "Ученики в форме на ступенях школы"),
    court: img("photo-1730106469498-a916bbf203e7", "Yugurish yoʻlagi va sport zali", "Running track leading to the sports hall", "Беговая дорожка и спортивный корпус"),
    stairs: img("photo-1784308992921-045da5443625", "Koʻkalamzor zinapoya va dam olish zonasi", "Green staircase and lounge area", "Лестница в зелени и зона отдыха"),
    library: img("photo-1770307939909-f27b8e4ae9c9", "Zamonaviy kutubxona javonlari", "Modern library shelves", "Стеллажи современной библиотеки"),
    readingRoom: img("photo-1564981797816-1043664bf78d", "Katta derazali yorugʻ oʻqish zali", "Bright reading room with tall windows", "Светлый читальный зал с высокими окнами"),
    libraryHall: img("photo-1722248540590-ba8b7af1d7b2", "Keng kutubxona zali", "A spacious library hall", "Просторный зал библиотеки"),
    walkway: img("photo-1741622014944-04f164db1041", "Chinorlar soyasidagi yoʻlak", "Tree-lined walkway", "Аллея под платанами"),
  },
  heritage: {
    dome: img("photo-1733586092622-1b3201e802a5", "Samarqanddagi moviy gumbaz", "A blue dome in Samarkand", "Голубой купол в Самарканде"),
    ceiling: img("photo-1741251633304-d1e1c20e2691", "Naqshinkor shift", "Ornamented ceiling", "Узорчатый потолок"),
    alley: img("photo-1715540335591-8c7db66f7a41", "Moviy gumbazli tor koʻcha", "Narrow street with a blue dome", "Узкая улица с голубым куполом"),
  },
  classes: {
    lesson: img("photo-1776178320206-f42b9a9cf996", "Dars jarayonida yuqori sinf oʻquvchilari", "Senior students during a lesson", "Старшеклассники на уроке"),
    teacher: img("photo-1758270704226-db897b180243", "Oʻqituvchi savol beradi, oʻquvchilar qoʻl koʻtaradi", "Students raise their hands to the teacher's question", "Ученики поднимают руки на вопрос учителя"),
    focus: img("photo-1781331756173-386c128d6f92", "Darsda konspekt yozayotgan forma kiygan oʻquvchilar", "Students in blazers taking notes in class", "Ученики в пиджаках конспектируют урок"),
    seminar: img("photo-1779358296802-715fc9fbc152", "Keng auditoriyada forma kiygan oʻquvchilar", "Students in uniform in a large lecture hall", "Ученики в форме в большой аудитории"),
    board: img("photo-1758685848261-16a5a9e68811", "Doskada formulalar yechayotgan oʻquvchilar", "Students solving formulas at the blackboard", "Ученики решают формулы у доски"),
    physics: img("photo-1758685734006-4a3cb9253a2b", "Fizika va kimyo formulalari yozilgan doska", "Physics and chemistry formulas on the blackboard", "Формулы по физике и химии на доске"),
    labPair: img("photo-1758685734030-a31d96462eec", "Oʻqituvchi va oʻquvchi tajriba oʻtkazmoqda", "Teacher and student running an experiment", "Учитель и ученик проводят опыт"),
    labKids: img("photo-1758685734153-132c8620c1bd", "Laboratoriya xalatidagi oʻquvchilar", "Students in lab coats", "Ученики в лабораторных халатах"),
    microscope: img("photo-1602052577122-f73b9710adba", "Mikroskop va laboratoriya jihozlari", "Microscope and lab equipment", "Микроскоп и лабораторное оборудование"),
    teamwork: img("photo-1630331515839-dcf1de4e8d4d", "Oq koʻylak va galstuk taqqan oʻquvchilar", "Students in white shirts and ties", "Ученики в белых рубашках и галстуках"),
    laptopGroup: img("photo-1758270705518-b61b40527e76", "Noutbuk atrofida loyiha ustida ishlash", "Project work around a laptop", "Проектная работа за ноутбуком"),
    project: img("photo-1653566031536-4d1b6a9da15e", "Ikki oʻquvchi loyiha ustida", "Two students on a project", "Две ученицы работают над проектом"),
    robot: img("photo-1743677077216-00a458eff9e0", "Robot bilan tanishayotgan bolalar", "Children exploring a robot", "Дети знакомятся с роботом"),
    lego: img("photo-1742767069929-0c663150b164", "Robototexnika musobaqasi uchun yigʻilgan robot", "A robot built for a robotics competition", "Робот, собранный для соревнований по робототехнике"),
    notes: img("photo-1460518451285-97b6aa326961", "Kitob oʻqish va konspekt yozish", "Reading and taking notes", "Чтение и конспекты"),
    whiteboard: img("photo-1773489753005-dba9bf8d72bf", "Doskada masala yechayotgan oʻquvchi qiz", "A student working through a problem on the board", "Ученица решает задачу у доски"),
    computers: img("photo-1643199121319-b3b5695e4acb", "Zamonaviy kompyuter sinfi", "Modern computer lab", "Современный компьютерный класс"),
    highFive: img("photo-1546957221-37816b007052", "Maydonda forma kiygan oʻquvchilar", "Students in uniform on the sports field", "Ученики в форме на спортивном поле"),
  },
  dorm: {
    hero: img("photo-1781415980730-bfcf192e38bc", "Tartibli yotoqxona xonasi", "A neat dormitory room", "Аккуратная комната общежития"),
    bunk: img("photo-1555854877-bab0e564b8d5", "Ikki qavatli karavot", "Bunk bed", "Двухъярусная кровать"),
    bright: img("photo-1564273795917-fe399b763988", "Yorugʻ xona", "A bright room", "Светлая комната"),
    beds: img("photo-1531576788337-610fa9c67107", "Yogʻoch karavotlar", "Wooden beds", "Деревянные кровати"),
    books: img("photo-1549675584-4d159a8fb92d", "Stol ustidagi kitoblar", "Books on the desk", "Книги на столе"),
    lamp: img("photo-1766411503488-f90eef1124bb", "Kechki mustaqil taʼlim", "Evening self-study", "Вечерняя самоподготовка"),
    studyHall: img("photo-1769092992364-3d17d2057c1b", "Yashil chiroqli oʻqish zali", "Study hall with green lamps", "Зал самоподготовки с зелёными лампами"),
    desk: img("photo-1623599008581-79de6f90594e", "Stol chirogʻi va daftar", "Desk lamp and notebook", "Настольная лампа и тетрадь"),
    canteen: img("photo-1675999656701-c141e77262c2", "Oshxona zali", "Canteen hall", "Зал столовой"),
    serving: img("photo-1788230548191-9e1ba2942569", "Oshxonada taom tarqatish joyi", "Canteen serving line", "Линия раздачи в столовой"),
    meal: img("photo-1785571903557-dce44dcf3eab", "Quruq mevali oʻzbek oshi", "Uzbek plov with dried fruit", "Узбекский плов с сухофруктами"),
  },
  events: {
    culture: img("photo-1623065078802-8595aa906f86", "Milliy libosdagi raqqosa bayram sahnasida", "A dancer in Uzbek national dress on a festive stage", "Танцовщица в узбекском национальном костюме на праздничной сцене"),
    choir: img("photo-1769432902785-b17b57e67de0", "Sahnadagi xor", "Choir on stage", "Хор на сцене"),
    ceremony: img("photo-1780893006073-2f914b1ae832", "Hovlidagi umumiy yigʻilish", "A school gathering in the courtyard", "Общий сбор во дворе школы"),
    mic: img("photo-1765020553499-1ec9aeb21298", "Minbarda soʻzlayotgan oʻquvchi", "A student speaking at a podium", "Ученица выступает за трибуной"),
    speech: img("photo-1544531586-fde5298cdd40", "Auditoriya oldida nutq", "A talk in front of an audience", "Выступление перед аудиторией"),
    debate: img("photo-1773841915558-25083446c52e", "Minbar ortidagi munozarachilar", "Debaters at podiums", "Участники дебатов за трибунами"),
    panel: img("photo-1735679356705-7c06b780c7a4", "Sahnadagi panel muhokamasi", "Panel discussion on stage", "Панельная дискуссия на сцене"),
    drama: img("photo-1503095396549-807759245b35", "Sahnadagi uch ijrochi", "Three performers on stage", "Три актёра на сцене"),
    theatre: img("photo-1740867650660-e1a0a677e666", "Teatr sahnasidagi koʻrinish", "A scene on the theatre stage", "Сцена спектакля"),
    lawnStage: img("photo-1782567530577-98d75b4bcb88", "Ochiq havodagi sahna", "Open-air stage", "Сцена под открытым небом"),
    groupPhoto: img("photo-1769201153045-98827f62996b", "Forma kiygan oʻquvchilarning guruh surati", "Group photo of students in uniform", "Групповое фото учеников в форме"),
  },
  sport: {
    football: img("photo-1598880513655-d1c6d4b2dfbf", "Futbol oʻyini", "Football match", "Футбольный матч"),
    footballDuel: img("photo-1613125479732-14543c793349", "Maydondagi futbolchilar", "Players on the pitch", "Игроки на поле"),
    gym: img("photo-1701272873248-ee041b51b02b", "Keng sport zali", "A large sports hall", "Большой спортивный зал"),
    court: img("photo-1609513677385-5d2b049d9431", "Yorugʻ yopiq sport zali", "Bright indoor sports hall", "Светлый крытый спортзал"),
    team: img("photo-1710378844907-faa3b444997f", "Maydonda dam olayotgan jamoa", "Team resting on the court", "Команда отдыхает на площадке"),
    chessLibrary: img("photo-1745556377753-9efffe9181ef", "Kutubxonada shaxmat", "Chess in the library", "Шахматы в библиотеке"),
    chessBoy: img("photo-1725818660598-43b9012a8168", "Shaxmat oʻynayotgan oʻquvchi", "A student playing chess", "Ученик играет в шахматы"),
    chessGirl: img("photo-1699743570117-91384b4b0400", "Shaxmat turnirida qizlar", "Girls at a chess tournament", "Девушки на шахматном турнире"),
  },
  chinese: {
    calligraphy: img("photo-1546638008-efbe0b62c730", "Moʻyqalam bilan xattotlik", "Brush calligraphy", "Каллиграфия кистью"),
    brush: img("photo-1486303954368-398fea0e72cd", "Qogʻozga ieroglif yozilmoqda", "Writing a character on paper", "Иероглиф на бумаге"),
    writing: img("photo-1675149485273-2c3b292c5c2a", "Xitoy ieroglifini yozish", "Writing Chinese characters", "Письмо китайскими иероглифами"),
    teaSet: img("photo-1531970227416-f0cddeb1f748", "Choy anjomlari", "A tea set", "Чайный набор"),
    teaPour: img("photo-1531969179221-3946e6b5a5e7", "Piyolaga choy quyish", "Pouring tea", "Разливают чай"),
    lanterns: img("photo-1519181245277-cffeb31da2e3", "Qizil qogʻoz fonuslar", "Red paper lanterns", "Красные бумажные фонари"),
    lanternsNight: img("photo-1572940639050-49166eb37404", "Kechasi qizil fonuslar", "Red lanterns at night", "Красные фонари ночью"),
    book: img("photo-1648769170333-fd01106d8873", "Xitoycha matnli kitob", "A book in Chinese", "Книга на китайском"),
  },
  english: {
    shelf: img("photo-1561379982-c9f0e54ff067", "Kitob javoni oldida oʻquvchi", "A student at the bookshelf", "Ученица у книжной полки"),
    reading: img("photo-1776571661811-c311d42634d9", "Kutubxonada dars tayyorlayotgan oʻquvchilar", "Students studying in the library", "Ученики занимаются в библиотеке"),
    page: img("photo-1547567667-1aa64e6f58dc", "Kitob sahifasini varaqlash", "Turning a page", "Перелистывание страницы"),
    floor: img("photo-1720659201108-4efe526b289c", "Kutubxonada polda oʻtirib oʻqish", "Reading on the library floor", "Чтение на полу библиотеки"),
    writing: img("photo-1520569495996-b5e1219cb625", "Esse yozish", "Writing an essay", "Написание эссе"),
  },
  /**
   * Staff portraits — intentionally empty: we don't put strangers' faces next to placeholder names.
   * Add real photos (public/images/staff/*.jpg) and set e.g.
   * director: slot("/images/staff/director.jpg", "…", "…", "…")
   * TODO: replace with real data
   */
  staff: {} as Record<string, ImageSlot | undefined>,
};

export type ImageGroup = keyof typeof images;

/** Flat list of all photos (used by gallery, marquee). */
export const allImages = (Object.keys(images) as ImageGroup[]).flatMap((g) =>
  Object.entries(images[g]).flatMap(([key, v]) => (v ? [{ group: g, key, ...(v as ImageSlot) }] : [])),
);

export { slot };
