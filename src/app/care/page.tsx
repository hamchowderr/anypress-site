import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand, PageHero, Questions, SectionHead } from "@/components/ui";
import {
  CARE_EXTRA_HOUR,
  CARE_FROM,
  CARE_MONTHS_FREE,
  CARE_PACKAGES,
  CARE_SERVICES,
  type CarePackage,
  ONE_HOUR,
  careTime,
  dollars,
} from "@/lib/care";
import { pageMeta } from "@/lib/seo";
import { CARE_ADD_URL, CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  path: "/care",
  title: "Care for your website",
  description:
    "Monthly time for changes to your AnyPress website, requests answered by email, and one-time help to set up or move in your site.",
});

// Who each package is for, and what it adds beyond its time and answer time.
const ABOUT: Record<string, { who: string; adds: string[] }> = {
  care: { who: "For owners who mostly run the site themselves and want someone on call.", adds: [] },
  "care-plus": { who: "For a business adding pages, products or courses most months.", adds: ["Set-up jobs included"] },
  "care-pro": { who: "For a busy community, shop or course business.", adds: ["A 30-minute planning call each month"] },
};

function points(p: CarePackage): string[] {
  return [
    `${careTime(p.minutes)} of changes a month`,
    `Answered within ${p.answer}`,
    ...(ABOUT[p.key]?.adds ?? []),
    "A monthly report of what we did",
  ];
}

const SERVICE_ABOUT: Record<string, string> = {
  "set-up-my-site": "We fill in your pages, logo, colours, menus and first products, courses or spaces from what you send us.",
  "move-my-site-in": "We run the move from WordPress, Circle, LearnDash, Tutor LMS, LifterLMS, MemberPress or WooCommerce, then check it.",
  "one-hour": "For a one-off change, with no package. The hour is added to your website and used as you ask.",
};

const HOW: [string, string][] = [
  [
    "Add it to your website",
    "Pick a package right after you buy your plan, or any time later from the website's card in your account. Checkout takes a minute.",
  ],
  [
    "Your time is ready",
    "Your package's time for this month is there as soon as you pay, and starts again on the 1st of each month.",
  ],
  [
    "Send requests, we make the changes",
    "Write what you need on the website's card in your account. We log the time each change takes, and the card shows what's left this month.",
  ],
];

const TERMS: string[] = [
  "Care is for one website: the one you add it to. Each website needs its own package.",
  "Your monthly time starts again on the 1st of each month. Unused time doesn't carry over.",
  `When a month's time runs out, an extra hour is ${CARE_EXTRA_HOUR ? dollars(CARE_EXTRA_HOUR.price) : ""} with a care package, or ${ONE_HOUR ? dollars(ONE_HOUR.price) : ""} without one. Hours you buy never expire and are used after the month's time.`,
  "Answer times count business days, Monday to Friday. We answer by email; the change itself may take longer for bigger jobs, and we tell you when.",
  `A year of care costs ${12 - CARE_MONTHS_FREE} months, so ${CARE_MONTHS_FREE} months are free.`,
  "Care renews on its own and you can cancel it any time from your account. It ends when the website's plan ends.",
  "Care isn't refunded for days your website is offline or paused.",
  "Care is paid by card.",
];

