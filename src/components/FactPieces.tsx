import type { ReactNode } from "react";
import { Screenshot } from "@/components/AppShots";
import { Drawing, type DrawingName } from "@/components/Drawing";
import { Tick } from "@/components/Tick";
import { VideoTile } from "@/components/VideoTile";
import { ICONS, type IconName } from "@/components/icons.generated";

// Pieces shared by the pages that ask someone to commit (the beta, selling, reselling): a fact sheet,
// real dashboard screens with what each lets you do, and a row of how-to videos.

/** A hand-drawn icon from the sketch set. */
export function SketchIcon({ name }: { name: IconName }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden fill="none" strokeLinecap="round" className="sketch-icon" dangerouslySetInnerHTML={{ __html: ICONS[name] }} />
  );
}

export type Fact = [icon: IconName, term: string, detail: ReactNode];

/** The offer in one look: what it is, what it costs, what's asked of you. */
export function FactSheet({ facts }: { facts: Fact[] }) {
  return (
    <dl className="beta-facts">
      {facts.map(([icon, term, detail]) => (
        <div key={term}>
          <dt>
            <SketchIcon name={icon} />
            {term}
          </dt>
          <dd>{detail}</dd>
        </div>
      ))}
    </dl>
  );
}

export type DashboardShot = { src: string; label: string; alt: string; title: string; points: string[] };

/** Real dashboard screens (sample data), each beside what it lets you do. */
export function DashboardTour({ shots }: { shots: DashboardShot[] }) {
  return (
    <div className="beta-dash">
      {shots.map((d) => (
        <div key={d.src}>
          <Screenshot shot={{ src: d.src, alt: d.alt, width: 1440, height: 900 }} label={d.label} />
          <div>
            <h3>{d.title}</h3>
            <ul>
              {d.points.map((pt) => (
                <li key={pt}>
                  <Tick className="mt-1 h-[18px] w-[18px] flex-none text-tick-green" />
                  {pt}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}

export type Video = [slug: string, title: string, length: string];

/** How-to videos recorded on the real product (public/videos). */
export function VideoRow({ videos }: { videos: Video[] }) {
  return (
    <ul className="beta-videos">
      {videos.map(([slug, title, length]) => (
        <li key={slug}>
          <VideoTile slug={slug} title={title} length={length} />
        </li>
      ))}
    </ul>
  );
}

/** A plain table with a header row and a first column of row names, scrolling sideways on a phone. */
export function PlainTable({ label, head, rows }: { label: string; head: string[]; rows: ReactNode[][] }) {
  return (
    <div className="compare">
      <div className="tablewrap" tabIndex={0} role="region" aria-label={label}>
        <table>
          <thead>
            <tr>
              {head.map((h, i) => (
                <th key={h || i} scope="col">
                  {h || <span className="sr-only">{label}</span>}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(([first, ...rest], i) => (
              <tr key={i}>
                <th scope="row">{first}</th>
                {rest.map((c, j) => (
                  <td key={j}>{c}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/** Numbered steps in a row, each with its drawing. */
export function Flow({ steps }: { steps: [DrawingName, string, ReactNode][] }) {
  return (
    <ol className="flow !mt-0">
      {steps.map(([d, title, body], i) => (
        <li key={title}>
          <Drawing name={d} />
          <b>
            {i + 1}. {title}
          </b>
          <span>{body}</span>
        </li>
      ))}
    </ol>
  );
}
