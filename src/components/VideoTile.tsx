"use client";

import { useState } from "react";

/** A how-to video shown as its poster with a play button; the player loads only when someone presses play. */
export function VideoTile({ slug, title, length }: { slug: string; title: string; length: string }) {
  const [playing, setPlaying] = useState(false);
  return (
    <figure className="video-tile">
      {playing ? (
        <video controls autoPlay playsInline poster={`/videos/${slug}.jpg`} width={1280} height={720}>
          <source src={`/videos/${slug}.mp4`} type="video/mp4" />
        </video>
      ) : (
        <button type="button" onClick={() => setPlaying(true)} aria-label={`Play: ${title} (${length})`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`/videos/${slug}.jpg`} alt="" width={1280} height={720} loading="lazy" />
          <span className="play" aria-hidden>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5.5v13l11-6.5z" />
            </svg>
          </span>
        </button>
      )}
    </figure>
  );
}
