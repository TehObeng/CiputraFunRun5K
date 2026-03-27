import { cn } from "@/lib/utils";

type PublicSectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
  className?: string;
  inverted?: boolean;
};

export function PublicSectionHeading({
  eyebrow,
  title,
  description,
  className,
  inverted = false,
}: PublicSectionHeadingProps) {
  return (
    <div className={cn("max-w-3xl", className)}>
      <p className={cn("text-sm font-semibold uppercase tracking-[0.28em]", inverted ? "text-brand-lime" : "text-brand-orange")}>
        {eyebrow}
      </p>
      <h2 className={cn("mt-4 text-3xl font-bold leading-tight md:text-5xl", inverted ? "text-white" : "text-brand-night")}>
        {title}
      </h2>
      <p className={cn("mt-4 text-base leading-8 md:text-lg", inverted ? "text-white/74" : "text-brand-muted")}>
        {description}
      </p>
    </div>
  );
}
