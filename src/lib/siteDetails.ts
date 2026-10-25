import type { DrawingName } from "@/components/drawings.generated";
import type { IconName } from "@/components/icons.generated";
import type { Problem } from "@/components/ProblemFix";
import type { SiteTypeId } from "@/lib/site";

// The longer story for each kind of site's own page (/sites/<id>). Plain words, and only what the tools in
// SITE_TYPES[].tools actually do today.
export interface SiteDetail {
  // One drawing per entry in SITE_TYPES[].features, in the same order.
  featureDrawings: [DrawingName, DrawingName, DrawingName, DrawingName];
  // Everything you can do with it, grouped by job. Only what the free plugins this site type gets (see
  // waas-provisioning-api templates/anypress-store/roles.json) really do; nothing marked Pro. The first three groups
  // have an animated scene from scripts/vignettes.mjs.
  // Each item has a small drawn icon from scripts/icons.mjs.
  can: { title: string; scene?: string; items: [IconName, string][] }[];
  // What the owner adds after we've built it ("Your part").
  yourPart: string;
  questions: [string, string][];
  // What gets in the way for the people in SITE_TYPES[].idealFor, and how this kind of site fixes it.
  problems: Problem[];
}

export const SITE_DETAILS: Record<SiteTypeId, SiteDetail> = {
  website: {
    featureDrawings: ["question", "note", "email", "words"],
    can: [
      {
        title: "Pages, a blog, and it fits a phone",
        scene: "website-pages",
        items: [
          ["pages", "As many pages as you need"],
          ["pen", "A blog with categories and tags"],
          ["apps", "Ready-made page layouts to start from"],
          ["blocks", "Edit by dragging blocks, no code"],
          ["brush", "Your own colours, fonts and logo"],
          ["phone", "Looks right on phones and tablets"],
        ],
      },
      {
        title: "People find you and get in touch",
        scene: "website-forms",
        items: [
          ["form", "Contact and quote forms with your own questions"],
          ["branch", "Questions that show or hide based on earlier answers"],
          ["inbox", "Every message saved, searchable and downloadable"],
          ["bell", "An email to you each time someone writes in"],
          ["search", "Titles, previews and a sitemap set up for Google"],
          ["redirect", "Redirects and a log of broken links"],
        ],
      },
      {
        title: "Yours from top to bottom",
        scene: "website-yours",
        items: [
          ["globe", "Your own domain"],
          ["mail", "Emails sent from your own address"],
          ["chart", "Connect Google Search Console and Analytics"],
          ["code", "Add your own code snippets safely"],
          ["plug", "Connect your plugins so one action starts another"],
          ["box", "Bring your current WordPress site with a free plugin"],
        ],
      },
      {
        title: "Your newsletter and contacts",
        items: [
          ["contact", "A contact list with notes and history for each person"],
          ["tag", "Sort people with tags and lists"],
          ["send", "Send newsletters to everyone or one group"],
          ["eye", "See who opened and clicked"],
          ["bolt", "Automatic emails when someone signs up or fills in a form"],
          ["mail", "Sign-ups confirmed by email, and unsubscribes handled for you"],
        ],
      },
    ],
    yourPart: "your words, photos and opening hours",
    problems: [
      {
        problem: [
          "Builders charge extra for the basics",
          "Forms, a newsletter and email from your own name are often add-ons with their own bills.",
        ],
        fix: [
          "The basics are included",
          "Contact forms, newsletter sign-up and sending, and email from your own address come with the site.",
        ],
      },
      {
        problem: ["Every change needs a developer", "Updating opening hours or a photo means emailing someone and waiting."],
        fix: ["Edit it yourself", "Change words, photos, colours, fonts and your logo in the editor, with no code."],
      },
      {
        problem: ["Nobody finds you on Google", "Many sites go live without the basics search engines look for."],
        fix: ["Ready for search from day one", "Page titles, link previews and a sitemap are set up for you. Good content does the rest."],
      },
    ],
    questions: [
      ["Can I change the design?", "Yes. Colours, fonts, your logo and every page's layout can be changed in the editor, with no code."],
      [
        "Will people find me on Google?",
        "Your site is set up so search engines can read it from day one. Ranking still takes time and good content, but nothing technical is holding you back.",
      ],
      [
        "Can I send a newsletter?",
        "Yes. People sign up on your site and you send them emails from your own address. Your size sets how many emails a month.",
      ],
      ["Can I add a shop or bookings later?", "Yes. Move to Store, Bookings or Everything and your pages stay exactly where they are."],
    ],
  },
  bookings: {
    featureDrawings: ["bookings", "card", "mailbox", "nametag"],
    can: [
      {
        title: "Clients book themselves",
        scene: "bookings-calendar",
        items: [
          ["person", "One-to-one appointments"],
          ["clock", "Several lengths for one service, like 30 or 60 minutes"],
          ["pin", "Meet in person, by phone or online"],
          ["form", "Booking forms with your own questions"],
          ["calendar", "A booking page, or a calendar inside any page"],
          ["repeat", "Clients can cancel or rebook from their email"],
        ],
      },
      {
        title: "Paid and confirmed on the spot",
        scene: "bookings-paid",
        items: [
          ["card", "Take card payment when they book, by Stripe or PayPal"],
          ["coin", "Free calls and paid sessions side by side"],
          ["mail", "Confirmation emails to you and your client"],
          ["bell", "Reminder emails before each booking"],
          ["repeat", "Cancellation and rebooking emails"],
          ["contact", "Every client saved in your contact list"],
        ],
      },
      {
        title: "On your hours",
        scene: "bookings-hours",
        items: [
          ["calendar", "Set your weekly hours and days off"],
          ["pen", "Change one day without touching your week"],
          ["cup", "Breaks before and after each booking"],
          ["funnel", "How far ahead people can book, and a daily limit"],
          ["globe", "Times shown in each client's time zone"],
          ["chart", "A report of booked, completed and cancelled sessions"],
        ],
      },
      {
        title: "Keep clients coming back",
        items: [
          ["contact", "Each client's bookings and notes in one place"],
          ["send", "Newsletters and offers to past clients"],
          ["bolt", "Automatic follow-up emails after a booking"],
          ["chat", "A help desk where clients can ask questions"],
          ["pages", "A full website around your calendar, with contact forms"],
        ],
      },
    ],
    yourPart: "your services, times and prices",
    problems: [
      {
        problem: [
          "Back-and-forth to find a time",
          "Clients message you, you check your diary, and it takes five messages to book one session.",
        ],
        fix: ["Clients book themselves", "They pick a free time on your calendar, shown in their own time zone, and it's booked."],
      },
      {
        problem: ["No-shows cost you money", "An empty slot someone forgot about is income you don't get back."],
        fix: [
          "Paid when they book, reminded before",
          "Take card payment when they book, and confirmation and reminder emails go out on their own.",
        ],
      },
      {
        problem: [
          "The booking app is another bill",
          "A scheduling tool on top of your website, with its own monthly fee and its own look.",
        ],
        fix: ["Your calendar is part of your website", "Bookings live on your own site, under your own domain, in one price."],
      },
    ],
    questions: [
      ["Can I offer free consultations too?", "Yes. Make some bookings free and others paid, each with its own length and price."],
      [
        "Can I run group classes?",
        "Not yet. Each booking is one client at one time today. If you run group classes, email support@anypress.io and we'll tell you what works now.",
      ],
      [
        "Where does the money go?",
        "Straight to the payment account you connect. We don't take a cut, only the card company's normal fee applies.",
      ],
      ["Can clients book from their phone?", "Yes. The whole site, booking calendar included, works on phones."],
    ],
  },
  store: {
    featureDrawings: ["card", "piggy", "email", "coins"],
    can: [
      {
        title: "Sell anything",
        scene: "store-products",
        items: [
          ["box", "Physical products with options like size and colour"],
          ["download", "Digital downloads, delivered securely"],
          ["repeat", "Subscriptions with free trials and setup fees"],
          ["frame", "Categories, labels like \"New\" and photo galleries"],
          ["inbox", "Stock tracking that hides sold-out items"],
          ["star", "Star ratings and reviews from verified buyers"],
        ],
      },
      {
        title: "A checkout that brings them back",
        scene: "store-checkout",
        items: [
          ["card", "Card payments by Stripe, or PayPal"],
          ["bag", "A quick checkout, or a pop-up one that stays on the page"],
          ["person", "Guest checkout or customer accounts"],
          ["percent", "Discount codes with limits and product rules"],
          ["eye", "Customers see their orders, downloads and subscriptions"],
          ["bell", "Subscribers pause or cancel themselves, with a reminder before each renewal"],
        ],
      },
      {
        title: "Ship it and get found",
        scene: "store-shipping",
        items: [
          ["truck", "Shipping zones, classes and your own rates"],
          ["receipt", "Tax rules, including EU tax"],
          ["mail", "Order, receipt and shipping emails from your address"],
          ["refund", "Refunds from the order screen"],
          ["search", "Product pages set up for Google"],
          ["chart", "Sales reports: revenue, top products, refunds and subscriptions"],
        ],
      },
      {
        title: "Marketing and growth",
        items: [
          ["contact", "Every buyer in your contact list"],
          ["bolt", "Automatic emails after a purchase"],
          ["send", "Newsletters to all customers or one group"],
          ["link", "An affiliate program: partners get a link and earn commission"],
          ["coin", "Affiliate sign-ups, approvals and payout records"],
          ["chat", "A help desk where customers ask about their orders"],
          ["inbox", "A store summary in your inbox"],
        ],
      },
    ],
    yourPart: "your products, photos and prices",
    problems: [
      {
        problem: ["A cut of every sale", "Marketplaces and some shop platforms take a percentage of each order on top of their fees."],
        fix: ["No cut of your sales", "One monthly price. The card company's normal fee is the only fee on an order."],
      },
      {
        problem: [
          "A payment company can freeze your account",
          "If your only way to take payments is suspended, your shop stops selling overnight.",
        ],
        fix: [
          "Two ways to get paid, side by side",
          "Connect your own Stripe and PayPal accounts together, so customers can still pay if one has a problem.",
        ],
      },
      {
        problem: ["Your customers belong to the marketplace", "Their emails and order history stay with the platform you sell on."],
        fix: [
          "Your customers are yours",
          "Customer accounts, order history and your email list live on your own site, and emails come from your name.",
        ],
      },
    ],
    questions: [
      [
        "How do I get paid?",
        "You connect your own card payment account. Money from each order goes straight to you, and we don't add any fee on top.",
      ],
      [
        "Is there a limit on products?",
        "We don't set one. The size you pick sets the storage for your photos and files, and you can move up any time.",
      ],
      [
        "Do you handle sales tax?",
        "You set your tax rates and the shop adds them at checkout. Filing taxes stays with you or your accountant.",
      ],
      [
        "Can I sell subscriptions?",
        "Yes. Monthly or yearly subscriptions renew and charge on their own, and customers manage them from their account.",
      ],
    ],
  },
  community: {
    featureDrawings: ["clubs", "teach", "card", "mailbox"],
    can: [
      {
        title: "A place to talk",
        scene: "community-feed",
        items: [
          ["heart", "A members' feed with posts, comments and reactions"],
          ["apps", "Spaces for different topics or cohorts"],
          ["people", "Member profiles and a member directory"],
          ["poll", "Polls, mentions and hashtags"],
          ["bell", "Notifications and an email digest"],
          ["shield", "Approve new members, filter bad words and review reports"],
        ],
      },
      {
        title: "Courses with progress",
        scene: "community-courses",
        items: [
          ["book", "Courses made of lessons, written in the block editor"],
          ["progress", "Progress tracking for every student"],
          ["calendar", "Lessons that open on a schedule"],
          ["unlock", "Free preview lessons"],
          ["chat", "A discussion under every lesson"],
          ["video", "Videos, images and files in lessons and posts"],
        ],
      },
      {
        title: "Memberships that pay",
        scene: "community-members",
        items: [
          ["ticket", "Free and paid spaces and courses"],
          ["card", "One-off or monthly payments by card"],
          ["tag", "Several price options for one course"],
          ["key", "Paying members go straight in"],
          ["brush", "Your own name, colours and logo"],
          ["moon", "Light and dark mode"],
        ],
      },
      {
        title: "Keep members coming back",
        items: [
          ["chat", "A welcome message for new members"],
          ["contact", "Every member in your contact list"],
          ["megaphone", "Newsletters and announcements by email"],
          ["bolt", "Automatic emails when someone signs up or buys"],
          ["phone", "Works in any browser, on any phone"],
          ["globe", "All on your own domain"],
        ],
      },
    ],
    yourPart: "your lessons, groups and membership prices",
    problems: [
      {
        problem: ["Course platforms take a share", "A monthly fee plus a slice of every course or membership you sell."],
        fix: ["One price, whatever you earn", "You pay for the site. Every sale goes to your own payment account."],
      },
      {
        problem: ["Lessons, chat and payments in three apps", "Members jump between a course app, a chat group and a payment page."],
        fix: ["All in one place", "Courses, a members' feed, groups and payments together, on your own domain."],
      },
      {
        problem: ["Members have to download an app", "Every extra download loses some of the people you invited."],
        fix: ["Works in any browser", "Your community runs on your website, on any phone or computer, with nothing to install."],
      },
    ],
    questions: [
      [
        "Do members need to download an app?",
        "No. Your community runs on your website and works in any browser, on a phone or a computer.",
      ],
      ["Can I have free and paid members?", "Yes. Keep some groups and lessons open to everyone and the rest for paying members."],
      ["Do you take a share of course sales?", "No. You pay one monthly price for the site, whatever you earn."],
      ["Can I move my students over?", "Yes. You can bring your member list with you and invite everyone to the new site."],
    ],
  },
  everything: {
    featureDrawings: ["everything", "nametag", "lifebuoy", "shops"],
    can: [
      {
        title: "Sell and take bookings",
        scene: "everything-sell",
        items: [
          ["bag", "A shop with products, downloads and subscriptions"],
          ["percent", "Discount codes, reviews, shipping and tax"],
          ["calendar", "One-to-one bookings with card payment"],
          ["form", "Forms for anything, with your own questions"],
          ["chart", "Sales and booking reports"],
        ],
      },
      {
        title: "Teach and help",
        scene: "everything-teach",
        items: [
          ["people", "A members' feed, spaces and profiles"],
          ["book", "Courses with lessons, progress and scheduled lessons"],
          ["ticket", "Free and paid memberships"],
          ["chat", "A help desk with tickets, priorities and private notes"],
          ["eye", "Customers see their past tickets when they sign in"],
        ],
      },
      {
        title: "One record for every customer",
        scene: "everything-record",
        items: [
          ["contact", "Each customer's orders and support tickets in one place"],
          ["tag", "Tags and lists to sort everyone"],
          ["send", "Newsletters to everyone or one group"],
          ["bolt", "Automatic emails after a purchase, booking or sign-up"],
          ["link", "An affiliate program for partners"],
          ["people", "Logins for your team"],
        ],
      },
      {
        title: "Your website too",
        items: [
          ["pages", "As many pages as you need, and a blog"],
          ["apps", "Ready-made page layouts to start from"],
          ["search", "Titles, previews and a sitemap set up for Google"],
          ["redirect", "Redirects and a log of broken links"],
          ["globe", "Your own domain and emails from your own address"],
          ["box", "Bring your current WordPress site with a free plugin"],
        ],
      },
    ],
    yourPart: "your products, services and pages",
    problems: [
      {
        problem: [
          "A different tool for every job",
          "A shop, a booking tool, a course platform and a help desk that don't talk to each other.",
        ],
        fix: ["One site does it all", "Shop, bookings, members' area and courses together, with one record for every customer."],
      },
      {
        problem: ["Customer questions get lost", "Emails about orders and bookings pile up in your inbox with no way to track them."],
        fix: ["A help desk built in", "Questions become tickets you and your team can answer and track, on your own site."],
      },
      {
        problem: ["Growing means moving", "Outgrow a simple site and you rebuild somewhere else."],
        fix: ["Room to grow", "Switch on parts as you need them and move up a size any time. Your site stays where it is."],
      },
    ],
    questions: [
      [
        "Why not buy two smaller plans?",
        "Everything puts all the tools on one site, so a customer who buys, books and joins is one person, not three. It also costs less than the four other plans together, and adds a help desk.",
      ],
      ["Do I have to use every part?", "No. Switch on what you need today. The rest is ready when you are."],
      [
        "Which size should I pick?",
        "Small suits most new sites. Busy shops and big communities usually move to Medium or Large, and you can change any time.",
      ],
      [
        "Is it harder to look after?",
        "No. We apply security fixes to every part and save it every night, the same as any other AnyPress site.",
      ],
    ],
  },
};
