"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";

// Plays one of our Lottie drawings (public/lottie/<name>.json, made by scripts/lottie/build.mjs)
// once, when it scrolls into view. Until the animation has loaded, and for anyone without
// JavaScript, the static drawing passed as children shows instead. Visitors who ask for reduced
// motion see the finished last frame.
export function Motion({ name, label, children }: { name: string; label: string; children?: ReactNode }) {
  const box = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    let anim: {
      play(): void;
      goToAndStop(v: number, isFrame: boolean): void;
      destroy(): void;
      totalFrames: number;
    } | null = null;
    let cancelled = false;
    let seen = false;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Start loading a little before it's on screen, play once most of it is visible.
    const load = new IntersectionObserver(
      async ([entry]) => {
        if (!entry.isIntersecting) return;
        load.disconnect();
        const [{ default: lottie }, data] = await Promise.all([
          import("lottie-web/build/player/lottie_light"),
          fetch(`/lottie/${name}.json`).then((r) => r.json()),
        ]);
        if (cancelled) return;
        anim = lottie.loadAnimation({
          container: el,
          renderer: "svg",
          loop: false,
          autoplay: false,
          animationData: data,
        });
        if (still) anim.goToAndStop(anim.totalFrames - 1, true);
        setReady(true);
        if (seen && !still) anim.play();
      },
      { rootMargin: "300px 0px" },
    );
    const play = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        play.disconnect();
        seen = true;
        if (anim && !still) anim.play();
      },
      { threshold: 0.4 },
    );
    load.observe(el);
    play.observe(el);
    return () => {
      cancelled = true;
      load.disconnect();
      play.disconnect();
      anim?.destroy();
    };
  }, [name]);

  return (
    <div className="relative aspect-[480/380] w-full" role="img" aria-label={label}>
      <div ref={box} className={`absolute inset-0 ${ready ? "" : "invisible"}`} aria-hidden />
      {!ready && children ? (
        <div className="absolute inset-0" aria-hidden>
          {children}
        </div>
      ) : null}
    </div>
  );
}
