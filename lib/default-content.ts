import type { LandingPageContent } from "@/lib/site-schema";

export const DEFAULT_LOGO_URL = "/citraland-fun-run-logo.png";
export const DEFAULT_REGISTRATION_URL = "https://forms.gle/tEz7uZ2i6y5Gfsbv8";

const DEFAULT_CONTENT: LandingPageContent = {
  brand: {
    eyebrow: "Citraland presents",
    name: "Fun Run 5K Batam",
    tagline: "Morning miles, music, and a clean community vibe in one event.",
    locationLabel: "Batam, Kepulauan Riau",
    logo: {
      path: DEFAULT_LOGO_URL,
      publicUrl: DEFAULT_LOGO_URL,
      alt: "Citraland Fun Run 5K Batam logo",
    },
    navItems: [
      { label: "Overview", href: "#overview" },
      { label: "Experience", href: "#experience" },
      { label: "Timeline", href: "#timeline" },
      { label: "Pricing", href: "#pricing" },
      { label: "FAQ", href: "#faq" },
    ],
  },
  announcement: {
    label: "Registration update",
    text: "Early bird and community slots are open while the main pricing window runs from 4 to 22 May 2026.",
    linkLabel: "See ticket options",
    linkHref: "#pricing",
  },
  hero: {
    badge: "Premium community run with music, route support, and a polished finish area.",
    title: "A better city run for teams, friends, and first-time runners.",
    description:
      "Fun Run 5K Batam is designed to feel active, warm, and easy to join. Start with a clean 5K run, stay for the music, and finish inside an event atmosphere that feels organized and memorable.",
    supportingLabel: "Why people share this event",
    supportingTitle: "Built to feel festive without becoming visually noisy or confusing.",
    supportingDescription:
      "The route, pacing, pricing, and closing atmosphere are designed to keep the event clear for visitors and simple to explain for the committee.",
    primaryCtaLabel: "Register now",
    secondaryCtaLabel: "View pricing",
    secondaryCtaHref: "#pricing",
    stats: [
      {
        label: "Distance",
        value: "5K city run",
        description: "A welcoming route length for casual runners, teams, and community groups.",
      },
      {
        label: "Pricing window",
        value: "4-22 May 2026",
        description: "The normal pricing period stays visible so visitors can make a quick decision.",
      },
      {
        label: "Registration flow",
        value: "External form",
        description: "The CTA stays direct and consistent, with one destination for every public registration action.",
      },
    ],
  },
  overview: {
    eyebrow: "Event overview",
    title: "A polished landing page should explain the event in one pass, not make people hunt for details.",
    description:
      "The first sections focus on clarity, trust, and conversion. Visitors should understand the event, the atmosphere, and the next step in a few quick scrolls.",
    highlights: [
      {
        label: "City energy",
        title: "Start strong with a branded event identity",
        description: "The Citraland Fun Run mark becomes part of the hero so the event feels like a real product, not a generic template.",
      },
      {
        label: "Simple structure",
        title: "Clear sections with one job each",
        description: "Each area explains, proves, or converts instead of repeating the same message with different styling.",
      },
      {
        label: "Admin ready",
        title: "Copy can be updated without touching code",
        description: "The CMS keeps visible website text close to the surface so non-developers can work with confidence.",
      },
    ],
  },
  experience: {
    eyebrow: "Experience",
    title: "More than a route map. The day should feel organized, social, and worth sharing.",
    description:
      "This section sells the atmosphere of the event and gives the committee enough room to update the experience as the program evolves.",
    items: [
      {
        title: "5K run experience",
        description: "A friendly distance that feels approachable for first-timers while still energetic enough for communities and teams.",
      },
      {
        title: "Music and finish atmosphere",
        description: "The finish area keeps momentum high with sound, movement, and a clean presentation instead of a crowded layout.",
      },
      {
        title: "Community participation",
        description: "Group participation is treated as a first-class path, not an afterthought, so teams can commit quickly.",
      },
      {
        title: "Prize and sponsor moments",
        description: "The event keeps room for supporting activations, announcements, and doorprize moments without breaking the experience.",
      },
    ],
  },
  timeline: {
    eyebrow: "Run day timeline",
    title: "Visitors should be able to imagine the flow of the event before they register.",
    description:
      "A clear timeline reduces uncertainty and gives the committee a reliable place to keep event-day information updated.",
    items: [
      {
        time: "05:30",
        title: "Check-in opens",
        description: "Participants arrive, confirm their spot, and prepare before the crowd builds.",
      },
      {
        time: "06:15",
        title: "Warm-up and briefing",
        description: "The opening energy comes from one concise briefing and a short warm-up block.",
      },
      {
        time: "06:30",
        title: "Flag off",
        description: "The main 5K run starts with a clean, visible call to action and route support in place.",
      },
      {
        time: "07:45",
        title: "Finish area program",
        description: "Post-run energy shifts into music, sponsor activations, and prize announcements.",
      },
    ],
  },
  pricing: {
    eyebrow: "Pricing",
    title: "Keep ticketing easy to scan, easy to compare, and easy to act on.",
    description:
      "Visitors should immediately understand the best-fit option, the active pricing window, and where the registration CTA goes.",
    periodLabel: "Normal pricing period",
    periodText: "4-22 May 2026",
    footnote:
      "Community groups and friend bundles work best when the price, CTA, and copy stay aligned. Keep the registration link updated from the CMS when the destination changes.",
    cards: [
      {
        badge: "Early bird",
        name: "Early Bird",
        price: 150000,
        description: "Best for early registrants who want to secure their spot before the wider pricing window fills up.",
        featured: false,
      },
      {
        badge: "Recommended",
        name: "Group or Community",
        price: 150000,
        description: "Designed for teams, running groups, office squads, and friends who want to arrive together.",
        featured: true,
      },
      {
        badge: "Regular",
        name: "Normal",
        price: 200000,
        description: "A straightforward standard ticket that stays easy to understand for late decision makers.",
        featured: false,
      },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    title: "Short answers remove hesitation and make the final CTA feel safer.",
    description:
      "This area should cover the most common registration questions while still giving the committee a direct contact channel.",
    contactLabel: "Contact and support",
    contactValue: "Instagram @funrun.official",
    items: [
      {
        question: "How do I register?",
        answer: "Use the main registration button on this page, fill in the external registration form, and follow the committee instructions after submission.",
      },
      {
        question: "Can I register as a group or community?",
        answer: "Yes. The group or community pricing option is available so teams can register under one clear ticket path.",
      },
      {
        question: "What happens after I submit the form?",
        answer: "The committee will use the submitted details as the primary registration record and continue the next confirmation steps from there.",
      },
      {
        question: "Will event-day details be updated here?",
        answer: "Yes. The timeline, pricing notes, registration copy, and FAQ entries can all be updated from the CMS when plans change.",
      },
    ],
  },
  registration: {
    eyebrow: "Register",
    title: "Keep the final conversion block focused on reassurance, steps, and one clear destination.",
    description:
      "The registration flow stays external in this version, but the destination, helper text, and CTA labels are fully editable from the CMS.",
    helperText:
      "Every public registration CTA on this site points to the same external form so visitors do not end up in competing flows.",
    destinationType: "external",
    href: DEFAULT_REGISTRATION_URL,
    primaryLabel: "Open registration form",
    secondaryLabel: "Review pricing first",
    secondaryHref: "#pricing",
    steps: [
      {
        title: "Open the registration form",
        description: "Use the main CTA to go directly to the committee-managed registration destination.",
      },
      {
        title: "Complete the requested participant details",
        description: "Keep the data accurate so follow-up and event coordination stay clean.",
      },
      {
        title: "Wait for the next committee instruction",
        description: "Use the published contact channel if you need help after submitting the form.",
      },
    ],
  },
  footer: {
    description:
      "Citraland Fun Run 5K Batam brings together a simple 5K route, community energy, and a cleaner event presentation that feels ready for real participants.",
    contactLabel: "Need help",
    contactValue: "Instagram @funrun.official",
    socialLabel: "Social media",
    copyrightText: "Citraland Fun Run 5K Batam",
    note: "Built for clear visitor communication, better mobile reading, and faster admin updates.",
    socials: [
      { label: "Instagram", url: "https://instagram.com/danelsmile04" },
      { label: "TikTok", url: "https://tiktok.com/@danelsmile" },
    ],
  },
  seo: {
    metaTitle: "Citraland Fun Run 5K Batam | Morning run, music, and community energy",
    metaDescription:
      "Register for Citraland Fun Run 5K Batam and explore the route atmosphere, event flow, ticket options, FAQ, and committee contact details in one polished landing page.",
    ogTitle: "Citraland Fun Run 5K Batam",
    ogDescription: "A clean and premium event page for a 5K city run with music, community energy, and clear registration flow.",
    ogImage: {
      path: DEFAULT_LOGO_URL,
      publicUrl: DEFAULT_LOGO_URL,
      alt: "Citraland Fun Run 5K Batam mark",
    },
  },
};

export function getDefaultLandingPageContent(): LandingPageContent {
  return structuredClone(DEFAULT_CONTENT);
}
