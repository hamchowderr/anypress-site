type IconProps = { className?: string };

export function Check({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} aria-hidden fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 10.5l3.5 3.5 7.5-8" />
    </svg>
  );
}

export function Arrow({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} aria-hidden fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 10h12M11 5l5 5-5 5" />
    </svg>
  );
}

export function Plus({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" className={className} aria-hidden fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M8 2.5v11M2.5 8h11" />
    </svg>
  );
}

/** Small line icons for the "every site comes with" list. */
const PATHS: Record<string, string> = {
  globe: "M10 2.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15zM2.5 10h15M10 2.5c2 2.2 3 4.7 3 7.5s-1 5.3-3 7.5c-2-2.2-3-4.7-3-7.5s1-5.3 3-7.5z",
  lock: "M5.5 9V7a4.5 4.5 0 019 0v2M4.5 9h11v8h-11z",
  copy: "M7 7h9v9H7zM4 13V4h9",
  mail: "M3 5h14v10H3zM3 5l7 6 7-6",
  coin: "M10 2.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15zM12.5 7.5c-.5-.8-1.4-1.2-2.5-1.2-1.5 0-2.5.8-2.5 1.8 0 2.4 5 1.3 5 3.8 0 1-1 1.8-2.5 1.8-1.2 0-2.1-.4-2.6-1.2M10 5v1.3M10 13.7V15",
  open: "M7 4.5L3 10l4 5.5M13 4.5l4 5.5-4 5.5",
  pencil: "M13.5 3.5l3 3L7 16H4v-3z",
  grow: "M3 16h14M5 16v-4M9 16V9M13 16V6M17 4l-3 0M17 4v3",
};

export function LineIcon({ name, className = "h-5 w-5" }: IconProps & { name: keyof typeof PATHS }) {
  return (
    <svg viewBox="0 0 20 20" className={className} aria-hidden fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d={PATHS[name]} />
    </svg>
  );
}
