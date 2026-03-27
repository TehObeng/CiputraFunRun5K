import type { Metadata } from "next";
import { ArrowRight, CalendarDays, Clock3, MapPin, Sparkles } from "lucide-react";
import { notFound } from "next/navigation";

import { PublicSectionHeading } from "@/components/site/public-section-heading";
import { SiteButton } from "@/components/site/site-button";
import { buildPageMetadata } from "@/lib/public-metadata";
import { getPublicRuntime } from "@/lib/public-runtime";
import { getPageHref, getSiteCopy } from "@/lib/public-site-content";
import { isLocale } from "@/lib/locale";

type LocaleHomePageProps = {
  params: Promise<{ locale: string }>;
};

function getDetailIcon(label: string) {
  if (label === "Tanggal" || label === "Date") {
    return CalendarDays;
  }

  if (label === "Waktu" || label === "Time") {
    return Clock3;
  }

  return MapPin;
}

export async function generateMetadata({ params }: LocaleHomePageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : "id";

  return buildPageMetadata(locale, "home");
}

export default async function LocaleHomePage({ params }: LocaleHomePageProps) {
  const { locale: rawLocale } = await params;

  if (!isLocale(rawLocale)) {
    notFound();
  }

  const locale = rawLocale;
  const copy = getSiteCopy(locale);
  const runtime = await getPublicRuntime();

  return (
    <main id="main-content">
      <section className="relative overflow-hidden bg-[linear-gradient(135deg,#081120_0%,#0f2138_48%,#1d312d_100%)] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_18%,rgba(208,255,54,0.14),transparent_24%),radial-gradient(circle_at_86%_14%,rgba(255,107,61,0.2),transparent_22%),radial-gradient(circle_at_72%_78%,rgba(255,154,31,0.12),transparent_20%)]" />
        <div className="mx-auto grid min-h-[calc(100svh-5rem)] w-[min(1200px,calc(100%-1.5rem))] items-end gap-12 py-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)] lg:py-20">
          <div className="relative z-10 max-w-3xl space-y-8">
            <div className="inline-flex flex-wrap items-center gap-3 rounded-full border border-white/12 bg-white/10 px-4 py-2 text-sm backdrop-blur">
              <Sparkles className="size-4 text-brand-lime" />
              <span className="font-medium text-white/82">{copy.home.hero.announcement}</span>
            </div>

            <div className="space-y-5">
              <p className="text-sm font-semibold uppercase tracking-[0.34em] text-white/58">{copy.home.hero.eyebrow}</p>
              <h1 className="max-w-[12ch] text-balance text-[clamp(3rem,8vw,6.6rem)] font-bold leading-[0.92]">
                {copy.home.hero.title}
              </h1>
              <p className="max-w-2xl text-base leading-8 text-white/76 md:text-lg">{copy.home.hero.description}</p>
            </div>

            <div className="flex flex-wrap gap-3">
              <SiteButton href={runtime.registrationUrl} external>
                {copy.home.hero.primaryLabel}
              </SiteButton>
              <SiteButton href={getPageHref(locale, "sponsorship")} variant="secondary">
                {copy.home.hero.secondaryLabel}
              </SiteButton>
            </div>

            <div className="grid gap-4 border-t border-white/12 pt-6 md:grid-cols-3">
              {copy.home.stats.map((stat) => (
                <div key={stat.label} className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-lime">{stat.label}</p>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-sm leading-7 text-white/62">{stat.note}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-10 overflow-hidden rounded-[34px] bg-[linear-gradient(180deg,#fffdf9_0%,#f8f1e7_100%)] p-5 text-brand-night shadow-[0_32px_80px_rgba(6,10,22,0.35)] md:p-7">
            <div className="space-y-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-orange">{copy.brand.eyebrow}</p>
                <p className="mt-2 text-2xl font-bold">{copy.brand.name}</p>
                <p className="mt-2 text-sm leading-7 text-brand-muted">{copy.brand.strapline}</p>
              </div>

              <div className="space-y-4">
                {copy.home.detailCards.map((item) => {
                  const Icon = getDetailIcon(item.label);

                  return (
                    <div key={item.label} className="rounded-[24px] border border-brand-line bg-white p-4 shadow-[0_16px_30px_rgba(11,22,40,0.05)]">
                      <div className="flex items-start gap-3">
                        <div className="rounded-2xl bg-brand-wash p-2 text-brand-orange">
                          <Icon className="size-4" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-muted">{item.label}</p>
                          <p className="mt-2 text-lg font-bold text-brand-night">{item.value}</p>
                          <p className="mt-2 text-sm leading-7 text-brand-muted">{item.note}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="rounded-[24px] border border-brand-line bg-brand-night px-5 py-4 text-white">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-lime">Contact</p>
                <p className="mt-3 text-lg font-semibold">{runtime.contactValue}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-18 md:py-24">
        <div className="mx-auto grid w-[min(1200px,calc(100%-1.5rem))] gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(320px,1fr)] lg:gap-16">
          <PublicSectionHeading
            eyebrow={copy.home.overview.eyebrow}
            title={copy.home.overview.title}
            description={copy.home.overview.description}
          />

          <div className="space-y-5">
            {copy.home.highlights.map((item) => (
              <div key={item.title} className="rounded-[28px] border border-brand-line bg-brand-paper p-6 shadow-[0_18px_40px_rgba(11,22,40,0.05)]">
                <h3 className="text-2xl font-bold text-brand-night">{item.title}</h3>
                <p className="mt-3 text-base leading-8 text-brand-muted">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-paper py-18 md:py-24">
        <div className="mx-auto grid w-[min(1200px,calc(100%-1.5rem))] gap-10 lg:grid-cols-[minmax(0,0.94fr)_minmax(320px,0.82fr)] lg:gap-16">
          <PublicSectionHeading
            eyebrow={copy.home.sponsorValue.eyebrow}
            title={copy.home.sponsorValue.title}
            description={copy.home.sponsorValue.description}
          />

          <div className="space-y-4">
            {copy.home.sponsorValue.bullets.map((bullet) => (
              <div key={bullet} className="grid grid-cols-[auto_minmax(0,1fr)] gap-4 rounded-[24px] border border-brand-line bg-white p-5">
                <div className="mt-1 flex h-9 w-9 items-center justify-center rounded-full bg-brand-night text-sm font-bold text-brand-lime">
                  +
                </div>
                <p className="text-base leading-8 text-brand-muted">{bullet}</p>
              </div>
            ))}

            <div className="rounded-[26px] border border-brand-line bg-[linear-gradient(135deg,#081120_0%,#13253d_65%,#193128_100%)] p-6 text-white shadow-[0_28px_70px_rgba(7,11,24,0.24)]">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-lime">{copy.navigation.register}</p>
              <p className="mt-3 text-2xl font-bold">{copy.brand.strapline}</p>
              <p className="mt-3 text-sm leading-7 text-white/72">{runtime.registrationUrl}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-18 md:py-24">
        <div className="mx-auto overflow-hidden rounded-[36px] bg-[linear-gradient(135deg,#081120_0%,#12253d_55%,#193128_100%)] text-white shadow-[0_30px_90px_rgba(6,10,22,0.18)]">
          <div className="grid gap-10 p-6 md:p-8 lg:grid-cols-[minmax(0,0.94fr)_minmax(320px,0.82fr)] lg:gap-14 lg:p-12">
            <PublicSectionHeading
              eyebrow={copy.home.nextSteps.eyebrow}
              title={copy.home.nextSteps.title}
              description={copy.home.nextSteps.description}
              inverted
            />

            <div className="space-y-4">
              <a
                href={getPageHref(locale, "event")}
                className="group flex items-center justify-between rounded-[28px] border border-white/10 bg-white/6 px-5 py-5 transition hover:bg-white/10"
              >
                <span className="text-lg font-semibold">{copy.home.nextSteps.eventLabel}</span>
                <ArrowRight className="size-5 transition group-hover:translate-x-1" />
              </a>
              <a
                href={getPageHref(locale, "sponsorship")}
                className="group flex items-center justify-between rounded-[28px] border border-white/10 bg-white/6 px-5 py-5 transition hover:bg-white/10"
              >
                <span className="text-lg font-semibold">{copy.home.nextSteps.sponsorshipLabel}</span>
                <ArrowRight className="size-5 transition group-hover:translate-x-1" />
              </a>
              <SiteButton href={runtime.registrationUrl} external className="mt-2 w-full justify-center">
                {copy.home.hero.primaryLabel}
              </SiteButton>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
