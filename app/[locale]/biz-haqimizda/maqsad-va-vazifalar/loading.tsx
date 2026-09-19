export default function Loading() {
  return (
    <div aria-busy="true">
      <div className="container-x pb-20 pt-32 sm:pt-36 lg:pb-28 lg:pt-44">
        <div className="skeleton h-7 w-56" />
        <div className="mt-10 space-y-4">
          <div className="skeleton h-12 w-full max-w-[900px] sm:h-16" />
          <div className="skeleton h-12 w-11/12 max-w-[820px] sm:h-16" />
          <div className="skeleton h-12 w-3/4 max-w-[760px] sm:h-16" />
          <div className="skeleton h-12 w-2/3 max-w-[640px] sm:h-16" />
        </div>
        <div className="mt-14 lg:grid lg:grid-cols-12">
          <div className="skeleton h-24 lg:col-span-5 lg:col-start-8" />
        </div>
      </div>
      <div className="container-x grid gap-10 border-t border-line pt-20 lg:grid-cols-12">
        <div className="skeleton mx-auto aspect-square w-full max-w-[420px] rounded-full lg:col-span-5" />
        <div className="space-y-4 lg:col-span-6 lg:col-start-7 lg:self-center">
          <div className="skeleton h-4 w-32" />
          <div className="skeleton h-10 w-full" />
          <div className="skeleton h-24 w-full" />
        </div>
      </div>
    </div>
  );
}
