// The free guide for each customer group, at /guides/<group id>. Plain words; no made-up customers or numbers
// presented as real results. Prices come from SITE_TYPES so they never drift.

export interface Guide {
  id: string;
  title: string;
  lead: string;
  sections: { heading: string; body?: string; steps?: string[]; checks?: string[] }[];
  // An interactive worksheet shown after the sections.
  calculator?: "course" | "agency";
}

export const GUIDES: Guide[] = [
  {
    id: "shops",
    title: "Moving your shop: a step-by-step checklist",
    lead: "How to move an online shop to a new home without losing sales, customers or your place on Google.",
    sections: [
      {
        heading: "Before you start",
        checks: [
          "Export your products (names, prices, descriptions, photos) from your current shop",
          "Export your customer list, and note who agreed to get emails",
          "Write down every page address that gets visits, so none of them break",
          "List your active subscriptions and when they renew",
          "Pick a quiet week. Avoid a sale or a launch",
        ],
      },
      {
        heading: "Build the new shop next to the old one",
        steps: [
          "Start your new shop on its free address. Your old shop keeps running.",
          "Add your products and photos, then check prices, shipping and taxes.",
          "Connect your payment account and place a test order.",
          "Copy your About, Contact, Shipping and Refund pages.",
          "Import your customer list with each person's email consent as it was.",
        ],
      },
      {
        heading: "Switch over",
        steps: [
          "Point your domain at the new shop. Visitors arrive there from that moment.",
          "Send old page addresses to their new pages, so links and Google results keep working.",
          "Tell your customers by email, and update the link in your social profiles.",
          "Keep the old shop open (not selling) for a month in case you need anything from it.",
        ],
      },
      {
        heading: "Subscriptions",
        body: "Existing subscribers usually have to sign up again on the new shop, because card details can't be copied from one payment setup to another. Give them a simple link and a reason to do it, like a first month at a lower price.",
      },
    ],
  },
  {
    id: "regulated",
    title: "Regulated store checklist",
    lead: "What to have in place before you sell supplements, CBD or other regulated products from your own store.",
    sections: [
      {
        heading: "Payments",
        checks: [
          "A payment account that has approved your products in writing",
          "A backup payment option in case your main one pauses your account",
          "Clear refund and cancellation terms that match what your payment provider expects",
        ],
      },
      {
        heading: "On every product page",
        checks: [
          "The label and ingredient information, as on the packaging",
          "Any warnings your products legally need",
          "No health claims you can't support",
          "Age checks where the law asks for them",
        ],
      },
      {
        heading: "Pages your store needs",
        checks: [
          "Terms, Privacy, Refund and Shipping pages",
          "A contact page with a real email address",
          "Where you ship, and where you don't",
        ],
      },
      {
        heading: "Good to know",
        body: "Rules depend on what you sell and where. This checklist is a starting point, not legal advice. Check the rules for your products with someone who knows them.",
      },
    ],
  },
  {
    id: "courses",
    title: "What your course platform really costs",
    lead: "Course platforms often charge a monthly fee and a share of every sale. Put in your numbers to see the yearly total.",
    sections: [
      {
        heading: "What to look for on your current bill",
        checks: [
          "The monthly or yearly plan price",
          "A percentage taken from each sale",
          "Extra charges per student, per course or per admin",
          "Add-ons you pay for separately (email, community, payments)",
        ],
      },
    ],
    calculator: "course",
  },
  {
    id: "chambers",
    title: "Member website program: a one-page guide",
    lead: "How a chamber or association can offer members their own websites, as a benefit or as a new source of income.",
    sections: [
      {
        heading: "How it works",
        steps: [
          "You apply as a seller and get your own shop, under your organisation's name.",
          "You pick which kinds of sites to offer members, and set your prices.",
          "Members buy from your shop. We build and look after each site.",
          "You pay per site, and the price per site drops at 3, 10 and 25 sites.",
        ],
      },
      {
        heading: "Two ways to run it",
        checks: [
          "As a member benefit: price sites at cost, and point to it when members renew",
          "As income: add a monthly margin on each site to fund your programs",
        ],
      },
      {
        heading: "Your first month",
        steps: [
          "Pick three members who need a website and offer them a first-month discount.",
          "Mention it in your newsletter and at your next event.",
          "Ask those first members if you can show their sites to others.",
        ],
      },
    ],
  },
  {
    id: "churches",
    title: "Church website checklist",
    lead: "What visitors and members look for on a church website, and what your team needs to keep it current.",
    sections: [
      {
        heading: "For visitors",
        checks: [
          "Service times and address on the home page",
          "What to expect on a first visit, including parking and children's programs",
          "A way to ask a question or a prayer request",
        ],
      },
      {
        heading: "For members",
        checks: [
          "Online giving, one-off and monthly",
          "Events and volunteer sign-ups",
          "Sermons or livestream links",
          "A weekly email with what's coming up",
        ],
      },
      {
        heading: "For your team",
        checks: [
          "More than one person can update the site",
          "A simple routine: who updates what, and when",
          "Nobody has to look after the website itself",
        ],
      },
    ],
  },
  {
    id: "franchises",
    title: "Rolling out 10 locations: a worked example",
    lead: "How a brand with ten locations can give each one its own site from one starting point, and what it costs.",
    sections: [
      {
        heading: "The plan",
        steps: [
          "Head office applies as a seller and builds one site the way every location should look.",
          "Each location gets a copy, with its own address, hours, staff and bookings.",
          "Locations update their own details. Head office keeps the look and the offers the same.",
        ],
      },
      {
        heading: "What it costs",
        body: "Ten Bookings sites at $19 each is $190 a month at full price. At ten sites the volume discount is 20%, so it comes to $152 a month for all ten.",
      },
      {
        heading: "Who pays",
        checks: [
          "Head office pays for every site and charges locations through the franchise fee, or",
          "Each location buys its own site from head office's shop",
        ],
      },
    ],
  },
  {
    id: "agencies",
    title: "Agency profit calculator",
    lead: "See what selling websites as a monthly service could earn you. You set your price; we charge per site, less as you grow.",
    sections: [
      {
        heading: "How the numbers work",
        body: "You pay us the plan price for each site, with 10% off at 3 to 9 sites, 20% off at 10 to 24, and 30% off at 25 or more. Whatever you charge your clients above that is yours.",
      },
    ],
    calculator: "agency",
  },
  {
    id: "developers",
    title: "Your first site from the API, step by step",
    lead: "Create a WordPress site for one of your customers from your own code.",
    sections: [
      {
        heading: "Steps",
        steps: [
          "Ask us for API access from the contact page. You'll get a key and a secret.",
          "Create a site with one call to /v1/tenants, giving it a name and your customer's email address.",
          "Wait for the tenant.ready webhook, or check the site's status.",
          "Send your customer their sign-in link. They open WordPress with one click.",
        ],
      },
      {
        heading: "Where to read more",
        body: "The API reference, the TypeScript and PHP SDKs and example code are in the public API repository, linked from the developers page.",
      },
    ],
  },
];
