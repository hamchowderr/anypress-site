"use client";

import Link from "next/link";
import { useRef, useState, type KeyboardEvent } from "react";
import { Drawing } from "@/components/Drawing";
import { BrowserShot, PhoneShot } from "@/components/Shots";
import { SITE_TYPES } from "@/lib/site";

/** The example sites, one tab per kind of site. */
export function Showcase() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const t = SITE_TYPES[active];
  const ex = t.example;

  const onKey = (e: KeyboardEvent, i: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const n = (i + (e.key === "ArrowRight" ? 1 : SITE_TYPES.length - 1)) % SITE_TYPES.length;
    setActive(n);
    tabs.current[n]?.focus();
  };

  return (
    <div>
      <div role="tablist" aria-label="Example sites" className="mb-8 flex flex-wrap justify-center gap-2">
        {SITE_TYPES.map((s, i) => (
          <button
            key={s.id}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            role="tab"
            id={`tab-${s.id}`}
            aria-selected={i === active}
            aria-controls="example-panel"
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
            onKeyDown={(e) => onKey(e, i)}
            className={`flex items-center gap-2 rounded-full border-[1.5px] px-4 py-2 text-[15px] font-semibold transition-colors ${
              i === active ? "border-ink bg-ink text-white" : "border-line bg-panel hover:border-ink"
            }`}
          >
            <Drawing name={s.drawing} still className="w-8 rounded-full bg-white p-0.5" />
            {s.name}
          </button>
        ))}
      </div>

      <div
        id="example-panel"
        role="tabpanel"
        aria-labelledby={`tab-${t.id}`}
        className="mx-auto grid max-w-[1080px] items-center gap-10 lg:grid-cols-[1.7fr_1fr]"
      >
        <div className="relative -rotate-[0.6deg] pb-8 pr-10 sm:pr-14">
          <BrowserShot example={ex} />
          <PhoneShot example={ex} className="absolute right-0 bottom-0 w-[22%] max-w-[150px]" />
        </div>
        <div>
          <span className="eyebrow">{t.name.toLowerCase()}</span>
          <h3 className="mt-1 text-[28px] font-extrabold tracking-tight">{ex.name}</h3>
          <p className="mt-2 text-ink-soft">{ex.what}</p>
          <ul className="mt-4 grid gap-2">
            {ex.tryIt.map((x) => (
              <li key={x} className="flex items-center gap-2.5 font-semibold">
                <svg viewBox="0 0 22 22" className="h-[22px] w-[22px] shrink-0 text-rose" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M4 12c2 1.4 3.4 3 4.6 5C10.8 11.6 14 7 19 4" />
                </svg>
                {x}
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={ex.url} target="_blank" rel="noopener" className="btn btn-ink">
              Open the example ↗
            </a>
            <Link href={`/sites/${t.id}`} className="btn btn-paper">
              {t.short} from ${t.from}
            </Link>
          </div>
          <p className="mt-4 text-sm text-ink-soft">{ex.name} is a made-up business. The site is real and runs on AnyPress.</p>
        </div>
      </div>
    </div>
  );
}
