import type { Metadata } from "next";
import { Megaphone, Users } from "lucide-react";
import { notFound } from "next/navigation";

import { PublicSectionHeading } from "@/components/site/public-section-heading";
import { SiteButton } from "@/components/site/site-button";
import { isLocale } from "@/lib/locale";
import { buildPageMetadata } from "@/lib/public-metadata";
import { getPublicRuntime } from "@/lib/public-runtime";
import { formatIdr, getPageHref, getSiteCopy } from "@/lib/public-site-content";

type SponsorshipPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: SponsorshipPageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : "id";

  return buildPageMetadata(locale, "sponsorship");
}

export default async function SponsorshipPage({ params }: SponsorshipPageProps) {
  const { locale: rawLocale } = await params;

  if (!isLocale(rawLocale)) {
    notFound();
  }

  const locale = rawLocale;
  const copy = getSiteCopy(locale);
  const runtime = await getPublicRuntime();
  const sponsorContactHref = runtime.socials[0]?.url ?? getPageHref(locale, "home");
  const ageMixLabel = locale === "id" ? "Komposisi usia" : "Age mix";
  const genderMixLabel = locale === "id" ? "Komposisi gender" : "Gender mix";

  return (
    <main id="main-content" className="bg-brand-surface">
      <section className="relative overflow-hidden bg-[linear-gradient(135deg,#081120_0%,#10233b_54%,#162d29_100%)] section-space text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_16%,rgba(255,154,31,0.16),transparent_22%),radial-gradient(circle_at_84%_20%,rgba(208,255,54,0.1),transparent_20%)]" />
        <div className="page-shell relative grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(340px,0.86fr)]">
          <PublicSectionHeading
            eyebrow={copy.sponsorship.intro.eyebrow}
            title={copy.sponsorship.intro.title}
            description={copy.sponsorship.intro.description}
            inverted
          />

          <div className="reveal-up reveal-delay-1 rounded-[30px] border border-white/10 bg-white/6 p-6 backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-lime">{copy.sponsorship.deadline.title}</p>
            <p className="mt-3 text-sm leading-7 text-white/74">{copy.sponsorship.deadline.description}</p>
            <div className="mt-6 space-y-3">
              <SiteButton href={sponsorContactHref} external className="w-full justify-center">
                {copy.sponsorship.deadline.primaryLabel}
              </SiteButton>
              <SiteButton href={getPageHref(locale, "event")} variant="secondary" className="w-full justify-center">
                {copy.navigation.event}
              </SiteButton>
            </div>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="page-shell grid gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(340px,0.84fr)] lg:gap-16">
          <PublicSectionHeading
            eyebrow={copy.sponsorship.demographics.eyebrow}
            title={copy.sponsorship.demographics.title}
            description={copy.sponsorship.demographics.description}
          />

          <div className="grid gap-5">
            <div className="grid gap-4 sm:grid-cols-3">
              {copy.sponsorship.demographics.reach.map((item) => (
                <div key={item.label} className="section-panel-quiet rounded-[24px] bg-brand-paper p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-muted">{item.label}</p>
                  <p className="mt-3 text-3xl font-bold text-brand-night">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="section-panel hover-lift rounded-[28px] bg-white p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-orange">{ageMixLabel}</p>
                <div className="mt-4 space-y-3">
                  {copy.sponsorship.demographics.ageGroups.map((item) => (
                    <p key={item} className="text-base font-semibold text-brand-night">{item}</p>
                  ))}
                </div>
              </div>

              <div className="section-panel hover-lift rounded-[28px] bg-white p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-orange">{genderMixLabel}</p>
                <div className="mt-4 space-y-3">
                  {copy.sponsorship.demographics.genders.map((item) => (
                    <p key={item} className="text-base font-semibold text-brand-night">{item}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="page-shell mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {copy.sponsorship.demographics.traits.map((trait) => (
            <div key={trait} className="section-panel hover-lift rounded-[24px] bg-white p-5">
              <div className="mb-4 inline-flex rounded-full bg-brand-wash p-2 text-brand-orange">
                <Users className="size-4" />
              </div>
              <p className="text-sm leading-7 text-brand-muted">{trait}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-divider bg-brand-paper section-space">
        <div className="page-shell space-y-12">
          <PublicSectionHeading
            eyebrow={copy.sponsorship.campaign.eyebrow}
            title={copy.sponsorship.campaign.title}
            description={copy.sponsorship.campaign.description}
          />

          <div className="grid gap-5 lg:grid-cols-3">
            {copy.sponsorship.campaign.phases.map((phase) => (
              <div key={phase.label} className="section-panel hover-lift rounded-[28px] bg-white p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-orange">{phase.label}</p>
                <div className="mt-4 space-y-3">
                  {phase.points.map((point) => (
                    <p key={point} className="text-sm leading-7 text-brand-muted">{point}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {copy.sponsorship.campaign.networks.map((item) => (
              <div key={item} className="rounded-[24px] border border-brand-line bg-brand-night p-5 text-white">
                <Megaphone className="size-5 text-brand-lime" />
                <p className="mt-4 text-sm leading-7 text-white/76">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="page-shell space-y-12">
          <PublicSectionHeading
            eyebrow={copy.sponsorship.packages.eyebrow}
            title={copy.sponsorship.packages.title}
            description={copy.sponsorship.packages.description}
          />

          <div className="grid gap-5 xl:grid-cols-3">
            {copy.sponsorship.packages.tiers.map((tier) => (
              <div
                key={tier.name}
                className={`rounded-[32px] border p-6 ${
                  tier.featured
                    ? "border-brand-night bg-brand-night text-white shadow-[0_30px_70px_rgba(7,11,24,0.18)]"
                    : "border-brand-line bg-brand-paper text-brand-night"
                }`}
              >
                <p className={`text-xs font-semibold uppercase tracking-[0.24em] ${tier.featured ? "text-brand-lime" : "text-brand-orange"}`}>
                  {tier.slotLabel}
                </p>
                <h2 className="mt-4 text-3xl font-bold">{tier.name}</h2>
                <p className={`mt-4 text-4xl font-bold ${tier.featured ? "text-brand-lime" : "text-brand-night"}`}>
                  {formatIdr(locale, tier.price)}
                </p>

                <div className={`mt-6 space-y-3 border-t pt-5 ${tier.featured ? "border-white/12" : "border-brand-line"}`}>
                  {tier.features.map((feature) => (
                    <p key={feature} className={`text-sm leading-7 ${tier.featured ? "text-white/76" : "text-brand-muted"}`}>
                      {feature}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="section-panel rounded-[30px] bg-brand-paper p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-orange">{copy.sponsorship.packages.inKind.title}</p>
            <p className="mt-3 text-base leading-8 text-brand-muted">{copy.sponsorship.packages.inKind.description}</p>
          </div>
        </div>
      </section>

      <section className="section-divider bg-brand-paper section-space">
        <div className="page-shell space-y-12">
          <PublicSectionHeading
            eyebrow={copy.sponsorship.benefits.eyebrow}
            title={copy.sponsorship.benefits.title}
            description={copy.sponsorship.benefits.description}
          />

          <div className="grid gap-5 xl:grid-cols-3">
            {copy.sponsorship.benefits.groups.map((group) => (
              <div key={group.title} className="section-panel hover-lift rounded-[28px] bg-white p-6">
                <h2 className="text-2xl font-bold text-brand-night">{group.title}</h2>
                <div className="mt-4 space-y-3">
                  {group.items.map((item) => (
                    <p key={item} className="text-sm leading-7 text-brand-muted">{item}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="page-shell grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(320px,1fr)]">
          <PublicSectionHeading
            eyebrow={copy.sponsorship.timeline.eyebrow}
            title={copy.sponsorship.timeline.title}
            description={copy.sponsorship.timeline.description}
          />

          <div className="space-y-4">
            {copy.sponsorship.timeline.phases.map((phase) => (
              <div key={`${phase.label}-${phase.title}`} className="section-panel hover-lift rounded-[26px] bg-brand-paper p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-orange">{phase.label}</p>
                <h3 className="mt-3 text-xl font-bold text-brand-night">{phase.title}</h3>
                <div className="mt-4 space-y-2">
                  {phase.points.map((point) => (
                    <p key={point} className="text-sm leading-7 text-brand-muted">{point}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="page-shell overflow-hidden rounded-[36px] bg-[linear-gradient(135deg,#081120_0%,#12253d_55%,#193128_100%)] text-white shadow-[0_30px_90px_rgba(6,10,22,0.18)]">
          <div className="grid gap-10 p-6 md:p-8 lg:grid-cols-[minmax(0,0.94fr)_minmax(320px,0.82fr)] lg:gap-14 lg:p-12">
            <div className="space-y-5">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-lime">{copy.sponsorship.deadline.title}</p>
              <h2 className="text-4xl font-bold leading-tight">{copy.sponsorship.intro.title}</h2>
              <p className="max-w-2xl text-base leading-8 text-white/74">{copy.sponsorship.deadline.description}</p>
            </div>

            <div className="space-y-4">
              <div className="rounded-[28px] border border-white/10 bg-white/6 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-lime">{copy.navigation.register}</p>
                <p className="mt-3 text-sm leading-7 text-white/76">{runtime.contactValue}</p>
              </div>
              <SiteButton href={sponsorContactHref} external className="w-full justify-center">
                {copy.sponsorship.deadline.primaryLabel}
              </SiteButton>
              <SiteButton href={getPageHref(locale, "event")} variant="secondary" className="w-full justify-center">
                {copy.navigation.event}
              </SiteButton>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
