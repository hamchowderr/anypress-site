import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { Screenshot } from "@/components/AppShots";
import { CopyField } from "@/components/CopyField";
import { Drawing, type DrawingName } from "@/components/Drawing";
import { CtaBand, PageHero, Questions, SectionHead } from "@/components/ui";

export const metadata: Metadata = {
  title: "AnyPress in Claude and ChatGPT",
  description:
    "Connect AnyPress to Claude, ChatGPT or any MCP app and ask in plain words: make a site, back it up, connect a domain or change its pages.",
};

const GUIDE = "https://shop.anypress.io/docs/connect-an-ai-app-to-anypress/";
const MCP = "https://api.anypress.io/mcp";

const STEPS: { drawing: DrawingName; title: string; body: ReactNode }[] = [
  {
    drawing: "plug",
    title: "Add AnyPress as a connector",
    body: (
      <>
        In Claude, open Settings, then Connectors, then Add custom connector. In
        ChatGPT, turn on developer mode under Settings, Apps and Connectors,
        then create a connector. Paste the address below.
      </>
    ),
  },
  {
    drawing: "key",
    title: "Sign in and choose what it may do",
    body: "Your AI app opens our sign-in page. Sign in to AnyPress, tick what the app may see and change, and approve. There's no key or secret to copy.",
  },
  {
    drawing: "words",
    title: "Ask",
    body: "Type what you need, the way you'd ask a person. The app picks the right steps, and shows your sites right in the chat.",
  },
];

const ADDRESSES: { who: string; body: string; url: string }[] = [
  {
    who: "You sell sites",
    body: "Sellers and resellers. Resellers pick which storefront each connection is for.",
    url: MCP,
  },
  {
    who: "You have one site",
    body: "Website owners. Approve in your own site's dashboard, and the app can edit that site's pages and design.",
    url: `${MCP}/site`,
  },
  {
    who: "Look, don't touch",
    body: "Sellers and resellers who want an app that can only see their sites.",
    url: `${MCP}/read-only`,
  },
];

const ASKS: { drawing: DrawingName; title: string; asks: string[] }[] = [
  {
    drawing: "website",
    title: "Sites",
    asks: [
      "Make a bookings site for Still Water Yoga.",
      "Which sites are still building?",
      "Take the site for order 1042 offline.",
    ],
  },
  {
    drawing: "backup",
    title: "Backups",
    asks: [
      "Back up every site tonight.",
      "Put Fern & Clay back to yesterday's backup.",
    ],
  },
  {
    drawing: "domain",
    title: "Domains and email",
    asks: [
      "Connect stillwateryoga.com to the yoga site.",
      "Send the bakery's emails from its own domain.",
    ],
  },
  {
    drawing: "paint",
    title: "Pages and design",
    asks: [
      "Add a pricing section to the home page.",
      "Make the header dark green and add a Book now button.",
      "Draft an About page from this text.",
    ],
  },
];

const SAFE: [string, string][] = [
  ["It acts as you", "With your role on the team. If you can only look, so can the app."],
  ["Only what you ticked", "Sites, backups, domains, email, versions and pages are each switched on separately."],
  ["It asks first", "Before anything that deletes or restores, the app checks with you."],
  ["Every change is logged", "Under your name. Page edits can be undone from the page's revisions."],
];

const FAQ: [string, ReactNode][] = [
  [
    "Which AI apps work?",
    "Claude and ChatGPT, on plans that let you add custom connectors, and any other app that supports MCP connectors, such as Claude Code or Cursor.",
  ],
  [
    "Do I need an API key?",
    "No. You sign in to AnyPress and approve, the same way you'd sign in with Google. The app never sees a password or a secret.",
  ],
  [
    "Can my clients use it for their own site?",
    "Yes. A website owner adds the /mcp/site address and approves in their site's dashboard. Their app can then change that one site's pages and design, and nothing else.",
  ],
  [
    "How do I stop it?",
    "Remove the connector in your AI app. Access also ends the moment you leave the team.",
  ],
  [
    "Building your own agent?",
    <>
      The connector speaks the open MCP standard, so any agent can use it. The
      API, SDKs and webhooks are on the <Link href="/developers">developer page</Link>.
    </>,
  ],
];

