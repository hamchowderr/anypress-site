import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Arrow, Check } from "@/components/Icons";
import { BrowserShot, PhoneShot } from "@/components/Shots";
import { Tick } from "@/components/Tick";
import { CtaBand, PageHero, SectionHead } from "@/components/ui";
import { SITE_TYPES, startUrl } from "@/lib/site";

export function generateStaticParams() {
  return SITE_TYPES.map((t) => ({ type: t.id }));
}

export async function generateMetadata({ params }: PageProps<"/sites/[type]">): Promise<Metadata> {
  const { type } = await params;
  const t = SITE_TYPES.find((s) => s.id === type);
  return t ? { title: t.name, description: t.pitch } : {};
}

export default async function SiteTypePage({ params }: PageProps<"/sites/[type]">) {
  const { type } = await params;
  const t = SITE_TYPES.find((s) => s.id === type);
  if (!t) notFound();
  const others = SITE_TYPES.filter((s) => s.id !== t.id);
  const ex = t.example;

  return (
    <>
      <PageHero drawing={t.drawing} side="owners" eyebrow={t.name.toLowerCase()} title={t.headline} lead={t.pitch}>
        <div className="ctas mt-8">
          <a href={startUrl(t)} className="btn btn-ink">
            Start your {t.short.toLowerCase()} site →
          </a>
          <a href={ex.url} target="_blank" rel="noopener" className="btn btn-paper">
            Open the example <Arrow className="h-4 w-4" />
          </a>
        </div>
        <ul className="checks">
          <li>
            <Tick />
            From ${t.from} a month
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
        <div className="relative mx-auto mt-14 max-w-[900px] -rotate-[0.6deg] pr-10 pb-8 text-left sm:pr-14">
          <BrowserShot example={ex} />
          <PhoneShot example={ex} className="absolute right-0 bottom-0 w-[22%] max-w-[150px]" />
        </div>
        <p className="mt-4 text-sm text-ink-soft">
          {ex.name} is a made-up business. {ex.what}
        </p>
      </PageHero>

      <section>
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <SectionHead title="What it does for you." />
          <dl className="mt-10 grid gap-4 sm:grid-cols-2">
            {t.features.map((f) => (
              <div key={f.title} className="card p-6">
                <dt className="font-semibold">{f.title}</dt>
                <dd className="mt-1.5 leading-7 text-ink-soft">{f.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="border-y border-line bg-paper-2">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-semibold">What you get</h2>
            <ul className="mt-6 space-y-2.5">
              {[...t.inBox, "The padlock, nightly copies and your own domain"].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-ink-soft">
              Know WordPress? The tools are listed by name on{" "}
              <Link href="/included" className="font-semibold text-ink underline">
                what&apos;s included
              </Link>
              .
            </p>
          </div>
          <div>
            <h2 className="font-display text-2xl font-semibold">Made for</h2>
            <ul className="mt-6 flex flex-wrap gap-2">
              {t.idealFor.map((x) => (
                <li key={x} className="rounded-full border border-line bg-panel px-4 py-1.5">
                  {x}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <SectionHead title="Building something else?" />
          <ul className="mt-8 grid gap-x-10 md:grid-cols-2">
            {others.map((o) => (
              <li key={o.id} className="border-b border-line">
                <Link href={`/sites/${o.id}`} className="group flex items-center justify-between gap-6 py-5">
                  <span>
                    <span className="block font-semibold">{o.name}</span>
                    <span className="mt-0.5 block text-ink-soft">{o.pitch}</span>
                  </span>
                  <span className="flex shrink-0 items-center gap-4 text-ink-soft">
                    <span className="hidden sm:inline">${o.from} a month</span>
                    <Arrow className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
