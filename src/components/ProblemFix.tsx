import type { ReactNode } from "react";
import { SectionHead } from "@/components/ui";

export interface Problem {
  problem: [string, string];
  fix: [string, ReactNode];
}

/**
 * Who a page is for, the problems they run into, and how AnyPress fixes each one, side by side. Every main page
 * opens with one (a friend's feedback on /agencies, 2026-10-25: name who, then show the problem and the fix).
 */
export function ProblemFix({
  who,
  items,
  title = "Sound familiar?",
  eyebrow = "who it's for",
  soft = false,
  id = "h-problems",
  children,
}: {
  // Left out where the page already lists who it's for (the site type heroes).
  who?: string[];
  items: Problem[];
  title?: string;
  eyebrow?: string;
  soft?: boolean;
  id?: string;
  // Anything that belongs under the pairs, such as a short list of what every plan includes.
  children?: ReactNode;
}) {
  return (
    <section className={`sec ${soft ? "soft" : ""}`} aria-labelledby={id}>
      <div className="in">
        <SectionHead eyebrow={eyebrow} title={title} id={id} />
        {who && (
          <p className="who-row">
            <b>Made for</b>
            {who.map((w) => (
              <span key={w}>{w}</span>
            ))}
          </p>
        )}
        <ol className="pf">
          {items.map(({ problem, fix }) => (
            <li key={problem[0]}>
              <div className="pf-p">
                <span className="pf-label">the problem</span>
                <h3>{problem[0]}</h3>
                <p>{problem[1]}</p>
              </div>
              <span className="pf-arrow" aria-hidden>
                →
              </span>
              <div className="pf-f">
                <span className="pf-label">how AnyPress fixes it</span>
                <h3>{fix[0]}</h3>
                <p>{fix[1]}</p>
              </div>
            </li>
          ))}
        </ol>
        {children}
      </div>
    </section>
  );
}
