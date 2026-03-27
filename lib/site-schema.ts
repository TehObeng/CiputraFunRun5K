import { z } from "zod";

const requiredText = z.string().trim().min(1, "Kolom ini wajib diisi.");
const optionalText = z.string().trim().optional().default("");
const positiveInteger = z.number().int().min(0, "Nilai tidak boleh negatif.");

function isHttpUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function isRelativeAssetUrl(value: string) {
  return value.startsWith("/");
}

function isInternalHref(value: string) {
  return value.startsWith("#") || value.startsWith("/");
}

const publicUrlText = z
  .string()
  .trim()
  .min(1, "URL publik wajib diisi.")
  .refine((value) => isRelativeAssetUrl(value) || isHttpUrl(value), {
    message: "Gunakan URL https:// yang valid atau path yang diawali /.",
  });

const hrefText = z
  .string()
  .trim()
  .min(1, "Tautan wajib diisi.")
  .refine((value) => isInternalHref(value) || isHttpUrl(value), {
    message: "Gunakan anchor (#bagian), path (/halaman), atau URL https:// yang valid.",
  });

const externalUrlText = z.string().trim().url("Masukkan URL https:// yang valid.");

export const imageAssetSchema = z.object({
  path: requiredText,
  publicUrl: publicUrlText,
  alt: requiredText,
});

export const navItemSchema = z.object({
  label: requiredText,
  href: hrefText,
});

export const heroStatSchema = z.object({
  label: requiredText,
  value: requiredText,
  description: requiredText,
});

export const highlightCardSchema = z.object({
  label: requiredText,
  title: requiredText,
  description: requiredText,
});

export const experienceItemSchema = z.object({
  title: requiredText,
  description: requiredText,
});

export const timelineItemSchema = z.object({
  time: requiredText,
  title: requiredText,
  description: requiredText,
});

export const pricingCardSchema = z.object({
  badge: requiredText,
  name: requiredText,
  price: positiveInteger,
  description: requiredText,
  featured: z.boolean().default(false),
});

export const faqItemSchema = z.object({
  question: requiredText,
  answer: requiredText,
});

export const registrationStepSchema = z.object({
  title: requiredText,
  description: requiredText,
});

export const socialLinkSchema = z.object({
  label: requiredText,
  url: externalUrlText,
});

export const announcementSchema = z.object({
  label: requiredText,
  text: requiredText,
  linkLabel: requiredText,
  linkHref: hrefText,
});

export const brandSchema = z.object({
  eyebrow: requiredText,
  name: requiredText,
  tagline: requiredText,
  locationLabel: requiredText,
  logo: imageAssetSchema,
  navItems: z.array(navItemSchema).min(3).max(6),
});

export const heroSchema = z.object({
  badge: requiredText,
  title: requiredText,
  description: requiredText,
  supportingLabel: requiredText,
  supportingTitle: requiredText,
  supportingDescription: requiredText,
  primaryCtaLabel: requiredText,
  secondaryCtaLabel: requiredText,
  secondaryCtaHref: hrefText,
  stats: z.array(heroStatSchema).min(3).max(4),
});

export const overviewSchema = z.object({
  eyebrow: requiredText,
  title: requiredText,
  description: requiredText,
  highlights: z.array(highlightCardSchema).min(3).max(4),
});

export const experienceSchema = z.object({
  eyebrow: requiredText,
  title: requiredText,
  description: requiredText,
  items: z.array(experienceItemSchema).min(3).max(6),
});

export const timelineSchema = z.object({
  eyebrow: requiredText,
  title: requiredText,
  description: requiredText,
  items: z.array(timelineItemSchema).min(3).max(6),
});

export const pricingSchema = z.object({
  eyebrow: requiredText,
  title: requiredText,
  description: requiredText,
  periodLabel: requiredText,
  periodText: requiredText,
  footnote: requiredText,
  cards: z.array(pricingCardSchema).min(2).max(5),
});

