// Where checkout and the account area live. The marketing site only links there; it never
// handles payments or WordPress sign-in itself.
export const SHOP_URL = (process.env.NEXT_PUBLIC_SHOP_URL || "https://shop.anypress.io").replace(/\/$/, "");

// FluentCart's customer account page on the shop.
export const ACCOUNT_URL = `${SHOP_URL}${process.env.NEXT_PUBLIC_ACCOUNT_PATH || "/customer-profile/"}`;

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
