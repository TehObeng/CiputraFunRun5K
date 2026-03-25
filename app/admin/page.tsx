import type { Metadata } from "next";

import { CmsEditor } from "@/components/admin/cms-editor";
import { LoginPanel } from "@/components/admin/login-panel";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getSiteContent } from "@/lib/site-content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "CMS Admin",
  description: "Panel admin sederhana untuk mengelola landing page Fun Run.",
};

export default async function AdminPage() {
  const authenticated = await isAdminAuthenticated();

  if (!authenticated) {
    return <LoginPanel />;
  }

  const content = await getSiteContent();

  return <CmsEditor initialContent={content} />;
}

