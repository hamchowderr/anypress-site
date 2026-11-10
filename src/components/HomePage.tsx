import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { Drawing, type DrawingName } from "@/components/Drawing";
import { Showcase } from "@/components/Showcase";
import { CompareTable } from "@/components/CompareTable";
import { PriceCompare } from "@/components/PriceCompare";
import { ReadyBuilt } from "@/components/ReadyBuilt";
import { ProblemFix, type Problem } from "@/components/ProblemFix";
import { Tick } from "@/components/Tick";
import { CtaBand, Questions, SectionHead } from "@/components/ui";
import { JsonLd } from "@/components/JsonLd";
import { faqLd } from "@/lib/seo";
import { AUDIENCE_GROUPS, SITE_TYPES, WHOLESALE_PERCENT, groupUrl } from "@/lib/site";


// The approved round 3 homepage (2026-10-24): every section centered, a drawing for every idea.
// Two versions of the words take turns while the A/B test runs (src/proxy.ts, src/lib/ab.ts). Both use the same
// layout, so the test compares the words and nothing else: "a" is the copy from round 3, "b" leads with what a
// business gets (found on Google, booked, paid) instead of what we do for it.
export type CopyVersion = "a" | "b";

export function HomePage({ version }: { version: CopyVersion }) {
  const b = version === "b";
  const faq = b ? FAQ_B : FAQ;
  return (
    <>
      <JsonLd data={faqLd(faq)} />
      <Hero version={version} />
      <Included items={b ? INCLUDED_B : INCLUDED} />
      <Examples />
      {b ? (
        <ProblemFix soft who={WHO} items={PROBLEMS_B} title="Stop paying for your website one piece at a time." />
      ) : (
        <ProblemFix soft who={WHO} items={PROBLEMS} title="Getting a website shouldn't be this hard." />
      )}
      {!b && <Pieces />}
      <Sites version={version} />
      {!b && <ReadyBuilt />}
      <HowItWorks />
      <WhoItsFor />
      {b && <ReadyBuilt version="b" />}
      <Prices />
      <SellBand />
      <section className="sec" aria-labelledby="h-faq">
        <div className="in">
          <SectionHead drawing="question" title="Questions people ask" id="h-faq" />
          <Questions items={faq} firstOpen />
        </div>
      </section>
      <CtaBand />
    </>
  );
}

function HeroCopy({ subClass, version }: { subClass: string; version: CopyVersion }) {
  const b = version === "b";
  return (
    <>
      <Link className="badge" href="/move">
        <b>New</b> Bring your current WordPress site with you →
      </Link>
      {b ? (
        <>
          <span className="eyebrow">a website that runs your business, set up for you</span>
          <h1 id="h-hero">
            Get found, get booked and get paid. <mark>We set it all up</mark>.
          </h1>
          <p className={subClass}>
            Your site arrives ready to show up on Google, take bookings and payments, keep track of every customer and send email from
            your business name. You add your words and photos.
          </p>
        </>
      ) : (
        <>
          <span className="eyebrow">managed WordPress for shops, studios, clubs and small businesses</span>
          <h1 id="h-hero">
            Sell, take bookings or teach online, <mark>without dealing with hosting</mark>.
          </h1>
          <p className={subClass}>
            Hosting, plugins, email, backups and security are done for you. You get a finished WordPress site and add your words and photos.
          </p>
        </>
      )}
      <div className="ctas">
        <Link className="btn btn-ink" href="#sites" data-ab="start">
          Start your site →
        </Link>
        <Link className="btn btn-paper" href="/pricing">
          See prices
        </Link>
      </div>
      <ul className="checks">
        <li>
          <Tick />
          {b ? "From $12 a month, everything included" : "From $12 a month"}
        </li>
        <li>
          <Tick />
          No cut of your sales
        </li>
        <li>
          <Tick />
          30-day money-back
        </li>
      </ul>
    </>
  );
}

function Hero({ version }: { version: CopyVersion }) {
  const b = version === "b";
  return (
    <section className="in hero hero-fix" aria-labelledby="h-hero">
      <div className="hero-fix-text">
        <HeroCopy subClass="sub" version={version} />
      </div>
      <div className="desk" aria-label="Everything a website usually takes, done for you">
        <ul className="notes">
          {(b ? CHORES_B : CHORES).map((c, i) => (
            <li key={c} style={{ "--r": `${[-6, 4, -3, 5, -5, 3][i]}deg`, "--i": i } as CSSProperties}>
              <span>{c}</span>
              <i aria-hidden />
            </li>
          ))}
        </ul>
        <span className="desk-arrow" aria-hidden>
          →
        </span>
        <div className="desk-done">
          <Drawing name="website" still />
          <span className="hand">{b ? "we do all of this for you" : "done for you"}</span>
        </div>
      </div>
    </section>
  );
}

