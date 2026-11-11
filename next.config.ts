import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  // /try's "Make this my site" sends the demo (up to 2 MB) and its photos (up to 4 MB each) through server actions.
  experimental: { serverActions: { bodySizeLimit: "4mb" } },
  // The share-picture route reads its fonts from disk.
  outputFileTracingIncludes: { "/og": ["./src/app/og/*.woff"] },
  // The two customer groups whose page lives elsewhere, so /who/<group> works for every group.
  async redirects() {
    return [
      { source: "/who/agencies", destination: "/agencies", permanent: true },
      { source: "/who/developers", destination: "/developers", permanent: true },
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
