import type { MetadataRoute } from "next";

const BASE = "https://anypress.io";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/account"] },
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  };
}
