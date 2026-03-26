"use client";

import { ArrowUpRight, Check, Clock3, MapPin } from "lucide-react";

import { Footer } from "@/components/site/footer";
import { HeroSection } from "@/components/site/hero-section";
import { Navbar } from "@/components/site/navbar";
import { SectionHeading } from "@/components/site/section-heading";
import { SiteButton } from "@/components/site/site-button";
import type { LandingPageContent } from "@/lib/site-schema";
import { formatRupiah } from "@/lib/utils";

type LandingPageProps = {
  content: LandingPageContent;
  registrationUrl: string;
};

export function LandingPage({ content, registrationUrl }: LandingPageProps) {
  return (
    <div className="relative overflow-x-hidden bg-brand-surface text-brand-night">
      <Navbar
        brandName={content.brand.name}
        brandEyebrow={content.brand.eyebrow}
        logo={content.brand.logo}
        navItems={content.brand.navItems}
        ctaLabel={content.registration.primaryLabel}
        ctaHref={registrationUrl}
      />

      <main>
        <HeroSection content={content} registrationUrl={registrationUrl} />

        <section id="overview" className="section-anchor py-18 md:py-24">
          <div className="mx-auto grid w-[min(1200px,calc(100%-1.5rem))] gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.85fr)] lg:gap-16">
            <SectionHeading
              eyebrow={content.overview.eyebrow}
              title={content.overview.title}
              description={content.overview.description}
            />

            <div className="space-y-6">
              {content.overview.highlights.map((item) => (
                <div key={item.title} className="border-b border-brand-line pb-6 last:border-b-0 last:pb-0">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-orange">{item.label}</p>
                  <h3 className="mt-3 text-2xl font-bold text-brand-night">{item.title}</h3>
                  <p className="mt-3 text-base leading-8 text-brand-muted">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="experience" className="section-anchor bg-brand-paper py-18 md:py-24">
          <div className="mx-auto w-[min(1200px,calc(100%-1.5rem))] space-y-12">
            <SectionHeading
              eyebrow={content.experience.eyebrow}
              title={content.experience.title}
              description={content.experience.description}
            />

            <div className="grid gap-8 md:grid-cols-2">
              {content.experience.items.map((item, index) => (
                <div key={item.title} className="grid grid-cols-[auto_minmax(0,1fr)] gap-5 border-t border-brand-line pt-6">
                  <div className="text-5xl font-bold leading-none text-brand-orange/80">{String(index + 1).padStart(2, "0")}</div>
                  <div>
                    <h3 className="text-2xl font-bold text-brand-night">{item.title}</h3>
                    <p className="mt-3 text-base leading-8 text-brand-muted">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="timeline" className="section-anchor bg-brand-night py-18 text-white md:py-24">
          <div className="mx-auto grid w-[min(1200px,calc(100%-1.5rem))] gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(320px,1fr)]">
            <SectionHeading
              eyebrow={content.timeline.eyebrow}
              title={content.timeline.title}
              description={content.timeline.description}
              inverted
            />

            <div className="relative pl-8">
              <div className="absolute bottom-0 left-2 top-0 w-px bg-white/12" />
              <div className="space-y-8">
                {content.timeline.items.map((item) => (
                  <div key={`${item.time}-${item.title}`} className="relative">
                    <div className="absolute -left-[2.05rem] top-1.5 h-3 w-3 rounded-full bg-brand-lime shadow-[0_0_0_8px_rgba(208,255,54,0.1)]" />
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="rounded-full border border-white/10 bg-white/6 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-brand-lime">
                        {item.time}
                      </span>
                      <h3 className="text-2xl font-bold">{item.title}</h3>
                    </div>
                    <p className="mt-3 max-w-2xl text-base leading-8 text-white/72">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="pricing" className="section-anchor py-18 md:py-24">
          <div className="mx-auto w-[min(1200px,calc(100%-1.5rem))] space-y-12">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(300px,0.65fr)] lg:items-end">
              <SectionHeading
                eyebrow={content.pricing.eyebrow}
                title={content.pricing.title}
                description={content.pricing.description}
              />
              <div className="rounded-[28px] border border-brand-line bg-brand-paper p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-muted">{content.pricing.periodLabel}</p>
                <div className="mt-3 flex items-center gap-3 text-brand-night">
                  <Clock3 className="size-5 text-brand-orange" />
                  <p className="text-xl font-bold">{content.pricing.periodText}</p>
                </div>
                <p className="mt-3 text-sm leading-7 text-brand-muted">{content.pricing.footnote}</p>
              </div>
            </div>

            <div className="grid gap-5 lg:grid-cols-3">
              {content.pricing.cards.map((card) => (
                <div
                  key={card.name}
                  className={`rounded-[30px] border p-6 ${
                    card.featured
                      ? "border-brand-night bg-brand-night text-white shadow-[0_24px_60px_rgba(7,11,24,0.18)]"
                      : "border-brand-line bg-brand-paper text-brand-night"
                  }`}
                >
                  <p className={`text-xs font-semibold uppercase tracking-[0.24em] ${card.featured ? "text-brand-lime" : "text-brand-orange"}`}>
                    {card.badge}
                  </p>
                  <h3 className="mt-4 text-3xl font-bold">{card.name}</h3>
                  <p className={`mt-5 text-4xl font-bold ${card.featured ? "text-brand-lime" : "text-brand-night"}`}>
                    {formatRupiah(card.price)}
                  </p>
                  <p className={`mt-4 text-base leading-8 ${card.featured ? "text-white/72" : "text-brand-muted"}`}>{card.description}</p>
                  <div className={`mt-6 border-t pt-5 ${card.featured ? "border-white/12" : "border-brand-line"}`}>
                    <SiteButton href={registrationUrl} external variant={card.featured ? "primary" : "ghost"} className="w-full justify-center">
                      {content.registration.primaryLabel}
                    </SiteButton>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="section-anchor bg-brand-paper py-18 md:py-24">
          <div className="mx-auto grid w-[min(1200px,calc(100%-1.5rem))] gap-12 lg:grid-cols-[minmax(0,0.82fr)_minmax(320px,1fr)]">
            <div className="space-y-8">
              <SectionHeading
                eyebrow={content.faq.eyebrow}
                title={content.faq.title}
                description={content.faq.description}
              />
              <div className="rounded-[28px] border border-brand-line bg-white p-6 shadow-[0_16px_38px_rgba(11,22,40,0.06)]">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-muted">{content.faq.contactLabel}</p>
                <p className="mt-3 text-2xl font-bold text-brand-night">{content.faq.contactValue}</p>
              </div>
            </div>

            <div className="space-y-4">
              {content.faq.items.map((item, index) => (
                <details
                  key={item.question}
                  open={index === 0}
                  className="group rounded-[24px] border border-brand-line bg-white p-5 shadow-[0_16px_38px_rgba(11,22,40,0.04)]"
                >
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-left">
                    <span className="text-lg font-semibold text-brand-night">{item.question}</span>
                    <span className="rounded-full border border-brand-line px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-muted transition group-open:border-brand-orange group-open:text-brand-orange">
                      Open
                    </span>
                  </summary>
                  <p className="mt-4 text-base leading-8 text-brand-muted">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section id="registration" className="section-anchor py-18 md:py-24">
          <div className="mx-auto overflow-hidden rounded-[36px] bg-[linear-gradient(135deg,#081120_0%,#12253d_55%,#193128_100%)] text-white shadow-[0_30px_90px_rgba(6,10,22,0.18)]">
            <div className="grid gap-10 p-6 md:p-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(320px,1fr)] lg:gap-14 lg:p-12">
              <div className="space-y-8">
                <SectionHeading
                  eyebrow={content.registration.eyebrow}
                  title={content.registration.title}
                  description={content.registration.description}
                  inverted
                />

                <div className="flex flex-wrap gap-3">
                  <SiteButton href={registrationUrl} external>
                    {content.registration.primaryLabel}
                  </SiteButton>
                  <SiteButton href={content.registration.secondaryHref} variant="secondary">
                    {content.registration.secondaryLabel}
                  </SiteButton>
                </div>

                <p className="max-w-2xl text-sm leading-7 text-white/68">{content.registration.helperText}</p>
              </div>

              <div className="space-y-4">
                {content.registration.steps.map((step, index) => (
                  <div key={step.title} className="rounded-[26px] border border-white/10 bg-white/6 p-5 backdrop-blur">
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-lime text-sm font-bold text-brand-night">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">{step.title}</h3>
                        <p className="mt-2 text-sm leading-7 text-white/72">{step.description}</p>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="rounded-[26px] border border-white/10 bg-brand-lime/12 p-5">
                  <div className="flex items-start gap-3">
                    <Check className="mt-1 size-5 text-brand-lime" />
                    <p className="text-sm leading-7 text-white/78">
                      All main registration buttons on this page route to the same external destination:{" "}
                      <a href={registrationUrl} target="_blank" rel="noreferrer" className="font-semibold text-brand-lime underline decoration-white/20 underline-offset-4">
                        {registrationUrl}
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <section className="border-t border-brand-line bg-brand-surface py-10">
        <div className="mx-auto flex w-[min(1200px,calc(100%-1.5rem))] flex-col gap-4 rounded-[28px] border border-brand-line bg-brand-paper px-5 py-5 md:flex-row md:items-center md:justify-between md:px-6">
          <div className="flex items-start gap-3">
            <div className="mt-1 rounded-full bg-brand-wash p-2 text-brand-orange">
              <MapPin className="size-4" />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-muted">Location</p>
              <p className="mt-2 text-lg font-semibold text-brand-night">{content.brand.locationLabel}</p>
            </div>
          </div>
          <a
            href={registrationUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-night transition hover:text-brand-orange"
          >
            <span>{content.registration.primaryLabel}</span>
            <ArrowUpRight className="size-4" />
          </a>
        </div>
      </section>

      <Footer brand={content.brand} footer={content.footer} />
    </div>
  );
}
