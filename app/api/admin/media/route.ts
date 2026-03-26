import { randomUUID } from "node:crypto";

import { NextResponse } from "next/server";

import { requireAdminApi } from "@/lib/admin-session";
import { getFileExtension, slugify } from "@/lib/utils";
import { SITE_MEDIA_BUCKET } from "@/lib/supabase";

const allowedMimeTypes = new Set(["image/png", "image/jpeg", "image/webp", "image/svg+xml"]);
const uploadTargets = new Set(["brand.logo", "seo.ogImage"]);
const maxFileSizeBytes = 5 * 1024 * 1024;

export async function POST(request: Request) {
  const auth = await requireAdminApi();

  if (!auth.ok) {
    return auth.response;
  }

  const formData = await request.formData();
  const target = String(formData.get("target") ?? "");
  const alt = String(formData.get("alt") ?? "").trim();
  const file = formData.get("file");

  if (!uploadTargets.has(target)) {
    return NextResponse.json({ message: "Target upload tidak dikenal." }, { status: 400 });
  }

  if (!(file instanceof File)) {
    return NextResponse.json({ message: "File gambar wajib dipilih." }, { status: 400 });
  }

  if (!allowedMimeTypes.has(file.type)) {
    return NextResponse.json({ message: "Format gambar belum didukung." }, { status: 400 });
  }

  if (file.size > maxFileSizeBytes) {
    return NextResponse.json({ message: "Ukuran gambar melebihi batas 5 MB." }, { status: 400 });
  }

  const extension = getFileExtension(file.name) || "png";
  const safeBaseName = slugify(file.name.replace(/\.[^.]+$/, "")) || "asset";
  const uploadPath = `${target.replace(".", "/")}/${safeBaseName}-${randomUUID()}.${extension}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  const { data, error } = await auth.supabase.storage.from(SITE_MEDIA_BUCKET).upload(uploadPath, buffer, {
    contentType: file.type,
    upsert: false,
    cacheControl: "3600",
  });

  if (error || !data) {
    return NextResponse.json({ message: "Gagal mengunggah gambar ke Supabase Storage." }, { status: 500 });
  }

  const publicUrl = auth.supabase.storage.from(SITE_MEDIA_BUCKET).getPublicUrl(data.path).data.publicUrl;

  return NextResponse.json({
    message: "Gambar berhasil diunggah.",
    asset: {
      path: data.path,
      publicUrl,
      alt: alt || file.name,
    },
  });
}
