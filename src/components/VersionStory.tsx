import { Screenshot } from "@/components/AppShots";

// A worked example of changing every client's site with versions of the starting site: each step shows the
// state the versions are in, sites moving over as dots, and the real Templates page beside it.

type Step = { title: string; body: string; tag: string; moved?: number; back?: boolean };

const SITES = 24;

const STEPS: Step[] = [
  { title: "Make a new version", tag: "v1.5 · a copy of v1.4", body: "One click copies your starting site. Every client's site stays on v1.4 and doesn't notice a thing." },
  { title: "Add the booking page", tag: "v1.5 · booking page added", body: "Add the plugin, build the page, change the menu. Only in v1.5." },
  { title: "Try it yourself", tag: "v1.5 · opened and checked", body: "Open v1.5 like a real site. Book a test appointment." },
  { title: "Move sites over", tag: "New orders get v1.5", body: "Move one client first, then the rest when you're happy. Their pages, orders and photos come with them.", moved: SITES },
  { title: "Go back if you need to", tag: "1 site back on v1.4", body: "A client who doesn't want it? Move their site back. v1.4 stays in your list.", moved: SITES - 1, back: true },
];

function Dots({ moved, back }: { moved: number; back?: boolean }) {
  return (
    <div className="vs-dots" aria-label={`${moved} of ${SITES} client sites on v1.5`}>
      {Array.from({ length: SITES }, (_, i) => (
        <i key={i} className={i < moved ? "on" : back ? "back" : undefined} />
      ))}
    </div>
  );
}

export function VersionStory() {
  return (
    <div className="vs">
      <p className="vs-ask">
        <span className="hand">for example</span>
        You want every client to get a booking page. You have {SITES} clients on version v1.4 of your starting site.
      </p>
      <div className="vs-body">
        <ol className="vs-steps">
          {STEPS.map((s, i) => (
            <li key={s.title}>
              <b>
                {i + 1}. {s.title}
              </b>
              <span className="vs-tag">{s.tag}</span>
              <p>{s.body}</p>
              {s.moved !== undefined && <Dots moved={s.moved} back={s.back} />}
            </li>
          ))}
        </ol>
        <Screenshot
          shot={{
            src: "/sell/seller-templates.webp",
            alt: "The Templates page in the AnyPress dashboard: saved versions of the starting site, with v1.4 marked Production and a New version button",
            width: 1440,
            height: 900,
          }}
          label="app.anypress.io · Templates (sample data)"
        />
      </div>
    </div>
  );
}
