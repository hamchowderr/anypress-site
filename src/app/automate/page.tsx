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
    body: "A form, a signed proposal or a payment somewhere else starts a flow in n8n, Make or Zapier, and the AnyPress app in it creates the site.",
    href: "#apps",
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

const FIELDS: [string, string, string][] = [
  [
    "Site Name",
    "name",
    "The site's name. Its free address is made from it, for example rose-and-fern.anypress.site.",
  ],
  [
    "Your Reference",
    "externalId",
    "Your own id for it: the order, deal or form entry number. Letters, numbers and dashes only. Running the same create again gets the site already made, so retries are safe.",
  ],
  [
    "Client Email",
    "wordPressUserEmail",
    "Makes the client's WordPress login, so they can choose their own password.",
  ],
  [
    "Client Role",
    "wordPressUserRole",
    "Their WordPress role. Administrator if you leave it out.",
  ],
  [
    "Starting Site Group",
    "groupName",
    "Which of your starting sites to copy. Leave it empty to use your current one.",
  ],
  ["Size", "size", "Small, Medium or Large. Small if you leave it out."],
  [
    "Custom Domain",
    "customDomainName",
    "The client's own domain, if they already have one. You can add it later instead.",
  ],
  [
    "Storefront",
    "productId",
    "Partner keys only: which storefront the site belongs to.",
  ],
];

const EVENTS: [string, string, string][] = [
  [
    "Site ready",
    "tenant.ready",
    "A new site is built and answering. Send the welcome email.",
  ],
  [
    "Site failed",
    "tenant.failed",
    "A change still failed after its retries. We're told too.",
  ],
  [
    "Domain connected",
    "tenant.domains_changed",
    "The client's own domain is connected.",
  ],
  [
    "Suspended or resumed",
    "tenant.suspended / tenant.resumed",
    "Taken offline, or back online.",
  ],
  [
    "Deleted or restored",
    "tenant.deleted / tenant.restored",
    "Gone, or back from its backup.",
  ],
  [
    "Backup done",
    "tenant.backup_completed",
    "A backup finished, nightly ones included.",
  ],
];

const N8N_DOC = "https://shop.anypress.io/docs/use-anypress-in-n8n/";
const MAKE_DOC = "https://shop.anypress.io/docs/use-anypress-in-make/";
const ZAPIER_DOC = "https://shop.anypress.io/docs/use-anypress-in-zapier/";

type Shot = { src: string; alt: string; width: number; height: number };

const APPS: {
  tool: string;
  logo: string;
  how: string;
  add: { label: string; href: string };
  doc: string;
  actions: string[];
  trigger: string;
  shot?: Shot;
}[] = [
  {
    tool: "n8n",
    logo: "/apps/n8n-logo.svg",
    how: "Install the community node n8n-nodes-anypress from Settings, then Community nodes. Works on any self-hosted n8n.",
    add: { label: "Install in n8n", href: N8N_DOC },
    doc: N8N_DOC,
    actions: [
      "Create a site",
      "Get a site",
      "Suspend a site",
      "Resume a site",
      "Delete a site",
    ],
    trigger: "AnyPress Trigger",
    shot: {
      src: "/apps/n8n-create-site.webp",
      alt: "The AnyPress node in n8n, set to create a site from the form's business name and email",
      width: 780,
      height: 1311,
    },
  },
  {
    tool: "Make",
    logo: "/apps/make-logo.svg",
    how: "Open the invite link to add the AnyPress app to your Make account, then add any AnyPress module to a scenario.",
    add: {
      label: "Add to Make",
      href: "https://www.make.com/en/hq/app-invitation/671dddf42544d057e9ecc35c05ecdf8b",
    },
    doc: MAKE_DOC,
    actions: [
      "Create a Site",
      "Get a Site",
      "Suspend a Site",
      "Resume a Site",
      "Delete a Site",
    ],
    trigger: "Watch Site Events",
  },
  {
    tool: "Zapier",
    logo: "/apps/zapier-logo.svg",
    how: "Open the invite link to add AnyPress to your Zapier account, then pick it as the app in any Zap.",
    add: {
      label: "Add to Zapier",
      href: "https://zapier.com/developer/public-invite/248504/d92ccd4f604ea3e76535ff8452c69eb9/",
    },
    doc: ZAPIER_DOC,
    actions: [
      "Create Site",
      "Find Site",
      "Suspend Site",
      "Resume Site",
      "Delete Site",
    ],
    trigger: "Site Event",
  },
];

