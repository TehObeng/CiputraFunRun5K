import { NextResponse } from "next/server";

import { hasSupabaseConfig } from "@/lib/env";
import { createServerSupabaseClient } from "@/lib/supabase";

export async function POST() {
  if (hasSupabaseConfig()) {
    const supabase = await createServerSupabaseClient();
    await supabase.auth.signOut();
  }

  return NextResponse.json({ message: "Logout berhasil." });
}
