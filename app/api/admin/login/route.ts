import { NextResponse } from "next/server";
import { z } from "zod";

import { createAdminSession, verifyAdminCredentials } from "@/lib/admin-auth";

const loginSchema = z.object({
  username: z.string().trim().min(1, "Username wajib diisi."),
  password: z.string().trim().min(1, "Password wajib diisi."),
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = loginSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { message: "Username dan password wajib diisi." },
      { status: 400 },
    );
  }

  const isValid = await verifyAdminCredentials(parsed.data.username, parsed.data.password);

  if (!isValid) {
    return NextResponse.json(
      { message: "Login gagal. Periksa kembali username dan password." },
      { status: 401 },
    );
  }

  await createAdminSession();

  return NextResponse.json({ message: "Login berhasil." });
}

