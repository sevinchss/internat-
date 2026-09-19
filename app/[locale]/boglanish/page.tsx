import { getTranslations, setRequestLocale } from "next-intl/server";
import { pageMetadata } from "@/lib/seo";
import { school } from "@/lib/site";
import { pick } from "@/lib/utils";
import { contactPage as c } from "@/data/contact";
import { ContactIntro } from "@/components/sections/contact/ContactIntro";
import { ContactDetails } from "@/components/sections/contact/ContactDetails";
import { ContactForm } from "@/components/sections/contact/ContactForm";
import { ContactMap } from "@/components/sections/contact/ContactMap";

export async function generateMetadata({ params }: PageProps<"/[locale]/boglanish">) {
  const { locale } = await params;
  return pageMetadata(locale, "contact", "/boglanish");
}

export default async function ContactPage({ params }: PageProps<"/[locale]/boglanish">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("common");

  return (
    <>
      <section className="container-x pt-32 pb-20 sm:pt-36 lg:pb-28">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <ContactIntro title={pick(c.title, locale)} lead={pick(c.lead, locale)} />
            <div className="mt-12">
              <ContactDetails
                locale={locale}
                labels={{
                  title: pick(c.detailsTitle, locale),
                  address: t("address"),
                  email: t("email"),
                  hours: t("hours"),
                  socials: pick(c.socialsTitle, locale),
                  newTab: t("opensInNewTab"),
                  placeholderNote: pick(c.placeholderNote, locale),
                  admissionNote: pick(c.admissionNote, locale),
                }}
              />
            </div>
          </div>
          <div className="lg:col-span-7 lg:pt-4">
            <div className="lg:sticky lg:top-28">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <ContactMap
        title={pick(c.mapTitle, locale)}
        openLabel={pick(c.mapOpen, locale)}
        newTab={t("opensInNewTab")}
        address={pick(school.address, locale)}
      />
    </>
  );
}
