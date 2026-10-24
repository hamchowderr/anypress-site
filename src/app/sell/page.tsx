import type { Metadata } from "next";
import { PageHero } from "@/components/ui";
import { ApplicationForm } from "./ApplicationForm";

export const metadata: Metadata = {
  title: "Sell websites with AnyPress",
  description: "Apply to sell WordPress websites to your own clients, hosted and kept running by AnyPress.",
};

const STEPS = [
  { title: "Apply", body: "Tell us about your business and who you build websites for. It takes two minutes." },
  { title: "We review it", body: "We look at every application ourselves and email you when you're approved." },
  { title: "Start selling", body: "Sign in, set up your shop, and sell your first websites. You can start with three." },
];

export default function Sell() {
  return (
    <>
      <PageHero drawing="sell" side="technical"
        eyebrow="For sellers and resellers"
        title="Sell websites with AnyPress."
        lead="Sell websites to your clients under your own name. We host every site, keep it backed up and up to date, and you pay per site with lower prices as you grow."
      />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <ol className="grid gap-8 sm:grid-cols-3">
          {STEPS.map((s, i) => (
            <li key={s.title} className="border-t border-line pt-6">
              <p className="font-display text-sm font-semibold text-accent">Step {i + 1}</p>
              <h2 className="font-display mt-2 text-xl font-semibold">{s.title}</h2>
              <p className="mt-1.5 leading-7 text-ink-soft">{s.body}</p>
            </li>
          ))}
        </ol>

        <div className="card mt-12 p-6 sm:p-10">
          <h2 className="font-display text-2xl font-semibold">Your application</h2>
          <ApplicationForm storeDomain={process.env.NEXT_PUBLIC_STORE_DOMAIN || "anypress.site"} />
        </div>
      </section>
    </>
  );
}
