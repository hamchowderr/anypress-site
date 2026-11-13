"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FOR_LABELS, KIND_LABELS, type Change, type ChangeFor, type ChangeKind } from "@/content/changelog";

const MONTH = new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric", timeZone: "UTC" });
const DAY = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", timeZone: "UTC" });
const WEEKDAY = new Intl.DateTimeFormat("en-US", { weekday: "long", timeZone: "UTC" });

const KIND_STYLE: Record<ChangeKind, string> = {
  new: "bg-ink text-paper border-ink",
  improved: "bg-paper text-ink border-ink",
  fixed: "bg-paper text-ink-soft border-line",
};

type Filter = ChangeFor | "all";
const FILTERS: Filter[] = ["all", "website", "bookings", "store", "community", "everything", "sellers"];

const day = (date: string) => new Date(`${date}T00:00:00Z`);

/** A change shows under a filter when it's for every site (empty `for`) or names that site type. */
const shows = (change: Change, filter: Filter) => filter === "all" || !change.for.length || change.for.includes(filter);

/** Months, newest first, each holding its days, each day holding that day's changes. */
function grouped(changes: Change[]) {
  const months = new Map<string, Map<string, Change[]>>();
  for (const change of changes) {
    const month = MONTH.format(day(change.date));
    const days = months.get(month) ?? new Map<string, Change[]>();
    days.set(change.date, [...(days.get(change.date) ?? []), change]);
    months.set(month, days);
  }
  return [...months].map(([month, days]) => [month, [...days]] as const);
}

function Tags({ change }: { change: Change }) {
  return (
    <p className="mt-3 flex flex-wrap items-center gap-2 text-sm">
      {(change.for.length ? change.for.map((f) => FOR_LABELS[f]) : ["Every site"]).map((label) => (
        <span key={label} className="rounded-full border border-line px-2.5 py-0.5 text-ink-soft">
          {label}
        </span>
      ))}
      {change.link && (
        <Link href={change.link.href} className="ml-1 font-semibold underline underline-offset-4">
          {change.link.label} →
        </Link>
      )}
    </p>
  );
}

function Permalink({ id, title }: { id: string; title: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <a
      href={`#${id}`}
      aria-label={`Link to ${title}`}
      onClick={() => {
        navigator.clipboard?.writeText(`${location.origin}${location.pathname}#${id}`).then(
          () => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
          },
          () => undefined,
        );
      }}
      className="ml-2 align-middle text-base font-normal text-ink-soft opacity-0 transition-opacity group-hover:opacity-100 focus:opacity-100"
    >
      {copied ? "Link copied" : "#"}
    </a>
  );
}

function Entry({ change }: { change: Change }) {
  return (
    <article id={change.id} className="group scroll-mt-24">
      <span className={`inline-block rounded-full border px-2.5 py-0.5 text-xs font-semibold ${KIND_STYLE[change.kind]}`}>
        {KIND_LABELS[change.kind]}
      </span>
      <h3 className="mt-2 text-xl font-semibold sm:text-2xl">
        {change.title}
        <Permalink id={change.id} title={change.title} />
      </h3>
      <p className="mt-2 max-w-2xl text-ink-soft">{change.body}</p>
      {change.image && (
        <Image
          src={change.image.src}
          alt={change.image.alt}
          width={1440}
          height={900}
          className="mt-4 h-auto w-full max-w-2xl rounded-lg border border-line"
        />
      )}
      <Tags change={change} />
    </article>
  );
}

function Smaller({ changes, open }: { changes: Change[]; open: boolean }) {
  return (
    <details open={open} className="group/more max-w-2xl rounded-lg border border-line bg-paper-2">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-3 font-semibold [&::-webkit-details-marker]:hidden">
        {changes.length === 1 ? "1 smaller improvement" : `${changes.length} smaller improvements`}
        <span aria-hidden className="transition-transform group-open/more:rotate-180">
          ⌄
        </span>
      </summary>
      <ul className="divide-y divide-line border-t border-line">
        {changes.map((change) => (
          <li key={change.id} id={change.id} className="group scroll-mt-24 px-4 py-3">
            <p className="font-semibold">
              {change.title}
              <Permalink id={change.id} title={change.title} />
            </p>
            <p className="mt-1 text-ink-soft">{change.body}</p>
            <Tags change={change} />
          </li>
        ))}
      </ul>
    </details>
  );
}

/** The changelog: a filter by site type, then a timeline of days, each with its changes and its smaller ones folded away. */
export function ChangelogList({ changes }: { changes: Change[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [hash, setHash] = useState("");

  // A link to one change (anypress.io/changelog#id) opens the fold it sits in.
  useEffect(() => {
    const read = () => setHash(location.hash.slice(1));
    read();
    window.addEventListener("hashchange", read);
    return () => window.removeEventListener("hashchange", read);
  }, []);

  const months = grouped(changes.filter((c) => shows(c, filter)));

  return (
    <>
      <div role="group" aria-label="Show changes for" className="mb-10 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
            className={`rounded-full border px-3.5 py-1.5 text-sm font-semibold transition-colors ${
              filter === f ? "border-ink bg-ink text-paper" : "border-line bg-paper hover:border-ink"
            }`}
          >
            {f === "all" ? "All sites" : FOR_LABELS[f]}
          </button>
        ))}
      </div>

      {months.map(([month, days]) => (
        <section key={month} aria-label={month} className="mb-14">
          <h2 className="mb-8 text-sm font-semibold uppercase tracking-wider text-ink-soft">{month}</h2>
          <ol className="relative border-l border-line pl-6 sm:border-0 sm:pl-0">
            {days.map(([date, items]) => {
              const main = items.filter((c) => !c.minor);
              const minor = items.filter((c) => c.minor);
              return (
                <li key={date} className="relative pb-12 last:pb-0 sm:grid sm:grid-cols-[9rem_1fr] sm:gap-10">
                  <span aria-hidden className="absolute -left-[1.85rem] top-1.5 h-3 w-3 rounded-full border-2 border-ink bg-paper sm:hidden" />
                  <div className="mb-4 sm:mb-0">
                    <time dateTime={date} className="block sm:sticky sm:top-24">
                      <span className="block text-lg font-semibold">{DAY.format(day(date))}</span>
                      <span className="block text-sm text-ink-soft">{WEEKDAY.format(day(date))}</span>
                    </time>
                  </div>
                  <div className="grid min-w-0 gap-10 sm:border-l sm:border-line sm:pl-10">
                    {main.map((change) => (
                      <Entry key={change.id} change={change} />
                    ))}
                    {minor.length > 0 && <Smaller changes={minor} open={minor.some((c) => c.id === hash)} />}
                  </div>
                </li>
              );
            })}
          </ol>
        </section>
      ))}
    </>
  );
}
