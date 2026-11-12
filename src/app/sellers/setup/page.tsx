import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { FactSheet, Flow, VideoRow, type Fact, type Video } from "@/components/FactPieces";
import type { DrawingName } from "@/components/Drawing";
import { JsonLd } from "@/components/JsonLd";
import { ProblemFix, type Problem } from "@/components/ProblemFix";
import { CtaBand, PageHero, Questions, SectionHead } from "@/components/ui";
import { faqLd, pageMeta } from "@/lib/seo";
import { CONTACT_EMAIL } from "@/lib/site";

// How a seller or reseller gets set up: apply, a call with us, approval, and the first week.
export const metadata: Metadata = pageMeta({
  path: "/sellers/setup",
  title: "How we set you up to sell websites",
  card: "How we set you up",
  description:
    "Apply in two minutes, book a 30-minute call with us, and we set you up: your storefront, what you sell, your prices and how billing works.",
});

const STEPS: [DrawingName, string, ReactNode][] = [
  [
    "sell",
    "Apply",
    <>
      Two minutes on <Link href="/sell" className="underline">Apply to sell</Link>: your business and who you build for.
    </>,
  ],
  ["mailbox", "Book your call", "The email that follows has a link to pick a time that suits you. It takes half an hour."],
  ["question", "The call", "We get to know your business, show you how selling works on the real thing, and agree how billing works."],
  ["key", "You're approved", "You get an email with your sign-in link. Your storefront is built in minutes."],
  ["shops", "Your first week", "Make your storefront yours, pick what you sell and set your prices. We're on email the whole way."],
];

const PROBLEMS: Problem[] = [
  {
    problem: ["Sign up, then you're on your own", "Most platforms hand you a login and a help centre, and wish you luck."],
    fix: ["A real call with us", "Half an hour together before you start. We show you the real thing and answer every question."],
  },
  {
    problem: ["Not sure what to charge", "Price too low and you work for free. Too high and nobody buys."],
    fix: ["Prices worked out together", "We go through what you'd sell, what it costs you and what you'd earn, before your first sale."],
  },
  {
    problem: ["Billing surprises", "You only learn how you're charged when the first bill lands."],
    fix: ["Billing agreed on the call", "You know exactly how you pay us before you're set up."],
  },
];

const READY: Fact[] = [
  ["brush", "Your name and logo", "So your storefront looks like yours from day one."],
  ["globe", "Your domain", "The address you'd like your storefront on, if you have one."],
  ["card", "A Stripe account", "Where your clients' payments land. No account yet? We'll show you how to make one."],
  ["coin", "What you'll sell", "Roughly what you'll offer and what you'd like to charge."],
  ["shops", "Your brands", "If you run more than one, a list of them."],
];

const VIDEOS: Video[] = [
  ["set-up-your-storefront", "Set up your storefront", "1:45"],
  ["a-sellers-first-sale", "A seller's first sale, from checkout to a finished site", "0:52"],
  ["a-resellers-first-day", "A reseller's first day: storefronts, bill and keys", "1:06"],
];

const FAQ: [string, ReactNode][] = [
  [
    "Why a call? Can't I just sign up?",
    "Selling websites works best when billing, what you sell and your prices are right from day one. Half an hour together saves weeks of guessing.",
  ],
  [
    "What does the call cost?",
    "Nothing. It's how every seller and reseller starts.",
  ],
  [
    "Seller or reseller: which am I?",
    <>
      One business name is a seller. Several brands, each with its own storefront, is a reseller. We&apos;ll work it out on the call.{" "}
      <Link href="/how-it-works/sellers#h-pay" className="underline">See the difference</Link>.
    </>,
  ],
  [
    "Do I have to build a starting site?",
    "No. Sell our ready-built sites as they are, or change one into your own. We'll go through both on the call.",
  ],
  [
    "I already host client sites. Can I bring them?",
    <>
      Yes. <Link href="/move" className="underline">Moving a site in</Link> copies the whole site across. We&apos;ll plan it with you on the call.
    </>,
  ],
  [
    "Who do I talk to after I'm set up?",
    <>
      Us. Email <a href={`mailto:${CONTACT_EMAIL}`} className="underline">{CONTACT_EMAIL}</a> and we&apos;ll help.
    </>,
  ],
];

export default function SellerSetup() {
  return (
    <>
      <JsonLd data={faqLd(FAQ)} />
      <PageHero
        drawing="nametag"
        eyebrow="how we set you up"
        title="Start selling websites, with us beside you."
        lead="Every seller and reseller starts with a call. We set you up together, then stay close while you make your first sales."
      />

      <ProblemFix soft who={["Freelance web designers", "Small web design studios", "Marketing consultants", "Chambers selling to members", "Franchise offices"]} items={PROBLEMS} title="Getting started shouldn't be a guessing game." />

      <section className="sec" aria-labelledby="h-steps">
        <div className="in">
          <SectionHead eyebrow="step by step" title="From applying to your first sale." id="h-steps" />
          <Flow steps={STEPS} />
        </div>
      </section>

      <section className="sec soft" aria-labelledby="h-ready">
        <div className="in">
          <SectionHead eyebrow="before the call" title="Handy to have ready." lead="None of it is required. It just makes the call go further." id="h-ready" />
          <FactSheet facts={READY} />
        </div>
      </section>

      <section className="sec" aria-labelledby="h-watch">
        <div className="in">
          <SectionHead eyebrow="see it first" title="What you'll be setting up." id="h-watch" />
          <VideoRow videos={VIDEOS} />
        </div>
      </section>

      <section className="sec soft" aria-labelledby="h-faq">
        <div className="in">
          <SectionHead drawing="question" title="Questions about getting set up" id="h-faq" />
          <Questions items={FAQ} firstOpen />
        </div>
      </section>

      <CtaBand
        eyebrow="ready?"
        title="Apply in two minutes."
        body="Tell us about your business and who you build for. The email that follows has the link to book your call."
        href="/sell"
        label="Apply to sell websites"
        drawings={["sell", "mailbox", "shops"]}
      />
    </>
  );
}
