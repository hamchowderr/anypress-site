import type { Metadata } from "next";
import { Arrow } from "@/components/Icons";
import { CtaBand, PageHero, SectionHead } from "@/components/ui";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  path: "/about",
  title: "About AnyPress",
  description:
    "AnyPress is managed WordPress for small businesses: sites set up for you and looked after every day. What we believe, and the open source code behind it.",
});

const BELIEFS = [
  ["Building a website shouldn't be hard.", "WordPress can do almost anything. Getting there shouldn't take a weekend of hunting for parts."],
  ["Your site is yours.", "It runs on WordPress, with your content in your own private website. If you ever leave, it comes with you."],
  ["Your sales are yours.", "We charge for the site, not a share of what you sell on it."],
  ["Build it in the open.", "Everything behind AnyPress is open source, so anyone can check how it works."],
];

const CODE = [
  ["The engine", "Builds, saves and runs every site", "https://github.com/hamchowderr/waas-provisioning-api"],
  ["The WordPress plugins", "The shop that sells sites, and the helper inside each one", "https://github.com/hamchowderr/waas-plugins"],
  ["The partner dashboard", "Where partners see and manage their sites", "https://github.com/hamchowderr/waas-dashboard"],
];

export default function About() {
  return (
    <>
      <PageHero drawing="note"
        eyebrow="About"
        title="WordPress can do anything. We make it easy."
        lead="AnyPress is built by Otaku Solutions. We take the hard parts of WordPress off your plate, so you can get on with your business."
      />

      <section>
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2">
          <SectionHead left title="WordPress can feel like a giant flea market." />
          <div className="space-y-5 text-lg leading-8 text-ink-soft">
            <p>
              There are thousands of add-ons, and nobody tells you which ones fit together. Then there&apos;s hosting, the padlock,
              backups and email to sort out before you sell a single thing.
            </p>
            <p>
              So we picked the parts, fitted them together, and made the whole thing something you order instead of something you
              build. Pick the kind of site you need, and it arrives ready.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-paper-2">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <SectionHead title="What we believe." />
          <ol className="mt-10 grid gap-4 md:grid-cols-2">
            {BELIEFS.map(([title, body], i) => (
              <li key={title} className="card p-6">
                <span className="font-display text-sm font-semibold text-accent">{i + 1}</span>
                <h3 className="font-display mt-1 text-xl font-semibold">{title}</h3>
                <p className="mt-2 leading-7 text-ink-soft">{body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section>
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2">
          <SectionHead
            left
            title="The code is open."
            lead="All of it is public under the GPL license. You don't need any of this to use AnyPress, but it's there if you want to look."
          />
          <ul className="border-t border-line">
            {CODE.map(([name, what, href]) => (
              <li key={name} className="border-b border-line">
                <a href={href} className="group flex items-center justify-between gap-6 py-5">
                  <span>
                    <span className="block font-semibold">{name}</span>
                    <span className="mt-0.5 block text-ink-soft">{what}</span>
                  </span>
                  <Arrow className="h-5 w-5 shrink-0 text-ink-soft transition-transform duration-200 group-hover:translate-x-1" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
