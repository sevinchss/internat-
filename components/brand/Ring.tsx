import { arcPath } from "@/lib/utils";
import { cn } from "@/lib/utils";

/**
 * The signature motif: the logo's open ring (a "C", open on the right).
 * Angles use SVG convention (0° = 3 o'clock, clockwise). The logo's arc runs 40° → 320°.
 */
export const RING_START = 40;
export const RING_END = 320;

/** Six segments of the logo ring, with the colour order as they appear clockwise from bottom-right. */
export const RING_SEGMENTS = [
  { color: "var(--red)", from: 40, to: 80 },
  { color: "var(--green)", from: 84, to: 128 },
  { color: "var(--amber)", from: 132, to: 176 },
  { color: "var(--orange)", from: 180, to: 224 },
  { color: "var(--purple)", from: 228, to: 272 },
  { color: "var(--navy)", from: 276, to: 320 },
];

/** Faint oversized decorative arc for backgrounds. Purely decorative. */
export function RingArc({
  className,
  strokeWidth = 1.2,
  segmented = true,
  opacity = 1,
}: {
  className?: string;
  strokeWidth?: number;
  segmented?: boolean;
  opacity?: number;
}) {
  const segments = segmented
    ? [
        [40, 88],
        [92, 176],
        [180, 268],
        [272, 320],
      ]
    : [[RING_START, RING_END]];
  return (
    <svg viewBox="0 0 200 200" aria-hidden="true" className={cn("pointer-events-none", className)} style={{ opacity }}>
      {segments.map(([a, b]) => (
        <path
          key={a}
          d={arcPath(100, 100, 96, a, b)}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="butt"
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  );
}
