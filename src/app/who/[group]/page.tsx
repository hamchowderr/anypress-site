import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import { notFound } from "next/navigation";
import { Drawing } from "@/components/Drawing";
import { LeadForm } from "@/components/LeadForm";
import { ProblemFix } from "@/components/ProblemFix";
import { BrowserShot, PhoneShot } from "@/components/Shots";
import { Tick } from "@/components/Tick";
import { CtaBand, PageHero, Questions, SectionHead } from "@/components/ui";
import { GROUP_STORIES } from "@/lib/groups";
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
  const story = GROUP_STORIES[g.id];
  const main = SITE_TYPES.find((t) => t.id === page.example)!;
  const ex = main.example;
  const fits = g.fits.map((id) => SITE_TYPES.find((t) => t.id === id)!);

  return (
    <>
      <PageHero side={g.side} drawing={g.drawing} eyebrow={g.name.toLowerCase()} title={page.title} lead={page.lead}>
        <div className="ctas mt-8">
          <a href={startUrl(main)} className="btn btn-ink">
            Start your {main.short.toLowerCase()} site →
          </a>
          <a href="#guide" className="btn btn-paper">
            Get the free guide
          </a>
        </div>
        <ul className="checks">
          <li>
            <Tick />
            From ${main.from} a month
          </li>
          <li>
            <Tick />
            No cut of your sales
          </li>
          <li>
            <Tick />
            30-day money-back
          </li>
        </ul>
      </PageHero>

      {story && (
        <ProblemFix
          soft
          eyebrow="sound familiar?"
          title="What usually gets in the way, and how AnyPress fixes it."
          items={story.problems.map((p, i) => ({
            problem: [p.title, p.body],
            fix: [page.benefits[i].title, page.benefits[i].body],
          }))}
        >
          <ul className="checks mt-10">
            {["We set it up and apply security fixes", "A copy saved every night", "Your own domain, and the site stays yours"].map((x) => (
              <li key={x}>
                <Tick />
                {x}
              </li>
            ))}
          </ul>
        </ProblemFix>
      )}

      <section className="sec">
        <div className="in">
          <SectionHead
            eyebrow="see one"
            title={`A real ${main.name.toLowerCase()} site.`}
            lead={`${ex.name} is a made-up business. ${ex.what}`}
          />
          <div className="relative mx-auto max-w-[880px] -rotate-[0.6deg] pr-10 pb-8 sm:pr-14">
            <BrowserShot example={ex} />
            <PhoneShot example={ex} className="absolute right-0 bottom-0 w-[22%] max-w-[150px]" />
          </div>
          <div className="ctas">
            <a href={ex.url} target="_blank" rel="noopener" className="btn btn-paper">
              Open the example ↗
            </a>
          </div>
        </div>
      </section>

      <section id="plans" className="sec soft scroll-mt-20">
        <div className="in">
          <SectionHead eyebrow="good place to start" title="Plans that fit." lead="Prices are monthly, for the Small size." />
          <div className="types fit" style={{ "--n": fits.length } as CSSProperties}>
            {fits.map((t) => (
              <Link key={t.id} className="type" href={`/sites/${t.id}`}>
                <Drawing name={t.drawing} />
                <h3>{t.name}</h3>
                <p>{t.pitch}</p>
                <div className="price">
                  ${t.from} <small>/ month</small>
                </div>
                <span className="go">See what&apos;s inside →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="in">
          <SectionHead drawing="question" title="Questions" />
          <Questions items={page.questions} firstOpen />
        </div>
      </section>

      <section id="guide" className="sec soft scroll-mt-24">
        <div className="in">
          <div className="guide-band">
            <div>
              <Drawing name="scroll" />
              <span className="eyebrow">free guide</span>
              <h2>{page.guide}</h2>
              <p>Read it now, no sign-up needed.</p>
              <Link href={`/guides/${g.id}`} className="btn btn-ink mt-5">
                Read the guide →
              </Link>
            </div>
            <div>
              <h3>Want tips like this by email?</h3>
              <p>A few short emails for {g.name.toLowerCase()}, then the occasional update.</p>
              <LeadForm group={g.id} cta="Send me tips" />
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        href={fits.length === 1 ? startUrl(fits[0]) : "#plans"}
        label={fits.length === 1 ? `Start your ${fits[0].short.toLowerCase()} site` : "Pick your plan"}
        drawings={fits.map((t) => t.drawing).slice(0, 3)}
      />
    </>
  );
}
