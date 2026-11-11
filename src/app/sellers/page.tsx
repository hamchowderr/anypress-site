import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { BuildYourOwn } from "@/components/BuildYourOwn";
import { Drawing, type DrawingName } from "@/components/Drawing";
import { EarningsCalculator } from "@/components/EarningsCalculator";
import { type DashboardShot, Flow, DashboardTour, type Fact, FactSheet, PlainTable, type Video, VideoRow } from "@/components/FactPieces";
import { LeadForm } from "@/components/LeadForm";
import { ProblemFix, type Problem } from "@/components/ProblemFix";
import { CtaBand, PageHero, Questions, SectionHead } from "@/components/ui";
import { CONTACT_EMAIL, LOWEST_PRICE, VOLUME_RANGE, VOLUME_TIERS, WHOLESALE_PERCENT, sitePrice, volumePercent } from "@/lib/site";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  path: "/sellers",
  title: "Sell websites",
  description:
    "Build a website once and sell it every month, under your own name. Every order on your storefront becomes the client's own site in minutes, and we host and look after every one.",
});

const FIRST = VOLUME_TIERS[0];
const link = "underline underline-offset-2";

const WHO = ["Freelance web designers", "Small web design studios", "Marketing consultants", "Chambers selling to members", "Anyone whose clients ask for a website"];

// The offer in one look, every price from the master price list (src/lib/pricing.json).
const FACTS: Fact[] = [
  [
    "storefront",
    "What you sell",
    "Websites as a monthly service: Website, Bookings, Online store, Community & courses and Everything, each in Small, Medium and Large.",
  ],
  ["tag", "What you charge", "Whatever you like, monthly or yearly. Clients pay you, into your own payment account."],
  [
    "coin",
    "What a site costs you",
    `Our list price for each live site, from $${LOWEST_PRICE} a month. ${VOLUME_RANGE} off every site once you have ${FIRST.sites} or more.`,
  ],
  ["shops", "Your storefront", "Free. A shop on your own domain, with your name, logo, prices and emails."],
  ["server", "What we do", "Build every site, host it, save a copy every night, apply security fixes and send its email."],
  ["person", "What you do", "Find clients and look after them, the way you do today. They never see AnyPress."],
  ["clock", "How fast", "A paid order becomes a working site in minutes. Nobody has to press a button."],
  ["send", "How to start", "Apply in two minutes, then book a short call with us to get set up, billing included. There's no minimum."],
];

const PROBLEMS: Problem[] = [
  {
    problem: ["You get paid once, then start again at zero", "You build a site, send the invoice, and next month you need a new project to get paid."],
    fix: [
      "Websites become a monthly service",
      <>
        Every client pays you each month, so each new one adds to what comes in.{" "}
        <a href="#example" className={link}>
          See a year of it
        </a>
        .
      </>,
    ],
  },
  {
    problem: ["Building the same site again and again", "Install WordPress, add the theme and plugins, set up email, connect the domain. For every client."],
    fix: ["Build it once, sell it every time", "Make your starting site once, or use one of ours. Every order is a copy of it, ready in minutes."],
  },
  {
    problem: ["Hosting every client is a second job", "A hosting account, a login, a renewal and a bill for every client, and you're the one they call."],
    fix: ["Every client under one login", "Each order becomes its own website on our servers, and every one of them is in one list on your dashboard."],
  },
  {
    problem: ["Upkeep eats your weekends", "Security fixes, backups and the odd emergency, for every site you've ever built."],
    fix: ["We look after every site", "Security fixes applied for you, a copy saved every night and restored in one click, and the padlock on every site."],
  },
  {
    problem: ["Big hosts put their name on everything", "Your clients see someone else's brand, and it's easy for them to go straight to the host."],
    fix: ["Your name, not ours", "Your storefront, your domain, your prices and emails from your name. Your clients never see AnyPress."],
  },
];

const VIDEOS: Video[] = [
  ["a-sellers-first-sale", "A seller's first sale, from checkout to a finished site", "0:52"],
  ["set-up-your-storefront", "Set up your storefront", "1:45"],
  ["create-sites-automatically", "Create sites from a form or a payment", "0:38"],
];

