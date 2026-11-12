import { NextResponse, type NextRequest } from "next/server";
import { AB_COOKIE, AB_PAGES, parseAbCookie, type AbVersion } from "@/lib/ab";

// Splits visitors between the two versions of the site copy (src/lib/ab.ts) on every page in AB_PAGES. A visitor
// keeps their version for 30 days, on all of those pages. Search engines and other bots always get "a" and no cookie.
// ?copy=a or ?copy=b (or the older ?hero=) picks a version, for checking.
const BOT = /bot|crawl|spider|slurp|facebookexternalhit|embedly|preview|lighthouse|headless|curl|wget|python|vercel/i;

export function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const page = Object.keys(AB_PAGES).find((p) => AB_PAGES[p] === pathname);
  if (page) return NextResponse.redirect(new URL(page, request.url), 308);

  if (BOT.test(request.headers.get("user-agent") ?? "")) return NextResponse.next();

  const asked = searchParams.get("copy") ?? searchParams.get("hero");
  const saved = parseAbCookie(request.cookies.get(AB_COOKIE)?.value);
  const version: AbVersion = asked === "a" || asked === "b" ? asked : (saved?.version ?? (Math.random() < 0.5 ? "a" : "b"));

  const bPage = AB_PAGES[pathname];
  const res = version === "b" && bPage ? NextResponse.rewrite(new URL(bPage, request.url)) : NextResponse.next();
  if (!saved || saved.version !== version) {
    res.cookies.set(AB_COOKIE, `${version}.${saved?.visitor ?? crypto.randomUUID()}`, { path: "/", maxAge: 60 * 60 * 24 * 30, sameSite: "lax", secure: request.nextUrl.protocol === "https:" });
  }
  return res;
}

// Keep in step with AB_PAGES (the matcher has to be written out here).
export const config = { matcher: ["/", "/home-b", "/pricing", "/pricing-b", "/sellers", "/sellers-b", "/resellers", "/resellers-b", "/sites/:type", "/sites-b/:type"] };
