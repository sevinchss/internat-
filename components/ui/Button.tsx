import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost" | "light";

const base =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-[15px] font-semibold transition-[transform,background-color,color,border-color] duration-200 active:scale-[0.98]";
const variants: Record<Variant, string> = {
  primary: "bg-primary text-on-primary shadow-[inset_0_1px_0_rgb(255_255_255/0.18)] hover:bg-navy dark:hover:bg-[#2474c9]",
  outline: "border border-ink/15 text-ink hover:border-primary-ink hover:text-primary-ink dark:border-white/20",
  ghost: "text-ink underline decoration-line decoration-2 underline-offset-[6px] hover:decoration-primary-ink px-0 min-h-0",
  light: "bg-white text-navy hover:bg-white/90",
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
