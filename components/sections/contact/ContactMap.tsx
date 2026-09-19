import { ArrowUpRight } from "lucide-react";
import { mapEmbedSrc, school } from "@/lib/site";

/** Full-width embedded map; dark mode uses the same inverted treatment as the footer map. */
export function ContactMap({ title, openLabel, newTab, address }: { title: string; openLabel: string; newTab: string; address: string }) {
  return (
    <section aria-labelledby="map-title" className="container-x pb-20 lg:pb-32">
      <div aria-hidden="true" className="mb-14 h-px bg-line lg:mb-20" />
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 id="map-title" className="text-display-m">
            {title}
          </h2>
          <p className="mt-2 text-ink-2">{address}</p>
        </div>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${school.geo.lat},${school.geo.lng}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center gap-1.5 font-semibold text-primary-ink underline decoration-line decoration-2 underline-offset-[6px] hover:decoration-primary-ink"
        >
          {openLabel}
          <ArrowUpRight className="size-4" aria-hidden="true" />
          <span className="sr-only">({newTab})</span>
        </a>
      </div>
      <div className="frame mt-10 p-2 sm:p-3">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[6px] bg-surface-2 sm:aspect-[16/9] lg:aspect-[21/8]">
        {/* TODO: replace with real coordinates (lib/site.ts → school.geo) */}
        <iframe
          src={mapEmbedSrc}
          title={`${title}: ${address}`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 h-full w-full grayscale-[0.6] dark:opacity-80 dark:invert-[0.9] dark:hue-rotate-180"
        />
        </div>
      </div>
    </section>
  );
}
