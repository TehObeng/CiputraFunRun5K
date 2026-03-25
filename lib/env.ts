import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url().optional(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1).optional(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1).optional(),
  ADMIN_PASSWORD: z.string().min(8).optional(),
  ADMIN_USERNAME: z.string().min(1).optional(),
  CMS_SESSION_SECRET: z.string().min(16).optional(),
  SITE_URL: z.string().url().optional(),
});

export const env = envSchema.parse({
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
  ADMIN_USERNAME: process.env.ADMIN_USERNAME,
  CMS_SESSION_SECRET: process.env.CMS_SESSION_SECRET,
  SITE_URL: process.env.SITE_URL,
});

function hasValue(value: string | undefined) {
  return Boolean(value?.trim());
}

function hasPlaceholderValue(value: string | undefined, placeholders: string[]) {
  if (!value) return true;
  const normalized = value.trim().toLowerCase();
  return placeholders.some((placeholder) => normalized === placeholder.toLowerCase());
}

export function hasPublicSupabaseEnv() {
  return Boolean(env.NEXT_PUBLIC_SUPABASE_URL && env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

export function hasAdminSupabaseEnv() {
  return Boolean(env.NEXT_PUBLIC_SUPABASE_URL && env.SUPABASE_SERVICE_ROLE_KEY);
}

export function hasAdminAuthEnv() {
  const isUsernameValid = hasValue(env.ADMIN_USERNAME);
  const isPasswordValid = hasValue(env.ADMIN_PASSWORD) && !hasPlaceholderValue(env.ADMIN_PASSWORD, ["change-me-admin-password", "your-secret-password"]);
  const isSessionSecretValid =
    hasValue(env.CMS_SESSION_SECRET) &&
    !hasPlaceholderValue(env.CMS_SESSION_SECRET, ["ganti-session-secret-sebelum-produksi", "replace-with-a-long-random-secret"]);

  return isUsernameValid && isPasswordValid && isSessionSecretValid;
}
