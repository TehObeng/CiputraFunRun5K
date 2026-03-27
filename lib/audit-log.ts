import type { Prisma, PrismaClient } from "@prisma/client";

type AuditWriter = PrismaClient | Prisma.TransactionClient;

type AuditLogInput = {
  action: string;
  entityType: string;
  entityId?: string | null;
  adminUserId?: string | null;
  metadata?: Prisma.InputJsonValue;
  ipAddress?: string | null;
  userAgent?: string | null;
};

export async function recordAuditLog(client: AuditWriter, input: AuditLogInput) {
  await client.auditLog.create({
    data: {
      action: input.action,
      entityType: input.entityType,
      entityId: input.entityId ?? null,
      adminUserId: input.adminUserId ?? null,
      metadata: input.metadata,
      ipAddress: input.ipAddress ?? null,
      userAgent: input.userAgent ?? null,
    },
  });
}
