// Where checkout and the account area live. The marketing site only links there; it never
// handles payments or WordPress sign-in itself.
export const SHOP_URL = (process.env.NEXT_PUBLIC_SHOP_URL || "https://shop.anypress.io").replace(/\/$/, "");

// FluentCart's customer account page on the shop.
export const ACCOUNT_URL = `${SHOP_URL}${process.env.NEXT_PUBLIC_ACCOUNT_PATH || "/account/"}`;

// FluentAffiliate's sign-up form and affiliate dashboard on the shop.
export const AFFILIATE_URL = `${SHOP_URL}/affiliates/`;

export const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "support@anypress.io";

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
  // One plain line: what this site is for.
  pitch: string;
  // What's in the box, in plain words (a parts list). The tool names live in `tools`.
  inBox: string[];
  // The actual tools by name, shown only on the deeper "What's included" page.
  tools: string[];
  // Longer copy for the site type's own page.
  headline: string;
  features: { title: string; body: string }[];
  idealFor: string[];
  // The FluentCart variation id on the shop. Unset means it isn't on sale yet.
  itemId?: string;
  // A made-up business we built on this kind of site, with real content, to show what it looks like.
  example: Example;
}

export interface Example {
  name: string;
  what: string;
  // A live AnyPress site anyone can open.
  url: string;
  // Screenshots in public/examples/: <shot>-desk.webp (1200 wide) and <shot>-phone.webp (390 wide, 2x).
  shot: string;
  // What a visitor can try on it.
  tryIt: string[];
}

export const SITE_TYPES: SiteType[] = [
  {
    id: "website",
    name: "Website & blog",
    short: "Website",
    from: 12,
    pitch: "Tell people who you are and help them find you.",
    inBox: ["Your website or blog", "Help getting found on Google", "Contact and sign-up forms", "A newsletter list"],
    tools: ["WordPress", "Rank Math SEO", "Fluent Forms", "FluentCRM"],
    headline: "A website that brings people to you.",
    features: [
      { title: "Found on Google", body: "Your pages are set up so search engines can find them, without you touching a setting." },
      { title: "Forms that reach you", body: "Contact and quote forms land in your inbox, and add people to your list." },
      { title: "Your own newsletter list", body: "Collect email addresses on your own site and send updates, without paying a mailing app per contact." },
      { title: "Easy to edit", body: "Write and lay out pages in WordPress, opened with one click from your account." },
    ],
    idealFor: ["Local businesses", "Blogs and publications", "Portfolios", "Chambers and associations", "Niche content sites"],
    itemId: process.env.NEXT_PUBLIC_ITEM_WEBSITE || undefined,
    example: {
      name: "Juniper Street Bakery",
      what: "A neighbourhood bakery with its menu, opening hours and a newsletter.",
      url: "https://t-1edb454e.stores.anypress.site/",
      shot: "website",
      tryIt: ["Read the menu", "Find the opening hours", "Join the newsletter"],
    },
  },
  {
    id: "bookings",
    name: "Bookings",
    short: "Bookings",
    from: 19,
    pitch: "Let clients pick a time and pay when they book.",
    inBox: ["Your website", "An online booking calendar", "Payment when they book", "Reminder emails"],
    tools: ["WordPress", "FluentBooking", "Fluent Forms", "FluentCRM"],
    headline: "Get booked and paid while you work.",
    features: [
      { title: "Your calendar, online", body: "Clients see the times you're free and pick one. No more emailing back and forth." },
      { title: "Paid up front", body: "Take payment when they book, so a no-show doesn't cost you." },
      { title: "Reminders send themselves", body: "Confirmation and reminder emails go out from your own address." },
      { title: "Every client remembered", body: "Each booking keeps the client's details, ready for follow-ups and offers." },
    ],
    idealFor: ["Coaches and consultants", "Studios and classes", "Salons and therapists", "Event hosts", "Franchise locations"],
    itemId: process.env.NEXT_PUBLIC_ITEM_BOOKINGS || undefined,
    example: {
      name: "Still Water Yoga",
      what: "A yoga studio where students pick a class and book a spot.",
      url: "https://t-9687c2a7.stores.anypress.site/",
      shot: "bookings",
      tryIt: ["See the class schedule", "Book a class", "Pick a private session"],
    },
  },
  {
    id: "store",
    name: "Online store",
    short: "Store",
    from: 29,
    pitch: "Sell products, downloads and subscriptions, and keep every sale.",
    inBox: ["Your shop", "Card payments", "Your customer list and emails", "A way for others to earn by sending you sales"],
    tools: ["WordPress", "FluentCart with Stripe", "FluentCRM", "FluentAffiliate", "Rank Math SEO"],
    headline: "Sell anything, and keep every sale.",
    features: [
      { title: "Take card payments", body: "Sell products, downloads, subscriptions and gift codes, with card payments built in." },
      { title: "No cut of your sales", body: "One monthly price for the site. The card company's fee is the only one on an order." },
      { title: "Know your customers", body: "Every buyer lands in your customer list, ready for emails, offers and a newsletter." },
      { title: "Partners who sell for you", body: "Let others earn money for sending you sales, when you're ready." },
    ],
    idealFor: ["Product brands", "Subscription boxes", "Digital downloads", "Supplements and wellness", "Niche online shops"],
    itemId: process.env.NEXT_PUBLIC_ITEM_STORE || undefined,
    example: {
      name: "Fern & Clay Ceramics",
      what: "A pottery studio selling handmade mugs, bowls and vases.",
      url: "https://t-34df1b8c.stores.anypress.site/",
      shot: "store",
      tryIt: ["Browse the shop", "Open a product", "Add it to the cart"],
    },
  },
  {
    id: "community",
    name: "Community & courses",
    short: "Community",
    from: 39,
    pitch: "A members' area with courses, discussions and paid access.",
    inBox: ["Your website", "A members' area with discussions", "Online courses", "Paid memberships"],
    tools: ["WordPress", "FluentCommunity", "FluentCart", "FluentCRM"],
    headline: "Your members, your courses, your site.",
    features: [
      { title: "A space of your own", body: "Members get a feed, groups and profiles on your domain, not someone else's app." },
      { title: "Courses built in", body: "Lessons and progress tracking, in the same place your members already talk." },
      { title: "Paid access", body: "Sell memberships and courses, as a one-off or every month." },
      { title: "Keep in touch", body: "Welcome emails and announcements reach every member." },
    ],
    idealFor: ["Course creators", "Coaches with programs", "Associations and chambers", "Membership clubs", "Educators"],
    itemId: process.env.NEXT_PUBLIC_ITEM_COMMUNITY || undefined,
    example: {
      name: "Brightside Guitar School",
      what: "Online guitar courses with a members' practice room.",
      url: "https://t-de81a042.stores.anypress.site/",
      shot: "courses",
      tryIt: ["See the courses", "Open the members' area", "Read the practice room"],
    },
  },
  {
    id: "everything",
    name: "Everything",
    short: "Everything",
    from: 79,
    pitch: "Shop, bookings, members, courses and a help desk on one site.",
    inBox: ["Everything in the other four", "A help desk for customer questions", "One list of every customer", "Room to grow"],
    tools: ["WordPress", "FluentCart", "FluentBooking", "FluentCommunity", "FluentCRM", "Fluent Support", "Fluent Forms", "Rank Math SEO"],
    headline: "One site that runs the whole operation.",
    features: [
      { title: "Every tool, one place", body: "Shop, bookings, members, courses and a help desk, all on one site with one login." },
      { title: "One record per customer", body: "Someone who buys, books a call and joins your community is one customer, not three." },
      { title: "Answer questions in one place", body: "Customers get a help page, and you get one inbox for every question." },
      { title: "Grows with you", body: "Start selling, add memberships later, open bookings next month. It's already there." },
    ],
    idealFor: ["Chambers and associations", "Franchises and multi-location brands", "Education businesses", "Agencies' biggest clients", "Anyone outgrowing five apps"],
    itemId: process.env.NEXT_PUBLIC_ITEM_EVERYTHING || undefined,
    example: {
      name: "Riverbend Business Alliance",
      what: "A local business group with memberships, events and a members' forum.",
      url: "https://t-d6478888.stores.anypress.site/",
      shot: "everything",
      tryIt: ["Compare memberships", "See upcoming events", "Visit the members' forum"],
    },
  },
];

