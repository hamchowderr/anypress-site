import type { SiteTypeId } from "@/lib/site";

// What the same kind of site costs on other platforms, for the price comparison on the homepage, /pricing and
// /compare. Every figure is the smallest plan that does the job, read from the company's own pricing page on
// PRICES_CHECKED. Recheck them all and move the date when you change one. Keep it fair: monthly billing where the
// page offers it, say when it doesn't, and name the fees and limits the page itself states.
export const PRICES_CHECKED = "26 October 2026";

export interface OtherPlan {
  who: string;
  plan: string;
  // US dollars a month.
  price: number;
  // True when the page only shows the price for a year paid up front.
  yearly?: boolean;
  // One short line from the company's own page: an extra fee, or what the plan leaves out.
  note?: string;
  url: string;
}

const SQUARESPACE = "https://www.squarespace.com/pricing";
const SHOPIFY = "https://www.shopify.com/pricing";
const WIX = "https://www.wix.com/plans";
const KAJABI = "https://kajabi.com/pricing";
const CIRCLE = "https://circle.so/pricing";

export const ELSEWHERE: Record<SiteTypeId, OtherPlan[]> = {
  website: [
    {
      who: "Squarespace",
      plan: "Basic",
      price: 25,
      note: "2% of any shop sales",
      url: SQUARESPACE,
    },
    {
      who: "Wix",
      plan: "Light",
      price: 17,
      yearly: true,
      note: "Can't take payments",
      url: WIX,
    },
  ],
  bookings: [{ who: "Wix", plan: "Core", price: 29, yearly: true, url: WIX }],
  store: [
    {
      who: "Shopify",
      plan: "Basic",
      price: 39,
      note: "2% of each sale unless you use Shopify's own payments",
      url: SHOPIFY,
    },
    { who: "Squarespace", plan: "Core", price: 39, url: SQUARESPACE },
  ],
  community: [
    { who: "Kajabi", plan: "Basic", price: 179, url: KAJABI },
    {
      who: "Circle",
      plan: "Professional",
      price: 89,
      yearly: true,
      url: CIRCLE,
    },
  ],
  everything: [{ who: "Kajabi", plan: "Growth", price: 249, url: KAJABI }],
};

// A WordPress host, for the "not an empty WordPress" comparison: the price of hosting alone.
export const WP_HOST: OtherPlan = {
  who: "Kinsta",
  plan: "managed WordPress, 1 site",
  price: 35,
  note: "Hosting only: you pick, install and set up every plugin",
  url: "https://kinsta.com/pricing/",
};
