import { SiteButton } from "@/components/site/site-button";

type MobileStickyCtaProps = {
  ctaText: string;
  registrationUrl: string;
};

export function MobileStickyCta({ ctaText, registrationUrl }: MobileStickyCtaProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-brand-ink/10 bg-white/94 px-4 py-3 shadow-[0_-18px_44px_rgba(11,16,32,0.12)] backdrop-blur md:hidden">
      <div className="mx-auto flex max-w-xl items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-stone">Pendaftaran</p>
          <p className="text-sm font-semibold text-brand-ink">Slot tetap dekat di jempolmu.</p>
        </div>
        <SiteButton href={registrationUrl} external className="shrink-0">
          {ctaText}
        </SiteButton>
      </div>
    </div>
  );
}
