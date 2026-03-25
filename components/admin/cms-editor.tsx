"use client";

import { Globe2, LogOut, Plus, RefreshCcw, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { InputField, ItemActions, SectionCard, TextAreaField } from "@/components/admin/form-fields";
import type {
  ActivityItem,
  FaqItem,
  PricingItem,
  RegistrationStep,
  SiteContent,
  SocialLink,
} from "@/lib/site-schema";

type CmsEditorProps = {
  initialContent: SiteContent;
};

type FeedbackState = {
  type: "success" | "error";
  message: string;
} | null;

export function CmsEditor({ initialContent }: CmsEditorProps) {
  const router = useRouter();
  const [content, setContent] = useState(initialContent);
  const [savedSnapshot, setSavedSnapshot] = useState(initialContent);
  const [feedback, setFeedback] = useState<FeedbackState>(null);
  const [isSaving, startSaving] = useTransition();
  const [isLoggingOut, startLoggingOut] = useTransition();

  function updateField<Key extends keyof SiteContent>(key: Key, value: SiteContent[Key]) {
    setContent((current) => ({ ...current, [key]: value }));
  }

  function updateActivity(index: number, key: keyof ActivityItem, value: string) {
    setContent((current) => ({
      ...current,
      activities: current.activities.map((item, itemIndex) =>
        itemIndex === index ? { ...item, [key]: value } : item,
      ),
    }));
  }

  function updatePricing(index: number, key: keyof PricingItem, value: string | boolean) {
    setContent((current) => ({
      ...current,
      pricing: current.pricing.map((item, itemIndex) =>
        itemIndex === index
          ? {
              ...item,
              [key]:
                key === "price"
                  ? Number(value) || 0
                  : key === "featured"
                    ? Boolean(value)
                    : value,
            }
          : item,
      ),
    }));
  }

  function updateStep(index: number, key: keyof RegistrationStep, value: string) {
    setContent((current) => ({
      ...current,
      registrationSteps: current.registrationSteps.map((item, itemIndex) =>
        itemIndex === index ? { ...item, [key]: value } : item,
      ),
    }));
  }

  function updateFaq(index: number, key: keyof FaqItem, value: string) {
    setContent((current) => ({
      ...current,
      faq: current.faq.map((item, itemIndex) =>
        itemIndex === index ? { ...item, [key]: value } : item,
      ),
    }));
  }

  function updateSocial(index: number, key: keyof SocialLink, value: string) {
    setContent((current) => ({
      ...current,
      socials: current.socials.map((item, itemIndex) =>
        itemIndex === index ? { ...item, [key]: value } : item,
      ),
    }));
  }

  function addActivity() {
    setContent((current) => ({
      ...current,
      activities: [...current.activities, { title: "Aktivitas baru", description: "Deskripsi aktivitas baru." }],
    }));
  }

  function addPricing() {
    setContent((current) => ({
      ...current,
      pricing: [
        ...current.pricing,
        { name: "Harga baru", price: 0, description: "Deskripsi tiket baru.", featured: false },
      ],
    }));
  }

  function addStep() {
    setContent((current) => ({
      ...current,
      registrationSteps: [
        ...current.registrationSteps,
        { title: "Langkah baru", description: "Deskripsikan langkah pendaftaran." },
      ],
    }));
  }

  function addFaq() {
    setContent((current) => ({
      ...current,
      faq: [...current.faq, { question: "Pertanyaan baru", answer: "Jawaban baru." }],
    }));
  }

  function addSocial() {
    setContent((current) => ({
      ...current,
      socials: [...current.socials, { label: "Social baru", url: "https://example.com" }],
    }));
  }

  function removeAt<T>(items: T[], index: number) {
    return items.filter((_, itemIndex) => itemIndex !== index);
  }

  function removeArrayItem(
    key: "activities" | "pricing" | "registrationSteps" | "faq" | "socials",
    index: number,
  ) {
    setContent((current) => {
      switch (key) {
        case "activities":
          return { ...current, activities: removeAt(current.activities, index) };
        case "pricing":
          return { ...current, pricing: removeAt(current.pricing, index) };
        case "registrationSteps":
          return { ...current, registrationSteps: removeAt(current.registrationSteps, index) };
        case "faq":
          return { ...current, faq: removeAt(current.faq, index) };
        case "socials":
          return { ...current, socials: removeAt(current.socials, index) };
      }
    });
  }

  function handleReset() {
    setContent(savedSnapshot);
    setFeedback(null);
  }

  function handleSave() {
    setFeedback(null);

    startSaving(async () => {
      const response = await fetch("/api/admin/content", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(content),
      });

      const payload = (await response.json().catch(() => null)) as
        | {
            data?: SiteContent;
            message?: string;
          }
        | null;

      if (!response.ok || !payload?.data) {
        setFeedback({
          type: "error",
          message: payload?.message ?? "Gagal menyimpan konten. Periksa kembali input yang diisi.",
        });
        return;
      }

      setContent(payload.data);
      setSavedSnapshot(payload.data);
      setFeedback({
        type: "success",
        message: payload.message ?? "Konten berhasil disimpan.",
      });
      router.refresh();
    });
  }

  function handleLogout() {
    startLoggingOut(async () => {
      await fetch("/api/admin/logout", { method: "POST" });
      router.refresh();
    });
  }

  return (
    <div className="min-h-screen bg-brand-sand px-4 py-6 md:px-6 md:py-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="rounded-[36px] bg-brand-ink px-6 py-6 text-white shadow-[0_24px_80px_rgba(11,16,32,0.18)] md:px-8 md:py-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-lime">CMS Dashboard</p>
              <h1 className="mt-3 text-3xl font-bold leading-tight md:text-5xl">
                Edit landing page Fun Run dari satu panel yang ringkas.
              </h1>
              <p className="mt-4 text-base leading-7 text-white/74 md:text-lg">
                Semua perubahan disimpan ke file JSON dan langsung dipakai oleh halaman publik. Cocok untuk update cepat
                tanpa menyentuh source code.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/14"
              >
                <Globe2 className="size-4" />
                Buka landing page
              </a>
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/14"
              >
                <RefreshCcw className="size-4" />
                Reset draft
              </button>
              <button
                type="button"
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/14 disabled:opacity-60"
              >
                <LogOut className="size-4" />
                {isLoggingOut ? "Keluar..." : "Logout"}
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={isSaving}
                className="inline-flex items-center gap-2 rounded-full bg-brand-coral px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-orange disabled:opacity-60"
              >
                <Save className="size-4" />
                {isSaving ? "Menyimpan..." : "Simpan perubahan"}
              </button>
            </div>
          </div>
        </header>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-[28px] bg-white p-5 shadow-[0_16px_40px_rgba(11,16,32,0.06)]">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-stone">Event</p>
            <p className="mt-3 text-2xl font-bold text-brand-ink">{content.eventName}</p>
          </div>
          <div className="rounded-[28px] bg-white p-5 shadow-[0_16px_40px_rgba(11,16,32,0.06)]">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-stone">CTA utama</p>
            <p className="mt-3 text-lg font-semibold text-brand-ink">{content.heroCtaText}</p>
          </div>
          <div className="rounded-[28px] bg-white p-5 shadow-[0_16px_40px_rgba(11,16,32,0.06)]">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-stone">Google Form</p>
            <p className="mt-3 truncate text-sm font-medium text-brand-ink">{content.googleFormUrl}</p>
          </div>
        </div>

        {feedback ? (
          <div
            className={`rounded-[24px] px-5 py-4 text-sm font-medium ${
              feedback.type === "success"
                ? "border border-emerald-200 bg-emerald-50 text-emerald-700"
                : "border border-red-200 bg-red-50 text-red-700"
            }`}
          >
            {feedback.message}
          </div>
        ) : null}

        <div className="grid gap-6">
          <SectionCard
            title="General"
            description="Atur identitas event, badge hero, CTA global, dan link Google Form utama."
          >
            <div className="grid gap-5 md:grid-cols-2">
              <InputField label="Nama event" value={content.eventName} onChange={(value) => updateField("eventName", value)} />
              <InputField
                label="Badge / banner"
                value={content.badgeText}
                onChange={(value) => updateField("badgeText", value)}
                helper="Contoh: Slot terbatas - Harga normal 4-22 Mei 2026"
              />
              <InputField label="CTA utama" value={content.heroCtaText} onChange={(value) => updateField("heroCtaText", value)} />
              <InputField
                label="CTA sekunder"
                value={content.heroSecondaryCtaText}
                onChange={(value) => updateField("heroSecondaryCtaText", value)}
              />
              <InputField
                label="Google Form URL"
                value={content.googleFormUrl}
                onChange={(value) => updateField("googleFormUrl", value)}
                type="url"
                helper="Semua tombol daftar akan mengarah ke link ini."
              />
              <InputField
                label="Periode harga normal"
                value={content.normalPricePeriod}
                onChange={(value) => updateField("normalPricePeriod", value)}
              />
            </div>
          </SectionCard>

          <SectionCard
            title="Hero & About"
            description="Kontrol copy utama yang pertama kali dilihat pengunjung dan narasi singkat tentang event."
          >
            <div className="grid gap-5 md:grid-cols-2">
              <TextAreaField label="Headline hero" value={content.heroHeadline} onChange={(value) => updateField("heroHeadline", value)} rows={4} />
              <TextAreaField label="Subheadline hero" value={content.heroSubheadline} onChange={(value) => updateField("heroSubheadline", value)} rows={5} />
              <TextAreaField label="Judul section tentang" value={content.aboutTitle} onChange={(value) => updateField("aboutTitle", value)} rows={3} />
              <TextAreaField label="Deskripsi section tentang" value={content.aboutDescription} onChange={(value) => updateField("aboutDescription", value)} rows={5} />
            </div>
          </SectionCard>

          <SectionCard
            title="Aktivitas acara"
            description="Ubah urutan, judul, dan deskripsi aktivitas. Urutan item juga menentukan urutan tampil di landing page."
          >
            <div className="space-y-5">
              {content.activities.map((activity, index) => (
                <div key={`${activity.title}-${index}`} className="rounded-[26px] bg-brand-cream p-5">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-stone">
                      Aktivitas {String(index + 1).padStart(2, "0")}
                    </p>
                    <ItemActions onRemove={() => removeArrayItem("activities", index)} disabled={content.activities.length <= 1} />
                  </div>
                  <div className="mt-4 grid gap-5 md:grid-cols-2">
                    <InputField label="Judul aktivitas" value={activity.title} onChange={(value) => updateActivity(index, "title", value)} />
                    <TextAreaField label="Deskripsi aktivitas" value={activity.description} onChange={(value) => updateActivity(index, "description", value)} rows={4} />
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={addActivity}
                className="inline-flex items-center gap-2 rounded-full border border-brand-ink/10 px-4 py-3 text-sm font-semibold text-brand-ink transition hover:border-brand-coral/30 hover:bg-brand-peach/30"
              >
                <Plus className="size-4" />
                Tambah aktivitas
              </button>
            </div>
          </SectionCard>

          <SectionCard
            title="Harga tiket"
            description="Kelola nama paket, nominal harga, deskripsi, dan paket yang ingin diberi penekanan visual."
          >
            <div className="space-y-5">
              {content.pricing.map((pricingItem, index) => (
                <div key={`${pricingItem.name}-${index}`} className="rounded-[26px] bg-brand-cream p-5">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-stone">
                      Tiket {String(index + 1).padStart(2, "0")}
                    </p>
                    <ItemActions onRemove={() => removeArrayItem("pricing", index)} disabled={content.pricing.length <= 1} />
                  </div>
                  <div className="mt-4 grid gap-5 md:grid-cols-2">
                    <InputField label="Nama tiket" value={pricingItem.name} onChange={(value) => updatePricing(index, "name", value)} />
                    <InputField label="Harga tiket" value={pricingItem.price} onChange={(value) => updatePricing(index, "price", value)} type="number" />
                    <TextAreaField label="Deskripsi tiket" value={pricingItem.description} onChange={(value) => updatePricing(index, "description", value)} rows={4} />
                    <label className="flex items-center gap-3 rounded-2xl border border-brand-ink/10 bg-white px-4 py-3 text-sm text-brand-ink">
                      <input
                        type="checkbox"
                        checked={pricingItem.featured}
                        onChange={(event) => updatePricing(index, "featured", event.target.checked)}
                        className="size-4 rounded border-brand-ink/20"
                      />
                      Tandai sebagai paket unggulan
                    </label>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={addPricing}
                className="inline-flex items-center gap-2 rounded-full border border-brand-ink/10 px-4 py-3 text-sm font-semibold text-brand-ink transition hover:border-brand-coral/30 hover:bg-brand-peach/30"
              >
                <Plus className="size-4" />
                Tambah paket harga
              </button>
            </div>
          </SectionCard>

          <SectionCard
            title="Cara pendaftaran"
            description="Atur tiga langkah singkat yang akan menjelaskan alur daftar di section konversi."
          >
            <div className="space-y-5">
              {content.registrationSteps.map((step, index) => (
                <div key={`${step.title}-${index}`} className="rounded-[26px] bg-brand-cream p-5">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-stone">
                      Langkah {String(index + 1).padStart(2, "0")}
                    </p>
                    <ItemActions onRemove={() => removeArrayItem("registrationSteps", index)} disabled={content.registrationSteps.length <= 1} />
                  </div>
                  <div className="mt-4 grid gap-5 md:grid-cols-2">
                    <InputField label="Judul langkah" value={step.title} onChange={(value) => updateStep(index, "title", value)} />
                    <TextAreaField label="Deskripsi langkah" value={step.description} onChange={(value) => updateStep(index, "description", value)} rows={4} />
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={addStep}
                className="inline-flex items-center gap-2 rounded-full border border-brand-ink/10 px-4 py-3 text-sm font-semibold text-brand-ink transition hover:border-brand-coral/30 hover:bg-brand-peach/30"
              >
                <Plus className="size-4" />
                Tambah langkah
              </button>
            </div>
          </SectionCard>

          <SectionCard
            title="FAQ"
            description="Perbarui pertanyaan umum agar calon peserta tidak ragu saat hendak mendaftar."
          >
            <div className="space-y-5">
              {content.faq.map((faqItem, index) => (
                <div key={`${faqItem.question}-${index}`} className="rounded-[26px] bg-brand-cream p-5">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-stone">
                      FAQ {String(index + 1).padStart(2, "0")}
                    </p>
                    <ItemActions onRemove={() => removeArrayItem("faq", index)} disabled={content.faq.length <= 1} />
                  </div>
                  <div className="mt-4 space-y-5">
                    <TextAreaField label="Pertanyaan" value={faqItem.question} onChange={(value) => updateFaq(index, "question", value)} rows={3} />
                    <TextAreaField label="Jawaban" value={faqItem.answer} onChange={(value) => updateFaq(index, "answer", value)} rows={5} />
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={addFaq}
                className="inline-flex items-center gap-2 rounded-full border border-brand-ink/10 px-4 py-3 text-sm font-semibold text-brand-ink transition hover:border-brand-coral/30 hover:bg-brand-peach/30"
              >
                <Plus className="size-4" />
                Tambah FAQ
              </button>
            </div>
          </SectionCard>

          <SectionCard
            title="Closing CTA & Footer"
            description="Edit ajakan penutup, informasi kontak, footer copy, dan tautan sosial."
          >
            <div className="grid gap-5 md:grid-cols-2">
              <TextAreaField label="Judul CTA penutup" value={content.closingHeadline} onChange={(value) => updateField("closingHeadline", value)} rows={4} />
              <TextAreaField label="Deskripsi CTA penutup" value={content.closingDescription} onChange={(value) => updateField("closingDescription", value)} rows={5} />
              <InputField label="Teks tombol CTA penutup" value={content.closingCtaText} onChange={(value) => updateField("closingCtaText", value)} />
              <InputField label="Label kontak" value={content.contactLabel} onChange={(value) => updateField("contactLabel", value)} />
              <InputField label="Nilai kontak" value={content.contactValue} onChange={(value) => updateField("contactValue", value)} />
              <TextAreaField label="Teks footer" value={content.footerText} onChange={(value) => updateField("footerText", value)} rows={5} />
            </div>

            <div className="space-y-5">
              {content.socials.map((social, index) => (
                <div key={`${social.label}-${index}`} className="rounded-[26px] bg-brand-cream p-5">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-stone">
                      Social {String(index + 1).padStart(2, "0")}
                    </p>
                    <ItemActions onRemove={() => removeArrayItem("socials", index)} disabled={content.socials.length <= 1} />
                  </div>
                  <div className="mt-4 grid gap-5 md:grid-cols-2">
                    <InputField label="Label social" value={social.label} onChange={(value) => updateSocial(index, "label", value)} />
                    <InputField label="URL social" value={social.url} onChange={(value) => updateSocial(index, "url", value)} type="url" />
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={addSocial}
                className="inline-flex items-center gap-2 rounded-full border border-brand-ink/10 px-4 py-3 text-sm font-semibold text-brand-ink transition hover:border-brand-coral/30 hover:bg-brand-peach/30"
              >
                <Plus className="size-4" />
                Tambah social link
              </button>
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
