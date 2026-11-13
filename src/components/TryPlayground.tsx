"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import type * as PlaygroundClientModuleType from "@wp-playground/client";
import { LogoMark } from "@/components/Logo";
import { prospectDemo, saveDemo, startDemoAssistant, uploadDemoImage, type ProspectDemo } from "@/app/try/actions";
import { DEMO_EXPORT_PHP, type DemoExport } from "@/lib/demoExport";
import { SITE_TYPES, startUrl } from "@/lib/site";
import {
  PLAYGROUND_CLIENT,
  PLAYGROUND_REMOTE,
  TRY_TYPES,
  type TryType,
  isOurBlueprint,
  isTryType,
  prospectSteps,
  prospectType,
  tryType,
  typeBlueprint,
} from "@/lib/try";

// The client bundles its own copy of the same ProgressTracker class (@php-wasm/progress at the same version).
type PlaygroundClientModule = typeof PlaygroundClientModuleType;
type PlaygroundClient = Awaited<
  ReturnType<PlaygroundClientModule["startPlaygroundWeb"]>
>;
type WebTracker = NonNullable<
  Parameters<PlaygroundClientModule["startPlaygroundWeb"]>[0]["progressTracker"]
>;

// Our own words while the site starts (Playground's own captions name plugin slugs): a line every few seconds, in
// random order, from what every demo does and what this site type's business is filled with.
const ALWAYS = [
  "Starting WordPress in your browser",
  "Nothing to install: it all runs on this page",
  "Adding the design and the tools for this site",
  "Switching on the plugins this site comes with",
  "Loading sample data so every screen has something to show",
  "Filling in months of history, so it feels lived in",
  "Writing six months of blog posts",
  "Sending past newsletters to the mailing list",
  "Adding contacts to the CRM",
  "Filling in a few form entries",
  "Setting up the pages and the menu",
  "Putting the kettle on",
];
const FILLING: Record<TryType, string[]> = {
  website: ["Planning the next newsletter", "Lining up a sponsored post"],
  bookings: [
    "Booking three months of sessions",
    "Filling the calendar for the next two weeks",
    "Taking payment for paid sessions",
  ],
  store: [
    "Taking six months of orders",
    "Stocking the shop with real products",
    "Packing a few parcels",
  ],
  community: [
    "Bringing in members, posts and comments",
    "Opening the course and its lessons",
    "Signing up the first members",
  ],
  everything: [
    "Taking orders, bookings and members",
    "Opening the course and its lessons",
    "Booking a few sessions",
  ],
  highlevel: ["Building the business's pages", "Connecting the contact forms"],
};
const LINES = Object.fromEntries(
  Object.entries(FILLING).map(([type, more]) => [type, [...ALWAYS, ...more]]),
) as Record<TryType, string[]>;
const LINE_SECONDS = 4;

/** A line from the list every few seconds, in a random order that shows every line before any comes back. */
function useRandomLine(lines: string[]) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    // The first line stays first ("Starting WordPress"); the rest are shuffled.
    const order = lines.map((_, i) => i).slice(1);
    for (let i = order.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [order[i], order[j]] = [order[j], order[i]];
    }
    let next = 0;
    const timer = setInterval(() => {
      setIndex(order[next % order.length]);
      next += 1;
    }, LINE_SECONDS * 1000);
    return () => clearInterval(timer);
  }, [lines]);
  return lines[index % lines.length];
}

/** Seconds since the loading screen appeared. */
function useSeconds() {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    const start = Date.now();
    const timer = setInterval(
      () => setSeconds(Math.floor((Date.now() - start) / 1000)),
      1000,
    );
    return () => clearInterval(timer);
  }, []);
  return seconds;
}

/**
 * The website assistant beside the demo's page editor: AnyPress Client shows its panel once the demo holds a demo
 * sign-in (ANYPRESS_DEMO_ASSISTANT). Without one, the demo works as before, edited by hand.
 */
async function addAssistant(client: PlaygroundClient, type: TryType): Promise<void> {
  const token = await startDemoAssistant(TRY_TYPES[type].blueprint);
  if (!token) return;
  const dir = "/wordpress/wp-content/mu-plugins";
  await client.mkdir(dir);
  await client.writeFile(`${dir}/anypress-demo-assistant.php`, `<?php\ndefine('ANYPRESS_DEMO_ASSISTANT', '${token}');\n`);
}

