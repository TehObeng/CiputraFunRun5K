import { ImageResponse } from "next/og";

import { getLandingPageContent } from "@/lib/site-content";
import { formatRupiah } from "@/lib/utils";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export const alt = "Citraland Fun Run 5K Batam";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const content = await getLandingPageContent();
  const lowestPrice = Math.min(...content.pricing.cards.map((card) => card.price));

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          padding: "48px",
          background:
            "radial-gradient(circle at 18% 18%, rgba(208,255,54,0.18), transparent 28%), radial-gradient(circle at 84% 14%, rgba(255,107,61,0.26), transparent 24%), linear-gradient(135deg, #081120 0%, #10233b 50%, #1d312d 100%)",
          color: "#ffffff",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "36px",
            padding: "40px",
            background: "rgba(8, 17, 32, 0.42)",
            justifyContent: "space-between",
            gap: "32px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", maxWidth: "700px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  fontSize: "24px",
                  fontWeight: 700,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "#d0ff36",
                }}
              >
                <div
                  style={{
                    width: "14px",
                    height: "14px",
                    borderRadius: "999px",
                    background: "#ff9a1f",
                  }}
                />
                {content.brand.eyebrow}
              </div>

              <div style={{ fontSize: "84px", lineHeight: 1, fontWeight: 700 }}>{content.brand.name}</div>
              <div style={{ fontSize: "34px", lineHeight: 1.3, color: "rgba(255,255,255,0.78)" }}>{content.hero.title}</div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div style={{ fontSize: "24px", lineHeight: 1.4, color: "rgba(255,255,255,0.72)" }}>{content.hero.description}</div>
              <div style={{ display: "flex", gap: "18px", fontSize: "22px", color: "#d0ff36" }}>
                <span>{content.brand.locationLabel}</span>
                <span>Early Bird {formatRupiah(lowestPrice)}</span>
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              width: "330px",
              borderRadius: "30px",
              padding: "22px",
              background: "linear-gradient(180deg, #fffdf9 0%, #f7f1e7 100%)",
              color: "#0b1628",
            }}
          >
            <div style={{ fontSize: "22px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#ff6b3d" }}>
              {content.hero.supportingLabel}
            </div>
            <div
              style={{
                display: "flex",
                width: "100%",
                height: "220px",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                borderRadius: "24px",
                background: "#ffffff",
                padding: "18px",
              }}
            >
              <img src={content.brand.logo.publicUrl} alt={content.brand.logo.alt} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
            </div>
            <div style={{ fontSize: "28px", lineHeight: 1.25, fontWeight: 700 }}>{content.hero.supportingTitle}</div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
