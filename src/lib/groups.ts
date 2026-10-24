import type { DrawingName } from "@/components/drawings.generated";

// The extra story for each customer group's own page (/who/<id>): what gets in the way today, and a drawing for each
// of the three benefits in AUDIENCE_GROUPS[].page. Plain words only: no tool names, no claims we can't back up.
export interface GroupStory {
  // What gets in the way today, in their words.
  problems: { title: string; body: string }[];
  // One drawing per benefit, in the same order.
  drawings: [DrawingName, DrawingName, DrawingName];
}

export const GROUP_STORIES: Record<string, GroupStory> = {
  shops: {
    problems: [
      { title: "A new idea means a new project", body: "Every shop starts with hosting, a theme, a payment plugin and an afternoon of settings before you sell a thing." },
      { title: "Apps that charge every month", body: "Email, reviews, a mailing list and a referral program each want their own subscription." },
      { title: "A cut of every sale", body: "Some shop builders take a percentage of what you sell, on top of the card fee." },
    ],
    drawings: ["store", "piggy", "email"],
  },
  regulated: {
    problems: [
      { title: "Marketplaces can switch you off", body: "When your store is a listing on someone else's platform, their rules decide whether you can keep selling." },
      { title: "Your customers aren't yours", body: "On a marketplace, the customer list and their emails stay with the marketplace." },
      { title: "Building your own takes time", body: "A store of your own usually means hiring a developer and looking after the site yourself." },
    ],
    drawings: ["store", "card", "note"],
  },
  courses: {
    problems: [
      { title: "Course platforms take a share", body: "Many charge a monthly fee and a slice of every course you sell." },
      { title: "Your community lives elsewhere", body: "Lessons in one app, discussions in another, payments in a third, and none of it on your domain." },
      { title: "Hard to leave", body: "Moving your students and courses off a platform later is a project of its own." },
    ],
    drawings: ["courses", "piggy", "email"],
  },
  chambers: {
    problems: [
      { title: "Dues by spreadsheet", body: "Renewals, reminders and who has paid are tracked by hand, every year." },
      { title: "Events in another app", body: "Tickets, sign-ups and the members' directory each live somewhere different." },
      { title: "A website nobody can update", body: "The site was built once by a volunteer, and now no one knows how to change it." },
    ],
    drawings: ["coins", "ticket", "clubs"],
  },
  churches: {
    problems: [
      { title: "Giving through a separate app", body: "Online giving lives in one tool, events in another and the website somewhere else." },
      { title: "One volunteer knows how it works", body: "The site was set up by someone who has moved on, and now no one wants to touch it." },
      { title: "Groups scattered everywhere", body: "Small groups and ministries meet in group chats that newcomers never find." },
    ],
    drawings: ["card", "ticket", "words"],
  },
  franchises: {
    problems: [
      { title: "Every location does its own thing", body: "Different builders, different looks and different logins make the brand hard to keep consistent." },
      { title: "Bookings in many places", body: "Each location ends up with its own booking tool and its own monthly bill." },
      { title: "Opening a location means a new website project", body: "Each new site starts from scratch and takes weeks." },
    ],
    drawings: ["shops", "places", "piggy"],
  },
};
