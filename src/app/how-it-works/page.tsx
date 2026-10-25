import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { Drawing, type DrawingName } from "@/components/Drawing";
import { type Problem, ProblemFix } from "@/components/ProblemFix";
import { SystemDiagram } from "@/components/SystemDiagram";
import { CtaBand, PageHero, Questions, SectionHead } from "@/components/ui";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  path: "/how-it-works",
  title: "How AnyPress managed WordPress works",
  card: "How it works",
  description:
    "The system behind AnyPress: one storefront takes the orders, every order becomes its own WordPress site, and we look after all of them.",
});

const STEPS: {
  drawing: DrawingName;
  title: string;
  when: string;
  body: string;
  list?: string[];
}[] = [
  {
    drawing: "pick",
    title: "Someone picks a site and pays",
    when: "a minute",
    body: "On our shop, or on a seller's own shop. They choose the kind of site and its size, then pay by card. The payment goes to whoever owns the shop.",
  },
  {
    drawing: "tools",
    title: "AnyPress builds the site",
    when: "minutes",
    body: "The order reaches us straight away and we start building. Nobody has to press a button.",
    list: [
      "A new WordPress site with its own database, on its own",
      "A copy of the starting site: the pages, theme and tools for that kind of site",
      "The owner's name, address, time zone and currency filled in",
      "A free web address and the padlock, so it's secure from the start",
      "Email set up to send from the site's own address",
    ],
  },
  {
    drawing: "mailbox",
    title: "The owner gets a welcome email",
    when: "when it's ready",
    body: "It has a link to their account, where they open their site's editor with one click. No passwords to set up for WordPress.",
  },
  {
    drawing: "words",
    title: "They make it theirs",
    when: "an afternoon",
    body: "Their words, photos and prices go in. They can connect their own domain whenever they're ready, and email starts coming from it too.",
  },
  {
    drawing: "backup",
    title: "We look after it from then on",
    when: "every day",
    body: "A copy is saved every night and kept for a week, with weekly copies kept for a month. Security fixes are applied for them.",
  },
];

const WHO = ["Website owners", "Shops, clubs and churches", "People who sell websites"];

// Most cheap hosting is a shared house; AnyPress gives every site its own flat, and we're the building manager.
const PROBLEMS: Problem[] = [
  {
    problem: [
      "One busy site slows the rest",
      "Cheap hosting puts many websites in one shared house, so when a neighbour gets busy, everyone's site gets slow.",
    ],
    fix: ["Your own flat", "Every site has its own WordPress and database, with set computing power for its size. Nothing is shared."],
  },
  {
    problem: ["A problem next door becomes yours", "On a shared server, one hacked or broken site can drag the others down with it."],
    fix: ["Walls between neighbours", "Sites can't reach each other or the machine they run on. One site's bad day stays its own problem."],
  },
  {
    problem: ["You fix the leaks yourself", "Security fixes, copies of your site and checking those copies work are all left to you."],
    fix: ["We're the building manager", "We apply security fixes, save a copy every night and test restoring one every day."],
  },
  {
    problem: [
      "Setting up takes days",
      "Hosting, WordPress, a theme, the padlock and email are each their own job before you write a word.",
    ],
    fix: ["Ready in minutes", "Every order becomes a finished site with its pages, the padlock and email already set up."],
  },
  {
    problem: ["Moving out means packing by hand", "Some site builders make it hard to take your site anywhere else."],
    fix: ["Your furniture is yours", "It's normal WordPress, so you can take a full copy to any host whenever you like."],
  },
];

const UNDER_HOOD: [DrawingName, string, ReactNode][] = [
  [
    "server",
    "Its own containers",
    "Every site runs in its own WordPress and database containers. Nothing is shared between customers' sites.",
  ],
  ["lock", "Walled off", "Sites can't reach each other or the machine they run on. One site having a bad day stays its own problem."],
  ["sizes", "Sizes we've tested", "Small, Medium and Large each get set computing power, memory and storage, sized from load tests."],
  ["backup", "Copies kept off-site", "Nightly copies are stored away from the servers, and we test restoring one every day."],
  [
    "key",
    "An API for everything",
    <>
      Sellers and software teams can create, change and remove sites with code.{" "}
      <Link href="/developers" className="underline">
        See the API
      </Link>
      .
    </>,
  ],
  [
    "box",
    "Open source",
    <>
      The software behind AnyPress is open source, so you can read how it works, or{" "}
      <Link href="/self-host" className="underline">
        run it yourself
      </Link>
      .
    </>,
  ],
];

