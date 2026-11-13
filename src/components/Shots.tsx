import type { Example } from "@/lib/site";

/** A browser window showing an example site. Hovering scrolls the page inside to the bottom. */
export function BrowserShot({ example, className = "" }: { example: Example; className?: string }) {
  const host = new URL(example.url).host;
  return (
    <div className={`shot-scroll overflow-hidden rounded-[14px] border-[1.5px] border-ink bg-panel shadow-[10px_10px_0_var(--honey)] ${className}`}>
      <div className="flex items-center gap-3 border-b-[1.5px] border-ink bg-paper-2 px-3 py-2">
        <span className="flex gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full border-[1.5px] border-ink" />
          <span className="h-2.5 w-2.5 rounded-full border-[1.5px] border-ink" />
          <span className="h-2.5 w-2.5 rounded-full border-[1.5px] border-ink" />
        </span>
        <span className="flex-1 truncate rounded-md border border-line bg-panel px-3 py-0.5 text-center text-xs text-ink-soft">{host}</span>
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
    <div className={`rounded-[2rem] border-[1.5px] border-ink bg-ink p-1.5 shadow-[6px_6px_0_var(--rose)] ${className}`}>
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

/** A screenshot in a small browser window, for the kit and block cards. */
export function FramedShot({ src, alt, href }: { src: string; alt: string; href?: string }) {
  const img = (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} width={960} height={600} loading="lazy" className="block aspect-[16/10] h-auto w-full object-cover object-top" />
  );
  return (
    <figure className="overflow-hidden rounded-[14px] border-[1.5px] border-ink bg-panel">
      <div className="flex items-center gap-1.5 border-b-[1.5px] border-ink bg-paper-2 px-3 py-2" aria-hidden>
        <span className="h-2 w-2 rounded-full border-[1.5px] border-ink" />
        <span className="h-2 w-2 rounded-full border-[1.5px] border-ink" />
        <span className="h-2 w-2 rounded-full border-[1.5px] border-ink" />
      </div>
      {href ? (
        <a href={href} target="_blank" rel="noopener" className="block">
          {img}
        </a>
      ) : (
        img
      )}
    </figure>
  );
}

/** The "Try it live" link that opens a demo in WordPress Playground, in a new tab. */
export function TryLive({ href, label = "Try it live" }: { href: string; label?: string }) {
  return (
    <a href={href} target="_blank" rel="noopener" className="mt-3 inline-flex items-center gap-1.5 text-[15px] font-semibold underline underline-offset-4 hover:no-underline">
      {label} <span aria-hidden>↗</span>
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