/** The shop's page for the site type's plan, carrying the saved demo to checkout. */
function demoCheckout(type: TryType, demoId: string): string | null {
  const t = SITE_TYPES.find((s) => s.id === type);
  if (!t) return null;
  const url = new URL(startUrl(t));
  url.searchParams.set("demo", demoId);
  return url.toString();
}

/** Reads the demo out of its WordPress, saves it as a draft with its photos, and answers the checkout link. */
async function keepDemo(
  client: PlaygroundClient,
  type: TryType,
): Promise<string> {
  const out = await client.run({ code: DEMO_EXPORT_PHP });
  const demo = JSON.parse(out.text) as DemoExport;
  const saved = await saveDemo(TRY_TYPES[type].blueprint, demo);
  if (!saved.ok) throw new Error(saved.message);
  await Promise.all(
    saved.uploads.map(async ({ name, uploadUrl }) => {
      const image = demo.images.find((i) => i.name === name);
      if (!image) return;
      const bytes = await client.readFileAsBuffer(image.path);
      if (saved.maxImageBytes && bytes.byteLength > saved.maxImageBytes) return;
      await uploadDemoImage(uploadUrl, new Blob([bytes as BlobPart]));
    }),
  );
  return demoCheckout(type, saved.id) ?? buyHref(type);
}

function buyHref(type?: TryType) {
  if (type === "highlevel") return "/highlevel";
  const t = type && SITE_TYPES.find((s) => s.id === type);
  return t ? startUrl(t) : "/pricing";
}

type KeepDemo = { can: boolean; busy: boolean; error: string; run: () => void };

/** Set when the page leaves on purpose (to checkout), so the close warning stays quiet. */
const leavingOnPurpose = { current: false };

