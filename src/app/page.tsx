import Link from "next/link";
import type { ReactNode } from "react";
import { Arrow, Check, LineIcon } from "@/components/Icons";
import { Showcase } from "@/components/Showcase";
import { CtaBand, Questions, SectionHead } from "@/components/ui";
import { AUDIENCE_GROUPS, SITE_TYPES, startUrl } from "@/lib/site";

export default function Home() {
  return (
    <>
      <Hero />
      <EverySite />
      <Sites />
      <HowItWorks />
      <WhoItsFor />
      <Agencies />
      <section id="faq" className="mx-auto grid border-t border-line max-w-6xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_1.7fr] lg:py-24">
        <SectionHead title="Questions" />
        <Questions items={FAQ} />
      </section>
      <CtaBand />
    </>
  );
}

function Hero() {
  return (
    <section id="examples" className="scroll-mt-16 overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 pt-16 pb-20 sm:px-6 lg:pt-24 lg:pb-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">WordPress, set up and looked after for you</p>
          <h1 className="font-display mt-4 text-[clamp(2.6rem,6vw,4.6rem)] leading-[1.02] font-semibold text-balance">
            Websites that arrive <span className="ribbon-text">ready to use</span>.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-ink-soft sm:text-xl">
            Pick a website, bookings, a shop, courses, or all of it. It comes with payments, email and a free domain already set up,
            and we keep it running.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="#sites" className="btn btn-ink">
              Start your site
            </Link>
            <Link href="/pricing" className="btn btn-paper">
              See prices
            </Link>
          </div>
          <p className="mt-5 text-sm text-ink-soft">From $12 a month. No cut of your sales. 30-day money-back guarantee.</p>
        </div>

        <div className="mt-16">
          <p className="mb-5 text-center text-sm text-ink-soft">These are real AnyPress sites, filled in for five made-up businesses.</p>
          <Showcase />
        </div>
      </div>
    </section>
  );
}

const EVERY_SITE: { icon: Parameters<typeof LineIcon>[0]["name"]; title: string; body: string }[] = [
  { icon: "globe", title: "A free domain", body: "Your site is online from day one. Use your own domain, like yourbrand.com, whenever you're ready." },
  { icon: "mail", title: "Email from your address", body: "Receipts, bookings and newsletters send from your own domain." },
  { icon: "lock", title: "The padlock", body: "The secure padlock in the address bar, renewed for you." },
  { icon: "copy", title: "A copy every night", body: "We save your whole site every night, so it can always be put back." },
  { icon: "coin", title: "No cut of your sales", body: "One monthly price. Payments go straight to your own account." },
  { icon: "open", title: "Yours, and open source", body: "Your own private WordPress site. The code behind AnyPress is public." },
];

