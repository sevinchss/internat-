import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { SocialIcon } from "@/components/brand/SocialIcon";
import { school } from "@/lib/site";
import { pick } from "@/lib/utils";

/** Contact details from lib/site.ts (placeholders there). Phones are the most prominent — most parents call. */
export function ContactDetails({
  locale,
  labels,
}: {
  locale: string;
  labels: { title: string; address: string; email: string; hours: string; socials: string; newTab: string; placeholderNote: string; admissionNote: string };
}) {
  return (
    <div>
      <h2 className="sr-only">{labels.title}</h2>
      {/* TODO: replace with real data (lib/site.ts) */}
      <ul className="divide-y divide-line border-y border-line">
        {school.phones.map((p) => (
          <li key={p.value} className="py-5">
            <p className="flex items-center gap-2 text-sm font-semibold text-ink-3">
              <Phone className="size-4" strokeWidth={1.8} aria-hidden="true" />
              {pick(p.label, locale)}
            </p>
            <a href={`tel:${p.value.replace(/\s/g, "")}`} className="mt-1 inline-flex min-h-11 items-center font-display text-display-s tabular-nums text-ink hover:text-primary-ink">
              {p.value}
            </a>
          </li>
        ))}
        <li className="py-5">
          <p className="flex items-center gap-2 text-sm font-semibold text-ink-3">
            <Mail className="size-4" strokeWidth={1.8} aria-hidden="true" />
            {labels.email}
          </p>
          <a href={`mailto:${school.email}`} className="mt-1 inline-flex min-h-11 items-center text-lg font-semibold break-all text-ink hover:text-primary-ink">
            {school.email}
          </a>
        </li>
        <li className="grid gap-5 py-5 sm:grid-cols-2">
          <div>
            <p className="flex items-center gap-2 text-sm font-semibold text-ink-3">
              <MapPin className="size-4" strokeWidth={1.8} aria-hidden="true" />
              {labels.address}
            </p>
            <p className="mt-2 text-ink">{pick(school.address, locale)}</p>
          </div>
          <div>
            <p className="flex items-center gap-2 text-sm font-semibold text-ink-3">
              <Clock className="size-4" strokeWidth={1.8} aria-hidden="true" />
              {labels.hours}
            </p>
            <p className="mt-2 text-ink">{pick(school.hours, locale)}</p>
          </div>
        </li>
      </ul>

      <div className="mt-8">
        <h3 className="font-sans text-sm font-semibold tracking-normal text-ink-3">{labels.socials}</h3>
        <ul className="mt-3 flex flex-wrap gap-2">
          {school.socials.map((s) => (
            <li key={s.id}>
              {/* TODO: replace with real accounts */}
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line px-4 text-[15px] font-semibold text-ink-2 transition-colors hover:border-primary-ink hover:text-primary-ink"
              >
                <SocialIcon id={s.id} className="size-[18px]" />
                {s.label}
                <span className="sr-only">({labels.newTab})</span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-8 border-l-2 border-primary-ink pl-4 text-[15px] text-ink-2">{labels.admissionNote}</p>
      <p className="mt-4 text-sm text-ink-3">{labels.placeholderNote}</p>
    </div>
  );
}
