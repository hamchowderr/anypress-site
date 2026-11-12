import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { Flow, PlainTable, VideoRow, type Video } from "@/components/FactPieces";
import type { DrawingName } from "@/components/Drawing";
import { JsonLd } from "@/components/JsonLd";
import { ProblemFix, type Problem } from "@/components/ProblemFix";
import { CtaBand, PageHero, Questions, SectionHead } from "@/components/ui";
import { faqLd, pageMeta } from "@/lib/seo";

// What happens to a client's site on its own, from the order to the day they leave. Ways to start a site
// (forms, apps, the API) are on /automate; this page is the rest of the site's life.
export const metadata: Metadata = pageMeta({
  path: "/sellers/autopilot",
  title: "Selling websites on autopilot",
  card: "Selling on autopilot",
  description:
    "From the order to the day a client leaves: every site is built, billed, paused, backed up and taken offline on its own, so you never press a button.",
});

const PROBLEMS: Problem[] = [
  {
    problem: ["Building every site by hand", "Each new client means an afternoon of installing WordPress, plugins and a theme before you earn a cent."],
    fix: ["Sold means built", "Your client pays and their site is ready minutes later, copied from yours. Nobody touches a thing."],
  },
  {
    problem: ["Chasing clients who stopped paying", "The card fails, the site stays up, and you're stuck sending awkward emails."],
    fix: ["Late payers are paused for you", "No payment, no site. It comes back the moment they pay, exactly as it was."],
  },
  {
    problem: ["Old sites you're still paying for", "A client left months ago, and their site is still on your hosting bill."],
    fix: ["Leavers are cleaned up", "When a client's paid time runs out, their site is backed up and taken down. Nothing to remember."],
  },
];

const LIFE: [DrawingName, string, ReactNode][] = [
  ["pick", "Your client orders", "They pick a site on your storefront and pay you, at your price."],
  ["tools", "The site is built", "In minutes, copied from your starting site, with their details filled in."],
  ["mailbox", "They get your welcome", "An email from your name with a link to set their password and open their site."],
  ["bill", "They're billed each month", "Your storefront takes the payment. Nothing for you to send or chase."],
  ["backup", "Every night, a copy", "Their site is backed up, and we keep updating WordPress and the plugins."],
];

const WHEN: ReactNode[][] = [
  ["An order is paid", "The site is built and the welcome email goes out", "Nothing"],
  ["A monthly payment goes through", "The site stays as it is", "Nothing"],
  ["A payment fails", "The site is paused. Nothing is deleted", "Nothing"],
  ["The client pays again", "The site comes back as it was", "Nothing"],
  ["The client cancels", "The site stays up until the end of the time they paid for", "Nothing"],
  ["Their paid time runs out", "The site is backed up and taken offline", "Nothing"],
  ["30 days later", "The site is removed. Its backups are kept another 90 days", "Nothing, or change the 30 days in your settings"],
  ["The client comes back", "Their site is put back from its backup", "Nothing"],
];

const VIDEOS: Video[] = [
  ["a-sellers-first-sale", "A seller's first sale, from checkout to a finished site", "0:52"],
  ["create-sites-automatically", "Create sites from a form or a payment", "0:38"],
  ["backups-and-restores", "Backups and restores", "0:29"],
];

const FAQ: [string, ReactNode][] = [
  [
    "Do I have to do anything when someone buys?",
    "No. The order builds the site and sends your welcome email. You'll see the new site in your dashboard a few minutes later.",
  ],
  [
    "What if a client's card fails?",
    "Their site is paused, not deleted. When they pay, it comes back exactly as it was.",
  ],
  [
    "What does a paused site look like?",
    "Visitors see a short page saying the site isn't available right now. The site itself, its pages, orders and members, are kept.",
  ],
  [
    "Can a client leave and come back?",
    "Yes. If they buy again before their backups are gone, their site is put back from its last backup, with everything they had.",
  ],
  [
    "Can I take a client's site somewhere else?",
    "Yes. Download site on a site's page in your dashboard makes one zip of WordPress, its files and its database. It works on any WordPress host.",
  ],
  [
    "Can sites start somewhere other than my storefront?",
    <>
      Yes, from a form, your CRM or your own app. <Link href="/automate" className="underline">See the ways in</Link>. Every site follows the same steps after that.
    </>,
  ],
];

export default function SellingOnAutopilot() {
  return (
    <>
      <JsonLd data={faqLd(FAQ)} />
      <PageHero
        drawing="tools"
        side="technical"
        eyebrow="selling on autopilot"
        title="Sell the site. We handle everything after."
        lead="Building it, billing it, backing it up, pausing it when a card fails and taking it down when a client leaves. You get paid. Your team never presses a button."
      />

      <ProblemFix soft who={["Freelance web designers", "Small web design studios", "Marketing consultants", "Chambers selling to members", "Franchise offices"]} items={PROBLEMS} title="Selling sites shouldn't mean babysitting them." />

      <section className="sec" aria-labelledby="h-life">
        <div className="in">
          <SectionHead eyebrow="a client's first month" title="From the first payment to the next one." id="h-life" />
          <Flow steps={LIFE} />
        </div>
      </section>

      <section className="sec soft" aria-labelledby="h-when">
        <div className="in">
          <SectionHead
            eyebrow="what happens when"
            title="Every awkward moment, already handled."
            lead="Failed cards, cancellations and clients who come back. Look down the last column."
            id="h-when"
          />
          <PlainTable label="What happens to a client's site" head={["", "What happens", "What you do"]} rows={WHEN} />
        </div>
      </section>

      <section className="sec" aria-labelledby="h-watch">
        <div className="in">
          <SectionHead eyebrow="see it" title="Watch it happen on the real thing." id="h-watch" />
          <VideoRow videos={VIDEOS} />
        </div>
      </section>

      <section className="sec soft" aria-labelledby="h-faq">
        <div className="in">
          <SectionHead drawing="question" title="Questions about selling on autopilot" id="h-faq" />
          <Questions items={FAQ} firstOpen />
        </div>
      </section>

      <CtaBand
        eyebrow="ready?"
        title="Sell websites without building them."
        body="Tell us about your business, then book a short call with us to get set up."
        href="/sell"
        label="Apply to sell websites"
        drawings={["sell", "tools", "coins"]}
      />
    </>
  );
}