// Real screens from the dashboard in sample mode, as a seller sees it.
const DASHBOARD: DashboardShot[] = [
  {
    src: "/sell/seller-stores.webp",
    label: "app.anypress.io · Stores",
    alt: "A seller's Stores list in the AnyPress dashboard: sample client sites with their kind, version, domain, status, last backup and date",
    title: "Every client's site in one list",
    points: [
      "See which sites are ready, being built, failed or suspended, and when each was last backed up.",
      "Open any site, log in to its WordPress with one click, connect its domain or restore a backup.",
      "Start a new site by hand, or move a client's existing site in, from the top of the page.",
    ],
  },
  {
    src: "/sell/seller-templates.webp",
    label: "app.anypress.io · Templates",
    alt: "The Templates page: the starting site, its saved versions and the one new orders are copied from",
    title: "Change your starting site safely",
    points: [
      "Your starting site is what every new order gets: WordPress, the theme, your plugins and your pages.",
      "Changed something? Save it as a new version and check it before any client gets it.",
      "Choose which version new orders are copied from. Older versions stay in the list if you want to go back.",
    ],
  },
  {
    src: "/sell/seller-sales-kit.webp",
    label: "app.anypress.io · Sales Kit",
    alt: "The Sales Kit: eight kinds of customer, each with the plan to sell them and what you keep each month",
    title: "Help finding clients, built in",
    points: [
      "Pick who you want to sell to, from shops and course creators to churches and franchises, and get a day-by-day plan with the messages to send.",
      "Find businesses near you, check their current website, and print an offer sheet and a short deck.",
      "Everything goes out under your name, at your prices, and shows what you keep from each sale.",
    ],
  },
];

// A year of selling Website sites, worked out from the list price and the volume savings.
const EXAMPLE_PRICE = 49;
const EXAMPLE_MONTHS: [string, number][] = [
  ["Month 1", 1],
  ["Month 2", 3],
  ["Month 4", 6],
  ["Month 6", 10],
  ["Month 9", 18],
  ["Month 12", 25],
];
const usd = (n: number) => `$${n.toLocaleString("en-US", { maximumFractionDigits: 2, minimumFractionDigits: Number.isInteger(n) ? 0 : 2 })}`;
const EXAMPLE_ROWS: ReactNode[][] = EXAMPLE_MONTHS.map(([month, sites]) => {
  const cost = (sitePrice("website") * (100 - volumePercent(sites))) / 100;
  return [month, String(sites), usd(sites * EXAMPLE_PRICE), `${usd(cost)} each`, <b key="keep">{usd(sites * (EXAMPLE_PRICE - cost))}</b>];
});

const MOVE: [DrawingName, string, string][] = [
  ["ticket", "Get a token", "Choose Move a site in on your dashboard. We set up the new site and give you its token."],
  ["plug", "Add Reprint", "Install Reprint, WordPress's own free moving plugin, on the client's current site and paste the token in."],
  ["truck", "We copy it across", "The whole site comes straight from the old host: pages, products, orders, theme, plugins and photos."],
  ["open", "Check it, then go live", "Look it over on its new address, copy again to catch anything new, then point the domain at it."],
];

const YOU: [string, string][] = [
  ["Your brand", "Your name, logo and domain on the storefront and every email. AnyPress stays in the background."],
  ["Your prices", "Charge whatever you like, monthly or yearly. Your clients never see our prices."],
  ["Your payment account", "Clients pay you directly. You keep the relationship and the money."],
  ["Your starting sites", "Sell our ready-built sites, or your own with any plugins you like, premium ones included."],
  ["Your team", "Invite the people who help you, and choose who can change things and who can only look."],
];

const US: [string, string][] = [
  ["Building every site", "Each order becomes its own WordPress with its own database, in minutes."],
  ["Keeping them running", "Security fixes, the padlock, and every site walled off from the others."],
  ["Nightly copies", "Every site is saved each night, away from the server, and we test restoring them every day."],
  ["Email that arrives", "Each site sends from its own address, with sending set up for you."],
  ["Checking every update", "New versions of WordPress, our theme and the plugins we include are tried on every kind of site before we use them."],
];

