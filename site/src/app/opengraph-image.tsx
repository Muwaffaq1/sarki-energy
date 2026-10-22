import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { LETTERS } from "@/components/ui/Logo";
import { hero } from "@/content/home";

// The share card for links to the site: the hero photo, the mark and the headline.
export const alt = "Sarki Energy: Energy you can plan around.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const [photo, font] = await Promise.all([
    readFile(join(process.cwd(), "public/photos/hero-fuel-depot.jpg")),
    readFile(join(process.cwd(), "src/fonts/HostGrotesk-SemiBold.ttf")),
  ]);
  const photoSrc = `data:image/jpeg;base64,${photo.toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ position: "relative", display: "flex", width: "100%", height: "100%", background: "#0d0d0c", fontFamily: "Host Grotesk" }}>
        <img src={photoSrc} alt="" width={1200} height={630} style={{ position: "absolute", top: 0, left: 0, objectFit: "cover" }} />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 1200,
            height: 630,
            backgroundImage: "linear-gradient(180deg, rgba(13,13,12,0.55) 0%, rgba(13,13,12,0.35) 40%, rgba(13,13,12,0.92) 100%)",
          }}
        />
        <div style={{ position: "relative", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, color: "#fff", fontSize: 32 }}>
            <svg width="56" height="56" viewBox="0 0 400 400">
              <circle cx="200" cy="200" r="200" fill="#fff" />
              <path d={LETTERS} fill="#000" fillRule="evenodd" clipRule="evenodd" />
            </svg>
            Sarki Energy
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ color: "#fff", fontSize: 88, lineHeight: 1, letterSpacing: "-0.04em", maxWidth: 900 }}>{hero.title}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, color: "rgba(255,255,255,0.82)", fontSize: 30 }}>
              <div style={{ width: 14, height: 14, borderRadius: 7, background: "#2bb673" }} />
              Fuel · Gas · Solar · Engineering
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "Host Grotesk", data: font, weight: 600, style: "normal" }] },
  );
}
