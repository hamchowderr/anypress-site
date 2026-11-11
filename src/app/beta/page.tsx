import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { Screenshot } from "@/components/AppShots";
import { Drawing, type DrawingName } from "@/components/Drawing";
import { LeadForm } from "@/components/LeadForm";
import { type Problem, ProblemFix } from "@/components/ProblemFix";
import { Showcase } from "@/components/Showcase";
import { Tick } from "@/components/Tick";
import { VideoTile } from "@/components/VideoTile";
import { CtaBand, PageHero, Questions, SectionHead } from "@/components/ui";
import { ICONS, type IconName } from "@/components/icons.generated";
import { pluginLogo } from "@/lib/logos";
import { CONTACT_EMAIL, SITE_TYPES } from "@/lib/site";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  path: "/beta",
  title: "Join the AnyPress beta",
  description:
    "Finished WordPress sites built on the Fluent plugins: only the plugins you need, set up and connected, hosting and email handled, your old site moved in, and every site in one dashboard. The beta opens on 12 November.",
});

const link = "font-semibold text-ink underline underline-offset-2";

/** One of the hand-drawn icons (scripts/icons.mjs). */
function SketchIcon({ name }: { name: IconName }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden fill="none" strokeLinecap="round" className="sketch-icon" dangerouslySetInnerHTML={{ __html: ICONS[name] }} />
  );
}

/** A plugin's own icon, from its wordpress.org page; nothing when we don't have one. */
function Logo({ name, size = 22 }: { name: string; size?: number }) {
  const src = pluginLogo(name);
  if (!src) return null;
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt="" width={size} height={size} className="plugin-logo" loading="lazy" />;
}

// The Fluent plugins, in the owner's order, for the row under the hero.
const FLUENT = ["FluentAuth", "FluentSMTP", "FluentCRM", "Fluent Forms", "FluentBooking", "FluentCart", "FluentCommunity", "FluentPlayer", "FluentAffiliate", "Fluent Support", "FluentSnippets"];

// The questions Fluent users ask most in their community, and what AnyPress does about each.
const PROBLEMS: Problem[] = [
  {
    problem: ["Which host, and what size?", "Ask in any group and you get ten different answers. Then your community or shop outgrows the plan and slows down right when it's busiest."],
    fix: [
      "No server to size or tune",
      <>
        Every site gets its own WordPress and database, sized by its plan. We host it, or{" "}
        <Link href="/self-host" className={link}>
          we set it up on your own server
        </Link>
        .
      </>,
    ],
  },
  {
    problem: ["Why does my email land in spam?", "Welcome emails, receipts and newsletters quietly go missing, and fixing it means digging into DNS records."],
    fix: ["Email that lands", "Your mail domain and FluentSMTP and FluentCRM sending are set up before your first member or buyer arrives."],
  },
  {
    problem: ["Which plugins do I actually need?", "Too few and something's missing. Too many and they start stepping on each other."],
    fix: ["Only the plugins you need", "Pick what you're building and only those Fluent plugins are turned on, already connected to each other."],
  },
  {
    problem: ["How do I move my community over?", "Your members, courses, orders and forms live in other plugins, and copying them by hand could take weeks."],
    fix: ["Bring your site with you", "Built-in switches copy WooCommerce, BuddyPress, LearnDash, Circle and more into the Fluent plugins. Your old data stays put until you're happy."],
  },
  {
    problem: ["How do I keep many client sites the same?", "Over time every site ends up a little different, and sooner or later an update breaks one of them on a Friday."],
    fix: ["Many sites, one place", "Create, back up, restore and connect domains for every site from one dashboard, with your team. Updates are tested before they reach your sites."],
  },
  {
    problem: ["Can AI do the busywork?", "Most AI tools can write you a paragraph, but they can't actually do anything on the site."],
    fix: [
      "One AI connector for every site",
      <>
        Connect Claude, ChatGPT or any other MCP app once and ask in plain words: make a site, back it up, connect a domain or change its pages.{" "}
        <Link href="/ai" className={link}>
          See what it does
        </Link>
        .
      </>,
    ],
  },
];

