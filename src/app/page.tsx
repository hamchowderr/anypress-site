import type { Metadata } from "next";
import { HomePage } from "@/components/HomePage";
import { pageMeta } from "@/lib/seo";
import { LOWEST_PRICE } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  path: "/",
  card: "Sell, take bookings or teach online, without dealing with hosting",
  description:
    `Managed WordPress for shops, studios, clubs and small businesses: a website, bookings, a shop or courses, ready to use. From $${LOWEST_PRICE} a month, no cut of sales.`,
});

export default function Home() {
  return <HomePage />;
}
