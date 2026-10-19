import Link from "next/link";
import type { ReactNode } from "react";
import { LogoMark } from "@/components/Logo";

/** The ink hero at the top of every inner page. */
export function PageHero({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="grain relative overflow-hidden">
      <div className="grid-lines absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      <div className="animate-glow bg-ribbon absolute -top-48 right-[-15%] h-[460px] w-[560px] rounded-full opacity-20 blur-[120px]" />
      <div className="relative mx-auto max-w-7xl px-4 pt-16 pb-16 sm:px-6 lg:pt-24 lg:pb-20">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="font-display mt-5 max-w-4xl text-[clamp(2.75rem,7vw,5.5rem)] leading-[0.95] font-extrabold">
          {title}
        </h1>
        {lead && <p className="mt-6 max-w-2xl text-lg leading-8 text-on-ink-muted">{lead}</p>}
        {children}
      </div>
    </section>
  );
}

/** An italic serif word in a heading. */
export function Accent({ children, tone = "ribbon" }: { children: ReactNode; tone?: "ribbon" | "rust" | "muted" }) {
  const color = tone === "ribbon" ? "text-ribbon pr-1" : tone === "rust" ? "text-[#d9481f]" : "text-on-ink-muted";
  return <span className={`font-serif font-normal tracking-normal italic ${color}`}>{children}</span>;
}

/** The closing call to action used at the bottom of pages. */
export function CtaBand({
  title = "Your site is a few clicks away.",
  body = "Pick a site type, choose a name, and we'll have WordPress running with your tools installed.",
  href = "/pricing",
  label = "Get started",
}: {
  title?: string;
  body?: string;
  href?: string;
  label?: string;
}) {
  return (
    <section className="grain relative overflow-hidden py-28 text-center">
      <div className="bg-ribbon absolute inset-x-0 top-1/2 h-40 -translate-y-1/2 -skew-y-3 opacity-90" />
      <div className="relative mx-auto max-w-3xl px-4">
        <div className="rounded-[2rem] border border-ink-line bg-ink px-6 py-14 shadow-2xl sm:px-12">
          <LogoMark className="mx-auto h-14 w-14" />
          <h2 className="font-display mt-6 text-5xl leading-[0.95] font-extrabold sm:text-6xl">{title}</h2>
          <p className="mx-auto mt-5 max-w-md text-on-ink-muted">{body}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href={href} className="btn btn-ribbon">
              {label}
            </Link>
            <Link href="/contact" className="btn btn-ghost">
              Talk to us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
