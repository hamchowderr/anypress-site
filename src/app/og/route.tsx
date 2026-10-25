import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

// The picture on a shared link: the page's title on paper, in the site's own type. /og?t=<title>
// The fonts are in this folder (next.config traces them into the deployment).

const dir = join(process.cwd(), "src/app/og");
const fonts = Promise.all([
  readFile(join(dir, "hanken-800.woff")),
  readFile(join(dir, "hanken-500.woff")),
  readFile(join(dir, "caveat-700.woff")),
]);

export async function GET(req: NextRequest) {
  const title = (req.nextUrl.searchParams.get("t") || "Managed WordPress, set up and looked after for you").slice(0, 110);
  const [bold, regular, hand] = await fonts;
  const size = title.length > 60 ? 64 : title.length > 34 ? 80 : 96;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#faf8f5", padding: 48, fontFamily: "Hanken" }}>
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            background: "#ffffff",
            border: "4px solid #141414",
            borderRadius: 28,
            boxShadow: "14px 14px 0 #ee2f5e",
            padding: "52px 60px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <svg width="64" height="64" viewBox="0 0 100 100">
              <defs>
                <linearGradient id="l" x1="8" y1="80" x2="66" y2="40" gradientUnits="userSpaceOnUse">
                  <stop offset="0" stopColor="#FFB338" />
                  <stop offset=".55" stopColor="#FF7A2A" />
                  <stop offset="1" stopColor="#F2413A" />
                </linearGradient>
                <linearGradient id="r" x1="56" y1="14" x2="86" y2="86" gradientUnits="userSpaceOnUse">
                  <stop offset="0" stopColor="#FF5A33" />
                  <stop offset=".5" stopColor="#EE2F5E" />
                  <stop offset="1" stopColor="#D21FA4" />
                </linearGradient>
              </defs>
              <path d="M48.5 17.5 Q51 14 55 15 L56 27 L50.5 48 L62.3 48 L66.2 59 L48 64 L44 77.5 L20 77.5 Q16 77.5 18.5 75 Q28 68 32 58 Z" fill="url(#l)" />
              <path d="M51 15 L62 15 Q65.5 15 66.8 18.5 L90 80 Q91.5 84 87.5 84 L77.5 84 Q75 84 74 81.5 L55 27 Z" fill="url(#r)" />
            </svg>
            <span style={{ fontSize: 44, fontWeight: 800, color: "#141414", letterSpacing: -1 }}>AnyPress</span>
            <span style={{ fontFamily: "Caveat", fontSize: 38, color: "#ee2f5e", marginLeft: 8 }}>managed WordPress</span>
          </div>
          <div style={{ display: "flex", fontSize: size, fontWeight: 800, lineHeight: 1.05, color: "#141414", letterSpacing: -2 }}>{title}</div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 30, fontWeight: 500, color: "#5f5a55" }}>
            <span>Set up for you. Looked after every day. From $12 a month.</span>
            <span style={{ color: "#141414", fontWeight: 800 }}>anypress.io</span>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Hanken", data: bold, weight: 800, style: "normal" },
        { name: "Hanken", data: regular, weight: 500, style: "normal" },
        { name: "Caveat", data: hand, weight: 700, style: "normal" },
      ],
      headers: { "Cache-Control": "public, max-age=86400, s-maxage=31536000, immutable" },
    },
  );
}
