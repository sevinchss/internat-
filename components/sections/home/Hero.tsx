"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { hero, heroSlides } from "@/data/home";
import { images } from "@/lib/images";
import { school } from "@/lib/site";
import { cn, pick } from "@/lib/utils";
import { useIntroDone } from "@/lib/useIntroDone";
import { Photo } from "@/components/ui/Photo";
import { ButtonLink, buttonClass } from "@/components/ui/Button";

const COUNT = heroSlides.length;
const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Home hero — one full-bleed slider under the header.
 *
 * Four real photos of the school; the new one wipes in over the old one from the side, so the screen never
 * goes empty between slides. The text sits over the top of the photo: small, on a scrim.
 *
 * The advance is driven by the CSS animation of the progress rule (`.hero-progress`, app/globals.css): no JS
 * timer, so "pause while someone is using the controls" and "stop off screen" are one attribute each, and
 * reduced motion simply never starts it.
 */
export function Hero() {
  const locale = useLocale();
  const t = useTranslations("common");
  const reduce = useReducedMotion();
  const ready = useIntroDone();
  const play = ready || !!reduce;

  const ref = useRef<HTMLElement>(null);
  const [{ index, prev, dir }, setSlide] = useState({ index: 0, prev: 0, dir: 1 });
  const [hold, setHold] = useState(false);
  const [inView, setInView] = useState(true);
  const [visible, setVisible] = useState(true);

  const go = (n: number) =>
    setSlide((s) => ({ index: (s.index + n + COUNT) % COUNT, prev: s.index, dir: n >= 0 ? 1 : -1 }));
  const jump = (to: number) =>
    setSlide((s) => (to === s.index ? s : { index: to, prev: s.index, dir: to > s.index ? 1 : -1 }));

  useEffect(() => {
    const sync = () => setVisible(document.visibilityState === "visible");
    sync();
    document.addEventListener("visibilitychange", sync);
    return () => document.removeEventListener("visibilitychange", sync);
  }, []);

  // The slider only runs while it is actually on screen.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const running = play && !reduce && inView && visible;

  // The photo drifts slower than the page, and the text leaves before the photo does.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const photoY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 140]);
  const textY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -40]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.55], reduce ? [1, 1] : [1, 0]);

  // A hidden slide is clipped away on the side it came from — invisible either way, so flipping direction
  // mid-run costs nothing.
  const hidden = dir > 0 ? "inset(0% 0% 0% 100%)" : "inset(0% 100% 0% 0%)";

  // swipe, without dragging the photo around
  const startX = useRef<number | null>(null);

  const active = heroSlides[index];

  return (
    <section
      ref={ref}
      aria-roledescription="carousel"
      aria-label={pick(hero.title, locale)}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(1);
        if (e.key === "ArrowLeft") go(-1);
      }}
      onPointerDown={(e) => {
        startX.current = e.clientX;
      }}
      onPointerUp={(e) => {
        const dx = e.clientX - (startX.current ?? e.clientX);
        startX.current = null;
        if (Math.abs(dx) > 56) go(dx < 0 ? 1 : -1);
      }}
      className="relative isolate h-[88svh] min-h-[600px] w-full overflow-hidden pt-[var(--header-h)] lg:h-[100dvh]"
    >
      {/* ── Photos ──────────────────────────────────────────────────── */}
      <div className="absolute inset-x-0 top-[var(--header-h)] bottom-0 z-0 overflow-hidden">
        <motion.div className="absolute inset-x-0 -top-[170px] -bottom-[170px]" style={{ y: photoY }}>
          {heroSlides.map((s, i) => (
            <div
              key={s.image}
              aria-hidden={i !== index}
              className="ease-out-expo absolute inset-0 transition-[clip-path] duration-[1050ms] motion-reduce:transition-none"
              style={{
                zIndex: i === index ? 3 : i === prev ? 2 : 1,
                clipPath: i === index || i === prev ? "inset(0% 0% 0% 0%)" : hidden,
              }}
            >
              <Photo
                slot={images.hero[s.image]}
                priority={i === 0}
                quality={75}
                sizes="100vw"
                className="size-full"
                imgClassName={cn(
                  "origin-center transition-transform duration-[9s] ease-linear motion-reduce:transition-none",
                  i === index ? "scale-[1.07]" : "scale-100",
                )}
              />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scrim: strong at the top for the text, again at the bottom for the numbers and controls. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[var(--header-h)] bottom-0 z-[1] bg-[linear-gradient(to_bottom,rgb(4_18_42/0.86)_0%,rgb(4_18_42/0.55)_30%,rgb(4_18_42/0.34)_55%,rgb(4_18_42/0.78)_100%),linear-gradient(to_right,rgb(4_18_42/0.5)_0%,rgb(4_18_42/0.12)_42%,transparent_70%)]"
      />

      {/* ── Content ─────────────────────────────────────────────────── */}
      <div className="container-x relative z-[2] flex h-full flex-col justify-between py-8 lg:py-12">
        <motion.div
          data-play={play ? "true" : "false"}
          style={{ y: textY, opacity: textOpacity }}
          className="max-w-[44rem]"
        >
          <p
            className="hero-in flex items-center gap-3 text-[13px] font-medium text-white/70"
            style={{ animationDelay: "0.1s" }}
          >
            <span aria-hidden="true" className="h-px w-8 bg-white/40" />
            {pick(school.name, locale)}
          </p>

          <h1 className="mt-4 text-[clamp(1.6rem,1.05rem+1.9vw,2.9rem)] leading-[1.1] text-white">
            {hero.lines.map((line, li) => (
              <span key={li} className={cn("block", li === 1 && "font-light tracking-[-0.03em] text-white/85")}>
                {pick(line, locale)}
                {li < hero.lines.length - 1 ? " " : null}
              </span>
            ))}
          </h1>

          <p className="mt-5 hidden max-w-[52ch] text-[15px] leading-relaxed text-white/75 sm:block">
            {pick(hero.lead, locale)}
          </p>

          <div className="hero-in mt-7 flex flex-wrap gap-3" style={{ animationDelay: "0.3s" }}>
            <ButtonLink href="/qabul" variant="light">
              {t("aboutAdmission")}
            </ButtonLink>
            <a
              href="#yonalishlar"
              className={buttonClass(
                "outline",
                "hover:text-navy border-white/35 text-white before:bg-white hover:border-white",
              )}
            >
              {t("directions")}
            </a>
          </div>
        </motion.div>

        {/* ── Bottom row: the real numbers, then the slider controls ── */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between sm:gap-10">
          <dl className="flex flex-wrap items-end gap-x-6 gap-y-3 sm:gap-x-9">
            {hero.facts.map((f) => (
              <div key={f.value} className="sm:border-l sm:border-white/25 sm:pl-5 sm:first:border-l-0 sm:first:pl-0">
                <dd className="text-[clamp(1.35rem,1.1rem+0.9vw,2rem)] leading-none font-light tracking-[-0.04em] text-white tabular-nums">
                  {f.value}
                </dd>
                <dt className="mt-1.5 max-w-[18ch] text-[12px] leading-snug text-white/65">{pick(f.label, locale)}</dt>
              </div>
            ))}
          </dl>

          <div
            onPointerEnter={() => setHold(true)}
            onPointerLeave={() => setHold(false)}
            onFocusCapture={() => setHold(true)}
            onBlurCapture={() => setHold(false)}
            className="flex shrink-0 flex-col items-start gap-3 sm:items-end"
          >
            <p aria-live="polite" className="text-[12px] text-white/60">
              <span key={active.image} className="hero-fade block">
                {pick(active.caption, locale)}
              </span>
            </p>

            <div className="flex items-center gap-4">
              <span className="text-[13px] font-medium text-white tabular-nums">{pad(index + 1)}</span>

              <div className="flex items-center gap-2">
                {heroSlides.map((s, i) => (
                  <button
                    key={s.image}
                    type="button"
                    onClick={() => jump(i)}
                    aria-label={pick(s.caption, locale)}
                    aria-current={i === index}
                    className="group relative h-6 w-10 cursor-pointer sm:w-14"
                  >
                    <span className="absolute inset-x-0 top-1/2 block h-px -translate-y-1/2 bg-white/30 transition-colors group-hover:bg-white/60" />
                    {i === index ? (
                      <span
                        key={index}
                        data-run={running ? "true" : "false"}
                        data-paused={hold ? "true" : "false"}
                        onAnimationEnd={() => go(1)}
                        className="hero-progress absolute inset-x-0 top-1/2 block h-[2px] -translate-y-1/2 bg-white"
                      />
                    ) : (
                      <span
                        className={cn(
                          "absolute inset-x-0 top-1/2 block h-[2px] origin-left -translate-y-1/2 bg-white/80 transition-transform duration-500",
                          i < index ? "scale-x-100" : "scale-x-0",
                        )}
                      />
                    )}
                  </button>
                ))}
              </div>

              <span className="text-[13px] text-white/55 tabular-nums">{pad(COUNT)}</span>

              <div className="ml-1 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label={t("prev")}
                  className="hover:text-navy flex size-11 cursor-pointer items-center justify-center rounded-full border border-white/35 text-white transition-colors hover:bg-white"
                >
                  <ArrowLeft className="size-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label={t("next")}
                  className="hover:text-navy flex size-11 cursor-pointer items-center justify-center rounded-full border border-white/35 text-white transition-colors hover:bg-white"
                >
                  <ArrowRight className="size-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
