import { env } from "@/lib/env";

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function formatRupiah(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function getSiteUrl() {
  return env.siteUrl;
}

export function isAbsoluteUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export function toAbsoluteUrl(value: string) {
  if (isAbsoluteUrl(value)) {
    return value;
  }

  if (value.startsWith("/")) {
    return `${getSiteUrl()}${value}`;
  }

  return `${getSiteUrl()}/${value}`;
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getFileExtension(filename: string) {
  const segments = filename.split(".");
  return segments.length > 1 ? segments[segments.length - 1].toLowerCase() : "";
}
