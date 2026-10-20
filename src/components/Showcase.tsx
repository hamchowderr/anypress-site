"use client";

import Link from "next/link";
import { useState } from "react";
import { Arrow, Check } from "@/components/Icons";
import { BrowserShot, PhoneShot } from "@/components/Shots";
import { SITE_TYPES } from "@/lib/site";

/** The example sites, one tab per kind of site. */
export function Showcase() {
  const [active, setActive] = useState(0);
  const t = SITE_TYPES[active];
  const ex = t.example;

  return (
    <div>
      <div role="tablist" aria-label="Kinds of site" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0">
        {SITE_TYPES.map((s, i) => (
          <button
            key={s.id}
            role="tab"
            id={`tab-${s.id}`}
            aria-selected={i === active}
            aria-controls="example-panel"
            onClick={() => setActive(i)}
            className={`shrink-0 rounded-full border px-4 py-2 text-[15px] font-medium transition-colors ${
              i === active ? "border-ink bg-ink text-white" : "border-line bg-panel text-ink-soft hover:text-ink"
            }`}
          >
            {s.name}
          </button>
        ))}
      </div>

      <div id="example-panel" role="tabpanel" aria-labelledby={`tab-${t.id}`} className="mt-10 grid items-center gap-10 lg:grid-cols-[1fr_2fr] lg:gap-14">
        <div className="order-2 lg:order-1">
          <p className="text-sm text-ink-soft">Example {t.short.toLowerCase()} site</p>
          <h3 className="font-display mt-1 text-3xl font-semibold">{ex.name}</h3>
          <p className="mt-3 leading-7 text-ink-soft">{ex.what}</p>
          <p className="mt-6 text-sm font-semibold">Try it yourself</p>
          <ul className="mt-2 space-y-2">
            {ex.tryIt.map((x) => (
              <li key={x} className="flex items-start gap-2.5">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                {x}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href={ex.url} target="_blank" rel="noopener" className="btn btn-ink">
              Open the example
              <Arrow className="h-4 w-4" />
            </a>
            <Link href={`/sites/${t.id}`} className="btn btn-paper">
              {t.name} from ${t.from}
            </Link>
          </div>
          <p className="mt-5 text-sm text-ink-soft">{ex.name} is a made-up business. The site is real and runs on AnyPress.</p>
        </div>

        <div className="relative order-1 pb-10 lg:order-2 lg:pr-16">
          <BrowserShot example={ex} />
          <PhoneShot example={ex} className="absolute right-0 -bottom-2 w-[26%] max-w-[180px] sm:w-[22%]" />
        </div>
      </div>
    </div>
  );
}
