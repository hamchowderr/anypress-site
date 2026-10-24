import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { Drawing, type DrawingName } from "@/components/Drawing";
import { Tick } from "@/components/Tick";
import { CtaBand, PageHero, Questions, SectionHead } from "@/components/ui";
import { CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Move your site",
  description: "Bring your current WordPress site to AnyPress with a free plugin and a code. Your old site isn't changed, and everything comes across.",
};

const STEPS: [DrawingName, string, ReactNode][] = [
  ["ticket", "Get your code", "We give you an import code that starts with AP1. It works for 7 days."],
  ["plug", "Add our free plugin", "Install AnyPress Export on your current site, the same way you add any plugin."],
  ["truck", "Send it across", "Paste the code and press send. Keep the page open while it uploads."],
  ["open", "Check it, then switch", "Look over your site on its new address, then point your domain at it."],
];

const MOVES: [DrawingName, string, string][] = [
  ["words", "Every page and post", "Your whole database: pages, posts, products, orders, customers and settings."],
  ["paint", "Your look", "Your themes, plugins, photos, files and languages."],
  ["lock", "Your old site, untouched", "Nothing on your current site is changed or deleted. It keeps running until you switch."],
];

const FAQ: [string, ReactNode][] = [
  [
    "How do I get an import code?",
    <>
      Pick your plan, then email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> with your current site&apos;s address and we&apos;ll
      send you a code. Selling sites with AnyPress? You make codes yourself from your dashboard.
    </>,
  ],
  ["Is my site down while it moves?", "No. Your current site keeps running the whole time. Visitors only reach the new one once you point your domain at it."],
  [
    "What if the page closes halfway?",
    "Open it again and it carries on where it stopped. Big sites can take a while, so it's fine to leave it running.",
  ],
  [
    "What doesn't come across?",
    "Caches and backup plugins' archives are left out, because your AnyPress site has its own. Caching add-ons your old host put in place are removed for the same reason.",
  ],
  [
    "My site is bigger than my plan's storage.",
    "The plugin tells you before it starts. Pick a bigger size and start again with a new code.",
  ],
  [
    "Can I move a multisite network?",
    "Not yet. The plugin moves one WordPress site at a time. If you run a network, talk to us about your options.",
  ],
  [
    "Does my site need anything special?",
    "WordPress 5.6 or newer and PHP 7.4 or newer, which almost every host has, plus enough free space for a compressed copy of the site.",
  ],
];

export default function Move() {
  return (
    <>
      <PageHero
        side="owners"
        drawing="truck"
        eyebrow="move your site"
        title={
          <>
            Bring your WordPress site <mark>with you</mark>.
          </>
        }
        lead="Already have a WordPress site somewhere else? Move it to AnyPress with a free plugin and a code. Everything comes across, and your old site isn't touched."
      >
        <div className="ctas mt-8">
          <Link href="/pricing" className="btn btn-ink">
            Pick a plan →
          </Link>
          <a href={`mailto:${CONTACT_EMAIL}?subject=Moving%20my%20site%20to%20AnyPress`} className="btn btn-paper">
            Ask about moving
          </a>
        </div>
        <ul className="checks">
          <li>
            <Tick />
            Free plugin
          </li>
          <li>
            <Tick />
            No downtime
          </li>
          <li>
            <Tick />
            Old site left as it is
          </li>
        </ul>
      </PageHero>

      <section className="sec soft">
        <div className="in">
          <SectionHead eyebrow="how it works" title="Four steps, about as hard as adding a plugin." />
          <ol className="flow !mt-0">
            {STEPS.map(([d, title, body], i) => (
              <li key={title}>
                <Drawing name={d} />
                <b>
                  {i + 1}. {title}
                </b>
                <span>{body}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="sec in">
        <SectionHead eyebrow="what comes across" title="Everything that makes it your site." />
        <div className="yours !grid-cols-1 md:!grid-cols-3">
          {MOVES.map(([d, title, body]) => (
            <div key={title}>
              <Drawing name={d} />
              <h3>{title}</h3>
              <p>{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="sec in !pt-0">
        <div className="sell">
          <Drawing name="agency" />
          <div>
            <span className="eyebrow">selling sites?</span>
            <h2>Move your clients&apos; sites in from your dashboard.</h2>
            <p>
              Choose <b className="text-white">Move a site in</b> on your Stores page. It sets up a store that waits for the site and gives
              you the code to hand to your client, or to use yourself.
            </p>
            <p>Developers can do the same with one command, with no time limit on big sites.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link className="btn btn-honey" href="/agencies">
                How selling works →
              </Link>
              <Link className="btn border-white/40 text-white hover:bg-white/10" href="/developers">
                For developers
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="sec soft">
        <div className="in">
          <SectionHead drawing="question" title="Questions about moving" />
          <Questions items={FAQ} firstOpen />
        </div>
      </section>

      <CtaBand
        eyebrow="ready to move?"
        title="Your site, without the old hassle."
        body="Pick a plan, then we'll send your code. Your site keeps running until you switch."
        href="/pricing"
        label="Pick a plan"
        drawings={["truck", "box", "open"]}
      />
    </>
  );
}
