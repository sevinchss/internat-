"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

const KEY = "ils-intro";
// Measured from the first paint — when the CSS animations actually start.
const MIN_MS = 1300; // draw / sweep / greetings finish at ~1.1s → a short hold, then lift…
const FORCE_MS = 2000; // …and never wait longer, even if images are slow
const GREETINGS = [
  { text: "Salom", lang: "uz" },
  { text: "Hello", lang: "en" },
  { text: "你好", lang: "zh" },
  { text: "Привет", lang: "ru" },
];

type Phase = "loading" | "leaving" | "done";

const imageReady = (img: HTMLImageElement) =>
  new Promise<void>((resolve) => {
    img.addEventListener("load", () => resolve(), { once: true });
    img.addEventListener("error", () => resolve(), { once: true });
  });

/**
 * First-visit intro (once per session), quiet and minimal:
 * the real emblem (logo-mark-360.webp) resolves from blur while a single hairline ring draws around it,
 * a line of greetings settles underneath, then the paper lifts like a curtain onto the page,
 * which has been rendered underneath all along (the overlay never blocks HTML or LCP).
 *
 * All motion is plain CSS (see `.intro-*` in globals.css), so it runs on the compositor with
 * no per-frame JavaScript. JS only decides WHEN to lift: after fonts + eager images are ready,
 * bounded by MIN_MS / FORCE_MS.
 */
export function IntroLoader() {
  const t = useTranslations("loader");
  const [phase, setPhase] = useState<Phase>("loading");
  const finished = useRef(false);

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

  // Already played this session → unmount right away
  useEffect(() => {
    let played = false;
    try {
      played = !!sessionStorage.getItem(KEY);
    } catch {
      played = true;
    }
    if (played) {
      window.dispatchEvent(new Event("ils:intro-done"));
      // eslint-disable-next-line react-hooks/set-state-in-effect -- sessionStorage is client-only
      setPhase("done");
    }
  }, []);

  // Decide when to lift the curtain
  useEffect(() => {
    if (phase !== "loading" || finished.current) return;
    const pending = Array.from(document.images).filter((img) => img.loading !== "lazy" && !img.complete);
    const ready = Promise.all([document.fonts?.ready, ...pending.map(imageReady)]);
    const painted = performance.getEntriesByName("first-paint")[0]?.startTime ?? performance.now();
    const until = (ms: number) => new Promise((r) => setTimeout(r, Math.max(0, painted + ms - performance.now())));
    let cancelled = false;
    Promise.race([Promise.all([ready, until(MIN_MS)]), until(FORCE_MS)]).then(() => {
      if (!cancelled) setPhase("leaving");
    });
    return () => {
      cancelled = true;
    };
  }, [phase]);

  // Safety net in case transitionend never fires (e.g. reduced motion, background tab)
  useEffect(() => {
    if (phase !== "leaving") return;
    const id = setTimeout(finish, 1000);
    return () => clearTimeout(id);
  }, [phase, finish]);

  // Esc skips; lock scroll while visible
  useEffect(() => {
    if (phase === "done") return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && finish();
    document.addEventListener("keydown", onKey);
    const html = document.documentElement;
    const prev = html.style.overflow;
    if (!html.classList.contains("intro-done")) html.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      html.style.overflow = prev;
    };
  }, [phase, finish]);

  if (phase === "done") return null;

  return (
    <div
      id="intro"
      className="intro bg-paper fixed inset-0 z-[80] flex flex-col items-center justify-center"
      data-phase={phase}
      onTransitionEnd={(e) => e.target === e.currentTarget && phase === "leaving" && finish()}
    >
      <p className="sr-only" role="status">
        {t("loading")}
      </p>

      {/* the curtain's lower edge */}
      <span aria-hidden="true" className="bg-line absolute inset-x-0 bottom-0 h-px" />

      <div className="intro-stage relative size-[clamp(120px,22vmin,168px)]">
        {/* hairline progress ring */}
        <svg
          viewBox="0 0 100 100"
          className="absolute -inset-[22%] size-[144%] -rotate-[50deg] overflow-visible"
          aria-hidden="true"
        >
          <circle cx="50" cy="50" r="49" fill="none" stroke="var(--line)" strokeWidth="0.35" />
          <circle
            className="intro-ring"
            cx="50"
            cy="50"
            r="49"
            fill="none"
            stroke="var(--ink)"
            strokeWidth="0.5"
            strokeLinecap="round"
            pathLength={1}
          />
        </svg>
        {/* the real emblem, resolving from blur and revealed along the same sweep */}
        <div className="intro-mark absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element -- must paint before hydration */}
          <img
            src="/brand/logo-mark-360.webp"
            alt=""
            width={360}
            height={360}
            decoding="async"
            fetchPriority="high"
            className="size-full select-none"
            draggable={false}
          />
        </div>
      </div>

      <p
        aria-hidden="true"
        className="intro-greetings text-ink-3 mt-[clamp(56px,9vmin,84px)] flex items-center gap-3 text-[13px] font-light tracking-[0.18em]"
      >
        {GREETINGS.map((g, i) => (
          <span
            key={g.lang}
            lang={g.lang}
            className="intro-greeting flex items-center gap-3"
            style={{ animationDelay: `${200 + i * 140}ms` }}
          >
            {i > 0 && <span className="bg-ring size-[3px] rounded-full" />}
            {g.text}
          </span>
        ))}
      </p>

      <button
        type="button"
        onClick={finish}
        className="text-ink-3 hover:text-ink absolute right-6 bottom-6 min-h-11 px-3 text-[13px] font-medium tracking-wide underline-offset-4 transition-colors hover:underline"
      >
        {t("skip")}
      </button>
    </div>
  );
}
