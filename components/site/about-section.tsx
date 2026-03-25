import { Activity, Ticket, TimerReset } from "lucide-react";

import { SectionHeading } from "@/components/site/section-heading";
import type { SiteContent } from "@/lib/site-schema";

type AboutSectionProps = {
  content: SiteContent;
};

const icons = [Activity, Ticket, TimerReset] as const;

export function AboutSection({ content }: AboutSectionProps) {
  const points = [
    {
      label: "Aktivitas utama",
      value: `${content.activities.length} pengalaman`,
      note: "Lari, DJ, treasure hunt, dan undian doorprize.",
    },
    {
      label: "Pilihan tiket",
      value: `${content.pricing.length} kategori`,
      note: "Dirancang agar mudah masuk untuk solo runner atau komunitas.",
    },
    {
      label: "Alur daftar",
      value: `${content.registrationSteps.length} langkah`,
      note: "Cukup klik CTA, isi Google Form, lalu lanjutkan proses registrasi.",
    },
  ];

  return (
    <section id="tentang" className="section-anchor py-20 md:py-24">
      <div className="section-shell grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
        <SectionHeading
          eyebrow="Tentang acara"
          title={content.aboutTitle}
          description={content.aboutDescription}
        />

        <div className="grid gap-4 md:grid-cols-3">
          {points.map((point, index) => {
            const Icon = icons[index];

            return (
              <article
                key={point.label}
                className="surface-outline rounded-[28px] bg-white/82 p-5 md:p-6"
              >
                <Icon className="size-6 text-brand-coral" />
                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.22em] text-brand-stone">
                  {point.label}
                </p>
                <p className="mt-2 text-2xl font-bold text-brand-ink">{point.value}</p>
                <p className="mt-3 text-sm leading-6 text-brand-stone">{point.note}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
