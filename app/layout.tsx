// The real root layout (with <html>) lives in app/[locale]/layout.tsx — this one only passes children through,
// which is the pattern next-intl recommends for locale-prefixed routing.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
