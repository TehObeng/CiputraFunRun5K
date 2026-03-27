import type { MetadataRoute } from "next";

import { locales } from "@/lib/locale";
import { getPageHref, type PageKey } from "@/lib/public-site-content";
import { getSiteUrl } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = getSiteUrl();
  const pages: PageKey[] = ["home", "event", "sponsorship"];

  return locales.flatMap((locale) =>
    pages.map((page) => ({
      url: `${url}${getPageHref(locale, page)}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: page === "home" ? 1 : 0.8,
    })),
  );
}
