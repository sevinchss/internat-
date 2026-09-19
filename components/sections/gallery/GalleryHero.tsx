import { galleryAlbums, galleryCopy as c, galleryPhotos } from "@/data/gallery";
import { images } from "@/lib/images";
import { pick } from "@/lib/utils";
import { HeroStrip } from "./HeroStrip";

export function GalleryHero({ locale }: { locale: string }) {
  return (
    <section aria-labelledby="gallery-title" className="relative pt-32 pb-16 sm:pt-36 lg:pt-44 lg:pb-24">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <h1 id="gallery-title" className="text-display-xl">
              {pick(c.title, locale)}
            </h1>
            <p className="text-body-l text-ink-2 mt-6 max-w-[46ch]">{pick(c.intro, locale)}</p>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <div className="flex gap-10">
              <p>
                <span className="text-ink block text-[clamp(2.4rem,1.8rem+2vw,3.6rem)] leading-none font-light tracking-[-0.05em] tabular-nums">
                  {galleryPhotos.length}
                </span>{" "}
                <span className="text-ink-3 mt-2 block text-[14px]">{pick(c.photos, locale)}</span>
              </p>
              <p>
                <span className="text-ink block text-[clamp(2.4rem,1.8rem+2vw,3.6rem)] leading-none font-light tracking-[-0.05em] tabular-nums">
                  {galleryAlbums.length}
                </span>{" "}
                <span className="text-ink-3 mt-2 block text-[14px]">{pick(c.albums, locale)}</span>
              </p>
            </div>
            <p className="text-ink-3 mt-6 max-w-[44ch] text-[14px]">{pick(c.placeholderNote, locale)}</p>
          </div>
        </div>

        <div className="mt-12 lg:mt-16">
          <HeroStrip
            slots={[
              images.classes.labKids,
              images.events.culture,
              images.campus.entrance,
              images.dorm.studyHall,
              images.sport.chessGirl,
            ]}
          />
        </div>
      </div>
    </section>
  );
}
