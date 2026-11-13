// What changed for customers, newest first. One entry per change people will notice, written for them: what it does
// for their site, not how it was built. Dated the day it reached customer sites (for store changes, the day the store
// template carrying it went live), never the day the code merged. The monthly newsletter roundup is written from here.

export type ChangeFor = "website" | "bookings" | "store" | "community" | "everything" | "sellers";

export type ChangeKind = "new" | "improved" | "fixed";

export interface Change {
  /** A short slug, unique on the page: the entry's link is anypress.io/changelog#<id>. */
  id: string;
  /** YYYY-MM-DD, the day it reached customers. */
  date: string;
  kind: ChangeKind;
  /** A smaller change: listed under the day's "smaller improvements", closed until opened. */
  minor?: boolean;
  /** A picture of the change, from public/. */
  image?: { src: string; alt: string };
  title: string;
  body: string;
  /** Who it's for. Leave empty when it's for every site. */
  for: ChangeFor[];
  link?: { href: string; label: string };
}

export const CHANGES: Change[] = [
  {
    id: "demos-not-saved",
    date: "2026-11-13",
    kind: "improved",
    minor: true,
    title: "Demos say they aren't saved",
    body: "Trying a site on the Try page now says plainly that the demo runs in your browser and is cleared when you close the tab, and your browser asks before you close it. Make This My Site keeps your changes.",
    for: [],
    link: { href: "/try", label: "Try a site" },
  },
  {
    id: "aisle",
    date: "2026-11-13",
    kind: "new",
    title: "Aisle: a finished design for clothing shops",
    body: "A home page that opens on a full-screen photo, your categories as photos edge to edge, a lookbook, gift cards and a help centre that's already written: shipping, returns and exchanges, a size guide and track an order.",
    for: ["store", "everything"],
    link: { href: "/designs", label: "See the designs" },
  },
  {
    id: "care-without-a-call",
    date: "2026-11-13",
    kind: "improved",
    title: "Care without a call first",
    body: "Want us to make changes to your site? Pick a care package straight after checkout or from your account, no call to book first.",
    for: [],
    link: { href: "/care", label: "See care packages" },
  },
  {
    id: "calendly-skool-brevo-mailerlite",
    date: "2026-11-12",
    kind: "new",
    title: "Move in from Calendly, Skool, Brevo and MailerLite",
    body: "Booking sites can bring their Calendly hours, event types and upcoming bookings. Communities can bring their Skool members. Any site can bring its Brevo or MailerLite contacts into FluentCRM.",
    for: [],
    link: { href: "/move", label: "See every move" },
  },
  {
    id: "eu-cancellation-form",
    date: "2026-11-12",
    kind: "new",
    title: "A cancellation form for shoppers in Europe",
    body: "Every site that sells with FluentCart now has the 14-day cancellation form EU and UK shoppers have a right to, with each request kept on its order.",
    for: ["bookings", "store", "community", "everything"],
  },
  {
    id: "shop-home-page",
    date: "2026-11-12",
    kind: "improved",
    minor: true,
    title: "New arrivals and categories on your shop's home page",
    body: "Your shop's home page shows your newest products and a Shop by category row, so shoppers see what you sell straight away.",
    for: ["store", "everything"],
  },
  {
    id: "free-trial",
    date: "2026-11-11",
    kind: "new",
    title: "Seven days free, on every plan",
    body: "Start any site and try it for 7 days before you pay. Add a card when you start, and cancel before day 8 to pay nothing. One free trial per person.",
    for: [],
    link: { href: "/pricing", label: "See plans" },
  },
  {
    id: "storage-packs",
    date: "2026-11-11",
    kind: "new",
    title: "More room when you need it",
    body: "Add 25 GB of storage to any site from your account. Packs stack, and you can pause or cancel one any time.",
    for: [],
  },
  {
    id: "community-home-page",
    date: "2026-11-11",
    kind: "new",
    title: "Your community on your home page",
    body: "Show your community on your home page from Settings, Reading, so members land in their feed. Members stay out of wp-admin and only ever see your community.",
    for: ["community", "everything"],
  },
  {
    id: "tutor-lifter-memberpress",
    date: "2026-11-11",
    kind: "new",
    title: "Courses and members from Tutor LMS, LifterLMS and MemberPress",
    body: "Bring your courses with their lessons and students' progress from Tutor LMS or LifterLMS, and your active MemberPress members into their spaces and courses.",
    for: ["community", "everything"],
    link: { href: "/move", label: "See every move" },
  },
  {
    id: "download-my-site",
    date: "2026-11-11",
    kind: "new",
    title: "Download a copy of your whole site",
    body: "Tools, Download my site gives you one zip of your whole site, files and database included, that restores on any WordPress host. Your site is yours.",
    for: [],
  },
  {
    id: "shop-pages-match",
    date: "2026-11-11",
    kind: "improved",
    minor: true,
    title: "Shop pages that match your design",
    body: "FluentCart's product, cart and checkout pages now follow your site's colours and fonts.",
    for: ["store", "everything"],
  },
  {
    id: "languages",
    date: "2026-11-10",
    kind: "new",
    title: "Your site in more than one language",
    body: "Turn on the Languages switch and Polylang is set up for you, with a language switcher in your menu.",
    for: [],
  },
  {
    id: "cleaner-wp-admin",
    date: "2026-11-10",
    kind: "improved",
    minor: true,
    title: "A cleaner wp-admin",
    body: "Your WordPress Dashboard opens on a tidy home page with what you need, without other plugins' notices and upsells.",
    for: [],
  },
];

export const KIND_LABELS: Record<ChangeKind, string> = { new: "New", improved: "Improved", fixed: "Fixed" };

export const FOR_LABELS: Record<ChangeFor, string> = {
  website: "Website",
  bookings: "Bookings",
  store: "Online store",
  community: "Community & courses",
  everything: "Everything",
  sellers: "Sellers",
};
