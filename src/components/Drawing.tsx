"use client";

import { useEffect, useRef } from "react";
import { DRAWINGS, type DrawingName } from "@/components/drawings.generated";

export type { DrawingName };

// One request per drawing, shared by every place on the page that shows it.
const loaded = new Map<DrawingName, Promise<string>>();

function load(name: DrawingName): Promise<string> {
  let p = loaded.get(name);
  if (!p) {
    p = fetch(`/drawings/${name}.svg?v=${DRAWINGS[name][2]}`).then((r) => (r.ok ? r.text() : ""));
    loaded.set(name, p);
  }
  return p;
}

/**
 * One of the hand-drawn objects (made by scripts/drawings.mjs, served from public/drawings).
 * The space is held at the right size while it loads, then it draws itself, outline first and
 * then the colour, once it scrolls into view (see DrawAnimator). Pass `still` for small icons
 * that shouldn't animate. Drawings are decoration, so screen readers skip them.
 */
export function Drawing({ name, className = "", still = false }: { name: DrawingName; className?: string; still?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [w, h] = DRAWINGS[name];

  useEffect(() => {
    let live = true;
    load(name).then((svg) => {
      if (live && ref.current) ref.current.innerHTML = svg;
    });
    return () => {
      live = false;
    };
  }, [name]);

  return <div ref={ref} aria-hidden className={`ob ${still ? "" : "draw"} ${className}`} style={{ aspectRatio: `${w} / ${h}` }} />;
}
