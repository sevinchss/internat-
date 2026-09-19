export default function Loading() {
  return (
    <div aria-busy="true" className="container-x pt-32 pb-24 sm:pt-36">
      <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
        <div className="skeleton h-16 w-3/4 sm:h-24 lg:col-span-7" />
        <div className="space-y-3 lg:col-span-5">
          <div className="skeleton h-5 w-full" />
          <div className="skeleton h-5 w-2/3" />
        </div>
      </div>
      <div className="mt-12 grid gap-8 lg:mt-16 lg:grid-cols-12 lg:items-center lg:gap-12">
        <div className="skeleton aspect-[4/3] !rounded-[28px] sm:aspect-[16/10] lg:col-span-7" />
        <div className="space-y-4 lg:col-span-5">
          <div className="skeleton h-4 w-1/2" />
          <div className="skeleton h-10 w-full" />
          <div className="skeleton h-10 w-4/5" />
          <div className="skeleton h-4 w-full" />
          <div className="skeleton h-4 w-3/4" />
        </div>
      </div>
      <div className="mt-20 border-t border-line pt-10">
        <div className="flex gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="skeleton h-11 w-24 !rounded-full" />
          ))}
        </div>
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="grid grid-cols-[1fr_96px] gap-5 border-b border-line py-8 sm:grid-cols-[1fr_200px] lg:grid-cols-[112px_1fr_300px] lg:gap-10">
            <div className="skeleton hidden h-14 w-16 lg:block" />
            <div className="space-y-3">
              <div className="skeleton h-4 w-32" />
              <div className="skeleton h-7 w-full" />
              <div className="skeleton h-4 w-2/3" />
            </div>
            <div className="skeleton aspect-square sm:aspect-[3/2]" />
          </div>
        ))}
      </div>
    </div>
  );
}
