"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type * as PlaygroundClientModuleType from "@wp-playground/client";
import { LogoMark } from "@/components/Logo";
import { saveDemo, uploadDemoImage } from "@/app/try/actions";
import { DEMO_EXPORT_PHP, type DemoExport } from "@/lib/demoExport";
import { SITE_TYPES, startUrl } from "@/lib/site";
import {
  PLAYGROUND_CLIENT,
  PLAYGROUND_REMOTE,
  TRY_TYPES,
  type TryType,
  isOurBlueprint,
  isTryType,
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

// Our own words while the site starts (Playground's own captions name plugin slugs), by how far along it is. Each
// stage's lines take turns, so the screen keeps moving through the wait; most of it is the sample business.
const FILLING: Record<TryType, string[]> = {
  website: [
    "Writing six months of blog posts",
    "Sending past newsletters to the mailing list",
  ],
  bookings: [
    "Booking three months of sessions",
    "Filling the calendar for the next two weeks",
  ],
  store: [
    "Taking six months of orders",
    "Stocking the shop with real products",
  ],
  community: [
    "Bringing in members, posts and comments",
    "Opening the course and its lessons",
  ],
  everything: [
    "Taking orders, bookings and members",
    "Writing six months of blog posts",
  ],
  highlevel: [
    "Writing six months of blog posts",
    "Building the business's pages",
  ],
};
const stageLines = (progress: number, type?: TryType) =>
  progress < 25
    ? [
        "Starting WordPress in your browser",
        "Nothing to install: it all runs on this page",
      ]
    : progress < 85
      ? [
          "Adding the design and the tools for this site",
          "Switching on the plugins this site comes with",
        ]
      : [
          "Loading sample data so every screen has something to show",
          ...(type ? FILLING[type] : []),
          "Setting up the pages",
          "Almost there",
        ];
const LINE_SECONDS = 4;

/** Seconds since the loading screen appeared, counting while it shows. */
function useSeconds(running: boolean) {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    if (!running) return;
    const start = Date.now();
    const timer = setInterval(
      () => setSeconds(Math.floor((Date.now() - start) / 1000)),
      1000,
    );
    return () => clearInterval(timer);
  }, [running]);
  return seconds;
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
      window.location.assign(await keepDemo(client.current, type));
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
          ) : (
            <p className="hidden max-w-[17rem] text-right text-[13px] leading-snug text-[#5f5a55] xl:block">
              {keep.can
                ? "Runs in your browser. Change anything; it comes with you to checkout."
                : "Runs in your browser. Click around and change anything."}
            </p>
          )}
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
    </header>
  );
}

/** A site running in WordPress Playground, in this page, with our own bar and loading screen. */
function TryPlayground({
  blueprintUrl,
  title,
  type,
}: {
  blueprintUrl: string;
  title: string;
  type?: TryType;
}) {
  const iframe = useRef<HTMLIFrameElement>(null);
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const client = useRef<PlaygroundClient | null>(null);
  const keepState = useKeepDemo(client, ready ? type : undefined);
  const seconds = useSeconds(!ready && !failed);
  const lines = stageLines(progress, type);
  const line = lines[Math.floor(seconds / LINE_SECONDS) % lines.length];

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
      client.current = await start({
        iframe: frame,
        remoteUrl: PLAYGROUND_REMOTE,
        blueprint: await res.json(),
        progressTracker: tracker as unknown as WebTracker,
        disableProgressBar: true,
      });
      if (!gone) setReady(true);
    })().catch((err) => {
      console.error(err);
      if (!gone) setFailed(true);
    });
    return () => {
      gone = true;
    };
  }, [blueprintUrl, attempt]);

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
                <>
                  <p className="text-[19px] font-extrabold">
                    This demo didn’t start.
                  </p>
                  <p className="mt-2 text-[15px] text-[#5f5a55]">
                    It runs in your browser, so a private window or a blocked
                    site can stop it. Try once more.
                  </p>
                  <button
                    type="button"
                    onClick={retry}
                    className="btn btn-ink mt-5"
                  >
                    Try again
                  </button>
                </>
              ) : (
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
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/** /try's site, from its link: a site type's demo, or one of our blueprints. */
export function TryFromQuery() {
  const q = useSearchParams();
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
