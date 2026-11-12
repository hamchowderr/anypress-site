import type { Metadata } from "next";
import { SellersPage } from "@/components/SellersPage";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  path: "/sellers",
  title: "Sell websites",
  description:
    "Build a website once and sell it every month, under your own name. Every order on your storefront becomes the client's own site in minutes, and we host and look after every one.",
});

export default function Page() {
  return <SellersPage version="a" />;
}
