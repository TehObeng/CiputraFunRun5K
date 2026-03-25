import { isAdminAuthenticated } from "@/lib/admin-auth";
import { hasValidSameOrigin, jsonNoStore } from "@/lib/http-security";
import { getDefaultContent } from "@/lib/site-content";
import { siteContentSchema } from "@/lib/site-schema";
import { SITE_CONTENT_ROW_ID, supabaseAdminClient } from "@/lib/supabase";

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 30;
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

export async function GET(request: Request) {
  if (isRateLimited(request)) {
    return jsonNoStore({ message: "Terlalu banyak request. Coba lagi sebentar." }, { status: 429 });
  }

  if (!(await isAdminAuthenticated())) {
    return jsonNoStore({ message: "Tidak memiliki akses." }, { status: 401 });
  }
  if (!supabaseAdminClient) {
    return jsonNoStore({ message: "Supabase admin belum dikonfigurasi." }, { status: 503 });
  }

  const { data, error } = await supabaseAdminClient
    .from("site_content")
    .select("content")
    .eq("id", SITE_CONTENT_ROW_ID)
    .single();

  if (error || !data?.content) {
    return jsonNoStore({ data: getDefaultContent() });
  }

  const parsed = siteContentSchema.safeParse(data.content);

  return jsonNoStore({
    data: parsed.success ? parsed.data : getDefaultContent(),
  });
}

export async function PUT(request: Request) {
  if (!hasValidSameOrigin(request)) {
    return jsonNoStore({ message: "Origin request tidak valid." }, { status: 403 });
  }

  if (isRateLimited(request)) {
    return jsonNoStore({ message: "Terlalu banyak request. Coba lagi sebentar." }, { status: 429 });
  }

  if (!(await isAdminAuthenticated())) {
    return jsonNoStore({ message: "Sesi admin tidak valid." }, { status: 401 });
  }
  if (!supabaseAdminClient) {
    return jsonNoStore({ message: "Supabase admin belum dikonfigurasi." }, { status: 503 });
  }

  const body = await request.json().catch(() => null);
  const parsed = siteContentSchema.safeParse(body);

  if (!parsed.success) {
    return jsonNoStore(
      {
        message: "Validasi gagal. Pastikan semua kolom penting telah terisi benar.",
        errors: parsed.error.flatten(),
      },
      { status: 400 },
    );
  }

  const payload = {
    ...parsed.data,
    googleFormUrl: "https://forms.gle/tEz7uZ2i6y5Gfsbv8",
  };

  const { data, error } = await supabaseAdminClient
    .from("site_content")
    .update({ content: payload, updated_at: new Date().toISOString() })
    .eq("id", SITE_CONTENT_ROW_ID)
    .select("content")
    .single();

  if (error) {
    return jsonNoStore({ message: "Gagal menyimpan ke Supabase." }, { status: 500 });
  }

  return jsonNoStore({
    message: "Konten landing page berhasil disimpan.",
    data: data.content,
  });
}
