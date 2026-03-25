import type { Metadata } from "next";

import { AboutSection } from "@/components/site/about-section";
import { ActivitiesSection } from "@/components/site/activities-section";
import { ClosingCtaSection } from "@/components/site/closing-cta-section";
import { Footer } from "@/components/site/footer";
import { FaqSection } from "@/components/site/faq-section";
import { HeroSection } from "@/components/site/hero-section";
import { MobileStickyCta } from "@/components/site/mobile-sticky-cta";
import { Navbar } from "@/components/site/navbar";
import { PricingSection } from "@/components/site/pricing-section";
import { RegistrationStepsSection } from "@/components/site/registration-steps-section";
import { readSiteContent, resolveRegistrationUrl } from "@/lib/site-content";
import { getSiteUrl } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const content = await readSiteContent();
  const title = `${content.eventName} | Lari, DJ, Treasure Hunt, dan Doorprize`;
  const description = content.heroSubheadline;

  return {
    title,
    description,
    alternates: {
      canonical: getSiteUrl(),
    },
    openGraph: {
      title,
      description,
      url: getSiteUrl(),
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: content.eventName,
        },
      ],
    },
  };
}

export default async function Home() {
  const content = await readSiteContent();
  const registrationUrl = resolveRegistrationUrl(content);

  return (
    <div className="relative overflow-x-hidden bg-brand-sand text-brand-ink">
      <Navbar eventName={content.eventName} ctaText={content.heroCtaText} registrationUrl={registrationUrl} />
      <main id="beranda">
        <HeroSection content={content} registrationUrl={registrationUrl} />
        <AboutSection content={content} />
        <ActivitiesSection activities={content.activities} />
        <PricingSection
          pricing={content.pricing}
          ctaText={content.heroCtaText}
          normalPricePeriod={content.normalPricePeriod}
          registrationUrl={registrationUrl}
        />
        <RegistrationStepsSection
          steps={content.registrationSteps}
          ctaText={content.heroCtaText}
          registrationUrl={registrationUrl}
        />
        <FaqSection faq={content.faq} contactLabel={content.contactLabel} contactValue={content.contactValue} />
        <ClosingCtaSection
          title={content.closingHeadline}
          description={content.closingDescription}
          ctaText={content.closingCtaText}
          registrationUrl={registrationUrl}
        />
      </main>
      <Footer
        eventName={content.eventName}
        footerText={content.footerText}
        contactLabel={content.contactLabel}
        contactValue={content.contactValue}
        socials={content.socials}
      />
      <MobileStickyCta ctaText={content.heroCtaText} registrationUrl={registrationUrl} />
    </div>
  );
}

