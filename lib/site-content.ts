import { promises as fs } from "node:fs";
import path from "node:path";

import { getDefaultSiteContent, GOOGLE_FORM_PLACEHOLDER } from "@/lib/default-content";
import { siteContentSchema, type SiteContent } from "@/lib/site-schema";

const CONTENT_FILE_PATH = path.join(process.cwd(), "data", "site-content.json");

export function resolveRegistrationUrl(content?: Pick<SiteContent, "googleFormUrl">) {
  return (
    content?.googleFormUrl?.trim() ||
    process.env.GOOGLE_FORM_URL?.trim() ||
    GOOGLE_FORM_PLACEHOLDER
  );
}

export async function readSiteContent(): Promise<SiteContent> {
  const fallback = getDefaultSiteContent();

  try {
    const raw = await fs.readFile(CONTENT_FILE_PATH, "utf-8");
    const parsed = JSON.parse(raw) as unknown;
    const result = siteContentSchema.safeParse(parsed);

    if (result.success) {
      return {
        ...result.data,
        googleFormUrl: resolveRegistrationUrl(result.data),
      };
    }

    return fallback;
  } catch {
    return fallback;
  }
}

export async function saveSiteContent(content: SiteContent) {
  const validated = siteContentSchema.parse({
    ...content,
    googleFormUrl: resolveRegistrationUrl(content),
  });

  await fs.mkdir(path.dirname(CONTENT_FILE_PATH), { recursive: true });
  await fs.writeFile(CONTENT_FILE_PATH, `${JSON.stringify(validated, null, 2)}\n`, "utf-8");

  return validated;
}

export { CONTENT_FILE_PATH };
