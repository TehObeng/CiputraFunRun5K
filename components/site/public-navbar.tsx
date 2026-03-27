"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { SiteButton } from "@/components/site/site-button";
import { getAlternateLocale, type Locale } from "@/lib/locale";
import { getPageHref } from "@/lib/public-site-content";
import type { ImageAsset } from "@/lib/site-schema";
import { cn } from "@/lib/utils";

type PublicNavbarProps = {
  locale: Locale;
  brandEyebrow: string;
  brandName: string;
  logo: ImageAsset;
  registerHref: string;
  labels: {
    home: string;
    event: string;
    sponsorship: string;
    register: string;
    localeLabel: string;
  };
};

function normalizePathname(pathname: string | null) {
  if (!pathname || pathname === "/") {
    return "";
  }

  return pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
}

export function PublicNavbar({ locale, brandEyebrow, brandName, logo, registerHref, labels }: PublicNavbarProps) {
  const pathname = normalizePathname(usePathname());
  const [isOpen, setIsOpen] = useState(false);
  const alternateLocale = getAlternateLocale(locale);
  const navItems = [
    { label: labels.home, href: getPageHref(locale, "home") },
    { label: labels.event, href: getPageHref(locale, "event") },
    { label: labels.sponsorship, href: getPageHref(locale, "sponsorship") },
  ];

  const switchHref = pathname
    ? pathname.replace(/^\/(id|en)(?=\/|$)/, `/${alternateLocale}`)
    : getPageHref(alternateLocale, "home");

  return (
    <header className="sticky top-0 z-50 border-b border-brand-line/70 bg-brand-surface/86 backdrop-blur-xl">
      <div className="mx-auto flex w-[min(1200px,calc(100%-1.5rem))] items-center justify-between gap-4 py-4">
        <Link href={getPageHref(locale, "home")} className="inline-flex min-w-0 items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border border-brand-line bg-white p-1.5 shadow-[0_14px_26px_rgba(11,22,40,0.06)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logo.publicUrl} alt={logo.alt} className="h-full w-full object-contain" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-[10px] font-semibold uppercase tracking-[0.26em] text-brand-orange">{brandEyebrow}</p>
            <p className="truncate text-sm font-semibold text-brand-night md:text-base">{brandName}</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 rounded-full border border-brand-line bg-white/72 px-2 py-2 text-sm text-brand-night shadow-[0_16px_34px_rgba(11,22,40,0.06)] lg:flex">
          {navItems.map((item) => {
            const active = item.href === getPageHref(locale, "home") ? pathname === item.href : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-4 py-2 font-semibold transition",
                  active ? "bg-brand-night text-white" : "hover:bg-brand-wash",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <div className="rounded-full border border-brand-line bg-white/72 px-2 py-2 shadow-[0_16px_34px_rgba(11,22,40,0.06)]">
            <div className="flex items-center gap-1">
              <span className="px-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-brand-muted">{labels.localeLabel}</span>
              <span
                className={cn(
                  "rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em]",
                  locale === "id" ? "bg-brand-night text-white" : "text-brand-muted",
                )}
              >
                ID
              </span>
              <Link
                href={switchHref}
                className={cn(
                  "rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] transition",
                  locale === "en" ? "bg-brand-night text-white" : "text-brand-muted hover:bg-brand-wash hover:text-brand-night",
                )}
              >
                EN
              </Link>
            </div>
          </div>

          <SiteButton href={registerHref} external className="shadow-[0_16px_34px_rgba(255,154,31,0.24)]">
            {labels.register}
          </SiteButton>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((current) => !current)}
          className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-brand-line bg-white text-brand-night shadow-[0_14px_26px_rgba(11,22,40,0.06)] lg:hidden"
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <div
        className={cn(
          "mx-auto w-[min(1200px,calc(100%-1.5rem))] overflow-hidden rounded-[28px] border border-brand-line bg-white shadow-[0_18px_42px_rgba(11,22,40,0.08)] transition-all duration-300 lg:hidden",
          isOpen ? "mb-4 max-h-[420px] opacity-100" : "pointer-events-none max-h-0 opacity-0",
        )}
      >
        <div className="space-y-3 p-4">
          {navItems.map((item) => {
            const active = item.href === getPageHref(locale, "home") ? pathname === item.href : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "block rounded-2xl border px-4 py-3 text-sm font-semibold transition",
                  active ? "border-brand-night bg-brand-night text-white" : "border-brand-line hover:bg-brand-wash",
                )}
              >
                {item.label}
              </Link>
            );
          })}

          <div className="flex items-center justify-between rounded-2xl border border-brand-line bg-brand-paper px-4 py-3">
            <span className="text-sm font-semibold text-brand-night">{labels.localeLabel}</span>
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em]",
                  locale === "id" ? "bg-brand-night text-white" : "border border-brand-line text-brand-muted",
                )}
              >
                ID
              </span>
              <Link
                href={switchHref}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] transition",
                  locale === "en" ? "bg-brand-night text-white" : "border border-brand-line text-brand-muted hover:bg-brand-wash hover:text-brand-night",
                )}
              >
                EN
              </Link>
            </div>
          </div>

          <SiteButton href={registerHref} external className="mt-1 w-full justify-center">
            {labels.register}
          </SiteButton>
        </div>
      </div>
    </header>
  );
}
