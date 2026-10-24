import type { MetadataRoute } from "next";
import { GUIDES } from "@/content/guides";
import { AUDIENCE_GROUPS, SITE_TYPES } from "@/lib/site";

const BASE = "https://anypress.io";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/pricing", "/who", "/agencies", "/sell", "/affiliates", "/affiliates/kit", "/developers", "/self-host", "/about", "/contact", "/help", "/included", "/terms", "/privacy", "/refund-policy"];
  return [...pages, ...SITE_TYPES.map((t) => `/sites/${t.id}`), ...AUDIENCE_GROUPS.filter((g) => g.page).map((g) => `/who/${g.id}`), ...GUIDES.map((g) => `/guides/${g.id}`)].map((path) => ({ url: `${BASE}${path}` }));
}
