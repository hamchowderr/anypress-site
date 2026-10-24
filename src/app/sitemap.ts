import type { MetadataRoute } from "next";
import { COMPARISONS } from "@/lib/compare";
import { AUDIENCE_GROUPS, SITE_TYPES } from "@/lib/site";

const BASE = "https://anypress.io";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/pricing", "/who", "/move", "/compare", "/agencies", "/resellers", "/sell", "/affiliates", "/developers", "/self-host", "/about", "/contact", "/help", "/included", "/terms", "/privacy", "/refund-policy"];
  return [
    ...pages,
    ...SITE_TYPES.map((t) => `/sites/${t.id}`),
    ...AUDIENCE_GROUPS.map((g) => `/who/${g.id}`),
    ...COMPARISONS.map((c) => `/compare/${c.slug}`),
  ].map((path) => ({ url: `${BASE}${path}` }));
}
