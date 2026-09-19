"use client";

import { useCallback, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Volume2, VolumeOff } from "lucide-react";
import { useLocale } from "next-intl";
import { characters, chineseCopy } from "@/data/chinese";
import { cn, pick } from "@/lib/utils";

type Speech = "unknown" | "none" | "loading" | "zh" | "other";

const isZh = (v: SpeechSynthesisVoice) => /^zh([-_](CN|Hans))?/i.test(v.lang) || /chinese|mandarin|普通话|中文/i.test(v.name);

function subscribeVoices(cb: () => void) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return () => {};
  window.speechSynthesis.addEventListener("voiceschanged", cb);
  return () => window.speechSynthesis.removeEventListener("voiceschanged", cb);
}
function speechSnapshot(): Speech {
  if (!("speechSynthesis" in window) || typeof SpeechSynthesisUtterance === "undefined") return "none";
  const voices = window.speechSynthesis.getVoices();
  if (voices.length === 0) return "loading";
  return voices.some(isZh) ? "zh" : "other";
}

// Day of the year in Tashkent → the "character of the day". Server/hydration render uses index 0.
const noop = () => () => {};
function dayIndex() {
  const now = new Date(Date.now() + 5 * 3600_000); // UTC+5
  return Math.floor(now.getTime() / 86_400_000) % characters.length;
}

