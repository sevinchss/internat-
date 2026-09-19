/**
 * Photo gallery — built from lib/images.ts so every photo on the site stays in one place.
 * TODO: replace with real data — photos, captions and albums are placeholders until the school's own photos arrive.
 */
import { allImages, type ImageSlot } from "@/lib/images";
import type { L10n } from "@/lib/utils";

export type GalleryCategory = "study" | "dorm" | "events" | "sport" | "campus";
export type GalleryFilter = "all" | GalleryCategory;

export type GalleryPhoto = {
  /** "<group>.<key>" from lib/images.ts */
  id: string;
  category: GalleryCategory;
  slot: ImageSlot;
  caption: L10n;
};

export type GalleryAlbum = {
  id: string;
  title: L10n;
  note: L10n;
  cover: string;
  photos: string[];
  accent: string;
};

export const galleryCopy = {
  title: { uz: "Fotogalereya", en: "Photo gallery", ru: "Фотогалерея" } satisfies L10n,
  intro: {
    uz: "Darslar, yotoqxona, tadbirlar, sport va kampus — maktab hayoti suratlarda.",
    en: "Lessons, boarding, events, sport and the campus — school life in pictures.",
    ru: "Уроки, общежитие, мероприятия, спорт и кампус — школьная жизнь в фотографиях.",
  } satisfies L10n,
  placeholderNote: {
    uz: "Hozircha namunaviy suratlar koʻrsatilmoqda — maktabning oʻz suratlari tez orada joylanadi.",
    en: "Sample photos are shown for now — the school's own photos will be added soon.",
    ru: "Пока показаны примерные фотографии — собственные снимки школы скоро появятся.",
  } satisfies L10n,
  filterLabel: { uz: "Mavzu boʻyicha saralash", en: "Filter by topic", ru: "Фильтр по теме" } satisfies L10n,
  viewLabel: { uz: "Koʻrinish", en: "View", ru: "Вид" } satisfies L10n,
  viewPhotos: { uz: "Suratlar", en: "Photos", ru: "Фото" } satisfies L10n,
  viewAlbums: { uz: "Albomlar", en: "Albums", ru: "Альбомы" } satisfies L10n,
  photos: { uz: "ta surat", en: "photos", ru: "фото" } satisfies L10n,
  albums: { uz: "ta albom", en: "albums", ru: "альбомов" } satisfies L10n,
  backToAlbums: { uz: "Barcha albomlar", en: "All albums", ru: "Все альбомы" } satisfies L10n,
  openPhoto: { uz: "Suratni ochish", en: "Open photo", ru: "Открыть фото" } satisfies L10n,
  openAlbum: { uz: "Albomni ochish", en: "Open album", ru: "Открыть альбом" } satisfies L10n,
  showing: { uz: "Koʻrsatilmoqda", en: "Showing", ru: "Показано" } satisfies L10n,
};

export const galleryCategories: { id: GalleryFilter; label: L10n; color: string }[] = [
  { id: "all", label: { uz: "Barchasi", en: "All", ru: "Все" }, color: "var(--ink-3)" },
  { id: "study", label: { uz: "Oʻquv jarayoni", en: "Learning", ru: "Учёба" }, color: "var(--green)" },
  { id: "dorm", label: { uz: "Yotoqxona", en: "Boarding", ru: "Общежитие" }, color: "var(--purple)" },
  { id: "events", label: { uz: "Tadbirlar", en: "Events", ru: "Мероприятия" }, color: "var(--orange)" },
  { id: "sport", label: { uz: "Sport", en: "Sport", ru: "Спорт" }, color: "var(--red)" },
  { id: "campus", label: { uz: "Kampus", en: "Campus", ru: "Кампус" }, color: "var(--navy)" },
];

// Chinese-culture photos that read as events rather than lessons
const chineseEvents = new Set(["teaSet", "teaPour", "lanterns", "lanternsNight"]);

function categoryOf(group: string, key: string): GalleryCategory | null {
  switch (group) {
    case "classes":
    case "english":
      return "study";
    case "chinese":
      return chineseEvents.has(key) ? "events" : "study";
    case "dorm":
      return "dorm";
    case "events":
    case "heritage":
      return "events";
    case "sport":
      return "sport";
    case "campus":
      return "campus";
    default:
      return null; // staff portraits never go to the gallery
  }
}

const mapped: GalleryPhoto[] = allImages
  .flatMap((img) => {
    const category = categoryOf(img.group, img.key);
    if (!category) return [];
    const { src, alt, ratio, blurDataURL } = img;
    return [{ id: `${img.group}.${img.key}`, category, slot: { src, alt, ratio, blurDataURL }, caption: alt }];
  })
  // the school's own photos (local /images/…) lead each category, stock placeholders follow
  .sort((a, b) => Number(!a.slot.src.startsWith("/")) - Number(!b.slot.src.startsWith("/")));

