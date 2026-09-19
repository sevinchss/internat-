"use client";

import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useSyncExternalStore } from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

const noop = () => () => {};
/** true only after hydration (avoids theme-dependent markup mismatch) */
export function useMounted() {
  return useSyncExternalStore(
    noop,
    () => true,
    () => false,
  );
}

/** Animated sun ↔ moon (one SVG: the moon is a sun with a bite taken out and its rays tucked in). */
export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const t = useTranslations("header");
  const mounted = useMounted();
  const dark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(dark ? "light" : "dark")}
      aria-label={t("toggleTheme")}
      aria-pressed={mounted ? dark : undefined}
      className={cn(
        "group text-ink hover:bg-surface-2 relative grid size-10 place-items-center rounded-full transition-colors active:scale-95",
        className,
      )}
    >
      <svg viewBox="0 0 24 24" className="size-[20px]" aria-hidden="true">
        <mask id="theme-bite">
          <rect width="24" height="24" fill="white" />
          <motion.circle
            initial={false}
            animate={{ cx: dark ? 16.5 : 30, cy: dark ? 7 : 0 }}
            r="7"
            fill="black"
            transition={{ type: "spring", stiffness: 180, damping: 22 }}
          />
        </mask>
        <motion.circle
          cx="12"
          cy="12"
          initial={false}
          animate={{ r: dark ? 8.5 : 4.6 }}
          transition={{ type: "spring", stiffness: 180, damping: 20 }}
          fill="currentColor"
          mask="url(#theme-bite)"
        />
        <motion.g
          initial={false}
          animate={{ rotate: dark ? 45 : 0, scale: dark ? 0 : 1, opacity: dark ? 0 : 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          style={{ originX: "12px", originY: "12px" }}
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        >
          {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
            <line key={a} x1="12" y1="2.2" x2="12" y2="4.4" transform={`rotate(${a} 12 12)`} />
          ))}
        </motion.g>
      </svg>
    </button>
  );
}

/** Segmented light / dark / system control (mobile menu). */
export function ThemeSegmented() {
  const { theme, setTheme } = useTheme();
  const t = useTranslations("header");
  const mounted = useMounted();
  const options = [
    { id: "light", label: t("themeLight"), Icon: Sun },
    { id: "dark", label: t("themeDark"), Icon: Moon },
    { id: "system", label: t("themeSystem"), Icon: Monitor },
  ];
  return (
    <div role="radiogroup" aria-label={t("theme")} className="border-line flex rounded-full border p-1">
      {options.map(({ id, label, Icon }) => {
        const active = mounted && theme === id;
        return (
          <button
            key={id}
            role="radio"
            aria-checked={active}
            onClick={() => setTheme(id)}
            className={cn(
              "flex min-h-11 flex-1 items-center justify-center gap-2 rounded-full px-3 text-sm font-semibold transition-colors",
              active ? "bg-primary text-on-primary" : "text-ink-2 hover:text-ink",
            )}
          >
            <Icon className="size-4" strokeWidth={1.8} aria-hidden="true" />
            {label}
          </button>
        );
      })}
    </div>
  );
}
