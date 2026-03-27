import type { SupabaseClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { redirect } from "next/navigation";

import { hasSupabaseConfig } from "@/lib/env";
import { adminUserSchema, type AdminUser } from "@/lib/site-schema";
import { createServerSupabaseClient } from "@/lib/supabase";

type AdminAuthSetupRequired = {
  status: "setup-required";
};

type AdminAuthUnauthenticated = {
  status: "unauthenticated";
};

type AdminAuthForbidden = {
  status: "forbidden";
  email: string | null;
};

type AdminAuthAuthenticated = {
  status: "authenticated";
  email: string | null;
  userId: string;
  adminUser: AdminUser;
};

export type AdminAuthState =
  | AdminAuthSetupRequired
  | AdminAuthUnauthenticated
  | AdminAuthForbidden
  | AdminAuthAuthenticated;

async function getAdminUser(supabase: SupabaseClient, userId: string) {
  const { data, error } = await supabase
    .from("admin_users")
    .select("user_id, email, role, status, created_at, updated_at")
    .eq("user_id", userId)
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  const parsed = adminUserSchema.safeParse(data);
  return parsed.success ? parsed.data : null;
}

export async function getAdminAuthState(): Promise<AdminAuthState> {
  if (!hasSupabaseConfig()) {
    return { status: "setup-required" };
  }

  const supabase = await createServerSupabaseClient();
  const claimsResult = await supabase.auth.getClaims();
  const claims = claimsResult.data?.claims;
  const userId = typeof claims?.sub === "string" ? claims.sub : null;
  const email = typeof claims?.email === "string" ? claims.email : null;

  if (!userId) {
    return { status: "unauthenticated" };
  }

  const adminUser = await getAdminUser(supabase, userId);

  if (!adminUser || adminUser.role !== "admin" || adminUser.status !== "active") {
    return { status: "forbidden", email };
  }

  return {
    status: "authenticated",
    email,
    userId,
    adminUser,
  };
}

export async function requireAdminPage() {
  const state = await getAdminAuthState();

  if (state.status === "authenticated") {
    return state;
  }

  if (state.status === "forbidden") {
    redirect("/admin/unauthorized");
  }

  redirect("/admin/login");
}

type AdminApiFailure =
  | {
      ok: false;
      response: NextResponse;
    }
  | {
      ok: true;
      supabase: SupabaseClient;
      userId: string;
      email: string | null;
      adminUser: AdminUser;
    };

export async function requireAdminApi(): Promise<AdminApiFailure> {
  if (!hasSupabaseConfig()) {
    return {
      ok: false,
      response: NextResponse.json(
        { message: "Supabase belum dikonfigurasi. Lengkapi environment variable lalu coba lagi." },
        { status: 503 },
      ),
    };
  }

  const supabase = await createServerSupabaseClient();
  const claimsResult = await supabase.auth.getClaims();
  const claims = claimsResult.data?.claims;
  const userId = typeof claims?.sub === "string" ? claims.sub : null;
  const email = typeof claims?.email === "string" ? claims.email : null;

  if (!userId) {
    return {
      ok: false,
      response: NextResponse.json({ message: "Sesi login tidak ditemukan." }, { status: 401 }),
    };
  }

  const adminUser = await getAdminUser(supabase, userId);

  if (!adminUser) {
    return {
      ok: false,
      response: NextResponse.json({ message: "Akun ini tidak memiliki akses admin." }, { status: 403 }),
    };
  }

  if (adminUser.status !== "active") {
    return {
      ok: false,
      response: NextResponse.json({ message: "Akun admin ini sedang dinonaktifkan." }, { status: 403 }),
    };
  }

  return {
    ok: true,
    supabase,
    userId,
    email,
    adminUser,
  };
}
