import type { Metadata } from "next";
import { Suspense } from "react";
import { TryFromQuery } from "@/components/TryPlayground";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = {
  ...pageMeta({
    path: "/try",
    title: "Try it in your browser",
    description:
      "Open a real AnyPress site in your browser and click around. No sign-up, nothing to install, nothing saved.",
  }),
  robots: { index: false },
};

// ?type=<site type> opens that site type's demo; ?blueprint=<one of our blueprints>&title=<name> opens a kit's or a
// block's example site. The site starts in the visitor's browser, so the page itself is static.
export default function TryPage() {
  return (
    <Suspense>
      <TryFromQuery />
    </Suspense>
  );
}
