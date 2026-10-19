import type { Metadata } from "next";
import Link from "next/link";
import { Accent, CtaBand, PageHero } from "@/components/ui";
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
        title={
          <>
            Built for <Accent>any</Accent> business that runs on a website.
          </>
        }
        lead="AnyPress isn't for one kind of customer. It's WordPress, set up for the job, for whoever needs that job done."
      >
        <nav className="mt-10 flex flex-wrap gap-2">
          {AUDIENCE_GROUPS.map((g) => (
            <a
              key={g.id}
              href={`#${g.id}`}
              className="rounded-full border border-ink-line px-4 py-2 text-sm text-on-ink-muted transition-colors hover:border-on-ink-muted hover:text-on-ink"
            >
              {g.name}
            </a>
          ))}
        </nav>
      </PageHero>

      <section className="band-paper py-12 sm:py-20">
        <div className="mx-auto max-w-7xl space-y-4 px-4 sm:px-6">
          {AUDIENCE_GROUPS.map((g, i) => (
            <article
              key={g.id}
              id={g.id}
              className="grid scroll-mt-24 gap-8 rounded-[2rem] border border-paper-line bg-white p-8 sm:p-10 lg:grid-cols-[auto_1fr_1fr] lg:items-center"
            >
              <span className="font-display text-ribbon text-7xl leading-none font-extrabold">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <p className="eyebrow">{g.name}</p>
                <h2 className="font-display mt-3 text-3xl leading-tight font-extrabold sm:text-4xl">{g.line}</h2>
              </div>
              <div>
                <p className="leading-7 text-on-paper-muted">{g.body}</p>
                <p className="mt-5 flex flex-wrap items-center gap-2 text-sm">
                  <span className="text-on-paper-muted">Start with</span>
                  {g.fits.map((id) => {
                    const t = SITE_TYPES.find((s) => s.id === id)!;
                    return (
                      <Link
                        key={id}
                        href={`/sites/${id}`}
                        className="rounded-full border border-paper-line px-3 py-1 font-medium transition-colors hover:border-[#d9481f] hover:text-[#d9481f]"
                      >
                        {t.name}
                      </Link>
                    );
                  })}
                  {g.id === "agencies" && (
                    <Link href="/agencies" className="font-medium text-[#d9481f] underline-offset-4 hover:underline">
                      Agency details →
                    </Link>
                  )}
                  {g.id === "saas" && (
                    <Link href="/developers" className="font-medium text-[#d9481f] underline-offset-4 hover:underline">
                      Developer details →
                    </Link>
                  )}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <CtaBand title="See yourself here?" body="Pick the kind of site you need. If you're not sure, ask and we'll help you choose." />
    </>
  );
}
