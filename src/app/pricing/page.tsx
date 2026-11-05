import type { Metadata } from "next";
import { PricingPage } from "@/components/PricingPage";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  path: "/pricing",
  title: "Prices for managed WordPress sites",
  card: "Prices",
  description:
    "One monthly price per WordPress site, from $12, set by what you're building and how big it is. Hosting, email, backups and security included. No cut of your sales.",
});

export default function Pricing() {
  return <PricingPage version="a" />;
}
