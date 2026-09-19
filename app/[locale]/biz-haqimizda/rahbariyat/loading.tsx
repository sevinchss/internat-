export default function Loading() {
  return (
    <div className="container-x pb-24 pt-32 sm:pt-36 lg:pt-44" aria-busy="true">
      <div className="flex items-end justify-between gap-6">
        <div className="skeleton h-14 w-64 max-w-full" />
        <div className="skeleton hidden h-5 w-72 sm:block" />
      </div>
      <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="skeleton mx-auto aspect-square w-[min(100%,420px)] rounded-full lg:mx-0 lg:w-full lg:max-w-[440px]" />
          <div className="skeleton mt-5 h-6 w-48" />
        </div>
        <div className="space-y-4 lg:col-span-7 lg:pt-6">
          <div className="skeleton h-4 w-40" />
          <div className="skeleton h-10 w-full" />
          <div className="skeleton h-10 w-11/12" />
          <div className="skeleton h-10 w-3/4" />
          <div className="skeleton mt-8 h-24 w-full" />
          <div className="skeleton h-40 w-full rounded-none" />
        </div>
      </div>
    </div>
  );
}
