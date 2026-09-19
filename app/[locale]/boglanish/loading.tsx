export default function Loading() {
  return (
    <div aria-busy="true">
      <div className="container-x grid gap-14 pt-32 pb-20 sm:pt-36 lg:grid-cols-12 lg:gap-12">
        <div className="space-y-5 lg:col-span-5">
          <div className="skeleton h-16 w-3/4 sm:h-24" />
          <div className="skeleton h-5 w-full" />
          <div className="skeleton h-5 w-2/3" />
          <div className="mt-12 space-y-6 pt-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-2 border-b border-line pb-5">
                <div className="skeleton h-4 w-28" />
                <div className="skeleton h-8 w-60" />
              </div>
            ))}
          </div>
        </div>
        <div className="lg:col-span-7 lg:pt-4">
          <div className="glass rounded-[24px] p-6 sm:p-10">
            <div className="skeleton h-8 w-40" />
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="skeleton h-4 w-24" />
                  <div className="skeleton h-12 !rounded-2xl" />
                </div>
              ))}
              <div className="space-y-2 sm:col-span-2">
                <div className="skeleton h-4 w-24" />
                <div className="skeleton h-36 !rounded-2xl" />
              </div>
            </div>
            <div className="skeleton mt-8 ml-auto h-12 w-36 !rounded-full" />
          </div>
        </div>
      </div>
      <div className="container-x pb-20">
        <div className="skeleton aspect-[4/5] !rounded-[6px] sm:aspect-[16/9] lg:aspect-[21/8]" />
      </div>
    </div>
  );
}
