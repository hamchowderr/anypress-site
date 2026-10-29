import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  // The share-picture route reads its fonts from disk.
  outputFileTracingIncludes: { "/og": ["./src/app/og/*.woff"] },
  // The two customer groups whose page lives elsewhere, so /who/<group> works for every group.
  async redirects() {
    return [
      { source: "/who/agencies", destination: "/agencies", permanent: true },
      { source: "/who/developers", destination: "/developers", permanent: true },
      // Website owners manage their website on the shop's account page; old links and bookmarks go there.
      { source: "/account", destination: `${(process.env.NEXT_PUBLIC_SHOP_URL || "https://shop.anypress.io").replace(/\/$/, "")}${process.env.NEXT_PUBLIC_ACCOUNT_PATH || "/account/"}`, permanent: false },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
