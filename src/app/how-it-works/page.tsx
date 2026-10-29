import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { Drawing, type DrawingName } from "@/components/Drawing";
import { JsonLd } from "@/components/JsonLd";
import { type Problem, ProblemFix } from "@/components/ProblemFix";
import { CtaBand, PageHero, Questions, SectionHead, SideSwitch } from "@/components/ui";
import { faqLd, pageMeta } from "@/lib/seo";
import { ACCOUNT_URL, HOW_SWITCH } from "@/lib/site";

// The website owner's side of How it works: someone buying a site for their own business. Sellers and resellers
// have their own version at /how-it-works/sellers; the switch under the title moves between the two.
export const metadata: Metadata = pageMeta({
  path: "/how-it-works",
  title: "How getting a website on AnyPress works",
  card: "How it works",
  description:
    "Pick what you're building and pay, and your website is ready in minutes. Add your words and photos, and we look after it every day from then on.",
});

const STEPS: {
  drawing: DrawingName;
  title: string;
  when: string;
  body: ReactNode;
  list?: string[];
}[] = [
  {
    drawing: "pick",
    title: "Pick what you're building and pay",
    when: "a minute",
    body: (
      <>
        Choose a website, bookings, a store, courses or everything, and a size. Small suits most new sites. You pay by card, monthly or
        yearly, and you have 30 days to change your mind. <Link href="/pricing" className="underline">See prices</Link>.
      </>
    ),
  },
  {
    drawing: "tools",
    title: "We build your site",
    when: "minutes",
    body: "Nobody has to press a button. As soon as you've paid, your site is being made, and it arrives finished:",
    list: [
      "Pages that already suit your kind of business",
      "The tools you picked switched on, like your shop, bookings or courses",
      "Your business name, address, time zone and currency filled in",
      "A free address to share straight away, with the padlock already on",
      "Email that sends from your site, so receipts and bookings reach people",
    ],
  },
  {
    drawing: "mailbox",
    title: "You get a welcome email",
    when: "when it's ready",
    body: "It links to your account on anypress.io. From there, one click opens your site's editor. There's no second password to set up.",
  },
  {
    drawing: "words",
    title: "Make it yours",
    when: "an afternoon",
    body: "Swap in your words, photos and prices. Change colours and fonts in a few clicks. When you're ready, connect your own domain and email starts coming from it too.",
  },
  {
    drawing: "open",
    title: "Open your doors",
    when: "whenever you like",
    body: "Share your link and start taking orders, bookings or sign-ups. Payments go straight to your own account, and we never take a cut.",
  },
  {
    drawing: "backup",
    title: "We look after it from then on",
    when: "every day",
    body: "A copy of your site is saved every night. Security fixes are applied for you. If something goes wrong, email us and a person answers.",
  },
];

const WHO = ["Shops and makers", "Coaches and studios", "Course creators", "Chambers, clubs and churches", "Any business that needs a website"];

// Most cheap hosting is a shared house; AnyPress gives every site its own flat, and we're the building manager.
const PROBLEMS: Problem[] = [
  {
    problem: ["Setting up takes days", "Hosting, WordPress, a design, the padlock and email are each their own job before you write a word."],
    fix: ["Ready in minutes", "Your site arrives with its pages, tools, padlock and email already set up. You start with the fun part."],
  },
  {
    problem: [
      "One busy site slows the rest",
      "Cheap hosting puts many websites in one shared house, so when a neighbour gets busy, everyone's site gets slow.",
    ],
    fix: ["A flat of your own", "Your site has its own space and set computing power for its size. Nothing is shared with anyone else."],
  },
  {
    problem: ["You fix the leaks yourself", "Security fixes and copies of your site are usually left for you to remember."],
    fix: ["We're the building manager", "We apply security fixes and save a copy every night, and we check those copies work."],
  },
  {
    problem: ["Moving out means packing by hand", "Some site builders make it hard to take your site anywhere else."],
    fix: ["Your furniture is yours", "It's real WordPress, so you can take a full copy of your site with you whenever you like."],
  },
];

const YOU_NEED: [DrawingName, string, string][] = [
  ["email", "An email address", "Where we send your welcome email and receipts."],
  ["card", "A card to pay with", "Monthly or yearly. Cancel any time from your account."],
  ["words", "Your words and photos", "Rough is fine. You can change them whenever you like."],
  ["domain", "Your domain, if you have one", "Optional. You can start on the free address and add it later."],
];

