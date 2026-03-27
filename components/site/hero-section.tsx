"use client";

import { MapPin } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { SiteButton } from "@/components/site/site-button";
import type { LandingPageContent } from "@/lib/site-schema";
import { formatRupiah } from "@/lib/utils";

type HeroSectionProps = {
  content: LandingPageContent;
  registrationUrl: string;
};

export function HeroSection({ content, registrationUrl }: HeroSectionProps) {
  const shouldReduceMotion = useReducedMotion();
  const lowestPrice = Math.min(...content.pricing.cards.map((card) => card.price));

  return (
    <section
      id="beranda"
      className="relative overflow-hidden bg-[linear-gradient(135deg,#081120_0%,#0f2138_48%,#1d312d_100%)] text-white"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(208,255,54,0.16),transparent_26%),radial-gradient(circle_at_85%_12%,rgba(255,107,61,0.22),transparent_24%),radial-gradient(circle_at_70%_76%,rgba(255,154,31,0.12),transparent_22%)]" />
      <div className="absolute inset-x-0 top-24 h-px bg-white/10" />

      <div className="mx-auto grid min-h-screen w-[min(1200px,calc(100%-1.5rem))] items-end gap-12 pb-14 pt-28 md:pb-18 md:pt-32 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)] lg:gap-16 lg:pt-36">
        <motion.div
          className="relative z-10 max-w-2xl space-y-8"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <a
            href={content.announcement.linkHref}
            className="inline-flex flex-wrap items-center gap-x-3 gap-y-2 rounded-full border border-white/12 bg-white/10 px-4 py-2 text-sm backdrop-blur transition hover:bg-white/14"
          >
            <span className="font-semibold uppercase tracking-[0.24em] text-brand-lime">{content.announcement.label}</span>
            <span className="text-white/74">{content.announcement.text}</span>
            <span className="font-semibold text-brand-orange">{content.announcement.linkLabel}</span>
          </a>

          <div className="space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.34em] text-white/58">{content.brand.name}</p>
            <h1 className="max-w-[11ch] text-balance text-[clamp(3.25rem,8vw,6.75rem)] font-bold leading-[0.92]">
              {content.hero.title}
            </h1>
            <p className="max-w-2xl text-base leading-8 text-white/76 md:text-lg">{content.hero.description}</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <SiteButton href={registrationUrl} external>
              {content.hero.primaryCtaLabel}
            </SiteButton>
            <SiteButton href={content.hero.secondaryCtaHref} variant="secondary">
              {content.hero.secondaryCtaLabel}
            </SiteButton>
          </div>

          <div className="grid gap-4 border-t border-white/12 pt-6 sm:grid-cols-3">
            {content.hero.stats.map((stat) => (
              <div key={stat.label} className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-lime">{stat.label}</p>
                <p className="text-lg font-semibold text-white">{stat.value}</p>
                <p className="text-sm leading-7 text-white/62">{stat.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="relative z-10"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 34, scale: 0.98 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.65, ease: "easeOut", delay: 0.1 }}
        >
          <div className="relative overflow-hidden rounded-[34px] bg-[linear-gradient(180deg,#fffdf9_0%,#f8f1e7_100%)] p-5 text-brand-night shadow-[0_32px_80px_rgba(6,10,22,0.35)] md:p-7">
            <div className="absolute inset-y-8 right-8 w-px bg-brand-line/80" />
            <div className="space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-orange">{content.hero.badge}</p>
                  <p className="mt-2 text-2xl font-bold">{content.brand.name}</p>
                </div>
                <div className="rounded-full bg-brand-night px-4 py-2 text-sm font-semibold text-white">
                  Early Bird {formatRupiah(lowestPrice)}
                </div>
              </div>

              <div className="overflow-hidden rounded-[28px] border border-brand-line bg-white p-4 shadow-[0_20px_40px_rgba(11,22,40,0.08)]">
                <div className="aspect-[4/3] w-full">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={content.brand.logo.publicUrl} alt={content.brand.logo.alt} className="h-full w-full object-contain" />
                </div>
              </div>

              <div className="grid gap-4 border-t border-brand-line pt-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-muted">{content.hero.supportingLabel}</p>
                  <p className="mt-2 text-2xl font-bold">{content.hero.supportingTitle}</p>
                  <p className="mt-3 text-sm leading-7 text-brand-muted md:text-base">{content.hero.supportingDescription}</p>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-brand-line bg-brand-surface px-4 py-2 text-sm font-semibold text-brand-night">
                  <MapPin className="size-4 text-brand-orange" />
                  {content.brand.locationLabel}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
