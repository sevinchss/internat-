"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { contactHref, nav, type NavLeaf } from "@/lib/nav";
import { school } from "@/lib/site";
import { cn, pick } from "@/lib/utils";
import { LogoFull, LogoMark } from "@/components/brand/Logo";
import { ThemeToggle } from "./ThemeToggle";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { ScrollArc } from "./ScrollArc";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const t = useTranslations("nav");
  const th = useTranslations("header");
  const locale = useLocale();
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [openKey, setOpenKey] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setSolid(y > 24);
    if (openKey || mobileOpen) return setHidden(false);
    if (y > 240 && y > prev + 4) setHidden(true);
    else if (y < prev - 4 || y < 240) setHidden(false);
  });

  // close menus on navigation
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpenKey(null);
    setMobileOpen(false);
  }

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      <a
        href="#main"
        className="bg-primary text-on-primary fixed top-3 left-4 z-[70] -translate-y-24 rounded-full px-5 py-3 font-semibold transition-transform focus:translate-y-0"
      >
        {th("skip")}
      </a>
      <motion.header
        initial={false}
        animate={{ y: hidden ? "-110%" : "0%" }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300",
          solid || mobileOpen
            ? "border-line bg-paper/85 border-b backdrop-blur-md"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="container-x flex h-[var(--header-h)] items-center gap-3">
          <Link href="/" className="group flex items-center gap-2.5 rounded-lg" aria-label={pick(school.name, locale)}>
            <span className="hidden xl:block">
              <LogoFull height={58} priority />
            </span>
            <LogoMark size={40} className="xl:hidden" priority />
            <span className="font-display text-ink max-w-[9.5rem] text-[13px] leading-[1.15] font-medium tracking-tight sm:max-w-none sm:text-sm xl:hidden">
              {pick(school.shortName, locale)}
            </span>
          </Link>
          <ScrollArc size={26} className="ml-1 hidden sm:block" />

          <nav aria-label={t("home")} className="ml-auto hidden lg:block">
            <ul className="flex items-center gap-0.5">
              {nav.map((item) =>
                item.children ? (
                  <Dropdown
                    key={item.key}
                    label={t(item.key)}
                    items={item.children}
                    open={openKey === item.key}
                    setOpen={(o) => setOpenKey(o ? item.key : null)}
                    active={item.children.some((c) => isActive(c.href))}
                    isActive={isActive}
                  />
                ) : (
                  <li key={item.key}>
                    <Link
                      href={item.href}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className={cn(
                        "hover:bg-surface-2 relative flex h-10 items-center rounded-full px-3.5 text-[15px] font-semibold transition-colors",
                        isActive(item.href) ? "text-primary-ink" : "text-ink",
                      )}
                    >
                      {t(item.key)}
                      {isActive(item.href) && <ActiveDot />}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>

          <div className="ml-auto flex items-center gap-1 lg:ml-3">
            <ThemeToggle />
            <LocaleSwitcher className="hidden md:flex" />
            <Link
              href={contactHref}
              aria-current={isActive(contactHref) ? "page" : undefined}
              className="bg-primary text-on-primary hover:bg-navy ml-2 hidden h-11 items-center rounded-full px-5 text-[15px] font-semibold shadow-[inset_0_1px_0_rgb(255_255_255/0.18)] transition-[transform,background-color] active:scale-[0.98] lg:flex dark:hover:bg-[#2474c9]"
            >
              {t("contact")}
            </Link>
            <button
              type="button"
              className="border-line text-ink ml-1 grid size-11 place-items-center rounded-full border lg:hidden"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? th("closeMenu") : th("openMenu")}
              onClick={() => setMobileOpen((o) => !o)}
            >
              <Burger open={mobileOpen} />
            </button>
          </div>
        </div>
      </motion.header>
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} isActive={isActive} />
    </>
  );
}

function ActiveDot() {
  return (
    <span
      aria-hidden="true"
      className="bg-primary-ink absolute bottom-1 left-1/2 size-1 -translate-x-1/2 rounded-full"
    />
  );
}

