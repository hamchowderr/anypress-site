import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MockSite } from "@/components/SiteTypeDemo";
import { Accent, CtaBand, PageHero } from "@/components/ui";
import { SITE_TYPES, checkoutUrl } from "@/lib/site";

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

  return (
    <>
      <PageHero eyebrow={`${t.name} · from $${t.from}/mo`} title={t.headline} lead={t.pitch}>
        <div className="mt-9 flex flex-wrap gap-3">
          <a href={t.itemId ? checkoutUrl(t.itemId) : "/pricing"} className="btn btn-ribbon">
            Start a {t.short.toLowerCase()} site
          </a>
          <Link href="/pricing" className="btn btn-ghost">
            See pricing
          </Link>
        </div>
      </PageHero>

      <section className="band-paper py-24">
        <div className="mx-auto grid max-w-7xl items-start gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.1fr]">
          <div className="rounded-2xl border border-paper-line bg-white shadow-[0_30px_80px_-30px_rgba(22,20,27,0.35)] lg:sticky lg:top-28">
            <div className="flex items-center gap-2 border-b border-paper-line px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              <span className="ml-3 truncate rounded-md bg-paper px-3 py-1 font-mono text-xs text-on-paper-muted">
                {t.demoHost}
              </span>
            </div>
            <div className="bg-paper p-5 sm:rounded-b-2xl">
              <MockSite type={t} />
            </div>
          </div>
          <div>
            <p className="eyebrow">What you get</p>
            <h2 className="font-display mt-4 text-4xl leading-tight font-extrabold sm:text-5xl">
              Installed, set up, <Accent tone="rust">ready.</Accent>
            </h2>
            <ul className="mt-10 space-y-8">
              {t.features.map((f, i) => (
                <li key={f.title} className="grid grid-cols-[3rem_1fr] gap-4">
                  <span className="font-display text-ribbon text-4xl leading-none font-extrabold">{i + 1}</span>
                  <div>
                    <h3 className="font-display text-2xl font-bold">{f.title}</h3>
                    <p className="mt-2 leading-7 text-on-paper-muted">{f.body}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-12 rounded-3xl border border-paper-line bg-white p-6">
              <p className="eyebrow">Comes with</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {t.tools.map((tool) => (
                  <li key={tool} className="rounded-full border border-paper-line px-3 py-1 text-sm">
                    {tool}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm leading-6 text-on-paper-muted">
                Plus what every AnyPress site gets: its own WordPress and database, SSL, nightly backups, a free
                .anypress.site address, your own domain and email from it.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="grain relative py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <p className="eyebrow">Made for</p>
          <ul className="mt-6 flex flex-wrap gap-3">
            {t.idealFor.map((who) => (
              <li
                key={who}
                className="font-display rounded-full border border-ink-line px-5 py-3 text-xl font-bold sm:text-2xl"
              >
                {who}
              </li>
            ))}
          </ul>

          <p className="eyebrow mt-20">Building something else?</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((o) => (
              <Link
                key={o.id}
                href={`/sites/${o.id}`}
                className="group rounded-3xl border border-ink-line bg-ink-2 p-6 transition-colors hover:border-orange/60"
              >
                <h3 className="font-display text-2xl font-bold">{o.name}</h3>
                <p className="mt-2 text-sm text-on-ink-muted">from ${o.from}/mo</p>
                <span className="mt-6 inline-block text-orange transition-transform group-hover:translate-x-1">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
