import { useTranslations } from "next-intl";
import type { ImageSlot } from "@/lib/images";
import { cn } from "@/lib/utils";
import { arcPath } from "@/lib/utils";
import { Photo } from "./Photo";

/**
 * Staff portrait. Until a real photo is added in lib/images.ts (images.staff), shows a designed placeholder:
 * initials inside an open ring — never a stranger's face next to a placeholder name.
 */
export function Portrait({
  slot,
  name,
  sizes,
  className,
  accent = "var(--navy)",
  priority,
}: {
  slot?: ImageSlot;
  name: string;
  sizes: string;
  className?: string;
  accent?: string;
  priority?: boolean;
}) {
  const t = useTranslations("common");
  if (slot) return <Photo slot={slot} sizes={sizes} className={className} priority={priority} alt={name} />;
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
  return (
    <span
      role="img"
      aria-label={`${name} — ${t("photoSoon")}`}
      className={cn("bg-surface-2 relative flex items-center justify-center overflow-hidden", className)}
    >
      <svg viewBox="0 0 200 200" className="absolute inset-[12%] h-[76%] w-[76%]" aria-hidden="true">
        <path
          d={arcPath(100, 100, 92, 40, 320)}
          fill="none"
          stroke="var(--ring)"
          strokeWidth="1.2"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d={arcPath(100, 100, 92, 276, 320)}
          fill="none"
          stroke={accent}
          strokeWidth="3"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <span
        className="font-display text-ink-3 relative text-[clamp(1.5rem,6vw,3.5rem)] font-medium tracking-tight"
        aria-hidden="true"
      >
        {initials}
      </span>
      <span
        className="bg-surface text-ink-3 absolute bottom-3 left-3 rounded-full px-2.5 py-1 text-[11px] font-semibold"
        aria-hidden="true"
      >
        {t("photoSoon")}
      </span>
    </span>
  );
}