export default function Care() {
  return (
    <>
      <PageHero
        drawing="lifebuoy"
        side="owners"
        eyebrow="Care"
        title={
          <>
            Changes to your site, made for you every month. <mark>Just email us what you need</mark>.
          </>
        }
        lead={`A new page, a new price, a photo swapped or a form changed: email us and we'll do it, with time set aside for you every month. From ${dollars(CARE_FROM)} a month, on any AnyPress website.`}
      >
        <div className="mt-9 flex flex-wrap gap-3">
          <a href={CARE_ADD_URL} className="btn btn-ink">
            Add care to my website
          </a>
          <Link href="/#sites" className="btn btn-paper">
            Start a website
          </Link>
        </div>
      </PageHero>

      <section>
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <SectionHead
            title="Three packages."
            lead="Each one is a set amount of time for changes every month. Pick the one that fits how often your site changes."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {CARE_PACKAGES.map((p) => (
              <div key={p.key} className="flex flex-col rounded-2xl border border-line bg-paper p-6">
                <h3 className="font-display text-xl font-semibold">{p.name}</h3>
                <p className="mt-1">
                  <span className="font-display text-3xl font-semibold text-accent">{dollars(p.monthly)}</span>{" "}
                  <span className="text-ink-soft">a month</span>
                </p>
                <p className="text-[15px] text-ink-soft">
                  or {dollars(p.yearly)} a year, {CARE_MONTHS_FREE} months free
                </p>
                <p className="mt-3 leading-7 text-ink-soft">{ABOUT[p.key]?.who}</p>
                <ul className="mt-4 space-y-2 border-t border-line pt-4 text-[15px] leading-6 text-ink-soft">
                  {points(p).map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <a href={CARE_ADD_URL} className="btn btn-paper mt-6 self-start">
                  Add {p.name}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-paper-2">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <SectionHead title="One-time help." lead="No package needed. Each is paid once, from the website's card in your account." />
          <ul className="mt-10 grid border-t border-line md:grid-cols-3 md:gap-x-10">
            {CARE_SERVICES.map((s) => (
              <li key={s.key} className="border-b border-line py-7">
                <h3 className="font-display text-xl font-semibold">{s.name}</h3>
                <p className="mt-1 font-semibold text-accent">{dollars(s.price)}</p>
                <p className="mt-2 leading-7 text-ink-soft">{SERVICE_ABOUT[s.key]}</p>
              </li>
            ))}
          </ul>
          {CARE_EXTRA_HOUR && (
            <p className="mt-8 leading-7 text-ink-soft">
              With a care package, an extra hour is {dollars(CARE_EXTRA_HOUR.price)}, bought straight from the website&apos;s card in your account.
            </p>
          )}
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <SectionHead title="How it works." />
          <ol className="mt-10 grid gap-5 md:grid-cols-3">
            {HOW.map(([title, body], i) => (
              <li key={title} className="rounded-2xl border border-line bg-paper p-6">
                <span className="font-display text-3xl font-semibold text-accent">{i + 1}</span>
                <h3 className="mt-3 font-display text-xl font-semibold">{title}</h3>
                <p className="mt-2 leading-7 text-ink-soft">{body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-y border-line bg-paper-2">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <SectionHead
            id="terms"
            title="Care terms."
            lead={
              <>
                These add to our <Link href="/terms" className="underline">Terms of Service</Link> and{" "}
                <Link href="/refund-policy" className="underline">Refund Policy</Link>.
              </>
            }
          />
          <ul className="mx-auto mt-10 max-w-3xl space-y-4 text-lg leading-8 text-ink-soft">
            {TERMS.map((term) => (
              <li key={term} className="border-b border-line pb-4">
                {term}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <SectionHead title="Questions." />
          <div className="mt-10">
            <Questions
              items={[
                [
                  "What counts as a change?",
                  "Anything on your website: new pages and text, photos, products, courses, menus, forms, emails, settings, and fixing something that broke.",
                ],
                [
                  "Can I change packages?",
                  "Yes. Write to us and we move your website to the other package.",
                ],
                [
                  "Not sure which one fits?",
                  <>
                    Write to us at{" "}
                    <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold text-ink underline">
                      {CONTACT_EMAIL}
                    </a>{" "}
                    with what you&apos;d like done, and we&apos;ll tell you which package fits.
                  </>,
                ],
                [
                  "Do I need care?",
                  "No. Your plan already includes hosting, nightly backups and help when something isn't working: reply to any of our emails or open a support ticket from your site. Care is for when you'd like us to make the changes for you.",
                ],
                [
                  "Who makes the changes?",
                  <>
                    Our own team. Ask us anything first at{" "}
                    <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold text-ink underline">
                      {CONTACT_EMAIL}
                    </a>
                    .
                  </>,
                ],
              ]}
            />
          </div>
        </div>
      </section>

      <CtaBand
        title="Want us to look after it?"
        body="Add a package from your account, right after your plan or any time later."
        href={CARE_ADD_URL}
        label="Add care to my website"
      />
    </>
  );
}
