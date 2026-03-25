import { ArrowRightCircle, CheckCircle2, ClipboardPenLine } from "lucide-react";

import { SectionHeading } from "@/components/site/section-heading";
import { SiteButton } from "@/components/site/site-button";
import type { RegistrationStep } from "@/lib/site-schema";

type RegistrationStepsSectionProps = {
  steps: RegistrationStep[];
  registrationUrl: string;
  ctaText: string;
};

const stepIcons = [ArrowRightCircle, ClipboardPenLine, CheckCircle2] as const;

export function RegistrationStepsSection({
  steps,
  registrationUrl,
  ctaText,
}: RegistrationStepsSectionProps) {
  return (
    <section id="cara-daftar" className="section-anchor bg-brand-ink py-20 text-white md:py-24">
      <div className="section-shell space-y-10">
        <SectionHeading
          eyebrow="Cara pendaftaran"
          title="Daftar cepat dalam tiga langkah yang singkat dan jelas."
          description="Alur dibuat simpel supaya calon peserta tidak kehilangan momentum saat ingin langsung mendaftar."
          inverted
        />

        <div className="grid gap-4 lg:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = stepIcons[index] ?? ArrowRightCircle;

            return (
              <article
                key={`${step.title}-${index}`}
                className="rounded-[30px] border border-white/10 bg-white/6 p-6 backdrop-blur"
              >
                <div className="flex items-center justify-between">
                  <Icon className="size-7 text-brand-lime" />
                  <span className="text-sm font-semibold text-white/52">{String(index + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="mt-10 text-2xl font-bold">{step.title}</h3>
                <p className="mt-4 text-sm leading-7 text-white/72">{step.description}</p>
              </article>
            );
          })}
        </div>

        <div className="flex flex-col items-start justify-between gap-4 rounded-[30px] border border-white/10 bg-white/6 p-6 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-lime">Langsung ke formulir</p>
            <p className="mt-2 text-lg text-white/78">
              Semua tombol daftar di landing page ini mengarah ke Google Form yang sama untuk menjaga alur konversi tetap ringkas.
            </p>
          </div>
          <SiteButton href={registrationUrl} external>
            {ctaText}
          </SiteButton>
        </div>
      </div>
    </section>
  );
}
