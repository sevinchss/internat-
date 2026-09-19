"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Plus } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { contactHref, nav } from "@/lib/nav";
import { cn } from "@/lib/utils";
import { useLenis } from "./SmoothScroll";
import { ThemeSegmented } from "./ThemeToggle";
import { LocaleSwitcher } from "./LocaleSwitcher";

const list = { open: { transition: { staggerChildren: 0.05, delayChildren: 0.08 } }, closed: {} };
const item = {
  open: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 30 } },
  closed: { opacity: 0, y: 18 },
};

export function MobileMenu({
  open,
  onClose,
  isActive,
}: {
  open: boolean;
  onClose: () => void;
  isActive: (h: string) => boolean;
}) {
  const t = useTranslations("nav");
  const th = useTranslations("header");
  const [expanded, setExpanded] = useState<string | null>(null);
  const lenis = useLenis();
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    requestAnimationFrame(() => panel.current?.querySelector<HTMLElement>("a,button")?.focus());
    return () => {
      lenis?.start();
      document.documentElement.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open, lenis, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          ref={panel}
          role="dialog"
          aria-modal="true"
          aria-label={th("menu")}
          data-lenis-prevent
          initial={{ clipPath: "circle(0% at 100% 0%)" }}
          animate={{ clipPath: "circle(150% at 100% 0%)" }}
          exit={{ clipPath: "circle(0% at 100% 0%)", transition: { duration: 0.35, ease: [0.76, 0, 0.24, 1] } }}
          transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
          className="bg-paper fixed inset-x-0 top-[var(--header-h)] bottom-0 z-40 overflow-y-auto lg:hidden"
        >
          <motion.nav
            initial="closed"
            animate="open"
            exit="closed"
            variants={list}
            className="container-x flex min-h-full flex-col pt-4 pb-10"
            aria-label={th("menu")}
          >
            <ul className="divide-line border-line divide-y border-y">
              <motion.li variants={item}>
                <Link
                  href="/"
                  className={cn(
                    "font-display flex min-h-16 items-center text-2xl",
                    isActive("/") && "text-primary-ink",
                  )}
                >
                  {t("home")}
                </Link>
              </motion.li>
              {nav.map((n) =>
                n.children ? (
                  <motion.li key={n.key} variants={item}>
                    <button
                      type="button"
                      aria-expanded={expanded === n.key}
                      aria-controls={`mm-${n.key}`}
                      onClick={() => setExpanded((e) => (e === n.key ? null : n.key))}
                      className="font-display flex min-h-16 w-full items-center justify-between text-left text-2xl"
                    >
                      {t(n.key)}
                      <Plus
                        className={cn("size-6 transition-transform duration-300", expanded === n.key && "rotate-45")}
                        strokeWidth={1.6}
                        aria-hidden="true"
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {expanded === n.key && (
                        <motion.ul
                          id={`mm-${n.key}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          {n.children.map((c) => (
                            <li key={c.key}>
                              <Link
                                href={c.href}
                                aria-current={isActive(c.href) ? "page" : undefined}
                                className="flex min-h-14 items-center gap-3 pb-1 pl-1"
                              >
                                <span
                                  aria-hidden="true"
                                  className="size-2 rounded-full"
                                  style={{ background: c.dot }}
                                />
                                <span>
                                  <span
                                    className={cn(
                                      "block text-lg font-semibold",
                                      isActive(c.href) && "text-primary-ink",
                                    )}
                                  >
                                    {t(c.key)}
                                  </span>
                                  <span className="text-ink-2 block text-sm">{t(`${c.key}Desc`)}</span>
                                </span>
                              </Link>
                            </li>
                          ))}
                          <li className="h-3" aria-hidden="true" />
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </motion.li>
                ) : (
                  <motion.li key={n.key} variants={item}>
                    <Link
                      href={n.href}
                      aria-current={isActive(n.href) ? "page" : undefined}
                      className={cn(
                        "font-display flex min-h-16 items-center text-2xl",
                        isActive(n.href) && "text-primary-ink",
                      )}
                    >
                      {t(n.key)}
                    </Link>
                  </motion.li>
                ),
              )}
            </ul>
            <motion.div variants={item} className="mt-8">
              <Link
                href={contactHref}
                className="bg-primary text-on-primary flex min-h-14 items-center justify-center rounded-full text-lg font-semibold"
              >
                {t("contact")}
              </Link>
            </motion.div>
            <motion.div variants={item} className="mt-auto grid gap-4 pt-10">
              <ThemeSegmented />
              <LocaleSwitcher size="lg" className="justify-center" />
            </motion.div>
          </motion.nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
