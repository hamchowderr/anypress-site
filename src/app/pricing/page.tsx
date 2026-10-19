import type { Metadata } from "next";
import Link from "next/link";
import { BoxIcon, Check } from "@/components/Drawings";
import { Motion } from "@/components/Motion";
import { CtaBand, PageHero } from "@/components/ui";
import { SITE_TYPES, checkoutUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Prices",
  description: "One monthly price per site, set by what you're building. No cut of your sales.",
};

const EVERY_SITE = [
  "Your own private website, not shared with anyone",
  "A free domain to start with",
  "Use your own domain when you're ready",
  "Email that sends from your own address",
  "The padlock in the address bar, renewed for you",
  "A copy of your site saved every night",
  "Your site's editor, one click from your account",
  "No cut of your sales",
];

const PRICING_FAQ = [
  [
    "Why does a shop cost more than a website?",
    "Shops, bookings and members' areas do more work and send more email, so they need more from the computers they run on. The price follows what the site needs.",
  ],
  [
    "Can I change to a different box later?",
    "Yes, talk to us. Every site is built the same way underneath, so moving up means adding to your site, not starting over.",
  ],
  ["Do you charge a fee on sales?", "No. The card company charges its normal fee on payments, and we add nothing on top."],
  ["How do I cancel?", "From your account, any time."],
];

export default function Pricing() {
  return (
    <>
      <PageHero
        band="orange"
        title="Pay for what you build, not for what you sell."
        lead="One monthly price per site, set by the kind of site it is. These are starting prices, for the starting size."
      />

      <section className="bg-paper">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <ol className="border-t-[2.5px] border-ink">
            {SITE_TYPES.map((t) => (
              <li key={t.id} className="grid gap-6 border-b-[2.5px] border-ink py-8 md:grid-cols-[1.2fr_1.4fr_auto] md:items-center md:gap-10">
                <div className="flex items-start gap-4">
                  <BoxIcon className="h-12 w-12 shrink-0" />
                  <div>
                    <h2 className="font-display text-2xl font-extrabold">{t.name}</h2>
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
                <div className="flex items-center gap-5 md:flex-col md:items-end">
                  <p>
                    <span className="font-display text-5xl font-black">${t.from}</span>
                    <span className="text-ink-soft"> a month</span>
                  </p>
                  {t.itemId ? (
                    <a href={checkoutUrl(t.itemId)} className="btn btn-ink">
                      Start now
                    </a>
                  ) : (
                    <Link href="/contact" className="btn btn-paper">
                      Ask us to set one up
                    </Link>
                  )}
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-ink-soft">Bigger sizes for busier sites are on the way.</p>
        </div>
      </section>

      <section className="border-t-[2.5px] border-ink bg-amber">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-[clamp(2.4rem,5vw,4rem)] leading-[0.95] font-black text-balance">In every box, whatever you pick.</h2>
            <ul className="mt-8 space-y-3">
              {EVERY_SITE.map((x) => (
                <li key={x} className="flex items-start gap-3 text-lg font-bold">
                  <Check className="mt-0.5 h-6 w-6 shrink-0" />
                  {x}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border-[2.5px] border-ink bg-paper p-6 text-ink sm:p-10">
            <Motion name="box-opens" label="A box opening with a finished website rising out of it" />
          </div>
        </div>
      </section>

      <section className="border-t-[2.5px] border-ink bg-paper">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_1.6fr]">
          <h2 className="font-display text-[clamp(2.4rem,5vw,4rem)] leading-[0.95] font-black">Price questions.</h2>
          <div className="border-t-[2.5px] border-ink">
            {PRICING_FAQ.map(([q, a]) => (
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

      <CtaBand title="Not sure which one?" body="Tell us what you're building and we'll point you to the right box." href="/contact" label="Ask us" />
    </>
  );
}
