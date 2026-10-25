import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CompareTable } from "@/components/CompareTable";
import { Drawing } from "@/components/Drawing";
import { CtaBand, PageHero, SectionHead } from "@/components/ui";
import { COMPARISONS } from "@/lib/compare";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbLd, pageMeta } from "@/lib/seo";

export function generateStaticParams() {
  return COMPARISONS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/compare/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const c = COMPARISONS.find((x) => x.slug === slug);
  return c ? pageMeta({ path: `/compare/${c.slug}`, title: `AnyPress vs ${c.name.replace(/^Regular/, "regular")}`, description: c.lead }) : {};
}

export default async function ComparePage({ params }: PageProps<"/compare/[slug]">) {
  const { slug } = await params;
  const c = COMPARISONS.find((x) => x.slug === slug);
  if (!c) notFound();
  const others = COMPARISONS.filter((x) => x.slug !== c.slug);
  const owners = c.side === "owners";

  return (
    <>
      <JsonLd data={breadcrumbLd([["Compare", "/compare"], [`AnyPress vs ${c.name}`, `/compare/${c.slug}`]])} />
      <PageHero side={c.side} drawing="scales" eyebrow={`AnyPress vs ${c.name}`} title={c.title} lead={c.lead} />

      <section className="sec soft !pt-16">
        <div className="in">
          <CompareTable head={["What you need", c.name, "AnyPress"]} rows={c.rows} />
        </div>
      </section>

      <section className="sec in">
        <SectionHead eyebrow="being fair" title="Which one is right for you?" />
        <div className="mx-auto grid max-w-[920px] gap-5 md:grid-cols-2">
          <div className="card p-7 text-center">
            <Drawing name={c.drawing} className="mx-auto !w-[120px]" />
            <h3 className="mt-3 text-xl font-extrabold">{c.name} is the better choice if…</h3>
            <p className="mt-2 text-ink-soft">{c.theirs}</p>
          </div>
          <div className="card border-ink p-7 text-center shadow-[8px_8px_0_var(--honey)]">
            <Drawing name="everything" className="mx-auto !w-[120px]" />
            <h3 className="mt-3 text-xl font-extrabold">AnyPress is the better choice if…</h3>
            <p className="mt-2 text-ink-soft">{c.ours}</p>
          </div>
        </div>
      </section>

      <section className="sec soft">
        <div className="in">
          <SectionHead eyebrow="more comparisons" title="Comparing something else?" />
          <ul className="cards">
            {others.map((o) => (
              <li key={o.slug} className="!basis-[240px]">
                <Link href={`/compare/${o.slug}`} className="card-link">
                  <Drawing name={o.drawing} className="!w-[100px]" />
                  <h3>AnyPress vs {o.name}</h3>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {owners ? (
        <CtaBand />
      ) : (
        <CtaBand
          eyebrow="ready?"
          title="Sell websites without running servers."
          body="Apply in a few minutes. We read every application and email you back."
          href="/sell"
          label="Apply to sell websites"
          drawings={["sell", "shops", "software"]}
        />
      )}
    </>
  );
}
