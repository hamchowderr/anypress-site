import type { Metadata } from "next";
import Link from "next/link";
import { type Problem, ProblemFix } from "@/components/ProblemFix";
import { CtaBand, PageHero, Questions, SectionHead } from "@/components/ui";
import { AFFILIATE_URL, CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Affiliate program",
  description:
    "Recommend AnyPress and earn 30% of every new customer's first payment. Free to join, paid by PayPal.",
};

// The program's terms in one place, so the page and the fine print can't disagree.
const RATE = "30%";
const COOKIE_DAYS = 30;
const MIN_PAYOUT = "$50";

const FLOW = [
  [
    "Sign up",
    "with your name, email and PayPal address. We approve new affiliates by hand, usually within a day.",
  ],
  [
    "Share your link",
    "on your site, in your videos, with your clients. Anyone who buys within 30 days counts as yours.",
  ],
  [
    "They buy a plan",
    `and you earn ${RATE} of what they pay up front, monthly or yearly.`,
  ],
  [
    "You get paid",
    `by PayPal at the start of each month, once you've earned ${MIN_PAYOUT}.`,
  ],
];

const EXAMPLES = [
  ["Website, monthly", "$12", "$3.60"],
  ["Store, monthly", "$29", "$8.70"],
  ["Everything, monthly", "$79", "$23.70"],
  ["Store, yearly", "$290", "$87"],
  ["Everything, yearly", "$790", "$237"],
];

const FINE_PRINT: [string, string][] = [
  [
    "What counts as a sale?",
    `Any plan or email pack someone buys within ${COOKIE_DAYS} days of clicking your link. If they clicked someone else's link after yours, the later link gets the sale.`,
  ],
  [
    "What's the commission worked out on?",
    `${RATE} of the amount actually paid, after any discount and before tax. Renewals aren't included.`,
  ],
  [
    "What if they ask for a refund?",
    "If the customer is refunded, the commission on that sale is cancelled. We hold each commission for 30 days, the length of our money-back promise, before it can be paid.",
  ],
  [
    "Can I buy through my own link?",
    "No. Your own purchases don't earn commission.",
  ],
  [
    "Is there anything I can't do?",
    "Don't bid on the AnyPress name in search ads, send spam, or promise things we don't offer. We may close accounts that do, and unpaid commission from those sales isn't paid.",
  ],
  [
    "When do payouts go out?",
    `At the start of each month, by PayPal, once your approved balance reaches ${MIN_PAYOUT}. Smaller balances roll over to the next month.`,
  ],
  [
    "Can these terms change?",
    `We'll give you 30 days' notice by email before we change the rate or terms. Questions? Email ${CONTACT_EMAIL}.`,
  ],
];

const WHO = [
  "Bloggers and video makers",
  "Web designers",
  "Coaches and teachers",
  "Anyone people ask about websites",
];

const PROBLEMS: Problem[] = [
  {
    problem: [
      "People ask you where to make a website",
      "You want to point them somewhere that won't leave them stuck with setup and upkeep.",
    ],
    fix: [
      "A site that's looked after",
      "Every AnyPress plan is set up for them, with security fixes and a copy saved every night.",
    ],
  },
  {
    problem: [
      "Hard to tell what you'll earn",
      "Commission tables full of tiers and conditions make it hard to know what one recommendation is worth.",
    ],
    fix: [
      `${RATE} of the first payment`,
      "On every plan, monthly or yearly. The examples below show what one sale pays.",
    ],
  },
  {
    problem: [
      "Payouts that take months",
      "Some programs hold your money until you reach a high threshold or a long payment cycle.",
    ],
    fix: [
      "Paid every month",
      `By PayPal at the start of each month, once you've earned ${MIN_PAYOUT}.`,
    ],
  },
  {
    problem: [
      "Writing about it from scratch",
      "Finding the right words, links and images for a product you don't run yourself takes time.",
    ],
    fix: [
      "A ready-made kit",
      <>
        Copy, links and images are in the{" "}
        <Link href="/affiliates/kit">affiliate kit</Link>.
      </>,
    ],
  },
];

export default function Affiliates() {
  return (
    <>
      <PageHero
        drawing="coins"
        eyebrow="Affiliate program"
        title={`Recommend AnyPress. Earn ${RATE}.`}
        lead={`Share AnyPress with the people you build for, write for or teach. You earn ${RATE} of every new customer's first payment, on every plan.`}
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href={AFFILIATE_URL} className="btn btn-ink">
            Join the program
          </Link>
          <Link href={AFFILIATE_URL} className="btn btn-paper">
            Affiliate sign in
          </Link>
          <Link href="/affiliates/kit" className="btn btn-paper">
            Affiliate kit
          </Link>
        </div>
      </PageHero>

      <ProblemFix
        soft
        who={WHO}
        items={PROBLEMS}
        title="Recommend websites without the headaches."
      />

      <section>
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <SectionHead title="How it works." />
          <ol className="mt-10 grid gap-8 md:grid-cols-4">
            {FLOW.map(([title, sub], i) => (
              <li key={title} className="border-t border-line pt-6">
                <span className="font-display text-sm font-semibold text-accent">
                  Step {i + 1}
                </span>
                <p className="font-display mt-2 text-xl font-semibold">
                  {title}
                </p>
                <p className="mt-1 leading-7 text-ink-soft">{sub}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-y border-line bg-paper-2">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <SectionHead
            title="What you could earn."
            lead="A few examples, for one sale each."
          />
          <div className="card mt-10 max-w-2xl overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-line text-sm text-ink-soft">
                  <th className="px-5 py-3 font-semibold">Plan</th>
                  <th className="px-5 py-3 font-semibold">They pay</th>
                  <th className="px-5 py-3 font-semibold">You earn</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {EXAMPLES.map(([plan, price, earn]) => (
                  <tr key={plan}>
                    <td className="px-5 py-3">{plan}</td>
                    <td className="px-5 py-3 text-ink-soft">{price}</td>
                    <td className="px-5 py-3 font-semibold">{earn}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section id="terms">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <SectionHead title="The fine print." />
          <div className="mt-10">
            <Questions items={FINE_PRINT} />
          </div>
        </div>
      </section>

      <CtaBand
        title="Ready to start earning?"
        body="Joining is free. Once you're approved, your link and your earnings are in your affiliate dashboard."
        href={AFFILIATE_URL}
        label="Join the program"
      />
    </>
  );
}
