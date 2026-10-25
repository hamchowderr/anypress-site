export type Shot = { src: string; alt: string; width: number; height: number };

/** A platform or AnyPress logo in a small rounded tile. */
export function AppLogo({ src }: { src: string }) {
  return (
    <span className="app-logo">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" width={28} height={28} />
    </span>
  );
}

/** A real screenshot from the platform, in a window frame. */
export function Screenshot({ shot, label }: { shot: Shot; label: string }) {
  return (
    <figure className="appshot">
      <div className="appshot-bar" aria-hidden="true">
        <i />
        <i />
        <i />
        <span>{label}</span>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={shot.src}
        alt={shot.alt}
        width={shot.width}
        height={shot.height}
        loading="lazy"
      />
    </figure>
  );
}
