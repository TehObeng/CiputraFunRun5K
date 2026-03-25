import { ChevronDown, MessageCircleMore } from "lucide-react";

import { SectionHeading } from "@/components/site/section-heading";
import type { FaqItem } from "@/lib/site-schema";

type FaqSectionProps = {
  faq: FaqItem[];
  contactLabel: string;
  contactValue: string;
};

export function FaqSection({ faq, contactLabel, contactValue }: FaqSectionProps) {
  return (
    <section id="faq" className="section-anchor py-20 md:py-24">
      <div className="section-shell grid gap-8 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <div className="rounded-[32px] bg-brand-ink p-7 text-white shadow-[0_24px_64px_rgba(11,16,32,0.22)]">
            <SectionHeading
              eyebrow="FAQ"
              title="Jawaban singkat untuk pertanyaan yang paling sering muncul."
              description="Kalau masih butuh informasi tambahan, kamu bisa arahkan calon peserta ke kontak yang tercantum di bawah."
              inverted
            />

            <div className="mt-8 rounded-[24px] border border-white/10 bg-white/6 p-5">
              <div className="flex items-center gap-3">
                <MessageCircleMore className="size-5 text-brand-lime" />
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/58">{contactLabel}</p>
              </div>
              <p className="mt-4 text-lg font-semibold text-white">{contactValue}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {faq.map((item, index) => (
            <details
              key={`${item.question}-${index}`}
              className="group surface-outline rounded-[28px] bg-white p-5 md:p-6"
              open={index === 0}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                <span className="text-lg font-semibold text-brand-ink">{item.question}</span>
                <span className="rounded-full border border-brand-ink/10 p-2 text-brand-coral transition group-open:rotate-180">
                  <ChevronDown className="size-4" />
                </span>
              </summary>
              <p className="mt-4 pr-8 text-sm leading-7 text-brand-stone">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
