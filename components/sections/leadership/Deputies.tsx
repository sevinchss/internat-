"use client";

import { useCallback, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { CalendarClock, Mail, Phone, Plus } from "lucide-react";
import { Drawer } from "@/components/ui/Drawer";
import { Portrait } from "@/components/ui/Portrait";
import { deputies, type StaffMember } from "@/data/staff";
import { leadershipCopy as c } from "@/data/leadership";
import { cn, pick } from "@/lib/utils";

/** Asymmetric grid: two tall portraits + three compact rows. Each opens a side drawer with details. */
export function Deputies() {
  const locale = useLocale();
  const t = useTranslations("common");
  const [openId, setOpenId] = useState<string | null>(null);
  const close = useCallback(() => setOpenId(null), []);
  const active = deputies.find((d) => d.id === openId) ?? null;
  const [a, b, ...rest] = deputies;

  return (
    <section aria-labelledby="deputies-title" className="pb-24 lg:pb-32">
      <div className="container-x">
        <div className="grid gap-6 border-t border-line pt-10 lg:grid-cols-12 lg:gap-16 lg:pt-14">
          <h2 id="deputies-title" className="text-display-m lg:col-span-5">
            {pick(c.deputiesTitle, locale)}
          </h2>
          <p className="max-w-[56ch] text-body-l text-ink-2 lg:col-span-6 lg:col-start-7 lg:pt-2">{pick(c.deputiesIntro, locale)}</p>
        </div>

        <ul className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-12 lg:gap-x-10">
          <li className="lg:col-span-5 lg:row-span-3">
            <TallCard person={a} locale={locale} onOpen={setOpenId} ratio="aspect-[4/5]" />
          </li>
          <li className="lg:col-span-3 lg:row-span-3 lg:mt-24">
            <TallCard person={b} locale={locale} onOpen={setOpenId} ratio="aspect-[3/4]" />
          </li>
          {rest.map((p) => (
            <li key={p.id} className="sm:col-span-2 lg:col-span-4 lg:self-start">
              <RowCard person={p} locale={locale} onOpen={setOpenId} />
            </li>
          ))}
        </ul>
      </div>

      <Drawer open={!!active} onClose={close} label={active ? pick(active.name, locale) : ""} closeLabel={t("close")}>
        {active && <DeputyDetails person={active} locale={locale} />}
      </Drawer>
    </section>
  );
}

type CardProps = { person: StaffMember; locale: string; onOpen: (id: string) => void };

function TallCard({ person, locale, onOpen, ratio }: CardProps & { ratio: string }) {
  const name = pick(person.name, locale);
  return (
    <button type="button" aria-haspopup="dialog" onClick={() => onOpen(person.id)} className="group block w-full rounded-[28px] text-left">
      <span aria-hidden="true" className="block">
        <Portrait
          slot={person.photo}
          name={name}
          accent={person.accent}
          sizes="(min-width: 1024px) 34vw, (min-width: 640px) 45vw, 92vw"
          className={cn(ratio, "w-full rounded-[24px] border border-line transition-[border-color] duration-300 group-hover:border-ink/25")}
        />
      </span>
      <span className="mt-5 flex items-start justify-between gap-4">
        <span>
          <span className="block h-0.5 w-8 transition-[width] duration-300 group-hover:w-14" style={{ backgroundColor: person.accent }} aria-hidden="true" />
          <span className="mt-3 block font-display text-display-s text-ink">{name}</span>
          <span className="mt-1.5 block text-ink-2">{pick(person.role, locale)}</span>
        </span>
        <MoreIcon label={pick(c.more, locale)} />
      </span>
    </button>
  );
}

function RowCard({ person, locale, onOpen }: CardProps) {
  const name = pick(person.name, locale);
  return (
    <button
      type="button"
      aria-haspopup="dialog"
      onClick={() => onOpen(person.id)}
      className="group flex w-full items-center gap-5 border-t border-line pt-5 text-left"
    >
      <span aria-hidden="true" className="shrink-0">
        <Portrait
          slot={person.photo}
          name={name}
          accent={person.accent}
          sizes="112px"
          className="aspect-square w-24 rounded-[18px] border border-line transition-[border-color] duration-300 group-hover:border-ink/25 sm:w-28 [&>span:first-of-type]:text-[1.7rem] [&>span:last-child]:hidden"
        />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-2 text-[15px] font-semibold text-ink-2">
          <span className="size-2 rounded-full" style={{ backgroundColor: person.accent }} aria-hidden="true" />
          {pick(person.area, locale)}
        </span>
        <span className="mt-1.5 block font-display text-lg text-ink">{name}</span>
      </span>
      <MoreIcon label={pick(c.more, locale)} />
    </button>
  );
}

function MoreIcon({ label }: { label: string }) {
  return (
    <span className="grid size-11 shrink-0 place-items-center rounded-full border border-line text-ink transition-colors duration-200 group-hover:border-primary-ink group-hover:text-primary-ink">
      <Plus className="size-5" strokeWidth={1.7} aria-hidden="true" />
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
          <Portrait slot={person.photo} name={name} accent={person.accent} sizes="112px" className="aspect-square w-24 rounded-[20px] sm:w-28 [&>span:first-of-type]:text-[1.7rem] [&>span:last-child]:hidden" />
        </span>
        <div>
          <h2 className="text-display-s">{name}</h2>
          <p className="mt-2 text-[15px] text-ink-2">{pick(person.role, locale)}</p>
        </div>
      </div>

      <div className="mt-8 h-0.5 w-10" style={{ backgroundColor: person.accent }} aria-hidden="true" />

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
