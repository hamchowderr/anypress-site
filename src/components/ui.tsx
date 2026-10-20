import Link from "next/link";
import type { ReactNode } from "react";
import { Plus } from "@/components/Icons";

/** The title at the top of every inner page. */
export function PageHero({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="border-b border-line">
      <div className="mx-auto max-w-6xl px-4 pt-16 pb-14 sm:px-6 lg:pt-24 lg:pb-20">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1 className="font-display mt-3 max-w-3xl text-[clamp(2.3rem,5vw,3.9rem)] leading-[1.04] font-semibold text-balance">{title}</h1>
        {lead && <p className="mt-5 max-w-2xl text-lg leading-8 text-ink-soft sm:text-xl">{lead}</p>}
        {children}
      </div>
    </section>
  );
}

/** A section heading with an optional line under it. */
export function SectionHead({ eyebrow, title, lead, center = false }: { eyebrow?: string; title: ReactNode; lead?: ReactNode; center?: boolean }) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="font-display mt-2 text-[clamp(1.9rem,3.6vw,2.75rem)] leading-[1.08] font-semibold text-balance">{title}</h2>
      {lead && <p className="mt-4 text-lg leading-8 text-ink-soft">{lead}</p>}
    </div>
  );
}

/** Questions that open in place. */
export function Questions({ items }: { items: [string, ReactNode][] }) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map(([q, a]) => (
        <details key={q} className="group py-5">
          <summary className="flex cursor-pointer items-center justify-between gap-6 text-lg font-semibold">
            {q}
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line bg-panel transition-transform duration-200 group-open:rotate-45">
              <Plus />
            </span>
          </summary>
          <div className="mt-3 max-w-2xl leading-7 text-ink-soft">{a}</div>
        </details>
      ))}
    </div>
  );
}

/** The closing call to action at the bottom of pages. */
export function CtaBand({
  title = "Pick a site and open your doors.",
  body = "It arrives ready to use, and we look after it from there.",
  href = "/#sites",
  label = "Start your site",
}: {
  title?: string;
  body?: string;
  href?: string;
  label?: string;
}) {
  return (
    <section className="px-4 pb-20 sm:px-6">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-ink px-6 py-14 text-white sm:px-12 sm:py-16">
        <div className="ribbon absolute inset-x-0 top-0 h-1" aria-hidden />
        <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="font-display text-[clamp(1.9rem,3.6vw,2.75rem)] leading-[1.08] font-semibold text-balance">{title}</h2>
            <p className="mt-3 max-w-xl text-lg text-white/70">{body}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href={href} className="btn bg-white text-ink">
              {label}
            </Link>
            <Link href="/contact" className="btn border-white/25 text-white hover:bg-white/10">
              Ask us a question
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
