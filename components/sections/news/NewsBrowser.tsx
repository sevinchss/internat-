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

  const chips: { id: NewsCategory | "all"; label: string; color?: string }[] = [
    { id: "all", label: t("all") },
    ...categories,
  ];

  return (
    <section aria-labelledby={headingId} className="container-x pb-24 lg:pb-32">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 id={headingId} className="text-display-m">
            {labels.heading}
          </h2>
          <div
            role="group"
            aria-label={labels.filter}
            className="no-scrollbar -mx-4 mt-6 flex gap-6 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:gap-x-8 sm:px-0"
          >
            {chips.map((c) => {
              const active = cat === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => update({ cat: c.id })}
                  className={cn(
                    "group/chip relative inline-flex min-h-11 shrink-0 items-center text-[15px] font-medium transition-colors",
                    active ? "text-ink" : "text-ink-3 hover:text-ink",
                  )}
                >
                  {c.label}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute inset-x-0 bottom-1 h-px origin-left transition-transform duration-500 ease-out motion-reduce:transition-none",
                      active ? "scale-x-100" : "scale-x-0 group-hover/chip:scale-x-100",
                    )}
                    style={{ background: c.color ?? "var(--ink)" }}
                  />
                </button>
              );
            })}
          </div>
        </div>

        <div role="search" className="relative w-full lg:max-w-sm">
          <label htmlFor={searchId} className="text-ink-2 mb-2 block text-sm font-semibold">
            {labels.search}
          </label>
          <Search
            aria-hidden="true"
            className="text-ink-3 pointer-events-none absolute bottom-3.5 left-0 size-5"
            strokeWidth={1.6}
          />
          <input
            id={searchId}
            type="search"
            value={query}
            onChange={(e) => update({ query: e.target.value })}
            placeholder={labels.searchPlaceholder}
            autoComplete="off"
            className="border-line text-ink placeholder:text-ink-3 hover:border-ink-3 focus:border-primary-ink focus-visible:outline-primary-ink h-12 w-full rounded-none border-0 border-b bg-transparent pr-12 pl-8 transition-colors focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-4 [&::-webkit-search-cancel-button]:hidden"
          />
          {query && (
            <button
              type="button"
              onClick={() => update({ query: "" })}
              aria-label={labels.clear}
              className="text-ink-3 hover:text-ink absolute right-0 bottom-0.5 grid size-11 place-items-center rounded-full"
            >
              <X className="size-4" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>

      <p aria-live="polite" className="text-ink-3 mt-10 text-sm">
        {labels.count.replace("{shown}", String(shown.length)).replace("{total}", String(results.length))}
      </p>

      {results.length === 0 ? (
        <div className="frame mt-8 flex flex-col items-start gap-5 px-6 py-12 sm:flex-row sm:items-center sm:px-10">
          <svg viewBox="0 0 64 64" aria-hidden="true" className="text-ring size-16 shrink-0">
            {/* the ring with a missing segment */}
            <path d={arcPath(32, 32, 26, RING_START, 180)} fill="none" stroke="currentColor" strokeWidth="2" />
            <path d={arcPath(32, 32, 26, 214, RING_END)} fill="none" stroke="currentColor" strokeWidth="2" />
          </svg>
          <div>
            <p className="text-ink text-lg">{t("noResults")}</p>
            <button
              type="button"
              onClick={() => update({ cat: "all", query: "" })}
              className="text-primary-ink decoration-line hover:decoration-primary-ink mt-3 min-h-11 font-semibold underline decoration-2 underline-offset-[6px]"
            >
              {labels.reset}
            </button>
          </div>
        </div>
      ) : (
        <ol className="border-line mt-4 border-t">
          {shown.map((n, i) => (
            <li
              key={n.slug}
              className="group border-line relative grid grid-cols-[1fr_96px] gap-5 border-b py-7 sm:grid-cols-[1fr_200px] sm:gap-8 lg:grid-cols-[112px_1fr_300px] lg:gap-10 lg:py-9"
            >
              <p className="hidden lg:block" aria-hidden="true">
                <span className="text-ink block text-[3.5rem] leading-none font-light tracking-[-0.05em] tabular-nums">
                  {n.day}
                </span>
                <span className="text-ink-3 mt-2 block text-sm">
                  {n.month} {n.year}
                </span>
              </p>
              <div className="min-w-0">
                <p className="text-ink-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                  <span className="text-ink-2 inline-flex items-center gap-2 font-medium">
                    <span aria-hidden="true" className="size-1.5 rounded-full" style={{ background: n.color }} />
                    {n.categoryLabel}
                  </span>
                  <time dateTime={n.date} className="lg:sr-only">
                    {n.dateLabel}
                  </time>
                  <span>
                    {n.minutes} {t("minutes")}
                  </span>
                </p>
                <h3 className="sm:text-display-s mt-3 text-lg leading-snug">
                  <Link
                    href={n.href}
                    ref={(el) => {
                      linkRefs.current[i] = el;
                    }}
                    className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 ease-out group-hover:bg-[length:100%_1px] after:absolute after:inset-0 after:content-[''] motion-reduce:transition-none"
                  >
                    {n.title}
                  </Link>
                </h3>
                <p className="text-ink-2 mt-3 line-clamp-2 max-w-[62ch] max-sm:hidden">{n.excerpt}</p>
              </div>
              <Photo
                slot={n.image}
                sizes="(min-width: 1024px) 300px, (min-width: 640px) 200px, 96px"
                className="aspect-square rounded-full sm:aspect-[3/2] sm:rounded-[4px]"
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
            className="border-line text-ink hover:border-ink inline-flex min-h-12 items-center gap-3 rounded-full border px-7 text-[15px] font-semibold transition-colors"
          >
            {t("loadMore")}
            <span className="text-ink-3">+{Math.min(PAGE, results.length - visible)}</span>
          </button>
        </div>
      )}
    </section>
  );
}
