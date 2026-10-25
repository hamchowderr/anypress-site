import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { AppLogo, Screenshot, type Shot } from "@/components/AppShots";
import { Drawing, type DrawingName } from "@/components/Drawing";
import { Templates, type Template } from "@/components/Templates";
import { CtaBand, PageHero, Questions, SectionHead } from "@/components/ui";

export const metadata: Metadata = {
  title: "Create sites automatically",
  description:
    "Sellers and resellers never build client sites by hand. An order, a form or a CRM step creates the site, through your shop, n8n, Make, Zapier or the AnyPress API.",
};

const API = "https://api.anypress.io";
const API_DOCS = `${API}/docs`;
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
    drawing: "tools",
    title: "Start from a template",
    body: "Ready-made flows for the usual jobs: a form or a payment makes a site, a cancelled plan suspends it, a finished site emails the team.",
    href: "#templates",
    who: "Anyone who wants it done in minutes",
  },
  {
    drawing: "words",
    title: "Just ask an AI app",
    body: "Connect AnyPress to Claude or ChatGPT and ask in plain words: make a site, back it up, change its home page.",
    href: "/ai",
    who: "Anyone who'd rather type than click",
  },
];

const N8N_DOC = "https://shop.anypress.io/docs/use-anypress-in-n8n/";
const MAKE_DOC = "https://shop.anypress.io/docs/use-anypress-in-make/";
const ZAPIER_DOC = "https://shop.anypress.io/docs/use-anypress-in-zapier/";

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
    shot: {
      src: "/apps/make-create-site.webp",
      alt: "The AnyPress Create a Site module in Make, with the site name, reference, client email and size filled in",
      width: 894,
      height: 666,
    },
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
    shot: {
      src: "/apps/zapier-create-site.webp",
      alt: "The AnyPress Create Site action in a Zap, with the site name, reference, client email and size filled in",
      width: 808,
      height: 580,
    },
  },
];

const SUSPEND_DOC =
  "https://shop.anypress.io/docs/suspend-a-site-when-a-client-cancels/";
const READY_DOC = "https://shop.anypress.io/docs/email-the-client-when-their-site-is-ready/";

const n8nShot = (file: string, alt: string): Shot => ({
  src: `/templates/${file}.webp`,
  alt,
  width: 1316,
  height: 518,
});

