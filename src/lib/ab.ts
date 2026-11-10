// The site copy A/B test (from 2026-11-05; the earlier "home-hero" test compared two hero layouts). Version "a" is
// the round 3 copy, "b" the outcome-led copy, on the homepage and the prices page. src/proxy.ts puts each visitor in
// a version with a cookie that holds the version and a random visitor id ("b.6f1c…"); AbTracker sends what they do
// to /api/ab, which stores it in the ab_events table under AB_TEST. The cookie keeps its old name so returning
// visitors keep their version.
export const AB_TEST = "site-copy";
export const AB_COOKIE = "ap_hero";
// Pages with a "b" version, and where that version lives. Opening the "b" address itself redirects to the page.
export const AB_PAGES: Record<string, string> = { "/": "/home-b", "/pricing": "/pricing-b" };
export type AbVersion = "a" | "b";
export const AB_EVENTS = ["view", "start", "shop"] as const;
export type AbEvent = (typeof AB_EVENTS)[number];

/** Reads "b.<uuid>" back into its parts, or null when the cookie is missing or not ours. */
export function parseAbCookie(value: string | undefined): { version: AbVersion; visitor: string } | null {
  const m = /^([ab])\.([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})$/.exec(value ?? "");
  return m ? { version: m[1] as AbVersion, visitor: m[2] } : null;
}
