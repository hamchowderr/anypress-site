import Link from "next/link";
import type { ReactNode } from "react";
import type { DrawingName } from "@/components/Drawing";
import { BuildYourOwn } from "@/components/BuildYourOwn";
import { CompareTable } from "@/components/CompareTable";
import { EarningsCalculator } from "@/components/EarningsCalculator";
import {
  type DashboardShot,
  Flow,
  DashboardTour,
  type Fact,
  FactSheet,
  PlainTable,
  type Video,
  VideoRow,
} from "@/components/FactPieces";
import { ProblemFix, type Problem } from "@/components/ProblemFix";
import { CtaBand, PageHero, Questions, SectionHead } from "@/components/ui";
import { INCLUDED, Included } from "@/components/HomePage";
import {
  CONTACT_EMAIL,
  LOWEST_PRICE,
  SITE_TYPES,
  VOLUME_RANGE,
  VOLUME_TIERS,
  WHOLESALE_PERCENT,
  sitePrice,
  wholesalePrice,
} from "@/lib/site";

const link = "underline underline-offset-2";
const money = (n: number) => `$${n.toFixed(2).replace(/\.00$/, "")}`;

const WHO = [
  "Studios with several brands",
  "Franchise offices",
  "Web hosts",
  "Software companies",
  "Groups that run sites for members",
];

// The offer in one look, every price from the master price list (src/lib/pricing.json).
const FACTS: Fact[] = [
  [
    "shops",
    "What you get",
    "Several storefronts under one login: one for each brand, region or kind of customer.",
  ],
  [
    "coin",
    "What a site costs you",
    `${WHOLESALE_PERCENT}% off our list price for every live site, from the first one. A Small Website is ${money(wholesalePrice(LOWEST_PRICE))} a month.`,
  ],
  [
    "receipt",
    "How you pay",
    "One bill on the 1st, for the days each site was live. Suspended sites don't count.",
  ],
  [
    "tag",
    "What you charge",
    "Whatever you like, for each brand. Customers buy from your storefronts and pay you.",
  ],
  [
    "key",
    "For your developers",
    "Partner keys for each brand, so your own app can create, change and remove sites.",
  ],
  [
    "server",
    "What we do",
    "Build every site, host it, save a copy every night, apply security fixes and send its email.",
  ],
  [
    "people",
    "Your team",
    "Invite the people who help you, and choose who can change things and who can only look.",
  ],
  [
    "send",
    "How to start",
    "Apply, book a short call with us to agree billing, and we set up your account and your first storefronts.",
  ],
];

const PROBLEMS: Problem[] = [
  {
    problem: [
      "Every brand needs its own setup",
      "A separate account, login and set of sites for each brand, region or kind of customer.",
    ],
    fix: [
      "Several storefronts, one login",
      "Run a storefront for each brand, region or kind of customer, and switch between them at the top of the dashboard.",
    ],
  },
  {
    problem: [
      "A pile of bills every month",
      "Hosting bills per brand and per client, each to check and pay.",
    ],
    fix: [
      "One wholesale bill",
      `Every live site across every brand on one bill, ${WHOLESALE_PERCENT}% off, sent on the 1st.`,
    ],
  },
  {
    problem: [
      "Your developers wait on manual steps",
      "Someone has to click through a setup for every new site your product sells.",
    ],
    fix: [
      "Partner keys for each brand",
      <>
        Your code creates, changes and removes sites on its own. See the{" "}
        <Link href="/developers" className={link}>
          developer page
        </Link>
        .
      </>,
    ],
  },
  {
    problem: [
      "Your brand gets lost",
      "Hosting emails, error pages and dashboards show someone else's name.",
    ],
    fix: [
      "Your brand, not ours",
      "Customers buy from your storefronts at your prices. Even if a site is ever unavailable, they see your brand.",
    ],
  },
  {
    problem: [
      "Servers to run for every brand",
      "Security fixes, backups and keeping hundreds of sites online.",
    ],
    fix: [
      "We run every site",
      "Security fixes, nightly copies and keeping each site safe are done for you.",
    ],
  },
  {
    problem: [
      "Afraid of being locked in",
      "If the platform changes or disappears, your whole business goes with it.",
    ],
    fix: [
      "Open source underneath",
      <>
        Everything behind AnyPress is public, so you can always{" "}
        <Link href="/self-host" className={link}>
          run it yourself
        </Link>
        .
      </>,
    ],
  },
];

