import type { SiteTypeId } from "@/lib/site";

/**
 * What a site's owner sees inside their WordPress, by site type: real screens from that type's demo on /try (the
 * store template's Playground blueprint, with its sample business), saved in public/inside/<type>-<screen>.webp.
 */
export interface InsideScreen {
  src: string;
  // The tool on screen, as named in SITE_TYPES[].tools (for its logo).
  tool: string;
  title: string;
  caption: string;
}

export const INSIDE: Record<SiteTypeId, InsideScreen[]> = {
  website: [
    { src: "/inside/website-dashboard.webp", tool: "WordPress", title: "Their WordPress dashboard", caption: "Their site, its design and every tool in one place, with a list of what each one does." },
    { src: "/inside/website-contacts.webp", tool: "FluentCRM", title: "Contacts and newsletters", caption: "Everyone who signs up or gets in touch, in one list they can email." },
    { src: "/inside/website-forms.webp", tool: "Fluent Forms", title: "Forms and entries", caption: "Contact and quote forms, with every message kept on the site." },
  ],
  bookings: [
    { src: "/inside/bookings-bookings.webp", tool: "FluentBooking", title: "Every booking, by day", caption: "Who's coming, for what, with whom, and whether they've paid." },
    { src: "/inside/bookings-calendars.webp", tool: "FluentBooking", title: "Services and calendars", caption: "Each person's calendar, with the sessions people can book and their prices." },
    { src: "/inside/bookings-payments.webp", tool: "FluentCart", title: "Payments", caption: "Each booking's payment, taken by card when they book." },
    { src: "/inside/bookings-tickets.webp", tool: "Fluent Support", title: "Customer questions", caption: "Questions come in as tickets they answer from the site." },
  ],
  store: [
    { src: "/inside/store-orders.webp", tool: "FluentCart with Stripe", title: "Orders", caption: "Every order, paid and shipped, with its customer and items." },
    { src: "/inside/store-products.webp", tool: "FluentCart with Stripe", title: "Products and stock", caption: "Physical and digital products, prices and stock counts." },
    { src: "/inside/store-subscriptions.webp", tool: "FluentCart with Stripe", title: "Subscriptions", caption: "Monthly boxes and clubs that bill themselves." },
    { src: "/inside/store-affiliates.webp", tool: "FluentAffiliate", title: "Affiliates", caption: "People who send buyers get their own link and earn a share." },
  ],
  community: [
    { src: "/inside/community-feed.webp", tool: "FluentCommunity", title: "The members' feed", caption: "Members post, comment and follow along, on the site's own address." },
    { src: "/inside/community-courses.webp", tool: "FluentCommunity", title: "Courses", caption: "Courses in sections and lessons, with each student's progress." },
    { src: "/inside/community-contacts.webp", tool: "FluentCRM", title: "Members and emails", caption: "Every member in one list, ready for welcome emails and updates." },
  ],
  everything: [
    { src: "/inside/everything-feed.webp", tool: "FluentCommunity", title: "The members' area", caption: "A feed, spaces and courses for members." },
    { src: "/inside/everything-bookings.webp", tool: "FluentBooking", title: "Bookings", caption: "Each host's calendar, with the sessions people book and pay for." },
    { src: "/inside/everything-orders.webp", tool: "FluentCart", title: "Memberships and orders", caption: "Memberships, tickets and products, sold on the site." },
    { src: "/inside/everything-tickets.webp", tool: "Fluent Support", title: "Member questions", caption: "Questions come in as tickets they answer from the site." },
  ],
};

/** One plain line for each tool in a site (the store template's roles.json descriptions, shortened). */
export const TOOL_ABOUT: Record<string, string> = {
  FluentAuth: "Login protection and two-step sign-in.",
  FluentSMTP: "Makes sure the site's emails arrive.",
  FluentCRM: "Contacts, newsletters and email automations.",
  "Fluent Forms": "Contact, quote, sign-up and survey forms.",
  FluentPlayer: "Video and audio player.",
  FluentSnippets: "Add code and shortcodes safely.",
  "Rank Math SEO": "Titles, descriptions, sitemaps for Google.",
  AutomatorWP: "When this happens, do that.",
  "WP Fusion Lite": "Keeps contacts and tags in step.",
  FluentToolkit: "FluentHub: installs and updates the Fluent plugins.",
  FluentBooking: "Online booking in their calendar.",
  FluentCart: "Products, checkout, payments and subscriptions.",
  "FluentCart with Stripe": "Products, checkout, payments and subscriptions.",
  "Fluent Support": "A help desk for customer questions.",
  FluentAffiliate: "Affiliate links and commission.",
  FluentCommunity: "Members' feed, spaces and courses.",
  "AnyPress Blocks": "Popups, carousels, maps, countdowns and more.",
};

/** What every site comes with, whatever its type (also listed on /included). */
export const EVERY_SITE: [string, string][] = [
  ["Its own WordPress", "Every site runs in its own container, with its own database. Nothing is shared."],
  ["Nightly backups", "A copy every night, kept in separate storage, restored in one click."],
  ["Their own domain, with SSL", "A free .anypress.site address to start, then their own domain. Certificates renew themselves."],
  ["Email from their domain", "Receipts, bookings and newsletters send from their own address."],
  ["One-click sign-in", "Into WordPress from their account, with no extra password."],
  ["Updates done for them", "WordPress, the theme and the plugins that come with the site are kept up to date for them."],
];
