import { notFound } from "next/navigation";

import { PublicFooter } from "@/components/site/public-footer";
import { PublicNavbar } from "@/components/site/public-navbar";
import { locales, isLocale } from "@/lib/locale";
import { getPublicRuntime } from "@/lib/public-runtime";
import { getSiteCopy } from "@/lib/public-site-content";

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale: rawLocale } = await params;

  if (!isLocale(rawLocale)) {
    notFound();
  }

  const locale = rawLocale;
  const copy = getSiteCopy(locale);
  const runtime = await getPublicRuntime();

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-brand-surface text-brand-night">
      <PublicNavbar
        locale={locale}
        brandEyebrow={copy.brand.eyebrow}
        brandName={copy.brand.name}
        logo={runtime.logo}
        registerHref={runtime.registrationUrl}
        labels={copy.navigation}
      />
      {children}
      <PublicFooter
        copy={copy.footer}
        logo={runtime.logo}
        brandName={copy.brand.name}
        brandStrapline={copy.brand.strapline}
        contactValue={runtime.contactValue}
        socials={runtime.socials}
      />
    </div>
  );
}
