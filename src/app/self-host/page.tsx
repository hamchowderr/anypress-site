import type { Metadata } from "next";
import Link from "next/link";
import { Screenshot } from "@/components/AppShots";
import { type Problem, ProblemFix } from "@/components/ProblemFix";
import { ClientSites } from "@/components/ClientSites";
import { CtaBand, PageHero, Questions, SectionHead } from "@/components/ui";
import { CARE_SERVICES, dollars } from "@/lib/care";
import { pageMeta } from "@/lib/seo";
import { CONTACT_EMAIL, LOWEST_PRICE } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  path: "/self-host",
  title: "Run AnyPress yourself",
  description:
    "Run AnyPress on a server you choose: free to do yourself, or we set it up and look after it. For businesses that sell websites and companies that keep their sites on their own servers.",
});

const REPO = "https://github.com/hamchowderr/waas-provisioning-api";
const INSTALLER_DOCS = `${REPO}/blob/main/install/README.md`;
const GUIDE = `${REPO}/blob/main/docs/self-hosting.md`;

const NEEDS: [string, string][] = [
  [
    "A server",
    "Ubuntu 24.04 with 4 GB of memory or more. Hostinger, Hetzner, DigitalOcean or any provider.",
  ],
  [
    "Two domains",
    "One for your brand (your dashboard lives on it) and one your customers' sites are named under.",
  ],
  [
    "A storage bucket",
    "Cloudflare R2 or any S3-compatible storage, for site templates and backups.",
  ],
  [
    "Optional",
    "A Cloudflare token to set the DNS records for you, toSend for email, and Stripe for selling.",
  ],
];

const STEPS = [
  "Installs Coolify, with your email as its admin.",
  "Sets your DNS records in Cloudflare, when you give it a token.",
  "Runs the AnyPress API and its database, with generated passwords and keys.",
  "Puts on the newest site templates, checked so nothing was changed on the way.",
  "Builds your shop: the WordPress shop your customers buy sites from.",
  "Deploys the dashboard on your server, or on your own Vercel account.",
  "Ends with a check that tells you what still needs doing. Running it again is safe.",
];

const ask = (subject: string) =>
  `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`AnyPress on my own server: ${subject}`)}`;

const MOVE_IN = CARE_SERVICES.find((s) => s.key === "move-my-site-in");

const WAYS: {
  name: string;
  who: string;
  price: string;
  body: string;
  items: string[];
  cta: [string, string];
}[] = [
  {
    name: "Do it yourself",
    who: "For developers and teams with someone technical.",
    price: "Free",
    body: "Run the installer and you have the whole platform. The code is yours under the GPL.",
    items: [
      "The installer and every guide",
      "New site templates and releases on GitHub",
      "Questions and bug reports on GitHub",
    ],
    cta: ["Read the install guide", INSTALLER_DOCS],
  },
  {
    name: "We set it up",
    who: "For businesses that want it working without learning servers.",
    price: "$1,500 one time",
    body: "We install AnyPress on your server and your accounts, then hand it over working.",
    items: [
      "The server, your domains and DNS",
      "Storage, email and Stripe connected",
      "Your shop and its plans made with you",
      "Your brand on the shop customers buy from",
      "A walk-through call, and a written handover",
      ...(MOVE_IN
        ? [`Your existing sites moved in: ${dollars(MOVE_IN.price)} a site`]
        : []),
    ],
    cta: ["Book a setup", ask("set it up")],
  },
  {
    name: "We look after it",
    who: "For anyone running it who'd rather not keep it up to date.",
    price: "$199 a month",
    body: "We keep your platform up to date and watch it, so you can get on with your work.",
    items: [
      "New releases put on for you",
      "Health, backups and restore tests watched",
      "Answered by email within 1 business day",
      "Moving to a bigger server when you need it",
    ],
    cta: ["Start care", ask("care")],
  },
  {
    name: "For larger teams",
    who: "For companies with several servers, strict rules or a buying process.",
    price: "From $1,000 a month",
    body: "Everything in care, with faster answers and the paperwork a company needs.",
    items: [
      "Answered the same business day",
      "A named contact and a monthly call",
      "Several servers, in the countries you choose",
      "A data processing agreement and security answers",
      "Invoices and a written contract",
      "Changes built for your team",
    ],
    cta: ["Talk to us", ask("larger team")],
  },
];

