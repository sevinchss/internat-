import { RING_END, RING_START } from "@/components/brand/Ring";
import { arcPath } from "@/lib/utils";

/**
 * Numbered stepper — the real sequence. Light oversized numerals on a hairline track; a small ring dial
 * next to each numeral fills up as the process advances. Columns on desktop, a vertical rail on mobile.
 */
export function AdmissionSteps({ title, steps }: { title: string; steps: { title: string; text: string }[] }) {
  return (
    <section aria-labelledby="steps-title" className="container-x py-20 lg:py-32">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <h2 id="steps-title" className="max-w-[16ch] text-display-l">
          {title}
        </h2>
        <p aria-hidden="true" className="index-label">
          <span className="h-px w-8 bg-ink-3/60" />
          {String(steps.length).padStart(2, "0")}
        </p>
      </div>

      <ol className="relative mt-14 grid gap-0 lg:mt-20 lg:grid-cols-4 lg:gap-10">
        {/* mobile rail */}
        <span aria-hidden="true" className="absolute top-3 bottom-3 left-[11px] w-px bg-line lg:hidden" />
        {steps.map((s, i) => {
          const end = RING_START + ((RING_END - RING_START) * (i + 1)) / steps.length;
          return (
            <li key={s.title} className="group relative grid grid-cols-[24px_1fr] gap-5 pb-12 last:pb-0 lg:block lg:border-t lg:border-line lg:pt-8 lg:pb-0">
              {/* desktop: the part of the track that belongs to this step */}
              <span aria-hidden="true" className="absolute -top-px left-0 hidden h-px w-12 bg-primary-ink transition-[width] duration-500 ease-out group-hover:w-full lg:block" />
              {/* mobile: dial on the rail */}
              <svg viewBox="0 0 24 24" aria-hidden="true" className="relative mt-3 size-6 bg-paper lg:hidden">
                <path d={arcPath(12, 12, 10, RING_START, RING_END)} fill="none" stroke="var(--ring)" strokeWidth="1.5" />
                <path d={arcPath(12, 12, 10, RING_START, end)} fill="none" stroke="var(--primary-ink)" strokeWidth="2" />
              </svg>
              <div>
                <div className="flex items-start justify-between gap-4">
                  <span className="text-[clamp(3rem,2.2rem+3vw,4.75rem)] leading-none font-light tracking-[-0.05em] text-ink tabular-nums">
                    <span className="sr-only">{i + 1}. </span>
                    <span aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                  </span>
                  <svg viewBox="0 0 32 32" aria-hidden="true" className="mt-2 hidden size-8 lg:block">
                    <path d={arcPath(16, 16, 13, RING_START, RING_END)} fill="none" stroke="var(--ring)" strokeWidth="1.5" />
                    <path d={arcPath(16, 16, 13, RING_START, end)} fill="none" stroke="var(--primary-ink)" strokeWidth="2" />
                  </svg>
                </div>
                <h3 className="mt-5 text-display-s font-semibold lg:mt-8">{s.title}</h3>
                <p className="mt-3 max-w-[40ch] text-ink-2">{s.text}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
