import { ExternalButton } from "@/components/ui/Button";
import { RingArc } from "@/components/brand/Ring";

/** The admission CTA: navy band (primary colour — the one allowed full-bleed fill), two big portal buttons. */
export function PortalLinks({
  title,
  text,
  portals,
  newTabLabel,
}: {
  title: string;
  text: string;
  portals: { href: string; label: string; text: string }[];
  newTabLabel: string;
}) {
  return (
    <section
      id="portallar"
      aria-labelledby="portals-title"
      className="scroll-mt-24 px-4 pb-20 sm:px-7 lg:px-10 lg:pb-28"
    >
      <div className="bg-navy relative mx-auto max-w-[1360px] overflow-hidden rounded-[32px] px-6 py-14 text-white sm:px-12 lg:px-16 lg:py-20 dark:bg-[#0b2f5e]">
        <RingArc className="absolute -right-24 -bottom-40 size-[520px] text-white" opacity={0.14} />
        <div className="relative grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6">
            <h2 id="portals-title" className="text-display-l">
              {title}
            </h2>
            <p className="text-body-l mt-5 max-w-[48ch] text-white/80">{text}</p>
          </div>
          <ul className="flex flex-col gap-4 lg:col-span-6">
            {portals.map((p, i) => (
              <li key={p.href}>
                <ExternalButton
                  href={p.href}
                  newTabLabel={newTabLabel}
                  variant={i === 0 ? "light" : "outline"}
                  className={
                    "min-h-20 w-full justify-between rounded-[20px] px-7 py-3 text-left text-lg " +
                    (i === 0
                      ? ""
                      : "hover:text-navy border-white/35 text-white before:bg-white hover:border-white dark:border-white/35")
                  }
                >
                  <span className="flex flex-col">
                    <span className="font-semibold">{p.label}</span>
                    <span
                      className={
                        "text-sm font-medium " +
                        (i === 0
                          ? "text-navy/75"
                          : "group-hover/btn:text-navy/75 text-white/75 transition-colors duration-300")
                      }
                    >
                      {p.text}
                    </span>
                  </span>
                </ExternalButton>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
