import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { Drawing, type DrawingName } from "@/components/Drawing";
import { LeadForm } from "@/components/LeadForm";
import { type Problem, ProblemFix } from "@/components/ProblemFix";
import { Tick } from "@/components/Tick";
import { CtaBand, PageHero, Questions, SectionHead } from "@/components/ui";
import { CONTACT_EMAIL, SITE_TYPES } from "@/lib/site";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  path: "/beta",
  title: "Join the AnyPress beta",
  description:
    "Finished WordPress sites built on the Fluent plugins: only the plugins you need, set up and connected, hosting and email handled, your old site moved in, and every site in one dashboard. The beta opens on 12 November.",
});

const link = "font-semibold text-ink underline underline-offset-2";

// The questions Fluent users ask most in their community, and what AnyPress does about each.
const PROBLEMS: Problem[] = [
  {
    problem: ["Which host, and what size?", "Every thread gets ten answers, and a community or shop that outgrows its plan slows down at the worst time."],
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
    problem: ["Why does my email land in spam?", "Welcome emails, receipts and newsletters go missing until someone sorts out sending and the domain records."],
    fix: ["Email that lands", "Your mail domain and FluentSMTP and FluentCRM sending are set up before your first member or buyer arrives."],
  },
  {
    problem: ["Which plugins do I actually need?", "Install too few and features are missing. Install too many and settings fight each other."],
    fix: ["Only the plugins you need", "Pick what you're building and only those Fluent plugins are turned on, already connected to each other."],
  },
  {
    problem: ["How do I move my community over?", "Members, courses, orders and forms sit in other plugins, and copying them by hand takes weeks."],
    fix: ["Bring your site with you", "Built-in switches copy WooCommerce, BuddyPress, LearnDash, Circle and more into the Fluent plugins. Your old data stays put until you're happy."],
  },
  {
    problem: ["How do I keep many client sites the same?", "Each site drifts: different versions, different settings, and an update that breaks one of them on a Friday."],
    fix: ["Many sites, one place", "Create, back up, restore and connect domains for every site from one dashboard, with your team. Updates are tested before they reach your sites."],
  },
  {
    problem: ["Can AI do the busywork?", "Most AI tools can write a paragraph, but can't touch the site itself."],
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

// Every site, whatever its type (PRODUCT.md, Capabilities).
const EVERY_SITE: [DrawingName, string, string][] = [
  ["server", "Its own WordPress", "And its own database. Real WordPress, not a page builder that locks you in."],
  ["backup", "Nightly backups", "Saved every night, restored with one click."],
  ["domain", "Your own domain", "A free .anypress.site address, then connect yours, in one click with supported providers."],
  ["email", "Email from your domain", "Sending set up for you, so receipts and newsletters arrive."],
  ["lock", "Secure from day one", "SSL, security fixes and tested updates, looked after for you."],
  ["key", "One-click sign-in", "Open WordPress straight from your account, no passwords to keep."],
  ["piggy", "No cut of your sales", "We don't take a fee on what you sell. Only Stripe's card fee applies."],
  ["words", "More than one language", "Turn on languages and add translated pages, with a language switcher in the menu."],
];

type Move = [from: string, into: string, soon?: boolean];

// The switches in AnyPress Client. Tutor LMS, LifterLMS and MemberPress are released and reach stores with the next
// store template version.
const MOVES: Move[] = [
  ["WooCommerce products, orders and customers", "FluentCart"],
  ["WooCommerce buyers, MailPoet and Newsletter subscribers", "FluentCRM"],
  ["Contact Form 7, WPForms and Ninja Forms", "Fluent Forms"],
  ["BuddyPress groups and members", "FluentCommunity"],
  ["LearnDash courses, students and progress", "FluentCommunity courses"],
  ["Circle communities, with courses", "FluentCommunity"],
  ["Awesome Support tickets", "Fluent Support"],
  ["SliceWP affiliates", "FluentAffiliate"],
  ["Tutor LMS and LifterLMS courses", "FluentCommunity courses", true],
  ["MemberPress members", "FluentCommunity spaces and courses", true],
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
      </PageHero>

      <ProblemFix
        soft
        eyebrow="from the Fluent community"
        title="The questions that keep coming up."
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
                        <li key={tool}>{tool}</li>
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

      <section className="sec soft" aria-labelledby="h-every">
        <div className="in">
          <SectionHead eyebrow="on every plan" title="Every site comes with." id="h-every" />
          <ul className="cards beta-every">
            {EVERY_SITE.map(([d, title, body]) => (
              <li key={title} className="!basis-[260px]">
                <Drawing name={d} still />
                <h3>{title}</h3>
                <p>{body}</p>
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
                {MOVES.map(([from, into, soon]) => (
                  <tr key={from}>
                    <th scope="row">{from}</th>
                    <td>
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
