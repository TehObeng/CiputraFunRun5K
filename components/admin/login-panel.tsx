"use client";

import { ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export function LoginPanel() {
  const router = useRouter();
  const [username, setUsername] = useState("admin");
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
        body: JSON.stringify({ username, password }),
      });

      const payload = (await response.json().catch(() => null)) as { message?: string } | null;

      if (!response.ok) {
        setError(payload?.message ?? "Login gagal. Coba lagi.");
        return;
      }

      router.refresh();
    });
  }

  return (
    <div className="min-h-screen bg-brand-ink px-4 py-8 text-white md:px-6 md:py-10">
      <div className="mx-auto grid min-h-[calc(100vh-2rem)] max-w-6xl gap-6 md:grid-cols-[1fr_460px]">
        <section className="hero-glow flex flex-col justify-between rounded-[36px] border border-white/10 p-7 shadow-[0_24px_80px_rgba(8,12,24,0.32)] md:p-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-lime">Fun Run CMS</p>
            <h1 className="mt-4 max-w-[10ch] text-4xl font-bold leading-none md:text-6xl">
              Kelola landing page tanpa edit kode.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-white/76 md:text-lg">
              Login untuk mengubah headline hero, aktivitas, harga tiket, FAQ, link Google Form, dan informasi kontak
              langsung dari panel admin sederhana.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-[24px] border border-white/10 bg-white/6 p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-white/56">Output</p>
              <p className="mt-3 text-lg font-semibold">Landing page publik</p>
            </div>
            <div className="rounded-[24px] border border-white/10 bg-white/6 p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-white/56">Storage</p>
              <p className="mt-3 text-lg font-semibold">Supabase</p>
            </div>
            <div className="rounded-[24px] border border-white/10 bg-white/6 p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-white/56">Akses</p>
              <p className="mt-3 text-lg font-semibold">Cookie session</p>
            </div>
          </div>
        </section>

        <section className="surface-outline rounded-[36px] bg-brand-cream p-7 text-brand-ink md:p-8">
          <div className="flex items-center gap-3">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-brand-peach text-brand-coral">
              <ShieldCheck className="size-6" />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-stone">Masuk admin</p>
              <p className="mt-1 text-lg font-bold">Gunakan kredensial dari `.env.local`</p>
            </div>
          </div>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <label className="block space-y-2">
              <span className="text-sm font-semibold text-brand-ink">Username</span>
              <input
                type="text"
                name="username"
                autoComplete="username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                className="w-full rounded-2xl border border-brand-ink/10 bg-white px-4 py-3 text-sm outline-none transition focus:border-brand-coral"
              />
            </label>

            <label className="block space-y-2">
              <span className="text-sm font-semibold text-brand-ink">Password</span>
              <input
                type="password"
                name="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-2xl border border-brand-ink/10 bg-white px-4 py-3 text-sm outline-none transition focus:border-brand-coral"
              />
            </label>

            {error ? (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
            ) : null}

            <button
              type="submit"
              disabled={isPending}
              className="inline-flex w-full items-center justify-center rounded-full bg-brand-coral px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-orange disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPending ? "Memproses..." : "Masuk ke CMS"}
            </button>
          </form>

          <div className="mt-6 rounded-[24px] border border-brand-ink/10 bg-brand-peach/40 p-4 text-sm leading-7 text-brand-stone">
            Gunakan kredensial dari environment variable. Hindari memakai password default saat produksi.
          </div>
        </section>
      </div>
    </div>
  );
}