const INCLUDED: [string, string][] = [
  [
    "Five kinds of site",
    "Website, bookings, online store, community and courses, or everything, each on its own WordPress and database.",
  ],
  [
    "The tools set up",
    "The Fluent plugins, Rank Math and AnyPress Client switched on for each site type, with the AnyPress theme and Blocks.",
  ],
  [
    "Backups that are tested",
    "Nightly backups of every site to your bucket, and a nightly test that one restores.",
  ],
  [
    "Domains and email",
    "Free addresses under your domain, customers' own domains, and email from their own domain.",
  ],
  [
    "Your own shop",
    "A WordPress shop on FluentCart where your customers buy sites, paid into your own Stripe.",
  ],
  [
    "Your own dashboard",
    "Every site, customer and job in one place, on your own domain.",
  ],
  [
    "Moving sites in",
    "The same switches that move WooCommerce, LearnDash, BuddyPress and others into the Fluent tools.",
  ],
  [
    "An API and connector",
    "Make and change sites from your own code, automations or an AI assistant.",
  ],
];

const HOW: [string, string][] = [
  [
    "Answer a few questions",
    "Your brand's domain, the domain your customers' sites go under, your email and your storage bucket.",
  ],
  [
    "Run the installer",
    "It makes a server at Hostinger, Hetzner or DigitalOcean for you, or runs on a server you already have.",
  ],
  [
    "Open your dashboard",
    "Your dashboard, your shop and the site templates are ready, with a list of anything left to do.",
  ],
];

const SCREENS: [string, string, string, string][] = [
  [
    "/beta/dashboard-stores.webp",
    "Your dashboard · Stores",
    "The AnyPress dashboard's Stores list, showing sample sites with their version, domain, status, last backup and date",
    "Every site in one list: which are ready or being built, each one's domain and last backup.",
  ],
  [
    "/beta/dashboard-store.webp",
    "Your dashboard · A store",
    "One site in the AnyPress dashboard: its domains with a connected custom domain, and its details",
    "One page per site: log in to WordPress, connect a domain, take or restore a backup.",
  ],
];

const AUDIENCES: { title: string; body: string; points: string[] }[] = [
  {
    title: "You sell websites to clients",
    body: "Run your own website business on your own server: your shop, your prices, your brand, and the money paid into your own Stripe.",
    points: [
      "Your customers buy sites from your shop",
      "Every site is made for you automatically",
      "No per-site fee to AnyPress",
    ],
  },
  {
    title: "Your company needs its own servers",
    body: "Give your teams, branches or members websites that stay on servers you own, in the country you choose.",
    points: [
      "Your data stays where you put it",
      "Your IT team keeps the keys",
      "A contract and data agreement when we help",
    ],
  },
];

const COMPARE: [string, string, string][] = [
  ["Who runs the server", "AnyPress", "You, or us with a care plan"],
  [
    "Where sites live",
    "AnyPress's servers in the US",
    "Any provider and country you choose",
  ],
  [
    "What you pay",
    `Per site, from $${LOWEST_PRICE} a month`,
    "Your own server costs. The software is free",
  ],
  ["Updates", "Put on for you", "You put them on, or care does"],
  ["Help", "Included with every plan", "GitHub, or a care plan"],
  [
    "Selling under your name",
    "A seller or reseller account",
    "Your own shop and dashboard",
  ],
  ["Best for", "Most people", "Teams that need their own servers"],
];

