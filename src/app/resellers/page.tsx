import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { Drawing, type DrawingName } from "@/components/Drawing";
import { CompareTable } from "@/components/CompareTable";
import { ProblemFix, type Problem } from "@/components/ProblemFix";
import { CtaBand, PageHero, Questions, SectionHead } from "@/components/ui";
import { SITE_TYPES, WHOLESALE_PERCENT, wholesalePrice } from "@/lib/site";

export const metadata: Metadata = {
  title: "Become a reseller",
  description: "Run several website brands under one login, with one monthly wholesale bill and partner keys for your developers.",
};

const WHO = ["Agencies with several brands", "Franchise offices", "Web hosts", "Software companies", "Groups that run sites for members"];

const PROBLEMS: Problem[] = [
  {
    problem: ["Every brand needs its own setup", "A separate account, login and set of sites for each brand, region or kind of customer."],
    fix: ["Several shops, one login", "Run a shop for each brand, region or kind of customer, all from one dashboard."],
  },
  {
    problem: ["A pile of bills every month", "Hosting bills per brand and per client, each to check and pay."],
    fix: ["One wholesale bill", `Every live site across every brand on one bill, ${WHOLESALE_PERCENT}% off, sent automatically on the 1st.`],
  },
  {
    problem: ["Your developers wait on manual steps", "Someone has to click through a setup for every new site your product sells."],
    fix: [
      "Partner keys for each brand",
      <>
        Your code creates, changes and removes sites on its own. See the <Link href="/developers">developer page</Link>.
      </>,
    ],
  },
  {
    problem: ["Your brand gets lost", "Hosting emails, error pages and dashboards show someone else's name."],
    fix: ["Your brand, not ours", "Customers buy from your shops at your prices. Even if a site is ever unavailable, they see your brand."],
  },
  {
    problem: ["Servers to run for every brand", "Security fixes, backups and keeping hundreds of sites online."],
    fix: ["We run every site", "Security fixes, nightly copies and keeping each site safe are done for you."],
  },
  {
    problem: ["Afraid of being locked in", "If the platform changes or disappears, your whole business goes with it."],
    fix: ["Open source underneath", "Everything behind AnyPress is public, so you can always run it yourself."],
  },
];

const TABLE: [string, string, string][] = [
  ["Shops", "One, with your name on it", "Several, under one login"],
  ["How you pay", "Per site, as you sell", "One monthly wholesale bill"],
  ["Saving as you grow", "10 to 30% off with 3 or more sites", `${WHOLESALE_PERCENT}% off every site, from the first one`],
  ["Partner keys for developers", "No", "Yes, for each brand"],
  ["Who it suits", "Freelancers, agencies and groups with one brand", "Agencies, franchises, hosts and software companies with several"],
];

const STEPS: [DrawingName, string, string][] = [
  ["words", "Apply", "Tell us about your business and your brands."],
  ["question", "Talk to us", "We read every application, answer your questions and approve you."],
  ["shops", "Set up your shops", "Add a shop for each brand and the sites you sell."],
  ["coins", "Sell", "Your customers pay you. We send one bill a month."],
];

const money = (n: number) => `$${n.toFixed(2).replace(/\.00$/, "")}`;
const WHOLESALE: [string, string, string][] = SITE_TYPES.map((t) => [t.name, `${money(t.from)} a month`, `${money(wholesalePrice(t.from))} a month`]);

const FAQ: [string, ReactNode][] = [
  [
    "What does it cost?",
    `${WHOLESALE_PERCENT}% off our normal price for every live site, on one bill each month. A site that goes live mid-month is billed for the days it was live. You charge your customers whatever you like.`,
  ],
  ["Do my customers see AnyPress?", "No. They buy from your shops, at your prices, under your brand."],
  [
    "Seller or reseller: which am I?",
    "One business name? You're a seller. More than one? You're a reseller. One application covers both, and we'll set up the right account.",
  ],
  ["Can I start as a seller and become a reseller later?", "Yes. Tell us when you're ready and we'll move your account over."],
  [
    "Can my developers create sites automatically?",
    <>
      Yes, with or without a developer. Partner keys let your code create, change and remove sites for each brand, and no-code tools like n8n, Make and
      Zapier can do it from a form, a payment or your CRM. See <Link href="/automate">create sites automatically</Link>.
    </>,
  ],
];

export default function Resellers() {
  return (
    <>
      <PageHero
        side="technical"
        drawing="shops"
        eyebrow="become a reseller"
        title={
          <>
            Several brands. <mark>One</mark> bill.
          </>
        }
        lead="For agencies, franchises, hosts and software companies that sell websites under more than one name. We host and look after every site, and you get one wholesale bill a month."
      >
        <div className="ctas mt-8">
          <Link href="/sell" className="btn btn-ink">
            Apply to become a reseller →
          </Link>
          <Link href="/agencies" className="btn btn-paper">
            How selling works
          </Link>
        </div>
      </PageHero>

      <ProblemFix soft who={WHO} items={PROBLEMS} title="Selling under several names, without the mess." />

      <section className="sec in">
        <SectionHead eyebrow="two ways to sell" title="Seller or reseller?" />
        <div className="compare">
          <div className="tablewrap" tabIndex={0} role="region" aria-label="Seller and reseller compared">
            <table>
              <thead>
                <tr>
                  <th scope="col">
                    <span className="sr-only">What you get</span>
                  </th>
                  <th scope="col">Seller</th>
                  <th scope="col">Reseller</th>
                </tr>
              </thead>
              <tbody>
                {TABLE.map(([row, seller, reseller]) => (
                  <tr key={row}>
                    <th scope="row">{row}</th>
                    <td>{seller}</td>
                    <td>{reseller}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section id="wholesale" className="sec soft scroll-mt-20" aria-labelledby="h-wholesale">
        <div className="in">
          <SectionHead
            eyebrow="wholesale prices"
            title={`${WHOLESALE_PERCENT}% off every site.`}
            lead="Prices for the Small size. Medium is 2× and Large is 4×, with the same discount. You set your own prices for your customers."
            id="h-wholesale"
          />
          <CompareTable head={["Kind of site", "Website owners pay", "You pay"]} rows={WHOLESALE} />
        </div>
      </section>

      <section className="sec">
        <div className="in">
          <SectionHead eyebrow="how to start" title="Four steps to your first sale." />
          <ol className="flow !mt-0">
            {STEPS.map(([d, title, body], i) => (
              <li key={title}>
                <Drawing name={d} />
                <b>
                  {i + 1}. {title}
                </b>
                <span>{body}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="sec soft">
        <div className="in">
          <SectionHead drawing="question" title="Reseller questions" />
          <Questions items={FAQ} firstOpen />
        </div>
      </section>

      <CtaBand
        eyebrow="ready?"
        title="Tell us about your brands."
        body="Apply in a few minutes. We read every application and email you back."
        href="/sell"
        label="Apply to become a reseller"
        drawings={["shops", "bill", "key"]}
      />
    </>
  );
}
