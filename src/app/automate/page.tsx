import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { Drawing, type DrawingName } from "@/components/Drawing";
import { CtaBand, PageHero, Questions, SectionHead } from "@/components/ui";

export const metadata: Metadata = {
  title: "Create sites automatically",
  description:
    "Sellers and resellers never build client sites by hand. An order, a form or a CRM step creates the site, through your shop, n8n, Make, Zapier or the AnyPress API.",
};

const API = "https://api.anypress.io";
const API_DOCS = `${API}/docs`;
const API_REPO = "https://github.com/hamchowderr/waas-provisioning-api";
const DOCS = "https://shop.anypress.io/docs-category/automation/";

/** A dark code panel with a file name on top. Children are the code, already highlighted. */
function Code({ file, children }: { file: string; children: ReactNode }) {
  return (
    <div className="code">
      <div className="file">{file}</div>
      <pre>
        <code>{children}</code>
      </pre>
    </div>
  );
}

const C = ({ children }: { children: ReactNode }) => <span className="c">{children}</span>;
const S = ({ children }: { children: ReactNode }) => <span className="s">{children}</span>;

const ROUTES: {
  drawing: DrawingName;
  title: string;
  body: string;
  href: string;
  who: string;
}[] = [
  {
    drawing: "shops",
    title: "Your shop does it",
    body: "Someone pays on your storefront and their site is built. When they cancel, it's backed up and taken offline. Nothing to connect.",
    href: "#shop",
    who: "Every seller, from day one",
  },
  {
    drawing: "plug",
    title: "No-code tools",
    body: "A form, a signed proposal or a payment somewhere else starts a flow in n8n, Make or Zapier, and the flow creates the site.",
    href: "#recipes",
    who: "Teams without a developer",
  },
  {
    drawing: "mailbox",
    title: "Told when it's ready",
    body: "We call your flow the moment a site is ready, so the welcome email, the CRM update and the team message go out by themselves.",
    href: "#ready",
    who: "Anyone who onboards clients",
  },
  {
    drawing: "key",
    title: "Your own code",
    body: "Create, change and remove sites from your own app with the API and SDKs. Resellers get one partner key for every storefront.",
    href: "#keys",
    who: "Developers and software teams",
  },
];

const STUDIO: {
  drawing: DrawingName;
  title: string;
  when: string;
  body: string;
}[] = [
  {
    drawing: "words",
    title: "A new client says yes",
    when: "the trigger",
    body: "They fill in the studio's intake form, or the deal is marked won in the CRM. That's the only thing a person does.",
  },
  {
    drawing: "plug",
    title: "The flow asks AnyPress for a site",
    when: "seconds",
    body: "One step in n8n sends the client's business name and email, the studio's starting site and the size. The order number goes with it, so a retry can never make a second site.",
  },
  {
    drawing: "tools",
    title: "AnyPress builds it",
    when: "minutes",
    body: "Its own WordPress and database, copied from the studio's starting site, with the client's login made for them.",
  },
  {
    drawing: "mailbox",
    title: "Everyone hears about it",
    when: "when it's ready",
    body: "A signed message reaches the flow. It emails the client their address and login link, adds the site to the CRM and posts in the team chat.",
  },
  {
    drawing: "bill",
    title: "The bill takes care of itself",
    when: "on the 1st",
    body: "Every live site, across all the studio's brands, is on one wholesale bill. Nobody counts sites by hand.",
  },
];

const FIELDS: [string, ReactNode][] = [
  ["name", "The site's name. Its free address is made from it, for example rose-and-fern.anypress.site."],
  [
    "externalId",
    "Your own id for it: the order, deal or form entry number. Letters, numbers and dashes only. Sending the same create again answers with the site already made, so retries are safe.",
  ],
  ["wordPressUserName, wordPressUserEmail", "The client's WordPress login. Send both or neither."],
  [
    "wordPressUserRole",
    <>
      Their WordPress role, usually <code>administrator</code>.
    </>,
  ],
  ["groupName", "Which of your starting sites to copy, by its group name. Leave it out to use your current one."],
  [
    "size",
    <>
      <code>small</code>, <code>medium</code> or <code>large</code>. Small if you leave it out.
    </>,
  ],
  ["customDomainName", "The client's own domain, if they already have one. You can add it later instead."],
  ["productId", "Partner keys only: which storefront the site belongs to. Sent in the address, not the body."],
];

