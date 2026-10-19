import type { Metadata } from "next";
import Link from "next/link";
import { Accent, CtaBand, PageHero } from "@/components/ui";
import { SITE_TYPES, checkoutUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pricing",
  description: "One monthly price per site, by what you're building. No cut of your sales.",
};

const EVERY_PLAN = [
  "Its own WordPress and database",
  "Free .anypress.site address",
  "Connect your own domain",
  "Email from your own domain",
  "SSL certificate, renewed for you",
  "Nightly backups and restore",
  "One-click sign-in to WordPress",
  "No cut of your sales",
];

const PRICING_FAQ = [
  [
    "Why does a store cost more than a website?",
    "Stores, bookings and communities run heavier tools and send more email, and their pages can't be cached the way a blog's can. The price follows what the site needs.",
  ],
  [
    "Can I change my site type later?",
    "Talk to us. Every site type is the same WordPress underneath, so moving up means adding tools, not starting over.",
  ],
  [
    "Are there transaction fees?",
    "Not from us. Stripe charges its normal card fee on payments; AnyPress adds nothing on top.",
  ],
  [
    "How do I cancel?",
    "From your account on the AnyPress shop, any time.",
  ],
];

export default function Pricing() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title={
          <>
            Pay for what you build. <Accent>Not</Accent> for what you sell.
          </>
        }
        lead="One monthly price per site, set by the kind of site it is. Every plan is a complete WordPress with the tools for that job installed."
      />

      <section className="band-paper py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {SITE_TYPES.map((t) => {
              const dark = t.id === "everything";
              return (
                <article
                  key={t.id}
                  className={`relative flex flex-col rounded-3xl border p-6 ${
                    dark ? "border-transparent bg-ink text-on-ink lg:-my-4 lg:py-10" : "border-paper-line bg-white"
                  }`}
                >
                  {dark && (
                    <span className="bg-ribbon absolute -top-3 left-6 rounded-full px-3 py-1 text-xs font-bold text-ink">
                      Every tool
                    </span>
                  )}
                  <h2 className="font-display text-2xl font-bold">{t.name}</h2>
                  <p className="mt-5">
                    <span className="text-sm opacity-60">from</span>{" "}
                    <span className="font-display text-5xl font-extrabold">${t.from}</span>
                    <span className="text-sm opacity-60">/mo</span>
                  </p>
                  <p className={`mt-4 text-sm leading-6 ${dark ? "text-on-ink-muted" : "text-on-paper-muted"}`}>
                    {t.pitch}
                  </p>
                  <ul className="mt-6 flex-1 space-y-2 text-sm">
                    {t.tools.map((tool) => (
                      <li key={tool} className="flex gap-2">
                        <span aria-hidden className="text-orange">
                          ✓
                        </span>
                        {tool}
                      </li>
                    ))}
                  </ul>
                  {t.itemId ? (
                    <a href={checkoutUrl(t.itemId)} className="btn btn-ribbon mt-8 w-full">
                      Start now
                    </a>
                  ) : (
                    <span
                      className={`mt-8 rounded-full border px-4 py-3 text-center text-sm ${
                        dark ? "border-ink-line text-on-ink-muted" : "border-paper-line text-on-paper-muted"
                      }`}
                    >
                      Opening soon
                    </span>
                  )}
                  <Link href={`/sites/${t.id}`} className="mt-3 text-center text-sm underline-offset-4 hover:underline">
                    What&apos;s included
                  </Link>
                </article>
              );
            })}
          </div>
          <p className="mt-10 text-center text-sm text-on-paper-muted">
            Starting prices for one site. Bigger sizes for busier sites are on the way.
          </p>
        </div>
      </section>

      <section className="grain relative py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2">
          <div>
            <p className="eyebrow">In every plan</p>
            <h2 className="font-display mt-4 text-5xl leading-[0.95] font-extrabold">
              The boring parts, <span className="text-ribbon">handled.</span>
            </h2>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {EVERY_PLAN.map((x) => (
              <li key={x} className="flex items-center gap-3 rounded-2xl border border-ink-line bg-ink-2 px-4 py-4">
                <span className="bg-ribbon flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-ink">
                  ✓
                </span>
                {x}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="band-paper py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.6fr]">
          <h2 className="font-display text-5xl leading-[0.95] font-extrabold">
            Pricing <Accent tone="rust">questions.</Accent>
          </h2>
          <div className="divide-y divide-paper-line border-y border-paper-line">
            {PRICING_FAQ.map(([q, a]) => (
              <details key={q} className="group py-5">
                <summary className="font-display flex cursor-pointer list-none items-center justify-between gap-6 text-xl font-bold [&::-webkit-details-marker]:hidden">
                  {q}
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-paper-line text-lg transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 max-w-2xl leading-7 text-on-paper-muted">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title="Not sure which one?" body="Tell us what you're building and we'll point you to the right site type." href="/contact" label="Ask us" />
    </>
  );
}
