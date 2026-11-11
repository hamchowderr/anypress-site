import type { Metadata } from "next";
import Link from "next/link";
import { LeadForm } from "@/components/LeadForm";
import { PageHero, Questions, SectionHead } from "@/components/ui";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  path: "/beta",
  title: "Join the AnyPress beta",
  description:
    "A better WordPress experience with the Fluent plugins: many sites in one place, only the plugins you need, no server to tune, email that lands, and your site moved in.",
});

// The questions Fluent users ask most, and what AnyPress does about each.
const POINTS: [string, string][] = [
  [
    "Many sites, one place",
    "Create, back up, restore and connect domains for every site from one dashboard, with your team. Updates are tested before they reach your sites, and one AI connector works across all of them.",
  ],
  [
    "Only the plugins you need",
    "Pick what you're building (a website, bookings, an online store, a community with courses, or all of it) and those Fluent plugins are turned on, already connected.",
  ],
  ["No server to size or tune", "We host it, or we set it up on your own server."],
  ["Email that lands", "Your mail domain and FluentCRM sending are set up before your first member joins."],
  [
    "Bring your site with you",
    "WooCommerce into FluentCart, and BuddyPress, LearnDash and Circle (with courses) into FluentCommunity.",
  ],
  [
    "Sell it as your own",
    "If you build Fluent sites for clients, offer them under your brand. Your Fluent Pro licences work on it like on any WordPress site.",
  ],
];

export default function Beta() {
  return (
    <>
      <PageHero
        drawing="everything"
        eyebrow="Beta"
        title="A better WordPress experience with the Fluent plugins."
        lead="Finished WordPress sites with hosting, plugins, email and updates handled as one package. The beta opens on 12 November."
      >
        <div className="mt-9 flex flex-wrap gap-3">
          <a href="#join" className="btn btn-ink">
            Join the beta
          </a>
          <Link href="/try?type=community" className="btn btn-paper">
            Try it in your browser
          </Link>
        </div>
      </PageHero>

      <section className="border-y border-line bg-paper-2">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <SectionHead title="What you get." />
          <ul className="mt-10 grid border-t border-line md:grid-cols-2 md:gap-x-14">
            {POINTS.map(([title, body]) => (
              <li key={title} className="border-b border-line py-7">
                <h3 className="font-display text-xl font-semibold">{title}</h3>
                <p className="mt-2 leading-7 text-ink-soft">{body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="join" className="scroll-mt-20">
        <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
          <SectionHead
            left
            title="Join the beta."
            lead="Tell us what you'd build. We'll email you when your place is ready, and you can reply with any question."
          />
          <LeadForm
            source="community"
            cta="Join the beta"
            note="One email to confirm, then your beta invite. Unsubscribe any time."
          />
        </div>
      </section>

      <section className="border-t border-line bg-paper-2">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <SectionHead title="Questions." />
          <div className="mt-10">
            <Questions
              items={[
                [
                  "Can I try it before the beta?",
                  <>
                    Yes.{" "}
                    <Link href="/designs" className="font-semibold text-ink underline">
                      Open any design as a full site
                    </Link>{" "}
                    in your browser with WordPress Playground. Nothing is installed and nothing is saved.
                  </>,
                ],
                [
                  "Can it run on my own server?",
                  <>
                    Yes. We host it, or{" "}
                    <Link href="/self-host" className="font-semibold text-ink underline">
                      set it up on your server
                    </Link>
                    .
                  </>,
                ],
                [
                  "I build sites for clients. Is there a way to resell?",
                  <>
                    Yes. Sellers and resellers offer AnyPress sites under their own brand.{" "}
                    <Link href="/resellers" className="font-semibold text-ink underline">
                      See how it works
                    </Link>
                    .
                  </>,
                ],
                [
                  "What does it cost?",
                  <>
                    Plans start at $12 a month.{" "}
                    <Link href="/pricing" className="font-semibold text-ink underline">
                      See pricing
                    </Link>
                    .
                  </>,
                ],
              ]}
            />
          </div>
        </div>
      </section>
    </>
  );
}
