import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { LoginPanel } from "@/components/admin/login-panel";
import { getAdminAuthState } from "@/lib/admin-session";

export const metadata: Metadata = {
  title: "Admin Login",
  description: "Masuk ke CMS Citraland Fun Run 5K Batam.",
};

export default async function AdminLoginPage() {
  const authState = await getAdminAuthState();

  if (authState.status === "authenticated") {
    redirect("/admin");
  }

  if (authState.status === "forbidden") {
    redirect("/admin/unauthorized");
  }

  return <LoginPanel setupRequired={authState.status === "setup-required"} />;
}
