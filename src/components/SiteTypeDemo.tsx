"use client";

import { useEffect, useState } from "react";
import { SITE_TYPES, type SiteType, type SiteTypeId } from "@/lib/site";

const BUILD_STEPS = (host: string) => [
  "Creating its own WordPress and database",
  "Copying the starter template",
  "Setting up the tools for this site",
  "Issuing the SSL certificate",
  `Live at ${host}`,
];

/**
 * The hero's interactive piece: pick a site type and watch a pretend site of that kind get
 * built in a browser window. It cycles through the types on its own until someone clicks.
 */
export function SiteTypeDemo() {
  const [active, setActive] = useState<SiteTypeId>("store");
  const [auto, setAuto] = useState(true);
  const type = SITE_TYPES.find((t) => t.id === active)!;

  useEffect(() => {
    if (!auto) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(() => {
      setActive((cur) => {
        const i = SITE_TYPES.findIndex((t) => t.id === cur);
        return SITE_TYPES[(i + 1) % SITE_TYPES.length].id;
      });
    }, 6000);
    return () => clearInterval(timer);
  }, [auto]);

  return (
    <div className="relative">
      <div role="tablist" aria-label="Site types" className="mb-4 flex flex-wrap gap-2">
        {SITE_TYPES.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={t.id === active}
            onClick={() => {
              setAuto(false);
              setActive(t.id);
            }}
            className={`rounded-full border px-3.5 py-1.5 text-sm transition-all ${
              t.id === active
                ? "border-transparent bg-on-ink font-semibold text-ink"
                : "border-ink-line text-on-ink-muted hover:border-on-ink-muted hover:text-on-ink"
            }`}
          >
            {t.short}
          </button>
        ))}
      </div>

      <div className="relative rounded-2xl border border-ink-line bg-ink-2 shadow-[0_40px_120px_-30px_rgba(238,47,94,0.45)]">
        <div className="flex items-center gap-2 border-b border-ink-line px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          <div className="ml-3 flex min-w-0 flex-1 items-center gap-2 rounded-md bg-ink px-3 py-1 font-mono text-xs text-on-ink-muted">
            <span className="text-[#28c840]">🔒</span>
            <span key={type.id} className="animate-rise truncate">
              {type.demoHost}
            </span>
          </div>
        </div>
        <div key={type.id} className="grid gap-0 sm:grid-cols-[1fr_200px]">
          <div className="animate-rise min-h-[300px] bg-paper p-4 text-on-paper sm:rounded-bl-2xl">
            <MockSite type={type} />
          </div>
          <BuildLog type={type} />
        </div>
      </div>
    </div>
  );
}

