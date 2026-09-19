import { RING_END, RING_SEGMENTS, RING_START } from "@/components/brand/Ring";
import { missionCopy as c } from "@/data/mission";
import { arcPath, pick } from "@/lib/utils";

/**
 * Statement in the school's own voice (not attributed to anyone): modern education + national identity.
 * Set as a framed pull-quote; the ring holds the two landmarks (green = STEM, orange = identity) and bleeds off the frame.
 */
export function IdentityStatement({ locale }: { locale: string }) {
  const identity = RING_SEGMENTS[3]; // orange — national identity
  const modern = RING_SEGMENTS[1]; // green — STEM
  return (
    <section aria-labelledby="identity-title" className="pb-28 lg:pb-40">
      <div className="container-x">
        <div className="frame relative overflow-hidden px-6 py-14 sm:px-12 sm:py-20 lg:px-20 lg:py-24">
          <svg
            viewBox="0 0 240 240"
            className="pointer-events-none absolute -top-24 -right-24 w-[320px] opacity-90 sm:-top-28 sm:-right-20 sm:w-[440px] lg:w-[520px]"
            aria-hidden="true"
          >
            <path d={arcPath(120, 120, 104, RING_START, RING_END)} fill="none" stroke="var(--ring)" strokeWidth={0.8} />
            <path
              d={arcPath(120, 120, 104, modern.from, modern.to)}
              fill="none"
              stroke={modern.color}
              strokeWidth={3}
              strokeLinecap="round"
            />
            <path
              d={arcPath(120, 120, 104, identity.from, identity.to)}
              fill="none"
              stroke={identity.color}
              strokeWidth={3}
              strokeLinecap="round"
            />
            <path
              d={arcPath(120, 120, 84, RING_START + 20, RING_END - 20)}
              fill="none"
              stroke="var(--line)"
              strokeWidth={0.8}
            />
          </svg>
          <h2
            id="identity-title"
            className="text-ink-2 relative flex items-center gap-3 text-[15px]"
            style={{ fontWeight: 500, letterSpacing: 0 }}
          >
            <span className="bg-orange h-px w-10" aria-hidden="true" />
            {pick(c.statementTitle, locale)}
          </h2>
          <p className="text-ink relative mt-8 max-w-[34ch] text-[clamp(1.35rem,1.05rem+1.3vw,2.35rem)] leading-[1.4] font-light tracking-[-0.025em]">
            {pick(c.statement, locale)}
          </p>
        </div>
      </div>
    </section>
  );
}
