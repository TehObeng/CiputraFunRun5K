import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
  className?: string;
  inverted?: boolean;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  inverted = false,
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-2xl space-y-4", className)}>
      <p
        className={cn(
          "text-sm font-semibold uppercase tracking-[0.24em]",
          inverted ? "text-brand-lime" : "text-brand-coral",
        )}
      >
        {eyebrow}
      </p>
      <h2
        className={cn(
          "text-balance text-3xl font-bold leading-tight md:text-4xl lg:text-5xl",
          inverted ? "text-white" : "text-brand-ink",
        )}
      >
        {title}
      </h2>
      <p
        className={cn(
          "text-balance text-base leading-7 md:text-lg",
          inverted ? "text-white/72" : "text-brand-stone",
        )}
      >
        {description}
      </p>
    </div>
  );
}

