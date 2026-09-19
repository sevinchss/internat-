import clsx, { type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";
import type { Locale } from "@/i18n/routing";

// knows our custom font-size tokens so they are not mistaken for text colours
const twMerge = extendTailwindMerge({
  extend: { classGroups: { "font-size": [{ text: ["display-xl", "display-l", "display-m", "display-s", "body-l"] }] } },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Tri-lingual content field used across data/*.ts */
export type L10n<T = string> = Record<Locale, T>;

export function pick<T>(value: L10n<T>, locale: string): T {
  return value[(locale as Locale) in value ? (locale as Locale) : "uz"];
}

const intlLocale: Record<Locale, string> = { uz: "uz-Latn-UZ", en: "en-GB", ru: "ru-RU" };

const monthsUz = [
  "yanvar",
  "fevral",
  "mart",
  "aprel",
  "may",
  "iyun",
  "iyul",
  "avgust",
  "sentabr",
  "oktabr",
  "noyabr",
  "dekabr",
];

/** Dates: Uzbek month names are hand-written because ICU data for uz is inconsistent across runtimes. */
export function formatDate(iso: string, locale: string, opts: { withYear?: boolean } = {}) {
  const d = new Date(iso + (iso.length === 10 ? "T00:00:00+05:00" : ""));
  const withYear = opts.withYear ?? true;
  if (locale === "uz") {
    // read Y-M-D straight from the ISO string → same result on server and in any viewer timezone
    const [y, m, day] = iso.slice(0, 10).split("-").map(Number);
    return `${day}-${monthsUz[m - 1]}${withYear ? `, ${y}` : ""}`;
  }
  return new Intl.DateTimeFormat(intlLocale[locale as Locale] ?? "en-GB", {
    day: "numeric",
    month: "long",
    ...(withYear ? { year: "numeric" } : {}),
    timeZone: "Asia/Tashkent",
  }).format(d);
}

export function formatNumber(n: number, locale: string) {
  // Uzbek & Russian group thousands with a (narrow) space
  return new Intl.NumberFormat(locale === "en" ? "en-GB" : "ru-RU").format(n).replace(/ | /g, " ");
}

/** Polar helper for ring geometry (0° = 3 o'clock, clockwise positive — SVG convention). */
export function polar(cx: number, cy: number, r: number, deg: number) {
  const a = (deg * Math.PI) / 180;
  // rounded so server- and client-rendered SVG attributes match exactly (no hydration mismatch)
  const round = (n: number) => Math.round(n * 1000) / 1000;
  return { x: round(cx + r * Math.cos(a)), y: round(cy + r * Math.sin(a)) };
}

export function arcPath(cx: number, cy: number, r: number, startDeg: number, endDeg: number) {
  const s = polar(cx, cy, r, startDeg);
  const e = polar(cx, cy, r, endDeg);
  const large = endDeg - startDeg > 180 ? 1 : 0;
  return `M ${s.x.toFixed(2)} ${s.y.toFixed(2)} A ${r} ${r} 0 ${large} 1 ${e.x.toFixed(2)} ${e.y.toFixed(2)}`;
}

/** Filled ring segment (donut slice). */
export function ringSegment(cx: number, cy: number, rOuter: number, rInner: number, startDeg: number, endDeg: number) {
  const so = polar(cx, cy, rOuter, startDeg);
  const eo = polar(cx, cy, rOuter, endDeg);
  const si = polar(cx, cy, rInner, endDeg);
  const ei = polar(cx, cy, rInner, startDeg);
  const large = endDeg - startDeg > 180 ? 1 : 0;
  const f = (n: number) => n.toFixed(2);
  return `M ${f(so.x)} ${f(so.y)} A ${rOuter} ${rOuter} 0 ${large} 1 ${f(eo.x)} ${f(eo.y)} L ${f(si.x)} ${f(si.y)} A ${rInner} ${rInner} 0 ${large} 0 ${f(ei.x)} ${f(ei.y)} Z`;
}
