import type { Metadata } from "next";
import { Arrow } from "@/components/Drawings";
import { CtaBand, PageHero } from "@/components/ui";

export const metadata: Metadata = {
  title: "About",
  description: "Why AnyPress exists, what we believe, and the open source code behind it.",
};

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
      <PageHero
        band="magenta"
        title="WordPress can do anything. We make it easy."
        lead="AnyPress is built by Otaku Solutions. We take the hard parts of WordPress off your plate, so you can get on with your business."
      />

      <section className="bg-paper">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:py-28">
          <h2 className="font-display text-[clamp(2.2rem,4.5vw,3.5rem)] leading-[0.98] font-black text-balance">
            WordPress felt like a giant flea market.
          </h2>
          <div className="space-y-5 text-xl leading-8">
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

      <section className="border-t-[2.5px] border-ink bg-amber">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
          <h2 className="font-display text-[clamp(2.2rem,4.5vw,3.5rem)] leading-[0.98] font-black">What we believe.</h2>
          <ol className="mt-12 grid gap-x-14 gap-y-12 md:grid-cols-2">
            {BELIEFS.map(([title, body], i) => (
              <li key={title} className="grid grid-cols-[4rem_1fr] gap-4">
                <span className="font-display-wide text-6xl leading-none font-black">{i + 1}</span>
                <div>
                  <h3 className="font-display text-2xl leading-tight font-extrabold">{title}</h3>
                  <p className="mt-2 text-lg leading-8">{body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t-[2.5px] border-ink bg-paper">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] leading-[0.98] font-black">The code is open.</h2>
            <p className="mt-5 max-w-md text-lg leading-8 text-ink-soft">
              All of it is public under the GPL license. You don&apos;t need any of this to use AnyPress, but it&apos;s there if you
              want to look.
            </p>
          </div>
          <ul className="border-t-[2.5px] border-ink">
            {CODE.map(([name, what, href]) => (
              <li key={name} className="border-b-[2.5px] border-ink">
                <a href={href} className="group flex items-center justify-between gap-6 py-5">
                  <span>
                    <span className="block text-xl font-bold group-hover:underline">{name}</span>
                    <span className="block text-lg text-ink-soft">{what}</span>
                  </span>
                  <Arrow className="h-7 w-7 shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
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
