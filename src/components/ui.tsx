import Link from "next/link";
import type { ReactNode } from "react";
import { Drawing, type DrawingName } from "@/components/Drawing";
import { type Logo, LogoRow } from "@/components/LogoSwap";

/**
 * Who a page is written for. AnyPress has two sides: people buying a website for their own
 * business, and the technical side (sellers, resellers, agencies and developers).
 */
export type Side = "owners" | "technical";

const SIDES: Record<Side, { tag: string; label: string; href: string }> = {
  owners: { tag: "For you", label: "Getting a website for your business", href: "/pricing" },
  technical: { tag: "Technical", label: "For sellers, resellers and developers", href: "/agencies" },
};

/** A small pill saying which side of AnyPress a page is for. */
export function SidePill({ side }: { side: Side }) {
  const s = SIDES[side];
  return (
    <Link href={s.href} className={`side-pill ${side === "technical" ? "tech" : ""}`}>
      <b>{s.tag}</b>
      {s.label}
    </Link>
  );
}

/** The centered title at the top of every inner page, with its drawing. */
export function PageHero({
  eyebrow,
  title,
  lead,
  drawing,
  visual,
  side,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  drawing?: DrawingName;
  /** Shown in place of the drawing. */
  visual?: ReactNode;
  side?: Side;
  children?: ReactNode;
}) {
  return (
    <section className="in page-hero">
      {side && <SidePill side={side} />}
      {visual ?? (drawing && <Drawing name={drawing} />)}
      {eyebrow && (
        <div>
          <span className="eyebrow">{eyebrow}</span>
        </div>
      )}
      <h1>{title}</h1>
      {lead && <p className="lead">{lead}</p>}
      {children}
    </section>
  );
}

/** A section heading, centered unless `left`: a handwritten label, the heading and an optional line under it. */
export function SectionHead({
  eyebrow,
  title,
  lead,
  drawing,
  id,
  left = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  drawing?: DrawingName;
  id?: string;
  // Left-aligned, for a heading that sits in a column next to its content.
  left?: boolean;
}) {
  return (
    <div className={left ? "sec-head left" : "sec-head"}>
      {drawing && <Drawing name={drawing} />}
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 id={id}>{title}</h2>
      {lead && <p>{lead}</p>}
    </div>
  );
}

/** Questions that open in place. */
export function Questions({ items, firstOpen = false }: { items: [string, ReactNode][]; firstOpen?: boolean }) {
  return (
    <div className="faq">
      {items.map(([q, a], i) => (
        <details key={q} open={firstOpen && i === 0}>
          <summary>{q}</summary>
          <div className="answer">{a}</div>
        </details>
      ))}
    </div>
  );
}

/** The closing call to action at the bottom of pages, with three drawings under it. */
export function CtaBand({
  eyebrow = "your turn",
  title = "Ready when you are.",
  body = "Pick what you're building. It's ready to use the same day, and we look after it from there.",
  href = "/#sites",
  label = "Start your site",
  drawings = ["store", "everything", "bookings"],
  logos,
}: {
  eyebrow?: string;
  title?: string;
  body?: string;
  href?: string;
  label?: string;
  drawings?: DrawingName[];
  /** App logos shown in place of the drawings. */
  logos?: Logo[];
}) {
  return (
    <section className="in end">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      <p>{body}</p>
      <div className="ctas">
        <Link href={href} className="btn btn-ink">
          {label} →
        </Link>
        <Link href="/contact" className="btn btn-paper">
          Talk to us
        </Link>
      </div>
      {logos ? (
        <LogoRow logos={logos} />
      ) : drawings.length > 0 && (
        <div className="row">
          {drawings.map((d) => (
            <Drawing key={d} name={d} />
          ))}
        </div>
      )}
    </section>
  );
}
