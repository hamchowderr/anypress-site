import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "@/components/Icons";
import { PriceCalculator } from "@/components/PriceCalculator";
import { ProblemFix, type Problem } from "@/components/ProblemFix";
import { CtaBand, PageHero, Questions, SectionHead } from "@/components/ui";
import { SITE_TYPES, SIZES, planUrl } from "@/lib/site";
import { faqLd, pageMeta } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = pageMeta({
  path: "/pricing",
  title: "Prices for managed WordPress sites",
  card: "Prices",
  description:
    "One monthly price per WordPress site, from $12, set by what you're building and how big it is. Hosting, email, backups and security included. No cut of your sales.",
});

const EVERY_SITE = [
  "Your own private website, not shared with anyone",
  "A free domain, and your own domain when you're ready",
  "Email that sends from your own address",
  "The padlock in the address bar, renewed for you",
  "A copy saved every night, kept for 7 days, plus weekly copies for 4 weeks",
  "Your site's editor, one click from your account",
  "No cut of your sales",
];

const WHO = ["Small business owners", "Makers and shops", "Coaches and studios", "Course creators", "Chambers, churches and groups"];

const PROBLEMS: Problem[] = [
  {
    problem: ["The price creeps up with add-ons", "A builder plan, then a payments app, a booking app and an email service, each with its own bill."],
    fix: ["One price includes the tools", "Everything your kind of site needs is switched on when it arrives. Nothing extra to buy."],
  },
  {
    problem: ["A cut of every sale", "Some platforms take a percentage of your sales on top of the monthly fee."],
    fix: ["No cut, ever", "You pay one monthly price. The card company's normal fee is the only fee on an order."],
  },
  {
    problem: ["Not sure what size you need", "Pay for too little and the site struggles, too much and you're wasting money."],
    fix: ["Start Small, move up any time", "A bigger size starts right away and you only pay the difference for the rest of the month."],
  },
  {
    problem: ["Several sites add up fast", "Every extra site is another full-price plan."],
    fix: ["Savings from your third site", "10% off every site from 3 sites, 20% from 10 and 30% from 25."],
  },
  {
    problem: ["Afraid of paying for something that doesn't fit", "Some hosts lock you into a year up front with no way back."],
    fix: ["30 days to decide", "Not for you? Get your first payment back within 30 days. Monthly plans cancel any time."],
  },
];

const PRICING_FAQ: [string, string][] = [
  [
    "Why does a shop cost more than a website?",
    "Shops, bookings and members' areas do more work and send more email, so they need more from the computers they run on. The price follows what the site needs.",
  ],
  [
    "Which size do I need?",
    "Start with Small. It suits most new sites. If your site gets busy, move up to Medium or Large and nothing about your site changes except the room it has.",
  ],
  [
    "What happens if I send more email than my size includes?",
    "Your everyday emails, like receipts and booking confirmations, keep sending. Newsletters to your list pause until the next month or until you move up a size.",
  ],
  ["Is there a yearly price?", "Yes. Paying yearly costs ten times the monthly price, so you get two months free."],
  ["Do you charge a fee on sales?", "No. The card company charges its normal fee on payments, and we add nothing on top."],
  ["How do I cancel?", "From your account, any time. Within 30 days of your first payment, you get that payment back."],
];

