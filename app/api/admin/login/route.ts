import { z } from "zod";

import { createAdminSession, isAdminAuthConfigured, verifyAdminCredentials } from "@/lib/admin-auth";
import { hasValidSameOrigin, jsonNoStore } from "@/lib/http-security";

const loginSchema = z.object({
  username: z.string().trim().min(1, "Username wajib diisi."),
  password: z.string().trim().min(1, "Password wajib diisi."),
});

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 10;
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

function getClientIp(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
}

function isRateLimited(request: Request) {
  const ip = getClientIp(request);
  const now = Date.now();
  const current = rateLimitStore.get(ip);

  if (!current || current.resetAt < now) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (current.count >= RATE_LIMIT_MAX) {
    return true;
  }

  current.count += 1;
  rateLimitStore.set(ip, current);
  return false;
}

export async function POST(request: Request) {
  if (!hasValidSameOrigin(request)) {
    return jsonNoStore({ message: "Origin request tidak valid." }, { status: 403 });
  }

  if (!isAdminAuthConfigured()) {
    return jsonNoStore(
      { message: "Admin auth belum dikonfigurasi. Set ADMIN_USERNAME, ADMIN_PASSWORD, dan CMS_SESSION_SECRET." },
      { status: 503 },
    );
  }

  if (isRateLimited(request)) {
    return jsonNoStore({ message: "Terlalu banyak percobaan login." }, { status: 429 });
  }

  const body = await request.json().catch(() => null);
  const parsed = loginSchema.safeParse(body);

  if (!parsed.success) {
    return jsonNoStore({ message: "Username dan password wajib diisi." }, { status: 400 });
  }

  const isValid = await verifyAdminCredentials(parsed.data.username, parsed.data.password);

  if (!isValid) {
    return jsonNoStore({ message: "Login gagal. Periksa kembali username dan password." }, { status: 401 });
  }

  await createAdminSession();

  return jsonNoStore({ message: "Login berhasil." });
}
