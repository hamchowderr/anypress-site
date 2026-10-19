import Link from "next/link";
import type { ReactNode } from "react";
import { Arrow, BoxIcon, Check, GrowWithYou, KeepItRunning, MakeItYours, OpenTheDoors, SiteParts } from "@/components/Drawings";
import { BAND, type Band, CtaBand, StepTag } from "@/components/ui";
import { AUDIENCE_GROUPS, SITE_TYPES, startUrl } from "@/lib/site";

export default function Home() {
  return (
    <>
      <Hero />
      <LooseParts />
      <Step
        n={2}
        band="orange"
        who="us"
        title="We put it together."
        body="We build your site on WordPress, the system behind a huge share of the web. Everything you picked arrives set up and working, so there's nothing to install or connect."
        facts={["Payments, bookings or courses, ready to use", "Email that sends from your own address", "The padlock in the address bar", "A free web address to start with"]}
        drawing={<SiteParts state="assemble" className="w-full" />}
        assemble
      />
      <Step
        n={3}
        band="red"
        who="you"
        title="Make it yours."
        body="Add your products, classes or posts. Your site's editor opens with one click from your account, and you can switch to your own web address, like yourbrand.com, whenever you're ready."
        facts={["Open your editor with one click", "Use your own web address", "Change anything, any time"]}
        drawing={<MakeItYours className="w-full" />}
        flip
      />
      <Step
        n={4}
        band="rose"
        who="you"
        title="Open the doors."
        body="Take orders, bookings and sign-ups. We don't take a cut of your sales, so every dollar you make is yours. The card company's normal fee is the only one on an order."
        facts={["One monthly price for the site", "No cut of your sales, ever", "Payments go straight to your own account"]}
        drawing={<OpenTheDoors className="w-full" />}
      />
      <Step
        n={5}
        band="magenta"
        who="us"
        title="We keep it running."
        body="We look after your site and save a copy of it every night, so you can get back to work. It's your own private website, not shared with anyone, and it stays yours."
        facts={["A copy saved every night", "Kept safe and looked after", "Your own website, never shared"]}
        drawing={<KeepItRunning className="w-full" />}
        flip
      />
      <Step
        n={6}
        band="ink"
        who="us"
        title="We grow with you."
        body="Want to add a shop, bookings or a members' area later? Tell us and we'll add it to the same site, so you never start over."
        facts={["Start small, add more later", "Same site, same web address", "Nothing to move or rebuild"]}
        drawing={<GrowWithYou className="w-full" />}
      />
      <PartsList />
      <WhoItsFor />
      <Faq />
      <CtaBand />
    </>
  );
}

function StepNumber({ n }: { n: number }) {
  return <span className="font-display-wide block text-[clamp(5rem,12vw,9rem)] leading-[0.8] font-black">{n}</span>;
}

