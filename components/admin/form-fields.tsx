import type { ChangeEvent, ReactNode } from "react";

import type { ImageAsset } from "@/lib/site-schema";
import { cn } from "@/lib/utils";

type SectionCardProps = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
};

type TextFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  helper?: string;
  placeholder?: string;
  type?: "text" | "url" | "email";
};

type TextAreaFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  helper?: string;
  placeholder?: string;
  rows?: number;
};

type NumberFieldProps = {
  label: string;
  value: number;
  onChange: (value: number) => void;
  helper?: string;
};

type ToggleFieldProps = {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  helper?: string;
};

type ArrayItemCardProps = {
  eyebrow: string;
  title: string;
  canRemove: boolean;
  onRemove: () => void;
  children: ReactNode;
};

type ImageAssetFieldProps = {
  label: string;
  target: string;
  value: ImageAsset;
  onChange: (value: ImageAsset) => void;
  onUpload: (target: string, file: File, alt: string) => Promise<void>;
  uploading: boolean;
  helper?: string;
};

export function SectionCard({ id, eyebrow, title, description, children }: SectionCardProps) {
  return (
    <section
      id={id}
      className="rounded-[32px] border border-brand-line bg-white/92 p-6 shadow-[0_18px_48px_rgba(8,12,24,0.08)] md:p-8"
    >
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-orange">{eyebrow}</p>
        <h2 className="mt-3 text-2xl font-bold text-brand-night md:text-3xl">{title}</h2>
        <p className="mt-3 text-sm leading-7 text-brand-muted md:text-base">{description}</p>
      </div>
      <div className="mt-8 space-y-8">{children}</div>
    </section>
  );
}

export function FieldGrid({ children }: { children: ReactNode }) {
  return <div className="grid gap-5 md:grid-cols-2">{children}</div>;
}

export function TextField({
  label,
  value,
  onChange,
  helper,
  placeholder,
  type = "text",
}: TextFieldProps) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-semibold text-brand-night">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-brand-line bg-brand-surface px-4 py-3 text-sm text-brand-night outline-none transition focus:border-brand-orange"
      />
      {helper ? <p className="text-xs leading-6 text-brand-muted">{helper}</p> : null}
    </label>
  );
}

export function TextAreaField({
  label,
  value,
  onChange,
  helper,
  placeholder,
  rows = 4,
}: TextAreaFieldProps) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-semibold text-brand-night">{label}</span>
      <textarea
        rows={rows}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-brand-line bg-brand-surface px-4 py-3 text-sm leading-7 text-brand-night outline-none transition focus:border-brand-orange"
      />
      {helper ? <p className="text-xs leading-6 text-brand-muted">{helper}</p> : null}
    </label>
  );
}

export function NumberField({ label, value, onChange, helper }: NumberFieldProps) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-semibold text-brand-night">{label}</span>
      <input
        type="number"
        min={0}
        value={value}
        onChange={(event) => onChange(Number(event.target.value) || 0)}
        className="w-full rounded-2xl border border-brand-line bg-brand-surface px-4 py-3 text-sm text-brand-night outline-none transition focus:border-brand-orange"
      />
      {helper ? <p className="text-xs leading-6 text-brand-muted">{helper}</p> : null}
    </label>
  );
}

export function ToggleField({ label, checked, onChange, helper }: ToggleFieldProps) {
  return (
    <label className="flex items-start gap-4 rounded-2xl border border-brand-line bg-brand-surface px-4 py-3 text-sm text-brand-night">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="mt-1 size-4 rounded border-brand-line"
      />
      <span className="space-y-1">
        <span className="block font-semibold">{label}</span>
        {helper ? <span className="block text-xs leading-6 text-brand-muted">{helper}</span> : null}
      </span>
    </label>
  );
}

export function ArrayItemCard({ eyebrow, title, canRemove, onRemove, children }: ArrayItemCardProps) {
  return (
    <div className="rounded-[28px] border border-brand-line bg-brand-surface p-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-muted">{eyebrow}</p>
          <p className="mt-2 text-lg font-semibold text-brand-night">{title}</p>
        </div>
        <button
          type="button"
          onClick={onRemove}
          disabled={!canRemove}
          className={cn(
            "inline-flex items-center justify-center rounded-full border px-4 py-2 text-sm font-semibold transition",
            canRemove
              ? "border-red-200 text-red-700 hover:bg-red-50"
              : "cursor-not-allowed border-brand-line text-brand-muted opacity-50",
          )}
        >
          Hapus
        </button>
      </div>
      <div className="mt-5 space-y-5">{children}</div>
    </div>
  );
}

export function AddItemButton({ children, onClick }: { children: ReactNode; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center justify-center rounded-full border border-brand-line px-4 py-3 text-sm font-semibold text-brand-night transition hover:border-brand-orange hover:bg-brand-wash"
    >
      {children}
    </button>
  );
}

export function ImageAssetField({
  label,
  target,
  value,
  onChange,
  onUpload,
  uploading,
  helper,
}: ImageAssetFieldProps) {
  function handleFileSelection(event: ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      void onUpload(target, selectedFile, value.alt);
    }

    event.target.value = "";
  }

  return (
    <div className="space-y-4 rounded-[28px] border border-brand-line bg-brand-surface p-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-start">
        <div className="overflow-hidden rounded-[24px] border border-brand-line bg-white md:w-[220px]">
          <div className="aspect-[4/3] w-full bg-[radial-gradient(circle_at_top,#f8fbff,#eef3ff_55%,#f3efe7)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={value.publicUrl} alt={value.alt} className="h-full w-full object-contain p-4" />
          </div>
        </div>
        <div className="flex-1 space-y-4">
          <div>
            <p className="text-sm font-semibold text-brand-night">{label}</p>
            {helper ? <p className="mt-1 text-xs leading-6 text-brand-muted">{helper}</p> : null}
          </div>
          <FieldGrid>
            <TextField
              label="Public URL"
              value={value.publicUrl}
              onChange={(publicUrl) => onChange({ ...value, publicUrl })}
            />
            <TextField label="Storage path" value={value.path} onChange={(path) => onChange({ ...value, path })} />
          </FieldGrid>
          <TextField label="Alt text" value={value.alt} onChange={(alt) => onChange({ ...value, alt })} />
          <label className="inline-flex cursor-pointer items-center justify-center rounded-full bg-brand-night px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-night-soft">
            <span>{uploading ? "Mengunggah..." : "Upload gambar baru"}</span>
            <input
              type="file"
              accept="image/png,image/jpeg,image/webp,image/svg+xml"
              onChange={handleFileSelection}
              className="hidden"
            />
          </label>
        </div>
      </div>
    </div>
  );
}
