"use client";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <main className="section-shell py-20">
      <h2 className="text-2xl font-bold">Terjadi kendala saat memuat halaman.</h2>
      <p className="mt-3 text-brand-ink/70">Silakan coba lagi dalam beberapa saat.</p>
      <button
        type="button"
        onClick={reset}
        className="mt-6 rounded-full bg-brand-coral px-5 py-3 text-sm font-semibold text-white"
      >
        Coba lagi
      </button>
    </main>
  );
}
