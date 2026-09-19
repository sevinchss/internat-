import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost" | "light";

const base =
  "group/btn relative isolate inline-flex min-h-12 items-center justify-center gap-2 overflow-hidden rounded-full px-6 text-[15px] font-medium tracking-[-0.01em] transition-[transform,color,border-color] duration-300 active:scale-[0.98] before:absolute before:inset-0 before:-z-10 before:translate-y-[102%] before:rounded-[inherit] before:transition-transform before:duration-500 before:ease-[cubic-bezier(0.76,0,0.24,1)] hover:before:translate-y-0";
// Hover: a fill rises from below (before:) instead of a flat colour swap.
const variants: Record<Variant, string> = {
  primary: "bg-primary text-on-primary before:bg-ink dark:before:bg-white hover:dark:text-navy",
  outline: "border border-ink/15 text-ink before:bg-ink hover:text-paper hover:border-ink dark:border-white/20",
  ghost: "min-h-0 px-0 text-ink underline decoration-line decoration-2 underline-offset-[6px] before:hidden hover:decoration-primary-ink",
  light: "bg-white text-navy before:bg-amber hover:text-[#0b1a33]",
};

export const buttonClass = (variant: Variant = "primary", className?: string) => cn(base, variants[variant], className);

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return (
    <Link href={href} className={cn(base, variants[variant], className)}>
      {children}
    </Link>
  );
}

export function ExternalButton({
  href,
  children,
  variant = "primary",
  className,
  newTabLabel,
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  newTabLabel: string;
}) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cn(base, variants[variant], className)}>
      {children}
      <ArrowUpRight className="size-4" aria-hidden="true" />
      <span className="sr-only">({newTabLabel})</span>
    </a>
  );
}
