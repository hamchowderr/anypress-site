import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { Drawing, type DrawingName } from "@/components/Drawing";
import { EarningsCalculator } from "@/components/EarningsCalculator";
import { LeadForm } from "@/components/LeadForm";
import { SystemDiagram } from "@/components/SystemDiagram";
import { CtaBand, PageHero, Questions, SectionHead } from "@/components/ui";
import { VOLUME_TIERS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sell websites",
  description:
    "Sell websites to your clients as a monthly service, under your own name, from one storefront that creates a new site for every order. We build and look after every one.",
};

const FLOW: [DrawingName, string, string][] = [
  ["paint", "Set up your starting site", "Design it once: your theme, pages and plugins."],
  ["sell", "Clients buy from your storefront", "On your domain, at your prices, into your payment account."],
  ["tools", "We build each one", "A copy of your starting site, as its own WordPress, in minutes."],
  ["coins", "You get paid every month", "Clients pay you. You pay us per site, less as you grow."],
];

const YOU: [string, string][] = [
  ["Your brand", "Your name, logo and domain on the storefront and every email. AnyPress stays in the background."],
  ["Your prices", "Charge whatever you like, monthly or yearly. Your clients never see our prices."],
  ["Your payment account", "Clients pay you directly. You keep the relationship and the money."],
  ["Your starting sites", "Build the sites you sell once, and choose which one each product uses."],
  ["Your clients", "See every client and every site in one dashboard, under one login."],
];

const US: [string, string][] = [
  ["Building every site", "Each order becomes its own WordPress with its own database, in minutes."],
  ["Keeping them running", "Updates, the padlock, and every site kept walled off from the others."],
  ["Nightly copies", "Every site is saved each night, and we test restoring them every day."],
  ["Email that arrives", "Each site sends from its own address, with sending set up for you."],
  ["Moving sites in", "Bring your existing client sites over with a one-time code from your dashboard."],
];

const QUESTIONS: [string, ReactNode][] = [
  ["Do my clients see AnyPress?", "No. They buy from your storefront, get emails from your name and manage their site from an account on your shop."],
  ["How many sites do I need to start?", "There's no minimum. Start with one site. From your third live site, every site you sell saves 10%."],
  [
    "Can I bring sites I already host?",
    <>
      Yes. Make a move code in your dashboard, install our free export plugin on the old site and paste the code in. The whole site
      comes across. <Link href="/move" className="underline">How moving works</Link>.
    </>,
  ],
  [
    "Do I have to build each client's site by hand?",
    <>
      No. A paid order on your storefront builds the site by itself. Clients who sign up somewhere else can get a site from a form, a payment or your CRM
      through n8n, Make or Zapier. <Link href="/automate" className="underline">Create sites automatically</Link>.
    </>,
  ],
  ["Who supports my clients?", "You do the client-facing side, the way you do today. We support you, and we look after the sites themselves."],
  ["What does the storefront cost?", "Nothing. Your first storefront is included. You pay per site you sell."],
  [
    "I run several brands. Is this for me?",
    <>
      Then a reseller account fits better: several storefronts, one wholesale bill and partner keys for each brand.{" "}
      <Link href="/resellers" className="underline">About resellers</Link>.
    </>,
  ],
];

