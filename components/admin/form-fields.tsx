type SectionCardProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

type InputFieldProps = {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: "text" | "number" | "url";
  helper?: string;
};

type TextAreaFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  helper?: string;
  rows?: number;
};

export function SectionCard({ title, description, children }: SectionCardProps) {
  return (
    <section className="rounded-[32px] border border-brand-ink/10 bg-white p-5 shadow-[0_18px_40px_rgba(11,16,32,0.06)] md:p-7">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-coral">{title}</p>
        <p className="mt-2 text-sm leading-7 text-brand-stone">{description}</p>
      </div>
      <div className="mt-6 space-y-6">{children}</div>
    </section>
  );
}

export function InputField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  helper,
}: InputFieldProps) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-semibold text-brand-ink">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-brand-ink/10 bg-brand-cream px-4 py-3 text-sm outline-none transition focus:border-brand-coral"
      />
      {helper ? <p className="text-xs leading-6 text-brand-stone">{helper}</p> : null}
    </label>
  );
}

export function TextAreaField({
  label,
  value,
  onChange,
  placeholder,
  helper,
  rows = 4,
}: TextAreaFieldProps) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-semibold text-brand-ink">{label}</span>
      <textarea
        rows={rows}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-brand-ink/10 bg-brand-cream px-4 py-3 text-sm leading-7 outline-none transition focus:border-brand-coral"
      />
      {helper ? <p className="text-xs leading-6 text-brand-stone">{helper}</p> : null}
    </label>
  );
}

export function ItemActions({
  onRemove,
  disabled,
}: {
  onRemove: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onRemove}
      disabled={disabled}
      className="inline-flex items-center gap-2 rounded-full border border-red-200 px-3 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40"
    >
      Hapus
    </button>
  );
}
