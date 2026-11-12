"use client";

import Link from "next/link";
import { useRef, useState, type KeyboardEvent } from "react";
import { Drawing } from "@/components/Drawing";
import { BrowserShot, FramedShot, PhoneShot, TryLive } from "@/components/Shots";
import { kitPlayground } from "@/lib/blocks";
import { EVERY_SITE, INSIDE, TOOL_ABOUT } from "@/lib/inside";
import { KITS } from "@/lib/kits";
import { pluginLogo } from "@/lib/logos";
import { SITE_TYPES } from "@/lib/site";
import { tryType } from "@/lib/try";

const toolName = (tool: string) => (tool === "FluentToolkit" ? "FluentHub" : tool.replace(" with Stripe", ""));

function ToolLogo({ tool, className = "h-6 w-6" }: { tool: string; className?: string }) {
  const src = pluginLogo(tool);
  if (!src) {
    return (
      <span aria-hidden className={`grid shrink-0 place-items-center rounded-md bg-ink text-[11px] font-bold text-white ${className}`}>
        {toolName(tool).replace("Fluent", "F").slice(0, 2)}
      </span>
    );
  }
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt="" width={24} height={24} className={`shrink-0 rounded-md object-contain ${className}`} />;
}

/**
 * The sites a seller's customers get: each site type with its example site, real screens from inside its WordPress
 * and every tool it comes with; then all the design kits; then what every site comes with.
 */
