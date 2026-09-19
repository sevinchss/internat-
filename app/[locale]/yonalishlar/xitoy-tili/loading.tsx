// Skeleton matching the Chinese page: title left, the large square character grid right.
export default function Loading() {
  return (
    <div aria-hidden="true" className="accent-red">
      <div className="container-x grid items-end gap-12 pb-20 pt-32 lg:grid-cols-12 lg:gap-10 lg:pt-36">
        <div className="lg:col-span-5 lg:pb-24">
          <div className="skeleton h-16 w-3/4 sm:h-20" />
          <div className="skeleton mt-8 h-4 w-full max-w-[46ch]" />
          <div className="skeleton mt-3 h-4 w-5/6 max-w-[46ch]" />
          <div className="skeleton mt-3 h-4 w-1/2" />
        </div>
        <div className="mx-auto w-full max-w-[620px] lg:col-span-7 lg:mr-0">
          <div className="relative aspect-square rounded-[18px] border border-dashed border-line">
            <div className="absolute inset-[14%] skeleton" />
          </div>
          <div className="mt-6 flex items-baseline gap-5">
            <div className="skeleton h-12 w-28" />
            <div className="skeleton h-5 w-32" />
          </div>
        </div>
      </div>
      <div className="container-x grid gap-12 border-t border-line py-20 lg:grid-cols-12">
        <div className="skeleton h-10 w-2/3 lg:col-span-3" />
        <div className="grid gap-12 sm:grid-cols-2 lg:col-span-9">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className={i % 2 ? "sm:mt-20" : ""}>
              <div className="skeleton h-6 w-1/2" />
              <div className="skeleton mt-4 h-4 w-full" />
              <div className="skeleton mt-2 h-4 w-4/5" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
