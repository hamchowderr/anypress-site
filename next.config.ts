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
      // The old "b" addresses from the copy test, which ended 2026-11-12.
      { source: "/home-b", destination: "/", permanent: true },
      { source: "/pricing-b", destination: "/pricing", permanent: true },
      { source: "/sellers-b", destination: "/sellers", permanent: true },
      { source: "/resellers-b", destination: "/resellers", permanent: true },
      { source: "/sites-b/:type", destination: "/sites/:type", permanent: true },
      { source: "/agencies", destination: "/sellers", permanent: true },
      { source: "/who/agencies", destination: "/sellers", permanent: true },
      { source: "/guides/agencies", destination: "/sellers#earnings", permanent: true },
      { source: "/guides/sellers", destination: "/sellers#earnings", permanent: true },
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
