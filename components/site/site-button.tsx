import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";

type SiteButtonProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
  variant?: "primary" | "secondary" | "ghost";
  ariaLabel?: string;
};

export function SiteButton({
  href,
  children,
  className,
  external = false,
  variant = "primary",
  ariaLabel,
}: SiteButtonProps) {
  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={cn(
        "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition duration-200 motion-reduce:transform-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        variant === "primary" &&
          "bg-brand-orange text-brand-night shadow-[0_18px_35px_rgba(255,139,44,0.24)] hover:-translate-y-0.5 hover:bg-[#ffac48]",
        variant === "secondary" &&
          "border border-white/18 bg-white/10 text-white hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/14",
        variant === "ghost" &&
          "border border-brand-line bg-brand-paper text-brand-night hover:-translate-y-0.5 hover:border-brand-orange hover:bg-brand-wash",
        className,
      )}
    >
      <span>{children}</span>
      {external ? <ArrowUpRight className="size-4" /> : <ArrowRight className="size-4" />}
    </Link>
  );
}
