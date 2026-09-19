export default function Loading() {
  return (
    <div aria-busy="true">
      <div className="container-x pt-28 sm:pt-32">
        <div className="skeleton h-5 w-40" />
        <div className="mt-8 max-w-[1040px] space-y-4">
          <div className="skeleton h-4 w-64" />
          <div className="skeleton h-12 w-full sm:h-16" />
          <div className="skeleton h-12 w-3/4 sm:h-16" />
          <div className="skeleton h-5 w-2/3" />
        </div>
        <div className="skeleton mt-10 aspect-[4/3] !rounded-[28px] sm:aspect-[16/9] lg:mt-14 lg:aspect-[21/9]" />
      </div>
      <div className="container-x grid gap-10 pt-12 pb-24 lg:grid-cols-12 lg:pt-20">
        <div className="hidden space-y-4 lg:col-span-3 lg:block">
          <div className="skeleton h-4 w-24" />
          <div className="skeleton h-5 w-40" />
          <div className="skeleton h-11 w-36 !rounded-full" />
          <div className="skeleton h-11 w-36 !rounded-full" />
        </div>
        <div className="max-w-[68ch] space-y-4 lg:col-span-8 lg:col-start-5">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="skeleton h-5" style={{ width: `${[100, 96, 88, 100, 72, 100, 92, 60][i]}%` }} />
          ))}
        </div>
      </div>
    </div>
  );
}
