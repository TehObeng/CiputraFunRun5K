import type { Metadata } from "next";

import { CmsEditor } from "@/components/admin/cms-editor";
import { requireAdminPage } from "@/lib/admin-session";
import { getLandingPageContent } from "@/lib/site-content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin CMS",
  description: "Panel admin Supabase untuk mengelola landing page Citraland Fun Run 5K Batam.",
};

export default async function AdminPage() {
  const admin = await requireAdminPage();
  const content = await getLandingPageContent();

  return <CmsEditor initialContent={content} adminEmail={admin.email ?? admin.adminUser.email} />;
}