export default function Ai() {
  return (
    <>
      <PageHero
        eyebrow="AI apps"
        title={
          <>
            AnyPress in <mark>Claude and ChatGPT</mark>.
          </>
        }
        lead="Connect once, then ask in plain words. Your AI app makes sites, backs them up, connects domains and edits pages, and shows you what it did."
      >
        <div className="ctas mt-8">
          <a href="#connect" className="btn btn-ink">
            Connect it →
          </a>
          <a href={GUIDE} className="btn btn-paper">
            Setup guide
          </a>
        </div>
      </PageHero>

      <section className="sec soft" aria-labelledby="h-connect" id="connect">
        <div className="in">
          <SectionHead
            eyebrow="two minutes"
            title="Connect it once."
            id="h-connect"
          />
          <ol className="steps">
            {STEPS.map((s, i) => (
              <li key={s.title}>
                <Drawing name={s.drawing} />
                <div>
                  <h3>
                    {i + 1}. {s.title}
                  </h3>
                  <p>{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="ai-connector">
            <Screenshot
              shot={{
                src: "/apps/claude-connector.webp",
                alt: "AnyPress connected in Claude's connector settings, at https://api.anypress.io/mcp, with its tools listed",
                width: 809,
                height: 626,
              }}
              label="Claude, Settings, Connectors"
            />
          </div>
          <ul className="addresses">
            {ADDRESSES.map((a) => (
              <li key={a.url}>
                <h3>{a.who}</h3>
                <p>{a.body}</p>
                <CopyField value={a.url} label={`Connector address for: ${a.who}`} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="sec in" aria-labelledby="h-asks">
        <SectionHead
          eyebrow="what to ask"
          title="Say it the way you'd say it to a person."
          id="h-asks"
        />
        <ul className="asks">
          {ASKS.map((g) => (
            <li key={g.title}>
              <Drawing name={g.drawing} />
              <h3>{g.title}</h3>
              <ul>
                {g.asks.map((a) => (
                  <li key={a}>&ldquo;{a}&rdquo;</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>

      <section className="sec soft" aria-labelledby="h-screens">
        <div className="in">
          <SectionHead
            eyebrow="in the chat"
            title="It shows you, not just tells you."
            lead="In apps that support it, your sites appear as a screen in the chat, with buttons to back up, suspend or bring a site back."
            id="h-screens"
          />
          <div className="ai-connector">
            <Screenshot
              shot={{
                src: "/apps/claude-stores.webp",
                alt: "Claude answering \"Show my stores\" with the AnyPress stores screen: each site with its address, and Back up and Suspend buttons",
                width: 768,
                height: 572,
              }}
              label="Claude"
            />
          </div>
        </div>
      </section>

      <section className="sec in" aria-labelledby="h-safe">
        <SectionHead
          eyebrow="in your control"
          title="It can only do what you can."
          id="h-safe"
        />
        <ul className="cards safe">
          {SAFE.map(([t, b]) => (
            <li key={t}>
              <h3>{t}</h3>
              <p>{b}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="sec soft" aria-labelledby="h-faq">
        <div className="in">
          <SectionHead drawing="question" title="AI app questions" id="h-faq" />
          <Questions items={FAQ} firstOpen />
        </div>
      </section>

      <CtaBand
        eyebrow="ready?"
        title="Make your next site by asking for it."
        body="Apply to sell, then connect AnyPress to your AI app. Stuck? Email support@anypress.io."
        href="/sell"
        label="Apply to sell"
        drawings={["plug", "words", "website"]}
      />
    </>
  );
}
