"use client";

import { useState } from "react";
import { AppLogo, Screenshot, type Shot } from "./AppShots";

export type Template = {
  id: string;
  tool: "n8n" | "Make" | "Zapier";
  title: string;
  body: string;
  shot: Shot;
  /** n8n workflow file, copied for pasting onto the canvas and offered as a download. */
  workflow?: string;
  /** Make blueprint file, for Create a new scenario, then Import blueprint. */
  blueprint?: string;
  /** Zapier's "copy this Zap" link. */
  zap?: string;
  /** Where to add the app first, when the template can't be copied. */
  invite?: { label: string; href: string };
  guide: string;
};

const LOGOS = {
  n8n: "/apps/n8n-logo.svg",
  Make: "/apps/make-logo.svg",
  Zapier: "/apps/zapier-logo.svg",
};
const TABS = ["All", "n8n", "Make", "Zapier"] as const;

function CopyWorkflow({ file }: { file: string }) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");
  async function copy() {
    try {
      const text = await (await fetch(file)).text();
      await navigator.clipboard.writeText(text);
      setState("copied");
    } catch {
      setState("failed");
    }
    setTimeout(() => setState("idle"), 4000);
  }
  return (
    <button type="button" className="btn btn-ink" onClick={copy}>
      {state === "copied"
        ? "Copied. Paste it in n8n"
        : state === "failed"
          ? "Couldn't copy. Use Download"
          : "Copy workflow"}
    </button>
  );
}

export function Templates({ items }: { items: Template[] }) {
  const [tab, setTab] = useState<(typeof TABS)[number]>("All");
  const shown = items.filter((t) => tab === "All" || t.tool === tab);
  return (
    <>
      <div className="tpl-tabs" role="tablist" aria-label="Filter templates">
        {TABS.map((t) => (
          <button
            key={t}
            type="button"
            role="tab"
            aria-selected={tab === t}
            className={tab === t ? "on" : ""}
            onClick={() => setTab(t)}
          >
            {t !== "All" && <AppLogo src={LOGOS[t]} />}
            {t}
          </button>
        ))}
      </div>
      <ul className="tpls">
        {shown.map((t) => (
          <li key={t.id} id={t.id} className="tpl">
            <Screenshot shot={t.shot} label={t.tool} />
            <div className="tpl-body">
              <span className="aflow-pair" aria-hidden="true">
                <AppLogo src={LOGOS[t.tool]} />
                <AppLogo src="/logo-mark.svg" />
              </span>
              <h3>{t.title}</h3>
              <p>{t.body}</p>
              <div className="tpl-actions">
                {t.workflow && <CopyWorkflow file={t.workflow} />}
                {t.workflow && (
                  <a href={t.workflow} download className="btn btn-paper">
                    Download
                  </a>
                )}
                {t.blueprint && (
                  <a href={t.blueprint} download className="btn btn-ink">
                    Download blueprint
                  </a>
                )}
                {t.invite && (
                  <a href={t.invite.href} className="btn btn-ink">
                    {t.invite.label}
                  </a>
                )}
                {t.zap && (
                  <a href={t.zap} className="btn btn-ink">
                    Use this Zap
                  </a>
                )}
                <a href={t.guide} className="aflow-link">
                  Guide →
                </a>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
