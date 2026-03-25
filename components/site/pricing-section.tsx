import { BadgeCheck, Flame, Users } from "lucide-react";

import { SectionHeading } from "@/components/site/section-heading";
import { SiteButton } from "@/components/site/site-button";
import type { PricingItem } from "@/lib/site-schema";
import { cn, formatRupiah } from "@/lib/utils";

type PricingSectionProps = {
  pricing: PricingItem[];
  normalPricePeriod: string;
  registrationUrl: string;
  ctaText: string;
};

const pricingIcons = [Flame, Users, BadgeCheck] as const;

export function PricingSection({
  pricing,
  normalPricePeriod,
  registrationUrl,
  ctaText,
}: PricingSectionProps) {
  return (
    <section id="harga" className="section-anchor py-20 md:py-24">
      <div className="section-shell space-y-10">
        <SectionHeading
          eyebrow="Harga pendaftaran"
          title="Pilih tiket yang paling pas lalu langsung amankan slotmu."
          description="Harga dibuat sederhana, jelas, dan mudah dipahami. Semua CTA pendaftaran langsung mengarah ke Google Form."
        />

        <div className="grid gap-5 lg:grid-cols-3">
          {pricing.map((item, index) => {
            const Icon = pricingIcons[index] ?? BadgeCheck;
            const isNormalPrice = item.name.toLowerCase().includes("normal");

            return (
              <article
                key={`${item.name}-${index}`}
                className={cn(
                  "card-sheen rounded-[32px] p-6 md:p-7",
                  item.featured
                    ? "bg-brand-ink text-white shadow-[0_26px_60px_rgba(11,16,32,0.28)]"
                    : "surface-outline bg-white text-brand-ink",
                )}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-white/10">
                    <Icon className={cn("size-6", item.featured ? "text-brand-lime" : "text-brand-coral")} />
                  </div>
                  {item.featured ? (
                    <span className="rounded-full bg-brand-lime px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-brand-ink">
                      Paling direkomendasikan
                    </span>
                  ) : (
                    <span className="rounded-full border border-brand-ink/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-brand-stone">
                      Tiket {String(index + 1).padStart(2, "0")}
                    </span>
                  )}
                </div>

                <h3 className="mt-8 text-3xl font-bold">{item.name}</h3>
                <p className={cn("mt-3 text-sm leading-7", item.featured ? "text-white/74" : "text-brand-stone")}>
                  {item.description}
                </p>

                <div className="mt-8 border-t border-current/12 pt-6">
                  <p className={cn("text-sm uppercase tracking-[0.22em]", item.featured ? "text-white/50" : "text-brand-stone")}>
                    Harga tiket
                  </p>
                  <p className="mt-3 text-4xl font-bold">{formatRupiah(item.price)}</p>
                  {isNormalPrice ? (
                    <p className={cn("mt-3 text-sm font-medium", item.featured ? "text-brand-lime" : "text-brand-coral")}>
                      Berlaku {normalPricePeriod}
                    </p>
                  ) : null}
                </div>

                <SiteButton
                  href={registrationUrl}
                  external
                  variant={item.featured ? "primary" : "ghost"}
                  className={cn("mt-8 w-full", item.featured && "bg-brand-coral text-white")}
                >
                  {ctaText}
                </SiteButton>
              </article>
            );
          })}
        </div>

        <div className="rounded-[26px] border border-brand-ink/8 bg-brand-peach/45 px-5 py-4 text-sm leading-7 text-brand-ink">
          Harga normal Rp200.000 berlaku pada periode {normalPricePeriod}. Jika kamu datang bersama teman atau komunitas,
          opsi Group/Komunitas bisa jadi pilihan paling menarik untuk dikunci lebih cepat.
        </div>
      </div>
    </section>
  );
}
