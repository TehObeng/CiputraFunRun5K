import { NextResponse } from "next/server";

import { isAdminAuthenticated } from "@/lib/admin-auth";
import { readSiteContent, saveSiteContent } from "@/lib/site-content";
import { siteContentSchema } from "@/lib/site-schema";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ message: "Tidak memiliki akses." }, { status: 401 });
  }

  const content = await readSiteContent();

  return NextResponse.json({ data: content });
}

export async function PUT(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ message: "Sesi admin tidak valid." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const parsed = siteContentSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        message: "Validasi gagal. Pastikan semua kolom penting telah terisi benar.",
        errors: parsed.error.flatten(),
      },
      { status: 400 },
    );
  }

  const saved = await saveSiteContent(parsed.data);

  return NextResponse.json({
    message: "Konten landing page berhasil disimpan.",
    data: saved,
  });
}
