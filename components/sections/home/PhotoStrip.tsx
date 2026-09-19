"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useAnimationFrame, useMotionValue, useReducedMotion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { images, type ImageSlot } from "@/lib/images";
import { strip } from "@/data/home";
import { pick } from "@/lib/utils";
import { Link } from "@/i18n/navigation";
import { Photo } from "@/components/ui/Photo";

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
    if (reduce || paused || dragging.current) return;
    x.set(wrap(x.get() - (SPEED * delta) / 1000));
  });

  return (
    <section aria-labelledby="strip-title" className="overflow-hidden py-20 lg:py-28">
      <div className="container-x flex flex-wrap items-end justify-between gap-4">
        <h2 id="strip-title" className="text-display-m text-ink">
          {pick(strip.title, locale)}
        </h2>
        <Link href="/biz-haqimizda/fotogalereya" className="font-semibold text-primary-ink underline decoration-2 underline-offset-[6px]">
          {t("toGallery")}
        </Link>
      </div>
      <p className="container-x mt-2 text-sm text-ink-3" aria-hidden="true">
        {pick(strip.hint, locale)}
      </p>

      <motion.ul
        ref={track}
        style={{ x }}
        className="mt-10 flex w-max cursor-grab touch-pan-y gap-4 active:cursor-grabbing"
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
          const tall = i % 3 === 1;
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
                  className={tall ? "h-[300px] w-[230px] rounded-[20px] sm:h-[380px] sm:w-[290px]" : "h-[300px] w-[300px] rounded-full sm:h-[380px] sm:w-[380px]"}
                  imgClassName="pointer-events-none select-none transition-transform duration-700 group-hover:scale-105"
                  quality={60}
                />
              </Link>
            </li>
          );
        })}
      </motion.ul>
    </section>
  );
}
