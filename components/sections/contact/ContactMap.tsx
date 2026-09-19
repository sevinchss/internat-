import { ArrowUpRight } from "lucide-react";
import { school } from "@/lib/site";
import { MapPreview } from "@/components/ui/MapPreview";

/** Full-width map — a light preview until clicked, then the Google embed (see components/ui/MapPreview). */
export function ContactMap({
  title,
  openLabel,
  newTab,
  address,
}: {
  title: string;
  openLabel: string;
  newTab: string;
  address: string;
}) {
  return (
    <section aria-labelledby="map-title" className="container-x pb-20 lg:pb-32">
      <div aria-hidden="true" className="bg-line mb-14 h-px lg:mb-20" />
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 id="map-title" className="text-display-m">
            {title}
          </h2>
          <p className="text-ink-2 mt-2">{address}</p>
        </div>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${school.geo.lat},${school.geo.lng}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary-ink decoration-line hover:decoration-primary-ink inline-flex min-h-11 items-center gap-1.5 font-semibold underline decoration-2 underline-offset-[6px]"
        >
          {openLabel}
          <ArrowUpRight className="size-4" aria-hidden="true" />
          <span className="sr-only">({newTab})</span>
        </a>
      </div>
      <div className="frame mt-10 p-2 sm:p-3">
        <div className="bg-surface-2 relative aspect-[4/5] overflow-hidden rounded-[6px] sm:aspect-[16/9] lg:aspect-[21/8]">
          {/* TODO: replace with real coordinates (lib/site.ts → school.geo) */}
          <MapPreview title={`${title}: ${address}`} loadLabel={title} />
        </div>
      </div>
    </section>
  );
}
