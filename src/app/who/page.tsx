import type { Metadata } from "next";
import Link from "next/link";
import { Drawing } from "@/components/Drawing";
import { CtaBand, PageHero, SectionHead } from "@/components/ui";
import { AUDIENCE_GROUPS, groupUrl } from "@/lib/site";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  path: "/who",
  title: "Who AnyPress is for",
  description: "Shops, educators, chambers, franchises, agencies, software teams and regulated sellers all build on AnyPress. Find your way in.",
});

const OWNERS = AUDIENCE_GROUPS.filter((g) => g.side === "owners");
const TECHNICAL = AUDIENCE_GROUPS.filter((g) => g.side === "technical");

export default function Who() {
  return (
    <>
      <PageHero
        drawing="pick"
        eyebrow="who it's for"
        title="Which one are you?"
        lead="AnyPress has two doors. One for people who want a website for their own business, and one for people who sell websites or build them into their product."
      />

      <section className="in pb-24" aria-label="Pick your way in">
        <div className="picker">
          <Link href="#owners" className="pick">
            <Drawing name="everything" />
            <h2>I want a website for my business</h2>
            <p>A shop, bookings, courses, a members&apos; area, or all of it. Set up for you, from $12 a month.</p>
            <ul>
              {OWNERS.map((g) => (
                <li key={g.id}>{g.name.split(" & ")[0].split(",")[0]}</li>
              ))}
            </ul>
            <span className="go">Show me →</span>
          </Link>
          <Link href="#technical" className="pick tech">
            <Drawing name="sell" />
            <h2>I sell websites, or build them into my product</h2>
            <p>Sell sites under your own name, run several brands, or create sites from your own code.</p>
            <ul>
              <li>Sellers</li>
              <li>Resellers</li>
              <li>Agencies</li>
              <li>Developers</li>
            </ul>
            <span className="go">Show me →</span>
          </Link>
        </div>
      </section>

      <section id="owners" className="sec soft scroll-mt-20">
        <div className="in">
          <SectionHead eyebrow="a website for your business" title="Find your kind of business." lead="Each page shows what usually gets in the way, and which kind of site fits." />
          <ul className="cards">
            {OWNERS.map((g) => (
              <li key={g.id} className="!basis-[260px]">
                <Link href={groupUrl(g)} className="card-link">
                  <Drawing name={g.drawing} className="!w-[120px]" />
                  <h3>{g.name}</h3>
                  <p>{g.line}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="technical" className="sec in scroll-mt-20">
        <SectionHead eyebrow="selling or building websites" title="For the technical side." lead="Sell AnyPress sites as your own, or give every one of your customers a site from inside your app." />
        <ul className="cards">
          {TECHNICAL.map((g) => (
            <li key={g.id} className="!basis-[260px]">
              <Link href={groupUrl(g)} className="card-link">
                <Drawing name={g.drawing} className="!w-[120px]" />
                <h3>{g.name}</h3>
                <p>{g.line}</p>
              </Link>
            </li>
          ))}
          <li className="!basis-[260px]">
            <Link href="/resellers" className="card-link">
              <Drawing name="shops" className="!w-[120px]" />
              <h3>Resellers</h3>
              <p>Several brands, one login and one monthly bill.</p>
            </Link>
          </li>
        </ul>
      </section>

      <CtaBand eyebrow="still not sure?" title="Ask us. We'll point you the right way." body="Tell us what you're building and we'll tell you which site fits, or whether selling sites suits you better." href="/contact" label="Ask a question" />
    </>
  );
}