// The jobs a website usually takes. They get crossed off in the hero.
const CHORES = ["Find hosting", "Install WordPress", "Pick plugins", "Set up email", "Back it up", "Keep it secure"];
// Version "b": the things customers never have to do or pay for, crossed off.
const CHORES_B = ["Buy hosting", "Pick plugins", "Pay for add-ons", "Set up email", "Back it up", "Keep it secure"];

const INCLUDED: [DrawingName, string][] = [
  ["domain", "Your own domain"],
  ["email", "Email from your name"],
  ["backup", "A copy saved every night"],
  ["lock", "Kept safe and running"],
  ["card", "Payments ready"],
  ["website", "Real WordPress"],
  ["piggy", "No cut of your sales"],
  ["box", "Take it with you"],
  ["thirty", "30-day money-back"],
];

// Version "b": what each item does for the business, not what it is.
const INCLUDED_B: [DrawingName, string][] = [
  ["email", "Email @yourbusiness.com, so you look professional"],
  ["places", "Get found on Google"],
  ["bookings", "Online booking and payments"],
  ["nametag", "Your customer list, and it's yours"],
  ["backup", "Backed up every night"],
  ["piggy", "No cut of your sales"],
  ["box", "Yours to keep"],
  ["thirty", "30-day money-back"],
];

function Included({ items }: { items: [DrawingName, string][] }) {
  return (
    <div className="marquee" role="region" aria-label="Included with every site">
      <div className="label">included with every site</div>
      <div className="track">
        {[0, 1].map((copy) =>
          items.map(([d, label]) => (
            <span key={`${copy}-${d}`} aria-hidden={copy === 1 || undefined}>
              <Drawing name={d} still className="!w-[54px] shrink-0" />
              {label}
            </span>
          )),
        )}
      </div>
    </div>
  );
}

const WHO = ["Shops and makers", "Coaches and studios", "Course creators", "Chambers and associations", "Churches", "Franchises", "Small businesses"];

const PROBLEMS: Problem[] = [
  {
    problem: ["Website tools are sold in pieces", "A builder, then a payments app, a booking tool and an email service, each with its own login and bill."],
    fix: ["It comes together", "Pick what you're building and it arrives with the right tools switched on, set up for you."],
  },
  {
    problem: ["You're not technical", "Hosting, plugins, the padlock, email settings. It's a lot to learn just to open your doors."],
    fix: ["We do the technical part", "Your site is ready the same day. If you can write an email, you can edit your pages."],
  },
  {
    problem: ["A cut of every sale", "Some platforms take a percentage of every order on top of the monthly fee."],
    fix: ["No cut of your sales", "One monthly price. The card company's normal fee is the only fee on an order."],
  },
  {
    problem: ["A payment company can freeze your account", "If your only way to take payments gets suspended, your shop stops selling overnight."],
    fix: [
      "Your own payment accounts, side by side",
      "Payments go to your own accounts, not through us. On a store you can switch on Stripe and PayPal together, so customers can still pay if one has a problem.",
    ],
  },
  {
    problem: ["Hard to leave", "Many builders won't let you take your site with you."],
    fix: ["Real WordPress you can take with you", "Download a full copy of your site whenever you like. No lock-in."],
  },
];

// Version "b" leads with the pains people name themselves: add-ons, updates that break things, not being found.
const PROBLEMS_B: Problem[] = [
  {
    problem: ["Nickel-and-dimed by add-ons", "A site builder, then a booking app, a payments app, an email service and a contact list, each with its own bill."],
    fix: ["One price, everything in", "Booking, payments, forms, your customer list and email are in your site from day one. Nothing else to buy."],
  },
  {
    problem: [
      "You're not technical, and one update can break your site",
      "Everything stops working, and you don't find out until you hear it from a customer.",
    ],
    fix: ["We do the technical part", "Your site is ready the same day. If you can write an email, you can edit your pages."],
  },
  {
    problem: ["Nobody nearby can find you", "You may be the best in town, but if no one knows it, you don't get the business."],
    fix: ["Get found locally", "Your site is ready for Google from day one, with your name, your services and your area in the right places."],
  },
  PROBLEMS[2],
  PROBLEMS[3],
  PROBLEMS[4],
];

const PIECES: [string, string, string][] = [
  ["A website you can grow", "Builder plan", "Included"],
  ["Your own domain, connected", "You set it up", "Done for you"],
  ["Email from your business name", "Separate email service", "Included"],
  ["Card payments", "Extra app or plugin", "Ready to switch on"],
  ["Bookings, courses or members", "Another monthly app", "In the plan you pick"],
  ["A copy saved every night", "Paid add-on", "Included"],
  ["A cut of every sale", "Some platforms take one", "0%"],
];

