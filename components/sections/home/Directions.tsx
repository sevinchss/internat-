import { getLocale } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { directions, labels } from "@/data/home";
import { images } from "@/lib/images";
import { cn, pick } from "@/lib/utils";
import { Link } from "@/i18n/navigation";
import { Photo } from "@/components/ui/Photo";
import { SectionLabel } from "./SectionLabel";

const photo = { english: images.english.reading, chinese: images.chinese.calligraphy };

/**
 * English | Chinese as two staggered circle crops, each wrapped in a thin arc in its accent colour.
 * Hover / focus: the arc sweeps further round, the photo opens up (scale + colour), the arrow nudges.
 */
export async function Directions() {
  const locale = await getLocale();

  return (
    <section id="yonalishlar" aria-labelledby="directions-title" className="scroll-mt-24 overflow-x-clip py-28 lg:py-40">
      <div className="container-x">
        <SectionLabel n="03">{pick(labels.directions, locale)}</SectionLabel>
        <h2 id="directions-title" className="mt-6 max-w-[16ch] text-display-l text-ink">
          {pick(directions.title, locale)}
        </h2>

        <div className="mt-16 grid gap-20 md:grid-cols-2 md:gap-12 lg:mt-20 lg:gap-24">
          {directions.items.map((d, i) => (
            <article key={d.id} className={cn("group relative", i === 1 && "md:mt-44")}>
              <div className={cn("relative aspect-square w-[86%] max-w-[500px]", i === 1 && "ml-auto md:ml-0")}>
                {/* hairline orbit + accent arc that sweeps further on hover */}
                <svg viewBox="0 0 200 200" aria-hidden="true" className="absolute inset-0 size-full -rotate-[128deg] overflow-visible">
                  <circle cx="100" cy="100" r="99" fill="none" stroke="var(--line)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
                  <circle
                    cx="100"
                    cy="100"
                    r="99"
                    fill="none"
                    stroke={d.accent}
                    strokeWidth="2"
                    strokeLinecap="round"
                    pathLength={1}
                    vectorEffect="non-scaling-stroke"
                    className="transition-[stroke-dashoffset] duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] [stroke-dasharray:1] [stroke-dashoffset:0.86] group-focus-within:[stroke-dashoffset:0.42] group-hover:[stroke-dashoffset:0.42]"
                  />
                </svg>
                <Photo
                  slot={photo[d.id as keyof typeof photo]}
                  sizes="(min-width: 768px) 40vw, 80vw"
                  className="absolute inset-[5%] rounded-full"
                  imgClassName="transition-[transform,filter] duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] grayscale-[0.35] group-hover:scale-[1.06] group-hover:grayscale-0 group-focus-within:scale-[1.06] group-focus-within:grayscale-0"
                />
                {/* oversized outlined glyph, half outside the circle */}
                <span
                  aria-hidden="true"
                  lang={d.id === "chinese" ? "zh" : "en"}
                  className={cn(
                    "pointer-events-none absolute bottom-[-6%] select-none text-[clamp(5.5rem,3rem+9vw,11rem)] font-medium leading-none tracking-[-0.04em] text-transparent [-webkit-text-stroke:1px_var(--ink-3)] transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-2",
                    i === 0 ? "right-[-10%]" : "left-[-8%] md:right-[-10%] md:left-auto",
                  )}
                >
                  {d.glyph}
                </span>
              </div>

              <div className="mt-12 max-w-[460px]">
                <h3 className="text-display-m text-ink">{pick(d.title, locale)}</h3>
                <p className="mt-4 text-body-l text-ink-2">{pick(d.lead, locale)}</p>
                <ul className="mt-8 border-t border-line">
                  {pick(d.points, locale).map((pt) => (
                    <li key={pt} className="flex items-center gap-4 border-b border-line py-3 text-[15px] text-ink">
                      <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full" style={{ background: d.accent }} />
                      {pt}
                    </li>
                  ))}
                </ul>
                <Link
                  href={d.href}
                  className="mt-8 inline-flex min-h-11 items-center gap-3 text-[15px] font-medium text-ink after:absolute after:inset-0 after:content-['']"
                >
                  <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-500 group-hover:bg-[length:100%_1px]">
                    {pick(directions.more, locale)}
                  </span>
                  <span className="sr-only">: {pick(d.title, locale)}</span>
                  <span aria-hidden="true" className="grid size-10 place-items-center rounded-full border border-ink/15 transition-[transform,background-color,color,border-color] duration-500 group-hover:translate-x-1 group-hover:border-ink group-hover:bg-ink group-hover:text-paper">
                    <ArrowRight className="size-4" strokeWidth={1.7} />
                  </span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
