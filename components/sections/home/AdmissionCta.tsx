import { getLocale, getTranslations } from "next-intl/server";
import { cta } from "@/data/home";
import { school } from "@/lib/site";
import { pick } from "@/lib/utils";
import { ButtonLink, ExternalButton } from "@/components/ui/Button";
import { RingArc } from "@/components/brand/Ring";
import { SectionLabel } from "./SectionLabel";

/** The page's closing moment: a navy panel with the open ring and a single dot on its orbit (echoes the hero). */
export async function AdmissionCta() {
  const locale = await getLocale();
  const t = await getTranslations("common");
  const tn = await getTranslations("nav");
  return (
    <section className="container-x pt-8 pb-28 lg:pb-40">
      <div className="bg-navy relative isolate overflow-hidden rounded-[28px] px-6 py-16 text-white sm:px-12 lg:px-16 lg:py-24 dark:bg-[#0a3a70]">
        {/* inner hairline frame */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-2.5 rounded-[20px] border border-white/10"
        />

        {/* ring composition, right */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-[58%] -right-[38%] -z-10 aspect-square w-[120%] -translate-y-1/2 sm:-right-[22%] sm:w-[80%] lg:top-1/2 lg:-right-[6%] lg:w-[52%]"
        >
          <span className="absolute inset-0 rounded-full border border-white/15" />
          <RingArc className="absolute inset-[9%] text-white/35" strokeWidth={1.2} />
          <span className="absolute inset-[24%] rounded-full border border-dashed border-white/15" />
          <div className="absolute inset-0 rotate-[38deg]">
            <span className="bg-amber ring-navy absolute top-0 left-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full ring-[5px] dark:ring-[#0a3a70]" />
          </div>
        </div>

        <div className="relative max-w-[640px]">
          <SectionLabel n="07" light>
            {tn("admission")}
          </SectionLabel>
          <h2 className="text-display-l mt-8 text-white">{pick(cta.title, locale)}</h2>
          <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-white/80">{pick(cta.text, locale)}</p>
          <div className="mt-12 flex flex-wrap gap-3">
            <ButtonLink href="/qabul" variant="light">
              {tn("admission")}
            </ButtonLink>
            <ExternalButton
              href={school.links.ariza}
              variant="outline"
              className="hover:text-navy border-white/35 text-white before:bg-white hover:border-white dark:border-white/35"
              newTabLabel={t("opensInNewTab")}
            >
              ariza.piima.uz
            </ExternalButton>
          </div>
        </div>
      </div>
    </section>
  );
}
