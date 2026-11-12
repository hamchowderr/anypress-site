import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { Drawing, type DrawingName } from "@/components/Drawing";
import { ClientSites } from "@/components/ClientSites";
import { PriceCompare } from "@/components/PriceCompare";
import { ReadyBuilt } from "@/components/ReadyBuilt";
import { ProblemFix, type Problem } from "@/components/ProblemFix";
import { Tick } from "@/components/Tick";
import { CtaBand, Questions, SectionHead } from "@/components/ui";
import { JsonLd } from "@/components/JsonLd";
import { faqLd } from "@/lib/seo";
import { AUDIENCE_GROUPS, LOWEST_PRICE, SITE_TYPES, TRIAL_DAYS, VOLUME_RANGE, VOLUME_TIERS, WHOLESALE_PERCENT, groupUrl } from "@/lib/site";


// The homepage: every section centered, a drawing for every idea. The words are the marketer's copy from site PR #46:
// they lead with what a business gets (found on Google, booked, paid), then say that we set it all up.
export function HomePage() {
  return (
    <>
      <JsonLd data={faqLd(FAQ)} />
      <Hero />
      <Included items={INCLUDED} />
      <Examples />
      <ProblemFix soft who={WHO} items={PROBLEMS} title="Stop paying for your website one piece at a time." />
      <Sites />
      <HowItWorks />
      <WhoItsFor />
      <ReadyBuilt />
      <Prices />
      <SellBand />
      <section className="sec" aria-labelledby="h-faq">
        <div className="in">
          <SectionHead drawing="question" title="Questions people ask" id="h-faq" />
          <Questions items={FAQ} firstOpen />
        </div>
      </section>
      <CtaBand />
    </>
  );
}

function HeroCopy({ subClass }: { subClass: string }) {
  return (
    <>
      <Link className="badge" href="/move">
        <b>New</b> Bring your current WordPress site with you →
      </Link>
      <span className="eyebrow">a website that runs your business, set up for you</span>
      <h1 id="h-hero">
        Get found, get booked and get paid. <mark>We set it all up</mark>.
      </h1>
      <p className={subClass}>
        Your site arrives ready to show up on Google, take bookings and payments, keep track of every customer and send email from
        your business name. You add your words and photos.
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
          From ${LOWEST_PRICE} a month, everything included
        </li>
        <li>
          <Tick />
          No cut of your sales
        </li>
        <li>
          <Tick />
          {TRIAL_DAYS} days free to start
        </li>
        <li>
          <Tick />
          30-day money-back
        </li>
      </ul>
    </>
  );
}

function Hero() {
  return (
    <section className="in hero hero-fix" aria-labelledby="h-hero">
      <div className="hero-fix-text">
        <HeroCopy subClass="sub" />
      </div>
      <div className="desk" aria-label="Everything a website usually takes, done for you">
        <ul className="notes">
          {CHORES.map((c, i) => (
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
          <span className="hand">we do all of this for you</span>
        </div>
      </div>
    </section>
  );
}

// The jobs a website usually takes. They get crossed off in the hero.
// The things customers never have to do or pay for. They get crossed off in the hero.
const CHORES = ["Buy hosting", "Pick plugins", "Pay for add-ons", "Set up email", "Back it up", "Keep it secure"];

// What each item does for the business, not what it is.
export const INCLUDED: [DrawingName, string][] = [
  ["email", "Email @yourbusiness.com, so you look professional"],
  ["places", "Get found on Google"],
  ["bookings", "Online booking and payments"],
  ["nametag", "Your customer list, and it's yours"],
  ["backup", "Backed up every night"],
  ["piggy", "No cut of your sales"],
  ["box", "Yours to keep"],
  ["thirty", "30-day money-back"],
];

export function Included({ items }: { items: [DrawingName, string][] }) {
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

// The pains people name themselves first: add-ons, updates that break things, not being found.
export const PROBLEMS: Problem[] = [
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

// The three things each kind of site does.
const RESULTS: Record<string, string> = {
  website: "Found on Google · Messages to your inbox · Your own mailing list",
  bookings: "Booked online · Paid upfront · Reminders sent for you",
  store: "Sell online · Keep every sale · Customers on your list",
  community: "Sell courses · Paid members' area · Students on your list",
  everything: "Store, bookings and courses · Customer help · One site",
};

function Sites() {
  return (
    <section id="sites" className="sec soft scroll-mt-20" aria-labelledby="h-types">
      <div className="in">
        <SectionHead
          eyebrow="pick one"
          title="What do you need your website to do?"
          lead="Each one arrives ready to use."
          id="h-types"
        />
        <div className="types">
          {SITE_TYPES.map((t) => (
            <Link key={t.id} className="type" href={`/sites/${t.id}`}>
              <Drawing name={t.drawing} />
              <h3>{t.name}</h3>
              <p>{t.pitch}</p>
              <span className="type-tools hand">{RESULTS[t.id]}</span>
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
      <ClientSites />
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
              <b>Seller:</b> one free shop, pay per site, save up to {VOLUME_TIERS[VOLUME_TIERS.length - 1].percent}% as you grow.
            </li>
            <li>
              <b>Reseller:</b> several shops, {WHOLESALE_PERCENT}% off every site, one monthly bill.
            </li>
          </ul>
          <div className="flex flex-wrap gap-3">
            <Link className="btn btn-honey" href="/how-it-works/sellers">
              See how selling works →
            </Link>
            <Link className="btn border-white/40 text-white hover:bg-white/10" href="/sellers">
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
          <li>
            {VOLUME_TIERS[0].sites} or more sites? Save {VOLUME_RANGE}
          </li>
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
    "Will my site show up on Google?",
    "Your site is set up for Google from day one: page titles, link previews and a sitemap are done for you. Pages that say what you do and where you work do the rest.",
  ],
  [
    "What if an update breaks something?",
    "We apply security fixes for you, and a copy of your site is saved every night, so it can be put back the way it was. If something looks wrong, email us and we'll help.",
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
      Email support@anypress.io and we&apos;ll help. There&apos;s a <Link href="/help" className="underline">help page</Link> with
      guides too.
    </>,
  ],
];
