"use client";

import { useActionState } from "react";
import { lead, type LeadState } from "@/lib/lead";
import { SOURCES } from "@/lib/sources";
import { SITE_TYPES } from "@/lib/site";

const input =
  "mt-1 block w-full rounded-md border border-line bg-bg px-3 py-2 text-fg placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent";

/**
 * Name, email, what they want and how they heard about us, into the shop's CRM.
 * `group` is the customer group the page is for; `interest` fixes the answer to "what do you want" (e.g. Seller).
 */
export function LeadForm({ group = "", interest, cta = "Send it to me" }: { group?: string; interest?: string; cta?: string }) {
  const [state, action, pending] = useActionState<LeadState, FormData>(lead, { status: "idle" });

  if (state.status === "sent") {
    return (
      <div className="mt-4" role="status">
        <p className="font-semibold">Thanks, you&apos;re on the list.</p>
        <p className="mt-2 text-ink-soft">
          {state.confirm
            ? "Check your inbox for one email from us and click the button in it to confirm. Then we'll send what you asked for."
            : "We'll send what you asked for shortly."}
        </p>
      </div>
    );
  }

  return (
    <form action={action} className="mt-6 grid gap-5 sm:grid-cols-2">
      <input type="hidden" name="group" value={group} />
      <CampaignField />
      <label className="block text-sm font-medium">
        Your name
        <input name="name" maxLength={100} autoComplete="name" className={input} />
      </label>
      <label className="block text-sm font-medium">
        Email
        <input name="email" type="email" required maxLength={254} autoComplete="email" className={input} />
      </label>
      {interest ? (
        <input type="hidden" name="interest" value={interest} />
      ) : (
        <label className="block text-sm font-medium">
          What would you like to build?
          <select name="interest" defaultValue="" className={input}>
            <option value="">Not sure yet</option>
            {SITE_TYPES.map((t) => (
              <option key={t.id} value={t.short}>
                {t.name}
              </option>
            ))}
            <option value="Seller">Sell websites to my clients</option>
          </select>
        </label>
      )}
      <label className="block text-sm font-medium">
        How did you hear about us? <span className="font-normal text-muted">(optional)</span>
        <select name="source" defaultValue="" className={input}>
          <option value="">Choose one</option>
          {SOURCES.map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </label>

      {/* Hidden from people; bots fill it in. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Company phone
          <input name="company_phone" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="sm:col-span-2">
        {state.status === "error" && (
          <p className="mb-3 text-sm text-red-700" role="alert">
            {state.message}
          </p>
        )}
        <button type="submit" disabled={pending} className="btn btn-ink disabled:opacity-60">
          {pending ? "Sending…" : cta}
        </button>
        <p className="mt-3 text-sm text-ink-soft">One email to confirm, then the occasional tip. Unsubscribe any time.</p>
      </div>
    </form>
  );
}

/** The utm_campaign the visitor arrived with, if any, so we know which shared link brought them. */
function CampaignField() {
  const campaign =
    typeof window === "undefined" ? "" : (new URLSearchParams(window.location.search).get("utm_campaign") ?? "").slice(0, 100);
  return <input type="hidden" name="campaign" value={campaign} suppressHydrationWarning />;
}
