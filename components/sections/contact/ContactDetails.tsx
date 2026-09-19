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
  labels: {
    title: string;
    address: string;
    email: string;
    hours: string;
    socials: string;
    newTab: string;
    placeholderNote: string;
    admissionNote: string;
  };
}) {
  return (
    <div>
      <h2 className="sr-only">{labels.title}</h2>
      {/* TODO: replace with real data (lib/site.ts) */}
      <ul className="divide-line border-line divide-y border-t">
        {school.phones.map((p) => (
          <li key={p.value} className="py-5">
            <p className="text-ink-3 flex items-center gap-2 text-sm font-medium">
              <Phone className="size-4" strokeWidth={1.8} aria-hidden="true" />
              {pick(p.label, locale)}
            </p>
            <a
              href={`tel:${p.value.replace(/\s/g, "")}`}
              className="group text-ink hover:text-primary-ink mt-1 inline-flex min-h-11 items-center text-[clamp(1.5rem,1.2rem+1.2vw,2.1rem)] font-light tracking-[-0.03em] tabular-nums transition-colors"
            >
              {p.value}
            </a>
          </li>
        ))}
        <li className="py-5">
          <p className="text-ink-3 flex items-center gap-2 text-sm font-medium">
            <Mail className="size-4" strokeWidth={1.8} aria-hidden="true" />
            {labels.email}
          </p>
          <a
            href={`mailto:${school.email}`}
            className="text-ink hover:text-primary-ink mt-1 inline-flex min-h-11 items-center text-lg font-medium break-all underline decoration-transparent decoration-1 underline-offset-[6px] transition-colors hover:decoration-current"
          >
            {school.email}
          </a>
        </li>
        <li className="grid gap-5 py-5 sm:grid-cols-2">
          <div>
            <p className="text-ink-3 flex items-center gap-2 text-sm font-medium">
              <MapPin className="size-4" strokeWidth={1.8} aria-hidden="true" />
              {labels.address}
            </p>
            <p className="text-ink mt-2">{pick(school.address, locale)}</p>
          </div>
          <div>
            <p className="text-ink-3 flex items-center gap-2 text-sm font-medium">
              <Clock className="size-4" strokeWidth={1.8} aria-hidden="true" />
              {labels.hours}
            </p>
            <p className="text-ink mt-2">{pick(school.hours, locale)}</p>
          </div>
        </li>
      </ul>

      <div className="mt-8">
        <h3 className="text-ink-3 font-sans text-sm font-semibold tracking-normal">{labels.socials}</h3>
        <ul className="mt-2 flex flex-wrap gap-x-6">
          {school.socials.map((s) => (
            <li key={s.id}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink-2 hover:text-primary-ink inline-flex min-h-11 items-center gap-2 text-[15px] font-medium transition-colors"
              >
                <SocialIcon id={s.id} className="size-[18px]" />
                {s.label}
                <span className="sr-only">({labels.newTab})</span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <p className="border-primary-ink text-ink-2 mt-8 border-l pl-4 text-[15px]">{labels.admissionNote}</p>
      <p className="text-ink-3 mt-4 text-sm">{labels.placeholderNote}</p>
    </div>
  );
}
