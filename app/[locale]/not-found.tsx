import { getTranslations } from "next-intl/server";
import { ButtonLink } from "@/components/ui/Button";
import { BrokenRing } from "@/components/brand/BrokenRing";

export default async function NotFound() {
  const t = await getTranslations("notFound");
  return (
    <section className="container-x grid min-h-[100dvh] items-center gap-12 pt-[calc(var(--header-h)+40px)] pb-20 lg:grid-cols-12">
      <div className="order-2 lg:order-1 lg:col-span-6">
        <p
          className="text-ink-3 text-[clamp(4.5rem,3rem+6vw,8.5rem)] leading-none font-light tracking-[-0.06em] tabular-nums"
          aria-hidden="true"
        >
          404
        </p>
        <h1 className="text-display-l text-ink mt-6">{t("title")}</h1>
        <p className="text-body-l text-ink-2 mt-6 max-w-[48ch]">{t("text")}</p>
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
      <div className="order-1 mx-auto w-full max-w-[300px] sm:max-w-[420px] lg:order-2 lg:col-span-6 lg:max-w-[480px]">
        <BrokenRing />
      </div>
    </section>
  );
}
