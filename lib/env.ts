import { isAbsolute, resolve } from "node:path";

import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().optional(),
  SITE_URL: z.string().optional(),
  ADMIN_SESSION_SECRET: z.string().optional(),
  ADMIN_SESSION_TTL_HOURS: z.string().optional(),
  UPLOAD_DIR: z.string().optional(),
});

const rawEnv = envSchema.parse({
  DATABASE_URL: process.env.DATABASE_URL,
  SITE_URL: process.env.SITE_URL,
  ADMIN_SESSION_SECRET: process.env.ADMIN_SESSION_SECRET,
  ADMIN_SESSION_TTL_HOURS: process.env.ADMIN_SESSION_TTL_HOURS,
  UPLOAD_DIR: process.env.UPLOAD_DIR,
});

function toValidUrl(value?: string | null) {
  const trimmed = value?.trim();

  if (!trimmed) {
    return null;
  }

  const parsed = z.string().url().safeParse(trimmed);
  return parsed.success ? parsed.data.replace(/\/$/, "") : null;
}

function toNonEmptyText(...values: Array<string | null | undefined>) {
  for (const value of values) {
    const trimmed = value?.trim();

    if (trimmed) {
      return trimmed;
    }
  }

  return null;
}

function toPositiveInteger(value?: string | null, fallback = 168) {
  const parsed = Number.parseInt(value?.trim() ?? "", 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function resolveUploadDir(value?: string | null) {
  const trimmed = value?.trim();

  if (!trimmed) {
    return resolve(/* turbopackIgnore: true */ process.cwd(), "public", "uploads");
  }

  return isAbsolute(trimmed) ? trimmed : resolve(/* turbopackIgnore: true */ process.cwd(), trimmed);
}

const defaultSessionSecret =
  process.env.NODE_ENV === "production" ? null : "dev-admin-session-secret-change-me";

export const env = {
  siteUrl: toValidUrl(rawEnv.SITE_URL) ?? "http://localhost:3000",
  databaseUrl: toNonEmptyText(rawEnv.DATABASE_URL),
  adminSessionSecret: toNonEmptyText(rawEnv.ADMIN_SESSION_SECRET, defaultSessionSecret),
  adminSessionTtlHours: toPositiveInteger(rawEnv.ADMIN_SESSION_TTL_HOURS),
  uploadDir: resolveUploadDir(rawEnv.UPLOAD_DIR),
};

export function hasDatabaseConfig() {
  return Boolean(env.databaseUrl);
}

export function hasAdminAuthConfig() {
  return Boolean(env.databaseUrl && env.adminSessionSecret);
}