const VIDEOS: Video[] = [
  [
    "a-resellers-first-day",
    "A reseller's first day: storefronts, bill and keys",
    "1:06",
  ],
  ["your-first-site-from-the-api", "Your first site from the API", "1:47"],
  [
    "create-sites-automatically",
    "Create sites from a form or a payment",
    "0:38",
  ],
];

// Real screens from the dashboard in sample mode, as a reseller sees it.
const DASHBOARD: DashboardShot[] = [
  {
    src: "/sell/reseller-bill.webp",
    label: "app.anypress.io · Reseller Account",
    alt: "The Reseller Account page: this month's bill so far, site by site at 40% off list, past invoices and the reseller's storefronts",
    title: "One bill for every brand",
    points: [
      "This month's bill so far, line by line: each storefront, each size, the days its sites were live and the price each.",
      "Past invoices to view or download, and a CSV of any month.",
      "Your storefronts in one list, with a button to add the next one.",
    ],
  },
  {
    src: "/sell/reseller-stores.webp",
    label: "app.anypress.io · Stores",
    alt: "A reseller's Stores list: sample sites with the storefront that sold each one, its version, domain, status and last backup",
    title: "Every site, from every storefront",
    points: [
      "See which storefront sold each site, and whether it's ready, being built or suspended.",
      "Open any site, log in to its WordPress with one click, connect its domain or restore a backup.",
      "Move a customer's existing site in, or start one by hand.",
    ],
  },
  {
    src: "/sell/reseller-sales-kit.webp",
    label: "app.anypress.io · Sales Kit",
    alt: "The Sales Kit: eight kinds of customer, each with the plan to sell them and what you keep each month at wholesale",
    title: "A plan for each kind of customer",
    points: [
      "Eight kinds of customer, from shops and course creators to franchises and software teams, each with a day-by-day plan and the messages to send.",
      "What you keep from each sale, worked out at your wholesale price.",
      "Everything goes out under the storefront's own name, never ours.",
    ],
  },
];

// For franchises: a page on head office's site, against a site of its own for every location.
const LOCATIONS: [string, string, string][] = [
  [
    "Starting on brand",
    "Each location set up by hand, and they drift apart",
    "Every location is copied from the same starting site",
  ],
  [
    "Local details",
    "Every change waits for head office",
    "Each location changes its own hours, team, offers and bookings",
  ],
  [
    "Its own address",
    "A folder on head office's site",
    "Its own domain, under the location's own name",
  ],
  [
    "When something breaks",
    "One problem can take every location down",
    "Each site is walled off, so a problem stays in one place",
  ],
  [
    "Billing",
    "One big plan for everyone, whatever they use",
    "Each location's site on your bill only while it's live",
  ],
];

// Two brands, worked out at wholesale.
const BRANDS: [
  brand: string,
  typeId: "website" | "bookings",
  sites: number,
  price: number,
][] = [
  ["Brand A: sites for trades", "website", 20, 49],
  ["Brand B: booking sites for salons", "bookings", 10, 79],
];
const usd = (n: number) =>
  `$${n.toLocaleString("en-US", { maximumFractionDigits: 2, minimumFractionDigits: Number.isInteger(n) ? 0 : 2 })}`;
const brandRows = BRANDS.map(([brand, id, sites, price]) => {
  const cost = wholesalePrice(sitePrice(id));
  return { brand, sites, price, cost, paid: sites * price, owed: sites * cost };
});
const TOTAL = brandRows.reduce(
  (t, r) => ({
    sites: t.sites + r.sites,
    paid: t.paid + r.paid,
    owed: t.owed + r.owed,
  }),
  { sites: 0, paid: 0, owed: 0 },
);
const EXAMPLE_ROWS: ReactNode[][] = [
  ...brandRows.map((r) => [
    r.brand,
    `${r.sites} at ${usd(r.price)}`,
    usd(r.paid),
    `${usd(r.owed)} (${usd(r.cost)} each)`,
    usd(r.paid - r.owed),
  ]),
  [
    <b key="t">Every month</b>,
    `${TOTAL.sites} sites`,
    usd(TOTAL.paid),
    usd(TOTAL.owed),
    <b key="k">{usd(TOTAL.paid - TOTAL.owed)}</b>,
  ],
];

