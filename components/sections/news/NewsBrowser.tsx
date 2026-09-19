"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Photo } from "@/components/ui/Photo";
import { RING_START, RING_END } from "@/components/brand/Ring";
import type { NewsCategory } from "@/data/news";
import { arcPath, cn } from "@/lib/utils";
import type { NewsCardData } from "./news-utils";

const PAGE = 6;

/** Case- and apostrophe-insensitive: "oquv" finds "oʻquv", "ё" = "е". */
const norm = (s: string) =>
  s
    .toLocaleLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[\u02bb\u02bc'\u2018\u2019]/g, "")
    .replace(/ё/g, "е");

export function NewsBrowser({
  items,
  featuredSlug,
  categories,
  labels,
}: {
  items: NewsCardData[];
  featuredSlug?: string;
  categories: { id: NewsCategory; label: string; color: string }[];
  labels: {
    heading: string;
    filter: string;
    search: string;
    searchPlaceholder: string;
    clear: string;
    reset: string;
    count: string;
  };
}) {
  const t = useTranslations("common");
  const [cat, setCat] = useState<NewsCategory | "all">("all");
  const [query, setQuery] = useState("");
  const [visible, setVisible] = useState(PAGE);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const searchId = useId();
  const headingId = useId();

  const q = norm(query.trim());
  const filtering = cat !== "all" || q !== "";
  const results = useMemo(
    () =>
      items.filter(
        (n) =>
          // the featured story already sits in the hero — only bring it back when the reader is filtering
          (filtering || n.slug !== featuredSlug) &&
          (cat === "all" || n.category === cat) &&
          (q === "" || norm(n.title).includes(q) || norm(n.excerpt).includes(q)),
      ),
    [items, cat, q, filtering, featuredSlug],
  );
  const shown = results.slice(0, visible);

  const update = (next: { cat?: NewsCategory | "all"; query?: string }) => {
    if (next.cat !== undefined) setCat(next.cat);
    if (next.query !== undefined) setQuery(next.query);
    setVisible(PAGE);
  };

  // after "load more", move focus to the first newly revealed story (keyboard & screen-reader users keep their place)
  const focusIndex = useRef<number | null>(null);
  useEffect(() => {
    if (focusIndex.current === null) return;
    linkRefs.current[focusIndex.current]?.focus();
    focusIndex.current = null;
  }, [visible]);
  const loadMore = () => {
    focusIndex.current = visible;
    setVisible((v) => v + PAGE);
  };

  const chips: { id: NewsCategory | "all"; label: string; color?: string }[] = [{ id: "all", label: t("all") }, ...categories];

  return (
    <section aria-labelledby={headingId} className="container-x pb-24 lg:pb-32">
      <div className="flex flex-col gap-6 border-t border-line pt-10 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 id={headingId} className="text-display-s">
            {labels.heading}
          </h2>
          <div role="group" aria-label={labels.filter} className="no-scrollbar -mx-4 mt-5 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
            {chips.map((c) => {
              const active = cat === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => update({ cat: c.id })}
                  className={cn(
                    "inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border px-4 text-[15px] font-semibold transition-colors",
                    active ? "border-ink bg-ink text-paper" : "border-line text-ink-2 hover:border-ink/40 hover:text-ink",
                  )}
                >
                  {c.color && <span aria-hidden="true" className="size-2 rounded-full" style={{ background: c.color }} />}
                  {c.label}
                </button>
              );
            })}
          </div>
        </div>

        <div role="search" className="relative w-full lg:max-w-sm">
          <label htmlFor={searchId} className="mb-2 block text-sm font-semibold text-ink-2">
            {labels.search}
          </label>
          <Search aria-hidden="true" className="pointer-events-none absolute bottom-3.5 left-4 size-5 text-ink-3" strokeWidth={1.8} />
          <input
            id={searchId}
            type="search"
            value={query}
            onChange={(e) => update({ query: e.target.value })}
            placeholder={labels.searchPlaceholder}
            autoComplete="off"
            className="h-12 w-full rounded-full border border-line bg-surface pl-12 pr-12 text-ink placeholder:text-ink-3 focus:border-primary-ink focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-ink [&::-webkit-search-cancel-button]:hidden"
          />
          {query && (
            <button
              type="button"
              onClick={() => update({ query: "" })}
              aria-label={labels.clear}
              className="absolute bottom-0.5 right-1 grid size-11 place-items-center rounded-full text-ink-3 hover:text-ink"
            >
              <X className="size-4" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>

      <p aria-live="polite" className="mt-6 text-sm text-ink-3">
        {labels.count.replace("{shown}", String(shown.length)).replace("{total}", String(results.length))}
      </p>

      {results.length === 0 ? (
        <div className="mt-8 flex flex-col items-start gap-5 rounded-[28px] border border-dashed border-line px-6 py-12 sm:flex-row sm:items-center sm:px-10">
          <svg viewBox="0 0 64 64" aria-hidden="true" className="size-16 shrink-0 text-ring">
            {/* the ring with a missing segment */}
            <path d={arcPath(32, 32, 26, RING_START, 180)} fill="none" stroke="currentColor" strokeWidth="2" />
            <path d={arcPath(32, 32, 26, 214, RING_END)} fill="none" stroke="currentColor" strokeWidth="2" />
          </svg>
          <div>
            <p className="text-lg text-ink">{t("noResults")}</p>
            <button
              type="button"
              onClick={() => update({ cat: "all", query: "" })}
              className="mt-3 min-h-11 font-semibold text-primary-ink underline decoration-line decoration-2 underline-offset-[6px] hover:decoration-primary-ink"
            >
              {labels.reset}
            </button>
          </div>
        </div>
      ) : (
        <ol className="mt-4 border-t border-line">
          {shown.map((n, i) => (
            <li key={n.slug} className="group relative grid grid-cols-[1fr_96px] gap-5 border-b border-line py-7 sm:grid-cols-[1fr_200px] sm:gap-8 lg:grid-cols-[112px_1fr_300px] lg:gap-10 lg:py-9">
              <p className="hidden lg:block" aria-hidden="true">
                <span className="block font-display text-5xl leading-none tracking-tight text-ink">{n.day}</span>
                <span className="mt-2 block text-sm text-ink-3">
                  {n.month} {n.year}
                </span>
              </p>
              <div className="min-w-0">
                <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ink-3">
                  <span className="inline-flex items-center gap-2 font-semibold text-ink-2">
                    <span aria-hidden="true" className="size-2 rounded-full" style={{ background: n.color }} />
                    {n.categoryLabel}
                  </span>
                  <time dateTime={n.date} className="lg:sr-only">
                    {n.dateLabel}
                  </time>
                  <span>
                    {n.minutes} {t("minutes")}
                  </span>
                </p>
                <h3 className="mt-3 text-lg leading-snug sm:text-display-s">
                  <Link
                    href={n.href}
                    ref={(el) => {
                      linkRefs.current[i] = el;
                    }}
                    className="decoration-2 underline-offset-[6px] after:absolute after:inset-0 after:content-[''] group-hover:underline"
                  >
                    {n.title}
                  </Link>
                </h3>
                <p className="mt-3 line-clamp-2 max-w-[62ch] text-ink-2 max-sm:hidden">{n.excerpt}</p>
              </div>
              <Photo
                slot={n.image}
                sizes="(min-width: 1024px) 300px, (min-width: 640px) 200px, 96px"
                className="aspect-square rounded-2xl sm:aspect-[3/2] sm:rounded-[20px]"
                imgClassName="transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                decorative
              />
            </li>
          ))}
        </ol>
      )}

      {visible < results.length && (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={loadMore}
            className="inline-flex min-h-12 items-center gap-3 rounded-full border border-ink/15 px-7 text-[15px] font-semibold text-ink transition-colors hover:border-primary-ink hover:text-primary-ink dark:border-white/20"
          >
            {t("loadMore")}
            <span className="text-ink-3">+{Math.min(PAGE, results.length - visible)}</span>
          </button>
        </div>
      )}
    </section>
  );
}