// The beta at a glance: what someone needs to know before they say yes.
const FACTS: [IconName, string, ReactNode][] = [
  [
    "laptop",
    "What it is",
    "Finished WordPress sites built on the Fluent plugins. We host them, set up the plugins, email and domain, back them up every night and test every update. You still get the full WordPress admin.",
  ],
  [
    "people",
    "Who it's for",
    "Anyone building on Fluent: a business site, bookings, a shop, a community with courses, or all of it. And people who build those sites for clients.",
  ],
  [
    "star",
    "What testers get",
    "A real site on your own domain, the dashboard for every site you run, and a direct line to the people building AnyPress. What you ask for shapes what ships before launch.",
  ],
  [
    "coin",
    "What it costs",
    <>
      The normal plans: from $12 a month for a website to $79 for everything, with a 30-day money-back on your first payment.{" "}
      <Link href="/pricing" className={link}>
        Every price
      </Link>
    </>,
  ],
  ["chat", "What we ask", "Use it for something real, and tell us what gets in the way, by email or a support ticket from your site."],
  ["clock", "Dates", "Invites from 12 November. Full launch by 26 November. Your site keeps running after the beta, with nothing to move."],
  [
    "server",
    "Where it runs",
    <>
      On our servers, or{" "}
      <Link href="/self-host" className={link}>
        on your own
      </Link>
      . Every site has its own WordPress and its own database.
    </>,
  ],
  [
    "person",
    "Who builds it",
    <>
      Otaku Solutions, selling websites as a service since 2023. Questions go to{" "}
      <a href={`mailto:${CONTACT_EMAIL}`} className={link}>
        {CONTACT_EMAIL}
      </a>
      .
    </>,
  ],
];

// Real screens from the dashboard (sample data), each with what it lets you do.
const DASHBOARD: { src: string; label: string; alt: string; title: string; points: string[] }[] = [
  {
    src: "/beta/dashboard-stores.webp",
    label: "app.anypress.io · Stores",
    alt: "The AnyPress dashboard's Stores list, showing four sample sites with their version, domain, status, last backup and date",
    title: "Every site in one list",
    points: [
      "See which sites are ready, being built, failed or suspended.",
      "Each site's domain, version and last backup at a glance.",
      "Start a new site, or move one in, from the top of the page.",
    ],
  },
  {
    src: "/beta/dashboard-store.webp",
    label: "app.anypress.io · A store",
    alt: "One site in the AnyPress dashboard: its details, its domains with a connected custom domain, and its languages",
    title: "Everything about one site on one page",
    points: [
      "Log in to WordPress with one click, or email the owner.",
      "Connect a domain, change the address or buy a new one.",
      "Turn on more languages, set the email sender, take or restore a backup.",
    ],
  },
  {
    src: "/beta/dashboard-plugins.webp",
    label: "app.anypress.io · Plugins",
    alt: "The Plugins page: the Fluent plugins the template comes with, a wordpress.org search and a premium plugin upload",
    title: "Choose the plugins your sites get",
    points: [
      "The Fluent plugins come with every site. Switch off what you don't use.",
      "Add any free plugin from wordpress.org, or upload a premium one.",
      "Every plugin is pinned to a version, so every site runs the same code.",
    ],
  },
];

// Short how-to videos, recorded on the real product (public/videos).
const VIDEOS: [slug: string, title: string, length: string][] = [
  ["build-a-site-in-your-browser", "Build a site in your browser at anypress.io/try", "0:41"],
  ["choose-a-plan", "Choose a plan on the shop", "0:43"],
  ["buy-a-website", "Buy a website and open it", "1:09"],
  ["store-designs-and-plugins", "Designs and plugins", "0:42"],
  ["edit-your-website-with-ai", "Edit your site with AI", "0:36"],
  ["your-own-domain-and-email", "Your own domain and email", "0:36"],
  ["backups-and-restores", "Backups and restores", "0:29"],
  ["move-your-site-to-anypress", "Move your site in", "0:42"],
];