const WHERE: [DrawingName, string, ReactNode][] = [
  [
    "website",
    "Your account",
    <>
      On <a href={ACCOUNT_URL} className="underline">your account page</a>, under My website. See your sites, change your plan, connect your
      own domain and open each site&apos;s editor.
    </>,
  ],
  ["paint", "Your site's editor", "Where you change pages, photos, colours, products and bookings. It works like editing a document."],
  [
    "lifebuoy",
    "Help, from a person",
    <>
      Email <a href="mailto:support@anypress.io" className="underline">support@anypress.io</a>, or read the{" "}
      <Link href="/help" className="underline">help page</Link>.
    </>,
  ],
];

const FAQ: [string, ReactNode][] = [
  [
    "Do I need to be technical?",
    "No. We do the technical part. If you can write an email, you can edit your pages, and we're an email away if you get stuck.",
  ],
  [
    "How long does a new site take?",
    "Minutes, not days. You get an email as soon as it's ready. If a build ever fails, we're told straight away and fix it.",
  ],
  [
    "Is my site really separate from everyone else's?",
    "Yes. It has its own space and its own WordPress. Another site getting busy or having a problem doesn't touch yours.",
  ],
  ["Who can see or change my site?", "You, and anyone you add. We only step in to keep it running, or when you ask us for help."],
  [
    "Can I bring the site I already have?",
    <>
      If it&apos;s on WordPress, yes. <Link href="/move" className="underline">How moving works</Link>.
    </>,
  ],
  ["Can I take my site with me?", "Yes. It's real WordPress, so a full copy can go with you to any host. No lock-in."],
];

export default function HowItWorks() {
  return (
    <>
      <JsonLd data={faqLd(FAQ)} />
      <PageHero
        drawing="website"
        side="owners"
        eyebrow="how it works"
        title="Your website, ready in minutes. Looked after every day."
        lead="You pick what you're building and pay. We set everything up. You add your words and photos, and we keep it running from then on."
      >
        <div>
          <SideSwitch active="owners" {...HOW_SWITCH} />
        </div>
      </PageHero>

      <section className="sec soft" aria-labelledby="h-steps">
        <div className="in">
          <SectionHead eyebrow="step by step" title="From picking a site to opening your doors." id="h-steps" />
          <ol className="steps">
            {STEPS.map((s, i) => (
              <li key={s.title}>
                <Drawing name={s.drawing} />
                <div>
                  <h3>
                    {i + 1}. {s.title}
                    <span className="hand">{s.when}</span>
                  </h3>
                  <p>{s.body}</p>
                  {s.list && (
                    <ul>
                      {s.list.map((x) => (
                        <li key={x}>{x}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ol>
          <div className="ctas mt-10 justify-center">
            <Link href="/#sites" className="btn btn-ink">
              Start your site →
            </Link>
            <Link href="/#examples" className="btn btn-paper">
              See an example first
            </Link>
          </div>
        </div>
      </section>

      <section className="sec in" aria-labelledby="h-need">
        <SectionHead eyebrow="before you start" title="All you need." id="h-need" />
        <ul className="cards">
          {YOU_NEED.map(([d, title, body]) => (
            <li key={title} className="!basis-[240px]">
              <Drawing name={d} />
              <span className="text-[17px] font-bold">{title}</span>
              <small>{body}</small>
            </li>
          ))}
        </ul>
      </section>

      <ProblemFix soft who={WHO} title="A flat of your own, not a room in a shared house." items={PROBLEMS} />

      <section className="sec in" aria-labelledby="h-where">
        <SectionHead
          eyebrow="once you're in"
          title="Where everything lives."
          lead="Three places, and you'll mostly use the first two."
          id="h-where"
        />
        <ul className="cards">
          {WHERE.map(([d, title, body]) => (
            <li key={title} className="!basis-[300px]">
              <Drawing name={d} />
              <span className="text-[17px] font-bold">{title}</span>
              <small>{body}</small>
            </li>
          ))}
        </ul>
      </section>

      <section className="sec soft" aria-labelledby="h-faq">
        <div className="in">
          <SectionHead drawing="question" title="Questions about how it works" id="h-faq" />
          <Questions items={FAQ} firstOpen />
          <p className="mt-10 text-center text-ink-soft">
            Selling websites to your own clients?{" "}
            <Link href="/how-it-works/sellers" className="font-semibold text-ink underline">
              See how it works for sellers
            </Link>
            .
          </p>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
