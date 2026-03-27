import { ArrowUpRight } from "lucide-react";

import type { SiteCopy } from "@/lib/public-site-content";
import type { ImageAsset, SocialLink } from "@/lib/site-schema";

type PublicFooterProps = {
  copy: SiteCopy["footer"];
  logo: ImageAsset;
  brandName: string;
  brandStrapline: string;
  contactValue: string;
  socials: SocialLink[];
};

export function PublicFooter({ copy, logo, brandName, brandStrapline, contactValue, socials }: PublicFooterProps) {
  return (
    <footer className="section-divider bg-brand-paper">
      <div className="page-shell grid gap-10 py-10 md:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)] md:py-14">
        <div className="space-y-5">
          <div className="flex items-start gap-4">
            <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-3xl border border-brand-line bg-white p-2 shadow-[0_12px_26px_rgba(11,22,40,0.06)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={logo.publicUrl} alt={logo.alt} className="h-full w-full object-contain" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-orange">{brandStrapline}</p>
              <p className="mt-2 text-2xl font-bold text-brand-night">{brandName}</p>
            </div>
          </div>

          <p className="max-w-2xl text-base leading-8 text-brand-muted">{copy.description}</p>
          <p className="max-w-2xl text-sm leading-7 text-brand-muted">{copy.note}</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-3 md:grid-cols-1">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-muted">{copy.contactLabel}</p>
            <p className="mt-3 text-lg font-semibold text-brand-night">{contactValue}</p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-muted">{copy.socialLabel}</p>
            <div className="mt-3 space-y-2">
              {socials.map((social) => (
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
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-muted">{copy.rightsLabel}</p>
            <p className="mt-3 text-lg font-semibold text-brand-night">{brandName}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
