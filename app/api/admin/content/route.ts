import type { Prisma } from "@prisma/client";

import { getPrisma } from "@/lib/prisma";
import { recordAuditLog } from "@/lib/audit-log";
import { requireAdminApi } from "@/lib/admin-session";
import { jsonNoStore } from "@/lib/http-security";
import { getDefaultContent, getLandingPageContentRecord, normalizeLandingPageContent, SITE_CONTENT_SLUG } from "@/lib/site-content";
import { landingPageContentSchema } from "@/lib/site-schema";

export async function GET(request: Request) {
  const auth = await requireAdminApi(request);

  if (!auth.ok) {
    return auth.response;
  }

  const record = await getLandingPageContentRecord();

  if (!record?.content) {
    return jsonNoStore({ data: getDefaultContent() });
  }

  return jsonNoStore({
    data: normalizeLandingPageContent(record.content) ?? getDefaultContent(),
  });
}

export async function PUT(request: Request) {
  const auth = await requireAdminApi(request);

  if (!auth.ok) {
    return auth.response;
  }

  const body = await request.json().catch(() => null);
  const parsed = landingPageContentSchema.safeParse(body);

  if (!parsed.success) {
    return jsonNoStore(
      {
        message: "Validasi konten gagal. Periksa kembali field yang masih kosong atau salah format.",
        errors: parsed.error.flatten(),
      },
      { status: 400 },
    );
  }

  try {
    const updatedRecord = await getPrisma().$transaction(async (tx) => {
      const existing = await tx.siteContent.findUnique({
        where: { slug: SITE_CONTENT_SLUG },
        select: { id: true, currentRevision: true },
      });

      const siteContent = existing
        ? await tx.siteContent.update({
            where: { slug: SITE_CONTENT_SLUG },
            data: {
              content: parsed.data,
              currentRevision: {
                increment: 1,
              },
              updatedById: auth.userId,
            },
            select: {
              id: true,
              content: true,
              currentRevision: true,
            },
          })
        : await tx.siteContent.create({
            data: {
              slug: SITE_CONTENT_SLUG,
              content: parsed.data,
              currentRevision: 1,
              updatedById: auth.userId,
            },
            select: {
              id: true,
              content: true,
              currentRevision: true,
            },
          });

      await tx.siteContentRevision.create({
        data: {
          siteContentId: siteContent.id,
          revision: siteContent.currentRevision,
          content: siteContent.content as Prisma.InputJsonValue,
          createdById: auth.userId,
        },
      });

      await recordAuditLog(tx, {
        adminUserId: auth.userId,
        action: existing ? "site_content.updated" : "site_content.created",
        entityType: "site_content",
        entityId: siteContent.id,
        metadata: {
          slug: SITE_CONTENT_SLUG,
          revision: siteContent.currentRevision,
        },
        ipAddress: auth.requestInfo.ipAddress,
        userAgent: auth.requestInfo.userAgent,
      });

      return siteContent;
    });

    return jsonNoStore({
      message: "Konten landing page berhasil disimpan.",
      data: normalizeLandingPageContent(updatedRecord.content) ?? parsed.data,
    });
  } catch {
    return jsonNoStore({ message: "Gagal menyimpan perubahan ke PostgreSQL." }, { status: 500 });
  }
}
