"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Photo } from "@/components/ui/Photo";
import type { ImageSlot } from "@/lib/images";

const ease = [0.16, 1, 0.3, 1] as const;

/** Article hero — the page's single motion moment: headline rises, the photo settles from a slight zoom behind a widening mask. */
export function ArticleHero({
  backLabel,
  categoryLabel,
  color,
  date,
  dateLabel,
  minutesLabel,
  title,
  excerpt,
  image,
}: {
  backLabel: string;
  categoryLabel: string;
  color: string;
  date: string;
  dateLabel: string;
  minutesLabel: string;
  title: string;
  excerpt: string;
  image: ImageSlot;
}) {
  const reduce = useReducedMotion();
  const rise = (delay: number) =>
    reduce ? {} : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, ease, delay } };

  return (
    <header className="container-x pt-28 sm:pt-32">
      <Link
        href="/biz-haqimizda/yangiliklar"
        className="group inline-flex min-h-11 items-center gap-2 text-[15px] font-semibold text-ink-2 hover:text-primary-ink"
      >
        <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" strokeWidth={1.8} aria-hidden="true" />
        {backLabel}
      </Link>

      <div className="mt-6 max-w-[1040px]">
        <motion.p {...rise(0)} className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[15px] text-ink-2">
          <span className="inline-flex items-center gap-2 font-semibold text-ink">
            <span aria-hidden="true" className="size-2 rounded-full" style={{ background: color }} />
            {categoryLabel}
          </span>
          <span aria-hidden="true" className="h-3 w-px bg-line" />
          <time dateTime={date}>{dateLabel}</time>
          <span aria-hidden="true" className="h-3 w-px bg-line" />
          <span>{minutesLabel}</span>
        </motion.p>
        <motion.h1 {...rise(0.06)} className="mt-5 text-display-l">
          {title}
        </motion.h1>
        <motion.p {...rise(0.14)} className="mt-6 max-w-[60ch] text-body-l text-ink-2">
          {excerpt}
        </motion.p>
      </div>

      <motion.div
        initial={reduce ? false : { clipPath: "inset(8% 6% 8% 6% round 28px)" }}
        animate={{ clipPath: "inset(0% 0% 0% 0% round 28px)" }}
        transition={{ duration: 1.1, ease, delay: 0.2 }}
        className="mt-10 overflow-hidden rounded-[28px] lg:mt-14"
      >
        <motion.div initial={reduce ? false : { scale: 1.08 }} animate={{ scale: 1 }} transition={{ duration: 1.4, ease, delay: 0.2 }}>
          <Photo slot={image} sizes="(min-width: 1360px) 1280px, 100vw" priority quality={85} className="aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9]" />
        </motion.div>
      </motion.div>
    </header>
  );
}
