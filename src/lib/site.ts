// Where checkout and the account area live. The marketing site only links there; it never
// handles payments or WordPress sign-in itself.
export const SHOP_URL = (process.env.NEXT_PUBLIC_SHOP_URL || "https://shop.anypress.io").replace(/\/$/, "");

// FluentCart's customer account page on the shop.
export const ACCOUNT_URL = `${SHOP_URL}${process.env.NEXT_PUBLIC_ACCOUNT_PATH || "/account/"}`;

export const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "";

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
  // Longer copy for the site type's own page.
  headline: string;
  features: { title: string; body: string }[];
  idealFor: string[];
  // The FluentCart variation id on the shop. Unset means it isn't on sale yet.
  itemId?: string;
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
    headline: "A website that brings people to you.",
    features: [
      { title: "Search-ready from day one", body: "Rank Math is set up with a working sitemap, so search engines find your pages without you touching a setting." },
      { title: "Forms that go somewhere", body: "Contact and quote forms send to your inbox and add people to your list." },
      { title: "A newsletter list built in", body: "FluentCRM collects subscribers on your own site. Send updates without paying per contact to a mailing app." },
      { title: "The editor you know", body: "Write and lay out pages in the WordPress block editor, with any theme you like." },
    ],
    idealFor: ["Local businesses", "Blogs and publications", "Portfolios", "Chambers and associations", "Niche content sites"],
    itemId: process.env.NEXT_PUBLIC_ITEM_WEBSITE || undefined,
  },
  {
    id: "bookings",
    name: "Bookings",
    short: "Bookings",
    from: 19,
    pitch: "Let clients pick a time, pay up front and get reminders, without a separate booking app.",
    tools: ["WordPress", "FluentBooking", "Fluent Forms", "FluentCRM reminders"],
    demoHost: "studio-ilana.anypress.site",
    headline: "Get booked and paid while you work.",
    features: [
      { title: "Your calendar, online", body: "FluentBooking shows the times you're free. Clients pick a slot without an email back-and-forth." },
      { title: "Paid up front", body: "Take payment when they book, so no-shows don't cost you." },
      { title: "Reminders that send themselves", body: "Confirmation and reminder emails go out from your own address." },
      { title: "Every client remembered", body: "Each booking adds the client to your CRM, ready for follow-ups and offers." },
    ],
    idealFor: ["Coaches and consultants", "Studios and classes", "Salons and therapists", "Event hosts", "Franchise locations"],
    itemId: process.env.NEXT_PUBLIC_ITEM_BOOKINGS || undefined,
  },
  {
    id: "store",
    name: "Online store",
    short: "Store",
    from: 29,
    pitch: "Sell products, downloads and subscriptions with Stripe checkout, and keep every dollar of your sales.",
    tools: ["WordPress", "FluentCart + Stripe", "FluentCRM", "FluentAffiliate", "Rank Math SEO"],
    demoHost: "kettle-and-crumb.anypress.site",
    headline: "Sell anything, and keep every sale.",
    features: [
      { title: "Checkout that converts", body: "FluentCart handles products, downloads, subscriptions and coupons, with Stripe built in." },
      { title: "No cut of your sales", body: "One monthly price for the site. Stripe's card fee is the only one on an order." },
      { title: "Customers in your CRM", body: "Buyers land in FluentCRM with lists and tags ready, and a newsletter checkbox at checkout." },
      { title: "Affiliates, ready when you are", body: "FluentAffiliate is connected to your store, so partners can earn for the sales they send." },
    ],
    idealFor: ["Product brands", "Subscription boxes", "Digital downloads", "Supplements and wellness", "Niche online shops"],
    itemId: process.env.NEXT_PUBLIC_ITEM_STORE || undefined,
  },
  {
    id: "community",
    name: "Community & courses",
    short: "Community",
    from: 39,
    pitch: "A members' space with courses, discussions and paid access, on a site you own.",
    tools: ["WordPress", "FluentCommunity", "FluentCart memberships", "FluentCRM"],
    demoHost: "the-fold-academy.anypress.site",
    headline: "Your members, your courses, your site.",
    features: [
      { title: "A space of your own", body: "FluentCommunity gives members a feed, groups and profiles on your domain, not someone else's app." },
      { title: "Courses built in", body: "Lessons, modules and progress tracking in the same place your members already talk." },
      { title: "Paid access", body: "Sell memberships and courses with FluentCart, one-off or as a subscription." },
      { title: "Keep in touch", body: "Every member is in your CRM, so welcome emails and announcements are easy." },
    ],
    idealFor: ["Course creators", "Coaches with programs", "Associations and chambers", "Membership clubs", "Educators"],
    itemId: process.env.NEXT_PUBLIC_ITEM_COMMUNITY || undefined,
  },
  {
    id: "everything",
    name: "Everything",
    short: "Everything",
    from: 79,
    pitch: "Store, bookings, community, courses, CRM and support desk, all on one site that grows with you.",
    tools: ["WordPress", "FluentCart", "FluentBooking", "FluentCommunity", "FluentCRM", "Fluent Support"],
    demoHost: "riverside-chamber.anypress.site",
    headline: "One site that runs the whole operation.",
    features: [
      { title: "Every tool, one login", body: "Store, bookings, community, courses, CRM and a support desk, all on one WordPress." },
      { title: "One customer record", body: "A buyer who books a call and joins your community is one contact, not three." },
      { title: "A help desk on your site", body: "Fluent Support gives customers a portal and gives you a shared inbox." },
      { title: "Grows with you", body: "Start selling, add a membership later, open bookings next month. It's already installed." },
    ],
    idealFor: ["Chambers and associations", "Franchises and multi-location brands", "Education businesses", "Agencies' biggest clients", "Anyone outgrowing five apps"],
    itemId: process.env.NEXT_PUBLIC_ITEM_EVERYTHING || undefined,
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

export interface AudienceGroup {
  id: string;
  name: string;
  line: string;
  body: string;
  // The site types that usually fit this group.
  fits: SiteTypeId[];
}

// The groups AnyPress is built for, in no particular order of importance.
export const AUDIENCE_GROUPS: AudienceGroup[] = [
  {
    id: "shops",
    name: "Online shops & niche sellers",
    line: "Launch a store in minutes, not weekends.",
    body: "Start one shop or ten. Each runs on its own WordPress with checkout, SEO and email ready, so a new niche is a new site, not a new project.",
    fits: ["store", "website"],
  },
  {
    id: "regulated",
    name: "Supplements, CBD & other regulated products",
    line: "A store no platform can switch off on a whim.",
    body: "Your site is your own WordPress, connected to your own payment account. No marketplace rules deciding overnight that your products aren't welcome.",
    fits: ["store", "everything"],
  },
  {
    id: "educators",
    name: "Course creators & educators",
    line: "Courses and community without the platform tax.",
    body: "Sell programs, run cohorts and host discussions on your own domain, with one monthly price and no cut of what you earn.",
    fits: ["community", "everything"],
  },
  {
    id: "associations",
    name: "Chambers & associations",
    line: "Members, events and a directory in one place.",
    body: "Collect dues, sell event tickets and give members a place to connect. Renewals and reminders send themselves.",
    fits: ["everything", "community", "bookings"],
  },
  {
    id: "franchises",
    name: "Franchises & multi-location brands",
    line: "A site for every location, all built the same way.",
    body: "Every location gets its own site from the same starting point, with its own bookings and domain, while the brand stays consistent.",
    fits: ["bookings", "website", "store"],
  },
  {
    id: "agencies",
    name: "Agencies & freelancers",
    line: "Sell websites as a monthly service.",
    body: "Sell AnyPress sites under your own brand, from your own WordPress shop, at your own prices. We run the servers.",
    fits: ["website", "store", "everything"],
  },
  {
    id: "saas",
    name: "SaaS & software teams",
    line: "WordPress sites, created by your code.",
    body: "Give every customer a WordPress site from inside your product. One API call creates it; a webhook tells you when it's ready.",
    fits: ["website", "store", "everything"],
  },
];
