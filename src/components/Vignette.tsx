"use client";

import { useEffect, useRef } from "react";

type Player = {
  goToAndStop(f: number, isFrame: boolean): void;
  goToAndPlay(f: number, isFrame: boolean): void;
  totalFrames: number;
  destroy(): void;
};

/**
 * One of the little animated scenes (made by scripts/vignettes.mjs, served from public/lottie). The player only
 * loads once the scene is near the screen. It plays once when it scrolls into view, and again when the card around
 * it is hovered. With reduced motion it shows the last frame, which is the finished picture. Decoration only.
 */
export function Vignette({
  name,
  className = "",
}: {
  name: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let anim: Player | null = null;
    let dead = false;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const card = el.closest<HTMLElement>("[data-replay]") ?? el;
    const replay = () => anim && !still && anim.goToAndPlay(0, true);

    const io = new IntersectionObserver(
      async ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const [{ default: lottie }, data] = await Promise.all([
          import("lottie-web/build/player/lottie_light"),
          fetch(`/lottie/${name}.json`).then((r) => r.json()),
        ]);
        if (dead) return;
        anim = lottie.loadAnimation({
          container: el,
          renderer: "svg",
          loop: false,
          autoplay: false,
          animationData: data,
        }) as unknown as Player;
        if (still) anim.goToAndStop(anim.totalFrames - 1, true);
        else anim.goToAndPlay(0, true);
      },
      { rootMargin: "0px 0px -15% 0px" },
    );
    io.observe(el);
    card.addEventListener("mouseenter", replay);
    return () => {
      dead = true;
      io.disconnect();
      card.removeEventListener("mouseenter", replay);
      anim?.destroy();
    };
  }, [name]);

  return <div ref={ref} aria-hidden className={`vignette ${className}`} />;
}
