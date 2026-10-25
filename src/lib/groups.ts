// What gets in the way today for each customer group's own page (/who/<id>). Each problem lines up, in order, with
// the benefit at the same place in AUDIENCE_GROUPS[].page.benefits, which is how AnyPress fixes it. Plain words only:
// no tool names, no claims we can't back up.
export interface GroupStory {
  problems: { title: string; body: string }[];
}

export const GROUP_STORIES: Record<string, GroupStory> = {
  shops: {
    problems: [
      { title: "A new idea means a new project", body: "Every shop starts with hosting, a theme, a payment plugin and an afternoon of settings before you sell a thing." },
      { title: "A cut of every sale", body: "Some shop builders and marketplaces take a percentage of what you sell, on top of the card fee." },
      { title: "Your customers belong to the platform", body: "On a marketplace, the buyer's email stays with the marketplace, so you can't tell them about your next drop." },
    ],
  },
  regulated: {
    problems: [
      { title: "Marketplaces can switch you off", body: "When your store is a listing on someone else's platform, their rules decide whether you can keep selling." },
      { title: "Your payment setup isn't in your hands", body: "Many shop builders only let you use their own payments, which may not accept what you sell." },
      { title: "Marketplace rules limit what you can say", body: "Listings leave little room for the labels, warnings and policies your products need." },
    ],
  },
  courses: {
    problems: [
      { title: "Your community lives elsewhere", body: "Lessons in one app, discussions in another, payments in a third, and none of it on your domain." },
      { title: "Course platforms take a share", body: "Many charge a monthly fee and a slice of every course you sell, or a price per student." },
      { title: "Your students belong to the platform", body: "If the platform keeps the student list, your next course starts with no one to tell." },
    ],
  },
  chambers: {
    problems: [
      { title: "Dues by spreadsheet", body: "Renewals, reminders and who has paid are tracked by hand, every year." },
      { title: "Events in another app", body: "Tickets and sign-ups live somewhere different from your website, with another bill." },
      { title: "Members have nowhere to meet", body: "News goes out by email blast and the members' directory is a PDF that's out of date." },
    ],
  },
  churches: {
    problems: [
      { title: "Giving through a separate app", body: "Online giving lives in one tool, with its own fees, and the website somewhere else." },
      { title: "Sign-ups on paper and in group chats", body: "Events and volunteer rotas are spread over sheets, texts and chats that newcomers never see." },
      { title: "One volunteer knows how it works", body: "The site was set up by someone who has moved on, and now no one wants to touch it." },
    ],
  },
  franchises: {
    problems: [
      { title: "Every location does its own thing", body: "Different builders, different looks and different logins make the brand hard to keep consistent." },
      { title: "Every change goes through head office", body: "When one central site holds every location, a new opening time or local offer waits in someone's inbox." },
      { title: "Each new location adds a full bill", body: "Every location pays full price for its own website, so growing costs the same per site forever." },
    ],
  },
};