// For the people in the Fluent community who want the details.
const HOOD: [IconName, string, string, string[]?][] = [
  ["code", "WordPress 7.1 on PHP 8.3", "Each site in its own WordPress and MariaDB containers, never shared with another site."],
  ["pin", "Plugins pinned and tested", "Every plugin and theme is pinned to a version. A new version is tried on every kind of site before it reaches yours, and the previous one is kept to roll back to."],
  ["key", "Free Fluent plugins, your Pro licences", "Sites come with the free versions. Add your Pro licences in WordPress like on any site and the Pro features turn on."],
  ["cloud", "Backups off the server", "A copy every night, kept in separate storage, restored from the dashboard in one click."],
  ["mail", "Email set up", "FluentSMTP sends from your own domain, so FluentCRM newsletters and receipts arrive."],
  ["bolt", "AI, API and automations", "One AI connector for Claude, ChatGPT and other MCP apps, an API, and ready-made n8n, Make and Zapier steps.", ["n8n", "Make", "Zapier", "HighLevel"]],
];

type Move = [from: string, logos: string[], into: string, soon?: boolean];

// The switches in AnyPress Client. Tutor LMS, LifterLMS and MemberPress are released and reach stores with the next
// store template version.
const MOVES: Move[] = [
  ["WooCommerce products, orders and customers", ["WooCommerce"], "FluentCart"],
  ["WooCommerce buyers, MailPoet and Newsletter subscribers", ["WooCommerce", "MailPoet", "Newsletter"], "FluentCRM"],
  ["Contact Form 7, WPForms and Ninja Forms", ["Contact Form 7", "WPForms", "Ninja Forms"], "Fluent Forms"],
  ["BuddyPress groups and members", ["BuddyPress"], "FluentCommunity"],
  ["LearnDash courses, students and progress", [], "FluentCommunity courses"],
  ["Circle communities, with courses", [], "FluentCommunity"],
  ["Awesome Support tickets", ["Awesome Support"], "Fluent Support"],
  ["SliceWP affiliates", ["SliceWP"], "FluentAffiliate"],
  ["Tutor LMS and LifterLMS courses", ["Tutor LMS"], "FluentCommunity courses", true],
  ["MemberPress members", [], "FluentCommunity spaces and courses", true],
];

const STEPS: [DrawingName, string, string, ReactNode][] = [
  ["note", "Join the list", "today", "Tell us what you'd build and what you'd move in. It takes a minute."],
  ["mailbox", "Get your invite", "from 12 November", "We email your invite when your place is ready, with a link to start your site."],
  ["pick", "Pick what you're building", "same day", "A website, bookings, an online store, a community with courses, or all of it. It's ready to use the same day."],
  [
    "question",
    "Tell us what's missing",
    "during the beta",
    "Reply to any of our emails or open a support ticket from your site. What testers ask for decides what we build next.",
  ],
  ["open", "Full launch", "by 26 November", "Your site carries on as it is. Nothing to move or rebuild when the beta ends."],
];

const ASKS: [string, string][] = [
  ["Use it for something real", "A client site, your own community or a new shop. Real use finds what demos miss."],
  ["Tell us what gets in the way", "A missing setting, a confusing screen, a plugin you expected. Short notes are fine."],
  ["Tell us what you'd move in", "The plugins and platforms you'd leave decide which switch we build next."],
];

