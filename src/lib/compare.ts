import type { DrawingName } from "@/components/drawings.generated";

// Comparison pages (/compare/<slug>). Keep every claim about the other option general and fair:
// say what it is and how it usually works, never prices, never anything we can't back up.
export interface Comparison {
  slug: string;
  name: string;
  side: "owners" | "technical";
  drawing: DrawingName;
  title: string;
  lead: string;
  // [what you need, the other option, AnyPress]
  rows: [string, string, string][];
  // When the other option is the better choice. Saying so honestly is part of the page.
  theirs: string;
  ours: string;
}

export const COMPARISONS: Comparison[] = [
  {
    slug: "hosting",
    name: "Regular web hosting",
    side: "owners",
    drawing: "server",
    title: "Hosting gives you a space. AnyPress gives you a finished site.",
    lead: "With regular hosting you rent room on a server and build the rest yourself. With AnyPress you pick what you're building and it arrives ready to use.",
    rows: [
      ["WordPress installed", "Usually one click, then it's up to you", "Done, with the right tools set up"],
      ["Picking and setting up plugins", "You choose, install and configure them", "Chosen and set up for what you're building"],
      ["Payments, bookings or courses", "Find, buy and connect each one", "In the plan you pick"],
      ["Email from your business name", "Often a separate add-on", "Included"],
      ["Security fixes for WordPress", "Your job", "Done for you"],
      ["A copy saved every night", "Depends on the plan", "Included"],
    ],
    theirs: "You want full control of a server, run software that isn't WordPress, or enjoy setting everything up yourself.",
    ours: "You'd rather spend your time on your business than on plugins, updates and settings.",
  },
  {
    slug: "multisite",
    name: "WordPress multisite",
    side: "technical",
    drawing: "shops",
    title: "Every site on its own, not one network sharing everything.",
    lead: "Multisite runs many sites from one WordPress install and one database. AnyPress gives every site its own WordPress and its own database, so one site never drags down the rest.",
    rows: [
      ["Database", "One, shared by every site", "Each site has its own"],
      ["Plugins and themes", "Installed once for the whole network", "Each site has its own"],
      ["One site gets busy or breaks", "Can slow down or affect the others", "The others carry on as normal"],
      ["Plugins that don't support multisite", "Can't be used, or need workarounds", "Every site is a normal single site"],
      ["A client wants to leave", "The site has to be pulled out of the network", "It's a normal WordPress site they can take"],
      ["Security fixes and nightly copies", "Your job, for the whole network", "Done for you, site by site"],
    ],
    theirs: "Your sites really do share users and content, like the departments of one organisation, and your team runs the server.",
    ours: "Each site belongs to a different customer, with its own plugins, its own data and its own bill.",
  },
  {
    slug: "wp-ultimo",
    name: "WP Ultimo",
    side: "technical",
    drawing: "tools",
    title: "A finished platform, instead of a plugin you host yourself.",
    lead: "WP Ultimo is a plugin that turns your own WordPress multisite network into a platform for selling sites. AnyPress is the whole platform, hosted and looked after for you.",
    rows: [
      ["What you get", "A plugin for your own multisite network", "A finished platform, hosted for you"],
      ["Servers", "You find, set up and look after them", "Included in the price per site"],
      ["How sites are kept apart", "They share one multisite network", "Each has its own WordPress and database"],
      ["Security fixes and nightly copies", "Your job", "Done for you"],
      ["Selling to your clients", "Checkout built into the plugin", "From your own shop, under your name"],
      ["A client wants to leave", "The site has to be pulled out of the network", "It's a normal WordPress site they can take"],
    ],
    theirs: "You already run a multisite network and want to look after every part of the server yourself.",
    ours: "You want to sell websites, not run servers. And if you ever want to host it yourself, AnyPress is open source.",
  },
  {
    slug: "managewp",
    name: "ManageWP",
    side: "technical",
    drawing: "agency",
    title: "Don't just manage client sites. Sell them.",
    lead: "ManageWP is a dashboard for looking after WordPress sites that are hosted somewhere else. AnyPress hosts the sites, looks after them, and lets you sell them under your own name.",
    rows: [
      ["Where client sites live", "Wherever each client hosts them", "With us, set up the same way"],
      ["Security fixes and copies", "You run them from one dashboard", "Done for you"],
      ["A new client site", "Set up hosting and WordPress, then connect it", "Created when your client checks out"],
      ["Selling sites to clients", "Not what it's for", "From your own shop, at your price"],
      ["Getting paid", "You bill clients separately", "Clients pay your shop every month"],
    ],
    theirs: "You look after sites that already live on many different hosts, and they're staying where they are.",
    ours: "You want to sell websites as a monthly service, without running hosting yourself.",
  },
];
