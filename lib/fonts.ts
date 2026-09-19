import { Manrope, Unbounded } from "next/font/google";

// Both families cover Latin (incl. Uzbek oʻ gʻ ʻ ʼ) and Cyrillic.
export const unbounded = Unbounded({
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["400", "500", "600"],
  variable: "--font-unbounded",
  display: "swap",
});

export const manrope = Manrope({
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});
