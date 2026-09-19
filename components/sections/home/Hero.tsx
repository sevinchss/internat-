"use client";

import { Fragment, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { hero } from "@/data/home";
import { images } from "@/lib/images";
import { cn, pick } from "@/lib/utils";
import { useIntroDone } from "@/lib/useIntroDone";
import { Photo } from "@/components/ui/Photo";
import { ButtonLink, buttonClass } from "@/components/ui/Button";
import { RingArc } from "@/components/brand/Ring";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Home hero — continues the loader: the campus photo opens inside a large circle, a thin orbit draws around it
 * and a small dot starts to travel along it. The page's one orchestrated moment (plays after the intro).
 */
export function Hero() {
  const locale = useLocale();
  const t = useTranslations("common");
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const ready = useIntroDone();
  const play = ready || !!reduce;

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const photoY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 120]);
  const photoScale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1.04, 1.16]);
  const ringRotate = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 30]);

  // word index offset per line, for one continuous stagger across both lines
  const offsets = [0, pick(hero.lines[0], locale).split(" ").length];

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden pb-20 pt-[calc(var(--header-h)+28px)] lg:flex lg:min-h-[100dvh] lg:flex-col lg:justify-center lg:pb-24 lg:pt-[calc(var(--header-h)+40px)]"
    >
      {/* Circle-masked campus photo with its orbit, bleeding off the right edge */}
      <div className="relative mx-auto mb-12 w-[min(78vw,520px)] lg:absolute lg:right-[-8vw] lg:top-1/2 lg:mb-0 lg:w-[min(54vw,820px)] lg:-translate-y-[44%] xl:right-[-5vw]">
        {/* outer segmented arc — turns slowly with scroll */}
        <motion.div style={{ rotate: ringRotate }} className="absolute -inset-[13%] -z-10 text-ring">
          <RingArc strokeWidth={1} className="size-full" />
        </motion.div>

        {/* thin orbit that draws itself, with a small travelling dot */}
        <div aria-hidden="true" className="absolute -inset-[5.5%] -z-10">
          <svg viewBox="0 0 200 200" className="size-full -rotate-90 overflow-visible">
            <motion.circle
              cx="100"
              cy="100"
              r="99.5"
              fill="none"
              stroke="var(--ring)"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              initial={false}
              animate={{ pathLength: play ? 1 : 0 }}
              transition={{ duration: 1.8, ease, delay: 0.35 }}
            />
          </svg>
          <motion.div
            className="absolute inset-0"
            initial={false}
            animate={{ opacity: play ? 1 : 0 }}
            transition={{ duration: 0.6, delay: 1.9 }}
          >
            <div className={cn("absolute inset-0", !reduce && "animate-[spin_46s_linear_infinite]")}>
              <span className="absolute left-1/2 top-0 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary ring-[5px] ring-paper" />
            </div>
            <div className={cn("absolute inset-[3%]", !reduce && "animate-[spin_70s_linear_infinite_reverse]")}>
              <span className="absolute bottom-0 left-1/2 size-1.5 -translate-x-1/2 translate-y-1/2 rounded-full bg-amber" />
            </div>
          </motion.div>
        </div>

        <motion.div
          className="relative aspect-square overflow-hidden rounded-full"
          initial={false}
          animate={{ clipPath: play ? "circle(50% at 50% 50%)" : "circle(8% at 50% 50%)" }}
          transition={{ duration: 1.25, ease }}
          style={{ y: photoY }}
        >
          <motion.div className="absolute inset-0" style={{ scale: photoScale }}>
            <Photo slot={images.campus.hero} priority quality={75} sizes="(min-width: 1024px) 54vw, 78vw" className="size-full" />
          </motion.div>
        </motion.div>
      </div>

      <div className="container-x relative">
        <div className="max-w-[640px] lg:max-w-[48%]">
          <h1 className="text-display-xl text-ink" aria-label={pick(hero.title, locale)}>
            {hero.lines.map((line, li) => (
              <span key={li} aria-hidden="true" className={cn("block", li === 1 && "font-light tracking-[-0.03em]")}>
                {pick(line, locale)
                  .split(" ")
                  .map((word, i, arr) => {
                    const idx = offsets[li] + i;
                    return (
                      <Fragment key={i}>
                        <span className="inline-block overflow-hidden pb-[0.1em] align-top">
                          <motion.span
                            className="inline-block"
                            initial={false}
                            animate={play ? { y: "0%" } : { y: "108%" }}
                            transition={{ duration: 0.95, ease, delay: 0.2 + idx * 0.055 }}
                          >
                            {word}
                          </motion.span>
                        </span>
                        {i < arr.length - 1 ? " " : null}
                      </Fragment>
                    );
                  })}
              </span>
            ))}
          </h1>

          <motion.div
            initial={false}
            animate={play ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
            transition={{ duration: 0.8, ease, delay: 0.75 }}
          >
            <p className="mt-8 max-w-[54ch] text-body-l text-ink-2">{pick(hero.lead, locale)}</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href="/qabul">{t("aboutAdmission")}</ButtonLink>
              <a href="#yonalishlar" className={buttonClass("outline")}>
                {t("directions")}
              </a>
            </div>
          </motion.div>
        </div>

        {/* three real facts: light numerals over hairlines */}
        <motion.dl
          initial={false}
          animate={play ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.9, delay: 1.05 }}
          className="mt-16 grid max-w-[700px] sm:grid-cols-3 lg:mt-20"
        >
          {hero.facts.map((f) => (
            <div
              key={f.value}
              className="flex flex-row-reverse items-baseline justify-between gap-6 border-t border-line py-4 sm:flex-col-reverse sm:items-start sm:justify-end sm:gap-2 sm:border-l sm:border-t-0 sm:py-1 sm:pl-6 sm:first:border-l-0 sm:first:pl-0"
            >
              <dt className="max-w-[18ch] text-right text-[13px] leading-snug text-ink-2 sm:text-left">
                {pick(f.label, locale)}
              </dt>
              <dd className="text-[clamp(1.75rem,1.3rem+1.4vw,2.6rem)] font-light leading-none tracking-[-0.04em] text-ink tabular-nums">
                {f.value}
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
