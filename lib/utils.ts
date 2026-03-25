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
  const siteUrl = process.env.SITE_URL?.trim();

  if (!siteUrl) {
    return "http://localhost:3000";
  }

  try {
    return new URL(siteUrl).toString().replace(/\/$/, "");
  } catch {
    return "http://localhost:3000";
  }
}