const TABLE: ReactNode[][] = [
  ["Storefronts", "One, with your name on it", "Several, under one login"],
  ["How you pay", "For each site, as you sell", "One wholesale bill a month"],
  [
    "Saving as you grow",
    `${VOLUME_RANGE} off with ${VOLUME_TIERS[0].sites} or more sites`,
    `${WHOLESALE_PERCENT}% off every site, from the first one`,
  ],
  [
    "Sites you sell",
    "Ours, or your own with any plugins",
    "Ours, or your own, different for each storefront",
  ],
  ["Partner keys for developers", "No", "Yes, for each brand"],
  [
    "Who it suits",
    "Freelancers, studios and groups with one brand",
    "Studios, franchises, hosts and software companies with several",
  ],
];

const STEPS: [DrawingName, string, string][] = [
  [
    "words",
    "Apply",
    "Tell us about your business and your brands. It takes a few minutes.",
  ],
  [
    "question",
    "Book a short call",
    "We answer your questions, agree how billing works and set up your reseller account.",
  ],
  [
    "shops",
    "Set up your storefronts",
    "Add a storefront for each brand, with its own domain, prices and starting site.",
  ],
  [
    "coins",
    "Sell",
    "Your customers pay you. Each site is built in minutes, and we send one bill a month.",
  ],
];

const WHOLESALE: [string, string, string][] = SITE_TYPES.map((t) => [
  t.name,
  `${money(t.from)} a month`,
  `${money(wholesalePrice(t.from))} a month`,
]);

