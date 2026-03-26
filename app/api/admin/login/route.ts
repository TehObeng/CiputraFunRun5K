import { NextResponse } from "next/server";
import { z } from "zod";

import { hasSupabaseConfig } from "@/lib/env";
import { adminUserSchema } from "@/lib/site-schema";
import { createServerSupabaseClient } from "@/lib/supabase";

const loginSchema = z.object({
  email: z.string().trim().email("Masukkan email admin yang valid."),
  password: z.string().trim().min(1, "Password wajib diisi."),
});

export async function POST(request: Request) {
  if (!hasSupabaseConfig()) {
    return NextResponse.json(
      { message: "Supabase auth belum dikonfigurasi. Lengkapi environment variable terlebih dahulu." },
      { status: 503 },
    );
  }

  const body = await request.json().catch(() => null);
  const parsed = loginSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ message: "Email dan password wajib diisi dengan format yang benar." }, { status: 400 });
  }

  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  });

  if (error || !data.user) {
    return NextResponse.json({ message: "Login gagal. Periksa kembali email dan password admin." }, { status: 401 });
  }

  const { data: adminData, error: adminError } = await supabase
    .from("admin_users")
    .select("user_id, email, role, status, created_at, updated_at")
    .eq("user_id", data.user.id)
    .maybeSingle();

  const parsedAdmin = adminUserSchema.safeParse(adminData);

  if (adminError || !parsedAdmin.success || parsedAdmin.data.status !== "active") {
    await supabase.auth.signOut();
    return NextResponse.json(
      { message: "Akun ini berhasil login, tetapi belum diberi akses admin aktif." },
      { status: 403 },
    );
  }

  return NextResponse.json({
    message: "Login admin berhasil.",
    email: parsedAdmin.data.email,
  });
}
