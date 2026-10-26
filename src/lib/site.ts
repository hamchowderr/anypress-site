// Where checkout and the account area live. The marketing site only links there; it never
// handles payments or WordPress sign-in itself.
export const SHOP_URL = (process.env.NEXT_PUBLIC_SHOP_URL || "https://shop.anypress.io").replace(/\/$/, "");

// FluentCart's customer account page on the shop.
export const ACCOUNT_URL = `${SHOP_URL}${process.env.NEXT_PUBLIC_ACCOUNT_PATH || "/account/"}`;

// FluentAffiliate's sign-up form and affiliate dashboard on the shop.
/** Where sellers and resellers sign in. Website owners sign in on anypress.io/account instead. */
export const DASHBOARD_URL = "https://app.anypress.io";
export const AFFILIATE_URL = `${SHOP_URL}/affiliates/`;

export const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "support@anypress.io";

/** A plan's page on the shop, where people pick monthly or yearly and buy: /item/<shopSlug>-<size>/. */
export function planUrl(t: SiteType, size = "Small"): string {
  return `${SHOP_URL}/item/${t.shopSlug}-${size.toLowerCase()}/`;
}

import type { DrawingName } from "@/components/drawings.generated";

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
  // The actual tools by name, shown only on the deeper "What's included" page. Every plugin the site type's
  // role switches on (waas-provisioning-api templates/anypress-store/roles.json).
  tools: string[];
  // Longer copy for the site type's own page.
  headline: string;
  features: { title: string; body: string }[];
  idealFor: string[];
  // The start of this site type's plan pages on the shop (website-small, website-medium, …).
  shopSlug: string;
  // A made-up business we built on this kind of site, with real content, to show what it looks like.
  example: Example;
  // The hand-drawn object that stands for this kind of site.
  drawing: DrawingName;
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
    tools: ["WordPress", "Fluent Forms", "FluentCRM", "Rank Math SEO", "FluentSnippets", "FluentAuth", "AutomatorWP", "WP Fusion Lite", "FluentToolkit"],
    headline: "A website that brings people to you.",
    features: [
      { title: "Found on Google", body: "Your pages are set up so search engines can find them, without you touching a setting." },
      { title: "Forms that reach you", body: "Contact and quote forms land in your inbox, and add people to your list." },
      { title: "Your own newsletter list", body: "Collect email addresses on your own site and send updates, without paying a mailing app per contact." },
      { title: "Easy to edit", body: "Write and lay out pages in WordPress, opened with one click from your account." },
    ],
    idealFor: ["Local businesses", "Blogs and publications", "Portfolios", "Chambers and associations", "Niche content sites"],
    shopSlug: "website",
    drawing: "website",
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
    tools: ["WordPress", "FluentBooking", "FluentCart", "Fluent Support", "Fluent Forms", "FluentCRM", "Rank Math SEO", "FluentSnippets", "FluentAuth", "AutomatorWP", "WP Fusion Lite", "FluentToolkit"],
    headline: "Get booked and paid while you work.",
    features: [
      { title: "Your calendar, online", body: "Clients see the times you're free and pick one. No more emailing back and forth." },
      { title: "Paid up front", body: "Take payment when they book, so a no-show doesn't cost you." },
      { title: "Reminders send themselves", body: "Confirmation and reminder emails go out from your own address." },
      { title: "Every client remembered", body: "Each booking keeps the client's details, ready for follow-ups and offers." },
    ],
    idealFor: ["Coaches and consultants", "Studios and classes", "Salons and therapists", "Event hosts", "Franchise locations"],
    shopSlug: "bookings",
    drawing: "bookings",
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
    tools: ["WordPress", "FluentCart with Stripe", "FluentAffiliate", "Fluent Support", "Fluent Forms", "FluentCRM", "Rank Math SEO", "FluentSnippets", "FluentAuth", "AutomatorWP", "WP Fusion Lite", "FluentToolkit"],
    headline: "Sell anything, and keep every sale.",
    features: [
      { title: "Take card payments", body: "Sell products, downloads, subscriptions and gift codes, with card payments built in." },
      { title: "No cut of your sales", body: "One monthly price for the site. The card company's fee is the only one on an order." },
      { title: "Know your customers", body: "Every buyer lands in your customer list, ready for emails, offers and a newsletter." },
      { title: "Partners who sell for you", body: "Let others earn money for sending you sales, when you're ready." },
    ],
    idealFor: ["Product brands", "Subscription boxes", "Digital downloads", "Supplements and wellness", "Niche online shops"],
    shopSlug: "online-store",
    drawing: "store",
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
    tools: ["WordPress", "FluentCommunity", "FluentCart", "Fluent Forms", "FluentCRM", "Rank Math SEO", "FluentSnippets", "FluentAuth", "AutomatorWP", "WP Fusion Lite", "FluentToolkit"],
    headline: "Your members, your courses, your site.",
    features: [
      { title: "A space of your own", body: "Members get a feed, groups and profiles on your domain, not someone else's app." },
      { title: "Courses built in", body: "Lessons and progress tracking, in the same place your members already talk." },
      { title: "Paid access", body: "Sell memberships and courses, as a one-off or every month." },
      { title: "Keep in touch", body: "Welcome emails and announcements reach every member." },
    ],
    idealFor: ["Course creators", "Coaches with programs", "Associations and chambers", "Membership clubs", "Educators"],
    shopSlug: "community",
    drawing: "courses",
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
    tools: ["WordPress", "FluentCart", "FluentBooking", "FluentCommunity", "Fluent Support", "FluentAffiliate", "Fluent Forms", "FluentCRM", "Rank Math SEO", "FluentSnippets", "FluentAuth", "AutomatorWP", "WP Fusion Lite", "FluentToolkit"],
    headline: "One site that runs the whole operation.",
    features: [
      { title: "Every tool, one place", body: "Shop, bookings, members, courses and a help desk, all on one site with one login." },
      { title: "One record per customer", body: "Someone who buys, books a call and joins your community is one customer, not three." },
      { title: "Answer questions in one place", body: "Customers get a help page, and you get one inbox for every question." },
      { title: "Grows with you", body: "Start selling, add memberships later, open bookings next month. It's already there." },
    ],
    idealFor: ["Chambers and associations", "Franchises and multi-location brands", "Education businesses", "Agencies' biggest clients", "Anyone outgrowing five apps"],
    shopSlug: "everything",
    drawing: "everything",
    example: {
      name: "Riverbend Business Alliance",
      what: "A local business group with memberships, events and a members' forum.",
      url: "https://t-d6478888.stores.anypress.site/",
      shot: "everything",
      tryIt: ["Compare memberships", "See upcoming events", "Visit the members' forum"],
    },
  },
];

