import { getLocale, getTranslations } from "next-intl/server";
import { ArrowUpRight, Mail, MapPin, Phone, Clock } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { contactHref, nav } from "@/lib/nav";
import { mapEmbedSrc, school } from "@/lib/site";
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
    <footer className="relative isolate overflow-hidden border-t border-line bg-surface">
      <RingArc className="absolute -right-[22vw] -top-[18vw] -z-10 w-[62vw] min-w-[520px] text-ring" strokeWidth={1} opacity={0.7} />

      <div className="container-x grid gap-14 pb-10 pt-16 lg:grid-cols-12 lg:gap-8 lg:pt-20">
        <div className="lg:col-span-4">
          <LogoFull height={92} />
          <p className="mt-6 max-w-sm text-ink-2">{t("about")}</p>
          <div className="mt-8">
            <h2 className="sr-only">{t("follow")}</h2>
            <ul className="flex gap-2">
              {school.socials.map((s) => (
                <li key={s.id}>
                  {/* TODO: replace with real accounts */}
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${s.label} (${tc("opensInNewTab")})`}
                    className="grid size-11 place-items-center rounded-full border border-line text-ink-2 transition-colors hover:border-primary-ink hover:text-primary-ink"
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
              <h2 className="font-sans text-sm font-bold tracking-normal text-ink-3">{tn(group.key)}</h2>
              <ul className="mt-4 space-y-2.5">
                {group.children ? (
                  group.children.map((c) => (
                    <li key={c.key}>
                      <Link href={c.href} className="text-[15px] font-medium text-ink hover:text-primary-ink">
                        {tn(c.key)}
                      </Link>
                    </li>
                  ))
                ) : (
                  <li>
                    <Link href={group.href} className="text-[15px] font-medium text-ink hover:text-primary-ink">
                      {tn(group.key)}
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          ))}
          <div>
            <h2 className="font-sans text-sm font-bold tracking-normal text-ink-3">{t("partners")}</h2>
            <ul className="mt-4 space-y-2.5">
              {[
                { href: school.links.piima, label: "piima.uz", title: t("piima") },
                { href: school.links.ariza, label: "ariza.piima.uz", title: t("ariza") },
              ].map((l) => (
                <li key={l.href}>
                  <a href={l.href} target="_blank" rel="noopener noreferrer" title={l.title} className="inline-flex items-center gap-1 text-[15px] font-medium text-ink hover:text-primary-ink">
                    {l.label}
                    <ArrowUpRight className="size-3.5" aria-hidden="true" />
                    <span className="sr-only">({tc("opensInNewTab")})</span>
                  </a>
                </li>
              ))}
              <li>
                <Link href={contactHref} className="text-[15px] font-medium text-ink hover:text-primary-ink">
                  {tn("contact")}
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <div className="lg:col-span-3">
          <h2 className="font-sans text-sm font-bold tracking-normal text-ink-3">{t("contacts")}</h2>
          {/* TODO: replace with real data (lib/site.ts) */}
          <ul className="mt-4 space-y-3 text-[15px]">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-ink-3" aria-hidden="true" />
              <span>{pick(school.address, locale)}</span>
            </li>
            {school.phones.map((p) => (
              <li key={p.value} className="flex gap-3">
                <Phone className="mt-0.5 size-4 shrink-0 text-ink-3" aria-hidden="true" />
                <a href={`tel:${p.value.replace(/\s/g, "")}`} className="font-semibold hover:text-primary-ink">
                  {p.value}
                </a>
              </li>
            ))}
            <li className="flex gap-3">
              <Mail className="mt-0.5 size-4 shrink-0 text-ink-3" aria-hidden="true" />
              <a href={`mailto:${school.email}`} className="hover:text-primary-ink">
                {school.email}
              </a>
            </li>
            <li className="flex gap-3">
              <Clock className="mt-0.5 size-4 shrink-0 text-ink-3" aria-hidden="true" />
              <span>{pick(school.hours, locale)}</span>
            </li>
          </ul>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${school.geo.lat},${school.geo.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative mt-6 block aspect-[16/9] overflow-hidden rounded-[18px] border border-line"
          >
            <iframe
              src={mapEmbedSrc}
              title={t("map")}
              loading="lazy"
              tabIndex={-1}
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 h-full w-full grayscale-[0.6] dark:opacity-80 dark:invert-[0.9] dark:hue-rotate-180"
            />
            <span className="absolute bottom-2 left-2 rounded-full bg-surface/90 px-3 py-1.5 text-xs font-semibold text-ink backdrop-blur transition-colors group-hover:bg-primary group-hover:text-on-primary">
              {t("map")} <span className="sr-only">({tc("opensInNewTab")})</span>
            </span>
          </a>
        </div>
      </div>

      <div className="container-x flex flex-col-reverse gap-4 border-t border-line py-6 text-sm text-ink-3 sm:flex-row sm:items-center sm:justify-between">
        <p>
          {t("rights")} · <span>{t("placeholderNote")}</span>
        </p>
        <BackToTop label={tc("backToTop")} />
      </div>
    </footer>
  );
}
