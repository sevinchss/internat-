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
    hero: img("photo-1741528804373-2bedeb308ce1", "Kampus maydonida oʻquvchilar", "Students crossing the campus plaza", "Ученики на площади кампуса"),
    main: img("photo-1562774053-701939374585", "Maktabning asosiy binosi", "The main school building", "Главный корпус школы"),
    lawn: img("photo-1605299670824-00515e81b924", "Bino oldidagi yashil maydon", "Green lawn in front of the building", "Зелёная лужайка перед корпусом"),
    entrance: img("photo-1622604647545-0cada2f34470", "Oʻquvchilar kirish oldida", "Students at the entrance", "Ученики у входа"),
    court: img("photo-1705810591530-02053b1a9954", "Bino va basketbol maydonchasi", "Building and outdoor basketball court", "Корпус и баскетбольная площадка"),
    stairs: img("photo-1636065991758-11065cbd50b7", "Gʻishtli devor yonidagi aylanma zina", "Spiral staircase by a brick wall", "Винтовая лестница у кирпичной стены"),
    library: img("photo-1498243691581-b145c3f54a5a", "Kutubxona javonlari", "Library shelves", "Стеллажи библиотеки"),
    readingRoom: img("photo-1639548538099-6f7f9aec3b92", "Kutubxonaning oʻqish zali", "Library reading room", "Читальный зал библиотеки"),
    libraryHall: img("photo-1722248540590-ba8b7af1d7b2", "Keng kutubxona zali", "A spacious library hall", "Просторный зал библиотеки"),
    walkway: img("photo-1741528803987-617d582b0329", "Kampus yoʻlagi", "Campus walkway", "Дорожка кампуса"),
  },
  heritage: {
    dome: img("photo-1733586092622-1b3201e802a5", "Samarqanddagi moviy gumbaz", "A blue dome in Samarkand", "Голубой купол в Самарканде"),
    ceiling: img("photo-1741251633304-d1e1c20e2691", "Naqshinkor shift", "Ornamented ceiling", "Узорчатый потолок"),
    alley: img("photo-1715540335591-8c7db66f7a41", "Moviy gumbazli tor koʻcha", "Narrow street with a blue dome", "Узкая улица с голубым куполом"),
  },
  classes: {
    lesson: img("photo-1509062522246-3755977927d7", "Dars jarayonida oʻquvchilar", "Students during a lesson", "Ученики на уроке"),
    teacher: img("photo-1577896851231-70ef18881754", "Oʻqituvchi sinf oldida", "A teacher in front of the class", "Учитель перед классом"),
    focus: img("photo-1581726707445-75cbe4efc586", "Darsga diqqat qaratgan oʻquvchi", "A student focused on the lesson", "Ученик сосредоточен на уроке"),
    seminar: img("photo-1524178232363-1fb2b075b655", "Proyektor bilan seminar", "Seminar with a projector", "Семинар с проектором"),
    board: img("photo-1561089489-f13d5e730d72", "Doska oldida oʻquvchilar", "Students at the blackboard", "Ученики у доски"),
    physics: img("photo-1511629091441-ee46146481b6", "Fizika formulalari yozilgan doska", "Physics equations on a chalkboard", "Формулы по физике на доске"),
    labPair: img("photo-1758685734030-a31d96462eec", "Oʻqituvchi va oʻquvchi tajriba oʻtkazmoqda", "Teacher and student running an experiment", "Учитель и ученик проводят опыт"),
    labKids: img("photo-1758685734153-132c8620c1bd", "Laboratoriya xalatidagi oʻquvchilar", "Students in lab coats", "Ученики в лабораторных халатах"),
    microscope: img("photo-1602052577122-f73b9710adba", "Mikroskop va laboratoriya jihozlari", "Microscope and lab equipment", "Микроскоп и лабораторное оборудование"),
    teamwork: img("photo-1522202176988-66273c2fd55f", "Birgalikda ishlayotgan oʻquvchilar", "Students working together", "Ученики работают вместе"),
    laptopGroup: img("photo-1758270705518-b61b40527e76", "Noutbuk atrofida loyiha ustida ishlash", "Project work around a laptop", "Проектная работа за ноутбуком"),
    project: img("photo-1653566031536-4d1b6a9da15e", "Ikki oʻquvchi loyiha ustida", "Two students on a project", "Две ученицы работают над проектом"),
    robot: img("photo-1743677077216-00a458eff9e0", "Robot bilan tanishayotgan bolalar", "Children exploring a robot", "Дети знакомятся с роботом"),
    lego: img("photo-1644577880444-9a684a442654", "Konstruktor detallaridan yigʻilgan model", "A model built from construction bricks", "Модель из деталей конструктора"),
    notes: img("photo-1460518451285-97b6aa326961", "Kitob oʻqish va konspekt yozish", "Reading and taking notes", "Чтение и конспекты"),
    whiteboard: img("photo-1664382953518-4a664ab8a8c9", "Doskada yechim yozilmoqda", "Working through a problem on the whiteboard", "Решение задачи на доске"),
    computers: img("photo-1606761568499-6d2451b23c66", "Kompyuter sinfi", "Computer lab", "Компьютерный класс"),
    highFive: img("photo-1782468476932-b7f27b2e27b2", "Zinapoyadagi forma kiygan oʻquvchilar", "Students in uniform on the stairs", "Ученики в форме на лестнице"),
  },
  dorm: {
    hero: img("photo-1642204525589-978a8117a6e5", "Yotoqxona xonasi", "A dormitory room", "Комната общежития"),
    bunk: img("photo-1555854877-bab0e564b8d5", "Ikki qavatli karavot", "Bunk bed", "Двухъярусная кровать"),
    bright: img("photo-1564273795917-fe399b763988", "Yorugʻ xona", "A bright room", "Светлая комната"),
    beds: img("photo-1531576788337-610fa9c67107", "Yogʻoch karavotlar", "Wooden beds", "Деревянные кровати"),
    books: img("photo-1549675584-4d159a8fb92d", "Stol ustidagi kitoblar", "Books on the desk", "Книги на столе"),
    lamp: img("photo-1766411503488-f90eef1124bb", "Kechki mustaqil taʼlim", "Evening self-study", "Вечерняя самоподготовка"),
    studyHall: img("photo-1769092992364-3d17d2057c1b", "Yashil chiroqli oʻqish zali", "Study hall with green lamps", "Зал самоподготовки с зелёными лампами"),
    desk: img("photo-1623599008581-79de6f90594e", "Stol chirogʻi va daftar", "Desk lamp and notebook", "Настольная лампа и тетрадь"),
    canteen: img("photo-1675999656701-c141e77262c2", "Oshxona zali", "Canteen hall", "Зал столовой"),
    serving: img("photo-1788230548191-9e1ba2942569", "Oshxonada taom tarqatish joyi", "Canteen serving line", "Линия раздачи в столовой"),
    meal: img("photo-1738605488144-f178f819946f", "Stol ustidagi taomlar", "Meals on the table", "Блюда на столе"),
  },
  events: {
    culture: img("photo-1782567530665-ace109bb9149", "Milliy liboslardagi bolalar sahnada", "Children in traditional dress on stage", "Дети в национальных костюмах на сцене"),
    choir: img("photo-1769432902785-b17b57e67de0", "Sahnadagi xor", "Choir on stage", "Хор на сцене"),
    ceremony: img("photo-1750128327271-d37dff37497d", "Tantanali marosim", "A ceremony", "Торжественная церемония"),
    mic: img("photo-1560523159-4a9692d222ef", "Mikrofon bilan sahnada", "Speaking on stage", "Выступление со сцены"),
    speech: img("photo-1544531586-fde5298cdd40", "Auditoriya oldida nutq", "A talk in front of an audience", "Выступление перед аудиторией"),
    debate: img("photo-1773841915558-25083446c52e", "Minbar ortidagi munozarachilar", "Debaters at podiums", "Участники дебатов за трибунами"),
    panel: img("photo-1735679356705-7c06b780c7a4", "Sahnadagi panel muhokamasi", "Panel discussion on stage", "Панельная дискуссия на сцене"),
    drama: img("photo-1503095396549-807759245b35", "Sahnadagi uch ijrochi", "Three performers on stage", "Три актёра на сцене"),
    theatre: img("photo-1740867650660-e1a0a677e666", "Teatr sahnasidagi koʻrinish", "A scene on the theatre stage", "Сцена спектакля"),
    lawnStage: img("photo-1782567530577-98d75b4bcb88", "Ochiq havodagi sahna", "Open-air stage", "Сцена под открытым небом"),
    groupPhoto: img("photo-1663162550974-aaf76bcdeedf", "Guruh surati", "Group photo", "Групповое фото"),
  },
  sport: {
    football: img("photo-1598880513655-d1c6d4b2dfbf", "Futbol oʻyini", "Football match", "Футбольный матч"),
    footballDuel: img("photo-1613125479732-14543c793349", "Maydondagi futbolchilar", "Players on the pitch", "Игроки на поле"),
    gym: img("photo-1572454181157-0b40dd7667fe", "Sport zali", "Sports hall", "Спортивный зал"),
    court: img("photo-1549081231-203e069916f0", "Basketbol maydoni", "Basketball court", "Баскетбольная площадка"),
    team: img("photo-1710378844907-faa3b444997f", "Maydonda dam olayotgan jamoa", "Team resting on the court", "Команда отдыхает на площадке"),
    chessLibrary: img("photo-1745556377753-9efffe9181ef", "Kutubxonada shaxmat", "Chess in the library", "Шахматы в библиотеке"),
    chessBoy: img("photo-1725818660598-43b9012a8168", "Shaxmat oʻynayotgan oʻquvchi", "A student playing chess", "Ученик играет в шахматы"),
    chessGirl: img("photo-1783824840137-71ce34e53e7b", "Shaxmat taxtasiga eʼtibor qaratgan qiz", "A girl concentrating on the chessboard", "Девочка за шахматной доской"),
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
    reading: img("photo-1752920299180-e8fd9276c202", "Kutubxonada kitob oʻqish", "Reading in the library", "Чтение в библиотеке"),
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
