import { NextResponse } from "next/server";
import { z } from "zod";

import { verifyPassword } from "@/lib/auth-security";
import {
  attachAdminSessionCookie,
  createAdminSession,
  getCurrentAdminSessionToken,
  revokeAdminSession,
} from "@/lib/admin-session";
import { recordAuditLog } from "@/lib/audit-log";
import { hasAdminAuthConfig } from "@/lib/env";
import { hasValidSameOrigin, jsonNoStore } from "@/lib/http-security";
import { getPrisma } from "@/lib/prisma";

const loginSchema = z.object({
  email: z.string().trim().email("Masukkan email admin yang valid."),
  password: z.string().trim().min(1, "Password wajib diisi."),
});

export async function POST(request: Request) {
  if (!hasAdminAuthConfig()) {
    return jsonNoStore(
      { message: "PostgreSQL atau ADMIN_SESSION_SECRET belum dikonfigurasi. Lengkapi environment terlebih dahulu." },
      { status: 503 },
    );
  }

  if (!hasValidSameOrigin(request)) {
    return jsonNoStore({ message: "Origin request tidak diizinkan." }, { status: 403 });
  }

  const body = await request.json().catch(() => null);
  const parsed = loginSchema.safeParse(body);

  if (!parsed.success) {
    return jsonNoStore({ message: "Email dan password wajib diisi dengan format yang benar." }, { status: 400 });
  }

  try {
    const prisma = getPrisma();
    const email = parsed.data.email.toLowerCase();
    const adminUser = await prisma.adminUser.findUnique({
      where: { email },
    });

    if (!adminUser || !(await verifyPassword(parsed.data.password, adminUser.passwordHash))) {
      return jsonNoStore({ message: "Login gagal. Periksa kembali email dan password admin." }, { status: 401 });
    }

    if (adminUser.role !== "ADMIN" || adminUser.status !== "ACTIVE") {
      return jsonNoStore({ message: "Akun ini berhasil login, tetapi belum diberi akses admin aktif." }, { status: 403 });
    }

    await revokeAdminSession(await getCurrentAdminSessionToken());

    const session = await createAdminSession(adminUser.id, request);

    await recordAuditLog(prisma, {
      adminUserId: adminUser.id,
      action: "admin_session.login",
      entityType: "admin_session",
      entityId: session.sessionId,
      metadata: {
        email: adminUser.email,
      },
      ipAddress: session.requestInfo.ipAddress,
      userAgent: session.requestInfo.userAgent,
    });

    const response = NextResponse.json({
      message: "Login admin berhasil.",
      email: adminUser.email,
    });

    attachAdminSessionCookie(response, session.token, session.expiresAt);

    return response;
  } catch {
    return jsonNoStore({ message: "Login admin gagal karena koneksi database bermasalah." }, { status: 503 });
  }
}