/** A ready-made flow: what starts it, what AnyPress does, and how to set it up in the app. */
const FLOWS: {
  id: string;
  tool: string;
  logos: string[];
  when: string;
  then: string;
  body: string;
  steps: string[];
  doc: string;
  shot?: Shot;
}[] = [
  {
    id: "form",
    tool: "n8n",
    logos: ["/apps/n8n-logo.svg"],
    when: "Intake form sent",
    then: "Create a site",
    body: "A client fills in your intake form, on your website or in n8n itself, and their site starts building.",
    steps: [
      "Start the workflow with an n8n Form Trigger, or a Webhook node your form posts to.",
      "Add the AnyPress node and choose Create.",
      "Map the business name to Site Name and the email to Client Email. Use the form entry as Your Reference, so a retry never makes a second site.",
    ],
    doc: N8N_DOC,
    shot: {
      src: "/apps/n8n-form-flow.webp",
      alt: "An n8n workflow: a client intake form, then AnyPress Create a site",
      width: 2400,
      height: 1440,
    },
  },
  {
    id: "payment",
    tool: "Zapier",
    logos: ["/apps/zapier-logo.svg"],
    when: "Payment received",
    then: "Create Site",
    body: "The client pays through Stripe, an invoice tool or a booking app instead of your storefront.",
    steps: [
      "Trigger: the new payment, or the invoice marked paid, in your payment app.",
      "Action: AnyPress, Create Site. Map the client's name and email.",
      "Use the payment's id as Your Reference, so a Zap that runs twice still makes one site.",
    ],
    doc: ZAPIER_DOC,
  },
  {
    id: "crm",
    tool: "Make",
    logos: ["/apps/make-logo.svg"],
    when: "Deal won in your CRM",
    then: "Create a Site",
    body: "Your CRM already knows when a client signs. Let that step make the site.",
    steps: [
      "Start the scenario with your CRM's module, or a Custom webhook your CRM sends to. In FluentCRM Pro, that's an Outgoing Webhook when a tag like Signed is added.",
      "Add AnyPress, Create a Site, and map the contact's details.",
      "Use the contact's id as Your Reference, so one client is always one site.",
    ],
    doc: MAKE_DOC,
  },
  {
    id: "cancel",
    tool: "All three",
    logos: [
      "/apps/n8n-logo.svg",
      "/apps/make-logo.svg",
      "/apps/zapier-logo.svg",
    ],
    when: "Subscription cancelled",
    then: "Suspend a site",
    body: "When billing happens outside your storefront, end the site from the same flow that ends the subscription.",
    steps: [
      "Trigger: the subscription is cancelled in your payment app or CRM.",
      "Add AnyPress, Suspend, with the same reference you created the site with. A backup is taken first.",
      "If they come back, AnyPress Resume puts it online again, exactly as it was.",
    ],
    doc: "https://shop.anypress.io/docs/suspend-a-site-when-a-client-cancels/",
  },
];

