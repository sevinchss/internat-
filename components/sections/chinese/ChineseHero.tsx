import { useLocale } from "next-intl";
import { chineseCopy } from "@/data/chinese";
import { pick } from "@/lib/utils";
import { HanziXue } from "./HanziXue";

export function ChineseHero() {
  const locale = useLocale();
  const c = chineseCopy.hero;
  return (
    <section className="container-x pb-20 pt-32 lg:pb-28 lg:pt-36">
      <div className="grid grid-cols-1 items-end gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5 lg:pb-24">
          <h1 className="text-display-xl text-ink">{pick(c.title, locale)}</h1>
          <p className="mt-6 max-w-[46ch] text-body-l text-ink-2">{pick(c.lead, locale)}</p>
        </div>

        <figure className="mx-auto w-full max-w-[620px] lg:col-span-7 lg:mr-0">
          <HanziXue label={pick(c.charLabel, locale)} replayLabel={pick(c.replay, locale)} />
          <figcaption className="mt-6 flex flex-wrap items-baseline gap-x-5 gap-y-2">
            <span lang="zh-Latn-pinyin" className="font-display text-display-l text-ink">
              xué
            </span>
            <span className="text-body-l text-ink-2">— {pick(c.meaning, locale)}</span>
            <span className="ml-auto flex items-center gap-2 text-sm text-ink-3">
              <span aria-hidden="true" className="h-px w-6 bg-accent" />
              {pick(c.strokes, locale)}
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
