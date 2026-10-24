/** A hand-drawn tick. */
export function Tick({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className}>
      <path d="M2.5 9.8c1.6 1.2 3 2.7 4.2 4.6C8.6 9.7 11.6 5.5 15.8 2.8" />
    </svg>
  );
}
