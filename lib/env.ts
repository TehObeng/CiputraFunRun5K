import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
  ADMIN_PASSWORD: z.string().min(1),
  ADMIN_USERNAME: z.string().min(1).default("admin"),
  CMS_SESSION_SECRET: z.string().min(16).default("ganti-session-secret-sebelum-produksi"),
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
