import type { MetadataRoute } from "next";
import { GUIDES } from "@/content/guides";
import { COMPARISONS } from "@/lib/compare";
import { AUDIENCE_GROUPS, SITE_TYPES } from "@/lib/site";

const BASE = "https://anypress.io";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/pricing", "/how-it-works", "/who", "/move", "/compare", "/agencies", "/resellers", "/sell", "/affiliates", "/affiliates/kit", "/developers", "/automate", "/ai", "/self-host", "/about", "/contact", "/help", "/included", "/terms", "/privacy", "/refund-policy"];
  return [
    ...pages,
    ...SITE_TYPES.map((t) => `/sites/${t.id}`),
    ...AUDIENCE_GROUPS.filter((g) => g.page).map((g) => `/who/${g.id}`),
    ...COMPARISONS.map((c) => `/compare/${c.slug}`),
    ...GUIDES.map((g) => `/guides/${g.id}`),
  ].map((path) => ({ url: `${BASE}${path}` }));
}
