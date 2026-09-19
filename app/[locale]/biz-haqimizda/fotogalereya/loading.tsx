const heights = ["aspect-[4/5]", "aspect-[3/2]", "aspect-[4/3]", "aspect-square", "aspect-[3/2]", "aspect-[4/5]", "aspect-[4/3]", "aspect-[3/2]"];

export default function Loading() {
  return (
    <div className="container-x pb-24 pt-32 sm:pt-36 lg:pt-40" aria-busy="true">
      <div className="skeleton h-16 w-80 max-w-full sm:h-20" />
      <div className="skeleton mt-6 h-6 w-full max-w-md" />
      <div className="mt-12 flex gap-2 border-y border-line py-4">
        {Array.from({ length: 5 }, (_, i) => (
          <div key={i} className="skeleton h-11 w-24 shrink-0 rounded-full" />
        ))}
      </div>
      <div className="mt-8 columns-2 gap-3 sm:gap-4 md:columns-3 xl:columns-4">
        {heights.map((h, i) => (
          <div key={i} className={`skeleton mb-3 w-full rounded-[18px] sm:mb-4 ${h}`} />
        ))}
      </div>
    </div>
  );
}
