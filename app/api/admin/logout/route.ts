import { clearAdminSession } from "@/lib/admin-auth";
import { hasValidSameOrigin, jsonNoStore } from "@/lib/http-security";

export async function POST(request: Request) {
  if (!hasValidSameOrigin(request)) {
    return jsonNoStore({ message: "Origin request tidak valid." }, { status: 403 });
  }

  await clearAdminSession();

  return jsonNoStore({ message: "Logout berhasil." });
}
