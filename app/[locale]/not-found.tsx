import { getTranslations } from "next-intl/server";
import { ButtonLink } from "@/components/ui/Button";
import { BrokenRing } from "@/components/brand/BrokenRing";

export default async function NotFound() {
  const t = await getTranslations("notFound");
  return (
    <section className="container-x grid min-h-[100dvh] items-center gap-12 pb-20 pt-[calc(var(--header-h)+40px)] lg:grid-cols-12">
      <div className="order-2 lg:order-1 lg:col-span-6">
        <p className="font-display text-display-m text-ink-3" aria-hidden="true">
          404
        </p>
        <h1 className="mt-4 text-display-l text-ink">{t("title")}</h1>
        <p className="mt-6 max-w-[48ch] text-body-l text-ink-2">{t("text")}</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href="/">{t("home")}</ButtonLink>
          <ButtonLink href="/biz-haqimizda/yangiliklar" variant="outline">
            {t("news")}
          </ButtonLink>
          <ButtonLink href="/boglanish" variant="outline">
            {t("contact")}
          </ButtonLink>
        </div>
      </div>
      <div className="order-1 mx-auto w-full max-w-[460px] lg:order-2 lg:col-span-6">
        <BrokenRing />
      </div>
    </section>
  );
}
