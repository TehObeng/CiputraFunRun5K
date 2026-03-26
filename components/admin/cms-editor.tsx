"use client";

import { ExternalLink, Globe2, LogOut, RefreshCcw, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import {
  BrandSection,
  ExperienceSection,
  HeroSection,
  OverviewSection,
  TimelineSection,
} from "@/components/admin/content-sections-primary";
import {
  FaqSection,
  FooterSection,
  PricingSection,
  RegistrationSection,
  SeoSection,
} from "@/components/admin/content-sections-secondary";
import type { Path, PathSegment } from "@/components/admin/editor-types";
import type { LandingPageContent } from "@/lib/site-schema";

type CmsEditorProps = {
  initialContent: LandingPageContent;
  adminEmail: string;
};

type FeedbackState =
  | {
      type: "success" | "error";
      message: string;
    }
  | null;

const sectionLinks = [
  { id: "brand", label: "Brand" },
  { id: "hero", label: "Hero" },
  { id: "overview", label: "Overview" },
  { id: "experience", label: "Experience" },
  { id: "timeline", label: "Timeline" },
  { id: "pricing", label: "Pricing" },
  { id: "faq", label: "FAQ" },
  { id: "registration", label: "Registration" },
  { id: "footer", label: "Footer" },
  { id: "seo", label: "SEO" },
] as const;

function cloneContent(content: LandingPageContent) {
  return structuredClone(content);
}

function updateAtPath(target: unknown, path: Path, nextValue: unknown): unknown {
  if (path.length === 0) {
    return nextValue;
  }

  const [head, ...tail] = path;

  if (Array.isArray(target)) {
    const copy = [...target];
    copy[Number(head)] = updateAtPath(copy[Number(head)], tail, nextValue);
    return copy;
  }

  const source = (target as Record<PathSegment, unknown>) ?? {};
  return {
    ...source,
    [head]: updateAtPath(source[head], tail, nextValue),
  };
}

function getAtPath(target: unknown, path: Path): unknown {
  return path.reduce<unknown>((current, segment) => {
    if (Array.isArray(current)) {
      return current[Number(segment)];
    }

    if (current && typeof current === "object") {
      return (current as Record<PathSegment, unknown>)[segment];
    }

    return undefined;
  }, target);
}

export function CmsEditor({ initialContent, adminEmail }: CmsEditorProps) {
  const router = useRouter();
  const [content, setContent] = useState(initialContent);
  const [savedSnapshot, setSavedSnapshot] = useState(initialContent);
  const [feedback, setFeedback] = useState<FeedbackState>(null);
  const [uploadingTarget, setUploadingTarget] = useState<string | null>(null);
  const [isSaving, startSaving] = useTransition();
  const [isLoggingOut, startLoggingOut] = useTransition();

  const isDirty = JSON.stringify(content) !== JSON.stringify(savedSnapshot);

  function updatePath(path: Path, value: unknown) {
    setContent((current) => updateAtPath(current, path, value) as LandingPageContent);
  }

  function addItem(path: Path, value: unknown) {
    setContent((current) => {
      const items = getAtPath(current, path);
      const nextItems = Array.isArray(items) ? [...items, value] : [value];
      return updateAtPath(current, path, nextItems) as LandingPageContent;
    });
  }

  function removeItem(path: Path, index: number) {
    setContent((current) => {
      const items = getAtPath(current, path);
      const nextItems = Array.isArray(items) ? items.filter((_, itemIndex) => itemIndex !== index) : [];
      return updateAtPath(current, path, nextItems) as LandingPageContent;
    });
  }

  async function handleAssetUpload(target: string, file: File, alt: string) {
    setFeedback(null);
    setUploadingTarget(target);

    try {
      const formData = new FormData();
      formData.set("target", target);
      formData.set("alt", alt);
      formData.set("file", file);

      const response = await fetch("/api/admin/media", {
        method: "POST",
        body: formData,
      });

      const payload = (await response.json().catch(() => null)) as
        | {
            asset?: LandingPageContent["brand"]["logo"];
            message?: string;
          }
        | null;

      if (!response.ok || !payload?.asset) {
        setFeedback({
          type: "error",
          message: payload?.message ?? "Upload gambar gagal. Coba lagi dengan file lain.",
        });
        return;
      }

      updatePath(target.split("."), payload.asset);
      setFeedback({
        type: "success",
        message: "Aset visual berhasil diunggah dan langsung dipakai di draft.",
      });
    } finally {
      setUploadingTarget(null);
    }
  }

  function handleReset() {
    setContent(cloneContent(savedSnapshot));
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
            data?: LandingPageContent;
            message?: string;
          }
        | null;

      if (!response.ok || !payload?.data) {
        setFeedback({
          type: "error",
          message: payload?.message ?? "Konten belum berhasil disimpan. Periksa lagi field yang diubah.",
        });

        if (response.status === 401) {
          router.replace("/admin/login");
        }

        if (response.status === 403) {
          router.replace("/admin/unauthorized");
        }

        return;
      }

      setContent(payload.data);
      setSavedSnapshot(payload.data);
      setFeedback({
        type: "success",
        message: payload.message ?? "Perubahan sudah tersimpan ke Supabase.",
      });
      router.refresh();
    });
  }

  function handleLogout() {
    startLoggingOut(async () => {
      await fetch("/api/admin/logout", { method: "POST" });
      router.replace("/admin/login");
      router.refresh();
    });
  }

  return (
    <div className="min-h-screen bg-brand-surface px-4 py-6 md:px-6 md:py-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="rounded-[36px] bg-brand-night px-6 py-6 text-white shadow-[0_24px_80px_rgba(7,11,24,0.24)] md:px-8 md:py-8">
          <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-lime">Supabase CMS</p>
              <h1 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">
                One editing surface for the full landing page experience.
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-8 text-white/74 md:text-lg">
                This dashboard controls hero copy, pricing, FAQ, timeline, footer details, and selected media assets
                from one structured content document in Supabase.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/14 bg-white/8 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/12"
              >
                <Globe2 className="size-4" />
                View site
              </a>
              <button
                type="button"
                onClick={handleReset}
                disabled={!isDirty}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/14 bg-white/8 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/12 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <RefreshCcw className="size-4" />
                Reset draft
              </button>
              <button
                type="button"
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/14 bg-white/8 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/12 disabled:opacity-50"
              >
                <LogOut className="size-4" />
                {isLoggingOut ? "Logging out..." : "Logout"}
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={isSaving || !isDirty}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-orange px-5 py-3 text-sm font-semibold text-brand-night transition hover:bg-[#ffb14a] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Save className="size-4" />
                {isSaving ? "Saving..." : "Save changes"}
              </button>
            </div>
          </div>
        </header>

        <div className="grid gap-4 lg:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="space-y-4 lg:sticky lg:top-6 lg:self-start">
            <div className="rounded-[28px] border border-brand-line bg-brand-paper p-5 shadow-[0_18px_48px_rgba(8,12,24,0.08)]">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-muted">Session</p>
              <p className="mt-3 text-lg font-semibold text-brand-night">{adminEmail}</p>
              <p className="mt-2 text-sm leading-7 text-brand-muted">
                Changes here update the public site after a successful save.
              </p>
            </div>

            <div className="rounded-[28px] border border-brand-line bg-brand-paper p-5 shadow-[0_18px_48px_rgba(8,12,24,0.08)]">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-muted">Sections</p>
              <div className="mt-4 flex flex-wrap gap-2 lg:flex-col">
                {sectionLinks.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="inline-flex items-center justify-between gap-2 rounded-full border border-brand-line px-4 py-2 text-sm font-semibold text-brand-night transition hover:border-brand-orange hover:bg-brand-wash"
                  >
                    <span>{section.label}</span>
                    <ExternalLink className="size-3.5" />
                  </a>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              <div className="rounded-[28px] border border-brand-line bg-brand-paper p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-muted">Primary CTA</p>
                <p className="mt-3 text-lg font-semibold text-brand-night">{content.registration.primaryLabel}</p>
              </div>
              <div className="rounded-[28px] border border-brand-line bg-brand-paper p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-muted">Destination</p>
                <p className="mt-3 break-all text-sm font-medium text-brand-night">{content.registration.href}</p>
              </div>
              <div className="rounded-[28px] border border-brand-line bg-brand-paper p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-muted">Draft status</p>
                <p className="mt-3 text-lg font-semibold text-brand-night">{isDirty ? "Unsaved changes" : "Synced"}</p>
              </div>
            </div>
          </aside>

          <div className="space-y-6">
            {feedback ? (
              <div
                className={`rounded-[24px] border px-5 py-4 text-sm font-medium ${
                  feedback.type === "success"
                    ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                    : "border-red-200 bg-red-50 text-red-700"
                }`}
              >
                {feedback.message}
              </div>
            ) : null}

            <BrandSection
              content={content}
              updatePath={updatePath}
              addItem={addItem}
              removeItem={removeItem}
              handleAssetUpload={handleAssetUpload}
              uploadingTarget={uploadingTarget}
            />
            <HeroSection content={content} updatePath={updatePath} addItem={addItem} removeItem={removeItem} handleAssetUpload={handleAssetUpload} uploadingTarget={uploadingTarget} />
            <OverviewSection content={content} updatePath={updatePath} addItem={addItem} removeItem={removeItem} handleAssetUpload={handleAssetUpload} uploadingTarget={uploadingTarget} />
            <ExperienceSection content={content} updatePath={updatePath} addItem={addItem} removeItem={removeItem} handleAssetUpload={handleAssetUpload} uploadingTarget={uploadingTarget} />
            <TimelineSection content={content} updatePath={updatePath} addItem={addItem} removeItem={removeItem} handleAssetUpload={handleAssetUpload} uploadingTarget={uploadingTarget} />
            <PricingSection content={content} updatePath={updatePath} addItem={addItem} removeItem={removeItem} handleAssetUpload={handleAssetUpload} uploadingTarget={uploadingTarget} />
            <FaqSection content={content} updatePath={updatePath} addItem={addItem} removeItem={removeItem} handleAssetUpload={handleAssetUpload} uploadingTarget={uploadingTarget} />
            <RegistrationSection content={content} updatePath={updatePath} addItem={addItem} removeItem={removeItem} handleAssetUpload={handleAssetUpload} uploadingTarget={uploadingTarget} />
            <FooterSection content={content} updatePath={updatePath} addItem={addItem} removeItem={removeItem} handleAssetUpload={handleAssetUpload} uploadingTarget={uploadingTarget} />
            <SeoSection content={content} updatePath={updatePath} addItem={addItem} removeItem={removeItem} handleAssetUpload={handleAssetUpload} uploadingTarget={uploadingTarget} />
          </div>
        </div>
      </div>
    </div>
  );
}
