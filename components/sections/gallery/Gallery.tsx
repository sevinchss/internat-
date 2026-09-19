"use client";

import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { ArrowLeft } from "lucide-react";
import { Photo } from "@/components/ui/Photo";
import { Lightbox, type LightboxItem } from "@/components/ui/Lightbox";
import { TabList } from "@/components/ui/Tabs";
import { useLenis } from "@/components/layout/SmoothScroll";
import { buttonClass } from "@/components/ui/Button";
import {
  galleryAlbums,
  galleryCategories,
  galleryCopy as c,
  galleryPhotos,
  type GalleryAlbum,
  type GalleryFilter,
  type GalleryPhoto,
} from "@/data/gallery";
import { cn, pick } from "@/lib/utils";

const byId = new Map(galleryPhotos.map((p) => [p.id, p]));
const categoryColor = Object.fromEntries(galleryCategories.map((cat) => [cat.id, cat.color]));
const categoryCount = (id: GalleryFilter) =>
  id === "all" ? galleryPhotos.length : galleryPhotos.filter((p) => p.category === id).length;

/* ───────── columns by breakpoint (server snapshot = 3) ───────── */
const colsFor = (w: number) => (w >= 1280 ? 4 : w >= 768 ? 3 : 2);
const subscribe = (cb: () => void) => {
  window.addEventListener("resize", cb);
  return () => window.removeEventListener("resize", cb);
};
function useColumns() {
  return useSyncExternalStore(
    subscribe,
    () => colsFor(window.innerWidth),
    () => 3,
  );
}

type View = "photos" | "albums";

/** Photos mounted per step — keeps the first render (and its layout measurements) light. */
const PAGE = 24;

export function Gallery() {
  const locale = useLocale();
  const lenis = useLenis();
  const top = useRef<HTMLDivElement>(null);
  const [view, setView] = useState<View>("photos");
  const [filter, setFilter] = useState<GalleryFilter>("all");
  const [albumId, setAlbumId] = useState<string | null>(null);
  const [open, setOpen] = useState<number | null>(null);
  const [limit, setLimit] = useState(PAGE);
  const tc = useTranslations("common");

  const album = albumId ? (galleryAlbums.find((a) => a.id === albumId) ?? null) : null;
  const visible = useMemo<GalleryPhoto[]>(() => {
    if (view === "albums") return album ? album.photos.map((id) => byId.get(id)!).filter(Boolean) : [];
    return filter === "all" ? galleryPhotos : galleryPhotos.filter((p) => p.category === filter);
  }, [view, album, filter]);

  const items = useMemo<LightboxItem[]>(
    () =>
      visible.map((p) => ({
        src: p.slot.src,
        alt: pick(p.slot.alt, locale),
        caption: pick(p.caption, locale),
        blurDataURL: p.slot.blurDataURL,
      })),
    [visible, locale],
  );

  const scrollToTop = () => {
    const el = top.current;
    if (!el || el.getBoundingClientRect().top > 0) return;
    if (lenis) lenis.scrollTo(el, { offset: -96, duration: 0.8 });
    else el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const openAlbum = (id: string) => {
    setAlbumId(id);
    scrollToTop();
  };

  const onClose = useCallback(() => setOpen(null), []);
  const tabs = [
    { id: "photos", label: pick(c.viewPhotos, locale) },
    { id: "albums", label: pick(c.viewAlbums, locale) },
  ];

  return (
    <section aria-label={pick(c.title, locale)} className="pb-24 lg:pb-32">
      <div ref={top} className="container-x scroll-mt-24">
        {/* Toolbar */}
        <div className="border-line flex flex-col-reverse gap-4 border-b md:flex-row md:items-end md:justify-between">
          {view === "photos" ? (
            <div
              role="group"
              aria-label={pick(c.filterLabel, locale)}
              className="no-scrollbar -mx-4 flex gap-6 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:gap-x-8 sm:px-0"
            >
              {galleryCategories.map((cat) => {
                const on = filter === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    aria-pressed={on}
                    onClick={() => {
                      setFilter(cat.id);
                      setLimit(PAGE);
                    }}
                    className={cn(
                      "group relative inline-flex min-h-12 shrink-0 items-start gap-1 py-3 text-[15px] font-medium transition-colors duration-200",
                      on ? "text-ink" : "text-ink-3 hover:text-ink",
                    )}
                  >
                    {pick(cat.label, locale)}
                    <sup className="text-ink-3 top-0 text-[11px] font-normal tabular-nums">{categoryCount(cat.id)}</sup>
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute inset-x-0 -bottom-px h-px origin-left transition-transform duration-500 ease-out motion-reduce:transition-none",
                        on ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                      )}
                      style={{ backgroundColor: cat.id === "all" ? "var(--ink)" : cat.color }}
                    />
                  </button>
                );
              })}
            </div>
          ) : album ? (
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 py-3">
              <button
                type="button"
                onClick={() => setAlbumId(null)}
                className="border-line text-ink hover:border-primary-ink hover:text-primary-ink inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-[15px] font-semibold transition-colors"
              >
                <ArrowLeft className="size-4" strokeWidth={1.8} aria-hidden="true" />
                {pick(c.backToAlbums, locale)}
              </button>
              <h2 className="text-display-s flex items-center gap-2.5">
                <span className="size-2.5 rounded-full" style={{ backgroundColor: album.accent }} aria-hidden="true" />
                {pick(album.title, locale)}
              </h2>
            </div>
          ) : (
            <p className="text-ink-2 py-4">
              {galleryAlbums.length} {pick(c.albums, locale)}
            </p>
          )}

          <TabList
            idBase="gallery-view"
            label={pick(c.viewLabel, locale)}
            tabs={tabs}
            value={view}
            onChange={(id) => {
              setView(id as View);
              setAlbumId(null);
            }}
            className="border-line mt-4 self-start rounded-full border p-1 md:mt-0 md:mb-2.5 md:self-auto"
          />
        </div>

        <p className="sr-only" aria-live="polite">
          {view === "photos" || album ? `${pick(c.showing, locale)}: ${visible.length} ${pick(c.photos, locale)}` : ""}
        </p>

        {/* Panels */}
        <div
          role="tabpanel"
          id="gallery-view-panel-photos"
          aria-labelledby="gallery-view-tab-photos"
          hidden={view !== "photos"}
          className="mt-8"
        >
          {view === "photos" && (
            <>
              <Masonry photos={visible.slice(0, limit)} locale={locale} onOpen={setOpen} />
              {visible.length > limit && (
                <div className="mt-12 flex justify-center">
                  <button type="button" onClick={() => setLimit((l) => l + PAGE)} className={buttonClass("outline")}>
                    {tc("loadMore")} <span className="text-ink-3">({visible.length - limit})</span>
                  </button>
                </div>
              )}
            </>
          )}
        </div>
        <div
          role="tabpanel"
          id="gallery-view-panel-albums"
          aria-labelledby="gallery-view-tab-albums"
          hidden={view !== "albums"}
          className="mt-8"
        >
          {view === "albums" &&
            (album ? (
              <>
                <p className="text-ink-2 mb-6">
                  {pick(album.note, locale)} · {album.photos.length} {pick(c.photos, locale)}
                </p>
                <Masonry photos={visible} locale={locale} onOpen={setOpen} />
              </>
            ) : (
              <Albums locale={locale} onOpen={openAlbum} />
            ))}
        </div>
      </div>

      <Lightbox items={items} index={open} onClose={onClose} onIndex={setOpen} />
    </section>
  );
}

