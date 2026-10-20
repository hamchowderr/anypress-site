import type { Example } from "@/lib/site";

/** A browser window showing an example site. Hovering scrolls the page inside to the bottom. */
export function BrowserShot({ example, className = "" }: { example: Example; className?: string }) {
  const host = new URL(example.url).host;
  return (
    <div className={`shot-scroll overflow-hidden rounded-2xl border border-line bg-panel shadow-[0_30px_60px_-30px_rgb(29_27_33/0.35)] ${className}`}>
      <div className="flex items-center gap-3 border-b border-line bg-paper-2 px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-[#e9e4dc]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#e9e4dc]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#e9e4dc]" />
        </span>
        <span className="flex-1 truncate rounded-md bg-panel px-3 py-1 text-center text-xs text-ink-soft">{host}</span>
      </div>
      <div
        role="img"
        aria-label={`The ${example.name} example site on a computer`}
        className="shot aspect-[16/10] w-full"
        style={{ backgroundImage: `url(/examples/${example.shot}-desk.webp)` }}
      />
    </div>
  );
}

/** The same example site on a phone. */
export function PhoneShot({ example, className = "" }: { example: Example; className?: string }) {
  return (
    <div className={`rounded-[2rem] border border-line bg-ink p-1.5 shadow-[0_30px_60px_-24px_rgb(29_27_33/0.45)] ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/examples/${example.shot}-phone.webp`}
        alt={`The ${example.name} example site on a phone`}
        width={390}
        height={845}
        loading="lazy"
        className="block h-auto w-full rounded-[1.6rem]"
      />
    </div>
  );
}
