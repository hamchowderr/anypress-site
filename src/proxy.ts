import { NextResponse, type NextRequest } from "next/server";
import { AB_COOKIE, parseAbCookie, type AbVersion } from "@/lib/ab";

// Splits homepage visitors between the two heroes (src/lib/ab.ts). A visitor keeps their version for 30 days.
// Search engines and other bots always get "a" and no cookie. ?hero=a or ?hero=b picks a version, for checking.
const BOT = /bot|crawl|spider|slurp|facebookexternalhit|embedly|preview|lighthouse|headless|curl|wget|python|vercel/i;

export function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  if (pathname === "/home-b") return NextResponse.redirect(new URL("/", request.url), 308);

  if (BOT.test(request.headers.get("user-agent") ?? "")) return NextResponse.next();

  const asked = searchParams.get("hero");
  const saved = parseAbCookie(request.cookies.get(AB_COOKIE)?.value);
  const version: AbVersion = asked === "a" || asked === "b" ? asked : (saved?.version ?? (Math.random() < 0.5 ? "a" : "b"));

  const res = version === "b" ? NextResponse.rewrite(new URL("/home-b", request.url)) : NextResponse.next();
  if (!saved || saved.version !== version) {
    res.cookies.set(AB_COOKIE, `${version}.${saved?.visitor ?? crypto.randomUUID()}`, { path: "/", maxAge: 60 * 60 * 24 * 30, sameSite: "lax", secure: request.nextUrl.protocol === "https:" });
  }
  return res;
}

export const config = { matcher: ["/", "/home-b"] };