export default function Agencies() {
  return (
    <>
      <PageHero
        drawing="agency"
        side="technical"
        eyebrow="for agencies, freelancers and anyone with clients"
        title="One storefront. As many client sites as you can sell."
        lead="Sell websites as a monthly service, under your own name. Your clients buy from your storefront, each order becomes its own website, and we build and look after every one."
      >
        <div className="ctas mt-8">
          <Link href="/sell" className="btn btn-ink">
            Apply to sell websites →
          </Link>
          <a href="#earnings" className="btn btn-paper">
            Work out what you&apos;d earn
          </a>
        </div>
      </PageHero>

      <section className="sec soft" aria-labelledby="h-system">
        <div className="in">
          <SectionHead
            eyebrow="the system"
            title="Here's what happens behind your storefront."
            lead="You sell. Every order turns into a separate site, built from your starting site, and then we look after it."
            id="h-system"
          />
          <SystemDiagram />
        </div>
      </section>

      <section className="sec in" aria-labelledby="h-flow">
        <SectionHead eyebrow="how selling works" title="Set it up once. Sell it again and again." id="h-flow" />
        <ol className="flow">
          {FLOW.map(([d, title, sub], i) => (
            <li key={title}>
              <Drawing name={d} />
              <b>
                {i + 1}. {title}
              </b>
              <span>{sub}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="sec soft" aria-labelledby="h-split">
        <div className="in">
          <SectionHead eyebrow="who does what" title="You run the business. We run the sites." id="h-split" />
          <div className="split">
            <div>
              <h3>
                <Drawing name="nametag" still />
                You control
              </h3>
              <ul>
                {YOU.map(([b, s]) => (
                  <li key={b}>
                    <b>{b}</b>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3>
                <Drawing name="tools" still />
                We handle
              </h3>
              <ul>
                {US.map(([b, s]) => (
                  <li key={b}>
                    <b>{b}</b>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="earnings" className="sec in scroll-mt-20" aria-labelledby="h-earn">
        <SectionHead
          eyebrow="do the maths"
          title="What could you earn?"
          lead="Move the sliders. Your price per site drops as you sell more, so every new client adds more."
          id="h-earn"
        />
        <EarningsCalculator />
      </section>

      <section className="sec soft" aria-labelledby="h-tiers">
        <div className="in">
          <SectionHead
            eyebrow="volume savings"
            title="The more sites you sell, the less each one costs."
            lead="Counted across all your live sites. When you reach a new level, your other sites move to it at their next renewal."
            id="h-tiers"
          />
          <ul className="tiers">
            <li>
              <b>0%</b>
              <span>1 to 2 sites</span>
            </li>
            {VOLUME_TIERS.map((t, i) => {
              const next = VOLUME_TIERS[i + 1];
              return (
                <li key={t.sites}>
                  <b>{t.percent}% off</b>
                  <span>{next ? `${t.sites} to ${next.sites - 1} sites` : `${t.sites}+ sites`}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="sec in" aria-labelledby="h-ways">
        <SectionHead eyebrow="two ways to sell" title="Seller or reseller?" id="h-ways" />
        <div className="picker">
          <div className="pick">
            <Drawing name="sell" />
            <h3>Seller</h3>
            <p>One storefront with your name on it. Pay per site at our normal prices, with the volume savings above. Most agencies and freelancers start here.</p>
            <ul>
              <li>Freelance designers</li>
              <li>Local agencies</li>
              <li>Chambers selling to members</li>
            </ul>
            <Link href="/sell" className="go">
              Apply as a seller →
            </Link>
          </div>
          <div className="pick tech">
            <Drawing name="shops" />
            <h3>Reseller</h3>
            <p>Several storefronts under one login, one monthly wholesale bill, and partner keys so your developers can create sites with code.</p>
            <ul>
              <li>Agencies with several brands</li>
              <li>Franchise offices</li>
              <li>Software companies</li>
            </ul>
            <Link href="/resellers" className="go">
              About resellers →
            </Link>
          </div>
        </div>
      </section>

      <section className="sec soft" aria-labelledby="h-q">
        <div className="in">
          <SectionHead drawing="question" title="Questions sellers ask" id="h-q" />
          <Questions items={QUESTIONS} firstOpen />
        </div>
      </section>

      <section className="sec in" aria-labelledby="h-guide">
        <div className="guide-band">
          <div>
            <Drawing name="scroll" />
            <span className="eyebrow">not ready yet?</span>
            <h2 id="h-guide">The agency profit guide</h2>
            <p>Read it now, no sign-up needed.</p>
            <Link href="/guides/agencies" className="btn btn-ink mt-5">
              Read the guide →
            </Link>
          </div>
          <div>
            <h3>Want tips by email?</h3>
            <p>A few short emails about selling websites as a monthly service.</p>
            <LeadForm group="agencies" interest="Seller" cta="Send me tips" />
          </div>
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
