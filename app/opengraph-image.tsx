import { ImageResponse } from "next/og";

import { readSiteContent } from "@/lib/site-content";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export const alt = "Fun Run";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const content = await readSiteContent();

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          padding: "56px",
          color: "#fff7ef",
          background:
            "radial-gradient(circle at 20% 20%, rgba(208,255,54,0.24), transparent 32%), radial-gradient(circle at 80% 12%, rgba(255,107,61,0.28), transparent 28%), linear-gradient(135deg, #090d18 0%, #171220 45%, #1d2b2f 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "36px",
            padding: "44px",
            background: "rgba(8, 12, 24, 0.35)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              fontSize: "24px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#d0ff36",
            }}
          >
            <div
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "999px",
                background: "#ff6b3d",
              }}
            />
            Fun Run
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "18px", maxWidth: "760px" }}>
            <div style={{ fontSize: "78px", fontWeight: 700, lineHeight: 1.04 }}>{content.heroHeadline}</div>
            <div style={{ fontSize: "30px", lineHeight: 1.35, color: "rgba(255,247,239,0.82)" }}>
              {content.heroSubheadline}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: "26px",
            }}
          >
            <div style={{ display: "flex", gap: "16px", color: "#d0ff36" }}>
              <span>Lari</span>
              <span>DJ</span>
              <span>Treasure Hunt</span>
              <span>Doorprize</span>
            </div>
            <div style={{ color: "#ffb36a" }}>Harga mulai Rp150.000</div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}

