"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, animate, motion, useMotionValue, useMotionTemplate, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";
import { arcPath } from "@/lib/utils";
import { RING_END, RING_START } from "@/components/brand/Ring";

const GREETINGS = [
  { text: "Salom", lang: "uz" },
  { text: "Hello", lang: "en" },
  { text: "你好", lang: "zh" },
  { text: "Привет", lang: "ru" },
  { text: "Bonjour", lang: "fr" },
  { text: "Ciao", lang: "it" },
  { text: "Salom", lang: "uz" },
];
const KEY = "ils-intro";
const MIN_MS = 1400; // progress never completes faster than this
const FORCE_MS = 1900; // …and never slower (total intro stays under ~3.5s)
const SWEEP = RING_END - RING_START; // 280°

type Phase = "loading" | "wordmark" | "reveal" | "done";

/**
 * First-visit intro (once per session). The page renders underneath; this is only an overlay,
 * so it never blocks HTML/LCP. Hidden before paint by an inline script when already played.
 */
export function IntroLoader() {
  const t = useTranslations("loader");
  const [phase, setPhase] = useState<Phase>("loading");
  const [reduced, setReduced] = useState(false);
  const [greet, setGreet] = useState(0);
  const [wide, setWide] = useState(false);
  const progress = useMotionValue(0); // 0..1, drives the arc + conic mask
  const hole = useMotionValue(0); // radius (vmax) of the circular reveal
  const finished = useRef(false);

  const sweep = useTransform(progress, (p) => `${(p * SWEEP).toFixed(2)}deg`);
  const conic = useMotionTemplate`conic-gradient(from ${RING_START + 90}deg, #000 ${sweep}, transparent ${sweep})`;
  const holeMask = useMotionTemplate`radial-gradient(circle at 50% 50%, transparent ${hole}vmax, #000 calc(${hole}vmax + 1px))`;
  const pct = useTransform(progress, (p) => Math.round(p * 100));

  const finish = useCallback(() => {
    if (finished.current) return;
    finished.current = true;
    try {
      sessionStorage.setItem(KEY, "1");
    } catch {}
    document.documentElement.classList.add("intro-done");
    window.dispatchEvent(new Event("ils:intro-done"));
    setPhase("done");
  }, []);

  const skip = useCallback(() => {
    progress.set(1);
    finish();
  }, [finish, progress]);

  // Already played → unmount immediately
  useEffect(() => {
    let played = false;
    try {
      played = !!sessionStorage.getItem(KEY);
    } catch {
      played = true;
    }
    /* eslint-disable react-hooks/set-state-in-effect -- sessionStorage / matchMedia are client-only */
    if (played) {
      window.dispatchEvent(new Event("ils:intro-done"));
      return setPhase("done");
    }
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    setWide(window.matchMedia("(min-width: 640px)").matches);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  // Real load progress: fonts + images present in the document, bounded by MIN_MS / FORCE_MS.
  useEffect(() => {
    if (phase !== "loading" || finished.current) return;
    const start = performance.now();
    let loaded = 0;
    let total = 1;
    const tasks: Promise<unknown>[] = [document.fonts?.ready ?? Promise.resolve()];
    document.querySelectorAll("img").forEach((img) => {
      if (img.loading === "lazy") return;
      tasks.push(
        img.complete
          ? Promise.resolve()
          : new Promise((r) => {
              img.addEventListener("load", r, { once: true });
              img.addEventListener("error", r, { once: true });
            }),
      );
    });
    total = tasks.length;
    tasks.forEach((p) => p.then(() => (loaded += 1)));

    let raf = 0;
    const tick = (now: number) => {
      const elapsed = now - start;
      const timeP = Math.min(1, elapsed / MIN_MS);
      const loadP = loaded / total;
      const target = elapsed > FORCE_MS ? 1 : Math.min(timeP, 0.15 + 0.85 * loadP);
      const current = progress.get();
      const next = current + (target - current) * 0.2;
      progress.set(next > 0.995 && target === 1 ? 1 : next);
      if (progress.get() >= 1) {
        setPhase("wordmark");
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [phase, progress]);

  // Greeting cycle
  useEffect(() => {
    if (phase !== "loading" || reduced) return;
    const id = setInterval(() => setGreet((g) => Math.min(g + 1, GREETINGS.length - 1)), 300);
    return () => clearInterval(id);
  }, [phase, reduced]);

  // Wordmark → circular reveal → done
  useEffect(() => {
    if (phase === "wordmark") {
      const id = setTimeout(() => setPhase("reveal"), reduced ? 150 : 650);
      return () => clearTimeout(id);
    }
    if (phase === "reveal") {
      if (reduced) {
        const id = setTimeout(finish, 250);
        return () => clearTimeout(id);
      }
      const controls = animate(hole, 150, { duration: 0.7, ease: [0.76, 0, 0.24, 1], onComplete: finish });
      return () => controls.stop();
    }
  }, [phase, reduced, finish, hole]);

  // Esc skips; lock scroll while visible
  useEffect(() => {
    if (phase === "done") return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && skip();
    document.addEventListener("keydown", onKey);
    const html = document.documentElement;
    const prev = html.style.overflow;
    if (!html.classList.contains("intro-done")) html.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      html.style.overflow = prev;
    };
  }, [phase, skip]);

  const arc = arcPath(100, 100, 97, RING_START, RING_END);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          id="intro"
          key="intro"
          exit={{ opacity: 0, transition: { duration: reduced ? 0.3 : 0.2 } }}
          className="fixed inset-0 z-[80] grid place-items-center bg-paper"
          style={reduced ? undefined : { WebkitMaskImage: holeMask, maskImage: holeMask }}
        >
          <p className="sr-only" role="status">
            {t("loading")}
          </p>

          {reduced ? (
            <div className="flex w-[min(78vw,420px)] flex-col items-center gap-8">
              {/* eslint-disable-next-line @next/next/no-img-element -- must render before hydration, no optimizer round-trip */}
              <img src="/brand/logo-full.png" alt="" className="w-full dark:hidden" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brand/logo-full-dark.png" alt="" className="hidden w-full dark:block" />
              <div className="h-0.5 w-40 overflow-hidden rounded-full bg-line">
                <motion.div className="h-full origin-left bg-primary-ink" style={{ scaleX: progress }} />
              </div>
            </div>
          ) : (
            <motion.div
              className="relative size-[min(64vmin,440px)]"
              // shift left so ring + wordmark end up centred together (offsets measured from logo.png)
              animate={
                phase === "reveal"
                  ? { scale: 1.6, opacity: 0, x: wide ? "-30%" : "0%" }
                  : { scale: 1, opacity: 1, x: phase === "wordmark" && wide ? "-30%" : "0%" }
              }
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            >
              {/* progress: the grey arc draws itself clockwise */}
              <svg viewBox="0 0 200 200" className="absolute -inset-[5%] size-[110%] overflow-visible" aria-hidden="true">
                <path d={arc} fill="none" stroke="var(--line)" strokeWidth="1" />
                <motion.path d={arc} fill="none" stroke="var(--ring)" strokeWidth="2.2" style={{ pathLength: progress }} />
              </svg>
              {/* the real emblem from logo.png, revealed segment by segment */}
              <motion.div className="absolute inset-0" style={{ WebkitMaskImage: conic, maskImage: conic }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/brand/logo-mark.png" alt="" className="size-full select-none" draggable={false} />
              </motion.div>

              {/* greeting */}
              <div className="absolute inset-0 grid place-items-center" aria-hidden="true">
                <AnimatePresence mode="popLayout" initial={false}>
                  {phase === "loading" && (
                    <motion.span
                      key={greet}
                      lang={GREETINGS[greet].lang}
                      initial={{ y: 14, opacity: 0, filter: "blur(4px)" }}
                      animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                      exit={{ y: -14, opacity: 0, filter: "blur(4px)" }}
                      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                      className={`font-display text-[clamp(1.2rem,4.2vmin,2rem)] text-ink ${GREETINGS[greet].lang === "zh" ? "font-hanzi font-semibold" : ""}`}
                    >
                      {GREETINGS[greet].text}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>

              {/* wordmark slides out of the ring's opening */}
              <div className="pointer-events-none absolute left-[62%] top-1/2 h-[24%] w-[125%] -translate-y-1/2 overflow-hidden max-sm:hidden">
                <motion.div
                  initial={{ x: "-70%", opacity: 0 }}
                  animate={phase === "loading" ? { x: "-70%", opacity: 0 } : { x: "0%", opacity: 1 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/brand/logo-wordmark.png" alt="" className="h-full w-auto dark:hidden" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/brand/logo-wordmark-dark.png" alt="" className="hidden h-full w-auto dark:block" />
                </motion.div>
              </div>
            </motion.div>
          )}

          <div className="absolute bottom-6 left-6 font-display text-sm tabular-nums text-ink-3" aria-hidden="true">
            <motion.span>{pct}</motion.span>%
          </div>
          <button
            type="button"
            onClick={skip}
            className="absolute bottom-5 right-5 min-h-11 rounded-full border border-line bg-surface px-5 text-sm font-semibold text-ink transition-colors hover:border-primary-ink hover:text-primary-ink"
          >
            {t("skip")}
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
