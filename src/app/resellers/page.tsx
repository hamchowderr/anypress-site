import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { Drawing, type DrawingName } from "@/components/Drawing";
import { CtaBand, PageHero, Questions, SectionHead } from "@/components/ui";

export const metadata: Metadata = {
  title: "Become a reseller",
  description: "Run several website brands under one login, with one monthly wholesale bill and partner keys for your developers.",
};

const GETS: [DrawingName, string, string][] = [
  ["shops", "Several shops, one login", "Run a shop for each brand, region or kind of customer, all from one dashboard."],
  ["bill", "One monthly bill", "Every site across every brand on one wholesale bill, sent automatically on the 1st."],
  ["key", "Partner keys", "Each brand gets its own keys, so your developers can create and manage sites from code."],
  ["nametag", "Your brand, not ours", "Your customers buy from your shops. If a site is ever unavailable, they see your brand."],
  ["tools", "We run every site", "Updates, nightly copies and keeping each site safe are done for you."],
  ["box", "Open source underneath", "Everything behind AnyPress is public, so you're never locked in."],
];

const TABLE: [string, string, string][] = [
  ["Shops", "One, with your name on it", "Several, under one login"],
  ["How you pay", "Per site, as you sell", "One monthly wholesale bill"],
  ["Saving as you grow", "10 to 30% off with 3 or more sites", "Wholesale prices on every site"],
  ["Partner keys for developers", "No", "Yes, for each brand"],
  ["Who it suits", "Freelancers, agencies and groups with one brand", "Agencies, franchises, hosts and software companies with several"],
];

const STEPS: [DrawingName, string, string][] = [
  ["words", "Apply", "Tell us about your business and your brands."],
  ["question", "Talk to us", "We read every application, answer your questions and approve you."],
  ["shops", "Set up your shops", "Add a shop for each brand and the sites you sell."],
  ["coins", "Sell", "Your customers pay you. We send one bill a month."],
];

const FAQ: [string, ReactNode][] = [
  [
    "What does it cost?",
    "You pay a wholesale price for each site, below what website owners pay, on one bill each month. We send you the price list when we approve your account.",
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
      Yes. Partner keys let your code create, change and remove sites for each brand. See the{" "}
      <Link href="/developers">developer page</Link>.
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

      <section className="sec soft">
        <div className="in">
          <SectionHead eyebrow="what you get" title="Everything you need to run a website business." />
          <div className="yours !grid-cols-1 sm:!grid-cols-2 lg:!grid-cols-3">
            {GETS.map(([d, title, body]) => (
              <div key={title}>
                <Drawing name={d} />
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec in">
        <SectionHead eyebrow="two ways to sell" title="Seller or reseller?" />
        <div className="compare">
          <div className="tablewrap">
            <table>
              <thead>
                <tr>
                  <th scope="col"> </th>
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

      <section className="sec soft">
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

      <section className="sec in">
        <SectionHead drawing="question" title="Reseller questions" />
        <Questions items={FAQ} firstOpen />
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
