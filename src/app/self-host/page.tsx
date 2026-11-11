import type { Metadata } from "next";
import Link from "next/link";
import { type Problem, ProblemFix } from "@/components/ProblemFix";
import { CtaBand, PageHero, Questions, SectionHead } from "@/components/ui";
import { pageMeta } from "@/lib/seo";
import { CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  path: "/self-host",
  title: "Run AnyPress yourself",
  description:
    "Install the whole AnyPress platform on your own server with one command: the API, the dashboard, the store templates and your storefront.",
});

const REPO = "https://github.com/hamchowderr/waas-provisioning-api";
const INSTALLER_DOCS = `${REPO}/blob/main/install/README.md`;
const GUIDE = `${REPO}/blob/main/docs/self-hosting.md`;
const RAW = "https://raw.githubusercontent.com/hamchowderr/waas-provisioning-api/main/install";

const NEEDS: [string, string][] = [
  ["A server", "Ubuntu 24.04 with 4 GB of memory or more. Hostinger, Hetzner, DigitalOcean or any provider."],
  ["Two domains", "One for your brand (the dashboard and API live on it) and one your customers' sites are named under."],
  ["A storage bucket", "Cloudflare R2 or any S3-compatible storage, for templates, snapshots and backups."],
  ["Optional", "A Cloudflare token to set the DNS records for you, toSend for email, and Stripe for selling."],
];

const STEPS = [
  "Installs Coolify, with your email as its admin.",
  "Sets your DNS records in Cloudflare, when you give it a token.",
  "Runs the AnyPress API and its database, with generated passwords and keys.",
  "Publishes the newest store templates, checked against their checksums.",
  "Builds your storefront: the WordPress shop your customers buy sites from.",
  "Deploys the dashboard on your server, or on your own Vercel account.",
  "Ends with a check that tells you what still needs doing.",
];

const WHO = [
  "Developers",
  "Hosting companies",
  "Agencies with their own servers",
  "Companies with their own IT team",
  "Anyone who must keep data in their own country",
];

const ask = (subject: string) => `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`AnyPress on my own server: ${subject}`)}`;

const WAYS: { name: string; price: string; body: string; items: string[]; cta: [string, string] }[] = [
  {
    name: "Do it yourself",
    price: "Free",
    body: "Run the installer and you have the whole platform. The code is yours under the GPL.",
    items: ["The installer and every guide", "New store templates and releases on GitHub", "Questions and bug reports on GitHub"],
    cta: ["Read the install guide", INSTALLER_DOCS],
  },
  {
    name: "We set it up",
    price: "One-time fee",
    body: "We install AnyPress on your server and your accounts, then hand it over working.",
    items: [
      "The server, your domains and DNS",
      "Storage, email and Stripe connected",
      "Your storefront and its plans made with you",
      "Your brand on the shop customers buy from",
      "A walk-through call, and a written handover",
    ],
    cta: ["Ask for a quote", ask("set it up")],
  },
  {
    name: "We look after it",
    price: "Monthly",
    body: "We keep your platform up to date and watch it, so you can get on with selling sites.",
    items: [
      "New releases put on for you",
      "Health, backups and restore tests watched",
      "Help by email when something goes wrong",
      "Moving to a bigger server when you need it",
    ],
    cta: ["Ask about care", ask("care")],
  },
  {
    name: "For larger teams",
    price: "Custom",
    body: "For companies with more servers, their own rules or a procurement process.",
    items: [
      "Several servers, or a region of your choice",
      "A data processing agreement and security answers",
      "Invoices and a written contract",
      "Changes built for your team",
    ],
    cta: ["Talk to us", ask("larger team")],
  },
];