/** Where a site type's "start" button goes: checkout when it's on sale, otherwise its own page. */
export function startUrl(t: SiteType): string {
  return t.itemId ? checkoutUrl(t.itemId) : `/sites/${t.id}`;
}

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
    line: "Open a shop without losing your weekends.",
    body: "Start one shop or ten. Each comes ready to take payments, get found on Google and email your customers, so a new idea is a new site, not a new project.",
    fits: ["store", "website"],
  },
  {
    id: "regulated",
    name: "Supplements, CBD & other regulated products",
    line: "A store on your own website, with your own payments.",
    body: "Your store is your own website, connected to your own payment account, instead of a listing on someone else's marketplace.",
    fits: ["store", "everything"],
  },
  {
    id: "educators",
    name: "Course creators & educators",
    line: "Courses and community without the platform tax.",
    body: "Sell programs, run classes and host discussions on your own domain, for one monthly price and no cut of what you earn.",
    fits: ["community", "everything"],
  },
  {
    id: "associations",
    name: "Chambers & associations",
    line: "Members, events and dues in one place.",
    body: "Collect dues, sell event tickets and give members a place to connect. Renewals and reminders send themselves.",
    fits: ["everything", "community", "bookings"],
  },
  {
    id: "franchises",
    name: "Franchises & multi-location brands",
    line: "A site for every location, all built the same way.",
    body: "Every location gets its own site from the same starting point, with its own bookings and domain, while the brand stays the same everywhere.",
    fits: ["bookings", "website", "store"],
  },
  {
    id: "agencies",
    name: "Agencies & freelancers",
    line: "Sell websites as a monthly service.",
    body: "Sell websites under your own name, at your own prices. We build and look after every one.",
    fits: ["website", "store", "everything"],
  },
  {
    id: "saas",
    name: "SaaS & software teams",
    line: "A website for every customer, from inside your app.",
    body: "Give each of your customers their own site, created automatically from your product. Your developers will find everything they need on our developer page.",
    fits: ["website", "store", "everything"],
  },
];

export interface Size {
  name: string;
  // Price multiple of the Small size (owner chose 2026-10-19).
  times: number;
  cpu: string;
  memory: string;
  storage: string;
  emails: string;
  goodFor: string;
}

export const SIZES: Size[] = [
  { name: "Small", times: 1, cpu: "1 CPU", memory: "512 MB", storage: "5 GB", emails: "5,000", goodFor: "Most new sites" },
  { name: "Medium", times: 2, cpu: "2 CPUs", memory: "512 MB", storage: "10 GB", emails: "20,000", goodFor: "Busier sites" },
  { name: "Large", times: 4, cpu: "4 CPUs", memory: "768 MB", storage: "25 GB", emails: "50,000", goodFor: "Big shops and communities" },
];