function Hero() {
  return (
    <section className="border-b-[2.5px] border-ink bg-amber">
      <div className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:pt-16">
        <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_1fr]">
          <div>
            <h1 className="font-display text-[clamp(2.75rem,5.4vw,4.9rem)] leading-[0.95] font-black text-balance">
              Pick a website. We&apos;ll put it together.
            </h1>
            <p className="mt-6 max-w-xl text-xl leading-8">
              AnyPress is WordPress, set up and looked after for you. Choose what you&apos;re building, and it arrives ready to use, with
              payments, email and a free web address already in place.
            </p>
          </div>
          <div className="hidden px-6 pb-2 lg:block">
            <SiteParts state="loose" className="w-full" />
          </div>
        </div>

        <div className="mt-10 pb-12 lg:pb-16">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <span className="font-display-wide text-6xl leading-none font-black">1</span>
            <StepTag who="you" />
            <h2 className="text-2xl font-bold">Pick what you&apos;re building</h2>
          </div>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {SITE_TYPES.map((t) => (
              <li key={t.id}>
                <a
                  href={startUrl(t)}
                  className="group flex h-full flex-col rounded-2xl border-[2.5px] border-ink bg-paper p-4 transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-1 hover:shadow-[0_14px_28px_-14px_rgb(23_19_28/0.55)]"
                >
                  <span className="font-display text-xl leading-tight font-extrabold">{t.name}</span>
                  <span className="mt-2 flex-1 leading-6 text-ink-soft">{t.pitch}</span>
                  <span className="mt-4 flex items-end justify-between gap-2">
                    <span>
                      <span className="font-display text-3xl font-black">${t.from}</span>
                      <span className="text-ink-soft"> a month</span>
                    </span>
                    <Arrow className="h-7 w-7 transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-ink-soft">Starting prices. Not sure which one? Every box is listed in full below.</p>
        </div>
      </div>
    </section>
  );
}

function LooseParts() {
  return (
    <section id="how" className="bg-paper">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_1fr] lg:py-28">
        <h2 className="font-display text-[clamp(2.2rem,4.6vw,3.75rem)] leading-[0.98] font-black text-balance">
          Most websites come as a box of loose parts.
        </h2>
        <div className="space-y-5 text-xl leading-8">
          <p>
            Hosting from one company, a design from another, an add-on for payments and another for email. Then a weekend lost
            fitting them together.
          </p>
          <p>
            WordPress can do almost anything. On your own, it can feel like a giant flea market. With AnyPress, you do the easy
            steps and we do the rest.
          </p>
        </div>
      </div>
    </section>
  );
}

function Step({
  n,
  band,
  who,
  title,
  body,
  facts,
  drawing,
  flip = false,
  assemble = false,
}: {
  n: number;
  band: Band;
  who: "you" | "us";
  title: string;
  body: string;
  facts: string[];
  drawing: ReactNode;
  flip?: boolean;
  assemble?: boolean;
}) {
  return (
    <section className={`${BAND[band]} border-t-[2.5px] border-ink ${assemble ? "assembly-scope" : ""}`}>
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:py-28">
        <div className={flip ? "lg:order-2" : ""}>
          <div className="flex items-end gap-5">
            <StepNumber n={n} />
            <div className="pb-2">
              <StepTag who={who} />
            </div>
          </div>
          <h2 className="font-display mt-8 text-[clamp(2.4rem,5vw,4.25rem)] leading-[0.95] font-black">{title}</h2>
          <p className="mt-6 max-w-xl text-xl leading-8">{body}</p>
          <ul className="mt-8 max-w-md space-y-3">
            {facts.map((f) => (
              <li key={f} className="flex items-start gap-3 text-lg font-bold">
                <Check className="mt-0.5 h-6 w-6 shrink-0" />
                {f}
              </li>
            ))}
          </ul>
        </div>
        <div className={`rounded-3xl border-[2.5px] border-ink bg-paper p-6 text-ink sm:p-10 ${flip ? "lg:order-1" : ""}`}>{drawing}</div>
      </div>
    </section>
  );
}

function PartsList() {
  return (
    <section id="pick" className="border-t-[2.5px] border-ink bg-paper">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end">
          <h2 className="font-display text-[clamp(2.4rem,5vw,4.25rem)] leading-[0.95] font-black">What&apos;s in each box.</h2>
          <p className="text-xl leading-8">
            Every site comes with the padlock, a nightly copy, email from your own address and a free web address. Pick the box that
            fits what you&apos;re building.
          </p>
        </div>
        <ol className="mt-14 border-t-[2.5px] border-ink">
          {SITE_TYPES.map((t) => (
            <li key={t.id} className="grid gap-6 border-b-[2.5px] border-ink py-8 lg:grid-cols-[1.1fr_1.4fr_auto] lg:items-center lg:gap-10">
              <div className="flex items-start gap-4">
                <BoxIcon className="h-12 w-12 shrink-0" />
                <div>
                  <h3 className="font-display text-2xl font-extrabold">{t.name}</h3>
                  <p className="mt-1 text-lg text-ink-soft">{t.pitch}</p>
                </div>
              </div>
              <ul className="space-y-1.5 text-lg">
                {t.inBox.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-6 w-6 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex items-center gap-5 lg:flex-col lg:items-end">
                <p>
                  <span className="font-display text-4xl font-black">${t.from}</span>
                  <span className="text-ink-soft"> a month</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  <Link href={`/sites/${t.id}`} className="btn btn-paper !px-4">
                    More
                  </Link>
                  <a href={startUrl(t)} className="btn btn-ink !px-4">
                    Start
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-6 text-ink-soft">
          Prices are for the starting size, per month. See the{" "}
          <Link href="/pricing" className="font-bold text-ink underline">
            prices page
          </Link>{" "}
          for the details.
        </p>
      </div>
    </section>
  );
}

function WhoItsFor() {
  return (
    <section className="border-t-[2.5px] border-ink bg-paper-2">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
        <h2 className="font-display max-w-3xl text-[clamp(2.4rem,5vw,4.25rem)] leading-[0.95] font-black text-balance">
          Made for every kind of business.
        </h2>
        <ul className="mt-14 grid border-t-[2.5px] border-ink md:grid-cols-2 md:gap-x-12">
          {AUDIENCE_GROUPS.map((g) => (
            <li key={g.id} className="border-b-[2.5px] border-ink">
              <Link href={`/who#${g.id}`} className="group flex items-center justify-between gap-6 py-6">
                <span>
                  <span className="block text-xl font-bold group-hover:underline">{g.name}</span>
                  <span className="mt-1 block text-lg text-ink-soft">{g.line}</span>
                </span>
                <Arrow className="h-7 w-7 shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const FAQ: [string, ReactNode][] = [
  [
    "What is AnyPress?",
    "WordPress, set up and looked after for you. You pick the kind of site you need, we build it with everything already in place, and then we keep it running and save a copy every night.",
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
    "Can I use my own web address?",
    "Yes. Every site starts with a free web address. When you're ready, connect your own, like yourbrand.com. With many domain companies it takes one click.",
  ],
  [
    "Is the site really mine?",
    "Yes. It's your own private website on WordPress, not shared with anyone, and the content is yours. AnyPress itself is open source, so you're not locked in.",
  ],
  ["What if something goes wrong?", "We save a copy of your site every night, so it can be put back the way it was."],
  [
    "I build websites for clients. Can I use AnyPress?",
    <>
      Yes. You can sell AnyPress sites under your own name, at your own prices. See the{" "}
      <Link href="/agencies" className="font-bold underline">
        page for agencies
      </Link>
      .
    </>,
  ],
];

function Faq() {
  return (
    <section id="faq" className="bg-paper">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_1.6fr] lg:py-28">
        <h2 className="font-display text-[clamp(2.4rem,5vw,4.25rem)] leading-[0.95] font-black">Questions.</h2>
        <div className="border-t-[2.5px] border-ink">
          {FAQ.map(([q, a]) => (
            <details key={q} className="group border-b-[2.5px] border-ink py-5">
              <summary className="flex cursor-pointer items-center justify-between gap-6 text-xl font-bold">
                {q}
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-[2.5px] border-ink transition-transform duration-200 group-open:rotate-45">
                  <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M8 2v12M2 8h12" />
                  </svg>
                </span>
              </summary>
              <p className="mt-3 max-w-2xl text-lg leading-8 text-ink-soft">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