export function ClientSites() {
  const [active, setActive] = useState(0);
  const [screen, setScreen] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const t = SITE_TYPES[active];
  const ex = t.example;
  const screens = INSIDE[t.id];
  const shot = screens[Math.min(screen, screens.length - 1)];
  const tools = [...t.tools.filter((x) => x !== "WordPress"), "AnyPress Blocks"];

  const onKey = (e: KeyboardEvent, i: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const n = (i + (e.key === "ArrowRight" ? 1 : SITE_TYPES.length - 1)) % SITE_TYPES.length;
    setActive(n);
    setScreen(0);
    tabs.current[n]?.focus();
  };

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-20">
      {/* 1. Each site type, in full. */}
      <div>
        <div role="tablist" aria-label="Site types" className="mb-10 flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:justify-center">
          {SITE_TYPES.map((s, i) => (
            <button
              key={s.id}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              role="tab"
              id={`cs-tab-${s.id}`}
              aria-selected={i === active}
              aria-controls="cs-panel"
              tabIndex={i === active ? 0 : -1}
              onClick={() => {
                setActive(i);
                setScreen(0);
              }}
              onKeyDown={(e) => onKey(e, i)}
              className={`flex shrink-0 items-center gap-2 rounded-full border-[1.5px] px-4 py-2 text-[15px] font-semibold transition-colors ${
                i === active ? "border-ink bg-ink text-white" : "border-line bg-panel hover:border-ink"
              }`}
            >
              <Drawing name={s.drawing} still className="w-8 rounded-full bg-white p-0.5" />
              {s.short}
              <span className={i === active ? "text-white/70" : "text-ink-soft"}>${s.from}</span>
            </button>
          ))}
        </div>

        <div id="cs-panel" role="tabpanel" aria-labelledby={`cs-tab-${t.id}`}>
          {/* The site their visitors see. */}
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
            <div className="relative pr-10 pb-8 sm:pr-14">
              <BrowserShot example={ex} />
              <PhoneShot example={ex} className="absolute right-0 bottom-0 w-[22%] max-w-[150px]" />
            </div>
            <div>
              <span className="eyebrow">{t.name.toLowerCase()} · from ${t.from} a month</span>
              <h3 className="mt-1 text-[clamp(1.6rem,3vw,2.1rem)] leading-tight font-extrabold tracking-tight">{t.headline}</h3>
              <p className="mt-3 leading-7 text-ink-soft">
                Shown here: <strong className="text-ink">{ex.name}</strong>, {ex.what.charAt(0).toLowerCase() + ex.what.slice(1)}
              </p>
              <ul className="mt-5 grid gap-3">
                {t.features.map((f) => (
                  <li key={f.title} className="flex gap-3">
                    <svg viewBox="0 0 22 22" className="mt-0.5 h-[22px] w-[22px] shrink-0 text-rose" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M4 12c2 1.4 3.4 3 4.6 5C10.8 11.6 14 7 19 4" />
                    </svg>
                    <span>
                      <strong>{f.title}.</strong> <span className="text-ink-soft">{f.body}</span>
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm font-semibold text-ink-soft">Good for: {t.idealFor.join(", ")}.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href={tryType(t.id)} className="btn btn-ink">
                  Try the {t.short} demo →
                </Link>
                <a href={ex.url} target="_blank" rel="noopener" className="btn btn-paper">
                  Open {ex.name} ↗
                </a>
              </div>
            </div>
          </div>

          {/* What the owner gets inside: one big screen, picked from the list beside it. */}
          <div className="mt-16">
            <h3 className="text-2xl font-extrabold tracking-tight">Inside their WordPress</h3>
            <p className="mt-1 max-w-2xl text-ink-soft">
              Real screens from the {t.short} demo, with its sample business. This is what your customer opens after one click from their account.
            </p>
            <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
              <figure>
                <FramedShot src={shot.src} alt={`${shot.title}: ${toolName(shot.tool)} on the ${t.short} demo site`} href={shot.src} />
                <figcaption className="sr-only">{shot.caption}</figcaption>
              </figure>
              <ul className="grid content-start gap-2" aria-label={`Screens from the ${t.short} demo`}>
                {screens.map((s, i) => (
                  <li key={s.src}>
                    <button
                      type="button"
                      aria-pressed={i === screen}
                      onClick={() => setScreen(i)}
                      className={`flex w-full items-start gap-3 rounded-[12px] border-[1.5px] p-3 text-left transition-colors ${
                        i === screen ? "border-ink bg-panel shadow-[4px_4px_0_var(--honey)]" : "border-transparent hover:border-line"
                      }`}
                    >
                      <ToolLogo tool={s.tool} className="mt-0.5 h-7 w-7" />
                      <span>
                        <span className="block text-sm font-semibold text-ink-soft">{toolName(s.tool)}</span>
                        <span className="block font-bold">{s.title}</span>
                        <span className="block text-[15px] leading-6 text-ink-soft">{s.caption}</span>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Every tool, by name. */}
          <div className="mt-14 rounded-[14px] border-[1.5px] border-ink bg-panel p-5 sm:p-7">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-xl font-extrabold">Every tool in the {t.short} plan</h3>
              <span className="text-sm text-ink-soft">{tools.length} plugins, set up and kept up to date</span>
            </div>
            <ul className="mt-5 grid gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
              {tools.map((tool) => (
                <li key={tool} className="flex items-start gap-3">
                  <ToolLogo tool={tool} className="mt-0.5 h-7 w-7" />
                  <span className="leading-6">
                    <strong>{toolName(tool)}</strong>
                    <span className="block text-[15px] text-ink-soft">{TOOL_ABOUT[tool]}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* 2. Every design, all at once. */}
      <div>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h3 className="text-[clamp(1.6rem,3vw,2.1rem)] font-extrabold tracking-tight">{KITS.length} designs, on any type of site</h3>
            <p className="mt-1 max-w-2xl text-ink-soft">
              Each one is a full example business with its own pages, colours and fonts. Your customer picks one and switches in a click; their words and photos stay put.
            </p>
          </div>
          <Link href="/designs" className="font-semibold underline underline-offset-4">
            More about the designs →
          </Link>
        </div>
        <ul className="mt-8 grid grid-cols-2 gap-x-5 gap-y-8 lg:grid-cols-4">
          {KITS.map((k) => (
            <li key={k.slug}>
              <FramedShot src={`/designs/${k.slug}.webp`} alt={`The ${k.name} design`} href={kitPlayground(k.slug, `${k.name} kit`)} />
              <div className="mt-3 flex items-center justify-between gap-2">
                <span className="font-extrabold">{k.name}</span>
                <span className="flex shrink-0 -space-x-1" aria-hidden>
                  {k.colors.map((c) => (
                    <span key={c} className="h-4 w-4 rounded-full border-[1.5px] border-ink" style={{ background: c }} />
                  ))}
                </span>
              </div>
              <p className="text-sm text-ink-soft">{k.who}</p>
              <TryLive href={kitPlayground(k.slug, `${k.name} kit`)} label="Try it live" />
            </li>
          ))}
        </ul>
      </div>

      {/* 3. What comes with every one. */}
      <div>
        <h3 className="text-[clamp(1.6rem,3vw,2.1rem)] font-extrabold tracking-tight">And on every site</h3>
        <dl className="mt-6 grid gap-x-10 border-t border-line sm:grid-cols-2 lg:grid-cols-3">
          {EVERY_SITE.map(([title, body]) => (
            <div key={title} className="border-b border-line py-5">
              <dt className="font-bold">{title}</dt>
              <dd className="mt-1 leading-7 text-ink-soft">{body}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
