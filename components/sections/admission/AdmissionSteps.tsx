import { RING_END, RING_START } from "@/components/brand/Ring";
import { arcPath } from "@/lib/utils";

/** Numbered stepper — the real sequence. Horizontal track on desktop, vertical rail on mobile. */
export function AdmissionSteps({ title, steps }: { title: string; steps: { title: string; text: string }[] }) {
  return (
    <section aria-labelledby="steps-title" className="border-y border-line bg-surface py-20 lg:py-28">
      <div className="container-x">
        <h2 id="steps-title" className="max-w-[18ch] text-display-l">
          {title}
        </h2>
        <ol className="relative mt-14 grid gap-10 lg:mt-20 lg:grid-cols-4 lg:gap-8">
          {/* the rail */}
          <span aria-hidden="true" className="absolute top-0 bottom-0 left-[27px] w-px bg-line lg:top-[27px] lg:right-0 lg:bottom-auto lg:left-0 lg:h-px lg:w-auto" />
          {steps.map((s, i) => (
            <li key={s.title} className="relative grid grid-cols-[56px_1fr] gap-5 lg:block">
              <span className="relative grid size-14 place-items-center rounded-full bg-surface">
                <svg viewBox="0 0 56 56" aria-hidden="true" className="absolute inset-0 size-full">
                  <path d={arcPath(28, 28, 26, RING_START, RING_END)} fill="none" stroke="var(--ring)" strokeWidth="1.5" />
                  <path d={arcPath(28, 28, 26, RING_START, RING_START + ((RING_END - RING_START) * (i + 1)) / steps.length)} fill="none" stroke="var(--primary-ink)" strokeWidth="2.5" />
                </svg>
                <span className="font-display text-lg text-ink">
                  <span className="sr-only">{i + 1}. </span>
                  <span aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                </span>
              </span>
              <div className="pt-2 lg:mt-8 lg:pt-0 lg:pr-4">
                <h3 className="font-display text-display-s">{s.title}</h3>
                <p className="mt-3 max-w-[40ch] text-ink-2">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
