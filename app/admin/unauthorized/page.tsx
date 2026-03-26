import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { getAdminAuthState } from "@/lib/admin-session";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Unauthorized",
  description: "Halaman ini memberi tahu bahwa akun saat ini belum punya akses admin aktif.",
};

export default async function AdminUnauthorizedPage() {
  const authState = await getAdminAuthState();

  if (authState.status === "authenticated") {
    redirect("/admin");
  }

  if (authState.status === "unauthenticated") {
    redirect("/admin/login");
  }

  if (authState.status === "setup-required") {
    redirect("/admin/login");
  }

  return (
    <main className="min-h-screen bg-brand-night px-4 py-10 text-white md:px-6">
      <div className="mx-auto flex max-w-2xl flex-col gap-6 rounded-[32px] border border-white/10 bg-white/6 p-8 shadow-[0_24px_80px_rgba(7,11,24,0.32)] backdrop-blur">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-lime">Access required</p>
        <h1 className="text-3xl font-bold md:text-4xl">Akun ini sudah login, tetapi belum punya hak admin aktif.</h1>
        <p className="text-base leading-8 text-white/74">
          Pastikan email ini sudah dimasukkan ke tabel admin di Supabase dan statusnya masih aktif sebelum mencoba
          membuka CMS.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-white/14 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Kembali ke landing page
          </Link>
          <form action="/api/admin/logout" method="post">
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-full bg-brand-orange px-5 py-3 text-sm font-semibold text-brand-night transition hover:bg-[#ffb14a]"
            >
              Logout dan ganti akun
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
