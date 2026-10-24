"use server";

// Sends the application form to the AnyPress API (POST /applications). Nothing is set up until the
// platform admin approves it on the dashboard; the API emails the applicant either way.

import { sendLead } from "@/lib/lead";

const API_URL = (process.env.WAAS_API_URL || "https://api.anypress.io").replace(/\/$/, "");


export type ApplyState = { status: "idle" } | { status: "sent"; email: string } | { status: "error"; message: string };

const field = (form: FormData, name: string) => String(form.get(name) ?? "").trim();

export async function apply(_prev: ApplyState, form: FormData): Promise<ApplyState> {
  // A field people never see. Bots fill it in; pretend it went.
  if (field(form, "company_phone")) return { status: "sent", email: field(form, "email") };

  const wantsStorefront = field(form, "has_site") === "no";
  const body = {
    name: field(form, "name"),
    email: field(form, "email"),
    business: field(form, "business"),
    website: field(form, "website") || undefined,
    clients: field(form, "clients"),
    expectedSites: field(form, "expected_sites"),
    wantsStorefront,
    storefrontSubdomain: wantsStorefront ? field(form, "subdomain").toLowerCase() || undefined : undefined,
  };

  let res: Response;
  try {
    res = await fetch(`${API_URL}/applications`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
      signal: AbortSignal.timeout(20_000),
    });
  } catch {
    return { status: "error", message: "We couldn't send your application. Please try again in a minute." };
  }
  if (res.ok) {
    // Also into the shop's CRM as Seller: Interested, with where they heard about us. A failure here
    // never fails the application.
    await sendLead({ email: body.email, name: body.name, interest: "Seller", source: field(form, "source") }).catch(() => null);
    return { status: "sent", email: body.email };
  }
  if (res.status === 409) {
    return { status: "error", message: "We already have an application from this email address. We'll be in touch soon." };
  }
  if (res.status === 400) {
    const answer = (await res.json().catch(() => null)) as { message?: string } | null;
    return { status: "error", message: plain(answer?.message) };
  }
  return { status: "error", message: "We couldn't send your application. Please try again later." };
}

/** The API's 400 messages, said the way the form labels its fields. */
function plain(message: string | undefined): string {
  if (!message) return "Please check the form and try again.";
  if (/taken/.test(message)) return message;
  const names: Record<string, string> = {
    name: "your name",
    email: "your email address",
    business: "your business name",
    website: "your website",
    clients: "who you sell websites to",
    expectedSites: "how many websites you expect to sell",
    storefrontSubdomain: "your storefront address",
  };
  const key = Object.keys(names).find((k) => message.startsWith(`${k} `));
  if (key === "storefrontSubdomain") return "Your storefront address can only use letters, digits and dashes.";
  if (key === "website") return "Please enter your website's address, or leave it empty.";
  return key ? `Please check ${names[key]}.` : "Please check the form and try again.";
}