/** Round-robin across categories so the "All" view feels mixed, not grouped. */
function interleave(list: GalleryPhoto[]) {
  const buckets = new Map<GalleryCategory, GalleryPhoto[]>();
  for (const p of list) buckets.set(p.category, [...(buckets.get(p.category) ?? []), p]);
  const queues = [...buckets.values()];
  const out: GalleryPhoto[] = [];
  while (queues.some((q) => q.length)) for (const q of queues) if (q.length) out.push(q.shift()!);
  return out;
}

export const galleryPhotos: GalleryPhoto[] = interleave(mapped);

const exists = new Set(galleryPhotos.map((p) => p.id));
const only = (ids: string[]) => ids.filter((id) => exists.has(id));

// TODO: replace with real data — real albums (event names, dates, photos)
export const galleryAlbums: GalleryAlbum[] = [
  {
    id: "first-bell",
    title: { uz: "Birinchi qoʻngʻiroq", en: "First bell", ru: "Первый звонок" },
    note: { uz: "Sentabr, 2026", en: "September 2026", ru: "Сентябрь 2026" },
    cover: "events.ceremony",
    photos: only([
      "events.ceremony",
      "events.groupPhoto",
      "events.mic",
      "events.speech",
      "campus.entrance",
      "classes.highFive",
      "events.lawnStage",
      "campus.hero",
    ]),
    accent: "var(--amber)",
  },
  {
    id: "campus",
    title: { uz: "Kampus", en: "Campus", ru: "Кампус" },
    note: { uz: "Binolar va hudud", en: "Buildings and grounds", ru: "Здания и территория" },
    cover: "campus.main",
    photos: only([
      "campus.main",
      "campus.lawn",
      "campus.walkway",
      "campus.court",
      "campus.stairs",
      "campus.library",
      "campus.readingRoom",
      "campus.libraryHall",
    ]),
    accent: "var(--navy)",
  },
  {
    id: "boarding",
    title: { uz: "Yotoqxona hayoti", en: "Boarding life", ru: "Жизнь в общежитии" },
    note: {
      uz: "Xonalar, oshxona, kechki mashgʻulot",
      en: "Rooms, canteen, evening study",
      ru: "Комнаты, столовая, вечерние занятия",
    },
    cover: "dorm.hero",
    photos: only([
      "dorm.hero",
      "dorm.bright",
      "dorm.bunk",
      "dorm.beds",
      "dorm.studyHall",
      "dorm.lamp",
      "dorm.desk",
      "dorm.books",
      "dorm.canteen",
      "dorm.serving",
      "dorm.meal",
    ]),
    accent: "var(--purple)",
  },
  {
    id: "sports-day",
    title: { uz: "Sport kuni", en: "Sports day", ru: "День спорта" },
    note: { uz: "Futbol, basketbol, shaxmat", en: "Football, basketball, chess", ru: "Футбол, баскетбол, шахматы" },
    cover: "sport.football",
    photos: only([
      "sport.football",
      "sport.footballDuel",
      "sport.court",
      "sport.team",
      "sport.gym",
      "sport.chessBoy",
      "sport.chessGirl",
      "sport.chessLibrary",
    ]),
    accent: "var(--red)",
  },
  {
    id: "labs",
    title: { uz: "Laboratoriyalar", en: "Labs", ru: "Лаборатории" },
    note: { uz: "Tajriba va loyihalar", en: "Experiments and projects", ru: "Опыты и проекты" },
    cover: "classes.labKids",
    photos: only([
      "classes.labKids",
      "classes.labPair",
      "classes.microscope",
      "classes.robot",
      "classes.lego",
      "classes.computers",
      "classes.physics",
      "classes.laptopGroup",
    ]),
    accent: "var(--green)",
  },
  {
    id: "culture-day",
    title: { uz: "Madaniyat kuni", en: "Culture day", ru: "День культуры" },
    note: { uz: "Sahna, meros va anʼanalar", en: "Stage, heritage and traditions", ru: "Сцена, наследие и традиции" },
    cover: "events.culture",
    photos: only([
      "events.culture",
      "events.choir",
      "events.drama",
      "events.theatre",
      "heritage.dome",
      "heritage.ceiling",
      "heritage.alley",
      "chinese.lanterns",
      "chinese.teaPour",
      "chinese.calligraphy",
    ]),
    accent: "var(--orange)",
  },
];
