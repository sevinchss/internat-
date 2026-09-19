import { getLocale, getTranslations } from "next-intl/server";
import { cta } from "@/data/home";
import { school } from "@/lib/site";
import { pick } from "@/lib/utils";
import { ButtonLink, ExternalButton } from "@/components/ui/Button";
import { RingArc } from "@/components/brand/Ring";

export async function AdmissionCta() {
  const locale = await getLocale();
  const t = await getTranslations("common");
  const tn = await getTranslations("nav");
  return (
    <section className="container-x pb-24 lg:pb-32">
      <div className="relative isolate overflow-hidden rounded-[32px] bg-navy px-6 py-16 text-white sm:px-12 lg:px-20 lg:py-24 dark:bg-[#0a3a70]">
        <RingArc className="absolute -right-24 -top-24 -z-10 w-[560px] text-white/20 lg:-right-10 lg:-top-40 lg:w-[720px]" strokeWidth={1.2} />
        <RingArc className="absolute -right-10 -top-10 -z-10 w-[380px] text-white/10 lg:right-16 lg:top-[-60px] lg:w-[480px]" strokeWidth={1} segmented={false} />
        <div className="max-w-[760px]">
          <h2 className="text-display-l text-white">{pick(cta.title, locale)}</h2>
          <p className="mt-6 max-w-[56ch] text-lg text-white/85">{pick(cta.text, locale)}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href="/qabul" variant="light">
              {tn("admission")}
            </ButtonLink>
            <ExternalButton href={school.links.ariza} variant="outline" className="border-white/40 text-white hover:border-white hover:text-white dark:border-white/40" newTabLabel={t("opensInNewTab")}>
              ariza.piima.uz
            </ExternalButton>
          </div>
        </div>
      </div>
    </section>
  );
}
