import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { BuildYourOwn } from "@/components/BuildYourOwn";
import { Drawing, type DrawingName } from "@/components/Drawing";
import { JsonLd } from "@/components/JsonLd";
import { SystemDiagram } from "@/components/SystemDiagram";
import { CtaBand, PageHero, Questions, SectionHead, SideSwitch } from "@/components/ui";
import { faqLd, pageMeta } from "@/lib/seo";
import { HOW_SWITCH, VOLUME_TIERS, WHOLESALE_PERCENT } from "@/lib/site";

// The seller and reseller side of How it works: a storefront under your own name, where every order becomes its own
// site. Website owners have their own version at /how-it-works.
export const metadata: Metadata = pageMeta({
  path: "/how-it-works/sellers",
  title: "How selling websites on AnyPress works",
  card: "How selling works",
  description:
    "Your storefront takes the orders under your own name, every order becomes its own WordPress site built from your starting site, and AnyPress hosts and looks after every one.",
});

const FIRST = VOLUME_TIERS[0];
const LAST = VOLUME_TIERS[VOLUME_TIERS.length - 1];

const STEPS: { drawing: DrawingName; title: string; when: string; body: ReactNode }[] = [
  {
    drawing: "sell",
    title: "Apply and get approved",
    when: "we email you back",
    body: (
      <>
        Tell us about your business on <Link href="/sell" className="underline">Apply to sell</Link>. We read every application and set you up
        as a seller, or as a reseller if you run several brands.
      </>
    ),
  },
  {
    drawing: "shops",
    title: "Set up your storefront",
    when: "an afternoon",
    body: "Your first storefront is free: a shop on your own domain, with your name, logo and prices. Payments go into your own payment account.",
  },
  {
    drawing: "paint",
    title: "Choose what you sell",
    when: "once",
    body: "Sell our ready-built sites as they are, or make your own starting site with your design, pages and plugins. You only build it once.",
  },
  {
    drawing: "pick",
    title: "Your client buys from your shop",
    when: "a minute",
    body: "They pick a site and pay you, at your price. They never see AnyPress.",
  },
  {
    drawing: "tools",
    title: "We build their site",
    when: "minutes",
    body: "Each order becomes its own WordPress site, copied from your starting site, with your client's details filled in. Nobody has to press a button.",
  },
  {
    drawing: "mailbox",
    title: "Your client gets their welcome, from you",
    when: "when it's ready",
    body: "The email comes from your name. Your client signs in on your shop and opens their site with one click.",
  },
  {
    drawing: "backup",
    title: "We look after every site",
    when: "every day",
    body: "Nightly copies, security fixes and email sending, for every site you sell. You look after your clients, we look after the sites.",
  },
];

// Where each person signs in. Sellers' clients never get an AnyPress login.
const WHERE: [DrawingName, string, ReactNode][] = [
  [
    "nametag",
    "Your team: the dashboard",
    <>
      At <a href="https://app.anypress.io" className="underline">app.anypress.io</a>. Every client and every site in one list, your
      storefronts, starting sites, plugins, bills and keys.
    </>,
  ],
  ["shops", "Your storefront", "Your own WordPress shop. Change products, prices, emails and the look like any other site."],
  ["website", "Your clients: your shop", "They sign in on your storefront to see their site, change plan and open their editor."],
];

const PAY: [string, string, string][] = [
  ["Who it's for", "One business name, one storefront", "Several brands, a storefront for each"],
  [
    "What you pay us",
    `Our list price per site, ${FIRST.percent}% off from ${FIRST.sites} sites, up to ${LAST.percent}% from ${LAST.sites}`,
    `${WHOLESALE_PERCENT}% off list for every site`,
  ],
  ["How you pay", "Per site, as you sell", "One wholesale bill a month"],
  ["What you charge", "Whatever you like", "Whatever you like, per brand"],
  ["Code access", "An API key", "Partner keys for each brand"],
];