/* ───────── Masonry: absolute positions in container-query units, so framer `layout` can animate every move ───────── */

function Masonry({ photos, locale, onOpen }: { photos: GalleryPhoto[]; locale: string; onOpen: (i: number) => void }) {
  const cols = useColumns();
  // layout animation only after the first client frame, so settling from the server's 3 columns doesn't animate
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);
  const gap = cols === 2 ? 8 : 12;

  const { placed, height } = useMemo(() => {
    // per column: sum of 1/ratio (height in column-widths) and item count
    const sum = Array.from({ length: cols }, () => 0);
    const count = Array.from({ length: cols }, () => 0);
    const placed = photos.map((p, index) => {
      // shortest column wins (gaps count a little too)
      const weights = sum.map((s, i) => s + count[i] * 0.04);
      const col = weights.indexOf(Math.min(...weights));
      const pos = { p, index, col, s: sum[col], n: count[col] };
      sum[col] += 1 / (p.slot.ratio || 1.5);
      count[col] += 1;
      return pos;
    });
    const tallest = sum.reduce((best, s, i) => (s > sum[best] ? i : best), 0);
    return { placed, height: { s: sum[tallest], n: count[tallest] } };
  }, [photos, cols]);

  // --cw = one column width, resolved against the container-query wrapper
  const cw = `((100cqw - ${(cols - 1) * gap}px) / ${cols})`;
  const sizes = "(min-width: 1360px) 330px, (min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw";

  return (
    <div className="[container-type:inline-size]">
      <LayoutGroup>
        <ul className="relative" style={{ height: `calc(${cw} * ${height.s} + ${Math.max(0, height.n - 1) * gap}px)` }}>
          <AnimatePresence mode="popLayout" initial={false}>
            {placed.map(({ p, index, col, s, n }) => {
              const caption = pick(p.caption, locale);
              return (
                <motion.li
                  key={p.id}
                  layout={ready}
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ layout: { type: "spring", stiffness: 260, damping: 32 }, duration: 0.3 }}
                  className="absolute"
                  style={{
                    width: `calc(${cw})`,
                    height: `calc(${cw} / ${p.slot.ratio || 1.5})`,
                    left: `calc((${cw} + ${gap}px) * ${col})`,
                    top: `calc(${cw} * ${s} + ${n * gap}px)`,
                  }}
                >
                  <button
                    type="button"
                    aria-haspopup="dialog"
                    aria-label={`${pick(c.openPhoto, locale)}: ${caption}`}
                    onClick={() => onOpen(index)}
                    className="group relative block size-full overflow-hidden rounded-[4px]"
                  >
                    <Photo
                      slot={p.slot}
                      sizes={sizes}
                      decorative
                      className="size-full"
                      imgClassName="transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                    <span className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end gap-2 bg-gradient-to-t from-[#050d1c]/70 to-transparent p-3 pt-8 text-left text-[14px] leading-snug font-medium text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 sm:p-4 sm:pt-10">
                      <span
                        className="mt-[0.45em] size-2 shrink-0 rounded-full"
                        style={{ backgroundColor: categoryColor[p.category] }}
                        aria-hidden="true"
                      />
                      {caption}
                    </span>
                  </button>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ul>
      </LayoutGroup>
    </div>
  );
}

/* ───────── Albums: asymmetric editorial grid; the cover with a second photo peeking through a circle ───────── */

function Albums({ locale, onOpen }: { locale: string; onOpen: (id: string) => void }) {
  const spans = [
    "lg:col-span-7 lg:row-span-2",
    "lg:col-span-5",
    "lg:col-span-5",
    "lg:col-span-4",
    "lg:col-span-4",
    "lg:col-span-4",
  ];
  return (
    <ul className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-12 lg:gap-x-8">
      {galleryAlbums.map((a, i) => (
        <li key={a.id} className={cn(spans[i] ?? "lg:col-span-4", i === 0 && "sm:col-span-2")}>
          <AlbumCard album={a} index={i} locale={locale} onOpen={onOpen} big={i === 0} />
        </li>
      ))}
    </ul>
  );
}

function AlbumCard({
  album,
  index,
  locale,
  onOpen,
  big,
}: {
  album: GalleryAlbum;
  index: number;
  locale: string;
  onOpen: (id: string) => void;
  big: boolean;
}) {
  const cover = byId.get(album.cover) ?? byId.get(album.photos[0]);
  const second = byId.get(album.photos.find((id) => id !== album.cover) ?? album.photos[1]);
  const title = pick(album.title, locale);
  return (
    <button
      type="button"
      onClick={() => onOpen(album.id)}
      aria-label={`${pick(c.openAlbum, locale)}: ${title}, ${album.photos.length} ${pick(c.photos, locale)}`}
      className="group flex h-full w-full flex-col text-left"
    >
      <span className={cn("relative block w-full", big ? "aspect-[4/3] lg:aspect-auto lg:flex-1" : "aspect-[4/3]")}>
        {cover && (
          <span className="absolute inset-0 overflow-hidden rounded-[4px]">
            <Photo
              slot={cover.slot}
              sizes={
                big
                  ? "(min-width: 1024px) 55vw, (min-width: 640px) 90vw, 92vw"
                  : "(min-width: 1024px) 33vw, (min-width: 640px) 45vw, 92vw"
              }
              decorative
              className="size-full"
              imgClassName="transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transition-none"
            />
          </span>
        )}
        {second && (
          <span
            className={cn(
              "ring-paper absolute right-5 -bottom-5 overflow-hidden rounded-full ring-[5px] transition-transform duration-500 ease-out group-hover:-translate-y-1.5 motion-reduce:transition-none",
              big ? "size-28 sm:size-36" : "size-20 sm:size-24",
            )}
          >
            <Photo slot={second.slot} sizes="150px" decorative quality={60} className="size-full" />
          </span>
        )}
      </span>
      <span className="mt-6 flex items-baseline gap-4 pr-28">
        <span className="text-ink-3 text-[15px] font-light tabular-nums" aria-hidden="true">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span>
          <span className={cn("text-ink block font-semibold tracking-[-0.03em]", big ? "text-display-s" : "text-xl")}>
            {title}
          </span>
          <span className="text-ink-2 mt-1 block text-[15px]">
            {pick(album.note, locale)} · {album.photos.length} {pick(c.photos, locale)}
          </span>
        </span>
      </span>
    </button>
  );
}
