"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import { directions } from "@/data/home";
import { images } from "@/lib/images";
import { cn, pick } from "@/lib/utils";
import { Link } from "@/i18n/navigation";
import { Photo } from "@/components/ui/Photo";

const photo = { english: images.english.reading, chinese: images.chinese.calligraphy };

/** Split screen English | Chinese. Hover (or focus) expands a side to 60/40 and reveals its accent, photo and points. */
export function Directions() {
  const locale = useLocale();
  const [active, setActive] = useState<string | null>(null);

  return (
    <section id="yonalishlar" aria-labelledby="directions-title" className="scroll-mt-24 py-24 lg:py-32">
      <div className="container-x">
        <h2 id="directions-title" className="text-display-l text-ink">
          {pick(directions.title, locale)}
        </h2>
      </div>

      <div className="container-x mt-12">
        <div className="flex flex-col gap-3 lg:h-[640px] lg:flex-row" onPointerLeave={() => setActive(null)}>
          {directions.items.map((d) => {
            const on = active === d.id;
            const grow = active === null ? 1 : on ? 1.5 : 1;
            return (
              <motion.article
                key={d.id}
                style={{ flexGrow: grow }}
                animate={{ flexGrow: grow }}
                transition={{ type: "spring", stiffness: 160, damping: 26 }}
                onPointerEnter={(e) => e.pointerType === "mouse" && setActive(d.id)}
                onFocusCapture={() => setActive(d.id)}
                className="group relative isolate flex min-h-[520px] basis-0 flex-col justify-end overflow-hidden rounded-[28px] bg-[#0b1a33] text-white lg:min-h-0"
              >
                <Photo
                  slot={photo[d.id as keyof typeof photo]}
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  className="absolute inset-0 -z-10"
                  imgClassName={cn("transition-[transform,filter] duration-700 ease-out", on ? "scale-105 grayscale-0" : "grayscale-[0.55]")}
                />
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#07152b] via-[#07152b]/70 to-[#07152b]/20" />
                <span
                  aria-hidden="true"
                  lang={d.id === "chinese" ? "zh" : "en"}
                  className="absolute right-6 top-4 font-display text-[clamp(5rem,3rem+8vw,11rem)] font-medium leading-none text-white/15 transition-colors duration-500 group-hover:text-white/25"
                >
                  {d.glyph}
                </span>

                <div className="p-7 sm:p-10">
                  <span aria-hidden="true" className="mb-6 block h-[3px] w-12 rounded-full transition-[width] duration-500 group-hover:w-24" style={{ background: d.accent }} />
                  <h3 className="text-display-m text-white">{pick(d.title, locale)}</h3>
                  <p className="mt-3 max-w-[44ch] text-lg text-white/85">{pick(d.lead, locale)}</p>
                  <ul className={cn("mt-6 grid gap-2 transition-[opacity,transform] duration-500 lg:max-h-40", active !== null && !on ? "lg:opacity-0 lg:translate-y-2" : "opacity-100")}>
                    {pick(d.points, locale).map((pt) => (
                      <li key={pt} className="flex items-center gap-3 text-[15px] text-white/90">
                        <span aria-hidden="true" className="size-1.5 rounded-full" style={{ background: d.accent }} />
                        {pt}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={d.href}
                    className="mt-8 inline-flex min-h-12 items-center rounded-full bg-white px-6 text-[15px] font-semibold text-[#0b1a33] transition-transform after:absolute after:inset-0 after:content-[''] active:scale-[0.98]"
                  >
                    {pick(directions.more, locale)}
                    <span className="sr-only">: {pick(d.title, locale)}</span>
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
