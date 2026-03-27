import type { Metadata } from "next";
import { Flag, MapPinned } from "lucide-react";
import { notFound } from "next/navigation";

import { PublicSectionHeading } from "@/components/site/public-section-heading";
import { SiteButton } from "@/components/site/site-button";
import { buildPageMetadata } from "@/lib/public-metadata";
import { getPublicRuntime } from "@/lib/public-runtime";
import { getPageHref, getSiteCopy } from "@/lib/public-site-content";
import { isLocale } from "@/lib/locale";

type EventPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : "id";

  return buildPageMetadata(locale, "event");
}

export default async function EventPage({ params }: EventPageProps) {
  const { locale: rawLocale } = await params;

  if (!isLocale(rawLocale)) {
    notFound();
  }

  const locale = rawLocale;
  const copy = getSiteCopy(locale);
  const runtime = await getPublicRuntime();

  return (
    <main id="main-content">
      <section className="relative overflow-hidden bg-brand-night py-18 text-white md:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_22%,rgba(208,255,54,0.12),transparent_22%),radial-gradient(circle_at_84%_16%,rgba(255,154,31,0.16),transparent_18%)]" />
        <div className="relative mx-auto grid w-[min(1200px,calc(100%-1.5rem))] gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.86fr)]">
          <PublicSectionHeading
            eyebrow={copy.event.intro.eyebrow}
            title={copy.event.intro.title}
            description={copy.event.intro.description}
            inverted
          />

          <div className="rounded-[30px] border border-white/10 bg-white/6 p-6 backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-lime">{copy.event.route.eyebrow}</p>
            <p className="mt-3 text-2xl font-bold">{copy.event.route.title}</p>
            <p className="mt-3 text-sm leading-7 text-white/72">{copy.event.route.description}</p>

            <div className="mt-5 flex flex-wrap gap-2">
              {copy.event.route.waterStations.map((station) => (
                <span key={station} className="rounded-full border border-white/12 bg-white/8 px-3 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/86">
                  {station}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-18 md:py-24">
        <div className="mx-auto w-[min(1200px,calc(100%-1.5rem))] space-y-12">
          <div className="grid gap-5 md:grid-cols-3">
            {copy.event.advantages.map((item) => (
              <div key={item.title} className="rounded-[28px] border border-brand-line bg-brand-paper p-6 shadow-[0_18px_40px_rgba(11,22,40,0.05)]">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-orange">Core advantage</p>
                <h2 className="mt-4 text-2xl font-bold text-brand-night">{item.title}</h2>
                <p className="mt-3 text-base leading-8 text-brand-muted">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-paper py-18 md:py-24">
        <div className="mx-auto grid w-[min(1200px,calc(100%-1.5rem))] gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(320px,1fr)] lg:gap-16">
          <PublicSectionHeading
            eyebrow={copy.event.route.eyebrow}
            title={copy.event.route.title}
            description={copy.event.route.description}
          />

          <div className="grid gap-4 md:grid-cols-2">
            {copy.event.route.checkpoints.map((checkpoint, index) => (
              <div key={checkpoint} className="rounded-[24px] border border-brand-line bg-white p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-muted">{String(index + 1).padStart(2, "0")}</p>
                <p className="mt-3 text-lg font-bold text-brand-night">{checkpoint}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-18 md:py-24">
        <div className="mx-auto grid w-[min(1200px,calc(100%-1.5rem))] gap-12 lg:grid-cols-[minmax(0,0.86fr)_minmax(320px,1fr)]">
          <PublicSectionHeading
            eyebrow={copy.event.timeline.eyebrow}
            title={copy.event.timeline.title}
            description={copy.event.timeline.description}
          />

          <div className="relative pl-8">
            <div className="absolute bottom-0 left-2 top-0 w-px bg-brand-line" />
            <div className="space-y-8">
              {copy.event.timeline.items.map((item) => (
                <div key={`${item.time}-${item.title}`} className="relative">
                  <div className="absolute -left-[2.1rem] top-1.5 h-3 w-3 rounded-full bg-brand-orange shadow-[0_0_0_8px_rgba(255,154,31,0.1)]" />
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full border border-brand-line bg-brand-paper px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-brand-orange">
                      {item.time}
                    </span>
                    <h3 className="text-2xl font-bold text-brand-night">{item.title}</h3>
                  </div>
                  <p className="mt-3 text-base leading-8 text-brand-muted">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-brand-paper py-18 md:py-24">
        <div className="mx-auto w-[min(1200px,calc(100%-1.5rem))] space-y-12">
          <PublicSectionHeading
            eyebrow={copy.event.afterRun.eyebrow}
            title={copy.event.afterRun.title}
            description={copy.event.afterRun.description}
          />

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {copy.event.afterRun.items.map((item) => (
              <div key={item.title} className="rounded-[26px] border border-brand-line bg-white p-5 shadow-[0_16px_38px_rgba(11,22,40,0.05)]">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-orange">After run</p>
                <h3 className="mt-4 text-2xl font-bold text-brand-night">{item.title}</h3>
                <p className="mt-3 text-base leading-8 text-brand-muted">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-18 md:py-24">
        <div className="mx-auto grid w-[min(1200px,calc(100%-1.5rem))] gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(340px,0.82fr)] lg:gap-16">
          <PublicSectionHeading
            eyebrow={copy.event.participantKit.eyebrow}
            title={copy.event.participantKit.title}
            description={copy.event.participantKit.description}
          />

          <div className="space-y-4">
            {copy.event.participantKit.items.map((item) => (
              <div key={item} className="grid grid-cols-[auto_minmax(0,1fr)] gap-4 rounded-[24px] border border-brand-line bg-brand-paper p-5">
                <div className="mt-1 rounded-full bg-brand-night p-2 text-brand-lime">
                  <Flag className="size-4" />
                </div>
                <p className="text-base leading-8 text-brand-muted">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-18 md:py-24">
        <div className="mx-auto overflow-hidden rounded-[36px] bg-[linear-gradient(135deg,#081120_0%,#12253d_55%,#193128_100%)] text-white shadow-[0_30px_90px_rgba(6,10,22,0.18)]">
          <div className="grid gap-10 p-6 md:p-8 lg:grid-cols-[minmax(0,0.94fr)_minmax(320px,0.8fr)] lg:gap-14 lg:p-12">
            <div className="space-y-6">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-lime">{copy.event.specialMoment.eyebrow}</p>
              <h2 className="text-4xl font-bold leading-tight">{copy.event.specialMoment.title}</h2>
              <p className="max-w-2xl text-base leading-8 text-white/74">{copy.event.specialMoment.description}</p>
            </div>

            <div className="space-y-4">
              <div className="rounded-[28px] border border-white/10 bg-white/6 p-5">
                <div className="flex items-start gap-3">
                  <MapPinned className="mt-1 size-5 text-brand-lime" />
                  <p className="text-sm leading-7 text-white/76">{runtime.contactValue}</p>
                </div>
              </div>
              <SiteButton href={runtime.registrationUrl} external className="w-full justify-center">
                {copy.navigation.register}
              </SiteButton>
              <SiteButton href={getPageHref(locale, "sponsorship")} variant="secondary" className="w-full justify-center">
                {copy.navigation.sponsorship}
              </SiteButton>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