/** Nothing in a demo is kept: once it is running, the browser asks before the tab closes or reloads. */
function useWarnBeforeClose(running: boolean) {
  useEffect(() => {
    if (!running) return;
    const warn = (e: BeforeUnloadEvent) => {
      if (leavingOnPurpose.current) return;
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [running]);
}

/** "Make this my site": the shop sells HighLevel sites through their own page, so only the other site types keep their demo. */
function useKeepDemo(
  client: { current: PlaygroundClient | null },
  type?: TryType,
): KeepDemo {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const run = async () => {
    if (!client.current || !type || busy) return;
    setBusy(true);
    setError("");
    try {
      const checkout = await keepDemo(client.current, type);
      leavingOnPurpose.current = true;
      window.location.assign(checkout);
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error && err.message.length < 200
          ? err.message
          : "We couldn’t save your demo. Please try again.",
      );
      setBusy(false);
    }
  };
  return {
    can: type !== undefined && type !== "highlevel",
    busy,
    error,
    run: () => void run(),
  };
}

/** Our bar over the demo: home, the site type (or the example's name), and the way to keep it. */
function TryBar({
  title,
  type,
  keep,
}: {
  title: string;
  type?: TryType;
  keep: KeepDemo;
}) {
  return (
    <header className="border-b border-[#e9e4de] bg-white">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 px-4 py-2.5 sm:px-5">
        <Link
          href="/"
          aria-label="AnyPress home"
          className="shrink-0 rounded-md"
        >
          <LogoMark className="h-7 w-7" />
        </Link>
        {type ? (
          <nav
            aria-label="Site type"
            className="order-last -mx-4 flex w-[calc(100%+2rem)] gap-1.5 overflow-x-auto px-4 [scrollbar-width:none] md:order-none md:mx-0 md:w-auto md:flex-1 md:px-0"
          >
            {(Object.keys(TRY_TYPES) as TryType[]).map((t) => (
              <Link
                key={t}
                href={tryType(t)}
                aria-current={t === type ? "page" : undefined}
                className={`shrink-0 rounded-full border px-3.5 py-1.5 text-[14px] font-bold transition-colors ${
                  t === type
                    ? "border-[#141414] bg-[#141414] text-white"
                    : "border-[#e9e4de] text-[#141414] hover:border-[#141414]"
                }`}
              >
                {TRY_TYPES[t].short}
              </Link>
            ))}
          </nav>
        ) : (
          <p className="min-w-0 flex-1 truncate text-[15px] font-bold">
            {title}
          </p>
        )}
        <div className="ml-auto flex shrink-0 items-center gap-3">
          {keep.error ? (
            <p
              role="alert"
              className="hidden max-w-[22rem] text-right text-[13px] leading-snug text-[#b4232c] lg:block"
            >
              {keep.error}
            </p>
          ) : null}
          {keep.can ? (
            <button
              type="button"
              onClick={keep.run}
              disabled={keep.busy}
              className="btn btn-ink shrink-0 !px-4 !py-2 text-[15px] disabled:opacity-70"
            >
              {keep.busy ? "Saving your site…" : "Make This My Site"}
            </button>
          ) : (
            <Link
              href={buyHref(type)}
              className="btn btn-ink shrink-0 !px-4 !py-2 text-[15px]"
            >
              Get This Site
            </Link>
          )}
        </div>
      </div>
      {keep.error ? (
        <p
          role="alert"
          className="px-4 pb-2 text-[13px] text-[#b4232c] sm:px-5 lg:hidden"
        >
          {keep.error}
        </p>
      ) : null}
      <p className="border-t border-[#f1ede8] bg-[#fff8ea] px-4 py-1.5 text-[13px] leading-snug text-[#5f5a55] sm:px-5">
        {keep.can
          ? "This demo runs in your browser and isn’t saved. Closing this tab clears it, and the same link starts a fresh one. To keep your changes, click Make This My Site."
          : "This demo runs in your browser and isn’t saved. Closing this tab clears it, and the same link starts a fresh one."}
      </p>
    </header>
  );
}

/** The demo couldn't start: why that happens, and another try. */
function DemoFailed({ onRetry }: { onRetry: () => void }) {
  return (
    <>
      <p className="text-[19px] font-extrabold">This demo didn’t start.</p>
      <p className="mt-2 text-[15px] text-[#5f5a55]">
        It runs in your browser, so a private window or a blocked site can stop
        it. Try once more.
      </p>
      <button type="button" onClick={onRetry} className="btn btn-ink mt-5">
        Try again
      </button>
    </>
  );
}

/** While the demo starts: how long it takes, a line for what it is doing now, and the bar. */
function DemoStarting({
  progress,
  type,
}: {
  progress: number;
  type?: TryType;
}) {
  const seconds = useSeconds();
  const line = useRandomLine(type ? LINES[type] : ALWAYS);
  return (
    <>
      <LogoMark className="mx-auto h-12 w-12 motion-safe:animate-pulse" />
      <p className="mt-4 text-[22px] font-extrabold">
        Hang tight, this takes about a minute
      </p>
      <p
        key={line}
        className="mt-2 min-h-[48px] text-[17px] text-[#3d3935] motion-safe:animate-[fadeIn_400ms_ease-out]"
      >
        {line}…
      </p>
      <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#f1ede8]">
        <div
          className="h-full rounded-full bg-[linear-gradient(90deg,#ffb338,#ff7a2a,#ee2f5e)] transition-[width] duration-500"
          style={{ width: `${Math.max(progress, 4)}%` }}
        />
      </div>
      <p className="mt-3 text-[14px] text-[#5f5a55]">
        {seconds < 75
          ? "We're building a real WordPress site in your browser, full of sample data, so you can click through everything."
          : "Still going. On a slower computer it can take up to two minutes."}
      </p>
    </>
  );
}

/** A site running in WordPress Playground, in this page, with our own bar and loading screen. */
function TryPlayground({
  blueprintUrl,
  title,
  type,
  steps,
}: {
  blueprintUrl: string;
  title: string;
  type?: TryType;
  /** Steps added after the blueprint's own (a prospect demo's branding). */
  steps?: unknown[];
}) {
  const iframe = useRef<HTMLIFrameElement>(null);
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const client = useRef<PlaygroundClient | null>(null);
  const keepState = useKeepDemo(client, ready ? type : undefined);
  useWarnBeforeClose(ready);

  useEffect(() => {
    const frame = iframe.current;
    if (!frame) return;
    let gone = false;
    (async () => {
      // From our own Playground, in the browser only: the client starts only the remote.html served next to it.
      const [{ startPlaygroundWeb: start }, { ProgressTracker }] =
        await Promise.all([
          import(
            /* webpackIgnore: true */ /* turbopackIgnore: true */ PLAYGROUND_CLIENT
          ) as Promise<PlaygroundClientModule>,
          import("@php-wasm/progress"),
        ]);
      const tracker = new ProgressTracker();
      tracker.addEventListener("progress", (e: Event) => {
        const { progress: p } = (e as CustomEvent<{ progress: number }>).detail;
        if (!gone) setProgress((prev) => Math.max(prev, Math.round(p)));
      });
      const res = await fetch(blueprintUrl, { cache: "no-store" });
      if (!res.ok) throw new Error(`Blueprint ${res.status}`);
      const blueprint = await res.json();
      if (steps?.length) blueprint.steps = [...(blueprint.steps ?? []), ...steps];
      client.current = await start({
        iframe: frame,
        remoteUrl: PLAYGROUND_REMOTE,
        blueprint,
        progressTracker: tracker as unknown as WebTracker,
        disableProgressBar: true,
      });
      if (type) await addAssistant(client.current, type);
      if (!gone) setReady(true);
    })().catch((err) => {
      console.error(err);
      if (!gone) setFailed(true);
    });
    return () => {
      gone = true;
    };
  }, [blueprintUrl, attempt, type, steps]);

  const retry = () => {
    setFailed(false);
    setReady(false);
    setProgress(0);
    setAttempt((n) => n + 1);
  };

  return (
    <div className="fixed inset-0 z-[60] flex flex-col bg-[var(--paper-2,#faf8f5)]">
      <TryBar title={title} type={type} keep={keepState} />
      <div className="relative flex-1">
        <iframe
          key={attempt}
          ref={iframe}
          title={`${title}, running in your browser`}
          className={`absolute inset-0 h-full w-full border-0 bg-white transition-opacity duration-300 ${ready ? "opacity-100" : "opacity-0"}`}
        />
        {!ready && (
          <div
            className="absolute inset-0 flex items-center justify-center px-6"
            role="status"
            aria-live="polite"
          >
            <div className="w-full max-w-sm text-center">
              {failed ? (
                <DemoFailed onRetry={retry} />
              ) : (
                <DemoStarting progress={progress} type={type} />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/** A demo made for one business (/try?for=<code>): its site type's demo, in its look. */
function TryProspect({ code }: { code: string }) {
  const [demo, setDemo] = useState<ProspectDemo | null | undefined>(undefined);
  useEffect(() => {
    let gone = false;
    prospectDemo(code).then((d) => {
      if (!gone) setDemo(d);
    });
    return () => {
      gone = true;
    };
  }, [code]);
  const steps = useMemo(() => (demo ? prospectSteps(demo) : undefined), [demo]);
  if (demo === undefined) return null;
  if (!demo || !steps)
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-6 text-center">
        <p>
          This demo link isn’t ready yet, or it has ended.{" "}
          <Link href="/try" className="underline">
            Try AnyPress here
          </Link>
          .
        </p>
      </div>
    );
  const type = prospectType(demo.siteType);
  return (
    <TryPlayground
      blueprintUrl={typeBlueprint(type)}
      title={`${demo.company}`.slice(0, 60)}
      type={type}
      steps={steps}
    />
  );
}

/** /try's site, from its link: a demo made for a business, a site type's demo, or one of our blueprints. */
export function TryFromQuery() {
  const q = useSearchParams();
  const forCode = q.get("for");
  if (forCode) return <TryProspect code={forCode} />;
  const blueprint = q.get("blueprint");
  if (isOurBlueprint(blueprint))
    return (
      <TryPlayground
        blueprintUrl={blueprint}
        title={(q.get("title") ?? "Example site").slice(0, 60)}
      />
    );
  const param = q.get("type");
  const type: TryType = isTryType(param) ? param : "website";
  return (
    <TryPlayground
      key={type}
      blueprintUrl={typeBlueprint(type)}
      title={TRY_TYPES[type].name}
      type={type}
    />
  );
}
