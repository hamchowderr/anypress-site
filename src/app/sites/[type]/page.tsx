import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Arrow, Check, SiteParts } from "@/components/Drawings";
import { type Band, CtaBand, PageHero } from "@/components/ui";
import { SITE_TYPES, type SiteTypeId, checkoutUrl } from "@/lib/site";

// Each site type takes its colour from the ribbon, in the same order as the homepage steps.
const BANDS: Record<SiteTypeId, Band> = {
  website: "amber",
  bookings: "orange",
  store: "red",
  community: "rose",
  everything: "magenta",
};

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
  const band = BANDS[t.id];

  return (
    <>
      <PageHero band={band} title={t.headline} lead={t.pitch}>
        <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
          {t.itemId ? (
            <a href={checkoutUrl(t.itemId)} className={`btn text-lg ${band === "magenta" ? "btn-paper" : "btn-ink"}`}>
              Start your {t.short.toLowerCase()} site
            </a>
          ) : (
            <Link href="/contact" className={`btn text-lg ${band === "magenta" ? "btn-paper" : "btn-ink"}`}>
              Ask us to set one up
            </Link>
          )}
          <p className="text-lg">
            <span className="font-display text-4xl font-black">${t.from}</span> a month to start
          </p>
        </div>
      </PageHero>

      <section className="assembly-scope bg-paper">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:py-28">
          <div className="rounded-3xl border-[2.5px] border-ink p-6 sm:p-10">
            <SiteParts state="assemble" className="w-full" />
          </div>
          <div>
            <h2 className="font-display text-[clamp(2.2rem,4.5vw,3.5rem)] leading-[0.98] font-black">What it does for you.</h2>
            <dl className="mt-10 space-y-8">
              {t.features.map((f) => (
                <div key={f.title}>
                  <dt className="text-xl font-bold">{f.title}</dt>
                  <dd className="mt-1 text-lg leading-8 text-ink-soft">{f.body}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="border-t-[2.5px] border-ink bg-paper-2">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] leading-[0.98] font-black">In the box.</h2>
            <ul className="mt-8 max-w-lg space-y-2 text-lg">
              {[...t.inBox, "The padlock, nightly copies and your own domain"].map((item) => (
                <li key={item} className="flex items-start gap-3">
                      <Check className="mt-0.5 h-6 w-6 shrink-0" />
                      {item}
                    </li>
              ))}
            </ul>
            <p className="mt-6 text-ink-soft">
              Know WordPress? The tools are listed by name on{" "}
              <Link href="/included" className="font-bold text-ink underline">
                what&apos;s included
              </Link>
              .
            </p>
          </div>
          <div>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] leading-[0.98] font-black">Made for.</h2>
            <ul className="mt-8 flex flex-wrap gap-2">
              {t.idealFor.map((x) => (
                <li key={x} className="rounded-full border-[2.5px] border-ink bg-paper px-4 py-1.5 text-lg font-bold">
                  {x}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t-[2.5px] border-ink bg-paper">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] leading-[0.98] font-black">Building something else?</h2>
          <ul className="mt-8 border-t-[2.5px] border-ink">
            {others.map((o) => (
              <li key={o.id} className="border-b-[2.5px] border-ink">
                <Link href={`/sites/${o.id}`} className="group flex items-center justify-between gap-6 py-5">
                  <span>
                    <span className="block text-xl font-bold group-hover:underline">{o.name}</span>
                    <span className="block text-lg text-ink-soft">{o.pitch}</span>
                  </span>
                  <span className="flex items-center gap-4">
                    <span className="hidden text-lg sm:inline">${o.from} a month</span>
                    <Arrow className="h-7 w-7 transition-transform duration-200 group-hover:translate-x-1" />
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