const QUESTIONS: [string, ReactNode][] = [
  ["Do my clients see AnyPress?", "No. They buy from your storefront, get emails from your name and manage their site from an account on your shop."],
  ["How many sites do I need to start?", `None. Start with one. Once you have ${FIRST.sites} live sites, every site saves ${FIRST.percent}%, and it goes up from there.`],
  ["How fast is a client's site ready?", "Minutes after they pay. The site is copied from your starting site, with their details filled in, and the welcome email goes out from your name."],
  [
    "Can I bring sites I already look after?",
    <>
      Yes. Choose Move a site in on your dashboard, add WordPress&apos;s free Reprint plugin to the old site and paste in the token. The whole
      site is copied across. <Link href="/move" className={link}>How moving works</Link>.
    </>,
  ],
  [
    "Do I have to create each client's site by hand?",
    <>
      No. A paid order on your storefront builds the site by itself. Clients who sign up somewhere else can get a site from a form, a payment or
      your CRM through n8n, Make or Zapier. <Link href="/automate" className={link}>Create sites automatically</Link>. On HighLevel?{" "}
      <Link href="/highlevel" className={link}>
        Add a website to every sub-account
      </Link>
      .
    </>,
  ],
  [
    "What if I change my starting site later?",
    "Save the change as a new version on the Templates page, check it, then choose it for new orders. Clients' existing sites aren't touched.",
  ],
  ["Who supports my clients?", "You do the client-facing side, the way you do today. We support you, and we look after the sites themselves."],
  ["What does the storefront cost?", "Nothing. Your first storefront is included. You pay for each live site you sell."],
  [
    "I run several brands. Is this for me?",
    <>
      Then a reseller account fits better: several storefronts, one wholesale bill at {WHOLESALE_PERCENT}% off, and partner keys for each brand.{" "}
      <Link href="/resellers" className={link}>About resellers</Link>.
    </>,
  ],
  [
    "Who do I ask?",
    <>
      Email{" "}
      <a href={`mailto:${CONTACT_EMAIL}`} className={link}>
        {CONTACT_EMAIL}
      </a>
      .
    </>,
  ],
];