function BuildLog({ type }: { type: SiteType }) {
  return (
    <div className="border-t border-ink-line p-4 font-mono text-[11px] leading-5 sm:border-t-0 sm:border-l">
      <p className="text-on-ink-muted">$ anypress new {type.short.toLowerCase()}</p>
      <ul className="mt-2 space-y-1.5">
        {BUILD_STEPS(type.demoHost).map((s, i) => (
          <li
            key={s}
            className="animate-rise flex gap-2"
            style={{ animationDelay: `${0.35 + i * 0.45}s` }}
          >
            <span className={i === 4 ? "text-amber" : "text-[#28c840]"}>{i === 4 ? "★" : "✓"}</span>
            <span className={i === 4 ? "text-on-ink" : "text-on-ink-muted"}>{s}</span>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-on-ink-muted">Installed:</p>
      <ul className="mt-1.5 flex flex-wrap gap-1.5">
        {type.tools.map((tool, i) => (
          <li
            key={tool}
            className="animate-rise rounded border border-ink-line px-1.5 py-0.5 text-on-ink"
            style={{ animationDelay: `${0.8 + i * 0.15}s` }}
          >
            {tool}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Tiny drawn-with-boxes versions of each kind of site. */
function MockSite({ type }: { type: SiteType }) {
  switch (type.id) {
    case "website":
      return (
        <div>
          <MockNav name="Northside Notes" links={["Blog", "About", "Contact"]} />
          <p className="font-serif mt-5 text-3xl leading-tight italic">Field notes from a small city.</p>
          <div className="mt-5 grid grid-cols-3 gap-2">
            {["Coffee, ranked", "The new park", "Market days"].map((t, i) => (
              <div key={t} className="rounded-lg border border-paper-line bg-white p-2">
                <div
                  className="h-12 rounded"
                  style={{ background: ["#ffd9a8", "#ffc2b3", "#f6c1e4"][i] }}
                />
                <p className="mt-2 text-[11px] font-semibold">{t}</p>
                <p className="text-[10px] text-on-paper-muted">4 min read</p>
              </div>
            ))}
          </div>
          <div className="mt-3 flex items-center gap-2 rounded-lg border border-paper-line bg-white p-2 text-[11px]">
            <span className="flex-1 text-on-paper-muted">you@email.com</span>
            <span className="rounded bg-on-paper px-2 py-1 font-semibold text-paper">Subscribe</span>
          </div>
        </div>
      );
    case "bookings":
      return (
        <div>
          <MockNav name="Studio Ilana" links={["Classes", "Book", "Pricing"]} />
          <p className="mt-4 text-sm font-semibold">Book a 60-minute session</p>
          <div className="mt-3 grid grid-cols-5 gap-1.5 text-center text-[10px]">
            {["Mon", "Tue", "Wed", "Thu", "Fri"].map((d) => (
              <div key={d} className="font-semibold text-on-paper-muted">
                {d}
              </div>
            ))}
            {Array.from({ length: 15 }, (_, i) => {
              const taken = [1, 4, 7, 8, 13].includes(i);
              const picked = i === 6;
              return (
                <div
                  key={i}
                  className={`rounded-md border py-1.5 ${
                    picked
                      ? "border-transparent bg-ribbon font-semibold text-ink"
                      : taken
                        ? "border-paper-line text-on-paper-muted/40 line-through"
                        : "border-paper-line bg-white"
                  }`}
                >
                  {["9:00", "11:30", "2:00"][i % 3]}
                </div>
              );
            })}
          </div>
          <div className="mt-3 flex items-center justify-between rounded-lg bg-on-paper px-3 py-2 text-[11px] text-paper">
            <span>Wed 9:00 · $65</span>
            <span className="font-semibold">Confirm & pay →</span>
          </div>
        </div>
      );
    case "store":
      return (
        <div>
          <MockNav name="Kettle & Crumb" links={["Shop", "Subscribe", "🛒 2"]} />
          <div className="mt-3 flex items-center justify-between rounded-lg bg-on-paper px-3 py-3 text-paper">
            <div>
              <p className="font-serif text-xl leading-none italic">Fresh roast Fridays</p>
              <p className="mt-1 text-[10px] opacity-70">Small batches, shipped the same day.</p>
            </div>
            <span className="rounded-full bg-ribbon px-2.5 py-1 text-[10px] font-semibold text-ink">Shop now</span>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {[
              ["Morning blend", "$18", "#ffc98a"],
              ["Rye sourdough", "$9", "#f3b38f"],
              ["Bean club", "$24/mo", "#f0a3c6"],
            ].map(([n, p, c]) => (
              <div key={n} className="rounded-lg border border-paper-line bg-white p-2">
                <div className="flex h-16 items-center justify-center rounded" style={{ background: c }}>
                  <span className="h-8 w-6 rounded-sm bg-white/60" />
                </div>
                <p className="mt-2 text-[11px] font-semibold">{n}</p>
                <div className="mt-1 flex items-center justify-between text-[10px]">
                  <span>{p}</span>
                  <span className="rounded bg-on-paper px-1.5 py-0.5 text-paper">Add</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 rounded-lg border border-paper-line bg-white p-2 text-[11px]">
            <div className="flex justify-between">
              <span className="text-on-paper-muted">New order #1042</span>
              <span className="font-semibold text-[#1a7f37]">+$51.00</span>
            </div>
            <div className="mt-1 flex justify-between">
              <span className="text-on-paper-muted">AnyPress fee on sales</span>
              <span className="font-semibold">$0.00</span>
            </div>
          </div>
        </div>
      );
    case "community":
      return (
        <div>
          <MockNav name="The Fold Academy" links={["Feed", "Courses", "Members"]} />
          <div className="mt-4 grid grid-cols-[1fr_120px] gap-2">
            <div className="space-y-2">
              {[
                ["Maya", "Finished module 3! The pricing lesson changed everything."],
                ["Dev", "Live Q&A Thursday, drop your questions here."],
              ].map(([who, text]) => (
                <div key={who} className="rounded-lg border border-paper-line bg-white p-2 text-[11px]">
                  <p className="font-semibold">{who}</p>
                  <p className="text-on-paper-muted">{text}</p>
                </div>
              ))}
            </div>
            <div className="rounded-lg border border-paper-line bg-white p-2 text-[10px]">
              <p className="font-semibold">Course progress</p>
              <div className="mt-2 h-1.5 rounded-full bg-paper-2">
                <div className="h-full w-[62%] rounded-full bg-ribbon" />
              </div>
              <p className="mt-1 text-on-paper-muted">8 of 13 lessons</p>
              <p className="mt-3 font-semibold">312 members</p>
              <div className="mt-1 flex -space-x-1.5">
                {["#ffb338", "#ff7a2a", "#ee2f5e", "#d21fa4"].map((c) => (
                  <span key={c} className="h-4 w-4 rounded-full border border-white" style={{ background: c }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    case "everything":
      return (
        <div>
          <MockNav name="Riverside Chamber" links={["Members", "Events", "Shop", "Help"]} />
          <div className="mt-4 grid grid-cols-2 gap-2 text-[11px]">
            {[
              ["Members", "1,284", "Renewals on autopilot"],
              ["Events", "Thu 6pm", "Mixer · 48 booked"],
              ["Shop", "$3,920", "This month, 0% fees"],
              ["Help desk", "2 open", "Avg reply 1h"],
            ].map(([k, v, s]) => (
              <div key={k} className="rounded-lg border border-paper-line bg-white p-2">
                <p className="text-on-paper-muted">{k}</p>
                <p className="font-display text-lg font-bold">{v}</p>
                <p className="text-[10px] text-on-paper-muted">{s}</p>
              </div>
            ))}
          </div>
        </div>
      );
  }
}

function MockNav({ name, links }: { name: string; links: string[] }) {
  return (
    <div className="flex items-center justify-between border-b border-paper-line pb-2 text-[11px]">
      <span className="font-display text-sm font-bold">{name}</span>
      <span className="flex gap-3 text-on-paper-muted">
        {links.map((l) => (
          <span key={l}>{l}</span>
        ))}
      </span>
    </div>
  );
}
