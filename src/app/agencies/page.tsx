import type { Metadata } from "next";
import { CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = { title: "For agencies" };

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
    title: "Your clients manage their own sites",
    body: "Clients sign in on your shop to open their WordPress admin, connect a domain, set up email or change their plan.",
  },
  {
    title: "Open source",
    body: "The plugins, API and dashboard behind AnyPress are open source under the GPL, so you're never locked in.",
  },
];

export default function Agencies() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">AnyPress for agencies</h1>
      <p className="mt-3 max-w-2xl text-muted">
        Sell WordPress websites to your clients as a monthly service, without running servers yourself.
      </p>

      <div className="mt-10 grid gap-8 sm:grid-cols-2">
        {POINTS.map((p) => (
          <div key={p.title}>
            <h2 className="font-semibold">{p.title}</h2>
            <p className="mt-2 text-sm leading-6 text-muted">{p.body}</p>
          </div>
        ))}
      </div>

      <div id="contact" className="mt-12 rounded-lg border border-line bg-panel p-6">
        <h2 className="font-semibold">Talk to us</h2>
        <p className="mt-2 text-sm text-muted">Agency accounts are set up by hand while we&apos;re getting started.</p>
        {CONTACT_EMAIL ? (
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("AnyPress for agencies")}`}
            className="mt-4 inline-block rounded-md bg-accent px-4 py-2 font-medium text-on-accent hover:opacity-90"
          >
            Email us
          </a>
        ) : (
          <p className="mt-4 text-sm text-muted">Contact details coming soon.</p>
        )}
      </div>
    </section>
  );
}
