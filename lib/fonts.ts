import { Montserrat, Poppins } from "next/font/google";

// Poppins is the typeface for all text (Latin incl. Uzbek oʻ gʻ ʻ ʼ).
// Poppins has no Cyrillic, so Montserrat — a close geometric sans — is loaded as its
// Cyrillic companion; the browser picks it per glyph for Russian text.
export const poppins = Poppins({
  // Google's "latin" subset already contains the Uzbek modifier letters ʻ (U+02BB) and ʼ (U+02BC)
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-poppins",
  display: "swap",
  // No auto-generated Arial fallback in the stack: it contains Cyrillic and would win over Montserrat for Russian.
  adjustFontFallback: false,
  fallback: [],
});

export const montserrat = Montserrat({
  subsets: ["cyrillic"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-montserrat",
  display: "swap",
  // only Russian pages need it; the browser fetches it on first Cyrillic glyph instead of on every page
  preload: false,
});
