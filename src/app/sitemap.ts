import type { MetadataRoute } from "next";
import { SITE_TYPES } from "@/lib/site";

const BASE = "https://anypress.io";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/pricing", "/who", "/agencies", "/developers", "/about", "/contact"];
  return [...pages, ...SITE_TYPES.map((t) => `/sites/${t.id}`)].map((path) => ({ url: `${BASE}${path}` }));
}
