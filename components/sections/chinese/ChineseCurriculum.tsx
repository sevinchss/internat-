"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { chineseCopy, chineseGrades, hskLevels, type ChineseGrade } from "@/data/chinese";
import { arcPath, pick, polar } from "@/lib/utils";
import { RING_END, RING_START } from "@/components/brand/Ring";
import { TabList, TabPanel } from "@/components/ui/Tabs";

const gradeLabel = (n: number, locale: string) =>
  locale === "en" ? `Grade ${n}` : locale === "ru" ? `${n} класс` : `${n}-sinf`;

// Six HSK segments along the open ring (40° → 320°), 4° gaps.
const GAP = 4;
const SPAN = (RING_END - RING_START - GAP * (hskLevels.length - 1)) / hskLevels.length;
const segs = hskLevels.map((level, i) => {
  const from = RING_START + i * (SPAN + GAP);
  return { level, from, to: from + SPAN, mid: from + SPAN / 2 };
});

function HskArc({ g, label, sub }: { g: ChineseGrade; label: string; sub: string }) {
  const C = 200;
  const R = 150;
  return (
    <svg viewBox="0 0 400 400" role="img" aria-label={label} className="block h-auto w-full">
      {segs.map((s) => {
        const state = s.level < g.hsk ? "done" : s.level === g.hsk ? "target" : "todo";
        const lp = polar(C, C, R + 34, s.mid);
        return (
          <g key={s.level}>
            <path
              d={arcPath(C, C, R, s.from, s.to)}
              fill="none"
              strokeLinecap="butt"
              style={{
                stroke: state === "target" ? "var(--accent)" : state === "done" ? "var(--ink-2)" : "var(--ring)",
                strokeWidth: state === "target" ? 16 : 8,
                transition: "stroke 300ms ease, stroke-width 300ms cubic-bezier(0.16,1,0.3,1)",
              }}
            />
            <text
              x={lp.x}
              y={lp.y}
              textAnchor="middle"
              dominantBaseline="central"
              className="font-sans"
              style={{
                fontSize: 15,
                fontWeight: state === "target" ? 700 : 500,
                fill: state === "todo" ? "var(--ink-3)" : "var(--ink)",
              }}
            >
              HSK {s.level}
            </text>
          </g>
        );
      })}
      <text
        x={C}
        y={C - 14}
        textAnchor="middle"
        className="font-display"
        style={{ fontSize: 56, fill: "var(--ink)", letterSpacing: "-0.02em" }}
      >
        HSK {g.hsk}
      </text>
      <text x={C} y={C + 28} textAnchor="middle" className="font-sans" style={{ fontSize: 16, fill: "var(--ink-2)" }}>
        {sub}
      </text>
    </svg>
  );
}

export function ChineseCurriculum() {
  const locale = useLocale();
  const c = chineseCopy.curriculum;
  const [value, setValue] = useState(String(chineseGrades[0].grade));
  const g = chineseGrades.find((x) => String(x.grade) === value) ?? chineseGrades[0];
  const arcLabel = pick(c.arcLabel, locale).replace("{grade}", String(g.grade)).replace("{level}", `HSK ${g.hsk}`);

  return (
    <section aria-labelledby="zh-curriculum" className="bg-surface py-20 lg:py-28">
      <div className="container-x">
        <div className="max-w-2xl">
          <h2 id="zh-curriculum" className="text-display-m text-ink">
            {pick(c.title, locale)}
          </h2>
          <p className="text-ink-2 mt-4">{pick(c.lead, locale)}</p>
        </div>

        <TabList
          idBase="zh-grades"
          label={pick(c.tabsLabel, locale)}
          value={value}
          onChange={setValue}
          className="-mx-1 mt-10 px-1"
          tabs={chineseGrades.map((x) => ({ id: String(x.grade), label: gradeLabel(x.grade, locale) }))}
        />

        <TabPanel
          idBase="zh-grades"
          id={value}
          className="border-line bg-paper mt-8 grid grid-cols-1 items-center gap-10 rounded-[28px] border p-6 sm:p-10 md:grid-cols-2 lg:gap-16"
        >
          <div className="mx-auto w-full max-w-[400px]">
            <HskArc g={g} label={arcLabel} sub={gradeLabel(g.grade, locale)} />
          </div>
          <div>
            <p className="text-ink-3 text-sm font-semibold">{gradeLabel(g.grade, locale)}</p>
            <p className="font-display text-display-s text-ink mt-2">{pick(g.focus, locale)}</p>
            <ul className="mt-6 space-y-2.5">
              {pick(g.topics, locale).map((t) => (
                <li key={t} className="text-ink-2 flex gap-3">
                  <span aria-hidden="true" className="bg-accent mt-[0.7em] h-px w-4 shrink-0" />
                  {t}
                </li>
              ))}
            </ul>
            <dl className="border-line mt-8 grid grid-cols-2 border-t pt-5">
              <div>
                <dt className="text-ink-3 text-sm">{pick(c.target, locale)}</dt>
                <dd className="font-display text-accent-ink mt-1 text-xl">HSK {g.hsk}</dd>
              </div>
              <div className="border-line border-l pl-5">
                <dt className="text-ink-3 text-sm">{pick(c.hours, locale)}</dt>
                <dd className="font-display text-ink mt-1 text-xl tabular-nums">{g.hours}</dd>
              </div>
            </dl>
          </div>
        </TabPanel>
        <p className="text-ink-3 mt-5 text-sm">{pick(c.note, locale)}</p>
      </div>
    </section>
  );
}
