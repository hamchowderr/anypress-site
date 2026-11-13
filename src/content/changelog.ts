// What changed for customers, newest first. One entry per change people will notice, written for them: what it does
// for their site, not how it was built. Dated the day it reached customer sites (for store changes, the day the store
// template carrying it went live), never the day the code merged. The monthly newsletter roundup is written from here.

export type ChangeFor = "website" | "bookings" | "store" | "community" | "everything" | "sellers";

export interface Change {
  /** YYYY-MM-DD, the day it reached customers. */
  date: string;
  title: string;
  body: string;
  /** Who it's for. Leave empty when it's for every site. */
  for: ChangeFor[];
  link?: { href: string; label: string };
}

export const CHANGES: Change[] = [
  {
    date: "2026-11-13",
    title: "Demos say they aren't saved",
    body: "Trying a site on the Try page now says plainly that the demo runs in your browser and is cleared when you close the tab, and your browser asks before you close it. Make This My Site keeps your changes.",
    for: [],
    link: { href: "/try", label: "Try a site" },
  },
  {
    date: "2026-11-13",
    title: "Aisle: a finished design for clothing shops",
    body: "A home page that opens on a full-screen photo, your categories as photos edge to edge, a lookbook, gift cards and a help centre that's already written: shipping, returns and exchanges, a size guide and track an order.",
    for: ["store", "everything"],
    link: { href: "/designs", label: "See the designs" },
  },
  {
    date: "2026-11-13",
    title: "Care without a call first",
    body: "Want us to make changes to your site? Pick a care package straight after checkout or from your account, no call to book first.",
    for: [],
    link: { href: "/care", label: "See care packages" },
  },
  {
    date: "2026-11-12",
    title: "Move in from Calendly, Skool, Brevo and MailerLite",
    body: "Booking sites can bring their Calendly hours, event types and upcoming bookings. Communities can bring their Skool members. Any site can bring its Brevo or MailerLite contacts into FluentCRM.",
    for: [],
    link: { href: "/move", label: "See every move" },
  },
  {
    date: "2026-11-12",
    title: "A cancellation form for shoppers in Europe",
    body: "Every site that sells with FluentCart now has the 14-day cancellation form EU and UK shoppers have a right to, with each request kept on its order.",
    for: ["bookings", "store", "community", "everything"],
  },
  {
    date: "2026-11-12",
    title: "New arrivals and categories on your shop's home page",
    body: "Your shop's home page shows your newest products and a Shop by category row, so shoppers see what you sell straight away.",
    for: ["store", "everything"],
  },
  {
    date: "2026-11-11",
    title: "Seven days free, on every plan",
    body: "Start any site and try it for 7 days before you pay. Add a card when you start, and cancel before day 8 to pay nothing. One free trial per person.",
    for: [],
    link: { href: "/pricing", label: "See plans" },
  },
  {
    date: "2026-11-11",
    title: "More room when you need it",
    body: "Add 25 GB of storage to any site from your account. Packs stack, and you can pause or cancel one any time.",
    for: [],
  },
  {
    date: "2026-11-11",
    title: "Your community on your home page",
    body: "Show your community on your home page from Settings, Reading, so members land in their feed. Members stay out of wp-admin and only ever see your community.",
    for: ["community", "everything"],
  },
  {
    date: "2026-11-11",
    title: "Courses and members from Tutor LMS, LifterLMS and MemberPress",
    body: "Bring your courses with their lessons and students' progress from Tutor LMS or LifterLMS, and your active MemberPress members into their spaces and courses.",
    for: ["community", "everything"],
    link: { href: "/move", label: "See every move" },
  },
  {
    date: "2026-11-11",
    title: "Download a copy of your whole site",
    body: "Tools, Download my site gives you one zip of your whole site, files and database included, that restores on any WordPress host. Your site is yours.",
    for: [],
  },
  {
    date: "2026-11-11",
    title: "Shop pages that match your design",
    body: "FluentCart's product, cart and checkout pages now follow your site's colours and fonts.",
    for: ["store", "everything"],
  },
  {
    date: "2026-11-10",
    title: "Your site in more than one language",
    body: "Turn on the Languages switch and Polylang is set up for you, with a language switcher in your menu.",
    for: [],
  },
  {
    date: "2026-11-10",
    title: "A cleaner wp-admin",
    body: "Your WordPress Dashboard opens on a tidy home page with what you need, without other plugins' notices and upsells.",
    for: [],
  },
];

export const FOR_LABELS: Record<ChangeFor, string> = {
  website: "Website",
  bookings: "Bookings",
  store: "Online store",
  community: "Community & courses",
  everything: "Everything",
  sellers: "Sellers",
};
