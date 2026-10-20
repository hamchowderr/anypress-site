import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand, PageHero } from "@/components/ui";
import { AUDIENCE_GROUPS, SITE_TYPES } from "@/lib/site";

export const metadata: Metadata = {
  title: "Who it's for",
  description: "Shops, educators, chambers, franchises, agencies, software teams and regulated sellers all build on AnyPress.",
};

export default function Who() {
  return (
    <>
      <PageHero
        eyebrow="Who it's for"
        title="Made for every kind of business."
        lead="AnyPress isn't for one kind of customer. It's a website, set up for the job you need done."
      >
        <nav className="mt-10 flex flex-wrap gap-2" aria-label="Jump to a group">
          {AUDIENCE_GROUPS.map((g) => (
            <a key={g.id} href={`#${g.id}`} className="rounded-full border border-line bg-panel px-4 py-1.5 text-[15px] hover:border-line">
              {g.name}
            </a>
          ))}
        </nav>
      </PageHero>

      <section className="">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-20">
          {AUDIENCE_GROUPS.map((g) => (
            <article
              key={g.id}
              id={g.id}
              className="grid scroll-mt-24 gap-6 border-b border-line py-12 first:border-t lg:grid-cols-[1fr_1fr] lg:gap-14"
            >
              <div>
                <h2 className="font-display text-[clamp(1.6rem,2.6vw,2.1rem)] leading-[1.1] font-semibold text-balance">{g.name}</h2>
                <p className="mt-4 text-xl text-ink-soft">{g.line}</p>
              </div>
              <div>
                <p className="text-lg leading-8 text-ink-soft">{g.body}</p>
                <div className="mt-6 flex flex-wrap items-center gap-2">
                  <span className="text-ink-soft">Good place to start:</span>
                  {g.fits.map((id) => {
                    const t = SITE_TYPES.find((s) => s.id === id)!;
                    return (
                      <Link key={id} href={`/sites/${id}`} className="rounded-full border border-line bg-panel px-3 py-1 text-[15px] hover:border-line">
                        {t.name}
                      </Link>
                    );
                  })}
                </div>
                {g.id === "agencies" && (
                  <Link href="/agencies" className="mt-5 inline-block text-lg font-semibold underline">
                    How it works for agencies
                  </Link>
                )}
                {g.id === "saas" && (
                  <Link href="/developers" className="mt-5 inline-block text-lg font-semibold underline">
                    Details for your developers
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <CtaBand title="See yourself here?" body="Pick the kind of site you need. If you're not sure, ask and we'll help you choose." />
    </>
  );
}
