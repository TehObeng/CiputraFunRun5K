import { NextResponse } from "next/server";

import { clearAdminSessionCookie, getCurrentAdminSessionToken, revokeAdminSession } from "@/lib/admin-session";
import { recordAuditLog } from "@/lib/audit-log";
import { hasAdminAuthConfig } from "@/lib/env";
import { hashSessionToken } from "@/lib/auth-security";
import { hasValidSameOrigin, jsonNoStore } from "@/lib/http-security";
import { getPrisma } from "@/lib/prisma";

export async function POST(request: Request) {
  if (!hasValidSameOrigin(request)) {
    return jsonNoStore({ message: "Origin request tidak diizinkan." }, { status: 403 });
  }

  const token = await getCurrentAdminSessionToken();
  const response = NextResponse.json({ message: "Logout berhasil." });
  clearAdminSessionCookie(response);

  if (!token || !hasAdminAuthConfig()) {
    return response;
  }

  try {
    const prisma = getPrisma();
    const session = await prisma.adminSession.findUnique({
      where: {
        tokenHash: hashSessionToken(token),
      },
      include: {
        user: true,
      },
    });

    await revokeAdminSession(token);

    if (session?.userId) {
      await recordAuditLog(prisma, {
        adminUserId: session.userId,
        action: "admin_session.logout",
        entityType: "admin_session",
        entityId: session.id,
        metadata: {
          email: session.user.email,
        },
        ipAddress: session.ipAddress,
        userAgent: session.userAgent,
      });
    }
  } catch {
    return response;
  }

  return response;
}
