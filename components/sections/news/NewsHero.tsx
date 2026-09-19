"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Photo } from "@/components/ui/Photo";
import { RING_END, RING_START } from "@/components/brand/Ring";
import { arcPath } from "@/lib/utils";
import type { NewsCardData } from "./news-utils";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * The page's one motion moment: the headline settles, the featured photo opens like a shutter
 * and a thin arc of the ring draws around its corner.
 */
export function NewsHero({
  title,
  lead,
  featuredLabel,
  readMore,
  minutesLabel,
  item,
}: {
  title: string;
  lead: string;
  featuredLabel: string;
  readMore: string;
  minutesLabel: string;
  item: NewsCardData;
}) {
  const reduce = useReducedMotion();
  const rise = (delay: number) =>
    reduce ? {} : { initial: { opacity: 0, y: 22 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, ease, delay } };

  return (
    <section className="container-x pt-32 pb-20 sm:pt-36 lg:pb-32 lg:pt-44">
      <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
        <motion.h1 {...rise(0)} className="text-display-xl lg:col-span-7">
          {title}
        </motion.h1>
        <motion.p {...rise(0.08)} className="max-w-[40ch] text-ink-2 lg:col-span-4 lg:col-start-9 lg:pb-3">
          {lead}
        </motion.p>
      </div>

      <article className="group relative mt-12 grid gap-8 lg:mt-20 lg:grid-cols-12 lg:items-end lg:gap-14">
        <div className="relative lg:col-span-7 lg:-ml-[max(40px,calc((100vw-1360px)/2+40px))]">
          <motion.div
            initial={reduce ? false : { clipPath: "inset(0 100% 0 0)" }}
            animate={{ clipPath: "inset(0 0% 0 0)" }}
            transition={{ duration: 1.1, ease, delay: 0.15 }}
            className="overflow-hidden rounded-[4px] lg:rounded-l-none"
          >
            <Photo
              slot={item.image}
              sizes="(min-width: 1360px) 760px, (min-width: 1024px) 56vw, 100vw"
              priority
              quality={85}
              className="aspect-[4/3] sm:aspect-[16/10] lg:aspect-[5/4] xl:aspect-[4/3]"
              imgClassName="transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
          </motion.div>
          <svg viewBox="0 0 200 200" aria-hidden="true" className="pointer-events-none absolute -right-12 -top-12 hidden size-40 text-ring lg:block">
            <motion.path
              d={arcPath(100, 100, 94, RING_START, RING_END)}
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              vectorEffect="non-scaling-stroke"
              initial={reduce ? false : { pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.4, ease, delay: 0.5 }}
            />
            <motion.path
              d={arcPath(100, 100, 94, 276, 320)}
              fill="none"
              stroke={item.color}
              strokeWidth="3"
              vectorEffect="non-scaling-stroke"
              initial={reduce ? false : { pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, ease, delay: 1.5 }}
            />
          </svg>
        </div>

        <motion.div {...rise(0.35)} className="lg:col-span-5 lg:pb-4">
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[15px] text-ink-2">
            <span className="font-medium text-ink">{featuredLabel}</span>
            <span aria-hidden="true" className="h-3 w-px bg-line" />
            <span className="inline-flex items-center gap-2">
              <span aria-hidden="true" className="size-2 rounded-full" style={{ background: item.color }} />
              {item.categoryLabel}
            </span>
            <span aria-hidden="true" className="h-3 w-px bg-line" />
            <time dateTime={item.date}>{item.dateLabel}</time>
          </p>
          <h2 className="mt-6 text-display-m">
            <Link href={item.href} className="decoration-2 underline-offset-8 after:absolute after:inset-0 after:content-[''] hover:underline">
              {item.title}
            </Link>
          </h2>
          <p className="mt-5 max-w-[52ch] text-ink-2">{item.excerpt}</p>
          <p className="mt-10 flex items-center gap-4 border-t border-line pt-6 text-[15px]">
            <span className="inline-flex items-center gap-2 font-semibold text-primary-ink">
              {readMore}
              <ArrowRight aria-hidden="true" className="size-4 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none" strokeWidth={1.8} />
            </span>
            <span className="text-ink-3">
              {item.minutes} {minutesLabel}
            </span>
          </p>
        </motion.div>
      </article>
    </section>
  );
}
