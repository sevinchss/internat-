import { Montserrat, Poppins } from "next/font/google";

// Poppins is the typeface for all text (Latin incl. Uzbek oʻ gʻ ʻ ʼ).
// Poppins has no Cyrillic, so Montserrat — a close geometric sans — is loaded as its
// Cyrillic companion; the browser picks it per glyph for Russian text.
export const poppins = Poppins({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const montserrat = Montserrat({
  subsets: ["cyrillic", "cyrillic-ext"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
});