/** Ready-made flows people can copy into their own account. */
const TEMPLATES: Template[] = [
  {
    id: "n8n-form",
    tool: "n8n",
    title: "Intake form sent, site created",
    body: "A client fills in your form and their site starts building, named after their business and with their login made.",
    shot: n8nShot("n8n-create-site", "n8n workflow: Client intake form, then AnyPress Create a site"),
    workflow: "/templates/n8n-create-site.json",
    guide: "https://shop.anypress.io/docs/create-a-site-from-a-form-with-n8n/",
  },
  {
    id: "n8n-stripe",
    tool: "n8n",
    title: "Stripe payment, site created",
    body: "A paid Stripe checkout makes the site. The subscription id is its reference, so a retry never makes two.",
    shot: n8nShot("n8n-stripe-create-site", "n8n workflow: Stripe checkout paid, then AnyPress Create a site"),
    workflow: "/templates/n8n-stripe-create-site.json",
    guide: N8N_DOC,
  },
  {
    id: "n8n-cancel",
    tool: "n8n",
    title: "Subscription ended, site suspended",
    body: "When the Stripe subscription ends, the site is backed up and taken offline. Resume brings it back as it was.",
    shot: n8nShot("n8n-stripe-suspend-site", "n8n workflow: Stripe subscription ended, then AnyPress Suspend the site"),
    workflow: "/templates/n8n-stripe-suspend-site.json",
    guide: SUSPEND_DOC,
  },
  {
    id: "n8n-ready",
    tool: "n8n",
    title: "Site ready, team emailed",
    body: "The AnyPress trigger starts the flow the moment a site is built, with its name, address and your reference.",
    shot: n8nShot("n8n-site-ready", "n8n workflow: AnyPress Site ready trigger, then Email the team"),
    workflow: "/templates/n8n-site-ready.json",
    guide: READY_DOC,
  },
  {
    id: "make-crm",
    tool: "Make",
    title: "Deal won in your CRM, site created",
    body: "Your CRM calls the scenario when a client signs, and AnyPress makes their site from the contact's details.",
    shot: {
      src: "/apps/make-scenario.webp",
      alt: "Make scenario: a custom webhook, then AnyPress Create a Site",
      width: 1305,
      height: 536,
    },
    guide: "https://shop.anypress.io/docs/create-a-site-from-a-crm-step-with-make/",
  },
  {
    id: "make-ready",
    tool: "Make",
    title: "Site ready, client emailed",
    body: "Watch Site Events starts the scenario when a site is ready, then an email goes out with its address.",
    shot: {
      src: "/apps/make-site-ready.webp",
      alt: "Make scenario: AnyPress Watch Site Events, then Send an Email",
      width: 1305,
      height: 536,
    },
    guide: READY_DOC,
  },
  {
    id: "zapier-payment",
    tool: "Zapier",
    title: "Stripe payment, site created",
    body: "A new Stripe payment makes the site, with the payment id as its reference so a Zap that runs twice still makes one.",
    shot: {
      src: "/apps/zapier-zap.webp",
      alt: "Zap: Stripe New Payment, then AnyPress Create Site",
      width: 1070,
      height: 420,
    },
    guide: "https://shop.anypress.io/docs/create-a-site-from-a-payment-with-zapier/",
  },
  {
    id: "zapier-ready",
    tool: "Zapier",
    title: "Site ready, client emailed",
    body: "The Site Event trigger runs the Zap when a site is ready, and Email by Zapier sends the welcome.",
    shot: {
      src: "/apps/zapier-site-ready.webp",
      alt: "Zap: AnyPress Site Event, then Email by Zapier",
      width: 1070,
      height: 420,
    },
    guide: READY_DOC,
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
    "How do I use a template?",
    "Add the AnyPress app to your tool first. In n8n, copy the workflow and paste it onto an empty canvas. In Make, create a scenario and import the blueprint. In Zapier, open the template link and Zapier makes you a copy. Then pick your AnyPress login on the AnyPress step and turn it on.",
  ],
  [
    "What can a new site be told?",
    <>
      Its name, your reference, the client&apos;s email and role, which
      starting site to copy, its size and the client&apos;s own domain. The
      guide for each app lists them, and the{" "}
      <a href={API_DOCS}>API reference</a> has every field.
    </>,
  ],
  [
    "Which events can start a flow?",
    "Site ready, site failed, domain connected, suspended, resumed, deleted, restored and backup done. Pick one or several on the AnyPress trigger.",
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
      AnyPress can then change pages, sections, colours and menus for you. See{" "}
      <Link href="/ai">AnyPress in Claude and ChatGPT</Link>.
    </>,
  ],
  [
    "Do my clients see AnyPress?",
    "No. The flows are yours, the emails come from you, and sites sold from your shop show your brand.",
  ],
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
          <a href="#apps" className="btn btn-ink">
            See the apps →
          </a>
          <a href="#templates" className="btn btn-paper">
            Browse templates
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

      <section className="sec soft" aria-labelledby="h-templates" id="templates">
        <div className="in">
          <SectionHead
            eyebrow="templates"
            title="Copy a flow that already works."
            lead="Each one is a trigger and an AnyPress step, ready to go. Add it to your account, pick your AnyPress login and turn it on."
            id="h-templates"
          />
          <Templates items={TEMPLATES} />
          <p className="compare-note">
            n8n: copy the workflow, then paste it onto an empty canvas. Every
            template has a guide in <a href={DOCS}>the docs</a>.
          </p>
        </div>
      </section>

      <section className="sec in" aria-labelledby="h-ai" id="ai">
        <div className="ai-band">
          <div>
            <span className="tag">Claude, ChatGPT and more</span>
            <h2 id="h-ai">Or just ask.</h2>
            <p>
              Connect AnyPress to your AI app and say what you need: &ldquo;make a
              bookings site for Still Water Yoga&rdquo;, &ldquo;back up every
              site tonight&rdquo;, &ldquo;add a pricing section to the home
              page&rdquo;.
            </p>
            <div className="ctas mt-6">
              <Link href="/ai" className="btn btn-ink">
                AnyPress in Claude and ChatGPT →
              </Link>
            </div>
          </div>
          <Screenshot
            shot={{
              src: "/apps/claude-stores.webp",
              alt: "Claude answering \"Show my stores\" with the AnyPress stores screen: each site with its address and Back up and Suspend buttons",
              width: 768,
              height: 572,
            }}
            label="Claude"
          />
        </div>
      </section>

      <section className="sec soft" aria-labelledby="h-faq">
        <div className="in">
          <SectionHead
            drawing="question"
            title="Automation questions"
            id="h-faq"
          />
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
