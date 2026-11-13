import type { Metadata } from "next";
import Link from "next/link";
import { CHANGES, FOR_LABELS, type Change } from "@/content/changelog";
import { CtaBand, PageHero } from "@/components/ui";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  path: "/changelog",
  title: "What's new",
  description: "Everything that changed on AnyPress sites, newest first, in plain words: new designs, new moves, and what each change does for your site.",
});

const MONTH = new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric", timeZone: "UTC" });
const DAY = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", timeZone: "UTC" });

function byMonth(changes: Change[]): [string, Change[]][] {
  const months = new Map<string, Change[]>();
  for (const change of changes) {
    const month = MONTH.format(new Date(`${change.date}T00:00:00Z`));
    months.set(month, [...(months.get(month) ?? []), change]);
  }
  return [...months];
}

export default function Changelog() {
  return (
    <>
      <PageHero
        drawing="note"
        eyebrow="what's new"
        title="What changed on your site lately."
        lead="Every change we make to AnyPress sites, in plain words, from the day it reaches your site. You don't install anything: your site gets these by itself."
      />

      <section className="sec">
        <div className="in">
          {byMonth(CHANGES).map(([month, changes]) => (
            <div key={month} className="mb-12">
              <h2 className="mb-6 text-2xl font-semibold">{month}</h2>
              <ol className="grid gap-4">
                {changes.map((change) => (
                  <li key={change.title} className="rounded-xl border border-line bg-paper-2 p-5 sm:grid sm:grid-cols-[7rem_1fr] sm:gap-6">
                    <time dateTime={change.date} className="text-sm font-semibold text-ink-soft">
                      {DAY.format(new Date(`${change.date}T00:00:00Z`))}
                    </time>
                    <div className="min-w-0">
                      <h3 className="font-semibold">{change.title}</h3>
                      <p className="mt-2 text-sm">{change.body}</p>
                      <p className="mt-3 flex flex-wrap gap-2 text-xs">
                        {(change.for.length ? change.for.map((f) => FOR_LABELS[f]) : ["Every site"]).map((label) => (
                          <span key={label} className="rounded-full border border-line px-2 py-0.5">
                            {label}
                          </span>
                        ))}
                        {change.link && (
                          <Link href={change.link.href} className="font-semibold underline">
                            {change.link.label}
                          </Link>
                        )}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          ))}
          <p className="text-sm">
            How updates reach your site without breaking it:{" "}
            <Link href="/updates" className="underline">
              safe updates
            </Link>
            .
          </p>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
