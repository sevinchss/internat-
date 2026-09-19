import { galleryAlbums, galleryCopy as c, galleryPhotos } from "@/data/gallery";
import { images } from "@/lib/images";
import { pick } from "@/lib/utils";
import { HeroFan } from "./HeroFan";

export function GalleryHero({ locale }: { locale: string }) {
  return (
    <section aria-labelledby="gallery-title" className="relative overflow-hidden pb-12 pt-32 sm:pt-36 lg:pb-16 lg:pt-40">
      <div className="container-x grid items-end gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h1 id="gallery-title" className="text-display-xl">
            {pick(c.title, locale)}
          </h1>
          <p className="mt-6 max-w-[46ch] text-body-l text-ink-2">{pick(c.intro, locale)}</p>
          <p className="mt-8 flex flex-wrap items-baseline gap-x-8 gap-y-2 text-ink-2">
            <span>
              <span className="font-display text-display-s text-ink">{galleryPhotos.length}</span> {pick(c.photos, locale)}
            </span>
            <span>
              <span className="font-display text-display-s text-ink">{galleryAlbums.length}</span> {pick(c.albums, locale)}
            </span>
          </p>
          <p className="mt-6 max-w-[52ch] text-[14px] text-ink-3">{pick(c.placeholderNote, locale)}</p>
        </div>
        <div className="hidden lg:col-span-5 lg:block">
          <HeroFan slots={[images.dorm.studyHall, images.events.culture, images.classes.labKids]} />
        </div>
      </div>
    </section>
  );
}