export default function Pricing() {
  return (
    <>
      <JsonLd data={faqLd(PRICING_FAQ)} />
      <PageHero drawing="piggy" side="owners"
        eyebrow="Prices"
        title="Pay for what you build, not for what you sell."
        lead="One monthly price per site. The kind of site sets the tools it gets, and the size sets how much room it has."
      />

      <section>
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          {/* Phones get one card per kind of site; wider screens get the table. */}
          <ul className="grid gap-4 md:hidden">
            {SITE_TYPES.map((t) => (
              <li key={t.id} className="card p-5">
                <Link href={`/sites/${t.id}`} className="font-semibold hover:underline">
                  {t.name}
                </Link>
                <p className="mt-0.5 text-sm text-ink-soft">{t.pitch}</p>
                <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                  {SIZES.map((s) => (
                    <a key={s.name} href={planUrl(t, s.name)} className="rounded-xl bg-paper-2 px-2 py-3 hover:bg-line">
                      <span className="block text-xs text-ink-soft">{s.name}</span>
                      <span className="mt-1 block">
                        <span className="font-display text-xl font-semibold">${t.from * s.times}</span>
                        <span className="text-xs text-ink-soft">/mo</span>
                      </span>
                    </a>
                  ))}
                </div>
                <a href={planUrl(t)} className="btn btn-ink mt-4 w-full !py-2.5 text-sm">
                  Start<span className="sr-only"> your {t.name.toLowerCase()} site</span>
                </a>
              </li>
            ))}
          </ul>
          <div className="card relative overflow-x-auto max-md:hidden">
            <table className="w-full min-w-[640px] text-left">
              <caption className="sr-only">Monthly price for each kind of site and size</caption>
              <thead>
                <tr className="border-b border-line text-sm text-ink-soft">
                  <th scope="col" className="px-6 py-4 font-medium">
                    Kind of site
                  </th>
                  {SIZES.map((s) => (
                    <th key={s.name} scope="col" className="px-6 py-4 font-medium">
                      {s.name}
                    </th>
                  ))}
                  <th scope="col" className="px-6 py-4">
                    <span className="sr-only">Start</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {SITE_TYPES.map((t) => (
                  <tr key={t.id}>
                    <th scope="row" className="px-6 py-5 font-normal">
                      <Link href={`/sites/${t.id}`} className="font-semibold hover:underline">
                        {t.name}
                      </Link>
                      <span className="mt-0.5 block text-sm text-ink-soft">{t.pitch}</span>
                    </th>
                    {SIZES.map((s) => (
                      <td key={s.name} className="px-6 py-5 whitespace-nowrap">
                        <a href={planUrl(t, s.name)} className="hover:underline" aria-label={`${t.name}, ${s.name}: $${t.from * s.times} a month`}>
                          <span className="font-display text-2xl font-semibold">${t.from * s.times}</span>
                          <span className="text-sm text-ink-soft"> /mo</span>
                        </a>
                      </td>
                    ))}
                    <td className="px-6 py-5 text-right">
                      <a href={planUrl(t)} className="btn btn-ink !px-4 !py-2 text-sm">
                        Start<span className="sr-only"> your {t.name.toLowerCase()} site</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-ink-soft">Monthly prices in US dollars. Pay yearly and get two months free.</p>
        </div>
      </section>

      <section id="calculator" className="sec soft scroll-mt-20" aria-labelledby="h-calc">
        <div className="in">
          <SectionHead
            eyebrow="work it out"
            title="What will it cost?"
            lead="Pick what you're building, the size and how many sites. Three or more sites save 10 to 30% on every one."
            id="h-calc"
          />
          <PriceCalculator />
        </div>
      </section>

      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <SectionHead title="What each size includes." lead="Every kind of site comes in the same three sizes." />
          <ul className="mt-10 grid gap-4 md:grid-cols-3">
            {SIZES.map((s) => (
              <li key={s.name} className="card p-6">
                <h3 className="font-display text-2xl font-semibold">{s.name}</h3>
                <p className="mt-1 text-ink-soft">{s.goodFor}</p>
                <dl className="mt-5 divide-y divide-line border-t border-line text-[15px]">
                  {[
                    ["Computing power", s.cpu],
                    ["Storage", s.storage],
                    ["Emails a month", s.emails],
                    ["Price", s.times === 1 ? "The starting price" : `${s.times}× the starting price`],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-4 py-2.5">
                      <dt className="text-ink-soft">{k}</dt>
                      <dd className="font-medium">{v}</dd>
                    </div>
                  ))}
                </dl>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ProblemFix soft who={WHO} items={PROBLEMS} eyebrow="why it's priced this way" title="Prices that don't surprise you later." />

      <section>
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2">
          <SectionHead left title="On every site, whatever you pick." />
          <ul className="space-y-3">
            {EVERY_SITE.map((x) => (
              <li key={x} className="flex items-start gap-2.5">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                {x}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_1.7fr]">
          <SectionHead left title="Price questions" />
          <Questions items={PRICING_FAQ} />
        </div>
      </section>

      <CtaBand title="Not sure which one?" body="Tell us what you're building and we'll point you to the right site." href="/contact" label="Ask us" />
    </>
  );
}
