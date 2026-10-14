import type { Metadata } from "next";
import { PLANS, checkoutUrl } from "@/lib/site";

export const metadata: Metadata = { title: "Pricing" };

export default function Pricing() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Pricing</h1>
      <p className="mt-3 max-w-2xl text-muted">
        One monthly price per website. Cancel any time from your account.
      </p>
      <p className="mt-2 text-sm text-muted">Plans and prices shown here are placeholders while we finalise them.</p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {PLANS.map((plan) => (
          <div key={plan.name} className="flex flex-col rounded-lg border border-line p-6">
            <h2 className="font-semibold">{plan.name}</h2>
            <p className="mt-4">
              <span className="text-4xl font-semibold tracking-tight">{plan.price}</span>
              <span className="ml-1 text-sm text-muted">{plan.period}</span>
            </p>
            <p className="mt-3 text-sm text-muted">{plan.summary}</p>
            <ul className="mt-5 flex-1 space-y-2 text-sm">
              {plan.features.map((f) => (
                <li key={f} className="flex gap-2">
                  <span aria-hidden className="text-accent">
                    ✓
                  </span>
                  {f}
                </li>
              ))}
            </ul>
            {plan.itemId ? (
              <a
                href={checkoutUrl(plan.itemId)}
                className="mt-6 rounded-md bg-accent px-4 py-2.5 text-center font-medium text-on-accent hover:opacity-90"
              >
                Buy now
              </a>
            ) : (
              <span className="mt-6 rounded-md border border-line px-4 py-2.5 text-center text-sm text-muted">
                Coming soon
              </span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
