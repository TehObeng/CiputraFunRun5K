import { mkdir, writeFile } from "node:fs/promises";
import { randomUUID } from "node:crypto";
import { relative, resolve } from "node:path";

import { requireAdminApi } from "@/lib/admin-session";
import { recordAuditLog } from "@/lib/audit-log";
import { env } from "@/lib/env";
import { jsonNoStore } from "@/lib/http-security";
import { getPrisma } from "@/lib/prisma";
import { getFileExtension, slugify } from "@/lib/utils";

const allowedMimeTypes = new Set(["image/png", "image/jpeg", "image/webp", "image/svg+xml"]);
const uploadTargets = new Map([
  ["brand.logo", ["brand", "logo"]],
  ["seo.ogImage", ["seo", "og-image"]],
]);
const maxFileSizeBytes = 5 * 1024 * 1024;

export async function POST(request: Request) {
  const auth = await requireAdminApi(request);

  if (!auth.ok) {
    return auth.response;
  }

  const formData = await request.formData();
  const target = String(formData.get("target") ?? "");
  const alt = String(formData.get("alt") ?? "").trim();
  const file = formData.get("file");
  const targetSegments = uploadTargets.get(target);

  if (!targetSegments) {
    return jsonNoStore({ message: "Target upload tidak dikenal." }, { status: 400 });
  }

  if (!(file instanceof File)) {
    return jsonNoStore({ message: "File gambar wajib dipilih." }, { status: 400 });
  }

  if (!allowedMimeTypes.has(file.type)) {
    return jsonNoStore({ message: "Format gambar belum didukung." }, { status: 400 });
  }

  if (file.size > maxFileSizeBytes) {
    return jsonNoStore({ message: "Ukuran gambar melebihi batas 5 MB." }, { status: 400 });
  }

  const publicRoot = resolve(process.cwd(), "public");
  const uploadRoot = resolve(env.uploadDir);

  if (!uploadRoot.startsWith(publicRoot)) {
    return jsonNoStore(
      { message: "UPLOAD_DIR harus berada di dalam folder public agar aset dapat dilayani oleh Next.js." },
      { status: 500 },
    );
  }

  const extension = getFileExtension(file.name) || "png";
  const safeBaseName = slugify(file.name.replace(/\.[^.]+$/, "")) || "asset";
  const filename = `${safeBaseName}-${randomUUID()}.${extension}`;
  const targetDirectory = resolve(uploadRoot, ...targetSegments);
  const absolutePath = resolve(targetDirectory, filename);
  const buffer = Buffer.from(await file.arrayBuffer());

  await mkdir(targetDirectory, { recursive: true });
  await writeFile(absolutePath, buffer);

  const relativeToPublic = relative(publicRoot, absolutePath).replace(/\\/g, "/");
  const publicUrl = `/${relativeToPublic}`;
  const prisma = getPrisma();

  await recordAuditLog(prisma, {
    adminUserId: auth.userId,
    action: "site_media.uploaded",
    entityType: "site_media",
    entityId: publicUrl,
    metadata: {
      target,
      fileName: file.name,
      mimeType: file.type,
      size: file.size,
    },
    ipAddress: auth.requestInfo.ipAddress,
    userAgent: auth.requestInfo.userAgent,
  });

  return jsonNoStore({
    message: "Gambar berhasil diunggah.",
    asset: {
      path: publicUrl,
      publicUrl,
      alt: alt || file.name,
    },
  });
}
