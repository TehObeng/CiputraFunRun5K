"use client";

import { LockKeyhole, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

type LoginPanelProps = {
  setupRequired?: boolean;
};

export function LoginPanel({ setupRequired = false }: LoginPanelProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    startTransition(async () => {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const payload = (await response.json().catch(() => null)) as { message?: string } | null;

      if (!response.ok) {
        setError(payload?.message ?? "Login admin gagal. Coba lagi.");
        return;
      }

      router.replace("/admin");
      router.refresh();
    });
  }

  return (
    <div className="min-h-screen bg-brand-night px-4 py-8 text-white md:px-6 md:py-10">
      <div className="mx-auto grid min-h-[calc(100vh-2rem)] max-w-6xl gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <section className="hero-panel flex flex-col justify-between rounded-[36px] border border-white/10 p-7 shadow-[0_24px_80px_rgba(7,11,24,0.34)] md:p-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-lime">Admin CMS</p>
            <h1 className="mt-4 max-w-[12ch] text-4xl font-bold leading-none md:text-6xl">
              Kelola landing page seperti produk yang siap publish.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-white/76 md:text-lg">
              Login dengan akun admin untuk memperbarui konten, CTA pendaftaran, FAQ, harga, timeline, dan aset visual
              penting tanpa menyentuh source code.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-[24px] border border-white/10 bg-white/6 p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-white/56">Auth</p>
              <p className="mt-3 text-lg font-semibold">Email + role based access</p>
            </div>
            <div className="rounded-[24px] border border-white/10 bg-white/6 p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-white/56">CMS</p>
              <p className="mt-3 text-lg font-semibold">Structured content sections</p>
            </div>
            <div className="rounded-[24px] border border-white/10 bg-white/6 p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-white/56">Media</p>
              <p className="mt-3 text-lg font-semibold">Local asset uploads</p>
            </div>
          </div>
        </section>

        <section className="rounded-[36px] border border-brand-line bg-brand-paper p-7 text-brand-night shadow-[0_24px_80px_rgba(7,11,24,0.18)] md:p-8">
          <div className="flex items-center gap-3">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-brand-wash text-brand-orange">
              <LockKeyhole className="size-6" />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-muted">Admin sign in</p>
              <p className="mt-1 text-lg font-bold">Gunakan email admin yang aktif</p>
            </div>
          </div>

          {setupRequired ? (
            <div className="mt-6 rounded-[24px] border border-amber-200 bg-amber-50 px-4 py-4 text-sm leading-7 text-amber-800">
              PostgreSQL admin belum dikonfigurasi di environment saat ini. Isi `DATABASE_URL` dan
              `ADMIN_SESSION_SECRET` sebelum mencoba login.
            </div>
          ) : null}

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <label className="block space-y-2">
              <span className="text-sm font-semibold text-brand-night">Email admin</span>
              <input
                type="email"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-2xl border border-brand-line bg-white px-4 py-3 text-sm outline-none transition focus:border-brand-orange"
              />
            </label>

            <label className="block space-y-2">
              <span className="text-sm font-semibold text-brand-night">Password</span>
              <input
                type="password"
                name="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-2xl border border-brand-line bg-white px-4 py-3 text-sm outline-none transition focus:border-brand-orange"
              />
            </label>

            {error ? (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
            ) : null}

            <button
              type="submit"
              disabled={isPending || setupRequired}
              className="inline-flex w-full items-center justify-center rounded-full bg-brand-orange px-5 py-3 text-sm font-semibold text-brand-night transition hover:bg-[#ffb14a] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPending ? "Memproses..." : "Masuk ke CMS"}
            </button>
          </form>

          <div className="mt-6 rounded-[24px] border border-brand-line bg-brand-wash px-4 py-4 text-sm leading-7 text-brand-muted">
            <div className="flex items-center gap-2 font-semibold text-brand-night">
              <Sparkles className="size-4 text-brand-orange" />
              Hal yang perlu disiapkan
            </div>
            <p className="mt-2">
              Pastikan akun email ini sudah tersimpan sebagai admin aktif di PostgreSQL dan password awalnya sudah
              dibuat saat proses seed.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
