import { getTranslations, setRequestLocale } from "next-intl/server";
import { pageMetadata } from "@/lib/seo";
import { formatNumber, pick, type L10n } from "@/lib/utils";
import { admissionFacts, admissionPage as a, nextAdmissionOpens } from "@/data/admission";
import { AdmissionHero } from "@/components/sections/admission/AdmissionHero";
import { AdmissionSteps } from "@/components/sections/admission/AdmissionSteps";
import { ExamTable } from "@/components/sections/admission/ExamTable";
import { GradesBand } from "@/components/sections/admission/GradesBand";
import { DocumentsList } from "@/components/sections/admission/DocumentsList";
import { AdmissionFaq } from "@/components/sections/admission/AdmissionFaq";
import { PortalLinks } from "@/components/sections/admission/PortalLinks";

export async function generateMetadata({ params }: PageProps<"/[locale]/qabul">) {
  const { locale } = await params;
  return pageMetadata(locale, "admission", "/qabul");
}

export default async function AdmissionPage({ params }: PageProps<"/[locale]/qabul">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("common");
  const p = (v: L10n) => pick(v, locale);

  return (
    <>
      <AdmissionHero
        title={p(a.title)}
        lead={p(a.lead)}
        status={p(a.status)}
        statusNote={p(a.statusNote)}
        year="2026/2027"
        lastRound={p(a.lastRound)}
        lastRoundDates={p(a.lastRoundDates)}
        portalsLabel={p(a.portalsTitle)}
        opensAt={nextAdmissionOpens}
        countdown={{
          title: p(a.countdownTitle),
          openText: p(a.countdownOpen),
          units: { days: p(a.units.days), hours: p(a.units.hours), minutes: p(a.units.minutes) },
        }}
      />

      <AdmissionSteps title={p(a.stepsTitle)} steps={a.steps.map((s) => ({ title: p(s.title), text: p(s.text) }))} />

      <ExamTable
        title={p(a.examTitle)}
        lead={p(a.examLead)}
        caption={p(a.examCaption)}
        cols={{ subject: p(a.examCols.subject), section: p(a.examCols.section), questions: p(a.examCols.questions) }}
        totalLabel={p(a.examTotal)}
        note={p(a.examNote)}
        groups={[
          {
            subject: p(a.subjects.math),
            total: 40,
            rows: [
              { section: p(a.sections.critical), questions: 16, share: 16 / 40, color: "var(--primary-ink)" },
              { section: p(a.sections.problem), questions: 24, share: 24 / 40, color: "var(--primary-ink)" },
            ],
          },
          {
            subject: p(a.subjects.english),
            total: 40,
            rows: [{ section: p(a.sections.readingGrammar), questions: 40, share: 1, color: "var(--amber)" }],
          },
        ]}
      />

      <GradesBand
        title={p(a.gradesTitle)}
        grades={admissionFacts.grades}
        gradeWord={p(a.gradeWord)}
        gradeWordFirst={locale === "en"}
        note={p(a.gradesNote)}
        applications={formatNumber(admissionFacts.applications, locale)}
        applicationsLabel={p(a.applicationsLabel)}
        dates={p(a.lastRoundDates)}
      />

      <DocumentsList title={p(a.docsTitle)} badge={p(a.docsBadge)} items={a.docs.map((d) => p(d))} />

      <AdmissionFaq title={p(a.faqTitle)} contactPrompt={p(a.contactPrompt)} items={a.faq.map((f) => ({ q: p(f.q), a: p(f.a) }))} />

      <PortalLinks
        title={p(a.portalsTitle)}
        text={p(a.portalsText)}
        newTabLabel={t("opensInNewTab")}
        portals={a.portals.map((x) => ({ href: x.href, label: x.label, text: p(x.text) }))}
      />
    </>
  );
}
