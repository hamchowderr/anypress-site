import type { Metadata } from "next";
import { Accent, CtaBand, PageHero } from "@/components/ui";

export const metadata: Metadata = {
  title: "For agencies",
  description: "Sell WordPress websites to your clients as a monthly service, under your own brand, without running servers.",
};

const POINTS = [
  {
    title: "Your brand, your shop",
    body: "You run your own WordPress shop with the WaaS Host plugin. Clients buy from you, on your domain, through your payment account.",
  },
  {
    title: "Your templates",
    body: "Set up the sites you sell once, as templates. Every new client site starts as a copy, on its own WordPress install.",
  },
  {
    title: "Clients manage their own sites",
    body: "Clients sign in on your shop to open their WordPress admin, connect a domain, set up email or change their plan.",
  },
  {
    title: "Open source",
    body: "The plugins, API and dashboard behind AnyPress are open source under the GPL, so you're never locked in.",
  },
];

const FLOW = [
  ["Client buys", "on your shop, at your price"],
  ["We build", "their site from your template"],
  ["They sign in", "on your shop, under your brand"],
  ["You get paid", "every month, to your account"],
];

export default function Agencies() {
  return (
    <>
      <PageHero
        eyebrow="For agencies & freelancers"
        title={
          <>
            Sell websites as a service. <Accent>We</Accent> run the servers.
          </>
        }
        lead="Offer your clients WordPress sites for a monthly fee, under your own brand, from your own shop. AnyPress builds, hosts and backs up every one."
      >
        <div className="mt-9">
          <a href="/contact" className="btn btn-ribbon">
            Talk to us about an agency account
          </a>
        </div>
      </PageHero>

      <section className="band-paper py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <ol className="grid gap-3 md:grid-cols-4">
            {FLOW.map(([title, sub], i) => (
              <li key={title} className="relative rounded-3xl border border-paper-line bg-white p-6">
                <span className="font-mono text-xs text-on-paper-muted">Step {i + 1}</span>
                <p className="font-display mt-3 text-2xl font-bold">{title}</p>
                <p className="mt-1 text-sm text-on-paper-muted">{sub}</p>
                {i < FLOW.length - 1 && (
                  <span className="absolute top-1/2 -right-3 z-10 hidden h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-ink text-xs text-on-ink md:flex">
                    →
                  </span>
                )}
              </li>
            ))}
          </ol>

          <div className="mt-20 grid gap-10 sm:grid-cols-2">
            {POINTS.map((p) => (
              <div key={p.title} className="border-t border-paper-line pt-6">
                <h2 className="font-display text-3xl font-bold">{p.title}</h2>
                <p className="mt-3 leading-7 text-on-paper-muted">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Ready to resell?"
        body="Agency accounts are set up by hand while we're getting started. Tell us about your clients."
        href="/contact"
        label="Get in touch"
      />
    </>
  );
}
