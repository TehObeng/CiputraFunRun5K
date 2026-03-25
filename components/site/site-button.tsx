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
      rel={external ? "noreferrer" : undefined}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-coral",
        variant === "primary" &&
          "bg-brand-coral text-white shadow-[0_18px_35px_rgba(255,107,61,0.28)] hover:-translate-y-0.5 hover:bg-brand-orange",
        variant === "secondary" &&
          "border border-white/16 bg-white/10 text-white hover:border-white/28 hover:bg-white/14",
        variant === "ghost" &&
          "border border-brand-ink/12 bg-white text-brand-ink hover:-translate-y-0.5 hover:border-brand-ink/20 hover:bg-brand-peach/35",
        className,
      )}
    >
      <span>{children}</span>
      {external ? <ArrowUpRight className="size-4" /> : <ArrowRight className="size-4" />}
    </Link>
  );
}
