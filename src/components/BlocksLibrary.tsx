"use client";

import { useState } from "react";
import { BLOCK_GROUPS, BLOCKS, type BlockGroup } from "@/lib/blocks";

/** The AnyPress Blocks library: a picture of every shared section, filtered by group. */
export function BlocksLibrary() {
  const [tab, setTab] = useState<BlockGroup | "all">("all");
  const shown = BLOCKS.filter((b) => tab === "all" || b.group === tab);
  const label = (g: BlockGroup) => BLOCK_GROUPS.find((x) => x.id === g)?.label;
  return (
    <>
      <div className="tpl-tabs" role="tablist" aria-label="Filter blocks">
        {[{ id: "all" as const, label: "All" }, ...BLOCK_GROUPS].map((g) => (
          <button
            key={g.id}
            type="button"
            role="tab"
            aria-selected={tab === g.id}
            className={tab === g.id ? "on" : ""}
            onClick={() => setTab(g.id)}
          >
            {g.label}
          </button>
        ))}
      </div>
      <ul className="blocks">
        {shown.map((b) => (
          <li key={b.slug} id={b.slug} className="block-card">
            <div className="block-shot">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/blocks/${b.slug}.webp`} alt="" width={b.w} height={b.h} loading="lazy" decoding="async" />
            </div>
            <div className="block-body">
              <span className="block-group">{label(b.group)}</span>
              <h3>{b.title}</h3>
              <p>{b.body}</p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
