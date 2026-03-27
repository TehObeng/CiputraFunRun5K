import { NextResponse } from "next/server";

import { requireAdminApi } from "@/lib/admin-session";
import { getDefaultContent, normalizeLandingPageContent } from "@/lib/site-content";
import { landingPageContentSchema } from "@/lib/site-schema";
import { SITE_CONTENT_SLUG } from "@/lib/supabase";

export async function GET() {
  const auth = await requireAdminApi();

  if (!auth.ok) {
    return auth.response;
  }

  const { data, error } = await auth.supabase
    .from("site_content")
    .select("content")
    .eq("slug", SITE_CONTENT_SLUG)
    .maybeSingle();

  if (error || !data?.content) {
    return NextResponse.json({ data: getDefaultContent() });
  }

  return NextResponse.json({
    data: normalizeLandingPageContent(data.content) ?? getDefaultContent(),
  });
}

export async function PUT(request: Request) {
  const auth = await requireAdminApi();

  if (!auth.ok) {
    return auth.response;
  }

  const body = await request.json().catch(() => null);
  const parsed = landingPageContentSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        message: "Validasi konten gagal. Periksa kembali field yang masih kosong atau salah format.",
        errors: parsed.error.flatten(),
      },
      { status: 400 },
    );
  }

  const payload = {
    slug: SITE_CONTENT_SLUG,
    content: parsed.data,
    updated_at: new Date().toISOString(),
    updated_by: auth.userId,
  };

  const { data, error } = await auth.supabase
    .from("site_content")
    .upsert(payload, {
      onConflict: "slug",
      ignoreDuplicates: false,
    })
    .select("content")
    .single();

  if (error) {
    return NextResponse.json({ message: "Gagal menyimpan perubahan ke Supabase." }, { status: 500 });
  }

  return NextResponse.json({
    message: "Konten landing page berhasil disimpan.",
    data: normalizeLandingPageContent(data.content) ?? parsed.data,
  });
}
