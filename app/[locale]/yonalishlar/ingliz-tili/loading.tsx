// Skeleton matching the English page: title + lead row, then the exercise-book line with the typed sentence.
export default function Loading() {
  return (
    <div aria-hidden="true" className="accent-amber">
      <div className="container-x pt-32 pb-20 lg:pt-36">
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
          <div className="skeleton h-16 w-3/4 sm:h-20 lg:col-span-6" />
          <div className="lg:col-span-5 lg:col-start-8 lg:self-end">
            <div className="skeleton h-4 w-full" />
            <div className="skeleton mt-3 h-4 w-5/6" />
            <div className="skeleton mt-3 h-4 w-2/3" />
          </div>
        </div>
        <div className="border-line mt-16 border-t lg:mt-20">
          <div className="border-amber/40 border-l-2 pt-8 pl-5 sm:ml-10 sm:pl-8 lg:ml-16 lg:pt-10">
            <div className="skeleton h-3 w-24" />
            <div className="skeleton mt-6 h-12 w-11/12 sm:h-16" />
            <div className="skeleton mt-3 h-12 w-2/3 sm:h-16" />
          </div>
        </div>
      </div>
      <div className="bg-surface py-20">
        <div className="container-x grid items-center gap-12 lg:grid-cols-12">
          <div className="border-surface-2 mx-auto aspect-square w-full max-w-[460px] rounded-full border-[36px] lg:col-span-6 lg:mx-0" />
          <div className="lg:col-span-5 lg:col-start-8">
            <div className="skeleton h-8 w-1/2" />
            <div className="skeleton mt-6 h-4 w-full" />
            <div className="skeleton mt-3 h-4 w-4/5" />
          </div>
        </div>
      </div>
    </div>
  );
}
