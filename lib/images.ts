/**
 * EVERY photo on the site is referenced from this file.
 *
 * Slots with "/images/..." are REAL photos of the school (from its official Telegram channel t.me/piima_xorijiy_tillar;
 * "Loyiha/Project visual" ones are architect renders from t.me/xorijiytillar600). Telegram only serves 800px previews —
 * replace them with the original files for sharper large images. The rest are free-licence Unsplash placeholders.
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
    renderAerial: slot("/images/campus/render-aerial.jpg", "Loyiha: kampus yuqoridan", "Project visual: the campus from above", "Проект: кампус с высоты"),
    renderEntrance: slot("/images/campus/render-entrance.jpg", "Loyiha: bosh kirish", "Project visual: the main entrance", "Проект: главный вход"),
    hero: slot("/images/campus/aerial.jpg", "Maktab-internat kampusi — yuqoridan koʻrinish", "The school campus from above", "Кампус школы-интерната с высоты"),
    main: slot("/images/campus/courtyard.jpg", "Maktab binosi va ichki hovli", "The school building and its courtyard", "Здание школы и внутренний двор"),
    lawn: slot("/images/campus/render-square.jpg", "Loyiha: kampus maydoni va maysazor", "Project visual: campus square and lawns", "Проект: площадь кампуса и газоны"),
    entrance: slot("/images/campus/facade-logo.jpg", "Bino fasadidagi International Language School belgisi", "The International Language School emblem on the façade", "Эмблема International Language School на фасаде"),
    court: slot("/images/campus/render-track.jpg", "Loyiha: yugurish yoʻlagi va sport maydoni", "Project visual: running track and sports ground", "Проект: беговая дорожка и спортплощадка"),
    stairs: slot("/images/campus/render-plaza.jpg", "Loyiha: soyabonli ichki maydon", "Project visual: the canopied inner plaza", "Проект: внутренняя площадь с навесами"),
    library: img("photo-1770307939909-f27b8e4ae9c9", "Zamonaviy kutubxona javonlari", "Modern library shelves", "Стеллажи современной библиотеки"),
    readingRoom: slot("/images/campus/reading-pod.jpg", "Oʻqish kapsulasida kitob oʻqiyotgan oʻquvchi", "A pupil reading in a study pod", "Ученик читает в капсуле для чтения"),
    libraryHall: img("photo-1722248540590-ba8b7af1d7b2", "Keng kutubxona zali", "A spacious library hall", "Просторный зал библиотеки"),
    walkway: slot("/images/campus/render-path.jpg", "Loyiha: kampus yoʻlagi", "Project visual: a campus path", "Проект: дорожка кампуса"),
  },
  heritage: {
    dome: img("photo-1733586092622-1b3201e802a5", "Samarqanddagi moviy gumbaz", "A blue dome in Samarkand", "Голубой купол в Самарканде"),
    ceiling: img("photo-1741251633304-d1e1c20e2691", "Naqshinkor shift", "Ornamented ceiling", "Узорчатый потолок"),
    alley: img("photo-1715540335591-8c7db66f7a41", "Moviy gumbazli tor koʻcha", "Narrow street with a blue dome", "Узкая улица с голубым куполом"),
  },
  classes: {
    lesson: slot("/images/classes/classroom.jpg", "Yorugʻ sinfxonada dars", "A lesson in a bright classroom", "Урок в светлом классе"),
    teacher: slot("/images/classes/teacher.jpg", "Oʻqituvchi oʻquvchi bilan", "A teacher with a pupil", "Учитель с учеником"),
    focus: img("photo-1781331756173-386c128d6f92", "Darsda konspekt yozayotgan forma kiygan oʻquvchilar", "Students in blazers taking notes in class", "Ученики в пиджаках конспектируют урок"),
    seminar: img("photo-1779358296802-715fc9fbc152", "Keng auditoriyada forma kiygan oʻquvchilar", "Students in uniform in a large lecture hall", "Ученики в форме в большой аудитории"),
    board: slot("/images/classes/first-lesson.jpg", "Birinchi dars: bayroqchalar bilan oʻquvchilar", "The first lesson: pupils with flags", "Первый урок: ученики с флажками"),
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
    highFive: slot("/images/classes/pupils.jpg", "Maktab formasidagi oʻquvchilar", "Pupils in the school uniform", "Ученики в школьной форме"),
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
    guests: slot("/images/events/guests.jpg", "Ochilish marosimidagi mehmonlar", "Guests at the opening", "Гости на открытии"),
    culture: img("photo-1623065078802-8595aa906f86", "Milliy libosdagi raqqosa bayram sahnasida", "A dancer in Uzbek national dress on a festive stage", "Танцовщица в узбекском национальном костюме на праздничной сцене"),
    choir: img("photo-1769432902785-b17b57e67de0", "Sahnadagi xor", "Choir on stage", "Хор на сцене"),
    ceremony: slot("/images/events/first-day-flowers.jpg", "Birinchi oʻquv kuni: gullar bilan oʻquvchilar", "First school day: pupils with flowers", "Первый учебный день: ученики с цветами"),
    mic: img("photo-1765020553499-1ec9aeb21298", "Minbarda soʻzlayotgan oʻquvchi", "A student speaking at a podium", "Ученица выступает за трибуной"),
    speech: img("photo-1544531586-fde5298cdd40", "Auditoriya oldida nutq", "A talk in front of an audience", "Выступление перед аудиторией"),
    debate: img("photo-1773841915558-25083446c52e", "Minbar ortidagi munozarachilar", "Debaters at podiums", "Участники дебатов за трибунами"),
    panel: img("photo-1735679356705-7c06b780c7a4", "Sahnadagi panel muhokamasi", "Panel discussion on stage", "Панельная дискуссия на сцене"),
    drama: img("photo-1503095396549-807759245b35", "Sahnadagi uch ijrochi", "Three performers on stage", "Три актёра на сцене"),
    theatre: img("photo-1740867650660-e1a0a677e666", "Teatr sahnasidagi koʻrinish", "A scene on the theatre stage", "Сцена спектакля"),
    lawnStage: img("photo-1782567530577-98d75b4bcb88", "Ochiq havodagi sahna", "Open-air stage", "Сцена под открытым небом"),
    groupPhoto: slot("/images/events/atrium-panda.jpg", "Atriumda oʻquvchilar va panda", "Pupils and a panda in the atrium", "Ученики и панда в атриуме"),
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
    teachers: slot("/images/chinese/chinese-teachers.jpg", "Xitoy tili oʻqituvchilari birinchi oʻquv kunida", "Chinese teachers on the first school day", "Преподаватели китайского в первый учебный день"),
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
    floor: slot("/images/english/reading-floor.jpg", "Kitob oʻqiyotgan oʻquvchi", "A pupil reading", "Ученик читает книгу"),
    writing: img("photo-1520569495996-b5e1219cb625", "Esse yozish", "Writing an essay", "Написание эссе"),
  },
  /** Photos from the school's official Telegram channel for the news item about the 15 Sep 2026 visit. */
  news: {
    visit0: slot("/images/news/visit-0.jpg", "Maktab-internatga tashrif, 2026-yil 15-sentabr", "Visit to the school, 15 September 2026", "Визит в школу-интернат, 15 сентября 2026"),
    visit2: slot("/images/news/visit-2.jpg", "Maktab-internatga tashrif, 2026-yil 15-sentabr", "Visit to the school, 15 September 2026", "Визит в школу-интернат, 15 сентября 2026"),
    visit4: slot("/images/news/visit-4.jpg", "Maktab-internatga tashrif, 2026-yil 15-sentabr", "Visit to the school, 15 September 2026", "Визит в школу-интернат, 15 сентября 2026"),
    visit5: slot("/images/news/visit-5.jpg", "Maktab-internatga tashrif, 2026-yil 15-sentabr", "Visit to the school, 15 September 2026", "Визит в школу-интернат, 15 сентября 2026"),
    visit8: slot("/images/news/visit-8.jpg", "Maktab-internatga tashrif, 2026-yil 15-sentabr", "Visit to the school, 15 September 2026", "Визит в школу-интернат, 15 сентября 2026"),
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
