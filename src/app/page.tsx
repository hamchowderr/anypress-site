import Link from "next/link";
import type { ReactNode } from "react";
import { Drawing, type DrawingName } from "@/components/Drawing";
import { Showcase } from "@/components/Showcase";
import { CompareTable } from "@/components/CompareTable";
import { Tick } from "@/components/Tick";
import { CtaBand, Questions, SectionHead } from "@/components/ui";
import { AUDIENCE_GROUPS, SITE_TYPES, groupUrl } from "@/lib/site";

// The approved round 3 homepage (2026-10-24): every section centered, a drawing for every idea.
export default function Home() {
  return (
    <>
      <Hero />
      <Included />
      <Pieces />
      <Sites />
      <Examples />
      <HowItWorks />
      <WhoItsFor />
      <SellBand />
      <Promises />
      <Prices />
      <section className="sec soft" aria-labelledby="h-faq">
        <div className="in">
          <SectionHead drawing="question" title="Questions people ask" id="h-faq" />
          <Questions items={FAQ} firstOpen />
        </div>
      </section>
      <CtaBand />
    </>
  );
}

function Hero() {
  return (
    <section className="in hero" aria-labelledby="h-hero">
      <Link className="badge" href="/move">
        <b>New</b> Bring your current WordPress site with you →
      </Link>
      <h1 id="h-hero">
        Your business deserves a <mark>real</mark> website.
      </h1>
      <p className="sub">
        Pick what you&apos;re building. We set it up on real WordPress, keep it running and look after the fiddly parts. You keep
        every sale.
      </p>
      <div className="ctas">
        <Link className="btn btn-ink" href="#sites">
          Start your site →
        </Link>
        <Link className="btn btn-paper" href="/pricing">
          See prices
        </Link>
      </div>
      <ul className="checks">
        <li>
          <Tick />
          From $12 a month
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
      <div className="built-for">For shops, studios, coaches, chambers, franchises, agencies and software teams</div>
      <div className="scene-wrap">
        <Drawing name="hero" />
        <span className="hand l1" aria-hidden>
          your website
        </span>
        <span className="hand l2" aria-hidden>
          bookings
        </span>
        <span className="hand l3" aria-hidden>
          your shop
        </span>
        <span className="hand l4" aria-hidden>
          your members
        </span>
      </div>
      <ol className="flow" aria-label="How it works in four steps">
        {FLOW.map(([d, title, sub], i) => (
          <li key={title}>
            <Drawing name={d} />
            <b>
              {i + 1}. {title}
            </b>
            <span>{sub}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}

const FLOW: [DrawingName, string, string][] = [
  ["pick", "Pick", "what you're building"],
  ["tools", "We set it up", "tools switched on for you"],
  ["paint", "Make it yours", "your words, photos, prices"],
  ["open", "Open your doors", "and we keep it running"],
];

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

function Included() {
  return (
    <div className="marquee" role="region" aria-label="Included with every site">
      <div className="label">included with every site</div>
      <div className="track">
        {[0, 1].map((copy) =>
          INCLUDED.map(([d, label]) => (
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

function Sites() {
  return (
    <section id="sites" className="sec soft scroll-mt-20" aria-labelledby="h-types">
      <div className="in">
        <SectionHead
          eyebrow="pick one"
          title="What are you building?"
          lead="Each one arrives ready to use, with the right tools already switched on."
          id="h-types"
        />
        <div className="types">
          {SITE_TYPES.map((t) => (
            <Link key={t.id} className="type" href={`/sites/${t.id}`}>
              <Drawing name={t.drawing} />
              <h3>{t.name}</h3>
              <p>{t.pitch}</p>
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
      </div>
    </section>
  );
}

function WhoItsFor() {
  return (
    <section className="sec in" aria-labelledby="h-who">
      <SectionHead
        eyebrow="who it's for"
        title="Made for every kind of business."
        lead="No one comes first. If you need a website to run things, it's for you."
        id="h-who"
      />
      <ul className="cards">
        {AUDIENCE_GROUPS.map((g) => (
          <li key={g.id} className="!basis-[250px]">
            <Link href={groupUrl(g)} className="card-link">
              <Drawing name={g.drawing} className="!w-[120px]" />
              <span className="text-[17px] font-bold">{g.name}</span>
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-8 text-center">
        <Link href="/who" className="font-bold underline underline-offset-4">
          Not sure which one you are? Start here →
        </Link>
      </p>
    </section>
  );
}

function SellBand() {
  return (
    <section className="sec in !pt-0" aria-labelledby="h-sell">
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
              <b>Reseller:</b> several shops and one monthly wholesale bill.
            </li>
          </ul>
          <div className="flex flex-wrap gap-3">
            <Link className="btn btn-honey" href="/agencies">
              See how selling works →
            </Link>
            <Link className="btn border-white/40 text-white hover:bg-white/10" href="/resellers">
              Become a reseller
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

const PROMISES: [DrawingName, string, string][] = [
  ["piggy", "No cut of your sales", "You pay your plan. Your sales are yours, minus the card fee."],
  ["nametag", "Your name on it", "Use your own domain and your own email address."],
  ["box", "Take it with you", "It's real WordPress, so you're never locked in."],
  ["thirty", "30 days to decide", "Not for you? Get your money back within 30 days."],
];

function Promises() {
  return (
    <section className="sec soft" aria-labelledby="h-yours">
      <div className="in">
        <SectionHead eyebrow="our promise" title="It stays yours." id="h-yours" />
        <div className="yours">
          {PROMISES.map(([d, title, body]) => (
            <div key={title}>
              <Drawing name={d} />
              <h3>{title}</h3>
              <p>{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Prices() {
  return (
    <section className="sec in" aria-labelledby="h-price">
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
      <div className="ctas">
        <Link className="btn btn-ink" href="/pricing">
          See all prices
        </Link>
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
      If it runs on WordPress, yes. You install our free export plugin on your current site, paste in the code we give you, and your
      site comes across. <Link href="/move" className="underline">How moving works</Link>.
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
