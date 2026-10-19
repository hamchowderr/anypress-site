import type { CSSProperties, ReactNode } from "react";

// Line drawings in the style of an assembly booklet: one ink stroke weight, no shading.
// They illustrate the steps; any names or numbers in them are made-up examples.

type Offset = { dx: number; dy: number; r: number };

function Part({ o, children }: { o: Offset; children: ReactNode }) {
  const style = { "--dx": `${o.dx}px`, "--dy": `${o.dy}px`, "--r": `${o.r}deg` } as CSSProperties;
  return (
    <g className="part" style={style}>
      {children}
    </g>
  );
}

/**
 * A website drawn as parts. "loose" shows the parts scattered out of the box; "assemble" draws it
 * finished and, where the browser supports it, slides the parts together as it scrolls into view.
 */
export function SiteParts({ state, address = "yourname.com", className = "" }: { state: "loose" | "assemble"; address?: string; className?: string }) {
  const mode = state === "loose" ? "drawing-loose" : "drawing-assemble";
  return (
    <svg viewBox="0 0 480 380" overflow="visible" className={`drawing ${mode} ${className}`} role="img" aria-label="A website drawn as separate parts that fit together">
      {/* The window everything fits into. */}
      <rect x="40" y="30" width="400" height="320" rx="14" className="fill-paper" />
      <path d="M40 70 H440" />
      <circle cx="62" cy="50" r="4" />
      <circle cx="78" cy="50" r="4" />
      <circle cx="94" cy="50" r="4" />
      <rect x="120" y="40" width="240" height="20" rx="10" />
      <text x="150" y="54.5" fontSize="12">
        {address}
      </text>

      <Part o={{ dx: 270, dy: -100, r: 24 }}>
        <rect x="128" y="48" width="12" height="9" rx="2" className="fill-ink" />
        <path d="M130.5 48 V45 A3.5 3.5 0 0 1 137.5 45 V48" strokeWidth="2" />
      </Part>

      <Part o={{ dx: -70, dy: -150, r: -6 }}>
        <rect x="64" y="86" width="52" height="16" rx="4" className="fill-ink" />
        <path d="M300 94 H322 M336 94 H358 M372 94 H394" />
        <circle cx="414" cy="94" r="6" />
      </Part>

      <Part o={{ dx: -120, dy: 10, r: -9 }}>
        <path d="M64 132 H214" strokeWidth="7" />
        <path d="M64 150 H184" strokeWidth="7" />
        <path d="M64 166 H160" />
      </Part>

      <Part o={{ dx: -90, dy: 80, r: 14 }}>
        <rect x="64" y="180" width="78" height="26" rx="7" className="fill-ink" />
      </Part>

      <Part o={{ dx: 130, dy: -40, r: 10 }}>
        <rect x="250" y="116" width="166" height="92" rx="8" className="fill-paper" />
        <path d="M262 196 L298 160 L322 182 L344 166 L404 196" />
        <circle cx="380" cy="140" r="11" />
      </Part>

      <Part o={{ dx: -110, dy: 110, r: -12 }}>
        <rect x="64" y="226" width="104" height="104" rx="8" className="fill-paper" />
        <rect x="76" y="238" width="80" height="46" rx="4" />
        <path d="M76 298 H136 M76 314 H108" />
      </Part>

      <Part o={{ dx: 10, dy: 140, r: 8 }}>
        <rect x="188" y="226" width="104" height="104" rx="8" className="fill-paper" />
        <rect x="200" y="238" width="80" height="46" rx="4" />
        <path d="M200 298 H260 M200 314 H232" />
      </Part>

      <Part o={{ dx: 140, dy: 100, r: 16 }}>
        <rect x="312" y="226" width="104" height="104" rx="8" className="fill-paper" />
        <path d="M312 250 H416" />
        <path d="M330 270 h0 M352 270 h0 M374 270 h0 M396 270 h0 M330 290 h0 M352 290 h0 M396 290 h0 M330 310 h0 M352 310 h0 M374 310 h0" strokeWidth="6" />
        <circle cx="374" cy="290" r="8" className="fill-ink" />
      </Part>
    </svg>
  );
}

/** Step 3: your own address, your own words. */
export function MakeItYours({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 480 380" className={`drawing ${className}`} role="img" aria-label="A website with your own web address, being edited">
      <rect x="40" y="30" width="400" height="300" rx="14" className="fill-paper" />
      <path d="M40 70 H440" />
      <circle cx="62" cy="50" r="4" />
      <circle cx="78" cy="50" r="4" />
      <circle cx="94" cy="50" r="4" />
      <rect x="120" y="40" width="240" height="20" rx="10" />
      <text x="134" y="54.5" fontSize="12" fontWeight="700">
        yourbrand.com
      </text>
      <path d="M64 108 H300" strokeWidth="9" />
      <path d="M64 132 H250" strokeWidth="9" />
      <path d="M64 164 H330 M64 184 H310 M64 204 H280" />
      <rect x="64" y="232" width="110" height="74" rx="8" />
      <rect x="190" y="232" width="110" height="74" rx="8" strokeDasharray="7 8" />
      <path d="M245 256 V282 M232 269 H258" />
      {/* Pencil */}
      <g transform="rotate(38 380 200)">
        <rect x="364" y="96" width="32" height="150" rx="5" className="fill-paper" />
        <path d="M364 120 H396" />
        <path d="M364 246 L380 286 L396 246" className="fill-paper" />
        <path d="M374 271 L380 286 L386 271 Z" className="fill-ink" />
      </g>
    </svg>
  );
}