const FAQ: [string, ReactNode][] = [
  [
    "Do I need a developer?",
    "No. If your clients buy on your storefront, sites are already created for you. For anything else, add the AnyPress app in n8n, Make or Zapier and pick the step. Any other tool can do the same with a web request.",
  ],
  [
    "Where do I get an API key?",
    <>
      Sign in at <a href="https://app.anypress.io">app.anypress.io</a> and open
      API keys. The secret is shown once, so put it straight into your
      tool&apos;s saved logins. Resellers can ask us for a partner key, which
      works on every storefront in the account.
    </>,
  ],
  [
    "What if the flow runs twice?",
    "Always fill in Your Reference with something unique, like the order or deal number. Running Create again with the same reference gets the site already made, and never builds another.",
  ],
  [
    "How does the client get into their new site?",
    "Creating the site makes their WordPress login with their email. Your welcome email links to the site's password page, so they choose their own password. Sites sold on your storefront get a one-click sign-in from their account instead.",
  ],
  [
    "Can it put the client's own words and logo in too?",
    <>
      Yes. Every site starts from your starting site, and an AI app connected to
      AnyPress can then change pages, sections, colours and menus for you. See
      the <Link href="/developers">developer page</Link>.
    </>,
  ],
  [
    "Do my clients see AnyPress?",
    "No. The flows are yours, the emails come from you, and sites sold from your shop show your brand.",
  ],
];

/** A platform or AnyPress logo in a small rounded tile. */
function AppLogo({ src }: { src: string }) {
  return (
    <span className="app-logo">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" width={28} height={28} />
    </span>
  );
}

