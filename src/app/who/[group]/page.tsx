import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Arrow, Check } from "@/components/Icons";
import { LeadForm } from "@/components/LeadForm";
import { BrowserShot } from "@/components/Shots";
import { CtaBand, Questions, SectionHead } from "@/components/ui";
import { AUDIENCE_GROUPS, SITE_TYPES, startUrl } from "@/lib/site";

const groupFor = (id: string) => AUDIENCE_GROUPS.find((g) => g.id === id && g.page);

export function generateStaticParams() {
  return AUDIENCE_GROUPS.filter((g) => g.page).map((g) => ({ group: g.id }));
}

export async function generateMetadata({ params }: PageProps<"/who/[group]">): Promise<Metadata> {
  const g = groupFor((await params).group);
  return g?.page ? { title: g.name, description: g.page.lead } : {};
}

export default async function GroupPage({ params }: PageProps<"/who/[group]">) {
  const g = groupFor((await params).group);
  if (!g?.page) notFound();
  const page = g.page;
  const main = SITE_TYPES.find((t) => t.id === page.example)!;
  const ex = main.example;
  const fits = g.fits.map((id) => SITE_TYPES.find((t) => t.id === id)!);

  return (
    <>
      <section className="overflow-hidden border-b border-line">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 pt-16 pb-20 sm:px-6 lg:grid-cols-[1fr_1.2fr] lg:pt-20">
          <div>
            <p className="eyebrow">{g.name}</p>
            <h1 className="font-display mt-3 text-[clamp(2.3rem,4.6vw,3.6rem)] leading-[1.04] font-semibold text-balance">{page.title}</h1>
            <p className="mt-5 text-lg leading-8 text-ink-soft">{page.lead}</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href={startUrl(main)} className="btn btn-ink">
                Start your {main.short.toLowerCase()} site
              </a>
              <a href="#guide" className="btn btn-paper">
                Get the free guide
              </a>
            </div>
            <p className="mt-5 text-ink-soft">
              From <span className="font-semibold text-ink">${main.from} a month</span>. No cut of your sales. 30-day money-back.
            </p>
          </div>
          <div>
            <BrowserShot example={ex} />
            <p className="mt-6 text-sm text-ink-soft">
              {ex.name} is a made-up business we built on AnyPress. {ex.what}{" "}
              <a href={ex.url} target="_blank" rel="noopener" className="font-semibold text-ink underline">
                Open it
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <SectionHead title="What it does for you." />
          <dl className="mt-10 grid gap-4 md:grid-cols-3">
            {page.benefits.map((b) => (
              <div key={b.title} className="card p-6">
                <dt className="font-semibold">{b.title}</dt>
                <dd className="mt-1.5 leading-7 text-ink-soft">{b.body}</dd>
              </div>
            ))}
          </dl>
          <ul className="mt-10 space-y-2.5">
            {["We set it up and keep it up to date", "A copy saved every night", "Your own domain, and the site stays yours"].map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-y border-line bg-paper-2">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <SectionHead title="Plans that fit." />
          <ul className="mt-8 grid gap-x-10 md:grid-cols-2">
            {fits.map((t) => (
              <li key={t.id} className="border-b border-line">
                <Link href={`/sites/${t.id}`} className="group flex items-center justify-between gap-6 py-5">
                  <span>
                    <span className="block font-semibold">{t.name}</span>
                    <span className="mt-0.5 block text-ink-soft">{t.pitch}</span>
                  </span>
                  <span className="flex shrink-0 items-center gap-4 text-ink-soft">
                    <span className="hidden sm:inline">${t.from} a month</span>
                    <Arrow className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <SectionHead title="Questions." />
          <div className="mt-8">
            <Questions items={page.questions} />
          </div>
        </div>
      </section>

      <section id="guide" className="scroll-mt-24 border-t border-line">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <h2 className="font-display text-[clamp(1.6rem,2.6vw,2.1rem)] leading-[1.1] font-semibold text-balance">Free guide: {page.guide}.</h2>
            <p className="mt-4 text-lg leading-8 text-ink-soft">Read it now, no sign-up needed.</p>
            <Link href={`/guides/${g.id}`} className="btn btn-paper mt-6">
              Read the guide <Arrow className="h-4 w-4" />
            </Link>
          </div>
          <div>
            <h2 className="font-display text-2xl font-semibold">Want tips like this by email?</h2>
            <p className="mt-2 text-ink-soft">A few short emails for {g.name.toLowerCase()}, then the occasional update.</p>
            <LeadForm group={g.id} cta="Send me tips" />
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
