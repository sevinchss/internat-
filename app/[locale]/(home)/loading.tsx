// Home skeleton: text column left, big circle right (mirrors the hero).
export default function Loading() {
  return (
    <div aria-busy="true" aria-live="polite" className="container-x grid gap-10 pb-24 pt-[calc(var(--header-h)+40px)] lg:grid-cols-12">
      <div className="space-y-5 lg:col-span-6">
        <div className="skeleton h-16 w-11/12" />
        <div className="skeleton h-16 w-3/4" />
        <div className="skeleton h-16 w-2/3" />
        <div className="skeleton mt-8 h-5 w-full max-w-lg" />
        <div className="skeleton h-5 w-5/6 max-w-lg" />
        <div className="flex gap-3 pt-6">
          <div className="skeleton h-12 w-36 rounded-full" />
          <div className="skeleton h-12 w-36 rounded-full" />
        </div>
      </div>
      <div className="lg:col-span-6">
        <div className="skeleton mx-auto aspect-square w-full max-w-[560px] rounded-full" />
      </div>
    </div>
  );
}
