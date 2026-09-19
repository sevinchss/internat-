import { getLocale, getTranslations } from "next-intl/server";
import { ArrowUpRight, Mail, MapPin, Phone, Clock } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { contactHref, nav } from "@/lib/nav";
import { school } from "@/lib/site";
import { pick } from "@/lib/utils";
import { LogoFull } from "@/components/brand/Logo";
import { RingArc } from "@/components/brand/Ring";
import { SocialIcon } from "@/components/brand/SocialIcon";
import { BackToTop } from "./BackToTop";

export async function Footer() {
  const locale = await getLocale();
  const t = await getTranslations("footer");
  const tn = await getTranslations("nav");
  const tc = await getTranslations("common");

  return (
    <footer className="border-line relative isolate overflow-hidden border-t">
      <RingArc
        className="text-ring absolute -top-[18vw] -right-[22vw] -z-10 w-[62vw] min-w-[520px]"
        strokeWidth={1}
        opacity={0.7}
      />

      <div className="container-x grid gap-14 pt-16 pb-10 lg:grid-cols-12 lg:gap-8 lg:pt-20">
        <div className="lg:col-span-4">
          <LogoFull height={92} />
          <p className="text-ink-2 mt-6 max-w-sm">{t("about")}</p>
          <div className="mt-8">
            <h2 className="sr-only">{t("follow")}</h2>
            <ul className="flex gap-2">
              {school.socials.map((s) => (
                <li key={s.id}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${s.label} (${tc("opensInNewTab")})`}
                    className="border-line text-ink-2 hover:border-primary-ink hover:text-primary-ink grid size-11 place-items-center rounded-full border transition-colors"
                  >
                    <SocialIcon id={s.id} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <nav aria-label={tn("home")} className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:col-span-5">
          {nav.map((group) => (
            <div key={group.key}>
              <h2 className="text-ink-3 font-sans text-sm font-semibold tracking-normal">{tn(group.key)}</h2>
              <ul className="mt-4 space-y-2.5">
                {group.children ? (
                  group.children.map((c) => (
                    <li key={c.key}>
                      <Link href={c.href} className="text-ink hover:text-primary-ink text-[15px] font-medium">
                        {tn(c.key)}
                      </Link>
                    </li>
                  ))
                ) : (
                  <li>
                    <Link href={group.href} className="text-ink hover:text-primary-ink text-[15px] font-medium">
                      {tn(group.key)}
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          ))}
          <div>
            <h2 className="text-ink-3 font-sans text-sm font-semibold tracking-normal">{t("partners")}</h2>
            <ul className="mt-4 space-y-2.5">
              {[
                { href: school.links.piima, label: "piima.uz", title: t("piima") },
                { href: school.links.ariza, label: "ariza.piima.uz", title: t("ariza") },
              ].map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={l.title}
                    className="text-ink hover:text-primary-ink inline-flex items-center gap-1 text-[15px] font-medium"
                  >
                    {l.label}
                    <ArrowUpRight className="size-3.5" aria-hidden="true" />
                    <span className="sr-only">({tc("opensInNewTab")})</span>
                  </a>
                </li>
              ))}
              <li>
                <Link href={contactHref} className="text-ink hover:text-primary-ink text-[15px] font-medium">
                  {tn("contact")}
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <div className="lg:col-span-3">
          <h2 className="text-ink-3 font-sans text-sm font-semibold tracking-normal">{t("contacts")}</h2>
          {/* TODO: replace with real data (lib/site.ts) */}
          <ul className="mt-4 space-y-3 text-[15px]">
            <li className="flex gap-3">
              <MapPin className="text-ink-3 mt-0.5 size-4 shrink-0" aria-hidden="true" />
              <span>{pick(school.address, locale)}</span>
            </li>
            {school.phones.map((p) => (
              <li key={p.value} className="flex gap-3">
                <Phone className="text-ink-3 mt-0.5 size-4 shrink-0" aria-hidden="true" />
                <a href={`tel:${p.value.replace(/\s/g, "")}`} className="hover:text-primary-ink font-semibold">
                  {p.value}
                </a>
              </li>
            ))}
            <li className="flex gap-3">
              <Mail className="text-ink-3 mt-0.5 size-4 shrink-0" aria-hidden="true" />
              <a href={`mailto:${school.email}`} className="hover:text-primary-ink">
                {school.email}
              </a>
            </li>
            <li className="flex gap-3">
              <Clock className="text-ink-3 mt-0.5 size-4 shrink-0" aria-hidden="true" />
              <span>{pick(school.hours, locale)}</span>
            </li>
          </ul>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${school.geo.lat},${school.geo.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group border-line relative mt-6 block aspect-[16/9] overflow-hidden rounded-[18px] border"
          >
            {/* no iframe here: the footer is on every page, so it only links out (the contact page has the live map) */}
            <svg
              aria-hidden="true"
              className="bg-surface-2 text-line absolute inset-0 h-full w-full"
              preserveAspectRatio="xMidYMid slice"
              viewBox="0 0 320 180"
            >
              <g stroke="currentColor" fill="none" strokeLinecap="round">
                <path strokeWidth="5" d="M-10 55 C 70 45, 150 80, 330 48" />
                <path strokeWidth="5" d="M-10 140 C 100 120, 210 160, 330 120" />
                <path strokeWidth="5" d="M100 -10 C 90 70, 125 120, 105 190" />
                <path strokeWidth="2" d="M230 -10 C 240 70, 205 130, 225 190" />
              </g>
              <circle cx="168" cy="88" r="16" fill="none" stroke="var(--primary-ink)" strokeOpacity="0.35" />
              <circle cx="168" cy="88" r="5" fill="var(--primary-ink)" />
            </svg>
            <span className="bg-surface text-ink group-hover:bg-primary group-hover:text-on-primary absolute bottom-2 left-2 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors">
              {t("map")} <span className="sr-only">({tc("opensInNewTab")})</span>
            </span>
          </a>
        </div>
      </div>

      <div className="container-x border-line text-ink-3 flex flex-col-reverse gap-4 border-t py-6 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p>
          {t("rights")} · <span>{t("placeholderNote")}</span>
        </p>
        <BackToTop label={tc("backToTop")} />
      </div>
    </footer>
  );
}