function Pieces() {
  return (
    <section className="sec in" aria-labelledby="h-compare">
      <SectionHead
        eyebrow="the add-on maze"
        title="Most website tools sell it to you in pieces."
        lead="A builder here, a payments app there, a booking tool, an email service. With AnyPress it comes together, set up for you."
        id="h-compare"
      />
      <CompareTable head={["What you need", "Piecing it together", "AnyPress"]} rows={PIECES} />
      <p className="compare-note">
        The card company&apos;s fee still applies to each order. <Link href="/compare" className="underline">See more comparisons</Link>
      </p>
    </section>
  );
}

// Version "b": the three things each kind of site does, instead of a count of tools.
const RESULTS: Record<string, string> = {
  website: "Found on Google · Messages to your inbox · Your own mailing list",
  bookings: "Booked online · Paid upfront · Reminders sent for you",
  store: "Sell online · Keep every sale · Customers on your list",
  community: "Sell courses · Paid members' area · Students on your list",
  everything: "Store, bookings and courses · Customer help · One site",
};

function Sites({ version }: { version: CopyVersion }) {
  const b = version === "b";
  return (
    <section id="sites" className="sec soft scroll-mt-20" aria-labelledby="h-types">
      <div className="in">
        <SectionHead
          eyebrow="pick one"
          title={b ? "What do you need your website to do?" : "What are you building?"}
          lead={b ? "Each one arrives ready to use." : "Each one arrives ready to use, with the right tools already switched on."}
          id="h-types"
        />
        <div className="types">
          {SITE_TYPES.map((t) => (
            <Link key={t.id} className="type" href={`/sites/${t.id}`}>
              <Drawing name={t.drawing} />
              <h3>{t.name}</h3>
              <p>{t.pitch}</p>
              <span className="type-tools hand">{b ? RESULTS[t.id] : `${t.tools.length - 1} tools set up for you`}</span>
              <div className="price">
                ${t.from} <small>/ month</small>
              </div>
              <span className="go">See what&apos;s inside →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function Examples() {
  return (
    <section id="examples" className="sec in scroll-mt-20" aria-labelledby="h-ex">
      <SectionHead
        eyebrow="click around"
        title="See a real one before you start."
        lead="Five example sites, built on AnyPress exactly as yours would be."
        id="h-ex"
      />
      <Showcase />
      <p className="mt-10 text-center text-ink-soft">
        Want a different look? <Link href="/designs" className="font-semibold text-ink underline">See all 16 designs</Link>.
      </p>
    </section>
  );
}

const YOUR_PART: [DrawingName, string, string][] = [
  ["pick", "Pick what you're building", "Five kinds of site, one price each."],
  ["words", "Add your words, photos and prices", "Edit pages like a document."],
  ["open", "Open your doors", "Share your link and take orders."],
];

const OUR_PART: [DrawingName, string][] = [
  ["domain", "Your own domain, connected"],
  ["email", "Email from your business name"],
  ["backup", "A copy saved every night"],
  ["lock", "Kept safe and running"],
  ["card", "Payments ready to switch on"],
];

function HowItWorks() {
  return (
    <section className="sec soft" aria-labelledby="h-how">
      <div className="in">
        <SectionHead eyebrow="how it works" title="You do the fun part. We do the rest." id="h-how" />
        <div className="parts">
          <div>
            <h3 className="part-title">
              Your part <span className="hand">about an afternoon</span>
            </h3>
            <ul className="cards big">
              {YOUR_PART.map(([d, title, sub]) => (
                <li key={title}>
                  <Drawing name={d} />
                  {title}
                  <small>{sub}</small>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="part-title">
              Our part <span className="hand">every day after</span>
            </h3>
            <ul className="cards">
              {OUR_PART.map(([d, title]) => (
                <li key={title}>
                  <Drawing name={d} />
                  {title}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-10 text-center">
          <Link href="/how-it-works" className="inline-block py-1 font-bold underline underline-offset-4">
            See how it all works, step by step →
          </Link>
        </p>
      </div>
    </section>
  );
}


function WhoItsFor() {
  return (
    <section className="sec" aria-labelledby="h-who">
      <div className="in">
        <SectionHead
          eyebrow="who it's for"
          title="Made for every kind of business."
          lead="No one comes first. If you need a website to run things, it's for you."
          id="h-who"
        />
        <ul className="cards">
          {AUDIENCE_GROUPS.filter((g) => g.side === "owners").map((g) => (
            <li key={g.id} className="!basis-[250px]">
              <Link href={groupUrl(g)} className="card-link">
                <Drawing name={g.drawing} className="!w-[120px]" />
                <span className="text-[17px] font-bold">{g.name}</span>
              </Link>
            </li>
          ))}
        </ul>
        <h3 className="mt-14 text-center text-[22px] font-extrabold">
          And for people who sell websites <span className="hand block text-[22px] sm:ml-1.5 sm:inline">or build them into software</span>
        </h3>
        <ul className="cards mt-6">
          {AUDIENCE_GROUPS.filter((g) => g.side === "technical").map((g) => (
            <li key={g.id} className="!basis-[250px]">
              <Link href={groupUrl(g)} className="card-link">
                <Drawing name={g.drawing} className="!w-[120px]" />
                <span className="text-[17px] font-bold">{g.name}</span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-center">
          <Link href="/who" className="inline-block py-1 font-bold underline underline-offset-4">
            Not sure which one you are? Start here →
          </Link>
        </p>
      </div>
    </section>
  );
}

function SellBand() {
  return (
    <section className="sec in" aria-labelledby="h-sell">
      <div className="sell">
        <Drawing name="sell" />
        <div>
          <span className="eyebrow">have clients?</span>
          <h2 id="h-sell">Sell websites under your own name.</h2>
          <p>Anyone with customers can offer AnyPress sites as their own. Your customers buy from your shop and never see us.</p>
          <ul>
            <li>
              <b>Seller:</b> one free shop, pay per site, save up to 30% as you grow.
            </li>
            <li>
              <b>Reseller:</b> several shops, {WHOLESALE_PERCENT}% off every site, one monthly bill.
            </li>
          </ul>
          <div className="flex flex-wrap gap-3">
            <Link className="btn btn-honey" href="/how-it-works/sellers">
              See how selling works →
            </Link>
            <Link className="btn border-white/40 text-white hover:bg-white/10" href="/agencies">
              Sell websites
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}



function Prices() {
  return (
    <section className="sec soft" aria-labelledby="h-price">
      <div className="in">
        <SectionHead eyebrow="simple prices" title="One price per site. Nothing hidden." lead="Starting prices for a small site, per month." id="h-price" />
        <div className="prices">
          {SITE_TYPES.map((t) => (
            <Link key={t.id} href={`/sites/${t.id}`}>
              <b>{t.short}</b>
              <strong>${t.from}</strong>
              <small>/ month</small>
            </Link>
          ))}
        </div>
        <ul className="price-notes">
          <li>Pay yearly, get 2 months free</li>
          <li>More room? Medium is 2×, Large is 4×</li>
          <li>3 or more sites? Save 10 to 30%</li>
        </ul>
        <h3 className="mt-16 text-center text-[26px] font-extrabold">
          Next to other platforms <span className="hand block text-[22px] sm:ml-1.5 sm:inline">same kind of site, smallest plan</span>
        </h3>
        <div className="mt-6">
          <PriceCompare />
        </div>
        <div className="ctas mt-10">
          <Link className="btn btn-ink" href="/pricing">
            See all prices
          </Link>
        </div>
      </div>
    </section>
  );
}

const FAQ: [string, ReactNode][] = [
  [
    "Do I need to be technical?",
    "No. You pick what you're building and we set everything up. If you can write an email, you can edit your pages.",
  ],
  [
    "Can I use my own domain?",
    "Yes. Every site starts with a free address, and you can connect your own domain whenever you're ready. Email can come from it too.",
  ],
  [
    "Can I move my current site over?",
    <>
      If it runs on WordPress, yes. You add WordPress&apos;s free Reprint plugin to your current site, paste in the token we give you,
      and we copy the whole site across. <Link href="/move" className="underline">How moving works</Link>.
    </>,
  ],
  ["Do you take a cut of my sales?", "Never. You pay one monthly price for the site. The only fee on an order is the card company's."],
  ["What if I want to leave?", "It's real WordPress, so you can take a full copy of your site with you. No lock-in."],
  [
    "How do I get help?",
    <>
      Email support@anypress.io and a real person answers. There&apos;s a <Link href="/help" className="underline">help page</Link> with
      guides too.
    </>,
  ],
];

const FAQ_B: [string, ReactNode][] = [
  FAQ[0],
  [
    "Will my site show up on Google?",
    "Your site is set up for Google from day one: page titles, link previews and a sitemap are done for you. Pages that say what you do and where you work do the rest.",
  ],
  [
    "What if an update breaks something?",
    "We apply security fixes for you, and a copy of your site is saved every night, so it can be put back the way it was. If something looks wrong, email us and a person answers.",
  ],
  ...FAQ.slice(1),
];
