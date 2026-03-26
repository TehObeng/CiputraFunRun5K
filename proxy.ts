import type { NextRequest } from "next/server";

import { updateSupabaseSession } from "@/lib/supabase";

export async function proxy(request: NextRequest) {
  return updateSupabaseSession(request);
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
