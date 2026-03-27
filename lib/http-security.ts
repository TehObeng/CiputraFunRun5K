import { NextResponse } from "next/server";

import { env } from "@/lib/env";

function getAllowedOrigins(request: Request) {
  const origins = new Set<string>();

  try {
    origins.add(new URL(request.url).origin);
  } catch {
    // no-op
  }

  if (env.siteUrl) {
    try {
      origins.add(new URL(env.siteUrl).origin);
    } catch {
      // no-op
    }
  }

  return origins;
}

export function hasValidSameOrigin(request: Request) {
  const origin = request.headers.get("origin");

  if (!origin) {
    return true;
  }

  return getAllowedOrigins(request).has(origin);
}

export function jsonNoStore(body: unknown, init?: ResponseInit) {
  const response = NextResponse.json(body, init);
  response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  response.headers.set("Pragma", "no-cache");
  response.headers.set("Expires", "0");

  return response;
}
