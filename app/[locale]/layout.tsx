import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { manrope, unbounded } from "@/lib/fonts";
import { SITE_URL, school } from "@/lib/site";
import { alternates } from "@/lib/seo";
import { pick } from "@/lib/utils";
import { Providers } from "@/components/layout/Providers";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { IntroLoader } from "@/components/layout/IntroLoader";
import { SchoolJsonLd } from "@/components/seo/JsonLd";
import "../globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: t("defaultTitle"), template: `%s — ${pick(school.shortName, locale)}` },
    description: t("defaultDescription"),
    applicationName: school.brandName,
    alternates: alternates(locale, "/"),
    openGraph: { images: ["/brand/og-base.png"] },
    formatDetection: { telephone: false },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAFBFD" },
    { media: "(prefers-color-scheme: dark)", color: "#07152B" },
  ],
};

// Runs before paint: skip the intro overlay if it already played in this session.
const introScript = `try{if(sessionStorage.getItem('ils-intro')){document.documentElement.classList.add('intro-done')}}catch(e){document.documentElement.classList.add('intro-done')}`;

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <html lang={locale} suppressHydrationWarning className={`${unbounded.variable} ${manrope.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
      </head>
      <body className="grain min-h-dvh overflow-x-clip">
        <NextIntlClientProvider>
          <Providers>
            <IntroLoader />
            <Header />
            <main id="main" tabIndex={-1} className="outline-none">
              {children}
            </main>
            <Footer />
          </Providers>
        </NextIntlClientProvider>
        <SchoolJsonLd locale={locale} />
      </body>
    </html>
  );
}
