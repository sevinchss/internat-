import { SITE_URL, school } from "@/lib/site";
import { pick } from "@/lib/utils";

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export function SchoolJsonLd({ locale }: { locale: string }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": ["School", "EducationalOrganization"],
        "@id": `${SITE_URL}/#school`,
        name: pick(school.name, locale),
        alternateName: [school.brandName, school.name.uz, school.name.ru],
        url: `${SITE_URL}/${locale}`,
        logo: `${SITE_URL}/brand/logo-full.png`,
        image: `${SITE_URL}/brand/og-base.png`,
        foundingDate: "2026",
        email: school.email,
        telephone: school.phones[0].value,
        address: {
          "@type": "PostalAddress",
          streetAddress: pick(school.address, locale),
          addressLocality: "Tashkent",
          addressCountry: "UZ",
        },
        geo: { "@type": "GeoCoordinates", latitude: school.geo.lat, longitude: school.geo.lng },
        parentOrganization: {
          "@type": "GovernmentOrganization",
          name: "Ixtisoslashtirilgan taʼlim muassasalari agentligi",
          url: school.links.piima,
        },
        availableLanguage: ["uz", "en", "ru"],
        sameAs: school.socials.map((s) => s.href),
      }}
    />
  );
}
