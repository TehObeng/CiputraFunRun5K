import { AdminRole, AdminStatus } from "@prisma/client";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

import { createSessionToken, hashSessionToken } from "@/lib/auth-security";
import { env, hasAdminAuthConfig } from "@/lib/env";
import { hasValidSameOrigin, jsonNoStore } from "@/lib/http-security";
import { getPrisma } from "@/lib/prisma";
import type { AdminUser } from "@/lib/site-schema";

const ADMIN_SESSION_COOKIE = "admin_session";

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

type RequestClientInfo = {
  ipAddress: string | null;
  userAgent: string | null;
};

type AdminApiFailure =
  | {
      ok: false;
      response: NextResponse;
    }
  | {
      ok: true;
      userId: string;
      email: string | null;
      adminUser: AdminUser;
      sessionId: string;
      requestInfo: RequestClientInfo;
    };

function getSessionDurationMs() {
  return env.adminSessionTtlHours * 60 * 60 * 1000;
}

function getRequestClientInfo(request: Request): RequestClientInfo {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const ipAddress = forwardedFor?.split(",")[0]?.trim() ?? null;

  return {
    ipAddress,
    userAgent: request.headers.get("user-agent"),
  };
}

function isSecureCookie() {
  return env.siteUrl.startsWith("https://") || process.env.NODE_ENV === "production";
}

function toAdminUser(user: {
  id: string;
  email: string;
  role: AdminRole;
  status: AdminStatus;
  createdAt: Date;
  updatedAt: Date;
}): AdminUser {
  return {
    id: user.id,
    email: user.email,
    role: user.role === AdminRole.ADMIN ? "admin" : "admin",
    status: user.status === AdminStatus.ACTIVE ? "active" : "disabled",
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
  };
}

async function getSessionTokenFromCookies() {
  const cookieStore = await cookies();
  return cookieStore.get(ADMIN_SESSION_COOKIE)?.value ?? null;
}

async function getSessionContext(token: string | null) {
  if (!token || !hasAdminAuthConfig()) {
    return null;
  }

  const session = await getPrisma().adminSession.findUnique({
    where: {
      tokenHash: hashSessionToken(token),
    },
    include: {
      user: true,
    },
  });

  if (!session) {
    return null;
  }

  const now = new Date();

  if (session.revokedAt || session.expiresAt <= now) {
    return null;
  }

  return session;
}

export async function getAdminAuthState(): Promise<AdminAuthState> {
  if (!hasAdminAuthConfig()) {
    return { status: "setup-required" };
  }

  try {
    const session = await getSessionContext(await getSessionTokenFromCookies());

    if (!session) {
      return { status: "unauthenticated" };
    }

    if (session.user.role !== AdminRole.ADMIN || session.user.status !== AdminStatus.ACTIVE) {
      return { status: "forbidden", email: session.user.email };
    }

    return {
      status: "authenticated",
      email: session.user.email,
      userId: session.user.id,
      adminUser: toAdminUser(session.user),
    };
  } catch {
    return { status: "setup-required" };
  }
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

export async function requireAdminApi(request: Request): Promise<AdminApiFailure> {
  if (!hasAdminAuthConfig()) {
    return {
      ok: false,
      response: jsonNoStore(
        { message: "Database admin belum dikonfigurasi. Lengkapi PostgreSQL dan ADMIN_SESSION_SECRET lalu coba lagi." },
        { status: 503 },
      ),
    };
  }

  if (!hasValidSameOrigin(request)) {
    return {
      ok: false,
      response: jsonNoStore({ message: "Origin request tidak diizinkan." }, { status: 403 }),
    };
  }

  try {
    const session = await getSessionContext(await getSessionTokenFromCookies());

    if (!session) {
      return {
        ok: false,
        response: jsonNoStore({ message: "Sesi login tidak ditemukan." }, { status: 401 }),
      };
    }

    if (session.user.role !== AdminRole.ADMIN || session.user.status !== AdminStatus.ACTIVE) {
      return {
        ok: false,
        response: jsonNoStore({ message: "Akun ini tidak memiliki akses admin aktif." }, { status: 403 }),
      };
    }

    return {
      ok: true,
      userId: session.user.id,
      email: session.user.email,
      adminUser: toAdminUser(session.user),
      sessionId: session.id,
      requestInfo: getRequestClientInfo(request),
    };
  } catch {
    return {
      ok: false,
      response: jsonNoStore({ message: "Koneksi database admin sedang bermasalah." }, { status: 503 }),
    };
  }
}

export async function createAdminSession(userId: string, request: Request) {
  const token = createSessionToken();
  const expiresAt = new Date(Date.now() + getSessionDurationMs());
  const requestInfo = getRequestClientInfo(request);

  const session = await getPrisma().adminSession.create({
    data: {
      userId,
      tokenHash: hashSessionToken(token),
      expiresAt,
      lastSeenAt: new Date(),
      ipAddress: requestInfo.ipAddress,
      userAgent: requestInfo.userAgent,
    },
  });

  return {
    sessionId: session.id,
    token,
    expiresAt,
    requestInfo,
  };
}

export async function revokeAdminSession(token: string | null) {
  if (!token || !hasAdminAuthConfig()) {
    return;
  }

  await getPrisma().adminSession.updateMany({
    where: {
      tokenHash: hashSessionToken(token),
      revokedAt: null,
    },
    data: {
      revokedAt: new Date(),
    },
  });
}

export async function getCurrentAdminSessionToken() {
  return getSessionTokenFromCookies();
}

export function attachAdminSessionCookie(response: NextResponse, token: string, expiresAt: Date) {
  response.cookies.set({
    name: ADMIN_SESSION_COOKIE,
    value: token,
    httpOnly: true,
    sameSite: "lax",
    secure: isSecureCookie(),
    path: "/",
    expires: expiresAt,
  });
}

export function clearAdminSessionCookie(response: NextResponse) {
  response.cookies.set({
    name: ADMIN_SESSION_COOKIE,
    value: "",
    httpOnly: true,
    sameSite: "lax",
    secure: isSecureCookie(),
    path: "/",
    expires: new Date(0),
  });
}
