"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useAnimationFrame, useInView, useMotionValue, useReducedMotion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { images, type ImageSlot } from "@/lib/images";
import { ArrowRight } from "lucide-react";
import { labels, strip } from "@/data/home";
import { pick } from "@/lib/utils";
import { Link } from "@/i18n/navigation";
import { Photo } from "@/components/ui/Photo";
import { SectionLabel } from "./SectionLabel";

const photos: ImageSlot[] = [
  images.classes.labKids,
  images.sport.chessLibrary,
  images.chinese.calligraphy,
  images.events.culture,
  images.campus.library,
  images.classes.robot,
  images.dorm.studyHall,
  images.sport.football,
  images.english.reading,
  images.events.choir,
  images.heritage.dome,
  images.classes.teamwork,
  images.chinese.teaPour,
  images.events.debate,
];

const SPEED = 38; // px per second

/** Infinite, draggable marquee → Fotogalereya. Pauses on hover/focus; no auto-scroll under reduced motion. */
export function PhotoStrip() {
  const locale = useLocale();
  const t = useTranslations("common");
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const track = useRef<HTMLUListElement>(null);
  const [paused, setPaused] = useState(false);
  const dragging = useRef(false);
  const moved = useRef(0);
  const half = useRef(0);
  const section = useRef<HTMLElement>(null);
  // only animate while on screen — no per-frame work for an invisible marquee
  const visible = useInView(section, { margin: "120px 0px" });

  useEffect(() => {
    const measure = () => (half.current = (track.current?.scrollWidth ?? 0) / 2);
    measure();
    const ro = new ResizeObserver(measure);
    if (track.current) ro.observe(track.current);
    return () => ro.disconnect();
  }, []);

  const wrap = (v: number) => {
    const h = half.current;
    if (!h) return v;
    if (v <= -h) return v + h;
    if (v > 0) return v - h;
    return v;
  };

  useAnimationFrame((_, delta) => {
    if (!visible || reduce || paused || dragging.current) return;
    x.set(wrap(x.get() - (SPEED * delta) / 1000));
  });

  return (
    <section ref={section} aria-labelledby="strip-title" className="overflow-hidden py-24 lg:py-32">
      <div className="container-x flex flex-wrap items-end justify-between gap-6">
        <div>
          <SectionLabel n="06">{pick(labels.strip, locale)}</SectionLabel>
          <h2 id="strip-title" className="text-display-m text-ink mt-6">
            {pick(strip.title, locale)}
          </h2>
        </div>
        <div className="flex items-center gap-6">
          <p className="text-ink-3 hidden text-sm sm:block" aria-hidden="true">
            {pick(strip.hint, locale)}
          </p>
          <Link
            href="/biz-haqimizda/fotogalereya"
            className="group text-ink inline-flex min-h-11 items-center gap-3 text-[15px] font-medium"
          >
            <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-500 group-hover:bg-[length:100%_1px]">
              {t("toGallery")}
            </span>
            <span
              aria-hidden="true"
              className="border-ink/15 group-hover:border-ink group-hover:bg-ink group-hover:text-paper grid size-10 place-items-center rounded-full border transition-[transform,background-color,color,border-color] duration-500 group-hover:translate-x-1"
            >
              <ArrowRight className="size-4" strokeWidth={1.7} />
            </span>
          </Link>
        </div>
      </div>

      {/* edges dissolve into the page */}
      <div className="mt-14 [mask-image:linear-gradient(90deg,transparent,#000_7%,#000_93%,transparent)]">
        <motion.ul
          ref={track}
          style={{ x }}
          className="flex w-max cursor-grab touch-pan-y items-center gap-5 active:cursor-grabbing"
          onPointerEnter={(e) => e.pointerType === "mouse" && setPaused(true)}
          onPointerLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
          onPanStart={() => {
            dragging.current = true;
            moved.current = 0;
          }}
          onPan={(_, info) => {
            moved.current += Math.abs(info.delta.x);
            x.set(wrap(x.get() + info.delta.x));
          }}
          onPanEnd={() => {
            dragging.current = false;
          }}
          onWheel={(e) => {
            if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) x.set(wrap(x.get() - e.deltaX));
          }}
        >
          {[...photos, ...photos].map((p, i) => {
            const dup = i >= photos.length;
            // rhythm: circle · arch · small circle — the ring motif and the portal arch
            const shape = [
              "size-[280px] rounded-full sm:size-[360px]",
              "h-[340px] w-[240px] rounded-t-full rounded-b-[6px] sm:h-[420px] sm:w-[290px]",
              "size-[200px] rounded-full sm:size-[240px]",
            ][(i % photos.length) % 3]; // by source index, so both halves of the loop are identical
            return (
              <li key={i} aria-hidden={dup || undefined}>
                <Link
                  href="/biz-haqimizda/fotogalereya"
                  tabIndex={dup ? -1 : undefined}
                  draggable={false}
                  onClick={(e) => {
                    if (moved.current > 6) e.preventDefault();
                  }}
                  className="group block"
                >
                  <Photo
                    slot={p}
                    sizes="340px"
                    className={shape}
                    imgClassName="pointer-events-none select-none transition-transform duration-700 group-hover:scale-105"
                    quality={60}
                  />
                </Link>
              </li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}
