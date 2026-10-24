"use server";

// Sends a lead form to the shop's CRM (POST /wp-json/anypress/v1/lead on shop.anypress.io). New contacts get one
// email asking them to confirm; nothing else is sent until they do.

import { SHOP_URL } from "@/lib/site";

export type LeadState = { status: "idle" } | { status: "sent"; confirm: boolean } | { status: "error"; message: string };

const field = (form: FormData, name: string) => String(form.get(name) ?? "").trim();

/** Posts a lead. Also used by the seller application, which ignores the answer. */
export async function sendLead(body: Record<string, string>): Promise<Response> {
  return fetch(`${SHOP_URL}/wp-json/anypress/v1/lead`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
    signal: AbortSignal.timeout(15_000),
  });
}

export async function lead(_prev: LeadState, form: FormData): Promise<LeadState> {
  // A field people never see. Bots fill it in; pretend it went.
  if (field(form, "company_phone")) return { status: "sent", confirm: true };

  let res: Response;
  try {
    res = await sendLead({
      email: field(form, "email"),
      name: field(form, "name"),
      interest: field(form, "interest"),
      group: field(form, "group"),
      source: field(form, "source"),
      campaign: field(form, "campaign"),
    });
  } catch {
    return { status: "error", message: "We couldn't send that. Please try again in a minute." };
  }
  if (res.ok) {
    const answer = (await res.json().catch(() => null)) as { confirm?: boolean } | null;
    return { status: "sent", confirm: answer?.confirm !== false };
  }
  if (res.status === 400) return { status: "error", message: "Please check your email address." };
  if (res.status === 429) return { status: "error", message: "Too many sign-ups right now. Please try again later." };
  return { status: "error", message: "We couldn't send that. Please try again later." };
}