/** Where a site type's "start" button goes: its Small plan on the shop. */
export function startUrl(t: SiteType): string {
  return planUrl(t);
}

export interface AudienceGroup {
  // Also the group's value in the shop's CRM (customer_group) and its page: /who/<id>.
  id: string;
  name: string;
  line: string;
  body: string;
  // A few kinds of business in this group, so people can spot themselves (shown on /who).
  examples: string[];
  // The site types that usually fit this group.
  fits: SiteTypeId[];
  // Which side of AnyPress this group usually buys from: a site for themselves, or the technical side.
  side: "owners" | "technical";
  drawing: DrawingName;
  // Groups with a page elsewhere (agencies, developers) link there instead of /who/<id>.
  href?: string;
  page?: GroupPage;
}

export interface GroupPage {
  title: string;
  lead: string;
  // Three things the site does for this group, in their words.
  benefits: { title: string; body: string }[];
  // The example site that fits best.
  example: SiteTypeId;
  questions: [string, string][];
  // What the free guide on the page is called.
  guide: string;
}

/** Where a group's own page is. */
export function groupUrl(g: AudienceGroup): string {
  return g.href ?? `/who/${g.id}`;
}

// The groups AnyPress is built for, in no particular order of importance.
export const AUDIENCE_GROUPS: AudienceGroup[] = [
  {
    id: "shops",
    name: "Online shops & niche sellers",
    line: "Open a shop without losing your weekends.",
    body: "Start one shop or ten. Each comes ready to take payments, get found on Google and email your customers, so a new idea is a new site, not a new project.",
    examples: ["Product brands", "Makers and crafters", "Merch and print-on-demand", "Digital downloads", "Subscription boxes"],
    fits: ["store", "website"],
    side: "owners",
    drawing: "makers",
    page: {
      title: "Open a shop without losing your weekends.",
      lead: "Products, downloads, merch or subscriptions. Your shop arrives ready to sell, on your own domain, and you keep every sale.",
      benefits: [
        { title: "Ready to sell on day one", body: "Card payments, product pages and order emails are set up before you open it." },
        { title: "No cut of your sales", body: "One monthly price for the site. The card company's fee is the only one on an order." },
        { title: "Your customers stay yours", body: "Every buyer joins your own customer list, ready for news, offers and new releases." },
      ],
      example: "store",
      questions: [
        ["Can I sell digital things, like music or downloads?", "Yes. Sell downloads, physical products, subscriptions and gift codes from the same shop."],
        ["I already sell somewhere else. Can I move?", "Yes. Start your AnyPress shop next to your old one, add your products, then point your domain at it when you're ready."],
        ["What if I want a second shop?", "Each shop is its own site with its own plan. Three or more sites cost less each."],
      ],
      guide: "Moving your shop: a step-by-step checklist",
    },
  },
  {
    id: "regulated",
    name: "Supplements, CBD & other regulated products",
    line: "A store on your own website, with your own payments.",
    body: "Your store is your own website, connected to your own payment account, instead of a listing on someone else's marketplace.",
    examples: ["Supplements and vitamins", "CBD and hemp", "Wellness and skincare", "Products marketplaces turn down"],
    fits: ["store", "everything"],
    side: "owners",
    drawing: "health",
    page: {
      title: "Sell from your own store, not someone else's marketplace.",
      lead: "Your products, your website and your payment account. No marketplace rules about what you can list, and no cut of your sales.",
      benefits: [
        { title: "Your own store", body: "A full shop on your own domain, with product pages, subscriptions and order emails." },
        { title: "Your own payment account", body: "Payments go to the account you're approved for, straight to you." },
        { title: "Room for the fine print", body: "Add the labels, warnings and policy pages your products need, wherever you need them." },
      ],
      example: "store",
      questions: [
        ["Do you approve my products?", "No. Your payment provider decides what you can sell through them. We give you the store; you stay responsible for following the rules for your products."],
        ["Can I sell subscriptions?", "Yes. Monthly refills and subscribe-and-save work out of the box."],
        ["Is there a fee per order?", "No AnyPress fee. Your payment provider's fee is the only one."],
      ],
      guide: "Regulated store checklist",
    },
  },
  {
    id: "courses",
    name: "Course creators & educators",
    line: "Courses and community without the platform tax.",
    body: "Sell programs, run classes and host discussions on your own domain, for one monthly price and no cut of what you earn.",
    examples: ["Online course creators", "Coaches with a program", "Music and art teachers", "Tutors", "Paid communities"],
    fits: ["community", "everything"],
    side: "owners",
    drawing: "teach",
    page: {
      title: "Courses and community without the platform tax.",
      lead: "Sell programs, run classes and host your students' discussions on your own domain, for one monthly price.",
      benefits: [
        { title: "Courses and a community together", body: "Lessons, progress and discussions in one members' area, under your name." },
        { title: "Keep what you earn", body: "No percentage of your course sales and no price per student." },
        { title: "Your students, your list", body: "Every student is on your own email list, so a new course has an audience on day one." },
      ],
      example: "community",
      questions: [
        ["Can I charge monthly for a membership?", "Yes. Sell courses as one-off purchases, memberships every month, or both."],
        ["Can I add live classes?", "Yes. With the Everything plan, students can book live sessions on the same site."],
        ["What happens when I have more students?", "Move up a size whenever you need to. Your site, courses and students stay where they are."],
      ],
      guide: "What your course platform really costs: a calculator",
    },
  },
  {
    id: "chambers",
    name: "Chambers & associations",
    line: "Members, events and dues in one place.",
    body: "Collect dues, sell event tickets and give members a place to connect. Renewals and reminders send themselves.",
    examples: ["Chambers of commerce", "Trade and professional associations", "Clubs and societies", "Alumni groups", "Nonprofits with members"],
    fits: ["everything", "community", "bookings"],
    side: "owners",
    drawing: "clubs",
    page: {
      title: "Members, events and dues in one place.",
      lead: "A website for your organisation that collects dues, sells event tickets and gives members a place to connect.",
      benefits: [
        { title: "Dues that renew themselves", body: "Members join and pay online. Renewals and reminders go out on their own." },
        { title: "Events in the same place", body: "Sell tickets and take sign-ups next to the rest of your site." },
        { title: "A home for your members", body: "A members' area for news, discussions and a directory, under your name." },
      ],
      example: "everything",
      questions: [
        ["Can our members get websites too?", "Yes. You can offer your members their own AnyPress sites, under your name, as a member benefit or an income stream."],
        ["Do we need someone technical?", "No. We set it up and look after it. Your team edits pages and members like any other website."],
        ["Is this for churches and ministries too?", "Yes. See the page for churches."],
      ],
      guide: "Member website program: a one-page guide",
    },
  },
  {
    id: "churches",
    name: "Churches & ministries",
    line: "Giving, events and groups on one site.",
    body: "Take online giving, share events and give small groups a place to meet, on a website your volunteers can keep up to date.",
    examples: ["Churches", "Ministries", "Faith-based nonprofits", "Small groups and fellowships"],
    fits: ["everything", "community", "website"],
    side: "owners",
    drawing: "church",
    page: {
      title: "Giving, events and groups on one site.",
      lead: "A website for your church that takes online giving, shares what's happening and gives your groups a place to connect.",
      benefits: [
        { title: "Online giving", body: "One-off and monthly giving on your own site, with receipts that send themselves." },
        { title: "Events and sign-ups", body: "Service times, events and volunteer sign-ups, all in one place." },
        { title: "Easy for volunteers", body: "Pages edit like a document, and we look after the rest, so no one has to be the web person." },
      ],
      example: "everything",
      questions: [
        ["Does it take a cut of giving?", "No. Only the card company's fee applies."],
        ["Can small groups talk on the site?", "Yes. With the Community or Everything plan, groups get their own space for news and discussion."],
        ["Can we stream services?", "You can add your livestream or recordings to any page."],
      ],
      guide: "Church website checklist",
    },
  },
  {
    id: "franchises",
    name: "Franchises & multi-location brands",
    line: "A site for every location, all built the same way.",
    body: "Every location gets its own site from the same starting point, with its own bookings and domain, while the brand stays the same everywhere.",
    examples: ["Franchise brands", "Salons and studios with several locations", "Gyms and clinics", "Local service chains"],
    fits: ["bookings", "website", "store"],
    side: "owners",
    drawing: "places",
    page: {
      title: "A site for every location, all built the same way.",
      lead: "Every location gets its own site from your starting point, with its own bookings and domain, and your brand stays the same everywhere.",
      benefits: [
        { title: "Same look everywhere", body: "Set up your site once as a seller, and every new location gets its own copy." },
        { title: "Each location runs its own", body: "Local bookings, hours and offers, managed by the people who run that location." },
        { title: "Cheaper as you grow", body: "Three or more sites cost less each, and the price drops again at ten and twenty-five." },
      ],
      example: "bookings",
      questions: [
        ["Can each location have its own domain?", "Yes. Each site can use its own domain, or a page on yours."],
        ["Who pays: head office or the location?", "Either. Head office can pay for every site, or each location can buy its own."],
        ["Can we sell sites to our franchisees?", "Yes. Head office can become a seller and offer sites under your own brand."],
      ],
      guide: "Rolling out 10 locations: a worked example",
    },
  },
  {
    id: "agencies",
    name: "Agencies & freelancers",
    line: "Sell websites as a monthly service.",
    body: "Sell websites under your own name, at your own prices. We build and look after every one.",
    examples: ["Web design agencies", "Freelance designers and developers", "Marketing agencies", "Consultants who build sites"],
    fits: ["website", "store", "everything"],
    side: "technical",
    drawing: "agency",
    href: "/agencies",
  },
  {
    id: "developers",
    name: "SaaS & software teams",
    line: "A website for every customer, from inside your app.",
    body: "Give each of your customers their own site, created automatically from your product. Your developers will find everything they need on our developer page.",
    examples: ["SaaS products", "Website builders", "Booking and membership apps", "Platforms that onboard businesses"],
    fits: ["website", "store", "everything"],
    side: "technical",
    drawing: "software",
    href: "/developers",
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

// Resellers pay this much off the list price of every live site, on one monthly bill (resellers.wholesale_percent
// in the API, 40 by default). It replaces the volume discount.
export const WHOLESALE_PERCENT = 40;

/** A site's price for a reseller, in dollars, from its list price. */
export function wholesalePrice(list: number): number {
  return Math.round(list * (100 - WHOLESALE_PERCENT)) / 100;
}

// Volume discount: the more live sites one customer has, the more every site saves (the shop's VolumeDiscount tiers,
// in waas-plugins). Existing sites move to the new tier from their next renewal.
export const VOLUME_TIERS = [
  { sites: 3, percent: 10 },
  { sites: 10, percent: 20 },
  { sites: 25, percent: 30 },
];

/** Percent off each site for a customer with `sites` live sites. */
export function volumePercent(sites: number): number {
  let percent = 0;
  for (const t of VOLUME_TIERS) if (sites >= t.sites) percent = t.percent;
  return percent;
}

/** The next tier up, if there is one. */
export function nextTier(sites: number) {
  return VOLUME_TIERS.find((t) => sites < t.sites);
}

/** The two versions of How it works: website owners, and sellers and resellers. */
export const HOW_SWITCH = {
  owners: { href: "/how-it-works", label: "I want a website" },
  technical: { href: "/how-it-works/sellers", label: "I sell websites" },
};
