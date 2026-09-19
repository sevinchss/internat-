import { Phone } from "lucide-react";
import { useLocale } from "next-intl";
import { dormCopy, faq } from "@/data/dorm";
import { school } from "@/lib/site";
import { pick } from "@/lib/utils";
import { Accordion } from "@/components/ui/Accordion";

export function ParentsFaq() {
  const locale = useLocale();
  const c = dormCopy.faq;
  const phone = school.phones[1] ?? school.phones[0];
  return (
    <section aria-labelledby="dorm-faq" className="py-20 lg:py-28">
      <div className="container-x grid grid-cols-1 gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h2 id="dorm-faq" className="text-display-m text-ink">
            {pick(c.title, locale)}
          </h2>
          <p className="text-ink-2 mt-4 max-w-[36ch]">{pick(c.lead, locale)}</p>
          <a
            href={`tel:${phone.value.replace(/\s+/g, "")}`}
            className="border-ink/15 text-ink hover:border-primary-ink hover:text-primary-ink mt-8 inline-flex min-h-12 items-center gap-3 rounded-full border px-5 font-semibold transition-colors dark:border-white/20"
          >
            <Phone className="size-4" strokeWidth={1.8} aria-hidden="true" />
            <span className="sr-only">{pick(c.callLabel, locale)}:</span>
            <span className="tabular-nums">{phone.value}</span>
          </a>
        </div>
        <div className="lg:col-span-8">
          <Accordion accent="var(--orange)" items={faq.map((f) => ({ q: pick(f.q, locale), a: pick(f.a, locale) }))} />
        </div>
      </div>
    </section>
  );
}
