// Where checkout and the account area live. The marketing site only links there; it never
// handles payments or WordPress sign-in itself.
export const SHOP_URL = (process.env.NEXT_PUBLIC_SHOP_URL || "https://shop.anypress.io").replace(/\/$/, "");

// FluentCart's customer account page on the shop.
export const ACCOUNT_URL = `${SHOP_URL}${process.env.NEXT_PUBLIC_ACCOUNT_PATH || "/account/"}`;

export const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "";

export interface Plan {
  name: string;
  price: string;
  period: string;
  summary: string;
  features: string[];
  // The FluentCart variation id on the shop. Unset means the plan isn't on sale yet.
  itemId?: string;
}

// Placeholder plans until the real ones are decided.
export const PLANS: Plan[] = [
  {
    name: "Website plan",
    price: "$29",
    period: "per month",
    summary: "One website on its own WordPress install, ready to sell from day one.",
    features: [
      "Its own WordPress and database, not shared with other sites",
      "Starts from a store template with FluentCart",
      "Free address on AnyPress, or connect your own domain",
      "Nightly backups",
      "Send email from your own domain",
    ],
    itemId: process.env.NEXT_PUBLIC_PLAN_ITEM_ID || undefined,
  },
];

/** FluentCart's instant checkout link for one plan. */
export function checkoutUrl(itemId: string): string {
  const params = new URLSearchParams({ "fluent-cart": "instant_checkout", item_id: itemId, quantity: "1" });
  return `${SHOP_URL}/?${params}`;
}

export type SiteTypeId = "website" | "bookings" | "store" | "community" | "everything";

export interface SiteType {
  id: SiteTypeId;
  name: string;
  short: string;
  // Starting monthly price for the smallest size (owner chose these 2026-10-19).
  from: number;
  pitch: string;
  tools: string[];
  // Example address shown in the demo browser.
  demoHost: string;
}

export const SITE_TYPES: SiteType[] = [
  {
    id: "website",
    name: "Website & blog",
    short: "Website",
    from: 12,
    pitch: "A fast business site or blog with SEO, contact forms and a newsletter list from day one.",
    tools: ["WordPress", "Rank Math SEO", "Fluent Forms", "FluentCRM newsletter"],
    demoHost: "northside-notes.anypress.site",
  },
  {
    id: "bookings",
    name: "Bookings",
    short: "Bookings",
    from: 19,
    pitch: "Let clients pick a time, pay up front and get reminders, without a separate booking app.",
    tools: ["WordPress", "FluentBooking", "Fluent Forms", "FluentCRM reminders"],
    demoHost: "studio-ilana.anypress.site",
  },
  {
    id: "store",
    name: "Online store",
    short: "Store",
    from: 29,
    pitch: "Sell products, downloads and subscriptions with Stripe checkout, and keep every dollar of your sales.",
    tools: ["WordPress", "FluentCart + Stripe", "FluentCRM", "FluentAffiliate", "Rank Math SEO"],
    demoHost: "kettle-and-crumb.anypress.site",
  },
  {
    id: "community",
    name: "Community & courses",
    short: "Community",
    from: 39,
    pitch: "A members' space with courses, discussions and paid access, on a site you own.",
    tools: ["WordPress", "FluentCommunity", "FluentCart memberships", "FluentCRM"],
    demoHost: "the-fold-academy.anypress.site",
  },
  {
    id: "everything",
    name: "Everything",
    short: "Everything",
    from: 79,
    pitch: "Store, bookings, community, courses, CRM and support desk, all on one site that grows with you.",
    tools: ["WordPress", "FluentCart", "FluentBooking", "FluentCommunity", "FluentCRM", "Fluent Support"],
    demoHost: "riverside-chamber.anypress.site",
  },
];

// Who AnyPress is for. No group comes first.
export const AUDIENCES = [
  "Online shops",
  "Course creators",
  "Chambers & associations",
  "Franchises",
  "Agencies",
  "SaaS teams",
  "High-risk merchants",
  "Niche site builders",
  "Coaches & studios",
  "Communities",
];