const INCLUDED: [string, string][] = [
  ["Five kinds of site", "Website, bookings, online store, community and courses, or everything, each on its own WordPress and database."],
  ["The tools set up", "The Fluent plugins, Rank Math and AnyPress Client switched on for each site type, with the AnyPress theme and Blocks."],
  ["Backups that are tested", "Nightly backups of every site to your bucket, and a nightly test that one restores."],
  ["Domains and email", "Free addresses under your domain, customers' own domains, and email from their own domain."],
  ["Your own shop", "A WordPress shop on FluentCart where your customers buy sites, paid into your own Stripe."],
  ["Your own dashboard", "Every site, customer and job in one place, under your brand."],
  ["Moving sites in", "The same switches that move WooCommerce, LearnDash, BuddyPress and others into the Fluent tools."],
  ["An API and connector", "Make and change sites from your own code, automations or an AI assistant."],
];

const PROBLEMS: Problem[] = [
  {
    problem: [
      "A hosting platform takes months to build",
      "Provisioning, billing, backups, a dashboard and a shop to sell from are each a project.",
    ],
    fix: [
      "One installer, about 15 minutes",
      "It sets up the API, the dashboard, the store templates and your storefront on a fresh server.",
    ],
  },
  {
    problem: ["Locked into someone else's platform", "If the platform changes its prices or closes, your business goes with it."],
    fix: ["Open source under the GPL", "Every part is public. Read it, change it and run it for as long as you like."],
  },
  {
    problem: ["Your customers' data on someone else's servers", "Some clients and industries need to know exactly where their sites live."],
    fix: ["Your server, your storage", "Use any provider you like, with backups in your own storage bucket."],
  },
  {
    problem: ["Setting it up by hand misses a step", "One forgotten DNS record or password and something quietly breaks later."],
    fix: ["It checks its own work", "It ends with a check that tells you what still needs doing, and running it again is safe."],
  },
];

function Code({ title, children }: { title: string; children: string }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-ink text-white">
      <div className="border-b border-white/15 px-4 py-2.5 font-mono text-sm text-white/60">{title}</div>
      <pre className="overflow-x-auto p-5 font-mono text-[14px] leading-6">
        <code>{children}</code>
      </pre>
    </div>
  );
}