function EverySite() {
  return (
    <section className="border-y border-line bg-paper-2">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-24">
        <SectionHead eyebrow="On every site" title="The fiddly parts are already done." center />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {EVERY_SITE.map((f) => (
            <li key={f.title} className="card p-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-paper-2 text-accent">
                <LineIcon name={f.icon} />
              </span>
              <h3 className="mt-4 font-semibold">{f.title}</h3>
              <p className="mt-1.5 leading-7 text-ink-soft">{f.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Sites() {
  return (
    <section id="sites" className="scroll-mt-16">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-24">
        <SectionHead
          eyebrow="Sites and prices"
          title="Pick what you're building."
          lead="Each kind of site comes with the tools it needs. Prices are monthly, for the Small size."
        />
        <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {SITE_TYPES.map((t) => (
            <li key={t.id} className="card flex flex-col p-6">
              <h3 className="font-display text-2xl font-semibold">{t.name}</h3>
              <p className="mt-2 leading-7 text-ink-soft">{t.pitch}</p>
              <p className="mt-5">
                <span className="font-display text-4xl font-semibold">${t.from}</span>
                <span className="text-ink-soft"> a month</span>
              </p>
              <ul className="mt-5 flex-1 space-y-2 text-[15px]">
                {t.inBox.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex gap-2">
                <a href={startUrl(t)} className="btn btn-ink flex-1">
                  Start
                </a>
                <Link href={`/sites/${t.id}`} className="btn btn-paper flex-1">
                  Example
                </Link>
              </div>
            </li>
          ))}
          <li className="flex flex-col justify-center rounded-[1.25rem] border border-dashed border-line p-6">
            <h3 className="font-semibold">Need more room?</h3>
            <p className="mt-2 leading-7 text-ink-soft">
              Every site comes in Small, Medium and Large. Bigger sizes get more computing power, storage and emails.
            </p>
            <Link href="/pricing" className="mt-4 inline-flex items-center gap-1.5 font-semibold text-accent hover:underline">
              Compare sizes <Arrow className="h-4 w-4" />
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}

const STEPS = [
  { title: "Pick a site", body: "Choose what you're building and check out. We create your site as soon as you check out." },
  { title: "Add your things", body: "Open your site's editor from your account and add your products, classes or posts." },
  { title: "Open the doors", body: "Take orders, bookings and sign-ups. Switch to your own domain whenever you like." },
];

function HowItWorks() {
  return (
    <section className="border-t border-line">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-24">
        <SectionHead eyebrow="How it works" title="Three steps, and we handle the rest." />
        <ol className="mt-12 grid gap-8 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <li key={s.title} className="border-t border-line pt-6">
              <span className="font-display text-sm font-semibold text-accent">Step {i + 1}</span>
              <h3 className="font-display mt-2 text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 leading-7 text-ink-soft">{s.body}</p>
            </li>
          ))}
        </ol>
        <p className="mt-10 text-ink-soft">
          After that, we keep WordPress up to date, save a copy every night and keep an eye on it. Want bookings or a members&apos;
          area later? It&apos;s added to the same site.
        </p>
      </div>
    </section>
  );
}

function WhoItsFor() {
  return (
    <section className="border-t border-line bg-paper-2">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-24">
        <SectionHead eyebrow="Who it's for" title="Made for every kind of business." />
        <ul className="mt-12 grid gap-x-10 md:grid-cols-2">
          {AUDIENCE_GROUPS.map((g) => (
            <li key={g.id} className="border-b border-line">
              <Link href={`/who#${g.id}`} className="group flex items-center justify-between gap-6 py-5">
                <span>
                  <span className="block font-semibold">{g.name}</span>
                  <span className="mt-0.5 block text-ink-soft">{g.line}</span>
                </span>
                <Arrow className="h-5 w-5 shrink-0 text-ink-soft transition-transform duration-200 group-hover:translate-x-1 group-hover:text-ink" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Agencies() {
  return (
    <section className="border-t border-line">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1.3fr_1fr] lg:py-24">
        <SectionHead
          eyebrow="For agencies and freelancers"
          title="Sell websites under your own name."
          lead="Sell AnyPress sites to your clients from your own shop, at your own prices. We build and look after every one, and you pay less per site as you grow."
        />
        <div className="flex flex-wrap gap-3 lg:justify-end">
          <Link href="/sell" className="btn btn-ink">
            Apply to sell websites
          </Link>
          <Link href="/agencies" className="btn btn-paper">
            How it works
          </Link>
        </div>
      </div>
    </section>
  );
}

const FAQ: [string, ReactNode][] = [
  [
    "What is AnyPress?",
    "WordPress, set up and looked after for you. You pick the kind of site you need, it arrives with everything already in place, and then we keep it running and save a copy every night.",
  ],
  [
    "Are the example sites real?",
    "Yes. Each one is an ordinary AnyPress site, filled in for a made-up business so you can click around. Yours starts the same way, ready for your own words and photos.",
  ],
  [
    "Do I need to be technical?",
    "No. If you can fill in a form and write an email, you can run your site. Your site's editor opens with one click from your account.",
  ],
  [
    "Do you take a cut of my sales?",
    "No. You pay one monthly price for the site. The card company charges its normal fee on payments, and we add nothing on top.",
  ],
  [
    "Can I use my own domain?",
    "Yes. Every site starts with a free domain. When you're ready, connect your own, like yourbrand.com. With many domain companies it takes one click.",
  ],
  [
    "Is the site really mine?",
    "Yes. It's your own private website on WordPress, not shared with anyone, and the content is yours. AnyPress itself is open source, so you're not locked in.",
  ],
  ["What if I change my mind?", "Cancel from your account any time. If it's within 30 days of your first payment, you get that payment back."],
];
