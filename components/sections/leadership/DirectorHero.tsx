import { CalendarClock, Mail, MapPin, Phone } from "lucide-react";
import { director } from "@/data/staff";
import { leadershipCopy as c } from "@/data/leadership";
import { pick } from "@/lib/utils";
import { PortraitRing } from "./PortraitRing";
import { StaffPortrait } from "./StaffPortrait";

/** Editorial opening: circular portrait inside the drawn ring (5/12) | welcome letter (7/12), signature, office hours. */
export function DirectorHero({ locale }: { locale: string }) {
  const name = pick(director.name, locale);
  const role = pick(director.role, locale);
  return (
    <section aria-labelledby="leadership-title" className="relative pb-24 pt-32 sm:pt-36 lg:pb-36 lg:pt-44">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
          <h1 id="leadership-title" className="text-display-xl">
            {pick(c.title, locale)}
          </h1>
          <p className="max-w-[34ch] text-[14px] leading-relaxed text-ink-3 sm:text-right">{pick(c.placeholderNote, locale)}</p>
        </div>

        <div className="mt-14 grid gap-14 lg:mt-20 lg:grid-cols-12 lg:gap-16">
          {/* Portrait */}
          <figure className="lg:col-span-5">
            <div className="relative mx-auto w-[min(100%,420px)] lg:sticky lg:top-32 lg:mx-0 lg:w-full lg:max-w-[440px]">
              <div className="relative aspect-square">
                <PortraitRing className="pointer-events-none absolute inset-0 size-full overflow-visible" />
                <StaffPortrait
                  slot={director.photo}
                  name={name}
                  accent="var(--primary-ink)"
                  ring={false}
                  priority
                  sizes="(min-width: 1024px) 400px, 380px"
                  className="absolute inset-[7%] [--mono:clamp(3.5rem,11vw,6.5rem)]"
                />
              </div>
              <figcaption className="mt-8 text-center lg:text-left">
                <span className="block text-xl font-semibold tracking-[-0.02em] text-ink">{name}</span>
                <span className="mt-1 block text-[15px] text-ink-2">{role}</span>
              </figcaption>
            </div>
          </figure>

          {/* Welcome letter */}
          <div className="lg:col-span-7 lg:pt-4">
            <h2 className="flex items-center gap-3 text-[15px] text-ink-2" style={{ fontWeight: 500, letterSpacing: 0 }}>
              <span className="h-px w-10 bg-primary-ink" aria-hidden="true" />
              {pick(c.welcomeLabel, locale)}
            </h2>
            <p className="mt-7 text-[clamp(1.6rem,1.1rem+1.9vw,2.6rem)] font-light leading-[1.22] tracking-[-0.03em] text-ink">
              {pick(director.welcome.lead, locale)}
            </p>
            <div className="mt-10 grid gap-5 text-ink-2 md:grid-cols-2 md:gap-x-10">
              {pick(director.welcome.body, locale).map((p, i) => (
                <p key={i} className={i === 0 ? "text-body-l text-ink md:col-span-2" : "max-w-[42ch]"}>
                  {p}
                </p>
              ))}
            </div>

            {/* Signature */}
            <div className="mt-12 flex items-center gap-5 border-t border-line pt-8">
              <span className="h-px w-10 bg-ink-3" aria-hidden="true" />
              <p className="leading-tight">
                <span className="block text-lg font-semibold tracking-[-0.02em] text-ink">{name}</span>
                <span className="text-[15px] text-ink-3">{role}</span>
              </p>
            </div>

            {/* Office hours */}
            <section aria-labelledby="director-reception" className="frame mt-14 p-6 sm:p-9">
              <h3 id="director-reception" className="text-display-s">
                {pick(c.reception, locale)}
              </h3>
              <ul className="mt-7 grid gap-x-10 gap-y-6 sm:grid-cols-2">
                <Item icon={CalendarClock}>
                  <span className="font-semibold text-ink">{pick(director.reception, locale)}</span>
                </Item>
                <Item icon={MapPin}>
                  <span className="text-ink-2">{pick(director.receptionPlace, locale)}</span>
                </Item>
                <Item icon={Phone}>
                  <a href={`tel:${director.phone.replace(/\s/g, "")}`} className="font-semibold text-ink underline decoration-line decoration-2 underline-offset-4 transition-colors hover:decoration-primary-ink">
                    {director.phone}
                  </a>
                </Item>
                <Item icon={Mail}>
                  <a href={`mailto:${director.email}`} className="break-all font-semibold text-ink underline decoration-line decoration-2 underline-offset-4 transition-colors hover:decoration-primary-ink">
                    {director.email}
                  </a>
                </Item>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}

function Item({ icon: Icon, children }: { icon: React.ComponentType<{ className?: string; strokeWidth?: number; "aria-hidden"?: boolean }>; children: React.ReactNode }) {
  return (
    <li className="flex gap-3.5">
      <span className="shrink-0">
        <Icon className="mt-0.5 size-5 text-primary-ink" strokeWidth={1.6} aria-hidden />
      </span>
      <span className="min-w-0">{children}</span>
    </li>
  );
}
