import { getDefaultSiteContent } from "@/lib/default-content";
import { siteContentSchema, type SiteContent } from "@/lib/site-schema";
import { SITE_CONTENT_ROW_ID, supabasePublicClient } from "@/lib/supabase";

const FIXED_REGISTRATION_URL = "https://forms.gle/tEz7uZ2i6y5Gfsbv8";

/** Returns the fixed Google Form registration URL used by all public CTAs. */
export function resolveRegistrationUrl() {
  return FIXED_REGISTRATION_URL;
}

/** Returns clean default content. */
export function getDefaultContent(): SiteContent {
  const fallback = getDefaultSiteContent();
  return {
    ...fallback,
    googleFormUrl: FIXED_REGISTRATION_URL,
  };
}

/** Loads site content from Supabase with schema validation and safe fallback. */
export async function getSiteContent(): Promise<SiteContent> {
  const fallback = getDefaultContent();
  if (!supabasePublicClient) {
    return fallback;
  }

  const { data, error } = await supabasePublicClient
    .from("site_content")
    .select("content")
    .eq("id", SITE_CONTENT_ROW_ID)
    .single();

  if (error || !data?.content) {
    return fallback;
  }

  const parsed = siteContentSchema.safeParse(data.content);

  if (!parsed.success) {
    return fallback;
  }

  return {
    ...parsed.data,
    googleFormUrl: FIXED_REGISTRATION_URL,
  };
}

export { FIXED_REGISTRATION_URL };
