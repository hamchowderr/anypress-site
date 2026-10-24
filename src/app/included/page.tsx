import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand, PageHero } from "@/components/ui";
import { SITE_TYPES } from "@/lib/site";

export const metadata: Metadata = {
  title: "What's included",
  description: "The WordPress tools in each AnyPress site, by name, for people who know WordPress.",
};

const EVERY_SITE = [
  ["Its own WordPress and database", "Every site runs in its own container. Nothing is shared with other sites."],
  ["SSL", "Certificates are issued and renewed automatically."],
  ["Nightly backups", "Files and database, saved every night, with restore."],
  ["Domains", "A free .anypress.site address, plus your own domain. Supported DNS providers connect in one click with Domain Connect."],
  ["Email from your domain", "Store email sends from your own domain once it's verified."],
  ["One-click sign-in", "Open wp-admin from your account without a separate password."],
];

export default function Included() {
  return (
    <>
      <PageHero drawing="tools"
        eyebrow="What's included"
        title="What's included, by name."
        lead="For people who know WordPress: the tools that come set up in each site. If these names mean nothing to you, that's fine. You don't need to know them."
      />

      <section className="border-y border-line bg-paper-2">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <h2 className="font-display text-[clamp(1.9rem,3.6vw,2.75rem)] leading-[1.08] font-semibold">By site.</h2>
          <ul className="mt-10 border-t border-line">
            {SITE_TYPES.map((t) => (
              <li key={t.id} className="grid gap-4 border-b border-line py-7 md:grid-cols-[1fr_2fr] md:gap-10">
                <Link href={`/sites/${t.id}`} className="font-semibold hover:underline">
                  {t.name}
                </Link>
                <ul className="flex flex-wrap gap-2">
                  {t.tools.map((tool) => (
                    <li key={tool} className="rounded-full border border-line bg-panel px-3 py-1 text-[15px]">
                      {tool}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <h2 className="font-display text-[clamp(1.9rem,3.6vw,2.75rem)] leading-[1.08] font-semibold">On every site.</h2>
          <dl className="mt-10 grid border-t border-line md:grid-cols-2 md:gap-x-14">
            {EVERY_SITE.map(([title, body]) => (
              <div key={title} className="border-b border-line py-6">
                <dt className="font-semibold">{title}</dt>
                <dd className="mt-1 leading-7 text-ink-soft">{body}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-8 text-ink-soft">
            Building on top of AnyPress? See the{" "}
            <Link href="/developers" className="font-semibold text-ink underline">
              developer page
            </Link>
            .
          </p>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