/** A real screenshot from the platform, in a window frame. */
function Screenshot({ shot, label }: { shot: Shot; label: string }) {
  return (
    <figure className="appshot">
      <div className="appshot-bar" aria-hidden="true">
        <i />
        <i />
        <i />
        <span>{label}</span>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={shot.src}
        alt={shot.alt}
        width={shot.width}
        height={shot.height}
        loading="lazy"
      />
    </figure>
  );
}

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
          <a href="#apps" className="btn btn-ink">
            See the apps →
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
                <li>
                  Add a subscription product in your storefront, with its price.
                </li>
                <li>
                  Turn on the website integration for it and pick the kind of
                  site, the starting site and the size.
                </li>
                <li>
                  That&apos;s it. A paid order builds the site and emails your
                  client a link to sign in.
                </li>
              </ol>
              <p className="tools">
                When a subscription is cancelled or runs out, the site is backed
                up and taken offline, then deleted after your grace period. If
                they pay again first, it comes back.
              </p>
            </div>
            <div>
              <ul className="steps !mt-0">
                {(
                  [
                    [
                      "card",
                      "Your client pays",
                      "On your shop, at your price.",
                    ],
                    [
                      "tools",
                      "The site is built",
                      "From your starting site, in minutes.",
                    ],
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
            Made-up studio, real steps. The person who set it up still sees
            every site, its backups and its jobs at app.anypress.io.
          </p>
        </div>
      </section>

      <section className="sec in" aria-labelledby="h-apps" id="apps">
        <SectionHead
          eyebrow="the apps"
          title="AnyPress in n8n, Make and Zapier."
          lead="Add the AnyPress app to the tool you already use and pick a step. Nothing to code, and the trigger sets up its own webhook when you turn the flow on."
          id="h-apps"
        />
        <div className="apps">
          {APPS.map((a) => (
            <article key={a.tool} className={`app${a.shot ? "" : " no-shot"}`}>
              <div className="app-text">
                <div className="app-logos" aria-hidden="true">
                  <AppLogo src="/logo-mark.svg" />
                  <span>+</span>
                  <AppLogo src={a.logo} />
                </div>
                <h3>AnyPress for {a.tool}</h3>
                <p>{a.how}</p>
                <h4>Actions</h4>
                <ul className="chips">
                  {a.actions.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
                <h4>Trigger</h4>
                <ul className="chips">
                  <li>{a.trigger}</li>
                </ul>
                <p className="app-note">
                  Starts your flow when a site is ready, fails, is suspended and
                  more.
                </p>
                <div className="ctas mt-6">
                  <a href={a.add.href} className="btn btn-ink">
                    {a.add.label} →
                  </a>
                  <a href={a.doc} className="btn btn-paper">
                    Setup guide
                  </a>
                </div>
              </div>
              {a.shot && <Screenshot shot={a.shot} label={a.tool} />}
            </article>
          ))}
        </div>
        <p className="compare-note">
          Each app signs in with your API key and secret. With a partner key,
          pick the storefront on each step (in Make, add one connection per
          storefront). Using another tool? It can make the same calls with a web
          request: see the <a href={API_DOCS}>API reference</a>.
        </p>
      </section>

      <section className="sec soft" aria-labelledby="h-recipes" id="recipes">
        <div className="in">
          <SectionHead
            eyebrow="popular flows"
            title="Start from one of these."
            lead={
              <>
                Each one is a trigger and one AnyPress step. Full step-by-step
                guides are in <a href={DOCS}>the docs</a>.
              </>
            }
            id="h-recipes"
          />
          <div className="aflows">
            {FLOWS.map((f) => (
              <article
                key={f.id}
                id={f.id}
                className={`aflow${f.shot ? " has-shot" : ""}`}
              >
                <div className="aflow-head">
                  <span className="aflow-pair" aria-hidden="true">
                    {f.logos.map((l) => (
                      <AppLogo key={l} src={l} />
                    ))}
                    <span className="arrow">→</span>
                    <AppLogo src="/logo-mark.svg" />
                  </span>
                  <span className="tag">{f.tool}</span>
                </div>
                <h3>
                  {f.when}, <span>{f.then}</span>
                </h3>
                <p>{f.body}</p>
                <ol>
                  {f.steps.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ol>
                <a href={f.doc} className="aflow-link">
                  Full guide →
                </a>
                {f.shot && <Screenshot shot={f.shot} label={f.tool} />}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="sec in" aria-labelledby="h-ready" id="ready">
        <SectionHead
          eyebrow="when it's ready"
          title="Let the welcome email send itself."
          lead="A site takes a few minutes to build. Start a second flow with the AnyPress trigger and it runs the moment the site is ready."
          id="h-ready"
        />
        <div className="recipes">
          <div className="recipe">
            <div>
              <span className="tag">n8n, Make or Zapier</span>
              <h3>Site ready, client told</h3>
              <ol>
                <li>
                  Start a new flow with the AnyPress trigger: AnyPress Trigger
                  in n8n, Watch Site Events in Make, or Site Event in Zapier.
                </li>
                <li>
                  Pick Site ready as the event and turn the flow on. It
                  registers itself with AnyPress, and only real events from
                  AnyPress get through.
                </li>
                <li>
                  Add an email step to the client with their new address and a
                  link to choose a password. Then update your CRM and tell the
                  team.
                </li>
              </ol>
              <p className="tools">
                Each event brings the site with it: its name, your reference,
                its address and its status. Using another tool? Add the webhook
                by hand at app.anypress.io, under Webhooks.
              </p>
            </div>
            <Screenshot
              shot={{
                src: "/apps/n8n-site-ready-flow.webp",
                alt: "An n8n workflow: the AnyPress Trigger for site ready, then an email to the client",
                width: 2400,
                height: 1440,
              }}
              label="n8n"
            />
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
                {EVENTS.map(([name, id, when]) => (
                  <tr key={id}>
                    <th scope="row">
                      {name}
                      <small className="block font-normal text-ink-soft">
                        {id}
                      </small>
                    </th>
                    <td>{when}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="sec soft" aria-labelledby="h-keys" id="keys">
        <div className="in">
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
            Keys can be replaced with a grace period, so a flow keeps working
            while you paste in the new one. A wrong key or secret is answered
            with 403.
          </p>

          <div className="mx-auto mt-14 max-w-[880px]">
            <SectionHead
              left
              eyebrow="the fields"
              title="What a new site can be told."
            />
            <div className="tablewrap mt-6 overflow-x-auto">
              <table className="fields">
                <tbody>
                  {FIELDS.map(([label, api, d]) => (
                    <tr key={api}>
                      <th scope="row">
                        {label}
                        <small className="block font-normal text-ink-soft">
                          {api}
                        </small>
                      </th>
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
        </div>
      </section>

      <section className="sec in" aria-labelledby="h-faq">
        <SectionHead
          drawing="question"
          title="Automation questions"
          id="h-faq"
        />
        <Questions items={FAQ} firstOpen />
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