export const faqSectionSchema = z.object({
  eyebrow: requiredText,
  title: requiredText,
  description: requiredText,
  contactLabel: requiredText,
  contactValue: requiredText,
  items: z.array(faqItemSchema).min(3).max(12),
});

export const registrationSchema = z.object({
  eyebrow: requiredText,
  title: requiredText,
  description: requiredText,
  helperText: requiredText,
  destinationType: z.literal("external"),
  href: externalUrlText,
  primaryLabel: requiredText,
  secondaryLabel: requiredText,
  secondaryHref: hrefText,
  steps: z.array(registrationStepSchema).min(3).max(5),
});

export const footerSchema = z.object({
  description: requiredText,
  contactLabel: requiredText,
  contactValue: requiredText,
  socialLabel: requiredText,
  copyrightText: requiredText,
  note: requiredText,
  socials: z.array(socialLinkSchema).min(1).max(6),
});

export const seoSchema = z.object({
  metaTitle: requiredText,
  metaDescription: requiredText,
  ogTitle: requiredText,
  ogDescription: requiredText,
  ogImage: imageAssetSchema,
});

export const landingPageContentSchema = z.object({
  brand: brandSchema,
  announcement: announcementSchema,
  hero: heroSchema,
  overview: overviewSchema,
  experience: experienceSchema,
  timeline: timelineSchema,
  pricing: pricingSchema,
  faq: faqSectionSchema,
  registration: registrationSchema,
  footer: footerSchema,
  seo: seoSchema,
});

const legacyActivitySchema = z.object({
  title: requiredText,
  description: requiredText,
});

const legacyPricingSchema = z.object({
  name: requiredText,
  price: positiveInteger,
  description: requiredText,
  featured: z.boolean().default(false),
});

const legacyRegistrationStepSchema = z.object({
  title: requiredText,
  description: requiredText,
});

const legacyFaqSchema = z.object({
  question: requiredText,
  answer: requiredText,
});

const legacySocialSchema = z.object({
  label: requiredText,
  url: externalUrlText,
});

export const legacySiteContentSchema = z.object({
  eventName: requiredText,
  badgeText: requiredText,
  heroHeadline: requiredText,
  heroSubheadline: requiredText,
  heroCtaText: requiredText,
  heroSecondaryCtaText: requiredText,
  aboutTitle: requiredText,
  aboutDescription: requiredText,
  normalPricePeriod: requiredText,
  googleFormUrl: externalUrlText,
  activities: z.array(legacyActivitySchema).min(1).max(8),
  pricing: z.array(legacyPricingSchema).min(1).max(6),
  registrationSteps: z.array(legacyRegistrationStepSchema).min(1).max(5),
  faq: z.array(legacyFaqSchema).min(1).max(12),
  closingHeadline: requiredText,
  closingDescription: requiredText,
  closingCtaText: requiredText,
  footerText: requiredText,
  contactLabel: requiredText,
  contactValue: requiredText,
  socials: z.array(legacySocialSchema).max(5),
});

export const adminUserSchema = z.object({
  id: requiredText,
  email: requiredText,
  role: z.literal("admin"),
  status: z.enum(["active", "disabled"]),
  createdAt: optionalText,
  updatedAt: optionalText,
});

export type ImageAsset = z.infer<typeof imageAssetSchema>;
export type NavItem = z.infer<typeof navItemSchema>;
export type HeroStat = z.infer<typeof heroStatSchema>;
export type HighlightCard = z.infer<typeof highlightCardSchema>;
export type ExperienceItem = z.infer<typeof experienceItemSchema>;
export type TimelineItem = z.infer<typeof timelineItemSchema>;
export type PricingCard = z.infer<typeof pricingCardSchema>;
export type FaqItem = z.infer<typeof faqItemSchema>;
export type RegistrationStep = z.infer<typeof registrationStepSchema>;
export type SocialLink = z.infer<typeof socialLinkSchema>;
export type LandingPageContent = z.infer<typeof landingPageContentSchema>;
export type LegacySiteContent = z.infer<typeof legacySiteContentSchema>;
export type AdminUser = z.infer<typeof adminUserSchema>;
