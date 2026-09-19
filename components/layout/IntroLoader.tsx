"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useMotionTemplate, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";

const KEY = "ils-intro";
const MIN_MS = 1500; // progress never completes faster than this
const FORCE_MS = 2200; // …and never slower (whole intro stays under ~3.2s)
const GREETINGS = [
  { text: "Salom", lang: "uz" },
  { text: "Hello", lang: "en" },
  { text: "你好", lang: "zh" },
  { text: "Привет", lang: "ru" },
];
const ease = [0.76, 0, 0.24, 1] as const;

type Phase = "loading" | "leaving" | "done";

/**
 * First-visit intro (once per session), quiet and minimal:
 * the real emblem (logo-mark.png) resolves from blur while a single hairline ring draws around it —
 * that ring IS the progress (fonts + images) — a line of greetings settles underneath,
 * then the paper lifts like a curtain onto the page, which has been rendered underneath all along.
 */
export function IntroLoader() {
  const t = useTranslations("loader");
  const [phase, setPhase] = useState<Phase>("loading");
  const [reduced, setReduced] = useState(false);
  const progress = useMotionValue(0);
  const finished = useRef(false);

  const sweep = useTransform(progress, (p) => `${(p * 360).toFixed(1)}deg`);
  const conic = useMotionTemplate`conic-gradient(from 130deg, #000 ${sweep}, transparent ${sweep})`;
  const markBlur = useTransform(progress, [0, 0.7], ["blur(10px)", "blur(0px)"]);
  const markOpacity = useTransform(progress, [0, 0.35], [0, 1]);

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
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  // Real load progress (fonts + eager images), bounded by MIN_MS / FORCE_MS.
  useEffect(() => {
    if (phase !== "loading" || finished.current) return;
    const start = performance.now();
    let loaded = 0;
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
    const total = tasks.length;
    tasks.forEach((p) => p.then(() => (loaded += 1)));

    let raf = 0;
    let timer: ReturnType<typeof setTimeout>;
    const tick = (now: number) => {
      const elapsed = now - start;
      const timeP = Math.min(1, elapsed / MIN_MS);
      const target = elapsed > FORCE_MS ? 1 : Math.min(timeP, 0.1 + 0.9 * (loaded / total));
      const cur = progress.get();
      const next = cur + (target - cur) * 0.14;
      progress.set(target === 1 && next > 0.996 ? 1 : next);
      if (progress.get() >= 1) {
        timer = setTimeout(() => setPhase("leaving"), reduced ? 120 : 380);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, [phase, progress, reduced]);

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

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          id="intro"
          key="intro"
          className="fixed inset-0 z-[80] flex flex-col items-center justify-center bg-paper"
          initial={false}
          animate={phase === "leaving" ? (reduced ? { opacity: 0 } : { y: "-100%" }) : { y: "0%", opacity: 1 }}
          transition={{ duration: reduced ? 0.35 : 0.95, ease }}
          onAnimationComplete={() => phase === "leaving" && finish()}
        >
          <p className="sr-only" role="status">
            {t("loading")}
          </p>

          {/* the curtain's lower edge */}
          <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-line" />

          <motion.div
            className="relative size-[clamp(120px,22vmin,168px)]"
            animate={phase === "leaving" && !reduced ? { y: -40, opacity: 0, scale: 0.94 } : { y: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease }}
          >
            {/* hairline progress ring */}
            <svg viewBox="0 0 100 100" className="absolute -inset-[22%] size-[144%] -rotate-[50deg] overflow-visible" aria-hidden="true">
              <circle cx="50" cy="50" r="49" fill="none" stroke="var(--line)" strokeWidth="0.35" />
              <motion.circle cx="50" cy="50" r="49" fill="none" stroke="var(--ink)" strokeWidth="0.5" strokeLinecap="round" style={{ pathLength: progress }} />
            </svg>
            {/* the real emblem, resolving from blur and revealed along the same sweep */}
            <motion.div className="absolute inset-0" style={reduced ? undefined : { WebkitMaskImage: conic, maskImage: conic, filter: markBlur, opacity: markOpacity }}>
              {/* eslint-disable-next-line @next/next/no-img-element -- must paint before hydration */}
              <img src="/brand/logo-mark.png" alt="" className="size-full select-none" draggable={false} />
            </motion.div>
          </motion.div>

          <motion.p
            aria-hidden="true"
            className="mt-[clamp(56px,9vmin,84px)] flex items-center gap-3 text-[13px] font-light tracking-[0.18em] text-ink-3"
            animate={phase === "leaving" && !reduced ? { opacity: 0, y: -16 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
          >
            {GREETINGS.map((g, i) => (
              <motion.span
                key={g.lang}
                lang={g.lang}
                className="flex items-center gap-3"
                initial={reduced ? false : { opacity: 0, filter: "blur(6px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.7, delay: 0.25 + i * 0.28, ease: [0.16, 1, 0.3, 1] }}
              >
                {i > 0 && <span className="size-[3px] rounded-full bg-ring" />}
                {g.text}
              </motion.span>
            ))}
          </motion.p>

          <button
            type="button"
            onClick={skip}
            className="absolute bottom-6 right-6 min-h-11 px-3 text-[13px] font-medium tracking-wide text-ink-3 underline-offset-4 transition-colors hover:text-ink hover:underline"
          >
            {t("skip")}
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