const FAQ: [string, ReactNode][] = [
  [
    "Is my site really separate from everyone else's?",
    "Yes. Each site has its own WordPress and its own database. It isn't one big WordPress with lots of sites inside it, so another site getting busy or breaking doesn't touch yours.",
  ],
  [
    "What is a starting site?",
    "It's the site every new order is copied from. We have one for each kind of site. Sellers can set up their own, with their design and pages, so every client starts with it.",
  ],
  [
    "How long does a new site take?",
    "Minutes, not days. The owner gets an email as soon as it's ready, and if a build ever fails, we're told straight away and fix it.",
  ],
  [
    "Who can see or change my site?",
    "You, and anyone you add to your WordPress. We only step in to keep it running, and when you ask us for help.",
  ],
  [
    "Can I take my site with me?",
    <>
      It&apos;s normal WordPress, so a full copy can go with you to any host. And you can{" "}
      <Link href="/move" className="underline">
        bring a WordPress site in
      </Link>{" "}
      too.
    </>,
  ],
];

export default function HowItWorks() {
  return (
    <>
      <PageHero
        drawing="shops"
        eyebrow="how it works"
        title="One storefront. Every order becomes its own website."
        lead="Here's the system behind every AnyPress site: how an order turns into a real WordPress site in minutes, and how we look after all of them afterwards."
      >
        <div className="ctas mt-8">
          <Link href="/#sites" className="btn btn-ink">
            Start your site →
          </Link>
          <Link href="/agencies" className="btn btn-paper">
            Sell websites with it
          </Link>
        </div>
      </PageHero>

      <ProblemFix soft who={WHO} title="A flat of your own, not a room in a shared house." items={PROBLEMS} />

      <section className="sec" aria-labelledby="h-system">
        <div className="in">
          <SectionHead
            eyebrow="the big picture"
            title="One storefront can create as many sites as you sell."
            lead="Our shop works this way, and so does every seller's shop. One place takes the orders. Every order becomes a separate website."
            id="h-system"
          />
          <SystemDiagram
            storefront="A storefront"
            storefrontSub="Ours at shop.anypress.io, or your own if you sell websites."
            template="the starting site"
          />
        </div>
      </section>

      <section className="sec soft" aria-labelledby="h-steps">
        <div className="in">
          <SectionHead eyebrow="step by step" title="What happens when someone buys." id="h-steps" />
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
        </div>
      </section>

      <section className="sec in" aria-labelledby="h-template">
        <SectionHead
          eyebrow="for sellers"
          title="Set it up once. Every client gets a copy."
          lead="If you sell websites, you build your starting site once: your design, your pages, your plugins. From then on, every client who buys from your shop gets their own copy of it, built for you."
          id="h-template"
          drawing="paint"
        />
        <div className="ctas">
          <Link href="/agencies" className="btn btn-ink">
            How selling works →
          </Link>
          <Link href="/resellers" className="btn btn-paper">
            Several brands? Become a reseller
          </Link>
        </div>
      </section>

      <section className="sec soft" aria-labelledby="h-hood">
        <div className="in">
          <SectionHead
            eyebrow="under the hood"
            title="For the technical folks."
            lead="The same system, in a bit more detail."
            id="h-hood"
          />
          <ul className="cards">
            {UNDER_HOOD.map(([d, title, body]) => (
              <li key={title} className="!basis-[300px]">
                <Drawing name={d} />
                <span className="text-[17px] font-bold">{title}</span>
                <small>{body}</small>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="sec in" aria-labelledby="h-faq">
        <SectionHead drawing="question" title="Questions about how it works" id="h-faq" />
        <Questions items={FAQ} firstOpen />
      </section>

      <CtaBand />
    </>
  );
}
