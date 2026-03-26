"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";

import { SiteButton } from "@/components/site/site-button";
import type { ImageAsset, NavItem } from "@/lib/site-schema";
import { cn } from "@/lib/utils";

type NavbarProps = {
  brandName: string;
  brandEyebrow: string;
  logo: ImageAsset;
  navItems: NavItem[];
  ctaLabel: string;
  ctaHref: string;
};

export function Navbar({ brandName, brandEyebrow, logo, navItems, ctaLabel, ctaHref }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <div className="mx-auto flex w-[min(1200px,calc(100%-1.5rem))] items-center justify-between gap-4 py-5 md:py-6">
        <a
          href="#beranda"
          className="inline-flex min-w-0 items-center gap-3 rounded-full border border-white/12 bg-white/10 px-3 py-2 text-white backdrop-blur"
        >
          <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-white p-1.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logo.publicUrl} alt={logo.alt} className="h-full w-full object-contain" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-[10px] font-semibold uppercase tracking-[0.26em] text-brand-lime">{brandEyebrow}</p>
            <p className="truncate text-sm font-semibold">{brandName}</p>
          </div>
        </a>

        <nav className="hidden items-center gap-2 rounded-full border border-white/12 bg-white/10 px-3 py-2 text-sm text-white backdrop-blur lg:flex">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="rounded-full px-4 py-2 font-medium transition hover:bg-white/10">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <SiteButton href={ctaHref} external variant="secondary">
            {ctaLabel}
          </SiteButton>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((current) => !current)}
          className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/12 bg-white/10 text-white backdrop-blur lg:hidden"
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <div
        className={cn(
          "mx-auto w-[min(1200px,calc(100%-1.5rem))] overflow-hidden rounded-[28px] border border-white/10 bg-brand-night/95 text-white shadow-[0_24px_80px_rgba(7,11,24,0.32)] backdrop-blur transition-all duration-300 lg:hidden",
          isOpen ? "max-h-[420px] opacity-100" : "pointer-events-none max-h-0 opacity-0",
        )}
      >
        <div className="space-y-2 p-4">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="block rounded-2xl border border-white/8 px-4 py-3 text-sm font-semibold transition hover:bg-white/8"
            >
              {item.label}
            </a>
          ))}
          <SiteButton href={ctaHref} external className="mt-2 w-full justify-center">
            {ctaLabel}
          </SiteButton>
        </div>
      </div>
    </header>
  );
}
