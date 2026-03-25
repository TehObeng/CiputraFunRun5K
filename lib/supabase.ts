import { createClient } from "@supabase/supabase-js";

import { env, hasAdminSupabaseEnv, hasPublicSupabaseEnv } from "@/lib/env";

export const supabasePublicClient = hasPublicSupabaseEnv()
  ? createClient(env.NEXT_PUBLIC_SUPABASE_URL!, env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
      auth: { persistSession: false },
    })
  : null;

export const supabaseAdminClient = hasAdminSupabaseEnv()
  ? createClient(env.NEXT_PUBLIC_SUPABASE_URL!, env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
    })
  : null;

export const SITE_CONTENT_ROW_ID = "00000000-0000-0000-0000-000000000001";
