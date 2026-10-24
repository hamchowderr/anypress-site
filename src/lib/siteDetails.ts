import type { DrawingName } from "@/components/drawings.generated";
import type { SiteTypeId } from "@/lib/site";

// The longer story for each kind of site's own page (/sites/<id>). Plain words, and only what the tools in
// SITE_TYPES[].tools actually do today.
export interface SiteDetail {
  // One drawing per entry in SITE_TYPES[].features, in the same order.
  featureDrawings: [DrawingName, DrawingName, DrawingName, DrawingName];
  // Everything you can do with it, short lines.
  can: string[];
  // What the owner adds after we've built it ("Your part").
  yourPart: string;
  questions: [string, string][];
}

export const SITE_DETAILS: Record<SiteTypeId, SiteDetail> = {
  website: {
    featureDrawings: ["question", "note", "email", "words"],
    can: [
      "As many pages as you need",
      "A blog with categories",
      "Contact and quote forms",
      "Newsletter sign-up and sending",
      "Set up for Google: titles, previews and a sitemap",
      "Your own colours, fonts and logo",
      "Logins for your team",
      "Looks right on phones",
      "Your own domain and email address",
    ],
    yourPart: "your words, photos and opening hours",
    questions: [
      ["Can I change the design?", "Yes. Colours, fonts, your logo and every page's layout can be changed in the editor, with no code."],
      ["Will people find me on Google?", "Your site is set up so search engines can read it from day one. Ranking still takes time and good content, but nothing technical is holding you back."],
      ["Can I send a newsletter?", "Yes. People sign up on your site and you send them emails from your own address. Your size sets how many emails a month."],
      ["Can I add a shop or bookings later?", "Yes. Move to Store, Bookings or Everything and your pages stay exactly where they are."],
    ],
  },
  bookings: {
    featureDrawings: ["bookings", "card", "mailbox", "nametag"],
    can: [
      "One-to-one appointments",
      "Group classes and events",
      "Free calls and paid sessions",
      "Set your hours and breaks between bookings",
      "Take card payment when they book",
      "Confirmation and reminder emails",
      "Booking forms with your own questions",
      "Times shown in each client's time zone",
      "A full website around your calendar",
    ],
    yourPart: "your services, times and prices",
    questions: [
      ["Can I offer free consultations too?", "Yes. Make some bookings free and others paid, each with its own length and price."],
      ["Can I run group classes?", "Yes. Set how many spots a class has, and it stops taking bookings when it's full."],
      ["Where does the money go?", "Straight to the payment account you connect. We don't take a cut, only the card company's normal fee applies."],
      ["Can clients book from their phone?", "Yes. The whole site, booking calendar included, works on phones."],
    ],
  },
  store: {
    featureDrawings: ["card", "piggy", "email", "coins"],
    can: [
      "Physical products with options like size and colour",
      "Digital downloads",
      "Subscriptions that renew every month",
      "Discount codes",
      "Customer accounts with their order history",
      "Order and shipping emails from your address",
      "Your own shipping and tax settings",
      "Product pages set up for Google",
      "An affiliate program, when you want one",
    ],
    yourPart: "your products, photos and prices",
    questions: [
      ["How do I get paid?", "You connect your own card payment account. Money from each order goes straight to you, and we don't add any fee on top."],
      ["Is there a limit on products?", "We don't set one. The size you pick sets the storage for your photos and files, and you can move up any time."],
      ["Do you handle sales tax?", "You set your tax rates and the shop adds them at checkout. Filing taxes stays with you or your accountant."],
      ["Can I sell subscriptions?", "Yes. Monthly or yearly subscriptions renew and charge on their own, and customers manage them from their account."],
    ],
  },
  community: {
    featureDrawings: ["clubs", "teach", "card", "mailbox"],
    can: [
      "A members' feed with posts and comments",
      "Groups for different topics or cohorts",
      "Member profiles",
      "Courses with lessons and progress",
      "Free and paid membership levels",
      "One-off or monthly payments",
      "Welcome emails and announcements",
      "Works in any browser, on any phone",
      "All on your own domain",
    ],
    yourPart: "your lessons, groups and membership prices",
    questions: [
      ["Do members need to download an app?", "No. Your community runs on your website and works in any browser, on a phone or a computer."],
      ["Can I have free and paid members?", "Yes. Keep some groups and lessons open to everyone and the rest for paying members."],
      ["Do you take a share of course sales?", "No. You pay one monthly price for the site, whatever you earn."],
      ["Can I move my students over?", "Yes. You can bring your member list with you and invite everyone to the new site."],
    ],
  },
  everything: {
    featureDrawings: ["everything", "nametag", "lifebuoy", "shops"],
    can: [
      "A shop with products, downloads and subscriptions",
      "Bookings and paid sessions",
      "A members' area and courses",
      "A help desk for customer questions",
      "Newsletters and automatic emails",
      "Forms for anything",
      "One record for every customer",
      "Logins for your team",
      "Room to grow without moving",
    ],
    yourPart: "your products, services and pages",
    questions: [
      ["Why not buy two smaller plans?", "Everything puts all the tools on one site, so a customer who buys, books and joins is one person, not three. It also costs less than the four other plans together, and adds a help desk."],
      ["Do I have to use every part?", "No. Switch on what you need today. The rest is ready when you are."],
      ["Which size should I pick?", "Small suits most new sites. Busy shops and big communities usually move to Medium or Large, and you can change any time."],
      ["Is it harder to look after?", "No. We keep every part updated and saved every night, the same as any other AnyPress site."],
    ],
  },
};