const FAQ: [string, ReactNode][] = [
  [
    "What does it cost?",
    `${WHOLESALE_PERCENT}% off our list price for every live site, on one bill each month. A site that goes live mid-month is billed for the days it was live, and suspended sites don't count. You charge your customers whatever you like.`,
  ],
  [
    "Do my customers see AnyPress?",
    "No. They buy from your storefronts, at your prices, under your brands.",
  ],
  [
    "Seller or reseller: which am I?",
    "One business name? You're a seller. More than one? You're a reseller. One application covers both, and we'll set up the right account.",
  ],
  [
    "Can each brand sell different sites?",
    "Yes. Each storefront has its own starting site, its own prices and its own domain.",
  ],
  [
    "Can I start as a seller and become a reseller later?",
    "Yes. Tell us when you're ready and we'll move your account over.",
  ],
  [
    "Can my developers create sites automatically?",
    <>
      Yes, with or without a developer. Partner keys let your code create,
      change and remove sites for each brand, and no-code tools like n8n, Make
      and Zapier can do it from a form, a payment or your CRM. See{" "}
      <Link href="/automate" className={link}>
        create sites automatically
      </Link>
      .
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

// The pains resellers name first (paying for every brand piece by piece, updates that break sites), in the
// homepage's words (site PR #46).
const TOP_PROBLEMS: Problem[] = [
  {
    problem: [
      "Paying for every brand piece by piece",
      "Hosting, plugin licences and email for every brand and every client, each with its own bill.",
    ],
    fix: PROBLEMS[1].fix,
  },
  {
    problem: [
      "One update breaks a pile of sites",
      "Everything stops working, and your customers hear it before you do.",
    ],
    fix: PROBLEMS[4].fix,
  },
  PROBLEMS[0],
  PROBLEMS[2],
  PROBLEMS[3],
  PROBLEMS[5],
];

export function ResellersPage() {
  return (
    <>
      <PageHero
        side="technical"
        drawing="shops"
        eyebrow="for businesses with more than one brand"
        title={
          <>
            Sell websites under every brand you run.{" "}
            <mark>We set it all up</mark>.
          </>
        }
        lead={`Each brand gets its own storefront, ready to sell, at ${WHOLESALE_PERCENT}% off every site. We build every site, host it and look after it, and you get one bill on the 1st of the month.`}
      >
        <div className="ctas mt-8">
          <Link href="/sell" className="btn btn-ink">
            Apply to become a reseller →
          </Link>
          <a href="#videos" className="btn btn-paper">
            Watch a reseller&apos;s first day (1:06)
          </a>
        </div>
      </PageHero>

      <Included items={INCLUDED} />

      <section className="sec soft" aria-labelledby="h-facts">
        <div className="in">
          <SectionHead
            eyebrow="the short version"
            title="Reselling with AnyPress in one look."
            id="h-facts"
          />
          <FactSheet facts={FACTS} />
        </div>
      </section>

      <ProblemFix
          who={WHO}
        items={TOP_PROBLEMS}
          title="Stop paying for every brand's sites one piece at a time."
      />

      <section
        id="videos"
        className="sec soft scroll-mt-20"
        aria-labelledby="h-videos"
      >
        <div className="in">
          <SectionHead
            eyebrow="recorded on the real product"
            title="Watch it work."
            lead="Short videos of the real dashboard: your storefronts and bill, and sites created from your own code, a form or a payment."
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
            lead="Every brand, every site and your bill in one place, at app.anypress.io."
            id="h-dashboard"
          />
          <DashboardTour shots={DASHBOARD} />
        </div>
      </section>

      <section className="sec soft" aria-labelledby="h-locations">
        <div className="in">
          <SectionHead
            eyebrow="franchises and multi-location brands"
            title="A website for every location, not a page on yours."
            lead="Each location gets a real site of its own, copied from the same starting site, so it looks like your brand and the local owner can still make it theirs."
            id="h-locations"
          />
          <CompareTable
            head={[
              "",
              "A page on head office's site",
              "A site for every location",
            ]}
            rows={LOCATIONS}
          />
          <p className="compare-note">
            Head office&apos;s own site can list every branch next to a map with
            the Location finder block, and visitors tap &ldquo;Near me&rdquo; to
            find the closest.
          </p>
        </div>
      </section>

      <section
        id="wholesale"
        className="sec scroll-mt-20"
        aria-labelledby="h-wholesale"
      >
        <div className="in">
          <SectionHead
            eyebrow="wholesale prices"
            title={`${WHOLESALE_PERCENT}% off every site.`}
            lead="Prices for the Small size. Medium is 2× and Large is 4×, with the same discount. You set your own prices for your customers."
            id="h-wholesale"
          />
          <CompareTable
            head={["Kind of site", "Website owners pay", "You pay"]}
            rows={WHOLESALE}
          />
        </div>
      </section>

      <section
        id="example"
        className="sec soft scroll-mt-20"
        aria-labelledby="h-example"
      >
        <div className="in">
          <SectionHead
            eyebrow="a worked example"
            title="Two brands, one bill."
            lead="Say you run two brands: one selling Small Website sites to trades, one selling Small Bookings sites to salons."
            id="h-example"
          />
          <PlainTable
            label="Two brands on one wholesale bill"
            head={[
              "",
              "Sites",
              "Your customers pay you",
              "You pay us",
              "You keep",
            ]}
            rows={EXAMPLE_ROWS}
          />
          <p className="compare-note">
            The prices your customers pay are only an example: you set them for
            each brand.{" "}
            <a href="#earnings" className={link}>
              Try your own numbers
            </a>
            .
          </p>
        </div>
      </section>

      <section
        id="earnings"
        className="sec scroll-mt-20"
        aria-labelledby="h-earn"
      >
        <div className="in">
          <SectionHead
            eyebrow="your own numbers"
            title="What could you earn?"
            lead="Pick a kind of site, how many you sell and your price. The table under the result shows the same numbers as a seller, so you can see which account fits."
            id="h-earn"
          />
          <EarningsCalculator start="reseller" />
        </div>
      </section>

      <section className="sec soft" aria-labelledby="h-ways">
        <div className="in">
          <SectionHead
            eyebrow="two ways to sell"
            title="Seller or reseller?"
            lead="One business name is a seller. More than one is a reseller."
            id="h-ways"
          />
          <PlainTable
            label="Seller and reseller compared"
            head={["", "Seller", "Reseller"]}
            rows={TABLE}
          />
        </div>
      </section>

      <BuildYourOwn />

      <section className="sec soft" aria-labelledby="h-steps">
        <div className="in">
          <SectionHead
            eyebrow="how to start"
            title="Four steps to your first sale."
            id="h-steps"
          />
          <Flow steps={STEPS} />
        </div>
      </section>

      <section className="sec" aria-labelledby="h-q">
        <div className="in">
          <SectionHead drawing="question" title="Reseller questions" id="h-q" />
          <Questions items={FAQ} firstOpen />
        </div>
      </section>

      <CtaBand
        eyebrow="ready?"
        title="Tell us about your brands."
        body="Apply in a few minutes, then book a short call with us to get set up, billing included."
        href="/sell"
        label="Apply to become a reseller"
        drawings={["shops", "bill", "key"]}
      />
    </>
  );
}