function Burger({ open }: { open: boolean }) {
  return (
    <span aria-hidden="true" className="relative block h-4 w-5">
      <span
        className={cn(
          "absolute left-0 h-[1.8px] w-5 rounded-full bg-current transition-transform duration-300 ease-out",
          open ? "top-[7px] rotate-45" : "top-[3px]",
        )}
      />
      <span
        className={cn(
          "absolute left-0 h-[1.8px] w-5 rounded-full bg-current transition-transform duration-300 ease-out",
          open ? "top-[7px] -rotate-45" : "top-[11px]",
        )}
      />
    </span>
  );
}

function Dropdown({
  label,
  items,
  open,
  setOpen,
  active,
  isActive,
}: {
  label: string;
  items: NavLeaf[];
  open: boolean;
  setOpen: (o: boolean) => void;
  active: boolean;
  isActive: (href: string) => boolean;
}) {
  const t = useTranslations("nav");
  const panelId = useId();
  const wrap = useRef<HTMLLIElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!wrap.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        trigger.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, setOpen]);

  const focusItem = (i: number) => {
    const links = wrap.current?.querySelectorAll<HTMLAnchorElement>("[data-dropdown-link]");
    if (!links?.length) return;
    links[(i + links.length) % links.length].focus();
  };

  return (
    <li
      ref={wrap}
      className="relative"
      onPointerEnter={(e) => {
        if (e.pointerType !== "mouse") return;
        clearTimeout(timer.current);
        setOpen(true);
      }}
      onPointerLeave={(e) => {
        if (e.pointerType !== "mouse") return;
        timer.current = setTimeout(() => setOpen(false), 140);
      }}
      onBlur={(e) => {
        if (!wrap.current?.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        ref={trigger}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen(!open)}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setOpen(true);
            requestAnimationFrame(() => focusItem(0));
          }
        }}
        className={cn(
          "hover:bg-surface-2 relative flex h-10 items-center gap-1 rounded-full px-3.5 text-[15px] font-semibold transition-colors",
          active ? "text-primary-ink" : "text-ink",
          open && "bg-surface-2",
        )}
      >
        {label}
        <ChevronDown
          className={cn("size-4 transition-transform duration-300", open && "rotate-180")}
          strokeWidth={2}
          aria-hidden="true"
        />
        {active && <ActiveDot />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            id={panelId}
            data-lenis-prevent
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98, transition: { duration: 0.12 } }}
            transition={{ type: "spring", stiffness: 420, damping: 32 }}
            style={{ transformOrigin: "top left" }}
            className="glass absolute top-[calc(100%+10px)] left-0 w-[340px] rounded-[22px] p-2 shadow-[0_24px_48px_-20px_rgb(var(--shadow)/0.28)]"
            onKeyDown={(e) => {
              const links = Array.from(wrap.current?.querySelectorAll<HTMLAnchorElement>("[data-dropdown-link]") ?? []);
              const i = links.indexOf(document.activeElement as HTMLAnchorElement);
              if (e.key === "ArrowDown") {
                e.preventDefault();
                focusItem(i + 1);
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                focusItem(i - 1);
              }
            }}
          >
            {/* hover bridge */}
            <span aria-hidden="true" className="absolute -top-3 left-0 h-3 w-full" />
            <ul>
              {items.map((it) => (
                <li key={it.key}>
                  <Link
                    data-dropdown-link
                    href={it.href}
                    aria-current={isActive(it.href) ? "page" : undefined}
                    className={cn(
                      "group hover:bg-surface-2 focus-visible:bg-surface-2 flex gap-3.5 rounded-[16px] px-3.5 py-3 transition-colors",
                      isActive(it.href) && "bg-surface-2",
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className="mt-[9px] size-2 shrink-0 rounded-full transition-transform group-hover:scale-125"
                      style={{ background: it.dot }}
                    />
                    <span>
                      <span className="text-ink block text-[15px] font-semibold">{t(it.key)}</span>
                      <span className="text-ink-2 block text-sm leading-snug">{t(`${it.key}Desc`)}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}
