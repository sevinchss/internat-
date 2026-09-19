import { RING_END, RING_SEGMENTS, RING_START } from "@/components/brand/Ring";
import { missionCopy as c } from "@/data/mission";
import { arcPath, pick } from "@/lib/utils";

/**
 * Statement band in the school's own voice (not attributed to anyone):
 * modern education + national identity. The ring shows the two landmarks held in one circle.
 */
export function IdentityStatement({ locale }: { locale: string }) {
  const identity = RING_SEGMENTS[3]; // orange — national identity
  const modern = RING_SEGMENTS[1]; // green — STEM
  return (
    <section aria-labelledby="identity-title" className="border-t border-line bg-surface py-20 lg:py-28">
      <div className="container-x grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
        <svg viewBox="0 0 240 240" className="w-40 sm:w-52 lg:col-span-4 lg:w-full lg:max-w-[340px]" aria-hidden="true">
          <path d={arcPath(120, 120, 104, RING_START, RING_END)} fill="none" stroke="var(--ring)" strokeWidth={1.5} />
          <path d={arcPath(120, 120, 104, modern.from, modern.to)} fill="none" stroke={modern.color} strokeWidth={10} />
          <path d={arcPath(120, 120, 104, identity.from, identity.to)} fill="none" stroke={identity.color} strokeWidth={10} />
          <path d={arcPath(120, 120, 78, RING_START + 20, RING_END - 20)} fill="none" stroke="var(--line)" strokeWidth={1.5} />
        </svg>
        <div className="lg:col-span-8">
          <h2 id="identity-title" className="text-display-s text-ink-2">
            {pick(c.statementTitle, locale)}
          </h2>
          <p className="mt-6 max-w-[40ch] text-[clamp(1.3rem,1.05rem+1vw,2rem)] font-medium leading-[1.45] tracking-[-0.01em] text-ink">
            {pick(c.statement, locale)}
          </p>
        </div>
      </div>
    </section>
  );
}
