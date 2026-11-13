import type { Metadata } from "next";
import Link from "next/link";
import { CHANGES, FOR_LABELS, type Change } from "@/content/changelog";
import { CtaBand, PageHero } from "@/components/ui";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  path: "/changelog",
  title: "What's new",
  description: "New designs, new ways to move in and new things your site can do. Every AnyPress site gets them, and there's nothing to install.",
});

const MONTH = new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric", timeZone: "UTC" });
const DAY = new Intl.DateTimeFormat("en-US", { weekday: "long", month: "long", day: "numeric", timeZone: "UTC" });

/** Months, newest first, each holding its days, each day holding that day's changes. */
function grouped(changes: Change[]): [string, [string, Change[]][]][] {
  const months = new Map<string, Map<string, Change[]>>();
  for (const change of changes) {
    const month = MONTH.format(new Date(`${change.date}T00:00:00Z`));
    const days = months.get(month) ?? new Map<string, Change[]>();
    days.set(change.date, [...(days.get(change.date) ?? []), change]);
    months.set(month, days);
  }
  return [...months].map(([month, days]) => [month, [...days]]);
}

export default function Changelog() {
  return (
    <>
      <PageHero
        drawing="note"
        eyebrow="what's new"
        title="New on AnyPress. Already on your site."
        lead="New designs, new ways to move in and new things your site can do, newest first. There's nothing to install or update. We add it to your site for you."
      />

      <section className="sec">
        <div className="in">
          {grouped(CHANGES).map(([month, days]) => (
            <div key={month} className="mb-12">
              <h2 className="mb-6 text-2xl font-semibold">{month}</h2>
              <div className="grid gap-6">
                {days.map(([date, changes]) => (
                  <article key={date} className="rounded-xl border border-line bg-paper-2 p-5 sm:grid sm:grid-cols-[8rem_1fr] sm:gap-8 sm:p-6">
                    <h3 className="mb-4 font-semibold sm:mb-0">
                      <time dateTime={date}>{DAY.format(new Date(`${date}T00:00:00Z`))}</time>
                    </h3>
                    <ul className="min-w-0 divide-y divide-line">
                      {changes.map((change) => (
                        <li key={change.title} className="py-4 first:pt-0 last:pb-0">
                          <h4 className="text-lg font-semibold">{change.title}</h4>
                          <p className="mt-1">{change.body}</p>
                          <p className="mt-3 flex flex-wrap items-center gap-2 text-sm">
                            {(change.for.length ? change.for.map((f) => FOR_LABELS[f]) : ["Every site"]).map((label) => (
                              <span key={label} className="rounded-full border border-line px-2.5 py-0.5">
                                {label}
                              </span>
                            ))}
                            {change.link && (
                              <Link href={change.link.href} className="font-semibold underline">
                                {change.link.label}
                              </Link>
                            )}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
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
