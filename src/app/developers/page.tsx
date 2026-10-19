import type { Metadata } from "next";
import { Accent, CtaBand, PageHero } from "@/components/ui";

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
        eyebrow="Developers & SaaS teams"
        title={
          <>
            WordPress sites, <Accent>on demand.</Accent>
          </>
        }
        lead="Everything AnyPress does is an API call. Give each of your customers a WordPress site from inside your own product."
      >
        <div className="mt-9 flex flex-wrap gap-3">
          <a href={API_REPO} className="btn btn-ribbon">
            Read the API docs
          </a>
          <a href="/contact" className="btn btn-ghost">
            Get API access
          </a>
        </div>
      </PageHero>

      <section className="band-paper py-24">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-3">
          {BLOCKS.map((b) => (
            <article key={b.title} className="flex flex-col rounded-3xl border border-paper-line bg-white p-7">
              <span className="self-start rounded-md bg-paper-2 px-2 py-1 font-mono text-xs text-on-paper-muted">
                {b.tag}
              </span>
              <h2 className="font-display mt-6 text-2xl font-bold">{b.title}</h2>
              <p className="mt-2 leading-7 text-on-paper-muted">{b.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="grain relative py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Three calls to a live site</p>
            <h2 className="font-display mt-4 text-5xl leading-[0.95] font-extrabold">
              Ask. Wait for the webhook. <span className="text-ribbon">Hand over the keys.</span>
            </h2>
            <ol className="mt-8 space-y-4 text-on-ink-muted">
              <li>
                <span className="font-mono text-orange">1.</span> Create the site with your own id for it.
              </li>
              <li>
                <span className="font-mono text-orange">2.</span> Get <code className="text-on-ink">tenant.ready</code>{" "}
                with its address.
              </li>
              <li>
                <span className="font-mono text-orange">3.</span> Send your customer to their new site, with the
                WordPress login you created for them.
              </li>
            </ol>
          </div>
          <div className="overflow-hidden rounded-2xl border border-ink-line bg-[#0a090d] shadow-2xl">
            <div className="border-b border-ink-line px-4 py-2.5 font-mono text-xs text-on-ink-muted">signup.ts · waas-provisioning-sdk</div>
            <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-6">
              <code>
                <span className="text-rose">await</span> waas.tenants.<span className="text-amber">create</span>({"{"}
                {"\n"}
                {"  "}name: <span className="text-[#7ee787]">&quot;Kettle &amp; Crumb&quot;</span>,{"\n"}
                {"  "}externalId: customer.id,{"\n"}
                {"  "}wordPressUserEmail: customer.email,{"\n"}
                {"}"});{"\n\n"}
                <span className="text-on-ink-muted">{"// later, in your webhook handler"}</span>
                {"\n"}
                <span className="text-rose">if</span> (event.type === <span className="text-[#7ee787]">&quot;tenant.ready&quot;</span>) {"{"}
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
