import { useId } from "react";

/** The folded-ribbon "A" mark, without a background tile. */
export function LogoMark({ className = "h-8 w-8" }: { className?: string }) {
  // Unique gradient ids, so several marks on one page don't share (and break) each other's fills.
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      <defs>
        <linearGradient id={`${id}l`} x1="8" y1="80" x2="66" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FFB338" />
          <stop offset=".55" stopColor="#FF7A2A" />
          <stop offset="1" stopColor="#F2413A" />
        </linearGradient>
        <linearGradient id={`${id}r`} x1="56" y1="14" x2="86" y2="86" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FF5A33" />
          <stop offset=".5" stopColor="#EE2F5E" />
          <stop offset="1" stopColor="#D21FA4" />
        </linearGradient>
        <linearGradient id={`${id}t`} x1="8" y1="78" x2="44" y2="72" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FFC75A" />
          <stop offset="1" stopColor="#FF9A30" />
        </linearGradient>
      </defs>
      <path
        d="M48.5 17.5 Q51 14 55 15 L56 27 L50.5 48 L62.3 48 L66.2 59 L48 64 L44 77.5 L20 77.5 Q16 77.5 18.5 75 Q28 68 32 58 Z"
        fill={`url(#${id}l)`}
      />
      <path d="M20 77.5 Q16 77.5 18.5 75 Q24 71 30 70 Q36 72 44 77.5 Z" fill={`url(#${id}t)`} />
      <path
        d="M51 15 L62 15 Q65.5 15 66.8 18.5 L90 80 Q91.5 84 87.5 84 L77.5 84 Q75 84 74 81.5 L55 27 Z"
        fill={`url(#${id}r)`}
      />
      <path d="M51 15 L55 27 L56.8 32 L52.6 24 Z" fill="#7A0F3A" opacity=".35" />
    </svg>
  );
}

export function Logo() {
  return (
    <span className="flex items-center gap-2">
      <LogoMark className="h-8 w-8" />
      <span className="font-display text-xl font-extrabold">AnyPress</span>
    </span>
  );
}