const EVENTS: [string, string][] = [
  ["tenant.ready", "A new site is built and answering. Send the welcome email."],
  ["tenant.failed", "A change still failed after its retries. We're told too."],
  ["tenant.domains_changed", "The client's own domain is connected."],
  ["tenant.suspended / tenant.resumed", "Taken offline, or back online."],
  ["tenant.deleted / tenant.restored", "Gone, or back from its backup."],
  ["tenant.backup_completed", "A backup finished, nightly ones included."],
];

const FAQ: [string, ReactNode][] = [
  [
    "Do I need a developer?",
    "No. If your clients buy on your storefront, sites are already created for you. For anything else, n8n, Make and Zapier can make the one call it takes, and the recipes on this page show each step.",
  ],
  [
    "Where do I get an API key?",
    <>
      Sign in at <a href="https://app.anypress.io">app.anypress.io</a> and open API keys. The secret is shown once, so put it straight into your
      tool&apos;s saved logins. Resellers can ask us for a partner key, which works on every storefront in the account.
    </>,
  ],
  [
    "What if the flow runs twice?",
    "Always send your own externalId, like the order or deal number. A second create with the same externalId and name answers with the site already made, and never builds another.",
  ],
  [
    "How does the client get into their new site?",
    "The create call makes their WordPress login with their email. Your welcome email links to the site's password page, so they choose their own password. Sites sold on your storefront get a one-click sign-in from their account instead.",
  ],
  [
    "Can it put the client's own words and logo in too?",
    <>
      Yes. Every site starts from your starting site, and an AI app connected to AnyPress can then change pages, sections, colours and menus for you.
      See the <Link href="/developers">developer page</Link>.
    </>,
  ],
  ["Do my clients see AnyPress?", "No. The flows are yours, the emails come from you, and sites sold from your shop show your brand."],
];

