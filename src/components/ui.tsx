import Link from "next/link";
import type { ReactNode } from "react";
import { LogoMark } from "@/components/Logo";
import { YouIcon } from "@/components/Drawings";

export type Band = "amber" | "orange" | "red" | "rose" | "magenta" | "ink" | "paper";

// Text colour that stays readable on each band (magenta and ink take white text).
export const BAND: Record<Band, string> = {
  amber: "bg-amber text-ink",
  orange: "bg-orange text-ink",
  red: "bg-red text-ink",
  rose: "bg-rose text-ink",
  magenta: "bg-magenta text-paper",
  ink: "bg-ink text-paper",
  paper: "bg-paper text-ink",
};

/** The coloured title page at the top of every inner page. */
export function PageHero({
  band = "amber",
  title,
  lead,
  children,
}: {
  band?: Band;
  title: ReactNode;
  lead?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className={`${BAND[band]} border-b-[2.5px] border-ink`}>
      <div className="mx-auto max-w-7xl px-4 pt-16 pb-16 sm:px-6 lg:pt-24 lg:pb-20">
        <h1 className="font-display max-w-4xl text-[clamp(2.6rem,6.5vw,5.25rem)] leading-[0.95] font-black text-balance">{title}</h1>
        {lead && <p className="mt-6 max-w-2xl text-xl leading-8">{lead}</p>}
        {children}
      </div>
    </section>
  );
}

/** "Your part" or "Our part": who does each step. */
export function StepTag({ who }: { who: "you" | "us" }) {
  return who === "you" ? (
    <span className="tag">
      <YouIcon className="h-6 w-6" />
      Your part
    </span>
  ) : (
    <span className="tag bg-ink text-paper">
      <LogoMark className="h-6 w-6" />
      Our part
    </span>
  );
}

/** The closing call to action at the bottom of pages. */
export function CtaBand({
  title = "That's the whole manual.",
  body = "Pick the kind of site you need, and we'll do the rest.",
  href = "/#pick",
  label = "Start your site",
}: {
  title?: string;
  body?: string;
  href?: string;
  label?: string;
}) {
  return (
    <section className="border-t-[2.5px] border-ink bg-amber">
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-8 px-4 py-20 sm:px-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="font-display text-[clamp(2.4rem,5.5vw,4.5rem)] leading-[0.95] font-black text-balance">{title}</h2>
          <p className="mt-4 max-w-xl text-xl">{body}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href={href} className="btn btn-ink text-lg">
            {label}
          </Link>
          <Link href="/contact" className="btn btn-paper text-lg">
            Ask us a question
          </Link>
        </div>
      </div>
    </section>
  );
}
