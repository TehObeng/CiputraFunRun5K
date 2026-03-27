import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().optional(),
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: z.string().optional(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().optional(),
  SITE_URL: z.string().optional(),
});

const rawEnv = envSchema.parse({
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  SITE_URL: process.env.SITE_URL,
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

export const env = {
  siteUrl: toValidUrl(rawEnv.SITE_URL) ?? "http://localhost:3000",
  supabaseUrl: toValidUrl(rawEnv.NEXT_PUBLIC_SUPABASE_URL),
  supabasePublishableKey: toNonEmptyText(
    rawEnv.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    rawEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  ),
};

export function hasSupabaseConfig() {
  return Boolean(env.supabaseUrl && env.supabasePublishableKey);
}

export function getSupabaseConfig() {
  if (!hasSupabaseConfig() || !env.supabaseUrl || !env.supabasePublishableKey) {
    throw new Error("Supabase environment variables are not configured.");
  }

  return {
    url: env.supabaseUrl,
    publishableKey: env.supabasePublishableKey,
  };
}