export default function Automate() {
  return (
    <>
      <PageHero
        side="technical"
        drawing="plug"
        eyebrow="automation"
        title={
          <>
            Client sites that <mark>build themselves</mark>.
          </>
        }
        lead="Nobody on your team should be building websites by hand. An order, a form or a step in your CRM creates the client's site, and tells you when it's ready."
      >
        <div className="ctas mt-8">
          <a href="#recipes" className="btn btn-ink">
            See the recipes →
          </a>
          <a href={DOCS} className="btn btn-paper">
            Step-by-step docs
          </a>
        </div>
      </PageHero>

      <section className="sec soft" aria-labelledby="h-routes">
        <div className="in">
          <SectionHead
            eyebrow="four ways in"
            title="Pick how sites get made."
            lead="Most sellers use the first one and never think about it again. The others are for orders and clients that start somewhere else."
            id="h-routes"
          />
          <ul className="cards big four">
            {ROUTES.map((r) => (
              <li key={r.title}>
                <a href={r.href} className="card-link">
                  <Drawing name={r.drawing} />
                  <h3>{r.title}</h3>
                  <p>{r.body}</p>
                  <small>{r.who}</small>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="sec in" aria-labelledby="h-shop" id="shop">
        <SectionHead
          eyebrow="no setup"
          title="Your storefront already does it."
          lead="Every approved seller gets a storefront. Make a product for each kind of site you sell, and every paid order turns into a site with nobody pressing a button."
          id="h-shop"
        />
        <div className="recipes">
          <div className="recipe">
            <div>
              <span className="tag">On your storefront</span>
              <h3>Order paid, site built</h3>
              <ol>
                <li>Add a subscription product in your storefront, with its price.</li>
                <li>Turn on the website integration for it and pick the kind of site, the starting site and the size.</li>
                <li>That&apos;s it. A paid order builds the site and emails your client a link to sign in.</li>
              </ol>
              <p className="tools">
                When a subscription is cancelled or runs out, the site is backed up and taken offline, then deleted after your grace period. If they
                pay again first, it comes back.
              </p>
            </div>
            <div>
              <ul className="steps !mt-0">
                {(
                  [
                    ["card", "Your client pays", "On your shop, at your price."],
                    ["tools", "The site is built", "From your starting site, in minutes."],
                    ["mailbox", "They're emailed", "With a one-click way in."],
                  ] as [DrawingName, string, string][]
                ).map(([d, t, b]) => (
                  <li key={t}>
                    <Drawing name={d} />
                    <div>
                      <h3>{t}</h3>
                      <p>{b}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="sec soft" aria-labelledby="h-studio">
        <div className="in">
          <SectionHead
            eyebrow="an example"
            title="A web studio with dozens of clients."
            lead="The studio is a reseller with a few brands. Its owner never signs in to anything. One person on the team set this up once, in an afternoon, and now every new client gets a site without anyone touching WordPress."
            id="h-studio"
          />
          <ol className="steps">
            {STUDIO.map((s, i) => (
              <li key={s.title}>
                <Drawing name={s.drawing} />
                <div>
                  <h3>
                    {i + 1}. {s.title}
                    <span className="hand">{s.when}</span>
                  </h3>
                  <p>{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="compare-note">
            Made-up studio, real steps. The person who set it up still sees every site, its backups and its jobs at app.anypress.io.
          </p>
        </div>
      </section>

      <section className="sec in" aria-labelledby="h-recipes" id="recipes">
        <SectionHead
          eyebrow="recipes"
          title="Copy these flows."
          lead={
            <>
              Each one is a trigger and one call to AnyPress. They use n8n, Make and Zapier, but any tool that can send a web request works the same way. Full
              step-by-step guides are in <a href={DOCS}>the docs</a>.
            </>
          }
          id="h-recipes"
        />
        <div className="recipes">
          <div className="recipe" id="form">
            <div>
              <span className="tag">n8n · a form</span>
              <h3>Intake form, new site</h3>
              <p>A client fills in your intake form, on your website or in n8n itself.</p>
              <ol>
                <li>Start the flow with an n8n Form Trigger, or a Webhook node your form posts to.</li>
                <li>
                  Add an HTTP Request node: <b>POST</b> to <code>{API}/v1/tenants</code>.
                </li>
                <li>
                  Authentication: Generic credential, <b>Basic Auth</b>. Your API key is the user and its secret the password.
                </li>
                <li>Send the JSON body shown here, filled from the form&apos;s answers.</li>
              </ol>
              <p className="tools">
                Using Fluent Forms Pro on your own WordPress? Its Webhook feed can post each entry straight to the n8n Webhook node.
              </p>
            </div>
            <Code file="HTTP Request · JSON body">
              {"{"}
              {"\n"}
              {"  "}
              <S>&quot;name&quot;</S>: <S>&quot;{"{{ $json.business }}"}&quot;</S>,{"\n"}
              {"  "}
              <S>&quot;externalId&quot;</S>: <S>&quot;form-{"{{ $execution.id }}"}&quot;</S>,{"\n"}
              {"  "}
              <S>&quot;wordPressUserName&quot;</S>: <S>&quot;{"{{ $json.email }}"}&quot;</S>,{"\n"}
              {"  "}
              <S>&quot;wordPressUserEmail&quot;</S>: <S>&quot;{"{{ $json.email }}"}&quot;</S>,{"\n"}
              {"  "}
              <S>&quot;wordPressUserRole&quot;</S>: <S>&quot;administrator&quot;</S>,{"\n"}
              {"  "}
              <S>&quot;size&quot;</S>: <S>&quot;small&quot;</S>
              {"\n"}
              {"}"}
              {"\n\n"}
              <C>{"// The answer comes back at once, before the site is built:"}</C>
              {"\n"}
              <C>{'// { "id": "…", "externalId": "form-…",'}</C>
              {"\n"}
              <C>{'//   "baseDomain": "kettle-and-crumb.anypress.site" }'}</C>
            </Code>
          </div>

          <div className="recipe" id="payment">
            <div>
              <span className="tag">Zapier · a payment</span>
              <h3>Paid somewhere else, site built</h3>
              <p>The client pays through Stripe, an invoice tool or a booking app instead of your storefront.</p>
              <ol>
                <li>Trigger: the new payment, or the invoice marked paid, in your payment app.</li>
                <li>
                  Action: <b>Webhooks by Zapier</b>, Custom Request. Method POST, address <code>{API}/v1/tenants</code>.
                </li>
                <li>
                  Basic Auth: your key and secret with a bar between them, <code>key|secret</code>.
                </li>
                <li>
                  Header <code>Content-Type: application/json</code>, and the body shown here, with the payment&apos;s id as the externalId.
                </li>
              </ol>
              <p className="tools">
                Using the payment&apos;s own id means a Zap that runs twice still makes one site. Ids may only have letters, numbers and dashes, so
                swap any underscore for a dash.
              </p>
            </div>
            <Code file="Custom Request · Data">
              {"{"}
              {"\n"}
              {"  "}
              <S>&quot;name&quot;</S>: <S>&quot;Rose and Fern&quot;</S>,{"\n"}
              {"  "}
              <S>&quot;externalId&quot;</S>: <S>&quot;pay-3QxK81Lm&quot;</S>,{"\n"}
              {"  "}
              <S>&quot;wordPressUserName&quot;</S>: <S>&quot;owner&quot;</S>,{"\n"}
              {"  "}
              <S>&quot;wordPressUserEmail&quot;</S>: <S>&quot;owner@roseandfern.example&quot;</S>,{"\n"}
              {"  "}
              <S>&quot;wordPressUserRole&quot;</S>: <S>&quot;administrator&quot;</S>,{"\n"}
              {"  "}
              <S>&quot;size&quot;</S>: <S>&quot;medium&quot;</S>
              {"\n"}
              {"}"}
            </Code>
          </div>

          <div className="recipe" id="crm">
            <div>
              <span className="tag">Make · a CRM step</span>
              <h3>Deal won, site built</h3>
              <p>Your CRM already knows when a client signs. Let that step make the site.</p>
              <ol>
                <li>
                  In Make, start a scenario with a <b>Custom webhook</b> and copy its address.
                </li>
                <li>
                  In your CRM, send to that address when the deal is won. In FluentCRM Pro, that&apos;s an automation with the Outgoing Webhook
                  action, run when a tag like &quot;Signed&quot; is added.
                </li>
                <li>
                  Add Make&apos;s HTTP module with Basic auth (your key and secret), POST to <code>{API}/v1/tenants</code>, with the contact&apos;s
                  details as the body.
                </li>
                <li>Use the contact&apos;s id as the externalId, so one client is always one site.</li>
              </ol>
            </div>
            <Code file="the same call from a terminal">
              <C>{"# Try it before you build the flow"}</C>
              {"\n"}
              curl -u <S>&quot;$KEY:$SECRET&quot;</S> \{"\n"}
              {"  "}-H <S>&apos;Content-Type: application/json&apos;</S> \{"\n"}
              {"  "}-d <S>&apos;{"{"}&quot;name&quot;:&quot;Hill Street Dental&quot;,</S>
              {"\n"}
              {"       "}
              <S>&quot;externalId&quot;:&quot;crm-contact-482&quot;,</S>
              {"\n"}
              {"       "}
              <S>&quot;wordPressUserName&quot;:&quot;office&quot;,</S>
              {"\n"}
              {"       "}
              <S>&quot;wordPressUserEmail&quot;:&quot;office@hillst.example&quot;,</S>
              {"\n"}
              {"       "}
              <S>
                &quot;wordPressUserRole&quot;:&quot;administrator&quot;{"}"}
                &apos;
              </S>{" "}
              \{"\n"}
              {"  "}
              {API}/v1/tenants
            </Code>
          </div>

          <div className="recipe" id="cancel">
            <div>
              <span className="tag">any tool · cancellations</span>
              <h3>Client leaves, site goes offline</h3>
              <p>When billing happens outside your storefront, end the site from the same flow that ends the subscription.</p>
              <ol>
                <li>Trigger: the subscription is cancelled in your payment or CRM tool.</li>
                <li>
                  POST to <code>/v1/tenants/suspend?externalId=…</code> with the same externalId you created it with. A backup is taken first.
                </li>
                <li>
                  If they come back, POST to <code>/v1/tenants/resume?externalId=…</code> and it&apos;s online again, exactly as it was.
                </li>
              </ol>
            </div>
            <Code file="suspend, then resume">
              curl -u <S>&quot;$KEY:$SECRET&quot;</S> -X POST \{"\n"}
              {"  "}
              <S>&quot;{API}/v1/tenants/suspend?externalId=pay-3QxK81Lm&quot;</S>
              {"\n\n"}
              curl -u <S>&quot;$KEY:$SECRET&quot;</S> -X POST \{"\n"}
              {"  "}
              <S>&quot;{API}/v1/tenants/resume?externalId=pay-3QxK81Lm&quot;</S>
            </Code>
          </div>
        </div>
      </section>

      <section className="sec soft" aria-labelledby="h-ready" id="ready">
        <div className="in">
          <SectionHead
            eyebrow="when it's ready"
            title="Let the welcome email send itself."
            lead="A site takes a few minutes to build. Instead of checking, add a webhook and AnyPress calls your flow the moment it's ready."
            id="h-ready"
          />
          <div className="recipes">
            <div className="recipe">
              <div>
                <span className="tag">n8n, Make or Zapier · tenant.ready</span>
                <h3>Site ready, client told</h3>
                <ol>
                  <li>
                    Make a new flow that starts with a webhook (n8n Webhook node, Make Custom webhook, or Catch Hook in Zapier). Copy its address.
                  </li>
                  <li>
                    At <a href="https://app.anypress.io">app.anypress.io</a>, open Webhooks, add that address and tick <code>tenant.ready</code>. Keep
                    the signing secret it shows you.
                  </li>
                  <li>
                    In the flow, look the site up again with GET <code>/v1/tenants?externalId=…</code> and carry on only when <code>statusCode</code>{" "}
                    is 1. That way the flow trusts AnyPress, not whatever reached the address.
                  </li>
                  <li>
                    Email the client their address, <code>domainName</code>, and a link to{" "}
                    <code>https://&lt;domainName&gt;/wp-login.php?action=lostpassword</code> to choose a password. Then update the CRM and tell the
                    team.
                  </li>
                </ol>
                <p className="tools">
                  Every request is signed the Standard Webhooks way, so a code step can check the <code>webhook-signature</code> header too. Each
                  event can arrive more than once: use <code>webhook-id</code> to skip repeats.
                </p>
              </div>
              <Code file="what your webhook receives">
                {"{"}
                {"\n"}
                {"  "}
                <S>&quot;type&quot;</S>: <S>&quot;tenant.ready&quot;</S>,{"\n"}
                {"  "}
                <S>&quot;timestamp&quot;</S>: <S>&quot;2026-10-24T16:05:12Z&quot;</S>,{"\n"}
                {"  "}
                <S>&quot;data&quot;</S>: {"{"}
                {"\n"}
                {"    "}
                <S>&quot;tenant&quot;</S>: {"{"}
                {"\n"}
                {"      "}
                <S>&quot;externalId&quot;</S>: <S>&quot;crm-contact-482&quot;</S>,{"\n"}
                {"      "}
                <S>&quot;name&quot;</S>: <S>&quot;Hill Street Dental&quot;</S>,{"\n"}
                {"      "}
                <S>&quot;domainName&quot;</S>: <S>&quot;hill-street-dental.anypress.site&quot;</S>,{"\n"}
                {"      "}
                <S>&quot;statusCode&quot;</S>: 1,{"\n"}
                {"      "}
                <S>&quot;statusName&quot;</S>: <S>&quot;Done&quot;</S>,{"\n"}
                {"      "}
                <S>&quot;size&quot;</S>: <S>&quot;small&quot;</S>
                {"\n"}
                {"    "}
                {"}"}
                {"\n"}
                {"  "}
                {"}"}
                {"\n"}
                {"}"}
              </Code>
            </div>
          </div>

          <div className="compare mt-10">
            <div className="tablewrap">
              <table>
                <thead>
                  <tr>
                    <th scope="col">Event</th>
                    <th scope="col">When it&apos;s sent</th>
                  </tr>
                </thead>
                <tbody>
                  {EVENTS.map(([e, when]) => (
                    <tr key={e}>
                      <th scope="row">
                        <code>{e}</code>
                      </th>
                      <td>{when}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section className="sec in" aria-labelledby="h-keys" id="keys">
        <SectionHead
          eyebrow="keys"
          title="One key per storefront, or one for all of them."
          lead="Every call signs in with a key and its secret, the same way in every tool."
          id="h-keys"
        />
        <div className="compare">
          <div className="tablewrap">
            <table>
              <thead>
                <tr>
                  <th scope="col"> </th>
                  <th scope="col">API key</th>
                  <th scope="col">Partner key</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Who has it</th>
                  <td>Every seller and reseller storefront</td>
                  <td>Resellers, for the whole account</td>
                </tr>
                <tr>
                  <th scope="row">Where you get it</th>
                  <td>API keys, at app.anypress.io</td>
                  <td>From us, when you ask</td>
                </tr>
                <tr>
                  <th scope="row">Works on</th>
                  <td>That one storefront&apos;s sites</td>
                  <td>Every storefront in the account</td>
                </tr>
                <tr>
                  <th scope="row">Each call says</th>
                  <td>Nothing extra</td>
                  <td>
                    Which storefront, with <code>?productId=</code>
                  </td>
                </tr>
                <tr>
                  <th scope="row">Can also</th>
                  <td>Manage sites, domains, webhooks</td>
                  <td>Add storefronts, share starting sites, read usage</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <p className="compare-note">
          Keys can be replaced with a grace period, so a flow keeps working while you paste in the new one. A wrong key or secret is answered with
          403.
        </p>

        <div className="mx-auto mt-14 max-w-[880px]">
          <SectionHead left eyebrow="the fields" title="What a new site can be told." />
          <div className="tablewrap mt-6 overflow-x-auto">
            <table className="fields">
              <tbody>
                {FIELDS.map(([f, d]) => (
                  <tr key={f}>
                    <th scope="row">{f}</th>
                    <td>{d}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-6 text-ink-soft">
            Every call, with examples, is in the{" "}
            <a href={API_DOCS} className="font-semibold text-ink underline">
              API reference
            </a>
            . The code behind it is{" "}
            <a href={API_REPO} className="font-semibold text-ink underline">
              open source
            </a>
            .
          </p>
        </div>
      </section>

      <section className="sec soft" aria-labelledby="h-faq">
        <div className="in">
          <SectionHead drawing="question" title="Automation questions" id="h-faq" />
          <Questions items={FAQ} firstOpen />
        </div>
      </section>

      <CtaBand
        eyebrow="ready?"
        title="Stop building sites by hand."
        body="Apply to sell, and your storefront creates sites from the first order. Need a partner key or help with a flow? Email support@anypress.io."
        href="/sell"
        label="Apply to sell"
        drawings={["plug", "key", "mailbox"]}
      />
    </>
  );
}
