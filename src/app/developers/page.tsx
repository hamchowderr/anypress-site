import type { Metadata } from "next";
import Link from "next/link";
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
    body: "Let Claude, ChatGPT or any MCP client create and manage sites, with OAuth sign-in or your API key.",
    tag: "/mcp",
  },
  {
    title: "Your own domains",
    body: "Add, remove and switch a site's domains, and give it its own email sending domain, all through the API.",
    tag: "domains",
  },
  {
    title: "Open source",
    body: "The API, the WordPress plugins and the dashboard are public under the GPL. Read it, run it, improve it.",
    tag: "GPL-3.0",
  },
];

export default function Developers() {
  return (
    <>
      <PageHero
        band="ink"
        title="Websites, created by your code."
        lead="Everything AnyPress does is an API call. Give each of your customers a WordPress site from inside your own product."
      >
        <div className="mt-9 flex flex-wrap gap-3">
          <a href={API_REPO} className="btn btn-paper">
            Read the API docs
          </a>
          <Link href="/contact" className="btn border-paper text-paper">
            Get API access
          </Link>
        </div>
      </PageHero>

      <section className="bg-paper">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <ul className="grid border-t-[2.5px] border-ink md:grid-cols-2 md:gap-x-14">
            {BLOCKS.map((b) => (
              <li key={b.title} className="border-b-[2.5px] border-ink py-8">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h2 className="font-display text-2xl font-extrabold">{b.title}</h2>
                  <code className="rounded-md bg-paper-2 px-2 py-1 font-mono text-sm">{b.tag}</code>
                </div>
                <p className="mt-2 text-lg leading-8 text-ink-soft">{b.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t-[2.5px] border-ink bg-orange">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-[clamp(2.2rem,4.5vw,3.5rem)] leading-[0.98] font-black">Three calls to a live site.</h2>
            <ol className="mt-8 space-y-4 text-xl leading-8">
              <li className="flex gap-4">
                <span className="font-display-wide text-3xl font-black">1</span> Create the site, with your own id for it.
              </li>
              <li className="flex gap-4">
                <span className="font-display-wide text-3xl font-black">2</span>
                <span>
                  Get <code className="font-mono font-bold">tenant.ready</code> with its address.
                </span>
              </li>
              <li className="flex gap-4">
                <span className="font-display-wide text-3xl font-black">3</span> Send your customer to their new site, with the
                WordPress login you created for them.
              </li>
            </ol>
          </div>
          <div className="overflow-hidden rounded-2xl border-[2.5px] border-ink bg-ink text-paper">
            <div className="border-b-2 border-paper/20 px-4 py-2.5 font-mono text-sm text-paper/70">signup.ts</div>
            <pre className="overflow-x-auto p-5 font-mono text-[14px] leading-6">
              <code>
                <span className="text-amber">await</span> waas.tenants.create({"{"}
                {"\n"}
                {"  "}name: <span className="text-amber">&quot;Kettle &amp; Crumb&quot;</span>,{"\n"}
                {"  "}externalId: customer.id,{"\n"}
                {"  "}wordPressUserEmail: customer.email,{"\n"}
                {"}"});{"\n\n"}
                <span className="text-paper/60">{"// later, in your webhook handler"}</span>
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

      <CtaBand
        title="Build on AnyPress."
        body="Tell us what you're making and we'll set you up with an API key."
        href="/contact"
        label="Get API access"
      />
    </>
  );
}
