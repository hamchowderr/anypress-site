import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand, PageHero } from "@/components/ui";

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

export default function Agencies() {
  return (
    <>
      <PageHero
        band="red"
        title="Sell websites as a monthly service."
        lead="Offer your clients websites for a monthly fee, under your own name, from your own shop. We build and look after every one."
      >
        <div className="mt-9">
          <Link href="/contact" className="btn btn-ink text-lg">
            Talk to us about an agency account
          </Link>
        </div>
      </PageHero>

      <section className="bg-paper">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
          <h2 className="font-display text-[clamp(2.2rem,4.5vw,3.5rem)] leading-[0.98] font-black">How it works.</h2>
          <ol className="mt-12 grid border-t-[2.5px] border-ink md:grid-cols-4">
            {FLOW.map(([title, sub], i) => (
              <li key={title} className="border-b-[2.5px] border-ink py-8 md:border-r-[2.5px] md:px-6 md:first:pl-0 md:last:border-r-0">
                <span className="font-display-wide block text-7xl leading-none font-black">{i + 1}</span>
                <p className="mt-5 text-2xl font-bold">{title}</p>
                <p className="mt-1 text-lg text-ink-soft">{sub}</p>
              </li>
            ))}
          </ol>

          <div className="mt-20 grid gap-x-14 gap-y-10 sm:grid-cols-2">
            {POINTS.map((p) => (
              <div key={p.title}>
                <h3 className="font-display text-2xl font-extrabold">{p.title}</h3>
                <p className="mt-2 text-lg leading-8 text-ink-soft">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Ready to sell websites?"
        body="We set up agency accounts by hand while we're getting started. Tell us about your clients."
        href="/contact"
        label="Get in touch"
      />
    </>
  );
}
