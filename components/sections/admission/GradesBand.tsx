/** Grades 5 · 6 · 7 as three big numerals, next to the 22,315 applications fact. */
export function GradesBand({
  title,
  grades,
  gradeWord,
  gradeWordFirst,
  note,
  applications,
  applicationsLabel,
  dates,
}: {
  title: string;
  grades: number[];
  gradeWord: string;
  /** English: "Grade 5"; Uzbek/Russian: "5-sinf" / "5 класс" */
  gradeWordFirst: boolean;
  note: string;
  applications: string;
  applicationsLabel: string;
  dates: string;
}) {
  return (
    <section aria-labelledby="grades-title" className="py-20 lg:py-32">
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <h2 id="grades-title" className="text-display-m">
            {title}
          </h2>
          <ul className="mt-10 flex items-end gap-6 sm:gap-10">
            {grades.map((g) => (
              <li key={g} className="flex flex-col">
                <span className="sr-only">{gradeWordFirst ? `${gradeWord} ${g}` : `${g} ${gradeWord}`}</span>
                <span aria-hidden="true" className="text-[clamp(5.5rem,3rem+12vw,11.5rem)] leading-[0.85] font-light tracking-[-0.06em] text-ink">
                  {g}
                </span>
                <span aria-hidden="true" className="mt-4 border-t border-line pt-3 text-sm font-medium text-ink-2">
                  {gradeWord}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-10 max-w-[56ch] text-ink-2">{note}</p>
        </div>

        <div className="lg:col-span-5 lg:self-end lg:border-l lg:border-line lg:pl-12">
          <p className="index-label">
            <span aria-hidden="true" className="h-px w-8 bg-primary-ink" />
            {dates}
          </p>
          <p className="mt-6 text-[clamp(3.25rem,2rem+4.5vw,5.5rem)] leading-none font-light tracking-[-0.05em] text-ink tabular-nums">{applications}</p>
          <p className="mt-4 text-lg text-ink-2">{applicationsLabel}</p>
          <p className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-medium text-ink-3">
            <span>ariza.piima.uz</span>
            <span aria-hidden="true" className="h-px w-4 bg-line" />
            <span>my.gov.uz</span>
          </p>
        </div>
      </div>
    </section>
  );
}