export default function SelfHost() {
  return (
    <>
      <PageHero
        drawing="server"
        side="technical"
        eyebrow="Open source"
        title="Run AnyPress on your own server."
        lead="Everything behind AnyPress is public under the GPL. One installer sets up the whole platform on a fresh server, so you can sell websites under your own brand."
      >
        <div className="mt-9 flex flex-wrap gap-3">
          <a href={INSTALLER_DOCS} className="btn btn-ink">
            Read the install guide
          </a>
          <Link href="/contact" className="btn btn-paper">
            Have us set it up
          </Link>
        </div>
      </PageHero>

      <ProblemFix soft who={WHO} items={PROBLEMS} title="Your own website platform, without building one." />

      <section>
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <SectionHead
            title="Four ways to get it."
            lead="The software is the same in all four. What changes is how much of the work we do for you."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {WAYS.map((way) => (
              <div key={way.name} className="flex flex-col rounded-2xl border border-line bg-paper p-6">
                <h3 className="font-display text-xl font-semibold">{way.name}</h3>
                <p className="mt-1 font-semibold text-accent">{way.price}</p>
                <p className="mt-3 leading-7 text-ink-soft">{way.body}</p>
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
        </div>
      </section>

      <section className="border-y border-line bg-paper-2">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <SectionHead title="What you get." lead="The same platform that runs anypress.io, on your own server." />
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

      <section>
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2">
          <SectionHead
            left
            title="Your data stays where you put it."
            lead="Choose the country your server is in, and your sites, their databases and their backups stay there."
          />
          <ul className="space-y-5 text-lg leading-8 text-ink-soft">
            <li>
              <strong className="text-ink">Pick the region.</strong> With Hetzner, the installer can make the server in Germany or Finland
              for Europe, or in the US. On a server you already have, it runs wherever that server is.
            </li>
            <li>
              <strong className="text-ink">Backups in your bucket.</strong> Backups go to your own storage. Cloudflare R2 can keep a
              bucket inside the EU.
            </li>
            <li>
              <strong className="text-ink">We don&apos;t see it.</strong> Your customers&apos; data never passes through AnyPress unless
              you ask us to help and give us access.
            </li>
          </ul>
        </div>
      </section>

      <section className="border-y border-line bg-paper-2">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <SectionHead title="What you need." />
          <ul className="mt-10 grid border-t border-line md:grid-cols-2 md:gap-x-14">
            {NEEDS.map(([title, body]) => (
              <li key={title} className="border-b border-line py-7">
                <h3 className="font-display text-xl font-semibold">{title}</h3>
                <p className="mt-2 leading-7 text-ink-soft">{body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section>
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2">
          <div>
            <SectionHead
              left
              title="From your computer."
              lead="Give the installer an API token from Hostinger, Hetzner or DigitalOcean. It makes the server, and AnyPress installs itself on it. You never log in to the server."
            />
            <p className="mt-6 leading-7 text-ink-soft">
              Fill in the answers file first: your domains, your email and your bucket, plus your provider&apos;s token. It runs on Linux,
              macOS or Windows (WSL).
            </p>
          </div>
          <Code title="your computer">
            {`curl -fsSLO ${RAW}/anypress-install.sh\ncurl -fsSL ${RAW}/anypress.env.example -o anypress.env\nnano anypress.env\n\nbash anypress-install.sh hostinger\n# or: hetzner, digitalocean`}
          </Code>
        </div>
      </section>

      <section className="border-y border-line bg-paper-2">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2">
          <div>
            <SectionHead
              left
              title="On a server you already have."
              lead="Log in as root on a fresh Ubuntu server and run the installer there."
            />
          </div>
          <Code title="your server">
            {`curl -fsSLO ${RAW}/anypress-install.sh\ncurl -fsSL ${RAW}/anypress.env.example -o /root/anypress.env\nnano /root/anypress.env\n\nsudo bash anypress-install.sh`}
          </Code>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <SectionHead
            title="What it does."
            lead="It takes about 15 minutes, and running it again is safe: it finds what it made before."
          />
          <ol className="mt-10 grid gap-x-14 gap-y-4 text-lg leading-8 text-ink-soft md:grid-cols-2">
            {STEPS.map((step, i) => (
              <li key={step} className="flex gap-4">
                <span className="font-display text-xl font-semibold text-accent">{i + 1}</span> {step}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-y border-line bg-paper-2">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <SectionHead title="Questions." />
          <div className="mt-10">
            <Questions
              items={[
                [
                  "What do I do after it finishes?",
                  "Open your storefront's WordPress admin, connect Stripe and make the plans your customers buy. The installer prints the address and where your passwords are kept.",
                ],
                [
                  "Can I put the dashboard on Vercel?",
                  "Yes. Add a Vercel token to the answers file and the dashboard is deployed to your own Vercel account instead of your server.",
                ],
                [
                  "Where is the full guide?",
                  <>
                    The{" "}
                    <a href={INSTALLER_DOCS} className="font-semibold text-ink underline">
                      install guide
                    </a>{" "}
                    covers every answer, and the{" "}
                    <a href={GUIDE} className="font-semibold text-ink underline">
                      self-hosting guide
                    </a>{" "}
                    explains each part, from one server up.
                  </>,
                ],
                [
                  "Does it cost anything?",
                  "The software is free and open source. You pay your own server, storage and email providers directly. Setting it up for you, looking after it, and plans for larger teams are paid; ask us for a quote.",
                ],
                [
                  "Is it the same AnyPress as anypress.io?",
                  "Yes. It is the same code, and new releases come out for everyone at the same time.",
                ],
                [
                  "How do I keep it up to date?",
                  "Run the installer again and it puts on the newest store templates. The API and the dashboard update when you redeploy them in Coolify. With a care plan, we do this for you.",
                ],
                [
                  "Can I sell sites under my own name?",
                  "Yes. The shop your customers buy from and their sites carry your brand, and the money goes to your own Stripe account.",
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
        body="We can set up AnyPress on your own server and accounts for you."
        href="/contact"
        label="Talk to us"
      />
    </>
  );
}
