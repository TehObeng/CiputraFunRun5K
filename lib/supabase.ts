import { createClient } from "@supabase/supabase-js";

import { getAdminSupabaseEnv, getPublicSupabaseEnv } from "@/lib/env";

export const SITE_CONTENT_ROW_ID = "00000000-0000-0000-0000-000000000001";

export function getSupabasePublicClient() {
  const config = getPublicSupabaseEnv();

  if (!config) {
    return null;
  }

  return createClient(config.NEXT_PUBLIC_SUPABASE_URL, config.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
    auth: { persistSession: false },
  });
}

export function getSupabaseAdminClient() {
  const config = getAdminSupabaseEnv();

  if (!config) {
    return null;
  }

  return createClient(config.NEXT_PUBLIC_SUPABASE_URL, config.SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false },
  });
}
