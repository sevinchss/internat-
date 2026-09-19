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
    <section aria-labelledby="grades-title" className="border-t border-line py-20 lg:py-28">
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <h2 id="grades-title" className="text-display-m">
            {title}
          </h2>
          <ul className="mt-10 flex items-end gap-6 sm:gap-10">
            {grades.map((g) => (
              <li key={g} className="flex flex-col">
                <span className="sr-only">{gradeWordFirst ? `${gradeWord} ${g}` : `${g} ${gradeWord}`}</span>
                <span aria-hidden="true" className="font-display text-[clamp(5.5rem,3rem+12vw,11rem)] leading-[0.85] font-medium tracking-[-0.05em] text-ink">
                  {g}
                </span>
                <span aria-hidden="true" className="mt-3 border-t-2 border-primary-ink pt-2 text-sm font-semibold text-ink-2">
                  {gradeWord}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-10 max-w-[56ch] text-ink-2">{note}</p>
        </div>

        <div className="lg:col-span-5 lg:self-end">
          <div className="rounded-[28px] border border-line bg-surface p-8 sm:p-10">
            <p className="text-sm font-semibold text-ink-3">{dates}</p>
            <p className="mt-4 font-display text-[clamp(3rem,2rem+4vw,4.75rem)] leading-none tracking-tight text-ink tabular-nums">{applications}</p>
            <p className="mt-3 text-lg text-ink-2">{applicationsLabel}</p>
            <p className="mt-6 flex flex-wrap gap-2 text-sm">
              <span className="rounded-full border border-line px-3 py-1 text-ink-2">ariza.piima.uz</span>
              <span className="rounded-full border border-line px-3 py-1 text-ink-2">my.gov.uz</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
