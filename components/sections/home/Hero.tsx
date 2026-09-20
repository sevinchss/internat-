"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { hero, heroSlides } from "@/data/home";
import { images } from "@/lib/images";
import { cn, pick } from "@/lib/utils";
import { useIntroDone } from "@/lib/useIntroDone";
import { Photo } from "@/components/ui/Photo";
import { ButtonLink, buttonClass } from "@/components/ui/Button";
import { RingArc } from "@/components/brand/Ring";

const ease = [0.16, 1, 0.3, 1] as const;
const COUNT = heroSlides.length;
const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Home hero — text left, a photo stage anchored to the right edge of the screen.
 *
 * The stage moves through four real photos of the school. The advance is driven by the CSS animation of the
 * progress rule (`.hero-progress`, app/globals.css): no JS timer, so pausing on hover/focus and stopping off
 * screen is a single attribute, and reduced motion simply never starts it.
 */
export function Hero() {
  const locale = useLocale();
  const t = useTranslations("common");
  const reduce = useReducedMotion();
  const ready = useIntroDone();
  const play = ready || !!reduce;

  const ref = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [hold, setHold] = useState(false);
  const [inView, setInView] = useState(true);
  const [pinned, setPinned] = useState(false);

  const go = (n: number) => setIndex((i) => (i + n + COUNT) % COUNT);

  // The photo stage is only pinned to the right edge from lg up; below that it sits in the flow.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const sync = () => setPinned(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // The slider only runs while it is actually on screen.
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const running = play && !reduce && inView;

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const stageY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 90]);
  const ringRotate = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 26]);

  const active = heroSlides[index];

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden pt-[calc(var(--header-h)+28px)] pb-20 lg:flex lg:min-h-[100dvh] lg:flex-col lg:justify-center lg:pt-[calc(var(--header-h)+40px)] lg:pb-24"
    >
      <div className="container-x relative">
        <div className="lg:max-w-[47%]">
          {/* Text is visible immediately (it is the LCP element) — the stage carries the motion. */}
          <h1 className="text-display-xl text-ink">
            {hero.lines.map((line, li) => (
              <span key={li} className={cn("block", li === 1 && "font-light tracking-[-0.03em]")}>
                {pick(line, locale)}
                {li < hero.lines.length - 1 ? " " : null}
              </span>
            ))}
          </h1>

          <p className="text-body-l text-ink-2 mt-8 max-w-[54ch]">{pick(hero.lead, locale)}</p>

          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href="/qabul">{t("aboutAdmission")}</ButtonLink>
            <a href="#yonalishlar" className={buttonClass("outline")}>
              {t("directions")}
            </a>
          </div>

          {/* ── Photo stage ───────────────────────────────────────────────
              In flow on small screens; on lg it is pinned to the right edge of the viewport
              (right: 50% − 50vw measured from the centred container). */}
          <motion.div
            ref={stageRef}
            role="group"
            aria-roledescription="carousel"
            aria-label={pick(hero.title, locale)}
            onPointerEnter={() => setHold(true)}
            onPointerLeave={() => setHold(false)}
            onFocusCapture={() => setHold(true)}
            onBlurCapture={() => setHold(false)}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight") go(1);
              if (e.key === "ArrowLeft") go(-1);
            }}
            drag={reduce ? false : "x"}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.06}
            dragMomentum={false}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60) go(1);
              else if (info.offset.x > 60) go(-1);
            }}
            style={{ y: pinned ? stageY : 0 }}
            className="relative mt-14 aspect-[4/3] w-full touch-pan-y lg:absolute lg:top-1/2 lg:right-[calc(50%-50vw)] lg:mt-0 lg:aspect-auto lg:h-[min(74vh,700px)] lg:w-[min(49vw,780px)] lg:-translate-y-1/2"
          >
            {/* segmented brand arc behind the panel's left edge */}
            <motion.div
              style={{ rotate: ringRotate }}
              aria-hidden="true"
              className="text-ring pointer-events-none absolute top-1/2 -left-[22%] -z-10 aspect-square h-[128%] -translate-y-1/2"
            >
              <RingArc strokeWidth={1} className="size-full" />
            </motion.div>

            <motion.div
              className="bg-surface-2 ring-ink/5 relative size-full overflow-hidden rounded-[26px] shadow-[0_40px_90px_-48px_rgb(var(--shadow)/0.45)] ring-1 lg:rounded-l-[44px] lg:rounded-r-none"
              initial={false}
              animate={{ clipPath: play ? "inset(0% 0% 0% 0%)" : "inset(0% 0% 100% 0%)" }}
              transition={{ duration: 1.1, ease }}
            >
              {heroSlides.map((s, i) => (
                <motion.div
                  key={s.image}
                  aria-hidden={i !== index}
                  className="absolute inset-0"
                  initial={false}
                  animate={{ opacity: i === index ? 1 : 0 }}
                  transition={{ duration: 0.85, ease }}
                >
                  <Photo
                    slot={images.hero[s.image]}
                    priority={i === 0}
                    quality={75}
                    sizes="(min-width: 1024px) 49vw, 100vw"
                    className="size-full"
                    imgClassName={cn(
                      "origin-center transition-transform duration-[9s] ease-linear motion-reduce:transition-none",
                      i === index ? "scale-[1.06]" : "scale-100",
                    )}
                  />
                </motion.div>
              ))}

              {/* caption — describes the photo on screen */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4 lg:p-6">
                <div
                  aria-live="polite"
                  className="text-ink glass inline-flex max-w-full items-center rounded-full px-4 py-2 text-[13px] font-medium"
                >
                  <motion.span
                    key={active.image}
                    initial={reduce ? false : { opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, ease }}
                    className="truncate"
                  >
                    {pick(active.caption, locale)}
                  </motion.span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* ── Slider controls ───────────────────────────────────────── */}
          <div className="mt-6 flex items-center gap-5 lg:mt-12">
            <span className="text-ink text-[13px] font-medium tabular-nums">{pad(index + 1)}</span>

            <div className="flex flex-1 items-center gap-2">
              {heroSlides.map((s, i) => (
                <button
                  key={s.image}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={pick(s.caption, locale)}
                  aria-current={i === index}
                  className="group relative h-6 min-w-6 flex-1 cursor-pointer"
                >
                  <span className="bg-line group-hover:bg-ink-3 absolute inset-x-0 top-1/2 block h-px -translate-y-1/2 transition-colors" />
                  {i === index ? (
                    <span
                      key={index}
                      data-run={running ? "true" : "false"}
                      data-paused={hold ? "true" : "false"}
                      onAnimationEnd={() => go(1)}
                      className="hero-progress bg-primary absolute inset-x-0 top-1/2 block h-[2px] -translate-y-1/2"
                    />
                  ) : (
                    <span
                      className={cn(
                        "bg-ink absolute inset-x-0 top-1/2 block h-[2px] origin-left -translate-y-1/2 transition-transform duration-500",
                        i < index ? "scale-x-100" : "scale-x-0",
                      )}
                    />
                  )}
                </button>
              ))}
            </div>

            <span className="text-ink-3 text-[13px] tabular-nums">{pad(COUNT)}</span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label={t("prev")}
                className="border-ink/15 text-ink hover:bg-ink hover:text-paper flex size-11 cursor-pointer items-center justify-center rounded-full border transition-colors dark:border-white/20"
              >
                <ArrowLeft className="size-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label={t("next")}
                className="border-ink/15 text-ink hover:bg-ink hover:text-paper flex size-11 cursor-pointer items-center justify-center rounded-full border transition-colors dark:border-white/20"
              >
                <ArrowRight className="size-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        {/* three real facts: light numerals over hairlines */}
        <dl className="mt-14 grid max-w-[700px] sm:grid-cols-3 lg:mt-16 lg:max-w-[47%]">
          {hero.facts.map((f) => (
            <div
              key={f.value}
              className="border-line flex flex-row-reverse items-baseline justify-between gap-6 border-t py-4 sm:flex-col-reverse sm:items-start sm:justify-end sm:gap-2 sm:border-t-0 sm:border-l sm:py-1 sm:pl-6 sm:first:border-l-0 sm:first:pl-0"
            >
              <dt className="text-ink-2 max-w-[18ch] text-right text-[13px] leading-snug sm:text-left">
                {pick(f.label, locale)}
              </dt>
              <dd className="text-ink text-[clamp(1.75rem,1.3rem+1.4vw,2.6rem)] leading-none font-light tracking-[-0.04em] tabular-nums">
                {f.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
