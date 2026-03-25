import { z } from "zod";

const requiredText = z.string().trim().min(1, "Kolom ini wajib diisi.");
const urlText = z.string().trim().url("Masukkan URL yang valid.");

export const activitySchema = z.object({
  title: requiredText,
  description: requiredText,
});

export const pricingSchema = z.object({
  name: requiredText,
  price: z.number().int().min(0, "Harga tidak boleh negatif."),
  description: requiredText,
  featured: z.boolean().default(false),
});

export const registrationStepSchema = z.object({
  title: requiredText,
  description: requiredText,
});

export const faqItemSchema = z.object({
  question: requiredText,
  answer: requiredText,
});

export const socialLinkSchema = z.object({
  label: requiredText,
  url: urlText,
});

export const siteContentSchema = z.object({
  eventName: requiredText,
  badgeText: requiredText,
  heroHeadline: requiredText,
  heroSubheadline: requiredText,
  heroCtaText: requiredText,
  heroSecondaryCtaText: requiredText,
  aboutTitle: requiredText,
  aboutDescription: requiredText,
  normalPricePeriod: requiredText,
  googleFormUrl: urlText,
  activities: z.array(activitySchema).min(1).max(8),
  pricing: z.array(pricingSchema).min(1).max(6),
  registrationSteps: z.array(registrationStepSchema).min(1).max(5),
  faq: z.array(faqItemSchema).min(1).max(12),
  closingHeadline: requiredText,
  closingDescription: requiredText,
  closingCtaText: requiredText,
  footerText: requiredText,
  contactLabel: requiredText,
  contactValue: requiredText,
  socials: z.array(socialLinkSchema).max(5),
});

export type SiteContent = z.infer<typeof siteContentSchema>;
export type ActivityItem = z.infer<typeof activitySchema>;
export type PricingItem = z.infer<typeof pricingSchema>;
export type RegistrationStep = z.infer<typeof registrationStepSchema>;
export type FaqItem = z.infer<typeof faqItemSchema>;
export type SocialLink = z.infer<typeof socialLinkSchema>;

