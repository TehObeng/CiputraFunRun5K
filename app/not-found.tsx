import Link from "next/link";

export default function NotFound() {
  return (
    <main className="section-shell py-20 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-coral">404</p>
      <h1 className="mt-3 text-4xl font-bold text-brand-ink">Halaman tidak ditemukan</h1>
      <p className="mx-auto mt-4 max-w-xl text-brand-ink/70">
        Maaf, halaman yang kamu cari tidak tersedia. Kembali ke beranda untuk melanjutkan pendaftaran.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex rounded-full bg-brand-coral px-5 py-3 font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-coral"
      >
        Kembali ke beranda
      </Link>
    </main>
  );
}
