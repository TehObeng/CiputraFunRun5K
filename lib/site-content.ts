import { DEFAULT_LOGO_URL, DEFAULT_REGISTRATION_URL, getDefaultLandingPageContent } from "@/lib/default-content";
import {
  landingPageContentSchema,
  legacySiteContentSchema,
  type LandingPageContent,
  type LegacySiteContent,
} from "@/lib/site-schema";
import { createPublicSupabaseClient, SITE_CONTENT_SLUG } from "@/lib/supabase";
import { hasSupabaseConfig } from "@/lib/env";

function migrateLegacyContent(content: LegacySiteContent): LandingPageContent {
  const fallback = getDefaultLandingPageContent();

  return {
    brand: {
      ...fallback.brand,
      name: content.eventName,
      tagline: content.aboutDescription,
    },
    announcement: {
      ...fallback.announcement,
      text: `Harga normal berlaku pada ${content.normalPricePeriod}.`,
    },
    hero: {
      ...fallback.hero,
      badge: content.badgeText,
      title: content.heroHeadline,
      description: content.heroSubheadline,
      primaryCtaLabel: content.heroCtaText,
      secondaryCtaLabel: content.heroSecondaryCtaText,
    },
    overview: {
      ...fallback.overview,
      title: content.aboutTitle,
      description: content.aboutDescription,
    },
    experience: {
      ...fallback.experience,
      items: content.activities.map((item) => ({
        title: item.title,
        description: item.description,
      })),
    },
    timeline: fallback.timeline,
    pricing: {
      ...fallback.pricing,
      periodText: content.normalPricePeriod,
      cards: content.pricing.map((item) => ({
        badge: item.featured ? "Recommended" : item.name,
        name: item.name,
        price: item.price,
        description: item.description,
        featured: item.featured,
      })),
    },
    faq: {
      ...fallback.faq,
      contactLabel: content.contactLabel,
      contactValue: content.contactValue,
      items: content.faq,
    },
    registration: {
      ...fallback.registration,
      title: content.closingHeadline,
      description: content.closingDescription,
      href: content.googleFormUrl,
      primaryLabel: content.closingCtaText,
      secondaryLabel: content.heroSecondaryCtaText,
      steps: content.registrationSteps,
    },
    footer: {
      ...fallback.footer,
      description: content.footerText,
      contactLabel: content.contactLabel,
      contactValue: content.contactValue,
      socials: content.socials.length > 0 ? content.socials : fallback.footer.socials,
      copyrightText: content.eventName,
    },
    seo: {
      ...fallback.seo,
      metaTitle: `${content.eventName} | Event landing page`,
      metaDescription: content.heroSubheadline,
      ogTitle: content.eventName,
      ogDescription: content.heroSubheadline,
      ogImage: {
        path: DEFAULT_LOGO_URL,
        publicUrl: DEFAULT_LOGO_URL,
        alt: `${content.eventName} logo`,
      },
    },
  };
}

export function normalizeLandingPageContent(rawContent: unknown) {
  const current = landingPageContentSchema.safeParse(rawContent);

  if (current.success) {
    return current.data;
  }

  const legacy = legacySiteContentSchema.safeParse(rawContent);

  if (legacy.success) {
    return migrateLegacyContent(legacy.data);
  }

  return null;
}

export function getDefaultContent(): LandingPageContent {
  return getDefaultLandingPageContent();
}

export async function getLandingPageContent(): Promise<LandingPageContent> {
  const fallback = getDefaultLandingPageContent();

  if (!hasSupabaseConfig()) {
    return fallback;
  }

  try {
    const supabase = createPublicSupabaseClient();
    const { data, error } = await supabase
      .from("site_content")
      .select("content")
      .eq("slug", SITE_CONTENT_SLUG)
      .maybeSingle();

    if (error || !data?.content) {
      return fallback;
    }

    return normalizeLandingPageContent(data.content) ?? fallback;
  } catch {
    return fallback;
  }
}

export function getRegistrationDestination(content: LandingPageContent) {
  return content.registration.href || DEFAULT_REGISTRATION_URL;
}
