export default function Loading() {
  return (
    <div aria-busy="true">
      <div className="container-x grid gap-12 pt-32 pb-16 sm:pt-36 lg:grid-cols-12 lg:items-center lg:pb-24">
        <div className="space-y-5 lg:col-span-7">
          <div className="skeleton h-16 w-2/3 sm:h-24" />
          <div className="skeleton h-5 w-full max-w-[52ch]" />
          <div className="skeleton h-5 w-3/4 max-w-[40ch]" />
        </div>
        <div className="lg:col-span-5">
          <div className="skeleton mx-auto aspect-square w-full max-w-[420px] !rounded-full" />
          <div className="skeleton mx-auto mt-6 h-14 w-full max-w-[420px]" />
        </div>
      </div>
      <div className="border-y border-line bg-surface py-20">
        <div className="container-x">
          <div className="skeleton h-12 w-1/2" />
          <div className="mt-14 grid gap-10 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-4">
                <div className="skeleton size-14 !rounded-full" />
                <div className="skeleton h-6 w-1/2" />
                <div className="skeleton h-4 w-full" />
                <div className="skeleton h-4 w-4/5" />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="container-x grid gap-10 py-20 lg:grid-cols-12">
        <div className="skeleton h-12 lg:col-span-4" />
        <div className="skeleton h-80 !rounded-[24px] lg:col-span-8" />
      </div>
    </div>
  );
}
