"use client";

import { useLocale, useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

const names = { uz: "Oʻzbekcha", en: "English", ru: "Русский" } as const;

/** UZ / EN / RU — keeps the current page (incl. dynamic segments) when switching. */
export function LocaleSwitcher({ className, size = "sm" }: { className?: string; size?: "sm" | "lg" }) {
  const locale = useLocale();
  const pathname = usePathname();
  const params = useParams();
  const t = useTranslations("header");

  return (
    <nav aria-label={t("language")} className={cn("flex items-center", className)}>
      <ul className={cn("flex rounded-full", size === "lg" ? "gap-1 border border-line p-1" : "gap-0.5")}>
        {routing.locales.map((l) => {
          const active = l === locale;
          return (
            <li key={l}>
              <Link
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                href={{ pathname, params } as any}
                locale={l}
                hrefLang={l}
                lang={l}
                aria-current={active ? "true" : undefined}
                aria-label={names[l]}
                scroll={false}
                className={cn(
                  "grid place-items-center rounded-full font-semibold uppercase tracking-wide transition-colors",
                  size === "lg" ? "min-h-11 min-w-16 px-4 text-sm" : "h-9 min-w-9 px-2 text-[13px]",
                  active ? "bg-ink text-paper" : "text-ink-2 hover:bg-surface-2 hover:text-ink",
                )}
              >
                {l}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
