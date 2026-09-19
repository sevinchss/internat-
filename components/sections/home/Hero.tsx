"use client";

import { Fragment, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { hero } from "@/data/home";
import { images } from "@/lib/images";
import { pick } from "@/lib/utils";
import { useIntroDone } from "@/lib/useIntroDone";
import { Photo } from "@/components/ui/Photo";
import { ButtonLink, buttonClass } from "@/components/ui/Button";
import { RingArc } from "@/components/brand/Ring";

const ease = [0.16, 1, 0.3, 1] as const;

/** Home hero — continues the loader: the campus photo opens inside a large circle. The page's one orchestrated moment. */
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
  const ringRotate = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 24]);

  const words = pick(hero.title, locale).split(" ");

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden pt-[calc(var(--header-h)+24px)] pb-16 lg:min-h-[100dvh] lg:pt-[calc(var(--header-h)+56px)] lg:pb-24"
    >
      {/* Circle-masked campus photo, bleeding off the right edge */}
      <div className="relative mx-auto mb-10 w-[min(92vw,560px)] lg:absolute lg:top-[calc(var(--header-h)+8px)] lg:right-[-9vw] lg:mb-0 lg:w-[min(58vw,860px)] xl:right-[-6vw]">
        <motion.div style={{ rotate: ringRotate }} className="text-ring absolute -inset-[7%] -z-10">
          <RingArc strokeWidth={1.2} className="size-full" />
        </motion.div>
        <motion.div
          className="relative aspect-square overflow-hidden rounded-full"
          initial={false}
          animate={{ clipPath: play ? "circle(50% at 50% 50%)" : "circle(8% at 50% 50%)" }}
          transition={{ duration: 1.25, ease }}
          style={{ y: photoY }}
        >
          <motion.div className="absolute inset-0" style={{ scale: photoScale }}>
            <Photo
              slot={images.campus.hero}
              priority
              quality={75}
              sizes="(min-width: 1024px) 58vw, 92vw"
              className="size-full"
            />
          </motion.div>
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,transparent_45%,rgb(7_21_43/0.25))]" />
        </motion.div>
      </div>

      <div className="container-x relative">
        <div className="max-w-[640px] lg:max-w-[46%]">
          <h1 className="text-display-xl text-ink font-medium" aria-label={pick(hero.title, locale)}>
            {words.map((w, i) => (
              <Fragment key={i}>
                <span className="inline-block overflow-hidden pb-[0.08em] align-top" aria-hidden="true">
                  <motion.span
                    className="inline-block"
                    initial={false}
                    animate={play ? { y: "0%" } : { y: "105%" }}
                    transition={{ duration: 0.9, ease, delay: 0.25 + i * 0.06 }}
                  >
                    {w}
                  </motion.span>
                </span>
                {i < words.length - 1 ? " " : null}
              </Fragment>
            ))}
          </h1>
          <motion.div
            initial={false}
            animate={play ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.8, ease, delay: 0.7 }}
          >
            <p className="text-body-l text-ink-2 mt-7 max-w-[56ch]">{pick(hero.lead, locale)}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href="/qabul">{t("aboutAdmission")}</ButtonLink>
              <a href="#yonalishlar" className={buttonClass("outline")}>
                {t("directions")}
              </a>
            </div>
          </motion.div>
        </div>

        <motion.dl
          initial={false}
          animate={play ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.95 }}
          className="mt-14 flex max-w-[680px] flex-wrap gap-x-12 gap-y-6 border-t border-line pt-6 lg:mt-16"
        >
          {hero.facts.map((f) => (
            <div key={f.value} className="min-w-[7.5rem]">
              <dt className="sr-only">{pick(f.label, locale)}</dt>
              <dd className="font-display text-ink text-[clamp(1.35rem,1.1rem+0.9vw,1.9rem)] font-medium tracking-tight tabular-nums">
                {f.value}
              </dd>
              <dd className="text-ink-2 mt-1 text-sm leading-snug">{pick(f.label, locale)}</dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
