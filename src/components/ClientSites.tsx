import Link from "next/link";
import { SITE_TYPES } from "@/lib/site";
import { tryType } from "@/lib/try";

/**
 * The example sites as cards: each one a laptop-and-phone picture of the live site (public/examples/<shot>-card.webp,
 * made from screenshots of the live site), its name and kind, and a Live Demo link.
 */
export function ClientSites() {
  return (
    <ul className="flex flex-wrap justify-center gap-x-6 gap-y-10">
      {SITE_TYPES.map((t) => {
        const ex = t.example;
        return (
          <li key={t.id} className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
            <a
              href={ex.url}
              target="_blank"
              rel="noopener"
              className="group block overflow-hidden rounded-[14px] border-[1.5px] border-ink bg-panel"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/examples/${ex.shot}-card.webp`}
                alt={`The ${ex.name} example site on a laptop and a phone`}
                width={1200}
                height={800}
                loading="lazy"
                className="block aspect-[3/2] h-auto w-full transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none"
              />
            </a>
            <div className="mt-4 flex items-baseline justify-between gap-3">
              <h3 className="text-xl font-extrabold">{ex.name}</h3>
              <span className="shrink-0 text-sm font-semibold text-ink-soft">
                {t.short} · ${t.from}/mo
              </span>
            </div>
            <p className="mt-1 text-ink-soft">{ex.what}</p>
            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3">
              <a href={ex.url} target="_blank" rel="noopener" className="btn btn-ink">
                Live Demo ↗<span className="sr-only"> (opens in a new tab)</span>
              </a>
              <Link href={tryType(t.id)} className="font-semibold underline underline-offset-4 hover:no-underline">
                Try It Yourself →
              </Link>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