const PROBLEMS: Problem[] = [
  {
    problem: [
      "A hosting platform takes months to build",
      "Provisioning, billing, backups, a dashboard and a shop to sell from are each a project.",
    ],
    fix: [
      "One installer does it all",
      "It sets up your dashboard, your shop and the site templates on a server you choose.",
    ],
  },
  {
    problem: [
      "Locked into someone else's platform",
      "If the platform changes its prices or closes, your business goes with it.",
    ],
    fix: [
      "Open source under the GPL",
      "Every part is public. Read it, change it and run it for as long as you like.",
    ],
  },
  {
    problem: [
      "Your data on someone else's servers",
      "Some companies, clients and countries need to know exactly where their sites live.",
    ],
    fix: [
      "Your server, your country",
      "Use any provider and region you like, with backups in your own storage bucket.",
    ],
  },
  {
    problem: [
      "Setting it up by hand misses a step",
      "One forgotten DNS record or password and something quietly breaks later.",
    ],
    fix: [
      "It checks its own work",
      "It ends with a check that tells you what still needs doing, and running it again is safe.",
    ],
  },
];

export default function SelfHost() {
  return (
    <>
      <PageHero
        drawing="server"
        side="technical"
        eyebrow="Open source"
        title="Run AnyPress on your own server."
        lead="The same AnyPress, on a server you choose. Do it yourself for free, or we set it up and look after it for you."
      >
        <div className="mt-9 flex flex-wrap gap-3">
          <a href="#ways" className="btn btn-ink">
            See the four ways
          </a>
          <a href="#tech" className="btn btn-paper">
            For your tech team
          </a>
        </div>
      </PageHero>

      <section>
        <div className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
          <SectionHead
            title="Who it's for."
            lead="Two kinds of people run AnyPress on their own servers."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {AUDIENCES.map((a) => (
              <div
                key={a.title}
                className="rounded-2xl border border-line bg-paper p-6"
              >
                <h3 className="font-display text-2xl font-semibold">
                  {a.title}
                </h3>
                <p className="mt-3 leading-7 text-ink-soft">{a.body}</p>
                <ul className="mt-4 space-y-2 border-t border-line pt-4 text-[15px] leading-6 text-ink-soft">
                  {a.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center leading-7 text-ink-soft">
            Just want a website for your own business? Our{" "}
            <Link href="/pricing" className="font-semibold text-ink underline">
              hosted plans
            </Link>{" "}
            are simpler: we run everything for you.
          </p>
        </div>
      </section>

      <ProblemFix
        soft
        eyebrow="why run it yourself"
        items={PROBLEMS}
        title="Your own website platform, without building one."
      />

      <section id="ways" className="scroll-mt-24">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <SectionHead
            title="Four ways to get it."
            lead="The software is the same in all four. What changes is how much of the work we do for you."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {WAYS.map((way) => (
              <div
                key={way.name}
                className="flex flex-col rounded-2xl border border-line bg-paper p-6"
              >
                <h3 className="font-display text-xl font-semibold">
                  {way.name}
                </h3>
                <p className="mt-1 font-semibold text-accent">{way.price}</p>
                <p className="mt-3 text-[15px] font-semibold leading-6 text-ink">
                  {way.who}
                </p>
                <p className="mt-2 leading-7 text-ink-soft">{way.body}</p>
                <ul className="mt-4 space-y-2 border-t border-line pt-4 text-[15px] leading-6 text-ink-soft">
                  {way.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <a href={way.cta[1]} className="btn btn-paper mt-6 self-start">
                  {way.cta[0]}
                </a>
              </div>
            ))}
          </div>
          <p className="mt-8 leading-7 text-ink-soft">
            The server is yours, so how often it&apos;s up depends on the
            provider you pick. We watch it and tell you when something is wrong.
          </p>
        </div>
      </section>

      <section className="border-y border-line bg-paper-2">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <SectionHead
            title="Hosted by us, or on your own server."
            lead="The software is the same. What changes is who runs the server."
          />
          <div className="compare even mt-10">
            <div
              className="tablewrap"
              tabIndex={0}
              role="region"
              aria-label="Hosted by AnyPress compared with your own server"
            >
              <table>
                <thead>
                  <tr>
                    <th scope="col"> </th>
                    <th scope="col">Hosted by AnyPress</th>
                    <th scope="col">On your own server</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARE.map(([row, hosted, own]) => (
                    <tr key={row}>
                      <th scope="row">{row}</th>
                      <td>{hosted}</td>
                      <td>{own}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="mt-8 text-center leading-7 text-ink-soft">
            Running it yourself is a real job: someone has to look after the
            server. If that isn&apos;t you, a care plan or our{" "}
            <Link href="/pricing" className="font-semibold text-ink underline">
              hosted plans
            </Link>{" "}
            are the easier way.
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <SectionHead
            title="What you get."
            lead="The same platform that runs anypress.io, on your own server."
          />
          <ul className="mt-10 grid border-t border-line md:grid-cols-2 md:gap-x-14">
            {INCLUDED.map(([title, body]) => (
              <li key={title} className="border-b border-line py-7">
                <h3 className="font-display text-xl font-semibold">{title}</h3>
                <p className="mt-2 leading-7 text-ink-soft">{body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-y border-line bg-paper-2">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2">
          <SectionHead
            left
            title="Your data stays where you put it."
            lead="Choose the country your server is in, and your sites, their databases and their backups stay there."
          />
          <ul className="space-y-5 text-lg leading-8 text-ink-soft">
            <li>
              <strong className="text-ink">Pick the region.</strong> With
              Hetzner, the installer can make the server in Germany or Finland
              for Europe, or in the US. On a server you already have, it runs
              wherever that server is.
            </li>
            <li>
              <strong className="text-ink">Backups in your bucket.</strong>{" "}
              Backups go to your own storage. Cloudflare R2 can keep a bucket
              inside the EU.
            </li>
            <li>
              <strong className="text-ink">We don&apos;t see it.</strong>{" "}
              AnyPress staff never get into your sites or your data unless you
              ask us to help and give us access yourself.
            </li>
          </ul>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <SectionHead
            title="How it works."
            lead="Three steps. If you'd rather not do them, we do them for you."
          />
          <ol className="mt-10 grid gap-5 md:grid-cols-3">
            {HOW.map(([title, body], i) => (
              <li
                key={title}
                className="rounded-2xl border border-line bg-paper p-6"
              >
                <span className="font-display text-3xl font-semibold text-accent">
                  {i + 1}
                </span>
                <h3 className="mt-3 font-display text-xl font-semibold">
                  {title}
                </h3>
                <p className="mt-2 leading-7 text-ink-soft">{body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-y border-line bg-paper-2">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <SectionHead
            eyebrow="sample data, real screens"
            title="The dashboard you get."
            lead="Every site you run, on your own domain. These are the same screens as app.anypress.io."
          />
          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            {SCREENS.map(([src, label, alt, caption]) => (
              <div key={src}>
                <Screenshot
                  shot={{ src, alt, width: 1440, height: 900 }}
                  label={label}
                />
                <p className="mt-4 leading-7 text-ink-soft">{caption}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <SectionHead
            title="The sites your customers get."
            lead="Real example sites, one for each kind. Every site you sell starts from these."
          />
          <div className="mt-10">
            <ClientSites />
          </div>
        </div>
      </section>

      <section
        id="tech"
        className="scroll-mt-24 border-y border-line bg-paper-2"
      >
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <SectionHead
            eyebrow="for your tech team"
            title="What you need, and what the installer does."
            lead="The technical details in one place. The install guide has every step and setting."
          />
          <div className="mt-10 grid gap-12 lg:grid-cols-2">
            <div>
              <h3 className="font-display text-2xl font-semibold">
                What you need
              </h3>
              <ul className="mt-4 border-t border-line">
                {NEEDS.map(([title, body]) => (
                  <li key={title} className="border-b border-line py-5">
                    <p className="font-semibold text-ink">{title}</p>
                    <p className="mt-1 leading-7 text-ink-soft">{body}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-5 leading-7 text-ink-soft">
                A server with 4 to 8 GB of memory costs about $20 to $50 a month
                at most providers.
              </p>
            </div>
            <div>
              <h3 className="font-display text-2xl font-semibold">
                What the installer does
              </h3>
              <ol className="mt-4 space-y-3 text-lg leading-8 text-ink-soft">
                {STEPS.map((step, i) => (
                  <li key={step} className="flex gap-4">
                    <span className="font-display text-xl font-semibold text-accent">
                      {i + 1}
                    </span>{" "}
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href={INSTALLER_DOCS} className="btn btn-ink">
              Read the install guide
            </a>
            <a href={GUIDE} className="btn btn-paper">
              Read the self-hosting guide
            </a>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <SectionHead title="Questions." />
          <div className="mt-10">
            <Questions
              items={[
                [
                  "What do I do after it finishes?",
                  "Open your shop's WordPress admin, connect Stripe and make the plans your customers buy. The installer prints the address and where your passwords are kept.",
                ],
                [
                  "Can I put the dashboard on Vercel?",
                  "Yes. Add a Vercel token to the answers file and the dashboard is deployed to your own Vercel account instead of your server.",
                ],
                [
                  "Where is the full guide?",
                  <>
                    The{" "}
                    <a
                      href={INSTALLER_DOCS}
                      className="font-semibold text-ink underline"
                    >
                      install guide
                    </a>{" "}
                    covers every answer, and the{" "}
                    <a
                      href={GUIDE}
                      className="font-semibold text-ink underline"
                    >
                      self-hosting guide
                    </a>{" "}
                    explains each part, from one server up.
                  </>,
                ],
                [
                  "Does it cost anything?",
                  "The software is free and open source. You pay your own server, storage and email providers directly; a server with 4 to 8 GB of memory is about $20 to $50 a month. If you want our help, setup is $1,500 one time, care is $199 a month, and plans for larger teams start at $1,000 a month.",
                ],
                [
                  "Is it the same AnyPress as anypress.io?",
                  "Yes. It is the same code, and new releases come out for everyone at the same time.",
                ],
                [
                  "How do I keep it up to date?",
                  "Run the installer again and it puts on the newest site templates. The API and the dashboard update when you redeploy them in Coolify. With a care plan, we do this for you.",
                ],
                [
                  "Can I sell sites under my own name?",
                  "Yes. The shop your customers buy from and their sites carry your brand, and the money goes to your own Stripe account.",
                ],
                [
                  "Can I take the AnyPress name off?",
                  "Your customers see your brand: on your shop, your dashboard's domain and their sites. The code is under the GPL, so you may change any part of it, including names and logos, as long as what you share with others stays under the GPL too.",
                ],
                [
                  "Is running it myself right for me?",
                  <>
                    If you want websites for your own business, our{" "}
                    <Link
                      href="/pricing"
                      className="font-semibold text-ink underline"
                    >
                      hosted plans
                    </Link>{" "}
                    are simpler. Running it yourself suits people who sell
                    websites, or companies that must keep sites on servers they
                    own.
                  </>,
                ],
                [
                  "Can my servers be in Europe?",
                  "Yes. Your sites, databases and backups stay on the server and in the bucket you choose. If we set it up or look after it for you, ask us about a data processing agreement.",
                ],
              ]}
            />
          </div>
        </div>
      </section>

      <CtaBand
        title="Rather not do it yourself?"
        body="We can set up AnyPress on your own server and accounts, and look after it for you."
        href="#ways"
        label="See the four ways"
      />
    </>
  );
}