const BUILDERS: [DrawingName, string, string, string, string][] = [
  ["server", "We host it", "Pick a plan and your site is ready the same day. Nothing to set up.", "/pricing", "See plans"],
  ["tools", "On your own server", "We install AnyPress on your server and accounts, or you run the open-source installer.", "/self-host", "Run it yourself"],
  ["nametag", "Under your own brand", "Sell Fluent sites to your clients from your own shop, as a seller or reseller.", "/resellers", "How reselling works"],
];

export default function Beta() {
  return (
    <>
      <PageHero
        drawing="everything"
        side="both"
        eyebrow="beta opens 12 November"
        title={
          <>
            A better WordPress experience with the <mark>Fluent</mark> plugins.
          </>
        }
        lead="Finished WordPress sites with the hosting, plugins, email and updates handled as one package. Pick what you're building, and the right Fluent plugins arrive set up and connected."
      >
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <a href="#join" className="btn btn-ink">
            Join the beta
          </a>
          <Link href="/try?type=community" className="btn btn-paper">
            Try it in your browser
          </Link>
        </div>
        <ul className="checks">
          {["Invites from 12 November", "Full launch by 26 November", "From $12 a month", "Your Fluent Pro licences work"].map((c) => (
            <li key={c}>
              <Tick />
              {c}
            </li>
          ))}
        </ul>
        <ul className="beta-fluent" aria-label="The Fluent plugins on AnyPress sites">
          {FLUENT.map((f) => (
            <li key={f}>
              <Logo name={f} size={40} />
              <span>{f}</span>
            </li>
          ))}
        </ul>
        <div className="beta-hero-shot">
          <Screenshot
            shot={{ src: "/beta/dashboard-store.webp", alt: DASHBOARD[1].alt, width: 1440, height: 900 }}
            label="app.anypress.io: one of your sites"
          />
        </div>
      </PageHero>

      <section className="sec soft" aria-labelledby="h-facts">
        <div className="in">
          <SectionHead eyebrow="before you say yes" title="The beta in one look." id="h-facts" />
          <dl className="beta-facts">
            {FACTS.map(([icon, term, detail]) => (
              <div key={term}>
                <dt>
                  <SketchIcon name={icon} />
                  {term}
                </dt>
                <dd>{detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="sec" aria-labelledby="h-examples">
        <div className="in">
          <SectionHead
            eyebrow="real sites, made-up businesses"
            title="See what you'd get."
            id="h-examples"
            lead="Five live sites, one of each kind, all running on AnyPress. Open any of them and click around."
          />
          <Showcase />
        </div>
      </section>

      <section className="sec soft" aria-labelledby="h-dashboard">
        <div className="in">
          <SectionHead
            eyebrow="sample data, real screens"
            title="Your dashboard."
            id="h-dashboard"
            lead="Every site you run, in one place, at app.anypress.io. You and your team sign in with a link we email you."
          />
          <div className="beta-dash">
            {DASHBOARD.map((d) => (
              <div key={d.src}>
                <Screenshot shot={{ src: d.src, alt: d.alt, width: 1440, height: 900 }} label={d.label} />
                <div>
                  <h3>{d.title}</h3>
                  <ul>
                    {d.points.map((pt) => (
                      <li key={pt}>
                        <Tick className="mt-1 h-[18px] w-[18px] flex-none text-tick-green" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec" aria-labelledby="h-videos">
        <div className="in">
          <SectionHead
            eyebrow="under a minute each"
            title="Watch it work."
            id="h-videos"
            lead="Recorded on the live anypress.io and shop, start to finish."
          />
          <ul className="beta-videos">
            {VIDEOS.map(([slug, title, length]) => (
              <li key={slug}>
                <VideoTile slug={slug} title={title} length={length} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ProblemFix
        soft
        eyebrow="sound familiar?"
        title="You've probably asked one of these."
        id="h-questions"
        items={PROBLEMS}
      />

      <section className="sec" aria-labelledby="h-types">
        <div className="in">
          <SectionHead
            eyebrow="try any of them first"
            title="What are you building?"
            id="h-types"
            lead="Each kind of site turns on its own set of plugins, already connected. Open any of them in your browser first: nothing is installed and nothing is saved."
          />
          <ul className="beta-types">
            {SITE_TYPES.map((t) => (
              <li key={t.id}>
                <Drawing name={t.drawing} />
                <div>
                  <h3>{t.name}</h3>
                  <p>{t.pitch}</p>
                  <ul className="chips" aria-label={`Plugins on a ${t.short.toLowerCase()} site`}>
                    {t.tools
                      .filter((tool) => tool !== "WordPress")
                      .map((tool) => (
                        <li key={tool}>
                          <Logo name={tool} size={18} />
                          {tool}
                        </li>
                      ))}
                  </ul>
                </div>
                <div className="beta-type-go">
                  <span className="price">
                    ${t.from} <small>/ month</small>
                  </span>
                  <Link href={`/try?type=${t.id}`} className="btn btn-paper">
                    Try it
                  </Link>
                  <Link href={`/sites/${t.id}`} className="more">
                    What&apos;s inside →
                  </Link>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-center text-ink-soft">
            Medium is twice the Small price and Large four times. Yearly is ten months&apos; price.{" "}
            <Link href="/pricing" className={link}>
              All prices
            </Link>
          </p>
        </div>
      </section>

      <section className="sec soft" aria-labelledby="h-hood">
        <div className="in">
          <SectionHead eyebrow="for the technical side" title="Under the hood." id="h-hood" />
          <ul className="beta-hood">
            {HOOD.map(([icon, b, body, logos]) => (
              <li key={b}>
                <SketchIcon name={icon} />
                <div>
                  <h3>{b}</h3>
                  <p>{body}</p>
                  {logos && (
                    <p className="logo-line">
                      {logos.map((l) => (
                        <span key={l}>
                          <Logo name={l} size={20} />
                          {l}
                        </span>
                      ))}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="sec" aria-labelledby="h-moves">
        <div className="in">
          <SectionHead
            drawing="truck"
            eyebrow="no copying by hand"
            title="Bring your site with you."
            id="h-moves"
            lead="Already on WordPress? We copy your whole site across first. Then switches in your site's admin move your data into the Fluent plugins, one at a time, and each one can be undone."
          />
          <div className="beta-moves">
            <table>
              <thead>
                <tr>
                  <th scope="col">From</th>
                  <th scope="col">Into</th>
                </tr>
              </thead>
              <tbody>
                {MOVES.map(([from, logos, into, soon]) => (
                  <tr key={from}>
                    <th scope="row">
                      <span className="from">
                        {logos.length > 0 && (
                          <span className="logos">
                            {logos.map((l) => (
                              <Logo key={l} name={l} />
                            ))}
                          </span>
                        )}
                        <span>{from}</span>
                      </span>
                    </th>
                    <td>
                      <Logo name={into} />
                      {into}
                      {soon && <span className="soon-tag">next update</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-center text-ink-soft">
            Coming from somewhere else, like Skool or Kajabi? Tell us in the form below.
            <br />
            <Link href="/move" className={link}>
              How moving a site works
            </Link>
          </p>
        </div>
      </section>

      <section className="sec soft" aria-labelledby="h-how">
        <div className="in">
          <SectionHead eyebrow="two weeks, start to launch" title="How the beta works." id="h-how" />
          <ol className="steps mt-12">
            {STEPS.map(([d, title, when, body]) => (
              <li key={title}>
                <Drawing name={d} still />
                <div>
                  <h3>
                    {title}
                    <span className="hand">{when}</span>
                  </h3>
                  <p>{body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="join" className="sec scroll-mt-20" aria-labelledby="h-join">
        <div className="in beta-join">
          <div>
            <SectionHead
              left
              eyebrow="your place"
              title="Join the beta."
              id="h-join"
              lead="We'll email you when your place is ready, and you can reply with any question."
            />
            <h3 className="mt-8 text-[19px] font-extrabold">What we ask of testers</h3>
            <ul className="mt-3 grid gap-4">
              {ASKS.map(([b, s]) => (
                <li key={b} className="flex gap-3">
                  <Tick className="mt-1 h-[18px] w-[18px] flex-none text-tick-green" />
                  <span>
                    <b>{b}.</b> <span className="text-ink-soft">{s}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="beta-form">
            <LeadForm
              source="community"
              cta="Join the beta"
              note="One email to confirm, then your beta invite. Unsubscribe any time."
            />
          </div>
        </div>
      </section>

      <section className="sec soft" aria-labelledby="h-builders">
        <div className="in">
          <SectionHead
            eyebrow="for people who build sites"
            title="Host it, run it yourself, or sell it as your own."
            id="h-builders"
          />
          <ul className="cards big beta-every">
            {BUILDERS.map(([d, title, body, href, label]) => (
              <li key={title}>
                <Link href={href} className="card-link">
                  <Drawing name={d} still />
                  <h3>{title}</h3>
                  <p>{body}</p>
                  <span className="go mt-auto pt-3 text-[15px] font-bold text-accent">{label} →</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="sec" aria-labelledby="h-faq">
        <div className="in max-w-[860px]">
          <SectionHead title="Questions." id="h-faq" />
          <div className="mt-10">
            <Questions
              items={[
                [
                  "Can I try it before the beta?",
                  <>
                    Yes.{" "}
                    <Link href="/try?type=community" className={link}>
                      Open a community site
                    </Link>{" "}
                    or{" "}
                    <Link href="/designs" className={link}>
                      any design
                    </Link>{" "}
                    in your browser. It runs on WordPress Playground: nothing is installed and nothing is saved.
                  </>,
                ],
                [
                  "What does it cost?",
                  <>
                    Plans run from $12 a month for a website to $79 for everything, and your first payment has a{" "}
                    <Link href="/refund-policy" className={link}>
                      30-day money-back guarantee
                    </Link>
                    .{" "}
                    <Link href="/pricing" className={link}>
                      See pricing
                    </Link>
                    .
                  </>,
                ],
                [
                  "Do my Fluent Pro licences work?",
                  "Yes. Sites come with the free versions of the Fluent plugins. Add your Pro licences like on any WordPress site, and the Pro features turn on.",
                ],
                [
                  "Which WordPress and PHP do sites run?",
                  "WordPress 7.1 on PHP 8.3, each site with its own WordPress and database.",
                ],
                [
                  "What happens to my site when the beta ends?",
                  "Your site keeps running as it is, on the same address and with its backups. There's nothing to move or rebuild.",
                ],
                [
                  "Can I leave?",
                  "Yes. It's real WordPress, so you can take a full copy of your site with you. No lock-in.",
                ],
                [
                  "Can it run on my own server?",
                  <>
                    Yes. We host it, or we{" "}
                    <Link href="/self-host" className={link}>
                      set AnyPress up on your server
                    </Link>
                    . The whole platform is open source.
                  </>,
                ],
                [
                  "I build sites for clients. Can I resell?",
                  <>
                    Yes. Sellers sell from one shop and pay per site; resellers run several brands on one wholesale bill.{" "}
                    <Link href="/resellers" className={link}>
                      See how it works
                    </Link>
                    .
                  </>,
                ],
                [
                  "Something else?",
                  <>
                    Email <a href={`mailto:${CONTACT_EMAIL}`} className={link}>{CONTACT_EMAIL}</a> and we&apos;ll get back to you.
                  </>,
                ],
              ]}
            />
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="opens 12 November"
        title="Get your place in the beta."
        body="Tell us what you'd build, and we'll send your invite when your place is ready."
        href="#join"
        label="Join the beta"
        drawings={["courses", "store", "bookings"]}
      />
    </>
  );
}
