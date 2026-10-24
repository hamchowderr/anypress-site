import type { Metadata } from "next";
import Link from "next/link";
import { CompareTable } from "@/components/CompareTable";
import { Drawing } from "@/components/Drawing";
import { CtaBand, PageHero, SectionHead, SidePill } from "@/components/ui";
import { COMPARISONS } from "@/lib/compare";

export const metadata: Metadata = {
  title: "Compare",
  description: "How AnyPress compares with website builders, regular hosting, WordPress multisite, WP Ultimo and ManageWP.",
};

export default function Compare() {
  return (
    <>
      <PageHero
        drawing="scales"
        eyebrow="compare"
        title="How AnyPress compares."
        lead="Honest side-by-sides, including when the other option is the better choice."
      />

      <section className="sec soft !pt-16">
        <div className="in">
          <SectionHead eyebrow="website builders" title="Most website tools sell it to you in pieces." />
          <CompareTable
            head={["What you need", "Piecing it together", "AnyPress"]}
            rows={[
              ["A website you can grow", "Builder plan", "Included"],
              ["Email from your business name", "Separate email service", "Included"],
              ["Card payments", "Extra app or plugin", "Ready to switch on"],
              ["Bookings, courses or members", "Another monthly app", "In the plan you pick"],
              ["A cut of every sale", "Some platforms take one", "0%"],
            ]}
          />
        </div>
      </section>

      <section className="sec in">
        <SectionHead eyebrow="side by side" title="Pick a comparison." />
        <ul className="cards">
          {COMPARISONS.map((c) => (
            <li key={c.slug} className="!basis-[260px]">
              <Link href={`/compare/${c.slug}`} className="card-link">
                <Drawing name={c.drawing} className="!w-[120px]" />
                <h3>AnyPress vs {c.name}</h3>
                <p>{c.title}</p>
              </Link>
              <div className="mt-4">
                <SidePill side={c.side} />
              </div>
            </li>
          ))}
        </ul>
      </section>

      <CtaBand />
    </>
  );
}
