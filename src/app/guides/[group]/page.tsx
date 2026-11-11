import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AgencyCalculator, CourseCalculator } from "@/components/Calculators";
import { Check } from "@/components/Icons";
import { LeadForm } from "@/components/LeadForm";
import { CtaBand, PageHero } from "@/components/ui";
import { GUIDES } from "@/content/guides";
import { AUDIENCE_GROUPS, groupUrl } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";
import { BASE_URL, breadcrumbLd, pageMeta } from "@/lib/seo";

export function generateStaticParams() {
  return GUIDES.map((g) => ({ group: g.id }));
}

export async function generateMetadata({ params }: PageProps<"/guides/[group]">): Promise<Metadata> {
  const { group } = await params;
  const guide = GUIDES.find((g) => g.id === group);
  return guide ? pageMeta({ path: `/guides/${guide.id}`, title: guide.title, description: guide.lead.length < 100 ? `${guide.lead} A free guide from AnyPress.` : guide.lead }) : {};
}

export default async function GuidePage({ params }: PageProps<"/guides/[group]">) {
  const { group } = await params;
  const guide = GUIDES.find((g) => g.id === group);
  const who = AUDIENCE_GROUPS.find((g) => g.id === group);
  if (!guide || !who) notFound();

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: guide.title,
            description: guide.lead,
            url: `${BASE_URL}/guides/${guide.id}`,
            image: `${BASE_URL}/og?t=${encodeURIComponent(guide.title)}`,
            author: { "@type": "Organization", name: "AnyPress", url: BASE_URL },
            publisher: { "@type": "Organization", name: "AnyPress", logo: { "@type": "ImageObject", url: `${BASE_URL}/logo-512.png` } },
          },
          breadcrumbLd([[guide.title, `/guides/${guide.id}`]]),
        ]}
      />
      <PageHero drawing="scroll" side={who.side} eyebrow="free guide" title={`${guide.title}.`} lead={guide.lead} />

      <section>
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
          {guide.sections.map((s) => (
            <div key={s.heading} className="border-b border-line py-8 first:pt-0">
              <h2 className="font-display text-2xl font-semibold">{s.heading}</h2>
              {s.body && <p className="mt-4 text-lg leading-8 text-ink-soft">{s.body}</p>}
              {s.steps && (
                <ol className="mt-5 list-decimal space-y-3 pl-6 text-lg leading-8">
                  {s.steps.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ol>
              )}
              {s.checks && (
                <ul className="mt-5 space-y-3 text-lg leading-8">
                  {s.checks.map((x) => (
                    <li key={x} className="flex items-start gap-2.5">
                      <Check className="mt-1.5 h-5 w-5 shrink-0 text-accent" />
                      {x}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
          {guide.calculator && (
            <div className="pt-8">{guide.calculator === "course" ? <CourseCalculator /> : <AgencyCalculator />}</div>
          )}
          <p className="mt-10 text-lg">
            <Link href={groupUrl(who)} className="font-semibold underline">
              How AnyPress works for {who.name.toLowerCase()}
            </Link>
          </p>
        </div>
      </section>

      <section className="border-t border-line bg-paper-2">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
          <h2 className="font-display text-2xl font-semibold">Get more like this by email.</h2>
          <p className="mt-2 text-ink-soft">A few short emails with tips for {who.name.toLowerCase()}. Unsubscribe any time.</p>
          <LeadForm group={who.id} cta="Send me tips" />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
