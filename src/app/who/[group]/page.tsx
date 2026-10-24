import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import { notFound } from "next/navigation";
import { Drawing } from "@/components/Drawing";
import { BrowserShot } from "@/components/Shots";
import { CtaBand, PageHero, SectionHead } from "@/components/ui";
import { GROUP_STORIES } from "@/lib/groups";
import { AUDIENCE_GROUPS, SITE_TYPES } from "@/lib/site";

export function generateStaticParams() {
  return AUDIENCE_GROUPS.map((g) => ({ group: g.id }));
}

export async function generateMetadata({ params }: PageProps<"/who/[group]">): Promise<Metadata> {
  const { group } = await params;
  const g = AUDIENCE_GROUPS.find((x) => x.id === group);
  return g ? { title: g.name, description: `${g.line} ${g.body}` } : {};
}

// Where the technical groups go next, instead of a site type.
const NEXT_STEPS: Record<string, { href: string; label: string; body: string }[]> = {
  agencies: [
    { href: "/agencies", label: "How selling works", body: "Your shop, your prices, and what we do for each site." },
    { href: "/resellers", label: "Become a reseller", body: "Several brands under one login and one monthly bill." },
    { href: "/sell", label: "Apply to sell websites", body: "Tell us about your business. We read every application." },
  ],
  saas: [
    { href: "/developers", label: "For developers", body: "The API, keys and examples your team needs." },
    { href: "/resellers", label: "Become a reseller", body: "One monthly bill and partner keys for each of your brands." },
    { href: "/self-host", label: "Run it yourself", body: "Everything is open source, if you'd rather host it." },
  ],
};

export default async function GroupPage({ params }: PageProps<"/who/[group]">) {
  const { group } = await params;
  const g = AUDIENCE_GROUPS.find((x) => x.id === group);
  if (!g) notFound();
  const story = GROUP_STORIES[g.id];
  const fits = g.fits.map((id) => SITE_TYPES.find((t) => t.id === id)!);
  const ex = fits[0].example;
  const next = NEXT_STEPS[g.id];

  return (
    <>
      <PageHero side={g.side} drawing={g.drawing} eyebrow={g.name.toLowerCase()} title={g.line} lead={g.body}>
        <div className="ctas mt-8">
          {next ? (
            <Link href={next[0].href} className="btn btn-ink">
              {next[0].label} →
            </Link>
          ) : (
            <Link href={`/sites/${fits[0].id}`} className="btn btn-ink">
              See the {fits[0].name.toLowerCase()} site →
            </Link>
          )}
          <Link href="/who" className="btn btn-paper">
            Other groups
          </Link>
        </div>
      </PageHero>

      <section className="sec soft">
        <div className="in">
          <SectionHead eyebrow="sound familiar?" title="What usually gets in the way." />
          <ul className="mx-auto grid max-w-[1000px] gap-4 md:grid-cols-3">
            {story.problems.map((p) => (
              <li key={p.title} className="card p-6">
                <h3 className="text-lg font-extrabold">{p.title}</h3>
                <p className="mt-2 text-ink-soft">{p.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="sec in">
        <SectionHead eyebrow="what we do about it" title="Here's how AnyPress helps." />
        <div className="yours !grid-cols-1 md:!grid-cols-3">
          {story.answers.map((a) => (
            <div key={a.title}>
              <Drawing name={a.drawing} />
              <h3>{a.title}</h3>
              <p>{a.body}</p>
            </div>
          ))}
        </div>
      </section>

      {next ? (
        <section className="sec soft">
          <div className="in">
            <SectionHead eyebrow="where to next" title="Pick your next step." />
            <ul className="cards">
              {next.map((n) => (
                <li key={n.href} className="!basis-[280px] text-left">
                  <Link href={n.href} className="card-link">
                    <h3>{n.label} →</h3>
                    <p>{n.body}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : (
        <section className="sec soft">
          <div className="in">
            <SectionHead eyebrow="good place to start" title="The sites that usually fit." lead="Prices are monthly, for the Small size." />
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
            <div className="mx-auto mt-20 max-w-[820px] -rotate-[0.6deg]">
              <BrowserShot example={ex} />
            </div>
            <p className="mt-6 text-center text-ink-soft">
              {ex.name} is a made-up business on a real AnyPress {fits[0].name.toLowerCase()} site.{" "}
              <a href={ex.url} target="_blank" rel="noopener" className="font-bold text-ink underline">
                Open it ↗
              </a>
            </p>
          </div>
        </section>
      )}

      {next ? (
        <CtaBand eyebrow="ready?" title="Let's talk about what you sell." body="Apply in a few minutes. We read every application and email you back." href="/sell" label="Apply to sell websites" drawings={["sell", "shops", "software"]} />
      ) : (
        <CtaBand drawings={fits.map((t) => t.drawing).slice(0, 3)} />
      )}
    </>
  );
}
