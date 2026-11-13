"use server";

// "Make this my site" on /try: saves the demo the visitor built as a demo draft with the AnyPress API
// (POST /demos/drafts), and sends its photos to the upload links the API answers with. The store bought at checkout
// with the draft's id starts with the demo's pages, styles and photos.

import type { DemoExport } from "@/lib/demoExport";

const API_URL = (process.env.WAAS_API_URL || "https://api.anypress.io").replace(/\/$/, "");

export type SaveDemoResult =
  | { ok: true; id: string; uploads: { name: string; uploadUrl: string }[]; maxImageBytes: number }
  | { ok: false; message: string };

const SAVE_FAILED = "We couldn’t save your demo. Please try again in a minute.";

export async function saveDemo(siteType: string, demo: DemoExport): Promise<SaveDemoResult> {
  let res: Response;
  try {
    res = await fetch(`${API_URL}/demos/drafts`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ siteType, content: demo.content, images: demo.images.map((i) => i.name) }),
      cache: "no-store",
      signal: AbortSignal.timeout(20_000),
    });
  } catch {
    return { ok: false, message: SAVE_FAILED };
  }
  const answer = (await res.json().catch(() => null)) as
    | { id?: string; uploads?: { name: string; uploadUrl: string }[]; maxImageBytes?: number; message?: string }
    | null;
  if (!res.ok || !answer?.id) {
    // The API's 4xx messages are written for the visitor (too large, too many saved right now).
    const message = res.status >= 400 && res.status < 500 && typeof answer?.message === "string" ? answer.message : SAVE_FAILED;
    return { ok: false, message };
  }
  return { ok: true, id: answer.id, uploads: answer.uploads ?? [], maxImageBytes: answer.maxImageBytes ?? 0 };
}

/** Only the API's upload links: object storage, over https. */
function isUploadLink(raw: string): boolean {
  try {
    const url = new URL(raw);
    return url.protocol === "https:" && url.hostname.endsWith(".r2.cloudflarestorage.com");
  } catch {
    return false;
  }
}

/** One photo to its upload link. A photo that doesn't arrive keeps its placeholder; the rest of the demo still counts. */
export async function uploadDemoImage(uploadUrl: string, photo: Blob): Promise<boolean> {
  if (!isUploadLink(uploadUrl) || !(photo instanceof Blob) || photo.size === 0) return false;
  try {
    const res = await fetch(uploadUrl, {
      method: "PUT",
      body: photo,
      cache: "no-store",
      signal: AbortSignal.timeout(30_000),
    });
    return res.ok;
  } catch {
    return false;
  }
}

/**
 * A sign-in for the website assistant beside the demo's page editor (the API's POST /demos/assistant): a demo has no
 * store of its own, so the assistant gets a few messages for this demo, and only changes the page open in the editor.
 * null when the API can't give one right now; the demo works without it.
 */
export async function startDemoAssistant(siteType: string): Promise<string | null> {
  try {
    const res = await fetch(`${API_URL}/demos/assistant`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ siteType }),
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    });
    const answer = (await res.json().catch(() => null)) as { token?: unknown } | null;
    return res.ok && typeof answer?.token === "string" && /^apdemo_[A-Za-z0-9_-]{43}$/.test(answer.token) ? answer.token : null;
  } catch {
    return null;
  }
}

/** A branded demo made for one business (the API's prospect demos): who it is for and what was read from its website. */
export type ProspectDemo = { company: string; route: string; siteType: string; kit: string | null; brand: unknown };

/** The demo for anypress.io/try?for=<code>, or null when the link is wrong or the demo isn't ready. */
export async function prospectDemo(code: string): Promise<ProspectDemo | null> {
  if (!/^p_[A-Za-z0-9_-]{16}$/.test(code)) return null;
  try {
    const res = await fetch(`${API_URL}/demos/prospects/${code}`, { cache: "no-store", signal: AbortSignal.timeout(10_000) });
    if (!res.ok) return null;
    const demo = (await res.json()) as ProspectDemo;
    return typeof demo?.company === "string" ? demo : null;
  } catch {
    return null;
  }
}
