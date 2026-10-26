"use client";

import { useEffect, useState } from "react";

export type Logo = { src: string; name: string };

/**
 * The AnyPress mark beside a tile that swaps between the apps it works with, for a page hero.
 * With reduced motion it stays on the first app.
 */
export function LogoSwap({ logos, every = 2200 }: { logos: Logo[]; every?: number }) {
  const [at, setAt] = useState(0);

  useEffect(() => {
    if (logos.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setAt((i) => (i + 1) % logos.length), every);
    return () => clearInterval(id);
  }, [logos.length, every]);

  return (
    <div className="logo-swap" aria-hidden="true">
      <span className="logo-tile">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo-mark.svg" alt="" width={56} height={56} />
      </span>
      <span className="logo-plus">+</span>
      <span className="logo-tile swap">
        {logos.map((l, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={l.src} src={l.src} alt="" width={56} height={56} className={i === at ? "on" : ""} />
        ))}
      </span>
      <span className="logo-name">{logos[at]?.name}</span>
    </div>
  );
}

/** A row of app logos in tiles, for the closing call to action. */
export function LogoRow({ logos }: { logos: Logo[] }) {
  return (
    <ul className="logo-row" aria-label="Works with">
      {logos.map((l) => (
        <li key={l.src} className="logo-tile">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={l.src} alt={l.name} width={56} height={56} />
        </li>
      ))}
    </ul>
  );
}
