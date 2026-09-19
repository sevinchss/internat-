"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { cefrLevels, englishCopy, englishGrades, type EnglishGrade } from "@/data/english";
import { cn, pick } from "@/lib/utils";
import { TabList, TabPanel } from "@/components/ui/Tabs";

const gradeLabel = (n: number, locale: string) =>
  locale === "en" ? `Grade ${n}` : locale === "ru" ? `${n} класс` : `${n}-sinf`;
const levelName = (g: EnglishGrade) => `${g.cefr}${g.plus ? "+" : ""}`;

/** CEFR as a staircase: steps behind the target are navy, the target is amber, the rest are outlines. */
function CefrStairs({ g }: { g: EnglishGrade }) {
  const target = cefrLevels.indexOf(g.cefr);
  return (
    <ol className="flex h-56 items-end gap-1.5 sm:h-64 sm:gap-2" aria-label="CEFR">
      {cefrLevels.map((lvl, i) => {
        const state = i < target ? "done" : i === target ? "target" : "todo";
        return (
          <li
            key={lvl}
            className="flex h-full flex-1 flex-col justify-end"
            aria-current={state === "target" ? "step" : undefined}
          >
            <span
              className={cn(
                "relative block rounded-t-[3px] transition-[height,background-color,border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                state === "done" && "bg-primary",
                state === "target" && "bg-amber",
                state === "todo" && "border-ring border border-b-0 border-dashed bg-transparent",
              )}
              style={{ height: `${18 + i * 16}%` }}
            >
              {state === "target" && g.plus && (
                <span
                  aria-hidden="true"
                  className="text-ink absolute -top-7 left-1/2 -translate-x-1/2 text-lg font-light"
                >
                  +
                </span>
              )}
            </span>
            <span className={cn("mt-2 text-center text-sm font-medium", state === "todo" ? "text-ink-3" : "text-ink")}>
              {lvl}
              {state === "target" && g.plus ? <span className="sr-only">+</span> : null}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

export function EnglishCurriculum() {
  const locale = useLocale();
  const c = englishCopy.curriculum;
  const [value, setValue] = useState(String(englishGrades[0].grade));
  const g = englishGrades.find((x) => String(x.grade) === value) ?? englishGrades[0];

  return (
    <section aria-labelledby="en-curriculum" className="container-x py-20 lg:py-32">
      <div aria-hidden="true" className="bg-line mb-16 h-px lg:mb-24" />
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h2 id="en-curriculum" className="text-display-m text-ink">
            {pick(c.title, locale)}
          </h2>
          <p className="text-ink-2 mt-4 max-w-[38ch]">{pick(c.lead, locale)}</p>
        </div>

        <div className="lg:col-span-8">
          <TabList
            idBase="en-grades"
            label={pick(c.tabsLabel, locale)}
            value={value}
            onChange={setValue}
            pillClassName="bg-primary text-on-primary"
            className="-mx-1 px-1"
            tabs={englishGrades.map((x) => ({ id: String(x.grade), label: gradeLabel(x.grade, locale) }))}
          />
          <TabPanel
            idBase="en-grades"
            id={value}
            className="border-line mt-8 grid grid-cols-1 gap-10 border-t pt-8 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-12"
          >
            <div>
              <p className="text-ink-3 text-sm">{pick(c.target, locale)}</p>
              <p className="text-ink mt-1 text-[clamp(2.75rem,2rem+2.6vw,4rem)] leading-none font-light tracking-[-0.04em]">{levelName(g)}</p>
              <div className="mt-6">
                <CefrStairs g={g} />
              </div>
            </div>
            <div>
              <p className="text-display-s text-ink font-semibold">{pick(g.focus, locale)}</p>
              <ul className="border-line mt-6 grid grid-cols-1 border-t sm:grid-cols-2 sm:gap-x-8">
                {pick(g.topics, locale).map((t) => (
                  <li key={t} className="border-line text-ink flex items-center gap-3 border-b py-3 text-[15px]">
                    <span aria-hidden="true" className="bg-amber h-px w-3 shrink-0" />
                    {t}
                  </li>
                ))}
              </ul>
              <dl className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <dt className="text-ink-3 text-sm">{pick(c.reading, locale)}</dt>
                  <dd className="text-ink mt-1">
                    {g.books.map((b, i) => (
                      <span key={b} lang="en">
                        {i > 0 && ", "}
                        <cite className="decoration-amber not-italic underline decoration-2 underline-offset-4">
                          {b}
                        </cite>
                      </span>
                    ))}
                  </dd>
                </div>
                <div>
                  <dt className="text-ink-3 text-sm">{pick(c.hours, locale)}</dt>
                  <dd className="text-ink mt-1 text-2xl font-light tabular-nums">{g.hours}</dd>
                </div>
              </dl>
            </div>
          </TabPanel>
          <p className="text-ink-3 mt-6 text-sm">{pick(c.note, locale)}</p>
        </div>
      </div>
    </section>
  );
}
