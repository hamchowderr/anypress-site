import type { Metadata } from "next";
import { WHOLESALE_PERCENT } from "@/lib/site";
import { ResellersPage } from "@/components/ResellersPage";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  path: "/resellers",
  title: "Become a reseller",
  description: `Sell websites under several brands from one login, at ${WHOLESALE_PERCENT}% off every site, on one monthly bill. We host and look after every site.`,
});

export default function Page() {
  return <ResellersPage version="a" />;
}
