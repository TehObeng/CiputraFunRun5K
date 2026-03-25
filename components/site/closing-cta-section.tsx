import { SiteButton } from "@/components/site/site-button";

type ClosingCtaSectionProps = {
  title: string;
  description: string;
  ctaText: string;
  registrationUrl: string;
};

export function ClosingCtaSection({
  title,
  description,
  ctaText,
  registrationUrl,
}: ClosingCtaSectionProps) {
  return (
    <section className="section-anchor pb-16 pt-4 md:pb-24">
      <div className="section-shell">
        <div className="soft-noise hero-glow overflow-hidden rounded-[36px] px-6 py-10 text-white shadow-[0_30px_70px_rgba(11,16,32,0.22)] md:px-10 md:py-12">
          <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-lime">Daftar sekarang</p>
              <h2 className="mt-4 text-balance text-3xl font-bold leading-tight md:text-5xl">{title}</h2>
              <p className="mt-4 max-w-2xl text-balance text-base leading-7 text-white/78 md:text-lg">
                {description}
              </p>
            </div>
            <SiteButton href={registrationUrl} external className="glow-chip">
              {ctaText}
            </SiteButton>
          </div>
        </div>
      </div>
    </section>
  );
}

