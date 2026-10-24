import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand, PageHero, SectionHead } from "@/components/ui";
import { AFFILIATE_URL, AUDIENCE_GROUPS, SHOP_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Affiliate kit",
  description: "Links, ready-to-use words for each kind of business, and the AnyPress logo, for AnyPress affiliates.",
};

// A short recommendation per customer group, written for an affiliate to paste and adjust.
const COPY: Record<string, string> = {
  shops: "AnyPress gives you a real online store on your own domain, set up and looked after for you, with no cut of your sales.",
  regulated: "If you sell supplements or CBD, AnyPress gives you your own store with your own payment account, instead of a marketplace listing.",
  courses: "AnyPress runs your courses and community on your own site for one monthly price. No share of your course sales.",
  chambers: "AnyPress puts a chamber's members, dues and events on one website that nobody on the team has to maintain.",
  churches: "AnyPress gives churches one site for giving, events and small groups, easy enough for any volunteer to update.",
  franchises: "With AnyPress, every location gets its own site from the same starting point, and the price per site drops as you add more.",
  agencies: "AnyPress lets you sell websites as a monthly service under your own name. They build and look after every site.",
  developers: "AnyPress has an API that creates a WordPress site for each of your customers. They run the servers, security fixes and backups.",
};

export default function AffiliateKit() {
  return (
    <>
      <PageHero
        eyebrow="Affiliate kit"
        title="Everything you need to share AnyPress."
        lead="Your link, a few words for each kind of business, and our logo. Use what helps, and say it your way."
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href={AFFILIATE_URL} className="btn btn-ink">
            Get your link
          </Link>
          <Link href="/affiliates" className="btn btn-paper">
            Program terms
          </Link>
        </div>
      </PageHero>

      <section>
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <SectionHead title="Your link." />
          <div className="mt-8 max-w-3xl space-y-4 text-lg leading-8 text-ink-soft">
            <p>
              Sign in to your affiliate dashboard to see your link. It looks like{" "}
              <code className="rounded bg-paper-2 px-1.5 py-0.5 text-ink">{SHOP_URL}/?ref=123</code>, where 123 is your number.
            </p>
            <p>
              You can add <code className="rounded bg-paper-2 px-1.5 py-0.5 text-ink">?ref=123</code> to the end of any page on{" "}
              {SHOP_URL.replace(/^https?:\/\//, "")}, such as a plan&apos;s page, and the sale still counts as yours.
            </p>
            <p>
              Sharing in several places? Add a name for each one, like{" "}
              <code className="rounded bg-paper-2 px-1.5 py-0.5 text-ink">&amp;utm_campaign=youtube-oct</code>, so you can tell
              which one works best. Use lowercase words joined by dashes.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-paper-2">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <SectionHead title="Words for each kind of business." lead="Copy one, change it to sound like you, and only say what's true for you." />
          <ul className="mt-10 divide-y divide-line border-y border-line">
            {AUDIENCE_GROUPS.map((g) => (
              <li key={g.id} className="grid gap-3 py-6 md:grid-cols-[1fr_2fr] md:gap-10">
                <span className="font-semibold">{g.name}</span>
                <p className="leading-7 text-ink-soft">{COPY[g.id] ?? g.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <SectionHead title="Logo." lead="Use it as it is: don't stretch it, recolour it or put it on a busy background." />
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="/logo.svg" download className="btn btn-paper">
              Download the logo (SVG)
            </a>
            <a href="/logo-mark.svg" download className="btn btn-paper">
              Download the mark (SVG)
            </a>
          </div>
          <p className="mt-8 max-w-3xl leading-7 text-ink-soft">
            Please don&apos;t bid on the AnyPress name in search ads, send email to people who didn&apos;t ask for it, or promise
            things we don&apos;t offer. The full rules are on the{" "}
            <Link href="/affiliates" className="font-semibold text-ink underline">
              program page
            </Link>
            .
          </p>
        </div>
      </section>

      <CtaBand title="Not an affiliate yet?" body="It's free to join. You earn 30% of every new customer's first payment." href={AFFILIATE_URL} label="Join the program" />
    </>
  );
}
