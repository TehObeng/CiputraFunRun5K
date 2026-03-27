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
    <div className={cn("max-w-[42rem]", className)}>
      <p className={cn("text-xs font-semibold uppercase tracking-[0.3em] sm:text-sm", inverted ? "text-brand-lime" : "text-brand-orange")}>
        {eyebrow}
      </p>
      <h2
        className={cn(
          "mt-4 text-[clamp(2rem,5vw,3.75rem)] font-bold leading-[1.02]",
          inverted ? "text-white" : "text-brand-night",
        )}
      >
        {title}
      </h2>
      <p className={cn("mt-4 max-w-[38rem] text-base leading-8 md:text-lg", inverted ? "text-white/78" : "text-brand-muted")}>
        {description}
      </p>
    </div>
  );
}
