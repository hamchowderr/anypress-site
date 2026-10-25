import type { Metadata } from "next";
import Link from "next/link";
import { Drawing } from "@/components/Drawing";
import { CtaBand, PageHero, SectionHead } from "@/components/ui";
import { AUDIENCE_GROUPS, SITE_TYPES, VOLUME_TIERS, WHOLESALE_PERCENT, groupUrl, type AudienceGroup } from "@/lib/site";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  path: "/who",
  title: "Who AnyPress is for",
  description: "Shops, educators, chambers, churches, franchises, agencies and software teams all build on AnyPress. See who it's for, what it fixes and which site fits.",
});

const OWNERS = AUDIENCE_GROUPS.filter((g) => g.side === "owners");
const TECHNICAL = AUDIENCE_GROUPS.filter((g) => g.side === "technical");

// The three ways to have an AnyPress account, side by side. Sellers and resellers both sign in to the partner dashboard.
const ACCOUNTS: [string, string, string, string][] = [
  ["Who it's for", "A business that wants a website of its own", "Freelancers, agencies and groups selling sites under one name", "Agencies, franchises, hosts and software companies with several brands"],
  ["How you start", "Pick a site and pay. It's ready in minutes.", "Apply on Sell websites. We approve you and set up your storefront.", "Apply to be a reseller. We talk it through and approve you."],
  ["How you pay", "Monthly or yearly, for each site", `Per site, as you sell. ${VOLUME_TIERS[0].percent} to ${VOLUME_TIERS[VOLUME_TIERS.length - 1].percent}% off from ${VOLUME_TIERS[0].sites} sites`, `One bill a month, ${WHOLESALE_PERCENT}% off every site`],
  ["Whose name customers see", "Yours", "Yours, on one storefront", "Yours, on a storefront for each brand"],
  ["Where you sign in", "Sign in, here on anypress.io", "The partner dashboard", "The partner dashboard"],
];

export default function Who() {
  return (
    <>
      <PageHero
        drawing="pick"
        eyebrow="who it's for"
        title="Who AnyPress is for."
        lead="Two kinds of people use AnyPress. Most want a website for their own business. Others sell websites to their clients, or create them from their own software. Find yourself below."
      >
        <div className="ctas mt-4 justify-center">
          <Link href="#owners" className="btn btn-ink">
            A website for my business ↓
          </Link>
          <Link href="#technical" className="btn btn-paper">
            I sell or build websites ↓
          </Link>
        </div>
      </PageHero>

      <section id="owners" className="sec soft scroll-mt-20">
        <div className="in">
          <SectionHead
            eyebrow="a website for your business"
            title="Businesses that use AnyPress."
            lead="Each of these gets a finished WordPress site that's set up for them and looked after every day. Here's who they are, what usually gets in the way, and which site fits."
          />
          <GroupList groups={OWNERS} fitsLabel="Sites that fit" />
          <p className="mt-10 text-center text-ink-soft">
            Not on the list? Anyone who needs a website can use AnyPress. Start from{" "}
            <Link href="/#sites" className="font-semibold text-ink underline">
              what your site needs to do
            </Link>
            .
          </p>
        </div>
      </section>

      <section id="technical" className="sec scroll-mt-20">
        <div className="in">
          <SectionHead
            eyebrow="selling or building websites"
            title="People who sell websites, or build them into a product."
            lead="We host and look after every site. You choose the price, your name is on it, and your customers deal with you."
          />
          <GroupList groups={TECHNICAL} fitsLabel="Sites they sell most" />

          <h3 className="mt-20 text-center font-display text-[clamp(1.6rem,3vw,2.2rem)] font-semibold leading-tight">Which account do I need?</h3>
          <div className="compare even mt-8">
            <div className="tablewrap" tabIndex={0} role="region" aria-label="AnyPress accounts compared">
              <table>
                <thead>
                  <tr>
                    <th scope="col">
                      <span className="sr-only">Question</span>
                    </th>
                    <th scope="col">Website owner</th>
                    <th scope="col">
                      <Link href="/sell" className="underline">
                        Seller
                      </Link>
                    </th>
                    <th scope="col">
                      <Link href="/resellers" className="underline">
                        Reseller
                      </Link>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {ACCOUNTS.map(([row, owner, seller, reseller]) => (
                    <tr key={row}>
                      <th scope="row">{row}</th>
                      <td>{owner}</td>
                      <td>{seller}</td>
                      <td>{reseller}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="mt-6 text-center text-ink-soft">
            Creating sites from your own app? Read the{" "}
            <Link href="/developers" className="font-semibold text-ink underline">
              developer page
            </Link>{" "}
            and{" "}
            <Link href="/automate" className="font-semibold text-ink underline">
              creating sites automatically
            </Link>
            .
          </p>
        </div>
      </section>

      <CtaBand eyebrow="still not sure?" title="Ask us. We'll point you the right way." body="Tell us what you're building and we'll tell you which site fits, or whether selling sites suits you better." href="/contact" label="Ask a question" />
    </>
  );
}

// One row per group: who they are, the problem in their words, what AnyPress does, and the sites that fit.
function GroupList({ groups, fitsLabel }: { groups: AudienceGroup[]; fitsLabel: string }) {
  return (
    <ul className="mt-10 border-t border-line">
      {groups.map((g) => (
        <li key={g.id} className="grid gap-5 border-b border-line py-9 md:grid-cols-[150px_1fr_250px] md:gap-10">
          <Drawing name={g.drawing} className="!w-[120px] md:!w-[150px]" />
          <div>
            <h3 className="text-[22px] font-extrabold tracking-tight">{g.name}</h3>
            <p className="hand mt-1 text-[21px] text-accent">{g.line}</p>
            <p className="mt-3 leading-7 text-ink-soft">{g.body}</p>
            <p className="mt-4 flex flex-wrap gap-2" aria-label="For example">
              {g.examples.map((x) => (
                <span key={x} className="rounded-full border border-line bg-panel px-3 py-1 text-[14px]">
                  {x}
                </span>
              ))}
            </p>
          </div>
          <div className="md:pt-1">
            <p className="text-[13px] font-bold uppercase tracking-wider text-ink-soft">{fitsLabel}</p>
            <ul className="mt-2 grid gap-1.5">
              {g.fits.map((id) => {
                const t = SITE_TYPES.find((s) => s.id === id)!;
                return (
                  <li key={id}>
                    <Link href={`/sites/${id}`} className="font-semibold hover:underline">
                      {t.name}
                    </Link>
                    <span className="text-ink-soft"> · from ${t.from}/mo</span>
                  </li>
                );
              })}
            </ul>
            <Link href={groupUrl(g)} className="btn btn-paper mt-5 !px-4 !py-2 text-sm" aria-label={`Read more: ${g.name}`}>
              Read more →
            </Link>
          </div>
        </li>
      ))}
    </ul>
  );
}
