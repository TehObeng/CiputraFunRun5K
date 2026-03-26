"use client";

import { ArrowUpRight } from "lucide-react";

import type { LandingPageContent } from "@/lib/site-schema";

type FooterProps = {
  brand: LandingPageContent["brand"];
  footer: LandingPageContent["footer"];
};

export function Footer({ brand, footer }: FooterProps) {
  return (
    <footer className="border-t border-brand-line bg-brand-paper">
      <div className="mx-auto grid w-[min(1200px,calc(100%-1.5rem))] gap-10 py-10 md:grid-cols-[minmax(0,1.2fr)_minmax(260px,0.8fr)] md:py-14">
        <div className="space-y-5">
          <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-3xl border border-brand-line bg-white p-2 shadow-[0_14px_28px_rgba(11,22,40,0.06)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={brand.logo.publicUrl} alt={brand.logo.alt} className="h-full w-full object-contain" />
          </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-orange">{brand.eyebrow}</p>
              <p className="mt-2 text-2xl font-bold text-brand-night">{brand.name}</p>
            </div>
          </div>

          <p className="max-w-2xl text-base leading-8 text-brand-muted">{footer.description}</p>
          <p className="text-sm leading-7 text-brand-muted">{footer.note}</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-3 md:grid-cols-1">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-muted">{footer.contactLabel}</p>
            <p className="mt-3 text-lg font-semibold text-brand-night">{footer.contactValue}</p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-muted">{footer.socialLabel}</p>
            <div className="mt-3 space-y-2">
              {footer.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-lg font-semibold text-brand-night transition hover:text-brand-orange"
                >
                  <span>{social.label}</span>
                  <ArrowUpRight className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-muted">Copyright</p>
            <p className="mt-3 text-lg font-semibold text-brand-night">{footer.copyrightText}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