/** Step 4: an order comes in and we take nothing from it. */
export function OpenTheDoors({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 480 380" className={`drawing ${className}`} role="img" aria-label="An example order receipt showing an AnyPress fee of $0.00">
      <path d="M130 30 H350 V320 L332 336 L314 320 L296 336 L278 320 L260 336 L242 320 L224 336 L206 320 L188 336 L170 320 L152 336 L130 320 Z" className="fill-paper" />
      <text x="156" y="72" fontSize="17" fontWeight="700">
        New order
      </text>
      <path d="M156 90 H324" strokeDasharray="2 7" />
      <text x="156" y="122" fontSize="15">
        Candle set
      </text>
      <text x="324" y="122" fontSize="15" textAnchor="end">
        $48.00
      </text>
      <text x="156" y="152" fontSize="15">
        Gift wrap
      </text>
      <text x="324" y="152" fontSize="15" textAnchor="end">
        $4.00
      </text>
      <path d="M156 172 H324" strokeDasharray="2 7" />
      <text x="156" y="204" fontSize="15">
        Total
      </text>
      <text x="324" y="204" fontSize="15" textAnchor="end">
        $52.00
      </text>
      <rect x="146" y="226" width="188" height="44" rx="8" className="fill-ink" />
      <text x="160" y="254" fontSize="15" fontWeight="700" style={{ fill: "var(--paper)" }}>
        AnyPress fee
      </text>
      <text x="320" y="254" fontSize="15" fontWeight="700" textAnchor="end" style={{ fill: "var(--paper)" }}>
        $0.00
      </text>
      {/* Paid stamp */}
      <g transform="rotate(-14 380 110)">
        <circle cx="380" cy="110" r="46" className="fill-paper" />
        <circle cx="380" cy="110" r="38" />
        <text x="380" y="117" fontSize="20" fontWeight="700" textAnchor="middle" letterSpacing="2">
          PAID
        </text>
      </g>
    </svg>
  );
}

/** Step 5: we save a copy every night and keep it locked. */
export function KeepItRunning({ className = "" }: { className?: string }) {
  const nights = ["Mon", "Tue", "Wed", "Thu"];
  return (
    <svg viewBox="0 0 480 380" className={`drawing ${className}`} role="img" aria-label="A moon over a stack of nightly copies of your site, locked with a padlock">
      <path d="M118 52 A46 46 0 1 0 176 120 A36 36 0 1 1 118 52 Z" className="fill-paper" />
      <path d="M210 60 l6 0 M213 57 l0 6 M300 40 l8 0 M304 36 l0 8 M262 110 l6 0 M265 107 l0 6" />
      {nights.map((n, i) => (
        <g key={n}>
          <rect x={96 + i * 22} y={176 + i * 30} width="220" height="64" rx="10" className="fill-paper" />
          <path d={`M${116 + i * 22} ${196 + i * 30} h36`} strokeWidth="6" />
          <text x={296 + i * 22} y={201 + i * 30} fontSize="15" fontWeight="700" textAnchor="end">
            {n}
          </text>
        </g>
      ))}
      <rect x="356" y="96" width="72" height="58" rx="10" className="fill-ink" />
      <path d="M370 96 V78 A22 22 0 0 1 414 78 V96" strokeWidth="5" />
      <circle cx="392" cy="122" r="6" style={{ fill: "var(--paper)", stroke: "none" }} />
    </svg>
  );
}

/** Step 6: start small and add more to the same site later. */
export function GrowWithYou({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 480 380" className={`drawing ${className}`} role="img" aria-label="A small box growing into a bigger box with more parts added">
      <g transform="translate(40 150)">
        <path d="M20 40 L70 58 L120 40 L120 112 L70 130 L20 112 Z" className="fill-paper" />
        <path d="M70 58 V130 M20 40 L70 22 L120 40" />
      </g>
      <path d="M190 220 H262 M246 204 L262 220 L246 236" />
      <g transform="translate(270 60)">
        <path d="M10 90 L95 120 L180 90 L180 250 L95 280 L10 250 Z" className="fill-paper" />
        <path d="M95 120 V280 M10 90 L95 60 L180 90" />
        <circle cx="138" cy="190" r="26" />
        <path d="M138 176 V204 M124 190 H152" />
      </g>
    </svg>
  );
}

/** The small figure on "Your part" tags. */
export function YouIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
      <circle cx="12" cy="8" r="3.6" />
      <path d="M5 20.5c.8-3.8 3.6-6 7-6s6.2 2.2 7 6" />
    </svg>
  );
}

/** A small open box, for parts lists. */
export function BoxIcon({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round">
      <path d="M8 18 L24 24 L40 18 L40 38 L24 44 L8 38 Z" />
      <path d="M24 24 V44" />
      <path d="M8 18 L2 11 L18 5 L24 12 M40 18 L46 11 L30 5 L24 12" />
    </svg>
  );
}

export function Arrow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  );
}

export function Check({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="none" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M7.5 12.5l3 3 6-6.5" />
    </svg>
  );
}
