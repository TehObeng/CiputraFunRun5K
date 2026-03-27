import type { Metadata } from "next";

import type { Locale } from "@/lib/locale";
import { getPageHref, getSiteCopy, type PageKey } from "@/lib/public-site-content";
import { getPublicRuntime } from "@/lib/public-runtime";
import { getSiteUrl, toAbsoluteUrl } from "@/lib/utils";

export async function buildPageMetadata(locale: Locale, page: PageKey): Promise<Metadata> {
  const copy = getSiteCopy(locale);
  const runtime = await getPublicRuntime();
  const pageCopy = copy[page];
  const siteUrl = getSiteUrl();
  const canonical = `${siteUrl}${getPageHref(locale, page)}`;
  const ogImage = runtime.logo.publicUrl ? toAbsoluteUrl(runtime.logo.publicUrl) : `${siteUrl}/opengraph-image`;

  return {
    title: pageCopy.meta.title,
    description: pageCopy.meta.description,
    alternates: {
      canonical,
      languages: {
        id: `${siteUrl}${getPageHref("id", page)}`,
        en: `${siteUrl}${getPageHref("en", page)}`,
      },
    },
    openGraph: {
      title: pageCopy.meta.title,
      description: pageCopy.meta.description,
      url: canonical,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: runtime.logo.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageCopy.meta.title,
      description: pageCopy.meta.description,
      images: [ogImage],
    },
  };
}
