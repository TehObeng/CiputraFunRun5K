import { PrismaClient } from "@prisma/client";

import { env, hasDatabaseConfig } from "@/lib/env";

declare global {
  var prisma: PrismaClient | undefined;
}

function createPrismaClient() {
  if (!hasDatabaseConfig() || !env.databaseUrl) {
    throw new Error("DATABASE_URL is not configured.");
  }

  return new PrismaClient({
    datasources: {
      db: {
        url: env.databaseUrl,
      },
    },
  });
}

export function getPrisma() {
  if (!globalThis.prisma) {
    globalThis.prisma = createPrismaClient();
  }

  return globalThis.prisma;
}
