import type { SocialLink } from "@/lib/site-schema";

type FooterProps = {
  eventName: string;
  footerText: string;
  contactLabel: string;
  contactValue: string;
  socials: SocialLink[];
};

export function Footer({
  eventName,
  footerText,
  contactLabel,
  contactValue,
  socials,
}: FooterProps) {
  return (
    <footer className="border-t border-brand-ink/8 bg-white/72 py-10">
      <div className="section-shell flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <div className="max-w-xl">
          <p className="font-display text-2xl font-bold text-brand-ink">{eventName}</p>
          <p className="mt-3 text-sm leading-7 text-brand-stone">{footerText}</p>
          <p className="mt-4 text-sm font-semibold text-brand-ink">
            {contactLabel}: <span className="font-normal text-brand-stone">{contactValue}</span>
          </p>
        </div>

        <div className="flex flex-col gap-4 text-sm">
          <p className="font-semibold uppercase tracking-[0.22em] text-brand-stone">Social media</p>
          <div className="flex flex-wrap gap-3">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-brand-ink/10 bg-brand-cream px-4 py-2 font-medium text-brand-ink transition hover:-translate-y-0.5 hover:border-brand-coral/40"
              >
                {social.label}
              </a>
            ))}
          </div>
          <p className="text-brand-stone">© {new Date().getFullYear()} {eventName}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
