import type { Metadata } from "next";
import Link from "next/link";
import { Accent, CtaBand, PageHero } from "@/components/ui";

export const metadata: Metadata = {
  title: "About",
  description: "AnyPress is built by Otaku Solutions, in the open, under the GPL.",
};

const BELIEFS = [
  ["You should own your site.", "It's WordPress, with your data in your own database. If you ever leave, it comes with you."],
  ["Your sales are yours.", "We charge for the site, not a percentage of what you sell on it."],
  ["Every site deserves its own room.", "No shared installs. One site's traffic spike or security problem stays its own."],
  ["Build it in the open.", "The platform is open source, so anyone can check how it works, or run it themselves."],
];

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About AnyPress"
        title={
          <>
            WordPress is the most flexible way to run a business online. We make it <Accent>easy.</Accent>
          </>
        }
        lead="AnyPress is built by Otaku Solutions. We sold WordPress sites on a platform that shut down, so we rebuilt the whole thing ourselves, and this time we built it in the open."
      />

      <section className="band-paper py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <p className="eyebrow">What we believe</p>
          <div className="mt-10 grid gap-x-12 gap-y-14 md:grid-cols-2">
            {BELIEFS.map(([title, body], i) => (
              <div key={title} className="grid grid-cols-[3.5rem_1fr] gap-4">
                <span className="font-display text-ribbon text-5xl leading-none font-extrabold">{i + 1}</span>
                <div>
                  <h2 className="font-display text-3xl leading-tight font-bold">{title}</h2>
                  <p className="mt-3 leading-7 text-on-paper-muted">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grain relative py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center">
          <h2 className="font-display text-5xl leading-[0.95] font-extrabold">
            Open source, <span className="text-ribbon">top to bottom.</span>
          </h2>
          <div className="space-y-3">
            {[
              ["Provisioning API", "Builds, backs up and runs every site", "https://github.com/hamchowderr/waas-provisioning-api"],
              ["WordPress plugins", "The shop that sells sites, and the plugin inside each one", "https://github.com/hamchowderr/waas-plugins"],
              ["Dashboard", "Where partners see and manage their sites", "https://github.com/hamchowderr/waas-dashboard"],
            ].map(([name, what, href]) => (
              <Link
                key={name}
                href={href}
                className="group flex items-center justify-between rounded-2xl border border-ink-line bg-ink-2 px-5 py-4 transition-colors hover:border-orange/60"
              >
                <span>
                  <span className="font-display block text-xl font-bold">{name}</span>
                  <span className="text-sm text-on-ink-muted">{what}</span>
                </span>
                <span className="text-orange transition-transform group-hover:translate-x-1">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
