import type { Metadata } from "next";
import Link from "next/link";
import { LeadForm } from "@/components/LeadForm";
import { CtaBand, PageHero } from "@/components/ui";

export const metadata: Metadata = {
  title: "Developers",
  description: "Create and manage WordPress sites from your own app with the AnyPress API, SDKs, webhooks and MCP connector.",
};

const API_REPO = "https://github.com/hamchowderr/waas-provisioning-api";

const BLOCKS = [
  {
    title: "REST API",
    body: "Create, suspend, resume, restore, back up and delete sites. Every change runs in the background and reports its status.",
    tag: "/v1/tenants",
  },
  {
    title: "Webhooks",
    body: "Signed events when a site is ready, fails, changes domain, gets backed up or is restored. No polling.",
    tag: "tenant.ready",
  },
  {
    title: "TypeScript & PHP SDKs",
    body: "Typed clients built from the OpenAPI files, so your editor knows every call and field.",
    tag: "npm · composer",
  },
  {
    title: "MCP connector",
    body: "Let Claude, ChatGPT or any MCP client create and manage sites, with a simple sign-in and per-area permissions.",
    tag: "/mcp",
  },
  {
    title: "Your own domains",
    body: "Add, remove and switch a site's domains, and give it its own email sending domain, all through the API.",
    tag: "domains",
  },
  {
    title: "Open source",
    body: "The API, the WordPress plugins and the dashboard are public under the GPL. Read it, improve it, or run it yourself with one installer.",
    tag: "GPL-3.0",
  },
];

export default function Developers() {
  return (
    <>
      <PageHero drawing="software" side="technical"
        eyebrow="For developers"
        title="Websites, created by your code."
        lead="Everything AnyPress does is an API call. Give each of your customers a WordPress site from inside your own product."
      >
        <div className="mt-9 flex flex-wrap gap-3">
          <a href={API_REPO} className="btn btn-ink">
            Read the API docs
          </a>
          <Link href="/contact" className="btn btn-paper">
            Get API access
          </Link>
        </div>
      </PageHero>

      <section className="">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <ul className="grid border-t border-line md:grid-cols-2 md:gap-x-14">
            {BLOCKS.map((b) => (
              <li key={b.title} className="border-b border-line py-8">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h2 className="font-display text-xl font-semibold">{b.title}</h2>
                  <code className="rounded-md bg-paper-2 px-2 py-1 font-mono text-sm">{b.tag}</code>
                </div>
                <p className="mt-2 leading-7 text-ink-soft">{b.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-y border-line bg-paper-2">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-[clamp(1.9rem,3.6vw,2.75rem)] leading-[1.08] font-semibold">Three calls to a live site.</h2>
            <ol className="mt-8 space-y-4 text-lg leading-8 text-ink-soft">
              <li className="flex gap-4">
                <span className="font-display text-xl font-semibold text-accent">1</span> Create the site, with your own id for it.
              </li>
              <li className="flex gap-4">
                <span className="font-display text-xl font-semibold text-accent">2</span>
                <span>
                  Get <code className="font-mono font-semibold">tenant.ready</code> with its address.
                </span>
              </li>
              <li className="flex gap-4">
                <span className="font-display text-xl font-semibold text-accent">3</span> Send your customer to their new site, with the
                WordPress login you created for them.
              </li>
            </ol>
          </div>
          <div className="overflow-hidden rounded-2xl border border-line bg-ink text-white">
            <div className="border-b border-white/15 px-4 py-2.5 font-mono text-sm text-white/60">signup.ts</div>
            <pre tabIndex={0} aria-label="Example request" className="overflow-x-auto p-5 font-mono text-[14px] leading-6">
              <code>
                <span className="text-amber">await</span> waas.tenants.create({"{"}
                {"\n"}
                {"  "}name: <span className="text-amber">&quot;Kettle &amp; Crumb&quot;</span>,{"\n"}
                {"  "}externalId: customer.id,{"\n"}
                {"  "}wordPressUserEmail: customer.email,{"\n"}
                {"}"});{"\n\n"}
                <span className="text-white/50">{"// later, in your webhook handler"}</span>
                {"\n"}
                <span className="text-amber">if</span> (event.type === <span className="text-amber">&quot;tenant.ready&quot;</span>) {"{"}
                {"\n"}
                {"  "}notify(customer, event.data.tenant.domainName);{"\n"}
                {"}"}
              </code>
            </pre>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-paper-2">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <h2 className="font-display text-[clamp(1.6rem,2.6vw,2.1rem)] leading-[1.1] font-semibold text-balance">Not ready yet?</h2>
            <p className="mt-4 text-lg leading-8 text-ink-soft">
              Read our free guide,{" "}
              <Link href="/guides/developers" className="font-semibold text-ink underline">
                your first site from the API
              </Link>
              , or get a few short emails with tips.
            </p>
          </div>
          <div>
            <LeadForm group="developers" cta="Send me tips" />
          </div>
        </div>
      </section>

      <CtaBand
        title="Build on AnyPress."
        body="Tell us what you're making and we'll set you up with an API key."
        href="/contact"
        label="Get API access"
      />
    </>
  );
}
