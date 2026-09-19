"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Link2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { SocialIcon } from "@/components/brand/SocialIcon";
import { cn } from "@/lib/utils";

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // http / older browsers
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    ta.remove();
    return ok;
  }
}

const btn =
  "inline-flex min-h-11 items-center gap-2.5 rounded-full border border-line px-4 text-[15px] font-semibold text-ink transition-colors hover:border-primary-ink hover:text-primary-ink";

/** Telegram + Facebook share links and "copy link" with a polite live "copied" confirmation. */
export function ShareBar({
  url,
  title,
  labels,
  className,
  vertical,
}: {
  url: string;
  title: string;
  labels: { telegram: string; facebook: string };
  className?: string;
  vertical?: boolean;
}) {
  const t = useTranslations("common");
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  const tg = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
  const fb = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;

  const onCopy = async () => {
    if (await copyText(url)) {
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2400);
    }
  };

  return (
    <div className={className}>
      <p className="text-ink-3 text-sm font-semibold">{t("share")}</p>
      <ul className={cn("mt-3 flex flex-wrap gap-2", vertical && "lg:flex-col lg:items-start")}>
        <li>
          <a href={tg} target="_blank" rel="noopener noreferrer" className={btn}>
            <SocialIcon id="telegram" className="size-[18px]" />
            Telegram
            <span className="sr-only">
              — {labels.telegram} ({t("opensInNewTab")})
            </span>
          </a>
        </li>
        <li>
          <a href={fb} target="_blank" rel="noopener noreferrer" className={btn}>
            <SocialIcon id="facebook" className="size-[18px]" />
            Facebook
            <span className="sr-only">
              — {labels.facebook} ({t("opensInNewTab")})
            </span>
          </a>
        </li>
        <li>
          <button
            type="button"
            onClick={onCopy}
            className={cn(btn, copied && "border-green text-green dark:text-[#4cc59f]")}
          >
            {copied ? (
              <Check className="size-[18px]" strokeWidth={1.8} aria-hidden="true" />
            ) : (
              <Link2 className="size-[18px]" strokeWidth={1.8} aria-hidden="true" />
            )}
            {copied ? t("copied") : t("copyLink")}
          </button>
        </li>
      </ul>
      <p aria-live="polite" className="sr-only">
        {copied ? t("copied") : ""}
      </p>
    </div>
  );
}
