import type { DrawingName } from "@/components/drawings.generated";

// The longer story for each customer group's own page (/who/<id>). The short version lives in
// AUDIENCE_GROUPS in site.ts. Plain words only: no tool names, no claims we can't back up.
export interface GroupStory {
  // What gets in the way today, in their words.
  problems: { title: string; body: string }[];
  // What AnyPress does about it, each with a drawing.
  answers: { drawing: DrawingName; title: string; body: string }[];
}

export const GROUP_STORIES: Record<string, GroupStory> = {
  shops: {
    problems: [
      { title: "A new idea means a new project", body: "Every shop starts with hosting, a theme, a payment plugin and an afternoon of settings before you sell a thing." },
      { title: "Apps that charge every month", body: "Email, reviews, a mailing list and a referral program each want their own subscription." },
      { title: "A cut of every sale", body: "Some shop builders take a percentage of what you sell, on top of the card fee." },
    ],
    answers: [
      { drawing: "store", title: "A shop that's ready to sell", body: "Products, card payments, your customer list and emails, switched on when your site arrives." },
      { drawing: "piggy", title: "No cut of your sales", body: "One monthly price for the site. The card company's fee is the only one on an order." },
      { drawing: "shops", title: "One shop or ten", body: "Start another site for your next idea. Three or more sites save you 10 to 30%." },
    ],
  },
  regulated: {
    problems: [
      { title: "Marketplaces can switch you off", body: "When your store is a listing on someone else's platform, their rules decide whether you can keep selling." },
      { title: "Your customers aren't yours", body: "On a marketplace, the customer list and their emails stay with the marketplace." },
      { title: "Building your own takes time", body: "A store of your own usually means hiring a developer and looking after the site yourself." },
    ],
    answers: [
      { drawing: "nametag", title: "Your own website", body: "Your store lives on your own domain, under your own name, not inside someone else's shop." },
      { drawing: "card", title: "Your own payment account", body: "Payments go to the account you connect, so the relationship with your payment company is yours." },
      { drawing: "email", title: "Your own customer list", body: "Every buyer lands in your list, ready for reorders, offers and a newsletter." },
    ],
  },
  educators: {
    problems: [
      { title: "Course platforms take a share", body: "Many charge a monthly fee and a slice of every course you sell." },
      { title: "Your community lives elsewhere", body: "Lessons in one app, discussions in another, payments in a third, and none of it on your domain." },
      { title: "Hard to leave", body: "Moving your students and courses off a platform later is a project of its own." },
    ],
    answers: [
      { drawing: "courses", title: "Courses and community together", body: "Lessons, progress, a members' feed and groups, all on your own site." },
      { drawing: "card", title: "Paid access", body: "Sell a course once, or a membership every month, and keep what you earn." },
      { drawing: "box", title: "It stays yours", body: "It's real WordPress on your own domain, so your students and content come with you." },
    ],
  },
  associations: {
    problems: [
      { title: "Dues by spreadsheet", body: "Renewals, reminders and who has paid are tracked by hand, every year." },
      { title: "Events in another app", body: "Tickets, sign-ups and the members' directory each live somewhere different." },
      { title: "A website nobody can update", body: "The site was built once by a volunteer, and now no one knows how to change it." },
    ],
    answers: [
      { drawing: "clubs", title: "Members and dues", body: "Members join and pay online, and renewals and reminders send themselves." },
      { drawing: "bookings", title: "Events and sign-ups", body: "Sell tickets and take sign-ups on the same site your members already use." },
      { drawing: "words", title: "Easy to keep up to date", body: "Anyone on your team can change a page. We keep the site itself running." },
    ],
  },
  franchises: {
    problems: [
      { title: "Every location does its own thing", body: "Different builders, different looks and different logins make the brand hard to keep consistent." },
      { title: "Bookings in many places", body: "Each location ends up with its own booking tool and its own monthly bill." },
      { title: "Opening a location means a new website project", body: "Each new site starts from scratch and takes weeks." },
    ],
    answers: [
      { drawing: "places", title: "A site for every location", body: "Each location gets its own site and domain, from the same starting point." },
      { drawing: "bookings", title: "Bookings built in", body: "Each location takes its own bookings and payments, with reminders that send themselves." },
      { drawing: "shops", title: "Same brand everywhere", body: "Set up the look once. Every new location starts with it, ready the same day." },
    ],
  },
  agencies: {
    problems: [
      { title: "Hosting is a side job", body: "Every client site is another server, another bill and another round of updates to keep track of." },
      { title: "One-off projects, no monthly income", body: "You build a site, get paid once, and the client comes back when something breaks." },
      { title: "Clients who can't help themselves", body: "Small changes, domains and email all come back to you." },
    ],
    answers: [
      { drawing: "sell", title: "Sell under your own name", body: "Clients buy from your own shop, at your price, and never see AnyPress." },
      { drawing: "tools", title: "We build and look after each site", body: "Updates, nightly copies and keeping sites safe are done for you." },
      { drawing: "piggy", title: "Monthly income", body: "Clients pay you every month. You pay us per site, less as you grow." },
    ],
  },
  saas: {
    problems: [
      { title: "Your customers need websites", body: "Booking pages, storefronts or member sites, and your product can't make them." },
      { title: "Hosting WordPress isn't your business", body: "Running servers, updates and backups for thousands of sites would take a team." },
      { title: "Shared sites cause shared problems", body: "Putting every customer on one WordPress install means one busy site slows the rest." },
    ],
    answers: [
      { drawing: "software", title: "Sites from your code", body: "Create, change and remove sites with an API call, from inside your own product." },
      { drawing: "key", title: "Partner keys", body: "Each of your brands gets its own keys, so your developers can work with each one." },
      { drawing: "lock", title: "Each site on its own", body: "Every customer's site has its own WordPress and its own database." },
    ],
  },
};
