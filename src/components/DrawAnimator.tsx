"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Starts each drawing on the page when it scrolls into view. Drawings already on screen start
 * straight away, and anything left waiting is shown after a few seconds whatever happens.
 * The `anim` class is set by a tiny script in the page head, before anything paints.
 */
export function DrawAnimator() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const play = (el: Element) => el.classList.add("play");
    const waiting = Array.from(document.querySelectorAll(".draw:not(.play)"));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      waiting.forEach(play);
      return;
    }
    root.classList.add("anim");
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            play(e.target);
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -6% 0px" },
    );
    waiting.forEach((el) => io.observe(el));
    const fallback = window.setTimeout(() => document.querySelectorAll(".draw:not(.play)").forEach(play), 12000);
    return () => {
      io.disconnect();
      window.clearTimeout(fallback);
    };
  }, [pathname]);

  return null;
}

/** Runs in the head: turns on the drawing animation before first paint, unless motion is reduced. */
export const ANIM_BOOT = `try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches&&'IntersectionObserver' in window)document.documentElement.classList.add('anim');setTimeout(function(){document.querySelectorAll('.draw:not(.play)').forEach(function(e){e.classList.add('play')})},12000)}catch(e){}`;