export default function Sellers() {
  return (
    <>
      <PageHero
        drawing="agency"
        side="technical"
        eyebrow="for anyone who builds websites for clients"
        title={
          <>
            Build it <mark>once</mark>. Sell it every month.
          </>
        }
        lead="Make one starting site, or pick one of ours. Every client who buys from your storefront gets their own copy in minutes, under your name, and pays you every month. We host every site, back it up and keep it safe."
      >
        <div className="ctas mt-8">
          <Link href="/sell" className="btn btn-ink">
            Apply to sell websites →
          </Link>
          <a href="#videos" className="btn btn-paper">
            Watch a first sale (0:52)
          </a>
        </div>
      </PageHero>

      <section className="sec soft" aria-labelledby="h-facts">
        <div className="in">
          <SectionHead eyebrow="the short version" title="Selling with AnyPress in one look." id="h-facts" />
          <FactSheet facts={FACTS} />
        </div>
      </section>

      <ProblemFix who={WHO} items={PROBLEMS} title="Selling websites shouldn't mean running a hosting company." />

      <section id="videos" className="sec soft scroll-mt-20" aria-labelledby="h-videos">
        <div className="in">
          <SectionHead
            eyebrow="recorded on the real product"
            title="Watch it work."
            lead="Short videos of the real storefront and dashboard: a client buys a website, gets it, and you look after it."
            id="h-videos"
          />
          <VideoRow videos={VIDEOS} />
        </div>
      </section>

      <section className="sec" aria-labelledby="h-dashboard">
        <div className="in">
          <SectionHead
            eyebrow="sample data, real screens"
            title="Your dashboard."
            lead="Every client and every site in one place, at app.anypress.io. You and your team sign in with a link we email you."
            id="h-dashboard"
          />
          <DashboardTour shots={DASHBOARD} />
        </div>
      </section>

      <BuildYourOwn soft />

      <section id="example" className="sec scroll-mt-20" aria-labelledby="h-example">
        <div className="in">
          <SectionHead
            eyebrow="a worked example"
            title="A year of selling one kind of site."
            lead={`Say you sell Small Website sites at $${EXAMPLE_PRICE} a month and win a few clients a month. Your cost per site drops as you pass ${VOLUME_TIERS.map((t) => t.sites).join(", ").replace(/, (\d+)$/, " and $1")} live sites.`}
            id="h-example"
          />
          <PlainTable
            label="A year of selling Website sites"
            head={["", "Live sites", "Your clients pay you", "You pay us", "You keep each month"]}
            rows={EXAMPLE_ROWS}
          />
          <p className="compare-note">
            ${EXAMPLE_PRICE} is only an example: you set your own price. Sites move to a new saving at their next renewal, so a month can be a
            little higher while they catch up. <a href="#earnings" className={link}>Try your own numbers</a>.
          </p>
        </div>
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

      <section className="sec" aria-labelledby="h-move">
        <div className="in">
          <SectionHead
            eyebrow="already have clients?"
            title="Bring the sites you already look after."
            lead="Move each client's site over at your own pace. Their old site keeps running, untouched, until you switch."
            id="h-move"
          />
          <Flow steps={MOVE} />
          <p className="compare-note">
            On WooCommerce, LearnDash, BuddyPress or another plugin? Each site can switch those to the Fluent plugins in a few clicks.{" "}
            <Link href="/move" className={link}>
              What can be switched
            </Link>
            .
          </p>
        </div>
      </section>

      <section id="earnings" className="sec soft scroll-mt-20" aria-labelledby="h-earn">
        <div className="in">
          <SectionHead
            eyebrow="your own numbers"
            title="What could you earn?"
            lead={`Pick seller or reseller, then move the sliders. As a seller your price per site drops as you sell more; as a reseller every site is ${WHOLESALE_PERCENT}% off from the first.`}
            id="h-earn"
          />
          <EarningsCalculator />
        </div>
      </section>

      <section id="tiers" className="sec scroll-mt-20" aria-labelledby="h-tiers">
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
              <span>1 to {FIRST.sites - 1} sites</span>
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

      <section className="sec soft" aria-labelledby="h-ways">
        <div className="in">
          <SectionHead eyebrow="two ways to sell" title="Seller or reseller?" lead="One business name is a seller. More than one is a reseller." id="h-ways" />
          <div className="picker">
            <div className="pick">
              <Drawing name="sell" />
              <h3>Seller</h3>
              <p>One storefront with your name on it. Pay for each site at our list price, with the volume savings above. Most people start here.</p>
              <ul>
                <li>Freelance designers</li>
                <li>Local web design studios</li>
                <li>Chambers selling to members</li>
              </ul>
              <Link href="/sell" className="go">
                Apply as a seller →
              </Link>
            </div>
            <div className="pick tech">
              <Drawing name="shops" />
              <h3>Reseller</h3>
              <p>Several storefronts under one login, {WHOLESALE_PERCENT}% off every site on one monthly bill, and partner keys so your developers can create sites with code.</p>
              <ul>
                <li>Studios with several brands</li>
                <li>Franchise offices</li>
                <li>Software companies</li>
              </ul>
              <Link href="/resellers" className="go">
                About resellers →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="sec" aria-labelledby="h-q">
        <div className="in">
          <SectionHead drawing="question" title="Questions sellers ask" id="h-q" />
          <Questions items={QUESTIONS} firstOpen />
        </div>
      </section>

      <section className="sec soft" aria-labelledby="h-guide">
        <div className="in">
          <div className="guide-band">
            <div>
              <Drawing name="scroll" />
              <span className="eyebrow">not ready yet?</span>
              <h2 id="h-guide">The profit calculator for selling websites</h2>
              <p>How the numbers work, and what your price leaves you each month. Read it now, no sign-up needed.</p>
              <Link href="/guides/sellers" className="btn btn-ink mt-5">
                Read the guide →
              </Link>
            </div>
            <div>
              <h3>Want tips by email?</h3>
              <p>A few short emails about selling websites as a monthly service.</p>
              <LeadForm group="agencies" interest="Seller" cta="Send me tips" />
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="ready?"
        title="Sell your first website this month."
        body="Tell us about your business and who you build for. It takes two minutes, then you book a short call with us to get set up, billing included."
        href="/sell"
        label="Apply to sell websites"
        drawings={["sell", "shops", "coins"]}
      />
    </>
  );
}
