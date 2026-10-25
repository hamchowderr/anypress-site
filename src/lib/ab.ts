// The homepage hero A/B test. src/proxy.ts puts each visitor in a version with a cookie that holds the version and a
// random visitor id ("b.6f1c…"); AbTracker sends what they do to /api/ab, which stores it in the ab_events table.
export const AB_TEST = "home-hero";
export const AB_COOKIE = "ap_hero";
export const AB_VERSIONS = ["a", "b"] as const;
export type AbVersion = (typeof AB_VERSIONS)[number];
export const AB_EVENTS = ["view", "start", "shop"] as const;
export type AbEvent = (typeof AB_EVENTS)[number];

/** Reads "b.<uuid>" back into its parts, or null when the cookie is missing or not ours. */
export function parseAbCookie(value: string | undefined): { version: AbVersion; visitor: string } | null {
  const m = /^([ab])\.([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})$/.exec(value ?? "");
  return m ? { version: m[1] as AbVersion, visitor: m[2] } : null;
}
