"use client";

import { useState } from "react";
import { Expand } from "lucide-react";
import { useLocale } from "next-intl";
import { Photo } from "@/components/ui/Photo";
import { Lightbox, type LightboxItem } from "@/components/ui/Lightbox";
import type { ImageSlot } from "@/lib/images";
import { cn, pick } from "@/lib/utils";

/** In-article photo set: first photo wide, the rest in a row; every tile opens the shared Lightbox. */
export function ArticleGallery({ slots, heading, openLabel }: { slots: ImageSlot[]; heading: string; openLabel: string }) {
  const locale = useLocale();
  const [index, setIndex] = useState<number | null>(null);
  const items: LightboxItem[] = slots.map((s) => ({ src: s.src, alt: pick(s.alt, locale), blurDataURL: s.blurDataURL }));

  return (
    <figure className="not-prose my-12">
      <figcaption className="mb-4 flex items-baseline justify-between gap-4">
        <span className="text-[15px] font-medium text-ink">{heading}</span>
        <span className="text-sm tabular-nums text-ink-3">{slots.length}</span>
      </figcaption>
      <ul className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
        {slots.map((s, i) => (
          <li key={s.src} className={cn("my-0! pl-0! before:hidden!", i === 0 && "col-span-2 sm:col-span-3")}>
            <button
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`${openLabel}: ${items[i].alt} (${i + 1}/${slots.length})`}
              className="group relative block w-full overflow-hidden rounded-[4px]"
            >
              <Photo
                slot={s}
                sizes={i === 0 ? "(min-width: 1024px) 720px, 100vw" : "(min-width: 1024px) 240px, 50vw"}
                className={i === 0 ? "aspect-[16/9]" : "aspect-[4/3]"}
                imgClassName="transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                decorative
              />
              <span
                aria-hidden="true"
                className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-[#07152b]/55 text-white opacity-100 backdrop-blur transition-opacity sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-visible:opacity-100"
              >
                <Expand className="size-4" strokeWidth={1.8} />
              </span>
            </button>
          </li>
        ))}
      </ul>
      <Lightbox items={items} index={index} onClose={() => setIndex(null)} onIndex={setIndex} />
    </figure>
  );
}
