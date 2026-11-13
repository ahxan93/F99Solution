import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const alt = `${siteConfig.name} — Digital Marketing Agency in Mumbai`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Default social-share image (used by Open Graph and Twitter cards). */
export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        color: "#eef1fb",
        background: "linear-gradient(135deg, #060a17 0%, #0d1a4a 60%, #1747d6 140%)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <div
          style={{
            minWidth: 84,
            height: 64,
            padding: "0 14px",
            borderRadius: 16,
            background: "#3b82ff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 34,
            fontWeight: 700,
          }}
        >
          {siteConfig.logoMark}
        </div>
        <div style={{ fontSize: 36, fontWeight: 600 }}>{siteConfig.name}</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.08, maxWidth: 900 }}>
          Turn clicks into customers that keep coming back.
        </div>
        <div style={{ fontSize: 30, color: "#9cc2ff" }}>
          SEO · Performance Ads · Social · Web · CRM — Mumbai, India
        </div>
      </div>
    </div>,
    size,
  );
}
