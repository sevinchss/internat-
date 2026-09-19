"use client";

import { useCallback, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { CalendarClock, Mail, Phone, Plus } from "lucide-react";
import { Drawer } from "@/components/ui/Drawer";
import { deputies, type StaffMember } from "@/data/staff";
import { leadershipCopy as c } from "@/data/leadership";
import { pick } from "@/lib/utils";
import { StaffPortrait } from "./StaffPortrait";

/**
 * Editorial directory: a sticky heading on the left, the five deputies as a hairline list on the right.
 * Each row is a button that opens a side drawer with the details.
 */
export function Deputies() {
  const locale = useLocale();
  const t = useTranslations("common");
  const [openId, setOpenId] = useState<string | null>(null);
  const close = useCallback(() => setOpenId(null), []);
  const active = deputies.find((d) => d.id === openId) ?? null;

  return (
    <section aria-labelledby="deputies-title" className="pb-24 lg:pb-36">
      <div className="container-x grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <h2 id="deputies-title" className="text-display-m">
              {pick(c.deputiesTitle, locale)}
            </h2>
            <p className="mt-5 max-w-[42ch] text-ink-2">{pick(c.deputiesIntro, locale)}</p>
          </div>
        </div>

        <ol className="border-b border-line lg:col-span-8">
          {deputies.map((p, i) => (
            <li key={p.id} className="border-t border-line">
              <Row person={p} index={i} locale={locale} onOpen={setOpenId} />
            </li>
          ))}
        </ol>
      </div>

      <Drawer open={!!active} onClose={close} label={active ? pick(active.name, locale) : ""} closeLabel={t("close")}>
        {active && <DeputyDetails person={active} locale={locale} />}
      </Drawer>
    </section>
  );
}

function Row({ person, index, locale, onOpen }: { person: StaffMember; index: number; locale: string; onOpen: (id: string) => void }) {
  const name = pick(person.name, locale);
  return (
    <button
      type="button"
      aria-haspopup="dialog"
      onClick={() => onOpen(person.id)}
      className="group grid w-full grid-cols-[auto_1fr_auto] items-center gap-4 py-6 text-left sm:grid-cols-[2.5rem_auto_1fr_auto] sm:gap-7 sm:py-8"
    >
      <span className="hidden self-start pt-1 text-[15px] font-light tabular-nums text-ink-3 sm:block" aria-hidden="true">
        {String(index + 1).padStart(2, "0")}
      </span>
      <span aria-hidden="true">
        <StaffPortrait slot={person.photo} name={name} accent={person.accent} sizes="120px" className="w-[76px] [--mono:1.35rem] sm:w-[112px] sm:[--mono:1.9rem]" />
      </span>
      <span className="min-w-0">
        <span className="flex items-center gap-2 text-[14px] font-medium text-ink-2">
          <span className="size-1.5 rounded-full" style={{ backgroundColor: person.accent }} aria-hidden="true" />
          {pick(person.area, locale)}
        </span>
        <span className="mt-1.5 block text-[clamp(1.15rem,1rem+0.7vw,1.6rem)] font-semibold leading-tight tracking-[-0.03em] text-ink">
          <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-500 ease-out group-hover:bg-[length:100%_1px] motion-reduce:transition-none">
            {name}
          </span>
        </span>
        <span className="mt-1.5 hidden max-w-[52ch] text-[15px] text-ink-2 sm:block">{pick(person.role, locale)}</span>
      </span>
      <MoreIcon label={pick(c.more, locale)} />
    </button>
  );
}

function MoreIcon({ label }: { label: string }) {
  return (
    <span className="grid size-11 shrink-0 place-items-center rounded-full border border-line text-ink transition-colors duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-paper">
      <Plus className="size-5 transition-transform duration-300 group-hover:rotate-90 motion-reduce:transition-none" strokeWidth={1.6} aria-hidden="true" />
      <span className="sr-only">{label}</span>
    </span>
  );
}

function DeputyDetails({ person, locale }: { person: StaffMember; locale: string }) {
  const t = useTranslations("common");
  const name = pick(person.name, locale);
  return (
    <div className="px-6 pb-12 sm:px-10">
      <div className="flex items-center gap-5">
        <span aria-hidden="true" className="shrink-0">
          <StaffPortrait slot={person.photo} name={name} accent={person.accent} sizes="120px" className="w-24 [--mono:1.7rem] sm:w-28" />
        </span>
        <div>
          <h2 className="text-display-s">{name}</h2>
          <p className="mt-2 text-[15px] text-ink-2">{pick(person.role, locale)}</p>
        </div>
      </div>

      <div className="mt-8 h-px w-10" style={{ backgroundColor: person.accent }} aria-hidden="true" />

      <h3 className="mt-6 text-lg">{pick(c.bio, locale)}</h3>
      <p className="mt-2 text-ink-2">{pick(person.bio, locale)}</p>

      <h3 className="mt-8 text-lg">{pick(c.duties, locale)}</h3>
      <ul className="mt-3 space-y-2.5">
        {pick(person.responsibilities, locale).map((r) => (
          <li key={r} className="flex gap-3 text-ink-2">
            <span className="mt-[0.6em] size-1.5 shrink-0 rounded-full border border-ink-3" aria-hidden="true" />
            {r}
          </li>
        ))}
      </ul>

      <h3 className="mt-8 text-lg">{pick(c.contacts, locale)}</h3>
      <ul className="mt-3 divide-y divide-line border-y border-line">
        <li className="flex items-start gap-4 py-4">
          <CalendarClock className="mt-0.5 size-5 shrink-0 text-primary-ink" strokeWidth={1.7} aria-hidden="true" />
          <div>
            <p className="text-[14px] text-ink-3">{t("reception")}</p>
            <p className="font-semibold text-ink">{pick(person.reception, locale)}</p>
          </div>
        </li>
        <li className="flex items-start gap-4 py-4">
          <Phone className="mt-0.5 size-5 shrink-0 text-primary-ink" strokeWidth={1.7} aria-hidden="true" />
          <div>
            <p className="text-[14px] text-ink-3">{t("phone")}</p>
            <p>
              <a href={`tel:${person.phone.replace(/\s/g, "")}`} className="font-semibold text-ink underline decoration-line decoration-2 underline-offset-4 hover:decoration-primary-ink">
                {person.phone}
              </a>
            </p>
          </div>
        </li>
        <li className="flex items-start gap-4 py-4">
          <Mail className="mt-0.5 size-5 shrink-0 text-primary-ink" strokeWidth={1.7} aria-hidden="true" />
          <div className="min-w-0">
            <p className="text-[14px] text-ink-3">{t("email")}</p>
            <p>
              <a href={`mailto:${person.email}`} className="break-all font-semibold text-ink underline decoration-line decoration-2 underline-offset-4 hover:decoration-primary-ink">
                {person.email}
              </a>
            </p>
          </div>
        </li>
      </ul>
    </div>
  );
}
