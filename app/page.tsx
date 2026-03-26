import type { Metadata } from "next";

import { LandingPage } from "@/components/site/landing-page";
import { getLandingPageContent, getRegistrationDestination } from "@/lib/site-content";
import { getSiteUrl, toAbsoluteUrl } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getLandingPageContent();
  const ogImage = content.seo.ogImage.publicUrl ? toAbsoluteUrl(content.seo.ogImage.publicUrl) : `${getSiteUrl()}/opengraph-image`;

  return {
    title: content.seo.metaTitle,
    description: content.seo.metaDescription,
    alternates: {
      canonical: getSiteUrl(),
    },
    openGraph: {
      title: content.seo.ogTitle,
      description: content.seo.ogDescription,
      url: getSiteUrl(),
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: content.seo.ogImage.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: content.seo.ogTitle,
      description: content.seo.ogDescription,
      images: [ogImage],
    },
  };
}

export default async function Home() {
  const content = await getLandingPageContent();
  const registrationUrl = getRegistrationDestination(content);

  return <LandingPage content={content} registrationUrl={registrationUrl} />;
}
