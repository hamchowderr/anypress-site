import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand, PageHero, SectionHead } from "@/components/ui";

export const metadata: Metadata = {
  title: "For agencies",
  description: "Sell websites to your clients as a monthly service, under your own name, while we build and look after every one.",
};

const FLOW = [
  ["Your client buys", "from your own shop, at your price."],
  ["We build it", "from a site you've set up once as your starting point."],
  ["They manage it", "from an account on your shop, under your name."],
  ["You get paid", "every month, straight to your own account."],
];

const POINTS = [
  {
    title: "Your name, your shop",
    body: "Clients buy from your own WordPress shop, on your own domain, through your own payment account. AnyPress stays in the background.",
  },
  {
    title: "Set it up once",
    body: "Build the sites you sell once. Every new client gets their own copy, as their own private website.",
  },
  {
    title: "Clients look after themselves",
    body: "From their account on your shop, clients open their site's editor, connect their own domain and set up email.",
  },
  {
    title: "Never locked in",
    body: "Everything behind AnyPress is open source, so you can see how it works, and you're never stuck with us.",
  },
];

const ACCOUNTS = [
  {
    title: "Seller",
    line: "One shop, your name on it.",
    body: "You sell from your own shop and pay us per website, with lower prices as you grow. Start with three sites. Most agencies and freelancers start here.",
    examples: ["A freelance designer selling sites to local clients", "A chamber of commerce selling sites to its members"],
  },
  {
    title: "Reseller",
    line: "Several brands, one bill.",
    body: "For bigger partners. Run several shops under one login, and get one monthly bill at a wholesale price. Your developers can create sites for every brand through our API.",
    examples: [
      "An agency with a brand for bakeries and another for salons",
      "A franchise office with a shop for each region",
      "A software company giving each customer a site, plus a brand for partners",
      "A web host with a budget brand and a premium brand",
    ],
  },
];

export default function Agencies() {
  return (
    <>
      <PageHero drawing="agency" side="technical"
        eyebrow="For agencies and freelancers"
        title="Sell websites as a monthly service."
        lead="Offer your clients websites for a monthly fee, under your own name, from your own shop. We build and look after every one."
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/sell" className="btn btn-ink">
            Apply to sell websites
          </Link>
          <Link href="/#examples" className="btn btn-paper">
            See example sites
          </Link>
        </div>
      </PageHero>

      <section>
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <SectionHead title="How it works." />
          <ol className="mt-10 grid gap-8 md:grid-cols-4">
            {FLOW.map(([title, sub], i) => (
              <li key={title} className="border-t border-line pt-6">
                <span className="font-display text-sm font-semibold text-accent">Step {i + 1}</span>
                <p className="font-display mt-2 text-xl font-semibold">{title}</p>
                <p className="mt-1 leading-7 text-ink-soft">{sub}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-y border-line bg-paper-2">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <ul className="grid gap-4 sm:grid-cols-2">
            {POINTS.map((p) => (
              <li key={p.title} className="card p-6">
                <h3 className="font-display text-xl font-semibold">{p.title}</h3>
                <p className="mt-2 leading-7 text-ink-soft">{p.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <SectionHead title="Two ways to sell." />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {ACCOUNTS.map((a) => (
              <li key={a.title} className="card p-6">
                <h3 className="font-display text-xl font-semibold">{a.title}</h3>
                <p className="mt-1 font-semibold text-accent">{a.line}</p>
                <p className="mt-2 leading-7 text-ink-soft">{a.body}</p>
                <p className="mt-4 text-sm font-semibold">For example</p>
                <ul className="mt-1 list-disc space-y-1 pl-5 text-ink-soft">
                  {a.examples.map((e) => (
                    <li key={e}>{e}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-center leading-7 text-ink-soft">
            One business name? You&apos;re a seller. More than one? You&apos;re a reseller. One application covers both, and we&apos;ll set up the right one.{" "}
            <Link href="/resellers" className="font-bold text-ink underline">
              More about resellers
            </Link>
          </p>
        </div>
      </section>

      <CtaBand
        title="Ready to sell websites?"
        body="Tell us about your business and who you build for. We read every application and email you back."
        href="/sell"
        label="Apply to sell websites"
      />
    </>
  );
}
