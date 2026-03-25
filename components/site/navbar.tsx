import { Ticket } from "lucide-react";

import { SiteButton } from "@/components/site/site-button";

const navItems = [
  { href: "#tentang", label: "Tentang" },
  { href: "#aktivitas", label: "Aktivitas" },
  { href: "#harga", label: "Harga" },
  { href: "#cara-daftar", label: "Cara Daftar" },
  { href: "#faq", label: "FAQ" },
];

type NavbarProps = {
  eventName: string;
  ctaText: string;
  registrationUrl: string;
};

export function Navbar({ eventName, ctaText, registrationUrl }: NavbarProps) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-2 pt-3 md:px-4">
      <div className="mx-auto w-full max-w-6xl rounded-[28px] border border-white/12 bg-brand-ink/78 text-white shadow-[0_20px_50px_rgba(8,12,24,0.35)] backdrop-blur-xl">
        <div className="flex items-center justify-between gap-4 px-4 py-3 md:px-6">
          <a href="#beranda" className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-full bg-white/10">
              <div className="grid gap-1">
                <span className="h-1.5 w-5 rounded-full bg-brand-lime" />
                <span className="h-1.5 w-7 rounded-full bg-brand-orange" />
                <span className="h-1.5 w-4 rounded-full bg-brand-coral" />
              </div>
            </div>
            <div>
              <p className="font-display text-lg font-bold tracking-tight">{eventName}</p>
              <p className="text-xs uppercase tracking-[0.22em] text-white/56">Festival Run Experience</p>
            </div>
          </a>

          <nav className="hidden items-center gap-6 text-sm font-medium text-white/74 lg:flex">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="transition hover:text-white">
                {item.label}
              </a>
            ))}
          </nav>

          <SiteButton
            href={registrationUrl}
            external
            className="hidden md:inline-flex"
          >
            {ctaText}
          </SiteButton>

          <a
            href="#harga"
            className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-4 py-2 text-sm font-semibold text-white md:hidden"
          >
            <Ticket className="size-4" />
            Lihat Harga
          </a>
        </div>

        <nav className="flex gap-2 overflow-x-auto border-t border-white/10 px-3 py-3 text-sm text-white/74 lg:hidden">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="shrink-0 rounded-full border border-white/10 bg-white/6 px-3 py-2 transition hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

