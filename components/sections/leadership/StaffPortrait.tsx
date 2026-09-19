import { useTranslations } from "next-intl";
import { Photo } from "@/components/ui/Photo";
import { RING_END, RING_START } from "@/components/brand/Ring";
import type { ImageSlot } from "@/lib/images";
import { arcPath, cn, polar } from "@/lib/utils";

/**
 * Circular staff portrait framed by the open ring.
 * Until a real photo is set (data/staff.ts → photo), the circle holds the person's initials on a soft tint of their
 * accent colour — an intentional monogram, not an empty box. Never a stranger's face next to a placeholder name.
 *
 * `ring={false}` hides the built-in arc (the director's hero draws its own animated ring around it).
 */
export function StaffPortrait({
  slot,
  name,
  accent,
  sizes,
  className,
  priority,
  ring = true,
}: {
  slot?: ImageSlot;
  name: string;
  accent: string;
  sizes: string;
  className?: string;
  priority?: boolean;
  ring?: boolean;
}) {
  const t = useTranslations("common");
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
  const [dx, dy] = polar(100, 100, 96, RING_END);

  return (
    <span className={cn("relative block aspect-square shrink-0", className)}>
      {ring && (
        <svg viewBox="0 0 200 200" className="absolute inset-0 size-full overflow-visible" aria-hidden="true">
          <path d={arcPath(100, 100, 96, RING_START, RING_END)} fill="none" stroke="var(--ring)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          <path d={arcPath(100, 100, 96, 280, RING_END)} fill="none" stroke={accent} strokeWidth="2.25" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          <circle cx={dx} cy={dy} r="3.2" fill={accent} />
        </svg>
      )}
      <span className={cn("absolute overflow-hidden rounded-full", ring ? "inset-[8%]" : "inset-0")}>
        {slot ? (
          <Photo slot={slot} sizes={sizes} priority={priority} alt={name} className="size-full" />
        ) : (
          <span
            role="img"
            aria-label={`${name} — ${t("photoSoon")}`}
            className="flex size-full items-center justify-center"
            style={{
              background: `radial-gradient(120% 120% at 28% 18%, color-mix(in oklab, ${accent} 16%, var(--surface)) 0%, color-mix(in oklab, ${accent} 6%, var(--paper)) 62%, color-mix(in oklab, ${accent} 10%, var(--paper)) 100%)`,
              boxShadow: `inset 0 0 0 1px color-mix(in oklab, ${accent} 16%, transparent)`,
            }}
          >
            <span aria-hidden="true" className="select-none text-[length:var(--mono,2rem)] font-light leading-none tracking-[-0.04em] text-ink-2">
              {initials}
            </span>
          </span>
        )}
      </span>
    </span>
  );
}
