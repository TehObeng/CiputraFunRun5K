import { z } from "zod";

const publicSupabaseSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
});

const adminSupabaseSchema = publicSupabaseSchema.extend({
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
});

const adminAuthSchema = z.object({
  ADMIN_PASSWORD: z.string().min(1),
  ADMIN_USERNAME: z.string().min(1).default("admin"),
  CMS_SESSION_SECRET: z.string().min(16).default("ganti-session-secret-sebelum-produksi"),
});

export function getPublicSupabaseEnv() {
  const result = publicSupabaseSchema.safeParse({
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  });

  return result.success ? result.data : null;
}

export function getAdminSupabaseEnv() {
  const result = adminSupabaseSchema.safeParse({
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
  });

  return result.success ? result.data : null;
}

export function getAdminAuthEnv() {
  const result = adminAuthSchema.safeParse({
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
    ADMIN_USERNAME: process.env.ADMIN_USERNAME,
    CMS_SESSION_SECRET: process.env.CMS_SESSION_SECRET,
  });

  return result.success
    ? result.data
    : {
        ADMIN_PASSWORD: "funrun123",
        ADMIN_USERNAME: "admin",
        CMS_SESSION_SECRET: "ganti-session-secret-sebelum-produksi",
      };
}
