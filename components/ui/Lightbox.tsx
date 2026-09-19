"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from "lucide-react";
import { useTranslations } from "next-intl";
import { useDialog } from "./useDialog";

export type LightboxItem = { src: string; alt: string; caption?: string; blurDataURL?: string };

/** Full-screen viewer: swipe, arrows, keyboard, zoom (click / double-tap / Z), caption, counter, neighbour preloading. */
export function Lightbox({ items, index, onClose, onIndex }: { items: LightboxItem[]; index: number | null; onClose: () => void; onIndex: (i: number) => void }) {
  const t = useTranslations("common");
  const ref = useRef<HTMLDivElement>(null);
  const open = index !== null;
  const [zoom, setZoom] = useState(false);
  const [dir, setDir] = useState(0);
  useDialog(open, ref, onClose);

  const go = useCallback(
    (d: number) => {
      if (index === null) return;
      setZoom(false);
      setDir(d);
      onIndex((index + d + items.length) % items.length);
    },
    [index, items.length, onIndex],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key.toLowerCase() === "z") setZoom((z) => !z);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, go]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (zoom) return;
    if (info.offset.x < -70 || info.velocity.x < -500) go(1);
    else if (info.offset.x > 70 || info.velocity.x > 500) go(-1);
    else if (info.offset.y > 120) onClose();
  };

  const item = index !== null ? items[index] : null;
  const neighbours = index !== null ? [items[(index + 1) % items.length], items[(index - 1 + items.length) % items.length]] : [];

  return (
    <AnimatePresence>
      {open && item && (
        <motion.div
          ref={ref}
          role="dialog"
          aria-modal="true"
          aria-label={item.alt}
          data-lenis-prevent
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex flex-col bg-[#050d1c]/96 text-white"
        >
          <div className="flex items-center justify-between gap-4 p-3 sm:p-5">
            <p className="font-display text-sm tabular-nums text-white/70" aria-live="polite">
              {index! + 1} / {items.length}
            </p>
            <div className="flex gap-2">
              <button type="button" onClick={() => setZoom((z) => !z)} aria-pressed={zoom} aria-label={zoom ? t("zoomOut") : t("zoomIn")} className="grid size-11 place-items-center rounded-full border border-white/15 hover:bg-white/10">
                {zoom ? <ZoomOut className="size-5" aria-hidden="true" /> : <ZoomIn className="size-5" aria-hidden="true" />}
              </button>
              <button type="button" onClick={onClose} aria-label={t("close")} className="grid size-11 place-items-center rounded-full border border-white/15 hover:bg-white/10">
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="relative flex-1 overflow-hidden">
            <AnimatePresence initial={false} custom={dir} mode="popLayout">
              <motion.div
                key={index}
                custom={dir}
                initial={{ x: dir >= 0 ? "12%" : "-12%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: dir >= 0 ? "-12%" : "12%", opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 34 }}
                drag={zoom ? true : "x"}
                dragConstraints={zoom ? { left: -300, right: 300, top: -200, bottom: 200 } : { left: 0, right: 0, top: 0, bottom: 0 }}
                dragElastic={zoom ? 0.2 : 0.5}
                onDragEnd={onDragEnd}
                onDoubleClick={() => setZoom((z) => !z)}
                className="absolute inset-0 touch-none px-3 sm:px-20"
              >
                <motion.div className="relative h-full w-full" animate={{ scale: zoom ? 2 : 1 }} transition={{ type: "spring", stiffness: 260, damping: 30 }} style={{ cursor: zoom ? "grab" : "zoom-in" }} onClick={() => !zoom && setZoom(true)}>
                  <Image src={item.src} alt={item.alt} fill sizes="100vw" quality={85} className="select-none object-contain" draggable={false} placeholder={item.blurDataURL ? "blur" : "empty"} blurDataURL={item.blurDataURL} priority />
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {items.length > 1 && (
              <>
                <button type="button" onClick={() => go(-1)} aria-label={t("prev")} className="absolute left-3 top-1/2 hidden size-12 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-black/30 backdrop-blur hover:bg-white/10 sm:grid">
                  <ChevronLeft className="size-6" aria-hidden="true" />
                </button>
                <button type="button" onClick={() => go(1)} aria-label={t("next")} className="absolute right-3 top-1/2 hidden size-12 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-black/30 backdrop-blur hover:bg-white/10 sm:grid">
                  <ChevronRight className="size-6" aria-hidden="true" />
                </button>
              </>
            )}
            {/* preload neighbours */}
            <div className="pointer-events-none absolute size-px overflow-hidden opacity-0" aria-hidden="true">
              {neighbours.map((n, i) => (
                <Image key={i} src={n.src} alt="" width={1600} height={1066} sizes="100vw" quality={85} />
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 p-4 sm:p-6">
            <p className="max-w-3xl text-[15px] text-white/85">{item.caption ?? item.alt}</p>
            <div className="flex gap-2 sm:hidden">
              <button type="button" onClick={() => go(-1)} aria-label={t("prev")} className="grid size-11 place-items-center rounded-full border border-white/15">
                <ChevronLeft className="size-5" aria-hidden="true" />
              </button>
              <button type="button" onClick={() => go(1)} aria-label={t("next")} className="grid size-11 place-items-center rounded-full border border-white/15">
                <ChevronRight className="size-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
