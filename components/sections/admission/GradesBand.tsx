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
                <span
                  aria-hidden="true"
                  className="text-ink text-[clamp(5.5rem,3rem+12vw,11.5rem)] leading-[0.85] font-light tracking-[-0.06em]"
                >
                  {g}
                </span>
                <span aria-hidden="true" className="border-line text-ink-2 mt-4 border-t pt-3 text-sm font-medium">
                  {gradeWord}
                </span>
              </li>
            ))}
          </ul>
          <p className="text-ink-2 mt-10 max-w-[56ch]">{note}</p>
        </div>

        <div className="lg:border-line lg:col-span-5 lg:self-end lg:border-l lg:pl-12">
          <p className="index-label">
            <span aria-hidden="true" className="bg-primary-ink h-px w-8" />
            {dates}
          </p>
          <p className="text-ink mt-6 text-[clamp(3.25rem,2rem+4.5vw,5.5rem)] leading-none font-light tracking-[-0.05em] tabular-nums">
            {applications}
          </p>
          <p className="text-ink-2 mt-4 text-lg">{applicationsLabel}</p>
          <p className="text-ink-3 mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-medium">
            <span>ariza.piima.uz</span>
            <span aria-hidden="true" className="bg-line h-px w-4" />
            <span>my.gov.uz</span>
          </p>
        </div>
      </div>
    </section>
  );
}
