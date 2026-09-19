import { CalendarClock, Mail, MapPin, Phone } from "lucide-react";
import { Portrait } from "@/components/ui/Portrait";
import { director } from "@/data/staff";
import { leadershipCopy as c } from "@/data/leadership";
import { pick } from "@/lib/utils";
import { PortraitRing } from "./PortraitRing";

/** Editorial opening: portrait 5/12 | welcome letter 7/12, signature, reception hours. */
export function DirectorHero({ locale }: { locale: string }) {
  const name = pick(director.name, locale);
  const role = pick(director.role, locale);
  return (
    <section aria-labelledby="leadership-title" className="relative pb-20 pt-32 sm:pt-36 lg:pb-28 lg:pt-40">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-3 border-b border-line pb-6">
          <h1 id="leadership-title" className="text-display-l">
            {pick(c.title, locale)}
          </h1>
          <p className="max-w-sm text-[15px] text-ink-3">{pick(c.placeholderNote, locale)}</p>
        </div>

        <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-12 lg:gap-16">
          {/* Portrait */}
          <figure className="lg:col-span-5">
            <div className="relative mx-auto max-w-[460px] lg:max-w-none">
              <PortraitRing className="pointer-events-none absolute -left-[14%] -top-[10%] w-[92%] overflow-visible" />
              <Portrait
                slot={director.photo}
                name={name}
                priority
                sizes="(min-width: 1024px) 40vw, (min-width: 640px) 460px, 92vw"
                className="relative aspect-[4/5] w-full rounded-[28px] border border-line"
              />
            </div>
            <figcaption className="mx-auto mt-5 flex max-w-[460px] items-baseline justify-between gap-4 lg:max-w-none">
              <span className="font-display text-xl font-medium text-ink">{name}</span>
              <span className="text-right text-[15px] text-ink-2">{role}</span>
            </figcaption>
          </figure>

          {/* Welcome letter */}
          <div className="lg:col-span-7 lg:pt-6">
            <h2 className="flex items-center gap-3 text-[15px] text-ink-2" style={{ fontFamily: "var(--font-sans)", fontWeight: 600, letterSpacing: 0 }}>
              <span className="h-0.5 w-8 bg-primary-ink" aria-hidden="true" />
              {pick(c.welcomeLabel, locale)}
            </h2>
            <p className="mt-6 font-display text-display-m font-medium text-ink">{pick(director.welcome.lead, locale)}</p>
            <div className="mt-8 grid gap-5 text-ink-2 md:grid-cols-2 md:gap-x-10">
              {pick(director.welcome.body, locale).map((p, i) => (
                <p key={i} className={i === 0 ? "md:col-span-2 text-body-l text-ink" : ""}>
                  {p}
                </p>
              ))}
            </div>

            {/* Signature */}
            <div className="mt-10 flex items-center gap-5">
              <svg viewBox="0 0 40 40" className="size-10 shrink-0" aria-hidden="true">
                <circle cx="20" cy="20" r="18" fill="none" stroke="var(--ring)" strokeWidth="1.2" strokeDasharray="100 13" transform="rotate(40 20 20)" />
              </svg>
              <p className="leading-tight">
                <span className="block font-display text-lg text-ink">{name}</span>
                <span className="text-[15px] text-ink-3">{role}</span>
              </p>
            </div>

            {/* Reception */}
            <section aria-labelledby="director-reception" className="mt-12 rounded-[22px] border border-line bg-surface p-6 sm:p-8">
              <h3 id="director-reception" className="text-display-s">
                {pick(c.reception, locale)}
              </h3>
              <ul className="mt-5 grid gap-4 sm:grid-cols-2">
                <li className="flex gap-3">
                  <CalendarClock className="mt-1 size-5 shrink-0 text-primary-ink" strokeWidth={1.7} aria-hidden="true" />
                  <span className="font-semibold text-ink">{pick(director.reception, locale)}</span>
                </li>
                <li className="flex gap-3">
                  <MapPin className="mt-1 size-5 shrink-0 text-primary-ink" strokeWidth={1.7} aria-hidden="true" />
                  <span className="text-ink-2">{pick(director.receptionPlace, locale)}</span>
                </li>
                <li className="flex gap-3">
                  <Phone className="mt-1 size-5 shrink-0 text-primary-ink" strokeWidth={1.7} aria-hidden="true" />
                  <span>
                    <a href={`tel:${director.phone.replace(/\s/g, "")}`} className="font-semibold text-ink underline decoration-line decoration-2 underline-offset-4 hover:decoration-primary-ink">
                      {director.phone}
                    </a>
                  </span>
                </li>
                <li className="flex gap-3">
                  <Mail className="mt-1 size-5 shrink-0 text-primary-ink" strokeWidth={1.7} aria-hidden="true" />
                  <span>
                    <a href={`mailto:${director.email}`} className="break-all font-semibold text-ink underline decoration-line decoration-2 underline-offset-4 hover:decoration-primary-ink">
                      {director.email}
                    </a>
                  </span>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}