const UNDER_HOOD: [DrawingName, string, ReactNode][] = [
  ["server", "Its own containers", "Every site runs in its own WordPress and database containers. Nothing is shared between sites."],
  ["lock", "Walled off", "Sites can't reach each other or the machine they run on. One site having a bad day stays its own problem."],
  ["sizes", "Sizes we've tested", "Small, Medium and Large each get set computing power, memory and storage, sized from load tests."],
  ["backup", "Copies kept off-site", "Nightly copies are stored away from the servers, and we test restoring one every day."],
  [
    "key",
    "An API for everything",
    <>
      Create, change and remove sites with code, or from n8n, Make and Zapier.{" "}
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
  ["Do my clients see AnyPress?", "No. They buy from your storefront, get emails from your name and manage their site from an account on your shop."],
  [
    "What is a starting site?",
    "It's the site every new order is copied from. Use one of ours, or set up your own with your design, pages and plugins, so every client starts with it.",
  ],
  ["What does the storefront cost?", "Nothing. Your first storefront is included. You pay per site you sell."],
  [
    "Can I create sites without a shop?",
    <>
      Yes. Sites can come from a form, a payment or your own app through the API, n8n, Make or Zapier.{" "}
      <Link href="/automate" className="underline">Create sites automatically</Link>.
    </>,
  ],
  ["Who supports my clients?", "You do the client-facing side. We support you, and we look after the sites themselves."],
  [
    "Can I bring sites I already host?",
    <>
      Yes. Make a move code in your dashboard and the whole site comes across. <Link href="/move" className="underline">How moving works</Link>.
    </>,
  ],
];

export default function HowItWorksSellers() {
  return (
    <>
      <JsonLd data={faqLd(FAQ)} />
      <PageHero
        drawing="shops"
        side="technical"
        eyebrow="how it works for sellers"
        title="Your storefront. Every order becomes its own website."
        lead="Sell websites under your own name. Your clients buy from your shop, each order is built as its own site from your starting site, and we host and look after every one."
      >
        <div>
          <SideSwitch active="technical" {...HOW_SWITCH} />
        </div>
      </PageHero>

      <section className="sec soft" aria-labelledby="h-system">
        <div className="in">
          <SectionHead
            eyebrow="the big picture"
            title="One storefront can create as many sites as you sell."
            lead="One place takes the orders. Every order becomes a separate website, and then we look after it."
            id="h-system"
          />
          <SystemDiagram />
        </div>
      </section>

      <section className="sec" aria-labelledby="h-steps">
        <div className="in">
          <SectionHead eyebrow="step by step" title="From applying to your hundredth client." id="h-steps" />
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
                </div>
              </li>
            ))}
          </ol>
          <div className="ctas mt-10 justify-center">
            <Link href="/sell" className="btn btn-ink">
              Apply to sell websites →
            </Link>
            <Link href="/agencies#earnings" className="btn btn-paper">
              Work out what you&apos;d earn
            </Link>
          </div>
        </div>
      </section>

      <BuildYourOwn soft />

      <section className="sec in" aria-labelledby="h-where">
        <SectionHead eyebrow="who signs in where" title="Your team, your shop, your clients." id="h-where" />
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

      <section className="sec soft" aria-labelledby="h-pay">
        <div className="in">
          <SectionHead
            eyebrow="two ways to sell"
            title="Seller or reseller?"
            lead="One business name is a seller. More than one is a reseller."
            id="h-pay"
          />
          <div className="compare even">
            <div className="tablewrap" tabIndex={0} role="region" aria-label="Seller and reseller compared">
              <table>
                <thead>
                  <tr>
                    <th scope="col">
                      <span className="sr-only">Question</span>
                    </th>
                    <th scope="col">Seller</th>
                    <th scope="col">Reseller</th>
                  </tr>
                </thead>
                <tbody>
                  {PAY.map(([q, a, b]) => (
                    <tr key={q}>
                      <th scope="row">{q}</th>
                      <td>{a}</td>
                      <td>{b}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="ctas mt-10 justify-center">
            <Link href="/agencies" className="btn btn-ink">
              Selling websites →
            </Link>
            <Link href="/resellers" className="btn btn-paper">
              Becoming a reseller
            </Link>
          </div>
        </div>
      </section>

      <section className="sec" aria-labelledby="h-hood">
        <div className="in">
          <SectionHead eyebrow="under the hood" title="For the technical folks." lead="The same system, in a bit more detail." id="h-hood" />
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

      <section className="sec soft" aria-labelledby="h-faq">
        <div className="in">
          <SectionHead drawing="question" title="Questions sellers ask" id="h-faq" />
          <Questions items={FAQ} firstOpen />
          <p className="mt-10 text-center text-ink-soft">
            Want a website for your own business?{" "}
            <Link href="/how-it-works" className="font-semibold text-ink underline">
              See how it works for website owners
            </Link>
            .
          </p>
        </div>
      </section>

      <CtaBand
        eyebrow="ready?"
        title="Ready to sell websites?"
        body="Tell us about your business and who you build for. We read every application and email you back."
        href="/sell"
        label="Apply to sell websites"
        drawings={["sell", "shops", "coins"]}
      />
    </>
  );
}
