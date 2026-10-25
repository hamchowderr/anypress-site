import { cookies } from "next/headers";
import { AB_COOKIE, AB_EVENTS, AB_TEST, parseAbCookie, type AbEvent } from "@/lib/ab";

// Stores one A/B test event: { event: "view" | "start" | "shop", path }. The version and visitor come from the
// cookie src/proxy.ts set, never from the body. Rows go to the ab_events table, which this key can only add to.
const DB_URL = process.env.AB_SUPABASE_URL;
const DB_KEY = process.env.AB_SUPABASE_KEY;

export async function POST(request: Request) {
  const who = parseAbCookie((await cookies()).get(AB_COOKIE)?.value);
  let body: { event?: string; path?: string } = {};
  try {
    body = JSON.parse(await request.text());
  } catch {}
  const event = body.event as AbEvent;
  if (!who || !AB_EVENTS.includes(event) || !DB_URL || !DB_KEY) return new Response(null, { status: 204 });

  await fetch(`${DB_URL}/rest/v1/ab_events`, {
    method: "POST",
    headers: { apikey: DB_KEY, "Content-Type": "application/json", Prefer: "return=minimal" },
    body: JSON.stringify({ test: AB_TEST, variant: who.version, event, visitor: who.visitor, path: String(body.path ?? "").slice(0, 200) }),
    cache: "no-store",
    signal: AbortSignal.timeout(5_000),
  }).catch(() => undefined);
  return new Response(null, { status: 204 });
}
