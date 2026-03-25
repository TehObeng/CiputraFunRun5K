"use client";

import { Clock3, Sparkles, Ticket } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { SiteButton } from "@/components/site/site-button";
import type { SiteContent } from "@/lib/site-schema";
import { formatRupiah } from "@/lib/utils";

type HeroSectionProps = {
  content: SiteContent;
  registrationUrl: string;
};

export function HeroSection({ content, registrationUrl }: HeroSectionProps) {
  const shouldReduceMotion = useReducedMotion();
  const startingPrice = Math.min(...content.pricing.map((item) => item.price));

  return (
    <section className="relative overflow-hidden pt-36 text-white md:pt-44" aria-label="Hero section">
      <div className="absolute inset-0 hero-glow" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,12,24,0.22),rgba(8,12,24,0.65))]" />

      <div className="section-shell hero-grid relative items-end pb-14 md:pb-20">
        <motion.div
          className="space-y-8"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <div className="inline-flex max-w-max items-center gap-2 rounded-full border border-white/12 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-lime">
            <Sparkles className="size-4 text-brand-coral" />
            {content.badgeText}
          </div>

          <div className="space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-white/66">{content.eventName}</p>
            <h1 className="max-w-[11ch] text-balance text-[clamp(3rem,8vw,6.25rem)] font-bold leading-[0.95]">
              {content.heroHeadline}
            </h1>
            <p className="max-w-2xl text-balance text-base leading-7 text-white/78 md:text-lg">{content.heroSubheadline}</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <SiteButton href={registrationUrl} external ariaLabel="Register now with Google Form">
              {content.heroCtaText}
            </SiteButton>
            <a
              href="#harga"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/16 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/28 hover:bg-white/14 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {content.heroSecondaryCtaText}
            </a>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-[22px] border border-white/10 bg-white/8 p-4 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.24em] text-white/56">Harga Early Birds</p>
              <p className="mt-2 text-2xl font-bold text-brand-lime">{formatRupiah(startingPrice)}</p>
            </div>
            <div className="rounded-[22px] border border-white/10 bg-white/8 p-4 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.24em] text-white/56">Harga normal</p>
              <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-white">
                <Clock3 className="size-4 text-brand-orange" />
                {content.normalPricePeriod}
              </p>
            </div>
            <div className="rounded-[22px] border border-white/10 bg-white/8 p-4 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.24em] text-white/56">Registrasi</p>
              <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-white">
                <Ticket className="size-4 text-brand-coral" />
                Google Form
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="hero-track soft-noise relative overflow-hidden rounded-[34px] border border-white/12 bg-white/6 p-6 shadow-[0_32px_70px_rgba(8,12,24,0.3)] backdrop-blur-xl md:p-8"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 30, scale: 0.98 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.12 }}
        >
          <div className="hero-orbit absolute left-[10%] top-[12%] size-24 rounded-full bg-brand-coral/24 blur-3xl" />
          <div className="hero-orbit absolute bottom-[10%] right-[12%] size-28 rounded-full bg-brand-lime/18 blur-3xl" />
          <div className="absolute inset-[20%] rounded-full border border-white/10" />
          <div className="absolute inset-[28%] rounded-full border border-white/10" />

          <div className="relative z-10 flex min-h-[430px] flex-col justify-between">
            <div className="flex flex-wrap gap-3">
              <span className="glow-chip inline-flex items-center rounded-full bg-brand-lime px-4 py-2 text-sm font-bold text-brand-ink">
                Mulai {formatRupiah(startingPrice)}
              </span>
              <span className="inline-flex items-center rounded-full border border-white/14 bg-white/10 px-4 py-2 text-sm font-medium text-white/82">
                Community-driven event
              </span>
            </div>

            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.34em] text-white/48">Run • Music • Hunt • Prize</p>
              <h2 className="max-w-[7ch] text-[clamp(3rem,8vw,5.5rem)] font-bold leading-[0.9]">FUN RUN</h2>
              <p className="max-w-xs text-sm leading-7 text-white/74 md:text-base">
                Satu event untuk bergerak, bersenang-senang, dan hadir dengan energi komunitas yang terasa dekat.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-[22px] border border-white/10 bg-brand-ink/42 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-white/46">Paling dicari</p>
                <p className="mt-2 text-lg font-semibold text-white">Group/Komunitas Rp150.000</p>
              </div>
              <div className="rounded-[22px] border border-white/10 bg-brand-ink/42 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-white/46">Mood acara</p>
                <p className="mt-2 text-lg font-semibold text-white">Sporty, festive, dan ramah</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="section-shell relative pb-14 md:pb-16">
        <div className="grid gap-3 rounded-[30px] border border-white/10 bg-white/8 p-4 backdrop-blur md:grid-cols-4 md:p-5">
          {content.activities.map((activity) => (
            <div key={activity.title} className="rounded-[22px] border border-white/8 bg-white/6 px-4 py-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-lime">Highlight</p>
              <p className="mt-2 text-lg font-semibold">{activity.title}</p>
              <p className="mt-2 text-sm leading-6 text-white/68">{activity.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
