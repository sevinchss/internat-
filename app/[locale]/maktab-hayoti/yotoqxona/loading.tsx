// Skeleton matching the boarding-house hero (text left, arched photo right) and the room tour below.
export default function Loading() {
  return (
    <div aria-hidden="true">
      <div className="container-x grid items-end gap-12 pb-20 pt-32 lg:grid-cols-12 lg:gap-10 lg:pt-36">
        <div className="lg:col-span-6 lg:pb-10">
          <div className="skeleton h-14 w-4/5 sm:h-20" />
          <div className="skeleton mt-8 h-4 w-full max-w-[52ch]" />
          <div className="skeleton mt-3 h-4 w-11/12 max-w-[52ch]" />
          <div className="skeleton mt-3 h-4 w-2/3" />
          <div className="mt-10 grid max-w-xl grid-cols-3 gap-4">
            {[0, 1, 2].map((i) => (
              <div key={i} className="skeleton h-16" />
            ))}
          </div>
        </div>
        <div className="lg:col-span-6">
          <div className="skeleton ml-auto aspect-[4/5] w-[88%] max-w-[545px] !rounded-b-[28px] !rounded-t-[999px]" />
        </div>
      </div>
      <div className="container-x grid gap-10 border-t border-line py-20 lg:grid-cols-12">
        <div className="skeleton aspect-[2/3] max-h-[780px] lg:col-span-6" />
        <div className="lg:col-span-5 lg:col-start-8">
          <div className="skeleton h-10 w-2/3" />
          <div className="mt-8 space-y-3">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="skeleton h-10" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
