"use client";

import { useActionState, useState } from "react";
import { apply, type ApplyState } from "./actions";
import { SOURCES } from "@/lib/sources";
import { AUDIENCES, EXPECTED_SITES } from "./options";
import PRICES from "@/lib/pricing.json";

const input =
  "mt-1 block w-full rounded-md border border-line bg-bg px-3 py-2 text-fg placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent";

export function ApplicationForm({ storeDomain }: { storeDomain: string }) {
  const [state, action, pending] = useActionState<ApplyState, FormData>(apply, { status: "idle" });
  const [hasSite, setHasSite] = useState<"yes" | "no" | "">("");
  const [highLevel, setHighLevel] = useState<"yes" | "no" | "">("");
  const [notSure, setNotSure] = useState(false);
  const [noneFit, setNoneFit] = useState(false);

  if (state.status === "sent") {
    return (
      <div className="mt-4" role="status">
        <p className="font-medium">Thanks, we got your application.</p>
        <p className="mt-2 text-sm text-muted">
          We&apos;ve sent a confirmation to {state.email}. It has a link to book a short call
          with us, where we get you set up and agree how billing works. Once you&apos;re approved, you&apos;ll get an email with a
          link to sign in.
        </p>
      </div>
    );
  }

  return (
    <form action={action} className="mt-6 grid gap-5 sm:grid-cols-2">
      <label className="block text-sm font-medium">
        Your name
        <input name="name" required maxLength={100} autoComplete="name" className={input} />
      </label>
      <label className="block text-sm font-medium">
        Email
        <input name="email" type="email" required maxLength={254} autoComplete="email" className={input} />
      </label>
      <label className="block text-sm font-medium">
        Business name
        <input name="business" required maxLength={100} autoComplete="organization" className={input} />
      </label>
      <label className="block text-sm font-medium">
        Website <span className="font-normal text-muted">(optional)</span>
        <input name="website" maxLength={300} placeholder="example.com" autoComplete="url" className={input} />
      </label>
      <label className="block text-sm font-medium sm:col-span-2">
        Who do you sell websites to?
        <textarea
          name="clients"
          required
          maxLength={1000}
          rows={3}
          placeholder="For example: restaurants and salons in our city, or members of our chamber"
          className={input}
        />
      </label>
      <label className="block text-sm font-medium">
        Websites you expect to sell in your first year
        <select name="expected_sites" required defaultValue="" className={input}>
          <option value="" disabled>
            Choose one
          </option>
          {EXPECTED_SITES.map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </label>

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

      <fieldset className="text-sm sm:col-span-2">
        <legend className="font-medium">What kinds of websites do you want to sell?</legend>
        <p className="mt-1 text-muted">Tick all that fit. Your storefront shows only these plans, and you can add others later.</p>
        <div className="mt-2 grid gap-2 sm:grid-cols-3">
          {PRICES.siteTypes.map((t) => (
            <label key={t.key} className="flex items-center gap-2">
              <input type="checkbox" name="site_types" value={t.key} disabled={notSure} />
              {t.name}
            </label>
          ))}
          <label className="flex items-center gap-2">
            <input type="checkbox" name="site_types" value="not-sure" checked={notSure} onChange={(e) => setNotSure(e.target.checked)} />
            Not sure yet
          </label>
        </div>
        <label className="mt-3 block font-medium">
          Something else? <span className="font-normal text-muted">(optional)</span>
          <input name="site_types_other" maxLength={300} placeholder="For example: restaurant menus with online ordering" className={input} />
        </label>
      </fieldset>

      <fieldset className="text-sm sm:col-span-2">
        <legend className="font-medium">Who are your customers?</legend>
        <p className="mt-1 text-muted">Tick all that fit. Your storefront gets a page for each, written for them.</p>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          {AUDIENCES.map(([key, label]) => (
            <label key={key} className="flex items-center gap-2">
              <input type="checkbox" name="audiences" value={key} disabled={noneFit} />
              {label}
            </label>
          ))}
          <label className="flex items-center gap-2">
            <input type="checkbox" name="audiences" value="none" checked={noneFit} onChange={(e) => setNoneFit(e.target.checked)} />
            None of these
          </label>
        </div>
        <label className="mt-3 block font-medium">
          Something else? <span className="font-normal text-muted">(optional)</span>
          <input name="audiences_other" maxLength={300} placeholder="For example: dentists and vets" className={input} />
        </label>
      </fieldset>

      <fieldset className="text-sm sm:col-span-2">
        <legend className="font-medium">Do you already have a WordPress site to sell from?</legend>
        <div className="mt-2 flex flex-wrap gap-6">
          <label className="flex items-center gap-2">
            <input type="radio" name="has_site" value="yes" required checked={hasSite === "yes"} onChange={() => setHasSite("yes")} />
            Yes, I&apos;ll add our plugin to it
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="has_site" value="no" checked={hasSite === "no"} onChange={() => setHasSite("no")} />
            No, build me a storefront
          </label>
        </div>
        {hasSite === "no" && (
          <label className="mt-4 block font-medium">
            Your storefront&apos;s address <span className="font-normal text-muted">(optional)</span>
            <span className="mt-1 flex items-center gap-2">
              <input
                name="subdomain"
                maxLength={63}
                pattern="[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?"
                title="Letters, digits and dashes"
                placeholder="yourbusiness"
                className={`${input} mt-0 max-w-xs`}
              />
              <span className="text-muted">.{storeDomain}</span>
            </span>
            <span className="mt-1 block font-normal text-muted">
              A free, ready-to-sell storefront, included with your account. You can use your own domain later.
            </span>
          </label>
        )}
      </fieldset>

      <fieldset className="text-sm sm:col-span-2">
        <legend className="font-medium">Do you run a HighLevel agency?</legend>
        <div className="mt-2 flex flex-wrap gap-6">
          <label className="flex items-center gap-2">
            <input type="radio" name="highlevel" value="yes" required checked={highLevel === "yes"} onChange={() => setHighLevel("yes")} />
            Yes
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="highlevel" value="no" checked={highLevel === "no"} onChange={() => setHighLevel("no")} />
            No
          </label>
        </div>
        {highLevel === "yes" && (
          <p className="mt-2 text-muted">
            Your sub-accounts can make and manage websites from HighLevel workflows with the AnyPress app. We&apos;ll set you up for
            it.
          </p>
        )}
      </fieldset>

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
        <button
          type="submit"
          disabled={pending}
          className="btn btn-ink disabled:opacity-60"
        >
          {pending ? "Sending…" : "Send application"}
        </button>
      </div>
    </form>
  );
}
