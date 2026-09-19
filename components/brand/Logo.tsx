import Image from "next/image";
import { cn } from "@/lib/utils";

// All logo imagery comes from public/brand/*, generated from the real logo.png (scripts/prepare-logo.mjs).
// Light/dark variants are swapped with CSS so there is no flash or hydration mismatch.
const FULL_RATIO = 1663 / 1048;

export function LogoFull({
  height = 48,
  className,
  priority,
}: {
  height?: number;
  className?: string;
  priority?: boolean;
}) {
  const width = Math.round(height * FULL_RATIO);
  return (
    <span className={cn("relative inline-block shrink-0", className)} style={{ width, height }}>
      <Image
        src="/brand/logo-full.png"
        alt="International Language School"
        width={width}
        height={height}
        priority={priority}
        sizes={`${width * 2}px`}
        className="h-full w-full object-contain dark:hidden"
      />
      <Image
        src="/brand/logo-full-dark.png"
        alt="International Language School"
        width={width}
        height={height}
        priority={priority}
        sizes={`${width * 2}px`}
        className="hidden h-full w-full object-contain dark:block"
      />
    </span>
  );
}

export function LogoMark({
  size = 40,
  className,
  alt = "",
  priority,
}: {
  size?: number;
  className?: string;
  alt?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src="/brand/logo-mark.png"
      alt={alt}
      width={size}
      height={size}
      priority={priority}
      sizes={`${size * 2}px`}
      className={cn("shrink-0 object-contain", className)}
    />
  );
}
