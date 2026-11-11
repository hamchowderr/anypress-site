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
type PlaygroundClient = Awaited<ReturnType<PlaygroundClientModule["startPlaygroundWeb"]>>;
type WebTracker = NonNullable<
  Parameters<PlaygroundClientModule["startPlaygroundWeb"]>[0]["progressTracker"]
>;

// Our own words while the site starts, by how far along it is (Playground's own captions name plugin slugs).
const stageCaption = (progress: number) =>
  progress < 25
    ? "Starting WordPress in your browser"
    : progress < 85
      ? "Adding the design and the tools for this site"
      : "Setting up the pages";

/** The shop's page for the site type's plan, carrying the saved demo to checkout. */
function demoCheckout(type: TryType, demoId: string): string | null {
  const t = SITE_TYPES.find((s) => s.id === type);
  if (!t) return null;
  const url = new URL(startUrl(t));
  url.searchParams.set("demo", demoId);
  return url.toString();
}

/** Reads the demo out of its WordPress, saves it as a draft with its photos, and answers the checkout link. */
async function keepDemo(client: PlaygroundClient, type: TryType): Promise<string> {
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
  const [keeping, setKeeping] = useState(false);
  const [keepError, setKeepError] = useState("");
  // The shop sells HighLevel sites through their own page, so only the other site types keep their demo.
  const canKeep = ready && type !== undefined && type !== "highlevel";

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

  const keep = async () => {
    if (!client.current || !type || keeping) return;
    setKeeping(true);
    setKeepError("");
    try {
      window.location.assign(await keepDemo(client.current, type));
    } catch (err) {
      console.error(err);
      setKeepError(err instanceof Error && err.message.length < 200 ? err.message : "We couldn’t save your demo. Please try again.");
      setKeeping(false);
    }
  };

  const retry = () => {
    setFailed(false);
    setReady(false);
    setProgress(0);
    setAttempt((n) => n + 1);
  };

  return (
    <div className="fixed inset-0 z-[60] flex flex-col bg-[var(--paper-2,#faf8f5)]">
      <header className="flex items-center gap-3 border-b border-[#e9e4de] bg-white px-4 py-2 sm:px-5">
        <Link
          href="/"
          aria-label="AnyPress home"
          className="shrink-0 rounded-md"
        >
          <LogoMark className="h-7 w-7" />
        </Link>
        <div className="min-w-0 flex-1 leading-tight">
          {type ? (
            <label className="flex items-center gap-2">
              <span className="sr-only">Site type</span>
              <select
                value={type}
                onChange={(e) =>
                  window.location.assign(tryType(e.target.value as TryType))
                }
                className="max-w-full truncate rounded-md border border-[#e9e4de] bg-white py-1 pl-2 pr-7 text-[15px] font-bold"
              >
                {(Object.keys(TRY_TYPES) as TryType[]).map((t) => (
                  <option key={t} value={t}>
                    {TRY_TYPES[t].name}
                  </option>
                ))}
              </select>
            </label>
          ) : (
            <p className="truncate text-[15px] font-bold">{title}</p>
          )}
          {keepError ? (
            <p role="alert" className="truncate text-[13px] text-[#b4232c]">
              {keepError}
            </p>
          ) : (
            <p className="hidden truncate text-[13px] text-[#5f5a55] sm:block">
              {canKeep
                ? "Runs in your browser. Change anything, then make it your site: it comes with you to checkout."
                : "Runs in your browser. Click around and change anything; nothing is saved."}
            </p>
          )}
        </div>
        {canKeep ? (
          <button
            type="button"
            onClick={keep}
            disabled={keeping}
            className="btn btn-ink shrink-0 !px-4 !py-2 text-[15px] disabled:opacity-70"
          >
            {keeping ? "Saving your site…" : "Make this my site"}
          </button>
        ) : (
          <Link
            href={buyHref(type)}
            className="btn btn-ink shrink-0 !px-4 !py-2 text-[15px]"
          >
            Get this site
          </Link>
        )}
      </header>
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
                  <p className="mt-4 text-[19px] font-extrabold">
                    {stageCaption(progress)}
                  </p>
                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#f1ede8]">
                    <div
                      className="h-full rounded-full bg-[linear-gradient(90deg,#ffb338,#ff7a2a,#ee2f5e)] transition-[width] duration-500"
                      style={{ width: `${Math.max(progress, 4)}%` }}
                    />
                  </div>
                  <p className="mt-3 text-[14px] text-[#5f5a55]">
                    A real WordPress site, built in your browser. This takes
                    about a minute the first time.
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