export function CharacterOfDay() {
  const locale = useLocale();
  const c = chineseCopy.character;
  const speech = useSyncExternalStore(subscribeVoices, speechSnapshot, () => "unknown" as Speech);
  const today = useSyncExternalStore(noop, dayIndex, () => 0);
  const [offset, setOffset] = useState(0);
  const [speaking, setSpeaking] = useState(false);

  const n = characters.length;
  const index = (((today + offset) % n) + n) % n;
  const ch = characters[index];

  const speak = useCallback(() => {
    const synth = window.speechSynthesis;
    synth.cancel();
    const u = new SpeechSynthesisUtterance(`${ch.char}。${ch.word.hanzi}。`);
    u.lang = "zh-CN";
    u.rate = 0.8;
    const voices = synth.getVoices();
    const voice = voices.find((v) => /^zh[-_]CN/i.test(v.lang)) ?? voices.find(isZh);
    if (voice) u.voice = voice;
    u.onend = () => setSpeaking(false);
    u.onerror = () => setSpeaking(false);
    setSpeaking(true);
    synth.speak(u);
  }, [ch]);

  const go = (delta: number) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel();
    setSpeaking(false);
    setOffset((o) => o + delta);
  };
  const choose = (i: number) => go(i - index);

  const canSpeak = speech !== "none" && speech !== "unknown";

  return (
    <section aria-labelledby="zh-char" className="py-20 lg:py-28">
      <div className="container-x grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <h2 id="zh-char" className="text-display-m text-ink">
            {pick(c.title, locale)}
          </h2>
          <p className="mt-4 max-w-[36ch] text-ink-2">{pick(c.lead, locale)}</p>
        </div>

        <div className="lg:col-span-8">
          <div className="overflow-hidden rounded-[28px] border border-line bg-surface">
            <div className="grid grid-cols-1 gap-8 p-6 sm:grid-cols-[auto_1fr] sm:p-10">
              {/* the character in a 田字格 box */}
              <div className="relative mx-auto aspect-square w-[200px] sm:mx-0 sm:w-[240px]">
                <svg viewBox="0 0 100 100" aria-hidden="true" className="absolute inset-0 h-full w-full">
                  <rect x="0.75" y="0.75" width="98.5" height="98.5" rx="4" fill="none" stroke="var(--accent)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
                  <path d="M50 1 V99 M1 50 H99" stroke="var(--accent)" strokeOpacity="0.4" strokeDasharray="3 3" vectorEffect="non-scaling-stroke" />
                </svg>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={ch.char}
                    lang="zh-CN"
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 flex items-center justify-center font-hanzi text-[150px] leading-none text-ink sm:text-[180px]"
                  >
                    {ch.char}
                  </motion.span>
                </AnimatePresence>
              </div>

              <div className="flex flex-col">
                <div aria-live="polite" aria-atomic="true">
                  <p className="flex flex-wrap items-baseline gap-x-4">
                    <span className="sr-only" lang="zh-CN">
                      {ch.char}
                    </span>
                    <span lang="zh-Latn-pinyin" className="font-display text-display-l text-ink">
                      {ch.pinyin}
                    </span>
                    <span className="text-body-l text-ink-2">{pick(ch.meaning, locale)}</span>
                  </p>
                  <div className="mt-6 border-t border-line pt-5">
                    <p className="text-sm text-ink-3">{pick(c.example, locale)}</p>
                    <p className="mt-1 flex flex-wrap items-baseline gap-x-3">
                      <span lang="zh-CN" className="font-hanzi text-3xl text-ink">
                        {ch.word.hanzi}
                      </span>
                      <span lang="zh-Latn-pinyin" className="font-semibold text-ink">
                        {ch.word.pinyin}
                      </span>
                      <span className="text-ink-2">— {pick(ch.word.meaning, locale)}</span>
                    </p>
                  </div>
                </div>

                <div className="mt-auto flex flex-wrap items-center gap-3 pt-8">
                  <button
                    type="button"
                    onClick={speak}
                    disabled={!canSpeak}
                    aria-label={`${pick(c.listenTo, locale)}: ${ch.char}, ${ch.pinyin}`}
                    className={cn(
                      "inline-flex min-h-12 items-center gap-2.5 rounded-full px-6 text-[15px] font-semibold transition-colors",
                      canSpeak ? "bg-ink text-paper hover:bg-ink/85" : "cursor-not-allowed bg-surface-2 text-ink-3",
                    )}
                  >
                    {canSpeak ? (
                      <Volume2 className={cn("size-5", speaking && "text-[var(--red)]")} strokeWidth={1.8} aria-hidden="true" />
                    ) : (
                      <VolumeOff className="size-5" strokeWidth={1.8} aria-hidden="true" />
                    )}
                    {pick(c.listen, locale)}
                  </button>
                  <div className="ml-auto flex gap-2">
                    <button
                      type="button"
                      onClick={() => go(-1)}
                      aria-label={pick(c.prev, locale)}
                      className="flex size-12 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-ink"
                    >
                      <ChevronLeft className="size-5" strokeWidth={1.8} aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      onClick={() => go(1)}
                      aria-label={pick(c.next, locale)}
                      className="flex size-12 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-ink"
                    >
                      <ChevronRight className="size-5" strokeWidth={1.8} aria-hidden="true" />
                    </button>
                  </div>
                </div>
                {speech === "none" && <p className="mt-3 text-sm text-ink-3">{pick(c.noSpeech, locale)}</p>}
                {speech === "other" && <p className="mt-3 text-sm text-ink-3">{pick(c.noVoice, locale)}</p>}
              </div>
            </div>

            <div className="border-t border-line bg-paper/60 px-6 py-4 sm:px-10">
              <p id="zh-char-pick" className="sr-only">
                {pick(c.pickLabel, locale)}
              </p>
              <ul aria-labelledby="zh-char-pick" className="no-scrollbar -mx-1 flex gap-1 overflow-x-auto px-1">
                {characters.map((x, i) => (
                  <li key={x.char}>
                    <button
                      type="button"
                      onClick={() => choose(i)}
                      aria-pressed={i === index}
                      aria-label={`${x.char} ${x.pinyin} — ${pick(x.meaning, locale)}`}
                      className={cn(
                        "flex size-11 items-center justify-center rounded-full font-hanzi text-xl transition-colors",
                        i === index ? "bg-ink text-paper" : "text-ink-2 hover:bg-surface-2 hover:text-ink",
                      )}
                    >
                      <span lang="zh-CN" aria-hidden="true">
                        {x.char}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
