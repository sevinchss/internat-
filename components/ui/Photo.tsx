import Image from "next/image";
import { useLocale } from "next-intl";
import type { ImageSlot } from "@/lib/images";
import { cn, pick } from "@/lib/utils";

type Props = {
  slot: ImageSlot;
  sizes: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  /** fill the (positioned) parent; otherwise render with intrinsic ratio */
  fill?: boolean;
  quality?: 60 | 75 | 85;
  alt?: string;
  decorative?: boolean;
};

/** next/image with blur placeholder + localized alt from lib/images.ts */
export function Photo({ slot, sizes, className, imgClassName, priority, fill = true, quality = 75, alt, decorative }: Props) {
  const locale = useLocale();
  const altText = decorative ? "" : (alt ?? pick(slot.alt, locale));
  const common = {
    src: slot.src,
    alt: altText,
    sizes,
    quality,
    priority,
    placeholder: slot.blurDataURL ? ("blur" as const) : ("empty" as const),
    blurDataURL: slot.blurDataURL,
  };
  if (fill) {
    return (
      <span className={cn("relative block overflow-hidden bg-surface-2", className)}>
        <Image {...common} alt={altText} fill className={cn("object-cover", imgClassName)} />
      </span>
    );
  }
  const w = 1600;
  return <Image {...common} alt={altText} width={w} height={Math.round(w / slot.ratio)} className={cn("h-auto w-full bg-surface-2", imgClassName, className)} />;
}
