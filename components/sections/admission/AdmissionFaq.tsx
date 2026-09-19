import { Accordion, type AccordionItem } from "@/components/ui/Accordion";
import { Link } from "@/i18n/navigation";

export function AdmissionFaq({ title, items, contactPrompt }: { title: string; items: AccordionItem[]; contactPrompt: string }) {
  return (
    <section aria-labelledby="faq-title" className="container-x py-20 lg:py-28">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <h2 id="faq-title" className="text-display-m">
              {title}
            </h2>
            <Link
              href="/boglanish"
              className="mt-6 inline-flex min-h-11 items-center font-semibold text-primary-ink underline decoration-line decoration-2 underline-offset-[6px] hover:decoration-primary-ink"
            >
              {contactPrompt}
            </Link>
          </div>
        </div>
        <Accordion items={items} className="lg:col-span-8" />
      </div>
    </section>
  );
}
