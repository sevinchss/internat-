type Row = { section: string; questions: number | null; share: number; color: string };
type Group = { subject: string; total: number; rows: Row[] };

/**
 * Accessible exam-structure table: <caption>, row-group headers per subject, a proportion bar per section.
 * Bars are decorative (aria-hidden); the numbers are in the cells.
 */
export function ExamTable({
  title,
  lead,
  caption,
  cols,
  totalLabel,
  note,
  groups,
}: {
  title: string;
  lead: string;
  caption: string;
  cols: { subject: string; section: string; questions: string };
  totalLabel: string;
  note: string;
  groups: Group[];
}) {
  return (
    <section aria-labelledby="exam-title" className="container-x py-20 lg:py-32">
      <div aria-hidden="true" className="bg-line mb-16 h-px lg:mb-24" />
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <h2 id="exam-title" className="text-display-l">
            {title}
          </h2>
          <p className="text-ink-2 mt-5 max-w-[44ch]">{lead}</p>
          <p className="text-ink-3 mt-6 flex gap-3 text-sm">
            <span aria-hidden="true" className="bg-ink-3 mt-2.5 h-px w-4 shrink-0" />
            {note}
          </p>
        </div>

        <div className="min-w-0 lg:col-span-8">
          <div className="glass overflow-x-auto rounded-[20px]">
            <table className="w-full border-collapse text-left">
              <caption className="border-line text-ink-2 border-b px-5 py-4 text-left text-sm font-semibold sm:px-7">
                {caption}
              </caption>
              <thead>
                <tr className="text-ink-3 text-sm">
                  <th scope="col" className="hidden px-7 pt-5 pb-3 font-semibold sm:table-cell">
                    {cols.subject}
                  </th>
                  <th scope="col" className="px-4 pt-5 pb-3 font-semibold sm:px-3">
                    {cols.section}
                  </th>
                  <th scope="col" className="px-4 pt-5 pb-3 text-right font-semibold sm:px-7">
                    {cols.questions}
                  </th>
                </tr>
              </thead>
              {groups.map((g) => (
                <tbody key={g.subject} className="border-line border-t">
                  {/* mobile: the subject becomes a full-width group header row (only one of the two headers is ever displayed) */}
                  <tr className="sm:hidden">
                    <th
                      scope="rowgroup"
                      colSpan={2}
                      className="font-display text-ink px-4 pt-5 pb-1 text-lg font-medium"
                    >
                      {g.subject}
                    </th>
                  </tr>
                  {g.rows.map((r, i) => (
                    <tr key={r.section} className="align-top">
                      {i === 0 && (
                        <th
                          scope="rowgroup"
                          rowSpan={g.rows.length + 1}
                          className="font-display text-ink hidden w-[26%] px-7 py-5 align-top text-xl font-medium sm:table-cell"
                        >
                          {g.subject}
                        </th>
                      )}
                      <td className="px-4 py-4 sm:px-3 sm:py-5">
                        <span className="text-ink block text-[15px] font-semibold sm:text-base">{r.section}</span>
                        <span
                          aria-hidden="true"
                          className="bg-line mt-3 block h-1.5 w-full max-w-[280px] overflow-hidden rounded-full"
                        >
                          <span
                            className="block h-full rounded-full"
                            style={{ width: `${r.share * 100}%`, background: r.color }}
                          />
                        </span>
                      </td>
                      <td className="text-ink px-4 py-4 text-right text-2xl font-light tabular-nums sm:px-7 sm:py-5 sm:text-3xl">
                        {r.questions ?? "—"}
                      </td>
                    </tr>
                  ))}
                  <tr className="border-line border-t border-dashed">
                    <th scope="row" className="text-ink-2 px-4 py-4 text-sm font-semibold sm:px-3">
                      {totalLabel}
                    </th>
                    <td className="text-primary-ink px-4 py-4 text-right text-2xl font-medium tabular-nums sm:px-7 sm:text-3xl">
                      {g.total}
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
