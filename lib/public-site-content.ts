import type { Locale } from "@/lib/locale";
import { enBrand, enFooter, enNavigation } from "@/lib/public-copy/en-brand";
import { enEvent } from "@/lib/public-copy/en-event";
import { enHome } from "@/lib/public-copy/en-home";
import { enSponsorship } from "@/lib/public-copy/en-sponsorship";
import { idBrand, idFooter, idNavigation } from "@/lib/public-copy/id-brand";
import { idEvent } from "@/lib/public-copy/id-event";
import { idHome } from "@/lib/public-copy/id-home";
import { idSponsorship } from "@/lib/public-copy/id-sponsorship";

export const pageRoutes = {
  home: "",
  event: "/event",
  sponsorship: "/sponsorship",
} as const;

export type PageKey = keyof typeof pageRoutes;

const siteCopy = {
  id: {
    brand: idBrand,
    navigation: idNavigation,
    home: idHome,
    event: idEvent,
    sponsorship: idSponsorship,
    footer: idFooter,
  },
  en: {
    brand: enBrand,
    navigation: enNavigation,
    home: enHome,
    event: enEvent,
    sponsorship: enSponsorship,
    footer: enFooter,
  },
} as const;

export type SiteCopy = (typeof siteCopy)[Locale];

export function getSiteCopy(locale: Locale): SiteCopy {
  return siteCopy[locale];
}

export function getPageHref(locale: Locale, page: PageKey) {
  return `/${locale}${pageRoutes[page]}`;
}

export function formatIdr(locale: Locale, value: number) {
  return new Intl.NumberFormat(locale === "id" ? "id-ID" : "en-US", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}
